# Étape 1 : Initialisation du Workflow d'Architecture

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant d'entreprendre toute action — une compréhension partielle mène à des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue et comprise avant de continuer
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS uniquement sur l'initialisation et la configuration — ne regardez pas les étapes futures
- 🚪 DÉTECTER l'état du workflow existant et gérer la poursuite correctement
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant d'entreprendre toute action
- 💾 Initialiser le document et mettre à jour le frontmatter
- 📖 Configurer le frontmatter `stepsCompleted: [1]` avant de charger l'étape suivante
- 🚫 INTERDICTION de charger l'étape suivante tant que la configuration n'est pas terminée

## LIMITES DE CONTEXTE :

- Les variables de workflow.md sont disponibles en mémoire
- Contexte précédent = ce qui est dans le document de sortie + le frontmatter
- Ne supposez pas de connaissances issues d'autres étapes
- La découverte des documents d'entrée se fait dans cette étape

## VOTRE TÂCHE :

Initialiser le workflow d'Architecture en détectant l'état de poursuite, en découvrant les documents d'entrée et en configurant le document pour une prise de décision architecturale collaborative.

## SÉQUENCE D'INITIALISATION :

### 1. Vérifier l'Existence d'un Workflow

D'abord, vérifiez si le document de sortie existe déjà :

- Recherchez l'existence de {planning_artifacts}/`*architecture*.md`
- S'il existe, lisez l'intégralité du ou des fichiers, y compris le frontmatter
- S'il n'existe pas, il s'agit d'un nouveau workflow

### 2. Gérer la Poursuite (Si le Document Existe)

Si le document existe et possède un frontmatter avec `stepsCompleted` :

- **ARRÊTEZ-VOUS ici** et chargez `./step-01b-continue.md` immédiatement
- Ne procédez à aucune tâche d'initialisation
- Laissez step-01b gérer la logique de poursuite

### 3. Configuration d'un Nouveau Workflow (Si aucun Document)

Si aucun document n'existe ou s'il n'y a pas de `stepsCompleted` dans le frontmatter :

#### A. Découverte des Documents d'Entrée

Découvrez et chargez les documents de contexte en utilisant la découverte intelligente. Les documents peuvent se trouver dans les emplacements suivants :
- {planning_artifacts}/**
- {output_folder}/**
- {project_knowledge}/**
- {project-root}/docs/**

Notez également que lors de la recherche, les documents peuvent être un simple fichier Markdown ou un dossier avec un index et plusieurs fichiers. Par exemple, si vous cherchez `*foo*.md` et qu'il n'est pas trouvé, cherchez également un dossier nommé *foo*/index.md (ce qui indique un contenu fragmenté).

Essayez de découvrir les éléments suivants :
- Product Brief (`*brief*.md`)
- Product Requirements Document (`*prd*.md`)
- UX Design (`*ux-design*.md`) et autres
- Documents de Recherche (`*research*.md`)
- Documentation Projet (plusieurs documents peuvent généralement être trouvés pour cela dans le dossier `{project_knowledge}` ou `{project-root}/docs`.)
- Contexte Projet (`**/project-context.md`)

<critical>Confirmez ce que vous avez trouvé avec l'utilisateur, tout en lui demandant s'il souhaite fournir autre chose. Ce n'est qu'après cette confirmation que vous procéderez aux règles de chargement</critical>

**Règles de Chargement :**

- Chargez INTÉGRALEMENT tous les fichiers découverts que l'utilisateur a confirmés ou fournis (pas d'offset/limit)
- S'il existe un contexte projet, tout ce qui est pertinent doit être privilégié dans le reste de ce processus de workflow
- Pour les dossiers fragmentés (sharded), chargez TOUS les fichiers pour avoir une vue d'ensemble, en utilisant l'index en premier pour connaître le potentiel de chaque document
- index.md est un guide sur ce qui est pertinent dès qu'il est disponible
- Suivez tous les fichiers chargés avec succès dans le tableau `inputDocuments` du frontmatter

#### B. Valider les Entrées Requises

Avant de continuer, vérifiez que nous avons les entrées essentielles :

**Validation du PRD :**

- Si aucun PRD n'est trouvé : "L'Architecture nécessite un PRD pour travailler. Veuillez d'abord exécuter le workflow PRD ou fournir le chemin du fichier PRD."
- NE PAS continuer sans PRD

**Autres Entrées potentielles :**

- UX Spec : "Fournit les exigences architecturales UI/UX"

#### C. Créer le Document Initial

Copiez le modèle de `../architecture-decision-template.md` vers `{planning_artifacts}/architecture.md`

#### D. Terminer l'Initialisation et Faire un Rapport

Terminez la configuration et faites un rapport à l'utilisateur :

**Configuration du Document :**

- Créé : `{planning_artifacts}/architecture.md` à partir du modèle
- Frontmatter initialisé avec l'état du workflow

**Documents d'Entrée Découverts :**
Indiquez ce qui a été trouvé :
"Bienvenue {{user_name}} ! J'ai configuré votre espace de travail d'Architecture pour {{project_name}}.

**Documents trouvés :**

- PRD : {nombre de fichiers PRD chargés ou "Aucun trouvé - REQUIS"}
- UX Design : {nombre de fichiers UX chargés ou "Aucun trouvé"}
- Recherche : {nombre de fichiers de recherche chargés ou "Aucun trouvé"}
- Docs projet : {nombre de fichiers projet chargés ou "Aucun trouvé"}
- Contexte projet : {nombre de règles pour les agents IA trouvées dans project_context_rules}

**Fichiers chargés :** {liste des noms de fichiers spécifiques ou "Aucun document supplémentaire trouvé"}

Prêt à commencer la prise de décision architecturale. Avez-vous d'autres documents que vous souhaiteriez inclure ?

[C] Continuer vers l'analyse du contexte projet"

## INDICATEURS DE RÉUSSITE :

✅ Workflow existant détecté et transmis à step-01b correctement
✅ Nouveau workflow initialisé avec le modèle et le frontmatter
✅ Documents d'entrée découverts et chargés en utilisant la logique "fragmenté-d'abord" (sharded-first)
✅ Tous les fichiers découverts suivis dans `inputDocuments` du frontmatter
✅ Exigence du PRD validée et communiquée
✅ L'utilisateur a confirmé la configuration du document et peut continuer

## MODES D'ÉCHEC :

❌ Procéder à une nouvelle initialisation alors qu'un workflow existant existe
❌ Ne pas mettre à jour le frontmatter avec les documents d'entrée découverts
❌ Créer le document sans le modèle approprié
❌ Ne pas vérifier les dossiers fragmentés avant les fichiers entiers
❌ Ne pas signaler à l'utilisateur quels documents ont été trouvés
❌ Continuer sans valider l'exigence du PRD

❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le prochain fichier d'étape
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## ÉTAPE SUIVANTE :

Une fois que l'utilisateur sélectionne [C] pour continuer, et seulement après s'être assuré que toute la sortie du modèle a été créée, chargez `./step-02-context.md` pour analyser le contexte du projet et commencer la prise de décision architecturale.

Rappel : NE PAS passer à step-02 tant que l'utilisateur n'a pas explicitement sélectionné [C] dans le menu et que la configuration n'est pas confirmée !
