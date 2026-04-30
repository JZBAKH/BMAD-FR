/**
 * Lot 1 — Runner unifié : exécute toutes les vérifications fonctionnelles puis
 * imprime un résumé global et exit avec le code approprié (0 = OK, 1 = échec).
 *
 * Usage :
 *   npm run test:fr:functional
 *   node test/functional-fr/run-all.js
 *
 * Avec sortie détaillée des warnings :
 *   VERBOSE_WARNINGS=1 node test/functional-fr/run-all.js
 */

const runner = require('../fr-helpers/runner');

const TESTS = [
  './01-fr-modules-exist',
  './02-agent-yaml-schema',
  './03-skill-md-frontmatter',
  './04-csv-structure',
  './05-yaml-parseable',
  './06-file-refs-integrity',
  './07-no-conflict-markers',
  './08-getmodulepath-redirect',
  './09-no-orphan-en-folders',
  './10-utility-components-complete',
];

runner.header('BMAD-FR · Tests fonctionnels (Lot 1)');

for (const t of TESTS) {
  const mod = require(t);
  if (typeof mod.run === 'function') mod.run();
}

runner.summary();
