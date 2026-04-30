/**
 * Lot 1 - Test 07 : aucun fichier -fr ne contient de marqueur de conflit Git.
 *
 * Détecte <<<<<<<, =======, >>>>>>> en début de ligne. Empêche un push après
 * un merge non finalisé (ce qui était la cause initiale du blocage du repo).
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

// Conservative regex : marker at the very start of a line, with at least 7 < (matches Git's default).
const CONFLICT_MARKERS_RE = /^(<<<<<<<|=======|>>>>>>>)/m;

// We also want to catch markers in repo-level files like AUDIT-FINAL.md that
// are not under src/*-fr/. But AUDIT-FINAL.md *talks* about conflict markers
// as text — it's not a real conflict. So we skip a small allowlist.
const REPO_LEVEL_FILES_TO_CHECK = ['GLOSSAIRE.md', 'README.md', 'CONTRIBUTING-FR.md', 'TRANSLATION-STATUS.md'];

// Files that legitimately contain conflict-marker substrings as documentation.
const ALLOWED_DOCUMENTATION = new Set(['AUDIT-FINAL.md', 'CONTRIBUTING-FR.md']);

function run() {
  runner.section('07 — Pas de marqueurs de conflit Git dans les fichiers -fr');

  const candidates = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    candidates.push(...walk(fullRoot, {
      extensions: ['.md', '.yaml', '.yml', '.csv', '.txt', '.json'],
      base: REPO_ROOT,
    }));
  }
  for (const f of REPO_LEVEL_FILES_TO_CHECK) {
    if (fs.existsSync(path.join(REPO_ROOT, f))) candidates.push(f);
  }

  if (candidates.length === 0) {
    runner.warn('Aucun fichier candidat trouvé pour la détection de marqueurs de conflit');
    return;
  }

  const offenders = [];
  for (const relPath of candidates) {
    if (ALLOWED_DOCUMENTATION.has(relPath)) continue;
    const content = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
    if (CONFLICT_MARKERS_RE.test(content)) offenders.push(relPath);
  }

  runner.test(`aucun fichier ne contient <<<<<<< / ======= / >>>>>>> en début de ligne (${candidates.length} fichier(s) scanné(s))`, () => {
    if (offenders.length === 0) return;
    const sample = offenders.slice(0, 20).map((f) => `  • ${f}`).join('\n');
    const more = offenders.length > 20 ? `\n  • ... et ${offenders.length - 20} autre(s)` : '';
    throw new Error(`${offenders.length} fichier(s) avec marqueurs de conflit :\n${sample}${more}`);
  });
}

if (require.main === module) {
  runner.header('Lot 1 / 07 — Marqueurs de conflit');
  run();
  runner.summary();
}

module.exports = { run };
