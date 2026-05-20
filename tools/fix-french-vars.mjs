/**
 * One-shot helper that reverses the systematic francisation of system variables
 * in the BMAD-FR fork. Variable identifiers are part of the GLOSSAIRE.md
 * "Sanctuaire Absolu" and must remain in English so the framework's parser can
 * substitute them at runtime.
 *
 * Mappings here represent francisations that were observed across multiple
 * translated files. They are mechanical replacements (FR → EN), applied to
 * occurrences inside `{...}` and `{{...}}` placeholders only.
 *
 * Run :  node tools/fix-french-vars.mjs
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';
import { readdir } from 'node:fs/promises';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const FR_ROOTS = ['src/bmm-fr', 'src/core-fr', 'src/utility-fr'];

// Map of francised identifier → original English identifier.
// Add new entries when the test suite reports `inventées par le FR` /
// `disparues du FR` pairs that point to the same semantic variable.
const MAP = {
  liste: 'list',
  Nombre: 'number',
  nombre: 'number',
  note: 'rating',
  recommandation: 'recommendation',
  champs_complets: 'complete_fields',
  sections_completes: 'complete_sections',
  titre: 'title',
  titre_de_la_story: 'story_title',
  type_d_utilisateur: 'user_type',
  capacite: 'capability',
  valeur_benefice: 'value_benefit',
  'pre-condition': 'precondition',
  resultat_attendu: 'expected_outcome',
  criteres_supplementaires: 'additional_criteria',
  analyse_des_starters_evalues: 'analysis_of_evaluated_starters',
  pourquoi_ce_starter_a_ete_choisi: 'why_this_starter_was_chosen',
  outils_de_build_et_optimisation: 'build_tools_and_optimization',
  configuration_des_tests: 'testing_setup_and_configuration',
  structure_et_modeles_du_projet: 'project_structure_and_patterns',
  outils_de_developpement_et_workflow: 'development_tools_and_workflow',
  composants_ou_epics: 'components_or_epics',
  oui_si_vient_du_starter: 'yes_if_from_starter',
  nombre_de_conflits_potentiels: 'number_of_potential_conflicts',
  liste_stepsCompleted: 'stepsCompleted_list',
  Format: 'classification',
};

const TRACKED_EXT = new Set(['.md', '.yaml', '.yml', '.csv', '.txt']);

async function walk(dir, base = dir, results = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, base, results);
    } else if (entry.isFile()) {
      const ext = entry.name.slice(entry.name.lastIndexOf('.'));
      if (TRACKED_EXT.has(ext)) results.push(relative(base, full).replaceAll('\\', '/'));
    }
  }
  return results;
}

function applyMappings(text) {
  let modified = text;
  let totalReplacements = 0;
  for (const [fr, en] of Object.entries(MAP)) {
    // Replace inside single-curly placeholders : {fr} → {en}
    const reSingle = new RegExp(`\\{${fr}\\}`, 'g');
    modified = modified.replace(reSingle, () => {
      totalReplacements += 1;
      return `{${en}}`;
    });
    // Replace inside double-curly placeholders : {{fr}} → {{en}}
    const reDouble = new RegExp(`\\{\\{${fr}\\}\\}`, 'g');
    modified = modified.replace(reDouble, () => {
      totalReplacements += 1;
      return `{{${en}}}`;
    });
  }
  return { text: modified, count: totalReplacements };
}

async function main() {
  let totalFiles = 0;
  let modifiedFiles = 0;
  let totalReplacements = 0;

  for (const root of FR_ROOTS) {
    const fullRoot = join(REPO_ROOT, root);
    const files = await walk(fullRoot, REPO_ROOT);
    for (const rel of files) {
      totalFiles += 1;
      const full = join(REPO_ROOT, rel);
      const original = await readFile(full, 'utf8');
      const { text: updated, count } = applyMappings(original);
      if (count > 0) {
        await writeFile(full, updated, 'utf8');
        modifiedFiles += 1;
        totalReplacements += count;
        process.stdout.write(`${rel} : ${count} replacement(s)\n`);
      }
    }
  }

  process.stdout.write(`\nProcessed ${totalFiles} files. Modified ${modifiedFiles}. Total replacements : ${totalReplacements}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
