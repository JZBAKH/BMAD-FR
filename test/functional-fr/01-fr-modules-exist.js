/**
 * Lot 1 - Test 01 : les trois modules -fr existent et sont peuplés.
 *
 * Vérifie la présence physique de :
 *   - src/bmm-fr/      (avec module.yaml et au moins un agent)
 *   - src/core-fr/     (avec module.yaml et au moins un skill)
 *   - src/utility-fr/  (avec agent-components/)
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

function exists(rel) {
  return fs.existsSync(path.join(REPO_ROOT, rel));
}

function isNonEmptyDir(rel) {
  const full = path.join(REPO_ROOT, rel);
  if (!fs.existsSync(full)) return false;
  const stat = fs.statSync(full);
  if (!stat.isDirectory()) return false;
  return fs.readdirSync(full).length > 0;
}

function run() {
  runner.section('01 — Modules -fr présents et peuplés');

  runner.test('src/bmm-fr/ existe', () => {
    runner.assert(isNonEmptyDir('src/bmm-fr'), 'src/bmm-fr/ est manquant ou vide');
  });
  runner.test('src/bmm-fr/module.yaml existe', () => {
    runner.assert(exists('src/bmm-fr/module.yaml'), 'module.yaml manquant dans bmm-fr');
  });
  runner.test('src/bmm-fr/agents/ contient au moins un .agent.yaml', () => {
    const dir = 'src/bmm-fr/agents';
    runner.assert(exists(dir), `dossier ${dir} manquant`);
    const files = fs.readdirSync(path.join(REPO_ROOT, dir));
    const yamls = files.filter((f) => f.endsWith('.agent.yaml'));
    runner.assert(yamls.length > 0, `aucun .agent.yaml trouvé dans ${dir}`);
  });

  runner.test('src/core-fr/ existe', () => {
    runner.assert(isNonEmptyDir('src/core-fr'), 'src/core-fr/ est manquant ou vide');
  });
  runner.test('src/core-fr/module.yaml existe', () => {
    runner.assert(exists('src/core-fr/module.yaml'), 'module.yaml manquant dans core-fr');
  });
  runner.test('src/core-fr/skills/ contient au moins un skill', () => {
    const dir = 'src/core-fr/skills';
    runner.assert(exists(dir), `dossier ${dir} manquant`);
    const subdirs = fs.readdirSync(path.join(REPO_ROOT, dir), { withFileTypes: true })
      .filter((d) => d.isDirectory());
    runner.assert(subdirs.length > 0, `aucun skill trouvé dans ${dir}`);
  });

  runner.test('src/utility-fr/ existe', () => {
    runner.assert(isNonEmptyDir('src/utility-fr'), 'src/utility-fr/ est manquant ou vide');
  });
  runner.test('src/utility-fr/agent-components/ existe', () => {
    runner.assert(isNonEmptyDir('src/utility-fr/agent-components'), 'agent-components manquant dans utility-fr');
  });
}

if (require.main === module) {
  runner.header('Lot 1 / 01 — Modules -fr présents');
  run();
  runner.summary();
}

module.exports = { run };
