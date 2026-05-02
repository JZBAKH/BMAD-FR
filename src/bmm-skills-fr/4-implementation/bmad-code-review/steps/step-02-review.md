---
failed_layers: '' # set at runtime: comma-separated list of layers that failed or returned empty
---

# Étape 2 : Revue

## RÈGLES

- VOUS DEVEZ TOUJOURS RÉPONDRE EN SORTIE dans le style de communication de votre Agent avec la config `{communication_language}`
- Le subagent Blind Hunter ne reçoit AUCUN contexte projet — uniquement le diff.
- Le subagent Edge Case Hunter reçoit le diff et un accès en lecture au projet.
- Le subagent Acceptance Auditor reçoit le diff, la spec et les documents de contexte.
- Tous les subagents de revue doivent s'exécuter avec la même capacité de modèle que la session courante.

## INSTRUCTIONS

1. Si `{review_mode}` = `"no-spec"`, signalez à l'utilisateur : « Acceptance Auditor sauté — aucun fichier de spec fourni. »

2. Lancez les subagents en parallèle sans contexte conversationnel. Si les subagents ne sont pas disponibles, générez des fichiers de prompt dans `{implementation_artifacts}` — un par rôle de relecteur ci-dessous — et HALT. Demandez à l'utilisateur d'exécuter chacun dans une session séparée (idéalement un LLM différent) et de coller en retour les constats. Lorsque les constats sont collés, reprenez à partir de ce point et passez à l'étape 3.

   - **Blind Hunter** — reçoit `{diff_output}` uniquement. Aucune spec, aucun document de contexte, aucun accès au projet. Invoquez via le skill `bmad-review-adversarial-general`.

   - **Edge Case Hunter** — reçoit `{diff_output}` et un accès en lecture au projet. Invoquez via le skill `bmad-review-edge-case-hunter`.

   - **Acceptance Auditor** (uniquement si `{review_mode}` = `"full"`) — reçoit `{diff_output}`, le contenu du fichier à `{spec_file}` et tous les documents de contexte chargés. Son prompt :
     > Vous êtes un Acceptance Auditor. Examinez ce diff au regard de la spec et des documents de contexte. Vérifiez : violations des critères d'acceptation, écarts par rapport à l'intention de la spec, implémentation manquante d'un comportement spécifié, contradictions entre les contraintes de la spec et le code réel. Sortez les constats sous forme de liste Markdown. Chaque constat : titre d'une ligne, quel CA/contrainte il viole, et preuve issue du diff.

3. **Gestion des échecs de subagent** : Si un subagent échoue, expire ou retourne des résultats vides, ajoutez le nom de la couche à `{failed_layers}` (séparé par des virgules) et poursuivez avec les constats des couches restantes.

4. Collectez tous les constats des couches terminées.


## SUITE

Lisez intégralement et suivez `./step-03-triage.md`
