/**
 * Agent Schema Validator CLI
 *
 * Scans all *.agent.yaml files in src/{core,modules/*}/agents/
 * and validates them against the Zod schema.
 *
 * Usage: node tools/validate-agent-schema.js [project_root]
 * Exit codes: 0 = success, 1 = validation failures
 *
 * Optional argument:
 *   project_root - Directory to scan (defaults to BMAD repo root)
 */

const { glob } = require('glob');
const yaml = require('yaml');
const fs = require('node:fs');
const path = require('node:path');
const { validateAgentFile } = require('./schema/agent.js');

/**
 * Main validation routine
 * @param {string} [customProjectRoot] - Optional project root to scan (for testing)
 */
async function main(customProjectRoot) {
  console.log('🔍 Recherche des fichiers d\'agents...\n');

  // Determine project root: use custom path if provided, otherwise default to repo root
  const project_root = customProjectRoot || path.join(__dirname, '..');

  // Find all agent files
  const agentFiles = await glob('src/{core,bmm}/agents/**/*.agent.yaml', {
    cwd: project_root,
    absolute: true,
  });

  if (agentFiles.length === 0) {
    console.log('❌ Aucun fichier d\'agent trouvé. Cela indique probablement une erreur de configuration.');
    console.log('   Fichiers *.agent.yaml attendus dans src/{core,modules/*}/agents/');
    process.exit(1);
  }

  console.log(`${agentFiles.length} fichier(s) d'agent trouvé(s)\n`);

  const errors = [];

  // Validate each file
  for (const filePath of agentFiles) {
    const relativePath = path.relative(process.cwd(), filePath);

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const agentData = yaml.parse(fileContent);

      // Convert absolute path to relative src/ path for module detection
      const srcRelativePath = relativePath.startsWith('src/') ? relativePath : path.relative(project_root, filePath).replaceAll('\\', '/');

      const result = validateAgentFile(srcRelativePath, agentData);

      if (result.success) {
        console.log(`✅ ${relativePath}`);
      } else {
        errors.push({
          file: relativePath,
          issues: result.error.issues,
        });
      }
    } catch (error) {
      errors.push({
        file: relativePath,
        issues: [
          {
            code: 'parse_error',
            message: `Échec du parsing YAML : ${error.message}`,
            path: [],
          },
        ],
      });
    }
  }

  // Report errors
  if (errors.length > 0) {
    console.log('\n❌ Validation échouée pour les fichiers suivants :\n');

    for (const { file, issues } of errors) {
      console.log(`\n📄 ${file}`);
      for (const issue of issues) {
        const pathString = issue.path.length > 0 ? issue.path.join('.') : '(racine)';
        console.log(`   Chemin : ${pathString}`);
        console.log(`   Erreur : ${issue.message}`);
        if (issue.code) {
          console.log(`   Code : ${issue.code}`);
        }
      }
    }

    console.log(`\n\n💥 ${errors.length} fichier(s) ont échoué à la validation`);
    process.exit(1);
  }

  console.log(`\n✨ Tous les ${agentFiles.length} fichier(s) d'agent ont passé la validation !\n`);
  process.exit(0);
}

// Run with optional command-line argument for project root
const customProjectRoot = process.argv[2];
main(customProjectRoot).catch((error) => {
  console.error('Erreur fatale :', error);
  process.exit(1);
});
