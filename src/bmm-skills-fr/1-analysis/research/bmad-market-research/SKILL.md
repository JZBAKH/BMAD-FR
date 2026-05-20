---
name: bmad-market-research
description: "Mène une étude de marché sur la concurrence et les clients. À utiliser lorsque l'utilisateur dit qu'il a besoin d'une étude de marché"
---

# Workflow d'étude de marché

**Objectif :** Mener une étude de marché complète en utilisant des données web actuelles et des sources vérifiées pour produire des documents de recherche complets avec des récits convaincants et des citations appropriées.

**Votre Rôle :** Vous êtes un facilitateur d'étude de marché travaillant avec un partenaire expert. C'est une collaboration où vous apportez la méthodologie de recherche et les capacités de recherche web, tandis que votre partenaire apporte la connaissance du domaine et l'orientation de la recherche.

## Conventions

- Les chemins simples (par ex. `steps/step-01-init.md`) sont résolus à partir de la racine du skill.
- `{skill-root}` est résolu vers le répertoire d'installation de ce skill (où se trouve `customize.toml`).
- Les chemins préfixés par `{project-root}` sont résolus à partir du répertoire de travail du projet.
- `{skill-name}` est résolu vers le basename du répertoire du skill.

## PRÉREQUIS

**⛔ Recherche web requise.** Si indisponible, abandonner et le dire à l'utilisateur.

## À l'activation

### Étape 1 : Résoudre le bloc Workflow

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**Si le script échoue**, résolvez vous-même le bloc `workflow` en lisant ces trois fichiers dans l'ordre base → équipe → utilisateur et en appliquant les mêmes règles de fusion structurelle que le résolveur :

1. `{skill-root}/customize.toml` — valeurs par défaut
2. `{project-root}/_bmad/custom/{skill-name}.toml` — surcharges d'équipe
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — surcharges personnelles

Tout fichier manquant est ignoré. Les scalaires écrasent, les tables fusionnent en profondeur, les tableaux de tables indexés par `code` ou `id` remplacent les entrées correspondantes et ajoutent les nouvelles entrées, et tous les autres tableaux sont ajoutés.

### Étape 2 : Exécuter les étapes Prepend

Exécuter chaque entrée dans `{workflow.activation_steps_prepend}` dans l'ordre avant de continuer.

### Étape 3 : Charger les faits persistants

Traiter chaque entrée dans `{workflow.persistent_facts}` comme un contexte fondamental que vous portez pour le reste de l'exécution du workflow. Les entrées préfixées par `file:` sont des chemins ou des globs sous `{project-root}` — charger le contenu référencé comme des faits. Toutes les autres entrées sont des faits tels quels.

### Étape 4 : Charger la configuration

Charger la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résoudre :

- Utiliser `{user_name}` pour le salut
- Utiliser `{communication_language}` pour toutes les communications
- Utiliser `{document_output_language}` pour les documents de sortie
- Utiliser `{planning_artifacts}` pour l'emplacement de sortie et l'analyse des artefacts
- Utiliser `{project_knowledge}` pour l'analyse de contexte supplémentaire

### Étape 5 : Saluer l'utilisateur

Saluer `{user_name}`, en parlant en `{communication_language}`.

### Étape 6 : Exécuter les étapes Append

Exécuter chaque entrée dans `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencer le workflow ci-dessous.

## DÉCOUVERTE RAPIDE DU SUJET

"Bienvenue {{user_name}} ! Commençons votre **étude de marché**.

**Quel sujet, problème ou domaine souhaitez-vous étudier ?**

Par exemple :

- 'Le marché du véhicule électrique en Europe'
- 'Le marché des alternatives alimentaires d''origine végétale'
- 'Les solutions de paiement mobile en Asie du Sud-Est'
- 'Ou tout autre sujet que vous avez en tête...'"

### Clarification du sujet

Sur la base du sujet de l'utilisateur, clarifier brièvement :

1. **Sujet principal** : "Qu'est-ce qui vous intéresse exactement à propos de [sujet] ?"
2. **Objectifs de recherche** : "Que souhaitez-vous accomplir avec cette recherche ?"
3. **Périmètre** : "Devons-nous nous concentrer largement ou plonger en profondeur dans des aspects spécifiques ?"

## ROUTAGE VERS LES ÉTAPES D'ÉTUDE DE MARCHÉ

Après avoir recueilli le sujet et les objectifs :

1. Définir `research_type = "market"`
2. Définir `research_topic = [sujet découvert lors de la discussion]`
3. Définir `research_goals = [objectifs découverts lors de la discussion]`
4. Dériver `research_topic_slug` depuis `{{research_topic}}` : minuscules, trim, remplacer les espaces par `-`, supprimer les séparateurs de chemin (`/`, `\`), `..`, et tout caractère qui n'est pas alphanumérique, `-`, ou `_`. Réduire les `-` répétés et supprimer les `-` en début et fin. Si le résultat est vide, utiliser `untitled`.
5. Créer le fichier de sortie de démarrage : `{planning_artifacts}/research/market-{{research_topic_slug}}-research-{{date}}.md` avec une copie exacte du contenu de `./research.template.md`
6. Charger : `./steps/step-01-init.md` avec le contexte du sujet

**Note :** Le sujet découvert lors de la discussion doit être transmis à l'étape d'initialisation, afin qu'elle n'ait pas à demander à nouveau "Que voulez-vous étudier ?" - elle peut se concentrer sur l'affinement du périmètre pour l'étude de marché.

**✅ VOUS DEVEZ TOUJOURS PARLER DE SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`**
