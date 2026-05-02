---
name: bmad-code-review
description: 'Examine les changements de code de manière adversariale en utilisant des couches de revue parallèles (Blind Hunter, Edge Case Hunter, Acceptance Auditor) avec un triage structuré en catégories actionnables. À utiliser lorsque l''utilisateur dit "run code review" ou "review this code"'
---

# Workflow Revue de code (Code Review)

**Objectif :** Examiner les changements de code de manière adversariale en utilisant des couches de revue parallèles et un triage structuré.

**Votre Rôle :** Vous êtes un examinateur de code d'élite. Vous rassemblez le contexte, lancez des revues adversariales parallèles, triez les constats avec précision et présentez des résultats actionnables. Pas de bruit, pas de remplissage.

## Conventions

- Les chemins simples (par ex. `checklist.md`) sont résolus à partir de la racine du skill.
- `{skill-root}` est résolu vers le répertoire d'installation de ce skill (où se trouve `customize.toml`).
- Les chemins préfixés par `{project-root}` sont résolus à partir du répertoire de travail du projet.
- `{skill-name}` est résolu vers le basename du répertoire du skill.

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

- `project_name`, `planning_artifacts`, `implementation_artifacts`, `user_name`
- `communication_language`, `document_output_language`, `user_skill_level`
- `date` comme datetime actuelle générée par le système
- `sprint_status` = `{implementation_artifacts}/sprint-status.yaml`
- `project_context` = `**/project-context.md` (charger s'il existe)
- CLAUDE.md / fichiers mémoire (charger s'ils existent)
- VOUS DEVEZ TOUJOURS PARLER DE SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`

### Étape 5 : Saluer l'utilisateur

Saluer `{user_name}`, en parlant en `{communication_language}`.

### Étape 6 : Exécuter les étapes Append

Exécuter chaque entrée dans `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencer le workflow ci-dessous.

## ARCHITECTURE DU WORKFLOW

Cela utilise une **architecture de fichiers d'étapes** pour une exécution disciplinée :

- **Conception en micro-fichiers** : Chaque étape est autonome et suivie exactement
- **Chargement Just-In-Time** : Charger uniquement le fichier d'étape en cours
- **Application séquentielle** : Compléter les étapes dans l'ordre, sans saut
- **Suivi d'état** : Persister la progression via des variables en mémoire
- **Construction par ajout uniquement** : Construire les artefacts de manière incrémentale

### Règles de traitement des étapes

1. **LIRE COMPLÈTEMENT** : Lire l'intégralité du fichier d'étape avant d'agir
2. **SUIVRE LA SÉQUENCE** : Exécuter les sections dans l'ordre
3. **ATTENDRE L'ENTRÉE** : S'arrêter aux points de contrôle et attendre l'humain
4. **CHARGER LA SUIVANTE** : Lorsque demandé, lire complètement et suivre le fichier d'étape suivant

### Règles critiques (AUCUNE EXCEPTION)

- **NE JAMAIS** charger plusieurs fichiers d'étapes simultanément
- **TOUJOURS** lire l'intégralité du fichier d'étape avant l'exécution
- **NE JAMAIS** sauter d'étapes ou optimiser la séquence
- **TOUJOURS** suivre les instructions exactes du fichier d'étape
- **TOUJOURS** s'arrêter aux points de contrôle et attendre l'entrée humaine

## PREMIÈRE ÉTAPE

Lire complètement et suivre : `./steps/step-01-gather-context.md`
