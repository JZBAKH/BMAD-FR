/**
 * Lot 2 — Runner unifié : exécute toutes les vérifications linguistiques puis
 * imprime un résumé global et exit avec le code approprié (0 = OK, 1 = échec).
 *
 * Usage :
 *   npm run test:fr:language
 *   node test/language-fr/run-all.js
 *
 * Avec sortie détaillée des warnings :
 *   VERBOSE_WARNINGS=1 node test/language-fr/run-all.js
 */

const runner = require('../fr-helpers/runner');

const TESTS = [
  './01-variables-preserved',
  './02-agent-names-intact',
  './03-trigger-codes-intact',
  './04-xml-tags-intact',
  './05-handler-attributes',
  './06-fuzzy-match-on',
  './07-yaml-booleans',
  './08-line-counters',
  './09-glossary-terms',
  './10-skill-descriptions-fr',
  './11-french-coverage-floor',
  './12-cli-no-english-strings',
  './13-root-md-files-fr',
];

runner.header('BMAD-FR · Tests linguistiques (Lot 2)');

for (const t of TESTS) {
  const mod = require(t);
  if (typeof mod.run === 'function') mod.run();
}

runner.summary();
