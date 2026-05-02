/**
 * Lot 2 - Test 12 : aucune chaîne anglaise user-facing dans les outils
 * d'installation, de validation et de schéma.
 *
 * Filet de sécurité contre la régression : à chaque sync upstream, ce test
 * détecte si de nouvelles chaînes anglaises ont été réinjectées dans les
 * outils CLI / schéma / validation sans être traduites.
 *
 * Périmètre couvert :
 *   - tools/cli/         (installeur, UI, IDE handlers, modules manager...)
 *   - tools/schema/      (messages Zod du schéma agent)
 *   - tools/validate-*.js (validateurs : agent-schema, doc-links, file-refs)
 *
 * Stratégie : pour chaque appel de fonction qui affiche du texte à
 * l'utilisateur (`prompts.log.*`, `prompts.intro/outro/note/box`,
 * `spinner.*`, `console.*`, `throw new Error`), on extrait le premier
 * argument string et on cherche des marqueurs anglais courants (the, of,
 * and, will, failed, could not, etc.). Si on en trouve, le test échoue
 * avec la liste des occurrences à traduire.
 *
 * Les chaînes d'identifiants techniques préservés (BMAD, Skill, Module,
 * etc.) ne déclenchent pas le test, ainsi que les valeurs sentinelles
 * documentées (`'unknown'`, `'built-in'`, etc.).
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const CLI_ROOT = path.join(REPO_ROOT, 'tools', 'cli');
const INSTALLER_FR_ROOT = path.join(REPO_ROOT, 'tools', 'installer-fr');
const SCHEMA_ROOT = path.join(REPO_ROOT, 'tools', 'schema');
const VALIDATE_FILES = [
  path.join(REPO_ROOT, 'tools', 'validate-agent-schema.js'),
  path.join(REPO_ROOT, 'tools', 'validate-doc-links.js'),
  path.join(REPO_ROOT, 'tools', 'validate-file-refs.js'),
];

// Patterns capturant les chaînes user-facing
const USER_FACING_RE = [
  /prompts\.log\.(?:info|warn|error|success|message|step)\(\s*([`'"])((?:\\.|(?!\1).)*?)\1/g,
  /prompts\.(?:intro|outro|note|box)\(\s*([`'"])((?:\\.|(?!\1).)*?)\1/g,
  /(?:confirm|text|select|multiselect|password)\(\s*\{[^}]*?message:\s*([`'"])((?:\\.|(?!\1).)*?)\1/g,
  /spinner\.(?:start|message|error|success|stop)\(\s*([`'"])((?:\\.|(?!\1).)*?)\1/g,
  /console\.(?:log|error|warn|info)\(\s*([`'"])((?:\\.|(?!\1).)*?)\1/g,
  /throw new Error\(\s*([`'"])((?:\\.|(?!\1).)*?)\1/g,
];

// Marqueurs anglais EXCLUSIFS (mots ou phrases qui n'existent pas tels
// quels en français). Volontairement conservateur — on préfère manquer
// quelques cas plutôt que générer des faux positifs sur des mots qui
// existent dans les 2 langues comme "installation", "configuration",
// "module", etc.
const ENGLISH_MARKERS = [
  // Articles / prépositions composées
  /\b(of the|to the|in the|on the|for the|from the|with the|by the)\b/i,
  // Phrases verbales typiques EN
  /\b(could not|unable to|failed to|trying to|going to|need to|want to)\b/i,
  /\b(this is|that is|these are|those are)\b/i,
  /\b(you can|you must|you will|you should|you have)\b/i,
  /\bplease\s+(check|enter|select|provide|make sure|verify|confirm|review)\b/i,
  // Gerundifs ou participes anglais qui n'existent pas tels quels en français
  /\b(removing|adding|creating|reading|writing|checking|copying|fetching|loading|skipping|saving)\b/i,
  /\b(installed|completed|cancelled|finished|started|stopped|skipped|missed|processed)\b/i,
  // Adverbes / adjectifs uniquement anglais
  /\b(successfully|currently|already|always|never|nothing|everything|something|anything)\b/i,
  // Pronoms / déterminants anglais
  /\b(your|this|that|these|those|their|whose)\b(?!\s*[:;)])/i,
  // Mots-clés de message d'erreur typiques
  /\b(detected|missing|invalid|corrupt|expired|deprecated|unsupported|not found|already exists)\b/i,
];

// Sentinelles internes ou identifiants à ignorer (matches qui ne sont pas
// du contenu user-facing à traduire)
const ALLOWED_SENTINELS = new Set([
  'unknown',     // detector / manifest sentinel
  'built-in',    // module source classification
  'standalone',  // module source classification
  'core',        // module identifier
  'manual',      // version flag
  'auto',        // version flag
  'partial',     // installation state marker
  'ok', 'error', 'warning',  // result statuses
]);

// Substrings techniques qui désactivent la détection EN sur la ligne entière
// (ces chaînes contiennent des termes techniques en EN qui sont conservés
// par convention selon le GLOSSAIRE).
const TECHNICAL_PASSTHROUGHS = [
  /BMAD|BMad|BMM|BMC|BMB|CIS/,
  /\bSkill\b|\bModule\b|\bWorkflow\b|\bAgent\b|\bSidecar\b/,
  /Quick Flow|Quick Update|Quick Spec|Quick Dev/,
  /Story Context XML/,
  /\bnpm\b|\bnpx\b|\bnode\b/,
  /\bbmad install\b|\bbmad uninstall\b|\bbmad-method\b/,
  /\.(yaml|yml|json|md|csv|txt)\b/,  // file extensions
  /_bmad|_config|_memory|_cfg/,
  /\$\{[a-zA-Z_][^}]*\}/,            // template variable in same string
];

function detectLine(content, index) {
  return content.slice(0, index).split('\n').length;
}

function isLikelyEnglishUserString(str) {
  if (!str || str.length < 5) return false;
  if (ALLOWED_SENTINELS.has(str.trim().toLowerCase())) return false;

  // Strip out interpolated expressions ${...} and ${{...}} : their content
  // is JS code (variable names, function calls), not user-facing text.
  // This avoids false positives on identifiers like ${this.handlers.keys()}.
  let cleaned = str.replace(/\$\{[^}]*\}/g, ' ');

  // Strip developer log markers like [DEBUG], [TRACE], [WARN], [INFO] which
  // are conventionally kept in English even in localised projects.
  if (/^\s*\[(DEBUG|TRACE|WARN|INFO|ERROR)\]/.test(cleaned)) return false;

  // Strip technical passthroughs (BMAD, Skill, Module, file paths, etc.)
  // before applying English-marker detection.
  for (const re of TECHNICAL_PASSTHROUGHS) {
    cleaned = cleaned.replace(new RegExp(re.source, 'g'), ' ');
  }

  if (cleaned.trim().length < 5) return false;

  for (const re of ENGLISH_MARKERS) {
    if (re.test(cleaned)) return true;
  }
  return false;
}

function collectFiles() {
  const files = [];

  // tools/cli/ : ancien CLI runtime (encore utilisé), à garder traduit
  files.push(...walk(CLI_ROOT, { extensions: ['.js', '.cjs', '.mjs'], base: REPO_ROOT }));

  // tools/installer-fr/ : nouveau CLI traduit (issu d'upstream actuel)
  if (fs.existsSync(INSTALLER_FR_ROOT)) {
    files.push(...walk(INSTALLER_FR_ROOT, { extensions: ['.js', '.cjs', '.mjs'], base: REPO_ROOT }));
  }

  // tools/schema/ : récursif, .js/.cjs/.mjs
  if (fs.existsSync(SCHEMA_ROOT)) {
    files.push(...walk(SCHEMA_ROOT, { extensions: ['.js', '.cjs', '.mjs'], base: REPO_ROOT }));
  }

  // tools/validate-*.js : fichiers individuels
  for (const abs of VALIDATE_FILES) {
    if (fs.existsSync(abs)) {
      files.push(path.relative(REPO_ROOT, abs).replace(/\\/g, '/'));
    }
  }

  return files;
}

function run() {
  runner.section('12 — Aucune chaîne anglaise user-facing (tools/cli/, tools/schema/, validate-*.js)');

  const files = collectFiles();
  if (files.length === 0) {
    runner.warn('Aucun fichier JS trouvé dans le périmètre couvert');
    return;
  }

  const offenders = [];

  for (const rel of files) {
    const full = path.join(REPO_ROOT, rel);
    const content = fs.readFileSync(full, 'utf8');

    for (const re of USER_FACING_RE) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(content)) !== null) {
        const str = m[2];
        if (isLikelyEnglishUserString(str)) {
          offenders.push({
            file: rel,
            line: detectLine(content, m.index),
            string: str.length > 80 ? str.slice(0, 77) + '...' : str,
          });
        }
      }
    }
  }

  runner.test(`aucune chaîne anglaise détectée (${files.length} fichiers scannés)`, () => {
    if (offenders.length === 0) return;
    const sample = offenders.slice(0, 15)
      .map((o) => `  • ${o.file}:${o.line} → "${o.string}"`)
      .join('\n');
    const more = offenders.length > 15 ? `\n  • ... et ${offenders.length - 15} autre(s)` : '';
    throw new Error(`${offenders.length} chaîne(s) anglaise(s) détectée(s) :\n${sample}${more}\n\nSi un cas est un faux positif (terme technique légitime), ajoutez-le à TECHNICAL_PASSTHROUGHS ou ALLOWED_SENTINELS dans test/language-fr/12-cli-no-english-strings.js.`);
  });
}

if (require.main === module) {
  runner.header('Lot 2 / 12 — Outils CLI/schema/validate sans chaînes anglaises');
  run();
  runner.summary();
}

module.exports = { run };
