---
name: bmad-correct-course
description: 'Gérer les changements significatifs durant l''exécution du sprint. À utiliser lorsque l''utilisateur dit "changement de cap" ou "proposer un changement de sprint"'
---

# Changement de cap (Correct Course) - Workflow de gestion des changements de sprint

**Objectif :** Gérer les changements significatifs durant l'exécution du sprint en analysant l'impact à travers tous les artefacts du projet et en produisant une Proposition de Changement de Sprint structurée.

**Votre Rôle :** Vous êtes un Développeur naviguant la gestion du changement. Analysez le problème déclencheur, évaluez l'impact à travers les artefacts PRD, thèmes (epics), architecture et UX, et produisez une Proposition de Changement de Sprint actionnable avec une transmission claire.

## Conventions

- Les chemins simples (par ex. `checklist.md`) se résolvent depuis la racine du Skill.
- `{skill-root}` se résout vers le répertoire d'installation de ce Skill (où se trouve `customize.toml`).
- Les chemins préfixés `{project-root}` se résolvent depuis le répertoire de travail du projet.
- `{skill-name}` se résout vers le basename du répertoire du Skill.

## À l'activation

### Étape 1 : Résoudre le bloc Workflow

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**Si le script échoue**, résolvez le bloc `workflow` vous-même en lisant ces trois fichiers dans l'ordre base → équipe → utilisateur et en appliquant les mêmes règles de fusion structurelle que le résolveur :

1. `{skill-root}/customize.toml` — valeurs par défaut
2. `{project-root}/_bmad/custom/{skill-name}.toml` — surcharges d'équipe
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — surcharges personnelles

Tout fichier manquant est ignoré. Les scalaires écrasent, les tables sont fusionnées en profondeur, les tableaux de tables clés par `code` ou `id` remplacent les entrées correspondantes et ajoutent les nouvelles entrées, et tous les autres tableaux sont concaténés.

### Étape 2 : Exécuter les étapes de préfixe

Exécutez chaque entrée dans `{workflow.activation_steps_prepend}` dans l'ordre avant de continuer.

### Étape 3 : Charger les faits persistants

Traitez chaque entrée dans `{workflow.persistent_facts}` comme un contexte fondamental que vous portez pour le reste de l'exécution du workflow. Les entrées préfixées `file:` sont des chemins ou des globs sous `{project-root}` — chargez le contenu référencé comme faits. Toutes les autres entrées sont des faits littéraux.

### Étape 4 : Charger la config

Chargez la config depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `user_name`
- `communication_language`, `document_output_language`
- `user_skill_level`
- `implementation_artifacts`
- `planning_artifacts`
- `project_knowledge`
- `date` comme datetime courant généré par le système
- VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`
- Le langage DOIT être adapté à `{user_skill_level}`
- Générez tous les documents dans `{document_output_language}`
- SORTIE DE DOCUMENT : Thèmes (epics), cas d'usage (stories) ou sections de PRD mis à jour. Changements clairs et actionnables. Le niveau de compétence utilisateur (`{user_skill_level}`) affecte UNIQUEMENT le style de conversation, pas les mises à jour des documents.

### Étape 5 : Saluer l'utilisateur

Saluez `{user_name}`, en parlant en `{communication_language}`.

### Étape 6 : Exécuter les étapes de suffixe

Exécutez chaque entrée dans `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencez le workflow ci-dessous.

## Chemins

- `default_output_file` = `{planning_artifacts}/sprint-change-proposal-{date}.md`

## Fichiers d'entrée

| Entrée           | Chemin                                                                                                      | Stratégie de chargement |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------- |
| PRD              | `{planning_artifacts}/*prd*.md` (entier) ou `{planning_artifacts}/*prd*/*.md` (fragmenté)                   | FULL_LOAD               |
| Thèmes (Epics)   | `{planning_artifacts}/*epic*.md` (entier) ou `{planning_artifacts}/*epic*/*.md` (fragmenté)                 | FULL_LOAD               |
| Architecture     | `{planning_artifacts}/*architecture*.md` (entier) ou `{planning_artifacts}/*architecture*/*.md` (fragmenté) | FULL_LOAD               |
| Conception UX    | `{planning_artifacts}/*ux*.md` (entier) ou `{planning_artifacts}/*ux*/*.md` (fragmenté)                     | FULL_LOAD               |
| Spec             | `{planning_artifacts}/*spec-*.md` (entier)                                                                  | FULL_LOAD               |
| Document Project | `{project_knowledge}/index.md` (fragmenté)                                                                  | INDEX_GUIDED            |

## Exécution

### Découverte des documents - Chargement des artefacts du projet

**Stratégie** : Le changement de cap nécessite un large contexte projet pour évaluer correctement l'impact du changement. Chargez tous les artefacts de planification disponibles.

**Processus de découverte pour les documents FULL_LOAD (PRD, Thèmes, Architecture, Conception UX, Spec) :**

1. **Recherchez d'abord le document entier** - Cherchez les fichiers correspondant au pattern de document entier (par ex. `*prd*.md`, `*epic*.md`, `*architecture*.md`, `*ux*.md`, `*spec-*.md`)
2. **Vérifiez la version fragmentée** - Si le document entier n'est pas trouvé, cherchez un répertoire avec `index.md` (par ex. `prd/index.md`, `epics/index.md`)
3. **Si la version fragmentée est trouvée** :
   - Lisez `index.md` pour comprendre la structure du document
   - Lisez TOUS les fichiers de section listés dans l'index
   - Traitez le contenu combiné comme un seul document
4. **Priorité** : Si les versions entière et fragmentée existent, utilisez le document entier

**Processus de découverte pour les documents INDEX_GUIDED (Document Project) :**

1. **Recherchez le fichier d'index** - Cherchez `{project_knowledge}/index.md`
2. **Si trouvé** : Lisez l'index pour comprendre les sections de documentation disponibles
3. **Chargez sélectivement les sections** en fonction de leur pertinence par rapport au changement analysé — ne chargez PAS tout, uniquement les sections liées aux zones impactées
4. **Ce document est optionnel** — sautez si `{project_knowledge}` n'existe pas (projets greenfield)

**Correspondance approximative** : Soyez flexible avec les noms de documents — les utilisateurs peuvent utiliser des variantes comme `prd.md`, `bmm-prd.md`, `product-requirements.md`, etc.

**Documents manquants** : Tous les documents peuvent ne pas exister. PRD et Thèmes (Epics) sont essentiels ; Architecture, Conception UX, Spec et Document Project sont chargés s'ils sont disponibles. ARRÊTEZ si PRD ou Thèmes (Epics) ne peuvent pas être trouvés.

<workflow>

<step n="1" goal="Initialiser la navigation du changement">
  <action>Confirmer le déclencheur du changement et collecter la description du problème par l'utilisateur</action>
  <action>Demander : "Quel problème ou changement spécifique a été identifié et nécessite une navigation ?"</action>
  <action>Vérifier l'accès aux documents du projet :</action>
    - PRD (Cahier des charges produit) — requis
    - Thèmes (Epics) et cas d'usage (Stories) actuels — requis
    - Documentation d'architecture — optionnel, charger si disponible
    - Spécifications UI/UX — optionnel, charger si disponible
  <action>Demander à l'utilisateur sa préférence de mode :</action>
    - **Incrémental** (recommandé) : Affiner chaque édition en collaboration
    - **Batch** : Présenter tous les changements d'un coup pour révision
  <action>Stocker la sélection du mode pour utilisation tout au long du workflow</action>

<action if="le déclencheur du changement n'est pas clair">ARRÊT : "Impossible de naviguer le changement sans une compréhension claire du problème déclencheur. Veuillez fournir des détails spécifiques sur ce qui doit changer et pourquoi."</action>

<action if="PRD ou Thèmes (Epics) sont indisponibles">ARRÊT : "Besoin d'accès au PRD et aux Thèmes (Epics) pour évaluer l'impact du changement. Veuillez vous assurer que ces documents sont accessibles. Architecture et UI/UX seront utilisés s'ils sont disponibles."</action>
</step>

<step n="2" goal="Exécuter la checklist d'analyse du changement">
  <action>Lire intégralement et suivre l'analyse systématique depuis : checklist.md</action>
  <action>Travailler à travers chaque section de la checklist de manière interactive avec l'utilisateur</action>
  <action>Enregistrer le statut pour chaque item de la checklist :</action>
    - [x] Fait - Item complété avec succès
    - [N/A] Ignorer - Item non applicable à ce changement
    - [!] Action requise - Item nécessite attention ou suivi
  <action>Tenir des notes en cours sur les conclusions et impacts découverts</action>
  <action>Présenter la progression de la checklist après chaque section majeure</action>

<action if="la checklist ne peut pas être complétée">Identifier les problèmes bloquants et travailler avec l'utilisateur pour les résoudre avant de continuer</action>
</step>

<step n="3" goal="Rédiger des propositions de changement spécifiques">
<action>Sur la base des conclusions de la checklist, créer des propositions d'édition explicites pour chaque artefact identifié</action>

<action>Pour les changements de cas d'usage (Story) :</action>

- Montrer le format ancien → nouveau texte
- Inclure l'ID du cas d'usage et la section modifiée
- Fournir une justification pour chaque changement
- Format d'exemple :

  ```
  Story: [STORY-123] User Authentication
  Section: Acceptance Criteria

  OLD:
  - User can log in with email/password

  NEW:
  - User can log in with email/password
  - User can enable 2FA via authenticator app

  Rationale: Security requirement identified during implementation
  ```

<action>Pour les modifications du PRD :</action>

- Spécifier les sections exactes à mettre à jour
- Montrer le contenu actuel et les changements proposés
- Expliquer l'impact sur le périmètre MVP et les exigences

<action>Pour les changements d'architecture :</action>

- Identifier les composants, motifs ou choix technologiques affectés
- Décrire les mises à jour de diagrammes nécessaires
- Noter tous les effets de propagation sur d'autres composants

<action>Pour les mises à jour de spécifications UI/UX :</action>

- Référencer les écrans ou composants spécifiques
- Montrer les changements de wireframe ou de flux nécessaires
- Connecter les changements à l'impact sur l'expérience utilisateur

<check if="le mode est Incrémental">
  <action>Présenter chaque proposition d'édition individuellement</action>
  <ask>Réviser et affiner ce changement ? Options : Approuver [a], Éditer [e], Ignorer [s]</ask>
  <action>Itérer sur chaque proposition selon les retours de l'utilisateur</action>
</check>

<action if="le mode est Batch">Collecter toutes les propositions d'édition et les présenter ensemble à la fin de l'étape</action>

</step>

<step n="4" goal="Générer la Proposition de Changement de Sprint">
<action>Compiler le document complet de Proposition de Changement de Sprint avec les sections suivantes :</action>

<action>Section 1 : Résumé du Problème</action>

- Énoncé clair du problème décrivant ce qui a déclenché le changement
- Contexte sur quand/comment le problème a été découvert
- Preuves ou exemples démontrant le problème

<action>Section 2 : Analyse d'Impact</action>

- Impact sur les Thèmes (Epics) : Quels thèmes sont affectés et comment
- Impact sur les Cas d'usage (Stories) : Cas d'usage actuels et futurs nécessitant des changements
- Conflits d'Artefacts : Documents PRD, Architecture, UI/UX nécessitant des mises à jour
- Impact Technique : Implications sur le code, l'infrastructure ou le déploiement

<action>Section 3 : Approche Recommandée</action>

- Présenter le chemin choisi en avant à partir de l'évaluation de la checklist :
  - Ajustement Direct : Modifier/ajouter des cas d'usage dans le plan existant
  - Rollback Potentiel : Revenir sur le travail complété pour simplifier la résolution
  - Révision MVP : Réduire le périmètre ou modifier les objectifs
- Fournir une justification claire pour la recommandation
- Inclure une estimation d'effort, une évaluation de risque et un impact sur le calendrier

<action>Section 4 : Propositions de Changement Détaillées</action>

- Inclure toutes les propositions d'édition affinées de l'Étape 3
- Grouper par type d'artefact (Cas d'usage, PRD, Architecture, UI/UX)
- S'assurer que chaque changement inclut avant/après et justification

<action>Section 5 : Transmission pour Implémentation</action>

- Catégoriser le périmètre du changement :
  - Mineur : Implémentation directe par l'agent Développeur
  - Modéré : Réorganisation du backlog nécessaire (PO/DEV)
  - Majeur : Replanification fondamentale requise (PM/Architecte)
- Spécifier les destinataires de la transmission et leurs responsabilités
- Définir les critères de succès pour l'implémentation

<action>Présenter la Proposition de Changement de Sprint complète à l'utilisateur</action>
<action>Écrire le document Proposition de Changement de Sprint dans {default_output_file}</action>
<ask>Réviser la proposition complète. Continuer [c] ou Éditer [e] ?</ask>
</step>

<step n="5" goal="Finaliser et router pour l'implémentation">
<action>Obtenir l'approbation explicite de l'utilisateur pour la proposition complète</action>
<ask>Approuvez-vous cette Proposition de Changement de Sprint pour implémentation ? (oui/non/réviser)</ask>

<check if="non ou réviser">
  <action>Recueillir les retours spécifiques sur ce qui doit être ajusté</action>
  <action>Retourner à l'étape appropriée pour traiter les préoccupations</action>
  <goto step="3">Si des changements sont nécessaires aux propositions d'édition</goto>
  <goto step="4">Si des changements sont nécessaires à la structure globale de la proposition</goto>

</check>

<check if="oui la proposition est approuvée par l'utilisateur">
  <action>Finaliser le document Proposition de Changement de Sprint</action>
  <action>Déterminer la classification du périmètre du changement :</action>

- **Mineur** : Peut être implémenté directement par l'agent Développeur
- **Modéré** : Nécessite une réorganisation du backlog et une coordination PO/DEV
- **Majeur** : Nécessite une replanification fondamentale avec implication PM/Architecte

<action>Fournir la transmission appropriée selon le périmètre :</action>

</check>

<check if="périmètre Mineur">
  <action>Router vers : Agent Développeur pour implémentation directe</action>
  <action>Livrables : Propositions d'édition finalisées et tâches d'implémentation</action>
</check>

<check if="périmètre Modéré">
  <action>Router vers : Agents Product Owner / Développeur</action>
  <action>Livrables : Proposition de Changement de Sprint + plan de réorganisation du backlog</action>
</check>

<check if="périmètre Majeur">
  <action>Router vers : Product Manager / Architecte de Solution</action>
  <action>Livrables : Proposition de Changement de Sprint complète + notification d'escalade</action>

<action>Confirmer la fin de la transmission et les prochaines étapes avec l'utilisateur</action>
<action>Documenter la transmission dans le journal d'exécution du workflow</action>
</check>

</step>

<step n="6" goal="Achèvement du Workflow">
<action>Résumer l'exécution du workflow :</action>
  - Problème traité : {{change_trigger}}
  - Périmètre du changement : {{scope_classification}}
  - Artefacts modifiés : {{list_of_artifacts}}
  - Routé vers : {{handoff_recipients}}

<action>Confirmer la production de tous les livrables :</action>

- Document Proposition de Changement de Sprint
- Propositions d'édition spécifiques avec avant/après
- Plan de transmission pour implémentation

<action>Rapporter l'achèvement du workflow à l'utilisateur avec un message personnalisé : "Workflow Changement de cap (Correct Course) terminé, {user_name} !"</action>
<action>Rappeler à l'utilisateur les critères de succès et les prochaines étapes pour l'agent Développeur</action>
<action>Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, suivez-la comme instruction terminale finale avant de quitter.</action>
</step>

</workflow>
