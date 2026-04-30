# Étape 7 : Validation de l'Architecture & Finalisation

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant d'entreprendre toute action — une compréhension partielle mène à des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue et comprise avant de continuer
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la validation de la cohérence et de l'exhaustivité architecturales
- ✅ VALIDER que toutes les exigences sont couvertes par les décisions architecturales
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant d'entreprendre toute action
- ✅ Effectuer des contrôles de validation complets sur l'architecture entière
- ⚠️ Présenter le menu A/P/C après avoir généré les résultats de validation
- 💾 Sauvegarder UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]` avant de charger l'étape suivante
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné

## MENUS DE COLLABORATION (A/P/C) :

Cette étape générera du contenu et présentera des choix :

- **A (Elicitation Avancée)** : Utiliser les protocoles de découverte pour traiter les problèmes architecturaux complexes trouvés lors de la validation
- **P (Mode Party)** : Apporter plusieurs perspectives pour résoudre les préoccupations de validation
- **C (Continuer)** : Sauvegarder les résultats de validation et finaliser l'architecture

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez le skill `bmad-advanced-elicitation`
- Quand 'P' est sélectionné : Invoquez le skill `bmad-party-mode`
- Les PROTOCOLES reviennent toujours à l'affichage du menu A/P/C de cette étape une fois que A ou P est terminé
- L'utilisateur accepte/rejette les modifications du protocole avant de continuer

## LIMITES DE CONTEXTE :

- Le document d'architecture complet avec toutes les sections est disponible
- Toutes les décisions architecturales, modèles et structures sont définis
- Se concentrer sur la validation, l'analyse des lacunes et la vérification de la cohérence
- Préparer la transition vers la phase d'implémentation

## VOTRE TÂCHE :

Valider l'architecture complète pour sa cohérence, son exhaustivité et sa capacité à guider les agents IA à travers une implémentation cohérente.

## SÉQUENCE DE VALIDATION :

### 1. Validation de la Cohérence

Vérifier que toutes les décisions architecturales fonctionnent ensemble :

**Compatibilité des Décisions :**

- Tous les choix technologiques fonctionnent-ils ensemble sans conflits ?
- Toutes les versions sont-elles compatibles entre elles ?
- Les modèles s'alignent-ils avec les choix technologiques ?
- Y a-t-il des décisions contradictoires ?

**Cohérence des Modèles :**

- Les modèles d'implémentation supportent-ils les décisions architecturales ?
- Les conventions de nommage sont-elles cohérentes dans tous les domaines ?
- Les modèles de structure s'alignent-ils avec la pile technologique ?
- Les modèles de communication sont-ils cohérents ?

**Alignement de la Structure :**

- La structure du projet supporte-t-elle toutes les décisions architecturales ?
- Les frontières sont-elles correctement définies et respectées ?
- La structure permet-elle les modèles choisis ?
- Les points d'intégration sont-ils correctement structurés ?

### 2. Validation de la Couverture des Exigences

Vérifier que toutes les exigences du projet sont architecturalement supportées :

**Depuis les Thèmes/Epics (si disponibles) :**

- Chaque thème dispose-t-il d'un support architectural ?
- Tous les cas d'usage sont-ils implémentables avec ces décisions ?
- Les dépendances inter-thèmes sont-elles gérées architecturalement ?
- Y a-t-il des lacunes dans la couverture des thèmes ?

**Depuis les Catégories de FR (si pas de thèmes) :**

- Chaque exigence fonctionnelle dispose-t-elle d'un support architectural ?
- Toutes les catégories de FR sont-elles entièrement couvertes par les décisions architecturales ?
- Les FRs transversales sont-elles correctement traitées ?
- Y a-t-il des capacités architecturales manquantes ?

**Exigences Non-Fonctionnelles :**

- Les exigences de performance sont-elles traitées architecturalement ?
- Les exigences de sécurité sont-elles entièrement couvertes ?
- Les considérations de scalabilité sont-elles correctement gérées ?
- Les exigences de conformité sont-elles architecturalement supportées ?

### 3. Validation de l'État Prêt pour l'Implémentation

Évaluer si les agents IA peuvent implémenter de manière cohérente :

**Exhaustivité des Décisions :**

- Toutes les décisions critiques sont-elles documentées avec les versions ?
- Les modèles d'implémentation sont-ils suffisamment complets ?
- Les règles de cohérence sont-elles claires et applicables ?
- Des exemples sont-ils fournis pour tous les modèles majeurs ?

**Exhaustivité de la Structure :**

- La structure du projet est-elle complète et spécifique ?
- Tous les fichiers et répertoires sont-ils définis ?
- Les points d'intégration sont-ils clairement spécifiés ?
- Les frontières des composants sont-elles bien définies ?

**Exhaustivité des Modèles :**

- Tous les points de conflit potentiels sont-ils traités ?
- Les conventions de nommage sont-elles complètes ?
- Les modèles de communication sont-ils entièrement spécifiés ?
- Les modèles de processus (gestion des erreurs, etc.) sont-ils complets ?

### 4. Analyse des Lacunes

Identifier et documenter tout élément manquant :

**Lacunes Critiques :**

- Décisions architecturales manquantes qui bloquent l'implémentation
- Modèles incomplets qui pourraient causer des conflits
- Éléments structurels manquants nécessaires au développement
- Points d'intégration non définis

**Lacunes Importantes :**

- Domaines nécessitant une spécification plus détaillée
- Modèles qui pourraient être plus complets
- Documentation qui aiderait à l'implémentation
- Exemples qui clarifieraient des décisions complexes

**Lacunes Souhaitables (Nice-to-Have) :**

- Modèles supplémentaires qui seraient utiles
- Documentation supplémentaire
- Recommandations d'outillage
- Optimisations du workflow de développement

### 5. Traiter les Problèmes de Validation

Pour tous les problèmes trouvés, faciliter la résolution :

**Problèmes Critiques :**
"J'ai trouvé certains problèmes qui doivent être résolus avant l'implémentation :

{{critical_issue_description}}

Ceux-ci pourraient causer des problèmes d'implémentation. Comment souhaitez-vous résoudre cela ?"

**Problèmes Importants :**
"J'ai remarqué quelques domaines qui pourraient être améliorés :

{{important_issue_description}}

Ceux-ci ne sont pas bloquants, mais leur résolution rendrait l'implémentation plus fluide. Devrions-nous travailler sur ces points ?"

**Problèmes Mineurs :**
"Voici quelques suggestions mineures d'amélioration :

{{minor_issue_description}}

Ce sont des affinements optionnels. Souhaitez-vous traiter l'un de ces points ?"

### 6. Générer le Contenu de Validation

Préparez le contenu à ajouter au document :

#### Structure du Contenu :

```markdown
## Résultats de Validation de l'Architecture

### Validation de la Cohérence ✅

**Compatibilité des Décisions :**
{{assessment_of_how_all_decisions_work_together}}

**Cohérence des Modèles :**
{{verification_that_patterns_support_decisions}}

**Alignement de la Structure :**
{{confirmation_that_structure_supports_architecture}}

### Validation de la Couverture des Exigences ✅

**Couverture des Thèmes/Fonctionnalités :**
{{verification_that_all_epics_or_features_are_supported}}

**Couverture des Exigences Fonctionnelles :**
{{confirmation_that_all_FRs_are_architecturally_supported}}

**Couverture des Exigences Non-Fonctionnelles :**
{{verification_that_NFRs_are_addressed}}

### Validation de l'État Prêt pour l'Implémentation ✅

**Exhaustivité des Décisions :**
{{assessment_of_decision_documentation_completeness}}

**Exhaustivité de la Structure :**
{{evaluation_of_project_structure_completeness}}

**Exhaustivité des Modèles :**
{{verification_of_implementation_patterns_completeness}}

### Résultats de l'Analyse des Lacunes

{{gap_analysis_findings_with_priority_levels}}

### Problèmes de Validation Traités

{{description_of_any_issues_found_and_resolutions}}

### Liste de Vérification de l'Exhaustivité de l'Architecture

**✅ Analyse des Exigences**

- [x] Contexte du projet analysé en profondeur
- [x] Échelle et complexité évaluées
- [x] Contraintes techniques identifiées
- [x] Préoccupations transversales cartographiées

**✅ Décisions Architecturales**

- [x] Décisions critiques documentées avec versions
- [x] Pile technologique entièrement spécifiée
- [x] Modèles d'intégration définis
- [x] Considérations de performance traitées

**✅ Modèles d'Implémentation**

- [x] Conventions de nommage établies
- [x] Modèles de structure définis
- [x] Modèles de communication spécifiés
- [x] Modèles de processus documentés

**✅ Structure du Projet**

- [x] Structure complète des répertoires définie
- [x] Frontières des composants établies
- [x] Points d'intégration cartographiés
- [x] Cartographie exigences vers structure complète

### Évaluation de l'État Prêt de l'Architecture

**Statut Général :** PRÊT POUR L'IMPLÉMENTATION

**Niveau de Confiance :** {{high/medium/low}} basé sur les résultats de validation

**Forces Clés :**
{{list_of_architecture_strengths}}

**Domaines pour Amélioration Future :**
{{areas_that_could_be_improved_later}}

### Transition vers l'Implémentation

**Directives pour les Agents IA :**

- Suivre toutes les décisions architecturales exactement comme documentées
- Utiliser les modèles d'implémentation de manière cohérente sur tous les composants
- Respecter la structure et les frontières du projet
- Se référer à ce document pour toutes les questions architecturales

**Première Priorité d'Implémentation :**
{{starter_template_command_or_first_architectural_step}}
```

### 7. Présenter le Contenu et le Menu

Affichez les résultats de validation et présentez les choix :

"J'ai terminé une validation complète de votre architecture.

**Résumé de la Validation :**

- ✅ Cohérence : Toutes les décisions fonctionnent ensemble
- ✅ Couverture : Toutes les exigences sont supportées
- ✅ État prêt : Les agents IA peuvent implémenter de manière cohérente

**Voici ce que je vais ajouter pour finaliser le document d'architecture :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Elicitation Avancée — Traiter toutes préoccupations architecturales complexes
[P] Mode Party — Revoir la validation sous différentes perspectives d'implémentation
[C] Continuer — Finaliser l'architecture et terminer le workflow

### 8. Gérer la Sélection du Menu

#### Si 'A' (Elicitation Avancée) :

- Invoquez le skill `bmad-advanced-elicitation` avec les problèmes de validation
- Traitez les solutions enrichies pour les préoccupations complexes
- Demandez à l'utilisateur : "Accepter ces améliorations architecturales ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'P' (Mode Party) :

- Invoquez le skill `bmad-party-mode` avec le contexte de validation
- Traitez les informations collaboratives sur l'état prêt pour l'implémentation
- Demandez à l'utilisateur : "Accepter ces changements pour les résultats de validation ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/architecture.md`
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Charger `./step-08-complete.md`

## AJOUT AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## INDICATEURS DE RÉUSSITE :

✅ Toutes les décisions architecturales validées pour leur cohérence
✅ Couverture complète des exigences vérifiée
✅ État prêt pour l'implémentation confirmé
✅ Toutes les lacunes identifiées et traitées
✅ Liste de vérification complète de validation terminée
✅ Menu A/P/C présenté et géré correctement
✅ Contenu correctement ajouté au document lorsque C est sélectionné

## MODES D'ÉCHEC :

❌ Sauter la validation de la compatibilité des décisions
❌ Ne pas vérifier que toutes les exigences sont architecturalement supportées
❌ Manquer des conflits potentiels d'implémentation
❌ Ne pas traiter les lacunes trouvées lors de la validation
❌ Fournir une liste de vérification de validation incomplète
❌ Ne pas présenter le menu A/P/C après la génération de contenu

❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le prochain fichier d'étape
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé, chargez `./step-08-complete.md` pour terminer le workflow et fournir des conseils d'implémentation.

Rappel : NE PAS passer à step-08 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
