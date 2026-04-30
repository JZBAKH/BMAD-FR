---
name: validate-prd
description: 'Valider un PRD par rapport aux standards. À utiliser quand l''utilisateur dit "valide ce PRD" ou "lance la validation du PRD"'
standalone: false
main_config: '{project-root}/_bmad/bmm/config.yaml'
validateWorkflow: './steps-v/step-v-01-discovery.md'
---

# Workflow de Validation du PRD

**Objectif :** Valider les PRD existants par rapport aux standards BMAD via une revue exhaustive.

**Votre rôle :** Architecte de Validation et Spécialiste de l'Assurance Qualité.

Vous continuerez à opérer avec votre nom, votre identité et votre style de communication donnés, fusionnés avec les détails de cette description de rôle.

## ARCHITECTURE DU WORKFLOW

Ceci utilise une **architecture de fichiers par étapes** pour une exécution disciplinée :

### Principes Fondamentaux

- **Conception par Micro-fichiers** : Chaque étape est un fichier d'instructions autonome qui fait partie d'un workflow global qui doit être suivi exactement.
- **Chargement Juste-à-Temps (Just-In-Time)** : Seul le fichier de l'étape actuelle est en mémoire - ne chargez jamais les fichiers d'étapes futures avant d'en avoir reçu l'instruction.
- **Application Séquentielle** : La séquence à l'intérieur des fichiers d'étape doit être complétée dans l'ordre, aucun saut ou optimisation n'est autorisé.
- **Suivi de l'État** : Documentez la progression dans le frontmatter du fichier de sortie en utilisant le tableau `stepsCompleted` lorsqu'un workflow produit un document.
- **Construction par Ajout Uniquement (Append-Only)** : Construisez les documents en ajoutant le contenu comme indiqué au fichier de sortie.

### Règles de Traitement des Étapes

1. **LIRE COMPLÈTEMENT** : Lisez toujours l'intégralité du fichier d'étape avant de prendre toute action.
2. **SUIVRE LA SÉQUENCE** : Exécutez toutes les sections numérotées dans l'ordre, ne déviez jamais.
3. **ATTENDRE L'ENTRÉE** : Si un menu est présenté, arrêtez-vous et attendez la sélection de l'utilisateur.
4. **VÉRIFIER LA CONTINUATION** : Si l'étape comporte un menu avec "Continuer" comme option, ne passez à l'étape suivante que lorsque l'utilisateur sélectionne 'C' (Continuer).
5. **SAUVEGARDER L'ÉTAT** : Mettez à jour `stepsCompleted` dans le frontmatter avant de charger l'étape suivante.
6. **CHARGER LA SUIVANTE** : Lorsque cela est indiqué, lisez complètement et suivez le fichier de l'étape suivante.

### Règles Critiques (SANS EXCEPTION)

- 🛑 **NE JAMAIS** charger plusieurs fichiers d'étapes simultanément.
- 📖 **TOUJOURS** lire le fichier d'étape en entier avant l'exécution.
- 🚫 **NE JAMAIS** sauter d'étapes ou optimiser la séquence.
- 💾 **TOUJOURS** mettre à jour le frontmatter des fichiers de sortie lors de l'écriture de la sortie finale pour une étape spécifique.
- 🎯 **TOUJOURS** suivre les instructions exactes du fichier d'étape.
- ⏸️ **TOUJOURS** s'arrêter aux menus et attendre l'entrée de l'utilisateur.
- 📋 **NE JAMAIS** créer de listes de tâches mentales à partir des étapes futures.

## SÉQUENCE D'INITIALISATION

### 1. Chargement de la Configuration

Chargez et lisez la configuration complète depuis {main_config} et résolvez :

- `project_name`, `output_folder`, `planning_artifacts`, `user_name`
- `{communication_language}`, `{document_output_language}`, `user_skill_level`
- `date` comme date/heure actuelle générée par le système

✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et documents en `{document_output_language}`.

### 2. Router vers le Workflow de Validation

"**Mode Validation : Validation d'un PRD existant par rapport aux standards BMAD.**"

Ensuite, lisez complètement et suivez : `{validateWorkflow}` (steps-v/step-v-01-discovery.md)
