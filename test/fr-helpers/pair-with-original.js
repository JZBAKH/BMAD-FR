/**
 * Maps a translated file path (-fr) to the upstream English original path
 * within the BMAD-FR fork structure.
 *
 * Nouveaux modules (post-refactor upstream mars 2026) :
 *   src/bmm-skills-fr/...            →  src/bmm-skills/...
 *   src/core-skills-fr/...           →  src/core-skills/...
 *
 * Modules legacy (pré-refactor — anciens dossiers conservés temporairement
 * comme fallback ; leurs originaux EN ont été supprimés du fork mais le
 * dossier `-fr` peut encore exister et contenir des résidus historiques) :
 *   src/bmm-fr/, src/core-fr/, src/utility-fr/  →  pas d'original upstream
 *   (retournent null car src/bmm/, src/core/, src/utility/ ont été
 *   supprimés en mai 2026 lors de la migration vers la nouvelle structure)
 *
 * Returns null if the path does not start with a recognized -fr module
 * or if the upstream original does not exist.
 */

const fs = require('node:fs');
const path = require('node:path');

// Modules dont la traduction FR a un équivalent EN actif dans le repo
// (donc sur lequel on peut faire des comparaisons FR vs EN).
const TRANSLATED_MODULES_NEW = new Set(['bmm-skills', 'core-skills']);

// Modules legacy : -fr existe encore mais l'EN a été supprimé.
// `pairFrToOriginal` retourne null pour ces chemins.
const LEGACY_MODULES = new Set(['bmm', 'core', 'utility']);

// Maintenu pour rétrocompat des tests qui importent `TRANSLATED_MODULES`.
const TRANSLATED_MODULES = new Set([...TRANSLATED_MODULES_NEW, ...LEGACY_MODULES]);

/**
 * @param {string} frPath Path that lives inside src/<module>-fr/...
 * @returns {string|null} The upstream-equivalent path, or null if not applicable.
 */
function pairFrToOriginal(frPath) {
  const normalized = frPath.replaceAll('\\', '/');

  // Match `src/<module-name>-fr/<rest>` où module-name peut contenir des
  // tirets (ex: `bmm-skills`, `core-skills`).
  const match = normalized.match(/^(.*?\/?)src\/([a-z][a-z-]*?)-fr\/(.*)$/);
  if (!match) return null;
  const [, prefix, moduleName, rest] = match;

  if (TRANSLATED_MODULES_NEW.has(moduleName)) {
    return `${prefix}src/${moduleName}/${rest}`;
  }

  // Modules legacy : pas d'original EN dans le repo
  if (LEGACY_MODULES.has(moduleName)) return null;

  return null;
}

/**
 * Convenience helper that returns true when both the translated file and its upstream
 * pair exist on disk.
 * @param {string} repoRoot Absolute repo root.
 * @param {string} relFrPath Repo-relative path in src/<module>-fr/...
 */
function hasOriginal(repoRoot, relFrPath) {
  const original = pairFrToOriginal(relFrPath);
  if (!original) return false;
  return fs.existsSync(path.join(repoRoot, original));
}

module.exports = { pairFrToOriginal, hasOriginal, TRANSLATED_MODULES };
