/**
 * Lot 2 - Test 10 : les `description:` du frontmatter des SKILL.md -fr
 * contiennent du français — c'est-à-dire au moins un caractère accentué
 * ou un mot français commun.
 *
 * Cette description est lue par les LLMs pour décider quand activer le skill ;
 * si elle reste en anglais, l'agent francophone aura un comportement bilingue
 * non voulu.
 */

const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

const FRENCH_INDICATORS_RE = /[éèêëàâäîïôöùûüçœÉÈÊËÀÂÄÎÏÔÖÙÛÜÇŒ]|\b(le|la|les|des|du|une|un|et|pour|avec|dans|sur|sous|chaque|cas|qui|que)\b/i;

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
  runner.section('10 — Descriptions des SKILL.md effectivement en français');

  const skillFiles = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    skillFiles.push(...walk(fullRoot, { extensions: ['.md'], base: REPO_ROOT })
      .filter((p) => p.endsWith('SKILL.md')));
  }

  if (skillFiles.length === 0) {
    runner.warn('Aucun SKILL.md trouvé sous src/*-fr/');
    return;
  }

  for (const relPath of skillFiles) {
    runner.test(`${relPath} : description: en français`, () => {
      const content = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
      const fm = extractFrontmatter(content);
      runner.assert(fm !== null, 'frontmatter absent ou invalide');
      const description = fm.description;
      runner.assert(typeof description === 'string', 'description manquante');
      runner.assert(description.length >= 20, 'description trop courte pour être probante');
      runner.assert(
        FRENCH_INDICATORS_RE.test(description),
        `description ne contient ni accent ni mot français courant : "${description.slice(0, 100)}..."`,
      );
    });
  }
}

if (require.main === module) {
  runner.header('Lot 2 / 10 — Descriptions SKILL.md');
  run();
  runner.summary();
}

module.exports = { run };
