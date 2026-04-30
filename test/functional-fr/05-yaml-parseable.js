/**
 * Lot 1 - Test 05 : tous les .yaml et .yml dans -fr/ doivent parser sans erreur.
 * Une coquille (clé manquant ses deux-points, indentation cassée, guillemets
 * non fermés) provoquerait une erreur d'installation difficile à diagnostiquer.
 */

const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

function run() {
  runner.section('05 — Parsing YAML/YML -fr');

  const yamlFiles = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    yamlFiles.push(...walk(fullRoot, { extensions: ['.yaml', '.yml'], base: REPO_ROOT }));
  }

  if (yamlFiles.length === 0) {
    runner.warn('Aucun .yaml/.yml trouvé sous src/*-fr/');
    return;
  }

  for (const relPath of yamlFiles) {
    runner.test(`${relPath} parse en YAML`, () => {
      const content = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
      try {
        yaml.parse(content);
      } catch (err) {
        throw new Error(err.message);
      }
    });
  }
}

if (require.main === module) {
  runner.header('Lot 1 / 05 — Parsing YAML');
  run();
  runner.summary();
}

module.exports = { run };
