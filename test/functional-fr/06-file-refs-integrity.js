/**
 * Lot 1 - Test 06 : intégrité référentielle.
 *
 * Pour chaque chemin du type {project-root}/_bmad/<module>/... cité dans un
 * fichier -fr (workflow.md, SKILL.md, agent.yaml, csv …), on vérifie qu'un
 * fichier équivalent existe dans la version source du module.
 *
 * Comme l'installer copie src/<module>-fr/ vers _bmad/<module>/, on peut
 * cartographier _bmad/<module>/foo.md → src/<module>-fr/foo.md pour vérifier.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];
const PROJECT_ROOT_REF = /\{project-root\}\/_bmad\/([a-z][a-z0-9-]*)\/([^\s"'`)]+)/g;

// Variables that may legitimately appear inside paths and that we should not
// expand. If a reference contains one of these, we consider the path dynamic
// and skip the existence check.
const DYNAMIC_TOKENS = [
  '{{',
  '{output_folder}',
  '{communication_language}',
  '{user_name}',
  '{value}',
  '{project_name}',
  '{planning_artifacts}',
  '{implementation_artifacts}',
  '{project_knowledge}',
  '{directory_name}',
];

// Files that are generated post-installation by the installer and therefore do
// not exist in the source tree. References to these are intentional contracts,
// not broken links.
const POST_INSTALL_GENERATED = new Set(['config.yaml']);

function isDynamic(rawPath) {
  return DYNAMIC_TOKENS.some((tok) => rawPath.includes(tok));
}

function isPostInstallGenerated(subPath) {
  // E.g. "core/config.yaml" or "bmm/config.yaml"
  const last = subPath
    .replace(/[#?].*$/, '')
    .split('/')
    .pop();
  return POST_INSTALL_GENERATED.has(last);
}

function resolveModuleSource(moduleName) {
  if (moduleName === 'bmm') return 'src/bmm-fr';
  if (moduleName === 'core') return 'src/core-fr';
  if (moduleName === 'utility') return 'src/utility-fr';
  return null;
}

function resolveOriginalModuleSource(moduleName) {
  if (moduleName === 'bmm') return 'src/bmm';
  if (moduleName === 'core') return 'src/core';
  if (moduleName === 'utility') return 'src/utility';
  return null;
}

function run() {
  runner.section('06 — Intégrité référentielle des chemins {project-root}/_bmad/...');

  const allTextFiles = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    allTextFiles.push(
      ...walk(fullRoot, {
        extensions: ['.md', '.yaml', '.yml', '.csv', '.txt'],
        base: REPO_ROOT,
      }),
    );
  }

  let totalRefs = 0;
  let skippedDynamic = 0;
  let skippedPostInstall = 0;
  let skippedUpstreamAlsoBroken = 0;
  const brokenRefs = [];

  for (const relPath of allTextFiles) {
    const content = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
    let m;
    PROJECT_ROOT_REF.lastIndex = 0;
    while ((m = PROJECT_ROOT_REF.exec(content)) !== null) {
      const [, moduleName, subPath] = m;
      const fullRef = `_bmad/${moduleName}/${subPath}`;
      if (isDynamic(subPath) || isDynamic(fullRef)) {
        skippedDynamic++;
        continue;
      }
      if (isPostInstallGenerated(subPath)) {
        skippedPostInstall++;
        continue;
      }

      totalRefs++;
      const moduleSrc = resolveModuleSource(moduleName);
      if (!moduleSrc) {
        // Module not in our -fr scope (e.g. bmc, cis). Skip — these are tracked
        // as missing modules, not as broken refs.
        continue;
      }
      const cleanSubPath = subPath.replace(/[#?].*$/, '');
      const candidate = path.join(REPO_ROOT, moduleSrc, cleanSubPath);
      if (fs.existsSync(candidate)) continue;

      // The FR ref is broken. Check whether the upstream English equivalent
      // is also broken — in that case, this is an upstream issue we inherit,
      // not a regression introduced by translation.
      const upstreamSrc = resolveOriginalModuleSource(moduleName);
      const upstreamCandidate = upstreamSrc ? path.join(REPO_ROOT, upstreamSrc, cleanSubPath) : null;
      if (upstreamCandidate && !fs.existsSync(upstreamCandidate)) {
        skippedUpstreamAlsoBroken++;
        continue;
      }

      brokenRefs.push({ source: relPath, ref: fullRef, expected: `${moduleSrc}/${cleanSubPath}` });
    }
  }

  runner.info(
    `Refs analysées : ${totalRefs} | dynamiques : ${skippedDynamic} | post-install : ${skippedPostInstall} | déjà cassées upstream : ${skippedUpstreamAlsoBroken}`,
  );

  runner.test(`au moins une référence trouvée (audit non vide)`, () => {
    runner.assert(totalRefs > 0, "aucune référence {project-root}/_bmad/... trouvée — l'audit est-il bien câblé ?");
  });

  runner.test(`aucune référence cassée par la traduction (${brokenRefs.length} cas)`, () => {
    if (brokenRefs.length === 0) return;
    const sample = brokenRefs
      .slice(0, 10)
      .map((b) => `  • ${b.source} → ${b.ref} (cherche ${b.expected})`)
      .join('\n');
    const more = brokenRefs.length > 10 ? `\n  • ... et ${brokenRefs.length - 10} autre(s)` : '';
    throw new Error(
      `${brokenRefs.length} référence(s) cassée(s) qui pointent vers des fichiers existants côté upstream mais absents côté FR :\n${sample}${more}`,
    );
  });
}

if (require.main === module) {
  runner.header('Lot 1 / 06 — Intégrité référentielle');
  run();
  runner.summary();
}

module.exports = { run };
