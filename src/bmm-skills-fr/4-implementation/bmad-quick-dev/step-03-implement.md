---
---

# Étape 3 : Implémenter

## RÈGLES

- VOUS DEVEZ TOUJOURS PARLER EN SORTIE selon le style de communication de votre Agent avec la config `{communication_language}`
- Pas de push. Pas d'opérations distantes.
- Exécution séquentielle uniquement.
- Le contenu à l'intérieur de `<frozen-after-approval>` dans `{spec_file}` est en lecture seule. Ne pas modifier.

## PRÉCONDITION

Vérifiez que `{spec_file}` se résout en un chemin non vide et que le fichier existe sur le disque. S'il est vide ou manquant, HALT et demandez à l'humain de fournir le chemin du fichier de spec avant de procéder.

## INSTRUCTIONS

### Référence

Capturez `baseline_commit` (HEAD actuel, ou `NO_VCS` si le contrôle de version n'est pas disponible) dans le frontmatter de `{spec_file}` avant d'effectuer tout changement.

### Implémenter

Changez le statut de `{spec_file}` à `in-progress` dans le frontmatter avant de commencer l'implémentation.

Suivez `./sync-sprint-status.md` avec `{target_status}` = `in-progress`.

Si `{spec_file}` a une liste `context:` non vide dans son frontmatter, chargez ces fichiers avant que l'implémentation ne commence. Lors de la transmission à un sub-agent, incluez-les dans le prompt du sub-agent afin qu'il ait accès au contexte référencé.

Transmettez `{spec_file}` à un sub-agent/tâche et laissez-le implémenter. Si aucun sub-agent n'est disponible, implémentez directement.

**Règle de formatage des chemins :** Tous les liens markdown écrits dans `{spec_file}` doivent utiliser des chemins relatifs au répertoire de `{spec_file}` afin d'être cliquables dans VS Code. Tous les chemins de fichiers affichés dans la sortie terminal/conversation doivent utiliser le format relatif au CWD avec la notation `:line` (par ex. `src/path/file.ts:42`) pour être cliquables dans le terminal. Pas de `/` initial dans les deux cas.

### Auto-vérification

Avant de quitter cette étape, vérifiez que chaque tâche dans la section `## Tasks & Acceptance` de `{spec_file}` est complète. Marquez chaque tâche terminée `[x]`. Si une tâche n'est pas terminée, terminez-la avant de procéder.

## SUIVANT

Lisez intégralement et suivez `./step-04-review.md`
