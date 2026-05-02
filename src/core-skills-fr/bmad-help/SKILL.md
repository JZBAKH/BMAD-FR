---
name: bmad-help
description: 'Analyzes current state and user query to answer BMad questions or recommend the next skill(s) to use. Use when user asks for help, bmad help, what to do next, or what to start with in BMad.'
---

# BMad Help

## Objet

Aider l'utilisateur à comprendre où il se trouve dans son workflow BMad et quoi faire ensuite, et également répondre à des questions plus générales lorsqu'on lui en pose qui pourraient être enrichies par des sources distantes telles que des sources de documentation de modules.

## Résultats Souhaités

Lorsque ce Skill se termine, l'utilisateur devrait :

1. **Savoir où il est** — quel module et phase il occupe, ce qui a déjà été complété
2. **Savoir quoi faire ensuite** — la prochaine étape recommandée et/ou requise, avec un raisonnement clair
3. **Savoir comment l'invoquer** — nom du Skill, code menu, contexte d'action, et tous arguments qui raccourcissent la conversation
4. **Se voir proposer un démarrage rapide** — quand un seul Skill est clairement la prochaine étape, proposer de l'exécuter pour l'utilisateur tout de suite plutôt que de simplement le lister
5. **Se sentir orienté, pas submergé** — faire ressortir uniquement ce qui est pertinent pour leur position actuelle ; ne pas déverser le catalogue entier
6. **Obtenir des réponses aux questions générales** — quand la question ne correspond pas à un Skill spécifique, utiliser la documentation enregistrée du module pour donner une réponse fondée

## Sources de Données

- **Catalogue** : `{project-root}/_bmad/_config/bmad-help.csv` — manifeste assemblé de tous les Skills de modules installés
- **Configuration** : fichiers `config.yaml` et `user-config.yaml` dans `{project-root}/_bmad/` et ses sous-dossiers — résolvent les variables `output-location`, fournissent `communication_language` et `project_knowledge`
- **Artefacts** : Les fichiers correspondant aux motifs `outputs` aux chemins `output-location` résolus révèlent quelles étapes sont possiblement complétées ; leur contenu peut également fournir un contexte de fondement pour les recommandations
- **Connaissance du projet** : Si `project_knowledge` se résout en un chemin existant, le lire pour le contexte de fondement. Ne jamais fabriquer de détails spécifiques au projet.
- **Documentation des modules** : Les lignes avec `_meta` dans la colonne `skill` portent une URL ou un chemin dans `output-location` pointant vers la documentation du module (par ex., llms.txt). Récupérer et utiliser celles-ci pour répondre aux questions générales sur ce module.

## Interprétation CSV

Le catalogue utilise ce format :

```
module,skill,display-name,menu-code,description,action,args,phase,preceded-by,followed-by,required,output-location,outputs
```

**Phases** déterminent le flux de haut niveau :
- `anytime` — disponible quel que soit l'état du workflow
- Les phases numérotées (`1-analysis`, `2-planning`, etc.) s'enchaînent dans l'ordre ; le nommage varie selon le module

**Séquençage** détermine l'ordre recommandé au sein des phases et entre elles (ce sont des suggestions douces, pas des barrières dures — voir `required` pour les barrières) :
- `preceded-by` — Skills qui devraient idéalement être complétés avant celui-ci
- `followed-by` — Skills qui devraient idéalement s'exécuter après celui-ci
- Format : `skill-name` pour les Skills à action unique, `skill-name:action` pour les Skills à actions multiples

**Barrières required** :
- Les éléments avec `required=true` doivent être complétés avant que l'utilisateur puisse passer significativement aux phases ultérieures
- Une phase sans aucun élément requis est entièrement optionnelle — la recommander mais être clair sur ce qui est réellement requis ensuite

**Détection de complétion** :
- Rechercher dans les chemins de sortie résolus les motifs `outputs`
- Faire correspondre approximativement les fichiers trouvés aux lignes du catalogue
- L'utilisateur peut également déclarer la complétion explicitement, ou cela peut être évident à partir de la conversation actuelle

**Les descriptions portent un contexte de routage** — certaines contiennent des informations de cycle et des chemins alternatifs (par ex., "retour à DS si corrections nécessaires"). Lisez-les comme des indices de navigation, pas seulement comme du texte d'affichage.

## Format de Réponse

Pour chaque élément recommandé, présenter :
- `[menu-code]` **Nom d'affichage** — par ex., "[CP] Create PRD"
- Nom du Skill entre backticks — par ex., `bmad-create-prd`
- Pour les Skills à actions multiples : contexte d'invocation d'action — par ex., "tech-writer lets create a mermaid diagram!"
- Description si présente dans le CSV ; sinon votre connaissance existante du Skill suffit
- Args si disponibles

**Ordonnancement** : Afficher d'abord les éléments optionnels, puis le prochain élément requis. Indiquer clairement lequel est lequel.

## Contraintes

- Présenter toute la sortie dans `{communication_language}`
- Recommander d'exécuter chaque Skill dans une **fenêtre de contexte fraîche**
- Faire correspondre le ton de l'utilisateur — conversationnel quand ils sont décontractés, structuré quand ils veulent des détails
- Si le module actif est ambigu, récupérer toutes les lignes meta des sources distantes pour trouver des informations pertinentes pour également aider à répondre à leur question
