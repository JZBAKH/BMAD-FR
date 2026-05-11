#!/usr/bin/env node

/**
 * BMad-FR CLI — Wrapper d'exécution direct pour npx.
 * Garantit l'exécution correcte via npx depuis GitHub ou le registre npm.
 *
 * Route vers tools/installer-fr/ (nouveau CLI traduit, structure
 * upstream actuelle bmm-skills/core-skills) avec fallback vers
 * tools/cli/ (ancien CLI legacy) si l'installer-fr n'est pas présent.
 */

const { execSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

// Préfère le nouveau CLI installer-fr, fallback vers l'ancien cli/
const NEW_CLI = path.join(__dirname, 'installer-fr', 'bmad-cli.js');
const LEGACY_CLI = path.join(__dirname, 'cli', 'bmad-cli.js');
const bmadCliPath = fs.existsSync(NEW_CLI) ? NEW_CLI : LEGACY_CLI;

// Check if we're running in an npx temporary directory
const isNpxExecution = __dirname.includes('_npx') || __dirname.includes('.npm');

if (isNpxExecution) {
  // Running via npx - spawn child process to preserve user's working directory
  const args = process.argv.slice(2);

  if (!fs.existsSync(bmadCliPath)) {
    console.error('Erreur : impossible de trouver bmad-cli.js à', bmadCliPath);
    console.error('Répertoire courant :', __dirname);
    process.exit(1);
  }

  try {
    // Execute CLI from user's working directory (process.cwd()), not npm cache
    execSync(`node "${bmadCliPath}" ${args.join(' ')}`, {
      stdio: 'inherit',
      cwd: process.cwd(), // Préserve le répertoire de travail de l'utilisateur
    });
  } catch (error) {
    process.exit(error.status || 1);
  }
} else {
  // Local execution - use require
  require(bmadCliPath);
}
