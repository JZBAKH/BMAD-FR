# Étape 12 : Modèles de Cohérence UX

## RÈGLES d'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur l'établissement de modèles de cohérence pour les situations UX courantes.
- 🎯 Définition de modèles COLLABORATIVE, pas un design basé sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analysis avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu des modèles UX.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights plus profonds sur les modèles.
- **P (Mode Party)** : Apporter plusieurs perspectives pour définir les modèles UX.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- La stratégie des composants de l'étape 11 alimente les décisions sur les modèles.
- Les parcours utilisateurs de l'étape 10 identifient les besoins en modèles communs.
- Focus sur les modèles de cohérence pour les situations UX courantes.

## VOTRE TÂCHE :

Établir des modèles de cohérence UX pour les situations courantes telles que les boutons, les formulaires, la navigation et le feedback.

## SÉQUENCE DES MODÈLES UX :

### 1. Identifier les catégories de modèles

Déterminer quels modèles doivent être définis pour votre produit :
"Établissons des modèles de cohérence sur la façon dont {{project_name}} se comporte dans les situations courantes.

**Catégories de modèles à définir :**
- Hiérarchie des boutons et actions.
- Modèles de feedback (succès, erreur, avertissement, info).
- Modèles de formulaires et validation.
- Modèles de navigation.
- Modèles de modales et de superpositions (overlays).
- États vides (empty states) et états de chargement (loading).
- Modèles de recherche et de filtrage.

Quelles catégories sont les plus critiques pour votre produit ? Nous pouvons les passer en revue minutieusement ou nous concentrer sur les plus importantes."

### 2. Définir les modèles critiques en priorité

Se concentrer sur les modèles les plus pertinents pour votre produit :

**Pour [Catégorie de Modèle Critique] :**
"**Modèles de [Type de Modèle] :**
Que devraient voir/faire les utilisateurs lorsqu'ils ont besoin de [action du modèle] ?

**Considérations :**
- Hiérarchie visuelle (actions primaires vs secondaires).
- Mécanismes de feedback.
- Récupération d'erreur.
- Exigences d'accessibilité.
- Considérations mobile vs bureau (desktop).

**Exemples :**
- [Exemple 1 pour ce type de modèle]
- [Exemple 2 for ce type de modèle]

Comment {{project_name}} devrait-il gérer les interactions de [type de modèle] ?"

### 3. Établir les directives de modèle (Guidelines)

Documenter les décisions de design spécifiques :

**Modèle de directives de modèle :**

```markdown
### [Type de Modèle]

**Quand l'utiliser :** [Directives d'utilisation claires]
**Design visuel :** [À quoi il doit ressembler]
**Comportement :** [Comment il doit interagir]
**Accessibilité :** [Exigences A11y]
**Considérations mobiles :** [Besoins spécifiques au mobile]
**Variantes :** [Différents états ou styles si applicable]
```

### 4. Intégration du système de design

S'assurer que les modèles fonctionnent avec le système de design choisi :
"**Intégration avec [Système de Design] :**
- Comment ces modèles complètent-ils les composants de notre système de design ?
- Quelles personnalisations sont nécessaires ?
- Comment maintenons-nous la cohérence tout en répondant à des besoins uniques ?

**Règles de modèles personnalisés :**
- [Règle personnalisée 1]
- [Règle personnalisée 2]
- [Règle personnalisée 3]"

### 5. Créer la documentation des modèles

Générer une bibliothèque de modèles complète :

**Structure de la bibliothèque de modèles :**
- Directives d'utilisation claires pour chaque modèle.
- Exemples visuels et spécifications.
- Notes d'implémentation pour les développeurs.
- Listes de contrôle (checklists) d'accessibilité.
- Considérations "mobile-first".

### 6. Générer le contenu des modèles UX

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Modèles de Cohérence UX

### Hiérarchie des Boutons
[Modèles de hiérarchie des boutons basés sur la conversation]

### Modèles de Feedback
[Modèles de feedback basés sur la conversation]

### Modèles de Formulaires
[Modèles de formulaires basés sur la conversation]

### Modèles de Navigation
[Modèles de navigation basés sur la conversation]

### Modèles Additionnels
[Modèles additionnels basés sur la conversation]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour les modèles UX et présentez les choix :
"J'ai établi les modèles de cohérence UX pour {{project_name}}. Ces modèles garantissent aux utilisateurs une expérience cohérente et prévisible à travers toutes les interactions.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Affinons nos modèles UX
[P] Mode Party - Apporter différentes perspectives sur les modèles de cohérence
[C] Continuer - Enregistrer cela dans le document et passer au design réactif (responsive)"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel des modèles UX.
- Traitez les insights enrichis sur les modèles qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations des modèles UX ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec les modèles UX actuels.
- Traitez les insights collaboratifs sur les modèles qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements des modèles UX ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Chargez `./step-13-responsive-accessibility.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Catégories de modèles critiques identifiées et priorisées.
✅ Modèles de cohérence clairement définis et documentés.
✅ Modèles intégrés avec le système de design choisi.
✅ Considérations sur l'accessibilité incluses pour tous les modèles.
✅ Approche "mobile-first" incorporée.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Ne pas identifier les catégories de modèles les plus critiques.
❌ Modèles trop génériques ou non activables.
❌ Absence de considérations sur l'accessibilité.
❌ Modèles non alignés sur le système de design.
❌ Ne pas prendre en compte les différences mobiles.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises decisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-13-responsive-accessibility.md` pour définir la stratégie de design réactif et d'accessibilité.

Rappel : Ne passez PAS à l'étape 13 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
