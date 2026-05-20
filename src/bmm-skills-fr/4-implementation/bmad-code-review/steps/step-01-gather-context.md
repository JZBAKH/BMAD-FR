---
diff_output: '' # set at runtime
spec_file: '' # set at runtime (path or empty)
review_mode: '' # set at runtime: "full" or "no-spec"
story_key: '' # set at runtime when discovered from sprint status
---

# Étape 1 : Recueillir le contexte

## RÈGLES

- VOUS DEVEZ TOUJOURS RÉPONDRE EN SORTIE dans le style de communication de votre Agent avec la config `{communication_language}`
- Le prompt qui a déclenché ce workflow EST l'intention — pas un indice.
- Ne modifiez aucun fichier. Cette étape est en lecture seule.

## INSTRUCTIONS

1. **Trouvez la cible de la revue.** Le contexte conversationnel d'avant le déclenchement de ce skill EST votre point de départ — pas une page blanche. Vérifiez dans cet ordre — arrêtez-vous dès que la cible de la revue est identifiée :

   **Niveau 1 — Argument explicite.**
   L'utilisateur a-t-il passé une PR, un SHA de commit, une branche, un fichier de spec ou une source de diff dans ce message ?
   - Référence de PR → résoudre vers branche/commit via `gh pr view`. Si la résolution échoue, demandez un SHA ou une branche.
   - Commit ou branche → utiliser directement.
   - Fichier de spec → définir `{spec_file}` au chemin fourni. Vérifiez son frontmatter pour `baseline_commit`. Si trouvé, utilisez-le comme base de diff. S'il n'est pas trouvé, continuez la cascade (une spec seule n'identifie pas une source de diff).
   - Scannez aussi l'argument à la recherche de mots-clés de mode de diff qui restreignent le périmètre :
     - "staged" / "staged changes" → Modifications indexées uniquement
     - "uncommitted" / "working tree" / "all changes" → Modifications non commitées (indexées + non indexées)
     - "branch diff" / "vs main" / "against main" / "compared to <branch>" → Diff de branche (extraire la branche de base si mentionnée)
     - "commit range" / "last N commits" / "<from-sha>..<to-sha>" → Plage de commits spécifique
     - "this diff" / "provided diff" / "paste" → Diff fourni par l'utilisateur (ne pas matcher "diff" seul — il apparaît dans d'autres modes)
   - Lorsque plusieurs mots-clés correspondent, préférez le plus spécifique (par exemple, "branch diff" plutôt que "diff" seul).

   **Niveau 2 — Conversation récente.**
   Les derniers messages révèlent-ils ce que l'utilisateur veut faire revoir ? Cherchez des chemins de spec, des références de commit, des branches, des PR ou des descriptions d'un changement. Appliquez le même scan de mots-clés de mode de diff et le même routage qu'au Niveau 1.

   **Niveau 3 — Suivi de sprint.**
   Cherchez un fichier de statut de sprint (`*sprint-status*`) dans `{implementation_artifacts}` ou `{planning_artifacts}`. Si trouvé, scannez les stories avec le statut `review` :
   - **Exactement une story `review` :** Définissez `{story_key}` à la clé de la story (par exemple, `1-2-user-auth`). Suggérez-la : « J'ai trouvé la story <story-id> au statut `review`. Souhaitez-vous revoir ses changements ? [Y] Oui / [N] Non, je vais choisir ». Si confirmé, utilisez le contexte de la story pour déterminer la source de diff (nom de branche dérivé du slug de la story, ou modifications non commitées). Si refusé, effacez `{story_key}` et continuez.
   - **Plusieurs stories `review` :** Présentez-les comme options numérotées aux côtés d'une option de choix manuel. Attendez la sélection de l'utilisateur. Si une story est sélectionnée, définissez `{story_key}` et utilisez son contexte pour déterminer la source de diff. Si le choix manuel est sélectionné, effacez `{story_key}` et continuez.
   - **Aucune :** Continuez.

   **Niveau 4 — État git actuel.**
   Si le contrôle de version n'est pas disponible, passez au Niveau 5. Sinon, vérifiez la branche actuelle et HEAD. Si la branche n'est pas `main` (ou la branche par défaut), confirmez : « Je vois que HEAD est `<short-sha>` sur `<branch>` — voulez-vous revoir les changements de cette branche ? » Si confirmé, traitez comme un diff de branche contre `main`. Si refusé, continuez.

   **Niveau 5 — Demander.**
   Continuez vers l'instruction 2.

   Ne posez jamais de questions supplémentaires au-delà de ce que la cascade prescrit. Si un niveau ci-dessus a déjà identifié la cible, sautez les niveaux restants et passez à l'instruction 3 (construire le diff).

2. HALT. Demandez à l'utilisateur : **Que voulez-vous faire revoir ?** Présentez ces options :
   - **Modifications non commitées** (indexées + non indexées)
   - **Modifications indexées uniquement**
   - **Diff de branche** vs une branche de base (demander quelle branche de base)
   - **Plage de commits spécifique** (demander la plage)
   - **Diff fourni ou liste de fichiers** (l'utilisateur colle ou fournit un chemin)

3. Construisez `{diff_output}` à partir de la source choisie.
   - Pour **modifications indexées uniquement** : exécutez `git diff --cached`.
   - Pour **modifications non commitées** (indexées + non indexées) : exécutez `git diff HEAD`.
   - Pour **diff de branche** : vérifiez que la branche de base existe avant d'exécuter `git diff`. Si elle n'existe pas, HALT et demandez à l'utilisateur une branche valide.
   - Pour **plage de commits** : vérifiez que la plage se résout. Si non, HALT et demandez à l'utilisateur une plage valide.
   - Pour **diff fourni** : validez que le contenu est non vide et parsable comme diff unifié. S'il n'est pas parsable, HALT et demandez à l'utilisateur de fournir un diff valide.
   - Pour **liste de fichiers** : validez que chaque chemin existe dans l'arbre de travail. Construisez `{diff_output}` en exécutant `git diff HEAD -- <path1> <path2> ...`. Si certains chemins ne sont pas suivis (nouveaux fichiers non encore indexés), utilisez `git diff --no-index /dev/null <path>` pour les inclure. Si le diff est vide (les fichiers n'ont aucune modification non commitée et ne sont pas non suivis), demandez à l'utilisateur s'il faut revoir le contenu complet des fichiers ou spécifier une autre base.
   - Après avoir construit `{diff_output}`, vérifiez qu'il est non vide quel que soit le type de source. S'il est vide, HALT et indiquez à l'utilisateur qu'il n'y a rien à revoir.

4. **Définissez le contexte de la spec.**
   - Si `{spec_file}` est déjà défini (depuis le Niveau 1 ou le Niveau 2) : vérifiez que le fichier existe et est lisible, puis définissez `{review_mode}` = `"full"`.
   - Sinon, demandez à l'utilisateur : **Existe-t-il un fichier de spec ou de story qui fournit le contexte de ces changements ?**
     - Si oui : définissez `{spec_file}` au chemin fourni, vérifiez que le fichier existe et est lisible, puis définissez `{review_mode}` = `"full"`.
     - Si non : définissez `{review_mode}` = `"no-spec"`.

5. Si `{review_mode}` = `"full"` et que le fichier à `{spec_file}` a un champ `context` dans son frontmatter listant des documents additionnels, chargez chaque document référencé. Avertissez l'utilisateur des documents qui ne peuvent pas être trouvés.

6. Vérification de bon sens : si `{diff_output}` dépasse environ 3000 lignes, avertissez l'utilisateur et proposez de découper la revue par groupe de fichiers.
   - Si l'utilisateur opte pour le découpage : convenez du premier groupe, restreignez `{diff_output}` en conséquence et listez les groupes restants pour que l'utilisateur les note pour des passes ultérieures.
   - Si l'utilisateur refuse : poursuivez tel quel avec le diff complet.

### CHECKPOINT

Présentez un résumé avant de poursuivre : statistiques du diff (fichiers changés, lignes ajoutées/supprimées), `{review_mode}`, et documents de spec/contexte chargés (le cas échéant). HALT et attendez la confirmation de l'utilisateur pour poursuivre.

## SUITE

Lisez intégralement et suivez `./step-02-review.md`
