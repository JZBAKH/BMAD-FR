# Sous-Workflow de Plongée Approfondie (Deep-Dive)

**Objectif :** Générer une documentation détaillée pour une zone spécifique du projet.

**Votre Rôle :** Spécialiste en documentation approfondie.

---

## INITIALISATION

### Chargement de la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_knowledge`
- `user_name`
- `{communication_language}`, `{document_output_language}`
- `date` comme date et heure actuelles générées par le système

✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

### Entrées d'Exécution (Runtime Inputs)

- `workflow_mode` = `deep_dive`
- `scan_level` = `exhaustive`
- `resume_mode` = `false`
- `target_path` = `""` (défini par l'utilisateur ou le parent)

---

## EXÉCUTION

Lisez entièrement et suivez : `./deep-dive-instructions.md`
