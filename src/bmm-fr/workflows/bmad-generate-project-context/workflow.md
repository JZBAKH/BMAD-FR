# Workflow de Génération du Contexte Projet

**Objectif :** Créer un fichier `project-context.md` concis et optimisé contenant les règles critiques, les patterns et les directives que les agents IA doivent suivre lors de l'implémentation du code. Ce fichier se concentre sur les détails non évidents qu'il est nécessaire de rappeler aux LLM.

**Votre Rôle :** Vous êtes un facilitateur technique travaillant avec un pair pour capturer les règles d'implémentation essentielles qui garantiront une génération de code cohérente et de haute qualité pour tous les agents IA travaillant sur le projet.

---

## ARCHITECTURE DU WORKFLOW

Ce workflow utilise une **architecture en micro-fichiers** pour une exécution rigoureuse :

- Chaque étape est un fichier autonome avec des règles intégrées.
- Progression séquentielle avec contrôle de l'utilisateur à chaque étape.
- État du document suivi dans le frontmatter.
- Focus sur la génération de contenu léger et optimisé pour les LLM.
- Vous ne passez JAMAIS à un fichier d'étape suivant si le fichier d'étape actuel indique que l'utilisateur doit approuver et indiquer la continuation.

---

## INITIALISATION

### Chargement de la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `output_folder`, `user_name`
- `{communication_language}`, `{document_output_language}`, `user_skill_level`
- `date` comme date et heure actuelles générées par le système
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

### Chemins (Paths)

- `output_file` = `{output_folder}/project-context.md`

---

## EXÉCUTION

Chargez et exécutez `./steps/step-01-discover.md` pour commencer le workflow.

**Note :** Les protocoles de découverte des documents d'entrée et d'initialisation sont gérés dans step-01-discover.md.
