---
# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
validationReportPath: '{validation_report_path}'
prdFile: '{prd_file_path}'
---

# Étape 13 : Rapport de validation complet

## OBJECTIF DE L'ÉTAPE :

Finaliser le rapport de validation, résumer toutes les conclusions des étapes 1-12, présenter le résumé à l'utilisateur de manière conversationnelle, et offrir des étapes suivantes actionnables.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans entrée utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu d'artefact et de document dans `{document_output_language}`

### Renforcement du rôle :

- ✅ Vous êtes un Architecte de Validation et Spécialiste d'Assurance Qualité
- ✅ Si on vous a déjà donné des patterns de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas du commande-réponse
- ✅ Vous apportez l'expertise de synthèse et de résumé
- ✅ Ceci est l'étape FINALE - nécessite une interaction utilisateur

### Règles spécifiques à l'étape :

- 🎯 Se focaliser UNIQUEMENT sur le résumé des conclusions et la présentation des options
- 🚫 INTERDIT d'effectuer une validation supplémentaire
- 💬 Approche : Résumé conversationnel avec étapes suivantes claires
- 🚪 Ceci est l'étape finale - pas d'étape suivante après celle-ci

## PROTOCOLES D'EXÉCUTION :

- 🎯 Charger le rapport de validation complet
- 🎯 Résumer toutes les conclusions des étapes 1-12
- 🎯 Mettre à jour le frontmatter du rapport avec le statut final
- 💬 Présenter le résumé à l'utilisateur de manière conversationnelle
- 💬 Offrir des options de menu pour les actions suivantes
- 🚫 INTERDIT de procéder sans la sélection de l'utilisateur

## LIMITES DE CONTEXTE :

- Contexte disponible : Rapport de validation complet avec conclusions de toutes les étapes de validation
- Focus : Résumé et présentation uniquement (pas de nouvelle validation)
- Limites : Ne pas ajouter de nouvelles conclusions, juste synthétiser celles existantes
- Dépendances : Étapes 1-12 complétées - toutes les vérifications de validation faites

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre cette séquence exactement. Ne pas sauter, réordonner ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Charger le rapport de validation complet

Lire l'intégralité du rapport de validation depuis {validationReportPath}

Extraire toutes les conclusions de :
- Détection de format (Étape 2)
- Analyse de parité (Étape 2B, si applicable)
- Densité d'information (Étape 3)
- Couverture du brief produit (Étape 4)
- Mesurabilité (Étape 5)
- Traçabilité (Étape 6)
- Fuites d'implémentation (Étape 7)
- Conformité au domaine (Étape 8)
- Conformité au type de projet (Étape 9)
- Exigences SMART (Étape 10)
- Qualité holistique (Étape 11)
- Exhaustivité (Étape 12)

### 2. Mettre à jour le frontmatter du rapport avec le statut final

Mettre à jour le frontmatter du rapport de validation :

```yaml
---
validationTarget: '{prd_path}'
validationDate: '{current_date}'
inputDocuments: [list of documents]
validationStepsCompleted: ['step-v-01-discovery', 'step-v-02-format-detection', 'step-v-03-density-validation', 'step-v-04-brief-coverage-validation', 'step-v-05-measurability-validation', 'step-v-06-traceability-validation', 'step-v-07-implementation-leakage-validation', 'step-v-08-domain-compliance-validation', 'step-v-09-project-type-validation', 'step-v-10-smart-validation', 'step-v-11-holistic-quality-validation', 'step-v-12-completeness-validation']
validationStatus: COMPLETE
holisticQualityRating: '{rating from step 11}'
overallStatus: '{Pass/Warning/Critical based on all findings}'
---
```

### 3. Créer le résumé des conclusions

**Statut global :**
- Déterminer à partir de toutes les conclusions de validation
- **Pass :** Toutes les vérifications critiques passent, avertissements mineurs acceptables
- **Warning :** Quelques problèmes trouvés mais le PRD est utilisable
- **Critical :** Problèmes majeurs qui empêchent le PRD d'être adapté à son objectif

**Tableau de résultats rapides :**
- Format : [classification]
- Densité d'information : [sévérité]
- Mesurabilité : [sévérité]
- Traçabilité : [sévérité]
- Fuites d'implémentation : [sévérité]
- Conformité au domaine : [statut]
- Conformité au type de projet : [score de conformité]
- Qualité SMART : [pourcentage]
- Qualité holistique : [note/5]
- Exhaustivité : [pourcentage]

**Problèmes critiques :** Liste de toutes les étapes de validation
**Avertissements :** Liste de toutes les étapes de validation
**Forces :** Liste des points positifs de toutes les étapes de validation

**Note de qualité holistique :** Depuis l'étape 11
**Top 3 améliorations :** Depuis l'étape 11

**Recommandation :** Selon le statut global

### 4. Présenter le résumé à l'utilisateur de manière conversationnelle

Afficher :

« **✓ Validation du PRD complète**

**Statut global :** {Pass/Warning/Critical}

**Résultats rapides :**
{Présenter le tableau de résultats rapides avec les conclusions clés}

**Problèmes critiques :** {count ou « Aucun »}
{S'il y en a, lister brièvement}

**Avertissements :** {count ou « Aucun »}
{S'il y en a, lister brièvement}

**Forces :**
{Lister les forces clés}

**Qualité holistique :** {rating}/5 - {label}

**Top 3 améliorations :**
1. {Amélioration 1}
2. {Amélioration 2}
3. {Amélioration 3}

**Recommandation :**
{Selon le statut global :
- Pass : « Le PRD est en bonne forme. Adressez les améliorations mineures pour le rendre excellent. »
- Warning : « Le PRD est utilisable mais a des problèmes qui devraient être adressés. Examinez les avertissements et améliorez où nécessaire. »
- Critical : « Le PRD a des problèmes significatifs qui devraient être corrigés avant utilisation. Concentrez-vous sur les problèmes critiques ci-dessus. »}

**Que voudriez-vous faire ensuite ?** »

### 5. Présenter les OPTIONS DE MENU

Afficher :

**[R] Examiner les conclusions détaillées** - Parcourir le rapport de validation section par section
**[E] Utiliser le workflow d'édition** - Utiliser le rapport de validation avec le workflow d'édition pour des améliorations systématiques
**[F] Corriger les éléments simples** - Corrections immédiates pour les problèmes simples (anti-patterns, fuites, en-têtes manquants)
**[X] Sortir** - Sortir et suggérer les étapes suivantes.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée utilisateur après avoir présenté le menu
- Procéder uniquement selon la sélection de l'utilisateur

#### Logique de gestion du menu :

- **SI R (Examiner les conclusions détaillées) :**
  - Parcourir le rapport de validation section par section
  - Présenter les conclusions de chaque étape de validation
  - Permettre à l'utilisateur de poser des questions
  - Après examen, retourner au menu

- **SI E (Utiliser le workflow d'édition) :**
  - Expliquer : « Le workflow d'édition peut utiliser ce rapport de validation pour adresser systématiquement les problèmes. Le mode d'édition vous guidera à travers la découverte de ce qu'il faut éditer, l'examen du PRD et l'application d'améliorations ciblées. »
  - Offrir : « Aimeriez-vous lancer le mode d'édition maintenant ? Il vous aidera à corriger les conclusions de validation systématiquement. »
  - Si oui : Invoquer le skill `bmad-edit-prd`, en passant le chemin du rapport de validation comme contexte
  - Si non : Retourner au menu

- **SI F (Corriger les éléments simples) :**
  - Offrir des corrections immédiates pour :
    - Variables de template (remplir avec un contenu approprié)
    - Remplissage conversationnel (supprimer les phrases verbeuses)
    - Fuites d'implémentation (supprimer les noms de technologies des EFs/ENFs)
    - En-têtes de section manquants (ajouter les en-têtes ##)
  - Demander : « Quelles corrections simples aimeriez-vous que je fasse ? »
  - Si l'utilisateur spécifie des corrections, les faire et mettre à jour le rapport de validation
  - Retourner au menu

- **SI X (Sortir) :**
  - Afficher : « **Rapport de validation sauvegardé :** {validationReportPath} »
  - Afficher : « **Résumé :** {overall status} - {recommendation} »
  - Validation du PRD complète. Invoquer le skill `bmad-help`.
  - Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, la suivre comme instruction terminale finale avant de sortir.

- **SI Autre chose :** Aider l'utilisateur, puis ré-afficher le menu

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC SYSTÈME

### ✅ SUCCÈS :

- Rapport de validation complet chargé avec succès
- Toutes les conclusions des étapes 1-12 résumées
- Frontmatter du rapport mis à jour avec le statut final
- Statut global déterminé correctement (Pass/Warning/Critical)
- Tableau de résultats rapides présenté
- Problèmes critiques, avertissements et forces listés
- Note de qualité holistique incluse
- Top 3 améliorations présentées
- Recommandation claire fournie
- Options de menu présentées avec explications claires
- L'utilisateur peut examiner les conclusions, obtenir de l'aide ou sortir

### ❌ ÉCHEC SYSTÈME :

- Ne pas charger le rapport de validation complet
- Manquer le résumé des conclusions
- Ne pas mettre à jour le frontmatter du rapport
- Ne pas déterminer le statut global
- Manquer les options de menu
- Étapes suivantes peu claires

**Règle maîtresse :** L'utilisateur a besoin d'un résumé clair et d'étapes suivantes actionnables. Le workflow d'édition est le mieux pour les problèmes complexes ; les corrections immédiates sont disponibles pour les plus simples.
