# Mode Headless

Charger ce fichier lorsque bmad-prd est invoqué en mode headless (sans utilisateur interactif). Le suivre pour toute la durée de l'exécution.

## Détection

Le mode headless est actif lorsque l'une des conditions suivantes est vraie :

- l'appelant définit un drapeau `headless: true` (ou un argument équivalent exposé par le harnais),
- l'invocation provient d'un autre skill ou d'un runner non interactif (pas de TTY, pas de flux de messages utilisateur),
- `{workflow.activation_steps_prepend}` contient une entrée qui déclare explicitement le mode headless,
- le premier message provient d'un contexte d'automatisation qui fournit toutes les entrées en amont et demande en retour un chemin vers un artefact.

En cas d'ambiguïté, utiliser le mode interactif par défaut.

## Entrées que l'appelant doit fournir

L'appelant transmet les entrées dans son premier message (payload structuré en forme libre ; pas de schéma fixe, mais chaque champ ci-dessous doit être présent lorsqu'il est applicable) :

- `intent` — `"create"`, `"update"`, ou `"validate"`. En cas d'absence, l'inférer à partir de l'ensemble d'artefacts.
- Pour **Create** : un brief ou une spécification produit à partir duquel le LLM travaille (texte brut, chemin de fichier ou URL), ainsi que d'éventuelles notes de persona/périmètre ; `doc_workspace` si un dossier d'exécution spécifique est requis (sinon le workflow lie le dossier par défaut).
- Pour **Update** : le chemin du `prd.md` existant (ou un chemin de workspace qui en contient un), et un signal de changement (la demande : quoi modifier et pourquoi).
- Pour **Validate** : le chemin du `prd.md` existant (ou du workspace), et optionnellement un chemin de checklist de remplacement. Le workspace est par défaut le répertoire contenant le PRD.

Tout ce que l'appelant ne fournit pas est soit inféré des entrées/workspace, soit consigné dans `assumptions[]` / `open_questions[]` du statut JSON. Ne pas inventer de détails de persona, de métriques de succès ou de décisions de périmètre pour combler les lacunes — les consigner.

## Général

Ne pas demander. Exécuter l'intent en utilisant ce qui est fourni, ce qui existe dans `{doc_workspace}`, ou ce qui peut être découvert de manière autonome. Si l'intent reste ambigu après inférence, s'arrêter avec `status: "blocked"` et un champ `reason` — ne pas poser de questions. Ne pas saluer.

Remplir `assumptions[]` avec chaque valeur inférée sans confirmation directe de l'appelant ; remplir `open_questions[]` avec chaque lacune nécessitant une décision humaine. Utiliser `status: "partial"` lorsque l'artefact a été produit mais que `open_questions[]` est non vide ou que des entrées critiques ont été inférées (Create sans brief ; Update avec un signal vague traité au mieux ; Validate qui n'a pas pu charger la checklist). `complete` = autonome ; `partial` = l'appelant doit relire avant utilisation en aval ; `blocked` = aucun artefact produit.

Terminer par la réponse JSON (schémas complets avec exemples dans `assets/headless-schemas.md`). Le champ `intent` doit correspondre à l'intent détecté. Omettre les clés pour les artefacts non produits.

## Surcharges spécifiques au mode

**Update.** Appliquer le changement, le consigner dans `.decision-log.md` avec le raisonnement, et faire remonter tout conflit avec une décision antérieure dans `conflicts_with_prior_decisions[]` du statut JSON. S'arrêter avec `blocked` si l'intent est ambigu.

**Validate.** Toujours écrire `validation-report.html` et `validation-report.md` dans `{doc_workspace}` quel que soit le nombre de résultats. Toujours inclure `"offer_to_update": true` dans le statut JSON. Ignorer l'étape d'ouverture dans le navigateur de `references/validate.md` — écrire les artefacts et retourner.
