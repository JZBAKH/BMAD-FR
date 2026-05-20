---
name: 'step-v-13-report-complete'
description: "Rapport de Validation Terminé - Finaliser le rapport, synthétiser les résultats, présenter à l'utilisateur, proposer les prochaines étapes"

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
validationReportPath: '{validation_report_path}'
prdFile: '{prd_file_path}'
---

# Étape 13 : Rapport de Validation Terminé

## OBJECTIF DE L'ÉTAPE :

Finaliser le rapport de validation, synthétiser tous les résultats des étapes 1 à 12, présenter le résumé à l'utilisateur de manière conversationnelle et proposer des étapes suivantes exploitables.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité.
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une commande-réponse.
- ✅ Vous apportez votre expertise en synthèse et en résumé.
- ✅ C'est l'étape FINALE - nécessite une interaction avec l'utilisateur.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la synthèse des résultats et la présentation des options.
- 🚫 INTERDICTION d'effectuer des validations supplémentaires.
- 💬 Approche : Résumé conversationnel avec des prochaines étapes claires.
- 🚪 C'est l'étape finale - pas d'étape suivante après celle-ci.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Charger le rapport de validation complet.
- 🎯 Synthétiser tous les résultats des étapes 1 à 12.
- 🎯 Mettre à jour le frontmatter du rapport avec l'état final.
- 💬 Présenter le résumé à l'utilisateur de manière conversationnelle.
- 💬 Proposer des options de menu pour les prochaines actions.
- 🚫 INTERDICTION de procéder sans sélection de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Rapport de validation complet avec les résultats de toutes les étapes de validation.
- Focus : Résumé et présentation uniquement (pas de nouvelle validation).
- Limites : Ne pas ajouter de nouveaux résultats, synthétiser simplement l'existant.
- Dépendances : Étapes 1 à 12 terminées - tous les contrôles de validation effectués.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Charger le Rapport de Validation Complet

Lisez l'intégralité du rapport de validation depuis {validationReportPath}.

Extrayez tous les résultats de :

- Détection de Format (Étape 2)
- Analyse de Parité (Étape 2B, si applicable)
- Densité d'Information (Étape 3)
- Couverture du Product Brief (Étape 4)
- Mesurabilité (Étape 5)
- Traçabilité (Étape 6)
- Fuites d'Implémentation (Étape 7)
- Conformité du Domaine (Étape 8)
- Conformité du Type de Projet (Étape 9)
- Exigences SMART (Étape 10)
- Qualité Holistique (Étape 11)
- Exhaustivité (Étape 12)

### 2. Mettre à Jour le Frontmatter du Rapport avec l'État Final

Mettez à jour le frontmatter du rapport de validation :

```yaml
---
validationTarget: '{prd_path}'
validationDate: '{current_date}'
inputDocuments: [liste de documents]
validationStepsCompleted:
  [
    'step-v-01-discovery',
    'step-v-02-format-detection',
    'step-v-03-density-validation',
    'step-v-04-brief-coverage-validation',
    'step-v-05-measurability-validation',
    'step-v-06-traceability-validation',
    'step-v-07-implementation-leakage-validation',
    'step-v-08-domain-compliance-validation',
    'step-v-09-project-type-validation',
    'step-v-10-smart-validation',
    'step-v-11-holistic-quality-validation',
    'step-v-12-completeness-validation',
  ]
validationStatus: COMPLETE
holisticQualityRating: "{note de l'étape 11}"
overallStatus: '{Réussite/Avertissement/Critique basé sur tous les résultats}'
---
```

### 3. Créer un Résumé des Résultats

**État Global :**

- Déterminez-le à partir de tous les résultats de validation.
- **Réussite :** Tous les contrôles critiques passent, les avertissements mineurs sont acceptables.
- **Avertissement :** Quelques problèmes trouvés mais le PRD est utilisable.
- **Critique :** Problèmes majeurs empêchant le PRD d'être adapté à son usage.

**Tableau des Résultats Rapides :**

- Format : [classification]
- Densité d'Information : [sévérité]
- Mesurabilité : [sévérité]
- Traçabilité : [sévérité]
- Fuites d'Implémentation : [sévérité]
- Conformité du Domaine : [état]
- Conformité du Type de Projet : [score de conformité]
- Qualité SMART : [pourcentage]
- Qualité Holistique : [note/5]
- Exhaustivité : [pourcentage]

**Problèmes Critiques :** Listez à partir de toutes les étapes de validation.
**Avertissements :** Listez à partir de toutes les étapes de validation.
**Points Forts :** Listez les points positifs de toutes les étapes de validation.

**Note de Qualité Holistique :** Provenant de l'étape 11.
**Top 3 des Améliorations :** Provenant de l'étape 11.

**Recommandation :** Basée sur l'état global.

### 4. Présenter le Résumé à l'Utilisateur de manière Conversationnelle

Affichez :

"**✓ Validation du PRD terminée**

**État Global :** {Réussite/Avertissement/Critique}

**Résultats Rapides :**
{Présentez le tableau des résultats rapides avec les conclusions clés}

**Problèmes Critiques :** {nombre ou "Aucun"}
{Si présent, listez brièvement}

**Avertissements :** {nombre ou "Aucun"}
{Si présent, listez brièvement}

**Points Forts :**
{Listez les points forts clés}

**Qualité Holistique :** {rating}/5 - {label}

**Top 3 des Améliorations :**

1. {Amélioration 1}
2. {Amélioration 2}
3. {Amélioration 3}

**Recommandation :**
{Basé sur l'état global :

- Réussite : "Le PRD est en bonne forme. Traitez les améliorations mineures pour le rendre excellent."
- Avertissement : "Le PRD est utilisable mais présente des problèmes qui devraient être traités. Examinez les avertissements et améliorez là où c'est nécessaire."
- Critique : "Le PRD présente des problèmes importants qui devraient être corrigés avant utilisation. Concentrez-vous sur les problèmes critiques ci-dessus."}

**Que souhaitez-vous faire ensuite ?**"

### 5. Présenter les OPTIONS DU MENU

Affichez :

**[R] Examiner les Résultats Détaillés** - Parcourir le rapport de validation section par section.
**[E] Utiliser le Workflow d'Édition** - Utiliser le rapport de validation avec le workflow d'Édition pour des améliorations systématiques.
**[F] Corriger les Éléments Simples** - Corrections immédiates pour les problèmes simples (anti-modèles, fuites, en-têtes manquants).
**[X] Quitter** - Quitter et proposer les prochaines étapes.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Procéder uniquement en fonction de la sélection de l'utilisateur.

#### Logique de Gestion du Menu :

- **SI R (Examiner les Résultats Détaillés) :**
  - Parcourez le rapport de validation section par section.
  - Présentez les résultats de chaque étape de validation.
  - Permettez à l'utilisateur de poser des questions.
  - Après examen, revenez au menu.

- **SI E (Utiliser le Workflow d'Édition) :**
  - Expliquez : "Le workflow d'Édition (steps-e/) peut utiliser ce rapport de validation pour traiter systématiquement les problèmes. Le mode Édition vous guidera dans la découverte de ce qu'il faut éditer, l'examen du PRD et l'application d'améliorations ciblées."
  - Proposez : "Souhaitez-vous lancer le mode Édition maintenant ? Il vous aidera à corriger systématiquement les résultats de validation."
  - Si oui : Lisez complètement et suivez : steps-e/step-e-01-discovery.md.
  - Si non : Revenez au menu.

- **SI F (Corriger les Éléments Simples) :**
  - Proposez des corrections immédiates pour :
    - Variables de modèle (remplir avec le contenu approprié).
    - Remplissage conversationnel (supprimer les phrases verbeuses).
    - Fuites d'implémentation (supprimer les noms de technologies des EF/ENF).
    - En-têtes de section manquants (ajouter des titres ##).
  - Demandez : "Quelles corrections simples souhaiteriez-vous que je fasse ?"
  - Si l'utilisateur spécifie des corrections, faites-les et mettez à jour le rapport de validation.
  - Revenez au menu.

- **SI X (Quitter) :**
  - Affichez : "**Rapport de Validation Enregistré :** {validationReportPath}"
  - Affichez : "**Résumé :** {état global} - {recommendation}"
  - Validation du PRD terminée. Invoquez la compétence `bmad-help`.

- **SI Autre :** Aidez l'utilisateur, puis réaffichez le menu.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Rapport de validation complet chargé avec succès.
- Tous les résultats des étapes 1 à 12 synthétisés.
- Frontmatter du rapport mis à jour avec l'état final.
- État global déterminé correctement (Réussite/Avertissement/Critique).
- Tableau des résultats rapides présenté.
- Problèmes critiques, avertissements et points forts listés.
- Note de qualité holistique incluse.
- Top 3 des améliorations présentés.
- Recommandation claire fournie.
- Options de menu présentées avec des explications claires.
- L'utilisateur peut examiner les résultats, obtenir de l'aide ou quitter.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas charger le rapport de validation complet.
- Synthèse des résultats manquante.
- Ne pas mettre à jour le frontmatter du rapport.
- Ne pas déterminer l'état global.
- Options de menu manquantes.
- Prochaines étapes peu claires.

**Règle Maîtresse :** L'utilisateur a besoin d'un résumé clair et d'étapes suivantes exploitables. Le workflow d'édition est idéal pour les problèmes complexes ; des corrections immédiates sont disponibles pour les plus simples.
