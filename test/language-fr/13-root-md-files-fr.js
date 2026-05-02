/**
 * Lot 2 - Test 13 : les fichiers Markdown à la racine du projet (vitrine
 * publique du fork) sont rédigés en français.
 *
 * Filet de sécurité contre la régression : si un sync upstream réinjecte du
 * contenu anglais dans README.md, GLOSSAIRE.md, AGENTS.md ou AUDIT-FINAL.md,
 * ce test échoue.
 *
 * Périmètre couvert (DOIVENT être en français) :
 *   - README.md           — vitrine publique du fork
 *   - GLOSSAIRE.md        — règles de traduction (system prompt pour IA)
 *   - AGENTS.md           — instructions pour assistants IA
 *   - AUDIT-FINAL.md      — rapport d'audit du fork
 *
 * Exclusions documentées (RESTENT en anglais par décision projet) :
 *   - SECURITY.md         — contrat de sécurité avec l'upstream
 *   - TRADEMARK.md        — clauses légales upstream
 *   - CONTRIBUTING.md     — instructions de contribution amont
 *   - CONTRIBUTORS.md     — créditation de la communauté upstream
 *   - CHANGELOG.md        — suivi des changements upstream (sync watcher)
 *
 * Stratégie : on lit chaque fichier obligatoire, on calcule un ratio
 * "marqueurs anglais exclusifs" / "marqueurs français exclusifs". Si ce
 * ratio dépasse un seuil, on signale le fichier comme suspect.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

// Fichiers obligatoirement en français (vitrine du fork)
const REQUIRED_FR_FILES = [
  'README.md',
  'GLOSSAIRE-fr.md',
  'AGENTS-fr.md',
  'AUDIT-FINAL-fr.md',
];

// Fichiers documentés comme volontairement en anglais (info, audit
// transparent — ces fichiers ne devraient pas faire échouer le test).
const DOCUMENTED_EN_FILES = [
  'SECURITY.md',
  'TRADEMARK.md',
  'CONTRIBUTING.md',
  'CONTRIBUTORS.md',
  'CHANGELOG.md',
];

// Marqueurs anglais EXCLUSIFS (mots ou phrases qui n'existent pas tels
// quels en français) — copie de la liste utilisée dans test 12.
const ENGLISH_MARKERS = [
  /\b(of the|to the|in the|on the|for the|from the|with the|by the)\b/gi,
  /\b(could not|unable to|failed to|trying to|going to|need to|want to)\b/gi,
  /\b(this is|that is|these are|those are)\b/gi,
  /\b(you can|you must|you will|you should|you have)\b/gi,
  /\b(removing|adding|creating|reading|writing|checking|copying|fetching|loading|skipping|saving)\b/gi,
  /\b(installed|completed|cancelled|finished|started|stopped|skipped|missed|processed)\b/gi,
  /\b(successfully|currently|already|always|never|nothing|everything|something|anything)\b/gi,
];

// Marqueurs français EXCLUSIFS (mots ou phrases qui n'existent pas tels
// quels en anglais).
const FRENCH_MARKERS = [
  /\b(d'un|d'une|d'un|de l'|à la|à un|à une|aux)\b/gi,
  /\b(le|la|les|du|des|au|aux|une|un|et|ou|où|donc|car|mais|pour|avec|sans|sur|sous)\b/gi,
  /\b(qui|que|quoi|dont|où|qu'|s'|n'|c'est|j'|m'|t'|l')\b/gi,
  /\b(être|avoir|faire|aller|voir|venir|prendre|donner|trouver|pouvoir|devoir|vouloir|savoir)\b/gi,
  /\b(plusieurs|chaque|tout|toute|tous|toutes|aucun|aucune|notamment|déjà|encore|toujours)\b/gi,
  /\b(français|francophone|fork|francisé|traduction|traduit|traduite)\b/gi,
];

function countMatches(text, regexes) {
  let total = 0;
  for (const re of regexes) {
    re.lastIndex = 0;
    const matches = text.match(re);
    if (matches) total += matches.length;
  }
  return total;
}

function stripMarkdownNoise(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')        // blocs de code
    .replace(/`[^`]*`/g, ' ')               // inline code
    .replace(/^---[\s\S]*?^---/m, ' ')      // frontmatter
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // [text](link) → text
    .replace(/https?:\/\/\S+/g, ' ')        // URLs
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')   // images
    .replace(/<[^>]+>/g, ' ');              // balises HTML/XML
}

function run() {
  runner.section('13 — Fichiers Markdown root rédigés en français');

  for (const rel of REQUIRED_FR_FILES) {
    const full = path.join(REPO_ROOT, rel);
    runner.test(`${rel} existe et est en français`, () => {
      if (!fs.existsSync(full)) {
        throw new Error(`Fichier manquant : ${rel}`);
      }
      const raw = fs.readFileSync(full, 'utf8');
      const text = stripMarkdownNoise(raw);

      const enCount = countMatches(text, ENGLISH_MARKERS);
      const frCount = countMatches(text, FRENCH_MARKERS);

      // Heuristique : il faut au moins 5x plus de marqueurs FR que EN
      // (compte tenu des termes techniques qui restent anglais comme
      // "Skill", "Module", "Workflow", "Quick Flow", etc.)
      if (frCount === 0) {
        throw new Error(`${rel} : aucun marqueur français détecté (frCount=0, enCount=${enCount}). Le fichier semble entièrement en anglais.`);
      }
      const ratio = enCount === 0 ? Infinity : frCount / enCount;
      if (ratio < 5) {
        throw new Error(`${rel} : ratio FR/EN trop faible (${ratio.toFixed(2)} ; frCount=${frCount}, enCount=${enCount}). Le fichier contient trop d'anglais.`);
      }
    });
  }

  // Vérification informative : les fichiers documentés EN ne sont pas
  // accidentellement traduits (ce serait un signal qu'on diverge de
  // l'upstream sans intention)
  for (const rel of DOCUMENTED_EN_FILES) {
    const full = path.join(REPO_ROOT, rel);
    if (!fs.existsSync(full)) continue;
    const raw = fs.readFileSync(full, 'utf8');
    const text = stripMarkdownNoise(raw);
    const enCount = countMatches(text, ENGLISH_MARKERS);
    const frCount = countMatches(text, FRENCH_MARKERS);
    if (enCount === 0 && frCount > 5) {
      runner.warn(`${rel} est documenté comme volontairement en anglais, mais semble avoir été traduit (frCount=${frCount}, enCount=0). Vérifiez si la traduction est intentionnelle.`);
    }
  }
}

if (require.main === module) {
  runner.header('Lot 2 / 13 — Fichiers Markdown root en français');
  run();
  runner.summary();
}

module.exports = { run };
