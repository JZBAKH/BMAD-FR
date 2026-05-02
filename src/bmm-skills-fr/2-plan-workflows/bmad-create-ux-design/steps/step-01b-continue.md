# Étape 1B : Continuation du Workflow de Design UX

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur la compréhension de l'endroit où nous nous sommes arrêtés et poursuivez de manière appropriée.
- 🚪 REPRENDRE le workflow au point exact où il a été interrompu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse de l'état actuel avant d'agir.
- 💾 Conserver les valeurs existantes de `stepsCompleted` dans le frontmatter.
- 📖 Ne charger que les documents qui étaient déjà suivis dans `inputDocuments`.
- 🚫 INTERDICTION de modifier le contenu terminé lors des étapes précédentes.

## LIMITES DU CONTEXTE :

- Le document actuel et son frontmatter sont déjà chargés.
- Contexte précédent = document complet + frontmatter existant.
- Les documents sources listés dans le frontmatter ont déjà été traités.
- Dernière étape terminée = valeur `lastStep` du frontmatter.

## VOTRE TÂCHE :

Reprendre le workflow de design UX là où il s'était arrêté, en assurant une continuation fluide.

## SÉQUENCE DE CONTINUATION :

### 1. Analyser l'état actuel

Examinez le frontmatter pour comprendre :

- `stepsCompleted` : Quelles étapes sont déjà terminées.
- `lastStep` : Le numéro de l'étape la plus récemment terminée.
- `inputDocuments` : Quel contexte a déjà été chargé.
- Toutes les autres variables du frontmatter.

### 2. Charger tous les documents sources (Input Documents)

Rechargez les documents de contexte listés dans `inputDocuments` :

- Pour chaque document dans `inputDocuments`, chargez le fichier complet.
- Cela garantit que vous disposez de tout le contexte pour la suite.
- Ne découvrez pas de nouveaux documents - rechargez uniquement ce qui a été traité précédemment.

### 3. Résumer les progrès actuels

Accueillez de nouveau l'utilisateur et fournissez le contexte :
"Bon retour {{user_name}} ! Je reprends notre collaboration de design UX pour {{project_name}}.

**Progrès Actuels :**

- Étapes terminées : {stepsCompleted}
- Dernier travail sur : Étape {lastStep}
- Documents de contexte disponibles : {len(inputDocuments)} fichiers
- La spécification actuelle du design UX est prête avec toutes les sections complétées.

**État du Document :**

- Le document actuel de design UX est prêt avec toutes les sections terminées.
- Prêt à continuer là où nous nous sommes arrêtés.

Cela vous semble-t-il correct, ou souhaitez-vous apporter des ajustements avant de continuer ?"

### 4. Déterminer l'étape suivante

En fonction de la valeur de `lastStep`, déterminez quel fichier d'étape charger ensuite :

- Si `lastStep = 1` → Chargez `./step-02-discovery.md`.
- Si `lastStep = 2` → Chargez `./step-03-core-experience.md`.
- Si `lastStep = 3` → Chargez `./step-04-emotional-response.md`.
- Continuez ce modèle pour toutes les étapes.
- Si `lastStep` indique l'étape finale → Workflow déjà terminé.

### 5. Présenter les options de continuation

Après avoir présenté les progrès actuels, demandez :
"Prêt à continuer avec l'Étape {nextStepNumber} : {nextStepTitle} ?

[C] Continuer vers l'Étape {nextStepNumber}"

## MÉTRIQUES DE RÉUSSITE :

✅ Tous les documents sources précédents ont été rechargés avec succès.
✅ L'état actuel du workflow a été analysé et présenté avec précision.
✅ L'utilisateur confirme sa compréhension des progrès.
✅ La bonne étape suivante est identifiée et préparée pour le chargement.

## MODES D'ÉCHEC :

❌ Découvrir de nouveaux documents au lieu de recharger les existants.
❌ Modifier le contenu des étapes déjà terminées.
❌ Charger la mauvaise étape suivante en fonction de la valeur `lastStep`.
❌ Procéder sans confirmation de l'état actuel par l'utilisateur.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## WORKFLOW DÉJÀ TERMINÉ ?

Si `lastStep` indique que la dernière étape est terminée :
"Excellente nouvelle ! Il semble que nous ayons déjà terminé le workflow de design UX pour {{project_name}}.

La spécification finale du design UX est prête à l'adresse {planning_artifacts}/ux-design-specification.md avec toutes les sections complétées jusqu'à l'étape {finalStepNumber}.

Le design UX complet comprend les fondations visuelles, les flux utilisateurs et les spécifications de design prêtes pour l'implémentation.

Souhaitez-vous que je :

- Passe en revue la spécification de design UX terminée avec vous.
- Suggère les prochaines étapes du workflow (comme la génération de wireframes ou l'architecture).
- Commence une nouvelle révision du design UX.

Qu'est-ce qui serait le plus utile ?"

## ÉTAPE SUIVANTE :

Après que l'utilisateur a confirmé qu'il est prêt à continuer, chargez le fichier de l'étape suivante appropriée en fonction de la valeur `lastStep` du frontmatter.

Rappel : Ne chargez PAS l'étape suivante tant que l'utilisateur n'a pas explicitement sélectionné [C] pour continuer !
