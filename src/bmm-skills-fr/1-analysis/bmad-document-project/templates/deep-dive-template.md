# {{target_name}} - Documentation Approfondie (Deep Dive)

**Généré le :** {{date}}
**Périmètre :** {{target_path}}
**Fichiers Analysés :** {{file_count}}
**Lignes de Code :** {{total_loc}}
**Mode du Workflow :** Plongée Approfondie Exhaustive

## Présentation

{{target_description}}

**Objectif :** {{target_purpose}}
**Responsabilités Clés :** {{responsibilities}}
**Points d'Intégration :** {{integration_summary}}

## Inventaire Complet des Fichiers

{{#each files_in_inventory}}

### {{file_path}}

**Objectif :** {{purpose}}
**Lignes de Code :** {{loc}}
**Type de Fichier :** {{file_type}}

**Ce que les Futurs Contributeurs Doivent Savoir :** {{contributor_note}}

**Exports :**
{{#each exports}}

- `{{signature}}` - {{description}}
  {{/each}}

**Dépendances :**
{{#each imports}}

- `{{import_path}}` - {{reason}}
  {{/each}}

**Utilisé Par :**
{{#each dependents}}

- `{{dependent_path}}`
  {{/each}}

**Détails d'Implémentation Clés :**

```{{language}}
{{key_code_snippet}}
```

{{implementation_notes}}

**Patterns Utilisés :**
{{#each patterns}}

- {{pattern_name}} : {{pattern_description}}
  {{/each}}

**Gestion de l'État :** {{state_approach}}

**Effets de Bord :**
{{#each side_effects}}

- {{effect_type}} : {{effect_description}}
  {{/each}}

**Gestion des Erreurs :** {{error_handling_approach}}

**Tests :**

- Fichier de Test : {{test_file_path}}
- Couverture : {{coverage_percentage}}%
- Approche de Test : {{test_approach}}

**Commentaires/TODOs :**
{{#each todos}}

- Ligne {{line_number}} : {{todo_text}}
  {{/each}}

---

{{/each}}

## Liste de Contrôle du Contributeur

- **Risques et Pièges :** {{risks_notes}}
- **Étapes de Vérification Pré-changement :** {{verification_steps}}
- **Tests Suggérés Avant PR :** {{suggested_tests}}

## Architecture & Patterns de Conception

### Organisation du Code

{{organization_approach}}

### Patterns de Conception

{{#each design_patterns}}

- **{{pattern_name}}** : {{usage_description}}
  {{/each}}

### Stratégie de Gestion de l'État

{{state_management_details}}

### Philosophie de Gestion des Erreurs

{{error_handling_philosophy}}

### Stratégie de Test

{{testing_strategy}}

## Flux de Données

{{data_flow_diagram}}

### Points d'Entrée des Données

{{#each entry_points}}

- **{{entry_name}}** : {{entry_description}}
  {{/each}}

### Transformations de Données

{{#each transformations}}

- **{{transformation_name}}** : {{transformation_description}}
  {{/each}}

### Points de Sortie des Données

{{#each exit_points}}

- **{{exit_name}}** : {{exit_description}}
  {{/each}}

## Points d'Intégration

### APIs Consommées

{{#each apis_consumed}}

- **{{api_endpoint}}** : {{api_description}}
  - Méthode : {{method}}
  - Authentification : {{auth_requirement}}
  - Réponse : {{response_schema}}
    {{/each}}

### APIs Exposées

{{#each apis_exposed}}

- **{{api_endpoint}}** : {{api_description}}
  - Méthode : {{method}}
  - Requête : {{request_schema}}
  - Réponse : {{response_schema}}
    {{/each}}

### État Partagé

{{#each shared_state}}

- **{{state_name}}** : {{state_description}}
  - Type : {{state_type}}
  - Accédé Par : {{accessors}}
    {{/each}}

### Événements

{{#each events}}

- **{{event_name}}** : {{event_description}}
  - Type : {{publish_or_subscribe}}
  - Charge utile : {{payload_schema}}
    {{/each}}

### Accès à la Base de Données

{{#each database_operations}}

- **{{table_name}}** : {{operation_type}}
  - Requêtes : {{query_patterns}}
  - Index Utilisés : {{indexes}}
    {{/each}}

## Graphe de Dépendances

{{dependency_graph_visualization}}

### Points d'Entrée (Non importés par d'autres dans le périmètre)

{{#each entry_point_files}}

- {{file_path}}
  {{/each}}

### Nœuds Feuilles (N'importent aucun autre fichier dans le périmètre)

{{#each leaf_files}}

- {{file_path}}
  {{/each}}

### Dépendances Circulaires

{{#if has_circular_dependencies}}
⚠️ Dépendances circulaires détectées :
{{#each circular_deps}}

- {{cycle_description}}
  {{/each}}
  {{else}}
  ✓ Aucune dépendance circulaire détectée
  {{/if}}

## Analyse des Tests

### Résumé de la Couverture de Test

- **Statements :** {{statements_coverage}}%
- **Branches :** {{branches_coverage}}%
- **Functions :** {{functions_coverage}}%
- **Lines :** {{lines_coverage}}%

### Fichiers de Test

{{#each test_files}}

- **{{test_file_path}}**
  - Tests : {{test_count}}
  - Approche : {{test_approach}}
  - Stratégie de Mocking : {{mocking_strategy}}
    {{/each}}

### Utilitaires de Test Disponibles

{{#each test_utilities}}

- `{{utility_name}}` : {{utility_description}}
  {{/each}}

### Lacunes de Test

{{#each testing_gaps}}

- {{gap_description}}
  {{/each}}

## Code Connexe & Opportunités de Réutilisation

### Fonctionnalités Similaires Ailleurs

{{#each similar_features}}

- **{{feature_name}}** (`{{feature_path}}`)
  - Similitude : {{similarity_description}}
  - Peut servir de référence pour : {{reference_use_case}}
    {{/each}}

### Utilitaires Réutilisables Disponibles

{{#each reusable_utilities}}

- **{{utility_name}}** (`{{utility_path}}`)
  - Objectif : {{utility_purpose}}
  - Comment l'utiliser : {{usage_example}}
    {{/each}}

### Patterns à Suivre

{{#each patterns_to_follow}}

- **{{pattern_name}}** : Se référer à `{{reference_file}}` pour l'implémentation
  {{/each}}

## Notes d'Implémentation

### Observations sur la Qualité du Code

{{#each quality_observations}}

- {{observation}}
  {{/each}}

### TODOs et Travaux Futurs

{{#each all_todos}}

- **{{file_path}}:{{line_number}}** : {{todo_text}}
  {{/each}}

### Problèmes Connus

{{#each known_issues}}

- {{issue_description}}
  {{/each}}

### Opportunités d'Optimisation

{{#each optimizations}}

- {{optimization_suggestion}}
  {{/each}}

### Dette Technique

{{#each tech_debt_items}}

- {{debt_description}}
  {{/each}}

## Guide de Modification

### Pour Ajouter une Nouvelle Fonctionnalité

{{modification_guidance_add}}

### Pour Modifier une Fonctionnalité Existante

{{modification_guidance_modify}}

### Pour Supprimer ou Rendre Obsolète

{{modification_guidance_remove}}

### Liste de Contrôle des Tests pour les Changements

{{#each testing_checklist_items}}

- [ ] {{checklist_item}}
      {{/each}}

---

_Généré par le workflow `document-project` (mode deep-dive)_
_Documentation de base : docs/index.md_
_Date du Scan : {{date}}_
_Mode d'Analyse : Exhaustif_
