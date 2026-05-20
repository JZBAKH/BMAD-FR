/**
 * Lot 2 - Test 02 : les noms d'agents (Mary, Winston, John, Bob, Sally, Paige,
 * Barry) ne sont pas francisés. Cas spécial : "Amelia" est tolérée comme
 * "Amélie" puisque le project owner a explicitement opté pour cette francisation
 * dans agent.yaml ; les deux formes sont acceptées.
 *
 * Détection : si l'original contient le nom N fois, le FR doit contenir le nom
 * (ou sa francisation tolérée) au moins N fois — pas moins.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { pairFrToOriginal } = require('../fr-helpers/pair-with-original');
const { PROTECTED_AGENT_NAMES, TOLERATED_AGENT_FRANCISATIONS } = require('../fr-helpers/extract-protected');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-skills-fr', 'src/core-skills-fr', 'src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

function countOccurrences(text, name) {
  const re = new RegExp(`\\b${name}\\b`, 'g');
  return (text.match(re) || []).length;
}

function run() {
  runner.section("02 — Noms d'agents intacts (Amélie tolérée pour Amelia)");

  const candidates = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    candidates.push(
      ...walk(fullRoot, {
        extensions: ['.md', '.yaml', '.yml', '.csv', '.txt'],
        base: REPO_ROOT,
      }),
    );
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

    // Strict names : count must match
    for (const name of PROTECTED_AGENT_NAMES) {
      const enCount = countOccurrences(enText, name);
      if (enCount === 0) continue;
      runner.test(`${frRel} : "${name}" présent au moins ${enCount} fois`, () => {
        const frCount = countOccurrences(frText, name);
        runner.assert(frCount >= enCount, `"${name}" : ${frCount} occurrence(s) côté FR vs ${enCount} attendues (l'original)`);
      });
    }

    // Tolerated francisations : count of (original) + count of (francised) ≥ count of (original in EN)
    for (const [original, francised] of TOLERATED_AGENT_FRANCISATIONS) {
      const enCount = countOccurrences(enText, original);
      if (enCount === 0) continue;
      runner.test(`${frRel} : "${original}" / "${francised}" cumulés ≥ ${enCount}`, () => {
        const frOrig = countOccurrences(frText, original);
        const frFranc = countOccurrences(frText, francised);
        const total = frOrig + frFranc;
        runner.assert(total >= enCount, `${original}+${francised} cumulés = ${total} côté FR vs ${enCount} attendues`);
      });
    }
  }

  runner.test('au moins une paire testée', () => {
    runner.assert(pairsTested > 0, 'aucune paire FR/EN');
  });
}

if (require.main === module) {
  runner.header("Lot 2 / 02 — Noms d'agents");
  run();
  runner.summary();
}

module.exports = { run };
