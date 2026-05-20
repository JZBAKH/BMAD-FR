---
# Références de fichiers
outputFile: '{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md'
---

# Étape 2 : Découverte de la Vision Produit

## OBJECTIF DE L'ÉTAPE :

Mener une découverte complète de la vision produit pour définir le problème central, la solution et la proposition de valeur unique via une analyse collaborative.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- 📖 CRITIQUE : Lisez l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS RÉDIGER tout le contenu de l'artefact et du document en `{document_output_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un facilitateur Business Analyst orienté produit.
- ✅ Si un nom, un style de communication et un persona vous ont déjà été attribués, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une relation commande-réponse.
- ✅ Vous apportez une pensée structurée et des compétences de facilitation, tandis que l'utilisateur apporte son expertise métier et sa vision produit.
- ✅ Maintenez un ton de découverte collaborative tout au long du processus.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous uniquement sur la découverte de la vision produit, du problème et de la solution.
- 🚫 INTERDICTION de générer une vision sans une réelle interaction et collaboration de l'utilisateur.
- 💬 Approche : Découverte systématique, du problème vers la solution.
- 📋 Découverte COLLABORATIVE, pas une élaboration de vision basée sur des suppositions.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- 💾 Générez le contenu de la vision en collaboration avec l'utilisateur.
- 📖 Mettez à jour le frontmatter `stepsCompleted: [1, 2]` avant de charger l'étape suivante.
- 🚫 INTERDICTION de continuer sans confirmation de l'utilisateur via le menu.

## LIMITES DE CONTEXTE :

- Contexte disponible : Document actuel et frontmatter de l'étape 1, documents sources déjà chargés en mémoire.
- Focus : Il s'agira de la première section de contenu ajoutée au document.
- Limites : Concentrez-vous sur une vision produit et un énoncé du problème clairs et convaincants.
- Dépendances : L'initialisation du document de l'étape 01 doit être terminée.

## Séquence d'Instructions (Ne pas dévier, sauter ou optimiser)

### 1. Commencer la Découverte de la Vision

**Conversation d'ouverture :**
"En tant que partenaire PM, je suis ravi de vous aider à façonner la vision de {{project_name}}. Commençons par les fondations.

**Dites-m'en plus sur le produit que vous imaginez :**

- Quel problème central essayez-vous de résoudre ?
- Qui ressent ce problème de la manière la plus aiguë ?
- À quoi ressemblerait le succès pour les personnes que vous aidez ?
- Qu'est-ce qui vous excite le plus dans cette solution ?

Commençons par l'espace du problème avant d'aborder les solutions."

### 2. Compréhension Approfondie du Problème

**Découverte du Problème :**
Explorez le problème sous plusieurs angles à l'aide de questions ciblées :

- Comment les gens résolvent-ils actuellement ce problème ?
- Qu'est-ce qui est frustrant dans les solutions actuelles ?
- Que se passe-t-il si ce problème n'est pas résolu ?
- Qui ressent cette douleur le plus intensément ?

### 3. Analyse des Solutions Actuelles

**Paysage Concurrentiel :**

- Quelles solutions existent aujourd'hui ?
- Où échouent-elles ?
- Quelles lacunes laissent-elles béantes ?
- Pourquoi les solutions existantes n'ont-elles pas résolu cela complètement ?

### 4. Vision de la Solution

**Élaboration Collaborative de la Solution :**

- Si nous pouvions résoudre cela parfaitement, à quoi cela ressemblerait-il ?
- Quelle est la manière la plus simple de faire une différence significative ?
- Qu'est-ce qui différencie votre approche de ce qui existe déjà ?
- Qu'est-ce qui ferait dire aux utilisateurs 'c'est exactement ce dont j'avais besoin' ?

### 5. Différenciateurs Uniques

**Avantage Concurrentiel :**

- Quel est votre avantage injuste (unfair advantage) ?
- Qu'est-ce qui serait difficile à copier pour les concurrents ?
- Quelle intuition ou approche est unique à votre projet ?
- Pourquoi est-ce le bon moment pour cette solution ?

### 6. Générer le Contenu du Résumé Opérationnel

**Contenu à Ajouter :**
Préparez la structure suivante pour l'ajout au document :

```markdown
## Résumé Opérationnel (Executive Summary)

[Contenu du résumé opérationnel basé sur la conversation]

---

## Vision Centrale

### Énoncé du Problème

[Contenu de l'énoncé du problème basé sur la conversation]

### Impact du Problème

[Contenu de l'impact du problème basé sur la conversation]

### Pourquoi les Solutions Actuelles Échouent

[Analyse des lacunes des solutions actuelles basée sur la conversation]

### Solution Proposée

[Description de la solution proposée basée sur la conversation]

### Différenciateurs Clés

[Différenciateurs clés basés sur la conversation]
```

### 7. Présenter les OPTIONS DU MENU

**Présentation du Contenu :**
"J'ai rédigé le résumé opérationnel et la vision centrale en me basant sur notre échange. Cela capture l'essence de {{project_name}} et ce qui le rend spécial.

**Voici ce que je vais ajouter au document :**
[Afficher le contenu markdown complet de l'étape 6]

**Sélectionnez une Option :** [A] Élicitation Avancée [P] Party Mode [C] Continuer"

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de la vision pour approfondir et affiner.
- SI P : Invoquez la compétence `bmad-party-mode` pour apporter différentes perspectives sur le positionnement et la différenciation.
- SI C : Enregistrez le contenu dans `{outputFile}`, mettez à jour le frontmatter avec `stepsCompleted: [1, 2]`, puis lisez complètement et suivez : `./step-03-users.md`.
- SI Tout autre commentaire ou requête : aidez l'utilisateur à répondre puis [Réafficher les Options du Menu](#7-present-menu-options).

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- UNIQUEMENT passer à l'étape suivante lorsque l'utilisateur sélectionne 'C'.
- Après l'exécution d'autres éléments du menu, revenez à ce menu avec le contenu mis à jour.
- L'utilisateur peut discuter ou poser des questions — répondez toujours et terminez en affichant à nouveau les options du menu.

## NOTE CRITIQUE DE FIN D'ÉTAPE

UNIQUEMENT LORSQUE [l'option C Continuer] est sélectionnée et que [le contenu de la vision est finalisé et enregistré dans le document avec le frontmatter mis à jour], vous devrez alors lire complètement et suivre : `./step-03-users.md` pour commencer la découverte des utilisateurs cibles.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Énoncé du problème clair qui résonne avec les utilisateurs cibles.
- Vision de solution convaincante qui répond au problème central.
- Différenciateurs uniques qui offrent un avantage concurrentiel.
- Résumé opérationnel capturant l'essence du produit.
- Menu A/P/C présenté et géré correctement avec une exécution appropriée de la tâche.
- Contenu correctement ajouté au document lorsque C est sélectionné.
- Frontmatter mis à jour avec `stepsCompleted: [1, 2]`.

### ❌ ÉCHEC DU SYSTÈME :

- Accepter des énoncés de problème vagues sans pousser à la spécificité.
- Créer une vision de solution sans comprendre complètement le problème.
- Oublier les différenciateurs uniques ou les intuitions concurrentielles.
- Générer une vision sans réelle interaction et collaboration avec l'utilisateur.
- Ne pas présenter le menu standard A/P/C après la génération du contenu.
- Ajouter le contenu sans que l'utilisateur ait sélectionné 'C'.
- Ne pas mettre à jour le frontmatter correctement.

**Règle Maîtresse :** Sauter des étapes, optimiser les séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.
