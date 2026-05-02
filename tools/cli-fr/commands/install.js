const path = require('node:path');
const prompts = require('../lib/prompts');
const { Installer } = require('../installers/lib/core/installer');
const { UI } = require('../lib/ui');

const installer = new Installer();
const ui = new UI();

module.exports = {
  command: 'install',
  description: 'Installer les agents et outils BMAD Core',
  options: [
    ['-d, --debug', 'Activer la sortie debug pour la génération du manifeste'],
    ['--directory <path>', 'Répertoire d\'installation (par défaut : répertoire courant)'],
    ['--modules <modules>', 'Liste d\'identifiants de modules à installer, séparés par des virgules (ex. : "bmm,bmb")'],
    [
      '--tools <tools>',
      'Liste d\'identifiants d\'outils/IDE à configurer, séparés par des virgules (ex. : "claude-code,cursor"). Utiliser "none" pour ignorer la configuration des outils.',
    ],
    ['--custom-content <paths>', 'Liste de chemins vers des modules/agents/workflows personnalisés, séparés par des virgules'],
    ['--action <type>', 'Type d\'action pour les installations existantes : install, update, quick-update, ou compile-agents'],
    ['--user-name <name>', 'Nom utilisé par les agents (par défaut : nom utilisateur système)'],
    ['--communication-language <lang>', 'Langue de communication des agents (par défaut : English)'],
    ['--document-output-language <lang>', 'Langue de sortie des documents (par défaut : English)'],
    ['--output-folder <path>', 'Chemin du dossier de sortie relatif à la racine du projet (par défaut : _bmad-output)'],
    ['-y, --yes', 'Accepter toutes les valeurs par défaut et ignorer les invites quand c\'est possible'],
  ],
  action: async (options) => {
    try {
      // Set debug flag as environment variable for all components
      if (options.debug) {
        process.env.BMAD_DEBUG_MANIFEST = 'true';
        await prompts.log.info('Mode debug activé');
      }

      const config = await ui.promptInstall(options);

      // Handle cancel
      if (config.actionType === 'cancel') {
        await prompts.log.warn('Installation annulée.');
        process.exit(0);
      }

      // Handle quick update separately
      if (config.actionType === 'quick-update') {
        const result = await installer.quickUpdate(config);
        await prompts.log.success('Mise à jour rapide terminée !');
        await prompts.log.info(`${result.moduleCount} module(s) mis à jour avec préservation des paramètres (${result.modules.join(', ')})`);
        process.exit(0);
      }

      // Handle compile agents separately
      if (config.actionType === 'compile-agents') {
        const result = await installer.compileAgents(config);
        await prompts.log.info(`${result.agentCount} agent(s) recompilé(s) avec personnalisations appliquées`);
        process.exit(0);
      }

      // Regular install/update flow
      const result = await installer.install(config);

      // Check if installation was cancelled
      if (result && result.cancelled) {
        process.exit(0);
      }

      // Check if installation succeeded
      if (result && result.success) {
        process.exit(0);
      }
    } catch (error) {
      try {
        if (error.fullMessage) {
          await prompts.log.error(error.fullMessage);
        } else {
          await prompts.log.error(`Échec de l'installation : ${error.message}`);
        }
        if (error.stack) {
          await prompts.log.message(error.stack);
        }
      } catch {
        console.error(error.fullMessage || error.message || error);
      }
      process.exit(1);
    }
  },
};
