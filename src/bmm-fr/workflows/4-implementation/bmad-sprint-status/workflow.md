# Workflow d'État du Sprint

**Objectif :** Résumer l'état du sprint, identifier les risques et recommander la prochaine action du workflow.

**Votre rôle :** Vous êtes un Scrum Master fournissant une visibilité claire et exploitable sur le sprint. Pas d'estimations de temps — concentrez-vous sur le statut, les risques et les prochaines étapes.

---

## INITIALISATION

### Chargement de la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `user_name`
- `{communication_language}`, `document_output_language`
- `implementation_artifacts`
- `date` comme date/heure actuelle générée par le système
- VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

### Chemins

- `sprint_status_file` = `{implementation_artifacts}/sprint-status.yaml`

### Fichiers d'Entrée

| Entrée         | Chemin                 | Stratégie de Chargement |
| -------------- | ---------------------- | ----------------------- |
| État du sprint | `{sprint_status_file}` | FULL_LOAD               |

### Contexte

- `project_context` = `**/project-context.md` (charger s'il existe)

---

## EXÉCUTION

### <workflow>

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

<step n="1" goal="Localiser le fichier de statut du sprint">
  <action>Charger {project_context} pour les modèles et conventions à l'échelle du projet (si existe)</action>
  <action>Essayer {sprint_status_file}</action>
  <check if="fichier non trouvé">
    <output>❌ sprint-status.yaml non trouvé.
Lancez `/bmad:bmm:workflows:sprint-planning` pour le générer, puis relancez sprint-status.</output>
    <action>Quitter le workflow</action>
  </check>
  <action>Continuer à l'Étape 2</action>
</step>

<step n="2" goal="Lire et analyser sprint-status.yaml">
  <action>Lire l'intégralité du fichier : {sprint_status_file}</action>
  <action>Analyser les champs : generated, last_updated, project, project_key, tracking_system, story_location</action>
  <action>Analyser la carte development_status. Classer les clés :</action>
  - Epics : clés commençant par "epic-" (et ne se terminant pas par "-retrospective")
  - Rétrospectives : clés se terminant par "-retrospective"
  - Stories : tout le reste (ex: 1-2-formulaire-de-connexion)
  <action>Mapper le statut de story obsolète "drafted" → "ready-for-dev"</action>
  <action>Compter les statuts des stories : backlog, ready-for-dev, in-progress, review, done</action>
  <action>Mapper le statut d'epic obsolète "contexted" → "in-progress"</action>
  <action>Compter les statuts des epics : backlog, in-progress, done</action>
  <action>Compter les statuts des rétrospectives : optional, done</action>

<action>Valider tous les statuts par rapport aux valeurs connues :</action>

- Statuts de story valides : backlog, ready-for-dev, in-progress, review, done, drafted (obsolète)
- Statuts d'epic valides : backlog, in-progress, done, contexted (obsolète)
- Statuts de rétrospective valides : optional, done

  <check if="un statut inconnu est détecté">
    <output>
⚠️ **Statut inconnu détecté :**
{{#each invalid_entries}}

- `{{key}}` : "{{status}}" (non reconnu)
  {{/each}}

**Statuts valides :**

- Stories : backlog, ready-for-dev, in-progress, review, done
- Epics : backlog, in-progress, done
- Rétrospectives : optional, done
  </output>
  <ask>Comment ces statuts doivent-ils être corrigés ?
  {{#each invalid_entries}}
  {{@index}}. {{key}} : "{{status}}" → [sélectionner un statut valide]
  {{/each}}

Entrez les corrections (ex: "1=in-progress, 2=backlog") ou "skip" pour continuer sans corriger :</ask>
<check if="l'utilisateur a fourni des corrections">
<action>Mettre à jour sprint-status.yaml avec les valeurs corrigées</action>
<action>Analyser à nouveau le fichier avec les statuts corrigés</action>
</check>
</check>

<action>Détecter les risques :</action>

- SI une story a le statut "review" : suggérer `/bmad:bmm:workflows:code-review`
- SI une story a le statut "in-progress" ET qu'aucune story n'a le statut "ready-for-dev" : recommander de rester concentré sur la story active
- SI toutes les epics ont le statut "backlog" ET qu'aucune story n'a le statut "ready-for-dev" : inviter à `/bmad:bmm:workflows:create-story`
- SI l'horodatage `last_updated` a plus de 7 jours (ou si `last_updated` est manquant, se rabattre sur `generated`) : avertir que "sprint-status.yaml est peut-être périmé"
- SI une clé de story ne correspond à aucun modèle d'epic (ex: story "5-1-..." mais pas d'"epic-5") : avertir qu'une "story orpheline a été détectée"
- SI une epic a le statut "in-progress" mais n'a pas de stories associées : avertir qu'une "epic en cours n'a pas de stories"
  </step>

<step n="3" goal="Sélectionner la recommandation de prochaine action">
  <action>Choisir le prochain workflow recommandé par priorité :</action>
  <note>Lors du choix de la "première" story : trier par numéro d'epic, puis numéro de story (ex: 1-1 avant 1-2 avant 2-1)</note>
  1. Si un statut de story == in-progress → recommander `dev-story` pour la première story en cours
  2. Sinon si un statut de story == review → recommander `code-review` pour la première story en revue
  3. Sinon si un statut de story == ready-for-dev → recommander `dev-story`
  4. Sinon si un statut de story == backlog → recommander `create-story`
  5. Sinon si un statut de rétrospective == optional → recommander `retrospective`
  6. Sinon → Toutes les tâches d'implémentation sont terminées ; félicitez l'utilisateur - vous avez tous deux fait un travail incroyable ensemble !
  <action>Stocker la recommandation sélectionnée sous : next_story_id, next_workflow_id, next_agent (SM/DEV selon le cas)</action>
</step>

<step n="4" goal="Afficher le résumé">
  <output>
## 📊 État du Sprint

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
1) Lancer le workflow recommandé maintenant
2) Afficher toutes les stories groupées par statut
3) Afficher le contenu brut de sprint-status.yaml
4) Quitter
Choix :</ask>

  <check if="choix == 1">
    <output>Lancez `/bmad:bmm:workflows:{{next_workflow_id}}`.
Si la commande cible une story, définissez `story_key={{next_story_id}}` lorsque demandé.</output>
  </check>

  <check if="choix == 2">
    <output>
### Stories par Statut
- En Cours : {{stories_in_progress}}
- En Revue : {{stories_in_review}}
- Prêt pour Dev : {{stories_ready_for_dev}}
- Backlog : {{stories_backlog}}
- Terminé : {{stories_done}}
    </output>
  </check>

  <check if="choix == 3">
    <action>Afficher l'intégralité du contenu de {sprint_status_file}</action>
  </check>

  <check if="choix == 4">
    <action>Quitter le workflow</action>
  </check>
</step>

<!-- ========================= -->
<!-- Mode Data pour les autres flux -->
<!-- ========================= -->

<step n="20" goal="Sortie en mode Data">
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
<!-- Mode Validate -->
<!-- ========================= -->

<step n="30" goal="Valider le fichier sprint-status">
  <action>Vérifier que {sprint_status_file} existe</action>
  <check if="manquant">
    <template-output>is_valid = false</template-output>
    <template-output>error = "sprint-status.yaml manquant"</template-output>
    <template-output>suggestion = "Lancez sprint-planning pour le créer"</template-output>
    <action>Retourner</action>
  </check>

<action>Lire et analyser {sprint_status_file}</action>

<action>Valider l'existence des champs de métadonnées requis : generated, project, project_key, tracking_system, story_location (last_updated est optionnel pour la compatibilité ascendante)</action>
<check if="un champ requis est manquant">
<template-output>is_valid = false</template-output>
<template-output>error = "Champ(s) requis manquant(s) : {{missing_fields}}"</template-output>
<template-output>suggestion = "Relancez sprint-planning ou ajoutez les champs manquants manuellement"</template-output>
<action>Retourner</action>
</check>

<action>Vérifier que la section development_status existe avec au moins une entrée</action>
<check if="development_status manquant ou vide">
<template-output>is_valid = false</template-output>
<template-output>error = "development_status manquant ou vide"</template-output>
<template-output>suggestion = "Relancez sprint-planning ou réparez le fichier manuellement"</template-output>
<action>Retourner</action>
</check>

<action>Valider toutes les valeurs de statut par rapport aux statuts valides connus :</action>

- Stories : backlog, ready-for-dev, in-progress, review, done (obsolète : drafted)
- Epics : backlog, in-progress, done (obsolète : contexted)
- Rétrospectives : optional, done
  <check if="un statut invalide est trouvé">
  <template-output>is_valid = false</template-output>
  <template-output>error = "Valeurs de statut invalides : {{invalid_entries}}"</template-output>
  <template-output>suggestion = "Corrigez les statuts invalides dans sprint-status.yaml"</template-output>
  <action>Retourner</action>
  </check>

<template-output>is_valid = true</template-output>
<template-output>message = "sprint-status.yaml valide : métadonnées complètes, tous les statuts reconnus"</template-output>
</step>

</workflow>
