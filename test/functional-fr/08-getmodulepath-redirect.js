/**
 * Lot 1 - Test 08 : la fonction getModulePath() retourne bien les dossiers -fr
 * pour les trois modules built-in (bmm, core, utility).
 *
 * Garantit que la modification FR de tools/cli/lib/project-root.js reste en place :
 * une régression sur cette fonction casserait l'installation française.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { getModulePath, getSourcePath } = require('../../tools/cli/lib/project-root');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

function run() {
  runner.section('08 — getModulePath redirige vers les versions -fr');

  for (const moduleName of ['bmm', 'core', 'utility']) {
    runner.test(`getModulePath('${moduleName}') pointe vers src/${moduleName}-fr`, () => {
      const result = getModulePath(moduleName).replaceAll('\\', '/');
      runner.assert(result.endsWith(`/src/${moduleName}-fr`), `attendu se terminer par "/src/${moduleName}-fr", obtenu "${result}"`);
    });
    runner.test(`getModulePath('${moduleName}', 'module.yaml') reste cohérent`, () => {
      const result = getModulePath(moduleName, 'module.yaml').replaceAll('\\', '/');
      runner.assert(
        result.endsWith(`/src/${moduleName}-fr/module.yaml`),
        `chemin imbriqué attendu se terminer par "/src/${moduleName}-fr/module.yaml", obtenu "${result}"`,
      );
    });
  }

  runner.test('getSourcePath ne redirige PAS (= comportement neutre)', () => {
    const result = getSourcePath('bmm').replaceAll('\\', '/');
    runner.assert(result.endsWith('/src/bmm'), `getSourcePath('bmm') doit pointer vers src/bmm (anglais) — sinon le fork est cassé`);
  });

  runner.test('Les chemins retournés existent réellement sur le disque', () => {
    for (const moduleName of ['bmm', 'core', 'utility']) {
      const p = getModulePath(moduleName);
      runner.assert(fs.existsSync(p), `${p} n'existe pas`);
    }
  });
}

if (require.main === module) {
  runner.header('Lot 1 / 08 — getModulePath redirect');
  run();
  runner.summary();
}

module.exports = { run };
