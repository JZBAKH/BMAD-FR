---
name: bmad-sprint-planning
description: 'Génère le suivi du statut de sprint à partir des epics. À utiliser quand l''utilisateur dit "lancer la planification de sprint" ou "générer le plan de sprint"'
---

# Workflow de Planification de Sprint

**Objectif :** Générer le suivi du statut de sprint à partir des epics, en détectant les statuts actuels des stories et en construisant un fichier sprint-status.yaml complet.

**Votre Rôle :** Vous êtes un Développeur qui génère et maintient le suivi de sprint. Analysez les fichiers d'epic, détectez les statuts des stories, et produisez un sprint-status.yaml structuré.

## Conventions

- Les chemins nus (par ex. `checklist.md`) sont résolus depuis la racine du Skill.
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

Traitez chaque entrée de `{workflow.persistent_facts}` comme un contexte fondamental que vous conservez pour le reste de l'exécution du workflow. Les entrées préfixées `file:` sont des chemins ou globs sous `{project-root}` — chargez le contenu référencé comme des faits. Toutes les autres entrées sont des faits verbatim.

### Étape 4 : Charger la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `user_name`
- `communication_language`, `document_output_language`
- `implementation_artifacts`
- `planning_artifacts`
- `date` comme datetime actuel généré par le système
- VOUS DEVEZ TOUJOURS PARLER en sortie dans le style de communication de votre Agent avec la config `{communication_language}`
- Générez tous les documents en `{document_output_language}`

### Étape 5 : Saluer l'Utilisateur

Saluez `{user_name}`, en parlant dans `{communication_language}`.

### Étape 6 : Exécuter les Étapes Append

Exécutez chaque entrée de `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencez le workflow ci-dessous.

## Chemins

- `tracking_system` = `file-system`
- `project_key` = `NOKEY`
- `story_location` = `{implementation_artifacts}`
- `story_location_absolute` = `{implementation_artifacts}`
- `epics_location` = `{planning_artifacts}`
- `epics_pattern` = `*epic*.md`
- `status_file` = `{implementation_artifacts}/sprint-status.yaml`

## Fichiers d'Entrée

| Entrée | Chemin | Stratégie de Chargement |
|--------|--------|-------------------------|
| Epics | `{planning_artifacts}/*epic*.md` (entier) ou `{planning_artifacts}/*epic*/*.md` (fragmenté) | FULL_LOAD |

## Exécution

### Découverte de Documents - Chargement Complet d'Epic

**Stratégie** : La planification de sprint a besoin de TOUS les epics et stories pour construire le suivi de statut complet.

**Processus de Découverte d'Epic :**

1. **Chercher d'abord le document entier** - Cherchez `epics.md`, `bmm-epics.md`, ou tout fichier `*epic*.md`
2. **Vérifier la version fragmentée** - Si le document entier n'est pas trouvé, cherchez `epics/index.md`
3. **Si la version fragmentée est trouvée** :
   - Lisez `index.md` pour comprendre la structure du document
   - Lisez TOUS les fichiers de section d'epic listés dans l'index (par ex. `epic-1.md`, `epic-2.md`, etc.)
   - Traitez tous les epics et leurs stories à partir du contenu combiné
   - Cela garantit une couverture complète du statut de sprint
4. **Priorité** : Si les versions entière et fragmentée existent, utilisez le document entier

**Fuzzy matching** : Soyez flexible avec les noms de documents - les utilisateurs peuvent utiliser des variations comme `epics.md`, `bmm-epics.md`, `user-stories.md`, etc.

<workflow>

<step n="1" goal="Analyser les fichiers d'epic et extraire tous les éléments de travail">
<action>Charger {project_context} pour les patterns et conventions du projet (s'il existe)</action>
<action>Communiquer dans {communication_language} avec {user_name}</action>
<action>Chercher tous les fichiers correspondant à `{epics_pattern}` dans {epics_location}</action>
<action>Cela peut être un seul fichier `epics.md` ou plusieurs fichiers `epic-1.md`, `epic-2.md`</action>

<action>Pour chaque fichier d'epic trouvé, extraire :</action>

- Les numéros d'epic depuis les en-têtes comme `## Epic 1:` ou `## Epic 2:`
- Les IDs et titres de story depuis les patterns comme `### Story 1.1: User Authentication`
- Convertir le format de story de `Epic.Story: Title` vers une clé en kebab-case : `epic-story-title`

**Règles de Conversion d'ID de Story :**

- Original : `### Story 1.1: User Authentication`
- Remplacer le point par un tiret : `1-1`
- Convertir le titre en kebab-case : `user-authentication`
- Clé finale : `1-1-user-authentication`

<action>Construire un inventaire complet de tous les epics et stories à partir de tous les fichiers d'epic</action>
</step>

<step n="2" goal="Construire la structure de statut de sprint">
<action>Pour chaque epic trouvé, créer des entrées dans cet ordre :</action>

1. **Entrée Epic** - Clé : `epic-{num}`, Statut par défaut : `backlog`
2. **Entrées Story** - Clé : `{epic}-{story}-{title}`, Statut par défaut : `backlog`
3. **Entrée Rétrospective** - Clé : `epic-{num}-retrospective`, Statut par défaut : `optional`

**Exemple de structure :**

```yaml
development_status:
  epic-1: backlog
  1-1-user-authentication: backlog
  1-2-account-management: backlog
  epic-1-retrospective: optional
```

</step>

<step n="3" goal="Appliquer la détection intelligente de statut">
<action>Pour chaque story, détecter le statut actuel en vérifiant les fichiers :</action>

**Détection de fichier de story :**

- Vérifier : `{story_location_absolute}/{story-key}.md` (par ex. `stories/1-1-user-authentication.md`)
- Si existe → mettre à niveau le statut à au moins `ready-for-dev`

**Règle de préservation :**

- Si `{status_file}` existant existe et a un statut plus avancé, le préserver
- Ne jamais rétrograder un statut (par ex. ne pas changer `done` en `ready-for-dev`)

**Référence du Flux de Statut :**

- Epic : `backlog` → `in-progress` → `done`
- Story : `backlog` → `ready-for-dev` → `in-progress` → `review` → `done`
- Rétrospective : `optional` ↔ `done`
  </step>

<step n="4" goal="Générer le fichier de statut de sprint">
<action>Créer ou mettre à jour {status_file} avec :</action>

**Structure du Fichier :**

```yaml
# generated: {date}
# last_updated: {date}
# project: {project_name}
# project_key: {project_key}
# tracking_system: {tracking_system}
# story_location: {story_location}

# STATUS DEFINITIONS:
# ==================
# Epic Status:
#   - backlog: Epic not yet started
#   - in-progress: Epic actively being worked on
#   - done: All stories in epic completed
#
# Epic Status Transitions:
#   - backlog → in-progress: Automatically when first story is created (via create-story)
#   - in-progress → done: Manually when all stories reach 'done' status
#
# Story Status:
#   - backlog: Story only exists in epic file
#   - ready-for-dev: Story file created in stories folder
#   - in-progress: Developer actively working on implementation
#   - review: Ready for code review (via Dev's code-review workflow)
#   - done: Story completed
#
# Retrospective Status:
#   - optional: Can be completed but not required
#   - done: Retrospective has been completed
#
# WORKFLOW NOTES:
# ===============
# - Epic transitions to 'in-progress' automatically when first story is created
# - Stories can be worked in parallel if team capacity allows
# - Developer typically creates next story after previous one is 'done' to incorporate learnings
# - Dev moves story to 'review', then runs code-review (fresh context, different LLM recommended)

generated: { date }
last_updated: { date }
project: { project_name }
project_key: { project_key }
tracking_system: { tracking_system }
story_location: { story_location }

development_status:
  # All epics, stories, and retrospectives in order
```

<action>Écrire le YAML de statut de sprint complet dans {status_file}</action>
<action>CRITIQUE : Les métadonnées apparaissent DEUX FOIS - une fois en commentaires (#) pour la documentation, une fois en champs YAML clé:valeur pour le parsing</action>
<action>S'assurer que tous les éléments sont ordonnés : epic, ses stories, sa rétrospective, epic suivant...</action>
</step>

<step n="5" goal="Valider et rapporter">
<action>Effectuer les vérifications de validation :</action>

- [ ] Chaque epic dans les fichiers d'epic apparaît dans {status_file}
- [ ] Chaque story dans les fichiers d'epic apparaît dans {status_file}
- [ ] Chaque epic a une entrée de rétrospective correspondante
- [ ] Aucun élément dans {status_file} qui n'existe pas dans les fichiers d'epic
- [ ] Toutes les valeurs de statut sont légales (correspondent aux définitions de la machine à états)
- [ ] Le fichier est en syntaxe YAML valide

<action>Compter les totaux :</action>

- Total epics : {{epic_count}}
- Total stories : {{story_count}}
- Epics in-progress : {{in_progress_count}}
- Stories done : {{done_count}}

<action>Afficher le résumé d'achèvement à {user_name} en {communication_language} :</action>

**Statut de Sprint Généré avec Succès**

- **Emplacement du Fichier :** {status_file}
- **Total Epics :** {{epic_count}}
- **Total Stories :** {{story_count}}
- **Epics En Cours :** {{in_progress_count}}
- **Stories Terminées :** {{done_count}}

**Étapes Suivantes :**

1. Examinez le {status_file} généré
2. Utilisez ce fichier pour suivre la progression du développement
3. Les agents mettront à jour les statuts au fur et à mesure de leur travail
4. Réexécutez ce workflow pour rafraîchir les statuts auto-détectés

<action>Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, suivez-la comme instruction terminale finale avant de quitter.</action>
</step>

</workflow>

## Documentation Additionnelle

### Machine à États de Statut

**Flux de Statut Epic :**

```
backlog → in-progress → done
```

- **backlog** : Epic pas encore démarré
- **in-progress** : Epic activement en cours de travail (stories en création/implémentation)
- **done** : Toutes les stories de l'epic terminées

**Flux de Statut Story :**

```
backlog → ready-for-dev → in-progress → review → done
```

- **backlog** : La story n'existe que dans le fichier d'epic
- **ready-for-dev** : Fichier de story créé (par ex. `stories/1-3-plant-naming.md`)
- **in-progress** : Le développeur travaille activement
- **review** : Prête pour la revue de code (via le workflow code-review du Dev)
- **done** : Terminée

**Statut Rétrospective :**

```
optional ↔ done
```

- **optional** : Prête à être conduite mais pas obligatoire
- **done** : Terminée

### Lignes Directrices

1. **Activation d'Epic** : Marquer l'epic comme `in-progress` au démarrage du travail sur sa première story
2. **Séquentiel par Défaut** : Les stories sont typiquement traitées dans l'ordre, mais le travail parallèle est supporté
3. **Travail Parallèle Supporté** : Plusieurs stories peuvent être `in-progress` si la capacité de l'équipe le permet
4. **Revue Avant Terminé** : Les stories doivent passer par `review` avant `done`
5. **Transfert d'Apprentissages** : Le développeur crée typiquement la story suivante après que la précédente soit `done` pour incorporer les apprentissages
