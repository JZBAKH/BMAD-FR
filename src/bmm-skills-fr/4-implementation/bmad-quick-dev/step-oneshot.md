---
deferred_work_file: '{implementation_artifacts}/deferred-work.md'
---

# Étape Oneshot : Implémenter, Revoir, Présenter

## RÈGLES

- VOUS DEVEZ TOUJOURS RÉPONDRE EN SORTIE dans le style de communication de votre Agent avec la config `{communication_language}`
- Ne JAMAIS pousser automatiquement.

## INSTRUCTIONS

### Implémenter

Suivez `./sync-sprint-status.md` avec `{target_status}` = `in-progress`.

Implémentez directement l'intention clarifiée.

### Revoir

Invoquez le skill `bmad-review-adversarial-general` dans un subagent avec les fichiers modifiés. Le subagent ne reçoit AUCUN contexte conversationnel — afin d'éviter le biais d'ancrage. Lancez-le à la même capacité de modèle que la session courante. Si aucun sub-agent n'est disponible, écrivez les fichiers modifiés dans un fichier de prompt de revue dans `{implementation_artifacts}` et HALT. Demandez à l'humain d'exécuter la revue dans une session séparée et de coller en retour les constats.

### Classifier

Dédupliquez tous les constats de revue. Trois catégories uniquement :

- **patch** — corrigible trivialement. Auto-correction immédiate.
- **defer** — problème préexistant non causé par ce changement. À ajouter à `{deferred_work_file}`.
- **reject** — bruit. À écarter silencieusement.

Si un constat est causé par ce changement mais trop significatif pour un patch trivial, HALT et présentez-le à l'humain pour décision avant de poursuivre.

### Générer la trace de spec

Définissez `{title}` = un titre concis dérivé de l'intention clarifiée.

Écrivez `{spec_file}` en utilisant `./spec-template.md`. Remplissez uniquement ces sections — supprimez toutes les autres :

1. **Frontmatter** — définissez `title: '{title}'`, `type`, `created`, `status: 'done'`. Ajoutez `route: 'one-shot'`.
2. **Title and Intent** — titre `# {title}` et `## Intent` avec lignes **Problem** et **Approach**. Réutilisez le résumé que vous avez déjà généré pour le terminal.
3. **Suggested Review Order** — à ajouter après Intent. Construisez en utilisant la même convention que `./step-05-present.md` § « Generate Suggested Review Order » (liens relatifs au fichier de spec, ordre par préoccupation, formulation ultra-concise).

Suivez `./sync-sprint-status.md` avec `{target_status}` = `review`.

### Commit

Si le contrôle de version est disponible et que l'arbre est sale, créez un commit local avec un message conventionnel dérivé de l'intention. Si le VCS est indisponible, sautez.

### Présenter

1. Ouvrez la spec dans l'éditeur de l'utilisateur pour qu'il puisse cliquer à travers le Suggested Review Order :
   - Résolvez deux chemins absolus : (1) la racine du dépôt (`git rev-parse --show-toplevel` — retourne la racine du worktree quand on est dans un worktree, sinon la racine du projet ; en cas d'échec, repliez-vous sur le répertoire de travail courant), (2) `{spec_file}`. Exécutez `code -r "{absolute-root}" "{absolute-spec-file}"` — la racine d'abord pour que VS Code s'ouvre dans le bon contexte, puis le fichier de spec. Mettez toujours les chemins entre guillemets doubles pour gérer les espaces et caractères spéciaux.
   - Si `code` n'est pas disponible (la commande échoue), sautez gracieusement et indiquez à l'utilisateur le chemin du fichier de spec à la place.
2. Affichez un résumé en sortie de conversation, comprenant :
   - Le hash du commit (s'il en a été créé un).
   - Liste des fichiers changés avec descriptions d'une ligne. Tout chemin de fichier affiché en sortie de conversation/terminal doit utiliser le format relatif au CWD (sans `/` initial) avec la notation `:line` (par exemple, `src/path/file.ts:42`) pour la cliquabilité dans le terminal — cela diffère des liens du fichier de spec qui utilisent des chemins relatifs au fichier de spec.
   - Décomposition des constats de revue : patchs appliqués, items reportés, items rejetés. Si tous les constats ont été rejetés, dites-le.
   - Une note indiquant que la spec est ouverte dans leur éditeur (ou le chemin du fichier s'il n'a pas pu être ouvert). Mentionnez que `{spec_file}` contient désormais un Suggested Review Order.
   - **Astuce de navigation :** « Ctrl+clic (Cmd+clic sur macOS) sur les liens du Suggested Review Order pour sauter à chaque étape. »
3. Proposez de pousser et/ou de créer une pull request.

HALT et attendez l'entrée humaine.

Workflow terminé.

## On Complete

Run: `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu est non vide, suivez-le comme instruction terminale finale avant la sortie.
