---
deferred_work_file: '{implementation_artifacts}/deferred-work.md'
specLoopIteration: 1
---

# Étape 4 : Revue

## RÈGLES

- VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- Les sous-agents de revue ne reçoivent AUCUN contexte de conversation.

## INSTRUCTIONS

Changez le statut de `{spec_file}` en `in-review` dans le frontmatter avant de continuer.

### Construire un Diff (plan-code-review uniquement)

Lisez le `{baseline_commit}` depuis le frontmatter de `{spec_file}`. Si le `{baseline_commit}` est manquant ou est `NO_VCS`, faites au mieux pour déterminer ce qui a changé. Sinon, construisez `{diff_output}` couvrant tous les changements — suivis et non suivis — depuis le `{baseline_commit}`.

NE PAS faire de `git add` — il s'agit d'une inspection en lecture seule.

### Revue

**One-shot :** Sautez la construction du diff. Invoquez tout de même la compétence `bmad-review-adversarial-general` dans un sous-agent avec les fichiers modifiés — une revue en ligne (inline) favorise le biais d'ancrage.

**Plan-code-review :** Lancez trois sous-agents sans contexte de conversation. Si aucun sous-agent n'est disponible, générez trois fichiers de prompt de revue dans `{implementation_artifacts}` — un par rôle de réviseur ci-dessous — et ARRÊTEZ-VOUS. Demandez à l'humain de lancer chacun dans une session séparée (idéalement avec un LLM différent) et de recoller les conclusions ici.

- **Chasseur aveugle (Blind hunter)** — reçoit uniquement `{diff_output}`. Pas de spécification, pas de documents de contexte, pas d'accès au projet. Invoqué via la compétence `bmad-review-adversarial-general`.
- **Chasseur de cas limites (Edge case hunter)** — reçoit `{diff_output}` et un accès en lecture au projet. Invoqué via la compétence `bmad-review-edge-case-hunter`.
- **Auditeur d'acceptation (Acceptance auditor)** — reçoit `{diff_output}`, `{spec_file}` et un accès en lecture au projet. Doit également lire les documents listés dans le `context` du frontmatter de `{spec_file}`. Vérifie les violations des critères d'acceptation, des règles et des principes issus de la spécification et des documents de contexte.

### Classifier

1. Dédupliquez toutes les conclusions de revue.
2. Classifiez chaque conclusion. Les trois premières catégories concernent **le problème de cette story** — causé ou exposé par le changement actuel. Les deux dernières ne sont **pas le problème de cette story**.
   - **intent_gap** (lacune d'intention) — causé par le changement ; ne peut pas être résolu à partir de la spécification car l'intention capturée est incomplète. Ne déduisez pas l'intention à moins qu'il n'y ait exactement qu'une seule lecture possible.
   - **bad_spec** (mauvaise spécification) — causé par le changement, incluant les déviations directes par rapport à la spécification. La spécification aurait dû être assez claire pour l'empêcher. En cas de doute entre bad_spec et patch, préférez bad_spec — une correction au niveau de la spécification est plus susceptible de produire un code cohérent.
   - **patch** (correction mineure) — causé par le changement ; corrigeable trivialement sans intervention humaine. Fait simplement partie du diff.
   - **defer** (à différer) — problème préexistant non causé par cette story, apparu incidemment lors de la revue. À collecter pour une attention ultérieure ciblée.
   - **reject** (rejeter) — bruit. À ignorer silencieusement. En cas d'incertitude entre defer et reject, préférez reject — ne différez que les conclusions dont vous êtes certain qu'elles sont réelles.
3. Traitez les conclusions par ordre de cascade. Si des conclusions de type intent_gap ou bad_spec existent, elles déclenchent un retour en boucle (loopback) — les conclusions inférieures sont sans objet puisque le code sera dérivé à nouveau. Si aucune n'existe, traitez patch et defer normalement. Incrémentez `{specLoopIteration}` à chaque boucle de retour. Si elle dépasse 5, ARRÊTEZ-VOUS et escaladez vers l'humain. Lors de tout retour en boucle, réévaluez le routage — si le périmètre s'est élargi au-delà du one-shot, passez l'`execution_mode` à plan-code-review.
   - **intent_gap** — La cause racine est à l'intérieur de `<frozen-after-approval>`. Annulez les changements de code. Revenez vers l'humain pour résoudre. Une fois résolu, lisez complètement et suivez `./step-02-plan.md` pour relancer les étapes 2 à 4.
   - **bad_spec** — La cause racine est à l'extérieur de `<frozen-after-approval>`. Avant d'annuler le code : extrayez les instructions KEEP pour une préservation positive (ce qui a bien fonctionné et doit survivre à une nouvelle dérivation). Annulez les changements de code. Lisez le `## Journal des Changements de Spécification` dans `{spec_file}` et respectez strictement toutes les contraintes consignées lors de la modification des sections non verrouillées contenant la cause racine. Ajoutez une nouvelle entrée au journal enregistrant : la conclusion déclenchante, ce qui a été modifié, l'état connu comme mauvais évité, et les instructions KEEP. Lisez complètement et suivez `./step-03-implement.md` pour dériver à nouveau le code, puis cette étape s'exécutera à nouveau.
   - **patch** — Correction automatique. Ce sont les seules conclusions qui survivent aux boucles de retour.
   - **defer** — Ajoutez à `{deferred_work_file}`.
   - **reject** — Ignorez silencieusement.

## SUIVANT

Lire complètement et suivre `./step-05-present.md`.
