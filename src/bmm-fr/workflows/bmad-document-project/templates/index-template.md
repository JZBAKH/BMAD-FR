# Index de la Documentation de {{project_name}}

**Type :** {{repository_type}}{{#if is_multi_part}} avec {{parts_count}} parties{{/if}}
**Langage Principal :** {{primary_language}}
**Architecture :** {{architecture_type}}
**Dernière Mise à Jour :** {{date}}

## Présentation du Projet

{{project_description}}

{{#if is_multi_part}}

## Structure du Projet

Ce projet est composé de {{parts_count}} parties :

{{#each project_parts}}

### {{part_name}} ({{part_id}})

- **Type :** {{project_type}}
- **Emplacement :** `{{root_path}}`
- **Pile Technologique :** {{tech_stack_summary}}
- **Point d'Entrée :** {{entry_point}}
  {{/each}}

## Intégration Entre les Parties

{{integration_summary}}

{{/if}}

## Référence Rapide

{{#if is_single_part}}

- **Pile Technologique :** {{tech_stack_summary}}
- **Point d'Entrée :** {{entry_point}}
- **Pattern d'Architecture :** {{architecture_pattern}}
- **Base de Données :** {{database}}
- **Déploiement :** {{deployment_platform}}
  {{else}}
  {{#each project_parts}}

### {{part_name}} - Réf. Rapide

- **Stack :** {{tech_stack_summary}}
- **Entrée :** {{entry_point}}
- **Pattern :** {{architecture_pattern}}
  {{/each}}
  {{/if}}

## Documentation Générée

### Documentation Cœur

- [Présentation du Projet](./project-overview.md) - Résumé exécutif et architecture de haut niveau
- [Analyse de l'Arborescence Source](./source-tree-analysis.md) - Structure des répertoires annotée

{{#if is_single_part}}

- [Architecture](./architecture.md) - Architecture technique détaillée
- [Inventaire des Composants](./component-inventory.md) - Catalogue des composants majeurs{{#if has_ui_components}} et éléments UI{{/if}}
- [Guide de Développement](./development-guide.md) - Configuration locale et workflow de développement
  {{#if has_api_docs}}- [Contrats d'API](./api-contracts.md) - Points de terminaison et schémas API{{/if}}
  {{#if has_data_models}}- [Modèles de Données](./data-models.md) - Schéma de base de données et modèles{{/if}}
  {{else}}

### Documentation par Partie

{{#each project_parts}}

#### {{part_name}} ({{part_id}})

- [Architecture](./architecture-{{part_id}}.md) - Architecture technique pour {{part_name}}
  {{#if has_components}}- [Composants](./component-inventory-{{part_id}}.md) - Catalogue de composants{{/if}}
- [Guide de Développement](./development-guide-{{part_id}}.md) - Configuration et workflow dev
  {{#if has_api}}- [Contrats d'API](./api-contracts-{{part_id}}.md) - Documentation API{{/if}}
  {{#if has_data}}- [Modèles de Données](./data-models-{{part_id}}.md) - Architecture des données{{/if}}
  {{/each}}

### Intégration

- [Architecture d'Intégration](./integration-architecture.md) - Comment les parties communiquent
- [Métadonnées des Parties du Projet](./project-parts.json) - Structure lisible par machine
  {{/if}}

### Documentation Optionnelle

{{#if has_deployment_guide}}- [Guide de Déploiement](./deployment-guide.md) - Processus de déploiement et infrastructure{{/if}}
{{#if has_contribution_guide}}- [Guide de Contribution](./contribution-guide.md) - Directives et standards de contribution{{/if}}

## Documentation Existante

{{#if has_existing_docs}}
{{#each existing_docs}}

- [{{title}}]({{path}}) - {{description}}
  {{/each}}
  {{else}}
  Aucun fichier de documentation existant n'a été trouvé dans le projet.
  {{/if}}

## Démarrage

{{#if is_single_part}}

### Prérequis

{{prerequisites}}

### Configuration

```bash
{{setup_commands}}
```

### Exécution Locale

```bash
{{run_commands}}
```

### Exécution des Tests

```bash
{{test_commands}}
```

{{else}}
{{#each project_parts}}

### Configuration de {{part_name}}

**Prérequis :** {{prerequisites}}

**Installation & Exécution :**

```bash
cd {{root_path}}
{{setup_command}}
{{run_command}}
```

{{/each}}
{{/if}}

## Pour le Développement Assisté par l'IA

Cette documentation a été générée spécifiquement pour permettre aux agents IA de comprendre et d'étendre cette base de code.

### Lors de la Planification de Nouvelles Fonctionnalités :

**Fonctionnalités UI uniquement :**
{{#if is_multi_part}}→ Référence : `architecture-{{ui_part_id}}.md`, `component-inventory-{{ui_part_id}}.md`{{else}}→ Référence : `architecture.md`, `component-inventory.md`{{/if}}

**Fonctionnalités API/Backend :**
{{#if is_multi_part}}→ Référence : `architecture-{{api_part_id}}.md`, `api-contracts-{{api_part_id}}.md`, `data-models-{{api_part_id}}.md`{{else}}→ Référence : `architecture.md`{{#if has_api_docs}}, `api-contracts.md`{{/if}}{{#if has_data_models}}, `data-models.md`{{/if}}{{/if}}

**Fonctionnalités Full-stack :**
→ Référence : Tous les documents d'architecture{{#if is_multi_part}} + `integration-architecture.md`{{/if}}

**Changements de Déploiement :**
{{#if has_deployment_guide}}→ Référence : `deployment-guide.md`{{else}}→ Examiner les configurations CI/CD dans le projet{{/if}}

---

_Documentation générée par le workflow `document-project` de la Méthode BMAD_
