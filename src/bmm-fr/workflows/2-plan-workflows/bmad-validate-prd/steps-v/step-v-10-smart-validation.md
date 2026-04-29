---
name: 'step-v-10-smart-validation'
description: 'Validation SMART des exigences - Valider que les Exigences Fonctionnelles respectent les critères de qualité SMART'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-11-holistic-quality-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 10 : Validation SMART des exigences

## OBJECTIF DE L'ÉTAPE :

Valider que les Exigences Fonctionnelles (RF) respectent les critères de qualité SMART (Spécifique, Mesurable, Atteignable, Pertinent, Traçable), garantissant des exigences de haute qualité.

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
- ✅ Vous apportez une expertise en ingénierie des exigences et en évaluation de la qualité
- ✅ Cette étape s'exécute de manière autonome - aucune intervention de l'utilisateur n'est requise

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur l'évaluation de la qualité des RF en utilisant le cadre SMART
- 🚫 INTERDIT de valider d'autres aspects dans cette étape
- 💬 Approche : Noter chaque RF sur les critères SMART (échelle de 1 à 5)
- 🚪 Il s'agit d'une étape de séquence de validation - procède automatiquement une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Extraire toutes les RF du PRD
- 🎯 Noter chaque RF selon les critères SMART (Spécifique, Mesurable, Atteignable, Pertinent, Traçable)
- 💾 Signaler les RF avec un score < 3 dans n'importe quelle catégorie
- 📖 Ajouter le tableau de notation et les suggestions au rapport de validation
- 📖 Afficher "Passage à la vérification suivante..." et charger l'étape suivante
- 🚫 INTERDIT de faire une pause ou de demander une intervention de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : fichier PRD, rapport de validation
- Focus : Évaluation de la qualité des RF uniquement via le cadre SMART
- Limites : Ne pas valider les RNF ou d'autres aspects, ne pas s'interrompre pour demander une intervention utilisateur
- Dépendances : Étapes 2 à 9 terminées - vérifications de validation complètes effectuées

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre exactement cette séquence. Ne pas sauter d'étape, ne pas réorganiser ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Extraire toutes les Exigences Fonctionnelles

Depuis la section Exigences Fonctionnelles du PRD, extraire :
- Toutes les RF avec leurs numéros de RF (RF-001, RF-002, etc.)
- Décompte total des RF

### 2. Tentative de validation par sous-processus

**Essayer d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation SMART des exigences sur ces Exigences Fonctionnelles :

{Lister toutes les RF}

**Pour chaque RF, donner une note sur les critères SMART (échelle de 1 à 5) :**

**Spécifique (1-5) :**
- 5 : Claire, sans ambiguïté, bien définie
- 3 : Assez claire mais pourrait être plus spécifique
- 1 : Vague, ambiguë, peu claire

**Mesurable (1-5) :**
- 5 : Métriques quantifiables, testable
- 3 : Partiellement mesurable
- 1 : Non mesurable, subjective

**Atteignable (1-5) :**
- 5 : Réaliste, réalisable avec les contraintes
- 3 : Probablement réalisable mais incertain
- 1 : Irréaliste, techniquement infaisable

**Pertinent (1-5) :**
- 5 : Clairement aligné avec les besoins utilisateurs et les objectifs métier
- 3 : Assez pertinent mais connexion peu claire
- 1 : Non pertinent, ne s'aligne pas avec les objectifs

**Traçable (1-5) :**
- 5 : Remonte clairement à un parcours utilisateur ou un objectif métier
- 3 : Partiellement traçable
- 1 : Exigence orpheline, pas de source claire

**Pour chaque RF avec un score < 3 dans n'importe quelle catégorie :**
- Fournir des suggestions d'amélioration spécifiques

Retourner le tableau de notation avec tous les scores des RF et les suggestions d'amélioration pour les RF à faible score."

**Dégradation élégante (si pas d'outil Task) :**
- Noter manuellement chaque RF selon les critères SMART
- Relever les RF ayant des scores faibles
- Fournir des suggestions d'amélioration

### 3. Construire le tableau de notation

Pour chaque RF :
- Numéro de RF
- Score Spécifique (1-5)
- Score Mesurable (1-5)
- Score Atteignable (1-5)
- Score Pertinent (1-5)
- Score Traçable (1-5)
- Score moyen
- Signalement si une catégorie < 3

**Calculer la qualité globale des RF :**
- Pourcentage de RF avec tous les scores ≥ 3
- Pourcentage de RF avec tous les scores ≥ 4
- Score moyen sur l'ensemble des RF et des catégories

### 4. Rapporter les conclusions SMART au Rapport de Validation

Ajouter au rapport de validation :

```markdown
## Validation SMART des exigences

**Total des Exigences Fonctionnelles :** {count}

### Résumé de la notation

**Tous les scores ≥ 3 :** {percentage}% ({count}/{total})
**Tous les scores ≥ 4 :** {percentage}% ({count}/{total})
**Score moyen global :** {average}/5.0

### Tableau de notation

| RF # | Spécifique | Mesurable | Atteignable | Pertinent | Traçable | Moyenne | Alerte |
|------|------------|-----------|-------------|-----------|----------|---------|--------|
| RF-001 | {s1} | {m1} | {a1} | {r1} | {t1} | {avg1} | {X si <3} |
| RF-002 | {s2} | {m2} | {a2} | {r2} | {t2} | {avg2} | {X si <3} |
[Continuer pour toutes les RF]

**Légende :** 1=Médiocre, 3=Acceptable, 5=Excellent
**Alerte :** X = Score < 3 dans une ou plusieurs catégories

### Suggestions d'amélioration

**RF à faible score :**

**RF-{number} :** {suggestion spécifique d'amélioration}
[Pour chaque RF avec un score < 3 dans n'importe quelle catégorie]

### Évaluation globale

**Sévérité :** [Critique si >30% de RF alertées, Avertissement si 10-30%, Réussi si <10%]

**Recommandation :**
[Si Critique] "De nombreuses RF présentent des problèmes de qualité. Réviser les RF alertées en utilisant le cadre SMART pour améliorer la clarté et la testabilité."
[Si Avertissement] "Certaines RF bénéficieraient d'un affinement SMART. Se concentrer sur les exigences alertées ci-dessus."
[Si Réussi] "Les Exigences Fonctionnelles démontrent une bonne qualité SMART globale."
```

### 5. Afficher la progression et procéder automatiquement

Afficher : "**Validation SMART des exigences terminée**

Qualité des RF : {percentage}% avec des scores acceptables ({severity})

**Passage à la vérification de validation suivante...**"

Sans délai, lire entièrement et suivre : {nextStepFile} (step-v-11-holistic-quality-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Toutes les RF extraites du PRD
- Chaque RF notée selon les 5 critères SMART (échelle de 1 à 5)
- RF avec des scores < 3 signalées pour amélioration
- Suggestions d'amélioration fournies pour les RF à faible score
- Tableau de notation construit avec tous les scores des RF
- Évaluation de la qualité globale calculée
- Conclusions rapportées au rapport de validation
- Passage automatique à l'étape de validation suivante
- Sous-processus tenté avec dégradation élégante

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas noter toutes les RF sur tous les critères SMART
- Suggestions d'amélioration manquantes pour les RF à faible score
- Ne pas construire de tableau de notation
- Ne pas calculer les métriques de qualité globale
- Ne pas rapporter les conclusions au rapport de validation
- Ne pas procéder automatiquement

**Règle Maîtresse :** Les RF doivent être de haute qualité, pas seulement présentes. Le cadre SMART fournit une mesure objective de la qualité.
