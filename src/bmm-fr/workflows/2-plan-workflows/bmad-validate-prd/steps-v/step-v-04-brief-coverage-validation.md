---
name: 'step-v-04-brief-coverage-validation'
description: 'Vérification de la Couverture du Brief Produit - Valider que le PRD couvre tout le contenu du Brief Produit (s''il a été fourni en entrée)'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-05-measurability-validation.md'
prdFile: '{prd_file_path}'
productBrief: '{product_brief_path}'
validationReportPath: '{validation_report_path}'
---

# Étape V-4 : Validation de la Couverture du Brief Produit

## OBJECTIF DE L'ÉTAPE :

Valider que le PRD couvre l'intégralité du contenu du Brief Produit (si un brief a été utilisé en entrée), en mettant en correspondance le contenu du brief avec les sections du PRD et en identifiant les éventuelles lacunes (gaps).

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans la contribution de l'utilisateur
- 📖 CRITIQUE : Lisez TOUJOURS le fichier d'étape en entier avant d'entreprendre la moindre action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que l'ensemble du fichier est lu et compris
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS EFFECTUER LA SORTIE ORALE dans votre style de communication d'Agent avec la `{communication_language}` configurée

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité
- ✅ Si l'on vous a déjà fourni des modèles de communication ou des personnas, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif
- ✅ Vous apportez une rigueur analytique et une expertise en matière de traçabilité
- ✅ Cette étape s'exécute de manière autonome - aucune intervention de l'utilisateur n'est requise

### Règles Spécifiques à cette Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la traçabilité entre le Brief Produit et le PRD
- 🚫 INTERDICTION de corriger les erreurs - ne faites que les signaler
- 💬 Approche : Autonome, méthodique, comparaison rigoureuse
- 🚪 Cette étape transitera automatiquement vers l'étape suivante une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Vérifiez si un Brief Produit existe dans les documents d'entrée (input documents)
- 🎯 Scannez le Brief Produit et le PRD pour identifier la couverture du contenu
- 🎯 Classifiez la gravité (severity) des lacunes de couverture (coverage gaps)
- 🎯 Consignez les conclusions dans le rapport de validation
- 💬 Affichez un résumé de la progression à l'utilisateur
- 🎯 Poursuivez automatiquement vers l'étape de validation suivante

## LIMITES DU CONTEXTE :

- Contexte disponible : L'intégralité du PRD, le Brief Produit (si chargé), et les directives `prd-purpose.md`
- Concentration : Couverture de l'information et traçabilité depuis le brief
- Limites : Ne pas valider d'autres aspects de la qualité (seulement la couverture du brief)
- Dépendances : Validation de la Densité (Étape v-03) terminée

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence à la lettre. Ne sautez pas, ne réorganisez pas et n'improvisez pas.

### 1. Vérifier l'Existence du Brief Produit

Vérifiez si un Brief Produit (ou un document similaire de définition de projet) a été chargé lors de l'étape de découverte (discovery).

**S'IL N'Y A PAS DE BRIEF PRODUIT :**
- Inscrivez silencieusement dans le rapport de validation : "Validation de la Couverture du Brief Produit : N/A (Aucun brief fourni)"
- Affichez : "**Validation de la Couverture du Brief Produit : Ignorée (Aucun Brief Produit fourni)**"
- Passez immédiatement à l'étape 6.

**SI UN BRIEF PRODUIT EXISTE :**
- Poursuivez à l'étape 2.

### 2. Sous-processus de Validation de la Couverture

**Si l'outil Tâche (Task tool) est disponible, déléguez ceci à un sous-agent :**

"Exécutez une vérification de la couverture du Brief Produit sur le PRD.
1. Extrayez les éléments de contenu clés du Brief Produit (objectifs, public cible, fonctionnalités principales, contraintes).
2. Vérifiez si chaque élément clé est abordé dans le PRD.
3. Identifiez toute information critique du brief qui est manquante ou contredite dans le PRD.

Pour chaque élément clé du brief, classifiez sa couverture dans le PRD :
- **Entièrement Couvert (Fully Covered) :** Présent et détaillé
- **Partiellement Couvert (Partially Covered) :** Mentionné mais manquant de profondeur par rapport au brief
- **Non Trouvé (Not Found) :** Manquant dans le PRD
- **Exclu Intentionnellement (Intentionally Excluded) :** Manquant, mais le PRD explique pourquoi (par ex., repoussé à une version ultérieure)

Évaluez la gravité globale des lacunes :
- **Critique (Critical) :** Objectifs principaux ou fonctionnalités clés manquants
- **Modérée (Moderate) :** Détails de soutien ou contraintes manquants
- **Informative (Informational) :** Le PRD s'écarte légèrement mais de manière justifiable"

### 3. Dégradation Gracieuse (Si l'outil Tâche est indisponible)

Si vous ne pouvez pas utiliser l'outil Tâche, effectuez l'analyse de couverture vous-même de manière silencieuse dans votre fenêtre contextuelle (context window). Comparez le contenu clé du brief au PRD, identifiez les lacunes, et évaluez la gravité manuellement.

### 4. Mettre à Jour le Rapport de Validation

Ajoutez silencieusement ce qui suit au fichier `{validationReportPath}` :

```markdown
## 4. Couverture du Brief Produit
**Statut :** {Critique / Modérée / Informative / Succès}

### Analyse de la Couverture
- **Éléments Entièrement Couverts :** {count}
- **Éléments Partiellement Couverts :** {count}
- **Éléments Non Trouvés :** {count}
- **Exclusions Intentionnelles :** {count}

### Lacunes Critiques (à corriger)
1. {Lacune 1 avec sa source dans le brief}
2. {Lacune 2 avec sa source dans le brief}

### Lacunes Modérées
1. {Lacune 1 avec sa source dans le brief}
```

### 5. Compiler le Résumé des Constats (Pour l'affichage uniquement)

Préparez ce texte pour la console (n'attendez PAS d'action de l'utilisateur) :

```text
**Analyse de la Couverture du Brief Produit :**
- Entièrement Couvert : {count} éléments
- Partiellement Couvert : {count} éléments
- Non Trouvé : {count} éléments

**Lacunes d'Information Critiques :** [count] [listez-les s'il y en a]
**Lacunes d'Information Modérées :** [count] [listez-les s'il y en a]

**Recommandation :**
[Si lacunes critiques] "Le PRD doit être révisé pour couvrir le contenu critique du Brief Produit."
[Si lacunes modérées] "Envisagez de combler les lacunes modérées pour une couverture complète."
[Si lacunes minimes] "Le PRD offre une bonne couverture du contenu du Brief Produit."
```

### 6. Afficher la Progression et Passer Automatiquement à la Suite

Affichez : "**Validation de la Couverture du Brief Produit Terminée**

Couverture globale : {Critique/Modérée/Informative/Succès ou N/A}

**Passage à la vérification de validation suivante...**"

Sans délai, lisez entièrement et suivez : `{nextStepFile}` (step-v-05-measurability-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Vérification correcte de l'existence du Brief Produit
- Si aucun brief : Signalement "N/A" et saut effectué proprement
- Si le brief existe : Mise en correspondance de tout le contenu clé du brief avec les sections du PRD
- Couverture classifiée de manière appropriée (Entièrement/Partiellement/Non trouvée/Exclue intentionnellement)
- Gravité évaluée pour les lacunes (Critique/Modérée/Informative)
- Conclusions consignées dans le rapport de validation
- Passage automatique à l'étape de validation suivante
- Tentative de sous-processus avec dégradation gracieuse

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas vérifier l'existence du brief avant de tenter la validation
- Si le brief existe : ne pas mettre en correspondance tous les domaines de contenu clés
- Classifications de couverture manquantes
- Non-consignation des conclusions dans le rapport de validation
- Absence de passage automatique (mise en pause)
- Ne pas tenter l'architecture de sous-processus

**Règle Principale :** La couverture du Brief Produit est conditionnelle - ignorez si aucun brief, validez minutieusement si un brief existe. Poursuivez toujours automatiquement.
