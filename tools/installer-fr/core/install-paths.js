const path = require('node:path');
const fs = require('../fs-native');
const { getProjectRoot } = require('../project-root');
const { BMAD_FOLDER_NAME } = require('../ide/shared/path-utils');

class InstallPaths {
  static async create(config) {
    const srcDir = getProjectRoot();
    await assertReadableDir(srcDir, 'racine source BMAD');

    const pkgPath = path.join(srcDir, 'package.json');
    await assertReadableFile(pkgPath, 'package.json');
    const version = require(pkgPath).version;

    const projectRoot = path.resolve(config.directory);
    await ensureWritableDir(projectRoot, 'racine du projet');

    const bmadDir = path.join(projectRoot, BMAD_FOLDER_NAME);
    const isUpdate = await fs.pathExists(bmadDir);

    const configDir = path.join(bmadDir, '_config');
    const coreDir = path.join(bmadDir, 'core');
    const scriptsDir = path.join(bmadDir, 'scripts');
    const customDir = path.join(bmadDir, 'custom');

    for (const [dir, label] of [
      [bmadDir, 'répertoire bmad'],
      [configDir, 'répertoire de configuration'],
      [coreDir, 'répertoire du module core'],
      [scriptsDir, 'répertoire des scripts partagés'],
      [customDir, 'répertoire des personnalisations'],
    ]) {
      await ensureWritableDir(dir, label);
    }

    return new InstallPaths({
      srcDir,
      version,
      projectRoot,
      bmadDir,
      configDir,
      coreDir,
      scriptsDir,
      customDir,
      isUpdate,
    });
  }

  constructor(props) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  manifestFile() {
    return path.join(this.configDir, 'manifest.yaml');
  }
  centralConfig() {
    return path.join(this.bmadDir, 'config.toml');
  }
  centralUserConfig() {
    return path.join(this.bmadDir, 'config.user.toml');
  }
  filesManifest() {
    return path.join(this.configDir, 'files-manifest.csv');
  }
  helpCatalog() {
    return path.join(this.configDir, 'bmad-help.csv');
  }
  moduleDir(name) {
    return path.join(this.bmadDir, name);
  }
  moduleConfig(name) {
    return path.join(this.bmadDir, name, 'config.yaml');
  }
}

async function assertReadableDir(dirPath, label) {
  const stat = await fs.stat(dirPath).catch(() => null);
  if (!stat) {
    throw new Error(`${label} n'existe pas : ${dirPath}`);
  }
  if (!stat.isDirectory()) {
    throw new Error(`${label} n'est pas un répertoire : ${dirPath}`);
  }
  try {
    await fs.access(dirPath, fs.constants.R_OK);
  } catch {
    throw new Error(`${label} n'est pas lisible : ${dirPath}`);
  }
}

async function assertReadableFile(filePath, label) {
  const stat = await fs.stat(filePath).catch(() => null);
  if (!stat) {
    throw new Error(`${label} n'existe pas : ${filePath}`);
  }
  if (!stat.isFile()) {
    throw new Error(`${label} n'est pas un fichier : ${filePath}`);
  }
  try {
    await fs.access(filePath, fs.constants.R_OK);
  } catch {
    throw new Error(`${label} n'est pas lisible : ${filePath}`);
  }
}

async function ensureWritableDir(dirPath, label) {
  const stat = await fs.stat(dirPath).catch(() => null);
  if (stat && !stat.isDirectory()) {
    throw new Error(`${label} existe mais n'est pas un répertoire : ${dirPath}`);
  }

  try {
    await fs.ensureDir(dirPath);
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error(`${label} : permission refusée lors de la création du répertoire : ${dirPath}`);
    }
    if (error.code === 'ENOSPC') {
      throw new Error(`${label} : plus d'espace disponible sur le périphérique : ${dirPath}`);
    }
    throw new Error(`${label} : impossible de créer le répertoire : ${dirPath} (${error.message})`);
  }

  try {
    await fs.access(dirPath, fs.constants.R_OK | fs.constants.W_OK);
  } catch {
    throw new Error(`${label} n'est pas accessible en écriture : ${dirPath}`);
  }
}

module.exports = { InstallPaths };
