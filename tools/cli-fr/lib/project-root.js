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
 * bmm is a built-in module directly under src/
 * core is also directly under src/
 * utility is also directly under src/ (provides agent-components shared by every module)
 * All other modules are stored remote
 */
function getModulePath(moduleName, ...segments) {
  // MODIFICATION FR : Redirection vers les dossiers -fr pour les modules built-in
  // (core, bmm, utility). Tout chemin physique passe par cette fonction → garantit
  // que le contenu chargé/copié est en français.
  if (moduleName === 'core' || moduleName === 'bmm' || moduleName === 'utility') {
    const frenchModule = moduleName + '-fr';
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
