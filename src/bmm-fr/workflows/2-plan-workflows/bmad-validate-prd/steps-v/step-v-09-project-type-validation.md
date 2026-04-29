---
name: 'step-v-09-project-type-validation'
description: 'Validation de la conformité du type de projet - Valider que les exigences spécifiques au type de projet sont correctement documentées'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-10-smart-validation.md'
prdFile: '{prd_file_path}'
prdFrontmatter: '{prd_frontmatter}'
validationReportPath: '{validation_report_path}'
projectTypesData: '../data/project-types.csv'
---

# Étape 9 : Validation de la conformité du type de projet

## OBJECTIF DE L'ÉTAPE :

Valider que les exigences spécifiques au type de projet sont correctement documentées - différents types de projets (api_backend, web_app, mobile_app, etc.) ont des sections requises et exclues différentes.

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
- ✅ Vous apportez une expertise sur les types de projets et des connaissances architecturales
- ✅ Cette étape s'exécute de manière autonome - aucune intervention de l'utilisateur n'est requise

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur la conformité du type de projet
- 🚫 INTERDIT de valider d'autres aspects dans cette étape
- 💬 Approche : Valider que les sections requises sont présentes et que les sections exclues sont absentes
- 🚪 Il s'agit d'une étape de séquence de validation - procède automatiquement une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Vérifier classification.projectType dans le frontmatter du PRD
- 🎯 Valider que les sections requises pour ce type de projet sont présentes
- 🎯 Valider que les sections exclues pour ce type de projet sont absentes
- 💾 Ajouter les conclusions de conformité au rapport de validation
- 📖 Afficher "Passage à la vérification suivante..." et charger l'étape suivante
- 🚫 INTERDIT de faire une pause ou de demander une intervention de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : fichier PRD avec classification frontmatter, rapport de validation
- Focus : Conformité du type de projet uniquement
- Limites : Ne pas valider d'autres aspects, ne pas s'interrompre pour demander une intervention utilisateur
- Dépendances : Étapes 2 à 8 terminées - validation du domaine et des exigences effectuée

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre exactement cette séquence. Ne pas sauter d'étape, ne pas réorganiser ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Charger les données sur les types de projets

Charger et lire le fichier complet à l'adresse :
`{projectTypesData}` (../data/project-types.csv)

Ce CSV contient :
- Signaux de détection pour chaque type de projet
- Sections requises pour chaque type de projet
- Sections à sauter/exclues pour chaque type de projet
- Signaux d'innovation

Internaliser ces données - elles déterminent quelles sections doivent être présentes ou absentes pour chaque type de projet.

### 2. Extraire la classification du type de projet

Depuis le frontmatter du PRD, extraire :
- `classification.projectType` - de quel type de projet s'agit-il ?

**Types de projets courants :**
- api_backend
- web_app
- mobile_app
- desktop_app
- data_pipeline
- ml_system
- library_sdk
- infrastructure
- other

**Si aucune classification projectType n'est trouvée :**
Supposer "web_app" (le plus courant) et le noter dans les conclusions.

### 3. Déterminer les sections requises et exclues à partir des données CSV

**À partir des données project-types.csv chargées, pour ce type de projet :**

**Sections requises :** (colonne required_sections)
Elles DOIVENT être présentes dans le PRD.

**Sections à sauter :** (colonne skip_sections)
Elles ne DOIVENT PAS être présentes dans le PRD.

**Exemples de correspondances issues du CSV :**
- api_backend : Required=[endpoint_specs, auth_model, data_schemas], Skip=[ux_ui, visual_design]
- mobile_app : Required=[platform_reqs, device_permissions, offline_mode], Skip=[desktop_features, cli_commands]
- cli_tool : Required=[command_structure, output_formats, config_schema], Skip=[visual_design, ux_principles, touch_interactions]
- etc.

### 4. Valider par rapport aux exigences basées sur le CSV

**En fonction du type de projet, déterminer :**

**api_backend :**
- Requis : Specs des points de terminaison, Modèle d'Auth, Schémas de données, Versionnage d'API
- Exclu : Sections UX/UI, sections spécifiques au mobile

**web_app :**
- Requis : Parcours Utilisateurs, Exigences UX/UI, Design Réactif
- Exclu : Aucun typiquement

**mobile_app :**
- Requis : UX Mobile, Spécificités de plateforme (iOS/Android), Mode hors-ligne
- Exclu : Sections spécifiques au desktop

**desktop_app :**
- Requis : UX Desktop, Spécificités de plateforme (Windows/Mac/Linux)
- Exclu : Sections spécifiques au mobile

**data_pipeline :**
- Requis : Sources de données, Transformation des données, Puits de données, Gestion des erreurs
- Exclu : Sections UX/UI

**ml_system :**
- Requis : Exigences du modèle, Données d'entraînement, Exigences d'inférence, Performance du modèle
- Exclu : Sections UX/UI (sauf si UI ML)

**library_sdk :**
- Requis : Surface de l'API, Exemples d'utilisation, Guide d'intégration
- Exclu : Sections UX/UI, sections de déploiement

**infrastructure :**
- Requis : Composants d'infrastructure, Déploiement, Surveillance, Mise à l'échelle
- Exclu : Exigences de fonctionnalités (c'est de l'infrastructure, pas du produit)

### 4. Tentative de validation par sous-processus

"Effectuer la validation de la conformité du type de projet pour {projectType} :

**Vérifier que les sections requises sont présentes :**
{Lister les sections requises pour ce type de projet}
Pour chacune : Est-elle présente dans le PRD ? Est-elle documentée de manière adéquate ?

**Vérifier que les sections exclues sont absentes :**
{Lister les sections exclues pour ce type de projet}
Pour chacune : Est-elle absente du PRD ? (Ne devrait pas être présente)

Construire un tableau de conformité montrant :
- Sections requises : [Présente/Manquante/Incomplète]
- Sections exclues : [Absente/Présente] (Présente = violation)

Retourner le tableau de conformité avec les conclusions."

**Dégradation élégante (si pas d'outil Task) :**
- Vérifier manuellement le PRD pour les sections requises
- Vérifier manuellement le PRD pour les sections exclues
- Construire le tableau de conformité

### 5. Construire le tableau de conformité

**Vérification des sections requises :**
- Pour chaque section requise : Présente / Manquante / Incomplète
- Décompte : Sections requises présentes vs total requis

**Vérification des sections exclues :**
- Pour chaque section exclue : Absente / Présente (violation)
- Décompte : Sections exclues présentes (violations)

**Score de conformité total :**
- Requis : {present}/{total}
- Violations d'exclusion : {count}

### 6. Rapporter les conclusions de conformité du type de projet au Rapport de Validation

Ajouter au rapport de validation :

```markdown
## Validation de la conformité du type de projet

**Type de projet :** {projectType}

### Sections requises

**{Section 1} :** [Présente/Manquante/Incomplète]
{Si manquante ou incomplète : Noter les lacunes spécifiques}

**{Section 2} :** [Présente/Manquante/Incomplète]
{Si manquante ou incomplète : Noter les lacunes spécifiques}

[Continuer pour toutes les sections requises]

### Sections exclues (ne devraient pas être présentes)

**{Section 1} :** [Absente/Présente] ✓
{Si présente : Cette section ne devrait pas être présente pour {projectType}}

**{Section 2} :** [Absente/Présente] ✓
{Si présente : Cette section ne devrait pas être présente pour {projectType}}

[Continuer pour toutes les sections exclues]

### Résumé de la conformité

**Sections requises :** {present}/{total} présentes
**Sections exclues présentes :** {violations} (devrait être 0)
**Score de conformité :** {percentage}%

**Sévérité :** [Critique si des sections requises manquent, Avertissement si incomplet, Réussi si complet]

**Recommandation :**
[Si Critique] "Le PRD manque de sections requises pour {projectType}. Ajouter les sections manquantes pour spécifier correctement ce type de projet."
[Si Avertissement] "Certaines sections requises pour {projectType} sont incomplètes. Renforcer la documentation."
[Si Réussi] "Toutes les sections requises pour {projectType} sont présentes. Aucune section exclue n'a été trouvée."
```

### 7. Afficher la progression et procéder automatiquement

Afficher : "**Validation de la conformité du type de projet terminée**

Type de projet : {projectType}
Conformité : {score}%

**Passage à la vérification de validation suivante...**"

Sans délai, lire entièrement et suivre : {nextStepFile} (step-v-10-smart-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Type de projet extrait correctement (ou défaut supposé)
- Sections requises validées pour leur présence et leur exhaustivité
- Sections exclues validées pour leur absence
- Tableau de conformité construit avec le statut de toutes les sections
- Sévérité évaluée correctement
- Conclusions rapportées au rapport de validation
- Passage automatique à l'étape de validation suivante
- Sous-processus tenté avec dégradation élégante

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas vérifier le type de projet avant de procéder
- Vérifications des sections requises manquantes
- Vérifications des sections exclues manquantes
- Ne pas construire de tableau de conformité
- Ne pas rapporter les conclusions au rapport de validation
- Ne pas procéder automatiquement

**Règle Maîtresse :** Différents types de projets ont des exigences différentes. Les PRD d'API n'ont pas besoin de sections UX - valider en conséquence.
