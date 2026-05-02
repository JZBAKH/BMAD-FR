---
name: 'step-v-09-project-type-validation'
description: 'Validation de la Conformité du Type de Projet - Valider que les exigences spécifiques au type de projet sont correctement documentées'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-10-smart-validation.md'
prdFile: '{prd_file_path}'
prdFrontmatter: '{prd_frontmatter}'
validationReportPath: '{validation_report_path}'
projectTypesData: '../data/project-types.csv'
---

# Étape 9 : Validation de la Conformité du Type de Projet

## OBJECTIF DE L'ÉTAPE :

Valider que les exigences spécifiques au type de projet sont correctement documentées - les différents types de projets (api_backend, web_app, mobile_app, etc.) ont des sections requises et exclues différentes.

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
- ✅ Vous apportez votre expertise sur les types de projets et vos connaissances architecturales.
- ✅ Cette étape s'exécute de manière autonome - aucune entrée de l'utilisateur n'est nécessaire.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la conformité au type de projet.
- 🚫 INTERDICTION de valider d'autres aspects dans cette étape.
- 💬 Approche : Valider que les sections requises sont présentes et que les sections exclues sont absentes.
- 🚪 Il s'agit d'une étape de séquence de validation - elle passe automatiquement à la suite une fois terminée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Vérifier classification.projectType dans le frontmatter du PRD.
- 🎯 Valider que les sections requises pour ce type de projet sont présentes.
- 🎯 Valider que les sections exclues pour ce type de projet sont absentes.
- 💾 Ajouter les résultats de conformité au rapport de validation.
- 📖 Afficher "Passage au contrôle suivant..." et charger l'étape suivante.
- 🚫 INTERDICTION de s'arrêter ou de demander l'entrée de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD avec classification du frontmatter, rapport de validation.
- Focus : Conformité du type de projet uniquement.
- Limites : Ne pas valider d'autres aspects, ne pas s'arrêter pour l'entrée de l'utilisateur.
- Dépendances : Étapes 2 à 8 terminées - validation du domaine et des exigences effectuée.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Charger les données sur les types de projets

Chargez et lisez le fichier complet à l'adresse suivante :
`{projectTypesData}` (../data/project-types.csv)

Ce CSV contient :
- Les signaux de détection pour chaque type de projet.
- Les sections requises pour chaque type de projet.
- Les sections à ignorer/exclues pour chaque type de projet.
- Les signaux d'innovation.

Internalisez ces données - elles déterminent quelles sections doivent être présentes ou absentes pour chaque type de projet.

### 2. Extraire la classification du type de projet

Depuis le frontmatter du PRD, extrayez :
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
Supposez "web_app" (le plus courant) et notez-le dans les résultats.

### 3. Déterminer les sections requises et exclues à partir des données CSV

**À partir des données project-types.csv chargées, pour ce type de projet :**

**Sections requises :** (colonne required_sections)
Celles-ci DOIVENT être présentes dans le PRD.

**Sections à ignorer :** (colonne skip_sections)
Celles-ci NE DOIVENT PAS être présentes dans le PRD.

**Exemples de correspondances issues du CSV :**
- api_backend : Requises=[endpoint_specs, auth_model, data_schemas], Ignorer=[ux_ui, visual_design]
- mobile_app : Requises=[platform_reqs, device_permissions, offline_mode], Ignorer=[desktop_features, cli_commands]
- cli_tool : Requises=[command_structure, output_formats, config_schema], Ignorer=[visual_design, ux_principles, touch_interactions]
- etc.

### 4. Valider par rapport aux exigences basées sur le CSV

**Sur la base du type de projet, déterminez :**

**api_backend :**
- Requises : Specs des points de terminaison (endpoints), Modèle d'authentification, Schémas de données, Versionnage d'API.
- Exclues : Sections UX/UI, sections spécifiques au mobile.

**web_app :**
- Requises : Parcours Utilisateurs, Exigences UX/UI, Design Responsif.
- Exclues : Aucune typiquement.

**mobile_app :**
- Requises : UX Mobile, Spécificités de la plateforme (iOS/Android), Mode hors ligne.
- Exclues : Sections spécifiques au desktop.

**desktop_app :**
- Requises : UX Desktop, Spécificités de la plateforme (Windows/Mac/Linux).
- Exclues : Sections spécifiques au mobile.

**data_pipeline :**
- Requises : Sources de données, Transformation des données, Sorties de données (sinks), Gestion des erreurs.
- Exclues : Sections UX/UI.

**ml_system :**
- Requises : Exigences du modèle, Données d'entraînement, Exigences d'inférence, Performance du modèle.
- Exclues : Sections UX/UI (sauf si UI ML).

**library_sdk :**
- Requises : Surface de l'API, Exemples d'utilisation, Guide d'intégration.
- Exclues : Sections UX/UI, sections de déploiement.

**infrastructure :**
- Requises : Composants d'infrastructure, Déploiement, Surveillance, Mise à l'échelle.
- Exclues : Exigences de fonctionnalités (c'est de l'infrastructure, pas du produit).

### 4. Tenter la validation par sous-processus

"Effectuer la validation de la conformité du type de projet pour {projectType} :

**Vérifier que les sections requises sont présentes :**
{Listez les sections requises pour ce type de projet}
Pour chacune : Est-elle présente dans le PRD ? Est-elle documentée de manière adéquate ?

**Vérifier que les sections exclues sont absentes :**
{Listez les sections exclues pour ce type de projet}
Pour chacune : Est-elle absente du PRD ? (Elle ne devrait pas être présente)

Construire un tableau de conformité montrant :
- Sections requises : [Présente/Manquante/Incomplète]
- Sections exclues : [Absente/Présente] (Présente = violation)

Retourner le tableau de conformité avec les résultats."

**Dégradation gracieuse (si pas d'outil Task) :**
- Vérifier manuellement le PRD pour les sections requises.
- Vérifier manuellement le PRD pour les sections exclues.
- Construire le tableau de conformité.

### 5. Construire le tableau de conformité

**Vérification des sections requises :**
- Pour chaque section requise : Présente / Manquante / Incomplète.
- Compte : Sections requises présentes vs total requis.

**Vérification des sections exclues :**
- Pour chaque section exclue : Absente / Présente (violation).
- Compte : Sections exclues présentes (violations).

**Score total de conformité :**
- Requises : {présente}/{total}
- Violations d'exclusion : {count}

### 6. Rapporter les résultats de conformité au type de projet dans le rapport de validation

Ajoutez au rapport de validation :

```markdown
## Validation de la Conformité du Type de Projet

**Type de projet :** {projectType}

### Sections Requises

**{Section 1} :** [Présente/Manquante/Incomplète]
{Si manquante ou incomplète : Notez les lacunes spécifiques}

**{Section 2} :** [Présente/Manquante/Incomplète]
{Si manquante ou incomplète : Notez les lacunes spécifiques}

[Continuer pour toutes les sections requises]

### Sections Exclues (Ne devraient pas être présentes)

**{Section 1} :** [Absente/Présente] ✓
{Si présente : Cette section ne devrait pas être présente pour {projectType}}

**{Section 2} :** [Absente/Présente] ✓
{Si présente : Cette section ne devrait pas être présente pour {projectType}}

[Continuer pour toutes les sections exclues]

### Résumé de la conformité

**Sections requises :** {present}/{total} présentes
**Sections exclues présentes :** {violations} (devrait être 0)
**Score de conformité :** {percentage}%

**Sévérité :** [Critique si des sections requises manquent, Avertissement si incomplet, Réussite si complet]

**Recommandation :**
[Si Critique] "Le PRD manque de sections requises pour {projectType}. Ajoutez les sections manquantes pour spécifier correctement ce type de projet."
[Si Avertissement] "Certaines sections requises pour {projectType} sont incomplètes. Renforcez la documentation."
[Si Réussite] "Toutes les sections requises pour {projectType} sont présentes. Aucune section exclue n'a été trouvée."
```

### 7. Afficher la progression et procéder automatiquement

Affichez : "**Validation de la conformité du type de projet terminée**

Type de projet : {projectType}
Conformité : {score}%

**Passage au prochain contrôle de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-10-smart-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Type de projet extrait correctement (ou valeur par défaut supposée).
- Présence et exhaustivité des sections requises validées.
- Absence des sections exclues validée.
- Tableau de conformité construit avec l'état de toutes les sections.
- Sévérité évaluée correctement.
- Résultats rapportés dans le rapport de validation.
- Passage automatique à l'étape de validation suivante.
- Sous-processus tenté avec dégradation gracieuse.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas vérifier le type de projet avant de procéder.
- Vérifications de sections requises manquantes.
- Vérifications de sections exclues manquantes.
- Ne pas construire de tableau de conformité.
- Ne pas rapporter les résultats dans le rapport de validation.
- Ne pas procéder automatiquement.

**Règle Maîtresse :** Différents types de projets ont des exigences différentes. Les PRD d'API n'ont pas besoin de sections UX - validez en conséquence.
