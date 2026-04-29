# Étape 1 : Valider les Prérequis et Extraire les Exigences

## OBJECTIF DE L'ÉTAPE :

Valider que tous les documents d'entrée requis existent et extraire toutes les exigences (FR, NFR et exigences supplémentaires issues de l'UX/Architecture) nécessaires à la création des epics et des stories.

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
- ✅ Vous apportez votre expertise en extraction d'exigences
- ✅ L'utilisateur apporte sa vision produit et son contexte

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur l'extraction et l'organisation des exigences
- 🚫 INTERDICTION de commencer à créer des epics ou des stories dans cette étape
- 💬 Extraire les exigences de TOUS les documents disponibles
- 🚪 REMPLIR les sections du modèle exactement comme requis

## PROTOCOLES D'EXÉCUTION :

- 🎯 Extraire les exigences systématiquement de tous les documents
- 💾 Remplir {planning_artifacts}/epics.md avec les exigences extraites
- 📖 Mettre à jour le frontmatter avec les progrès de l'extraction
- 🚫 INTERDICTION de charger l'étape suivante tant que l'utilisateur n'a pas sélectionné 'C' et que les exigences ne sont pas extraites

## PROCESSUS D'EXTRACTION DES EXIGENCES :

### 1. Accueil et Vue d'Ensemble

Bienvenue {user_name} dans la création complète des epics et des stories !

**VALIDATION CRITIQUE DES PRÉREQUIS :**

Vérifier que les documents requis existent et sont complets :

1. **PRD.md** - Contient les exigences (FR et NFR) et la portée du produit
2. **Architecture.md** - Contient les décisions techniques, les contrats d'API, les modèles de données
3. **UX Design.md** (si l'UI existe) - Contient les modèles d'interaction, les maquettes, les flux utilisateurs

### 2. Découverte et Validation des Documents

Rechercher les documents requis en utilisant ces modèles (fragmenté signifie qu'un document volumineux a été divisé en plusieurs petits fichiers avec un index.md dans un dossier) - si le document complet est trouvé, utilisez-le à la place de la version fragmentée :

**Priorité de Recherche du Document PRD :**

1. `{planning_artifacts}/*prd*.md` (document complet)
2. `{planning_artifacts}/*prd*/index.md` (version fragmentée)

**Priorité de Recherche du Document d'Architecture :**

1. `{planning_artifacts}/*architecture*.md` (document complet)
2. `{planning_artifacts}/*architecture*/index.md` (version fragmentée)

**Recherche du Document de Design UX (Optionnel) :**

1. `{planning_artifacts}/*ux*.md` (document complet)
2. `{planning_artifacts}/*ux*/index.md` (version fragmentée)

Avant de continuer, demandez à l'utilisateur s'il y a d'autres documents à inclure pour l'analyse, et si des éléments trouvés doivent être exclus. Attendez la confirmation de l'utilisateur. Une fois confirmé, créez le fichier {planning_artifacts}/epics.md à partir de ../templates/epics-template.md et listez les fichiers dans le tableau `inputDocuments: []` du frontmatter.

### 3. Extraire les Exigences Fonctionnelles (FR)

À partir du document PRD (complet ou fragmenté), lisez l'intégralité du document et extrayez TOUTES les exigences fonctionnelles :

**Méthode d'Extraction :**

- Rechercher les éléments numérotés comme "FR1:", "Requirement Fonctionnelle 1:", ou similaire
- Identifier les énoncés d'exigences qui décrivent ce que le système doit FAIRE
- Inclure les actions utilisateur, les comportements du système et les règles métier

**Formater la liste FR comme suit :**

```
FR1 : [Description claire et testable de l'exigence]
FR2 : [Description claire et testable de l'exigence]
...
```

### 4. Extraire les Exigences Non-Fonctionnelles (NFR)

À partir du document PRD, extrayez TOUTES les exigences non fonctionnelles :

**Méthode d'Extraction :**

- Rechercher les exigences de performance, de sécurité, d'utilisabilité, de fiabilité
- Identifier les contraintes et les attributs de qualité
- Inclure les normes techniques et les exigences de conformité

**Formater la liste NFR comme suit :**

```
NFR1 : [Exigence de Performance/Sécurité/Utilisabilité]
NFR2 : [Exigence de Performance/Sécurité/Utilisabilité]
...
```

### 5. Extraire les Exigences Supplémentaires de l'Architecture

Consulter le document d'Architecture pour les exigences techniques impactant la création des epics et des stories :

**Rechercher :**

- **Modèle de Départ (Starter Template)** : L'Architecture spécifie-t-elle un modèle de départ/greenfield ? Si OUI, documentez ceci pour l'Epic 1 Story 1
- Exigences d'infrastructure et de déploiement
- Exigences d'intégration avec des systèmes externes
- Exigences de migration ou de configuration des données
- Exigences de surveillance (monitoring) et de journalisation (logging)
- Exigences de versionnage d'API ou de compatibilité
- Exigences d'implémentation de la sécurité

**IMPORTANT** : Si un modèle de départ est mentionné dans l'Architecture, notez-le de manière proéminente. Cela impactera l'Epic 1 Story 1.

**Formater les Exigences Supplémentaires comme suit :**

```
- [Exigence technique issue de l'Architecture affectant l'implémentation]
- [Exigence de configuration d'infrastructure]
- [Exigence d'intégration]
...
```

### 6. Extraire les Exigences de Design UX (si le document UX existe)

**IMPORTANT** : La Spécification de Design UX est un document d'entrée de premier ordre, pas un matériel supplémentaire. Les exigences de la spec UX doivent être extraites avec la même rigueur que les exigences fonctionnelles du PRD.

Lisez l'INTÉGRALITÉ du document de Design UX et extrayez TOUS les éléments de travail exploitables :

**Rechercher :**

- **Travail sur les Design Tokens** : Systèmes de couleurs, échelles d'espacement, tokens de typographie nécessitant une implémentation ou une consolidation
- **Propositions de Composants** : Composants UI réutilisables identifiés dans la spec UX (ex: ConfirmActions, StatusMessage, EmptyState, FocusIndicator)
- **Standardisation Visuelle** : Classes CSS sémantiques, utilisation d'une palette de couleurs cohérente, consolidation des modèles de conception
- **Exigences d'Accessibilité** : Corrections d'audit de contraste, modèles ARIA, navigation clavier, support des lecteurs d'écran
- **Exigences de Design Responsive** : Points de rupture (breakpoints), adaptations de mise en page, interactions spécifiques au mobile
- **Modèles d'Interaction** : Animations, transitions, états de chargement, UX de gestion des erreurs
- **Compatibilité Navigateur/Appareil** : Plateformes cibles, exigences d'amélioration progressive

**Formater les Exigences de Design UX comme une section DISTINCTE (pas fusionnée avec les Exigences Supplémentaires) :**

```
UX-DR1 : [Exigence de design UX exploitable avec une portée d'implémentation claire]
UX-DR2 : [Exigence de design UX exploitable avec une portée d'implémentation claire]
...
```

**🚨 CRITIQUE** : Ne réduisez PAS les exigences UX à de vagues résumés. Chaque UX-DR doit être assez spécifique pour générer une story avec des critères d'acceptation testables. Si la spec UX identifie 6 composants réutilisables, listez les 6 — pas "créer des composants réutilisables".

### 7. Charger et Initialiser le Modèle

Charger ../templates/epics-template.md et initialiser {planning_artifacts}/epics.md :

1. Copier l'intégralité du modèle dans {planning_artifacts}/epics.md
2. Remplacer {{project_name}} par le nom réel du projet
3. Remplacer les sections génériques par les exigences extraites :
   - {{fr_list}} → FR extraites
   - {{nfr_list}} → NFR extraites
   - {{additional_requirements}} → exigences supplémentaires extraites (Architecture)
   - {{ux_design_requirements}} → exigences de Design UX extraites (si le document UX existe)
4. Laisser {{requirements_coverage_map}} et {{epics_list}} comme espaces réservés pour le moment

### 8. Présenter les Exigences Extraites

Afficher à l'utilisateur :

**Exigences Fonctionnelles Extraites :**

- Afficher le nombre de FR trouvées
- Afficher les premières FR comme exemples
- Demander si des FR sont manquantes ou incorrectement saisies

**Exigences Non-Fonctionnelles Extraites :**

- Afficher le nombre de NFR trouvées
- Afficher les NFR clés
- Demander si des contraintes ont été omises

**Exigences Supplémentaires (Architecture) :**

- Résumer les exigences techniques issues de l'Architecture
- Vérifier l'exhaustivité

**Exigences de Design UX (si applicable) :**

- Afficher le nombre d'UX-DR trouvées
- Afficher les exigences clés de Design UX (tokens, composants, accessibilité)
- Vérifier que chaque UX-DR est assez spécifique pour la création de stories

### 9. Obtenir la Confirmation de l'Utilisateur

Demander : "Ces exigences extraites représentent-elles fidèlement ce qui doit être construit ? Des ajouts ou des corrections ?"

Mettre à jour les exigences en fonction des retours de l'utilisateur jusqu'à obtention de la confirmation.

## CONTENU À SAUVEGARDER DANS LE DOCUMENT :

Après l'extraction et la confirmation, mettre à jour {planning_artifacts}/epics.md avec :

- Liste complète des FR dans la section {{fr_list}}
- Liste complète des NFR dans la section {{nfr_list}}
- Toutes les exigences supplémentaires dans la section {{additional_requirements}}
- Exigences de Design UX dans la section {{ux_design_requirements}} (si le document UX existe)

### 10. Présenter les OPTIONS DU MENU

Afficher : `**Confirmez que les Exigences sont complètes et correctes pour [C] Continuer :**`

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu
- Ne passer à l'étape suivante que lorsque l'utilisateur sélectionne 'C'
- L'utilisateur peut discuter ou poser des questions - répondez toujours et terminez par l'affichage à nouveau de l'option de menu

#### Logique de Gestion du Menu :

- SI C : Sauvegarder tout dans {planning_artifacts}/epics.md, mettre à jour le frontmatter, puis lisez intégralement et suivez : ./step-02-design-epics.md
- SI tout autre commentaire ou requête : aider l'utilisateur à répondre puis [Réafficher le Menu des Options](#10-présenter-les-options-du-menu)

## NOTE CRITIQUE D'ACHÈVEMENT D'ÉTAPE

UNIQUEMENT lorsque 'C' est sélectionné et que toutes les exigences sont sauvegardées dans le document et que le frontmatter est mis à jour, vous lirez intégralement et suivrez : ./step-02-design-epics.md pour commencer l'étape de conception des epics.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Tous les documents requis trouvés et validés
- Toutes les FR extraites et formatées correctement
- Toutes les NFR extraites et formatées correctement
- Exigences supplémentaires issues de l'Architecture/UX identifiées
- Modèle initialisé avec les exigences
- L'utilisateur confirme que les exigences sont complètes et précises

### ❌ ÉCHEC DU SYSTÈME :

- Documents requis manquants
- Extraction incomplète des exigences
- Modèle non correctement initialisé
- Non-sauvegarde des exigences dans le fichier de sortie

**Règle Maîtresse** : Sauter des étapes, optimiser les séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.
