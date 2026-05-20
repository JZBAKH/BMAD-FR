import { execSync } from 'node:child_process';
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const UPSTREAM_REF = process.env.UPSTREAM_REF || 'upstream/main';
const TRACKED_EXT = new Set(['.md', '.yaml', '.yml', '.csv', '.json']);

function git(args) {
  return execSync(`git ${args}`, { cwd: REPO_ROOT, encoding: 'utf8' });
}

function listUpstreamFiles(prefix) {
  const out = git(`ls-tree -r --name-only ${UPSTREAM_REF} -- ${prefix}`);
  return out
    .split('\n')
    .filter(Boolean)
    .filter((p) => {
      const idx = p.lastIndexOf('.');
      return idx !== -1 && TRACKED_EXT.has(p.slice(idx));
    });
}

function listUpstreamModules() {
  const out = git(`ls-tree -d --name-only ${UPSTREAM_REF}:src`);
  return out.split('\n').filter(Boolean);
}

async function listLocalFrModules() {
  const entries = await readdir(join(REPO_ROOT, 'src'), { withFileTypes: true });
  return entries.filter((e) => e.isDirectory() && e.name.endsWith('-fr')).map((e) => e.name.slice(0, -3));
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function fetchUpstream() {
  try {
    git('fetch upstream main --quiet');
  } catch (error) {
    console.error('Failed to fetch upstream :', error.message);
    process.exit(2);
  }
}

async function buildReport() {
  await fetchUpstream();

  const upstreamModules = listUpstreamModules();
  const localFrModules = await listLocalFrModules();

  const newModules = upstreamModules.filter((m) => !localFrModules.includes(m));
  const trackedModules = upstreamModules.filter((m) => localFrModules.includes(m));

  const moduleReports = [];
  for (const m of trackedModules) {
    const upstreamFiles = listUpstreamFiles(`src/${m}/`);
    const missing = [];
    for (const upstreamPath of upstreamFiles) {
      const frPath = upstreamPath.replace(`src/${m}/`, `src/${m}-fr/`);
      if (!(await fileExists(join(REPO_ROOT, frPath)))) {
        missing.push({ upstreamPath, frPath });
      }
    }
    moduleReports.push({
      module: m,
      upstreamFileCount: upstreamFiles.length,
      missing,
    });
  }

  return { newModules, moduleReports, generatedAt: new Date().toISOString() };
}

function renderIssueBody(report) {
  const lines = [];
  const date = report.generatedAt.slice(0, 10);
  lines.push(`# Veille upstream du ${date}`, '', '_Issue générée automatiquement par `.github/workflows/upstream-sync-watch.yml`._', '');

  const totalNewFiles = report.moduleReports.reduce((acc, r) => acc + r.missing.length, 0);
  lines.push(
    '## Résumé',
    '',
    `- **Nouveaux modules** dans upstream non encore importés : **${report.newModules.length}**`,
    `- **Nouveaux fichiers** dans des modules existants côté FR : **${totalNewFiles}**`,
    '',
  );

  if (report.newModules.length > 0) {
    lines.push('## Modules à importer', '');
    for (const m of report.newModules) {
      lines.push(`- [ ] \`src/${m}/\` → créer \`src/${m}-fr/\` puis traduire (voir GLOSSAIRE.md)`);
    }
    lines.push('');
  }

  for (const r of report.moduleReports) {
    if (r.missing.length === 0) continue;
    lines.push(`## Module \`${r.module}\` — ${r.missing.length} fichiers à traduire`, '');
    for (const { upstreamPath, frPath } of r.missing.slice(0, 100)) {
      lines.push(`- [ ] \`${frPath}\` (source : \`${upstreamPath}\`)`);
    }
    if (r.missing.length > 100) {
      lines.push(`- _… et ${r.missing.length - 100} de plus_`);
    }
    lines.push('');
  }

  if (totalNewFiles === 0 && report.newModules.length === 0) {
    lines.push('🎉 **Aucune nouveauté upstream à traiter.** Tout est à jour.', '');
  }

  lines.push(
    '---',
    '',
    '### Méthode recommandée pour chaque lot',
    '',
    '1. Copier les fichiers source upstream dans un dossier sandbox externe au repo',
    '2. Briefer Gemini avec [GLOSSAIRE.md](GLOSSAIRE.md) en system prompt + version anglaise',
    '3. Récupérer la traduction et la placer dans le chemin `-fr` correspondant',
    '4. Lancer `npm run audit:translation` localement pour vérifier',
    '5. Commit avec message Conventional Commits, ex : `feat(<module>-fr): translate <skill or workflow>`',
  );

  return lines.join('\n');
}

async function main() {
  const report = await buildReport();
  const body = renderIssueBody(report);

  const outPath = process.env.OUT_FILE || join(REPO_ROOT, 'upstream-sync-report.md');
  await writeFile(outPath, body, 'utf8');

  process.stdout.write(`\nReport written to ${outPath}\n`);

  const totalNewFiles = report.moduleReports.reduce((acc, r) => acc + r.missing.length, 0);
  if (totalNewFiles === 0 && report.newModules.length === 0) {
    process.stdout.write('NOTHING_NEW=true\n');
  } else {
    process.stdout.write(`NOTHING_NEW=false\n`);
    process.stdout.write(`NEW_MODULES=${report.newModules.length}\n`);
    process.stdout.write(`NEW_FILES=${totalNewFiles}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
