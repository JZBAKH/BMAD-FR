# Étape 8 : Fondations Visuelles

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur l'établissement des fondations du design visuel (couleurs, typographie, espacement).
- 🎯 Découverte COLLABORATIVE, pas un design basé sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu des fondations visuelles.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights visuels plus profonds.
- **P (Mode Party)** : Apporter plusieurs perspectives pour définir les fondations visuelles.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- Le choix du système de design de l'étape 6 fournit la base des composants.
- Les objectifs de réponse émotionnelle de l'étape 4 alimentent les décisions visuelles.
- Focus sur les couleurs, la typographie, l'espacement et les fondations de la mise en page (layout).

## VOTRE TÂCHE :

Établir les fondations du design visuel, y compris les thèmes de couleurs, la typographie et les systèmes d'espacement.

## SÉQUENCE DES FONDATIONS VISUELLES :

### 1. Évaluation de la Charte Graphique (Brand Guidelines)

Vérifiez les exigences de marque existantes :
"Avez-vous une charte graphique existante ou une palette de couleurs spécifique que je devrais suivre ? (y/n)

Si oui, j'extrairai et documenterai vos couleurs de marque et créerai des correspondances (mappings) sémantiques.
Si non, je générerai des options de thèmes basées sur la personnalité de votre projet et les objectifs émotionnels identifiés lors de notre discussion précédente."

### 2. Générer des options de thèmes de couleurs (si aucune charte)

Créer des opportunités d'exploration visuelle :
"S'il n'y a pas de charte graphique existante, je créerai un visualiseur de thèmes de couleurs pour vous aider à explorer les options.

🎨 Je peux générer des visualiseurs de thèmes HTML complets avec plusieurs options, des exemples d'interfaces complets, et la possibilité de voir comment les couleurs fonctionnent dans des contextes d'interface réels.

Cela vous aidera à prendre une décision éclairée sur la direction visuelle de {{project_name}}."

### 3. Définir le système de typographie

Établir les fondations typographiques :
"**Questions sur la typographie :**

- Quel devrait être le ton général ? (Professionnel, amical, moderne, classique ?)
- Quelle quantité de texte les utilisateurs liront-ils ? (Titres uniquement ? Contenu formel long ?)
- Des exigences d'accessibilité pour les tailles de police ou le contraste ?
- Des polices de marque que nous devons impérativement utiliser ?

**Stratégie Typographique :**

- Choix des polices primaires et secondaires.
- Établissement de l'échelle typographique (h1, h2, h3, corps, etc.).
- Définition des hauteurs de ligne (line-height) et des rapports d'espacement.
- Prise en compte de la lisibilité et de l'accessibilité."

### 4. Établir les fondations de l'espacement et de la mise en page

Définir les fondations structurelles :
"**Fondations de l'espacement et du layout :**

- Comment la mise en page générale devrait-elle être ressentie ? (Dense et efficace ? Aérée et spacieuse ?)
- Quelle unité d'espacement devrions-nous utiliser ? (Base de 4px, 8px, 12px ?)
- Quelle quantité d'espace blanc doit-il y avoir entre les éléments ?
- Devrions-nous utiliser un système de grille ? Si oui, quelle structure de colonnes ?"

**Principes de Mise en Page :**

- [Principe 1 basé sur le type de produit]
- [Principe 2 basé sur les besoins des utilisateurs]
- [Principe 3 basé sur les exigences de plateforme]"

### 5. Créer la stratégie des fondations visuelles

Synthétiser toutes les décisions visuelles :
"**Stratégie des Fondations Visuelles :**

**Système de Couleurs :**

- [Stratégie de couleurs basée sur la charte ou les thèmes générés]
- Mapping sémantique des couleurs (primaire, secondaire, succès, avertissement, erreur, etc.)
- Conformité de l'accessibilité (ratios de contraste)

**Système Typographique :**

- [Stratégie typographique basée sur les besoins en contenu et le ton]
- Échelle et hiérarchie typographique
- Justification de l'association des polices (font pairing)

**Espacement & Layout :**

- [Stratégie d'espacement basée sur la densité du contenu et la plateforme]
- Approche du système de grille
- Relations d'espacement des composants

Cette fondation garantira la cohérence à travers toutes nos décisions de design."

### 6. Générer le contenu des fondations visuelles

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Fondations du Design Visuel

### Système de Couleurs

[Stratégie du système de couleurs selon la conversation]

### Système Typographique

[Stratégie du système typographique selon la conversation]

### Fondations de l'Espacement & du Layout

[Fondations de l'espacement et de la mise en page selon la conversation]

### Considérations d'Accessibilité

[Considérations sur l'accessibilité selon la conversation]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour les fondations visuelles et présentez les choix :
"J'ai établi les fondations du design visuel pour {{project_name}}. Cela fournit les briques de base pour un design cohérent et esthétique.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Affinons nos fondations visuelles
[P] Mode Party - Apporter des perspectives de design sur les choix visuels
[C] Continuer - Enregistrer cela dans le document et passer aux directions de design"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel des fondations visuelles.
- Traitez les insights visuels enrichis qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations des fondations visuelles ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec les fondations visuelles actuelles.
- Traitez les insights visuels collaboratifs qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements des fondations visuelles ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Chargez `./step-09-design-directions.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Charte graphique évaluée et intégrée si disponible.
✅ Système de couleurs établi en tenant compte de l'accessibilité.
✅ Système typographique défini avec une hiérarchie appropriée.
✅ Fondations de l'espacement et du layout créées.
✅ Stratégie des fondations visuelles documentée.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Ne pas vérifier l'existence d'une charte graphique en premier.
❌ Palette de couleurs non alignée avec les objectifs émotionnels.
❌ Typographie non adaptée au type de contenu ou aux besoins de lisibilité.
❌ Système d'espacement non approprié à la densité du contenu.
❌ Absence de considérations sur l'accessibilité.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-09-design-directions.md` pour générer des maquettes de direction de design.

Rappel : Ne passez PAS à l'étape 09 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
