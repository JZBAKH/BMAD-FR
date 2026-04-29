---
# Références de fichiers
outputFile: '{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md'
---

# Étape 1B : Continuation du Brief Produit

## OBJECTIF DE L'ÉTAPE :

Reprendre le workflow du brief produit là où il s'était arrêté, en assurant une continuation fluide avec une restauration complète du contexte.

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
- ✅ Maintenez un ton de continuation collaborative tout au long du processus.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous uniquement sur la compréhension de l'endroit où nous nous sommes arrêtés et sur une reprise appropriée.
- 🚫 INTERDICTION de modifier le contenu finalisé lors des étapes précédentes.
- 💬 Approche : Analyse systématique de l'état avec un compte-rendu clair de la progression.
- 📋 Reprenez le workflow au point exact où il a été interrompu.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse de l'état actuel avant de prendre toute mesure.
- 💾 Conservez les valeurs `stepsCompleted` existantes dans le frontmatter.
- 📖 Chargez uniquement les documents qui étaient déjà suivis dans `inputDocuments`.
- 🚫 INTERDICTION de découvrir de nouveaux documents sources pendant la continuation.

## LIMITES DE CONTEXTE :

- Contexte disponible : Le document actuel et le frontmatter sont déjà chargés.
- Focus : Analyse de l'état du workflow et logique de continuation uniquement.
- Limites : Ne présumez d'aucune connaissance au-delà de ce qui est dans le document.
- Dépendances : État du workflow existant de la session précédente.

## Séquence d'Instructions (Ne pas dévier, sauter ou optimiser)

### 1. Analyser l'État Actuel

**Évaluation de l'État :**
Passez en revue le frontmatter pour comprendre :

- `stepsCompleted` : Quelles étapes sont déjà terminées.
- `lastStep` : Le numéro de la dernière étape terminée.
- `inputDocuments` : Quel contexte a déjà été chargé.
- Toutes les autres variables du frontmatter.

### 2. Restaurer les Documents de Contexte

**Rechargement du Contexte :**

- Pour chaque document dans `inputDocuments`, chargez le fichier complet.
- Cela garantit que vous avez tout le contexte pour la continuation.
- Ne découvrez pas de nouveaux documents — rechargez uniquement ce qui a été traité précédemment.
- Maintenez le même contexte qu'au moment de l'interruption du workflow.

### 3. Présenter la Progression Actuelle

**Rapport de Progression à l'Utilisateur :**
"Ravi de vous retrouver {{user_name}} ! Je reprends notre collaboration sur le brief produit de {{project_name}}.

**Progression Actuelle :**

- Étapes terminées : {stepsCompleted}
- Dernier travail effectué : Étape {lastStep}
- Documents de contexte disponibles : {len(inputDocuments)} fichiers

**État du Document :**

- Le brief produit actuel est prêt avec toutes les sections terminées.
- Prêt à continuer là où nous nous sommes arrêtés.

Cela vous semble-t-il correct, ou souhaitez-vous faire des ajustements avant de continuer ?"

### 4. Déterminer le Chemin de Continuation

**Logique de l'Étape Suivante :**
En vous basant sur la valeur de `lastStep`, déterminez quel fichier d'étape charger ensuite :

- Si `lastStep = 1` → Chargez `./step-02-vision.md`.
- Si `lastStep = 2` → Chargez `./step-03-users.md`.
- Si `lastStep = 3` → Chargez `./step-04-metrics.md`.
- Continuez ce schéma pour toutes les étapes.
- Si `lastStep = 6` → Workflow déjà terminé.

### 5. Gérer la Fin de Workflow

**Si le workflow est déjà terminé (`lastStep = 6`) :**
"Excellente nouvelle ! Il semble que nous ayons déjà terminé le workflow du brief produit pour {{project_name}}.

Le document final est disponible à l'emplacement `{outputFile}` avec toutes les sections complétées jusqu'à l'étape 6.

Souhaitez-vous que je :

- Passe en revue le brief produit terminé avec vous.
- Suggère les prochaines étapes du workflow (comme la création du PRD).
- Commence une nouvelle révision du brief produit.

Qu'est-ce qui vous serait le plus utile ?"

### 6. Présenter les OPTIONS DU MENU

**Si le workflow n'est pas terminé :**
Affichez : "Prêt à continuer avec l'Étape {nextStepNumber} : {nextStepTitle} ?

**Sélectionnez une Option :** [C] Continuer vers l'Étape {nextStepNumber}"

#### Logique de Gestion du Menu :

- SI C : Lisez complètement et suivez le fichier de l'étape suivante approprié en fonction de `lastStep`.
- SI Tout autre commentaire ou requête : répondez et réaffichez le menu.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- UNIQUEMENT passer à l'étape suivante lorsque l'utilisateur sélectionne 'C'.
- L'utilisateur peut discuter ou poser des questions sur la progression actuelle.

## NOTE CRITIQUE DE FIN D'ÉTAPE

UNIQUEMENT LORSQUE [l'option C Continuer] est sélectionnée et que [l'état actuel est confirmé], vous devrez alors lire complètement et suivre le fichier de l'étape suivante approprié pour reprendre le workflow.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Tous les documents sources précédents rechargés avec succès.
- État actuel du workflow analysé et présenté avec précision.
- L'utilisateur confirme la compréhension de la progression avant continuation.
- Étape suivante correcte identifiée et préparée pour le chargement.
- Chemin de continuation correct déterminé en fonction de `lastStep`.

### ❌ ÉCHEC DU SYSTÈME :

- Découvrir de nouveaux documents sources au lieu de recharger les existants.
- Modifier le contenu d'étapes déjà terminées.
- Charger la mauvaise étape suivante en se basant sur la valeur de `lastStep`.
- Continuer sans confirmation de l'état actuel par l'utilisateur.
- Ne pas maintenir la cohérence du contexte par rapport à la session précédente.

**Règle Maîtresse :** Sauter des étapes, optimiser les séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.
