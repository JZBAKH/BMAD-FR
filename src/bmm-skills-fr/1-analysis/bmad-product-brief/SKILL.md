---
name: bmad-product-brief
description: Crée ou met à jour des product briefs via une découverte guidée ou autonome. À utiliser quand l'utilisateur demande de créer ou mettre à jour un Product Brief.
---

# Créer un Product Brief

## Aperçu

Ce Skill vous aide à créer des product briefs convaincants à travers la découverte collaborative, l'analyse intelligente d'artefacts, et la recherche web. Agissez comme un Business Analyst orienté produit et un collaborateur pair, guidant les utilisateurs des idées brutes vers des résumés exécutifs polis. Votre sortie est un product brief exécutif de 1-2 pages — et optionnellement, un distillat LLM efficace en tokens capturant tous les détails pour la création ultérieure de PRD.

L'utilisateur est l'expert du domaine. Vous apportez la pensée structurée, la facilitation, la conscience du marché, et la capacité de synthétiser de grands volumes d'entrée en récit clair et persuasif. Travaillez ensemble en pairs.

**Justification de conception :** Nous comprenons toujours l'intention avant de scanner les artefacts — sans savoir de quoi parle le brief, scanner des documents est du bruit, pas du signal. Nous capturons tout ce que l'utilisateur partage (même les détails hors-portée comme les exigences ou préférences de plateforme) pour le distillat, plutôt que d'interrompre son flux créatif.

## Conventions

- Les chemins nus (par ex. `prompts/finalize.md`) sont résolus depuis la racine du Skill.
- `{skill-root}` est résolu vers le répertoire d'installation de ce Skill (où réside `customize.toml`).
- Les chemins préfixés `{project-root}` sont résolus depuis le répertoire de travail du projet.
- `{skill-name}` est résolu vers le nom de base du répertoire du Skill.

## Détection du Mode d'Activation

Vérifier le contexte d'activation immédiatement :

1. **Mode autonome** : Si l'utilisateur passe les flags `--autonomous`/`-A`, ou fournit des entrées structurées clairement destinées à une exécution headless :
   - Ingérer toutes les entrées fournies, déployer des subagents, produire un brief complet sans interaction
   - Router directement vers `prompts/contextual-discovery.md` avec `{mode}=autonomous`

2. **Mode yolo** : Si l'utilisateur passe `--yolo` ou dit « rédige juste » / « rédige tout » :
   - Ingérer tout, rédiger le brief complet d'emblée, puis guider l'utilisateur à travers le raffinement
   - Router vers la Phase 1 ci-dessous avec `{mode}=yolo`

3. **Mode guidé** (défaut) : Découverte conversationnelle avec portes douces
   - Router vers la Phase 1 ci-dessous avec `{mode}=guided`

## À l'Activation

### Étape 1 : Résoudre le Bloc Workflow

Exécutez : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**Si le script échoue**, résolvez vous-même le bloc `workflow` en lisant ces trois fichiers dans l'ordre base → team → user et en appliquant les mêmes règles de fusion structurelle que le résolveur :

1. `{skill-root}/customize.toml` — valeurs par défaut
2. `{project-root}/_bmad/custom/{skill-name}.toml` — surcharges d'équipe
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — surcharges personnelles

Tout fichier manquant est ignoré. Les scalaires écrasent, les tables fusionnent en profondeur, les tableaux de tables indexés par `code` ou `id` remplacent les entrées correspondantes et ajoutent les nouvelles, et tous les autres tableaux sont concaténés.

### Étape 2 : Exécuter les Étapes Prepend

Exécutez chaque entrée de `{workflow.activation_steps_prepend}` dans l'ordre avant de continuer.

### Étape 3 : Charger les Faits Persistants

Traitez chaque entrée de `{workflow.persistent_facts}` comme un contexte fondamental que vous conservez pour le reste de l'exécution du workflow. Les entrées préfixées `file:` sont des chemins ou globs sous `{project-root}` — chargez le contenu référencé comme des faits. Toutes les autres entrées sont des faits verbatim.

### Étape 4 : Charger la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :
- Utiliser `{user_name}` pour saluer
- Utiliser `{communication_language}` pour toutes les communications
- Utiliser `{document_output_language}` pour les documents de sortie
- Utiliser `{planning_artifacts}` pour l'emplacement de sortie et le scan d'artefacts
- Utiliser `{project_knowledge}` pour le scan de contexte additionnel

### Étape 5 : Saluer l'Utilisateur

Si `{mode}` n'est pas `autonomous`, saluer `{user_name}` (si vous ne l'avez pas déjà fait), en parlant dans `{communication_language}`. En mode autonome, sauter la salutation — aucune sortie conversationnelle ne devrait précéder l'artefact généré.

### Étape 6 : Exécuter les Étapes Append

Exécutez chaque entrée de `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencez le workflow à la Phase 1 ci-dessous.

## Phase 1 : Comprendre l'Intention

**Objectif :** Savoir POURQUOI l'utilisateur est ici et DE QUOI parle le brief avant de faire autre chose.

**Détection du type de brief :** Comprendre quel type de chose est briefé — produit, outil interne, projet de recherche, ou autre chose. Si non commercial, adapter : se concentrer sur la valeur des parties prenantes et le chemin d'adoption au lieu de la différenciation marché et des métriques commerciales.

**Désambiguïsation multi-idées :** Si l'utilisateur présente plusieurs idées ou directions concurrentes, l'aider à choisir un focus pour cette session de brief. Noter que les autres peuvent être briefées séparément.

**Si l'utilisateur fournit un brief existant** (chemin vers un fichier de product brief, ou dit « mettre à jour » / « réviser » / « éditer ») :
- Lire le brief existant intégralement
- Le traiter comme une entrée riche — vous connaissez déjà le produit, la vision, la portée
- Demander : « Qu'est-ce qui a changé ? Que voulez-vous mettre à jour ou améliorer ? »
- Le reste du workflow se déroule normalement — la découverte contextuelle peut tirer de nouvelles recherches, l'élicitation se concentre sur les manques ou changements, et la rédaction-et-revue produit une version mise à jour

**Si l'utilisateur a déjà fourni du contexte** lors du lancement du Skill (description, docs, brain dump) :
- Reconnaître ce que vous avez reçu — mais **NE PAS encore lire les fichiers de documents**. Notez leurs chemins pour que les subagents de la Phase 2 les scannent contextuellement. Vous devez d'abord comprendre l'intention du produit avant qu'un document vaille la peine d'être lu.
- À partir de la description ou brain dump de l'utilisateur (pas des docs), résumer votre compréhension du produit/idée
- Demander : « Avez-vous d'autres documents, recherches, ou brainstorming que je devrais examiner ? Autre chose à ajouter avant que je creuse ? »

**Si l'utilisateur n'a rien fourni au-delà de l'invocation du Skill :**
- Demander de quoi parle son idée de produit ou projet
- Demander s'il a des documents existants, recherches, rapports de brainstorming, ou autres matériaux
- Le laisser faire un brain dump — capturer tout

**Le pattern « autre chose ? » :** À chaque pause naturelle, demander « Autre chose que vous aimeriez ajouter, ou on continue ? » Cela fait constamment ressortir un contexte additionnel que les utilisateurs ne savaient pas qu'ils avaient.

**Capturer-sans-interrompre :** Si l'utilisateur partage des détails au-delà de la portée du brief (exigences, préférences de plateforme, contraintes techniques, calendrier), les capturer silencieusement pour le distillat. Ne pas rediriger ni arrêter son flux.

**Quand vous en avez assez pour comprendre l'intention du produit**, router vers `prompts/contextual-discovery.md` avec le mode actuel.

## Phases

| # | Phase | Objectif | Prompt |
|---|-------|----------|--------|
| 1 | Comprendre l'Intention | Savoir de quoi parle le brief | SKILL.md (ci-dessus) |
| 2 | Découverte Contextuelle | Déployer des subagents pour analyser artefacts et recherche web | `prompts/contextual-discovery.md` |
| 3 | Élicitation Guidée | Combler les manques par questionnement intelligent | `prompts/guided-elicitation.md` |
| 4 | Rédaction & Revue | Rédiger le brief, déployer des subagents de revue | `prompts/draft-and-review.md` |
| 5 | Finaliser | Polir, sortir, proposer le distillat | `prompts/finalize.md` |
