/**
 * Maps a translated file path (-fr) to the upstream English original path
 * within the BMAD-FR fork structure.
 *
 *   src/bmm-fr/agents/dev.agent.yaml    →  src/bmm/agents/dev.agent.yaml
 *   src/core-fr/skills/foo/SKILL.md     →  src/core/skills/foo/SKILL.md
 *   src/utility-fr/agent-components/x   →  src/utility/agent-components/x
 *
 * Returns null if the path does not start with src/<module>-fr/.
 */

const fs = require('node:fs');
const path = require('node:path');

const TRANSLATED_MODULES = new Set(['bmm', 'core', 'utility']);

/**
 * @param {string} frPath Path that lives inside src/<module>-fr/...
 * @returns {string|null} The upstream-equivalent path, or null if not applicable.
 */
function pairFrToOriginal(frPath) {
  const normalized = frPath.replaceAll('\\', '/');
  const match = normalized.match(/^(.*?\/?)src\/([a-z]+)-fr\/(.*)$/);
  if (!match) return null;
  const [, prefix, moduleName, rest] = match;
  if (!TRANSLATED_MODULES.has(moduleName)) return null;
  return `${prefix}src/${moduleName}/${rest}`;
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
