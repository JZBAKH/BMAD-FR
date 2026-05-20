# Investigation : {title}

## Hand-off Brief

1. **Ce qui s'est passé.** {énoncé de problème en une phrase, gradué par évidence}
2. **Où en est le cas.** {statut, dernière conclusion, ce qui débloquerait la progression}
3. **Ce qui est nécessaire ensuite.** {action recommandée unique avec justification}

## Case Info

| Champ              | Valeur                                                                        |
| ------------------ | ----------------------------------------------------------------------------- |
| Ticket             | {ticket-id ou "N/A"}                                                          |
| Date d'ouverture   | {date}                                                                        |
| Status             | Active                                                                        |
| Système            | {OS, version, détails d'environnement pertinents}                             |
| Sources d'évidence | {archive de diagnostic, logs, dump de crash, code, gestion de versions, etc.} |

## Problem Statement

{Description rapportée par l'utilisateur ; la revendication initiale. Peut être affinée ou contredite par l'évidence.}

## Evidence Inventory

| Source   | Status                          | Notes     |
| -------- | ------------------------------- | --------- |
| {source} | {Available / Partial / Missing} | {details} |

## Investigation Backlog

| #   | Chemin à explorer | Priorité              | Status                                | Notes     |
| --- | ----------------- | --------------------- | ------------------------------------- | --------- |
| 1   | {description}     | {High / Medium / Low} | {Open / In Progress / Done / Blocked} | {context} |

## Timeline of Events

| Heure       | Événement                 | Source                      | Confiance             |
| ----------- | ------------------------- | --------------------------- | --------------------- |
| {timestamp} | {description d'événement} | {fichier de log, commit, …} | {Confirmed / Deduced} |

## Confirmed Findings

### Finding 1 : {title}

**Évidence :** {citation — `path:line`, horodatage de log, ou hash de commit}

**Détail :** {description}

## Deduced Conclusions

### Deduction 1 : {title}

**Basé sur :** {quels Confirmed Findings}

**Raisonnement :** {chaîne logique}

**Conclusion :** {ce qui suit}

## Hypothesized Paths

### Hypothesis 1 : {title}

**Status :** {Open / Confirmed / Refuted}

**Théorie :** {description}

**Indicateurs de support :** {ce qui rend cela plausible}

**Confirmerait :** {évidence spécifique qui prouverait ceci}

**Réfuterait :** {évidence spécifique qui réfuterait ceci}

**Resolution :** {quand Status passe d'Open, quelle évidence l'a tranché}

## Missing Evidence

| Manque          | Impact                                    | Comment l'obtenir   |
| --------------- | ----------------------------------------- | ------------------- |
| {ce qui manque} | {ce que cela confirmerait ou éliminerait} | {comment l'obtenir} |

## Source Code Trace

| Élément          | Détail                                        |
| ---------------- | --------------------------------------------- |
| Origine d'erreur | {file:line, nom de fonction}                  |
| Trigger          | {ce qui cause l'exécution de ce code}         |
| Condition        | {quel état produit le comportement observé}   |
| Fichiers liés    | {autres fichiers dans le même chemin de code} |

## Conclusion

**Confiance :** {High / Medium / Low}

{Résumé énonçant ce qui est Confirmed vs ce qui reste Hypothesized. Si une cause racine est identifiée, l'énoncer ; sinon
nommer les chemins hypothétiques les plus prometteurs et ce qui résoudrait l'incertitude restante.}

## Recommended Next Steps

### Direction de fix

{Ce qui doit changer et pourquoi. Catégoriser par mécanisme quand plusieurs problèmes se combinent.}

### Diagnostic

{Étapes pour confirmer la cause racine : logging supplémentaire, tests ciblés, données à collecter.}

## Reproduction Plan

{Setup, déclencheur, résultats attendus. Échelle depuis preuve isolée jusqu'à reproduction système complète.}

## Side Findings

Observations tangentielles surfacées pendant l'investigation, graduées par évidence, avec citation quand applicable.

- {observation}

## Follow-up : {date}

### New Evidence

### Additional Findings

### Updated Hypotheses

### Backlog Changes

### Updated Conclusion
