# Inventaire des messages CLI à traduire

**Total : 318 chaîne(s) anglaise(s) candidates dans 27 fichier(s).**

Ce fichier est auto-généré par `tools/extract-cli-strings.mjs`. Re-générer avec :

```bash
node tools/extract-cli-strings.mjs
```

## Méthode de détection

Patterns capturés :

- `prompts.log.{info,warn,error,success,message,step}(...)`
- `prompts.{intro,outro,note,box}(...)`
- `prompts.{confirm,text,select,multiselect,password}({ message: ... })`
- `spinner.{start,message,error,success,stop}(...)`
- `console.{log,error,warn,info}(...)`
- `throw new Error(...)`

Filtres appliqués (chaînes EXCLUES de l'audit) :

- Chaîne ≤ 2 caractères
- Chemins / extensions de fichier
- Identifiants techniques (snake_case isolé, all-caps)
- Chaînes sans contenu alphabétique
- Mots isolés en minuscules

## Inventaire par fichier

### tools/cli/installers/lib/core/installer.js — 108 chaîne(s)

| Ligne | Type              | Anglais                                                                                                                                                 |
| ----- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 181   | `log.warn`        | Warning: IDE '${ide}' handler not found                                                                                                                 |
| 188   | `log.info`        | Configuring ${ide}...                                                                                                                                   |
| 201   | `log.warn`        | Warning: Could not load configuration for ${ide}: ${error.message}                                                                                      |
| 209   | `log.message`     | Keeping existing configuration for: ${keptIdes.join(', ')}                                                                                              |
| 384   | `spinner.start`   | Preparing installation...                                                                                                                               |
| 389   | `spinner.message` | Creating installation directory...                                                                                                                      |
| 395   | `spinner.error`   | Failed to create installation directory                                                                                                                 |
| 396   | `log.error`       | Error: ${error.message}                                                                                                                                 |
| 399   | `log.error`       | Permission denied. Check parent directory permissions.                                                                                                  |
| 401   | `log.error`       | No space left on device.                                                                                                                                |
| 403   | `throw-Error`     | Cannot create directory: ${projectDir}                                                                                                                  |
| 408   | `spinner.message` | Checking for existing installation...                                                                                                                   |
| 412   | `spinner.stop`    | Existing installation detected                                                                                                                          |
| 423   | `log.warn`        | Existing BMAD installation detected                                                                                                                     |
| 424   | `log.message`     | Location: ${bmadDir}                                                                                                                                    |
| 425   | `log.message`     | Version: ${existingInstall.version}                                                                                                                     |
| 452   | `spinner.start`   | Preparing update...                                                                                                                                     |
| 455   | `spinner.stop`    | Module changes reviewed                                                                                                                                 |
| 458   | `log.warn`        | Modules to be removed:                                                                                                                                  |
| 463   | `log.error`       | - ${displayName} (${modulePath})                                                                                                                        |
| 466   | `prompt-message`  | Remove ${modulesToRemove.length} module(s) from BMAD installation?                                                                                      |
| 478   | `log.message`     | Removed: ${moduleId}                                                                                                                                    |
| 481   | `log.warn`        | Warning: Failed to remove ${moduleId}: ${error.message}                                                                                                 |
| 484   | `log.success`     | Removed ${modulesToRemove.length} module(s)                                                                                                             |
| 486   | `log.message`     | Module removal cancelled                                                                                                                                |
| 494   | `spinner.start`   | Preparing update...                                                                                                                                     |
| 520   | `log.warn`        | Warning: Could not read existing core config: ${error.message}                                                                                          |
| 566   | `spinner.start`   | Backing up ${customFiles.length} custom files...                                                                                                        |
| 573   | `spinner.stop`    | Backed up ${customFiles.length} custom files                                                                                                            |
| 583   | `spinner.start`   | Backing up ${modifiedFiles.length} modified files...                                                                                                    |
| 590   | `spinner.stop`    | Backed up ${modifiedFiles.length} modified files                                                                                                        |
| 597   | `spinner.message` | Preparing quick update...                                                                                                                               |
| 650   | `spinner.start`   | Backing up ${customFiles.length} custom files...                                                                                                        |
| 657   | `spinner.stop`    | Backed up ${customFiles.length} custom files                                                                                                            |
| 666   | `spinner.start`   | Backing up ${modifiedFiles.length} modified files...                                                                                                    |
| 673   | `spinner.stop`    | Backed up ${modifiedFiles.length} modified files                                                                                                        |
| 680   | `spinner.stop`    | Pre-checks complete                                                                                                                                     |
| 732   | `log.error`       | ${handler.displayName \|\| ide}: ${handler.platformConfig.suspended}                                                                                    |
| 734   | `throw-Error`     | All selected tool(s) are suspended: ${suspendedIdes.join(', ')}. Installation aborted to prevent upgrading \_bmad/ without a working IDE configuration. |
| 760   | `spinner.stop`    | IDE changes reviewed                                                                                                                                    |
| 763   | `log.warn`        | IDEs to be removed:                                                                                                                                     |
| 765   | `log.error`       | - ${ide}                                                                                                                                                |
| 768   | `prompt-message`  | Remove BMAD configuration for ${idesToRemove.length} IDE(s)?                                                                                            |
| 782   | `log.message`     | Removed: ${ide}                                                                                                                                         |
| 784   | `log.warn`        | Warning: Failed to remove ${ide}: ${error.message}                                                                                                      |
| 787   | `log.success`     | Removed ${idesToRemove.length} IDE(s)                                                                                                                   |
| 789   | `log.message`     | IDE removal cancelled                                                                                                                                   |
| 801   | `spinner.start`   | Preparing installation...                                                                                                                               |
| 811   | `spinner.message` | Preparing installation...                                                                                                                               |
| 813   | `spinner.start`   | Preparing installation...                                                                                                                               |
| 817   | `spinner.message` | Creating directory structure...                                                                                                                         |
| 822   | `spinner.message` | Caching custom modules...                                                                                                                               |
| 899   | `spinner.stop`    | Preparation complete                                                                                                                                    |
| 1345  | `spinner.error`   | Installation failed                                                                                                                                     |
| 1347  | `log.error`       | Installation failed                                                                                                                                     |
| 1446  | `spinner.start`   | Checking installation...                                                                                                                                |
| 1454  | `spinner.stop`    | No BMAD installation found                                                                                                                              |
| 1455  | `throw-Error`     | No BMAD installation found at ${bmadDir}                                                                                                                |
| 1458  | `spinner.message` | Analyzing update requirements...                                                                                                                        |
| 1512  | `spinner.stop`    | Update analysis complete                                                                                                                                |
| 1513  | `log.warn`        | Checking custom module sources before update...                                                                                                         |
| 1525  | `spinner.start`   | Preparing update...                                                                                                                                     |
| 1529  | `spinner.stop`    | Dry run analysis complete                                                                                                                               |
| 1546  | `spinner.message` | Updating core...                                                                                                                                        |
| 1551  | `spinner.message` | Updating module: ${module.id}...                                                                                                                        |
| 1556  | `spinner.message` | Updating manifest...                                                                                                                                    |
| 1562  | `spinner.stop`    | Update complete                                                                                                                                         |
| 1565  | `spinner.error`   | Update failed                                                                                                                                           |
| 1878  | `log.message`     | Merged module-help from: ${moduleName}                                                                                                                  |
| 1881  | `log.warn`        | Warning: Failed to read module-help.csv from ${moduleName}: ${error.message}                                                                            |
| 1923  | `log.message`     | Generated bmad-help.csv: ${allRows.length} workflows                                                                                                    |
| 2294  | `log.message`     | Skipping web-only agent: ${path.basename(file)}                                                                                                         |
| 2414  | `spinner.start`   | Starting quick update...                                                                                                                                |
| 2422  | `spinner.stop`    | No BMAD installation found                                                                                                                              |
| 2423  | `throw-Error`     | BMAD not installed at ${bmadDir}. Use regular install for first-time setup.                                                                             |
| 2426  | `spinner.message` | Detecting installed modules and configuration...                                                                                                        |
| 2571  | `spinner.stop`    | Found ${modulesToUpdate.length} module(s) to update and ${configuredIdes.length} configured tool(s)                                                     |
| 2574  | `log.warn`        | Skipping ${skippedModules.length} module(s) - no source available: ${skippedModules.join(', ')}                                                         |
| 2578  | `log.info`        | Checking for new configuration options...                                                                                                               |
| 2598  | `log.success`     | All configuration is up to date, no new options to configure                                                                                            |
| 2631  | `spinner.stop`    | Quick update complete!                                                                                                                                  |
| 2643  | `spinner.error`   | Quick update failed                                                                                                                                     |
| 2660  | `spinner.start`   | Recompiling agents with customizations...                                                                                                               |
| 2668  | `spinner.stop`    | No BMAD installation found                                                                                                                              |
| 2669  | `throw-Error`     | BMAD not installed at ${bmadDir}. Use regular install for first-time setup.                                                                             |
| 2710  | `spinner.message` | Recompiling agents in ${moduleId}...                                                                                                                    |
| 2727  | `log.warn`        | Source not found for module ${moduleId}, skipping...                                                                                                    |
| 2745  | `spinner.stop`    | Agent recompilation complete!                                                                                                                           |
| 2753  | `spinner.error`   | Agent recompilation failed                                                                                                                              |
| 2762  | `prompt-message`  | What would you like to do?                                                                                                                              |
| 2775  | `prompts.note`    | Found .bmad-method folder from BMAD v4 installation.\n\n                                                                                                |
| 2784  | `prompt-message`  | What would you like to do?                                                                                                                              |
| 2802  | `log.info`        | Please remove the .bmad-method folder and any v4 rules/commands, then run the installer again.                                                          |
| 2808  | `log.warn`        | Proceeding with installation despite legacy v4 folder                                                                                                   |
| 3043  | `log.warn`        | Found ${customModulesWithMissingSources.length} custom module(s) with missing sources:                                                                  |
| 3050  | `log.message`     | ${missing.name} (${missing.id})\n Original source: ${missing.relativePath}\n Full path: ${missing.sourcePath}                                           |
| 3076  | `prompt-message`  | How would you like to handle "${missing.name}"?                                                                                                         |
| 3084  | `prompt-message`  | Enter the new path to the custom module:                                                                                                                |
| 3129  | `log.success`     | Updated source location                                                                                                                                 |
| 3135  | `log.error`       | WARNING: This will PERMANENTLY DELETE "${missing.name}" and all its files!\n Module location: ${path.join(bmadDir, missing.id)}                         |
| 3139  | `prompt-message`  | Are you absolutely sure you want to delete this module?                                                                                                 |
| 3145  | `prompt-message`  | Type "DELETE" to confirm permanent deletion:                                                                                                            |
| 3161  | `log.warn`        | Deleted module directory: ${path.relative(projectRoot, modulePath)}                                                                                     |
| 3166  | `log.warn`        | Removed from manifest                                                                                                                                   |
| 3177  | `log.error`       | "${missing.name}" has been permanently removed                                                                                                          |
| 3179  | `log.message`     | Removal cancelled - module will be kept                                                                                                                 |
| 3183  | `log.message`     | Removal cancelled - module will be kept                                                                                                                 |
| 3192  | `log.message`     | Module will be kept as-is                                                                                                                               |

### tools/cli/lib/ui.js — 83 chaîne(s)

| Ligne | Type             | Anglais                                                                                                               |
| ----- | ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| 46    | `throw-Error`    | Invalid directory: ${validation}                                                                                      |
| 49    | `log.info`       | Using directory from command-line: ${confirmedDirectory}                                                              |
| 100   | `log.warn`       | LEGACY INSTALLATION DETECTED                                                                                          |
| 101   | `prompts.note`   | Found a ".bmad"/"bmad" folder, or a legacy "\_cfg" folder under the bmad folder -\n                                   |
| 125   | `prompt-message` | How would you like to proceed?                                                                                        |
| 141   | `prompts.note`   | 1. Delete the existing bmad folder in your project\n                                                                  |
| 167   | `log.error`      | Error: ${error.message}                                                                                               |
| 226   | `throw-Error`    | Invalid action: ${options.action}. Valid actions: ${validActions.join(', ')}                                          |
| 229   | `log.info`       | Using action from command-line: ${actionType}                                                                         |
| 233   | `throw-Error`    | No valid actions available for this installation                                                                      |
| 237   | `log.info`       | Non-interactive mode (--yes): defaulting to ${actionType}                                                             |
| 239   | `prompt-message` | How would you like to proceed?                                                                                        |
| 311   | `log.message`    | Found existing modules: ${[...installedModuleIds].join(', ')}                                                         |
| 321   | `log.info`       | Using modules from command-line: ${selectedModules.join(', ')}                                                        |
| 324   | `log.info`       | Non-interactive mode (--yes): using default modules (installed + defaults): ${selectedModules.join(', ')}             |
| 340   | `log.info`       | Using custom content from command-line: ${paths.join(', ')}                                                           |
| 351   | `log.warn`       | Skipping invalid custom content path: ${customPath} - ${validation}                                                   |
| 363   | `log.warn`       | Skipping custom content path: ${customPath} - failed to read module.yaml: ${error.message}                            |
| 368   | `log.warn`       | Skipping custom content path: ${customPath} - module.yaml is empty                                                    |
| 373   | `log.warn`       | Skipping custom content path: ${customPath} - module.yaml missing 'code' field                                        |
| 408   | `log.info`       | Non-interactive mode (--yes): preserving ${customModuleResult.selectedCustomModules.length} existing custom module(s) |
| 412   | `log.info`       | Non-interactive mode (--yes): no existing custom modules found                                                        |
| 415   | `prompt-message` | Modify custom modules, agents, or workflows?                                                                          |
| 478   | `log.info`       | Using modules from command-line: ${selectedModules.join(', ')}                                                        |
| 482   | `log.info`       | Using default modules (--yes flag): ${selectedModules.join(', ')}                                                     |
| 494   | `log.info`       | Using custom content from command-line: ${paths.join(', ')}                                                           |
| 505   | `log.warn`       | Skipping invalid custom content path: ${customPath} - ${validation}                                                   |
| 517   | `log.warn`       | Skipping custom content path: ${customPath} - failed to read module.yaml: ${error.message}                            |
| 522   | `log.warn`       | Skipping custom content path: ${customPath} - module.yaml is empty                                                    |
| 527   | `log.warn`       | Skipping custom content path: ${customPath} - module.yaml missing 'code' field                                        |
| 550   | `prompt-message` | Add custom modules, agents, or workflows from your computer?                                                          |
| 618   | `log.warn`       | Previously configured tools are no longer available: ${unknownTools.join(', ')}                                       |
| 630   | `log.info`       | Skipping tool configuration (--tools none)                                                                            |
| 637   | `log.info`       | Using tools from command-line: ${selectedIdes.join(', ')}                                                             |
| 643   | `log.info`       | Non-interactive mode (--yes): keeping configured tools: ${configuredIdes.join(', ')}                                  |
| 666   | `prompt-message` | Integrate with                                                                                                        |
| 677   | `prompt-message` | No tools selected. Continue without installing any tools?                                                             |
| 716   | `log.info`       | Skipping tool configuration (--tools none)                                                                            |
| 723   | `log.info`       | Using tools from command-line: ${selectedIdes.join(', ')}                                                             |
| 730   | `log.info`       | Using previously configured tools (--yes flag): ${configuredIdes.join(', ')}                                          |
| 734   | `log.info`       | Skipping tool configuration (--yes flag, no previous tools)                                                           |
| 740   | `prompt-message` | Integrate with:                                                                                                       |
| 754   | `prompt-message` | No tools selected. Continue without installing any tools?                                                             |
| 784   | `prompt-message` | Create backup before updating?                                                                                        |
| 789   | `prompt-message` | Preserve local customizations?                                                                                        |
| 860   | `log.info`       | Using user name from command-line: ${options.userName}                                                                |
| 864   | `log.info`       | Using communication language from command-line: ${options.communicationLanguage}                                      |
| 868   | `log.info`       | Using document output language from command-line: ${options.documentOutputLanguage}                                   |
| 872   | `log.info`       | Using output folder from command-line: ${options.outputFolder}                                                        |
| 909   | `log.info`       | Using default configuration (--yes flag)                                                                              |
| 1082  | `prompt-message` | Select modules to install:                                                                                            |
| 1138  | `prompt-message` | Installation directory:                                                                                               |
| 1161  | `log.info`       | Resolved installation path: ${directory}                                                                              |
| 1178  | `log.message`    | Directory exists and contains ${files.length} item(s)${bmadNote}                                                      |
| 1180  | `log.message`    | Directory exists and is empty                                                                                         |
| 1195  | `prompt-message` | Install to this directory?                                                                                            |
| 1201  | `log.warn`       | Let's try again with a different path.                                                                                |
| 1207  | `prompt-message` | Create directory: ${directory}?                                                                                       |
| 1213  | `log.warn`       | Let's try again with a different path.                                                                                |
| 1398  | `throw-Error`    | Path expansion for ~${username} is not supported. Please use an absolute path or ~${path.sep}                         |
| 1433  | `log.warn`       | Could not load existing configurations                                                                                |
| 1514  | `prompt-message` | Would you like to:                                                                                                    |
| 1533  | `prompt-message` | Path to custom module folder (press Enter to skip):                                                                   |
| 1564  | `log.success`    | Confirmed local custom module: ${moduleData.name \|\| moduleData.code}                                                |
| 1568  | `prompt-message` | Install these ${customContentConfig.sources.length} custom modules?                                                   |
| 1630  | `log.info`       | Custom Modules                                                                                                        |
| 1632  | `log.message`    | Found custom modules in your installation:                                                                            |
| 1634  | `log.message`    | No custom modules currently installed.                                                                                |
| 1660  | `log.message`    | Keeping ${result.selectedCustomModules.length} custom module(s)                                                       |
| 1682  | `prompt-message` | Select custom modules to keep (use arrow keys, space to toggle):                                                      |
| 1690  | `log.warn`       | "None / I changed my mind" was selected, so no custom modules will be kept.                                           |
| 1715  | `log.warn`       | All custom modules will be removed from the installation                                                              |
| 1721  | `log.message`    | No custom modules will be added                                                                                       |
| 1772  | `log.warn`       | VERSION WARNING                                                                                                       |
| 1776  | `log.warn`       | Non-interactive mode (--yes): auto-proceeding with legacy update                                                      |
| 1780  | `prompt-message` | How would you like to proceed?                                                                                        |
| 1796  | `prompts.note`   | 1. Delete the "${bmadFolderName}/" folder in your project\n                                                           |
| 1850  | `log.info`       | Available Updates                                                                                                     |
| 1859  | `prompt-message` | How would you like to proceed?                                                                                        |
| 1878  | `prompt-message` | Select modules to update (use arrow keys, space to toggle):                                                           |
| 1909  | `log.warn`       | ${availableUpdates.length} update(s) available                                                                        |
| 1910  | `log.message`    | Run \'bmad install\' and select "Quick Update" to update                                                              |
| 1912  | `log.success`    | All modules are up to date                                                                                            |

### tools/cli/installers/lib/modules/manager.js — 24 chaîne(s)

| Ligne | Type          | Anglais                                                                                                                                                                         |
| ----- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 154   | `log.message` | Updated sidecar file: ${relativeToBmad}                                                                                                                                         |
| 159   | `log.message` | Preserving user-modified file: ${relativeToBmad}                                                                                                                                |
| 166   | `log.message` | Added new sidecar file: ${relativeToBmad}                                                                                                                                       |
| 173   | `log.message` | Copied sidecar file: ${relativeToBmad}                                                                                                                                          |
| 286   | `log.warn`    | Failed to read config for ${defaultName}: ${error.message}                                                                                                                      |
| 434   | `throw-Error` | Failed to clone external module '${moduleCode}': ${error.message}                                                                                                               |
| 533   | `throw-Error` | Source for module '${moduleName}' is not available. It will be retained but cannot be updated without its source files.                                                         |
| 547   | `log.warn`    | Failed to read custom.yaml for ${moduleName}: ${error.message}                                                                                                                  |
| 614   | `throw-Error` | Module '${moduleName}' not found in any source location                                                                                                                         |
| 619   | `throw-Error` | Module '${moduleName}' is not installed                                                                                                                                         |
| 651   | `throw-Error` | Module '${moduleName}' is not installed                                                                                                                                         |
| 699   | `log.warn`    | Failed to read installed module config: ${error.message}                                                                                                                        |
| 763   | `log.message` | Skipping web-only agent: ${path.basename(file)}                                                                                                                                 |
| 925   | `log.message` | Sidecar files processed: ${copiedFiles.length} files                                                                                                                            |
| 928   | `log.warn`    | Agent marked as having sidecar but ${sidecarDirName} directory not found                                                                                                        |
| 947   | `log.message` | Compiled agent: ${agentName} -> ${path.relative(targetPath, targetMdPath)}${hasSidecar ? ' (with sidecar)' : ''}                                                                |
| 952   | `log.warn`    | Failed to compile agent ${agentName}: ${error.message}                                                                                                                          |
| 1076  | `log.message` | Processing: ${agentFile}                                                                                                                                                        |
| 1086  | `log.warn`    | Could not parse workflow path: ${sourceWorkflowPath}                                                                                                                            |
| 1096  | `log.warn`    | Could not parse workflow-install path: ${installWorkflowPath}                                                                                                                   |
| 1109  | `log.warn`    | Source workflow not found: ${actualSourceWorkflowPath}                                                                                                                          |
| 1114  | `log.message` | Vendoring: ${sourceModule}/workflows/${sourceWorkflowSubPath.replace(/\/workflow\.md$/, '')} → ${moduleName}/workflows/${installWorkflowSubPath.replace(/\/workflow\.md$/, '')} |
| 1125  | `log.success` | Workflow vendoring complete\n                                                                                                                                                   |
| 1320  | `log.warn`    | Failed to process module config: ${error.message}                                                                                                                               |

### tools/cli/installers/lib/ide/\_config-driven.js — 12 chaîne(s)

| Ligne | Type          | Anglais                                                                                              |
| ----- | ------------- | ---------------------------------------------------------------------------------------------------- |
| 87    | `log.info`    | Setting up ${this.name}...                                                                           |
| 495   | `throw-Error` | Cannot derive skill name for artifact: ${artifact.relativePath \|\| JSON.stringify(artifact)}        |
| 720   | `log.success` | ${this.name} configured: ${parts.join(', ')} → ${targetDir}                                          |
| 730   | `log.message` | Migrating legacy directories...                                                                      |
| 804   | `log.warn`    | Found ${bmadFiles.length} stale BMAD file(s) in ${expanded}. Remove manually: rm ${expanded}/bmad-\* |
| 854   | `log.message` | Cleaned ${removedCount} BMAD files from ${targetDir}                                                 |
| 893   | `log.message` | Restored copilot-instructions.md from backup                                                         |
| 923   | `log.warn`    | Warning: Could not parse .kilocodemodes for cleanup                                                  |
| 936   | `log.message` | Removed ${removedCount} BMAD modes from .kilocodemodes                                               |
| 938   | `log.warn`    | Warning: Could not write .kilocodemodes during cleanup                                               |
| 960   | `log.warn`    | Warning: Could not parse prompts.yml for cleanup                                                     |
| 979   | `log.warn`    | Warning: Could not write prompts.yml during cleanup                                                  |

### tools/cli/commands/uninstall.js — 11 chaîne(s)

| Ligne | Type             | Anglais                                                             |
| ----- | ---------------- | ------------------------------------------------------------------- |
| 28    | `prompt-message` | Where do you want to uninstall BMAD from?                           |
| 38    | `prompt-message` | Enter the project directory path:                                   |
| 53    | `log.error`      | Directory does not exist: ${projectDir}                             |
| 60    | `log.warn`       | No BMAD installation found.                                         |
| 71    | `prompts.intro`  | BMAD Uninstall                                                      |
| 72    | `prompts.note`   | Version: ${version}\nModules: ${modules}\nIDE integrations: ${ides} |
| 80    | `prompt-message` | Select components to remove:                                        |
| 109   | `prompt-message` | Proceed with uninstall?                                             |
| 115   | `prompts.outro`  | Uninstall cancelled.                                                |
| 151   | `prompts.outro`  | To reinstall, run: npx bmad-method install                          |
| 157   | `log.error`      | Uninstall failed: ${errorMessage}                                   |

### tools/cli/installers/lib/core/dependency-resolver.js — 11 chaîne(s)

| Ligne | Type          | Anglais                                                  |
| ----- | ------------- | -------------------------------------------------------- |
| 27    | `log.info`    | Resolving module dependencies...                         |
| 666   | `log.success` | Dependency resolution complete                           |
| 674   | `log.info`    | ${module.toUpperCase()} module:                          |
| 675   | `log.message` | Status: ${isSelected ? 'Selected' : 'Dependencies only'} |
| 678   | `log.message` | Agents: ${files.agents.length}                           |
| 681   | `log.message` | Tasks: ${files.tasks.length}                             |
| 684   | `log.message` | Templates: ${files.templates.length}                     |
| 687   | `log.message` | Data files: ${files.data.length}                         |
| 690   | `log.message` | Other files: ${files.other.length}                       |
| 696   | `log.warn`    | Missing dependencies:                                    |
| 698   | `log.warn`    | - ${missing}                                             |

### tools/cli/installers/lib/core/manifest.js — 8 chaîne(s)

| Ligne | Type          | Anglais                                                          |
| ----- | ------------- | ---------------------------------------------------------------- |
| 104   | `log.error`   | Failed to read YAML manifest: ${error.message}                   |
| 234   | `log.error`   | Failed to read YAML manifest: ${error.message}                   |
| 411   | `throw-Error` | No manifest found                                                |
| 478   | `log.warn`    | Could not parse ${filePath}: ${error.message}                    |
| 780   | `log.warn`    | Could not load config for module ${moduleName}: ${error.message} |
| 794   | `throw-Error` | No manifest found                                                |
| 882   | `log.warn`    | Failed to read package.json for ${moduleName}: ${error.message}  |
| 910   | `log.warn`    | Failed to read module.yaml for ${moduleName}: ${error.message}   |

### tools/cli/installers/lib/core/config-collector.js — 7 chaîne(s)

| Ligne | Type             | Anglais                                                            |
| ----- | ---------------- | ------------------------------------------------------------------ |
| 202   | `log.warn`       | Could not read schema for module "${moduleName}": ${error.message} |
| 252   | `prompt-message` | Module configuration                                               |
| 268   | `prompt-message` | Select modules to customize:                                       |
| 327   | `log.step`       | Module configuration complete                                      |
| 737   | `log.info`       | Using default configuration for ${moduleDisplayName}               |
| 746   | `log.step`       | Configuring ${moduleDisplayName}                                   |
| 771   | `log.message`    | Asking required questions for ${moduleName.toUpperCase()}...       |

### tools/cli/commands/install.js — 6 chaîne(s)

| Ligne | Type          | Anglais                                                                                      |
| ----- | ------------- | -------------------------------------------------------------------------------------------- |
| 33    | `log.info`    | Debug mode enabled                                                                           |
| 40    | `log.warn`    | Installation cancelled.                                                                      |
| 47    | `log.success` | Quick update complete!                                                                       |
| 48    | `log.info`    | Updated ${result.moduleCount} modules with preserved settings (${result.modules.join(', ')}) |
| 55    | `log.info`    | Recompiled ${result.agentCount} agents with customizations applied                           |
| 76    | `log.error`   | Installation failed: ${error.message}                                                        |

### tools/cli/commands/status.js — 6 chaîne(s)

| Ligne | Type          | Anglais                                              |
| ----- | ------------- | ---------------------------------------------------- |
| 24    | `log.warn`    | No BMAD installation found in the current directory. |
| 25    | `log.message` | Expected location: ${bmadDir}                        |
| 26    | `log.message` | Run "bmad install" to set up a new installation.     |
| 35    | `log.warn`    | No BMAD installation manifest found.                 |
| 36    | `log.message` | Run "bmad install" to set up a new installation.     |
| 58    | `log.error`   | Status check failed: ${error.message}                |

### tools/cli/installers/lib/core/manifest-generator.js — 6 chaîne(s)

| Ligne | Type            | Anglais                                                                                                                                                 |
| ----- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 97    | `throw-Error`   | ManifestGenerator requires \`options.ides\` to be provided – installer should supply the selected IDEs array.                                           |
| 195   | `console.warn`  | Warning: Skill manifest at ${dir}/bmad-skill-manifest.yaml contains canonicalId — this field is ignored for skills (directory name is the canonical ID) |
| 296   | `console.error` | Error: SKILL.md name "${skillMeta.name}" does not match directory name "${dirName}" — skipping                                                          |
| 443   | `log.warn`      | Failed to parse workflow at ${fullPath}: ${error.message}                                                                                               |
| 912   | `log.warn`      | Failed to read existing CSV ${csvPath}: ${error.message}                                                                                                |
| 1336  | `log.warn`      | Could not scan for installed modules: ${error.message}                                                                                                  |

### tools/cli/installers/lib/ide/manager.js — 6 chaîne(s)

| Ligne | Type          | Anglais                                                                  |
| ----- | ------------- | ------------------------------------------------------------------------ |
| 136   | `log.warn`    | IDE '${ideName}' is not yet supported                                    |
| 137   | `log.message` | Supported IDEs: ${[...this.handlers.keys()].join(', ')}                  |
| 144   | `log.warn`    | ${handler.displayName \|\| ideName}: ${handler.platformConfig.suspended} |
| 175   | `log.error`   | Failed to setup ${ideName}: ${error.message}                             |
| 284   | `log.warn`    | IDE '${ideName}' is not yet supported for custom agent installation      |
| 296   | `log.warn`    | Failed to install ${ideName} launcher: ${error.message}                  |

### tools/cli/lib/xml-handler.js — 5 chaîne(s)

| Ligne | Type            | Anglais                             |
| ----- | --------------- | ----------------------------------- |
| 47    | `console.error` | Failed to load activation template: |
| 81    | `console.warn`  | Could not load activation template  |
| 122   | `console.error` | Error injecting activation:         |
| 131   | `console.error` | Error in simple injection:          |
| 162   | `console.error` | Error building agent from YAML:     |

### tools/cli/lib/xml-to-markdown.js — 5 chaîne(s)

| Ligne | Type            | Anglais                                                 |
| ----- | --------------- | ------------------------------------------------------- |
| 6     | `throw-Error`   | Input file must be an XML file                          |
| 58    | `console.error` | Usage: node xml-to-markdown.js <xml-file-path>          |
| 65    | `console.error` | Error: File not found: ${xmlFilePath}                   |
| 71    | `console.log`   | Successfully converted: ${xmlFilePath} -> ${mdFilePath} |
| 73    | `console.error` | Error converting file: ${error.message}                 |

### tools/cli/installers/lib/core/ide-config-manager.js — 2 chaîne(s)

| Ligne | Type       | Anglais                                                    |
| ----- | ---------- | ---------------------------------------------------------- |
| 97    | `log.warn` | Failed to load IDE config for ${ideName}: ${error.message} |
| 127   | `log.warn` | Failed to load IDE configs: ${error.message}               |

### tools/cli/installers/lib/ide/\_base-ide.js — 2 chaîne(s)

| Ligne | Type          | Anglais                                             |
| ----- | ------------- | --------------------------------------------------- |
| 50    | `throw-Error` | setup() must be implemented by ${this.name} handler |
| 65    | `log.message` | Removed ${this.name} BMAD configuration             |

### tools/cli/installers/lib/ide/platform-codes.js — 2 chaîne(s)

| Ligne | Type          | Anglais                                                           |
| ----- | ------------- | ----------------------------------------------------------------- |
| 19    | `throw-Error` | Platform codes configuration not found at: ${PLATFORM_CODES_PATH} |
| 34    | `throw-Error` | Platform codes not loaded. Call loadPlatformCodes() first.        |

### tools/cli/lib/activation-builder.js — 2 chaîne(s)

| Ligne | Type           | Anglais                                              |
| ----- | -------------- | ---------------------------------------------------- |
| 30    | `throw-Error`  | Fragment not found: ${fragmentName}                  |
| 90    | `console.warn` | Warning: Handler fragment not found: ${fragmentName} |

### tools/cli/lib/agent-party-generator.js — 2 chaîne(s)

| Ligne | Type            | Anglais                                          |
| ----- | --------------- | ------------------------------------------------ |
| 114   | `console.error` | Error extracting details for agent ${agentName}: |
| 178   | `console.error` | Error applying config overrides:                 |

### tools/cli/lib/platform-codes.js — 2 chaîne(s)

| Ligne | Type            | Anglais                                               |
| ----- | --------------- | ----------------------------------------------------- |
| 25    | `console.warn`  | Platform codes config not found at ${this.configPath} |
| 29    | `console.error` | Error loading platform codes: ${error.message}        |

### tools/cli/lib/yaml-format.js — 2 chaîne(s)

| Ligne | Type            | Anglais                                        |
| ----- | --------------- | ---------------------------------------------- |
| 161   | `console.error` | Usage: node yaml-format.js <file1> [file2] ... |
| 240   | `console.error` | Error:                                         |

### tools/cli/installers/lib/core/custom-module-cache.js — 1 chaîne(s)

| Ligne | Type       | Anglais                                      |
| ----- | ---------- | -------------------------------------------- |
| 199   | `log.warn` | Cache integrity check failed for ${moduleId} |

### tools/cli/installers/lib/ide/shared/skill-manifest.js — 1 chaîne(s)

| Ligne | Type           | Anglais                                                                           |
| ----- | -------------- | --------------------------------------------------------------------------------- |
| 22    | `console.warn` | Warning: Failed to parse bmad-skill-manifest.yaml in ${dirPath}: ${error.message} |

### tools/cli/installers/lib/modules/external-manager.js — 1 chaîne(s)

| Ligne | Type       | Anglais                                                  |
| ----- | ---------- | -------------------------------------------------------- |
| 33    | `log.warn` | Failed to load external modules config: ${error.message} |

### tools/cli/lib/agent/installer.js — 1 chaîne(s)

| Ligne | Type          | Anglais                                   |
| ----- | ------------- | ----------------------------------------- |
| 159   | `log.message` | ${q.var}: ${answers[q.var]} (already set) |

### tools/cli/lib/cli-utils.js — 1 chaîne(s)

| Ligne | Type       | Anglais                    |
| ----- | ---------- | -------------------------- |
| 108   | `log.step` | ${progress} ${description} |

### tools/cli/lib/config.js — 1 chaîne(s)

| Ligne | Type          | Anglais                                     |
| ----- | ------------- | ------------------------------------------- |
| 17    | `throw-Error` | Configuration file not found: ${configPath} |
