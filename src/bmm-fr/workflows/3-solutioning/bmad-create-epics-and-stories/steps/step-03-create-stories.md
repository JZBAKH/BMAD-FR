# Étape 3 : Générer les Epics et les Stories

## OBJECTIF DE L'ÉTAPE :

Générer toutes les epics avec leurs stories sur la base de la liste `epics_list` approuvée, en suivant exactement la structure du modèle.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre toute action
- 🔄 CRITIQUE : Traiter les epics séquentiellement
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

### Renforcement du Rôle :

- ✅ Vous êtes un stratège produit et un rédacteur de spécifications techniques
- ✅ Si vous avez déjà reçu des modèles de communication ou des personas, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas une relation commande-réponse
- ✅ Vous apportez votre expertise en création de stories et en critères d'acceptation
- ✅ L'utilisateur apporte ses priorités d'implémentation et ses contraintes

### Règles Spécifiques à l'Étape :

- 🎯 Générer les stories pour chaque epic en suivant exactement le modèle
- 🚫 INTERDICTION de dévier de la structure du modèle
- 💬 Chaque story doit avoir des critères d'acceptation clairs
- 🚪 S'ASSURER que chaque story est réalisable par un seul agent de développement
- 🔗 **CRITIQUE : Les stories ne doivent PAS dépendre de stories futures à l'intérieur de la même epic**

## PROTOCOLES D'EXÉCUTION :

- 🎯 Générer les stories de manière collaborative avec l'utilisateur
- 💾 Ajouter les epics et les stories à {planning_artifacts}/epics.md en suivant le modèle
- 📖 Traiter les epics une par une, dans l'ordre
- 🚫 INTERDICTION de sauter une epic ou de précipiter la création des stories

## PROCESSUS DE GÉNÉRATION DES STORIES :

### 1. Charger la Structure des Epics Approuvée

Charger {planning_artifacts}/epics.md et revoir :

- La liste `epics_list` approuvée à l'Étape 2
- La carte de couverture des FR
- Toutes les exigences (FR, NFR, supplémentaires, **exigences de Design UX si présentes**)
- La structure du modèle à la fin du document

**Intégration du Design UX** : Si des Exigences de Design UX (UX-DR) ont été extraites à l'Étape 1, assurez-vous qu'elles sont visibles pendant la création des stories. Les UX-DR doivent être couvertes par des stories — soit au sein des epics existantes (ex: corrections d'accessibilité pour une epic de fonctionnalité), soit dans une epic dédiée "Design System / Polissage UX".

### 2. Expliquer l'Approche de Création des Stories

**DIRECTIVES DE CRÉATION DES STORIES :**

Pour chaque epic, créer des stories qui :

- Suivent exactement la structure du modèle
- Sont dimensionnées pour être réalisées par un seul agent de développement
- Ont une valeur utilisateur claire
- Incluent des critères d'acceptation spécifiques
- Font référence aux exigences satisfaites

**🚨 PRINCIPE DE CRÉATION DE BASE DE DONNÉES / ENTITÉS :**
Créer les tables/entités UNIQUEMENT lorsque nécessaire pour la story :

- ❌ MAUVAIS : L'Epic 1 Story 1 crée les 50 tables de la base de données à l'avance.
- ✅ CORRECT : Chaque story crée/modifie UNIQUEMENT les tables dont elle a besoin.

**🔗 PRINCIPE DE DÉPENDANCE DES STORIES :**
Les stories doivent pouvoir être achevées indépendamment et séquentiellement :

- ❌ MAUVAIS : La Story 1.2 nécessite que la Story 1.3 soit terminée de prime abord.
- ✅ CORRECT : Chaque story peut être terminée en se basant uniquement sur les stories précédentes.
- ❌ MAUVAIS : "Attendez que la Story 1.4 soit implémentée avant que cela ne fonctionne."
- ✅ CORRECT : "Cette story fonctionne indépendamment et permet les stories futures."

**FORMAT DE LA STORY (issu du modèle) :**

```
### Story {N}.{M} : {story_title}

En tant que {user_type},
Je veux {capability},
Afin de {value_benefit}.

**Critères d'Acceptation :**

**Étant donné** {precondition}
**Quand** {action}
**Alors** {expected_outcome}
**Et** {additional_criteria}
```

**✅ EXEMPLES DE BONNES STORIES :**

_Epic 1 : Authentification Utilisateur_

- Story 1.1 : Inscription utilisateur avec Email
- Story 1.2 : Connexion utilisateur avec Mot de passe
- Story 1.3 : Réinitialisation du mot de passe via Email

_Epic 2 : Création de Contenu_

- Story 2.1 : Créer un nouvel article de blog
- Story 2.2 : Éditer un article de blog existant
- Story 2.3 : Publier un article de blog

**❌ EXEMPLES DE MAUVAISES STORIES :**

- Story : "Configurer la base de données" (aucune valeur utilisateur)
- Story : "Créer tous les modèles" (trop volumineux, aucune valeur utilisateur)
- Story : "Construire le système d'authentification" (trop volumineux)
- Story : "UI de connexion (dépend du point de terminaison API de la Story 1.3)" (dépendance future !)
- Story : "Éditer l'article (nécessite que la Story 1.4 soit d'abord implémentée)" (mauvais ordre !)

### 3. Traiter les Epics Séquentiellement

Pour chaque epic de la liste `epics_list` approuvée :

#### A. Vue d'Ensemble de l'Epic

Afficher :

- Numéro et titre de l'epic
- Énoncé de l'objectif de l'epic
- FR couvertes par cette epic
- Toutes les NFR ou exigences supplémentaires pertinentes
- Toutes les exigences de Design UX (UX-DR) pertinentes pour cette epic

#### B. Décomposition en Stories

Travailler avec l'utilisateur pour décomposer l'epic en stories :

- Identifier les capacités utilisateur distinctes
- Assurer un flux logique à l'intérieur de l'epic
- Dimensionner les stories de manière appropriée

#### C. Générer Chaque Story

Pour chaque story de l'epic :

1. **Titre de la Story** : Clair, orienté action
2. **User Story** : Compléter le format En tant que/Je veux/Afin de
3. **Critères d'Acceptation** : Rédiger des critères spécifiques et testables

**Directives de rédaction des Critères d'Acceptation (AC) :**

- Utiliser le format Étant donné/Quand/Alors
- Chaque AC doit être testable indépendamment
- Inclure les cas limites et les conditions d'erreur
- Faire référence aux exigences spécifiques le cas échéant

#### D. Révision Collaborative

Après avoir rédigé chaque story :

- Présenter la story à l'utilisateur
- Demander : "Cette story capture-t-elle correctement l'exigence ?"
- "La portée est-elle appropriée pour une seule session de développement ?"
- "Les critères d'acceptation sont-ils complets et testables ?"

#### E. Ajouter au Document

Lorsque la story est approuvée :

- L'ajouter à {planning_artifacts}/epics.md en suivant la structure du modèle
- Utiliser la numérotation correcte (Epic N, Story M)
- Maintenir un formatage Markdown approprié

### 4. Achèvement de l'Epic

Une fois que toutes les stories d'une epic sont terminées :

- Afficher le résumé de l'epic
- Montrer le nombre de stories créées
- Vérifier que toutes les FR de l'epic sont couvertes
- Obtenir la confirmation de l'utilisateur pour passer à l'epic suivante

### 5. Répéter pour Toutes les Epics

Continuer le processus pour chaque epic de la liste approuvée, en les traitant dans l'ordre (Epic 1, Epic 2, etc.).

### 6. Finalisation du Document

Une fois que toutes les epics et stories sont générées :

- Vérifier que le document suit exactement la structure du modèle
- S'assurer que tous les espaces réservés sont remplacés
- Confirmer que toutes les FR sont couvertes
- **Confirmer que toutes les exigences de Design UX (UX-DR) sont couvertes par au moins une story** (si le document UX était une entrée)
- Vérifier la cohérence du formatage

## CONFORMITÉ À LA STRUCTURE DU MODÈLE :

Le document final {planning_artifacts}/epics.md doit suivre exactement cette structure :

1. Section **Vue d'Ensemble** avec le nom du projet
2. **Inventaire des Exigences** avec les trois sous-sections remplies
3. **Carte de Couverture des FR** montrant la correspondance exigence -> epic
4. **Liste des Epics** avec la structure d'epics approuvée
5. Sections **Epic** pour chaque epic (N = 1, 2, 3...)
   - Titre et objectif de l'epic
   - Toutes les stories pour cette epic (M = 1, 2, 3...)
     - Titre de la story et user story
     - Critères d'Acceptation utilisant le format Étant donné/Quand/Alors

### 7. Présenter les OPTIONS FINALES DU MENU

Une fois que toutes les epics et stories sont terminées :

Afficher : "**Sélectionnez une Option :** [A] Élicitation Avancée [P] Mode Party [C] Continuer"

#### Logique de Gestion du Menu :

- SI A : Invoquer le skill `bmad-advanced-elicitation`
- SI P : Invoquer le skill `bmad-party-mode`
- SI C : Sauvegarder le contenu dans {planning_artifacts}/epics.md, mettre à jour le frontmatter, puis lisez intégralement et suivez : ./step-04-final-validation.md
- SI tout autre commentaire ou requête : aider l'utilisateur à répondre puis [Réafficher le Menu des Options](#7-présenter-les-options-finales-du-menu)

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu
- Ne passer à l'étape suivante que lorsque l'utilisateur sélectionne 'C'
- Après l'exécution des autres éléments du menu, revenir à ce menu
- L'utilisateur peut discuter ou poser des questions - répondez toujours et terminez par l'affichage à nouveau des options du menu

## NOTE CRITIQUE D'ACHÈVEMENT D'ÉTAPE

UNIQUEMENT lorsque l'[option Continuer C] est sélectionnée et que [toutes les epics et stories sont sauvegardées dans le document en suivant exactement la structure du modèle], vous lirez alors intégralement et suivrez : `./step-04-final-validation.md` pour commencer la phase de validation finale.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Toutes les epics traitées en séquence
- Stories créées pour chaque epic
- Structure du modèle suivie exactement
- Toutes les FR couvertes par les stories
- Stories dimensionnées de manière appropriée
- Les critères d'acceptation sont spécifiques et testables
- Le document est complet et prêt pour le développement

### ❌ ÉCHEC DU SYSTÈME :

- Déviation par rapport à la structure du modèle
- Epics ou stories manquantes
- Stories trop volumineuses ou imprécises
- Critères d'acceptation manquants
- Non-respect du formatage approprié

**Règle Maîtresse** : Sauter des étapes, optimiser les séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.
