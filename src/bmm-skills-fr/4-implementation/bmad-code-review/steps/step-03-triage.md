---
---

# Étape 3 : Triage

## RÈGLES

- VOUS DEVEZ TOUJOURS RÉPONDRE EN SORTIE dans le style de communication de votre Agent avec la config `{communication_language}`
- Soyez précis. En cas d'incertitude entre catégories, préférez la classification la plus conservatrice.

## INSTRUCTIONS

1. **Normalisez** les constats dans un format commun. Formats d'entrée attendus :
   - Adversarial (Blind Hunter) : liste Markdown de descriptions
   - Edge Case Hunter : tableau JSON avec champs `location`, `trigger_condition`, `guard_snippet`, `potential_consequence`
   - Acceptance Auditor : liste Markdown avec titre, référence CA/contrainte et preuve

   Si la sortie d'une couche ne correspond pas à son format attendu, tentez un parsing au mieux. Notez tout problème de parsing pour l'utilisateur.

   Convertissez tout en une liste unifiée où chaque constat possède :
   - `id` -- entier séquentiel
   - `source` -- `blind`, `edge`, `auditor`, ou sources fusionnées (par exemple, `blind+edge`)
   - `title` -- résumé d'une ligne
   - `detail` -- description complète
   - `location` -- référence fichier et ligne (si disponible)

2. **Dédupliquez.** Si deux constats ou plus décrivent le même problème, fusionnez-les en un seul :
   - Utilisez le constat le plus spécifique comme base (préférez le JSON edge-case avec localisation à la prose adversarial).
   - Ajoutez tout détail, raisonnement ou référence de localisation unique du ou des autres constats dans le champ `detail` survivant.
   - Définissez `source` aux sources fusionnées (par exemple, `blind+edge`).

3. **Classifiez** chaque constat dans exactement un seau :
   - **decision_needed** -- Il existe un choix ambigu nécessitant une intervention humaine. Le code ne peut pas être correctement patché sans connaître l'intention de l'utilisateur. Possible uniquement si `{review_mode}` = `"full"`.
   - **patch** -- Problème de code corrigible sans intervention humaine. La correction correcte est sans ambiguïté.
   - **defer** -- Problème préexistant non causé par le changement courant. Réel mais non actionnable maintenant.
   - **dismiss** -- Bruit, faux positif ou traité ailleurs.

   Si `{review_mode}` = `"no-spec"` et qu'un constat serait sinon `decision_needed`, reclassifiez-le en `patch` (si la correction est sans ambiguïté) ou `defer` (sinon).

4. **Éliminez** tous les constats `dismiss`. Enregistrez le compte des dismiss pour le résumé.

5. Si `{failed_layers}` est non vide, signalez quelles couches ont échoué avant d'annoncer les résultats. S'il ne reste zéro constat après élimination des dismiss ET que `{failed_layers}` est non vide, avertissez l'utilisateur que la revue peut être incomplète plutôt que d'annoncer une revue propre.

6. S'il ne reste zéro constat après triage (tous rejetés ou aucun soulevé) : énoncez « ✅ Revue propre — toutes les couches ont passé. » (L'étape 3 a déjà averti si des couches de revue ont échoué via `{failed_layers}`.)

## SUITE

Lisez intégralement et suivez `./step-04-present.md`
