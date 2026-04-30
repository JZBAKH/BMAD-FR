#!/usr/bin/env node
/**
 * One-shot helper that scans the CLI source tree for English user-facing
 * strings. Produces tools/cli/i18n-audit.md with one row per occurrence.
 *
 * The script extracts string literals passed as the first argument (or
 * `message:` field) of these calls :
 *   prompts.intro / outro / note / box
 *   prompts.log.info / warn / error / success / message / step
 *   prompts.confirm / text / select / multiselect (their `message:` field)
 *   spinner.start / message / error / success / stop
 *   console.log / error / warn
 *   throw new Error
 *
 * Run :  node tools/extract-cli-strings.mjs
 */

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const CLI_ROOT = join(REPO_ROOT, 'tools', 'cli');
const OUT = join(REPO_ROOT, 'tools', 'cli', 'i18n-audit.md');

const TRACKED_EXT = new Set(['.js', '.cjs', '.mjs']);

async function walk(dir, base = dir, results = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    if (entry.name === 'i18n') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, base, results);
    else if (entry.isFile()) {
      const ext = entry.name.slice(entry.name.lastIndexOf('.'));
      if (TRACKED_EXT.has(ext)) results.push(relative(base, full).replaceAll('\\', '/'));
    }
  }
  return results;
}

// Patterns we'll look for. The captured group is the string content.
const PATTERNS = [
  // prompts.log.<level>('text')
  { re: /prompts\.log\.(info|warn|error|success|message|step)\(\s*([`'"])((?:\\.|(?!\2).)*?)\2\s*[,)]/g, type: (m) => `log.${m[1]}` },
  // prompts.intro / outro / note / box (first arg)
  { re: /prompts\.(intro|outro|note|box)\(\s*([`'"])((?:\\.|(?!\2).)*?)\2/g, type: (m) => `prompts.${m[1]}` },
  // prompts.confirm / text / select / multiselect — message: 'text'
  { re: /(?:confirm|text|select|multiselect|password)\(\s*\{[^}]*?message:\s*([`'"])((?:\\.|(?!\1).)*?)\1/g, type: () => 'prompt-message' },
  // spinner.<method>('text')
  { re: /spinner\.(start|message|error|success|stop)\(\s*([`'"])((?:\\.|(?!\2).)*?)\2/g, type: (m) => `spinner.${m[1]}` },
  // console.<method>('text')
  { re: /console\.(log|error|warn|info)\(\s*([`'"])((?:\\.|(?!\2).)*?)\2/g, type: (m) => `console.${m[1]}` },
  // throw new Error('text')
  { re: /throw new Error\(\s*([`'"])((?:\\.|(?!\1).)*?)\1/g, type: () => 'throw-Error' },
];

// We skip strings that are clearly not user-facing prose
function isNotUserFacing(str) {
  // Empty / single-character / pure whitespace
  if (str.trim().length < 3) return true;
  // Looks like a path / filename / extension
  if (/^[\.\/\\]/.test(str.trim())) return true;
  if (/\.(yaml|yml|json|md|csv|js|cjs|mjs|txt|log)$/i.test(str.trim())) return true;
  // Looks like a regex / glob
  if (/^[\^\[]/.test(str.trim())) return true;
  // Pure identifier (no whitespace, all-lowercase or kebab-case)
  if (/^[a-z][a-z0-9_-]*$/.test(str.trim())) return true;
  // No alphabetic content at all
  if (!/[A-Za-z]{3}/.test(str)) return true;
  // Looks like a system code or technical key (snake_case, all caps)
  if (/^[A-Z_][A-Z0-9_]+$/.test(str.trim())) return true;
  // Looks like a key-only, no spaces, no real word
  if (str.trim().split(/\s+/).length === 1 && !/^[A-Z]/.test(str.trim())) return true;
  return false;
}

function detectLine(content, index) {
  return content.slice(0, index).split('\n').length;
}

async function main() {
  const files = await walk(CLI_ROOT, REPO_ROOT);
  files.sort();

  const byFile = new Map();
  let totalCount = 0;

  for (const rel of files) {
    const full = join(REPO_ROOT, rel);
    const content = await readFile(full, 'utf8');
    const fileEntries = [];
    const seen = new Set();

    for (const { re, type } of PATTERNS) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(content)) !== null) {
        // Different patterns have the captured string at different group indices
        let strContent;
        let typeLabel;
        if (m[3] !== undefined) {
          strContent = m[3];
          typeLabel = type(m);
        } else if (m[2] !== undefined) {
          strContent = m[2];
          typeLabel = type(m);
        } else if (m[1] !== undefined) {
          strContent = m[1];
          typeLabel = type(m);
        } else {
          continue;
        }

        if (isNotUserFacing(strContent)) continue;
        const key = `${strContent}@${m.index}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const line = detectLine(content, m.index);
        fileEntries.push({ line, type: typeLabel, str: strContent });
      }
    }

    if (fileEntries.length > 0) {
      fileEntries.sort((a, b) => a.line - b.line);
      byFile.set(rel, fileEntries);
      totalCount += fileEntries.length;
    }
  }

  // Render markdown
  const out = [];
  out.push('# Inventaire des messages CLI à traduire');
  out.push('');
  out.push(`**Total : ${totalCount} chaîne(s) anglaise(s) candidates dans ${byFile.size} fichier(s).**`);
  out.push('');
  out.push(`Ce fichier est auto-généré par \`tools/extract-cli-strings.mjs\`. Re-générer avec :`);
  out.push(`\`\`\`bash`);
  out.push(`node tools/extract-cli-strings.mjs`);
  out.push(`\`\`\``);
  out.push('');
  out.push('## Méthode de détection');
  out.push('');
  out.push('Patterns capturés :');
  out.push('- `prompts.log.{info,warn,error,success,message,step}(...)`');
  out.push('- `prompts.{intro,outro,note,box}(...)`');
  out.push('- `prompts.{confirm,text,select,multiselect,password}({ message: ... })`');
  out.push('- `spinner.{start,message,error,success,stop}(...)`');
  out.push('- `console.{log,error,warn,info}(...)`');
  out.push('- `throw new Error(...)`');
  out.push('');
  out.push('Filtres appliqués (chaînes EXCLUES de l\'audit) :');
  out.push('- Chaîne ≤ 2 caractères');
  out.push('- Chemins / extensions de fichier');
  out.push('- Identifiants techniques (snake_case isolé, all-caps)');
  out.push('- Chaînes sans contenu alphabétique');
  out.push('- Mots isolés en minuscules');
  out.push('');
  out.push('## Inventaire par fichier');
  out.push('');

  // Sort by string count descending
  const sortedFiles = [...byFile.entries()].sort((a, b) => b[1].length - a[1].length);

  for (const [file, entries] of sortedFiles) {
    out.push(`### ${file} — ${entries.length} chaîne(s)`);
    out.push('');
    out.push('| Ligne | Type | Anglais |');
    out.push('|---|---|---|');
    for (const { line, type, str } of entries) {
      const escaped = str.replaceAll('|', '\\|').replaceAll('\n', '\\n').replaceAll('`', '\\`');
      out.push(`| ${line} | \`${type}\` | ${escaped} |`);
    }
    out.push('');
  }

  await writeFile(OUT, out.join('\n'), 'utf8');
  process.stdout.write(`\nWrote ${relative(REPO_ROOT, OUT)} — ${totalCount} string(s) across ${byFile.size} file(s)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
