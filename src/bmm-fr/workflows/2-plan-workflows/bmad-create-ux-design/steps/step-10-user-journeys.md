# Étape 10 : Flux des Parcours Utilisateurs

## RÈGLES d'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur la conception des flux utilisateurs et des interactions du parcours.
- 🎯 Conception de flux COLLABORATIVE, pas des mises en page basées sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu du parcours utilisateur.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights de parcours plus profonds.
- **P (Mode Party)** : Apporter plusieurs perspectives pour concevoir les flux utilisateurs.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- La direction de design de l'étape 9 alimente la mise en page des flux et le design visuel.
- L'expérience centrale de l'étape 7 définit les interactions clés du parcours.
- Focus sur la conception de flux utilisateurs détaillés avec des diagrammes Mermaid.

## VOTRE TÂCHE :

Concevoir des flux de parcours utilisateurs détaillés pour les interactions critiques.

## SÉQUENCE DES FLUX DE PARCOURS UTILISATEURS :

### 1. Charger les parcours utilisateurs du PRD comme fondation

Commencer par les parcours utilisateurs déjà définis dans le PRD :
"Génial ! Puisque nous avons le PRD disponible, construisons sur les parcours utilisateurs qui y sont déjà documentés.

**Parcours utilisateurs existants dans le PRD :**
J'ai déjà chargé ces parcours utilisateurs à partir de votre PRD :
[Récits de parcours issus des documents sources du PRD]

Ces parcours nous disent **qui** sont les utilisateurs et **pourquoi** ils entreprennent certaines actions. Maintenant, nous devons concevoir en détail **comment** ces parcours fonctionnent.

**Parcours critiques pour lesquels concevoir des flux :**
En examinant les parcours du PRD, je dois concevoir des flux d'interaction détaillés pour :
- [Parcours critique 1 identifié à partir des récits du PRD]
- [Parcours critique 2 identifié à partir des récits du PRD]
- [Parcours critique 3 identifié à partir des récits du PRD]

Le PRD nous a donné les histoires - concevons maintenant les mécanismes !"

### 2. Concevoir chaque flux de parcours

Pour chaque parcours critique, concevoir un flux détaillé :

**Pour [Nom du Parcours] :**
"Concevons le flux permettant aux utilisateurs d'accomplir [objectif du parcours].

**Questions de conception de flux :**
- Comment les utilisateurs commencent-ils ce parcours ? (point d'entrée)
- De quelles informations ont-ils besoin à chaque étape ?
- Quelles décisions doivent-ils prendre ?
- Comment savent-ils qu'ils progressent avec succès ?
- À quoi ressemble le succès pour ce parcours ?
- Où pourraient-ils être confus ou bloqués ?
- Comment se remettent-ils des erreurs ?"

### 3. Créer des diagrammes de flux

Visualiser chaque parcours avec des diagrammes Mermaid :
"Je vais créer des diagrammes de flux détaillés pour chaque parcours montrant :

**Flux [Nom du Parcours] :**
- Points d'entrée et déclencheurs.
- Points de décision et embranchements.
- Chemins de succès et d'échec.
- Mécanismes de récupération d'erreur.
- Divulgation progressive de l'information (progressive disclosure).

Chaque diagramme cartographiera l'expérience utilisateur complète, du début à la fin."

### 4. Optimiser pour l'efficacité et l'enchantement

Affiner les flux pour une expérience utilisateur optimale :
"**Optimisation des flux :**
Pour chaque parcours, assurons-nous de :
- Minimiser les étapes vers la valeur (amener les utilisateurs au succès rapidement).
- Réduire la charge cognitive à chaque point de décision.
- Fournir des indicateurs de progression et des feedbacks clairs.
- Créer des moments d'enchantement ou d'accomplissement.
- Gérer les cas limites (edge cases) et la récupération d'erreur avec élégance.

**Optimisations spécifiques :**
- [Optimisation 1 pour l'efficacité du parcours]
- [Optimisation 2 pour l'enchantement de l'utilisateur]
- [Optimisation 3 pour la gestion des erreurs]"

### 5. Documenter les modèles de parcours (Patterns)

Extraire les modèles réutilisables à travers les parcours :
"**Modèles de parcours :**
À travers ces flux, j'identifie des modèles communs que nous pouvons standardiser :

**Modèles de Navigation :**
- [Modèle de navigation 1]
- [Modèle de navigation 2]

**Modèles de Décision :**
- [Modèle de décision 1]
- [Modèle de décision 2]

**Modèles de Feedback :**
- [Modèle de feedback 1]
- [Modèle de feedback 2]

Ces modèles garantiront la cohérence de toutes les expériences utilisateurs."

### 6. Générer le contenu du parcours utilisateur

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Flux des Parcours Utilisateurs

### [Nom du Parcours 1]
[Description du parcours 1 et diagramme Mermaid]

### [Nom du Parcours 2]
[Description du parcours 2 et diagramme Mermaid]

### Modèles de Parcours (Journey Patterns)
[Modèles de parcours identifiés selon la conversation]

### Principes d'Optimisation des Flux
[Principes d'optimisation des flux basés sur la conversation]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour le parcours utilisateur et présentez les choix :
"J'ai conçu les flux de parcours utilisateurs détaillés pour {{project_name}}. Ces flux guideront le design détaillé de chaque interaction utilisateur.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Affinons nos designs de parcours utilisateurs
[P] Mode Party - Apporter différentes perspectives sur les flux utilisateurs
[C] Continuer - Enregistrer cela dans le document et passer à la stratégie de composants"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel des parcours utilisateurs.
- Traitez les insights enrichis sur les parcours qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations des parcours utilisateurs ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec les parcours utilisateurs actuels.
- Traitez les insights collaboratifs sur les parcours qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements des parcours utilisateurs ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Chargez `./step-11-component-strategy.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Parcours utilisateurs critiques identifiés et conçus.
✅ Diagrammes de flux détaillés créés pour chaque parcours.
✅ Flux optimisés pour l'efficacité et l'enchantement de l'utilisateur.
✅ Modèles de parcours communs extraits et documentés.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Ne pas identifier tous les parcours utilisateurs critiques.
❌ Flux trop complexes ou non optimisés pour le succès de l'utilisateur.
❌ Chemins de récupération d'erreur manquants.
❌ Ne pas extraire les modèles réutilisables à travers les parcours.
❌ Diagrammes de flux peu clairs ou incomplets.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-11-component-strategy.md` pour définir la stratégie de la bibliothèque de composants.

Rappel : Ne passez PAS à l'étape 11 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
