---
name: bmad-checkpoint-preview
description: 'Revue humaine assistée par LLM (human-in-the-loop). Donnez du sens à un changement, concentrez l''attention là où elle compte, testez. À utiliser lorsque l''utilisateur dit « checkpoint », « revue humaine » ou « explique-moi ce changement ».'
---

# Workflow de Revue Checkpoint

**Objectif :** Guider un humain dans la revue d'un changement — depuis le but et le contexte jusqu'aux détails.

**Votre rôle :** Vous assistez l'utilisateur dans la revue d'un changement.

## Conventions

- Les chemins nus (par exemple `step-01-orientation.md`) sont résolus depuis la racine du skill.
- `{skill-root}` correspond au répertoire installé de ce skill (là où réside `customize.toml`).
- Les chemins préfixés par `{project-root}` sont résolus depuis le répertoire de travail du projet.
- `{skill-name}` correspond au nom de base du répertoire du skill.

## À l'activation

### Étape 1 : Résoudre le bloc Workflow

Exécutez : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**Si le script échoue**, résolvez vous-même le bloc `workflow` en lisant ces trois fichiers dans l'ordre base → équipe → utilisateur, et en appliquant les mêmes règles de fusion structurelle que le résolveur :

1. `{skill-root}/customize.toml` — valeurs par défaut
2. `{project-root}/_bmad/custom/{skill-name}.toml` — surcharges d'équipe
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — surcharges personnelles

Tout fichier manquant est ignoré. Les scalaires écrasent, les tables fusionnent en profondeur, les tableaux de tables indexés par `code` ou `id` remplacent les entrées correspondantes et ajoutent les nouvelles entrées, et tous les autres tableaux sont concaténés.

### Étape 2 : Exécuter les étapes de prepend

Exécutez chaque entrée de `{workflow.activation_steps_prepend}` dans l'ordre avant de poursuivre.

### Étape 3 : Charger les faits persistants

Traitez chaque entrée de `{workflow.persistent_facts}` comme un contexte fondateur que vous portez pour le reste de l'exécution du Workflow. Les entrées préfixées par `file:` sont des chemins ou des globs sous `{project-root}` — chargez le contenu référencé comme des faits. Toutes les autres entrées sont des faits littéraux.

### Étape 4 : Charger la configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `implementation_artifacts`
- `planning_artifacts`
- `communication_language`
- `document_output_language`

### Étape 5 : Saluer l'utilisateur

Saluez l'utilisateur, en parlant en `{communication_language}`.

### Étape 6 : Exécuter les étapes d'append

Exécutez chaque entrée de `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Démarrez le Workflow ci-dessous.

## Règles globales d'étape (s'appliquent à chaque étape)

- **Format Path:line** — Chaque référence de code doit utiliser le format `path:line` relatif au CWD (sans `/` initial) afin d'être cliquable dans les terminaux intégrés à l'IDE (par exemple, `src/auth/middleware.ts:42`).
- **Tout placer en tête puis se taire** — Présentez la totalité de la sortie pour l'étape courante en un seul message cohérent. Ne posez pas de questions en milieu d'étape, ne diffusez pas au compte-gouttes, ne marquez pas de pause entre les sections.
- **Langue** — Parlez en `{communication_language}`. Écrivez toute sortie de fichier en `{document_output_language}`.

## PREMIÈRE ÉTAPE

Lisez intégralement et suivez `./step-01-orientation.md` pour commencer.
