---
name: bmad-validate-prd
description: 'Valide un PRD par rapport aux standards. À utiliser lorsque l''utilisateur dit "validate this PRD" ou "run PRD validation"'
---

# Workflow Valider le cahier des charges (Validate PRD)

**Objectif :** Valider les PRD existants par rapport aux standards BMAD via une revue complète.

**Votre Rôle :** Architecte de Validation et Spécialiste de l'Assurance Qualité.

Vous continuerez à opérer avec votre nom donné, votre identité et votre communication_style, fusionnés avec les détails de cette description de rôle.

## Conventions

- Les chemins simples (par ex. `steps-v/step-v-01-discovery.md`) sont résolus à partir de la racine du skill.
- `{skill-root}` est résolu vers le répertoire d'installation de ce skill (où se trouve `customize.toml`).
- Les chemins préfixés par `{project-root}` sont résolus à partir du répertoire de travail du projet.
- `{skill-name}` est résolu vers le basename du répertoire du skill.

## ARCHITECTURE DU WORKFLOW

Cela utilise une **architecture de fichiers d'étapes** pour une exécution disciplinée :

### Principes Fondamentaux

- **Conception en micro-fichiers** : Chaque étape est un fichier d'instructions autonome qui fait partie d'un workflow global qui doit être suivi exactement
- **Chargement Just-In-Time** : Seul le fichier de l'étape en cours est en mémoire - ne jamais charger les futurs fichiers d'étapes avant qu'on vous le demande
- **Application séquentielle** : La séquence au sein des fichiers d'étapes doit être complétée dans l'ordre, aucun saut ou optimisation autorisée
- **Suivi d'état** : Documenter la progression dans le frontmatter du fichier de sortie en utilisant le tableau `stepsCompleted` lorsqu'un workflow produit un document
- **Construction par ajout uniquement** : Construire les documents en ajoutant le contenu comme indiqué dans le fichier de sortie

### Règles de traitement des étapes

1. **LIRE COMPLÈTEMENT** : Toujours lire l'intégralité du fichier d'étape avant de prendre toute action
2. **SUIVRE LA SÉQUENCE** : Exécuter toutes les sections numérotées dans l'ordre, ne jamais dévier
3. **ATTENDRE L'ENTRÉE** : Si un menu est présenté, s'arrêter et attendre la sélection de l'utilisateur
4. **VÉRIFIER LA CONTINUATION** : Si l'étape a un menu avec Continue comme option, ne procéder à l'étape suivante que lorsque l'utilisateur sélectionne 'C' (Continue)
5. **SAUVEGARDER L'ÉTAT** : Mettre à jour `stepsCompleted` dans le frontmatter avant de charger l'étape suivante
6. **CHARGER LA SUIVANTE** : Lorsque demandé, lire complètement et suivre le fichier d'étape suivant

### Règles critiques (AUCUNE EXCEPTION)

- 🛑 **NE JAMAIS** charger plusieurs fichiers d'étapes simultanément
- 📖 **TOUJOURS** lire l'intégralité du fichier d'étape avant l'exécution
- 🚫 **NE JAMAIS** sauter d'étapes ou optimiser la séquence
- 💾 **TOUJOURS** mettre à jour le frontmatter des fichiers de sortie lors de l'écriture du résultat final pour une étape spécifique
- 🎯 **TOUJOURS** suivre les instructions exactes du fichier d'étape
- ⏸️ **TOUJOURS** s'arrêter aux menus et attendre l'entrée de l'utilisateur
- 📋 **NE JAMAIS** créer de listes de tâches mentales à partir des étapes futures

## À l'activation

### Étape 1 : Résoudre le bloc Workflow

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**Si le script échoue**, résolvez vous-même le bloc `workflow` en lisant ces trois fichiers dans l'ordre base → équipe → utilisateur et en appliquant les mêmes règles de fusion structurelle que le résolveur :

1. `{skill-root}/customize.toml` — valeurs par défaut
2. `{project-root}/_bmad/custom/{skill-name}.toml` — surcharges d'équipe
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — surcharges personnelles

Tout fichier manquant est ignoré. Les scalaires écrasent, les tables fusionnent en profondeur, les tableaux de tables indexés par `code` ou `id` remplacent les entrées correspondantes et ajoutent les nouvelles entrées, et tous les autres tableaux sont ajoutés.

### Étape 2 : Exécuter les étapes Prepend

Exécuter chaque entrée dans `{workflow.activation_steps_prepend}` dans l'ordre avant de continuer.

### Étape 3 : Charger les faits persistants

Traiter chaque entrée dans `{workflow.persistent_facts}` comme un contexte fondamental que vous portez pour le reste de l'exécution du workflow. Les entrées préfixées par `file:` sont des chemins ou des globs sous `{project-root}` — charger le contenu référencé comme des faits. Toutes les autres entrées sont des faits tels quels.

### Étape 4 : Charger la configuration

Charger la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résoudre :
- Utiliser `{user_name}` pour le salut
- Utiliser `{communication_language}` pour toutes les communications
- Utiliser `{document_output_language}` pour les documents de sortie
- Utiliser `{planning_artifacts}` pour l'emplacement de sortie et l'analyse des artefacts
- Utiliser `{project_knowledge}` pour l'analyse de contexte supplémentaire

### Étape 5 : Saluer l'utilisateur

Saluer `{user_name}`, en parlant en `{communication_language}`.

### Étape 6 : Exécuter les étapes Append

Exécuter chaque entrée dans `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencer le workflow ci-dessous.

## Chemins

- `validateWorkflow` = `./steps-v/step-v-01-discovery.md`

## Exécution

✅ VOUS DEVEZ TOUJOURS PARLER DE SORTIE dans votre style de communication d'Agent avec le `{communication_language}` configuré.
✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu d'artefact et de document en `{document_output_language}`.

**Mode Validate : Validation d'un PRD existant par rapport aux standards BMAD.**

Ensuite lire complètement et suivre : `{validateWorkflow}` (steps-v/step-v-01-discovery.md)
