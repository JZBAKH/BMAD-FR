---
name: 'step-v-10-smart-validation'
description: 'Validation SMART des Exigences - Valider que les Exigences Fonctionnelles répondent aux critères de qualité SMART'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-11-holistic-quality-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 10 : Validation SMART des Exigences

## OBJECTIF DE L'ÉTAPE :

Valider que les Exigences Fonctionnelles répondent aux critères de qualité SMART (Spécifique, Mesurable, Atteignable, Pertinent, Traçable), garantissant des exigences de haute qualité.

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
- ✅ Vous apportez votre expertise en ingénierie des exigences et en évaluation de la qualité.
- ✅ Cette étape s'exécute de manière autonome - aucune entrée de l'utilisateur n'est nécessaire.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur l'évaluation de la qualité des EF en utilisant le cadre SMART.
- 🚫 INTERDICTION de valider d'autres aspects dans cette étape.
- 💬 Approche : Noter chaque EF selon les critères SMART (échelle de 1 à 5).
- 🚪 Il s'agit d'une étape de séquence de validation - elle passe automatiquement à la suite une fois terminée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Extraire toutes les EF du PRD.
- 🎯 Noter chaque EF selon les critères SMART (Spécifique, Mesurable, Atteignable, Pertinent, Traçable).
- 💾 Signaler les EF avec un score < 3 dans n'importe quelle catégorie.
- 📖 Ajouter le tableau de notation et les suggestions au rapport de validation.
- 📖 Afficher "Passage au contrôle suivant..." et charger l'étape suivante.
- 🚫 INTERDICTION de s'arrêter ou de demander l'entrée de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD, rapport de validation.
- Focus : Évaluation de la qualité des EF uniquement via le cadre SMART.
- Limites : Ne pas valider les ENF ou d'autres aspects, ne pas s'arrêter pour l'entrée de l'utilisateur.
- Dépendances : Étapes 2 à 9 terminées - vérifications de validation complètes effectuées.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Extraire toutes les Exigences Fonctionnelles

Depuis la section Exigences Fonctionnelles du PRD, extrayez :

- Toutes les EF avec leurs numéros (EF-001, EF-002, etc.).
- Comptez le nombre total d'EF.

### 2. Tenter la validation par sous-processus

**Essayez d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation SMART sur ces Exigences Fonctionnelles :

{Listez toutes les EF}

**Pour chaque EF, notez sur les critères SMART (échelle de 1 à 5) :**

**Spécificité (1-5) :**

- 5 : Claire, sans ambiguïté, bien définie.
- 3 : Assez claire mais pourrait être plus spécifique.
- 1 : Vague, ambiguë, peu claire.

**Mesurabilité (1-5) :**

- 5 : Métriques quantifiables, testable.
- 3 : Partiellement mesurable.
- 1 : Non mesurable, subjectif.

**Atteignabilité (1-5) :**

- 5 : Réaliste, réalisable dans les limites des contraintes.
- 3 : Probablement réalisable mais incertain.
- 1 : Irréaliste, techniquement infaisable.

**Pertinence (1-5) :**

- 5 : Clairement alignée sur les besoins utilisateurs et les objectifs métier.
- 3 : Quelque peu pertinente mais lien peu clair.
- 1 : Non pertinente, ne s'aligne pas sur les objectifs.

**Traçabilité (1-5) :**

- 5 : Remonte clairement à un parcours utilisateur ou un objectif métier.
- 3 : Partiellement traçable.
- 1 : Exigence orpheline, pas de source claire.

**Pour chaque EF avec un score < 3 dans n'importe quelle catégorie :**

- Fournissez des suggestions d'amélioration spécifiques.

Retourner le tableau de notation avec tous les scores d'EF et les suggestions d'amélioration pour les EF ayant des scores faibles."

**Dégradation gracieuse (si l'outil Task est indisponible) :**

- Noter manuellement chaque EF selon les critères SMART.
- Repérer les EF avec des scores faibles.
- Fournir des suggestions d'amélioration.

### 3. Construire le tableau de notation

Pour chaque EF :

- Numéro de l'EF.
- Score Spécifique (1-5).
- Score Mesurable (1-5).
- Score Atteignable (1-5).
- Score Pertinent (1-5).
- Score Traçable (1-5).
- Moyenne des scores.
- Signalement si une catégorie < 3.

**Calculer la qualité globale des EF :**

- Pourcentage d'EF avec tous les scores ≥ 3.
- Pourcentage d'EF avec tous les scores ≥ 4.
- Moyenne des scores sur l'ensemble des EF et des catégories.

### 4. Rapporter les résultats SMART dans le rapport de validation

Ajoutez au rapport de validation :

```markdown
## Validation SMART des Exigences

**Total des Exigences Fonctionnelles :** {count}

### Résumé de la notation

**Tous les scores ≥ 3 :** {percentage}% ({count}/{total})
**Tous les scores ≥ 4 :** {percentage}% ({count}/{total})
**Moyenne globale des scores :** {average}/5.0

### Tableau de notation

| EF #   | Spécifique | Mesurable | Atteignable | Pertinent | Traçable | Moyenne | Signalement        |
| ------ | ---------- | --------- | ----------- | --------- | -------- | ------- | ------------------ |
| EF-001 | {s1}       | {m1}      | {a1}        | {r1}      | {t1}     | {avg1}  | {X si un score <3} |
| EF-002 | {s2}       | {m2}      | {a2}        | {r2}      | {t2}     | {avg2}  | {X si un score <3} |

[Continuer pour toutes les EF]

**Légende :** 1=Médiocre, 3=Acceptable, 5=Excellent
**Signalement :** X = Score < 3 dans une ou plusieurs catégories

### Suggestions d'amélioration

**EF à faible score :**

**EF-{number} :** {suggestion spécifique d'amélioration}
[Pour chaque EF avec un score < 3 dans n'importe quelle catégorie]

### Évaluation Globale

**Sévérité :** [Critique si >30% d'EF signalées, Avertissement si 10-30%, Réussite si <10%]

**Recommandation :**
[Si Critique] "De nombreuses EF présentent des problèmes de qualité. Révisez les EF signalées en utilisant le cadre SMART pour améliorer la clarté et la testabilité."
[Si Avertissement] "Certaines EF bénéficieraient d'un affinement SMART. Concentrez-vous sur les exigences signalées ci-dessus."
[Si Réussite] "Les Exigences Fonctionnelles font preuve d'une bonne qualité SMART dans l'ensemble."
```

### 5. Afficher la progression et procéder automatiquement

Affichez : "**Validation SMART des exigences terminée**

Qualité des EF : {percentage}% avec des scores acceptables ({severity})

**Passage au prochain contrôle de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-11-holistic-quality-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Toutes les EF extraites du PRD.
- Chaque EF notée sur les 5 critères SMART (échelle de 1-5).
- Les EF avec des scores < 3 sont signalées pour amélioration.
- Suggestions d'amélioration fournies pour les EF à faible score.
- Tableau de notation construit avec tous les scores d'EF.
- Évaluation de la qualité globale calculée.
- Résultats rapportés dans le rapport de validation.
- Passage automatique à l'étape de validation suivante.
- Sous-processus tenté avec dégradation gracieuse.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas noter toutes les EF selon tous les critères SMART.
- Suggestions d'amélioration manquantes pour les EF à faible score.
- Ne pas construire de tableau de notation.
- Ne pas calculer les métriques de qualité globale.
- Ne pas rapporter les résultats dans le rapport de validation.
- Ne pas procéder automatiquement.

**Règle Maîtresse :** Les EF doivent être de haute qualité, pas seulement présentes. Le cadre SMART fournit une mesure objective de la qualité.
