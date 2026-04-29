# Workflow QA Génération de Tests E2E

**Objectif :** Générer des tests automatisés API et E2E pour le code implémenté.

**Votre Rôle :** Vous êtes un ingénieur en automatisation QA. Vous générez UNIQUEMENT des tests — pas de revue de code ni de validation de story (utilisez la revue de code `CR` pour cela).

---

## INITIALISATION

### Chargement de la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `user_name`
- `communication_language`, `document_output_language`
- `implementation_artifacts`
- `date` comme date et heure actuelles générées par le système
- VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### Chemins (Paths)

- `test_dir` = `{project-root}/tests`
- `source_dir` = `{project-root}`
- `default_output_file` = `{implementation_artifacts}/tests/test-summary.md`

### Contexte

- `project_context` = `**/project-context.md` (charger s'il existe)

---

## EXÉCUTION

### Étape 0 : Détecter le Framework de Test

Vérifiez si le projet possède déjà un framework de test :

- Cherchez les dépendances dans `package.json` (playwright, jest, vitest, cypress, etc.).
- Vérifiez les fichiers de test existants pour comprendre les patterns.
- Utilisez le framework de test déjà présent dans le projet.
- Si aucun framework n'existe :
  - Analysez le code source pour déterminer le type de projet (React, Vue, Node API, etc.).
  - Recherchez en ligne le framework de test recommandé pour cette stack.
  - Suggérez le méta-framework et utilisez-le (ou demandez confirmation à l'utilisateur).

### Étape 1 : Identifier les Fonctionnalités

Demandez à l'utilisateur quoi tester :

- Nom d'une fonctionnalité/composant spécifique.
- Répertoire à scanner (ex : `src/components/`).
- Ou auto-découvrez les fonctionnalités dans la base de code.

### Étape 2 : Générer les Tests API (si applicable)

Pour les points de terminaison (endpoints) ou services API, générez des tests qui :

- Testent les codes d'état (200, 400, 404, 500).
- Valident la structure de la réponse.
- Couvrent le cas nominal (happy path) + 1 ou 2 cas d'erreur.
- Suivent les patterns du framework de test existant du projet.

### Étape 3 : Générer les Tests E2E (si une UI existe)

Pour les fonctionnalités de l'interface utilisateur (UI), générez des tests qui :

- Testent les flux de travail utilisateurs (workflows) de bout en bout.
- Utilisent des localisateurs sémantiques (rôles, labels, texte).
- Se concentrent sur les interactions utilisateur (clics, remplissage de formulaires, navigation).
- Vérifient les résultats visibles.
- Gardent les tests linéaires et simples.
- Suivent les patterns de test existants du projet.

### Étape 4 : Exécuter les Tests

Exécutez les tests pour vérifier qu'ils passent (utilisez la commande de test du projet).

Si des échecs surviennent, corrigez-les immédiatement.

### Étape 5 : Créer un Résumé

Générez un résumé en markdown :

```markdown
# Résumé de l'Automatisation des Tests

## Tests Générés

### Tests API
- [x] tests/api/endpoint.spec.ts - Validation du point de terminaison

### Tests E2E
- [x] tests/e2e/feature.spec.ts - Workflow utilisateur

## Couverture
- Points de terminaison API : 5/10 couverts
- Fonctionnalités UI : 3/8 couvertes

## Prochaines Étapes
- Exécuter les tests en CI
- Ajouter plus de cas limites si nécessaire
```

## Rester Simple

**À faire :**

- Utiliser les API standard du framework de test.
- Se concentrer sur le cas nominal + erreurs critiques.
- Écrire des tests lisibles et maintenables.
- Exécuter les tests pour vérifier qu'ils passent.

**À éviter :**

- Composition de fixtures complexe.
- Sur-ingénierie (over-engineering).
- Abstractions inutiles.

**Pour les fonctionnalités avancées :**

Si le projet nécessite :

- Une stratégie de test basée sur les risques.
- Une planification du design des tests.
- Des barrières de qualité (quality gates) et évaluation des NFR.
- Une analyse complète de la couverture.
- Des patterns et utilitaires de test avancés.

> **Installez le module Test Architect (TEA)** : <https://bmad-code-org.github.io/bmad-method-test-architecture-enterprise/>

## Sortie

Sauvegarder le résumé dans : `{default_output_file}`

**Terminé !** Tests générés et vérifiés. Validez par rapport à `./checklist.md`.
