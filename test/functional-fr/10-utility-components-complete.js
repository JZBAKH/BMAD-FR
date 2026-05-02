/**
 * Lot 1 - Test 10 : utility-fr/agent-components/ contient les 10 fragments
 * attendus avec un nombre de lignes identique à l'original upstream.
 *
 * Ces fragments sont injectés dans les agents au moment de la compilation —
 * un fragment manquant provoque l'erreur "Fragment not found" dans
 * activation-builder.js au runtime.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const COMPONENTS_DIR_FR = 'src/utility-fr/agent-components';
const COMPONENTS_DIR_EN = 'src/utility/agent-components';

const EXPECTED_FRAGMENTS = [
  'activation-rules.txt',
  'activation-steps.txt',
  'agent-command-header.md',
  'agent.customize.template.yaml',
  'handler-action.txt',
  'handler-data.txt',
  'handler-exec.txt',
  'handler-multi.txt',
  'handler-tmpl.txt',
  'menu-handlers.txt',
];

function countLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Count newlines : if the file ends without a final \n, we still count the
  // last partial line.
  if (content.length === 0) return 0;
  let lines = (content.match(/\n/g) || []).length;
  if (!content.endsWith('\n')) lines += 1;
  return lines;
}

function run() {
  runner.section('10 — utility-fr/agent-components/ complet');

  // Le module `utility` a été retiré upstream lors du refactor de mars 2026
  // (intégré ailleurs ou supprimé). Le dossier src/utility/ n'existe plus,
  // donc la comparaison de compteurs avec l'original upstream est impossible.
  //
  // On vérifie seulement que les fragments FR existent encore dans
  // src/utility-fr/agent-components/ (en tant que fallback historique pour
  // le runtime CLI legacy `tools/cli/`).
  const fullEnDir = path.join(REPO_ROOT, COMPONENTS_DIR_EN);
  if (!fs.existsSync(fullEnDir)) {
    runner.warn(
      `${COMPONENTS_DIR_EN} n'existe plus (utility retiré upstream). ` +
        `Test de compteur de lignes désactivé. Vérification de présence FR uniquement.`,
    );
    for (const fragment of EXPECTED_FRAGMENTS) {
      const frPath = `${COMPONENTS_DIR_FR}/${fragment}`;
      runner.test(`${fragment} existe dans utility-fr (legacy)`, () => {
        runner.assert(
          fs.existsSync(path.join(REPO_ROOT, frPath)),
          `fragment manquant : ${frPath}`,
        );
      });
    }
    return;
  }

  for (const fragment of EXPECTED_FRAGMENTS) {
    const frPath = `${COMPONENTS_DIR_FR}/${fragment}`;
    const enPath = `${COMPONENTS_DIR_EN}/${fragment}`;

    runner.test(`${fragment} existe dans utility-fr`, () => {
      runner.assert(
        fs.existsSync(path.join(REPO_ROOT, frPath)),
        `fragment manquant : ${frPath}`,
      );
    });

    runner.test(`${fragment} a le même nombre de lignes que l'original upstream`, () => {
      const fullEn = path.join(REPO_ROOT, enPath);
      const fullFr = path.join(REPO_ROOT, frPath);
      runner.assert(fs.existsSync(fullEn), `original manquant : ${enPath}`);
      runner.assert(fs.existsSync(fullFr), `traduit manquant : ${frPath}`);
      const enLines = countLines(fullEn);
      const frLines = countLines(fullFr);
      runner.assert(
        enLines === frLines,
        `compteur de lignes différent : ${frLines} fr vs ${enLines} en`,
      );
    });
  }
}

if (require.main === module) {
  runner.header('Lot 1 / 10 — utility-fr complet');
  run();
  runner.summary();
}

module.exports = { run };
