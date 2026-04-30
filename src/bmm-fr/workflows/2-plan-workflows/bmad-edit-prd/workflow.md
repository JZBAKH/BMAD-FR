---
main_config: '{project-root}/_bmad/bmm/config.yaml'
editWorkflow: './steps-e/step-e-01-discovery.md'
---

# Workflow de Modification de PRD

**Objectif :** Modifier et améliorer les PRD existants via un workflow d'amélioration structuré.

**Votre rôle :** Spécialiste de l'amélioration de PRD.

Vous continuerez à opérer avec votre nom, votre identité et votre style de communication (communication_style) donnés, fusionnés avec les détails de cette description de rôle.

## ARCHITECTURE DU WORKFLOW

Ce workflow utilise une **architecture de fichiers d'étapes** pour une exécution disciplinée :

### Principes Fondamentaux

- **Conception de Micro-fichiers** : Chaque étape est un fichier d'instructions autonome faisant partie d'un workflow global qui doit être suivi exactement.
- **Chargement Juste-à-Temps** : Seul le fichier d'étape actuel est en mémoire - ne chargez jamais de fichiers d'étapes futurs avant d'en avoir reçu l'instruction.
- **Respect de la Séquence** : La séquence à l'intérieur des fichiers d'étapes doit être complétée dans l'ordre, aucune omission ou optimisation n'est autorisée.
- **Suivi de l'État** : Documentez la progression dans le frontmatter du fichier de sortie en utilisant le tableau `stepsCompleted` lorsqu'un workflow produit un document.
- **Construction par Ajout Uniquement (Append-Only Building)** : Construisez les documents en ajoutant du contenu au fichier de sortie comme indiqué.

### Règles de Traitement des Étapes

1. **LIRE COMPLÈTEMENT** : Lisez toujours l'intégralité du fichier d'étape avant de prendre toute mesure.
2. **SUIVRE LA SÉQUENCE** : Exécutez toutes les sections numérotées dans l'ordre, sans jamais dévier.
3. **ATTENDRE L'ENTRÉE** : Si un menu est présenté, arrêtez-vous et attendez la sélection de l'utilisateur.
4. **VÉRIFIER LA CONTINUATION** : Si l'étape comporte un menu avec "Continuer" comme option, ne passez à l'étape suivante que si l'utilisateur sélectionne 'C' (Continuer).
5. **SAUVEGARDER L'ÉTAT** : Mettez à jour `stepsCompleted` dans le frontmatter avant de charger l'étape suivante.
6. **CHARGER LA SUIVANTE** : Lorsque cela est indiqué, lisez complètement et suivez le fichier d'étape suivant.

### Règles Critiques (AUCUNE EXCEPTION)

- 🛑 **NE JAMAIS** charger plusieurs fichiers d'étapes simultanément.
- 📖 **TOUJOURS** lire l'intégralité du fichier d'étape avant l'exécution.
- 🚫 **NE JAMAIS** sauter d'étapes ou optimiser la séquence.
- 💾 **TOUJOURS** mettre à jour le frontmatter des fichiers de sortie lors de l'écriture de la sortie finale pour une étape spécifique.
- 🎯 **TOUJOURS** suivre les instructions exactes du fichier d'étape.
- ⏸️ **TOUJOURS** s'arrêter aux menus et attendre l'entrée de l'utilisateur.
- 📋 **NE JAMAIS** créer de listes de tâches mentales à partir d'étapes futures.

## SÉQUENCE D'INITIALISATION

### 1. Chargement de la Configuration

Chargez et lisez la configuration complète à partir de {main_config} et résolvez :

- `project_name`, `output_folder`, `planning_artifacts`, `user_name`
- `{communication_language}`, `{document_output_language}`, `user_skill_level`
- `date` comme date/heure actuelle générée par le système.

✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

### 2. Routage vers le Workflow d'Édition

"**Mode Édition : Amélioration d'un PRD existant.**"

Demandez le chemin du PRD : "Quel PRD souhaitez-vous modifier ? Veuillez fournir le chemin vers le fichier PRD.md."

Ensuite, lisez complètement et suivez : `{editWorkflow}` (steps-e/step-e-01-discovery.md)
