# Étape 14 : Achèvement du workflow

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- ✅ CECI EST UNE ÉTAPE FINALE - Achèvement du workflow requis

- 📖 CRITIQUE : TOUJOURS lire le fichier d'étape complet avant toute action - une compréhension partielle mène à des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu et compris avant de procéder
- 🛑 PAS de génération de contenu - ceci est une étape de clôture
- 📋 FINALISER le document et mettre à jour le statut du workflow
- 💬 SE FOCALISER sur l'achèvement, la validation et les étapes suivantes
- 🎯 METTRE À JOUR les fichiers de statut du workflow avec les informations d'achèvement
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant toute action
- 💾 Mettre à jour le fichier de statut principal du workflow avec les informations d'achèvement
- 📖 Suggérer les étapes potentielles de workflow suivantes pour l'utilisateur
- 🚫 NE PAS charger d'étapes additionnelles après celle-ci

## PROTOCOLES D'ÉTAPE DE TERMINAISON :

- Ceci est une étape FINALE - achèvement du workflow requis
- 📖 Mettre à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste stepsCompleted pour indiquer que tout est terminé.
- Sortir le résumé d'achèvement et le guide des étapes suivantes
- Mettre à jour le fichier de statut principal du workflow avec le document finalisé
- Suggérer les étapes potentielles de workflow suivantes pour l'utilisateur
- Marquer le workflow comme complet dans le suivi de statut

## LIMITES DE CONTEXTE :

- Spécification UX design complète disponible depuis toutes les étapes précédentes
- Le frontmatter du workflow montre toutes les étapes complétées
- Tout le contenu collaboratif a été généré et sauvegardé
- Se focaliser sur l'achèvement, la validation et les étapes suivantes

## VOTRE TÂCHE :

Compléter le workflow UX design, mettre à jour les fichiers de statut, et suggérer les étapes suivantes pour le projet.

## SÉQUENCE D'ACHÈVEMENT DU WORKFLOW :

### 1. Annoncer l'achèvement du workflow

Informer l'utilisateur que l'UX design est complet :
« 🎉 **UX Design complet, {{user_name}} !**

J'ai collaboré avec succès avec vous pour créer une spécification UX design exhaustive pour {{project_name}}.

**Ce que nous avons accompli :**

- ✅ Compréhension du projet et insights utilisateurs
- ✅ Définition de l'expérience essentielle et de la réponse émotionnelle
- ✅ Analyse de patterns UX et inspiration
- ✅ Choix de design system et stratégie d'implémentation
- ✅ Définition des interactions essentielles et mécaniques d'expérience
- ✅ Fondation du design visuel (couleurs, typographie, espacement)
- ✅ Maquettes de directions de design et explorations visuelles
- ✅ Flux de parcours utilisateurs et design d'interaction
- ✅ Stratégie de composants et spécifications de composants personnalisés
- ✅ Patterns de cohérence UX pour les interactions courantes
- ✅ Stratégie de design responsive et accessibilité

**La spécification UX design complète est maintenant disponible à :** `{planning_artifacts}/ux-design-specification.md`

**Actifs visuels de support :**

- Visualiseur de thèmes de couleurs : `{planning_artifacts}/ux-color-themes.html`
- Maquettes de directions de design : `{planning_artifacts}/ux-design-directions.html`

Cette spécification est maintenant prête à guider le design visuel, l'implémentation et le développement. »

### 2. Mise à jour du statut du workflow

Mettre à jour le fichier de statut principal du workflow :

- Charger le fichier de statut du workflow du projet (s'il en existe un)
- Mettre à jour workflow_status["create-ux-design"] = `{planning_artifacts}/ux-design-specification.md`
- Sauvegarder le fichier, en préservant tous les commentaires et la structure
- Marquer l'horodatage actuel comme heure d'achèvement

### 3. Suggérer les étapes suivantes

UX Design complet. Invoquer le skill `bmad-help`.

### 5. Confirmation finale d'achèvement

Féliciter l'utilisateur pour l'achèvement de l'UX que vous avez tous deux complété ensemble.



## MÉTRIQUES DE SUCCÈS :

✅ La spécification UX design contient toutes les sections requises
✅ Tout le contenu collaboratif correctement sauvegardé dans le document
✅ Fichier de statut du workflow mis à jour avec les informations d'achèvement
✅ Guide clair des étapes suivantes fourni à l'utilisateur
✅ Validation de la qualité du document complétée
✅ L'utilisateur reconnaît l'achèvement et comprend les options suivantes

## MODES D'ÉCHEC :

❌ Ne pas mettre à jour le fichier de statut du workflow avec les informations d'achèvement
❌ Manquer un guide clair des étapes suivantes pour l'utilisateur
❌ Ne pas confirmer l'exhaustivité du document avec l'utilisateur
❌ Workflow non correctement marqué comme complet dans le suivi de statut
❌ Utilisateur non clair sur ce qui se passe ensuite

❌ **CRITIQUE** : Lire seulement partiellement le fichier d'étape - mène à une compréhension incomplète et de mauvaises décisions
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre entièrement le fichier d'étape suivant
❌ **CRITIQUE** : Prendre des décisions sans compréhension complète des exigences et protocoles d'étape

## CHECKLIST D'ACHÈVEMENT DU WORKFLOW :

### Spécification de design complète :

- [ ] Résumé exécutif et compréhension du projet
- [ ] Définition de l'expérience essentielle et de la réponse émotionnelle
- [ ] Analyse de patterns UX et inspiration
- [ ] Choix de design system et stratégie
- [ ] Définition des mécaniques d'interaction essentielles
- [ ] Fondation du design visuel (couleurs, typographie, espacement)
- [ ] Décisions et maquettes de directions de design
- [ ] Flux de parcours utilisateurs et design d'interaction
- [ ] Stratégie et spécifications de composants
- [ ] Documentation des patterns de cohérence UX
- [ ] Stratégie de design responsive et accessibilité

### Processus complet :

- [ ] Toutes les étapes complétées avec confirmation utilisateur
- [ ] Tout le contenu sauvegardé dans le document de spécification
- [ ] Frontmatter correctement mis à jour avec toutes les étapes
- [ ] Fichier de statut du workflow mis à jour avec achèvement
- [ ] Étapes suivantes clairement communiquées

## GUIDE DES ÉTAPES SUIVANTES :

**Options immédiates :**

1. **Génération de wireframes** - Créer des layouts basse-fidélité basés sur la spécification UX
2. **Prototype interactif** - Construire des prototypes cliquables pour les tests
3. **Architecture solution** - Design technique avec contexte UX
4. **Design visuel Figma** - Implémentation UI haute-fidélité
5. **Création de thèmes** - Décomposer les exigences UX pour le développement

**Séquence recommandée :**
Pour les équipes axées design : Wireframes → Prototypes → Design Figma → Développement
Pour les équipes techniques : Architecture → Création de thèmes → Développement

Considérer la capacité de l'équipe, la timeline, et si la validation utilisateur est nécessaire avant l'implémentation.

## FINALISATION DU WORKFLOW :

- Définir `lastStep = 14` dans le frontmatter du document
- Mettre à jour le fichier de statut du workflow avec l'horodatage d'achèvement
- Fournir le résumé d'achèvement à l'utilisateur
- NE PAS charger d'étapes additionnelles

## RAPPEL FINAL :

Ce workflow UX design est maintenant complet. La spécification sert de fondation pour tout le travail visuel et de développement. Toutes les décisions de design, patterns et exigences sont documentés pour assurer une implémentation cohérente, accessible et centrée sur l'utilisateur.

**Félicitations pour avoir complété la Spécification UX Design pour {{project_name}} !** 🎉

**Livrables essentiels :**

- ✅ Spécification UX Design : `{planning_artifacts}/ux-design-specification.md`
- ✅ Visualiseur de thèmes de couleurs : `{planning_artifacts}/ux-color-themes.html`
- ✅ Directions de design : `{planning_artifacts}/ux-design-directions.html`

## À l'achèvement

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu n'est pas vide, le suivre comme instruction terminale finale avant de sortir.
