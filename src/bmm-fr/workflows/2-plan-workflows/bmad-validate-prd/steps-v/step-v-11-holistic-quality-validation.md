---
name: 'step-v-11-holistic-quality-validation'
description: 'Évaluation holistique de la qualité - Évaluer le PRD comme un document cohérent et convaincant - est-ce un bon PRD ?'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-12-completeness-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 11 : Évaluation holistique de la qualité

## OBJECTIF DE L'ÉTAPE :

Évaluer le PRD comme un document cohérent et convaincant - en évaluant le flux du document, l'efficacité pour le double public (humains et LLM), la conformité aux principes du PRD BMAD, et la note de qualité globale.

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
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif
- ✅ Vous apportez une rigueur analytique et une expertise en qualité documentaire
- ✅ Cette étape s'exécute de manière autonome - aucune intervention de l'utilisateur n'est requise
- ✅ Utilise l'Élicitation Avancée pour une évaluation multi-perspective

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur l'évaluation holistique de la qualité du document
- 🚫 INTERDIT de valider les composants individuels (déjà fait dans les étapes précédentes)
- 💬 Approche : Évaluation multi-perspective utilisant l'Élicitation Avancée
- 🚪 Il s'agit d'une étape de séquence de validation - procède automatiquement une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Utiliser l'Élicitation Avancée pour une évaluation multi-perspective
- 🎯 Évaluer le flux du document, le double public, les principes BMAD
- 💾 Ajouter l'évaluation complète au rapport de validation
- 📖 Afficher "Passage à la vérification suivante..." et charger l'étape suivante
- 🚫 INTERDIT de faire une pause ou de demander une intervention de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : fichier PRD complet, rapport de validation avec les conclusions des étapes 1 à 10
- Focus : Qualité holistique - l'ENSEMBLE du document
- Limites : Ne pas re-valider les composants individuels, ne pas s'interrompre pour demander l'avis de l'utilisateur
- Dépendances : Étapes 1 à 10 terminées - toutes les vérifications systématiques effectuées

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre exactement cette séquence. Ne pas sauter d'étape, ne pas réorganiser ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Tentative de sous-processus avec Élicitation Avancée

**Essayer d'utiliser l'outil Task pour lancer un sous-processus via l'Élicitation Avancée :**

"Effectuer une évaluation holistique de la qualité sur ce PRD en utilisant une évaluation multi-perspective :

**Workflow d'Élicitation Avancée :**
Invoquer la compétence `bmad-advanced-elicitation`

**Évaluer le PRD selon ces perspectives :**

**1. Flux et Cohérence du Document :**

- Lire l'intégralité du PRD
- Évaluer le flux narratif - raconte-t-il une histoire cohérente ?
- Vérifier les transitions entre les sections
- Évaluer la consistance - est-il cohérent d'un bout à l'autre ?
- Évaluer la lisibilité - est-il clair et bien organisé ?

**2. Efficacité pour le Double Public :**

**Pour les Humains :**

- Adapté aux décideurs : Les dirigeants peuvent-ils comprendre rapidement la vision et les buts ?
- Clarté pour les développeurs : Les développeurs ont-ils des exigences claires pour construire ?
- Clarté pour les designers : Les designers comprennent-ils les besoins utilisateurs et les flux ?
- Prise de décision des parties prenantes : Les parties prenantes peuvent-elles prendre des décisions éclairées ?

**Pour les LLM :**

- Structure lisible par machine : Le PRD est-il structuré pour la consommation par des LLM ?
- Préparation au design UX : Un LLM peut-il générer des designs UX à partir de ceci ?
- Préparation à l'architecture : Un LLM peut-il générer l'architecture à partir de ceci ?
- Préparation aux Epics/Stories : Un LLM peut-il décomposer cela en epics et stories ?

**3. Conformité aux Principes du PRD BMAD :**

- Densité d'information : Chaque phrase apporte-t-elle de la valeur ?
- Mesurabilité : Les exigences sont-elles testables ?
- Traçabilité : Les exigences remontent-elles à leurs sources ?
- Connaissance du domaine : Les considérations spécifiques au domaine sont-elles incluses ?
- Zéro anti-pattern : Pas de remplissage ou de verbiage ?
- Double public : Fonctionne aussi bien pour les humains que pour les LLM ?
- Format Markdown : Structure et formatage appropriés ?

**4. Note de Qualité Globale :**
Noter le PRD sur une échelle de 5 points :

- Excellent (5/5) : Exemplaire, prêt pour une utilisation en production
- Bon (4/5) : Solide avec des améliorations mineures nécessaires
- Adéquat (3/5) : Acceptable mais nécessite un affinement
- Nécessite du travail (2/5) : Lacunes ou problèmes significatifs
- Problématique (1/5) : Failles majeures, nécessite une révision substantielle

**5. Top 3 des Améliorations :**
Identifier les 3 améliorations les plus percutantes pour faire de ce PRD un excellent document.

Retourner l'évaluation complète avec toutes les perspectives, la note, et le top 3 des améliorations."

**Dégradation élégante (si pas d'outil Task ou Élicitation Avancée indisponible) :**

- Effectuer l'évaluation holistique directement dans le contexte actuel
- Lire le PRD complet
- Évaluer le flux du document, la cohérence, les transitions
- Évaluer l'efficacité pour le double public
- Vérifier la conformité aux principes BMAD
- Assigner une note de qualité globale
- Identifier le top 3 des améliorations

### 2. Synthétiser l'évaluation

**Compiler les conclusions de l'évaluation multi-perspective :**

**Flux et Cohérence du Document :**

- Évaluation globale : [Excellent/Bon/Adéquat/Nécessite du travail/Problématique]
- Points forts : [liste]
- Points faibles : [liste]

**Efficacité pour le Double Public :**

- Pour les Humains : [évaluation]
- Pour les LLM : [évaluation]
- Score global du double public : [1-5]

**Conformité aux Principes BMAD :**

- Principes respectés : [nombre]/7
- Principes posant problème : [liste]

**Note de Qualité Globale :** [1-5 avec libellé]

**Top 3 des Améliorations :**

1. [Amélioration 1]
2. [Amélioration 2]
3. [Amélioration 3]

### 3. Rapporter les conclusions de qualité holistique au Rapport de Validation

Ajouter au rapport de validation :

```markdown
## Évaluation holistique de la qualité

### Flux et cohérence du document

**Évaluation :** [Excellent/Bon/Adéquat/Nécessite du travail/Problématique]

**Points forts :**
{Lister les points forts clés}

**Axes d'amélioration :**
{Lister les points faibles clés}

### Efficacité pour le double public

**Pour les humains :**

- Adapté aux décideurs : [évaluation]
- Clarté pour les développeurs : [évaluation]
- Clarté pour les designers : [évaluation]
- Prise de décision des parties prenantes : [évaluation]

**Pour les LLM :**

- Structure lisible par machine : [évaluation]
- Préparation au design UX : [évaluation]
- Préparation à l'architecture : [évaluation]
- Préparation aux Epics/Stories : [évaluation]

**Score du double public :** {score}/5

### Conformité aux principes du PRD BMAD

| Principe                | Statut                          | Notes   |
| ----------------------- | ------------------------------- | ------- |
| Densité d'information   | [Respecté/Partiel/Non respecté] | {notes} |
| Mesurabilité            | [Respecté/Partiel/Non respecté] | {notes} |
| Traçabilité             | [Respecté/Partiel/Non respecté] | {notes} |
| Connaissance du domaine | [Respecté/Partiel/Non respecté] | {notes} |
| Zéro Anti-pattern       | [Respecté/Partiel/Non respecté] | {notes} |
| Double public           | [Respecté/Partiel/Non respecté] | {notes} |
| Format Markdown         | [Respecté/Partiel/Non respecté] | {notes} |

**Principes respectés :** {count}/7

### Note de qualité globale

**Note :** {rating}/5 - {label}

**Échelle :**

- 5/5 - Excellent : Exemplaire, prêt pour une utilisation en production
- 4/5 - Bon : Solide avec des améliorations mineures nécessaires
- 3/5 - Adéquat : Acceptable mais nécessite un affinement
- 2/5 - Nécessite du travail : Lacunes ou problèmes significatifs
- 1/5 - Problématique : Failles majeures, nécessite une révision substantielle

### Top 3 des améliorations

1. **{Improvement 1}**
   {Brève explication du pourquoi et du comment}

2. **{Improvement 2}**
   {Brève explication du pourquoi et du comment}

3. **{Improvement 3}**
   {Brève explication du pourquoi et du comment}

### Résumé

**Ce PRD est :** {évaluation globale en une phrase}

**Pour le rendre excellent :** Se concentrer sur le top 3 des améliorations ci-dessus.
```

### 4. Afficher la progression et procéder automatiquement

Afficher : "**Évaluation holistique de la qualité terminée**

Note globale : {rating}/5 - {label}

**Passage aux dernières vérifications de validation...**"

Sans délai, lire entièrement et suivre : {nextStepFile} (step-v-12-completeness-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Élicitation Avancée utilisée pour l'évaluation multi-perspective (ou dégradation élégante)
- Flux et cohérence du document évalués
- Efficacité pour le double public évaluée (humains et LLM)
- Conformité aux principes du PRD BMAD vérifiée
- Note de qualité globale assignée (échelle 1-5)
- Top 3 des améliorations identifiés
- Évaluation complète rapportée au rapport de validation
- Passage automatique à l'étape de validation suivante
- Sous-processus tenté avec dégradation élégante

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas utiliser l'Élicitation Avancée pour l'évaluation multi-perspective
- Évaluation du flux du document manquante
- Évaluation du double public manquante
- Ne pas vérifier tous les principes BMAD
- Ne pas assigner de note de qualité globale
- Top 3 des améliorations manquant
- Ne pas rapporter l'évaluation complète au rapport de validation
- Ne pas procéder automatiquement

**Règle Maîtresse :** Ceci évalue l'ENSEMBLE du document, pas seulement les composants. Répond à « Est-ce un bon PRD ? » et « Qu'est-ce qui le rendrait excellent ? »
