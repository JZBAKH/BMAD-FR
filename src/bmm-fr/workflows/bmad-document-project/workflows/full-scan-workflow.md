# Sous-Workflow de Scan Complet du Projet

**Objectif :** Compléter la documentation du projet (scan initial ou rescan complet).

**Votre Rôle :** Spécialiste en documentation par scan complet.

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

- `workflow_mode` = `""` (défini par le parent : `initial_scan` ou `full_rescan`)
- `scan_level` = `""` (défini par le parent : `quick`, `deep` ou `exhaustive`)
- `resume_mode` = `false`
- `autonomous` = `false` (nécessite l'intervention de l'utilisateur aux points de décision clés)

---

## EXÉCUTION

Lisez entièrement et suivez : `./full-scan-instructions.md`
