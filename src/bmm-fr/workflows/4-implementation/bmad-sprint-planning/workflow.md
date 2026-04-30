# Workflow de Planification du Sprint

**Objectif :** Générer le suivi du statut du sprint à partir des epics, en détectant les statuts actuels des stories et en construisant un fichier sprint-status.yaml complet.

**Votre Rôle :** Vous êtes un Scrum Master générant et maintenant le suivi du sprint. Analysez les fichiers d'epics, détectez les statuts des stories et produisez un fichier sprint-status.yaml structuré.

---

## INITIALISATION

### Chargement de la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `user_name`
- `{communication_language}`, `document_output_language`
- `implementation_artifacts`
- `planning_artifacts`
- `date` comme date/heure actuelle générée par le système
- VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`

### Chemins (Paths)

- `tracking_system` = `file-system`
- `project_key` = `NOKEY`
- `story_location` = `{implementation_artifacts}`
- `story_location_absolute` = `{implementation_artifacts}`
- `epics_location` = `{planning_artifacts}`
- `epics_pattern` = `*epic*.md`
- `status_file` = `{implementation_artifacts}/sprint-status.yaml`

### Fichiers d'Entrée (Input Files)

| Entrée | Chemin | Stratégie de chargement |
|-------|------|---------------|
| Epics | `{planning_artifacts}/*epic*.md` (entier) ou `{planning_artifacts}/*epic*/*.md` (partitionné) | FULL_LOAD |

### Contexte

- `project_context` = `**/project-context.md` (charger si existe)

---

## EXÉCUTION

### Découverte documentaire - Chargement Complet des Epics

**Stratégie** : La planification du sprint nécessite TOUTES les epics et stories pour construire un suivi de statut complet.

**Processus de découverte des Epics :**

1. **Chercher d'abord le document complet** - Chercher `epics.md`, `bmm-epics.md`, ou tout fichier `*epic*.md`
2. **Vérifier la version partitionnée (sharded)** - Si le document complet n'est pas trouvé, chercher `epics/index.md`
3. **Si la version partitionnée est trouvée** :
   - Lire `index.md` pour comprendre la structure du document
   - Lire TOUS les fichiers de section d'epic listés dans l'index (ex : `epic-1.md`, `epic-2.md`, etc.)
   - Traiter toutes les epics et leurs stories à partir du contenu combiné
   - Cela garantit une couverture complète du statut du sprint
4. **Priorité** : Si les deux versions (complète et partitionnée) existent, utiliser le document complet.

**Correspondance floue (Fuzzy matching)** : Soyez flexible avec les noms de documents - les utilisateurs peuvent utiliser des variantes comme `epics.md`, `bmm-epics.md`, `user-stories.md`, etc.

<workflow>

<step n="1" goal="Analyser les fichiers d'epics et extraire tous les éléments de travail">
<action>Charger {project_context} pour les modèles et conventions à l'échelle du projet (si existe)</action>
<action>Communiquer en {communication_language} avec {user_name}</action>
<action>Chercher tous les fichiers correspondant à `{epics_pattern}` dans {epics_location}</action>
<action>Il peut s'agir d'un fichier unique `epics.md` ou de plusieurs fichiers `epic-1.md`, `epic-2.md`</action>

<action>Pour chaque fichier d'epic trouvé, extraire :</action>

- Les numéros d'epic à partir des en-têtes comme `## Epic 1:` ou `## Epic 2:`
- Les IDs de story et titres à partir de modèles comme `### Story 1.1: Authentification Utilisateur`
- Convertir le format de la story de `Epic.Story: Titre` en une clé en kebab-case : `epic-story-titre`

**Règles de conversion de l'ID de Story :**

- Original : `### Story 1.1: Authentification Utilisateur`
- Remplacer le point par un tiret : `1-1`
- Convertir le titre en kebab-case (sans accents) : `authentification-utilisateur`
- Clé finale : `1-1-authentification-utilisateur`

<action>Construire un inventaire complet de toutes les epics et stories à partir de tous les fichiers d'epics</action>
</step>

<step n="2" goal="Construire la structure du statut du sprint">
<action>Pour chaque epic trouvée, créer les entrées dans cet ordre :</action>

1. **Entrée d'Epic** - Clé : `epic-{num}`, Statut par défaut : `backlog`
2. **Entrées de Story** - Clé : `{epic}-{story}-{title}`, Statut par défaut : `backlog`
3. **Entrée de Rétrospective** - Clé : `epic-{num}-retrospective`, Statut par défaut : `optional`

**Exemple de structure :**

```yaml
development_status:
  epic-1: backlog
  1-1-authentification-utilisateur: backlog
  1-2-gestion-de-compte: backlog
  epic-1-retrospective: optional
```

</step>

<step n="3" goal="Appliquer la détection intelligente du statut">
<action>Pour chaque story, détecter le statut actuel en vérifiant les fichiers :</action>

**Détection du fichier de story :**

- Vérifier : `{story_location_absolute}/{story-key}.md` (ex : `stories/1-1-authentification-utilisateur.md`)
- Si le fichier existe → passer le statut à au moins `ready-for-dev`

**Règle de préservation :**

- Si un fichier `{status_file}` existe déjà et possède un statut plus avancé, le préserver.
- Ne jamais rétrograder un statut (ex : ne pas changer `done` en `ready-for-dev`).

**Référence du flux de statut (Status Flow) :**

- Epic : `backlog` → `in-progress` → `done`
- Story : `backlog` → `ready-for-dev` → `in-progress` → `review` → `done`
- Rétrospective : `optional` ↔ `done`
  </step>

<step n="4" goal="Générer le fichier de statut du sprint">
<action>Créer ou mettre à jour {status_file} avec :</action>

**Structure du fichier :**

```yaml
# généré : {date}
# dernière_mise_à_jour : {date}
# projet : {project_name}
# clé_projet : {project_key}
# système_suivi : {tracking_system}
# emplacement_stories : {story_location}

# DÉFINITIONS DES STATUTS (STATUS DEFINITIONS) :
# ============================================
# Statut de l'Epic :
#   - backlog : Epic non encore commencée
#   - in-progress : Epic en cours de traitement actif
#   - done : Toutes les stories de l'epic sont terminées
#
# Transitions de statut d'Epic :
#   - backlog → in-progress : Automatiquement lors de la création de la première story (via create-story)
#   - in-progress → done : Manuellement quand toutes les stories sont au statut 'done'
#
# Statut de la Story :
#   - backlog : La story n'existe que dans le fichier d'epic
#   - ready-for-dev : Fichier de story créé dans le dossier des stories
#   - in-progress : Développeur travaillant activement sur l'implémentation
#   - review : Prêt pour la revue de code (via le workflow code-review du Développeur)
#   - done : Story terminée
#
# Statut de la Rétrospective :
#   - optional : Peut être effectuée mais n'est pas requise
#   - done : La rétrospective a été terminée
#
# NOTES SUR LE WORKFLOW :
# ======================
# - L'Epic passe à 'in-progress' automatiquement lors de la création de la première story
# - Les stories peuvent être travaillées en parallèle si la capacité de l'équipe le permet
# - Le SM ne crée généralement la story suivante qu'après que la précédente soit 'done' pour intégrer les apprentissages
# - Le Dév passe la story en 'review', puis lance code-review (nouveau contexte, LLM différent recommandé)

generated: { date }
last_updated: { date }
project: { project_name }
project_key: { project_key }
tracking_system: { tracking_system }
story_location: { story_location }

development_status:
  # Tous les epics, stories et rétrospectives dans l'ordre
```

<action>Écrire le YAML complet du statut du sprint dans {status_file}</action>
<action>CRITIQUE : Les métadonnées apparaissent DEUX FOIS - une fois en commentaires (#) pour la documentation, une fois en champs YAML clé:valeur pour l'analyse programmatique</action>
<action>S'assurer que tous les éléments sont ordonnés : epic, ses stories, sa rétrospective, epic suivante...</action>
</step>

<step n="5" goal="Valider et rapporter">
<action>Effectuer les checks de validation :</action>

- [ ] Chaque epic des fichiers d'epics apparaît dans {status_file}
- [ ] Chaque story des fichiers d'epics apparaît dans {status_file}
- [ ] Chaque epic a une entrée de rétrospective correspondante
- [ ] Aucun élément dans {status_file} n'existe pas dans les fichiers d'epics
- [ ] Toutes les valeurs de statut sont autorisées (correspondent aux définitions de la machine à états)
- [ ] La syntaxe YAML du fichier est valide

<action>Compter les totaux :</action>

- Total des Epics : {{epic_count}}
- Total des Stories : {{story_count}}
- Epics en cours : {{in_progress_count}}
- Stories terminées : {{done_count}}

<action>Afficher le résumé de complétude à {user_name} en {communication_language} :</action>

**Statut du sprint généré avec succès**

- **Emplacement du fichier :** {status_file}
- **Total des Epics :** {{epic_count}}
- **Total des Stories :** {{story_count}}
- **Epics en cours :** {{in_progress_count}}
- **Stories terminées :** {{done_count}}

**Étapes suivantes :**

1. Revoir le fichier {status_file} généré
2. Utiliser ce fichier pour suivre l'avancement du développement
3. Les agents mettront à jour les statuts au fil de leur travail
4. Relancer ce workflow pour rafraîchir les statuts auto-détectés

</step>

</workflow>

## Documentation Additionnelle

### Machine à états des statuts (Status State Machine)

**Flux de statut de l'Epic :**

```
backlog → in-progress → done
```

- **backlog** : Epic pas encore commencée
- **in-progress** : Epic en cours de traitement actif (stories en cours de création/implémentation)
- **done** : Toutes les stories de l'epic sont terminées

**Flux de statut de la Story :**

```
backlog → ready-for-dev → in-progress → review → done
```

- **backlog** : La story n'existe que dans le fichier d'epic
- **ready-for-dev** : Fichier de story créé (ex : `stories/1-3-nommage-plantes.md`)
- **in-progress** : Développeur travaillant activement
- **review** : Prêt pour la revue de code (via le workflow code-review du Dév)
- **done** : Terminé

**Statut de la Rétrospective :**

```
optional ↔ done
```

- **optional** : Prête à être menée mais non requise
- **done** : Terminé

### Directives (Guidelines)

1. **Activation de l'Epic** : Marquez l'epic comme `in-progress` lors du démarrage du travail sur sa première story.
2. **Défaut séquentiel** : Les stories sont généralement traitées dans l'ordre, mais le travail en parallèle est supporté.
3. **Travail en parallèle supporté** : Plusieurs stories peuvent être `in-progress` si la capacité de l'équipe le permet.
4. **Revue avant Terminé** : Les stories doivent passer par `review` avant d'être `done`.
5. **Transfert d'apprentissage** : Le SM ne crée généralement la story suivante qu'après que la précédente soit `done` pour intégrer les apprentissages.
