/**
 * Lot 2 - Test 06 : la chaîne "fuzzy match on" reste intacte dans la traduction.
 *
 * GLOSSAIRE §1 : "Ne jamais traduire la chaîne `fuzzy match on`. Exemple à
 * conserver tel quel : `BP or fuzzy match on brainstorm-project`."
 *
 * Le validateur Zod (tools/schema/agent.js) parse cette chaîne via le pattern
 * COMPOUND_TRIGGER_PATTERN. Une traduction (ex: "correspondance floue sur") la
 * casserait silencieusement.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { pairFrToOriginal } = require('../fr-helpers/pair-with-original');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-skills-fr', 'src/core-skills-fr', 'src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

const FUZZY_RE = /fuzzy match on/g;

function run() {
  runner.section('06 — "fuzzy match on" intact');

  const candidates = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    candidates.push(...walk(fullRoot, {
      extensions: ['.md', '.yaml', '.yml', '.txt'],
      base: REPO_ROOT,
    }));
  }

  let pairsTested = 0;
  for (const frRel of candidates) {
    const enRel = pairFrToOriginal(frRel);
    if (!enRel) continue;
    const enFull = path.join(REPO_ROOT, enRel);
    if (!fs.existsSync(enFull)) continue;
    pairsTested++;

    const enText = fs.readFileSync(enFull, 'utf8');
    const enCount = (enText.match(FUZZY_RE) || []).length;
    if (enCount === 0) continue;

    const frText = fs.readFileSync(path.join(REPO_ROOT, frRel), 'utf8');
    runner.test(`${frRel} : "fuzzy match on" présent exactement ${enCount} fois`, () => {
      const frCount = (frText.match(FUZZY_RE) || []).length;
      runner.assert(
        frCount === enCount,
        `${frCount} occurrences dans le FR vs ${enCount} attendues — vérifier qu'aucune traduction n'a remplacé la chaîne`,
      );
    });
  }

  runner.test('au moins une paire testée', () => {
    runner.assert(pairsTested > 0, 'aucune paire FR/EN');
  });
}

if (require.main === module) {
  runner.header('Lot 2 / 06 — fuzzy match on');
  run();
  runner.summary();
}

module.exports = { run };
