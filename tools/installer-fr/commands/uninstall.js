const path = require('node:path');
const fs = require('../fs-native');
const prompts = require('../prompts');
const { Installer } = require('../core/installer');

const installer = new Installer();

module.exports = {
  command: 'uninstall',
  description: 'Supprimer l\'installation BMAD du projet courant',
  options: [
    ['-y, --yes', 'Supprimer tous les composants BMAD sans confirmation (préserve les artefacts utilisateur)'],
    ['--directory <path>', 'Répertoire du projet (par défaut : répertoire courant)'],
  ],
  action: async (options) => {
    try {
      let projectDir;

      if (options.directory) {
        // Explicit --directory flag takes precedence
        projectDir = path.resolve(options.directory);
      } else if (options.yes) {
        // Non-interactive mode: use current directory
        projectDir = process.cwd();
      } else {
        // Interactive: ask user which directory to uninstall from
        // select() handles cancellation internally (exits process)
        const dirChoice = await prompts.select({
          message: 'D\'où voulez-vous désinstaller BMAD ?',
          choices: [
            { value: 'cwd', name: `Répertoire courant (${process.cwd()})` },
            { value: 'other', name: 'Un autre répertoire...' },
          ],
        });

        if (dirChoice === 'other') {
          // text() handles cancellation internally (exits process)
          const customDir = await prompts.text({
            message: 'Entrez le chemin du répertoire du projet :',
            placeholder: process.cwd(),
            validate: (value) => {
              if (!value || value.trim().length === 0) return 'Le chemin du répertoire est requis';
            },
          });

          projectDir = path.resolve(customDir.trim());
        } else {
          projectDir = process.cwd();
        }
      }

      if (!(await fs.pathExists(projectDir))) {
        await prompts.log.error(`Le répertoire n'existe pas : ${projectDir}`);
        process.exit(1);
      }

      const { bmadDir } = await installer.findBmadDir(projectDir);

      if (!(await fs.pathExists(bmadDir))) {
        await prompts.log.warn('Aucune installation BMAD trouvée.');
        process.exit(0);
      }

      const existingInstall = await installer.getStatus(projectDir);
      const version =
        existingInstall.installed && existingInstall.version !== 'unknown'
          ? existingInstall.version
          : 'inconnue';
      const modules = existingInstall.moduleIds.join(', ');
      const ides = existingInstall.ides.join(', ');

      const outputFolder = await installer.getOutputFolder(projectDir);

      await prompts.intro('Désinstallation BMAD');
      await prompts.note(`Version : ${version}\nModules : ${modules}\nIntégrations IDE : ${ides}`, 'Installation actuelle');

      let removeModules = true;
      let removeIdeConfigs = true;
      let removeOutputFolder = false;

      if (!options.yes) {
        // multiselect() handles cancellation internally (exits process)
        const selected = await prompts.multiselect({
          message: 'Sélectionnez les composants à supprimer :',
          options: [
            {
              value: 'modules',
              label: `Modules & données BMAD (${installer.bmadFolderName}/)`,
              hint: 'Installation de base, agents, workflows, configuration',
            },
            { value: 'ide', label: 'Intégrations IDE', hint: ides || 'Aucun IDE configuré' },
            { value: 'output', label: `Artefacts utilisateur (${outputFolder}/)`, hint: 'AVERTISSEMENT : contient vos produits de travail' },
          ],
          initialValues: ['modules', 'ide'],
          required: true,
        });

        removeModules = selected.includes('modules');
        removeIdeConfigs = selected.includes('ide');
        removeOutputFolder = selected.includes('output');

        const red = (s) => `\u001B[31m${s}\u001B[0m`;
        await prompts.note(
          red('💀 Cette action est IRRÉVERSIBLE ! Les fichiers supprimés ne peuvent pas être récupérés !') +
            '\n' +
            red('💀 Les configurations IDE et les modules devront être réinstallés.') +
            '\n' +
            red('💀 Les artefacts utilisateur sont préservés sauf sélection explicite.'),
          '!! ACTION DESTRUCTIVE !!',
        );

        const confirmed = await prompts.confirm({
          message: 'Procéder à la désinstallation ?',
          default: false,
        });

        if (!confirmed) {
          await prompts.outro('Désinstallation annulée.');
          process.exit(0);
        }
      }

      // Phase 1: IDE integrations
      if (removeIdeConfigs) {
        const s = await prompts.spinner();
        s.start('Suppression des intégrations IDE...');
        await installer.uninstallIdeConfigs(projectDir, existingInstall, { silent: true });
        s.stop(`Intégrations IDE supprimées (${ides || 'aucune'})`);
      }

      // Phase 2: User artifacts
      if (removeOutputFolder) {
        const s = await prompts.spinner();
        s.start(`Suppression des artefacts utilisateur (${outputFolder}/)...`);
        await installer.uninstallOutputFolder(projectDir, outputFolder);
        s.stop('Artefacts utilisateur supprimés');
      }

      // Phase 3: BMAD modules & data (last — other phases may need _bmad/)
      if (removeModules) {
        const s = await prompts.spinner();
        s.start(`Suppression des modules & données BMAD (${installer.bmadFolderName}/)...`);
        await installer.uninstallModules(projectDir);
        s.stop('Modules & données supprimés');
      }

      const summary = [];
      if (removeIdeConfigs) summary.push('Intégrations IDE nettoyées');
      if (removeModules) summary.push('Modules & données supprimés');
      if (removeOutputFolder) summary.push('Artefacts utilisateur supprimés');
      if (!removeOutputFolder) summary.push(`Artefacts utilisateur préservés dans ${outputFolder}/`);

      await prompts.note(summary.join('\n'), 'Résumé');
      await prompts.outro('Pour réinstaller, exécutez : npx bmad-method install');

      process.exit(0);
    } catch (error) {
      try {
        const errorMessage = error instanceof Error ? error.message : String(error);
        await prompts.log.error(`Échec de la désinstallation : ${errorMessage}`);
        if (error instanceof Error && error.stack) {
          await prompts.log.message(error.stack);
        }
      } catch {
        console.error(error instanceof Error ? error.message : error);
      }
      process.exit(1);
    }
  },
};
