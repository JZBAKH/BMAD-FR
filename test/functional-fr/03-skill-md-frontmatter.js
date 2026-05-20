/**
 * Lot 1 - Test 03 : chaque SKILL.md dans -fr/ a un frontmatter valide :
 *   - le bloc --- ... --- existe et parse en YAML
 *   - "name" est non vide
 *   - "description" est non vide
 *
 * Les LLMs lisent ces deux champs pour décider quand activer le skill — un
 * SKILL.md mal formé empêche le skill d'être appelé.
 */

const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  try {
    return yaml.parse(match[1]);
  } catch {
    return null;
  }
}

function run() {
  runner.section('03 — Frontmatter des SKILL.md (-fr)');

  const skillFiles = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    const found = walk(fullRoot, { extensions: ['.md'], base: REPO_ROOT }).filter((p) => p.endsWith('SKILL.md'));
    skillFiles.push(...found);
  }

  if (skillFiles.length === 0) {
    runner.warn('Aucun SKILL.md trouvé sous src/*-fr/');
    return;
  }

  for (const relPath of skillFiles) {
    runner.test(`${relPath} a un frontmatter avec name et description`, () => {
      const content = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
      const fm = extractFrontmatter(content);
      runner.assert(fm !== null, 'frontmatter --- ... --- absent ou YAML mal formé');
      runner.assert(typeof fm.name === 'string' && fm.name.trim().length > 0, '"name" manquant ou vide');
      runner.assert(typeof fm.description === 'string' && fm.description.trim().length > 0, '"description" manquant ou vide');
    });
  }
}

if (require.main === module) {
  runner.header('Lot 1 / 03 — Frontmatter SKILL.md');
  run();
  runner.summary();
}

module.exports = { run };
