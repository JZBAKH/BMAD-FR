#!/usr/bin/env node
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC_DIR = join(REPO_ROOT, 'src');
const OUT_MD = join(REPO_ROOT, 'TRANSLATION-STATUS.md');
const OUT_JSON = join(REPO_ROOT, 'translation-status.json');

const TRACKED_EXT = new Set(['.md', '.yaml', '.yml', '.csv']);
const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', 'build']);

const FR_ACCENTS = /[éèêëàâäîïôöùûüçœÉÈÊËÀÂÄÎÏÔÖÙÛÜÇŒ]/g;
const FR_WORDS = /\b(le|la|les|des|du|de|un|une|et|ou|dans|pour|avec|est|sont|être|avoir|vous|nous|ce|cette|ces|qui|que|dont|si|car|mais|aussi|plus|tous|toute|votre|notre|sur|sous)\b/gi;
const EN_WORDS = /\b(the|of|and|to|with|is|are|you|this|that|for|from|on|in|by|will|have|has|been|but|not|or|if|as|at|be|can|should)\b/gi;

const FRENCH_THRESHOLD = 0.05;

async function walk(dir, base = dir, results = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, base, results);
    } else if (entry.isFile()) {
      const ext = entry.name.slice(entry.name.lastIndexOf('.'));
      if (TRACKED_EXT.has(ext)) {
        results.push(relative(base, full).replaceAll('\\', '/'));
      }
    }
  }
  return results;
}

function scoreFrenchness(text) {
  if (!text || text.length < 20) return null;

  const chars = text.length;
  const accents = (text.match(FR_ACCENTS) || []).length;
  const frWords = (text.match(FR_WORDS) || []).length;
  const enWords = (text.match(EN_WORDS) || []).length;

  const totalWords = frWords + enWords;
  const accentRatio = accents / chars;
  const frWordRatio = totalWords === 0 ? 0 : frWords / totalWords;

  const score = accentRatio * 5 + frWordRatio * 0.5;

  return {
    score,
    accentRatio: Number(accentRatio.toFixed(4)),
    frWordRatio: Number(frWordRatio.toFixed(4)),
    accents,
    frWords,
    enWords,
    chars,
  };
}

async function readSafe(path) {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return null;
  }
}

async function listSrcModules() {
  const entries = await readdir(SRC_DIR, { withFileTypes: true });
  const modules = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (e.name.endsWith('-fr')) continue;
    modules.push(e.name);
  }
  return modules;
}

async function auditModule(name) {
  const originalDir = join(SRC_DIR, name);
  const frDir = join(SRC_DIR, `${name}-fr`);

  let frExists = true;
  try {
    await stat(frDir);
  } catch {
    frExists = false;
  }

  const originalFiles = await walk(originalDir);

  const result = {
    module: name,
    frModulePath: `src/${name}-fr`,
    originalModulePath: `src/${name}`,
    frModuleExists: frExists,
    originalFileCount: originalFiles.length,
    presentInFr: 0,
    missingInFr: [],
    untranslated: [],
    translated: [],
    indeterminate: [],
  };

  if (!frExists) {
    result.missingInFr = originalFiles;
    return result;
  }

  for (const rel of originalFiles) {
    const frPath = join(frDir, rel);
    const frContent = await readSafe(frPath);
    if (frContent === null) {
      result.missingInFr.push(rel);
      continue;
    }
    result.presentInFr += 1;

    const score = scoreFrenchness(frContent);
    if (!score) {
      result.indeterminate.push({ file: rel, reason: 'too_short' });
      continue;
    }

    if (score.score >= FRENCH_THRESHOLD) {
      result.translated.push({ file: rel, ...score });
    } else {
      result.untranslated.push({ file: rel, ...score });
    }
  }

  return result;
}

async function listMissingModules(modules) {
  const upstreamModulesOfInterest = ['bmm', 'core', 'utility', 'bmc', 'cis', 'bmb'];
  return upstreamModulesOfInterest.filter((m) => !modules.includes(m));
}

function pct(num, den) {
  if (den === 0) return '—';
  return `${((num / den) * 100).toFixed(1)}%`;
}

function renderModuleSection(report) {
  const lines = [];
  lines.push(`## Module : \`${report.module}\``);
  lines.push('');
  if (!report.frModuleExists) {
    lines.push(`❌ **Pas de version \`-fr\`** — \`src/${report.module}-fr/\` n'existe pas.`);
    lines.push('');
    lines.push(`- ${report.originalFileCount} fichiers à traduire dans l'original`);
    lines.push('');
    return lines.join('\n');
  }

  const totalScored = report.translated.length + report.untranslated.length;
  const presencePct = pct(report.presentInFr, report.originalFileCount);
  const translationPct = pct(report.translated.length, totalScored);

  lines.push(`- **Présence** : ${report.presentInFr}/${report.originalFileCount} fichiers (${presencePct})`);
  lines.push(`- **Traduits effectivement** : ${report.translated.length}/${totalScored} (${translationPct})`);
  lines.push(`- **Non traduits (copiés mais en anglais)** : ${report.untranslated.length}`);
  lines.push(`- **Manquants** : ${report.missingInFr.length}`);
  if (report.indeterminate.length > 0) {
    lines.push(`- **Indéterminés (trop courts)** : ${report.indeterminate.length}`);
  }
  lines.push('');

  if (report.missingInFr.length > 0) {
    lines.push('<details><summary>Fichiers manquants</summary>');
    lines.push('');
    for (const f of report.missingInFr.slice(0, 50)) {
      lines.push(`- \`${f}\``);
    }
    if (report.missingInFr.length > 50) {
      lines.push(`- _… et ${report.missingInFr.length - 50} de plus_`);
    }
    lines.push('');
    lines.push('</details>');
    lines.push('');
  }

  if (report.untranslated.length > 0) {
    lines.push('<details><summary>Fichiers présents mais non traduits</summary>');
    lines.push('');
    for (const f of report.untranslated.slice(0, 50)) {
      lines.push(`- \`${f.file}\` (score=${f.score.toFixed(3)}, FR=${f.frWords}, EN=${f.enWords})`);
    }
    if (report.untranslated.length > 50) {
      lines.push(`- _… et ${report.untranslated.length - 50} de plus_`);
    }
    lines.push('');
    lines.push('</details>');
    lines.push('');
  }

  return lines.join('\n');
}

function renderReport(reports, missingModules, generatedAt) {
  const lines = [];
  lines.push('# Tableau de bord de la traduction BMAD-FR');
  lines.push('');
  lines.push(`_Généré automatiquement le ${generatedAt} par \`tools/audit-translation-coverage.mjs\`._`);
  lines.push('');
  lines.push('## Résumé global');
  lines.push('');
  lines.push('| Module | Présence | Traduction effective | Manquants | Statut |');
  lines.push('|---|---|---|---|---|');

  for (const r of reports) {
    if (!r.frModuleExists) {
      lines.push(`| \`${r.module}\` | 0/${r.originalFileCount} | — | ${r.originalFileCount} | ❌ Module \`-fr\` absent |`);
      continue;
    }
    const totalScored = r.translated.length + r.untranslated.length;
    const presencePct = pct(r.presentInFr, r.originalFileCount);
    const translationPct = pct(r.translated.length, totalScored);
    let status;
    const tPct = totalScored === 0 ? 0 : (r.translated.length / totalScored) * 100;
    if (r.missingInFr.length === 0 && tPct >= 95) status = '✅ Complet';
    else if (r.missingInFr.length === 0 && tPct >= 70) status = '🟡 Bon';
    else if (r.presentInFr > 0) status = '🟠 Partiel';
    else status = '❌ Vide';
    lines.push(`| \`${r.module}\` | ${r.presentInFr}/${r.originalFileCount} (${presencePct}) | ${translationPct} | ${r.missingInFr.length} | ${status} |`);
  }

  if (missingModules.length > 0) {
    lines.push('');
    lines.push('## Modules upstream non importés');
    lines.push('');
    for (const m of missingModules) {
      lines.push(`- \`${m}\` — à importer depuis upstream puis traduire en \`${m}-fr\``);
    }
  }

  lines.push('');
  lines.push('## Détail par module');
  lines.push('');

  for (const r of reports) {
    lines.push(renderModuleSection(r));
  }

  lines.push('## Méthodologie');
  lines.push('');
  lines.push('- **Présence** : un fichier est compté comme présent si son chemin relatif existe à l\'identique dans `<module>-fr/`.');
  lines.push('- **Traduction effective** : heuristique combinant la densité de caractères accentués (é, è, à, ç…) et le ratio mots français vs anglais courants. Score `>= 0.05` = traduit.');
  lines.push('- **Limites** : un fichier essentiellement composé de code, d\'identifiants techniques ou très court peut être classé incorrectement. Le GLOSSAIRE.md autorise (et exige) de garder en anglais les clés système, prénoms d\'agents, codes de menu, balises XML, blocs de code, etc.');
  lines.push('- **Extensions analysées** : `.md`, `.yaml`, `.yml`, `.csv`. Les `.json` (souvent métadonnées système) sont ignorés.');

  return lines.join('\n');
}

async function main() {
  const generatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ') + ' UTC';
  const modules = await listSrcModules();
  const reports = [];
  for (const m of modules) {
    process.stdout.write(`Scanning module ${m}…\n`);
    reports.push(await auditModule(m));
  }
  const missingModules = await listMissingModules(modules);

  const md = renderReport(reports, missingModules, generatedAt);
  await writeFile(OUT_MD, md, 'utf8');

  const summary = reports.map((r) => ({
    module: r.module,
    frModuleExists: r.frModuleExists,
    originalFileCount: r.originalFileCount,
    presentInFr: r.presentInFr,
    translated: r.translated.length,
    untranslated: r.untranslated.length,
    missing: r.missingInFr.length,
    indeterminate: r.indeterminate.length,
  }));
  await writeFile(
    OUT_JSON,
    JSON.stringify({ generatedAt, missingModules, reports: summary }, null, 2),
    'utf8',
  );

  process.stdout.write(`\nWrote ${relative(REPO_ROOT, OUT_MD)} and ${relative(REPO_ROOT, OUT_JSON)}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
