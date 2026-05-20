const fs = require('../fs-native');
const os = require('node:os');
const path = require('node:path');
const { execSync } = require('node:child_process');
const yaml = require('yaml');
const prompts = require('../prompts');
const { resolveChannel, tagExists, parseGitHubRepo } = require('./channel-resolver');
const { decideChannelForModule } = require('./channel-plan');
const { getProjectRoot } = require('../project-root');

const VALID_CHANNELS = new Set(['stable', 'next', 'pinned']);

function normalizeChannelName(raw) {
  if (typeof raw !== 'string') return null;
  const lower = raw.trim().toLowerCase();
  return VALID_CHANNELS.has(lower) ? lower : null;
}

/**
 * Conservative quoting for tag names passed to git commands. Tags are
 * user-typed (--pin) or come from the GitHub API. Only allow the semver
 * character class we use to tag BMad releases; anything else throws.
 */
function quoteShell(ref) {
  if (typeof ref !== 'string' || !/^[\w.\-+/]+$/.test(ref)) {
    throw new Error(`Unsafe ref name: ${JSON.stringify(ref)}`);
  }
  return `"${ref}"`;
}

async function readChannelMarker(markerPath) {
  try {
    if (!(await fs.pathExists(markerPath))) return null;
    const content = await fs.readFile(markerPath, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function writeChannelMarker(markerPath, data) {
  try {
    await fs.writeFile(markerPath, JSON.stringify({ ...data, writtenAt: new Date().toISOString() }, null, 2));
  } catch {
    // Best-effort: marker is an optimization, not a correctness requirement.
  }
}

const REGISTRY_CONFIG_PATH = path.join(getProjectRoot(), 'bmad-modules.yaml');

/**
 * Manages official modules from the bundled registry file. The remote
 * marketplace fetch has been retired; this repo is the single source of truth
 * for which official modules exist and how they are displayed.
 *
 * @class ExternalModuleManager
 */
class ExternalModuleManager {
  // moduleCode → { channel, version, ref, sha, repoUrl, resolvedFallback }
  // Populated when cloneExternalModule resolves a channel. Shared across all
  // instances so the manifest writer (which often instantiates a fresh
  // ExternalModuleManager) sees resolutions made during install.
  static _resolutions = new Map();

  constructor() {}

  /**
   * Get the most recent channel resolution for a module (if any).
   * @param {string} moduleCode
   * @returns {Object|null}
   */
  getResolution(moduleCode) {
    return ExternalModuleManager._resolutions.get(moduleCode) || null;
  }

  /**
   * Load the official modules registry from the bundled YAML file.
   * @returns {Object} Parsed YAML content with modules array
   */
  async loadExternalModulesConfig() {
    if (this.cachedModules) {
      return this.cachedModules;
    }

    try {
      const content = await fs.readFile(REGISTRY_CONFIG_PATH, 'utf8');
      const config = yaml.parse(content);
      this.cachedModules = config;
      return config;
    } catch (error) {
      await prompts.log.warn(`Échec du chargement de la configuration des modules : ${error.message}`);
      return { modules: [] };
    }
  }

  /**
   * Normalize a module entry from either the remote registry format
   * (snake_case, array) or the legacy bundled format (kebab-case, object map).
   * @param {Object} mod - Raw module config from YAML
   * @param {string} [key] - Key name (only for legacy map format)
   * @returns {Object} Normalized module info
   */
  _normalizeModule(mod, key) {
    return {
      key: key || mod.name,
      url: mod.repository || mod.url,
      moduleDefinition: mod.module_definition || mod['module-definition'],
      code: mod.code,
      name: mod.display_name || mod.name,
      description: mod.description || '',
      defaultSelected: mod.default_selected === true || mod.defaultSelected === true,
      type: mod.type || 'bmad-org',
      npmPackage: mod.npm_package || mod.npmPackage || null,
      pluginName: mod.plugin_name || mod.pluginName || null,
      defaultChannel: normalizeChannelName(mod.default_channel || mod.defaultChannel) || 'stable',
      builtIn: mod.built_in === true,
      isExternal: mod.built_in !== true,
    };
  }

  /**
   * Get list of available modules from the registry
   * @returns {Array<Object>} Array of module info objects
   */
  async listAvailable() {
    const config = await this.loadExternalModulesConfig();

    // Remote format: modules is an array
    if (Array.isArray(config.modules)) {
      return config.modules.map((mod) => this._normalizeModule(mod));
    }

    // Legacy bundled format: modules is an object map
    const modules = [];
    for (const [key, mod] of Object.entries(config.modules || {})) {
      modules.push(this._normalizeModule(mod, key));
    }
    return modules;
  }

  /**
   * Get module info by code
   * @param {string} code - The module code (e.g., 'cis')
   * @returns {Object|null} Module info or null if not found
   */
  async getModuleByCode(code) {
    const modules = await this.listAvailable();
    return modules.find((m) => m.code === code) || null;
  }

  /**
   * Get the cache directory for external modules
   * @returns {string} Path to the external modules cache directory
   */
  getExternalCacheDir() {
    const cacheDir = path.join(os.homedir(), '.bmad', 'cache', 'external-modules');
    return cacheDir;
  }

  /**
   * Clone an external module repository to cache, resolving the requested
   * channel (stable / next / pinned) to a concrete git ref.
   *
   * @param {string} moduleCode - Code of the external module
   * @param {Object} options - Clone options
   * @param {boolean} [options.silent] - Suppress spinner output
   * @param {Object} [options.channelOptions] - Parsed channel flags. See
   *   modules/channel-plan.js. When absent, the module installs on its
   *   registry-declared default channel (typically 'stable').
   * @returns {string} Path to the cloned repository
   */
  async cloneExternalModule(moduleCode, options = {}) {
    const moduleInfo = await this.getModuleByCode(moduleCode);

    if (!moduleInfo) {
      throw new Error(`Module externe '${moduleCode}' introuvable dans le registre BMad`);
    }

    const cacheDir = this.getExternalCacheDir();
    const moduleCacheDir = path.join(cacheDir, moduleCode);
    const silent = options.silent || false;

    // Create cache directory if it doesn't exist
    await fs.ensureDir(cacheDir);

    // Helper to create a spinner or a no-op when silent
    const createSpinner = async () => {
      if (silent) {
        return {
          start() {},
          stop() {},
          error() {},
          message() {},
          cancel() {},
          clear() {},
          get isSpinning() {
            return false;
          },
          get isCancelled() {
            return false;
          },
        };
      }
      return await prompts.spinner();
    };

    // ─── Resolve channel plan ─────────────────────────────────────────────
    // Post-install callers (config generation, directory setup, help catalog
    // rebuild) invoke findModuleSource/cloneExternalModule without
    // channelOptions just to locate the module's files. Those calls must not
    // redecide the channel — the install step already chose one, cloned the
    // right ref, and recorded a resolution. If we re-resolve without flags,
    // we'd snap back to stable and overwrite a pinned install.
    const hasExplicitChannelInput =
      options.channelOptions &&
      (options.channelOptions.global ||
        (options.channelOptions.nextSet && options.channelOptions.nextSet.size > 0) ||
        (options.channelOptions.pins && options.channelOptions.pins.size > 0));
    const existingResolution = ExternalModuleManager._resolutions.get(moduleCode);
    const haveUsableCache = await fs.pathExists(moduleCacheDir);

    if (!hasExplicitChannelInput && existingResolution && haveUsableCache) {
      // This is a look-up only; the module is already installed at its chosen
      // ref. Skip cloning and return the cached path unchanged.
      return moduleCacheDir;
    }

    const planEntry = decideChannelForModule({
      code: moduleCode,
      channelOptions: options.channelOptions,
      registryDefault: moduleInfo.defaultChannel,
    });

    // Same-plan short-circuit: a single install calls cloneExternalModule
    // several times (config collection, directory setup, help-catalog rebuild)
    // with the same channelOptions. The first call resolves + clones; later
    // calls with an identical plan and a valid cache should return immediately
    // instead of re-running resolveChannel() and `git fetch` (slow; can fail
    // on flaky networks even though the tagCache dedupes the GitHub API hit).
    if (existingResolution && haveUsableCache && existingResolution.channel === planEntry.channel) {
      const samePin = planEntry.channel !== 'pinned' || existingResolution.version === planEntry.pin;
      if (samePin) return moduleCacheDir;
    }

    let resolved;
    try {
      resolved = await resolveChannel({
        channel: planEntry.channel,
        pin: planEntry.pin,
        repoUrl: moduleInfo.url,
      });
    } catch (error) {
      // Tag-API failure (rate limit, transient network). If we already have
      // a usable cache at a recorded ref, treat this as "couldn't check for
      // updates" and re-use the cached version silently — that's the right
      // call for an update/quick-update, since the semantics don't change
      // and the user isn't worse off than before they ran this command.
      const cachedMarker = await readChannelMarker(path.join(moduleCacheDir, '.bmad-channel.json'));
      if (cachedMarker?.channel && (await fs.pathExists(moduleCacheDir))) {
        if (!silent) {
          await prompts.log.warn(
            `Impossible de vérifier les mises à jour de ${moduleInfo.name} (${error.message}) ; utilisation du cache ${cachedMarker.version || cachedMarker.channel}.`,
          );
        }
        ExternalModuleManager._resolutions.set(moduleCode, {
          channel: cachedMarker.channel,
          version: cachedMarker.version || 'main',
          ref: cachedMarker.version && cachedMarker.version !== 'main' ? cachedMarker.version : null,
          sha: cachedMarker.sha,
          repoUrl: moduleInfo.url,
          resolvedFallback: false,
          planSource: 'cached',
        });
        return moduleCacheDir;
      }
      // No cache to fall back on — this is effectively a fresh install with
      // no offline safety net. Surface a clear error with actionable guidance.
      const isRateLimited = /rate limit/i.test(error.message);
      const hint = isRateLimited
        ? process.env.GITHUB_TOKEN
          ? 'Votre GITHUB_TOKEN a peut-être expiré ou atteint sa propre limite de débit. Essayez un autre token ou attendez la réinitialisation.'
          : "Définissez une variable d'environnement GITHUB_TOKEN (tout token d'accès personnel avec lecture public-repo) pour passer de 60 à plus de requêtes par heure en mode anonyme."
        : `Vérifiez votre connexion réseau, ou relancez avec \`--next=${moduleCode}\` / \`--pin ${moduleCode}=<tag>\` pour ignorer la recherche de tag.`;
      throw new Error(`Impossible de résoudre le tag stable pour '${moduleCode}' (${error.message}). ${hint}`);
    }

    if (resolved.resolvedFallback && !silent) {
      if (resolved.reason === 'no-stable-tags') {
        await prompts.log.warn(`Aucune version stable trouvée pour ${moduleInfo.name} ; installation depuis main.`);
      } else if (resolved.reason === 'not-a-github-url') {
        await prompts.log.warn(
          `Impossible de déterminer les tags stables pour ${moduleInfo.name} (URL non GitHub) ; installation depuis main.`,
        );
      }
    }

    // Validate pin before we burn time cloning. Best-effort: skip on non-GitHub URLs.
    if (planEntry.channel === 'pinned') {
      const parsed = parseGitHubRepo(moduleInfo.url);
      if (parsed) {
        try {
          const exists = await tagExists(parsed.owner, parsed.repo, planEntry.pin);
          if (!exists) {
            throw new Error(`Tag '${planEntry.pin}' introuvable dans ${parsed.owner}/${parsed.repo}.`);
          }
        } catch (error) {
          if (error.message?.includes('not found') || error.message?.includes('introuvable')) throw error;
          // Network hiccup on tag verification — let the clone attempt fail clearly.
        }
      }
    }

    // ─── Clone or update cache by resolved channel ────────────────────────
    const markerPath = path.join(moduleCacheDir, '.bmad-channel.json');
    const currentMarker = await readChannelMarker(markerPath);
    const needsChannelReset = currentMarker && currentMarker.channel !== resolved.channel;

    let needsDependencyInstall = false;
    let wasNewClone = false;

    if (needsChannelReset && (await fs.pathExists(moduleCacheDir))) {
      // Channel changed (e.g. user switched stable→next). Blow away and re-clone
      // to avoid tangling shallow clones of different refs.
      await fs.remove(moduleCacheDir);
    }

    if (await fs.pathExists(moduleCacheDir)) {
      // Cache exists on the right channel. Refresh the ref.
      const fetchSpinner = await createSpinner();
      fetchSpinner.start(`Récupération de ${moduleInfo.name}...`);
      try {
        const currentSha = execSync('git rev-parse HEAD', { cwd: moduleCacheDir, stdio: 'pipe' }).toString().trim();

        if (resolved.channel === 'next') {
          execSync('git fetch origin --depth 1', {
            cwd: moduleCacheDir,
            stdio: ['ignore', 'pipe', 'pipe'],
            env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
          });
          execSync('git reset --hard origin/HEAD', {
            cwd: moduleCacheDir,
            stdio: ['ignore', 'pipe', 'pipe'],
            env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
          });
        } else {
          // stable or pinned — fetch the specific tag and check it out.
          execSync(`git fetch --depth 1 origin tag ${quoteShell(resolved.ref)} --no-tags`, {
            cwd: moduleCacheDir,
            stdio: ['ignore', 'pipe', 'pipe'],
            env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
          });
          execSync(`git checkout --quiet FETCH_HEAD`, {
            cwd: moduleCacheDir,
            stdio: ['ignore', 'pipe', 'pipe'],
          });
        }

        const newSha = execSync('git rev-parse HEAD', { cwd: moduleCacheDir, stdio: 'pipe' }).toString().trim();
        fetchSpinner.stop(`${moduleInfo.name} récupéré`);
        if (currentSha !== newSha) needsDependencyInstall = true;
      } catch {
        fetchSpinner.error(`Échec de la récupération, re-téléchargement de ${moduleInfo.name}`);
        await fs.remove(moduleCacheDir);
        wasNewClone = true;
      }
    } else {
      wasNewClone = true;
    }

    if (wasNewClone) {
      const fetchSpinner = await createSpinner();
      fetchSpinner.start(`Récupération de ${moduleInfo.name}...`);
      try {
        if (resolved.channel === 'next') {
          execSync(`git clone --depth 1 "${moduleInfo.url}" "${moduleCacheDir}"`, {
            stdio: ['ignore', 'pipe', 'pipe'],
            env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
          });
        } else {
          execSync(`git clone --depth 1 --branch ${quoteShell(resolved.ref)} "${moduleInfo.url}" "${moduleCacheDir}"`, {
            stdio: ['ignore', 'pipe', 'pipe'],
            env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
          });
        }
        fetchSpinner.stop(`${moduleInfo.name} récupéré`);
      } catch (error) {
        fetchSpinner.error(`Échec de la récupération de ${moduleInfo.name}`);
        throw new Error(`Échec du clonage du module externe '${moduleCode}' à la version ${resolved.version} : ${error.message}`);
      }
    }

    // Record resolution (channel + tag + SHA) for the manifest writer to pick up.
    const sha = execSync('git rev-parse HEAD', { cwd: moduleCacheDir, stdio: 'pipe' }).toString().trim();
    ExternalModuleManager._resolutions.set(moduleCode, {
      channel: resolved.channel,
      version: resolved.version,
      ref: resolved.ref,
      sha,
      repoUrl: moduleInfo.url,
      resolvedFallback: !!resolved.resolvedFallback,
      planSource: planEntry.source,
    });
    await writeChannelMarker(markerPath, { channel: resolved.channel, version: resolved.version, sha });

    // Install dependencies if package.json exists
    const packageJsonPath = path.join(moduleCacheDir, 'package.json');
    const nodeModulesPath = path.join(moduleCacheDir, 'node_modules');
    if (await fs.pathExists(packageJsonPath)) {
      // Install if node_modules doesn't exist, or if package.json is newer (dependencies changed)
      const nodeModulesMissing = !(await fs.pathExists(nodeModulesPath));

      // Force install if we updated or cloned new
      if (needsDependencyInstall || wasNewClone || nodeModulesMissing) {
        const installSpinner = await createSpinner();
        installSpinner.start(`Installation des dépendances pour ${moduleInfo.name}...`);
        try {
          execSync('npm install --omit=dev --no-audit --no-fund --no-progress --legacy-peer-deps', {
            cwd: moduleCacheDir,
            stdio: ['ignore', 'pipe', 'pipe'],
            timeout: 120_000, // 2 minute timeout
          });
          installSpinner.stop(`Dépendances installées pour ${moduleInfo.name}`);
        } catch (error) {
          installSpinner.error(`Échec de l'installation des dépendances pour ${moduleInfo.name}`);
          if (!silent) await prompts.log.warn(`  ${error.message}`);
        }
      } else {
        // Check if package.json is newer than node_modules
        let packageJsonNewer = false;
        try {
          const packageStats = await fs.stat(packageJsonPath);
          const nodeModulesStats = await fs.stat(nodeModulesPath);
          packageJsonNewer = packageStats.mtime > nodeModulesStats.mtime;
        } catch {
          // If stat fails, assume we need to install
          packageJsonNewer = true;
        }

        if (packageJsonNewer) {
          const installSpinner = await createSpinner();
          installSpinner.start(`Installation des dépendances pour ${moduleInfo.name}...`);
          try {
            execSync('npm install --omit=dev --no-audit --no-fund --no-progress --legacy-peer-deps', {
              cwd: moduleCacheDir,
              stdio: ['ignore', 'pipe', 'pipe'],
              timeout: 120_000, // 2 minute timeout
            });
            installSpinner.stop(`Dépendances installées pour ${moduleInfo.name}`);
          } catch (error) {
            installSpinner.error(`Échec de l'installation des dépendances pour ${moduleInfo.name}`);
            if (!silent) await prompts.log.warn(`  ${error.message}`);
          }
        }
      }
    }

    return moduleCacheDir;
  }

  /**
   * Find the source path for an external module
   * @param {string} moduleCode - Code of the external module
   * @param {Object} options - Options passed to cloneExternalModule
   * @returns {string|null} Path to the module source or null if not found
   */
  async findExternalModuleSource(moduleCode, options = {}) {
    const moduleInfo = await this.getModuleByCode(moduleCode);

    if (!moduleInfo || moduleInfo.builtIn) {
      return null;
    }

    // Clone the external module repo
    const cloneDir = await this.cloneExternalModule(moduleCode, options);

    // The module-definition specifies the path to module.yaml relative to repo root
    // We need to return the directory containing module.yaml
    const moduleDefinitionPath = moduleInfo.moduleDefinition; // e.g., 'skills/module.yaml'
    const configuredPath = path.join(cloneDir, moduleDefinitionPath);

    if (await fs.pathExists(configuredPath)) {
      return path.dirname(configuredPath);
    }

    // Fallback: search skills/ and src/ (root level and one level deep for subfolders)
    for (const dir of ['skills', 'src']) {
      const rootCandidate = path.join(cloneDir, dir, 'module.yaml');
      if (await fs.pathExists(rootCandidate)) {
        return path.dirname(rootCandidate);
      }
      const dirPath = path.join(cloneDir, dir);
      if (await fs.pathExists(dirPath)) {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory()) {
            const subCandidate = path.join(dirPath, entry.name, 'module.yaml');
            if (await fs.pathExists(subCandidate)) {
              return path.dirname(subCandidate);
            }
          }
        }
      }
    }

    // Check repo root as last fallback
    const rootCandidate = path.join(cloneDir, 'module.yaml');
    if (await fs.pathExists(rootCandidate)) {
      return path.dirname(rootCandidate);
    }

    // Nothing found: the cloned ref does not contain a recognizable module structure.
    // This happens when a stable tag predates a module restructure (e.g. the repo
    // moved files from payload/ to skills/ after the tag was cut). Returning a
    // non-existent path silently causes a confusing ENOENT deep inside copyModuleWithFiltering;
    // throw a descriptive error here instead so the user knows what happened and how to recover.
    const resolution = ExternalModuleManager._resolutions.get(moduleCode);
    const versionHint = resolution?.version ? `version ${resolution.version}` : 'la version clonée';
    const channelHint =
      resolution?.channel === 'stable'
        ? ` Essayez de réinstaller avec \`--next=${moduleCode}\` pour utiliser la dernière branche main à la place.`
        : '';
    throw new Error(
      `Le module '${moduleCode}' a été téléchargé mais sa définition de module est introuvable. ` +
        `'${moduleDefinitionPath}' était attendu dans ${versionHint}, mais il est absent. ` +
        `Le dépôt a peut-être été restructuré après le marquage de cette version.${channelHint}`,
    );
  }
  cachedModules = null;
}

module.exports = { ExternalModuleManager };
