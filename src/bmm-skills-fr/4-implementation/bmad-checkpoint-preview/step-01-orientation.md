# Étape 1 : Orientation

Affichez : `[Orientation] → Walkthrough → Detail Pass → Testing`

## Suivez les Règles globales d'étape dans SKILL.md

## TROUVER LE CHANGEMENT

Le contexte de la conversation précédant le déclenchement de ce skill EST votre point de départ — pas une page blanche. Vérifiez dans cet ordre — arrêtez-vous dès que le changement est identifié :

1. **Argument explicite**
   L'utilisateur a-t-il passé une PR, un SHA de commit, une branche ou un fichier de spec dans ce message ?
   - Référence de PR → résolvez vers la branche/le commit via `gh pr view`. Si la résolution échoue, demandez un SHA ou une branche.
   - Fichier de spec, commit ou branche → utilisez directement.

2. **Conversation récente**
   Les derniers messages révèlent-ils quel changement l'utilisateur veut faire revoir ? Cherchez des chemins de spec, des références de commit, des branches, des PR, ou des descriptions d'un changement. Utilisez le même routage que ci-dessus.

3. **Suivi de sprint**
   Vérifiez la présence d'un fichier de statut de sprint (`*sprint-status*`) dans `{implementation_artifacts}` ou `{planning_artifacts}`. Si trouvé, scannez les stories au statut `review` :
   - Exactement une → suggérez-la et confirmez avec l'utilisateur.
   - Plusieurs → présentez-les sous forme d'options numérotées.
   - Aucune → passez à la suite.

4. **État git courant**
   Vérifiez la branche courante et HEAD. Confirmez : "I see HEAD is `<short-sha>` on `<branch>` — is this the change you want to review?"

5. **Demander**
   Si aucune des étapes ci-dessus n'a identifié un changement, demandez :
   - Qu'est-ce qui a changé et pourquoi ?
   - Quel commit, branche ou PR dois-je examiner ?
   - Avez-vous une spec, un rapport de bug, ou autre chose qui explique ce que ce changement est censé faire ?

   Si après 3 échanges vous ne pouvez toujours pas identifier un changement, ARRÊTEZ.

Ne posez jamais de questions supplémentaires au-delà de ce que la cascade prescrit. Si une étape ci-dessus a déjà identifié le changement, sautez les étapes restantes.

## ENRICHIR

Une fois qu'un changement est identifié depuis n'importe quelle source ci-dessus, complétez l'artefact complémentaire :

- Si vous avez une spec, recherchez `baseline_commit` dans son frontmatter pour déterminer la baseline du diff.
- Si vous avez un commit ou une branche, vérifiez `{implementation_artifacts}` pour une spec dont le `baseline_commit` est un ancêtre de ce commit/cette branche (c'est-à-dire que la spec décrit un travail réalisé par-dessus cette baseline).
- Si vous avez trouvé à la fois une spec et un commit/une branche, utilisez les deux.

## DÉTERMINER CE QUE VOUS AVEZ

Définissez `change_type` pour correspondre à la façon dont l'utilisateur a fait référence au changement — `PR`, `commit`, `branch`, ou ses propres mots (par exemple `auth refactor`). Par défaut `change` si ambigu.

Définissez `review_mode` — choisissez la première correspondance :

1. **`full-trail`** — ENRICHIR a trouvé une spec avec une section `## Suggested Review Order`. Source d'intent : section Intent de la spec.
2. **`spec-only`** — ENRICHIR a trouvé une spec mais elle n'a pas de Suggested Review Order. Source d'intent : section Intent de la spec.
3. **`bare-commit`** — aucune spec trouvée. Source d'intent : message de commit. Si le message de commit est laconique (moins de 10 mots), scannez le diff pour le motif principal du changement et rédigez une intent d'une phrase. Marquez-la `[inferred]` dans la sortie pour que l'utilisateur puisse corriger.

## PRODUIRE L'ORIENTATION

### Résumé d'Intent

- Si l'intent provient de la section Intent d'une spec, affichez-la verbatim quelle que soit sa longueur — elle est déjà rédigée pour être concise.
- Pour les autres sources (messages de commit, rapports de bugs, description utilisateur) : si ≤200 tokens, affichez verbatim. Si plus long, condensez à ≤200 tokens. Liez à la source complète quand elle existe (par exemple un chemin de fichier ou une URL).
- Format : `> **Intent:** {summary}`

### Statistiques de Surface

Statistiques au mieux dérivées du diff. Essayez ces baselines dans l'ordre :

1. `baseline_commit` du frontmatter de la spec.
2. Merge-base de la branche par rapport à `main` (ou la branche par défaut).
3. `HEAD~1..HEAD` (dernier commit uniquement — informez l'utilisateur).
4. Si git est indisponible ou que tout ce qui précède échoue, sautez les statistiques et notez : "Could not compute stats."

Utilisez `git diff --stat` et `git diff --numstat` pour les comptages au niveau fichier, et scannez le contenu complet du diff pour les métriques plus riches.

Affichez sous forme :

```
N files changed · M modules touched · ~L lines of logic · B boundary crossings · P new public interfaces
```

- **Files changed** : comptage depuis `git diff --stat`.
- **Modules touched** : répertoires de premier niveau distincts avec des changements (depuis les chemins de fichiers `--stat`).
- **Lines of logic** : lignes ajoutées/modifiées hors lignes vides, imports, formatage. Scannez le contenu du diff ; `~` car approximatif.
- **Boundary crossings** : changements s'étendant sur plus d'un module de premier niveau. `0` si module unique.
- **New public interfaces** : nouveaux exports, endpoints, méthodes publiques trouvés dans le diff. `0` si aucun.

Omettez toute métrique que vous ne pouvez pas calculer plutôt que de la deviner.

### Présenter

```
[Orientation] → Walkthrough → Detail Pass → Testing

> **Intent:** {intent_summary}

{stats line}
```

## GÉNÉRATION DE PISTE DE REPLI

Si le mode de revue n'est pas `full-trail`, lisez intégralement et suivez `./generate-trail.md` pour en construire une à partir du diff. Puis revenez ici et continuez vers SUITE. Si la génération de piste échoue (par exemple, git indisponible), le mode de revue d'origine est préservé — step-02 gère cela avec son chemin sans piste.

## SUITE

Lisez intégralement et suivez `./step-02-walkthrough.md`
