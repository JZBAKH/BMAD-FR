const path = require('node:path');
const os = require('node:os');
const semver = require('semver');
const fs = require('./fs-native');
const installerPackageJson = require('../../package.json');
const { CLIUtils } = require('./cli-utils');
const { ExternalModuleManager } = require('./modules/external-manager');
const { resolveModuleVersion } = require('./modules/version-resolver');
const { Manifest } = require('./core/manifest');
const {
  parseChannelOptions,
  buildPlan,
  decideChannelForModule,
  orphanPinWarnings,
  bundledTargetWarnings,
} = require('./modules/channel-plan');
const channelResolver = require('./modules/channel-resolver');
const prompts = require('./prompts');
const { parseSetEntries } = require('./set-overrides');

const manifest = new Manifest();

/**
 * Format a resolved version for display in installer labels.
 * Semver-like values are normalized to a single leading "v".
 * @param {string|null|undefined} version
 * @returns {string}
 */
function formatDisplayVersion(version) {
  const trimmed = typeof version === 'string' ? version.trim() : '';
  if (!trimmed) return '';

  const normalized = semver.valid(semver.coerce(trimmed));
  if (normalized) {
    return `v${normalized}`;
  }

  return trimmed;
}

/**
 * Build the display label for a module, showing an upgrade arrow when an
 * installed semver differs from the latest resolvable semver.
 * @param {string} name
 * @param {string} latestVersion
 * @param {string} installedVersion
 * @returns {string}
 */
function buildModuleLabel(name, latestVersion, installedVersion = '') {
  const latestDisplay = formatDisplayVersion(latestVersion);
  if (!latestDisplay) return name;

  const installedDisplay = formatDisplayVersion(installedVersion);
  const latestSemver = semver.valid(semver.coerce(latestVersion || ''));
  const installedSemver = semver.valid(semver.coerce(installedVersion || ''));

  if (installedDisplay && latestSemver && installedSemver && semver.neq(installedSemver, latestSemver)) {
    return `${name} (${installedDisplay} → ${latestDisplay})`;
  }

  return `${name} (${latestDisplay})`;
}

/**
 * Resolve the version to show for a module picker entry. External modules use
 * the same channel/tag resolver as installs; bundled modules fall back to local
 * source metadata.
 * @param {string} moduleCode - Module code (e.g., 'core', 'bmm', 'cis')
 * @param {Object} options
 * @param {string|null} [options.repoUrl] - Module repository URL for tag resolution
 * @param {string|null} [options.registryDefault] - Registry default channel
 * @param {Object|null} [options.channelOptions] - Parsed installer channel options
 * @returns {Promise<{version: string, lookupAttempted: boolean, lookupSucceeded: boolean}>}
 */
async function getModuleVersion(moduleCode, { repoUrl = null, registryDefault = null, channelOptions = null } = {}) {
  if (repoUrl) {
    const plan = decideChannelForModule({
      code: moduleCode,
      channelOptions,
      registryDefault,
    });

    try {
      const resolved = await channelResolver.resolveChannel({
        channel: plan.channel,
        pin: plan.pin,
        repoUrl,
      });
      if (resolved?.version) {
        return {
          version: resolved.version,
          lookupAttempted: plan.channel === 'stable',
          lookupSucceeded: true,
        };
      }
    } catch {
      // Fall back to local metadata when tag resolution is unavailable.
    }
  }

  const versionInfo = await resolveModuleVersion(moduleCode);
  return {
    version: versionInfo.version || '',
    lookupAttempted: !!repoUrl,
    lookupSucceeded: false,
  };
}

/**
 * UI utilities for the installer
 */
class UI {
  /**
   * Prompt for installation configuration
   * @param {Object} options - Command-line options from install command
   * @returns {Object} Installation configuration
   */
  async promptInstall(options = {}) {
    await CLIUtils.displayLogo();

    // Display version-specific start message from install-messages.yaml
    const { MessageLoader } = require('./message-loader');
    const messageLoader = new MessageLoader();
    await messageLoader.displayStartMessage();

    // Parse channel flags (--channel/--all-*/--next=/--pin) once. Warnings
    // are surfaced immediately so the user sees them before any git ops run.
    const channelOptions = parseChannelOptions(options);
    for (const warning of channelOptions.warnings) {
      await prompts.log.warn(warning);
    }

    // When the installer's own version is a prerelease (e.g. 0.0.1-alpha for
    // BMAD-FR), seed the global channel to 'next' for external modules so the
    // module picker resolves labels from main HEAD. We deliberately SKIP the
    // user-facing "Lancé depuis une préversion..." log line here: BMAD-FR is
    // permanently on a prerelease version tag and showing this notice on every
    // install would be confusing for end users. The behavior is preserved;
    // only the cosmetic log line is suppressed. Explicit channel flags
    // (--all-stable, --pin, --channel) still override this default.
    if (
      semver.prerelease(installerPackageJson.version) !== null &&
      !channelOptions.global &&
      channelOptions.nextSet.size === 0 &&
      channelOptions.pins.size === 0
    ) {
      channelOptions.global = 'next';
    }

    // Get directory from options or prompt
    let confirmedDirectory;
    if (options.directory) {
      // Use provided directory from command-line
      const expandedDir = this.expandUserPath(options.directory);
      const validation = this.validateDirectorySync(expandedDir);
      if (validation) {
        throw new Error(`Répertoire invalide : ${validation}`);
      }
      confirmedDirectory = expandedDir;
      await prompts.log.info(`Utilisation du répertoire depuis la ligne de commande : ${confirmedDirectory}`);
    } else {
      confirmedDirectory = await this.getConfirmedDirectory();
    }

    const { Installer } = require('./core/installer');
    const installer = new Installer();
    const { bmadDir } = await installer.findBmadDir(confirmedDirectory);

    // Check if there's an existing BMAD installation
    const hasExistingInstall = await fs.pathExists(bmadDir);

    // Track action type (only set if there's an existing installation)
    let actionType;

    // Only show action menu if there's an existing installation
    if (hasExistingInstall) {
      // Get version information
      const { existingInstall, bmadDir } = await this.getExistingInstallation(confirmedDirectory);

      // Build menu choices dynamically
      const choices = [];

      // Always show Quick Update first (allows refreshing installation even on same version)
      if (existingInstall.installed) {
        choices.push({
          name: 'Mise à jour rapide',
          value: 'quick-update',
        });
      }

      // Common actions
      choices.push({ name: 'Modifier l\'installation BMAD', value: 'update' });

      // Check if action is provided via command-line
      if (options.action) {
        const validActions = choices.map((c) => c.value);
        if (!validActions.includes(options.action)) {
          throw new Error(`Action invalide : ${options.action}. Actions valides : ${validActions.join(', ')}`);
        }
        actionType = options.action;
        await prompts.log.info(`Utilisation de l'action depuis la ligne de commande : ${actionType}`);
      } else if (options.yes) {
        // Default to quick-update if available, unless flags that require the
        // full update path are present (e.g. --custom-source which re-clones
        // modules at a new version — quick-update skips that entirely).
        if (choices.length === 0) {
          throw new Error('Aucune action valide disponible pour cette installation');
        }
        const hasQuickUpdate = choices.some((c) => c.value === 'quick-update');
        const needsFullUpdate = !!options.customSource;
        actionType = hasQuickUpdate && !needsFullUpdate ? 'quick-update' : (choices.find((c) => c.value === 'update') || choices[0]).value;
        await prompts.log.info(`Mode non interactif (--yes) : action par défaut ${actionType}`);
      } else {
        actionType = await prompts.select({
          message: 'Comment souhaitez-vous procéder ?',
          choices: choices,
          default: choices[0].value,
        });
      }

      // Handle quick update separately
      if (actionType === 'quick-update') {
        return {
          actionType: 'quick-update',
          directory: confirmedDirectory,
          skipPrompts: options.yes || false,
        };
      }

      // If actionType === 'update', handle it with the new flow
      // Return early with modify configuration
      if (actionType === 'update') {
        // Get existing installation info
        const { installedModuleIds, installedModuleVersions } = await this.getExistingInstallation(confirmedDirectory);

        await prompts.log.message(`Modules existants trouvés : ${[...installedModuleIds].join(', ')}`);

        // Unified module selection - all modules in one grouped multiselect
        let selectedModules;
        if (options.modules) {
          // Use modules from command-line
          selectedModules = options.modules
            .split(',')
            .map((m) => m.trim())
            .filter(Boolean);
          await prompts.log.info(`Utilisation des modules depuis la ligne de commande : ${selectedModules.join(', ')}`);
        } else if (options.customSource && !options.yes) {
          // Custom source without --modules or --yes: start with empty list
          // (only custom source modules + core will be installed).
          // When --yes is also set, fall through to the --yes branch so all
          // installed modules are included alongside the custom source modules.
          selectedModules = [];
        } else if (options.yes) {
          selectedModules = await this.getDefaultModules(installedModuleIds);
          await prompts.log.info(
            `Mode non interactif (--yes) : utilisation des modules par défaut (installés + défauts) : ${selectedModules.join(', ')}`,
          );
        } else {
          selectedModules = await this.selectAllModules(installedModuleIds, installedModuleVersions, channelOptions);
        }

        // Resolve custom sources from --custom-source flag
        if (options.customSource) {
          const customCodes = await this._resolveCustomSourcesCli(options.customSource);
          for (const code of customCodes) {
            if (!selectedModules.includes(code)) selectedModules.push(code);
          }
        }

        // Ensure core is in the modules list
        if (!selectedModules.includes('core')) {
          selectedModules.unshift('core');
        }

        // For existing installs, resolve per-module update decisions BEFORE
        // we clone anything. Reads the existing manifest's recorded channel
        // per module and prompts the user on available upgrades (patch/minor
        // default Y, major default N). Legacy entries with no channel are
        // migrated here too. Mutates channelOptions.pins to lock rejections.
        await this._resolveUpdateChannels({
          bmadDir,
          selectedModules,
          channelOptions,
          yes: options.yes || false,
        });

        // Get tool selection
        const toolSelection = await this.promptToolSelection(confirmedDirectory, options);

        const { moduleConfigs, setOverrides } = await this.collectModuleConfigs(confirmedDirectory, selectedModules, {
          ...options,
          channelOptions,
        });

        // Warn about --pin/--next flags that refer to modules the user didn't
        // select, or that target bundled modules (core/bmm) where channel
        // flags don't apply.
        {
          const bundledCodes = await this._bundledModuleCodes();
          for (const warning of [
            ...orphanPinWarnings(channelOptions, selectedModules),
            ...bundledTargetWarnings(channelOptions, bundledCodes),
          ]) {
            await prompts.log.warn(warning);
          }
        }

        return {
          actionType: 'update',
          directory: confirmedDirectory,
          modules: selectedModules,
          ides: toolSelection.ides,
          skipIde: toolSelection.skipIde,
          coreConfig: moduleConfigs.core || {},
          moduleConfigs: moduleConfigs,
          setOverrides,
          skipPrompts: options.yes || false,
          channelOptions,
        };
      }
    }

    // This section is only for new installations (update returns early above)
    const { installedModuleIds, installedModuleVersions } = await this.getExistingInstallation(confirmedDirectory);

    // Unified module selection - all modules in one grouped multiselect
    let selectedModules;
    if (options.modules) {
      // Use modules from command-line
      selectedModules = options.modules
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean);
      await prompts.log.info(`Utilisation des modules depuis la ligne de commande : ${selectedModules.join(', ')}`);
    } else if (options.customSource) {
      // Custom source without --modules: start with empty list (core added below)
      selectedModules = [];
    } else if (options.yes) {
      // Use default modules when --yes flag is set
      selectedModules = await this.getDefaultModules(installedModuleIds);
      await prompts.log.info(`Utilisation des modules par défaut (option --yes) : ${selectedModules.join(', ')}`);
    } else {
      selectedModules = await this.selectAllModules(installedModuleIds, installedModuleVersions, channelOptions);
    }

    // Resolve custom sources from --custom-source flag
    if (options.customSource) {
      const customCodes = await this._resolveCustomSourcesCli(options.customSource);
      for (const code of customCodes) {
        if (!selectedModules.includes(code)) selectedModules.push(code);
      }
    }

    // Ensure core is in the modules list
    if (!selectedModules.includes('core')) {
      selectedModules.unshift('core');
    }

    // Interactive channel gate: "Ready to install (all stable)? [Y/n]"
    // Only shown for fresh installs with no channel flags and an external module
    // selected. Skipped for prerelease launches because channelOptions.global
    // was already seeded to 'next' upstream. Non-interactive installs skip this
    // and fall through to the registry default (stable) or whatever flags were
    // supplied.
    await this._interactiveChannelGate({ options, channelOptions, selectedModules });

    let toolSelection = await this.promptToolSelection(confirmedDirectory, options);
    const { moduleConfigs, setOverrides } = await this.collectModuleConfigs(confirmedDirectory, selectedModules, {
      ...options,
      channelOptions,
    });

    // Warn about --pin/--next flags that refer to modules the user didn't
    // select, or that target bundled modules (core/bmm) where channel
    // flags don't apply.
    {
      const bundledCodes = await this._bundledModuleCodes();
      for (const warning of [
        ...orphanPinWarnings(channelOptions, selectedModules),
        ...bundledTargetWarnings(channelOptions, bundledCodes),
      ]) {
        await prompts.log.warn(warning);
      }
    }

    return {
      actionType: 'install',
      directory: confirmedDirectory,
      modules: selectedModules,
      ides: toolSelection.ides,
      skipIde: toolSelection.skipIde,
      coreConfig: moduleConfigs.core || {},
      moduleConfigs: moduleConfigs,
      setOverrides,
      skipPrompts: options.yes || false,
      channelOptions,
    };
  }

  /**
   * Prompt for tool/IDE selection (called after module configuration)
   * Uses a split prompt approach:
   *   1. Recommended tools - standard multiselect for preferred tools
   *   2. Additional tools - autocompleteMultiselect with search capability
   * @param {string} projectDir - Project directory to check for existing IDEs
   * @param {Object} options - Command-line options
   * @returns {Object} Tool configuration
   */
  _parseToolsFlag(toolsArg, allKnownValues) {
    const selectedIdes = toolsArg
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (selectedIdes.length === 0) {
      const err = new Error(
        '--tools a été passé vide. Fournissez au moins un identifiant d\'outil (ex. --tools claude-code) ou exécutez avec --list-tools pour voir les identifiants valides.',
      );
      err.expected = true;
      throw err;
    }

    const unknown = selectedIdes.filter((id) => !allKnownValues.has(id));
    if (unknown.length > 0) {
      const err = new Error(
        [
          `Identifiant${unknown.length === 1 ? '' : 's'} d'outil inconnu${unknown.length === 1 ? '' : 's'} : ${unknown.join(', ')}`,
          '',
          'Exécutez avec --list-tools pour voir tous les identifiants valides.',
          'Courants : claude-code, cursor, copilot, windsurf, cline',
        ].join('\n'),
      );
      err.expected = true;
      throw err;
    }

    return selectedIdes;
  }

  async promptToolSelection(projectDir, options = {}) {
    const { ExistingInstall } = require('./core/existing-install');
    const { Installer } = require('./core/installer');
    const installer = new Installer();
    const { bmadDir } = await installer.findBmadDir(projectDir || process.cwd());
    const existingInstall = await ExistingInstall.detect(bmadDir);
    const configuredIdes = existingInstall.ides;

    // Get IDE manager to fetch available IDEs dynamically
    const { IdeManager } = require('./ide/manager');
    const ideManager = new IdeManager();
    await ideManager.ensureInitialized(); // IMPORTANT: Must initialize before getting IDEs

    const preferredIdes = ideManager.getPreferredIdes();
    const otherIdes = ideManager.getOtherIdes();

    // Determine which configured IDEs are in "preferred" vs "other" categories
    const configuredPreferred = configuredIdes.filter((id) => preferredIdes.some((ide) => ide.value === id));
    const configuredOther = configuredIdes.filter((id) => otherIdes.some((ide) => ide.value === id));

    // Warn about previously configured tools that are no longer available
    const allKnownValues = new Set([...preferredIdes, ...otherIdes].map((ide) => ide.value));
    const unknownTools = configuredIdes.filter((id) => id && typeof id === 'string' && !allKnownValues.has(id));
    if (unknownTools.length > 0) {
      await prompts.log.warn(`Les outils précédemment configurés ne sont plus disponibles : ${unknownTools.join(', ')}`);
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // UPGRADE PATH: If tools already configured, show all tools with configured at top
    // ─────────────────────────────────────────────────────────────────────────────
    if (configuredIdes.length > 0) {
      const allTools = [...preferredIdes, ...otherIdes];

      // Non-interactive: handle --tools and --yes flags before interactive prompt
      // Use !== undefined so an explicit --tools "" falls through to _parseToolsFlag and
      // gets a specific "passed empty" error instead of being silently ignored.
      if (options.tools !== undefined) {
        const selectedIdes = this._parseToolsFlag(options.tools, allKnownValues);
        await prompts.log.info(`Utilisation des outils depuis la ligne de commande : ${selectedIdes.join(', ')}`);
        await this.displaySelectedTools(selectedIdes, preferredIdes, allTools);
        return { ides: selectedIdes, skipIde: false };
      }

      if (options.yes) {
        await prompts.log.info(`Mode non interactif (--yes) : conservation des outils configurés : ${configuredIdes.join(', ')}`);
        await this.displaySelectedTools(configuredIdes, preferredIdes, allTools);
        return { ides: configuredIdes, skipIde: false };
      }

      // Sort: configured tools first, then preferred, then others
      const sortedTools = [
        ...allTools.filter((ide) => configuredIdes.includes(ide.value)),
        ...allTools.filter((ide) => !configuredIdes.includes(ide.value)),
      ];

      const upgradeOptions = sortedTools.map((ide) => {
        const isConfigured = configuredIdes.includes(ide.value);
        const isPreferred = preferredIdes.some((p) => p.value === ide.value);
        let label = ide.name;
        if (isPreferred) label += ' ⭐';
        if (isConfigured) label += ' ✅';
        return { label, value: ide.value };
      });

      // Sort initialValues to match display order
      const sortedInitialValues = sortedTools.filter((ide) => configuredIdes.includes(ide.value)).map((ide) => ide.value);

      const upgradeSelected = await prompts.autocompleteMultiselect({
        message: 'Intégrer avec',
        options: upgradeOptions,
        initialValues: sortedInitialValues,
        required: false,
        maxItems: 8,
      });

      const selectedIdes = upgradeSelected || [];

      if (selectedIdes.length === 0) {
        const confirmNoTools = await prompts.confirm({
          message: 'Aucun outil sélectionné. Continuer sans installer d\'outil ?',
          default: false,
        });

        if (!confirmNoTools) {
          return this.promptToolSelection(projectDir, options);
        }

        return { ides: [], skipIde: true };
      }

      // Display selected tools
      await this.displaySelectedTools(selectedIdes, preferredIdes, allTools);

      return { ides: selectedIdes, skipIde: false };
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // NEW INSTALL: Show all tools with search
    // ─────────────────────────────────────────────────────────────────────────────
    const allTools = [...preferredIdes, ...otherIdes];

    const allToolOptions = allTools.map((ide) => {
      const isPreferred = preferredIdes.some((p) => p.value === ide.value);
      let label = ide.name;
      if (isPreferred) label += ' ⭐';
      return {
        label,
        value: ide.value,
      };
    });

    let selectedIdes = [];

    // Check if tools are provided via command-line.
    // Use !== undefined so an explicit --tools "" still hits _parseToolsFlag's empty-value error.
    if (options.tools !== undefined) {
      selectedIdes = this._parseToolsFlag(options.tools, allKnownValues);
      await prompts.log.info(`Utilisation des outils depuis la ligne de commande : ${selectedIdes.join(', ')}`);
      await this.displaySelectedTools(selectedIdes, preferredIdes, allTools);
      return { ides: selectedIdes, skipIde: false };
    } else if (options.yes) {
      // If --yes flag is set, skip tool prompt and use previously configured tools or empty
      if (configuredIdes.length > 0) {
        await prompts.log.info(`Utilisation des outils précédemment configurés (option --yes) : ${configuredIdes.join(', ')}`);
        await this.displaySelectedTools(configuredIdes, preferredIdes, allTools);
        return { ides: configuredIdes, skipIde: false };
      } else {
        const err = new Error(
          [
            '--tools est requis pour une installation non interactive (--yes / -y) lorsque aucun outil n\'a été configuré au préalable.',
            '',
            'Courants : claude-code, cursor, copilot, windsurf, cline',
            'Voir tous les outils pris en charge : bmad-method install --list-tools',
            '',
            'Exemple : bmad-method install --modules bmm --tools claude-code -y',
          ].join('\n'),
        );
        err.expected = true;
        throw err;
      }
    }

    // Interactive mode
    const interactiveSelectedIdes = await prompts.autocompleteMultiselect({
      message: 'Intégrer avec :',
      options: allToolOptions,
      initialValues: configuredIdes.length > 0 ? configuredIdes : undefined,
      required: false,
      maxItems: 8,
    });

    selectedIdes = interactiveSelectedIdes || [];

    // ─────────────────────────────────────────────────────────────────────────────
    // STEP 3: Confirm if no tools selected
    // ─────────────────────────────────────────────────────────────────────────────
    if (selectedIdes.length === 0) {
      const confirmNoTools = await prompts.confirm({
        message: 'Aucun outil sélectionné. Continuer sans installer d\'outil ?',
        default: false,
      });

      if (!confirmNoTools) {
        // User wants to select tools - recurse
        return this.promptToolSelection(projectDir, options);
      }

      return {
        ides: [],
        skipIde: true,
      };
    }

    // Display selected tools
    await this.displaySelectedTools(selectedIdes, preferredIdes, allTools);

    return {
      ides: selectedIdes,
      skipIde: selectedIdes.length === 0,
    };
  }

  /**
   * Prompt for update configuration
   * @returns {Object} Update configuration
   */
  async promptUpdate() {
    const backupFirst = await prompts.confirm({
      message: 'Créer une sauvegarde avant la mise à jour ?',
      default: true,
    });

    const preserveCustomizations = await prompts.confirm({
      message: 'Préserver les personnalisations locales ?',
      default: true,
    });

    return { backupFirst, preserveCustomizations };
  }

  /**
   * Confirm action
   * @param {string} message - Confirmation message
   * @param {boolean} defaultValue - Default value
   * @returns {boolean} User confirmation
   */
  async confirm(message, defaultValue = false) {
    return await prompts.confirm({
      message,
      default: defaultValue,
    });
  }

  /**
   * Get confirmed directory from user
   * @returns {string} Confirmed directory path
   */
  async getConfirmedDirectory() {
    let confirmedDirectory = null;
    while (!confirmedDirectory) {
      const directoryAnswer = await this.promptForDirectory();
      await this.displayDirectoryInfo(directoryAnswer.directory);

      if (await this.confirmDirectory(directoryAnswer.directory)) {
        confirmedDirectory = directoryAnswer.directory;
      }
    }
    return confirmedDirectory;
  }

  /**
   * Get existing installation info and installed modules
   * @param {string} directory - Installation directory
   * @returns {Object} Object with existingInstall, installedModuleIds, installedModuleVersions, and bmadDir
   */
  async getExistingInstallation(directory) {
    const { ExistingInstall } = require('./core/existing-install');
    const { Installer } = require('./core/installer');
    const installer = new Installer();
    const { bmadDir } = await installer.findBmadDir(directory);
    const existingInstall = await ExistingInstall.detect(bmadDir);
    const installedModuleIds = new Set(existingInstall.moduleIds);
    const installedModuleVersions = new Map();
    const manifestModules = await manifest.getAllModuleVersions(bmadDir);

    for (const module of manifestModules) {
      if (module?.name && module.version) {
        installedModuleVersions.set(module.name, module.version);
      }
    }

    for (const module of existingInstall.modules) {
      if (module?.id && module.version && module.version !== 'unknown' && !installedModuleVersions.has(module.id)) {
        installedModuleVersions.set(module.id, module.version);
      }
    }

    if (existingInstall.hasCore && existingInstall.version && !installedModuleVersions.has('core')) {
      installedModuleVersions.set('core', existingInstall.version);
    }

    return { existingInstall, installedModuleIds, installedModuleVersions, bmadDir };
  }

  /**
   * Collect all module configurations (core + selected modules).
   * All interactive prompting happens here in the UI layer.
   * @param {string} directory - Installation directory
   * @param {string[]} modules - Modules to configure (including 'core')
   * @param {Object} options - Command-line options
   * @returns {Object} Collected module configurations keyed by module name
   */
  async collectModuleConfigs(directory, modules, options = {}) {
    const { OfficialModules } = require('./modules/official-modules');

    // Parse --set up front purely to surface user-error before the install
    // burns time on the network / filesystem. The actual application happens
    // in installer.install() as a post-write TOML patch — see
    // `tools/installer/set-overrides.js`. We also warn about overrides
    // targeting modules the user didn't include, since those will silently
    // miss the file the patch step looks for.
    let setOverrides = {};
    try {
      setOverrides = parseSetEntries(options.set || []);
    } catch (error) {
      // install.js validated already; rethrow as-is for the user.
      throw error;
    }
    // Drop overrides for modules that aren't in the install set so the
    // post-install patch step doesn't create orphan sections in config.toml
    // for modules that were never installed.
    const selectedModuleSet = new Set(['core', ...modules]);
    for (const moduleCode of Object.keys(setOverrides)) {
      if (!selectedModuleSet.has(moduleCode)) {
        await prompts.log.warn(
          `--set ${moduleCode}.* — le module '${moduleCode}' n'est pas dans le jeu d'installation ; les valeurs seront ignorées. Ajoutez-le à --modules pour l'appliquer.`,
        );
        delete setOverrides[moduleCode];
      }
    }

    const configCollector = new OfficialModules({ channelOptions: options.channelOptions });

    // Seed core config from CLI options if provided
    if (options.userName || options.communicationLanguage || options.documentOutputLanguage || options.outputFolder) {
      const coreConfig = {};
      if (options.userName) {
        coreConfig.user_name = options.userName;
        await prompts.log.info(`Utilisation du nom d'utilisateur depuis la ligne de commande : ${options.userName}`);
      }
      if (options.communicationLanguage) {
        coreConfig.communication_language = options.communicationLanguage;
        await prompts.log.info(`Utilisation de la langue de communication depuis la ligne de commande : ${options.communicationLanguage}`);
      }
      if (options.documentOutputLanguage) {
        coreConfig.document_output_language = options.documentOutputLanguage;
        await prompts.log.info(`Utilisation de la langue de sortie des documents depuis la ligne de commande : ${options.documentOutputLanguage}`);
      }
      if (options.outputFolder) {
        coreConfig.output_folder = options.outputFolder;
        await prompts.log.info(`Utilisation du dossier de sortie depuis la ligne de commande : ${options.outputFolder}`);
      }

      // Load existing config to merge with provided options
      await configCollector.loadExistingConfig(directory);
      const existingConfig = configCollector.collectedConfig.core || {};
      configCollector.collectedConfig.core = { ...existingConfig, ...coreConfig };

      // If not all options are provided, collect the missing ones interactively (unless --yes flag)
      if (
        !options.yes &&
        (!options.userName || !options.communicationLanguage || !options.documentOutputLanguage || !options.outputFolder)
      ) {
        await configCollector.collectModuleConfig('core', directory, false, true);
      }
    } else if (options.yes) {
      // Use all defaults when --yes flag is set
      await configCollector.loadExistingConfig(directory);
      const existingConfig = configCollector.collectedConfig.core || {};

      if (Object.keys(existingConfig).length === 0) {
        let safeUsername;
        try {
          safeUsername = os.userInfo().username;
        } catch {
          safeUsername = process.env.USER || process.env.USERNAME || 'User';
        }
        const defaultUsername = safeUsername.charAt(0).toUpperCase() + safeUsername.slice(1);
        configCollector.collectedConfig.core = {
          user_name: defaultUsername,
          // {directory_name} default per src/core-skills/module.yaml — matches what the
          // interactive flow resolves via buildQuestion()'s {directory_name} placeholder.
          project_name: path.basename(directory),
          communication_language: 'English',
          document_output_language: 'English',
          output_folder: '_bmad-output',
        };
        await prompts.log.info('Utilisation de la configuration par défaut (option --yes)');
      }
    }

    // Collect all module configs — core is skipped if already seeded above
    await configCollector.collectAllConfigurations(modules, directory, {
      skipPrompts: options.yes || false,
    });

    return { moduleConfigs: configCollector.collectedConfig, setOverrides };
  }

  /**
   * Select all modules across three tiers: official, community, and custom URL.
   * @param {Set} installedModuleIds - Currently installed module IDs
   * @param {Map<string, string>} installedModuleVersions - Installed module versions from the local manifest
   * @param {Object|null} channelOptions - Parsed installer channel options
   * @returns {Array} Selected module codes (excluding core)
   */
  async selectAllModules(installedModuleIds = new Set(), installedModuleVersions = new Map(), channelOptions = null) {
    // Phase 1: Official modules
    const officialSelected = await this._selectOfficialModules(installedModuleIds, installedModuleVersions, channelOptions);

    // Determine which installed modules are NOT official (community or custom).
    // These must be preserved even if the user declines to browse community/custom.
    const officialCodes = new Set(officialSelected);
    const externalManager = new ExternalModuleManager();
    const registryModules = await externalManager.listAvailable();
    const officialRegistryCodes = new Set(['core', 'bmm', ...registryModules.map((m) => m.code)]);
    const installedNonOfficial = [...installedModuleIds].filter((id) => !officialRegistryCodes.has(id));

    // Phase 2: Community modules (category drill-down)
    // Returns { codes, didBrowse } so we know if the user entered the flow
    const communityResult = await this._browseCommunityModules(installedModuleIds);

    // Phase 3: Custom URL modules
    const customSelected = await this._addCustomUrlModules(installedModuleIds);

    // Merge all selections
    const allSelected = new Set([...officialSelected, ...communityResult.codes, ...customSelected]);

    // Auto-include installed non-official modules that the user didn't get
    // a chance to manage (they declined to browse). If they did browse,
    // trust their selections - they could have deselected intentionally.
    if (!communityResult.didBrowse) {
      for (const code of installedNonOfficial) {
        allSelected.add(code);
      }
    }

    return [...allSelected];
  }

  /**
   * Select official modules using autocompleteMultiselect.
   * Extracted from the original selectAllModules - unchanged behavior.
   * @param {Set} installedModuleIds - Currently installed module IDs
   * @param {Map<string, string>} installedModuleVersions - Installed module versions from the local manifest
   * @param {Object|null} channelOptions - Parsed installer channel options
   * @returns {Array} Selected official module codes
   */
  async _selectOfficialModules(installedModuleIds = new Set(), installedModuleVersions = new Map(), channelOptions = null) {
    // Built-in modules (core, bmm) come from local source, not the registry
    const { OfficialModules } = require('./modules/official-modules');
    const builtInModules = (await new OfficialModules().listAvailable()).modules || [];

    // External modules come from the registry (with fallback)
    const externalManager = new ExternalModuleManager();
    const registryModules = await externalManager.listAvailable();

    const allOptions = [];
    const initialValues = [];
    const lockedValues = ['core'];

    const buildModuleEntry = async (code, name, description, isDefault, repoUrl = null, registryDefault = null) => {
      const isInstalled = installedModuleIds.has(code);
      const installedVersion = installedModuleVersions.get(code) || '';
      const versionState = await getModuleVersion(code, { repoUrl, registryDefault, channelOptions });
      const label = buildModuleLabel(name, versionState.version, installedVersion);
      return {
        label,
        value: code,
        hint: description,
        selected: isInstalled || isDefault,
        lookupAttempted: versionState.lookupAttempted,
        lookupSucceeded: versionState.lookupSucceeded,
      };
    };

    // Add built-in modules first (always available regardless of network)
    const builtInCodes = new Set();
    for (const mod of builtInModules) {
      const code = mod.id;
      builtInCodes.add(code);
      const entry = await buildModuleEntry(code, mod.name, mod.description, mod.defaultSelected);
      allOptions.push({ label: entry.label, value: entry.value, hint: entry.hint });
      if (entry.selected) {
        initialValues.push(code);
      }
    }

    // Add external registry modules (skip built-in duplicates)
    const externalRegistryModules = registryModules.filter((mod) => !mod.builtIn && !builtInCodes.has(mod.code));
    let externalRegistryEntries = [];
    if (externalRegistryModules.length > 0) {
      const spinner = await prompts.spinner();
      spinner.start('Vérification des dernières versions des modules...');

      externalRegistryEntries = await Promise.all(
        externalRegistryModules.map(async (mod) => ({
          code: mod.code,
          entry: await buildModuleEntry(
            mod.code,
            mod.name,
            mod.description,
            mod.defaultSelected,
            mod.url || null,
            mod.defaultChannel || null,
          ),
        })),
      );

      spinner.stop('Dernières versions des modules vérifiées.');

      const attemptedLookups = externalRegistryEntries.filter(({ entry }) => entry.lookupAttempted).length;
      const successfulLookups = externalRegistryEntries.filter(({ entry }) => entry.lookupSucceeded).length;
      if (attemptedLookups > 0 && successfulLookups === 0) {
        await prompts.log.warn('Impossible de vérifier les dernières versions des modules ; affichage des versions en cache/locales.');
      }
    }
    for (const { code, entry } of externalRegistryEntries) {
      allOptions.push({ label: entry.label, value: entry.value, hint: entry.hint });
      if (entry.selected) {
        initialValues.push(code);
      }
    }

    const selected = await prompts.autocompleteMultiselect({
      message: 'Sélectionner les modules officiels à installer :',
      options: allOptions,
      initialValues: initialValues.length > 0 ? initialValues : undefined,
      lockedValues,
      required: true,
      maxItems: allOptions.length,
    });

    const result = selected ? [...selected] : [];

    if (result.length > 0) {
      const moduleLines = result.map((moduleId) => {
        const opt = allOptions.find((o) => o.value === moduleId);
        return `  \u2022 ${opt?.label || moduleId}`;
      });
      await prompts.log.message('Modules officiels sélectionnés :\n' + moduleLines.join('\n'));
    }

    return result;
  }

  /**
   * Browse and select community modules using category drill-down.
   * Featured/promoted modules appear at the top.
   * @param {Set} installedModuleIds - Currently installed module IDs
   * @returns {Object} { codes: string[], didBrowse: boolean }
   */
  async _browseCommunityModules(installedModuleIds = new Set()) {
    const browseCommunity = await prompts.confirm({
      message: 'Souhaitez-vous parcourir les modules communautaires ?',
      default: false,
    });
    if (!browseCommunity) return { codes: [], didBrowse: false };

    const { CommunityModuleManager } = require('./modules/community-manager');
    const communityMgr = new CommunityModuleManager();

    const s = await prompts.spinner();
    s.start('Chargement du catalogue des modules communautaires...');

    let categories, featured, allCommunity;
    try {
      [categories, featured, allCommunity] = await Promise.all([
        communityMgr.getCategoryList(),
        communityMgr.listFeatured(),
        communityMgr.listAll(),
      ]);
      s.stop(`Catalogue communautaire chargé (${allCommunity.length} modules)`);
    } catch (error) {
      s.error('Échec du chargement du catalogue communautaire');
      await prompts.log.warn(`  ${error.message}`);
      return { codes: [], didBrowse: false };
    }

    if (allCommunity.length === 0) {
      await prompts.log.info('Aucun module communautaire n\'est actuellement disponible.');
      return { codes: [], didBrowse: false };
    }

    const selectedCodes = new Set();
    let browsing = true;

    while (browsing) {
      const categoryChoices = [];

      // Featured section at top
      if (featured.length > 0) {
        categoryChoices.push({
          value: '__featured__',
          label: `\u2605 \u00c0 la une (${featured.length} module${featured.length === 1 ? '' : 's'})`,
        });
      }

      // Categories with module counts
      for (const cat of categories) {
        categoryChoices.push({
          value: cat.slug,
          label: `${cat.name} (${cat.moduleCount} module${cat.moduleCount === 1 ? '' : 's'})`,
        });
      }

      // Special actions at bottom
      categoryChoices.push(
        { value: '__all__', label: '\u25CE Voir tous les modules communautaires' },
        { value: '__search__', label: '\u25CE Rechercher par mot-cl\u00E9' },
        { value: '__done__', label: '\u2713 Terminer la navigation' },
      );

      const selectedCount = selectedCodes.size;
      const categoryChoice = await prompts.select({
        message: `Parcourir les modules communautaires${selectedCount > 0 ? ` (${selectedCount} s\u00E9lectionn\u00E9${selectedCount > 1 ? 's' : ''})` : ''} :`,
        choices: categoryChoices,
      });

      if (categoryChoice === '__done__') {
        browsing = false;
        continue;
      }

      let modulesToShow;
      switch (categoryChoice) {
        case '__featured__': {
          modulesToShow = featured;

          break;
        }
        case '__all__': {
          modulesToShow = allCommunity;

          break;
        }
        case '__search__': {
          const query = await prompts.text({
            message: 'Rechercher des modules communautaires :',
            placeholder: 'ex. design, testing, game',
          });
          if (!query || query.trim() === '') continue;
          modulesToShow = await communityMgr.searchByKeyword(query.trim());
          if (modulesToShow.length === 0) {
            await prompts.log.warn('Aucun module correspondant trouvé.');
            continue;
          }

          break;
        }
        default: {
          modulesToShow = await communityMgr.listByCategory(categoryChoice);
        }
      }

      // Build options for autocompleteMultiselect
      const trustBadge = (tier) => {
        if (tier === 'bmad-certified') return '\u2713';
        if (tier === 'community-reviewed') return '\u25CB';
        return '\u26A0';
      };

      const options = modulesToShow.map((mod) => {
        const versionStr = mod.version ? ` (v${mod.version})` : '';
        const badge = trustBadge(mod.trustTier);
        return {
          label: `${mod.displayName}${versionStr} [${badge}]`,
          value: mod.code,
          hint: mod.description,
        };
      });

      // Pre-check modules that are already selected or installed
      const initialValues = modulesToShow.filter((m) => selectedCodes.has(m.code) || installedModuleIds.has(m.code)).map((m) => m.code);

      const selected = await prompts.autocompleteMultiselect({
        message: 'Sélectionner les modules communautaires :',
        options,
        initialValues: initialValues.length > 0 ? initialValues : undefined,
        required: false,
        maxItems: Math.min(options.length, 10),
      });

      // Update accumulated selections: sync with what user selected in this view
      const shownCodes = new Set(modulesToShow.map((m) => m.code));
      for (const code of shownCodes) {
        if (selected && selected.includes(code)) {
          selectedCodes.add(code);
        } else {
          selectedCodes.delete(code);
        }
      }
    }

    if (selectedCodes.size > 0) {
      const moduleLines = [];
      for (const code of selectedCodes) {
        const mod = await communityMgr.getModuleByCode(code);
        moduleLines.push(`  \u2022 ${mod?.displayName || code}`);
      }
      await prompts.log.message('Modules communautaires sélectionnés :\n' + moduleLines.join('\n'));
    }

    return { codes: [...selectedCodes], didBrowse: true };
  }

  /**
   * Prompt user to install modules from custom sources (Git URLs or local paths).
   * @param {Set} installedModuleIds - Currently installed module IDs
   * @returns {Array} Selected custom module code strings
   */
  async _addCustomUrlModules(installedModuleIds = new Set()) {
    const addCustom = await prompts.confirm({
      message: 'Souhaitez-vous installer depuis une source personnalisée (URL Git ou chemin local) ?',
      default: false,
    });
    if (!addCustom) return [];

    const { CustomModuleManager } = require('./modules/custom-module-manager');
    const customMgr = new CustomModuleManager();
    const selectedModules = [];

    let addMore = true;
    while (addMore) {
      const sourceInput = await prompts.text({
        message: 'URL Git ou chemin local :',
        placeholder: 'https://github.com/owner/repo ou /path/to/module',
        validate: (input) => {
          if (!input || input.trim() === '') return 'La source est requise';
          const result = customMgr.parseSource(input.trim());
          return result.isValid ? undefined : result.error;
        },
      });

      const s = await prompts.spinner();
      s.start('Résolution de la source...');

      let sourceResult;
      try {
        sourceResult = await customMgr.resolveSource(sourceInput.trim(), { skipInstall: true, silent: true });
        s.stop(sourceResult.parsed.type === 'local' ? 'Source locale résolue' : 'Dépôt cloné');
      } catch (error) {
        s.error('Échec de la résolution de la source');
        await prompts.log.error(`  ${error.message}`);
        addMore = await prompts.confirm({ message: 'Essayer une autre source ?', default: false });
        continue;
      }

      if (sourceResult.parsed.type === 'local') {
        await prompts.log.info('MODULE LOCAL : Pointage direct vers la source locale (les modifications prennent effet à la réinstallation).');
      } else {
        await prompts.log.warn(
          'MODULE NON VÉRIFIÉ : Ce module n\'a pas été examiné par l\'équipe BMad.\n' + '  N\'installez que des modules provenant de sources de confiance.',
        );
      }

      // Resolve plugins based on discovery mode vs direct mode
      s.start('Analyse de la structure du plugin...');
      const allResolved = [];
      const localPath = sourceResult.parsed.type === 'local' ? sourceResult.rootDir : null;

      if (sourceResult.mode === 'discovery') {
        // Discovery mode: marketplace.json found, list available plugins
        let plugins;
        try {
          plugins = await customMgr.discoverModules(sourceResult.marketplace, sourceResult.sourceUrl);
        } catch (discoverError) {
          s.error('Échec de la découverte des modules');
          await prompts.log.error(`  ${discoverError.message}`);
          addMore = await prompts.confirm({ message: 'Essayer une autre source ?', default: false });
          continue;
        }

        const effectiveRepoPath = sourceResult.repoPath || sourceResult.rootDir;
        for (const plugin of plugins) {
          try {
            const resolved = await customMgr.resolvePlugin(effectiveRepoPath, plugin.rawPlugin, sourceResult.sourceUrl, localPath);
            if (resolved.length > 0) {
              allResolved.push(...resolved);
            } else {
              // No skills array or empty - use plugin metadata as-is (legacy)
              allResolved.push({
                code: plugin.code,
                name: plugin.displayName || plugin.name,
                version: plugin.version,
                description: plugin.description,
                strategy: 0,
                pluginName: plugin.name,
                skillPaths: [],
              });
            }
          } catch (resolveError) {
            await prompts.log.warn(`  Impossible de résoudre ${plugin.name} : ${resolveError.message}`);
          }
        }
      } else {
        // Direct mode: no marketplace.json, scan directory for skills and resolve
        const directPlugin = {
          name: sourceResult.parsed.displayName || path.basename(sourceResult.rootDir),
          source: '.',
          skills: [],
        };

        // Scan for SKILL.md directories to populate skills array
        try {
          const entries = await fs.readdir(sourceResult.rootDir, { withFileTypes: true });
          for (const entry of entries) {
            if (entry.isDirectory()) {
              const skillMd = path.join(sourceResult.rootDir, entry.name, 'SKILL.md');
              if (await fs.pathExists(skillMd)) {
                directPlugin.skills.push(entry.name);
              }
            }
          }
        } catch (scanError) {
          s.error('Échec de l\'analyse du répertoire');
          await prompts.log.error(`  ${scanError.message}`);
          addMore = await prompts.confirm({ message: 'Essayer une autre source ?', default: false });
          continue;
        }

        if (directPlugin.skills.length > 0) {
          try {
            const resolved = await customMgr.resolvePlugin(sourceResult.rootDir, directPlugin, sourceResult.sourceUrl, localPath);
            allResolved.push(...resolved);
          } catch (resolveError) {
            await prompts.log.warn(`  Impossible de résoudre : ${resolveError.message}`);
          }
        }
      }
      s.stop(`${allResolved.length} module${allResolved.length === 1 ? '' : 's'} installable${allResolved.length === 1 ? '' : 's'} trouvé${allResolved.length === 1 ? '' : 's'}`);

      if (allResolved.length === 0) {
        await prompts.log.warn('Aucun module installable trouvé dans cette source.');
        addMore = await prompts.confirm({ message: 'Essayer une autre source ?', default: false });
        continue;
      }

      // Build multiselect choices
      // Already-installed modules are pre-checked (update). New modules are unchecked (opt-in).
      // Unchecking an installed module means "skip update" - removal is handled elsewhere.
      const choices = allResolved.map((mod) => {
        const versionStr = mod.version ? ` v${mod.version}` : '';
        const skillCount = mod.skillPaths ? mod.skillPaths.length : 0;
        const skillStr = skillCount > 0 ? ` (${skillCount} Skill${skillCount === 1 ? '' : 's'})` : '';
        const alreadyInstalled = installedModuleIds.has(mod.code);
        const hint = alreadyInstalled ? 'mise à jour' : undefined;

        return {
          name: `${mod.name}${versionStr}${skillStr}`,
          value: mod.code,
          hint,
          checked: alreadyInstalled,
        };
      });

      // Show descriptions before the multiselect
      for (const mod of allResolved) {
        const versionStr = mod.version ? ` v${mod.version}` : '';
        await prompts.log.info(`  ${mod.name}${versionStr}\n  ${mod.description}`);
      }

      const selected = await prompts.multiselect({
        message: 'S\u00e9lectionner les modules \u00e0 installer :',
        choices,
        required: false,
      });

      if (selected && selected.length > 0) {
        for (const code of selected) {
          selectedModules.push(code);
        }
      }

      addMore = await prompts.confirm({
        message: 'Ajouter une autre source personnalis\u00e9e ?',
        default: false,
      });
    }

    if (selectedModules.length > 0) {
      await prompts.log.message('Modules personnalis\u00e9s s\u00e9lectionn\u00e9s :\n' + selectedModules.map((c) => `  \u2022 ${c}`).join('\n'));
    }

    return selectedModules;
  }

  /**
   * Resolve custom sources from --custom-source CLI flag (non-interactive).
   * Auto-selects all discovered modules from each source.
   * @param {string} sourcesArg - Comma-separated Git URLs or local paths
   * @returns {Array} Module codes from all resolved sources
   */
  async _resolveCustomSourcesCli(sourcesArg) {
    const { CustomModuleManager } = require('./modules/custom-module-manager');
    const customMgr = new CustomModuleManager();
    const allCodes = [];

    const sources = sourcesArg
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    for (const source of sources) {
      const s = await prompts.spinner();
      s.start(`Résolution de ${source}...`);

      let sourceResult;
      try {
        sourceResult = await customMgr.resolveSource(source, { skipInstall: true, silent: true });
        s.stop(sourceResult.parsed.type === 'local' ? 'Source locale résolue' : 'Dépôt cloné');
      } catch (error) {
        s.error(`Échec de la résolution de ${source}`);
        await prompts.log.error(`  ${error.message}`);
        continue;
      }

      const s2 = await prompts.spinner();
      s2.start('Analyse de la structure du plugin...');
      const allResolved = [];
      const localPath = sourceResult.parsed.type === 'local' ? sourceResult.rootDir : null;

      if (sourceResult.mode === 'discovery') {
        try {
          const plugins = await customMgr.discoverModules(sourceResult.marketplace, sourceResult.sourceUrl);
          const effectiveRepoPath = sourceResult.repoPath || sourceResult.rootDir;
          for (const plugin of plugins) {
            try {
              const resolved = await customMgr.resolvePlugin(effectiveRepoPath, plugin.rawPlugin, sourceResult.sourceUrl, localPath);
              if (resolved.length > 0) {
                allResolved.push(...resolved);
              }
            } catch {
              // Skip unresolvable plugins
            }
          }
        } catch (discoverError) {
          s2.error('Échec de la découverte des modules');
          await prompts.log.error(`  ${discoverError.message}`);
          continue;
        }
      } else {
        // Direct mode: scan for SKILL.md directories
        const directPlugin = {
          name: sourceResult.parsed.displayName || path.basename(sourceResult.rootDir),
          source: '.',
          skills: [],
        };
        try {
          const entries = await fs.readdir(sourceResult.rootDir, { withFileTypes: true });
          for (const entry of entries) {
            if (entry.isDirectory()) {
              const skillMd = path.join(sourceResult.rootDir, entry.name, 'SKILL.md');
              if (await fs.pathExists(skillMd)) {
                directPlugin.skills.push(entry.name);
              }
            }
          }
        } catch {
          // Skip unreadable directories
        }

        if (directPlugin.skills.length > 0) {
          try {
            const resolved = await customMgr.resolvePlugin(sourceResult.rootDir, directPlugin, sourceResult.sourceUrl, localPath);
            allResolved.push(...resolved);
          } catch {
            // Skip unresolvable
          }
        }
      }
      s2.stop(`${allResolved.length} module${allResolved.length === 1 ? '' : 's'} trouvé${allResolved.length === 1 ? '' : 's'}`);

      for (const mod of allResolved) {
        allCodes.push(mod.code);
        const versionStr = mod.version ? ` v${mod.version}` : '';
        await prompts.log.info(`  Module personnalisé : ${mod.name}${versionStr}`);
      }
    }

    return allCodes;
  }

  /**
   * Get default modules for non-interactive mode
   * @param {Set} installedModuleIds - Already installed module IDs
   * @returns {Array} Default module codes
   */
  async getDefaultModules(installedModuleIds = new Set()) {
    // Built-in modules with default_selected come from local source
    const { OfficialModules } = require('./modules/official-modules');
    const builtInModules = (await new OfficialModules().listAvailable()).modules || [];

    const defaultModules = [];
    const seen = new Set();

    for (const mod of builtInModules) {
      if (mod.defaultSelected || installedModuleIds.has(mod.id)) {
        defaultModules.push(mod.id);
        seen.add(mod.id);
      }
    }

    // Add external registry defaults
    const externalManager = new ExternalModuleManager();
    const registryModules = await externalManager.listAvailable();

    for (const mod of registryModules) {
      if (mod.builtIn || seen.has(mod.code)) continue;
      if (mod.defaultSelected || installedModuleIds.has(mod.code)) {
        defaultModules.push(mod.code);
      }
    }

    // If no defaults found, use 'bmm' as the fallback default
    if (defaultModules.length === 0) {
      defaultModules.push('bmm');
    }

    return defaultModules;
  }

  /**
   * Prompt for directory selection
   * @returns {Object} Directory answer from prompt
   */
  async promptForDirectory() {
    // Use sync validation because @clack/prompts doesn't support async validate
    const directory = await prompts.text({
      message: 'Répertoire d\'installation :',
      default: process.cwd(),
      placeholder: process.cwd(),
      validate: (input) => this.validateDirectorySync(input),
    });

    // Apply filter logic
    let filteredDir = directory;
    if (!filteredDir || filteredDir.trim() === '') {
      filteredDir = process.cwd();
    } else {
      filteredDir = this.expandUserPath(filteredDir);
    }

    return { directory: filteredDir };
  }

  /**
   * Display directory information
   * @param {string} directory - The directory path
   */
  async displayDirectoryInfo(directory) {
    await prompts.log.info(`Chemin d'installation résolu : ${directory}`);

    const dirExists = await fs.pathExists(directory);
    if (dirExists) {
      // Show helpful context about the existing path
      const stats = await fs.stat(directory);
      if (stats.isDirectory()) {
        const files = await fs.readdir(directory);
        if (files.length > 0) {
          // Check for any bmad installation (any folder with _config/manifest.yaml)
          const { Installer } = require('./core/installer');
          const installer = new Installer();
          const bmadResult = await installer.findBmadDir(directory);
          const hasBmadInstall =
            (await fs.pathExists(bmadResult.bmadDir)) && (await fs.pathExists(path.join(bmadResult.bmadDir, '_config', 'manifest.yaml')));

          const bmadNote = hasBmadInstall ? ` incluant une installation BMAD existante (${path.basename(bmadResult.bmadDir)})` : '';
          await prompts.log.message(`Le répertoire existe et contient ${files.length} élément(s)${bmadNote}`);
        } else {
          await prompts.log.message('Le répertoire existe et est vide');
        }
      }
    }
  }

  /**
   * Confirm directory selection
   * @param {string} directory - The directory path
   * @returns {boolean} Whether user confirmed
   */
  async confirmDirectory(directory) {
    const dirExists = await fs.pathExists(directory);

    if (dirExists) {
      const proceed = await prompts.confirm({
        message: 'Installer dans ce répertoire ?',
        default: true,
      });

      if (!proceed) {
        await prompts.log.warn('Réessayons avec un chemin différent.');
      }

      return proceed;
    } else {
      // Ask for confirmation to create the directory
      const create = await prompts.confirm({
        message: `Créer le répertoire : ${directory} ?`,
        default: false,
      });

      if (!create) {
        await prompts.log.warn('Réessayons avec un chemin différent.');
      }

      return create;
    }
  }

  /**
   * Validate directory path for installation (sync version for clack prompts)
   * @param {string} input - User input path
   * @returns {string|undefined} Error message or undefined if valid
   */
  validateDirectorySync(input) {
    // Allow empty input to use the default
    if (!input || input.trim() === '') {
      return; // Empty means use default, undefined = valid for clack
    }

    let expandedPath;
    try {
      expandedPath = this.expandUserPath(input.trim());
    } catch (error) {
      return error.message;
    }

    // Check if the path exists
    const pathExists = fs.pathExistsSync(expandedPath);

    if (!pathExists) {
      // Find the first existing parent directory
      const existingParent = this.findExistingParentSync(expandedPath);

      if (!existingParent) {
        return 'Impossible de créer le répertoire : aucun répertoire parent existant trouvé';
      }

      // Check if the existing parent is writable
      try {
        fs.accessSync(existingParent, fs.constants.W_OK);
        // Path doesn't exist but can be created - will prompt for confirmation later
        return;
      } catch {
        // Provide a detailed error message explaining both issues
        return `Le répertoire '${expandedPath}' n'existe pas et ne peut pas être créé : le répertoire parent '${existingParent}' n'est pas accessible en écriture`;
      }
    }

    // If it exists, validate it's a directory and writable
    const stat = fs.statSync(expandedPath);
    if (!stat.isDirectory()) {
      return `Le chemin existe mais n'est pas un répertoire : ${expandedPath}`;
    }

    // Check write permissions
    try {
      fs.accessSync(expandedPath, fs.constants.W_OK);
    } catch {
      return `Le répertoire n'est pas accessible en écriture : ${expandedPath}`;
    }

    return;
  }

  /**
   * Validate directory path for installation (async version)
   * @param {string} input - User input path
   * @returns {string|true} Error message or true if valid
   */
  async validateDirectory(input) {
    // Allow empty input to use the default
    if (!input || input.trim() === '') {
      return true; // Empty means use default
    }

    let expandedPath;
    try {
      expandedPath = this.expandUserPath(input.trim());
    } catch (error) {
      return error.message;
    }

    // Check if the path exists
    const pathExists = await fs.pathExists(expandedPath);

    if (!pathExists) {
      // Find the first existing parent directory
      const existingParent = await this.findExistingParent(expandedPath);

      if (!existingParent) {
        return 'Impossible de créer le répertoire : aucun répertoire parent existant trouvé';
      }

      // Check if the existing parent is writable
      try {
        await fs.access(existingParent, fs.constants.W_OK);
        // Path doesn't exist but can be created - will prompt for confirmation later
        return true;
      } catch {
        // Provide a detailed error message explaining both issues
        return `Le répertoire '${expandedPath}' n'existe pas et ne peut pas être créé : le répertoire parent '${existingParent}' n'est pas accessible en écriture`;
      }
    }

    // If it exists, validate it's a directory and writable
    const stat = await fs.stat(expandedPath);
    if (!stat.isDirectory()) {
      return `Le chemin existe mais n'est pas un répertoire : ${expandedPath}`;
    }

    // Check write permissions
    try {
      await fs.access(expandedPath, fs.constants.W_OK);
    } catch {
      return `Le répertoire n'est pas accessible en écriture : ${expandedPath}`;
    }

    return true;
  }

  /**
   * Find the first existing parent directory (sync version)
   * @param {string} targetPath - The path to check
   * @returns {string|null} The first existing parent directory, or null if none found
   */
  findExistingParentSync(targetPath) {
    let currentPath = path.resolve(targetPath);

    // Walk up the directory tree until we find an existing directory
    while (currentPath !== path.dirname(currentPath)) {
      // Stop at root
      const parent = path.dirname(currentPath);
      if (fs.pathExistsSync(parent)) {
        return parent;
      }
      currentPath = parent;
    }

    return null; // No existing parent found (shouldn't happen in practice)
  }

  /**
   * Find the first existing parent directory (async version)
   * @param {string} targetPath - The path to check
   * @returns {string|null} The first existing parent directory, or null if none found
   */
  async findExistingParent(targetPath) {
    let currentPath = path.resolve(targetPath);

    // Walk up the directory tree until we find an existing directory
    while (currentPath !== path.dirname(currentPath)) {
      // Stop at root
      const parent = path.dirname(currentPath);
      if (await fs.pathExists(parent)) {
        return parent;
      }
      currentPath = parent;
    }

    return null; // No existing parent found (shouldn't happen in practice)
  }

  /**
   * Expands the user-provided path: handles ~ and resolves to absolute.
   * @param {string} inputPath - User input path.
   * @returns {string} Absolute expanded path.
   */
  expandUserPath(inputPath) {
    if (typeof inputPath !== 'string') {
      throw new TypeError('Le chemin doit être une chaîne de caractères.');
    }

    let expanded = inputPath.trim();

    // Handle tilde expansion
    if (expanded.startsWith('~')) {
      if (expanded === '~') {
        expanded = os.homedir();
      } else if (expanded.startsWith('~' + path.sep)) {
        const pathAfterHome = expanded.slice(2); // Remove ~/ or ~\
        expanded = path.join(os.homedir(), pathAfterHome);
      } else {
        const restOfPath = expanded.slice(1);
        const separatorIndex = restOfPath.indexOf(path.sep);
        const username = separatorIndex === -1 ? restOfPath : restOfPath.slice(0, separatorIndex);
        if (username) {
          throw new Error(`L'expansion du chemin pour ~${username} n'est pas prise en charge. Veuillez utiliser un chemin absolu ou ~${path.sep}`);
        }
      }
    }

    // Resolve to the absolute path relative to the current working directory
    return path.resolve(expanded);
  }

  /**
   * Get configured IDEs from existing installation
   * @param {string} directory - Installation directory
   * @returns {Array} List of configured IDEs
   */
  async getConfiguredIdes(directory) {
    const { ExistingInstall } = require('./core/existing-install');
    const { Installer } = require('./core/installer');
    const installer = new Installer();
    const { bmadDir } = await installer.findBmadDir(directory);
    const existingInstall = await ExistingInstall.detect(bmadDir);
    return existingInstall.ides;
  }

  /**
   * Display module versions with update availability
   * @param {Array} modules - Array of module info objects with version info
   * @param {Array} availableUpdates - Array of available updates
   */
  async displayModuleVersions(modules, availableUpdates = []) {
    // Group modules by source
    const builtIn = modules.filter((m) => m.source === 'built-in');
    const external = modules.filter((m) => m.source === 'external');
    const community = modules.filter((m) => m.source === 'community');
    const custom = modules.filter((m) => m.source === 'custom');
    const unknown = modules.filter((m) => m.source === 'unknown');

    const lines = [];
    const formatGroup = (group, title) => {
      if (group.length === 0) return;
      lines.push(title);
      for (const mod of group) {
        const updateInfo = availableUpdates.find((u) => u.name === mod.name);
        const versionDisplay = mod.version || 'inconnue';
        if (updateInfo) {
          lines.push(`  ${mod.name.padEnd(20)} ${versionDisplay} \u2192 ${updateInfo.latestVersion} \u2191`);
        } else {
          lines.push(`  ${mod.name.padEnd(20)} ${versionDisplay} \u2713`);
        }
      }
    };

    formatGroup(builtIn, 'Modules intégrés');
    formatGroup(external, 'Modules externes (officiels)');
    formatGroup(community, 'Modules communautaires');
    formatGroup(custom, 'Modules personnalisés');
    formatGroup(unknown, 'Autres modules');

    await prompts.note(lines.join('\n'), 'Versions des modules');
  }

  /**
   * Prompt user to select which modules to update
   * @param {Array} availableUpdates - Array of available updates
   * @returns {Array} Selected module names to update
   */
  async promptUpdateSelection(availableUpdates) {
    if (availableUpdates.length === 0) {
      return [];
    }

    await prompts.log.info('Mises \u00e0 jour disponibles');

    const choices = availableUpdates.map((update) => ({
      name: `${update.name} (v${update.installedVersion} \u2192 v${update.latestVersion})`,
      value: update.name,
      checked: true, // Default to selecting all updates
    }));

    // Add "Update All" and "Cancel" options
    const action = await prompts.select({
      message: 'Comment souhaitez-vous proc\u00e9der ?',
      choices: [
        { name: 'Mettre \u00e0 jour tous les modules disponibles', value: 'all' },
        { name: 'S\u00e9lectionner les modules sp\u00e9cifiques \u00e0 mettre \u00e0 jour', value: 'select' },
        { name: 'Ignorer les mises \u00e0 jour pour l\'instant', value: 'skip' },
      ],
      default: 'all',
    });

    if (action === 'all') {
      return availableUpdates.map((u) => u.name);
    }

    if (action === 'skip') {
      return [];
    }

    // Allow specific selection
    const selected = await prompts.multiselect({
      message: 'Sélectionner les modules à mettre à jour (flèches pour naviguer, espace pour basculer) :',
      choices: choices,
      required: true,
    });

    return selected || [];
  }

  /**
   * Display status of all installed modules
   * @param {Object} statusData - Status data with modules, installation info, and available updates
   */
  async displayStatus(statusData) {
    const { installation, modules, availableUpdates, bmadDir } = statusData;

    // Installation info
    const infoLines = [
      `Version :         ${installation.version || 'inconnue'}`,
      `Emplacement :     ${bmadDir}`,
      `Installé le :     ${new Date(installation.installDate).toLocaleDateString()}`,
      `Dernière MAJ :    ${installation.lastUpdated ? new Date(installation.lastUpdated).toLocaleDateString() : 'inconnue'}`,
    ];

    await prompts.note(infoLines.join('\n'), 'État de BMAD');

    // Module versions
    await this.displayModuleVersions(modules, availableUpdates);

    // Update summary
    if (availableUpdates.length > 0) {
      await prompts.log.warn(`${availableUpdates.length} mise(s) à jour disponible(s)`);
      await prompts.log.message('Exécutez \'bmad install\' et sélectionnez « Mise à jour rapide » pour mettre à jour');
    } else {
      await prompts.log.success('Tous les modules sont à jour');
    }
  }

  /**
   * Display list of selected tools after IDE selection
   * @param {Array} selectedIdes - Array of selected IDE values
   * @param {Array} preferredIdes - Array of preferred IDE objects
   * @param {Array} allTools - Array of all tool objects
   */
  async displaySelectedTools(selectedIdes, preferredIdes, allTools) {
    if (selectedIdes.length === 0) return;

    const preferredValues = new Set(preferredIdes.map((ide) => ide.value));
    const toolLines = selectedIdes.map((ideValue) => {
      const tool = allTools.find((t) => t.value === ideValue);
      const name = tool?.name || ideValue;
      const marker = preferredValues.has(ideValue) ? ' \u2B50' : '';
      return `  \u2022 ${name}${marker}`;
    });
    await prompts.log.message('Outils sélectionnés :\n' + toolLines.join('\n'));
  }

  /**
   * Return the set of module codes the registry marks as built-in (core, bmm).
   * These ship with the installer binary and have no per-module channel.
   */
  async _bundledModuleCodes() {
    const externalManager = new ExternalModuleManager();
    try {
      const modules = await externalManager.listAvailable();
      return modules.filter((m) => m.builtIn).map((m) => m.code);
    } catch {
      // Registry unreachable — fall back to the known bundled codes.
      return ['core', 'bmm'];
    }
  }

  /**
   * Fast-path channel gate: confirm "all stable" or open the per-module picker.
   *
   * Skipped when:
   *   - running non-interactively (--yes)
   *   - the user already passed channel flags (--channel / --pin / --next), OR
   *     the installer was launched from a prerelease (which seeds
   *     channelOptions.global = 'next' upstream in promptInstall)
   *   - no externals/community modules are selected
   *
   * Mutates channelOptions.pins and channelOptions.nextSet to reflect picker choices.
   */
  async _interactiveChannelGate({ options, channelOptions, selectedModules }) {
    if (options.yes) return;
    // If the user already declared their channel intent via flags, trust them
    // and skip the gate.
    const haveFlagIntent = channelOptions.global || channelOptions.nextSet.size > 0 || channelOptions.pins.size > 0;
    if (haveFlagIntent) return;

    // Figure out which selected modules actually get a channel (externals +
    // community modules). Bundled core/bmm and custom modules skip the picker.
    const externalManager = new ExternalModuleManager();
    const externals = await externalManager.listAvailable();
    const externalByCode = new Map(externals.map((m) => [m.code, m]));

    const { CommunityModuleManager } = require('./modules/community-manager');
    const communityMgr = new CommunityModuleManager();
    const community = await communityMgr.listAll();
    const communityByCode = new Map(community.map((m) => [m.code, m]));

    const channelSelectable = selectedModules.filter((code) => {
      const info = externalByCode.get(code) || communityByCode.get(code);
      return info && !info.builtIn;
    });
    if (channelSelectable.length === 0) return;

    const fastPath = await prompts.confirm({
      message: `Prêt à installer (tout en stable) ? Choisissez « n » pour personnaliser les canaux ou épingler des versions.`,
      default: true,
    });
    if (fastPath) return; // stable for all, registry default applies

    // Customize path: per-module picker.
    const { fetchStableTags, parseGitHubRepo } = require('./modules/channel-resolver');

    for (const code of channelSelectable) {
      const info = externalByCode.get(code) || communityByCode.get(code);
      const repoUrl = info.url;

      // Try to pre-resolve the top stable tag so we can surface it in the picker.
      let stableLabel = 'stable (version publi\u00e9e)';
      try {
        const parsed = repoUrl ? parseGitHubRepo(repoUrl) : null;
        if (parsed) {
          const tags = await fetchStableTags(parsed.owner, parsed.repo);
          if (tags.length > 0) {
            stableLabel = `stable  ${tags[0].tag}  (version publi\u00e9e)`;
          }
        }
      } catch {
        // fall through with the generic label
      }

      const choice = await prompts.select({
        message: `${code} : choisissez un canal`,
        choices: [
          { name: stableLabel, value: 'stable' },
          { name: 'next   (main HEAD \u2014 d\u00e9veloppement en cours)', value: 'next' },
          { name: 'pin    (version sp\u00e9cifique)', value: 'pin' },
        ],
        default: 'stable',
      });

      if (choice === 'next') {
        channelOptions.nextSet.add(code);
      } else if (choice === 'pin') {
        const pinValue = await prompts.text({
          message: `Saisissez un tag de version pour '${code}' (ex. v1.6.0) :`,
          validate: (value) => {
            if (!value || !/^[\w.\-+/]+$/.test(String(value).trim())) {
              return 'Doit \u00eatre un nom de tag non vide (lettres, chiffres, points, tirets).';
            }
          },
        });
        channelOptions.pins.set(code, String(pinValue).trim());
      }
      // 'stable' is the default; nothing to record.
    }
  }

  /**
   * Resolve channel decisions for an update over an existing install.
   *
   * For each selected external/community module:
   *   - Read the recorded channel from the existing manifest.
   *   - On `stable`: query tags; if a newer stable exists, classify the diff
   *     and prompt. Patch/minor default Y; major defaults N. `--yes` accepts
   *     defaults (patches/minors) but NOT majors — a major under --yes stays
   *     frozen unless the user also passes `--pin CODE=NEW_TAG`.
   *   - On `next`: no prompt (pull HEAD).
   *   - On `pinned`: no prompt (stays pinned).
   *   - No channel recorded and `version: null`: one-time migration prompt
   *     ("Switch to stable / Keep on next").
   *
   * Decisions that freeze the current version are applied by adding a pin to
   * `channelOptions.pins` so downstream clone logic honors them.
   */
  async _resolveUpdateChannels({ bmadDir, selectedModules, channelOptions, yes }) {
    const { Manifest } = require('./core/manifest');
    const manifestObj = new Manifest();
    const manifest = await manifestObj.read(bmadDir);
    const existingByName = new Map();
    for (const m of manifest?.modulesDetailed || []) {
      if (m?.name) existingByName.set(m.name, m);
    }
    if (existingByName.size === 0) return;

    const externalManager = new ExternalModuleManager();
    const externals = await externalManager.listAvailable();
    const externalByCode = new Map(externals.map((m) => [m.code, m]));

    const { CommunityModuleManager } = require('./modules/community-manager');
    const communityMgr = new CommunityModuleManager();
    const community = await communityMgr.listAll();
    const communityByCode = new Map(community.map((m) => [m.code, m]));

    const { fetchStableTags, classifyUpgrade, releaseNotesUrl } = require('./modules/channel-resolver');
    const { parseGitHubRepo } = require('./modules/channel-resolver');

    // Interactive-only: offer a one-time gate to review / switch channels for
    // selected modules that are already installed. Default N so normal Modify
    // flows (add/remove modules) aren't interrupted.
    let reviewChannels = false;
    if (!yes) {
      const existingWithChannel = selectedModules.filter((code) => {
        const prev = existingByName.get(code);
        if (!prev) return false;
        const info = externalByCode.get(code) || communityByCode.get(code);
        return info && !info.builtIn;
      });
      if (existingWithChannel.length > 0) {
        reviewChannels = await prompts.confirm({
          message: 'Vérifier les assignations de canaux (stable / next / pin) pour vos modules existants ?',
          default: false,
        });
      }
    }

    for (const code of selectedModules) {
      const prev = existingByName.get(code);
      if (!prev) continue;

      const info = externalByCode.get(code) || communityByCode.get(code);
      if (!info) continue;
      // Bundled modules (core/bmm) ship with the installer binary itself —
      // their version is stapled to the CLI version, not a git tag. Skip
      // tag-API lookups for them; the "upgrade" mechanism is `npx bmad@X install`.
      if (info.builtIn) continue;

      const repoUrl = info.url;
      const parsed = repoUrl ? parseGitHubRepo(repoUrl) : null;

      // Legacy migration: manifest carries no channel and a null/empty
      // version. Offer the one-time pick between stable and next.
      const recordedChannel = prev.channel || null;
      const needsMigration = !recordedChannel && (prev.version == null || prev.version === '');
      if (needsMigration) {
        if (yes) {
          // Conservative headless default: stable.
          continue;
        }
        const chosen = await prompts.select({
          message: `${code} : votre installation existante suit la branche main. Passer aux versions stables (recommandé en production), ou rester sur main ?`,
          choices: [
            { name: 'Passer en stable', value: 'stable' },
            { name: 'Rester sur main (next)', value: 'next' },
          ],
          default: 'stable',
        });
        if (chosen === 'next') channelOptions.nextSet.add(code);
        continue;
      }

      // Optional channel-switch offer. Fires only when the user opted in via
      // the gate above. 'keep' falls through to the existing per-channel
      // logic (which runs upgrade classification for stable). Any switch
      // records the new intent into channelOptions and skips upgrade prompts.
      if (reviewChannels && recordedChannel) {
        const switchChoices = [
          {
            name: `Conserver '${recordedChannel}'${prev.version ? ` @ ${prev.version}` : ''}`,
            value: 'keep',
          },
        ];
        if (recordedChannel !== 'stable') {
          switchChoices.push({ name: 'Passer en stable (version publiée)', value: 'stable' });
        }
        if (recordedChannel !== 'next') {
          switchChoices.push({ name: 'Passer en next (main HEAD)', value: 'next' });
        }
        switchChoices.push({ name: 'Épingler à un tag de version spécifique', value: 'pin' });

        const choice = await prompts.select({
          message: `Canal pour ${code} :`,
          choices: switchChoices,
          default: 'keep',
        });

        if (choice === 'next') {
          channelOptions.nextSet.add(code);
          continue;
        }
        if (choice === 'pin') {
          const pinValue = await prompts.text({
            message: `Saisissez un tag de version pour '${code}' (ex. v1.6.0) :`,
            validate: (value) => {
              if (!value || !/^[\w.\-+/]+$/.test(String(value).trim())) {
                return 'Doit être un nom de tag non vide (lettres, chiffres, points, tirets).';
              }
            },
          });
          channelOptions.pins.set(code, String(pinValue).trim());
          continue;
        }
        if (choice === 'stable') {
          // Switch to stable: install at the top stable tag without an
          // upgrade-classification prompt (the user explicitly opted in).
          // Also warm the tag cache here so the actual clone step doesn't
          // need a second GitHub API call (can hit rate limits).
          if (parsed) {
            try {
              await fetchStableTags(parsed.owner, parsed.repo);
            } catch {
              // best effort; clone step will surface any failure
            }
          }
          continue;
        }
        // 'keep' → fall through with recordedChannel below.
      }

      if (recordedChannel === 'pinned' || recordedChannel === 'next') {
        // Respect any explicit channel intent the user already expressed via
        // CLI flags (--channel / --all-* / --next=CODE / --pin CODE=TAG) or
        // via the interactive review gate above. Only auto-re-assert the
        // recorded channel when the user hasn't opted into anything else —
        // otherwise --all-stable (or a review "switch to stable") would be
        // silently clobbered by the prior channel.
        const alreadyDecided = channelOptions.global || channelOptions.nextSet.has(code) || channelOptions.pins.has(code);
        if (!alreadyDecided) {
          if (recordedChannel === 'pinned' && prev.version) {
            channelOptions.pins.set(code, prev.version);
          } else if (recordedChannel === 'next') {
            channelOptions.nextSet.add(code);
          }
        }
        continue;
      }

      // Stable channel: check for a newer released tag.
      if (!parsed) continue;
      // Respect explicit CLI intent (--pin / --next=CODE / --all-*) and any
      // choice the user already made in the earlier review gate. Without this
      // guard the upgrade classifier below would unconditionally call
      // `channelOptions.pins.set(code, prev.version)` on decline/major-refuse/
      // fetch-error, silently clobbering the user's override.
      const alreadyDecided = channelOptions.global || channelOptions.nextSet.has(code) || channelOptions.pins.has(code);
      if (alreadyDecided) continue;
      let tags;
      try {
        tags = await fetchStableTags(parsed.owner, parsed.repo);
      } catch (error) {
        await prompts.log.warn(`Impossible de vérifier les mises à jour de ${code} (${error.message}). Maintien sur ${prev.version}.`);
        if (prev.version) channelOptions.pins.set(code, prev.version);
        continue;
      }
      if (!tags || tags.length === 0) continue;
      const topTag = tags[0].tag; // e.g. "v1.7.0"
      const currentTag = prev.version || '';
      const diffClass = classifyUpgrade(currentTag, topTag);

      if (diffClass === 'none') continue; // already at or above top tag

      const notes = releaseNotesUrl(repoUrl, topTag);
      let accept;
      if (diffClass === 'major') {
        if (yes) {
          // Major under --yes is refused by design.
          await prompts.log.warn(
            `${code} ${currentTag} → ${topTag} est une nouvelle version majeure ; maintien sur ${currentTag}. ` +
              `Pour accepter, relancez avec --pin ${code}=${topTag}.`,
          );
          channelOptions.pins.set(code, currentTag);
          continue;
        }
        accept = await prompts.confirm({
          message:
            `${code} ${topTag} disponible — nouvelle version majeure (peut modifier le comportement).` +
            (notes ? ` Notes de version : ${notes}.` : '') +
            ' Mettre à niveau ?',
          default: false,
        });
      } else if (diffClass === 'minor') {
        if (yes) {
          accept = true;
        } else {
          accept = await prompts.confirm({
            message: `${code} ${topTag} disponible (nouvelles fonctionnalités).` + (notes ? ` Notes de version : ${notes}.` : '') + ' Mettre à niveau ?',
            default: true,
          });
        }
      } else {
        // patch
        if (yes) {
          accept = true;
        } else {
          accept = await prompts.confirm({
            message: `${code} ${topTag} disponible. Mettre à niveau ?`,
            default: true,
          });
        }
      }

      if (!accept && currentTag) {
        // Freeze the current version by pinning it for this run.
        channelOptions.pins.set(code, currentTag);
      }
    }
  }
}

module.exports = { UI };
