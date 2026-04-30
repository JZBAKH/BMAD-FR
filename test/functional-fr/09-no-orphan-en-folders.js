/**
 * Lot 1 - Test 09 : aucun dossier "*-en" ne subsiste dans les modules -fr.
 *
 * Régression-guard : ces dossiers (1-analysis-en, etc.) avaient été créés pour
 * confiner Gemini lors de traductions par lots et ont été supprimés en Phase 2
 * de l'audit. Ce test empêche leur réapparition.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

function findEnDirs(rootRel) {
  const offenders = [];
  function recurse(currentRel) {
    const full = path.join(REPO_ROOT, currentRel);
    if (!fs.existsSync(full)) return;
    const entries = fs.readdirSync(full, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const childRel = `${currentRel}/${entry.name}`;
      if (entry.name.endsWith('-en')) {
        offenders.push(childRel);
      } else {
        recurse(childRel);
      }
    }
  }
  recurse(rootRel);
  return offenders;
}

function run() {
  runner.section('09 — Pas de dossier "*-en" sous src/*-fr/');

  for (const root of FR_ROOTS) {
    runner.test(`${root} ne contient aucun sous-dossier *-en`, () => {
      const offenders = findEnDirs(root);
      if (offenders.length === 0) return;
      throw new Error(`Dossiers parasites :\n${offenders.map((o) => `  • ${o}`).join('\n')}`);
    });
  }
}

if (require.main === module) {
  runner.header('Lot 1 / 09 — Pas de dossier -en');
  run();
  runner.summary();
}

module.exports = { run };
