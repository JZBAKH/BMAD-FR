/**
 * Lot 2 - Test 07 : les valeurs YAML booléennes restent en anglais (`true`,
 * `false`). Une traduction par `vrai`/`faux` ferait planter le parseur, qui
 * traiterait alors la valeur comme une chaîne.
 *
 * Stratégie : pour chaque .yaml/.yml -fr, on vérifie qu'aucune occurrence
 * de pattern ': vrai' ou ': faux' n'apparaît en valeur de clé.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

// Match ": vrai" or ": faux" at end-of-value position. The YAML parser would
// not accept these; we want to catch them BEFORE the parser does.
const FORBIDDEN_RE = /:\s+(vrai|faux|Vrai|Faux|VRAI|FAUX)\s*(#.*)?$/m;

function run() {
  runner.section('07 — Booléens YAML restent true/false (pas vrai/faux)');

  const yamlFiles = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    yamlFiles.push(...walk(fullRoot, { extensions: ['.yaml', '.yml'], base: REPO_ROOT }));
  }

  if (yamlFiles.length === 0) {
    runner.warn('Aucun .yaml/.yml -fr trouvé');
    return;
  }

  for (const relPath of yamlFiles) {
    runner.test(`${relPath} : pas de ": vrai" / ": faux"`, () => {
      const content = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
      const lines = content.split(/\r?\n/);
      const offending = [];
      for (let i = 0; i < lines.length; i++) {
        if (FORBIDDEN_RE.test(lines[i])) {
          offending.push(`ligne ${i + 1} : ${lines[i].trim()}`);
        }
      }
      if (offending.length > 0) {
        throw new Error(`booléens traduits :\n  ${offending.join('\n  ')}`);
      }
    });
  }
}

if (require.main === module) {
  runner.header('Lot 2 / 07 — Booléens YAML');
  run();
  runner.summary();
}

module.exports = { run };
