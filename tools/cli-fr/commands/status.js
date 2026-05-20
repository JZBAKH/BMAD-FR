const path = require('node:path');
const prompts = require('../lib/prompts');
const { Installer } = require('../installers/lib/core/installer');
const { Manifest } = require('../installers/lib/core/manifest');
const { UI } = require('../lib/ui');

const installer = new Installer();
const manifest = new Manifest();
const ui = new UI();

module.exports = {
  command: 'status',
  description: "Afficher le statut de l'installation BMAD et les versions des modules",
  options: [],
  action: async (options) => {
    try {
      // Find the bmad directory
      const projectDir = process.cwd();
      const { bmadDir } = await installer.findBmadDir(projectDir);

      // Check if bmad directory exists
      const fs = require('fs-extra');
      if (!(await fs.pathExists(bmadDir))) {
        await prompts.log.warn('Aucune installation BMAD trouvée dans le répertoire courant.');
        await prompts.log.message(`Emplacement attendu : ${bmadDir}`);
        await prompts.log.message('Lancez "bmad install" pour configurer une nouvelle installation.');
        process.exit(0);
        return;
      }

      // Read manifest
      const manifestData = await manifest._readRaw(bmadDir);

      if (!manifestData) {
        await prompts.log.warn("Aucun manifeste d'installation BMAD trouvé.");
        await prompts.log.message('Lancez "bmad install" pour configurer une nouvelle installation.');
        process.exit(0);
        return;
      }

      // Get installation info
      const installation = manifestData.installation || {};
      const modules = manifestData.modules || [];

      // Check for available updates (only for external modules)
      const availableUpdates = await manifest.checkForUpdates(bmadDir);

      // Display status
      await ui.displayStatus({
        installation,
        modules,
        availableUpdates,
        bmadDir,
      });

      process.exit(0);
    } catch (error) {
      await prompts.log.error(`Échec de la vérification du statut : ${error.message}`);
      if (process.env.BMAD_DEBUG) {
        await prompts.log.message(error.stack);
      }
      process.exit(1);
    }
  },
};
