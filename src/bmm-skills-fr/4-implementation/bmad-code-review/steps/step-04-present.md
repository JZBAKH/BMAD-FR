---
deferred_work_file: '{implementation_artifacts}/deferred-work.md'
---

# Étape 4 : Présenter et agir

## RÈGLES

- VOUS DEVEZ TOUJOURS RÉPONDRE EN SORTIE dans le style de communication de votre Agent avec la config `{communication_language}`
- Lorsque `{spec_file}` est défini, écrivez toujours les constats dans le fichier de story avant d'offrir des choix d'action.
- Les constats `decision-needed` doivent être résolus avant de traiter les constats `patch`.

## INSTRUCTIONS

### 1. Raccourci revue propre

S'il ne reste zéro constat après triage (tous écartés ou aucun soulevé) : énoncez-le et passez à la section 6 (Mise à jour du statut de sprint).

### 2. Écrire les constats dans le fichier de story

Si `{spec_file}` existe et contient une section Tasks/Subtasks, ajoutez une sous-section `### Review Findings`. Écrivez tous les constats dans cet ordre :

1. Constats **`decision-needed`** (non cochés) :
   `- [ ] [Review][Decision] <Title> — <Detail>`

2. Constats **`patch`** (non cochés) :
   `- [ ] [Review][Patch] <Title> [<file>:<line>]`

3. Constats **`defer`** (cochés, marqués comme reportés) :
   `- [x] [Review][Defer] <Title> [<file>:<line>] — deferred, pre-existing`

Ajoutez aussi chaque constat `defer` à `{deferred_work_file}` sous un titre `## Deferred from: code review ({date})`. Si `{spec_file}` est défini, incluez son basename dans le titre (par exemple, `code review of story-3.3 (2026-03-18)`). Une puce par constat avec description.

### 3. Présenter le résumé

Annoncez ce qui a été écrit :

> **Revue de code terminée.** <D> `decision-needed`, <P> `patch`, <W> `defer`, <R> écartés comme bruit.

Si `{spec_file}` est défini, ajoutez : `Constats écrits dans la section review findings de {spec_file}.`
Sinon, ajoutez : `Les constats sont listés ci-dessus. Aucun fichier de story n'a été fourni, donc rien n'a été persisté.`

### 4. Résoudre les constats decision-needed

Si des constats `decision_needed` existent, présentez chacun avec son détail et les options disponibles. L'utilisateur doit décider — la correction correcte est ambiguë sans son intervention. Parcourez chaque constat (ou groupez les constats apparentés) et obtenez la décision de l'utilisateur. Une fois résolu, chacun devient un `patch`, un `defer`, ou est écarté.

Si l'utilisateur choisit de reporter, demandez : Raison rapide d'une ligne pour reporter cet item ? (aide les revues futures) : — puis ajoutez cette raison à la fois à la puce du fichier de story et à l'entrée `{deferred_work_file}`.

**HALT** — J'attends votre choix numéroté. Répondez uniquement avec le numéro. Ne poursuivez pas tant que vous n'avez pas sélectionné une option.

### 5. Traiter les constats `patch`

Si des constats `patch` existent (y compris ceux résolus depuis l'étape 4), HALT. Demandez à l'utilisateur :

Si `{spec_file}` est défini, présentez les trois options :

> **Comment voulez-vous traiter les `<P>` constats `patch` ?**
> 1. **Appliquer chaque patch** — corrigez-les tous maintenant, sans confirmation par constat. Les items defer et decision-needed ne sont pas touchés.
> 2. **Laisser comme action items** — ils sont déjà dans le fichier de story
> 3. **Parcourir chaque patch** — afficher les détails de chacun avant de décider

Si `{spec_file}` n'est **pas** défini, présentez uniquement les options 1 et 2 (omettez « Laisser comme action items » — les constats n'ont pas été écrits dans un fichier) :

> **Comment voulez-vous traiter les `<P>` constats `patch` ?**
> 1. **Appliquer chaque patch** — corrigez-les tous maintenant, sans confirmation par constat. Les items defer et decision-needed ne sont pas touchés.
> 2. **Parcourir chaque patch** — afficher les détails de chacun avant de décider

**HALT** — J'attends votre choix numéroté. Répondez uniquement avec le numéro. Ne poursuivez pas tant que vous n'avez pas sélectionné une option.

- **Appliquer chaque patch** : Appliquez chaque constat patch sans confirmation par constat. Ne modifiez pas les items defer ou decision-needed. Une fois tous les patchs appliqués, présentez un résumé des changements effectués. Si `{spec_file}` est défini, cochez les items patch dans le fichier de story (laissez les items defer tels quels).
- **Laisser comme action items** (uniquement si `{spec_file}` est défini) : Fait — les constats sont déjà écrits dans la story.
- **Parcourir chaque patch** : Présentez chaque constat avec le détail complet, le contexte du diff et la correction suggérée. Après le parcours, ré-offrez les options applicables ci-dessus.

  **HALT** — J'attends votre choix numéroté. Ne poursuivez pas tant que vous n'avez pas sélectionné une option.

**✅ Actions de revue de code terminées**

- Decision-needed résolus : <D>
- Patchs traités : <P>
- Reportés : <W>
- Écartés : <R>

### 6. Mettre à jour le statut de la story et synchroniser le suivi de sprint

Sautez cette section si `{spec_file}` n'est pas défini.

#### Déterminer le nouveau statut selon le résultat de la revue

- Si tous les constats `decision-needed` et `patch` ont été résolus (corrigés ou écartés) ET qu'il ne reste aucun problème HIGH/MEDIUM non résolu : définissez `{new_status}` = `done`. Mettez à jour la section Status du fichier de story à `done`.
- Si des constats `patch` ont été laissés comme action items, ou s'il reste des problèmes non résolus : définissez `{new_status}` = `in-progress`. Mettez à jour la section Status du fichier de story à `in-progress`.

Sauvegardez le fichier de story.

#### Synchroniser sprint-status.yaml

Si `{story_key}` n'est pas défini, sautez cette sous-section et notez que le statut de sprint n'a pas été synchronisé car aucune clé de story n'était disponible.

Si le fichier `{sprint_status}` existe :

1. Chargez le fichier `{sprint_status}` COMPLET.
2. Trouvez l'entrée `development_status` correspondant à `{story_key}`.
3. Si trouvée : mettez à jour `development_status[{story_key}]` à `{new_status}`. Mettez à jour `last_updated` à la date courante. Sauvegardez le fichier en préservant TOUS les commentaires et la structure y compris STATUS DEFINITIONS.
4. Si `{story_key}` n'est pas trouvé dans le statut de sprint : avertissez l'utilisateur que le fichier de story a été mis à jour mais que la synchro sprint-status a échoué.

Si le fichier `{sprint_status}` n'existe pas, notez que le statut de la story a été mis à jour uniquement dans le fichier de story.

#### Résumé de complétion

> **Revue terminée !**
>
> **Statut de la story :** `{new_status}`
> **Problèmes corrigés :** <fixed_count>
> **Action items créés :** <action_count>
> **Reportés :** <W>
> **Écartés :** <R>

### 7. Étapes suivantes

Présentez à l'utilisateur les options de suite :

> **Que voulez-vous faire ensuite ?**
> 1. **Démarrer la story suivante** — exécuter `dev-story` pour prendre en charge la prochaine story `ready-for-dev`
> 2. **Relancer la revue de code** — traiter les constats et revoir à nouveau
> 3. **Terminé** — terminer le workflow

**HALT** — J'attends votre choix. Ne poursuivez pas tant que l'utilisateur n'a pas sélectionné une option.

## On Complete

Run: `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu est non vide, suivez-le comme instruction terminale finale avant la sortie.
