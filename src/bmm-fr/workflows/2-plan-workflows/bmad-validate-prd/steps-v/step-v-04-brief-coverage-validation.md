---
name: 'step-v-04-brief-coverage-validation'
description: 'Vérification de la couverture du brief produit - Valider que le cahier des charges produit (PRD) couvre l''intégralité du contenu du brief produit (s''il a été utilisé en entrée)'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-05-measurability-validation.md'
prdFile: '{prd_file_path}'
productBrief: '{product_brief_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 4 : Validation de la couverture du brief produit

## OBJECTIF DE L'ÉTAPE :

Valider que le cahier des charges produit (PRD) couvre l'intégralité du contenu du brief produit (si un brief a été utilisé en entrée), en mettant en correspondance le contenu du brief avec les sections du cahier des charges produit (PRD) et en identifiant les écarts.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans la contribution de l'utilisateur
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre la moindre action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'ensemble du fichier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PRODUIRE LA SORTIE dans votre style de communication d'agent avec la configuration `{communication_language}`

### Renforcement du rôle :

- ✅ Vous êtes un Architecte de validation et un Spécialiste de l'assurance qualité
- ✅ Si l'on vous a déjà fourni des modèles de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif
- ✅ Vous apportez une rigueur analytique et une expertise en matière de traçabilité
- ✅ Cette étape s'exécute de manière autonome - aucune contribution de l'utilisateur n'est requise

### Règles spécifiques à cette étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la couverture du brief produit (conditionnel à l'existence du brief)
- 🚫 INTERDICTION de valider d'autres aspects à cette étape
- 💬 Approche : Mise en correspondance systématique et analyse des écarts
- 🚪 Il s'agit d'une étape de séquence de validation - poursuit automatiquement une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Vérifier si un brief produit existe dans les documents d'entrée
- 💬 Si aucun brief : Sauter cette vérification et signaler "S/O - Aucun brief produit"
- 🎯 Si un brief existe : Mettre en correspondance le contenu du brief avec les sections du cahier des charges produit (PRD)
- 💾 Ajouter les constats relatifs à la couverture au rapport de validation
- 📖 Afficher "Passage à la vérification suivante..." et charger l'étape suivante
- 🚫 INTERDICTION de mettre en pause ou de demander la contribution de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier de cahier des charges produit (PRD), documents d'entrée de l'étape 1, rapport de validation
- Concentration : Couverture du brief produit uniquement (conditionnelle)
- Limites : Ne pas valider d'autres aspects, exécution conditionnelle
- Dépendances : Étape 1 terminée - documents d'entrée chargés

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence à la lettre. Ne sautez pas, ne réorganisez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Vérifier la présence d'un brief produit

Vérifier si un brief produit a été chargé dans les inputDocuments de l'étape 1 :

**SI aucun brief produit n'est trouvé :**
Ajouter au rapport de validation :
```markdown
## Couverture du brief produit

**Statut :** S/O - Aucun brief produit n'a été fourni en entrée
```

Afficher : "**Couverture du brief produit : Ignorée** (Aucun brief produit fourni)

**Passage à la vérification de validation suivante...**"

Sans délai, lire intégralement et suivre : {nextStepFile}

**SI un brief produit existe :** Continuer à l'étape 2 ci-dessous

### 2. Tenter la validation par sous-processus

**Tenter d'utiliser l'outil Task pour générer un sous-processus :**

"Effectuer la validation de la couverture du brief produit :

1. Charger le brief produit
2. Extraire le contenu clé :
   - Énoncé de vision
   - Utilisateurs/personas cibles
   - Énoncé du problème
   - Fonctionnalités clés
   - Buts/objectifs
   - Différenciateurs
   - Contraintes
3. Pour chaque élément, rechercher dans le cahier des charges produit (PRD) la couverture correspondante
4. Classifier la couverture : Entièrement couvert / Partiellement couvert / Non trouvé / Exclu intentionnellement
5. Noter les écarts avec leur gravité : Critique / Modérée / Informatif

Retourner une carte de couverture structurée avec les classifications."

### 3. Dégradation gracieuse (si l'outil Task est indisponible)

Si l'outil Task est indisponible, effectuer l'analyse directement :

**Extraire du brief produit :**
- Vision : Quel est ce produit ?
- Utilisateurs : À qui s'adresse-t-il ?
- Problème : Quel problème résout-il ?
- Fonctionnalités : Quelles sont les capacités clés ?
- Buts : Quels sont les critères de réussite ?
- Différenciateurs : Qu'est-ce qui le rend unique ?

**Pour chaque élément, rechercher dans le cahier des charges produit (PRD) :**
- Scanner le résumé exécutif pour la vision
- Vérifier les parcours utilisateurs ou les personas utilisateurs
- Rechercher l'énoncé du problème
- Examiner les exigences fonctionnelles pour les fonctionnalités
- Vérifier la section critères de réussite
- Rechercher les différenciateurs

**Classifier la couverture :**
- **Entièrement couvert :** Contenu présent et complet
- **Partiellement couvert :** Contenu présent mais incomplet
- **Non trouvé :** Contenu manquant dans le cahier des charges produit (PRD)
- **Exclu intentionnellement :** Contenu explicitement hors périmètre

### 4. Évaluer la couverture et la gravité

**Pour chaque écart (Partiellement couvert ou Non trouvé) :**
- Est-il Critique ? (Vision principale, utilisateurs primaires, fonctionnalités principales)
- Est-il Modéré ? (Fonctionnalités secondaires, certains buts)
- Est-il Informatif ? (Fonctionnalités souhaitables, détails mineurs)

**Note :** Certaines exclusions peuvent être intentionnelles (décisions de cadrage valides)

### 5. Consigner les constats relatifs à la couverture dans le rapport de validation

Ajouter au rapport de validation :

```markdown
## Couverture du brief produit

**Brief produit :** {brief_file_name}

### Carte de couverture

**Énoncé de vision :** [Entièrement/Partiellement/Non trouvé/Exclu intentionnellement]
[Si écart : Noter la gravité et le contenu spécifique manquant]

**Utilisateurs cibles :** [Entièrement/Partiellement/Non trouvé/Exclu intentionnellement]
[Si écart : Noter la gravité et le contenu spécifique manquant]

**Énoncé du problème :** [Entièrement/Partiellement/Non trouvé/Exclu intentionnellement]
[Si écart : Noter la gravité et le contenu spécifique manquant]

**Fonctionnalités clés :** [Entièrement/Partiellement/Non trouvé/Exclu intentionnellement]
[Si écart : Lister les fonctionnalités spécifiques avec leur gravité]

**Buts/objectifs :** [Entièrement/Partiellement/Non trouvé/Exclu intentionnellement]
[Si écart : Noter la gravité et le contenu spécifique manquant]

**Différenciateurs :** [Entièrement/Partiellement/Non trouvé/Exclu intentionnellement]
[Si écart : Noter la gravité et le contenu spécifique manquant]

### Résumé de la couverture

**Couverture globale :** [pourcentage ou évaluation qualitative]
**Écarts critiques :** [count] [lister s'il y en a]
**Écarts modérés :** [count] [lister s'il y en a]
**Écarts informatifs :** [count] [lister s'il y en a]

**Recommandation :**
[S'il existe des écarts critiques] "Le cahier des charges produit (PRD) doit être révisé pour couvrir le contenu critique du brief produit."
[Si écarts modérés] "Envisagez de combler les écarts modérés pour une couverture complète."
[Si écarts minimes] "Le cahier des charges produit (PRD) offre une bonne couverture du contenu du brief produit."
```

### 6. Afficher la progression et passer automatiquement à la suite

Afficher : "**Validation de la couverture du brief produit terminée**

Couverture globale : {assessment}

**Passage à la vérification de validation suivante...**"

Sans délai, lire intégralement et suivre : {nextStepFile} (step-v-05-measurability-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Vérification correcte de l'existence du brief produit
- Si aucun brief : Signalement "S/O" et saut effectué proprement
- Si un brief existe : Mise en correspondance de tout le contenu clé du brief avec les sections du cahier des charges produit (PRD)
- Couverture classifiée de manière appropriée (Entièrement/Partiellement/Non trouvé/Exclu intentionnellement)
- Gravité évaluée pour les écarts (Critique/Modérée/Informatif)
- Constats consignés dans le rapport de validation
- Passage automatique à l'étape de validation suivante
- Sous-processus tenté avec dégradation gracieuse

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas vérifier l'existence du brief avant de tenter la validation
- Si un brief existe : ne pas mettre en correspondance tous les domaines de contenu clés
- Classifications de couverture manquantes
- Ne pas consigner les constats dans le rapport de validation
- Ne pas poursuivre automatiquement

**Règle principale :** La couverture du brief produit est conditionnelle - sauter si aucun brief, valider minutieusement si un brief existe. Toujours poursuivre automatiquement.
