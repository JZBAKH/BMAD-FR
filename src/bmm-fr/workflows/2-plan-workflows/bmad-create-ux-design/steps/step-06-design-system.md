# Étape 6 : Choix du Système de Design

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur le choix de l'approche appropriée du système de design.
- 🎯 Prise de décision COLLABORATIVE, pas seulement une recommandation.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu de décision du système de design.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights plus profonds sur le système de design.
- **P (Mode Party)** : Apporter plusieurs perspectives pour évaluer les options de système de design.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- Les exigences de la plateforme de l'étape 3 alimentent le choix du système de design.
- Les modèles d'inspiration de l'étape 5 guident la sélection du système de design.
- Focus sur le choix des fondations pour un design cohérent.

## VOTRE TÂCHE :

Choisir l'approche appropriée du système de design en fonction des exigences et des contraintes du projet.

## SÉQUENCE DE CHOIX DU SYSTÈME DE DESIGN :

### 1. Présenter les options de système de design

Expliquer les différentes approches :
"Pour {{project_name}}, nous devons choisir une base de système de design. Voyez les systèmes de design comme des blocs LEGO pour l'interface utilisateur : ils fournissent des composants et des modèles éprouvés, garantissant la cohérence et accélérant le développement.

**Approches de Système de Design :**

**1. Système de Design Sur Mesure (Custom)**

- Unicité visuelle complète.
- Contrôle total sur chaque composant.
- Investissement initial plus élevé.
- Idéal pour les marques établies avec des besoins uniques.

**2. Système Établi (Material Design, Ant Design, etc.)**

- Développement rapide avec des modèles éprouvés.
- Excellents réglages par défaut et accessibilité intégrée.
- Moins de différenciation visuelle.
- Idéal pour les startups ou les outils internes.

**3. Système Thémable (MUI, Chakra UI, Tailwind UI)**

- Personnalisable avec une base solide.
- Flexibilité de marque avec des composants éprouvés.
- Courbe d'apprentissage modérée.
- Bon équilibre entre rapidité et unicité.

Quelle direction semble la plus appropriée pour votre projet ?"

### 2. Analyser les exigences du projet

Orienter la décision en fonction du contexte du projet :
"**Considérons vos besoins spécifiques :**

**D'après nos conversations précédentes :**

- Plateforme : [plateforme issue de l'étape 3]
- Délai : [déduit de la conversation utilisateur]
- Taille de l'équipe : [déduit de la conversation utilisateur]
- Exigences de marque : [déduit de la conversation utilisateur]
- Contraintes techniques : [déduit de la conversation utilisateur]

**Facteurs de décision :**

- Besoin de rapidité vs besoin d'unicité.
- Chartes de marque ou identité visuelle existante.
- Expertise en design de l'équipe.
- Considérations de maintenance à long terme.
- Exigences d'intégration avec des systèmes existants."

### 3. Explorer des options spécifiques de système de design

Approfondir les options pertinentes :
"**Options recommandées selon vos besoins :**

**Pour [Votre Type de Plateforme] :**

- [Option 1] - [Bénéfice clé] - [Idéal pour tel scénario]
- [Option 2] - [Bénéfice clé] - [Idéal pour tel scénario]
- [Option 3] - [Bénéfice clé] - [Idéal pour tel scénario]

**Considérations :**

- Taille et qualité de la bibliothèque de composants.
- Documentation et support de la communauté.
- Capacités de personnalisation.
- Conformité en matière d'accessibilité.
- Caractéristiques de performance.
- Courbe d'apprentissage pour votre équipe."

### 4. Faciliter le processus de décision

Aider l'utilisateur à faire un choix éclairé :
"**Cadre de décision :**

1. Qu'est-ce qui est le plus important : Rapidité, unicité ou équilibre ?
2. Quel est le niveau d'expertise en design de votre équipe ?
3. Existe-t-il une charte graphique existante à suivre ?
4. Quels sont vos délais et votre budget ?
5. Besoins de maintenance à long terme ?

Évaluons les options ensemble sur la base de vos réponses à ces questions."

### 5. Finaliser le choix du système de design

Confirmer et documenter la décision :
"Sur la base de notre analyse, je recommande [Choix du Système de Design] pour {{project_name}}.

**Justification :**

- [Raison 1 basée sur les besoins du projet]
- [Raison 2 basée sur les contraintes]
- [Raison 3 basée sur les considérations d'équipe]

**Prochaines étapes :**

- Nous personnaliserons ce système pour qu'il corresponde à votre marque et à vos besoins.
- Définition d'une stratégie pour les composants sur mesure nécessaires.
- Établissement des jetons de design (design tokens) et des modèles.

Ce choix de système de design vous convient-il ?"

### 6. Générer le contenu du système de design

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Fondation du Système de Design

### 1.1 Choix du Système de Design

[Choix du système de design selon la conversation]

### Justification du Choix

[Justification de la sélection du système selon la conversation]

### Approche d'Implémentation

[Approche d'implémentation basée sur le système choisi]

### Stratégie de Personnalisation

[Stratégie de personnalisation selon les besoins du projet]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour le système de design et présentez les choix :
"J'ai documenté notre choix de système de design pour {{project_name}}. Cette base garantira la cohérence et accélérera le développement.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Affinons notre décision sur le système de design
[P] Mode Party - Apporter des perspectives techniques sur les systèmes de design
[C] Continuer - Enregistrer cela dans le document et passer à la définition de l'expérience"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel du système de design.
- Traitez les insights enrichis qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations de la décision sur le système de design ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec le choix actuel du système de design.
- Traitez les insights collaboratifs qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements de la décision sur le système de design ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Chargez `./step-07-defining-experience.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Options de système de design clairement présentées et expliquées.
✅ Cadre de décision appliqué aux exigences du projet.
✅ Système de design spécifique choisi avec une justification claire.
✅ Approche d'implémentation planifiée.
✅ Stratégie de personnalisation définie.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Ne pas expliquer clairement les concepts de système de design.
❌ Se précipiter vers une recommandation sans comprendre les exigences.
❌ Ne pas considérer les contraintes techniques ou les capacités de l'équipe.
❌ Choisir un système de design sans justification claire.
❌ Ne pas planifier l'approche d'implémentation.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-07-defining-experience.md` pour définir l'interaction utilisateur centrale.

Rappel : Ne passez PAS à l'étape 07 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
