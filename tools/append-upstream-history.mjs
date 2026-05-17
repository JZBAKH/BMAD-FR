#!/usr/bin/env node
/**
 * Ajoute le rapport `upstream-sync-report.md` (généré par `upstream-sync-report.mjs`)
 * en tête du fichier `HISTORIQUE-UPSTREAM-fr.md`.
 *
 * Le rapport le plus récent apparaît en haut. Le fichier d'historique est créé
 * avec un header s'il n'existe pas. Si aucune nouveauté upstream à signaler,
 * rien n'est écrit (on évite de polluer l'historique avec des "rien à faire").
 *
 * Utilisé par `.github/workflows/upstream-sync-watch.yml`.
 */

import { readFile, writeFile, access, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const REPORT_PATH = join(REPO_ROOT, 'upstream-sync-report.md');
const HISTORY_PATH = join(REPO_ROOT, 'HISTORIQUE-UPSTREAM-fr.md');

const HEADER = `# Historique mensuel — Veille upstream BMAD-METHOD

> Fichier auto-généré le 1er de chaque mois par \`.github/workflows/upstream-sync-watch.yml\`.
> Snapshot des changements entre l'upstream \`bmad-code-org/BMAD-METHOD\` et notre fork
> au moment de la génération. Le rapport le plus récent est en haut.

---

`;

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function adaptReport(content) {
  // Le rapport généré commence par "# Veille upstream du YYYY-MM-DD".
  // Pour l'inscrire dans le fichier cumulatif :
  //  - "# Veille upstream du YYYY-MM-DD" → "## YYYY-MM-DD" (niveau 2)
  //  - Tous les autres titres : décalés d'un niveau (## → ###, ### → ####)
  //  - Retirer la mention "_Issue générée automatiquement par..._"
  //  - Retirer la section finale "Méthode recommandée pour chaque lot"
  let lines = content.split('\n');

  // 1. Retirer la ligne "_Issue générée automatiquement..._"
  lines = lines.filter((l) => !l.startsWith('_Issue générée automatiquement'));

  // 2. Couper à partir de la section "Méthode recommandée" (peut être de
  //    n'importe quel niveau dans le rapport d'origine)
  const methodIdx = lines.findIndex((l) => /^#{2,4} Méthode recommandée/.test(l));
  if (methodIdx >= 0) {
    let cutAt = methodIdx;
    for (let i = methodIdx - 1; i >= 0; i--) {
      if (lines[i] === '---') {
        cutAt = i;
        break;
      }
      if (lines[i].trim() !== '') break;
    }
    lines = lines.slice(0, cutAt);
  }

  // 3. Décaler la hiérarchie des titres d'un niveau (pour s'inscrire
  //    proprement sous le titre niveau 2 de la date).
  //    Le tout premier "# Veille upstream du YYYY-MM-DD" devient juste "## YYYY-MM-DD".
  lines = lines.map((line, idx) => {
    if (idx === 0 && line.startsWith('# Veille upstream du ')) {
      return line.replace(/^# Veille upstream du /, '## ');
    }
    // Décaler tous les autres titres (## → ###, ### → ####, ...) sans
    // descendre en-dessous de h6
    const m = line.match(/^(#{1,5}) (.*)$/);
    if (m) {
      return '#' + m[1] + ' ' + m[2];
    }
    return line;
  });

  // 4. Compresser les doubles lignes vides successives
  const compressed = [];
  for (const l of lines) {
    if (l.trim() === '' && compressed.at(-1)?.trim() === '') continue;
    compressed.push(l);
  }
  lines = compressed;

  // 5. Retirer les lignes vides à la fin
  while (lines.length && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  return lines.join('\n');
}

async function main() {
  if (!(await fileExists(REPORT_PATH))) {
    console.error(`Report file does not exist: ${REPORT_PATH}`);
    process.exit(1);
  }

  const rawReport = await readFile(REPORT_PATH, 'utf8');

  // Si le rapport indique "aucune nouveauté", on n'enregistre rien (évite de
  // polluer l'historique avec des entrées vides chaque mois).
  if (rawReport.includes('🎉 **Aucune nouveauté upstream à traiter.**')) {
    console.log('🎉 Aucune nouveauté upstream — rien à ajouter à l\'historique.');
    // Cleanup du rapport temporaire pour ne pas le laisser traîner
    await unlink(REPORT_PATH).catch(() => {});
    process.exit(0);
  }

  const adapted = adaptReport(rawReport);

  let existingBody = '';
  if (await fileExists(HISTORY_PATH)) {
    const existing = await readFile(HISTORY_PATH, 'utf8');
    // Strip header pour le ré-écrire à neuf (gère les futures évolutions du header)
    const sep = '---\n\n';
    const sepIdx = existing.indexOf(sep);
    if (existing.startsWith('# Historique mensuel') && sepIdx >= 0) {
      existingBody = existing.slice(sepIdx + sep.length);
    } else {
      // Fichier existant sans header attendu — on le préfixe quand même
      existingBody = existing;
    }
  }

  const newBlock = `${adapted}\n\n---\n\n`;
  const finalContent = HEADER + newBlock + existingBody;

  await writeFile(HISTORY_PATH, finalContent, 'utf8');

  // Cleanup du rapport temporaire (il a été archivé dans l'historique)
  await unlink(REPORT_PATH).catch(() => {});

  console.log(`✅ Rapport ajouté en tête de ${HISTORY_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
