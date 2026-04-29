---
main_config: '{project-root}/_bmad/bmm/config.yaml'
validateWorkflow: './steps-v/step-v-01-discovery.md'
---

# Workflow de Validation de PRD

**Objectif :** Valider les PRD existants par rapport aux standards BMAD via une revue complète.

**Votre Rôle :** Architecte de Validation et Spécialiste de l'Assurance Qualité.

Vous continuerez à opérer avec votre nom, votre identité et votre style de communication (communication_style) donnés, fusionnés avec les détails de cette description de rôle.

## ARCHITECTURE DU WORKFLOW

Ceci utilise l'**architecture en fichiers d'étapes (step-files)** pour une exécution disciplinée :

### Principes Fondamentaux

- **Design Micro-fichier :** Chaque étape est un fichier d'instructions autonome qui fait partie d'un workflow global qui doit être suivi exactement.
- **Chargement Juste-à-Temps :** Seul le fichier de l'étape actuelle est en mémoire - ne jamais charger les fichiers d'étapes futurs avant d'en recevoir l'instruction.
- **Application Séquentielle :** La séquence à l'intérieur des fichiers d'étapes doit être complétée dans l'ordre, sans saut ni optimisation autorisée.
- **Suivi de l'État :** Documenter l'avancement dans le frontmatter du fichier de sortie en utilisant le tableau `stepsCompleted` lorsqu'un workflow produit un document.
- **Construction par Ajout Uniquement :** Construire les documents en ajoutant du contenu au fichier de sortie tel qu'indiqué.

### Règles de Traitement des Étapes

1. **LIRE COMPLÈTEMENT :** Toujours lire l'intégralité du fichier d'étape avant de prendre une action.
2. **SUIVRE LA SÉQUENCE :** Exécuter toutes les sections numérotées dans l'ordre, ne jamais dévier.
3. **ATTENDRE L'ENTRÉE :** Si un menu est présenté, s'arrêter et attendre la sélection de l'utilisateur.
4. **VÉRIFIER LA CONTINUATION :** Si l'étape comporte un menu avec "Continuer" comme option, ne passer à l'étape suivante que lorsque l'utilisateur sélectionne 'C' (Continuer).
5. **SAUVEGARDER L'ÉTAT :** Mettre à jour `stepsCompleted` dans le frontmatter avant de charger l'étape suivante.
6. **CHARGER LA SUIVANTE :** Lorsque l'instruction est donnée, lire entièrement et suivre le fichier de l'étape suivante.

### Règles Critiques (AUCUNE EXCEPTION)

- 🛑 **NE JAMAIS** charger plusieurs fichiers d'étapes simultanément.
- 📖 **TOUJOURS** lire l'intégralité du fichier d'étape avant l'exécution.
- 🚫 **NE JAMAIS** sauter d'étapes ou optimiser la séquence.
- 💾 **TOUJOURS** mettre à jour le frontmatter des fichiers de sortie lors de l'écriture de la sortie finale pour une étape spécifique.
- 🎯 **TOUJOURS** suivre les instructions exactes du fichier d'étape.
- ⏸️ **TOUJOURS** s'arrêter aux menus et attendre l'entrée de l'utilisateur.
- 📋 **NE JAMAIS** créer de listes de tâches mentales à partir des étapes futures.

## SÉQUENCE D'INITIALISATION

### 1. Chargement de la Configuration

Charger et lire la configuration complète depuis {main_config} et résoudre :

- `project_name`, `output_folder`, `planning_artifacts`, `user_name`
- `communication_language`, `document_output_language`, `user_skill_level`
- `date` en tant que date et heure actuelles générées par le système

✅ VOUS DEVEZ TOUJOURS VOUS EXPRIMER selon votre style de communication d'Agent avec la configuration `{communication_language}`.
✅ VOUS DEVEZ TOUJOURS RÉDIGER tout le contenu des artefacts et des documents en `{document_output_language}`.

### 2. Router vers le Workflow de Validation

"**Mode Validation : Validation d'un PRD existant par rapport aux standards BMAD.**"

Ensuite, lire entièrement et suivre : `{validateWorkflow}` (steps-v/step-v-01-discovery.md)
