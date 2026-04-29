---
title: '{title}'
type: 'feature' # feature | bugfix | refactor | chore
created: '{date}'
status: 'draft' # draft | ready-for-dev | in-progress | in-review | done
context: [] # optionnel : max 3 standards/docs au niveau du projet. PAS de fichiers de code source.
---

# {title}

<frozen-after-approval reason="intention appartenant à l'humain — ne pas modifier à moins que l'humain ne renégocie">

## Intention

<!-- Ce qui est cassé ou manquant, et pourquoi c'est important. Puis l'approche de haut niveau — le "quoi", pas le "comment". -->

**Problème :** UNE_OU_DEUX_PHRASES

**Approche :** UNE_OU_DEUX_PHRASES

## Limites & Contraintes

<!-- Trois niveaux : Toujours = règles invariantes. Demander d'abord = décisions validées par l'humain. Jamais = hors périmètre + approches interdites. -->

**Toujours :** RÈGLES_INVARIANTES

**Demander d'abord :** DÉCISIONS_NÉCESSITANT_UNE_APPROBATION_HUMAINE
<!-- Agent : si l'un de ces éléments se déclenche pendant l'exécution, ARRÊTEZ-VOUS et demandez à l'utilisateur avant de continuer. -->

**Jamais :** NON_OBJECTIFS_ET_APPROCHES_INTERDITES

## Matrice I/O & Cas Limites

<!-- Si aucun scénario d'I/O significatif n'existe, SUPPRIMER TOUTE CETTE SECTION. Ne pas écrire "N/A" ou "Aucun". -->

| Scénario | Entrée / État | Sortie Attendue / Comportement | Gestion d'Erreur |
|----------|---------------|-------------------------------|------------------|
| HAPPY_PATH | ENTRÉE | RÉSULTAT | N/A |
| CAS_D_ERREUR | ENTRÉE | RÉSULTAT | GESTION_ERREUR |

</frozen-after-approval>

## Carte du Code (Code Map)

<!-- Rempli par l'agent pendant la planification. Les chemins annotés évitent la recherche aveugle dans la base de code. -->

- `FICHIER` -- RÔLE_OU_PERTINENCE
- `FICHIER` -- RÔLE_OU_PERTINENCE

## Tâches & Acceptation

<!-- Tâches : chemin de fichier entre backticks -- action -- raison. Préférer une tâche par fichier ; regrouper les changements étroitement couplés quand les séparer serait artificiel. -->
<!-- Si une matrice I/O est présente, inclure une tâche pour tester unitairement ses cas limites. -->
<!-- Les AC couvrent les comportements au niveau système non capturés par la matrice I/O. Ne pas dupliquer les scénarios I/O ici. -->

**Exécution :**
- [ ] `FICHIER` -- ACTION -- RAISON

**Critères d'Acceptation (AC) :**
- Étant donné PRÉCONDITION, quand ACTION, alors RÉSULTAT_ATTENDU

## Journal des Changements de Spécification (Spec Change Log)

<!-- Ajout uniquement (append-only). Rempli par l'étape-04 lors des boucles de revue. Ne pas modifier ou supprimer les entrées existantes.
     Chaque entrée enregistre : quelle conclusion a déclenché le changement, ce qui a été modifié, quel état connu comme mauvais
     la modification évite, et toute instruction KEEP (ce qui a bien fonctionné et doit survivre à une nouvelle dérivation).
     Vide jusqu'à la première boucle bad_spec. -->

## Notes de Design

<!-- Si l'approche est simple, SUPPRIMER TOUTE CETTE SECTION. Ne pas écrire "N/A" ou "Aucun". -->
<!-- Raisons de design et exemples de référence uniquement quand ce n'est pas évident. Garder les exemples entre 5 et 10 lignes. -->

RAISONNEMENT_DESIGN_ET_EXEMPLES

## Vérification

<!-- Si aucune commande de build, de test ou de lint ne s'applique, SUPPRIMER TOUTE CETTE SECTION. Ne pas écrire "N/A" ou "Aucun". -->
<!-- Comment l'agent confirme son propre travail. Préférer les commandes CLI. Quand aucun contrôle CLI ne s'applique, indiquer ce qu'il faut inspecter manuellement. -->

**Commandes :**
- `COMMANDE` -- attendu : CRITÈRES_DE_RÉUSSITE

**Contrôles manuels (si pas de CLI) :**
- QUOI_INSPECTER_ET_ÉTAT_ATTENDU
