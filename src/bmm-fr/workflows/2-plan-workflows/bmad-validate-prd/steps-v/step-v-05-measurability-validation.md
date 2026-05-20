---
name: 'step-v-05-measurability-validation'
description: 'Validation de la mesurabilité - Valider que toutes les exigences (RF et RNF) sont mesurables et testables'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-06-traceability-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 5 : Validation de la mesurabilité

## OBJECTIF DE L'ÉTAPE :

Valider que toutes les Exigences Fonctionnelles (RF) et les Exigences Non-Fonctionnelles (RNF) sont mesurables, testables et suivent le format approprié sans détails d'implémentation.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans intervention de l'utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant de prendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec [C], s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS VOUS EXPRIMER selon votre style de communication d'Agent avec la configuration `{communication_language}`

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif
- ✅ Vous apportez une rigueur analytique et une expertise en ingénierie des exigences
- ✅ Cette étape s'exécute de manière autonome - aucune intervention de l'utilisateur n'est requise

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur la mesurabilité des RF et RNF
- 🚫 INTERDIT de valider d'autres aspects dans cette étape
- 💬 Approche : Analyse systématique exigence par exigence
- 🚪 Il s'agit d'une étape de séquence de validation - procède automatiquement une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Extraire toutes les RF et RNF du PRD
- 💾 Valider chacune pour la mesurabilité et le format
- 📖 Ajouter les conclusions au rapport de validation
- 📖 Afficher "Passage à la vérification suivante..." et charger l'étape suivante
- 🚫 INTERDIT de faire une pause ou de demander une intervention de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : fichier PRD, rapport de validation
- Focus : Mesurabilité des RF et RNF uniquement
- Limites : Ne pas valider d'autres aspects, ne pas s'interrompre pour demander une intervention utilisateur
- Dépendances : Étapes 2 à 4 terminées - vérifications de validation initiales effectuées

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre exactement cette séquence. Ne pas sauter d'étape, ne pas réorganiser ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Tentative de Validation par Sous-Processus

**Essayer d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation de la mesurabilité sur ce PRD :

**Exigences Fonctionnelles (RF) :**

1. Extraire toutes les RF de la section Exigences Fonctionnelles
2. Vérifier chaque RF pour :
   - Conformité au format '[Acteur] peut [capacité]'
   - Aucun adjectif subjectif (facile, rapide, simple, intuitif, etc.)
   - Aucun quantificateur vague (plusieurs, divers, certains, beaucoup, etc.)
   - Aucun détail d'implémentation (noms de technologies, noms de bibliothèques, structures de données sauf si pertinent pour la capacité)
3. Documenter les violations avec les numéros de ligne

**Exigences Non-Fonctionnelles (RNF) :**

1. Extraire toutes les RNF de la section Exigences Non-Fonctionnelles
2. Vérifier chaque RNF pour :
   - Métriques spécifiques avec méthodes de mesure
   - Conformité au modèle (critère, métrique, méthode de mesure, contexte)
   - Contexte inclus (pourquoi cela est important, qui cela affecte)
3. Documenter les violations avec les numéros de ligne

Retourner les conclusions structurées avec le décompte des violations et des exemples."

### 2. Dégradation Élégante (si l'outil Task est indisponible)

Si l'outil Task est indisponible, effectuer l'analyse directement :

**Analyse des Exigences Fonctionnelles :**

Extraire toutes les RF et vérifier chacune pour :

**Conformité au format :**

- Suit-elle le modèle "[Acteur] peut [capacité]" ?
- L'acteur est-il clairement défini ?
- La capacité est-elle exploitable et testable ?

**Aucun adjectif subjectif :**

- Rechercher : facile, rapide, simple, intuitif, convivial (user-friendly), réactif, prompt, efficace (sans métriques)
- Noter les numéros de ligne

**Aucun quantificateur vague :**

- Rechercher : plusieurs, divers, certains, beaucoup, peu, variés, un certain nombre de
- Noter les numéros de ligne

**Aucun détail d'implémentation :**

- Rechercher : React, Vue, Angular, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, Redux, etc.
- Sauf si pertinent pour la capacité (ex: "Les consommateurs d'API peuvent accéder...")
- Noter les numéros de ligne

**Analyse des Exigences Non-Fonctionnelles :**

Extraire toutes les RNF et vérifier chacune pour :

**Métriques spécifiques :**

- Y a-t-il un critère mesurable ? (ex: "temps de réponse < 200ms", pas "réponse rapide")
- Cela peut-il être mesuré ou testé ?

**Conformité au modèle :**

- Critère défini ?
- Métrique spécifiée ?
- Méthode de mesure incluse ?
- Contexte fourni ?

### 3. Décompte des Violations

**Violations RF :**

- Violations de format : nombre
- Adjectifs subjectifs : nombre
- Quantificateurs vagues : nombre
- Fuite d'implémentation : nombre
- Total des violations RF : somme

**Violations RNF :**

- Métriques manquantes : nombre
- Modèle incomplet : nombre
- Contexte manquant : nombre
- Total des violations RNF : somme

**Total des violations :** Violations RF + Violations RNF

### 4. Rapporter les conclusions de mesurabilité au Rapport de Validation

Ajouter au rapport de validation :

```markdown
## Validation de la mesurabilité

### Exigences Fonctionnelles

**Total des RF analysées :** {count}

**Violations de format :** {count}
[Si des violations existent, lister des exemples avec les numéros de ligne]

**Adjectifs subjectifs trouvés :** {count}
[Si trouvés, lister des exemples avec les numéros de ligne]

**Quantificateurs vagues trouvés :** {count}
[Si trouvés, lister des exemples avec les numéros de ligne]

**Fuite d'implémentation :** {count}
[Si trouvée, lister des exemples avec les numéros de ligne]

**Total des violations RF :** {total}

### Exigences Non-Fonctionnelles

**Total des RNF analysées :** {count}

**Métriques manquantes :** {count}
[Si manquantes, lister des exemples avec les numéros de ligne]

**Modèle incomplet :** {count}
[Si incomplet, lister des exemples avec les numéros de ligne]

**Contexte manquant :** {count}
[Si manquant, lister des exemples avec les numéros de ligne]

**Total des violations RNF :** {total}

### Évaluation Globale

**Total des exigences :** {RF + RNF}
**Total des violations :** {violations RF + violations RNF}

**Sévérité :** [Critique si >10 violations, Avertissement si 5-10, Réussi si <5]

**Recommandation :**
[Si Critique] "De nombreuses exigences ne sont pas mesurables ou testables. Les exigences doivent être révisées pour être testables pour le travail en aval."
[Si Avertissement] "Certaines exigences ont besoin d'être affinées pour la mesurabilité. Se concentrer sur les exigences en violation ci-dessus."
[Si Réussi] "Les exigences démontrent une bonne mesurabilité avec des problèmes minimaux."
```

### 5. Afficher la progression et procéder automatiquement

Afficher : "**Validation de la mesurabilité terminée**

Total des violations : {count} ({severity})

**Passage à la vérification de validation suivante...**"

Sans délai, lire entièrement et suivre : {nextStepFile} (step-v-06-traceability-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Toutes les RF extraites et analysées pour la mesurabilité
- Toutes les RNF extraites et analysées pour la mesurabilité
- Violations documentées avec les numéros de ligne
- Sévérité évaluée correctement
- Conclusions rapportées au rapport de validation
- Passage automatique à l'étape de validation suivante
- Sous-processus tenté avec dégradation élégante

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas analyser toutes les RF et RNF
- Numéros de ligne manquants pour les violations
- Ne pas rapporter les conclusions au rapport de validation
- Ne pas évaluer la sévérité
- Ne pas procéder automatiquement

**Règle Maîtresse :** Les exigences doivent être testables pour être utiles. Valider chaque exigence pour la mesurabilité, documenter les violations, procéder automatiquement.
