const path = require('node:path');
const fs = require('fs-extra');

/**
 * Find the BMAD project root directory by looking for package.json
 * or specific BMAD markers
 */
function findProjectRoot(startPath = __dirname) {
  let currentPath = path.resolve(startPath);

  // Keep going up until we find package.json with bmad-method or bmad-fr
  while (currentPath !== path.dirname(currentPath)) {
    const packagePath = path.join(currentPath, 'package.json');

    if (fs.existsSync(packagePath)) {
      try {
        const pkg = fs.readJsonSync(packagePath);
        // MODIFICATION FR : Ajout de la détection bmad-fr et core-fr
        if (
          pkg.name === 'bmad-method' ||
          pkg.name === 'bmad-fr' ||
          fs.existsSync(path.join(currentPath, 'src', 'core')) ||
          fs.existsSync(path.join(currentPath, 'src', 'core-fr'))
        ) {
          return currentPath;
        }
      } catch {
        // Continue searching
      }
    }

    // MODIFICATION FR : Marqueur des agents FR
    if (
      fs.existsSync(path.join(currentPath, 'src', 'core', 'agents')) ||
      fs.existsSync(path.join(currentPath, 'src', 'core-fr', 'agents'))
    ) {
      return currentPath;
    }

    currentPath = path.dirname(currentPath);
  }

  // If we can't find it, use process.cwd() as fallback
  return process.cwd();
}

// Cache the project root after first calculation
let cachedRoot = null;

function getProjectRoot() {
  if (!cachedRoot) {
    cachedRoot = findProjectRoot();
  }
  return cachedRoot;
}

/**
 * Get path to source directory
 */
function getSourcePath(...segments) {
  return path.join(getProjectRoot(), 'src', ...segments);
}

/**
 * Get path to a module's directory
 *
 * Modules built-in (présents directement sous src/) :
 *   - LEGACY (pré-refactor mars 2026, encore référencé par l'ancien CLI tools/cli/) :
 *       'core'    → 'core-fr'
 *       'bmm'     → 'bmm-fr'
 *       'utility' → 'utility-fr'
 *   - NOUVEAU (post-refactor upstream) :
 *       'bmm-skills'  → 'bmm-skills-fr'
 *       'core-skills' → 'core-skills-fr'
 *       'scripts'     → 'scripts' (Python natif, pas de traduction)
 *
 * Tout chemin physique passe par cette fonction → garantit que le
 * contenu chargé/copié est en français quand une version FR existe.
 *
 * Tous les autres modules (modules tiers / community) sont cherchés
 * dans les répertoires frères ou dans node_modules.
 */
function getModulePath(moduleName, ...segments) {
  // Mapping explicite des modules built-in vers leur version FR.
  // L'ordre n'a pas d'importance — chaque clé est un nom de module exact.
  const FRENCH_MODULE_MAP = {
    // Anciens noms (legacy CLI tools/cli/)
    core: 'core-fr',
    bmm: 'bmm-fr',
    utility: 'utility-fr',
    // Nouveaux noms (upstream actuel + nouveau CLI tools/installer/)
    'bmm-skills': 'bmm-skills-fr',
    'core-skills': 'core-skills-fr',
    // scripts/ contient du Python natif, pas de traduction nécessaire
    scripts: 'scripts',
  };

  if (Object.prototype.hasOwnProperty.call(FRENCH_MODULE_MAP, moduleName)) {
    const frenchModule = FRENCH_MODULE_MAP[moduleName];
    return path.join(getProjectRoot(), 'src', frenchModule, ...segments);
  }

  // For other modules (assumed to be sibling directories or in node_modules)
  const externalModulePath = path.join(getProjectRoot(), '..', moduleName, ...segments);
  if (fs.existsSync(externalModulePath)) {
    return externalModulePath;
  }

  return path.join(getProjectRoot(), 'node_modules', moduleName, ...segments);
}

module.exports = {
  getProjectRoot,
  getSourcePath,
  getModulePath,
};
