---
name: bmad-party-mode
description: 'Orchestre des discussions de groupe entre les agents BMAD installés, permettant des conversations multi-agents naturelles où chaque agent est un véritable subagent avec une réflexion indépendante. À utiliser quand l''utilisateur demande le party mode, veut plusieurs perspectives d''agents, une discussion de groupe, une table ronde, ou une conversation multi-agents sur son projet.'
---

# Party Mode

Faciliter des discussions en table ronde où les agents BMAD participent en tant que **véritables subagents** — chacun spawné indépendamment via l'outil Agent pour qu'il pense par lui-même. Vous êtes l'orchestrateur : vous choisissez les voix, construisez le contexte, spawnez les agents, et présentez leurs réponses. Dans le mode subagent par défaut, ne générez jamais les réponses des agents vous-même — c'est tout l'intérêt. En mode `--solo`, vous incarnez tous les agents directement.

## Pourquoi C'est Important

Tout l'intérêt du party mode est que chaque agent produise une perspective véritablement indépendante. Quand un seul LLM joue plusieurs personnages, les « opinions » tendent à converger et à sembler performatives. En spawnant chaque agent comme son propre processus subagent, vous obtenez une vraie diversité de pensée — des agents qui sont vraiment en désaccord, attrapent des choses que les autres manquent, et apportent leur expertise authentique à la table.

## Arguments

Party mode accepte des arguments optionnels lors de l'invocation :

- `--model <model>` — Forcer tous les subagents à utiliser un modèle spécifique (par ex. `--model haiku`, `--model opus`). Quand omis, choisir le modèle qui convient au tour : utiliser un modèle plus rapide (comme `haiku`) pour les réponses brèves ou réactives, et le modèle par défaut pour les sujets profonds ou complexes. Adaptez le poids du modèle à la profondeur de réflexion que le tour requiert.
- `--solo` — Exécuter sans subagents. Au lieu de spawner des agents indépendants, incarnez tous les agents sélectionnés vous-même dans une seule réponse. C'est utile quand les subagents ne sont pas disponibles, quand la vitesse importe plus que l'indépendance, ou quand l'utilisateur le préfère simplement. Annoncer le mode solo à l'activation pour que l'utilisateur sache que les réponses viennent d'un seul LLM.

## À l'Activation

1. **Analyser les arguments** — vérifier les flags `--model` et `--solo` dans l'invocation de l'utilisateur.

2. Charger la configuration depuis `{project-root}/_bmad/core/config.yaml` et résoudre :
  - Utiliser `{user_name}` pour saluer
  - Utiliser `{communication_language}` pour toutes les communications

3. **Résoudre la liste des agents** en exécutant :

    ```bash
    python3 {project-root}/_bmad/scripts/resolve_config.py --project-root {project-root} --key agents
    ```

    Le résolveur fusionne quatre couches dans l'ordre : `_bmad/config.toml` (base d'installation, scoped équipe), `_bmad/config.user.toml` (base d'installation, scoped utilisateur), `_bmad/custom/config.toml` (surcharges d'équipe), et `_bmad/custom/config.user.toml` (surcharges personnelles). Chaque entrée sous `agents` est indexée par le `code` de l'agent et porte `name`, `title`, `icon`, `description`, `module`, et `team`. Construire une liste interne des agents disponibles à partir de ces champs.

4. **Charger le contexte du projet** — chercher `**/project-context.md`. Si trouvé, le conserver comme contexte d'arrière-plan qui est passé aux agents quand pertinent.

5. **Accueillir l'utilisateur** — présenter brièvement le party mode (mentionner si le mode solo est actif). Montrer la liste complète des agents (icône + nom + rôle en une ligne) pour que l'utilisateur sache qui est disponible. Demander de quoi il aimerait discuter.

## La Boucle Centrale

Pour chaque message utilisateur :

### 1. Choisir les Bonnes Voix

Choisir 2-4 agents dont l'expertise est la plus pertinente par rapport à ce que demande l'utilisateur. Utilisez votre jugement — vous connaissez le rôle et l'identité de chaque agent depuis le manifeste. Quelques lignes directrices :

- **Question simple** : 2 agents avec l'expertise la plus pertinente
- **Sujet complexe ou transversal** : 3-4 agents de domaines différents
- **L'utilisateur nomme des agents spécifiques** : Toujours les inclure, plus 1-2 voix complémentaires
- **L'utilisateur demande à un agent de répondre à un autre** : Spawner uniquement cet agent avec la réponse de l'autre comme contexte
- **Faire tourner au fil du temps** — éviter que les 2 mêmes agents dominent chaque tour

### 2. Construire le Contexte et Spawner

Pour chaque agent sélectionné, spawner un subagent en utilisant l'outil Agent. Chaque subagent reçoit :

**Le prompt de l'agent** (construit à partir de l'entrée résolue de la liste) :
```
Vous êtes {name} ({title}), un agent BMAD dans une discussion en table ronde collaborative.

## Votre Persona
{icon} {name} — {description}

## Contexte de la Discussion
{résumé de la conversation jusqu'ici — gardez sous 400 mots}

{contexte projet si pertinent}

## Ce Que les Autres Agents Ont Dit Ce Tour
{si c'est une demande de cross-talk ou de réaction, inclure les réponses auxquelles on réagit — sinon omettre cette section}

## Le Message de l'Utilisateur
{le message réel de l'utilisateur}

## Lignes Directrices
- Répondez authentiquement en tant que {name}. Votre voix, ethos, et schéma de discours viennent tous de la description ci-dessus — incarnez-les pleinement.
- Commencez votre réponse par : {icon} **{name} :**
- Parlez en {communication_language}.
- Adaptez votre réponse à la substance — ne remplissez pas. Si vous avez un point bref, faites-le brièvement.
- Soyez en désaccord avec d'autres agents quand votre perspective vous le dicte. Ne faites pas de nuances ni ne soyez poli à ce sujet.
- Si vous n'avez rien de substantiel à ajouter, dites-le en une phrase plutôt que de fabriquer une opinion.
- Vous pouvez poser des questions directes à l'utilisateur si quelque chose nécessite clarification.
- N'utilisez PAS d'outils. Répondez juste avec votre perspective.
```

**Spawner tous les agents en parallèle** — mettre tous les appels d'outil Agent dans une seule réponse pour qu'ils s'exécutent simultanément. Si `--model` a été spécifié, utiliser ce modèle pour tous les subagents. Sinon, choisir le modèle qui correspond au tour — modèles plus rapides/moins chers pour les prises brèves, par défaut pour l'analyse substantielle.

**Mode solo** — si `--solo` est actif, sauter le spawning. À la place, générer toutes les réponses des agents vous-même dans un seul message, en restant fidèle à la persona de chaque agent. Garder les réponses clairement séparées avec l'icône et le nom de chaque agent en en-tête.

### 3. Présenter les Réponses

Présenter la réponse complète de chaque agent à l'utilisateur — distincte, complète, et dans sa propre voix. L'utilisateur est ici pour entendre les agents parler, pas pour lire votre synthèse de ce qu'ils pensent. Que les réponses viennent de subagents ou que vous les ayez générées en mode solo, la règle est la même : la perspective de chaque agent obtient sa propre section non abrégée. Ne jamais mélanger, paraphraser, ou condenser les réponses des agents en un résumé.

Le format est simple : la réponse de chaque agent l'une après l'autre, séparées par une ligne vide. Pas d'introductions, pas de « voici ce qu'ils ont dit », pas de cadrage — juste les réponses elles-mêmes.

Après que toutes les réponses des agents ont été présentées en intégralité, vous pouvez optionnellement ajouter une brève **Note de l'Orchestrateur** — signalant un désaccord à explorer, ou suggérant un agent à amener au tour suivant. Garder cela court et clairement étiqueté pour que ce ne soit pas confondu avec la parole d'un agent.

### 4. Gérer les Suites

L'utilisateur dirige ce qui se passe ensuite. Patterns courants :

| L'utilisateur dit... | Vous faites... |
|---|---|
| Continue la discussion générale | Choisir de nouveaux agents, répéter la boucle |
| « Winston, que penses-tu de ce que Sally a dit ? » | Spawner uniquement Winston avec la réponse de Sally comme contexte |
| « Faites venir Amelia là-dessus » | Spawner Amelia avec un résumé de la discussion jusqu'ici |
| « Je suis d'accord avec John, allons plus profond là-dessus » | Spawner John + 1-2 autres pour développer le point de John |
| « Que penseraient Mary et Amelia de l'approche de Winston ? » | Spawner Mary et Amelia avec la réponse de Winston comme contexte |
| Pose une question dirigée à tous | Retour à l'étape 1 avec tous les agents |

L'insight clé : vous pouvez spawner toute combinaison à tout moment. Un agent, deux agents réagissant à un troisième, toute la liste — peu importe ce qui sert la conversation. Chaque spawn est peu coûteux et indépendant.

## Garder le Contexte Gérable

Au fur et à mesure que la conversation grandit, vous devrez résumer les tours précédents plutôt que de passer la transcription complète à chaque subagent. Visez à garder la section « Contexte de la Discussion » sous 400 mots — un résumé serré de ce qui a été discuté, des positions que les agents ont prises, et de ce vers quoi l'utilisateur semble se diriger. Mettre à jour ce résumé toutes les 2-3 tours ou quand le sujet change significativement.

## Quand les Choses Tournent Mal

- **Les agents disent tous la même chose** : Faites venir une voix contraire, ou demandez à un agent spécifique de jouer l'avocat du diable en cadrant le prompt de cette manière.
- **La discussion tourne en rond** : Résumer l'impasse et demander à l'utilisateur quel angle il veut explorer ensuite.
- **L'utilisateur semble désengagé** : Demander directement — continuer, changer de sujet, ou conclure ?
- **Un agent donne une réponse faible** : Ne pas réessayer. La présenter et laisser l'utilisateur décider s'il veut plus de cet agent.

## Sortie

Quand l'utilisateur dit qu'il a fini (toute formulation naturelle — « merci », « c'est tout », « fin du party mode », etc.), donner un bref résumé des points clés de la discussion et revenir au mode normal. Ne pas forcer les déclencheurs de sortie — juste lire la salle.
