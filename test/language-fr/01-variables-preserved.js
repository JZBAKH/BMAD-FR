/**
 * Lot 2 - Test 01 : les placeholders {var} et {{var}} de l'original anglais
 * sont tous présents dans la version traduite (et inversement, aucune nouvelle
 * variable n'a été inventée par la traduction).
 *
 * Cas critiques : {project-root}, {user_name}, {communication_language},
 * {{module}}, {{date}}, {MENU_STEP}, {AGENT_SPECIFIC_STEPS} ...
 *
 * Une variable supprimée par le traducteur casse l'exécution du framework :
 * la chaîne de configuration ne sera pas substituée et le LLM verra le
 * placeholder littéral ou un trou béant.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { pairFrToOriginal } = require('../fr-helpers/pair-with-original');
const { extractSingleVariables, extractDoubleVariables } = require('../fr-helpers/extract-protected');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-skills-fr', 'src/core-skills-fr', 'src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

function diffSets(a, b) {
  const aOnly = [];
  const bOnly = [];
  for (const x of a) if (!b.has(x)) aOnly.push(x);
  for (const x of b) if (!a.has(x)) bOnly.push(x);
  return { aOnly, bOnly };
}

function run() {
  runner.section('01 — Variables {var} et {{var}} préservées vs original');

  const candidateFiles = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    candidateFiles.push(
      ...walk(fullRoot, {
        extensions: ['.md', '.yaml', '.yml', '.csv', '.txt'],
        base: REPO_ROOT,
      }),
    );
  }

  let pairsTested = 0;
  for (const frRel of candidateFiles) {
    const enRel = pairFrToOriginal(frRel);
    if (!enRel) continue;
    const enFull = path.join(REPO_ROOT, enRel);
    if (!fs.existsSync(enFull)) continue;
    pairsTested++;

    const enText = fs.readFileSync(enFull, 'utf8');
    const frText = fs.readFileSync(path.join(REPO_ROOT, frRel), 'utf8');

    const enSingle = extractSingleVariables(enText);
    const frSingle = extractSingleVariables(frText);
    const enDouble = extractDoubleVariables(enText);
    const frDouble = extractDoubleVariables(frText);

    runner.test(`${frRel} : variables {single} préservées`, () => {
      const { aOnly, bOnly } = diffSets(enSingle, frSingle);
      if (aOnly.length === 0 && bOnly.length === 0) return;
      const msg = [];
      if (aOnly.length > 0) msg.push(`disparues du FR : ${aOnly.join(', ')}`);
      if (bOnly.length > 0) msg.push(`inventées par le FR : ${bOnly.join(', ')}`);
      throw new Error(msg.join(' | '));
    });

    runner.test(`${frRel} : variables {{double}} préservées`, () => {
      const { aOnly, bOnly } = diffSets(enDouble, frDouble);
      if (aOnly.length === 0 && bOnly.length === 0) return;
      const msg = [];
      if (aOnly.length > 0) msg.push(`disparues du FR : ${aOnly.join(', ')}`);
      if (bOnly.length > 0) msg.push(`inventées par le FR : ${bOnly.join(', ')}`);
      throw new Error(msg.join(' | '));
    });
  }

  runner.test(`au moins une paire FR/EN testée (sanity check)`, () => {
    runner.assert(pairsTested > 0, 'aucune paire FR/EN trouvée — câblage défaillant ?');
  });
}

if (require.main === module) {
  runner.header('Lot 2 / 01 — Variables préservées');
  run();
  runner.summary();
}

module.exports = { run };
