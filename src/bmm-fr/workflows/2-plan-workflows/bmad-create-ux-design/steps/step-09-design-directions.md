# Étape 9 : Maquettes de Direction de Design

## RÈGLES d'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur la génération et l'évaluation des variations de direction de design.
- 🎯 Exploration COLLABORATIVE, pas un design basé sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu de direction de design.
- 💾 Générez un visualiseur HTML pour les directions de design.
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights de design plus profonds.
- **P (Mode Party)** : Apporter plusieurs perspectives pour évaluer les directions de design.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- Les fondations visuelles de l'étape 8 fournissent les jetons de design (tokens).
- L'expérience centrale de l'étape 7 alimente la mise en page et le design d'interaction.
- Focus sur l'exploration de différentes directions de design visuel.

## VOTRE TÂCHE :

Générer des maquettes de direction de design complètes montrant différentes approches visuelles pour le produit.

## SÉQUENCE DES DIRECTIONS DE DESIGN :

### 1. Générer des variations de direction de design

Créer des explorations visuelles diverses :
"Je vais générer 6 à 8 variations de direction de design explorant :

- Différentes approches de mise en page et de hiérarchie de l'information.
- Divers modèles d'interaction et poids visuels.
- Des applications alternatives de couleurs issues de nos fondations.
- Différentes approches de densité et d'espacement.
- Diverse configurations de navigation et de composants.

Chaque maquette montrera une vision complète pour {{project_name}} avec toutes nos décisions de design appliquées."

### 2. Créer une vitrine de direction de design HTML

Générer une exploration visuelle interactive :
"🎨 Maquettes de direction de design générées !

Je crée une vitrine complète de directions de design en HTML à l'adresse `{planning_artifacts}/ux-design-directions.html`.

**Ce que vous y trouverez :**

- 6 à 8 variations de maquettes en plein écran.
- États interactifs et effets de survol (hover).
- Outils de comparaison côte à côte.
- Exemples d'interfaces complets avec du contenu réel.
- Démonstrations du comportement réactif (responsive).

Chaque maquette représente une direction visuelle complète pour le look & feel de votre application."

### 3. Présenter le cadre d'exploration du design

Guider les critères d'évaluation :
"Pendant que vous explorez les directions de design, portez votre attention sur :

✅ **Intuitivité de la mise en page** - Quelle hiérarchie d'information correspond à vos priorités ?
✅ **Style d'interaction** - Quel style d'interaction s'accorde avec votre expérience centrale ?
✅ **Poids visuel** - Quelle densité visuelle correspond le mieux à votre marque ?
✅ **Approche de navigation** - Quel modèle de navigation répond aux attentes des utilisateurs ?
✅ **Utilisation des composants** - Dans quelle mesure les composants soutiennent-ils vos parcours utilisateurs ?
✅ **Alignement avec la marque** - Quelle direction soutient le mieux vos objectifs émotionnels ?

Prenez le temps d'explorer - c'est une décision cruciale qui guidera tout notre travail de design !"

### 4. Faciliter la sélection de la direction de design

Aider l'utilisateur à choisir ou combiner des éléments :
"Après avoir exploré toutes les directions de design :

**Quelle approche résonne le plus en vous ?**

- Choisir une direction favorite telle quelle.
- Combiner des éléments de plusieurs directions.
- Demander des modifications sur n'importe quelle direction.
- Utiliser une direction comme base et itérer.

**Dites-moi :**

- Quelle mise en page semble la plus intuitive pour vos utilisateurs ?
- Quel poids visuel correspond à la personnalité de votre marque ?
- Quel style d'interaction soutient votre expérience centrale ?
- Y a-t-il des éléments de différentes directions que vous aimeriez combiner ?"

### 5. Documenter la décision de direction de design

Capturer l'approche choisie :
"Sur la base de votre exploration, je comprends vos préférences de direction de design :

**Direction choisie :** [Numéro de direction ou combinaison]
**Éléments clés :** [Éléments spécifiques que vous avez aimés]
**Modifications nécessaires :** [Tout changement demandé]
**Justification :** [Pourquoi cette direction fonctionne pour votre produit]

Cela deviendra notre fondation de design pour la suite. Sommes-nous prêts à valider cela, ou souhaitez-vous explorer d'autres variations ?"

### 6. Générer le contenu de direction de design

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Décision sur la Direction de Design

### Directions de Design Explorées

[Résumé des directions de design explorées selon la conversation]

### Direction Choisie

[Direction de design choisie selon la conversation]

### Justification du Design

[Justification du choix de direction de design selon la conversation]

### Approche d'Implémentation

[Approche d'implémentation basée sur la direction choisie]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour la direction de design et présentez les choix :
"J'ai documenté notre décision de direction de design pour {{project_name}}. Cette approche visuelle guidera tout notre travail de design détaillé.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Affinons notre direction de design
[P] Mode Party - Apporter différentes perspectives sur les choix visuels
[C] Continuer - Enregistrer cela dans le document et passer aux flux de parcours utilisateurs"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de direction de design.
- Traitez les insights de design enrichis qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations de la direction de design ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec la direction de design actuelle.
- Traitez les insights de design collaboratifs qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements de la direction de design ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Chargez `./step-10-user-journeys.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Plusieurs variations de direction de design générées.
✅ Vitrine HTML créée avec des éléments interactifs.
✅ Critères d'évaluation du design clairement établis.
✅ L'utilisateur peut explorer et comparer les directions efficacement.
✅ Décision sur la direction du design prise avec une justification claire.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Ne pas créer assez de variations dans les directions de design.
❌ Directions de design non alignées avec les fondations établies.
❌ Éléments interactifs manquants dans la vitrine HTML.
❌ Ne pas fournir de critères d'évaluation clairs.
❌ Précipitation de la décision sans exploration approfondie.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-10-user-journeys.md` pour concevoir les flux des parcours utilisateurs.

Rappel : Ne passez PAS à l'étape 10 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
