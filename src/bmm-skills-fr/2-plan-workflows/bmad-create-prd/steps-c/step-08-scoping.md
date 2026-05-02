# Étape 8 : Exercice de cadrage - Définition du périmètre (Phasé ou Single-Release)

**Progression : Étape 8 sur 11** - Suivante : Exigences fonctionnelles

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans entrée utilisateur

- 📖 CRITIQUE : TOUJOURS lire le fichier d'étape complet avant toute action - une compréhension partielle mène à des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu et compris avant de procéder
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs PM
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 SE FOCALISER sur les décisions stratégiques de périmètre qui maintiennent les projets viables
- 🎯 METTRE L'ACCENT sur la pensée MVP allégée tout en préservant la vision long-terme
- ⚠️ NE JAMAIS retirer du périmètre, différer ou phaser les exigences que l'utilisateur a explicitement incluses dans ses documents d'entrée sans demander d'abord
- ⚠️ NE JAMAIS inventer un phasage (MVP/Croissance/Vision) à moins que l'utilisateur ne demande une livraison phasée — si les documents d'entrée définissent tous les composants comme exigences essentielles, ils sont TOUS dans le périmètre
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu d'artefact et de document dans `{document_output_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant toute action
- 📚 Examinez le document PRD complet construit jusqu'ici
- ⚠️ Présentez le menu A/P/C après avoir généré les décisions de cadrage
- 💾 SAUVEGARDEZ UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant le nom de cette étape à la fin de la liste stepsCompleted
- 🚫 INTERDIT de charger l'étape suivante tant que C n'est pas sélectionné


## LIMITES DE CONTEXTE :

- Le document PRD complet construit jusqu'ici est disponible pour examen
- Les parcours utilisateurs, critères de succès et exigences de domaine sont documentés
- Se focaliser sur les décisions stratégiques de périmètre, pas les détails de fonctionnalités
- Équilibre entre valeur utilisateur et faisabilité d'implémentation

## VOTRE TÂCHE :

Conduire un exercice de cadrage exhaustif pour définir les limites de release et prioriser les fonctionnalités selon le mode de livraison choisi par l'utilisateur (phasé ou single-release).

## SÉQUENCE DE CADRAGE :

### 1. Examiner l'état actuel du PRD

Analyser tout ce qui a été documenté jusqu'ici :
- Présenter une synthèse de la vision établie, des critères de succès et des parcours
- Évaluer le focus domaine et innovation
- Évaluer les implications de périmètre : MVP simple, moyen ou projet complexe
- Demander si l'évaluation initiale semble juste ou s'ils la voient différemment

### 2. Définir la stratégie MVP

Faciliter les décisions stratégiques MVP :
- Explorer les options de philosophie MVP : MVP de résolution de problème, d'expérience, de plateforme ou de revenus
- Poser des questions critiques :
  - Quel est le minimum qui ferait dire aux utilisateurs « c'est utile » ?
  - Qu'est-ce qui ferait dire aux investisseurs/partenaires « cela a du potentiel » ?
  - Quel est le chemin le plus rapide vers un apprentissage validé ?
- Guider vers l'approche MVP appropriée pour leur produit

### 3. Cadre de décision de cadrage

Utiliser une prise de décision structurée pour le périmètre :

**Analyse Must-Have :**
- Guider l'identification des nécessités absolues du MVP
- Pour chaque parcours et critère de succès, demander :
  - Sans ceci, le produit échoue-t-il ?
  - Cela peut-il être manuel initialement ?
  - Est-ce un point bloquant pour les early adopters ?
- Analyser les parcours pour les essentiels du MVP

**Analyse Nice-to-Have :**
- Identifier ce qui pourrait être ajouté plus tard :
  - Fonctionnalités qui améliorent mais ne sont pas essentielles
  - Types d'utilisateurs qui peuvent être ajoutés plus tard
  - Fonctionnalités avancées qui s'appuient sur le MVP
- Demander quelles fonctionnalités pourraient être ajoutées dans les versions 2, 3, etc.

**⚠️ POINT DE CONFIRMATION DE CHANGEMENT DE PÉRIMÈTRE :**
- Si vous croyez qu'une exigence spécifiée par l'utilisateur devrait être différée ou retirée du périmètre, vous DEVEZ présenter cela à l'utilisateur et obtenir une confirmation explicite AVANT de la retirer du périmètre
- Le formuler comme une recommandation, pas une décision : « Je recommanderais de différer X parce que [raison]. Êtes-vous d'accord, ou devrait-elle rester dans le périmètre ? »
- NE JAMAIS déplacer silencieusement les exigences utilisateur vers une phase ultérieure ou les exclure du MVP
- Avant de créer tout artefact phasé conséquent (ex. tags de phase, libellés ou prompts de suivi), présenter la création d'artefact comme une recommandation et procéder uniquement après approbation explicite de l'utilisateur

### 4. Feuille de route progressive des fonctionnalités

**CRITIQUE : Le phasage n'est PAS automatique. Vérifiez d'abord l'entrée de l'utilisateur.**

Avant de proposer toute approche phasée, examinez les documents d'entrée de l'utilisateur :

- **Si les documents d'entrée définissent tous les composants comme exigences essentielles sans mention de phases :** Présentez toutes les exigences comme un périmètre de release unique. NE PAS inventer de phases ou déplacer les exigences vers des phases futures fabriquées.
- **Si les documents d'entrée demandent explicitement une livraison phasée :** Guider le mappage des fonctionnalités à travers les phases définies par l'utilisateur.
- **Si le périmètre n'est pas clair :** DEMANDEZ à l'utilisateur s'il veut une livraison phasée ou une release unique avant de procéder.

**Lorsque l'utilisateur demande une livraison phasée**, guider le mappage des fonctionnalités à travers les phases que l'utilisateur définit :

- Utiliser les libellés et le nombre de phases fournis par l'utilisateur ; si aucun n'est fourni, proposer un défaut (ex. MVP/Croissance/Vision) et demander confirmation
- Assurer une progression et des dépendances claires entre les phases

**Chaque phase doit aborder :**

- Livraison de valeur utilisateur essentielle et parcours essentiels pour cette phase
- Limites claires sur ce qui est livré dans chaque phase
- Dépendances avec les phases précédentes

**Lorsque l'utilisateur choisit une release unique**, définir le périmètre complet :

- Toutes les exigences spécifiées par l'utilisateur sont dans le périmètre
- Focaliser l'analyse must-have vs nice-to-have sur ce qui est livré dans cette release
- NE PAS créer de phases — utiliser la priorité must-have/nice-to-have au sein de la release unique

**Si livraison phasée :** « Où votre vision actuelle s'inscrit-elle dans cette séquence de développement ? »
**Si release unique :** « Comment votre vision actuelle se mappe-t-elle à cette release à venir ? »

### 5. Cadrage basé sur les risques

Identifier et atténuer les risques de cadrage :

**Risques techniques :**
« En regardant vos exigences d'innovation et de domaine :

- Quel est l'aspect le plus techniquement défiant ?
- Pourrions-nous simplifier l'implémentation initiale ?
- Quelle est l'hypothèse la plus risquée concernant la faisabilité technologique ? »

**Risques de marché :**

- Quel est le plus grand risque de marché ?
- Comment le MVP adresse-t-il cela ?
- Quel apprentissage avons-nous besoin pour dé-risquer cela ? »

**Risques de ressources :**

- Que se passe-t-il si nous avons moins de ressources que prévu ?
- Quelle est la taille minimale absolue d'équipe nécessaire ?
- Pouvons-nous lancer avec un ensemble de fonctionnalités plus petit ? »

### 6. Générer le contenu de cadrage

Préparer une section de cadrage exhaustive :

#### Structure du contenu :

**Si l'utilisateur a choisi la livraison phasée :**

```markdown
## Cadrage du projet et développement phasé

### Stratégie et philosophie MVP

**Approche MVP :** {{chosen_mvp_approach}}
**Exigences en ressources :** {{mvp_team_size_and_skills}}

### Ensemble de fonctionnalités MVP (Phase 1)

**Parcours utilisateurs essentiels supportés :**
{{essential_journeys_for_mvp}}

**Capacités Must-Have :**
{{list_of_essential_mvp_features}}

### Fonctionnalités post-MVP

**Phase 2 (Post-MVP) :**
{{planned_growth_features}}

**Phase 3 (Expansion) :**
{{planned_expansion_features}}

### Stratégie d'atténuation des risques

**Risques techniques :** {{mitigation_approach}}
**Risques de marché :** {{validation_approach}}
**Risques de ressources :** {{contingency_approach}}
```

**Si l'utilisateur a choisi une release unique (sans phasage) :**

```markdown
## Cadrage du projet

### Stratégie et philosophie

**Approche :** {{chosen_approach}}
**Exigences en ressources :** {{team_size_and_skills}}

### Ensemble complet de fonctionnalités

**Parcours utilisateurs essentiels supportés :**
{{all_journeys}}

**Capacités Must-Have :**
{{list_of_must_have_features}}

**Capacités Nice-to-Have :**
{{list_of_nice_to_have_features}}

### Stratégie d'atténuation des risques

**Risques techniques :** {{mitigation_approach}}
**Risques de marché :** {{validation_approach}}
**Risques de ressources :** {{contingency_approach}}
```

### 7. Présenter les OPTIONS DE MENU

Présenter les décisions de cadrage pour examen, puis afficher le menu :
- Montrer le plan stratégique de cadrage (en utilisant la structure de l'étape 6)
- Mettre en évidence les limites de release et la priorisation (feuille de route phasée uniquement si la livraison phasée a été sélectionnée)
- Demander s'ils aimeraient affiner davantage, obtenir d'autres perspectives, ou procéder
- Présenter les options de menu naturellement dans le cadre de la conversation

Afficher : « **Sélectionnez :** [A] Élicitation Avancée [P] Mode Party [C] Continuer vers Exigences Fonctionnelles (Étape 9 sur 11) »

#### Logique de gestion du menu :
- SI A : Invoquer le skill `bmad-advanced-elicitation` avec l'analyse de cadrage actuelle, traiter les insights améliorés qui reviennent, demander à l'utilisateur s'il accepte les améliorations, si oui mettre à jour le contenu puis ré-afficher le menu, si non garder le contenu original puis ré-afficher le menu
- SI P : Invoquer le skill `bmad-party-mode` avec le contexte de cadrage, traiter les insights collaboratifs sur les décisions MVP et de feuille de route, demander à l'utilisateur s'il accepte les changements, si oui mettre à jour le contenu puis ré-afficher le menu, si non garder le contenu original puis ré-afficher le menu
- SI C : Ajouter le contenu final à {outputFile}, mettre à jour le frontmatter en ajoutant le nom de cette étape à la fin du tableau stepsCompleted (ajouter aussi `releaseMode: phased` ou `releaseMode: single-release` au frontmatter selon le choix de l'utilisateur), puis lire entièrement et suivre : ./step-09-functional.md
- SI Autre chose : aider l'utilisateur à répondre, puis ré-afficher le menu

#### RÈGLES D'EXÉCUTION :
- TOUJOURS s'arrêter et attendre l'entrée utilisateur après avoir présenté le menu
- UNIQUEMENT procéder à l'étape suivante quand l'utilisateur sélectionne 'C'
- Après l'exécution d'autres éléments de menu, retourner à ce menu

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajouter le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE SUCCÈS :

✅ Document PRD complet analysé pour les implications de périmètre
✅ Approche MVP stratégique définie et justifiée
✅ Limites claires de fonctionnalités établies (phasé ou single-release, selon la préférence de l'utilisateur)
✅ Toutes les exigences spécifiées par l'utilisateur prises en compte — aucune retirée ou différée silencieusement
✅ Toute recommandation de réduction de périmètre présentée à l'utilisateur avec justification et confirmation explicite obtenue
✅ Risques clés identifiés et stratégies d'atténuation définies
✅ L'utilisateur accepte explicitement les décisions de périmètre
✅ Menu A/P/C présenté et géré correctement
✅ Contenu correctement ajouté au document quand C est sélectionné

## MODES D'ÉCHEC :

❌ Ne pas analyser le PRD complet avant de prendre des décisions de cadrage
❌ Prendre des décisions de périmètre sans justification stratégique
❌ Ne pas obtenir l'accord explicite de l'utilisateur sur les limites du MVP
❌ Manquer une analyse critique des risques
❌ Ne pas présenter le menu A/P/C après la génération de contenu
❌ **CRITIQUE** : Retirer ou différer silencieusement des exigences que l'utilisateur a explicitement incluses dans ses documents d'entrée
❌ **CRITIQUE** : Inventer un phasage (MVP/Croissance/Vision) lorsque l'utilisateur n'a pas demandé de livraison phasée
❌ **CRITIQUE** : Prendre des décisions de cadrage conséquentes (ce qui est dans/hors périmètre) sans confirmation explicite de l'utilisateur
❌ **CRITIQUE** : Créer des artefacts phasés (tags, libellés, prompts de suivi) sans approbation explicite de l'utilisateur

❌ **CRITIQUE** : Lire seulement partiellement le fichier d'étape - mène à une compréhension incomplète et de mauvaises décisions
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre entièrement le fichier d'étape suivant
❌ **CRITIQUE** : Prendre des décisions sans compréhension complète des exigences et protocoles d'étape

## ÉTAPE SUIVANTE :

Après que l'utilisateur sélectionne 'C' et que le contenu est sauvegardé dans le document, charger ./step-09-functional.md.

Rappel : NE PAS procéder à step-09 tant que l'utilisateur ne sélectionne pas explicitement 'C' depuis le menu A/P/C et que le contenu est sauvegardé !
