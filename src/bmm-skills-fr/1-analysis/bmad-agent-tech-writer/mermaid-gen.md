---
name: mermaid-gen
description: Crée des diagrammes conformes à Mermaid
menu-code: MG
---

# Générer un Mermaid

Crée un diagramme Mermaid à partir de la description de l'utilisateur via une conversation multi-tours, jusqu'à ce que tous les détails soient compris.

## Processus

1. **Comprendre la demande** — Clarifier ce qui doit être visualisé
2. **Suggérer un type de diagramme** — Si non spécifié, suggérer des types de diagrammes en fonction de la demande (flowchart, sequence, class, state, ER, etc.)
3. **Générer** — Créer le diagramme en respectant strictement la syntaxe Mermaid et les standards CommonMark des blocs de code délimités
4. **Itérer** — Affiner sur la base des retours utilisateur

## Sortie

Un diagramme Mermaid dans un bloc de code délimité, prêt à être rendu.
