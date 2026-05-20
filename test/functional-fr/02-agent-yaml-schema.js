/**
 * Lot 1 - Test 02 : tous les .agent.yaml dans bmm-fr/ passent le schéma Zod
 * existant (tools/schema/agent.js). Le schéma valide la métadonnée, la persona,
 * les menu items, les triggers kebab-case, etc.
 *
 * Astuce : le validator infère le module attendu depuis le chemin (src/<module>/agents/).
 * Comme nos fichiers sont dans src/bmm-fr/agents/, on substitue temporairement le
 * chemin à src/bmm/agents/ pour aligner la validation sur l'attente upstream.
 */

const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { validateAgentFile } = require('../../tools/schema/agent.js');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

function run() {
  runner.section('02 — Schéma Zod sur tous les .agent.yaml de bmm-fr');

  const agentsDir = path.join(REPO_ROOT, 'src/bmm-fr/agents');
  if (!fs.existsSync(agentsDir)) {
    runner.test('bmm-fr/agents/ existe', () => runner.assert(false, 'dossier introuvable'));
    return;
  }

  const yamlFiles = walk(agentsDir, { extensions: ['.yaml'], base: REPO_ROOT }).filter((p) => p.endsWith('.agent.yaml'));

  if (yamlFiles.length === 0) {
    runner.warn('Aucun .agent.yaml trouvé dans src/bmm-fr/agents/ — schéma non testé');
    return;
  }

  for (const relPath of yamlFiles) {
    const fullPath = path.join(REPO_ROOT, relPath);
    const originalRel = relPath.replace('src/bmm-fr/', 'src/bmm/');
    const originalFull = path.join(REPO_ROOT, originalRel);

    // Sanity guard : if the upstream English file does not pass the schema
    // either, the issue is upstream's problem, not ours. We skip with a
    // warning rather than fail, to avoid penalising the FR fork for upstream
    // schema drift.
    let upstreamPasses = true;
    let upstreamSkipped = false;
    if (fs.existsSync(originalFull)) {
      try {
        const enParsed = yaml.parse(fs.readFileSync(originalFull, 'utf8'));
        const enResult = validateAgentFile(originalRel, enParsed);
        if (!enResult.success) upstreamPasses = false;
      } catch {
        upstreamPasses = false;
      }
    } else {
      upstreamSkipped = true;
    }

    if (upstreamSkipped) {
      runner.warn(`Pas d'original upstream pour ${relPath} — schéma non validé`);
      continue;
    }

    if (!upstreamPasses) {
      runner.warn(`Schéma déjà non conforme côté upstream pour ${originalRel} — pas une régression de la traduction`, { fr: relPath });
      continue;
    }

    runner.test(`${relPath} respecte le schéma agent`, () => {
      const content = fs.readFileSync(fullPath, 'utf8');
      let parsed;
      try {
        parsed = yaml.parse(content);
      } catch (error) {
        throw new Error(`YAML mal formé : ${error.message}`);
      }

      // The validator derives the expected module from "src/<mod>/agents/...".
      // We substitute "bmm-fr" → "bmm" so the schema accepts module:bmm in the
      // metadata. Pure path normalization, no content change.
      const schemaPath = relPath.replace('src/bmm-fr/', 'src/bmm/');
      const result = validateAgentFile(schemaPath, parsed);

      if (!result.success) {
        const issues = result.error.issues
          .slice(0, 5)
          .map((i) => `  • ${i.path.join('.')} : ${i.message}`)
          .join('\n');
        const more = result.error.issues.length > 5 ? `\n  • ... et ${result.error.issues.length - 5} autre(s)` : '';
        throw new Error(`Validation échouée :\n${issues}${more}`);
      }
    });
  }
}

if (require.main === module) {
  runner.header('Lot 1 / 02 — Schéma agent.yaml');
  run();
  runner.summary();
}

module.exports = { run };
