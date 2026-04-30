# Workflow de Création de Design UX

**Objectif :** Créer des spécifications de design UX complètes grâce à une exploration visuelle collaborative et une prise de décision éclairée, où vous agissez en tant que facilitateur UX travaillant avec une partie prenante du produit.

---

## ARCHITECTURE DU WORKFLOW

Ce workflow utilise une **architecture en micro-fichiers** pour une exécution disciplinée :

- Chaque étape est un fichier autonome avec des règles intégrées.
- Progression séquentielle avec contrôle de l'utilisateur à chaque étape.
- État du document suivi dans le frontmatter.
- Construction du document par ajout successif (append-only) au fil de la conversation.

---

## INITIALISATION

### Chargement de la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `output_folder`, `planning_artifacts`, `user_name`
- `{communication_language}`, `{document_output_language}`, `user_skill_level`
- `date` comme date et heure actuelles générées par le système.

### Chemins (Paths)

- `default_output_file` = `{planning_artifacts}/ux-design-specification.md`

## EXÉCUTION

- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.
- Lisez entièrement et suivez : `./steps/step-01-init.md` pour commencer le workflow de design UX.
