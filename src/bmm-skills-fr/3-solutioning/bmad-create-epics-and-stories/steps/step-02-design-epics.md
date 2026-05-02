# Étape 2 : Concevoir la Liste des Epics

## OBJECTIF DE L'ÉTAPE :

Concevoir et obtenir l'approbation de la liste `epics_list` qui organisera toutes les exigences en epics centrées sur la valeur utilisateur.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

### Renforcement du Rôle :

- ✅ Vous êtes un stratège produit et un rédacteur de spécifications techniques
- ✅ Si vous avez déjà reçu des modèles de communication ou des personas, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas une relation commande-réponse
- ✅ Vous apportez votre expertise en stratégie produit et conception d'epics
- ✅ L'utilisateur apporte sa vision produit et ses priorités

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur la création de la liste `epics_list`
- 🚫 INTERDICTION de créer les stories individuelles dans cette étape
- 💬 Organiser les epics autour de la valeur utilisateur, pas des couches techniques
- 🚪 OBTENIR l'approbation explicite pour la liste `epics_list`
- 🔗 **CRITIQUE : Chaque epic doit être autonome et permettre des epics futurs sans nécessiter d'epics futurs pour fonctionner**

## PROTOCOLES D'EXÉCUTION :

- 🎯 Concevoir les epics de manière collaborative sur la base des exigences extraites
- 💾 Mettre à jour {{epics_list}} dans {planning_artifacts}/epics.md
- 📖 Documenter la cartographie de couverture des FR (FR coverage mapping)
- 🚫 INTERDICTION de charger l'étape suivante tant que l'utilisateur n'a pas approuvé la liste `epics_list`

## PROCESSUS DE CONCEPTION DES EPICS :

### 1. Revoir les Exigences Extraites

Charger {planning_artifacts}/epics.md et revoir :

- **Exigences Fonctionnelles** : Compter et revoir les FR de l'Étape 1
- **Exigences Non-Fonctionnelles** : Revoir les NFR qui doivent être traitées
- **Exigences Supplémentaires** : Revoir les exigences techniques et UX

### 2. Expliquer les Principes de Conception des Epics

**PRINCIPES DE CONCEPTION DES EPICS :**

1. **La Valeur Utilisateur d'Abord** : Chaque epic doit permettre aux utilisateurs d'accomplir quelque chose de significatif.
2. **Regroupement des Exigences** : Regrouper les FR liées qui produisent des résultats utilisateur cohérents.
3. **Livraison Incrémentale** : Chaque epic doit livrer de la valeur indépendamment.
4. **Flux Logique** : Progression naturelle du point de vue de l'utilisateur.
5. **🔗 Sans Dépendance à l'Intérieur de l'Epic** : Les stories à l'intérieur d'une epic ne doivent PAS dépendre de stories futures.

**⚠️ PRINCIPE CRITIQUE :**
Organiser par VALEUR UTILISATEUR, pas par couches techniques :

**✅ Exemples d'Epics CORRECTS (Autonomes et activant les Epics futurs) :**

- Epic 1 : Authentification & Profils Utilisateurs (les utilisateurs peuvent s'inscrire, se connecter, gérer leurs profils) - **Autonome : Système d'auth complet**
- Epic 2 : Création de Contenu (les utilisateurs peuvent créer, éditer, publier du contenu) - **Autonome : Utilise l'auth, crée du contenu**
- Epic 3 : Interaction Sociale (les utilisateurs peuvent suivre, commenter, liker du contenu) - **Autonome : Utilise l'auth + le contenu**
- Epic 4 : Recherche & Découverte (les utilisateurs peuvent trouver du contenu et d'autres utilisateurs) - **Autonome : Utilise tout ce qui précède**

**❌ Exemples d'Epics MAUVAIS (Couches Techniques ou Dépendances) :**

- Epic 1 : Configuration de la Base de Données (crée toutes les tables à l'avance) - **Aucune valeur utilisateur**
- Epic 2 : Développement de l'API (construit tous les points de terminaison) - **Aucune valeur utilisateur**
- Epic 3 : Composants Frontend (crée des composants réutilisables) - **Aucune valeur utilisateur**
- Epic 4 : Pipeline de Déploiement (configuration CI/CD) - **Aucune valeur utilisateur**

**🔗 RÈGLES DE DÉPENDANCE :**

- Chaque epic doit livrer une fonctionnalité COMPLÈTE pour son domaine.
- L'Epic 2 ne doit pas nécessiter l'Epic 3 pour fonctionner.
- L'Epic 3 peut s'appuyer sur les Epics 1 & 2 mais doit pouvoir se tenir seule.

### 3. Concevoir la Structure des Epics de Manière Collaborative

**Étape A : Identifier les Thèmes de Valeur Utilisateur**

- Rechercher des regroupements naturels dans les FR
- Identifier les parcours utilisateurs ou les workflows
- Considérer les types d'utilisateurs et leurs objectifs

**Étape B : Proposer la Structure des Epics**
Pour chaque epic proposée :

1. **Titre de l'Epic** : Centré sur l'utilisateur, focalisé sur la valeur
2. **Résultat Utilisateur** : Ce que les utilisateurs peuvent accomplir après cette epic
3. **Couverture des FR** : Quels numéros de FR cette epic traite
4. **Notes d'Implémentation** : Toutes considérations techniques ou UX

**Étape C : Créer la liste `epics_list`**

Formater la liste `epics_list` comme suit :

```
## Liste des Epics

### Epic 1 : [Titre de l'Epic]
[Énoncé de l'objectif de l'Epic - ce que les utilisateurs peuvent accomplir]
**FR couvertes :** FR1, FR2, FR3, etc.

### Epic 2 : [Titre de l'Epic]
[Énoncé de l'objectif de l'Epic - ce que les utilisateurs peuvent accomplir]
**FR couvertes :** FR4, FR5, FR6, etc.

[Continuer pour toutes les epics]
```

### 4. Présenter la Liste des Epics pour Révision

Afficher la liste intégrale `epics_list` à l'utilisateur avec :

- Nombre total d'epics
- Couverture des FR par epic
- Valeur utilisateur livrée par chaque epic
- Toutes les dépendances naturelles

### 5. Créer la Carte de Couverture des Exigences

Créer {{requirements_coverage_map}} montrant comment chaque FR est associée à une epic :

```
### Carte de Couverture des FR

FR1 : Epic 1 - [Brève description]
FR2 : Epic 1 - [Brève description]
FR3 : Epic 2 - [Brève description]
...
```

Ceci garantit qu'aucune FR n'est oubliée.

### 6. Affinement Collaboratif

Demander à l'utilisateur :

- "Cette structure d'epics correspond-elle à votre vision produit ?"
- "Tous les résultats utilisateur sont-ils correctement capturés ?"
- "Devrions-nous ajuster certains regroupements d'epics ?"
- "Y a-t-il des dépendances naturelles que nous avons oubliées ?"

### 7. Obtenir l'Approbation Finale

**CRITIQUE :** Doit obtenir l'approbation explicite de l'utilisateur :
"Approuvez-vous cette structure d'epics pour passer à la création des stories ?"

Si l'utilisateur souhaite des changements :

- Effectuer les ajustements demandés
- Mettre à jour la liste `epics_list`
- Représenter pour approbation
- Répéter jusqu'à obtention de l'approbation

## CONTENU À METTRE À JOUR DANS LE DOCUMENT :

Après approbation, mettre à jour {planning_artifacts}/epics.md :

1. Remplacer l'espace réservé {{epics_list}} par la liste des epics approuvée
2. Remplacer {{requirements_coverage_map}} par la carte de couverture
3. S'assurer que toutes les FR sont cartographiées vers des epics

### 8. Présenter les OPTIONS DU MENU

Afficher : "**Sélectionnez une Option :** [A] Élicitation Avancée [P] Mode Party [C] Continuer"

#### Logique de Gestion du Menu :

- SI A : Invoquer le skill `bmad-advanced-elicitation`
- SI P : Invoquer le skill `bmad-party-mode`
- SI C : Sauvegarder la liste `epics_list` approuvée dans {planning_artifacts}/epics.md, mettre à jour le frontmatter, puis lisez intégralement et suivez : ./step-03-create-stories.md
- SI tout autre commentaire ou requête : aider l'utilisateur à répondre puis [Réafficher le Menu des Options](#8-présenter-les-options-du-menu)

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu
- Ne passer à l'étape suivante que lorsque l'utilisateur sélectionne 'C'
- Une fois l'exécution des autres éléments du menu terminée, réafficher le menu
- L'utilisateur peut discuter ou poser des questions - répondez toujours quand la conversation se termine, réaffichez les options du menu

## NOTE CRITIQUE D'ACHÈVEMENT D'ÉTAPE

UNIQUEMENT lorsque 'C' est sélectionné et que la liste `epics_list` approuvée est sauvegardée dans le document, vous lirez alors intégralement et suivrez : ./step-03-create-stories.md pour commencer l'étape de création des stories.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Epics conçues autour de la valeur utilisateur
- Toutes les FR cartographiées vers des epics spécifiques
- `epics_list` créée et formatée correctement
- Carte de couverture des exigences complétée
- L'utilisateur donne son approbation explicite pour la structure des epics
- Document mis à jour avec les epics approuvées

### ❌ ÉCHEC DU SYSTÈME :

- Epics organisées par couches techniques
- FR manquantes dans la carte de couverture
- Aucune approbation de l'utilisateur obtenue
- `epics_list` non sauvegardée dans le document

**Règle Maîtresse** : Sauter des étapes, optimiser les séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.
