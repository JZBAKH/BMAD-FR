/**
 * Lot 2 - Test 05 : les attributs des handlers parsés par le framework
 * restent en anglais : type=, match=, exec=, action=, tmpl=, data=, multi=,
 * input=, route=, trigger=, triggers=, workflow=, validate-workflow=,
 * checklist=, document=, ide-only=, web-only=, discussion=.
 *
 * Si on traduisait `type="action"` en `type="action"` (OK) ou `type="executer"`
 * (KO car le code Python/Node match la chaîne "exec" / "action" / "data" etc.),
 * le menu casserait. Ce test détecte les valeurs traduites.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { pairFrToOriginal } = require('../fr-helpers/pair-with-original');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

// type="..." values that the framework parses literally.
const TYPE_VALUES = ['action', 'data', 'exec', 'multi', 'tmpl'];

function countTypeAttribute(text, value) {
  const re = new RegExp(`type=["']${value}["']`, 'g');
  return (text.match(re) || []).length;
}

function run() {
  runner.section('05 — Attributs de handler intacts (type="action" etc.)');

  const candidates = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    candidates.push(...walk(fullRoot, {
      extensions: ['.md', '.txt', '.yaml'],
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

    for (const value of TYPE_VALUES) {
      const enCount = countTypeAttribute(enText, value);
      if (enCount === 0) continue;
      runner.test(`${frRel} : type="${value}" présent ${enCount} fois`, () => {
        const frCount = countTypeAttribute(frText, value);
        runner.assert(
          frCount === enCount,
          `type="${value}" : ${frCount} dans le FR vs ${enCount} attendus`,
        );
      });
    }
  }

  runner.test('au moins une paire testée', () => {
    runner.assert(pairsTested > 0, 'aucune paire FR/EN');
  });
}

if (require.main === module) {
  runner.header('Lot 2 / 05 — Attributs handler');
  run();
  runner.summary();
}

module.exports = { run };
