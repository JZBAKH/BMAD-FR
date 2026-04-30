/**
 * Lot 2 - Test 11 : score de francisation minimum par fichier.
 *
 * Pour chaque fichier -fr de prose (markdown, yaml/csv assez "humain"),
 * applique l'heuristique de french-score.js et signale ceux qui passent
 * sous le seuil. La liste blanche translation-exceptions.json couvre les
 * faux positifs documentés (CSV de patterns techniques, mort code, etc.).
 *
 * Comportement : un fichier ni dans la liste blanche ni assez long pour
 * être scoré n'est PAS signalé (warning silencieux). Un fichier assez long
 * mais sous le seuil ET non whitelisté = échec.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { scoreFrenchness, isTooShortToScore, FRENCH_THRESHOLD } = require('../fr-helpers/french-score');
const { isExcluded } = require('../fr-helpers/exceptions');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];
const TEST_NAME = '11-french-coverage-floor';

function run() {
  runner.section(`11 — Score francisation ≥ ${FRENCH_THRESHOLD} (avec liste blanche)`);

  const candidates = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    candidates.push(...walk(fullRoot, {
      extensions: ['.md', '.yaml', '.yml', '.csv', '.txt'],
      base: REPO_ROOT,
    }));
  }

  if (candidates.length === 0) {
    runner.warn('Aucun fichier -fr à scorer');
    return;
  }

  const failures = [];
  let scored = 0;
  let skippedShort = 0;
  let skippedExcluded = 0;

  for (const relPath of candidates) {
    const content = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');

    if (isTooShortToScore(content)) {
      skippedShort++;
      continue;
    }

    const exclusion = isExcluded(TEST_NAME, relPath);
    if (exclusion.excluded) {
      skippedExcluded++;
      runner.warn(`Exclu par liste blanche : ${relPath}`, { reason: exclusion.reason });
      continue;
    }

    const sc = scoreFrenchness(content);
    scored++;
    if (sc.decision !== 'french') {
      failures.push({ path: relPath, score: sc });
    }
  }

  runner.info(`Scorés : ${scored} | Trop courts : ${skippedShort} | Exclus (whitelist) : ${skippedExcluded}`);

  runner.test(`tous les fichiers scorés ont un score ≥ ${FRENCH_THRESHOLD}`, () => {
    if (failures.length === 0) return;
    const lines = failures.slice(0, 20).map((f) => {
      const s = f.score;
      return `  • ${f.path} (score=${s.score}, accents=${s.accents}, fr=${s.frWords}, en=${s.enWords})`;
    }).join('\n');
    const more = failures.length > 20 ? `\n  • ... et ${failures.length - 20} autre(s)` : '';
    throw new Error(`${failures.length} fichier(s) en-dessous du seuil :\n${lines}${more}\n\nSi un fichier est légitimement non traduit (mort code, données techniques),\najoutez-le à test/fr-helpers/translation-exceptions.json sous "${TEST_NAME}".`);
  });
}

if (require.main === module) {
  runner.header('Lot 2 / 11 — Couverture FR');
  run();
  runner.summary();
}

module.exports = { run };
