---
name: bmad-generate-project-context
description: "Créer project-context.md avec les règles IA. À utiliser lorsque l'utilisateur dit « générer le contexte du projet » ou « créer le contexte du projet »"
---

# Workflow Generate Project Context

**Objectif :** Créer un fichier `project-context.md` concis et optimisé contenant les règles, motifs et directives critiques que les agents IA doivent suivre lors de l'implémentation du code. Ce fichier se concentre sur les détails non évidents que les LLMs doivent garder à l'esprit.

**Votre Rôle :** Vous êtes un facilitateur technique travaillant avec un pair pour capturer les règles d'implémentation essentielles qui assureront une génération de code cohérente et de haute qualité par tous les agents IA travaillant sur le projet.

## Conventions

- Les chemins simples (par ex. `steps/step-01-discover.md`) se résolvent depuis la racine du Skill.
- `{skill-root}` se résout au répertoire d'installation de ce Skill (où se trouve `customize.toml`).
- Les chemins préfixés par `{project-root}` se résolvent depuis le répertoire de travail du projet.
- `{skill-name}` se résout au basename du répertoire du Skill.

## ARCHITECTURE DU WORKFLOW

Cela utilise une **architecture micro-fichiers** pour une exécution disciplinée :

- Chaque étape est un fichier autonome avec des règles intégrées
- Progression séquentielle avec contrôle utilisateur à chaque étape
- État du document suivi dans le frontmatter
- Concentration sur la génération de contenu léger et optimisé pour LLM
- Vous NE passez JAMAIS au fichier d'étape suivant si le fichier d'étape actuel indique que l'utilisateur doit approuver et indiquer la continuation.

## On Activation

### Step 1 : Résoudre le Bloc Workflow

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**Si le script échoue**, résolvez le bloc `workflow` vous-même en lisant ces trois fichiers dans l'ordre base → équipe → utilisateur et en appliquant les mêmes règles de fusion structurelle que le résolveur :

1. `{skill-root}/customize.toml` — valeurs par défaut
2. `{project-root}/_bmad/custom/{skill-name}.toml` — surcharges d'équipe
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — surcharges personnelles

Tout fichier manquant est ignoré. Les scalaires remplacent, les tables fusionnent en profondeur, les tableaux de tables indexés par `code` ou `id` remplacent les entrées correspondantes et ajoutent les nouvelles entrées, et tous les autres tableaux ajoutent.

### Step 2 : Exécuter les Étapes Prepend

Exécuter chaque entrée dans `{workflow.activation_steps_prepend}` dans l'ordre avant de continuer.

### Step 3 : Charger les Faits Persistants

Traiter chaque entrée dans `{workflow.persistent_facts}` comme contexte fondamental que vous transportez pour le reste de l'exécution du workflow. Les entrées préfixées par `file:` sont des chemins ou globs sous `{project-root}` — chargez le contenu référencé comme faits. Toutes les autres entrées sont des faits littéraux.

### Step 4 : Charger la Configuration

Charger la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résoudre :

- Utiliser `{user_name}` pour la salutation
- Utiliser `{communication_language}` pour toutes les communications
- Utiliser `{document_output_language}` pour les documents de sortie
- Utiliser `{planning_artifacts}` pour l'emplacement de sortie et le scan d'artefacts
- Utiliser `{project_knowledge}` pour le scan de contexte additionnel

### Step 5 : Saluer l'Utilisateur

Saluer `{user_name}`, en parlant dans `{communication_language}`.

### Step 6 : Exécuter les Étapes Append

Exécuter chaque entrée dans `{workflow.activation_steps_append}` dans l'ordre.

L'activation est complète. Commencer le workflow ci-dessous.

## Paths

- `output_file` = `{output_folder}/project-context.md`

## Execution

- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE Dans votre style de communication d'Agent avec la configuration `{communication_language}`
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu d'artefact et de document dans `{document_output_language}`

Charger et exécuter `./steps/step-01-discover.md` pour commencer le workflow.

**Note :** La découverte de documents d'entrée et les protocoles d'initialisation sont gérés dans step-01-discover.md.
