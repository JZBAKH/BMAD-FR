# Étape 12 : Achèvement du workflow

**Étape finale - Compléter le PRD**

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- ✅ CECI EST UNE ÉTAPE FINALE - Achèvement du workflow requis
- 📖 CRITIQUE : TOUJOURS lire le fichier d'étape complet avant toute action
- 🛑 PAS de génération de contenu - ceci est une étape de clôture
- 📋 FINALISER le document et mettre à jour le statut du workflow
- 💬 SE FOCALISER sur l'achèvement, les options de validation et les étapes suivantes
- 🎯 METTRE À JOUR les fichiers de statut du workflow avec les informations d'achèvement
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant toute action
- 💾 Mettre à jour le fichier de statut principal du workflow avec les informations d'achèvement (s'il existe)
- 📖 Offrir les options de workflow de validation à l'utilisateur
- 🚫 NE PAS charger d'étapes additionnelles après celle-ci

## PROTOCOLES D'ÉTAPE DE TERMINAISON :

- Ceci est une étape FINALE - achèvement du workflow requis
- Mettre à jour le fichier de statut du workflow avec le document finalisé
- Suggérer la validation et les étapes de workflow suivantes
- Marquer le workflow comme complet dans le suivi de statut

## LIMITES DE CONTEXTE :

- Le document PRD complet et peaufiné est disponible depuis toutes les étapes précédentes
- Le frontmatter du workflow montre toutes les étapes complétées y compris le polissage
- Tout le contenu collaboratif a été généré, sauvegardé et optimisé
- Se focaliser sur l'achèvement, les options de validation et les étapes suivantes

## VOTRE TÂCHE :

Compléter le workflow PRD, mettre à jour les fichiers de statut, offrir les options de validation et suggérer les étapes suivantes pour le projet.

## SÉQUENCE D'ACHÈVEMENT DU WORKFLOW :

### 1. Annoncer l'achèvement du workflow

Informer l'utilisateur que le PRD est complet et peaufiné :
- Célébrer l'achèvement réussi du PRD exhaustif
- Résumer toutes les sections qui ont été créées
- Souligner que le document a été peaufiné pour le flux et la cohérence
- Mettre l'accent sur le fait que le document est prêt pour le travail en aval

### 2. Mise à jour du statut du workflow

Mettre à jour le fichier de statut principal du workflow s'il en existe un :

- Vérifier la configuration du workflow pour un fichier de statut (s'il en existe un)
- Mettre à jour workflow_status["prd"] = "{outputFile}"
- Sauvegarder le fichier, en préservant tous les commentaires et la structure
- Marquer l'horodatage actuel comme heure d'achèvement

### 3. Options de workflow de validation

Offrir des workflows de validation pour s'assurer que le PRD est prêt pour l'implémentation :

**Workflows de validation disponibles :**

**Option 1 : Vérifier la préparation à l'implémentation** (`skill:bmad-check-implementation-readiness`)
- Valide que le PRD a toutes les informations nécessaires au développement
- Vérifie l'exhaustivité de la couverture des thèmes
- Examine l'alignement UX avec les exigences
- Évalue la qualité et la préparation des thèmes
- Identifie les lacunes avant le début du travail d'architecture/design

**Quand l'utiliser :** Avant de commencer l'architecture technique ou la décomposition en thèmes

**Option 2 : Passer pour l'instant**
- Procéder directement aux workflows suivants (architecture, UX, thèmes)
- La validation peut être faite plus tard si nécessaire
- Certaines équipes préfèrent valider pendant les revues d'architecture

### 4. Suggérer les workflows suivants

PRD complet. Invoquer le skill `bmad-help`.

### 5. Confirmation finale d'achèvement

- Confirmer l'achèvement avec l'utilisateur et résumer ce qui a été accompli
- Le document contient maintenant : Résumé Exécutif, Critères de Succès, Parcours Utilisateurs, Exigences de Domaine (si applicable), Analyse d'Innovation (si applicable), Exigences par Type de Projet, Exigences Fonctionnelles (contrat de capacité), Exigences Non-Fonctionnelles, et a été peaufiné pour le flux et la cohérence
- Demander s'ils aimeraient lancer le workflow de validation ou procéder aux workflows suivants

## MÉTRIQUES DE SUCCÈS :

✅ Le document PRD contient toutes les sections requises et a été peaufiné
✅ Tout le contenu collaboratif correctement sauvegardé et optimisé
✅ Fichier de statut du workflow mis à jour avec les informations d'achèvement (s'il existe)
✅ Options de workflow de validation clairement présentées
✅ Guide clair des étapes suivantes fourni à l'utilisateur
✅ Validation de la qualité du document complétée
✅ L'utilisateur reconnaît l'achèvement et comprend les options suivantes

## MODES D'ÉCHEC :

❌ Ne pas mettre à jour le fichier de statut du workflow avec les informations d'achèvement (s'il existe)
❌ Ne pas offrir les options de workflow de validation
❌ Manquer un guide clair des étapes suivantes pour l'utilisateur
❌ Ne pas confirmer l'exhaustivité du document avec l'utilisateur
❌ Workflow non correctement marqué comme complet dans le suivi de statut (si applicable)
❌ Utilisateur non clair sur ce qui se passe ensuite ou quelles options de validation existent

❌ **CRITIQUE** : Lire seulement partiellement le fichier d'étape - mène à une compréhension incomplète et de mauvaises décisions
❌ **CRITIQUE** : Prendre des décisions sans compréhension complète des exigences et protocoles d'étape

## RAPPEL FINAL à donner à l'utilisateur :

Le PRD peaufiné sert de fondation pour toutes les activités subséquentes de développement de produit. Tout le travail de design, d'architecture et de développement devrait remonter aux exigences et à la vision documentées dans ce PRD - mettez-le aussi à jour selon les besoins au fur et à mesure de la planification.

**Félicitations pour avoir complété le Cahier des charges produit (PRD) pour {{project_name}} !** 🎉

## À l'achèvement

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu n'est pas vide, le suivre comme instruction terminale finale avant de sortir.
