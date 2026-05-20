const path = require('node:path');
const prompts = require('../prompts');
const { Installer } = require('../core/installer');
const { UI } = require('../ui');

const installer = new Installer();
const ui = new UI();

module.exports = {
  command: 'install',
  description: 'Installer les agents et outils BMAD Core',
  options: [
    ['-d, --debug', 'Activer la sortie de débogage pour la génération du manifeste'],
    ['--directory <path>', "Répertoire d'installation (par défaut : répertoire courant)"],
    ['--modules <modules>', 'Liste d\'IDs de modules à installer, séparés par des virgules (ex. : "bmm,bmb")'],
    [
      '--tools <tools>',
      'Liste d\'IDs d\'outils/IDE à configurer, séparés par des virgules (ex. : "claude-code,cursor"). Obligatoire pour une nouvelle installation non interactive (--yes). Exécutez avec --list-tools pour voir tous les IDs valides.',
    ],
    ['--list-tools', "Afficher tous les IDs d'outils/IDE pris en charge (avec leurs répertoires cibles) puis quitter."],
    [
      '--set <spec>',
      'Définir une option de configuration de module de manière non interactive. Format de la spec : <module>.<key>=<value> (ex. : bmm.project_knowledge=research). Répétable. Exécutez --list-options pour voir les clés disponibles.',
      (value, prev) => [...(prev || []), value],
      [],
    ],
    [
      '--list-options [module]',
      'Lister les clés --set disponibles pour tous les modules officiels connus localement, ou pour un seul module par code, puis quitter.',
    ],
    ['--action <type>', "Type d'action pour les installations existantes : install, update, ou quick-update"],
    ['--user-name <name>', "Nom à utiliser pour les agents (par défaut : nom d'utilisateur système)"],
    ['--communication-language <lang>', 'Langue pour la communication des agents (par défaut : English)'],
    ['--document-output-language <lang>', 'Langue pour la sortie des documents (par défaut : English)'],
    ['--output-folder <path>', 'Chemin du dossier de sortie relatif à la racine du projet (par défaut : _bmad-output)'],
    ['--custom-source <sources>', 'URLs Git ou chemins locaux séparés par des virgules pour installer des modules personnalisés'],
    ['-y, --yes', "Accepter toutes les valeurs par défaut et ignorer les invites lorsque c'est possible"],
    [
      '--channel <channel>',
      "Appliquer le canal (stable|next) à tous les modules externes en cours d'installation. --all-stable et --all-next sont des alias.",
    ],
    ['--all-stable', 'Alias pour --channel=stable. Résout les externes vers le tag de release stable le plus élevé.'],
    ['--all-next', 'Alias pour --channel=next. Résout les externes vers le HEAD de main.'],
    [
      '--next <code>',
      'Installer le module <code> depuis le HEAD de main (canal next). Répétable.',
      (value, prev) => [...(prev || []), value],
      [],
    ],
    [
      '--pin <spec>',
      'Épingler un module sur un tag spécifique : --pin CODE=TAG (ex. : --pin bmb=v1.7.0). Répétable.',
      (value, prev) => [...(prev || []), value],
      [],
    ],
  ],
  action: async (options) => {
    try {
      if (options.listTools) {
        const { formatPlatformList } = require('../ide/platform-codes');
        process.stdout.write((await formatPlatformList()) + '\n');
        process.exit(0);
      }

      if (options.listOptions !== undefined) {
        const { formatOptionsList } = require('../list-options');
        const moduleArg = options.listOptions === true ? null : options.listOptions;
        const { text, ok } = await formatOptionsList(moduleArg);
        const stream = ok ? process.stdout : process.stderr;
        // process.exit() forces immediate termination and can truncate the
        // buffered write when stdout/stderr is piped or captured by CI. Wait
        // for the write to flush, then set process.exitCode and return so the
        // event loop drains naturally. Non-zero exit when a single-module
        // lookup misses so a CI typo like `--list-options bmn` doesn't look
        // successful in scripts.
        await new Promise((resolve, reject) => {
          stream.write(text + '\n', (error) => (error ? reject(error) : resolve()));
        });
        process.exitCode = ok ? 0 : 1;
        return;
      }

      // Set debug flag as environment variable for all components
      if (options.debug) {
        process.env.BMAD_DEBUG_MANIFEST = 'true';
        await prompts.log.info('Mode débogage activé');
      }

      // Validate --set syntax up-front so malformed entries fail fast,
      // before we touch the network or filesystem. Parsed entries are
      // re-derived inside ui.js where overrides are seeded.
      if (options.set && options.set.length > 0) {
        const { parseSetEntries } = require('../set-overrides');
        try {
          parseSetEntries(options.set);
        } catch (error) {
          await prompts.log.error(error.message);
          process.exit(1);
        }
      }

      const config = await ui.promptInstall(options);

      // Handle cancel
      if (config.actionType === 'cancel') {
        await prompts.log.warn('Installation annulée.');
        process.exit(0);
      }

      // Handle quick update separately. --set is a post-install TOML patch so
      // it works the same way for quick-update as for a regular install — the
      // installer runs, then `applySetOverrides` patches the central config
      // files. Pass the parsed overrides through.
      if (config.actionType === 'quick-update') {
        const { parseSetEntries } = require('../set-overrides');
        config.setOverrides = parseSetEntries(options.set || []);
        const result = await installer.quickUpdate(config);
        await prompts.log.success('Mise à jour rapide terminée !');
        await prompts.log.info(`${result.moduleCount} modules mis à jour avec les paramètres préservés (${result.modules.join(', ')})`);
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
        if (error.stack && !error.expected) {
          await prompts.log.message(error.stack);
        }
      } catch {
        console.error(error.fullMessage || error.message || error);
      }
      process.exit(1);
    }
  },
};
