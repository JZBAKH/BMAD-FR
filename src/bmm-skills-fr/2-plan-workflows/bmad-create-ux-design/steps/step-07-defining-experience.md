# Étape 7 : Définition de l'Expérience Centrale

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur la définition de l'interaction centrale qui définit le produit.
- 🎯 Découverte COLLABORATIVE, pas un design basé sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu de définition de l'expérience.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights d'expérience plus profonds.
- **P (Mode Party)** : Apporter plusieurs perspectives pour définir l'expérience centrale optimale.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- L'expérience de base de l'étape 3 fournit la fondation.
- Le choix du système de design de l'étape 6 alimente l'implémentation.
- Focus sur l'interaction déterminante qui rend le produit spécial.

## VOTRE TÂCHE :

Définir l'interaction centrale qui, si elle est parfaitement réussie, entraîne tout le reste dans l'expérience utilisateur.

## SÉQUENCE DE DÉFINITION DE L'EXPÉRIENCE :

### 1. Identifier l'Expérience Déterminante

Concentrez-vous sur l'interaction centrale :
"Chaque produit à succès possède une expérience déterminante - l'interaction centrale qui, si nous la réussissons, fait que tout le reste suit.

**Pensez à ces exemples célèbres :**

- Tinder : "Swiper pour matcher avec des gens"
- Snapchat : "Partager des photos qui disparaissent"
- Instagram : "Partager des moments parfaits avec des filtres"
- Spotify : "Découvrir et jouer n'importe quelle chanson instantanément"

**Pour {{project_name}} :**
Quelle est l'action centrale que les utilisateurs décriront à leurs amis ?
Quelle est l'interaction qui fait que les utilisateurs se sentent victorieux ?
Si nous devions réussir UNE chose parfaitement, quelle serait-elle ?"

### 2. Explorer le modèle mental de l'utilisateur

Comprendre comment les utilisateurs appréhendent la tâche principale :
"**Questions sur le modèle mental de l'utilisateur :**

- Comment les utilisateurs résolvent-ils actuellement ce problème ?
- Quel modèle mental apportent-ils à cette tâche ?
- Quelle est leur attente sur la façon dont cela devrait fonctionner ?
- Où sont-ils susceptibles d'être confus ou frustrés ?

**Solutions Actuelles :**

- Qu'est-ce que les utilisateurs aiment/détestent dans les approches existantes ?
- Quels raccourcis ou solutions de contournement utilisent-ils ?
- Qu'est-ce qui rend les solutions actuelles magiques ou terribles ?"

### 3. Définir les critères de succès de l'expérience centrale

Établir ce qui rend l'interaction centrale réussie :
"**Critères de succès de l'expérience centrale :**

- Qu'est-ce qui fait dire aux utilisateurs 'ça marche, tout simplement' ?
- Quand se sentent-ils intelligents ou accomplis ?
- Quel feedback leur indique qu'ils font ce qu'il faut ?
- Quelle doit être la sensation de rapidité ?
- Qu'est-ce qui devrait se produire automatiquement ?

**Indicateurs de Succès :**

- [Indicateur de succès 1]
- [Indicateur de succès 2]
- [Indicateur de succès 3]"

### 4. Identifier les modèles (patterns) novateurs vs établis

Déterminer si nous devons innover ou utiliser des modèles éprouvés :
"**Analyse des Modèles :**
En examinant votre expérience centrale, est-ce que cela :

- Utilise des modèles UX établis que les utilisateurs comprennent déjà ?
- Nécessite un design d'interaction novateur qui demande un apprentissage ?
- Combine des modèles familiers de manière innovante ?

**Si Novateur :**

- Qu'est-ce qui différencie cela des approches existantes ?
- Comment allons-nous apprendre ce nouveau modèle aux utilisateurs ?
- Quelles métaphores familières pouvons-nous utiliser ?

**Si Établi :**

- Quels modèles éprouvés devrions-nous adopter ?
- Comment pouvons-nous innover au sein de modèles familiers ?
- Quelle est notre touche unique sur des interactions établies ?"

### 5. Définir les mécanismes de l'expérience

Décomposez l'interaction centrale en détails :
"**Mécanismes de l'expérience centrale :**
Concevons le flux étape par étape pour [expérience déterminante] :

**1. Initiation :**

- Comment l'utilisateur commence-t-il cette action ?
- Quels déclencheurs ou incitations l'invitent à commencer ?

**2. Interaction :**

- Que fait réellement l'utilisateur ?
- Quels contrôles ou entrées utilise-t-il ?
- Comment le système répond-il ?

**3. Feedback :**

- Qu'est-ce qui indique aux utilisateurs qu'ils réussissent ?
- Comment savent-ils que cela fonctionne ?
- Que se passe-t-il s'ils font une erreur ?

**4. Finalisation :**

- Comment les utilisateurs savent-ils qu'ils ont terminé ?
- Quel est le résultat positif (outcome) ?
- Quelle est la suite ?"

### 6. Générer le contenu de définition de l'expérience

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## 2. Expérience Utilisateur Centrale

### 2.1 Expérience Déterminante

[Description de l'expérience déterminante selon la conversation]

### 2.2 Modèle Mental de l'Utilisateur

[Analyse du modèle mental de l'utilisateur selon la conversation]

### 2.3 Critères de Succès

[Critères de succès pour l'expérience centrale selon la conversation]

### 2.4 Modèles UX Novateurs

[Analyse des modèles UX novateurs selon la conversation]

### 2.5 Mécanismes de l'Expérience

[Mécanismes détaillés pour l'expérience centrale selon la conversation]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour la définition de l'expérience et présentez les choix :
"J'ai défini l'expérience centrale pour {{project_name}} - l'interaction qui fera aimer ce produit aux utilisateurs.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Affinons la définition de l'expérience centrale
[P] Mode Party - Apporter différentes perspectives sur l'interaction déterminante
[C] Continuer - Enregistrer cela dans le document et passer aux fondations visuelles"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de définition de l'expérience.
- Traitez les insights enrichis qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations de l'expérience déterminante ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec l'expérience déterminante actuelle.
- Traitez les insights collaboratifs qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements de l'expérience déterminante ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Chargez `./step-08-visual-foundation.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Expérience déterminante clairement articulée.
✅ Modèle mental de l'utilisateur analysé en profondeur.
✅ Critères de succès établis pour l'interaction centrale.
✅ Modèles novateurs vs établis correctement évalués.
✅ Mécanismes de l'expérience conçus en détail.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Ne pas identifier la véritable interaction centrale.
❌ Passer à côté du modèle mental et des attentes de l'utilisateur.
❌ Ne pas établir de critères de succès clairs.
❌ Ne pas évaluer correctement les modèles novateurs vs établis.
❌ Mécanismes de l'expérience trop vagues ou incomplets.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-08-visual-foundation.md` pour établir les fondations du design visuel.

Rappel : Ne passez PAS à l'étape 08 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
