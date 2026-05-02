# Étape 11 : Stratégie des Composants

## RÈGLES d'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur la définition de la stratégie de la bibliothèque de composants et des composants sur mesure.
- 🎯 Planification de composants COLLABORATIVE, pas un design basé sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu de stratégie des composants.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights plus profonds sur les composants.
- **P (Mode Party)** : Apporter plusieurs perspectives pour définir la stratégie des composants.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- Le choix du système de design de l'étape 6 détermine les composants disponibles.
- Les parcours utilisateurs de l'étape 10 identifient les besoins en composants.
- Focus sur la définition des composants sur mesure et la stratégie d'implémentation.

## VOTRE TÂCHE :

Définir la stratégie de la bibliothèque de composants et concevoir les composants sur mesure non couverts par le système de design.

## SÉQUENCE DE STRATÉGIE DE COMPOSANTS :

### 1. Analyser la couverture du système de design

Passer en revue ce qui est disponible vs ce qui est nécessaire :
"Sur la base du système de design que nous avons choisi [système de design issu de l'étape 6], identifions quels composants sont déjà disponibles et lesquels nous devons créer sur mesure.

**Disponibles dans le système de design :**
[Liste des composants disponibles dans le système de design choisi]

**Composants nécessaires pour {{project_name}} :**
En examinant nos parcours utilisateurs et notre direction de design, nous avons besoin de :
- [Besoin en composant 1 issu de l'analyse des parcours]
- [Besoin en composant 2 issu des exigences de design]
- [Besoin en composant 3 issu de l'expérience centrale]

**Analyse d'écart (Gap Analysis) :**
- [Écart 1 - nécessaire mais non disponible]
- [Écart 2 - nécessaire mais non disponible]"

### 2. Concevoir les composants sur mesure

Pour chaque composant sur mesure nécessaire, concevoir minutieusement :

**Pour chaque composant sur mesure :**
"**Design de [Nom du Composant] :**

**Objectif :** Que fait ce composant pour les utilisateurs ?
**Contenu :** Quelles informations ou données affiche-t-il ?
**Actions :** Que peuvent faire les utilisateurs avec ce composant ?
**États :** Quels sont ses différents états ? (par défaut, survol, actif, désactivé, erreur, etc.)
**Variantes :** Des tailles ou styles différents sont-ils nécessaires ?
**Accessibilité :** Quels labels ARIA et quel support clavier sont nécessaires ?

Passons en revue chaque composant sur mesure de manière systématique."

### 3. Documenter les spécifications des composants

Créer des spécifications détaillées pour chaque composant :

**Modèle de spécification de composant :**

```markdown
### [Nom du Composant]

**Objectif :** [Énoncé clair de l'objectif]
**Usage :** [Quand et comment l'utiliser]
**Anatomie :** [Décomposition visuelle des parties]
**États :** [Tous les états possibles avec descriptions]
**Variantes :** [Différentes tailles/styles si applicable]
**Accessibilité :** [Labels ARIA, navigation au clavier]
**Directives de contenu :** [Quel contenu fonctionne le mieux]
**Comportement d’interaction :** [Comment les utilisateurs interagissent]
```

### 4. Définir la stratégie globale des composants

Établir l'approche de la bibliothèque de composants :
"**Stratégie des Composants :**

**Composants de fondation :** (issus du système de design)
- [Composant de fondation 1]
- [Composant de fondation 2]

**Composants sur mesure :** (conçus lors de cette étape)
- [Composant sur mesure 1 avec justification]
- [Composant sur mesure 2 avec justification]

**Approche d'implémentation :**
- Construire les composants sur mesure en utilisant les jetons (tokens) du système de design.
- Garantir la cohérence avec les modèles établis.
- Suivre les meilleures pratiques d'accessibilité.
- Créer des modèles réutilisables pour les cas d'utilisation courants."

### 5. Planifier la feuille de route d'implémentation

Définir comment et quand construire les composants :
"**Feuille de route d'implémentation :**

**Phase 1 - Composants de base :**
- [Composant 1] - nécessaire pour [flux critique]
- [Composant 2] - nécessaire pour [flux critique]

**Phase 2 - Composants de soutien :**
- [Composant 3] - améliore [l'expérience utilisateur]
- [Composant 4] - soutient [le modèle de design]

**Phase 3 - Composants d'optimisation :**
- [Composant 5] - optimise [le parcours utilisateur]
- [Composant 6] - ajoute [une fonctionnalité spéciale]

Cette feuille de route permet de prioriser le développement en fonction de la criticité des parcours utilisateurs."

### 6. Générer le contenu de stratégie des composants

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Stratégie des Composants

### Composants du Système de Design
[Analyse des composants disponibles du système de design selon la conversation]

### Composants sur Mesure
[Spécifications des composants sur mesure selon la conversation]

### Stratégie d'Implémentation des Composants
[Stratégie d'implémentation des composants selon la conversation]

### Feuille de Route d'Implémentation
[Feuille de route d'implémentation basée sur la conversation]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour la stratégie des composants et présentez les choix :
"J'ai défini la stratégie des composants pour {{project_name}}. Cela équilibre l'utilisation de composants éprouvés du système de design avec des composants sur mesure pour vos besoins uniques.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Affinons notre stratégie de composants
[P] Mode Party - Apporter des perspectives techniques sur le design des composants
[C] Continuer - Enregistrer cela dans le document et passer aux modèles UX"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de stratégie des composants.
- Traitez les insights enrichis sur les composants qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations de la stratégie des composants ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec la stratégie des composants actuelle.
- Traitez les insights collaboratifs sur les composants qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements de la stratégie des composants ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Chargez `./step-12-ux-patterns.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Couverture du système de design correctement analysée.
✅ Tous les composants sur mesure minutieusement spécifiés.
✅ Stratégie des composants clairement définie.
✅ Feuille de route d'implémentation priorisée par besoin utilisateur.
✅ Accessibilité prise en compte pour tous les composants.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Ne pas analyser correctement la couverture du système de design.
❌ Composants sur mesure non spécifiés de manière approfondie.
❌ Absence de considérations sur l'accessibilité.
❌ Stratégie de composants non alignée sur les parcours utilisateurs.
❌ Feuille de route d'implémentation non priorisée efficacement.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-12-ux-patterns.md` pour définir les modèles de cohérence UX.

Rappel : Ne passez PAS à l'étape 12 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
