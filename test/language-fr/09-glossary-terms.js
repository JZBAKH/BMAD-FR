/**
 * Lot 2 - Test 09 : les termes du dictionnaire métier obligatoire (GLOSSAIRE §4)
 * sont appliqués correctement.
 *
 * Stratégie pragmatique : pour chaque pair de termes (anglais → français), si
 * l'original contient le terme anglais, la traduction doit contenir au moins
 * une occurrence d'une des formes françaises acceptées.
 *
 * Plusieurs formes acceptées par terme reflète les variations légitimes
 * (genre, capitalisation, etc.).
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { pairFrToOriginal } = require('../fr-helpers/pair-with-original');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-skills-fr', 'src/core-skills-fr', 'src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

// (en pattern) → array of acceptable FR patterns. The original term itself is
// also kept as acceptable, since GLOSSAIRE allows hybrid forms like
// "Cas d'usage / User Story" where both languages cohabit.
const GLOSSARY_PAIRS = [
  {
    en: /\bSenior Implementation Engineer\b/g,
    fr: [/Ingénieur(?:e)? d'Implémentation Senior/g, /Senior Implementation Engineer/g],
    label: "Senior Implementation Engineer → Ingénieur d'Implémentation Senior",
  },
  {
    en: /\bStrategic Business Analyst\b/g,
    fr: [/Analyste Métier Stratégique/g, /Strategic Business Analyst/g],
    label: 'Strategic Business Analyst → Analyste Métier Stratégique',
  },
  {
    en: /\bSystem Architect\b/g,
    fr: [/Architecte Système/g, /System Architect/g],
    label: 'System Architect → Architecte Système',
  },
  {
    en: /\bTechnical Scrum Master\b/g,
    fr: [/Scrum Master Technique/g, /Technical Scrum Master/g],
    label: 'Technical Scrum Master → Scrum Master Technique',
  },
  {
    en: /\bRequirements Expert\b/g,
    fr: [/Expert(?:e)? en Exigences/g, /Requirements Expert/g],
    label: 'Requirements Expert → Experte en Exigences',
  },
];

function run() {
  runner.section('09 — Termes du dictionnaire métier obligatoire (GLOSSAIRE §4)');

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

    for (const pair of GLOSSARY_PAIRS) {
      pair.en.lastIndex = 0;
      const enMatches = enText.match(pair.en);
      if (!enMatches) continue;
      const enCount = enMatches.length;

      runner.test(`${frRel} : "${pair.label}" — ${enCount} occurrence(s) attendue(s)`, () => {
        let frCount = 0;
        for (const reFr of pair.fr) {
          reFr.lastIndex = 0;
          const m = frText.match(reFr);
          if (m) frCount += m.length;
        }
        runner.assert(frCount >= enCount, `${frCount} occurrence(s) FR (toutes formes confondues) vs ${enCount} attendues`);
      });
    }
  }

  runner.test('au moins une paire testée', () => {
    runner.assert(pairsTested > 0, 'aucune paire FR/EN');
  });
}

if (require.main === module) {
  runner.header('Lot 2 / 09 — Termes du glossaire');
  run();
  runner.summary();
}

module.exports = { run };
