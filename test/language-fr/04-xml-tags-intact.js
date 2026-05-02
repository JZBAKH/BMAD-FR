/**
 * Lot 2 - Test 04 : les balises XML (noms d'éléments) sont intactes — leur
 * contenu est traduit, mais pas leur nom.
 *
 *   <step n="1">contenu</step>           OK : traduire le contenu
 *   <étape n="1">contenu</étape>         FAIL : nom traduit
 *
 * Vérifie aussi la fermeture cohérente : un nom ouvert N fois doit être
 * fermé N fois.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { pairFrToOriginal } = require('../fr-helpers/pair-with-original');
const { extractXmlTagNames } = require('../fr-helpers/extract-protected');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-skills-fr', 'src/core-skills-fr', 'src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

function countOpen(text, tag) {
  const re = new RegExp(`<${tag}\\b`, 'g');
  return (text.match(re) || []).length;
}

function countClose(text, tag) {
  const re = new RegExp(`</${tag}>`, 'g');
  return (text.match(re) || []).length;
}

// Self-closing : `<tag attr="..."/>` does not need a separate `</tag>`.
function countSelfClosed(text, tag) {
  const re = new RegExp(`<${tag}\\b[^>]*\\/>`, 'g');
  return (text.match(re) || []).length;
}

function run() {
  runner.section('04 — Balises XML non traduites et bien équilibrées');

  const candidates = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    candidates.push(...walk(fullRoot, {
      extensions: ['.md', '.txt'],
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

    const enTags = extractXmlTagNames(enText);
    if (enTags.size === 0) continue;

    runner.test(`${frRel} : tous les noms de balises XML de l'original sont présents`, () => {
      const frTags = extractXmlTagNames(frText);
      const missing = [...enTags].filter((t) => !frTags.has(t));
      if (missing.length > 0) {
        throw new Error(`balises absentes du FR : ${missing.join(', ')}`);
      }
    });

    // For each tag that exists in the FR, verify open/close counts are balanced.
    runner.test(`${frRel} : balises ouvertes et fermées en nombre égal`, () => {
      const frTags = extractXmlTagNames(frText);
      const unbalanced = [];
      for (const tag of frTags) {
        const frOpens = countOpen(frText, tag);
        const frCloses = countClose(frText, tag);
        const frSelfClosed = countSelfClosed(frText, tag);
        if (frCloses === 0) continue;
        const frOpeningsNeedingClose = frOpens - frSelfClosed;
        if (frOpeningsNeedingClose === frCloses) continue;

        // Compare with EN : if upstream already has the same imbalance, the
        // FR mirroring the same imbalance is not our regression — skip it.
        // Real regressions require EN balanced AND FR unbalanced.
        const enOpens = countOpen(enText, tag);
        const enCloses = countClose(enText, tag);
        const enSelfClosed = countSelfClosed(enText, tag);
        const enBalanced = enCloses === 0 || (enOpens - enSelfClosed) === enCloses;
        if (!enBalanced) continue;

        unbalanced.push(`<${tag}> : ${frOpens} ouvertures (dont ${frSelfClosed} self-closing) vs ${frCloses} fermetures`);
      }
      runner.assert(
        unbalanced.length === 0,
        `balises non équilibrées :\n  ${unbalanced.join('\n  ')}`,
      );
    });
  }

  runner.test('au moins une paire testée', () => {
    runner.assert(pairsTested > 0, 'aucune paire FR/EN');
  });
}

if (require.main === module) {
  runner.header('Lot 2 / 04 — Balises XML');
  run();
  runner.summary();
}

module.exports = { run };
