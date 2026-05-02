# Compiler le contexte du thème (Epic)

**Tâche**
Étant donné un numéro de thème, le fichier des thèmes, le répertoire des artefacts de planification et un chemin de sortie souhaité, compiler un fichier de contexte (`epic-<N>-context.md`) propre, ciblé et prêt pour le développeur.

**Étapes**

1. Lire le fichier des thèmes et extraire le titre, l'objectif et la liste des stories du thème cible.
2. Scanner le répertoire des artefacts de planification à la recherche des fichiers standard (PRD, architecture, UX/design, brief produit).
3. Ne récupérer que les informations pertinentes pour ce thème.
4. Écrire le contexte compilé au chemin de sortie exact en utilisant le format ci-dessous.

## Format de sortie exact

Utiliser ces titres :

```markdown
# Epic {N} Context: {Epic Title}

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

{One clear paragraph: what this epic achieves and why it matters.}

## Stories

- Story X.Y: Brief title only
- ...

## Requirements & Constraints

{Relevant functional/non-functional requirements and success criteria for this epic (describe by purpose, not source).}

## Technical Decisions

{Key architecture decisions, constraints, patterns, data models, and conventions relevant to this epic.}

## UX & Interaction Patterns

{Relevant UX flows, interaction patterns, and design constraints (omit section entirely if nothing relevant).}

## Cross-Story Dependencies

{Dependencies between stories in this epic or with other epics/systems (omit if none).}
```

## Règles

- **Délimiter agressivement le périmètre.** N'inclure que ce dont un développeur travaillant sur n'importe quelle story de ce thème a réellement besoin. En cas de doute, exclure — le développeur peut toujours consulter le document de planification complet.
- **Décrire par finalité, pas par source.** Écrire « Les réponses de l'API doivent inclure les métadonnées de pagination » et non « Selon la section 3.2.1 du PRD, la pagination est requise. » Les détails internes des documents de planification changeront ; la contrainte, non.
- **Pas de copies intégrales.** Ne jamais citer les documents sources, les numéros de section, ni coller de gros blocs textuels. Toujours distiller.
- **Pas de détails au niveau story.** La liste des stories sert uniquement de repère. Les spécifications individuelles de chaque story gèrent les détails.
- **Rien de déductible depuis le code.** Ne pas documenter ce qu'un développeur peut apprendre en lisant le code.
- **Être concis et actionnable.** Cibler 800 à 1500 tokens au total. Ce fichier se charge dans le contexte de quick-dev aux côtés d'autres éléments.
- **Ne jamais halluciner de contenu.** Si la source ne le dit pas, ne pas l'inventer.
- **Omettre entièrement les sections vides**, sauf Goal et Stories, qui sont toujours requises.

## Gestion des erreurs

- **Si le fichier des thèmes est manquant ou si le thème cible est introuvable :** ne rien écrire et signaler le problème à l'agent appelant. Goal et Stories ne peuvent pas être renseignés sans un fichier des thèmes utilisable.
- **Si les artefacts de planification sont manquants ou vides :** produire malgré tout le fichier avec Goal et Stories renseignés depuis le fichier des thèmes, et noter le manque dans la section Goal. Ne jamais halluciner de contenu pour combler les sections manquantes.
