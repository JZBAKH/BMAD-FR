---
name: 'step-v-04-brief-coverage-validation'
description: 'Contrôle de Couverture du Product Brief - Valider que le PRD couvre tout le contenu du Product Brief (si utilisé comme entrée)'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-05-measurability-validation.md'
prdFile: '{prd_file_path}'
productBrief: '{product_brief_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 4 : Validation de la Couverture du Product Brief

## OBJECTIF DE L'ÉTAPE :

Valider que le PRD couvre tout le contenu du Product Brief (si le brief a été utilisé comme entrée), en mappant le contenu du brief aux sections du PRD et en identifiant les lacunes.

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
- ✅ Vous apportez une rigueur analytique et une expertise en traçabilité.
- ✅ Cette étape s'exécute de manière autonome - aucune entrée de l'utilisateur n'est nécessaire.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la couverture du Product Brief (conditionné à l'existence du brief).
- 🚫 INTERDICTION de valider d'autres aspects dans cette étape.
- 💬 Approche : Mappage systématique et analyse des écarts.
- 🚪 Il s'agit d'une étape de séquence de validation - elle passe automatiquement à la suite une fois terminée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Vérifier si un Product Brief existe dans les documents d'entrée.
- 💬 Si aucun brief : Sauter ce contrôle et rapporter "N/A - Aucun Product Brief".
- 🎯 Si le brief existe : Mapper le contenu du brief aux sections du PRD.
- 💾 Ajouter les résultats de couverture au rapport de validation.
- 📖 Afficher "Passage au contrôle suivant..." et charger l'étape suivante.
- 🚫 INTERDICTION de s'arrêter ou de demander l'entrée de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD, documents d'entrée de l'étape 1, rapport de validation.
- Focus : Couverture du Product Brief uniquement (conditionnel).
- Limites : Ne pas valider d'autres aspects, exécution conditionnelle.
- Dépendances : Étape 1 terminée - documents d'entrée chargés.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Vérifier la présence du Product Brief

Vérifiez si un Product Brief a été chargé dans le `inputDocuments` de l'étape 1 :

**SI aucun Product Brief n'est trouvé :**
Ajoutez au rapport de validation :
```markdown
## Couverture du Product Brief

**État :** N/A - Aucun Product Brief n'a été fourni en entrée
```

Affichez : "**Couverture du Product Brief : Ignorée** (Aucun Product Brief fourni)

**Passage au prochain contrôle de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile}

**SI un Product Brief existe :** Continuez à l'étape 2 ci-dessous.

### 2. Tenter la validation par sous-processus

**Essayez d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation de la couverture du Product Brief :

1. Charger le Product Brief.
2. Extraire le contenu clé :
   - Énoncé de vision
   - Utilisateurs cibles/personas
   - Énoncé du problème
   - Fonctionnalités clés
   - Buts/objectifs
   - Différenciateurs
   - Contraintes
3. Pour chaque élément, rechercher la couverture correspondante dans le PRD.
4. Classifier la couverture : Entièrement couverte / Partiellement couverte / Non trouvée / Délibérément exclue.
5. Noter toutes les lacunes avec leur sévérité : Critique / Modérée / Informative.

Retourner la matrice de couverture structurée avec les classifications."

### 3. Dégradation gracieuse (si l'outil Task est indisponible)

Si l'outil Task est indisponible, effectuez l'analyse directement :

**Extraire du Product Brief :**
- Vision : Qu'est-ce que ce produit ?
- Utilisateurs : Pour qui est-il fait ?
- Problème : Quel problème résout-il ?
- Fonctionnalités : Quelles sont les capacités clés ?
- Objectifs : Quels sont les critères de succès ?
- Différenciateurs : Qu'est-ce qui le rend unique ?

**Pour chaque élément, rechercher dans le PRD :**
- Scanner le Résumé Analytique pour la vision.
- Vérifier les Parcours Utilisateurs ou les personas.
- Rechercher l'énoncé du problème.
- Examiner les Exigences Fonctionnelles pour les fonctionnalités.
- Vérifier la section des Critères de Succès.
- Rechercher les différenciateurs.

**Classifier la couverture :**
- **Entièrement couverte :** Contenu présent et complet.
- **Partiellement couverte :** Contenu présent mais incomplet.
- **Non trouvée :** Contenu absent du PRD.
- **Délibérément exclue :** Contenu explicitement hors périmètre.

### 4. Évaluer la couverture et la sévérité

**Pour chaque écart (Partiellement couverte ou Non trouvée) :**
- Est-ce Critique ? (Vision centrale, utilisateurs principaux, fonctionnalités majeures).
- Est-ce Modéré ? (Fonctionnalités secondaires, certains objectifs).
- Est-ce Informatif ? (Fonctionnalités "nice-to-have", détails mineurs).

**Note :** Certaines exclusions peuvent être intentionnelles (décisions de cadrage valides).

### 5. Rapporter les résultats de couverture dans le rapport de validation

Ajoutez au rapport de validation :

```markdown
## Couverture du Product Brief

**Product Brief :** {brief_file_name}

### Matrice de couverture

**Énoncé de vision :** [Entièrement/Partiellement/Non trouvée/Délibérément exclue]
[Si écart : Notez la sévérité et le contenu manquant spécifique]

**Utilisateurs cibles :** [Entièrement/Partiellement/Non trouvée/Délibérément exclue]
[Si écart : Notez la sévérité et le contenu manquant spécifique]

**Énoncé du problème :** [Entièrement/Partiellement/Non trouvée/Délibérément exclue]
[Si écart : Notez la sévérité et le contenu manquant spécifique]

**Fonctionnalités clés :** [Entièrement/Partiellement/Non trouvée/Délibérément exclue]
[Si lacune : Listez les fonctionnalités spécifiques avec leur sévérité]

**Buts/Objectifs :** [Entièrement/Partiellement/Non trouvée/Délibérément exclue]
[Si écart : Notez la sévérité et le contenu manquant spécifique]

**Différenciateurs :** [Entièrement/Partiellement/Non trouvée/Délibérément exclue]
[Si écart : Notez la sévérité et le contenu manquant spécifique]

### Résumé de la couverture

**Couverture globale :** [pourcentage ou évaluation qualitative]
**Lacunes critiques :** [nombre] [liste le cas échéant]
**Lacunes modérées :** [nombre] [liste le cas échéant]
**Lacunes informatives :** [nombre] [liste le cas échéant]

**Recommandation :**
[Si des lacunes critiques existent] "Le PRD doit être révisé pour couvrir le contenu critique du Product Brief."
[Si lacunes modérées] "Envisagez de traiter les lacunes modérées pour une couverture complète."
[Si lacunes minimales] "Le PRD offre une bonne couverture du contenu du Product Brief."
```

### 6. Afficher la progression et procéder automatiquement

Affichez : "**Validation de la couverture du Product Brief terminée**

Couverture globale : {assessment}

**Passage au prochain contrôle de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-05-measurability-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Vérification correcte de l'existence du Product Brief.
- Si aucun brief : Rapport "N/A" et saut gracieux.
- Si le brief existe : Mappage de tout le contenu clé du brief aux sections du PRD.
- Couverture classifiée de manière appropriée (Entièrement/Partiellement/Non trouvée/Délibérément exclue).
- Sévérité évaluée pour les lacunes (Critique/Modérée/Informative).
- Résultats rapportés dans le rapport de validation.
- Passage automatique à l'étape de validation suivante.
- Sous-processus tenté avec dégradation gracieuse.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas vérifier l'existence du brief avant de tenter la validation.
- Si le brief existe : ne pas mapper toutes les zones de contenu clés.
- Classifications de couverture manquantes.
- Ne pas rapporter les résultats dans le rapport de validation.
- Ne pas procéder automatiquement.

**Règle Maîtresse :** La couverture du Product Brief est conditionnelle - ignorez si aucun brief, validez minutieusement si le brief existe. Procédez toujours automatiquement.
