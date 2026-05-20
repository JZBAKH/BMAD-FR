---
name: 'step-v-03-density-validation'
description: "Contrôle de la Densité d'Information - Scanner les anti-modèles qui violent les principes de densité d'information"

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-04-brief-coverage-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 3 : Validation de la Densité d'Information

## OBJECTIF DE L'ÉTAPE :

Valider que le PRD répond aux standards de densité d'information BMAD en scannant le remplissage conversationnel, les expressions verbeuses et les formulations redondantes qui violent les principes de concision.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité.
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif.
- ✅ Vous apportez une rigueur analytique et une attention aux détails.
- ✅ Cette étape s'exécute de manière autonome - aucune entrée de l'utilisateur n'est nécessaire.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur les anti-modèles de densité d'information.
- 🚫 INTERDICTION de valider d'autres aspects dans cette étape.
- 💬 Approche : Balayage systématique et catégorisation.
- 🚪 Il s'agit d'une étape de séquence de validation - elle passe automatiquement à la suite une fois terminée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Scanner systématiquement le PRD pour détecter les anti-modèles de densité.
- 💾 Ajouter les résultats de densité au rapport de validation.
- 📖 Afficher "Passage au contrôle suivant..." et charger l'étape suivante.
- 🚫 INTERDICTION de s'arrêter ou de demander l'entrée de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD, rapport de validation avec les résultats de format.
- Focus : Validation de la densité d'information uniquement.
- Limites : Ne pas valider d'autres aspects, ne pas s'arrêter pour l'entrée de l'utilisateur.
- Dépendances : Étape 2 terminée - classification de format effectuée.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter la validation par sous-processus

**Essayez d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation de la densité d'information sur ce PRD :

1. Charger le fichier PRD.
2. Scanner pour les anti-modèles suivants :
   - Expressions de remplissage conversationnel (exemples : 'Le système permettra aux utilisateurs de...', 'Il est important de noter que...', 'Afin de').
   - Expressions verbeuses (exemples : 'En raison du fait que', 'Dans l'éventualité de', 'Dans le but de').
   - Expressions redondantes (exemples : 'Plans futurs', 'Absolument essentiel', 'Histoire passée').
3. Compter les violations par catégorie avec les numéros de ligne.
4. Classifier la sévérité : Critique (>10 violations), Avertissement (5-10), Réussite (<5).

Retourner les résultats structurés avec les comptes et les exemples."

### 2. Dégradation gracieuse (si l'outil Task est indisponible)

Si l'outil Task est indisponible, effectuez l'analyse directement :

**Scanner pour les modèles de remplissage conversationnel :**

- "Le système permettra aux utilisateurs de..."
- "Il est important de noter que..."
- "Afin de"
- "Dans le but de"
- "En ce qui concerne"
- Comptez les occurrences et notez les numéros de ligne.

**Scanner pour les expressions verbeuses :**

- "En raison du fait que" (utilisez "parce que")
- "Dans l'éventualité de" (utilisez "si")
- "À ce moment précis" (utilisez "maintenant")
- "D'une manière qui" (utilisez "comment")
- Comptez les occurrences et notez les numéros de ligne.

**Scanner pour les expressions redondantes :**

- "Plans futurs" (juste "plans")
- "Histoire passée" (juste "histoire")
- "Absolument essentiel" (juste "essentiel")
- "Terminer complètement" (juste "terminer")
- Comptez les occurrences et notez les numéros de ligne.

### 3. Classifier la sévérité

**Calculer le total des violations :**

- Nombre de remplissages conversationnels.
- Nombre d'expressions verbeuses.
- Nombre d'expressions redondantes.
- Total = somme de toutes les catégories.

**Déterminer la sévérité :**

- **Critique :** Total > 10 violations.
- **Avertissement :** Total 5-10 violations.
- **Réussite :** Total < 5 violations.

### 4. Rapporter les résultats de densité dans le rapport de validation

Ajoutez au rapport de validation :

```markdown
## Validation de la Densité d'Information

**Violations d'anti-modèles :**

**Remplissage conversationnel :** {count} occurrences
[Si count > 0, listez les exemples avec les numéros de ligne]

**Expressions verbeuses :** {count} occurrences
[Si count > 0, listez les exemples avec les numéros de ligne]

**Expressions redondantes :** {count} occurrences
[Si count > 0, listez les exemples avec les numéros de ligne]

**Total des violations :** {total}

**Évaluation de la sévérité :** [Critique/Avertissement/Réussite]

**Recommandation :**
[Si Critique] "Le PRD nécessite une révision importante pour améliorer la densité d'information. Chaque phrase doit porter du poids sans remplissage."
[Si Avertissement] "Le PRD gagnerait à réduire la verbosité et à éliminer les expressions de remplissage."
[Si Réussite] "Le PRD fait preuve d'une bonne densité d'information avec un minimum de violations."
```

### 5. Afficher la progression et procéder automatiquement

Affichez : "**Validation de la densité d'information terminée**

Sévérité : {Critique/Avertissement/Réussite}

**Passage au prochain contrôle de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-04-brief-coverage-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- PRD scanné pour les trois catégories d'anti-modèles.
- Violations comptées avec les numéros de ligne.
- Sévérité classifiée correctement.
- Résultats rapportés dans le rapport de validation.
- Passage automatique à l'étape de validation suivante.
- Sous-processus tenté avec dégradation gracieuse.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas scanner toutes les catégories d'anti-modèles.
- Classification de sévérité manquante.
- Ne pas rapporter les résultats dans le rapport de validation.
- S'arrêter pour l'entrée de l'utilisateur (devrait être automatique).
- Ne pas tenter une architecture de sous-processus.

**Règle Maîtresse :** La validation de la densité d'information s'exécute de manière autonome. Scanner, classifier, rapporter, procéder automatiquement. Aucune interaction utilisateur n'est requise.
