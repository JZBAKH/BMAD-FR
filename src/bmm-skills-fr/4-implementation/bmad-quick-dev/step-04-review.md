---
deferred_work_file: '{implementation_artifacts}/deferred-work.md'
specLoopIteration: 1
---

# Étape 4 : Revue

## RÈGLES

- VOUS DEVEZ TOUJOURS PARLER EN SORTIE selon le style de communication de votre Agent avec la config `{communication_language}`
- Les subagents de revue ne reçoivent AUCUN contexte de conversation.
- Tous les subagents de revue doivent s'exécuter avec la même capacité de modèle que la session courante.

## INSTRUCTIONS

Changez le statut de `{spec_file}` à `in-review` dans le frontmatter avant de continuer.

### Construire le diff

Lisez `{baseline_commit}` depuis le frontmatter de `{spec_file}`. Si `{baseline_commit}` est manquant ou `NO_VCS`, faites de votre mieux pour déterminer ce qui a changé. Sinon, construisez `{diff_output}` couvrant tous les changements — suivis et non suivis — depuis `{baseline_commit}`.

NE faites PAS `git add` quoi que ce soit — il s'agit d'une inspection en lecture seule.

### Revue

Lancez trois subagents sans contexte de conversation. Si aucun sub-agent n'est disponible, générez trois fichiers de prompt de revue dans `{implementation_artifacts}` — un par rôle de relecteur ci-dessous — et HALT. Demandez à l'humain d'exécuter chacun dans une session séparée (idéalement un LLM différent) et de coller les résultats.

- **Blind hunter** — reçoit `{diff_output}` uniquement. Pas de spec, pas de docs de contexte, pas d'accès au projet. Invoquez via le skill `bmad-review-adversarial-general`.
- **Edge case hunter** — reçoit `{diff_output}` et un accès en lecture au projet. Invoquez via le skill `bmad-review-edge-case-hunter`.
- **Acceptance auditor** — reçoit `{diff_output}`, `{spec_file}` et un accès en lecture au projet. Doit aussi lire les docs listés dans le frontmatter `context` de `{spec_file}`. Vérifie les violations des critères d'acceptation, des règles et des principes de la spec et des docs de contexte.

### Classer

1. Dédupliquez tous les résultats de revue.
2. Classez chaque résultat. Les trois premières catégories sont **le problème de cette story** — causé ou exposé par le changement actuel. Les deux dernières ne sont **pas le problème de cette story**.
   - **intent_gap** — causé par le changement ; ne peut être résolu depuis la spec parce que l'intention capturée est incomplète. N'inférez pas l'intention sauf s'il y a exactement une lecture possible.
   - **bad_spec** — causé par le changement, y compris les déviations directes par rapport à la spec. La spec aurait dû être suffisamment claire pour empêcher cela. Dans le doute entre bad_spec et patch, préférez bad_spec — un correctif au niveau de la spec a plus de chances de produire du code cohérent.
   - **patch** — causé par le changement ; trivialement réparable sans intervention humaine. Fait simplement partie du diff.
   - **defer** — problème préexistant non causé par cette story, fait surface incidemment par la revue. À collecter pour une attention focalisée ultérieure.
   - **reject** — bruit. Rejetez silencieusement. En cas d'incertitude entre defer et reject, préférez reject — ne reportez que les résultats dont vous êtes sûr qu'ils sont réels.
3. Traitez les résultats dans l'ordre en cascade. Si des résultats intent_gap ou bad_spec existent, ils déclenchent un loopback — les résultats inférieurs deviennent caducs puisque le code sera re-dérivé. Si aucun n'existe, traitez patch et defer normalement. Incrémentez `{specLoopIteration}` à chaque loopback. S'il dépasse 5, HALT et escaladez à l'humain.
   - **intent_gap** — La cause racine est à l'intérieur de `<frozen-after-approval>`. Annulez les changements de code. Bouclez de retour vers l'humain pour résoudre. Une fois résolu, lisez intégralement et suivez `./step-02-plan.md` pour ré-exécuter les étapes 2 à 4.
   - **bad_spec** — La cause racine est en dehors de `<frozen-after-approval>`. Avant d'annuler le code : extrayez les instructions KEEP pour la préservation positive (ce qui a bien fonctionné et doit survivre à la re-dérivation). Annulez les changements de code. Lisez le `## Spec Change Log` dans `{spec_file}` et respectez strictement toutes les contraintes journalisées lors de la modification des sections non gelées qui contiennent la cause racine. Ajoutez une nouvelle entrée de change-log enregistrant : le résultat déclencheur, ce qui a été modifié, l'état mauvais connu évité et les instructions KEEP. Lisez intégralement et suivez `./step-03-implement.md` pour re-dériver le code, puis cette étape s'exécutera à nouveau.
   - **patch** — Auto-correction. Ce sont les seuls résultats qui survivent aux loopbacks.
   - **defer** — Ajoutez à `{deferred_work_file}`.
   - **reject** — Rejetez silencieusement.

## SUIVANT

Lisez intégralement et suivez `./step-05-present.md`
