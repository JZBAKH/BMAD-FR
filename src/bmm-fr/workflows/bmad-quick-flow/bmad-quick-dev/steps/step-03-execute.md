---
---

# Étape 3 : Exécuter l'Implémentation

**Objectif :** Implémenter toutes les tâches, écrire les tests, suivre les patterns, gérer les erreurs.

**Critique :** Poursuivez TOUTES les tâches sans vous arrêter pour des jalons intermédiaires.

---

## ÉTAT DISPONIBLE

Depuis les étapes précédentes :

- `{baseline_commit}` - Git HEAD au début du workflow.
- `{execution_mode}` - "tech-spec" ou "direct".
- `{tech_spec_path}` - Fichier tech-spec (si Mode A).
- `{project_context}` - Patterns du projet (si existant).

Depuis le contexte :

- Mode A : Tâches et AC extraits de la tech-spec.
- Mode B : Tâches et AC du plan mental de l'étape 02.

---

## BOUCLE D'EXÉCUTION

Pour chaque tâche :

### 1. Charger le Contexte

- Lisez les fichiers pertinents pour cette tâche.
- Passez en revue les patterns du contexte de projet ou du code observé.
- Comprenez les dépendances.

### 2. Implémenter

- Écrivez le code en suivant les patterns existants.
- Gérez les erreurs de manière appropriée.
- Suivez les conventions observées dans la base de code.
- Ajoutez des commentaires appropriés là où ce n'est pas évident.

### 3. Tester

- Écrivez des tests si cela est approprié pour le changement.
- Lancez les tests existants pour détecter les régressions.
- Vérifiez l'AC spécifique pour cette tâche.

### 4. Marquer comme Terminé

- Cochez la tâche : `- [x] Tâche N`.
- Continuez immédiatement vers la tâche suivante.

---

## CONDITIONS D'ARRÊT (HALT)

**ARRÊTEZ-VOUS (HALT) et demandez des consignes si :**

- 3 échecs consécutifs sur la même tâche.
- Les tests échouent et la correction n'est pas évidente.
- Une dépendance bloquante est découverte.
- Une ambiguïté nécessite une décision de l'utilisateur.

**Ne vous arrêtez PAS pour :**

- Des problèmes mineurs qui peuvent être notés et poursuivis.
- Des avertissements qui ne bloquent pas la fonctionnalité.
- Des préférences de style (suivez les patterns existants).

---

## EXÉCUTION CONTINUE

**Critique :** Ne vous arrêtez pas entre les tâches pour approbation.

- Exécutez toutes les tâches en séquence.
- Arrêtez-vous uniquement pour des problèmes bloquants.
- Les tests échouent = corriger avant de continuer.
- Suivez tout le travail accompli pour l'auto-vérification (self-check).

---

## ÉTAPE SUIVANTE

Lorsque TOUTES les tâches sont terminées (ou arrêtées sur un bloqueur), lisez complètement et suivez : `./step-04-self-check.md`.

---

## MÉTRIQUES DE RÉUSSITE

- Toutes les tâches tentées.
- Le code suit les patterns existants.
- Gestion d'erreurs appropriée.
- Tests écrits là où c'est approprié.
- Tests passent.
- Pas d'arrêts inutiles.

## MODES D'ÉCHEC

- S'arrêter pour approbation entre les tâches.
- Ignorer les patterns existants.
- Ne pas lancer les tests après les changements.
- Abandonner après le premier échec.
- Ne pas suivre les règles du project-context (si existant).
