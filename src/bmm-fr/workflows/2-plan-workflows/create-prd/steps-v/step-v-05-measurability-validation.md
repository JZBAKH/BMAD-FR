---
name: 'step-v-05-measurability-validation'
description: 'Validation de la Mesurabilité - Valider que toutes les exigences (EF et ENF) sont mesurables et testables'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-06-traceability-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 5 : Validation de la Mesurabilité

## OBJECTIF DE L'ÉTAPE :

Valider que toutes les Exigences Fonctionnelles (EF) et les Exigences Non Fonctionnelles (ENF) sont mesurables, testables et suivent le format approprié sans détails d'implémentation.

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
- ✅ Vous apportez une rigueur analytique et une expertise en ingénierie des exigences.
- ✅ Cette étape s'exécute de manière autonome - aucune entrée de l'utilisateur n'est nécessaire.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la mesurabilité des EF et ENF.
- 🚫 INTERDICTION de valider d'autres aspects dans cette étape.
- 💬 Approche : Analyse systématique exigence par exigence.
- 🚪 Il s'agit d'une étape de séquence de validation - elle passe automatiquement à la suite une fois terminée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Extraire toutes les EF et ENF du PRD.
- 💾 Valider chacune pour la mesurabilité et le format.
- 📖 Ajouter les résultats au rapport de validation.
- 📖 Afficher "Passage au contrôle suivant..." et charger l'étape suivante.
- 🚫 INTERDICTION de s'arrêter ou de demander l'entrée de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD, rapport de validation.
- Focus : Mesurabilité des EF et ENF uniquement.
- Limites : Ne pas valider d'autres aspects, ne pas s'arrêter pour l'entrée de l'utilisateur.
- Dépendances : Étapes 2 à 4 terminées - contrôles de validation initiaux effectués.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter la validation par sous-processus

**Essayez d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation de la mesurabilité sur ce PRD :

**Exigences Fonctionnelles (EF) :**
1. Extraire toutes les EF de la section Exigences Fonctionnelles.
2. Vérifier chaque EF pour :
   - Conformité au format '[Acteur] peut [capacité]'.
   - Absence d'adjectifs subjectifs (facile, rapide, simple, intuitif, etc.).
   - Absence de quantificateurs vagues (plusieurs, certains, quelques, beaucoup, etc.).
   - Absence de détails d'implémentation (noms de technologies, de bibliothèques, structures de données sauf si pertinent pour la capacité).
3. Documenter les violations avec les numéros de ligne.

**Exigences Non Fonctionnelles (ENF) :**
1. Extraire toutes les ENF de la section Exigences Non Fonctionnelles.
2. Vérifier chaque ENF pour :
   - Métriques spécifiques avec méthodes de mesure.
   - Conformité au modèle (critère, métrique, méthode de mesure, contexte).
   - Contexte inclus (pourquoi cela compte, qui cela affecte).
3. Documenter les violations avec les numéros de ligne.

Retourner les résultats structurés avec les comptes de violations et les exemples."

### 2. Dégradation gracieuse (si l'outil Task est indisponible)

Si l'outil Task est indisponible, effectuez l'analyse directement :

**Analyse des Exigences Fonctionnelles :**

Extrayez toutes les EF et vérifiez chacune pour :

**Conformité au format :**
- Suit-elle le modèle "[Acteur] peut [capacité]" ?
- L'acteur est-il clairement défini ?
- La capacité est-elle exploitable et testable ?

**Absence d'adjectifs subjectifs :**
- Scanner pour : facile, rapide, simple, intuitif, convivial, réactif, efficace (sans métriques).
- Notez les numéros de ligne.

**Absence de quantificateurs vagues :**
- Scanner pour : plusieurs, certains, quelques, beaucoup, divers, nombre de.
- Notez les numéros de ligne.

**Absence de détails d'implémentation :**
- Scanner pour : React, Vue, Angular, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, Redux, etc.
- À moins que ce ne soit pertinent pour la capacité (ex: "Les consommateurs d'API peuvent accéder...").
- Notez les numéros de ligne.

**Analyse des Exigences Non Fonctionnelles :**

Extrayez toutes les ENF et vérifiez chacune pour :

**Métriques spécifiques :**
- Y a-t-il un critère mesurable ? (ex: "temps de réponse < 200ms", pas "réponse rapide").
- Est-ce que cela peut être mesuré ou testé ?

**Conformité au modèle :**
- Critère défini ?
- Métrique spécifiée ?
- Méthode de mesure incluse ?
- Contexte fourni ?

### 3. Comptabiliser les violations

**Violations des EF :**
- Violations de format : nombre
- Adjectifs subjectifs : nombre
- Quantificateurs vagues : nombre
- Fuite d'implémentation : nombre
- Total des violations d'EF : somme

**Violations des ENF :**
- Métriques manquantes : nombre
- Modèle incomplet : nombre
- Contexte manquant : nombre
- Total des violations d'ENF : somme

**Total des violations :** Violations EF + Violations ENF

### 4. Rapporter les résultats de mesurabilité dans le rapport de validation

Ajoutez au rapport de validation :

```markdown
## Validation de la Mesurabilité

### Exigences Fonctionnelles

**Total d'EF analysées :** {count}

**Violations de format :** {count}
[Si des violations existent, listez les exemples avec les numéros de ligne]

**Adjectifs subjectifs trouvés :** {count}
[Si trouvés, listez les exemples avec les numéros de ligne]

**Quantificateurs vagues trouvés :** {count}
[Si trouvés, listez les exemples avec les numéros de ligne]

**Fuite d'implémentation :** {count}
[Si trouvée, listez les exemples avec les numéros de ligne]

**Total des violations d'EF :** {total}

### Exigences Non Fonctionnelles

**Total d'ENF analysées :** {count}

**Métriques manquantes :** {count}
[Si manquantes, listez les exemples avec les numéros de ligne]

**Modèle incomplet :** {count}
[Si incomplet, listez les exemples avec les numéros de ligne]

**Contexte manquant :** {count}
[Si manquant, listez les exemples avec les numéros de ligne]

**Total des violations d'ENF :** {total}

### Évaluation Globale

**Total des exigences :** {EF + ENF}
**Total des violations :** {violations EF + violations ENF}

**Sévérité :** [Critique si >10 violations, Avertissement si 5-10, Réussite si <5]

**Recommandation :**
[Si Critique] "De nombreuses exigences ne sont ni mesurables ni testables. Les exigences doivent être révisées pour être testables pour le travail en aval."
[Si Avertissement] "Certaines exigences nécessitent un affinement pour la mesurabilité. Concentrez-vous sur les exigences en infraction ci-dessus."
[Si Réussite] "Les exigences font preuve d'une bonne mesurabilité avec des problèmes minimaux."
```

### 5. Afficher la progression et procéder automatiquement

Affichez : "**Validation de la mesurabilité terminée**

Total des violations : {count} ({sévérité})

**Passage au prochain contrôle de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-06-traceability-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Toutes les EF extraites et analysées pour la mesurabilité.
- Toutes les ENF extraites et analysées pour la mesurabilité.
- Violations documentées avec les numéros de ligne.
- Sévérité évaluée correctement.
- Résultats rapportés dans le rapport de validation.
- Passage automatique à l'étape de validation suivante.
- Sous-processus tenté avec dégradation gracieuse.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas analyser toutes les EF et ENF.
- Numéros de ligne manquants pour les violations.
- Ne pas rapporter les résultats dans le rapport de validation.
- Ne pas évaluer la sévérité.
- Ne pas procéder automatiquement.

**Règle Maîtresse :** Les exigences doivent être testables pour être utiles. Validez chaque exigence pour la mesurabilité, documentez les violations, passez automatiquement à la suite.
