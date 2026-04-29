# {{project_name}} - Présentation du Projet

**Date :** {{date}}
**Type :** {{project_type}}
**Architecture :** {{architecture_type}}

## Résumé Exécutif

{{executive_summary}}

## Classification du Projet

- **Type de Dépôt :** {{repository_type}}
- **Type(s) de Projet :** {{project_types_list}}
- **Langage(s) Principal(aux) :** {{primary_languages}}
- **Pattern d'Architecture :** {{architecture_pattern}}

{{#if is_multi_part}}

## Structure Multi-Parties

Ce projet est composé de {{parts_count}} parties distinctes :

{{#each project_parts}}

### {{part_name}}

- **Type :** {{project_type}}
- **Emplacement :** `{{root_path}}`
- **Objectif :** {{purpose}}
- **Pile Technologique :** {{tech_stack}}
  {{/each}}

### Intégration des Parties

{{integration_description}}
{{/if}}

## Résumé de la Pile Technologique (Tech Stack)

{{#if is_single_part}}
{{technology_table}}
{{else}}
{{#each project_parts}}

### Pile Technologique de {{part_name}}

{{technology_table}}
{{/each}}
{{/if}}

## Fonctionnalités Clés

{{key_features}}

## Points Saillants de l'Architecture

{{architecture_highlights}}

## Aperçu du Développement

### Prérequis

{{prerequisites}}

### Démarrage

{{getting_started_summary}}

### Commandes Clés

{{#if is_single_part}}

- **Installation :** `{{install_command}}`
- **Dev :** `{{dev_command}}`
- **Build :** `{{build_command}}`
- **Tests :** `{{test_command}}`
  {{else}}
  {{#each project_parts}}

#### {{part_name}}

- **Installation :** `{{install_command}}`
- **Dev :** `{{dev_command}}`
  {{/each}}
  {{/if}}

## Structure du Dépôt

{{repository_structure_summary}}

## Carte de la Documentation

Pour des informations détaillées, voir :

- [index.md](./index.md) - Index principal de la documentation
- [architecture.md](./architecture{{#if is_multi_part}}-{part_id}{{/if}}.md) - Architecture détaillée
- [source-tree-analysis.md](./source-tree-analysis.md) - Structure des répertoires
- [development-guide.md](./development-guide{{#if is_multi_part}}-{part_id}{{/if}}.md) - Workflow de développement

---

_Généré avec le workflow `document-project` de la Méthode BMAD_
