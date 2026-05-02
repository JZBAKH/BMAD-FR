/**
 * Lot 2 - Test 08 : les compteurs structurels (puces de liste, items de
 * liste numérotée) sont préservés dans la traduction.
 *
 * GLOSSAIRE §3.3 : "Si l'original a 8 items dans une liste à puces, la
 * traduction doit avoir exactement 8 items."
 *
 * Le test compte trois choses :
 *   - lignes commençant par "- " ou "* " (puces)
 *   - lignes commençant par "N. " où N est un entier (numérotation)
 *   - balises <step n="..."> (étapes XML)
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { pairFrToOriginal } = require('../fr-helpers/pair-with-original');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-skills-fr', 'src/core-skills-fr', 'src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

function countBullets(text) {
  return (text.match(/^\s*[-*]\s+\S/gm) || []).length;
}

function countNumbered(text) {
  return (text.match(/^\s*\d+\.\s+\S/gm) || []).length;
}

function countSteps(text) {
  return (text.match(/<step\b/g) || []).length;
}

function run() {
  runner.section('08 — Compteurs structurels préservés');

  const candidates = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    candidates.push(...walk(fullRoot, { extensions: ['.md', '.txt'], base: REPO_ROOT }));
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

    const enBullets = countBullets(enText);
    const frBullets = countBullets(frText);
    if (enBullets > 0) {
      runner.test(`${frRel} : ${enBullets} puce(s) préservées`, () => {
        runner.assert(
          frBullets === enBullets,
          `${frBullets} puces dans le FR vs ${enBullets} attendues`,
        );
      });
    }

    const enNumbered = countNumbered(enText);
    const frNumbered = countNumbered(frText);
    if (enNumbered > 0) {
      runner.test(`${frRel} : ${enNumbered} item(s) numéroté(s) préservés`, () => {
        runner.assert(
          frNumbered === enNumbered,
          `${frNumbered} items numérotés dans le FR vs ${enNumbered} attendus`,
        );
      });
    }

    const enSteps = countSteps(enText);
    const frSteps = countSteps(frText);
    if (enSteps > 0) {
      runner.test(`${frRel} : ${enSteps} balise(s) <step> préservées`, () => {
        runner.assert(
          frSteps === enSteps,
          `${frSteps} <step> dans le FR vs ${enSteps} attendus`,
        );
      });
    }
  }

  runner.test('au moins une paire testée', () => {
    runner.assert(pairsTested > 0, 'aucune paire FR/EN');
  });
}

if (require.main === module) {
  runner.header('Lot 2 / 08 — Compteurs');
  run();
  runner.summary();
}

module.exports = { run };
