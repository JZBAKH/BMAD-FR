---
title: '{title}'
type: 'feature' # feature | bugfix | refactor | chore
created: '{date}'
status: 'draft' # draft | ready-for-dev | in-progress | in-review | done
context: [] # optional: `{project-root}/`-prefixed paths to project-wide standards/docs the implementation agent should load. Keep short — only what isn't already distilled into the spec body.
---

<!-- Cible : 900–1300 tokens. Au-delà de 1600 = risque élevé de pourriture du contexte.
     Ne sur-spécifiez jamais le « comment » — utilisez plutôt limites + exemples.
     Les stories cohésives multi-couches (DB+BE+UI) restent dans UN SEUL fichier.
     IMPORTANT : Supprimez tous les commentaires HTML lors du remplissage de ce gabarit. -->

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

<!-- Ce qui est cassé ou manquant, et pourquoi cela importe. Puis l'approche de haut niveau — le « quoi », pas le « comment ». -->

**Problem:** ONE_TO_TWO_SENTENCES

**Approach:** ONE_TO_TWO_SENTENCES

## Boundaries & Constraints

<!-- Trois niveaux : Always = règles invariantes. Ask First = décisions soumises à l'humain. Never = hors périmètre + approches interdites. -->

**Always:** INVARIANT_RULES

**Ask First:** DECISIONS_REQUIRING_HUMAN_APPROVAL
<!-- Agent : si l'un de ces points se déclenche pendant l'exécution, HALT et demandez à l'utilisateur avant de poursuivre. -->

**Never:** NON_GOALS_AND_FORBIDDEN_APPROACHES

## I/O & Edge-Case Matrix

<!-- S'il n'existe aucun scénario d'E/S significatif, SUPPRIMEZ TOUTE CETTE SECTION. N'écrivez pas « N/A » ni « None ». -->

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| HAPPY_PATH | INPUT | OUTCOME | N/A |
| ERROR_CASE | INPUT | OUTCOME | ERROR_HANDLING |

</frozen-after-approval>

## Code Map

<!-- Rempli par l'agent pendant la planification. Les chemins annotés évitent les recherches aveugles dans le codebase. -->

- `FILE` -- ROLE_OR_RELEVANCE
- `FILE` -- ROLE_OR_RELEVANCE

## Tasks & Acceptance

<!-- Tâches : chemin de fichier entre backticks -- action -- justification. Préférez une tâche par fichier ; regroupez les changements fortement couplés lorsque les séparer serait artificiel. -->
<!-- Si une matrice d'E/S est présente, incluez une tâche pour tester unitairement ses cas limites. -->
<!-- Les CA couvrent les comportements de niveau système non capturés par la matrice d'E/S. Ne dupliquez pas les scénarios d'E/S ici. -->

**Execution:**
- [ ] `FILE` -- ACTION -- RATIONALE

**Acceptance Criteria:**
- Given PRECONDITION, when ACTION, then EXPECTED_RESULT

## Spec Change Log

<!-- En ajout uniquement. Rempli par step-04 pendant les boucles de revue. Ne modifiez ni ne supprimez les entrées existantes.
     Chaque entrée enregistre : quel constat a déclenché le changement, ce qui a été amendé, quel état connu-mauvais
     l'amendement évite, et toutes les instructions KEEP (ce qui a bien fonctionné et doit survivre à une re-dérivation).
     Vide jusqu'au premier loopback bad_spec. -->

## Design Notes

<!-- Si l'approche est simple, SUPPRIMEZ TOUTE CETTE SECTION. N'écrivez pas « N/A » ni « None ». -->
<!-- Justification du design et exemples canoniques uniquement lorsque non évident. Limitez les exemples à 5–10 lignes. -->

DESIGN_RATIONALE_AND_EXAMPLES

## Verification

<!-- Si aucune commande de build, test ou lint ne s'applique, SUPPRIMEZ TOUTE CETTE SECTION. N'écrivez pas « N/A » ni « None ». -->
<!-- Comment l'agent confirme son propre travail. Préférez les commandes CLI. Lorsqu'aucune vérification CLI ne s'applique, indiquez ce qu'il faut inspecter manuellement. -->

**Commands:**
- `COMMAND` -- expected: SUCCESS_CRITERIA

**Manual checks (if no CLI):**
- WHAT_TO_INSPECT_AND_EXPECTED_STATE
