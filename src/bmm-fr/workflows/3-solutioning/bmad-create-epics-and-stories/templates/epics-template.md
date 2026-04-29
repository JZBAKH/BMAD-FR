---
stepsCompleted: []
inputDocuments: []
---

# {{project_name}} - Décomposition des Epics

## Vue d'Ensemble

Ce document fournit la décomposition complète en epics et stories pour {{project_name}}, décomposant les exigences du PRD, du Design UX s'il existe, et les exigences d'Architecture en stories implémentables.

## Inventaire des Exigences

### Exigences Fonctionnelles

{{fr_list}}

### Exigences Non Fonctionnelles

{{nfr_list}}

### Exigences Supplémentaires

{{additional_requirements}}

### Exigences de Design UX

{{ux_design_requirements}}

### Carte de Couverture des FR

{{requirements_coverage_map}}

## Liste des Epics

{{epics_list}}

<!-- Répéter pour chaque epic de la liste epics_list (N = 1, 2, 3...) -->

## Epic {{N}} : {{epic_title_N}}

{{epic_goal_N}}

<!-- Répéter pour chaque story (M = 1, 2, 3...) au sein de l'epic N -->

### Story {{N}}.{{M}} : {{story_title_N_M}}

En tant que {{user_type}},
Je veux {{capability}},
Afin de {{valeur_benefice}}.

**Critères d'Acceptation :**

<!-- pour chaque AC de cette story -->

**Étant donné** {{precondition}}
**Quand** {{action}}
**Alors** {{expected_outcome}}
**Et** {{additional_criteria}}

<!-- Fin de la répétition des stories -->
