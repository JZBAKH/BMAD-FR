---
name: bmad-sprint-status
description: 'Résume le statut de sprint et fait remonter les risques. À utiliser quand l''utilisateur dit "vérifier le statut de sprint" ou "afficher le statut de sprint"'
---

# Workflow de Statut de Sprint

**Objectif :** Résumer le statut de sprint, faire remonter les risques, et recommander la prochaine action de workflow.

**Votre Rôle :** Vous êtes un Développeur fournissant une visibilité de sprint claire et actionnable. Pas d'estimations de temps — concentrez-vous sur le statut, les risques et les étapes suivantes.

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
- `date` comme datetime actuel généré par le système
- VOUS DEVEZ TOUJOURS PARLER en sortie dans le style de communication de votre Agent avec la config `{communication_language}`

### Étape 5 : Saluer l'Utilisateur

Saluez `{user_name}`, en parlant dans `{communication_language}`.

### Étape 6 : Exécuter les Étapes Append

Exécutez chaque entrée de `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencez le workflow ci-dessous.

## Chemins

- `sprint_status_file` = `{implementation_artifacts}/sprint-status.yaml`

## Fichiers d'Entrée

| Entrée | Chemin | Stratégie de Chargement |
|--------|--------|-------------------------|
| Statut de sprint | `{sprint_status_file}` | FULL_LOAD |

## Exécution

<workflow>

<step n="0" goal="Déterminer le mode d'exécution">
  <action>Définir mode = {{mode}} si fourni par l'appelant ; sinon mode = "interactive"</action>

  <check if="mode == data">
    <action>Sauter à l'Étape 20</action>
  </check>

  <check if="mode == validate">
    <action>Sauter à l'Étape 30</action>
  </check>

  <check if="mode == interactive">
    <action>Continuer à l'Étape 1</action>
  </check>
</step>

<step n="1" goal="Localiser le fichier de statut de sprint">
  <action>Charger {project_context} pour les patterns et conventions du projet (s'il existe)</action>
  <action>Essayer {sprint_status_file}</action>
  <check if="file not found">
    <output>sprint-status.yaml introuvable.
Exécutez `/bmad:bmm:workflows:sprint-planning` pour le générer, puis relancez sprint-status.</output>
    <action>Quitter le workflow</action>
  </check>
  <action>Continuer à l'Étape 2</action>
</step>

<step n="2" goal="Lire et analyser sprint-status.yaml">
  <action>Lire le fichier ENTIER : {sprint_status_file}</action>
  <action>Analyser les champs : generated, last_updated, project, project_key, tracking_system, story_location</action>
  <action>Analyser la map development_status. Classifier les clés :</action>
- Epics : clés commençant par "epic-" (et ne se terminant pas par "-retrospective")
- Rétrospectives : clés se terminant par "-retrospective"
- Stories : tout le reste (par ex. 1-2-login-form)
  <action>Mapper le statut de story legacy "drafted" → "ready-for-dev"</action>
  <action>Compter les statuts de story : backlog, ready-for-dev, in-progress, review, done</action>
  <action>Mapper le statut d'epic legacy "contexted" → "in-progress"</action>
  <action>Compter les statuts d'epic : backlog, in-progress, done</action>
  <action>Compter les statuts de rétrospective : optional, done</action>

<action>Valider tous les statuts par rapport aux valeurs connues :</action>

- Statuts de story valides : backlog, ready-for-dev, in-progress, review, done, drafted (legacy)
- Statuts d'epic valides : backlog, in-progress, done, contexted (legacy)
- Statuts de rétrospective valides : optional, done

  <check if="any status is unrecognized">
    <output>
**Statut inconnu détecté :**
{{#each invalid_entries}}

- `{{key}}` : "{{status}}" (non reconnu)
  {{/each}}

**Statuts valides :**

- Stories : backlog, ready-for-dev, in-progress, review, done
- Epics : backlog, in-progress, done
- Rétrospectives : optional, done
  </output>
  <ask>Comment ces éléments doivent-ils être corrigés ?
  {{#each invalid_entries}}
  {{@index}}. {{key}} : "{{status}}" → [sélectionner statut valide]
  {{/each}}

Entrez les corrections (par ex. "1=in-progress, 2=backlog") ou "skip" pour continuer sans corriger :</ask>
<check if="user provided corrections">
<action>Mettre à jour sprint-status.yaml avec les valeurs corrigées</action>
<action>Réanalyser le fichier avec les statuts corrigés</action>
</check>
</check>

<action>Détecter les risques :</action>

- SI une story a le statut "review" : suggérer `/bmad:bmm:workflows:code-review`
- SI une story a le statut "in-progress" ET aucune story n'a le statut "ready-for-dev" : recommander de rester concentré sur la story active
- SI tous les epics ont le statut "backlog" ET aucune story n'a le statut "ready-for-dev" : proposer `/bmad:bmm:workflows:create-story`
- SI le timestamp `last_updated` date de plus de 7 jours (ou si `last_updated` est manquant, se rabattre sur `generated`) : avertir "sprint-status.yaml peut être obsolète"
- SI une clé de story ne correspond à aucun pattern d'epic (par ex. story "5-1-..." mais pas d'"epic-5") : avertir "story orpheline détectée"
- SI un epic a le statut in-progress mais n'a aucune story associée : avertir "epic in-progress n'a aucune story"
  </step>

<step n="3" goal="Sélectionner la prochaine recommandation d'action">
  <action>Choisir le prochain workflow recommandé selon la priorité :</action>
  <note>Lors de la sélection de la "première" story : trier par numéro d'epic, puis numéro de story (par ex. 1-1 avant 1-2 avant 2-1)</note>
  1. Si une story a le statut == in-progress → recommander `dev-story` pour la première story in-progress
  2. Sinon si une story a le statut == review → recommander `code-review` pour la première story en review
  3. Sinon si une story a le statut == ready-for-dev → recommander `dev-story`
  4. Sinon si une story a le statut == backlog → recommander `create-story`
  5. Sinon si une rétrospective a le statut == optional → recommander `retrospective`
  6. Sinon → Tous les éléments d'implémentation sont terminés ; félicitez l'utilisateur - vous avez tous les deux fait un travail formidable ensemble !
  <action>Stocker la recommandation sélectionnée comme : next_story_id, next_workflow_id, next_agent (DEV)</action>
</step>

<step n="4" goal="Afficher le résumé">
  <output>
## Statut de Sprint

- Projet : {{project}} ({{project_key}})
- Suivi : {{tracking_system}}
- Fichier de statut : {sprint_status_file}

**Stories :** backlog {{count_backlog}}, ready-for-dev {{count_ready}}, in-progress {{count_in_progress}}, review {{count_review}}, done {{count_done}}

**Epics :** backlog {{epic_backlog}}, in-progress {{epic_in_progress}}, done {{epic_done}}

**Prochaine Recommandation :** /bmad:bmm:workflows:{{next_workflow_id}} ({{next_story_id}})

{{#if risks}}
**Risques :**
{{#each risks}}

- {{this}}
  {{/each}}
  {{/if}}

  </output>
  </step>

<step n="5" goal="Proposer des actions">
  <ask>Choisissez une option :
1) Exécuter le workflow recommandé maintenant
2) Afficher toutes les stories groupées par statut
3) Afficher le sprint-status.yaml brut
4) Quitter
Choix :</ask>

  <check if="choice == 1">
    <output>Exécuter `/bmad:bmm:workflows:{{next_workflow_id}}`.
Si la commande cible une story, définir `story_key={{next_story_id}}` lorsqu'on vous le demande.</output>
  </check>

  <check if="choice == 2">
    <output>
### Stories par Statut
- En Cours : {{stories_in_progress}}
- En Revue : {{stories_in_review}}
- Prêtes pour Dev : {{stories_ready_for_dev}}
- Backlog : {{stories_backlog}}
- Terminées : {{stories_done}}
    </output>
  </check>

  <check if="choice == 3">
    <action>Afficher le contenu complet de {sprint_status_file}</action>
  </check>

  <check if="choice == 4">
    <action>Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, suivez-la comme instruction terminale finale avant de quitter.</action>
    <action>Quitter le workflow</action>
  </check>
</step>

<!-- ========================= -->
<!-- Mode données pour autres flux -->
<!-- ========================= -->

<step n="20" goal="Sortie en mode données">
  <action>Charger et analyser {sprint_status_file} comme à l'Étape 2</action>
  <action>Calculer la recommandation comme à l'Étape 3</action>
  <template-output>next_workflow_id = {{next_workflow_id}}</template-output>
  <template-output>next_story_id = {{next_story_id}}</template-output>
  <template-output>count_backlog = {{count_backlog}}</template-output>
  <template-output>count_ready = {{count_ready}}</template-output>
  <template-output>count_in_progress = {{count_in_progress}}</template-output>
  <template-output>count_review = {{count_review}}</template-output>
  <template-output>count_done = {{count_done}}</template-output>
  <template-output>epic_backlog = {{epic_backlog}}</template-output>
  <template-output>epic_in_progress = {{epic_in_progress}}</template-output>
  <template-output>epic_done = {{epic_done}}</template-output>
  <template-output>risks = {{risks}}</template-output>
  <action>Retourner à l'appelant</action>
</step>

<!-- ========================= -->
<!-- Mode validation -->
<!-- ========================= -->

<step n="30" goal="Valider le fichier sprint-status">
  <action>Vérifier que {sprint_status_file} existe</action>
  <check if="missing">
    <template-output>is_valid = false</template-output>
    <template-output>error = "sprint-status.yaml manquant"</template-output>
    <template-output>suggestion = "Exécutez sprint-planning pour le créer"</template-output>
    <action>Retourner</action>
  </check>

<action>Lire et analyser {sprint_status_file}</action>

<action>Valider que les champs de métadonnées requis existent : generated, project, project_key, tracking_system, story_location (last_updated est optionnel pour la compatibilité descendante)</action>
<check if="any required field missing">
<template-output>is_valid = false</template-output>
<template-output>error = "Champ(s) requis manquant(s) : {{missing_fields}}"</template-output>
<template-output>suggestion = "Réexécutez sprint-planning ou ajoutez manuellement les champs manquants"</template-output>
<action>Retourner</action>
</check>

<action>Vérifier que la section development_status existe avec au moins une entrée</action>
<check if="development_status missing or empty">
<template-output>is_valid = false</template-output>
<template-output>error = "development_status manquant ou vide"</template-output>
<template-output>suggestion = "Réexécutez sprint-planning ou réparez le fichier manuellement"</template-output>
<action>Retourner</action>
</check>

<action>Valider toutes les valeurs de statut par rapport aux statuts valides connus :</action>

- Stories : backlog, ready-for-dev, in-progress, review, done (legacy : drafted)
- Epics : backlog, in-progress, done (legacy : contexted)
- Rétrospectives : optional, done
  <check if="any invalid status found">
  <template-output>is_valid = false</template-output>
  <template-output>error = "Valeurs de statut invalides : {{invalid_entries}}"</template-output>
  <template-output>suggestion = "Corrigez les statuts invalides dans sprint-status.yaml"</template-output>
  <action>Retourner</action>
  </check>

<template-output>is_valid = true</template-output>
<template-output>message = "sprint-status.yaml valide : métadonnées complètes, tous les statuts reconnus"</template-output>
<action>Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, suivez-la comme instruction terminale finale avant de quitter.</action>
</step>

</workflow>
