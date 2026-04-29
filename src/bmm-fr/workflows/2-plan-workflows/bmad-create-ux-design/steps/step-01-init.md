# Étape 1 : Initialisation du Workflow de Design UX

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur l'initialisation et la configuration uniquement - ne regardez pas les étapes futures.
- 🚪 DÉTECTER l'état actuel du workflow et gérer la continuation de manière appropriée.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- 💾 Initialiser le document et mettre à jour le frontmatter.
- 📖 Configurer `stepsCompleted: [1]` dans le frontmatter avant de charger l'étape suivante.
- 🚫 INTERDICTION de charger l'étape suivante tant que la configuration n'est pas terminée.

## LIMITES DU CONTEXTE :

- Les variables de workflow.md sont disponibles en mémoire.
- Contexte précédent = contenu du document de sortie + frontmatter.
- Ne pas assumer de connaissances provenant d'autres étapes.
- La découverte des documents sources (input documents) se fait lors de cette étape.

## VOTRE TÂCHE :

Initialiser le workflow de design UX en détectant l'état de continuation et en configurant le document de spécification de design.

## SÉQUENCE D'INITIALISATION :

### 1. Vérifier l'existence d'un workflow

Tout d'abord, vérifiez si le document de sortie existe déjà :

- Cherchez le fichier à l'adresse `{planning_artifacts}/*ux-design-specification*.md`.
- S'il existe, lisez le fichier complet, y compris le frontmatter.
- S'il n'existe pas, il s'agit d'un nouveau workflow.

### 2. Gérer la continuation (si le document existe)

Si le document existe et possède un frontmatter avec `stepsCompleted` :

- **ARRÊTEZ-VOUS ici** et chargez immédiatement `./step-01b-continue.md`.
- Ne procédez à aucune tâche d'initialisation.
- Laissez l'étape 01b gérer la logique de continuation.

### 3. Configuration d'un nouveau workflow (si aucun document n'existe)

Si aucun document n'existe ou s'il n'y a pas de `stepsCompleted` dans le frontmatter :

#### A. Découverte des documents sources (Input Documents)

Découvrez et chargez les documents de contexte en utilisant la découverte intelligente. Les documents peuvent se trouver dans les emplacements suivants :
- {planning_artifacts}/**
- {output_folder}/**
- {product_knowledge}/**
- {project-root}/docs/**

Aussi - lors de la recherche - les documents peuvent être un simple fichier markdown, ou un dossier avec un index et plusieurs fichiers. Par exemple, si vous cherchez `*foo*.md` et qu'il n'est pas trouvé, cherchez également un dossier nommé *foo*/index.md (ce qui indique un contenu partitionné/shardé).

Essayer de découvrir les éléments suivants :
- Product Brief (`*brief*.md`)
- Documents de recherche (`*prd*.md`)
- Documentation de projet (plusieurs documents peuvent généralement être trouvés pour cela dans le dossier `{product_knowledge}` ou `docs`).
- Contexte du projet (`**/project-context.md`)

<critical>Confirmez ce que vous avez trouvé avec l'utilisateur, tout en lui demandant s'il souhaite fournir autre chose. Ce n'est qu'après cette confirmation que vous procéderez aux règles de chargement.</critical>

**Règles de chargement :**

- Chargez TOUS les fichiers découverts complètement que l'utilisateur a confirmés ou fournis (pas d'offset/limite).
- S'il existe un contexte de projet, tout ce qui est pertinent doit essayer d'influencer le reste de tout ce processus de workflow.
- Pour les dossiers partitionnés (sharded), chargez TOUS les fichiers pour obtenir une image complète, en utilisant l'index en premier pour potentiellement connaître le potentiel de chaque document.
- index.md sert de guide à ce qui est pertinent dès qu'il est disponible.
- Suivez tous les fichiers chargés avec succès dans le tableau `inputDocuments` du frontmatter.

#### B. Créer le document initial

Copiez le modèle depuis `../ux-design-template.md` vers `{planning_artifacts}/ux-design-specification.md`.
Initialisez le frontmatter dans le modèle.

#### C. Terminer l'initialisation et faire un rapport

Terminez la configuration et faites un rapport à l'utilisateur :

**Configuration du document :**

- Créé : `{planning_artifacts}/ux-design-specification.md` à partir du modèle.
- Frontmatter initialisé avec l'état du workflow.

**Documents sources découverts :**
Indiquez ce qui a été trouvé :
"Bienvenue {{user_name}} ! J'ai configuré votre espace de travail de design UX pour {{project_name}}.

**Documents trouvés :**

- PRD : {nombre de fichiers PRD chargés ou "Aucun trouvé"}
- Brief produit : {nombre de fichiers brief chargés ou "Aucun trouvé"}
- Autre contexte : {nombre d'autres fichiers chargés ou "Aucun trouvé"}

**Fichiers chargés :** {liste des noms de fichiers spécifiques ou "Aucun document supplémentaire trouvé"}

Avez-vous d'autres documents que vous aimeriez que j'inclue, ou devons-nous passer à l'étape suivante ?

[C] Continuer vers la découverte UX"

## ÉTAPE SUIVANTE :

Une fois que l'utilisateur a sélectionné [C] pour continuer, assurez-vous que le fichier `{planning_artifacts}/ux-design-specification.md` a été créé et enregistré, puis chargez `./step-02-discovery.md` pour commencer la phase de découverte UX.

Rappel : Ne passez PAS à l'étape 02 tant que le fichier de sortie n'a pas été mis à jour et que l'utilisateur n'a pas explicitement sélectionné [C] pour continuer !

## MÉTRIQUES DE RÉUSSITE :

✅ Workflow existant détecté et transmis correctement à l'étape 01b.
✅ Nouveau workflow initialisé avec modèle et frontmatter.
✅ Documents sources découverts et chargés en utilisant la logique "partitionné en priorité".
✅ Tous les fichiers découverts suivis dans `inputDocuments` du frontmatter.
✅ L'utilisateur a confirmé la configuration du document et peut continuer.

## MODES D'ÉCHEC :

❌ Procéder à une nouvelle initialisation alors qu'un workflow existe déjà.
❌ Ne pas mettre à jour le frontmatter avec les documents sources découverts.
❌ Création du document sans le modèle approprié.
❌ Ne pas vérifier les dossiers partitionnés avant les fichiers complets.
❌ Ne pas signaler à l'utilisateur quels documents ont été trouvés.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.
