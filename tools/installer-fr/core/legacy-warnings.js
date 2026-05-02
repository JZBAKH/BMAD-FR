const os = require('node:os');
const path = require('node:path');
const semver = require('semver');
const fs = require('../fs-native');
const prompts = require('../prompts');
const { BMAD_FOLDER_NAME } = require('../ide/shared/path-utils');
const { getInstalledCanonicalIds, isBmadOwnedEntry } = require('../ide/shared/installed-skills');

const MIN_NATIVE_SKILLS_VERSION = '6.1.0';

// Pre-v6.1.0 paths: BMAD used to install commands/workflows/etc in tool-specific dirs.
// In v6.1.0 BMAD switched to native SKILL.md format.
const LEGACY_COMMAND_PATHS = [
  '.agent/workflows',
  '.augment/commands',
  '.claude/commands',
  '.clinerules/workflows',
  '.codex/prompts',
  '~/.codex/prompts',
  '.codebuddy/commands',
  '.crush/commands',
  '.cursor/commands',
  '.gemini/commands',
  '.github/agents',
  '.github/prompts',
  '.iflow/commands',
  '.kilocode/workflows',
  '.kiro/steering',
  '.opencode/agents',
  '.opencode/commands',
  '.opencode/agent',
  '.opencode/command',
  '.qwen/commands',
  '.roo/commands',
  '.rovodev/workflows',
  '.trae/rules',
  '.windsurf/workflows',
];

// Skill paths that moved to the cross-tool .agents/skills/ standard.
// Users upgrading from a prior install may have stale BMAD skills here that
// the AI tool will load alongside the new ones, causing duplicates.
const LEGACY_SKILL_PATHS = [
  '.augment/skills',
  '~/.augment/skills',
  '.codex/skills',
  '.crush/skills',
  '.cursor/skills',
  '~/.cursor/skills',
  '.gemini/skills',
  '~/.gemini/skills',
  '.github/skills',
  '~/.github/skills',
  '.kilocode/skills',
  '.kimi/skills',
  '~/.kimi/skills',
  '.opencode/skills',
  '~/.opencode/skills',
  '.pi/skills',
  '~/.pi/skills',
  '.roo/skills',
  '~/.roo/skills',
  '.rovodev/skills',
  '~/.rovodev/skills',
  '.windsurf/skills',
  '~/.windsurf/skills',
  '~/.codeium/windsurf/skills',
];

const LEGACY_PATHS = [...LEGACY_COMMAND_PATHS, ...LEGACY_SKILL_PATHS];

function expandPath(p) {
  if (p === '~') return os.homedir();
  if (p.startsWith('~/')) return path.join(os.homedir(), p.slice(2));
  return p;
}

function resolveLegacyPath(projectRoot, p) {
  if (path.isAbsolute(p) || p.startsWith('~')) return expandPath(p);
  return path.join(projectRoot, p);
}

async function findStaleLegacyDirs(projectRoot) {
  const bmadDir = path.join(projectRoot, BMAD_FOLDER_NAME);
  const canonicalIds = await getInstalledCanonicalIds(bmadDir);

  const findings = [];
  for (const legacyPath of LEGACY_PATHS) {
    const resolved = resolveLegacyPath(projectRoot, legacyPath);
    if (!(await fs.pathExists(resolved))) continue;
    try {
      const entries = await fs.readdir(resolved);
      const bmadEntries = entries.filter((e) => isBmadOwnedEntry(e, canonicalIds));
      if (bmadEntries.length > 0) {
        findings.push({ path: resolved, displayPath: legacyPath, count: bmadEntries.length, entries: bmadEntries });
      }
    } catch {
      // Unreadable dir — skip
    }
  }
  return findings;
}

function isPreNativeSkillsVersion(version) {
  if (!version) return false;
  const coerced = semver.valid(version) || semver.valid(semver.coerce(version));
  if (!coerced) return false;
  return semver.lt(coerced, MIN_NATIVE_SKILLS_VERSION);
}

async function warnPreNativeSkillsLegacy({ projectRoot, existingVersion } = {}) {
  const versionTriggered = isPreNativeSkillsVersion(existingVersion);
  const staleDirs = await findStaleLegacyDirs(projectRoot);

  if (!versionTriggered && staleDirs.length === 0) return;

  if (versionTriggered) {
    await prompts.log.warn(
      `Installation BMAD précédente détectée v${existingVersion} (antérieure à ${MIN_NATIVE_SKILLS_VERSION}). ` +
        `BMAD est passé au format de Skills natifs en v${MIN_NATIVE_SKILLS_VERSION} ; les anciens répertoires de commandes/workflows de votre installation précédente peuvent encore être présents.`,
    );
  }

  if (staleDirs.length > 0) {
    await prompts.log.warn(
      `${staleDirs.length} emplacement(s) obsolète(s) contenant des entrées BMAD que le nouvel installateur ne gère plus. ` +
        `Votre outil IA peut les charger en parallèle des nouveaux Skills, provoquant des doublons. Supprimez-les manuellement :`,
    );
    for (const finding of staleDirs) {
      // Print each entry by exact name. A `bmad*` glob would (a) miss
      // custom-module skills the canonicalId scan now picks up, and
      // (b) match bmad-os-* utility skills the user should keep.
      const entries = finding.entries || [];
      for (const entry of entries) {
        await prompts.log.message(`    rm -rf "${path.join(finding.path, entry)}"`);
      }
    }
  } else if (versionTriggered) {
    await prompts.log.message(
      '  Aucun répertoire obsolète détecté, mais si votre outil IA affiche des commandes BMAD en double après l\'installation, vérifiez la présence d\'anciennes entrées `bmad-*` dans les répertoires spécifiques aux outils (ex. .claude/commands, .cursor/commands).',
    );
  }
}

module.exports = {
  warnPreNativeSkillsLegacy,
  findStaleLegacyDirs,
  isPreNativeSkillsVersion,
  LEGACY_PATHS,
  MIN_NATIVE_SKILLS_VERSION,
};
