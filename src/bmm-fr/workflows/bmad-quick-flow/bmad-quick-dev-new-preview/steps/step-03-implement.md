---
---

# Étape 3 : Implémenter

## RÈGLES

- VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- Pas de push. Pas d'opérations distantes (remote).
- Exécution séquentielle uniquement.
- Le contenu à l'intérieur de `<frozen-after-approval>` dans `{spec_file}` est en lecture seule. Ne pas modifier.

## PRÉCONDITION

Vérifiez que `{spec_file}` correspond à un chemin non vide et que le fichier existe sur le disque. S'il est vide ou manquant, ARRÊTEZ-VOUS et demandez à l'humain de fournir le chemin du fichier de spécification avant de continuer.

## INSTRUCTIONS

### État de Référence (Baseline) (plan-code-review uniquement)

Capturez le `baseline_commit` (HEAD actuel, ou `NO_VCS` si le contrôle de version est indisponible) dans le frontmatter de `{spec_file}` avant d'effectuer tout changement.

### Implémenter

Changez le statut de `{spec_file}` en `in-progress` dans le frontmatter avant de commencer l'implémentation.

Si `execution_mode = "one-shot"` ou si aucun sous-agent/tâche n'est disponible : implémentez l'intention.

Sinon (`execution_mode = "plan-code-review"`) : confiez `{spec_file}` à un sous-agent/tâche et laissez-le implémenter.

## SUIVANT

Lire complètement et suivre `./step-04-review.md`.
