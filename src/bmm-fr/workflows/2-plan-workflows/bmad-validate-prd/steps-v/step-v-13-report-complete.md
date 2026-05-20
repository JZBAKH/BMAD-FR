---
name: 'step-v-13-report-complete'
description: 'Rapport de validation terminé - Finaliser le rapport, synthétiser les conclusions, présenter à l\'utilisateur, proposer les prochaines étapes'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
validationReportPath: '{validation_report_path}'
prdFile: '{prd_file_path}'
---

# Étape 13 : Rapport de validation terminé

## OBJECTIF DE L'ÉTAPE :

Finaliser le rapport de validation, synthétiser toutes les conclusions des étapes 1 à 12, présenter le résumé à l'utilisateur de manière conversationnelle et proposer des prochaines étapes exploitables.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans intervention de l'utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant de prendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec [C], s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS VOUS EXPRIMER selon votre style de communication d'Agent avec la configuration `{communication_language}`
- ✅ VOUS DEVEZ TOUJOURS RÉDIGER tout le contenu des artefacts et des documents en `{document_output_language}`

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans une commande-réponse
- ✅ Vous apportez une expertise en synthèse et en résumé
- ✅ C'est l'étape FINALE - nécessite une interaction avec l'utilisateur

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur la synthèse des conclusions et la présentation des options
- 🚫 INTERDIT d'effectuer une validation supplémentaire
- 💬 Approche : Résumé conversationnel avec des prochaines étapes claires
- 🚪 C'est la dernière étape - aucune étape suivante après celle-ci

## PROTOCOLES D'EXÉCUTION :

- 🎯 Charger le rapport de validation complet
- 🎯 Synthétiser toutes les conclusions des étapes 1 à 12
- 🎯 Mettre à jour le frontmatter du rapport avec le statut final
- 💬 Présenter le résumé à l'utilisateur de manière conversationnelle
- 💬 Proposer des options de menu pour les prochaines actions
- 🚫 INTERDIT de procéder sans sélection de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : Rapport de validation complet avec les conclusions de toutes les étapes de validation
- Focus : Résumé et présentation uniquement (pas de nouvelle validation)
- Limites : Ne pas ajouter de nouvelles conclusions, synthétiser l'existant uniquement
- Dépendances : Étapes 1 à 12 terminées - toutes les vérifications de validation effectuées

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre exactement cette séquence. Ne pas sauter d'étape, ne pas réorganiser ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Charger le rapport de validation complet

Lire l'intégralité du rapport de validation à l'emplacement {validationReportPath}

Extraire toutes les conclusions de :

- Détection de Format (Étape 2)
- Analyse de Parité (Étape 2B, si applicable)
- Densité d'Information (Étape 3)
- Couverture du Product Brief (Étape 4)
- Mesurabilité (Étape 5)
- Traçabilité (Étape 6)
- Fuite d'Implémentation (Étape 7)
- Conformité du Domaine (Étape 8)
- Conformité du Type de Projet (Étape 9)
- Exigences SMART (Étape 10)
- Qualité Holistique (Étape 11)
- Exhaustivité (Étape 12)

### 2. Mettre à jour le frontmatter du rapport avec le statut final

Mettre à jour le frontmatter du rapport de validation :

```yaml
---
validationTarget: '{prd_path}'
validationDate: '{current_date}'
inputDocuments: [liste de documents]
validationStepsCompleted: ['step-v-01-discovery', 'step-v-02-format-detection', 'step-v-03-density-validation', 'step-v-04-brief-coverage-validation', 'step-v-05-measurability-validation', 'step-v-06-traceability-validation', 'step-v-07-implementation-leakage-validation', 'step-v-08-domain-compliance-validation', 'step-v-09-project-type-validation', 'step-v-10-smart-validation', 'step-v-11-holistic-quality-validation', 'step-v-12-completeness-validation']
validationStatus: COMPLETE
holisticQualityRating: '{rating from step 11}'
overallStatus: '{Pass/Warning/Critical basé sur l'ensemble des conclusions}'
---
```

### 3. Créer un résumé des conclusions

**Statut Global :**

- Déterminer à partir de toutes les conclusions de validation
- **Réussi :** Toutes les vérifications critiques passent, des avertissements mineurs sont acceptables
- **Avertissement :** Quelques problèmes trouvés mais le PRD est utilisable
- **Critique :** Problèmes majeurs empêchant le PRD d'être adapté à son usage

**Tableau des Résultats Rapides :**

- Format : [classification]
- Densité d'Information : [sévérité]
- Mesurabilité : [sévérité]
- Traçabilité : [sévérité]
- Fuite d'Implémentation : [sévérité]
- Conformité du Domaine : [statut]
- Conformité du Type de Projet : [score de conformité]
- Qualité SMART : [pourcentage]
- Qualité Holistique : [note/5]
- Exhaustivité : [pourcentage]

**Problèmes Critiques :** Lister à partir de toutes les étapes de validation
**Avertissements :** Lister à partir de toutes les étapes de validation
**Points Forts :** Lister les points positifs de toutes les étapes de validation

**Note de Qualité Holistique :** Issue de l'étape 11
**Top 3 des Améliorations :** Issue de l'étape 11

**Recommandation :** Basée sur le statut global

### 4. Présenter le résumé à l'utilisateur de manière conversationnelle

Afficher :

"**✓ Validation du PRD Terminée**

**Statut Global :** {Pass/Warning/Critical}

**Résultats Rapides :**
{Présenter le tableau des résultats rapides avec les conclusions clés}

**Problèmes Critiques :** {nombre ou "Aucun"}
{Si présents, lister brièvement}

**Avertissements :** {nombre ou "Aucun"}
{Si présents, lister brièvement}

**Points Forts :**
{Lister les points forts clés}

**Qualité Holistique :** {rating}/5 - {label}

**Top 3 des Améliorations :**

1. {Improvement 1}
2. {Improvement 2}
3. {Improvement 3}

**Recommandation :**
{Basée sur le statut global :

- Réussi : "Le PRD est en bonne forme. Appliquez les améliorations mineures pour le rendre excellent."
- Avertissement : "Le PRD est utilisable mais présente des problèmes qui devraient être traités. Revoyez les avertissements et améliorez ce qui est nécessaire."
- Critique : "Le PRD présente des problèmes significatifs qui doivent être corrigés avant utilisation. Concentrez-vous sur les problèmes critiques ci-dessus."}

**Que souhaitez-vous faire ensuite ?**"

### 5. Présenter les OPTIONS DU MENU

Afficher :

**[R] Revoir les conclusions détaillées** - Parcourir le rapport de validation section par section
**[E] Utiliser le Workflow Edit** - Utiliser le rapport de validation avec le workflow Edit pour des améliorations systématiques
**[F] Corriger les éléments simples** - Corrections immédiates pour les problèmes simples (anti-patterns, fuites, en-têtes manquants)
**[X] Quitter** - Quitter et suggérer les prochaines étapes.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu
- Ne procéder qu'en fonction de la sélection de l'utilisateur

#### Logique de Gestion du Menu :

- **SI R (Revoir les conclusions détaillées) :**
  - Parcourir le rapport de validation section par section
  - Présenter les conclusions de chaque étape de validation
  - Permettre à l'utilisateur de poser des questions
  - Après la revue, revenir au menu

- **SI E (Utiliser le Workflow Edit) :**
  - Expliquer : "Le workflow Edit (steps-e/) peut utiliser ce rapport de validation pour traiter systématiquement les problèmes. Le mode Edit vous guidera dans la découverte de ce qu'il faut modifier, la revue du PRD et l'application d'améliorations ciblées."
  - Proposer : "Souhaitez-vous lancer le mode Edit maintenant ? Il vous aidera à corriger systématiquement les conclusions de la validation."
  - Si oui : Lire entièrement et suivre : steps-e/step-e-01-discovery.md
  - Si non : Revenir au menu

- **SI F (Corriger les éléments simples) :**
  - Proposer des corrections immédiates pour :
    - Les variables de modèle (remplir avec le contenu approprié)
    - Le remplissage conversationnel (supprimer les phrases verbeuses)
    - Les fuites d'implémentation (supprimer les noms de technologies des RF/RNF)
    - Les en-têtes de section manquants (ajouter les en-têtes ##)
  - Demander : "Quelles corrections simples souhaiteriez-vous que j'effectue ?"
  - Si l'utilisateur spécifie des corrections, les effectuer et mettre à jour le rapport de validation
  - Revenir au menu

- **SI X (Quitter) :**
  - Afficher : "**Rapport de validation enregistré :** {validationReportPath}"
  - Afficher : "**Résumé :** {overall status} - {recommendation}"
  - Validation du PRD terminée. Invoquer la compétence `bmad-help`.

- **SI Autre :** Aider l'utilisateur, puis réafficher le menu

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Rapport de validation complet chargé avec succès
- Toutes les conclusions des étapes 1 à 12 synthétisées
- Frontmatter du rapport mis à jour avec le statut final
- Statut global déterminé correctement (Pass/Warning/Critical)
- Tableau des résultats rapides présenté
- Problèmes critiques, avertissements et points forts listés
- Note de qualité holistique incluse
- Top 3 des améliorations présentés
- Recommandation claire fournie
- Options du menu présentées avec des explications claires
- L'utilisateur peut revoir les conclusions, obtenir de l'aide ou quitter

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas charger le rapport de validation complet
- Synthèse des conclusions manquante
- Ne pas mettre à jour le frontmatter du rapport
- Ne pas déterminer le statut global
- Options du menu manquantes
- Prochaines étapes peu claires

**Règle Maîtresse :** L'utilisateur a besoin d'un résumé clair et de prochaines étapes exploitables. Le workflow Edit est préférable pour les problèmes complexes ; des corrections immédiates sont disponibles pour les plus simples.
