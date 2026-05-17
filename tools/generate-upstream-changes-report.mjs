#!/usr/bin/env node
/**
 * Génère UPSTREAM-CHANGES-fr.md : un rapport hebdomadaire qui résume
 * tout ce qui a changé entre `origin/main` (miroir upstream maintenu par
 * sync-main.yml) et `bmad-fr` (branche de travail FR) sur les chemins
 * surveillés (bmm-skills/, core-skills/, scripts/, tools/installer/).
 *
 * Pourquoi origin/main plutôt qu'origin/main : sync-main.yml fait
 * déjà le miroir 2× par jour. En comparant à origin/main on évite un
 * fetch upstream supplémentaire et on reste sur ce que GitHub a déjà
 * vu (cohérent avec l'UI de comparaison GitHub).
 *
 * Vue d'ensemble :
 * - Nouveaux fichiers upstream sans équivalent FR (à traduire en priorité)
 * - Fichiers EN modifiés dont la version FR existe mais peut être obsolète
 * - Métrique de "fraîcheur" globale de la traduction
 *
 * Utilisé par le workflow .github/workflows/upstream-changes-report.yml
 * mais utilisable aussi en local : `node tools/generate-upstream-changes-report.mjs`.
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUTPUT_PATH = join(REPO_ROOT, 'UPSTREAM-CHANGES-fr.md');

// Chemins surveillés (mêmes que sync-upstream-en.yml whitelist)
const WATCHED_PATHS = [
  'src/bmm-skills',
  'src/core-skills',
  'src/scripts',
  'tools/installer',
];

// Mapping EN → FR pour identifier les équivalents traduits
const EN_TO_FR_MAP = [
  ['src/bmm-skills/', 'src/bmm-skills-fr/'],
  ['src/core-skills/', 'src/core-skills-fr/'],
  ['src/scripts/', 'src/scripts-fr/'],
  ['tools/installer/', 'tools/installer-fr/'],
];

function git(args) {
  return execSync(`git ${args}`, { cwd: REPO_ROOT, encoding: 'utf8' }).trim();
}

function getEquivalentFrPath(enPath) {
  for (const [enPrefix, frPrefix] of EN_TO_FR_MAP) {
    if (enPath.startsWith(enPrefix)) {
      return enPath.replace(enPrefix, frPrefix);
    }
  }
  return null;
}

function getLastReportDate() {
  if (!existsSync(OUTPUT_PATH)) return null;
  try {
    const content = readFileSync(OUTPUT_PATH, 'utf8');
    const match = content.match(/_Rapport généré le ([\d-]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

function classifyChanges() {
  // Liste tous les fichiers changés entre bmad-fr et origin/main dans les chemins surveillés
  const pathArgs = WATCHED_PATHS.join(' ');
  const diffOutput = git(`diff --name-status origin/main bmad-fr -- ${pathArgs}`);

  const newOnUpstream = []; // Présents upstream, absents bmad-fr → nouveaux skills/fichiers
  const modifiedOnUpstream = []; // Présents dans les 2, contenus différents
  const removedFromUpstream = []; // Présents bmad-fr, absents upstream → upstream a supprimé

  for (const line of diffOutput.split('\n').filter(Boolean)) {
    const parts = line.split('\t');
    const status = parts[0];
    const path = parts[1];
    if (!path) continue;

    if (status === 'A') {
      // Existe dans bmad-fr, pas dans origin/main → on a un fichier qui n'est plus upstream
      removedFromUpstream.push(path);
    } else if (status === 'D') {
      // Existe dans origin/main, pas dans bmad-fr → nouveau upstream
      newOnUpstream.push(path);
    } else if (status === 'M' || status === 'T') {
      modifiedOnUpstream.push(path);
    }
  }

  return { newOnUpstream, modifiedOnUpstream, removedFromUpstream };
}

function countFrStaleness(modifiedFiles) {
  // Pour chaque fichier EN modifié, vérifier si une version FR existe
  // et marquer celle-ci comme potentiellement obsolète (à re-traduire)
  const staleFrFiles = [];
  const noFrEquivalent = [];

  for (const enPath of modifiedFiles) {
    const frPath = getEquivalentFrPath(enPath);
    if (!frPath) continue; // Pas un chemin "traductible" (ex : installer/ sans mapping direct)

    const frFullPath = join(REPO_ROOT, frPath);
    if (existsSync(frFullPath)) {
      staleFrFiles.push({ enPath, frPath });
    } else {
      noFrEquivalent.push({ enPath, frPath });
    }
  }

  return { staleFrFiles, noFrEquivalent };
}

function calculateFreshness(newOnUpstream, staleFrFiles) {
  // Compte total de fichiers EN dans la whitelist
  let totalEnFiles = 0;
  try {
    const allFiles = git(`ls-tree -r --name-only origin/main -- ${WATCHED_PATHS.join(' ')}`);
    totalEnFiles = allFiles.split('\n').filter(Boolean).length;
  } catch {
    totalEnFiles = 1;
  }

  const outOfSyncCount = newOnUpstream.length + staleFrFiles.length;
  const freshPercent = Math.max(0, Math.min(100, 100 - (outOfSyncCount / totalEnFiles) * 100));

  return { totalEnFiles, outOfSyncCount, freshPercent };
}

function buildReport() {
  const date = new Date().toISOString().slice(0, 10);
  const lastReport = getLastReportDate();
  const upstreamSha = git('rev-parse origin/main');
  const localSha = git('rev-parse bmad-fr');

  const { newOnUpstream, modifiedOnUpstream, removedFromUpstream } = classifyChanges();
  const { staleFrFiles, noFrEquivalent } = countFrStaleness(modifiedOnUpstream);
  const { totalEnFiles, outOfSyncCount, freshPercent } = calculateFreshness(
    newOnUpstream,
    staleFrFiles,
  );

  const lines = [];
  lines.push('# 🔄 Rapport hebdomadaire — Changements upstream à traiter');
  lines.push('');
  lines.push(`_Rapport généré le ${date} par \`.github/workflows/upstream-changes-report.yml\`._`);
  lines.push('');
  if (lastReport && lastReport !== date) {
    lines.push(`_Précédent rapport : ${lastReport}_`);
    lines.push('');
  }
  lines.push('## 📊 Vue d\'ensemble');
  lines.push('');
  lines.push(`- **origin/main** : \`${upstreamSha.slice(0, 8)}\``);
  lines.push(`- **bmad-fr** : \`${localSha.slice(0, 8)}\``);
  lines.push(`- **Fraîcheur de la traduction** : ${freshPercent.toFixed(1)}% (${totalEnFiles - outOfSyncCount}/${totalEnFiles} fichiers à jour)`);
  lines.push('');
  lines.push('| Catégorie | Nombre |');
  lines.push('|---|---|');
  lines.push(`| 🆕 Nouveaux fichiers upstream à importer/traduire | **${newOnUpstream.length}** |`);
  lines.push(`| 🔄 Traductions FR potentiellement obsolètes | **${staleFrFiles.length}** |`);
  lines.push(`| 🗑️ Fichiers supprimés upstream (orphelins côté fork) | **${removedFromUpstream.length}** |`);
  lines.push(`| ❓ EN modifié mais sans équivalent FR identifiable | ${noFrEquivalent.length} |`);
  lines.push('');

  if (newOnUpstream.length === 0 && staleFrFiles.length === 0 && removedFromUpstream.length === 0) {
    lines.push('## ✅ Aucun changement à traiter');
    lines.push('');
    lines.push('Le fork est synchronisé avec upstream. Aucune action requise.');
    lines.push('');
  } else {
    if (newOnUpstream.length > 0) {
      lines.push('## 🆕 Nouveaux fichiers upstream (à importer + traduire)');
      lines.push('');
      lines.push('Ces fichiers existent dans upstream mais pas dans le fork. À importer via le');
      lines.push('workflow `sync-upstream-en.yml` (auto quotidien) puis à traduire manuellement.');
      lines.push('');
      for (const path of newOnUpstream.slice(0, 50)) {
        const frPath = getEquivalentFrPath(path);
        const target = frPath ? ` → traduire dans \`${frPath}\`` : '';
        lines.push(`- [ ] \`${path}\`${target}`);
      }
      if (newOnUpstream.length > 50) {
        lines.push(`- _… et ${newOnUpstream.length - 50} autres_`);
      }
      lines.push('');
    }

    if (staleFrFiles.length > 0) {
      lines.push('## 🔄 Traductions FR potentiellement obsolètes');
      lines.push('');
      lines.push('Ces fichiers EN ont été modifiés upstream. La version FR existe mais peut');
      lines.push('avoir besoin d\'être mise à jour.');
      lines.push('');
      for (const { enPath, frPath } of staleFrFiles.slice(0, 50)) {
        lines.push(`- [ ] \`${enPath}\` → \`${frPath}\``);
      }
      if (staleFrFiles.length > 50) {
        lines.push(`- _… et ${staleFrFiles.length - 50} autres_`);
      }
      lines.push('');
    }

    if (removedFromUpstream.length > 0) {
      lines.push('## 🗑️ Fichiers supprimés upstream');
      lines.push('');
      lines.push('Ces fichiers existent dans le fork mais ont été supprimés upstream. À évaluer :');
      lines.push('garder (si toujours pertinent) ou supprimer (si obsolète).');
      lines.push('');
      for (const path of removedFromUpstream.slice(0, 30)) {
        lines.push(`- [ ] \`${path}\``);
      }
      if (removedFromUpstream.length > 30) {
        lines.push(`- _… et ${removedFromUpstream.length - 30} autres_`);
      }
      lines.push('');
    }
  }

  lines.push('---');
  lines.push('');
  lines.push('### 💡 Comment utiliser ce rapport');
  lines.push('');
  lines.push('1. Lire la **fraîcheur** en haut — si > 95%, rien d\'urgent.');
  lines.push('2. Pour les **nouveaux fichiers** : le sync auto les importera dans `bmm-skills/`. Toi tu les traduis vers `bmm-skills-fr/`.');
  lines.push('3. Pour les **traductions obsolètes** : compare avec `git diff origin/main..bmad-fr -- <chemin EN>` pour voir ce qui a changé, puis adapter la version FR.');
  lines.push('4. Pour les **fichiers supprimés upstream** : décide cas par cas.');
  lines.push('');
  lines.push('Le `test-fr.yml` continue de tourner en parallèle — si un test casse à cause d\'un changement upstream, tu reçois un email automatique de GitHub.');
  lines.push('');

  return lines.join('\n');
}

function main() {
  console.log('Génération du rapport upstream changes…');
  try {
    // S'assurer qu'on a origin/main à jour
    try {
      git('fetch origin main --quiet');
    } catch {
      console.warn('Avertissement : impossible de fetch origin/main. Le rapport utilise l\'état local.');
    }

    const report = buildReport();
    writeFileSync(OUTPUT_PATH, report, 'utf8');
    console.log(`✅ Rapport écrit dans ${OUTPUT_PATH}`);
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
}

main();
