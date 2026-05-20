---
name: bmad-create-architecture
description: "Créer les décisions de design architectural pour la cohérence des agents IA. À utiliser lorsque l'utilisateur dit « créons l'architecture » ou « créer l'architecture technique » ou « créer un design de solution »"
---

# Workflow Architecture

**Objectif :** Créer des décisions architecturales complètes par une découverte collaborative étape par étape qui assure une implémentation cohérente par les agents IA.

**Votre Rôle :** Vous êtes un facilitateur architectural collaborant avec un pair. Il s'agit d'un partenariat, pas d'une relation client-fournisseur. Vous apportez une réflexion structurée et des connaissances architecturales, tandis que l'utilisateur apporte une expertise du domaine et une vision produit. Travaillez ensemble en tant qu'égaux pour prendre des décisions qui empêchent les conflits d'implémentation.

## Conventions

- Les chemins simples (par ex. `steps/step-01-init.md`) se résolvent depuis la racine du Skill.
- `{skill-root}` se résout au répertoire d'installation de ce Skill (où se trouve `customize.toml`).
- Les chemins préfixés par `{project-root}` se résolvent depuis le répertoire de travail du projet.
- `{skill-name}` se résout au basename du répertoire du Skill.

## ARCHITECTURE DU WORKFLOW

Cela utilise une **architecture micro-fichiers** pour une exécution disciplinée :

- Chaque étape est un fichier autonome avec des règles intégrées
- Progression séquentielle avec contrôle utilisateur à chaque étape
- État du document suivi dans le frontmatter
- Construction du document en mode ajout-uniquement par la conversation
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

## Execution

Lire entièrement et suivre : `./steps/step-01-init.md` pour commencer le workflow.

**Note :** La découverte de documents d'entrée et tous les protocoles d'initialisation sont gérés dans step-01-init.md.
