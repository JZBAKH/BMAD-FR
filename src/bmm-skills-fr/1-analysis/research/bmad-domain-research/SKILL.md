---
name: bmad-domain-research
description: "Mène une recherche de domaine et d'industrie. À utiliser lorsque l'utilisateur dit qu'il souhaite faire une recherche de domaine pour un sujet ou une industrie"
---

# Workflow de recherche de domaine

**Objectif :** Mener une recherche complète de domaine/industrie en utilisant des données web actuelles et des sources vérifiées pour produire des documents de recherche complets avec des récits convaincants et des citations appropriées.

**Votre Rôle :** Vous êtes un facilitateur de recherche de domaine travaillant avec un partenaire expert. C'est une collaboration où vous apportez la méthodologie de recherche et les capacités de recherche web, tandis que votre partenaire apporte la connaissance du domaine et l'orientation de la recherche.

## Conventions

- Les chemins simples (par ex. `domain-steps/step-01-init.md`) sont résolus à partir de la racine du skill.
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

"Bienvenue {{user_name}} ! Commençons votre **recherche de domaine/industrie**.

**Quel domaine, industrie ou secteur souhaitez-vous étudier ?**

Par exemple :

- 'L''industrie de la technologie de la santé'
- 'Les réglementations sur les emballages durables en Europe'
- 'Le secteur de la construction et des matériaux de bâtiment'
- 'Ou tout autre domaine que vous avez en tête...'"

### Clarification du sujet

Sur la base du sujet de l'utilisateur, clarifier brièvement :

1. **Domaine principal** : "Quel aspect spécifique de [domaine] vous intéresse le plus ?"
2. **Objectifs de recherche** : "Que souhaitez-vous accomplir avec cette recherche ?"
3. **Périmètre** : "Devons-nous nous concentrer largement ou plonger en profondeur dans des aspects spécifiques ?"

## ROUTAGE VERS LES ÉTAPES DE RECHERCHE DE DOMAINE

Après avoir recueilli le sujet et les objectifs :

1. Définir `research_type = "domain"`
2. Définir `research_topic = [sujet découvert lors de la discussion]`
3. Définir `research_goals = [objectifs découverts lors de la discussion]`
4. Dériver `research_topic_slug` depuis `{{research_topic}}` : minuscules, trim, remplacer les espaces par `-`, supprimer les séparateurs de chemin (`/`, `\`), `..`, et tout caractère qui n'est pas alphanumérique, `-`, ou `_`. Réduire les `-` répétés et supprimer les `-` en début et fin. Si le résultat est vide, utiliser `untitled`.
5. Créer le fichier de sortie de démarrage : `{planning_artifacts}/research/domain-{{research_topic_slug}}-research-{{date}}.md` avec une copie exacte du contenu de `./research.template.md`
6. Charger : `./domain-steps/step-01-init.md` avec le contexte du sujet

**Note :** Le sujet découvert lors de la discussion doit être transmis à l'étape d'initialisation, afin qu'elle n'ait pas à demander à nouveau "Que voulez-vous étudier ?" - elle peut se concentrer sur l'affinement du périmètre pour la recherche de domaine.

**✅ VOUS DEVEZ TOUJOURS PARLER DE SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`**
