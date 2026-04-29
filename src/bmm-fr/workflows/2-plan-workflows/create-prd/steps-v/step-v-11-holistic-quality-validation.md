---
name: 'step-v-11-holistic-quality-validation'
description: 'Évaluation de la Qualité Holistique - Évaluer le PRD comme un document cohérent et convaincant - est-ce un bon PRD ?'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-12-completeness-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 11 : Évaluation de la Qualité Holistique

## OBJECTIF DE L'ÉTAPE :

Évaluer le PRD comme un document cohérent et convaincant - en évaluant le flux du document, l'efficacité pour la double audience (humains et LLM), la conformité aux principes du PRD BMAD et la note de qualité globale.

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
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif.
- ✅ Vous apportez une rigueur analytique et une expertise en qualité documentaire.
- ✅ Cette étape s'exécute de manière autonome - aucune entrée de l'utilisateur n'est nécessaire.
- ✅ Utilise l'Élicitation Avancée pour une évaluation multi-perspective.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur l'évaluation holistique de la qualité du document.
- 🚫 INTERDICTION de valider des composants individuels (déjà fait dans les étapes précédentes).
- 💬 Approche : Évaluation multi-perspective utilisant l'Élicitation Avancée.
- 🚪 Il s'agit d'une étape de séquence de validation - elle passe automatiquement à la suite une fois terminée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Utiliser l'Élicitation Avancée pour une évaluation multi-perspective.
- 🎯 Évaluer le flux du document, la double audience, les principes BMAD.
- 💾 Ajouter l'évaluation complète au rapport de validation.
- 📖 Afficher "Passage au contrôle suivant..." et charger l'étape suivante.
- 🚫 INTERDICTION de s'arrêter ou de demander l'entrée de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD complet, rapport de validation avec les résultats des étapes 1 à 10.
- Focus : Qualité holistique - l'intégralité du document.
- Limites : Ne pas re-valider les composants individuels, ne pas s'arrêter pour l'entrée de l'utilisateur.
- Dépendances : Étapes 1 à 10 terminées - tous les contrôles systématiques effectués.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter le sous-processus avec Élicitation Avancée

**Essayez d'utiliser l'outil Task pour lancer un sous-processus utilisant l'Élicitation Avancée :**

"Effectuer l'évaluation de la qualité holistique sur ce PRD en utilisant une évaluation multi-perspective :

**Workflow de l'Élicitation Avancée :**
Invoquez la compétence `bmad-advanced-elicitation`.

**Évaluer le PRD selon ces perspectives :**

**1. Flux et cohérence du document :**
- Lire l'intégralité du PRD.
- Évaluer le flux narratif - raconte-t-il une histoire cohérente ?
- Vérifier les transitions entre les sections.
- Évaluer la consistance - est-il cohérent d'un bout à l'autre ?
- Évaluer la lisibilité - est-il clair et bien organisé ?

**2. Efficacité pour la double audience :**

**Pour les Humains :**
- Adapté aux décideurs (Executive-friendly) : Les dirigeants peuvent-ils comprendre rapidement la vision et les buts ?
- Clarté pour les développeurs : Les développeurs ont-ils des exigences claires sur lesquelles s'appuyer ?
- Clarté pour les designers : Les designers comprennent-ils les besoins et les flux utilisateurs ?
- Prise de décision des parties prenantes : Les parties prenantes peuvent-elles prendre des décisions éclairées ?

**Pour les LLM :**
- Structure lisible par machine : Le PRD est-il structuré pour la consommation par les LLM ?
- Prêt pour l'UX : Un LLM peut-il générer des designs UX à partir de cela ?
- Prêt pour l'Architecture : Un LLM peut-il générer une architecture à partir de cela ?
- Prêt pour les Epics/Stories : Un LLM peut-il décomposer cela en epics et stories ?

**3. Conformité aux principes du PRD BMAD :**
- Densité d'information : Chaque phrase a-t-elle du poids ?
- Mesurabilité : Exigences testables ?
- Traçabilité : Les exigences remontent-elles à leurs sources ?
- Conscience du domaine : Considérations spécifiques au domaine incluses ?
- Zéro anti-modèle : Pas de remplissage ou de verbosité ?
- Double audience : Fonctionne à la fois pour les humains et les LLM ?
- Format Markdown : Structure et formatage appropriés ?

**4. Note de qualité globale :**
Notez le PRD sur une échelle de 5 points :
- Excellent (5/5) : Exemplaire, prêt pour une utilisation en production.
- Bon (4/5) : Solide avec quelques améliorations mineures nécessaires.
- Adéquat (3/5) : Acceptable mais nécessite un affinement.
- Nécessite du travail (2/5) : Lacunes ou problèmes significatifs.
- Problématique (1/5) : Défauts majeurs, nécessite une révision substantielle.

**5. Top 3 des améliorations :**
Identifiez les 3 améliorations les plus percutantes pour faire de ce document un excellent PRD.

Retourner une évaluation complète avec toutes les perspectives, la note et le top 3 des améliorations."

**Dégradation gracieuse (si pas d'outil Task ou si l'Élicitation Avancée est indisponible) :**
- Effectuer l'évaluation holistique directement dans le contexte actuel.
- Lire le PRD complet.
- Évaluer le flux du document, la cohérence, les transitions.
- Évaluer l'efficacité pour la double audience.
- Vérifier la conformité aux principes BMAD.
- Attribuer une note de qualité globale.
- Identifier le top 3 des améliorations.

### 2. Synthétiser l'évaluation

**Compiler les résultats de l'évaluation multi-perspective :**

**Flux et cohérence du document :**
- Évaluation globale : [Excellent/Bon/Adéquat/Nécessite du travail/Problématique]
- Points forts clés : [liste]
- Faiblesses clés : [liste]

**Efficacité pour la double audience :**
- Pour les Humains : [évaluation]
- Pour les LLM : [évaluation]
- Score global double audience : [1-5]

**Conformité aux principes BMAD :**
- Principes respectés : [nombre]/7
- Principes présentant des problèmes : [liste]

**Note de qualité globale :** [1-5 avec libellé]

**Top 3 des améliorations :**
1. [Amélioration 1]
2. [Amélioration 2]
3. [Amélioration 3]

### 3. Rapporter les résultats de qualité holistique dans le rapport de validation

Ajoutez au rapport de validation :

```markdown
## Évaluation de la Qualité Holistique

### Flux et cohérence du document

**Évaluation :** [Excellent/Bon/Adéquat/Nécessite du travail/Problématique]

**Points forts :**
{Listez les points forts clés}

**Zones d'amélioration :**
{Listez les faiblesses clés}

### Efficacité pour la double audience

**Pour les Humains :**
- Adapté aux décideurs : [évaluation]
- Clarté pour les développeurs : [évaluation]
- Clarté pour les designers : [évaluation]
- Prise de décision des parties prenantes : [évaluation]

**Pour les LLM :**
- Structure lisible par machine : [évaluation]
- Prêt pour l'UX : [évaluation]
- Prêt pour l'Architecture : [évaluation]
- Prêt pour les Epics/Stories : [évaluation]

**Score Double Audience :** {score}/5

### Conformité aux principes du PRD BMAD

| Principe | État | Notes |
|----------|------|-------|
| Densité d'Information | [Respecté/Partiel/Non respecté] | {notes} |
| Mesurabilité | [Respecté/Partiel/Non respecté] | {notes} |
| Traçabilité | [Respecté/Partiel/Non respecté] | {notes} |
| Conscience du domaine | [Respecté/Partiel/Non respecté] | {notes} |
| Zéro Anti-modèle | [Respecté/Partiel/Non respecté] | {notes} |
| Double Audience | [Respecté/Partiel/Non respecté] | {notes} |
| Format Markdown | [Respecté/Partiel/Non respecté] | {notes} |

**Principes respectés :** {count}/7

### Note de Qualité Globale

**Note :** {note}/5 - {libellé}

**Échelle :**
- 5/5 - Excellent : Exemplaire, prêt pour une utilisation en production.
- 4/5 - Bon : Solide avec quelques améliorations mineures nécessaires.
- 3/5 - Adéquat : Acceptable mais nécessite un affinement.
- 2/5 - Nécessite du travail : Lacunes ou problèmes significatifs.
- 1/5 - Problématique : Défauts majeurs, nécessite une révision substantielle.

### Top 3 des améliorations

1. **{Amélioration 1}**
   {Brève explication du pourquoi et du comment}

2. **{Amélioration 2}**
   {Brève explication du pourquoi et du comment}

3. **{Amélioration 3}**
   {Brève explication du pourquoi et du comment}

### Résumé

**Ce PRD est :** {évaluation globale en une phrase}

**Pour le rendre excellent :** Concentrez-vous sur le top 3 des améliorations ci-dessus.
```

### 4. Afficher la progression et procéder automatiquement

Affichez : "**Évaluation de la qualité holistique terminée**

Note globale : {note}/5 - {libellé}

**Passage aux derniers contrôles de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-12-completeness-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Élicitation Avancée utilisée pour l'évaluation multi-perspective (ou dégradation gracieuse).
- Flux et cohérence du document évalués.
- Efficacité pour la double audience évaluée (humains et LLM).
- Conformité aux principes du PRD BMAD vérifiée.
- Note de qualité globale attribuée (échelle de 1-5).
- Top 3 des améliorations identifiés.
- Évaluation complète rapportée dans le rapport de validation.
- Passage automatique à l'étape de validation suivante.
- Sous-processus tenté avec dégradation gracieuse.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas utiliser l'Élicitation Avancée pour l'évaluation multi-perspective.
- Évaluation du flux et de la cohérence manquante.
- Évaluation de la double audience manquante.
- Ne pas vérifier tous les principes BMAD.
- Ne pas attribuer de note de qualité globale.
- Top 3 des améliorations manquants.
- Ne pas rapporter l'évaluation complète dans le rapport de validation.
- Ne pas procéder automatiquement.

**Règle Maîtresse :** Ceci évalue l'intégralité du document, pas seulement les composants. Répond aux questions "Est-ce un bon PRD ?" et "Qu'est-ce qui le rendrait excellent ?".
