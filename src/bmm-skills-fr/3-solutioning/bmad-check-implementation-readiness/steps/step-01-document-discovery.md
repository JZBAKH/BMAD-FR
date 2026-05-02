---
outputFile: '{planning_artifacts}/implementation-readiness-report-{{date}}.md'
---

# Étape 1 : Découverte des documents

## OBJECTIF DE L'ÉTAPE :

Découvrir, inventorier et organiser tous les documents du projet, en identifiant les doublons et en déterminant quelles versions utiliser pour l'évaluation.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre toute action.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Product Manager et Scrum Master expert.
- ✅ Votre mission est de trouver, organiser et documenter ce qui existe.
- ✅ Vous identifiez les ambiguïtés et demandez des clarifications.
- ✅ Le succès se mesure à un inventaire clair des fichiers et à la résolution des conflits.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la recherche et l'organisation des fichiers.
- 🚫 Ne lisez pas et n'analysez pas le contenu des fichiers.
- 💬 Identifiez clairement les documents en double.
- 🚪 Obtenez la confirmation de l'utilisateur sur la sélection des fichiers.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Rechercher systématiquement tous les types de documents.
- 💾 Regrouper les fichiers segmentés (sharded).
- 📖 Signaler les doublons pour résolution par l'utilisateur.
- 🚫 INTERDICTION de poursuivre avec des doublons non résolus.

## PROCESSUS DE DÉCOUVERTE DES DOCUMENTS :

### 1. Initialiser la Découverte des Documents

"Début de la **Découverte des documents** pour inventorier tous les fichiers du projet.

Je vais :

1. Rechercher tous les documents requis (PRD, Architecture, Epics, UX)
2. Regrouper les documents segmentés
3. Identifier les éventuels doublons (versions complètes + segmentées)
4. Présenter les résultats pour votre confirmation"

### 2. Modèles de Recherche de Documents

Rechercher chaque type de document en utilisant ces modèles :

#### A. Documents PRD

- Complet : `{planning_artifacts}/*prd*.md`
- Segmenté : `{planning_artifacts}/*prd*/index.md` et fichiers associés

#### B. Documents d'Architecture

- Complet : `{planning_artifacts}/*architecture*.md`
- Segmenté : `{planning_artifacts}/*architecture*/index.md` et fichiers associés

#### C. Documents Epics & Stories

- Complet : `{planning_artifacts}/*epic*.md`
- Segmenté : `{planning_artifacts}/*epic*/index.md` et fichiers associés

#### D. Documents de Design UX

- Complet : `{planning_artifacts}/*ux*.md`
- Segmenté : `{planning_artifacts}/*ux*/index.md` et fichiers associés

### 3. Organiser les Résultats

Pour chaque type de document trouvé :

```
## Fichiers [Type de document] trouvés

**Documents complets :**
- [nom_du_fichier.md] ([taille], [date de modification])

**Documents segmentés :**
- Dossier : [nom_du_dossier]/
  - index.md
  - [autres fichiers dans le dossier]
```

### 4. Identifier les Problèmes Critiques

#### Doublons (CRITIQUE)

Si des versions complètes et segmentées existent toutes deux :

```
⚠️ PROBLÈME CRITIQUE : Formats de documents en double trouvés
- Le PRD existe à la fois en tant que fichier complet.md ET dossier prd/
- VOUS DEVEZ choisir quelle version utiliser
- Supprimez ou renommez l'autre version pour éviter toute confusion
```

#### Documents Manquants (AVERTISSEMENT)

Si les documents requis ne sont pas trouvés :

```
⚠️ AVERTISSEMENT : Document requis non trouvé
- Document d'Architecture non trouvé
- Cela impactera l'exhaustivité de l'évaluation
```

### 5. Ajouter la Section de Rapport Initial

Initialiser {outputFile} avec ../templates/readiness-report-template.md.

### 6. Présenter les Résultats et Obtenir Confirmation

Afficher les résultats et demander :
"**Découverte des documents terminée**

[Afficher la liste organisée des fichiers]

**Problèmes détectés :**

- [Lister les doublons nécessitant une résolution]
- [Lister les documents manquants]

**Actions requises :**

- Si des doublons existent : Veuillez supprimer/renommer une version
- Confirmez quels documents utiliser pour l'évaluation

**Prêt à continuer ?** [C] Continue après avoir résolu les problèmes"

### 7. Présenter les OPTIONS DU MENU

Afficher : **Sélectionnez une option :** [C] Continue vers la Validation des Fichiers

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre la saisie de l'utilisateur après avoir présenté le menu.
- Continuer UNIQUEMENT avec la sélection 'C'.
- Si des doublons sont identifiés, insister sur leur résolution préalable.
- L'utilisateur peut clarifier l'emplacement des fichiers ou demander des recherches supplémentaires.

#### Logique de Gestion du Menu :

- SI C : Sauvegarder l'inventaire des documents dans {outputFile}, mettre à jour le frontmatter avec l'étape terminée et les fichiers inclus, puis lire complètement et suivre : ./step-02-prd-analysis.md
- SI tout autre commentaire ou question : aider l'utilisateur à répondre puis réafficher le menu.

## NOTE CRITIQUE SUR LA FIN DE L'ÉTAPE

UNIQUEMENT lorsque 'C' est sélectionné et que l'inventaire des documents est sauvegardé, vous chargerez ./step-02-prd-analysis.md pour commencer la validation des fichiers.

---

## 🚨 MESURES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Tous les types de documents recherchés systématiquement.
- Fichiers organisés et inventoriés clairement.
- Doublons identifiés et signalés pour résolution.
- L'utilisateur a confirmé la sélection des fichiers.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas rechercher tous les types de documents.
- Ignorer les conflits de documents en double.
- Poursuivre sans résoudre les problèmes critiques.
- Ne pas sauvegarder l'inventaire des documents.

**Règle Maîtresse :** Une identification claire des fichiers est essentielle pour une évaluation précise.
