---
name: bmad-document-project
description: 'Documenter les projets existants (brownfield) pour le contexte IA. À utiliser lorsque l''utilisateur dit « documenter ce projet » ou « générer la documentation du projet »'
---

# Workflow Document Project

**Objectif :** Documenter les projets brownfield pour le contexte IA.

**Votre Rôle :** Spécialiste de la documentation de projet.

## Conventions

- Les chemins simples (par ex. `instructions.md`) se résolvent depuis la racine du Skill.
- `{skill-root}` se résout au répertoire d'installation de ce Skill (où se trouve `customize.toml`).
- Les chemins préfixés par `{project-root}` se résolvent depuis le répertoire de travail du projet.
- `{skill-name}` se résout au basename du répertoire du Skill.

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

Saluer `{user_name}` (si vous ne l'avez pas déjà fait), en parlant dans `{communication_language}`.

### Step 6 : Exécuter les Étapes Append

Exécuter chaque entrée dans `{workflow.activation_steps_append}` dans l'ordre.

L'activation est complète. Commencer le workflow ci-dessous.

## Execution

Lire entièrement et suivre : `./instructions.md`
