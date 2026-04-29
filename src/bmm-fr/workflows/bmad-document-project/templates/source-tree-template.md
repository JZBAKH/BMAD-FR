# {{project_name}} - Analyse de l'Arborescence Source

**Date :** {{date}}

## Aperçu

{{source_tree_overview}}

{{#if is_multi_part}}

## Structure Multi-Parties

Ce projet est organisé en {{parts_count}} parties distinctes :

{{#each project_parts}}

- **{{part_name}}** (`{{root_path}}`) : {{purpose}}
  {{/each}}
  {{/if}}

## Structure Complète des Répertoires

```
{{complete_source_tree}}
```

## Répertoires Critiques

{{#each critical_folders}}

### `{{folder_path}}`

{{description}}

**Objectif :** {{purpose}}
**Contenu :** {{contents_summary}}
{{#if entry_points}}**Points d'Entrée :** {{entry_points}}{{/if}}
{{#if integration_note}}**Intégration :** {{integration_note}}{{/if}}

{{/each}}

{{#if is_multi_part}}

## Arborescences Spécifiques aux Parties

{{#each project_parts}}

### Structure de {{part_name}}

```
{{source_tree}}
```

**Répertoires Clés :**
{{#each critical_directories}}

- **`{{path}}`** : {{description}}
  {{/each}}

{{/each}}

## Points d'Intégration

{{#each integration_points}}

### {{from_part}} → {{to_part}}

- **Emplacement :** `{{integration_path}}`
- **Type :** {{integration_type}}
- **Détails :** {{details}}
  {{/each}}

{{/if}}

## Points d'Entrée

{{#if is_single_part}}

- **Entrée Principale :** `{{main_entry_point}}`
  {{#if additional_entry_points}}
- **Entrées Additionnelles :**
  {{#each additional_entry_points}}
  - `{{path}}` : {{description}}
    {{/each}}
    {{/if}}
    {{else}}
    {{#each project_parts}}

### {{part_name}}

- **Point d'Entrée :** `{{entry_point}}`
- **Bootstrap :** {{bootstrap_description}}
  {{/each}}
  {{/if}}

## Patterns d'Organisation des Fichiers

{{file_organization_patterns}}

## Types de Fichiers Clés

{{#each file_type_patterns}}

### {{file_type}}

- **Pattern :** `{{pattern}}`
- **Objectif :** {{purpose}}
- **Exemples :** {{examples}}
  {{/each}}

## Emplacement des Assets

{{#if has_assets}}
{{#each asset_locations}}

- **{{asset_type}}** : `{{location}}` ({{file_count}} fichiers, {{total_size}})
  {{/each}}
  {{else}}
  Aucun asset significatif détecté.
  {{/if}}

## Fichiers de Configuration

{{#each config_files}}

- **`{{path}}`** : {{description}}
  {{/each}}

## Notes pour le Développement

{{development_notes}}

---

_Généré avec le workflow `document-project` de la Méthode BMAD_
