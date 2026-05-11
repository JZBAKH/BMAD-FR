# Étape 1 : Initialisation du workflow

**Progression : Étape 1 sur 11** - Suivante : Découverte du projet

## OBJECTIF DE L'ÉTAPE :

Initialiser le workflow PRD en détectant l'état de continuation, en découvrant les documents d'entrée et en mettant en place la structure documentaire pour la découverte collaborative des exigences produit.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans entrée utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant de prendre la moindre action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER LA SORTIE Dans votre style de communication d'Agent avec la config `{communication_language}`

### Renforcement du rôle :

- ✅ Vous êtes un facilitateur PM axé produit collaborant avec un pair expert
- ✅ Si vous avez déjà reçu un nom, un communication_style et un persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans une commande-réponse
- ✅ Vous apportez la pensée structurée et les compétences de facilitation, tandis que l'utilisateur apporte l'expertise du domaine et la vision produit

### Règles spécifiques à l'étape :

- 🎯 Concentrez-vous uniquement sur l'initialisation et la mise en place - pas encore de génération de contenu
- 🚫 INTERDIT de regarder en avant les étapes futures ou de présumer de connaissances issues d'elles
- 💬 Approche : Mise en place systématique avec rapport clair à l'utilisateur
- 🚪 Détecter l'état de workflow existant et gérer la continuation correctement

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse de l'état actuel avant de prendre la moindre action
- 💾 Initialiser la structure documentaire et mettre à jour le frontmatter de manière appropriée
- Mettre à jour le frontmatter : ajouter ce nom d'étape à la fin du tableau steps completed (ce devrait être la première entrée du tableau steps puisque c'est l'étape 1)
- 🚫 INTERDIT de charger l'étape suivante tant que l'utilisateur ne sélectionne pas 'C' (Continue)

## FRONTIÈRES DE CONTEXTE :

- Contexte disponible : Les variables de workflow.md sont disponibles en mémoire
- Focus : Initialisation du workflow et configuration documentaire uniquement
- Limites : Ne pas présumer de connaissances issues d'autres étapes ni créer de contenu pour le moment
- Dépendances : Configuration chargée depuis l'initialisation de workflow.md

## Séquence d'instructions (Ne pas dévier, sauter ou optimiser)

### 1. Vérifier l'état de workflow existant

Vérifier d'abord si le document de sortie existe déjà :

**Détection de l'état du workflow :**

- Chercher le fichier à `{outputFile}`
- S'il existe, lire le fichier complet y compris le frontmatter
- S'il n'existe pas, c'est un workflow neuf

### 2. Gérer la continuation (Si le document existe)

Si le document existe et a un frontmatter avec `stepsCompleted` MAIS que `step-12-complete` n'est PAS dans la liste, suivre le protocole de continuation puisque le document est incomplet :

**Protocole de continuation :**

- **STOPPEZ immédiatement** et chargez `./step-01b-continue.md`
- Ne procédez à aucune tâche d'initialisation
- Laissez step-01b gérer toute la logique de continuation
- C'est une situation auto-procéder - aucun choix utilisateur requis

### 3. Mise en place de workflow neuf (Si pas de document)

S'il n'existe pas de document ou pas de `stepsCompleted` dans le frontmatter :

#### A. Découverte des documents d'entrée

Découvrir et charger les documents de contexte en utilisant la découverte intelligente. Les documents peuvent se trouver aux emplacements suivants :
- {planning_artifacts}/**
- {output_folder}/**
- {project_knowledge}/**
- {implementation_artifacts}/investigations/**
- docs/**

Aussi - lors de la recherche - les documents peuvent être un fichier markdown unique, ou un dossier avec un index et plusieurs fichiers. Par exemple, si vous cherchez `*foo*.md` et qu'il n'est pas trouvé, cherchez aussi un dossier appelé *foo*/index.md (ce qui indique un contenu sharded)

Tenter de découvrir ce qui suit :
- Brief produit (`*brief*.md`)
- Documents de recherche (`/*research*.md`)
- Documentation de projet (généralement plusieurs documents peuvent être trouvés pour cela dans le dossier `{project_knowledge}` ou `docs`.)
- Contexte de projet (`**/project-context.md`)
- Fichiers d'investigation (`{implementation_artifacts}/investigations/*-investigation.md`) — dossiers d'enquête `bmad-investigate`
  lorsque le PRD est piloté par une enquête forensique plutôt que par une idéation greenfield.

<critical>Confirmez ce que vous avez trouvé avec l'utilisateur, en demandant si l'utilisateur veut fournir autre chose. Ce n'est qu'après cette confirmation que vous procéderez à suivre les règles de chargement</critical>

**Règles de chargement :**

- Charger TOUS les fichiers découverts complètement que l'utilisateur a confirmés ou fournis (sans offset/limit)
- S'il y a un contexte de projet, ce qui est pertinent devrait essayer d'être biaisé dans le reste de tout ce processus de workflow
- Pour les dossiers sharded, charger TOUS les fichiers pour avoir un tableau complet, en utilisant l'index d'abord pour potentiellement connaître le potentiel de chaque document
- index.md est un guide de ce qui est pertinent quand disponible
- Tracer tous les fichiers chargés avec succès dans le tableau frontmatter `inputDocuments`

#### B. Créer le document initial

**Configuration du document :**

- Copier le template depuis `../templates/prd-template.md` vers `{outputFile}`
- Initialiser le frontmatter avec une structure correcte incluant le tableau inputDocuments.

#### C. Présenter les résultats d'initialisation

**Rapport de configuration à l'utilisateur :**

"Bienvenue {{user_name}} ! J'ai mis en place votre espace de travail PRD pour {{project_name}}.

**Configuration du document :**

- Créé : `{outputFile}` à partir du template
- Frontmatter initialisé avec l'état du workflow

**Documents d'entrée découverts :**

- Briefs produit : {{briefCount}} fichiers {if briefCount > 0}✓ chargés{else}(aucun trouvé){/if}
- Recherche : {{researchCount}} fichiers {if researchCount > 0}✓ chargés{else}(aucun trouvé){/if}
- Brainstorming : {{brainstormingCount}} fichiers {if brainstormingCount > 0}✓ chargés{else}(aucun trouvé){/if}
- Investigations : {{investigationCount}} fichiers {if investigationCount > 0}✓ chargés{else}(aucun trouvé){/if}
- Docs projet : {{projectDocsCount}} fichiers {if projectDocsCount > 0}✓ chargés (projet brownfield){else}(aucun trouvé - projet greenfield){/if}

**Fichiers chargés :** {liste des noms de fichiers spécifiques ou "Aucun document supplémentaire trouvé"}

{if projectDocsCount > 0}
📋 **Note :** Ceci est un **projet brownfield**. Votre documentation de projet existante a été chargée. À l'étape suivante, je vous demanderai spécifiquement quelles nouvelles fonctionnalités ou changements vous voulez ajouter à votre système existant.
{/if}

{if investigationCount > 0}
🔎 **Note :** Les fichiers d'investigation ont été chargés. Les conclusions graduées par évidence (Confirmé / Déduit / Hypothétique), la chronologie et la direction de correction sont disponibles comme contexte pendant que nous cadrons les exigences.
{/if}

Avez-vous d'autres documents que vous aimeriez que j'inclue, ou continuons-nous à l'étape suivante ?"

### 4. Présenter les OPTIONS DE MENU

Afficher le menu après le rapport de configuration :

"[C] Continue - Sauvegarder ceci et passer à la Découverte du projet (Étape 2 sur 11)"

#### Logique de gestion du menu :

- SI C : Mettre à jour le frontmatter du fichier de sortie, en ajoutant ce nom d'étape à la fin de la liste de stepsCompleted, puis lire entièrement et suivre : ./step-02-discovery.md
- SI l'utilisateur fournit des fichiers supplémentaires : Les charger, mettre à jour inputDocuments et documentCounts, réafficher le rapport
- SI l'utilisateur pose des questions : Répondre et réafficher le menu

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée utilisateur après avoir présenté le menu
- Ne procéder à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'

## NOTE CRITIQUE DE COMPLÉTION D'ÉTAPE

UNIQUEMENT LORSQUE [l'option C continue est sélectionnée] et [le frontmatter est correctement mis à jour avec cette étape ajoutée à stepsCompleted et documentCounts], vous lirez alors entièrement et suivrez : `./step-02-discovery.md` pour commencer la découverte de projet.

---

## 🚨 MÉTRIQUES SYSTÈME DE SUCCÈS/ÉCHEC

### ✅ SUCCÈS :

- Workflow existant détecté et correctement transmis à step-01b
- Workflow neuf initialisé avec template et frontmatter correct
- Documents d'entrée découverts et chargés en utilisant la logique sharded-first
- Tous les fichiers découverts tracés dans le frontmatter `inputDocuments`
- Utilisateur clairement informé du statut brownfield vs greenfield
- Menu présenté et entrée utilisateur gérée correctement
- Frontmatter mis à jour avec ce nom d'étape ajouté à stepsCompleted avant de procéder

### ❌ ÉCHEC SYSTÈME :

- Procéder à une initialisation neuve quand un workflow existant existe
- Ne pas mettre à jour le frontmatter avec les documents d'entrée découverts
- **Ne pas stocker les comptes de documents dans le frontmatter**
- Créer un document sans structure de template correcte
- Ne pas vérifier les dossiers sharded d'abord avant les fichiers entiers
- Ne pas rapporter clairement les documents découverts à l'utilisateur
- Procéder sans que l'utilisateur sélectionne 'C' (Continue)

**Règle maîtresse :** Sauter des étapes, optimiser des séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC SYSTÈME.
