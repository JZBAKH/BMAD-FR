---
name: bmad-quick-dev
description: "Implémente toute intention utilisateur, exigence, story, correction de bug ou demande de changement en produisant des artefacts de code propres et fonctionnels qui suivent l'architecture, les patterns et les conventions existants du projet. À utiliser quand l'utilisateur veut construire, corriger, ajuster, refactoriser, ajouter ou modifier tout code, composant ou fonctionnalité."
---

# Workflow Quick Dev New Preview

**Objectif :** Transformer l'intention de l'utilisateur en un artefact durci et révisable.

**CRITIQUE :** Si une étape dit « lis intégralement et suis step-XX », vous lisez et suivez step-XX. Aucune exception.

## STANDARD PRÊT POUR LE DÉVELOPPEMENT

Une spécification est « Prête pour le Développement » quand :

- **Actionnable** : Chaque tâche a un chemin de fichier et une action spécifique.
- **Logique** : Tâches ordonnées par dépendance.
- **Testable** : Tous les CA utilisent Étant donné/Quand/Alors.
- **Complète** : Pas de placeholders ni de TBDs.

## STANDARD DE PORTÉE

Une spécification doit cibler **un seul objectif visible par l'utilisateur** dans **900–1600 tokens** :

- **Objectif unique** : Une fonctionnalité cohésive, même si elle s'étend sur plusieurs couches/fichiers. Multi-objectif signifie >=2 **livrables top-level indépendants et expédiables** — chacun pourrait être révisé, testé, et fusionné comme une PR séparée sans casser les autres. Ne jamais compter les verbes de surface, les conjonctions « et », ou les groupes nominaux. Ne jamais diviser les détails d'implémentation cross-couches à l'intérieur d'un objectif utilisateur.
  - Diviser : « ajouter un toggle dark mode ET refactoriser auth en JWT ET construire un dashboard admin »
  - Ne pas diviser : « ajouter validation et afficher erreurs » / « supporter drag-and-drop ET coller ET retry »
- **900–1600 tokens** : Plage optimale pour la consommation LLM. En dessous de 900 risque l'ambiguïté ; au-dessus de 1600 risque le context-rot dans les agents d'implémentation.
- **Aucune des deux limites n'est une porte.** Les deux sont des propositions avec surcharge utilisateur.

## Conventions

- Les chemins nus (par ex. `step-01-clarify-and-route.md`) sont résolus depuis la racine du Skill.
- `{skill-root}` est résolu vers le répertoire d'installation de ce Skill (où réside `customize.toml`).
- Les chemins préfixés `{project-root}` sont résolus depuis le répertoire de travail du projet.
- `{skill-name}` est résolu vers le nom de base du répertoire du Skill.

## À l'Activation

### Étape 1 : Résoudre le Bloc Workflow

Exécutez : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**Si le script échoue**, résolvez vous-même le bloc `workflow` en lisant ces trois fichiers dans l'ordre base → team → user et en appliquant les mêmes règles de fusion structurelle que le résolveur :

1. `{skill-root}/customize.toml` — valeurs par défaut
2. `{project-root}/_bmad/custom/{skill-name}.toml` — surcharges d'équipe
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — surcharges personnelles

Tout fichier manquant est ignoré. Les scalaires écrasent, les tables fusionnent en profondeur, les tableaux de tables indexés par `code` ou `id` remplacent les entrées correspondantes et ajoutent les nouvelles, et tous les autres tableaux sont concaténés.

### Étape 2 : Exécuter les Étapes Prepend

Exécutez chaque entrée de `{workflow.activation_steps_prepend}` dans l'ordre avant de continuer.

### Étape 3 : Charger les Faits Persistants

Traitez chaque entrée de `{workflow.persistent_facts}` comme un contexte fondamental que vous conservez pour le reste de l'exécution du workflow. Les entrées préfixées `file:` sont des chemins ou globs sous `{project-root}` -- chargez le contenu référencé comme des faits. Toutes les autres entrées sont des faits verbatim.

### Étape 4 : Charger la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `planning_artifacts`, `implementation_artifacts`, `user_name`
- `communication_language`, `document_output_language`, `user_skill_level`
- `date` comme datetime actuel généré par le système
- `sprint_status` = `{implementation_artifacts}/sprint-status.yaml`
- `project_context` = `**/project-context.md` (charger si existe)
- CLAUDE.md / fichiers mémoire (charger si existent)
- VOUS DEVEZ TOUJOURS PARLER en sortie dans le style de communication de votre Agent avec la config `{communication_language}`
- Le langage DOIT être adapté à `{user_skill_level}`
- Générer tous les documents en `{document_output_language}`

### Étape 5 : Saluer l'Utilisateur

Saluez `{user_name}`, en parlant dans `{communication_language}`.

### Étape 6 : Exécuter les Étapes Append

Exécutez chaque entrée de `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencez le workflow ci-dessous.

## ARCHITECTURE DU WORKFLOW

Ceci utilise une **architecture de fichiers d'étape** pour une exécution disciplinée :

- **Conception en micro-fichiers** : Chaque étape est autonome et suivie exactement
- **Chargement Just-In-Time** : Charger uniquement le fichier d'étape actuel
- **Application séquentielle** : Compléter les étapes dans l'ordre, sans sauter
- **Suivi d'état** : Persister la progression via le frontmatter de spec et les variables en mémoire
- **Construction Append-Only** : Construire les artefacts incrémentalement

### Règles de Traitement des Étapes

1. **LIRE COMPLÈTEMENT** : Lire le fichier d'étape entier avant d'agir
2. **SUIVRE LA SÉQUENCE** : Exécuter les sections dans l'ordre
3. **ATTENDRE L'ENTRÉE** : Faire halte aux points de contrôle et attendre l'humain
4. **CHARGER LA SUITE** : Quand demandé, lire intégralement et suivre le fichier d'étape suivant

### Règles Critiques (AUCUNE EXCEPTION)

- **NE JAMAIS** charger plusieurs fichiers d'étape simultanément
- **TOUJOURS** lire le fichier d'étape entier avant exécution
- **NE JAMAIS** sauter d'étapes ou optimiser la séquence
- **TOUJOURS** suivre les instructions exactes dans le fichier d'étape
- **TOUJOURS** faire halte aux points de contrôle et attendre l'entrée humaine

## PREMIÈRE ÉTAPE

Lis intégralement et suis : `./step-01-clarify-and-route.md` pour commencer le workflow.
