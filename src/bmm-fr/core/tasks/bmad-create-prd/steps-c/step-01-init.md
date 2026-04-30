# Étape 1 : Initialisation du Workflow

**Progression : Étape 1 sur 11** - Suivante : Découverte du Projet (Project Discovery)

## OBJECTIF DE L'ÉTAPE :

Initialiser le workflow du PRD en détectant l'état de continuation, en découvrant les documents d'entrée et en mettant en place la structure du document pour une découverte collaborative des exigences du produit.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- 📖 CRITIQUE : Lisez le fichier d'étape complet avant d'entreprendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `{communication_language}` configurée.

### Renforcement du Rôle :

- ✅ Vous êtes un facilitateur PM (Product Manager) orienté produit collaborant avec un pair expert
- ✅ Si un nom, un `communication_style` et un persona vous ont déjà été attribués, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans un modèle commande-réponse
- ✅ Vous apportez une réflexion structurée et des compétences en facilitation, tandis que l'utilisateur apporte une expertise du domaine et une vision du produit

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous uniquement sur l'initialisation et la configuration - aucune génération de contenu pour le moment
- 🚫 INTERDICTION d'anticiper les étapes futures ou de présumer des connaissances qui s'y trouvent
- 💬 Approche : Configuration systématique avec un rapport clair pour l'utilisateur
- 🚪 Détectez l'état existant du workflow et gérez la continuation (reprise) de manière appropriée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse de l'état actuel avant d'entreprendre toute action
- 💾 Initialisez la structure du document et mettez à jour le frontmatter de manière appropriée
- Mettez à jour le frontmatter : ajoutez le nom de cette étape à la fin du tableau (array) des étapes terminées (`stepsCompleted`) (ce devrait être la première entrée dans le tableau `steps` puisque c'est l'étape 1)
- 🚫 INTERDICTION de charger l'étape suivante tant que l'utilisateur n'a pas sélectionné 'C' (Continuer)

## LIMITES DU CONTEXTE :

- Contexte disponible : Les variables de `workflow.md` sont disponibles en mémoire
- Focus : Uniquement l'initialisation du workflow et la configuration du document
- Limites : Ne présumez pas de connaissances provenant d'autres étapes et ne créez pas encore de contenu
- Dépendances : Configuration chargée à partir de l'initialisation de `workflow.md`

## Séquence d'Instructions (Ne pas dévier, ignorer ou optimiser)

### 1. Vérifier l'État Existant du Workflow

Tout d'abord, vérifiez si le document de sortie existe déjà :

**Détection de l'État du Workflow :**

- Cherchez le fichier à l'emplacement `{outputFile}`
- S'il existe, lisez le fichier complet y compris le frontmatter
- S'il n'existe pas, il s'agit d'un nouveau workflow (fresh workflow)

### 2. Gérer la Continuation (Si le Document Existe)

Si le document existe et possède un frontmatter avec `stepsCompleted` MAIS QUE `step-12-complete` n'est PAS dans la liste, suivez le Protocole de Continuation puisque le document est incomplet :

**Protocole de Continuation :**

- **ARRÊTEZ-VOUS immédiatement (STOP)** et chargez `./step-01b-continue.md`
- Ne procédez à aucune tâche d'initialisation
- Laissez `step-01b` gérer toute la logique de continuation
- Ceci est une situation de passage automatique (auto-proceed) - aucun choix de l'utilisateur n'est nécessaire

### 3. Configuration d'un Nouveau Workflow (Si Aucun Document)

Si aucun document n'existe ou s'il n'y a pas de `stepsCompleted` dans le frontmatter :

#### A. Découverte des Documents d'Entrée (Input Documents)

Découvrez et chargez les documents de contexte en utilisant la découverte intelligente. Les documents peuvent se trouver dans les emplacements suivants :
- `{planning_artifacts}/**`
- `{output_folder}/**`
- `{project_knowledge}/**`
- `docs/**`

De plus - lors de la recherche - les documents peuvent être un fichier markdown unique, ou un dossier avec un `index.md` et plusieurs fichiers. Par exemple, si vous cherchez `*foo*.md` et qu'il n'est pas trouvé, cherchez également un dossier appelé `*foo*/index.md` (ce qui indique un contenu découpé/sharded)

Essayez de découvrir les éléments suivants :
- Product Brief (`*brief*.md`)
- Documents de Recherche (`/*research*.md`)
- Documentation du Projet (généralement, plusieurs documents pourraient être trouvés pour cela dans le dossier `{project_knowledge}` ou `docs`.)
- Contexte du Projet (`**/project-context.md`)

<critical>Confirmez ce que vous avez trouvé avec l'utilisateur, tout en lui demandant s'il souhaite fournir autre chose. Ce n'est qu'après cette confirmation que vous procéderez au respect des règles de chargement</critical>

**Règles de Chargement :**

- Chargez ENTIÈREMENT TOUS les fichiers découverts que l'utilisateur a confirmés ou fournis (pas de décalage/limite ou offset/limit)
- S'il y a un contexte de projet (`project-context`), tout ce qui est pertinent devrait préférentiellement biaiser le reste de l'ensemble de ce processus de workflow
- Pour les dossiers découpés (sharded), chargez TOUS les fichiers pour avoir une image complète, en utilisant l'index en premier pour connaître potentiellement le potentiel de chaque document
- `index.md` est un guide de ce qui est pertinent chaque fois qu'il est disponible
- Suivez (trackez) tous les fichiers chargés avec succès dans le tableau `inputDocuments` du frontmatter

#### B. Créer le Document Initial

**Configuration du Document :**

- Copiez le modèle (template) de `../templates/prd-template.md` vers `{outputFile}`
- Initialisez le frontmatter avec la structure appropriée, y compris le tableau `inputDocuments`.

#### C. Présenter les Résultats de l'Initialisation

**Rapport de Configuration à l'Utilisateur :**

"Bienvenue {{user_name}} ! J'ai configuré votre espace de travail PRD pour {{project_name}}.

**Configuration du Document :**

- Créé : `{outputFile}` à partir du modèle (template)
- Frontmatter initialisé avec l'état du workflow

**Documents d'Entrée Découverts :**

- Product briefs : {{briefCount}} fichiers {if briefCount > 0}✓ chargés{else}(aucun trouvé){/if}
- Recherches (Research) : {{researchCount}} fichiers {if researchCount > 0}✓ chargés{else}(aucun trouvé){/if}
- Brainstorming : {{brainstormingCount}} fichiers {if brainstormingCount > 0}✓ chargés{else}(aucun trouvé){/if}
- Docs de projet : {{projectDocsCount}} fichiers {if projectDocsCount > 0}✓ chargés (projet existant/brownfield){else}(aucun trouvé - nouveau projet/greenfield){/if}

**Fichiers chargés :** {liste des noms de fichiers spécifiques ou "Aucun document supplémentaire trouvé"}

{if projectDocsCount > 0}
📋 **Note :** Il s'agit d'un **projet existant (brownfield)**. La documentation de votre projet existant a été chargée. À l'étape suivante, je vous interrogerai spécifiquement sur les nouvelles fonctionnalités ou modifications que vous souhaitez apporter à votre système actuel.
{/if}

Avez-vous d'autres documents que vous souhaiteriez que j'inclue, ou devons-nous passer à l'étape suivante ?"

### 4. Présenter les OPTIONS DU MENU

Affichez le menu après le rapport de configuration :

"[C] Continuer - Sauvegarder ceci et passer à la Découverte du Projet (Étape 2 sur 11)"

#### Logique de Gestion du Menu :

- SI C : Mettez à jour le frontmatter du fichier de sortie, en ajoutant le nom de cette étape à la fin de la liste de `stepsCompleted`, puis lisez intégralement et suivez : `./step-02-discovery.md`
- SI l'utilisateur fournit des fichiers supplémentaires : Chargez-les, mettez à jour `inputDocuments` et les comptages de documents, réaffichez le rapport
- SI l'utilisateur pose des questions : Répondez et réaffichez le menu

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'

## NOTE CRITIQUE DE FIN D'ÉTAPE

UNIQUEMENT LORSQUE [l'option de continuation C] est sélectionnée et que [le frontmatter est correctement mis à jour avec cette étape ajoutée à stepsCompleted et les comptages de documents], vous lirez alors intégralement et suivrez : `./step-02-discovery.md` pour commencer la découverte du projet.

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC DU SYSTÈME

### ✅ SUCCÈS :

- Un workflow existant a été détecté et correctement transféré à `step-01b`
- Un nouveau workflow a été initialisé avec le modèle (template) et le frontmatter approprié
- Les documents d'entrée ont été découverts et chargés en utilisant d'abord la logique 'sharded' (fichiers éclatés)
- Tous les fichiers découverts sont suivis dans le frontmatter `inputDocuments`
- L'utilisateur est clairement informé du statut de son projet (brownfield ou greenfield)
- Le menu a été présenté et l'entrée de l'utilisateur (user input) a été gérée correctement
- Le frontmatter a été mis à jour avec le nom de cette étape ajouté à `stepsCompleted` avant de poursuivre

### ❌ ÉCHEC DU SYSTÈME :

- Poursuivre avec une nouvelle initialisation alors qu'un workflow existant est présent
- Ne pas mettre à jour le frontmatter avec les documents d'entrée découverts
- **Ne pas stocker le nombre de documents dans le frontmatter**
- Créer un document sans la structure de modèle (template) appropriée
- Ne pas vérifier les dossiers "sharded" (éclatés) avant les fichiers complets
- Ne pas rapporter clairement les documents découverts à l'utilisateur
- Poursuivre sans que l'utilisateur sélectionne 'C' (Continuer)

**Règle Principale :** Sauter des étapes, optimiser des séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.
