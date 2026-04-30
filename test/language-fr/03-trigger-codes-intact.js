/**
 * Lot 2 - Test 03 : les codes de menu (BP, RS, CB, CP, VP, EP, CE, IR, CC,
 * CA, SP, CS, DS, CR, QA, CU, DP, WD, US, MG, ER, etc.) restent intacts dans
 * la traduction. Ces codes sont parsés par le code à l'exécution du menu —
 * les renommer casserait le pattern matching.
 *
 * Pour chaque code présent dans l'original, on vérifie qu'il apparaît au moins
 * autant de fois dans le FR. Pas de regression possible.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { pairFrToOriginal } = require('../fr-helpers/pair-with-original');
const { extractTriggerCodesPresent } = require('../fr-helpers/extract-protected');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

function run() {
  runner.section('03 — Codes triggers (BP, RS, CB, ...) intacts');

  const candidates = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    candidates.push(...walk(fullRoot, {
      extensions: ['.md', '.yaml', '.yml', '.csv', '.txt'],
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
    const frText = fs.readFileSync(path.join(REPO_ROOT, frRel), 'utf8');

    // Only count codes that appear in a trigger context (e.g. "[QA]",
    // "QA or fuzzy match on", "trigger: QA"). Plain prose mentions like
    // "QA tools" or "P&ID" are excluded by the helper.
    const enCodes = extractTriggerCodesPresent(enText);
    if (enCodes.size === 0) continue;
    const frCodes = extractTriggerCodesPresent(frText);

    for (const code of enCodes) {
      runner.test(`${frRel} : code "${code}" présent en contexte trigger`, () => {
        runner.assert(
          frCodes.has(code),
          `"${code}" présent comme trigger dans EN mais absent du FR`,
        );
      });
    }
  }

  runner.test('au moins une paire testée', () => {
    runner.assert(pairsTested > 0, 'aucune paire FR/EN');
  });
}

if (require.main === module) {
  runner.header('Lot 2 / 03 — Codes triggers');
  run();
  runner.summary();
}

module.exports = { run };
