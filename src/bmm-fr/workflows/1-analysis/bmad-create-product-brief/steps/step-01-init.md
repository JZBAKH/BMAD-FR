---
# Références de fichiers
outputFile: '{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md'
---

# Étape 1 : Initialisation du Brief Produit

## OBJECTIF DE L'ÉTAPE :

Initialiser le workflow du brief produit en détectant l'état de continuation et en mettant en place la structure du document pour une découverte produit collaborative.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- 📖 CRITIQUE : Lisez l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un facilitateur Business Analyst orienté produit.
- ✅ Si un nom, un style de communication et un persona vous ont déjà été attribués, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une relation commande-réponse.
- ✅ Vous apportez une pensée structurée et des compétences de facilitation, tandis que l'utilisateur apporte son expertise métier et sa vision produit.
- ✅ Maintenez un ton de découverte collaborative tout au long du processus.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous uniquement sur l'initialisation et la configuration — pas encore de génération de contenu.
- 🚫 INTERDICTION de regarder les étapes futures ou de présumer des connaissances issues de celles-ci.
- 💬 Approche : Configuration systématique avec un compte-rendu clair à l'utilisateur.
- 📋 Détectez l'état existant du workflow et gérez correctement la continuation.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse de l'état actuel avant de prendre toute mesure.
- 💾 Initialisez la structure du document et mettez à jour le frontmatter de manière appropriée.
- 📖 Configurez le frontmatter `stepsCompleted: [1]` avant de charger l'étape suivante.
- 🚫 INTERDICTION de charger l'étape suivante tant que l'utilisateur n'a pas sélectionné 'C' (Continuer).

## LIMITES DE CONTEXTE :

- Contexte disponible : Les variables de `workflow.md` sont disponibles en mémoire.
- Focus : Initialisation du workflow et configuration du document uniquement.
- Limites : Ne présumez pas de connaissances d'autres étapes et ne créez pas encore de contenu.
- Dépendances : Configuration chargée depuis l'initialisation de `workflow.md`.

## Séquence d'Instructions (Ne pas dévier, sauter ou optimiser)

### 1. Vérifier l'État Existant du Workflow

Tout d'abord, vérifiez si le document de sortie existe déjà :

**Détection de l'État du Workflow :**

- Recherchez le fichier `{outputFile}`.
- S'il existe, lisez le fichier complet, y compris le frontmatter.
- S'il n'existe pas, il s'agit d'un nouveau workflow.

### 2. Gérer la Continuation (Si le Document Existe)

Si le document existe et possède un frontmatter avec `stepsCompleted` :

**Protocole de Continuation :**

- **ARRÊTEZ-VOUS immédiatement** et chargez `./step-01b-continue.md`.
- Ne procédez à aucune tâche d'initialisation.
- Laissez l'étape 01b gérer toute la logique de continuation.
- C'est une situation de passage automatique — aucun choix de l'utilisateur n'est nécessaire.

### 3. Configuration d'un Nouveau Workflow (Si Pas de Document)

Si aucun document n'existe ou s'il n'y a pas de `stepsCompleted` dans le frontmatter :

#### A. Découverte des Documents Sources

Chargez les documents de contexte en utilisant la découverte intelligente. Les documents peuvent se trouver aux emplacements suivants :

- {planning_artifacts}/\*\*
- {output_folder}/\*\*
- {product_knowledge}/\*\*
- {project-root}/docs/\*\*

Aussi — lors de la recherche — les documents peuvent être un simple fichier markdown, ou un dossier avec un index et plusieurs fichiers. Par exemple, si vous cherchez `*foo*.md` et qu'il n'est pas trouvé, cherchez également un dossier nommé `*foo*/index.md` (qui indique un contenu fragmenté/sharded).

Essayez de découvrir les éléments suivants :

- Rapports de Brainstorming (`*brainstorming*.md`)
- Documents de Recherche (`*research*.md`)
- Documentation Projet (plusieurs documents peuvent généralement être trouvés dans le dossier `{product_knowledge}` ou `docs`).
- Contexte du Projet (`**/project-context.md`)

<critical>Confirmez ce que vous avez trouvé avec l'utilisateur, tout en lui demandant s'il souhaite fournir autre chose. Ce n'est qu'après cette confirmation que vous procéderez au chargement selon les règles.</critical>

**Règles de Chargement :**

- Chargez l'INTÉGRALITÉ des fichiers découverts que l'utilisateur a confirmés ou fournis (pas d'offset/limit).
- S'il y a un contexte de projet, tout ce qui est pertinent doit influencer le reste de ce workflow.
- Pour les dossiers fragmentés (sharded), chargez TOUS les fichiers pour avoir une vue d'ensemble, en utilisant l'index en premier pour connaître le potentiel de chaque document.
- `index.md` sert de guide sur ce qui est pertinent dès qu'il est disponible.
- Suivez tous les fichiers chargés avec succès dans le tableau `inputDocuments` du frontmatter.

#### B. Créer le Document Initial

**Configuration du Document :**

- Copiez le modèle depuis `../product-brief.template.md` vers `{outputFile}`, et mettez à jour les champs du frontmatter.

#### C. Présenter les Résultats de l'Initialisation

**Rapport de Configuration à l'Utilisateur :**
"Bienvenue {{user_name}} ! J'ai configuré votre espace de travail pour le brief produit de {{project_name}}.

**Configuration du Document :**

- Créé : `{outputFile}` à partir du modèle.
- Initialisation du frontmatter avec l'état du workflow.

**Documents Sources Découverts :**

- Recherche : {nombre de fichiers de recherche chargés ou "Aucun trouvé"}
- Brainstorming : {nombre de fichiers de brainstorming chargés ou "Aucun trouvé"}
- Docs projet : {nombre de fichiers projet chargés ou "Aucun trouvé"}
- Contexte Projet : {nombre de fichiers de contexte projet chargés ou "Aucun trouvé"}

**Fichiers chargés :** {liste des noms de fichiers spécifiques ou "Aucun document supplémentaire trouvé"}

Avez-vous d'autres documents que vous aimeriez que j'inclue, ou devons-nous continuer vers l'étape suivante ?"

### 4. Présenter les OPTIONS DU MENU

Affichez : "**Passage à la découverte de la vision produit...**"

#### Logique de Gestion du Menu :

- Une fois le rapport de configuration présenté, sans délai, lisez complètement et suivez : `./step-02-vision.md`.

#### RÈGLES D'EXÉCUTION :

- Il s'agit d'une étape d'initialisation avec passage automatique après la fin de la configuration.
- Passez directement à l'étape suivante après la configuration du document et le compte-rendu.

## NOTE CRITIQUE DE FIN D'ÉTAPE

UNIQUEMENT LORSQUE [la configuration est terminée et le frontmatter correctement mis à jour], vous devrez alors lire complètement et suivre : `./step-02-vision.md` pour commencer la découverte de la vision produit.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Workflow existant détecté et correctement transmis à l'étape 01b.
- Nouveau workflow initialisé avec le modèle et le frontmatter approprié.
- Documents sources découverts et chargés en utilisant la logique "fragmenté d'abord" (sharded-first).
- Tous les fichiers découverts sont suivis dans `inputDocuments` du frontmatter.
- Menu présenté et entrée utilisateur gérée correctement.
- Frontmatter mis à jour avec `stepsCompleted: [1]` avant de continuer.

### ❌ ÉCHEC DU SYSTÈME :

- Procéder à une nouvelle initialisation alors qu'un workflow existe déjà.
- Ne pas mettre à jour le frontmatter avec les documents sources découverts.
- Créer le document sans respecter la structure du modèle.
- Ne pas vérifier d'abord les dossiers fragmentés avant les fichiers entiers.
- Ne pas rapporter clairement les documents découverts à l'utilisateur.
- Continuer sans que l'utilisateur ait sélectionné 'C' (Continuer).

**Règle Maîtresse :** Sauter des étapes, optimiser les séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.
