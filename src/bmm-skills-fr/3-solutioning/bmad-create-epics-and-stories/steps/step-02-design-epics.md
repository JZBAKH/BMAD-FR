# Étape 2 : Concevoir la liste des thèmes (Epic List)

## OBJECTIF DE L'ÉTAPE :

Concevoir et obtenir l'approbation pour l'epics_list qui organisera toutes les exigences en thèmes (epics) centrés sur la valeur utilisateur.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans intervention de l'utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE selon le style de communication de votre Agent avec la config `{communication_language}`

### Renforcement du rôle :

- ✅ Vous êtes un stratège produit et un rédacteur de spécifications techniques
- ✅ Si on vous a déjà donné des patterns de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas une commande-réponse
- ✅ Vous apportez votre expertise en stratégie produit et conception de thèmes
- ✅ L'utilisateur apporte sa vision produit et ses priorités

### Règles spécifiques à l'étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la création de l'epics_list
- 🚫 INTERDIT de créer des stories individuelles à cette étape
- 💬 Organisez les thèmes autour de la valeur utilisateur, pas des couches techniques
- 🚪 OBTENEZ une approbation explicite pour l'epics_list
- 🔗 **CRITIQUE : Chaque thème doit être autonome et permettre les thèmes futurs sans nécessiter les thèmes futurs pour fonctionner**

## PROTOCOLES D'EXÉCUTION :

- 🎯 Concevez les thèmes en collaboration sur la base des exigences extraites
- 💾 Mettez à jour {{epics_list}} dans {planning_artifacts}/epics.md
- 📖 Documentez la cartographie de couverture des FR
- 🚫 INTERDIT de charger l'étape suivante tant que l'utilisateur n'a pas approuvé l'epics_list

## PROCESSUS DE CONCEPTION DES THÈMES :

### 1. Réviser les exigences extraites

Chargez {planning_artifacts}/epics.md et révisez :

- **Exigences fonctionnelles :** Comptez et révisez les FR de l'étape 1
- **Exigences non fonctionnelles :** Révisez les NFR à traiter
- **Exigences supplémentaires :** Révisez les exigences techniques et UX

### 2. Expliquer les principes de conception des thèmes

**PRINCIPES DE CONCEPTION DES THÈMES :**

1. **Valeur utilisateur d'abord** : Chaque thème doit permettre aux utilisateurs d'accomplir quelque chose de significatif
2. **Regroupement des exigences** : Regroupez les FR liées qui livrent des résultats utilisateur cohérents
3. **Livraison incrémentale** : Chaque thème doit livrer de la valeur indépendamment
4. **Flux logique** : Progression naturelle du point de vue de l'utilisateur
5. **Sans dépendance au sein du thème** : Les stories au sein d'un thème ne DOIVENT PAS dépendre de stories futures
6. **Efficacité d'implémentation** : Envisagez de consolider les thèmes qui modifient tous les mêmes fichiers cœur en moins de thèmes

**⚠️ PRINCIPE CRITIQUE :**
Organisez par VALEUR UTILISATEUR, pas par couches techniques :

**✅ Exemples CORRECTS de thèmes (Autonomes & permettant les thèmes futurs) :**

- Thème 1 : Authentification & profils utilisateur (les utilisateurs peuvent s'inscrire, se connecter, gérer leurs profils) — **Autonome : Système d'auth complet**
- Thème 2 : Création de contenu (les utilisateurs peuvent créer, éditer, publier du contenu) — **Autonome : Utilise l'auth, crée du contenu**
- Thème 3 : Interaction sociale (les utilisateurs peuvent suivre, commenter, aimer du contenu) — **Autonome : Utilise l'auth + contenu**
- Thème 4 : Recherche & découverte (les utilisateurs peuvent trouver du contenu et d'autres utilisateurs) — **Autonome : Utilise tout ce qui précède**

**❌ Exemples INCORRECTS de thèmes (couches techniques ou dépendances) :**

- Thème 1 : Configuration de la base de données (crée toutes les tables d'avance) — **Aucune valeur utilisateur**
- Thème 2 : Développement API (construit tous les endpoints) — **Aucune valeur utilisateur**
- Thème 3 : Composants frontend (crée des composants réutilisables) — **Aucune valeur utilisateur**
- Thème 4 : Pipeline de déploiement (configuration CI/CD) — **Aucune valeur utilisateur**

**❌ Exemples INCORRECTS de thèmes (Churn de fichiers sur le même composant) :**

- Thème 1 : Upload de fichiers (modifie modèle, contrôleur, formulaire web, API web)
- Thème 2 : Statut de fichiers (modifie modèle, contrôleur, formulaire web, API web)
- Thème 3 : Permissions d'accès aux fichiers (modifie modèle, contrôleur, formulaire web, API web)
- Les trois thèmes touchent les mêmes fichiers — consolidez en un seul thème avec des stories ordonnées

**✅ Alternative CORRECTE :**

- Thème 1 : Amélioration de la gestion des fichiers (upload, statut, permissions comme stories au sein d'un seul thème)
- Justification : Composant unique, entièrement pré-conçu, aucune boucle de rétroaction entre les thèmes

**🔗 RÈGLES DE DÉPENDANCE :**

- Chaque thème doit livrer une fonctionnalité COMPLÈTE pour son domaine
- Le thème 2 ne doit pas nécessiter le thème 3 pour fonctionner
- Le thème 3 peut s'appuyer sur les thèmes 1 & 2 mais doit rester autonome

### 3. Concevoir la structure des thèmes en collaboration

**Étape A : Évaluer le contexte et identifier les thématiques**

Évaluez d'abord la part de la conception de la solution déjà validée (Architecture, UX, Design de tests).
Lorsque le résultat est certain et que les changements de direction entre thèmes sont peu probables, préférez moins de thèmes mais plus larges.
Divisez en plusieurs thèmes lorsqu'il y a une véritable frontière de risque ou lorsqu'un retour précoce pourrait modifier la direction
des thèmes suivants.

Ensuite, identifiez les thématiques de valeur utilisateur :

- Recherchez des regroupements naturels dans les FR
- Identifiez les parcours ou les flux utilisateur
- Considérez les types d'utilisateurs et leurs objectifs

**Étape B : Proposer la structure des thèmes**

Pour chaque thème proposé (en considérant si les thèmes partagent les mêmes fichiers cœur) :

1. **Titre du thème** : Centré sur l'utilisateur, focalisé sur la valeur
2. **Résultat utilisateur** : Ce que les utilisateurs peuvent accomplir après ce thème
3. **Couverture des FR** : Quels numéros de FR ce thème adresse
4. **Notes d'implémentation** : Toute considération technique ou UX

**Étape C : Réviser pour le chevauchement de fichiers**

Évaluez si plusieurs thèmes proposés ciblent à plusieurs reprises les mêmes fichiers cœur. Si le chevauchement est significatif :

- Distinguez le chevauchement significatif (même composant de bout en bout) du partage incident
- Demandez s'il faut consolider en un seul thème avec des stories ordonnées
- Si confirmé, fusionnez les FR du thème en un seul thème, en préservant le flux de dépendance : chaque story doit toujours tenir dans
  le contexte d'un seul agent dev

**Étape D : Créer l'epics_list**

Formatez l'epics_list comme suit :

```
## Epic List

### Epic 1: [Titre du thème]
[Énoncé d'objectif du thème — ce que les utilisateurs peuvent accomplir]
**FRs covered:** FR1, FR2, FR3, etc.

### Epic 2: [Titre du thème]
[Énoncé d'objectif du thème — ce que les utilisateurs peuvent accomplir]
**FRs covered:** FR4, FR5, FR6, etc.

[Continuer pour tous les thèmes]
```

### 4. Présenter la liste des thèmes pour révision

Affichez l'epics_list complète à l'utilisateur avec :

- Nombre total de thèmes
- Couverture de FR par thème
- Valeur utilisateur livrée par chaque thème
- Toute dépendance naturelle

### 5. Créer la cartographie de couverture des exigences

Créez {{requirements_coverage_map}} montrant comment chaque FR correspond à un thème :

```
### FR Coverage Map

FR1: Epic 1 - [Brève description]
FR2: Epic 1 - [Brève description]
FR3: Epic 2 - [Brève description]
...
```

Cela garantit qu'aucune FR ne soit oubliée.

### 6. Affinement collaboratif

Demandez à l'utilisateur :

- « Cette structure de thèmes correspond-elle à votre vision produit ? »
- « Tous les résultats utilisateur sont-ils correctement capturés ? »
- « Faut-il ajuster certains regroupements de thèmes ? »
- « Y a-t-il des dépendances naturelles que nous avons manquées ? »

### 7. Obtenir l'approbation finale

**CRITIQUE :** Doit obtenir l'approbation explicite de l'utilisateur :
« Approuvez-vous cette structure de thèmes pour passer à la création de stories ? »

Si l'utilisateur souhaite des changements :

- Effectuez les ajustements demandés
- Mettez à jour l'epics_list
- Re-présentez pour approbation
- Répétez jusqu'à obtention de l'approbation

## CONTENU À METTRE À JOUR DANS LE DOCUMENT :

Après approbation, mettez à jour {planning_artifacts}/epics.md :

1. Remplacez le placeholder {{epics_list}} par la liste de thèmes approuvée
2. Remplacez {{requirements_coverage_map}} par la cartographie de couverture
3. Assurez-vous que toutes les FR sont mappées aux thèmes

### 8. Présenter les OPTIONS DE MENU

Affichez : "**Sélectionnez une option :** [A] Élicitation avancée [P] Mode Party [C] Continuer"

#### Logique de gestion du menu :

- SI A : Invoquer le skill `bmad-advanced-elicitation`
- SI P : Invoquer le skill `bmad-party-mode`
- SI C : Sauvegarder l'epics_list approuvée dans {planning_artifacts}/epics.md, mettre à jour le frontmatter, puis lire entièrement et suivre : ./step-03-create-stories.md
- SI Tout autre commentaire ou requête : aider l'utilisateur à répondre puis [Réafficher les options de menu](#8-present-menu-options)

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu
- Procéder UNIQUEMENT à l'étape suivante lorsque l'utilisateur sélectionne 'C'
- Après l'exécution des autres options de menu, réafficher le menu
- L'utilisateur peut discuter ou poser des questions — toujours répondre, puis lorsque la conversation se termine, réafficher les options de menu

## NOTE CRITIQUE DE FINALISATION D'ÉTAPE

UNIQUEMENT lorsque C est sélectionné et que l'epics_list approuvée est sauvegardée dans le document, vous lirez alors entièrement et suivrez : ./step-03-create-stories.md pour commencer l'étape de création de stories.

---

## 🚨 INDICATEURS DE RÉUSSITE/ÉCHEC SYSTÈME

### ✅ RÉUSSITE :

- Thèmes conçus autour de la valeur utilisateur
- Toutes les FR mappées à des thèmes spécifiques
- epics_list créée et formatée correctement
- Cartographie de couverture des exigences terminée
- L'utilisateur donne une approbation explicite pour la structure des thèmes
- Document mis à jour avec les thèmes approuvés

### ❌ ÉCHEC SYSTÈME :

- Thèmes organisés par couches techniques
- FR manquantes dans la cartographie de couverture
- Aucune approbation utilisateur obtenue
- epics_list non sauvegardée dans le document

**Règle maîtresse :** Sauter des étapes, optimiser les séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC SYSTÈME.
