---
---

# Step 5 : Présenter

## RULES

- VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la configuration `{communication_language}`
- NE JAMAIS pousser automatiquement.

## INSTRUCTIONS

### Générer l'Ordre de Revue Suggéré

Lire `{baseline_commit}` depuis le frontmatter de `{spec_file}` et construire le diff de tous les changements depuis ce commit.

Ajouter l'ordre de revue comme une section `## Suggested Review Order` à `{spec_file}` **après la dernière section existante**. Ne pas modifier la Code Map.

Construire le parcours comme une séquence ordonnée d'**arrêts** — références cliquables `path:line` avec un cadrage bref — optimisée pour un réviseur humain lisant de haut en bas pour comprendre le changement :

1. **Ordonner par préoccupation, pas par fichier.** Grouper les arrêts selon la préoccupation conceptuelle qu'ils traitent (par ex., "logique de validation", "changement de schéma", "liaison UI"). Un même fichier peut apparaître sous plusieurs préoccupations.
2. **Commencer par le point d'entrée** — le fichier:ligne unique avec le plus fort effet de levier qu'un réviseur devrait regarder en premier pour saisir l'intention de conception.
3. **À l'intérieur de chaque préoccupation**, ordonner les arrêts du plus important / architecturalement intéressant vers ceux qui le supportent. Légèrement biaiser vers les arrêts à plus haut risque ou traversant des frontières.
4. **Terminer avec les éléments périphériques** — les tests, la configuration, les types, et autres changements de support viennent en dernier.
5. **Chaque référence de code est un lien cliquable relatif au spec-file.** Calculer chaque cible de lien comme un chemin relatif depuis le répertoire de `{spec_file}` vers le fichier modifié. Formater chaque arrêt comme un lien markdown : `[short-name:line](../../path/to/file.ts#L42)`. Utiliser une ancre de ligne `#L`. Utiliser le basename du fichier (ou le suffixe le plus court non ambigu) plus le numéro de ligne comme texte du lien. Le chemin relatif doit être dérivé dynamiquement — ne jamais coder en dur la profondeur.
6. **Chaque arrêt obtient une ligne de cadrage ultra-concise** (≤15 mots) — pourquoi cette approche a été choisie ici et ce qu'elle accomplit dans le contexte du changement. Pas de paragraphes.

Formater chaque arrêt avec le cadrage en premier, le lien sur la ligne suivante indentée :

```markdown
## Suggested Review Order

**{Concern name}**

- {one-line framing}
  [`file.ts:42`](../../src/path/to/file.ts#L42)

- {one-line framing}
  [`other.ts:17`](../../src/path/to/other.ts#L17)

**{Next concern}**

- {one-line framing}
  [`file.ts:88`](../../src/path/to/file.ts#L88)
```

> Le préfixe `../../` ci-dessus est illustratif — calculer le chemin relatif réel depuis le répertoire de `{spec_file}` vers chaque fichier cible.

Lorsqu'il n'y a qu'une seule préoccupation, omettre le libellé en gras — lister simplement les arrêts directement.

### Marquer la Spec comme Terminée

Changer le statut de `{spec_file}` à `done` dans le frontmatter.

Suivre `./sync-sprint-status.md` avec `{target_status}` = `review`.

### Commiter et Ouvrir

1. Si le contrôle de version est disponible et que l'arbre est sale, créer un commit local avec un message conventionnel dérivé du titre de la spec.
2. Ouvrir la spec dans l'éditeur de l'utilisateur pour qu'il puisse cliquer à travers le Suggested Review Order :
   - Résoudre deux chemins absolus : (1) la racine du dépôt (`git rev-parse --show-toplevel` — retourne la racine du worktree quand dans un worktree, sinon la racine du projet ; si cela échoue, se rabattre sur le répertoire de travail courant), (2) `{spec_file}`. Exécuter `code -r "{absolute-root}" "{absolute-spec-file}"` — la racine en premier pour que VS Code s'ouvre dans le bon contexte, puis le fichier de spec. Toujours mettre les chemins entre guillemets doubles pour gérer les espaces et caractères spéciaux.
   - Si `code` n'est pas disponible (la commande échoue), passer gracieusement et indiquer à l'utilisateur le chemin du fichier spec à la place.

### Afficher le Résumé

Afficher le résumé de votre travail à l'utilisateur, incluant le hash du commit si un a été créé. Tous les chemins de fichiers affichés dans la sortie conversation/terminal doivent utiliser le format relatif au CWD (sans `/` initial) avec la notation `:line` (par ex., `src/path/file.ts:42`) pour la cliquabilité dans le terminal — l'objectif est de rendre les chemins cliquables dans les émulateurs de terminal. Inclure :

- Une note indiquant que la spec est ouverte dans leur éditeur (ou le chemin du fichier s'il n'a pas pu être ouvert). Mentionner que `{spec_file}` contient maintenant un Suggested Review Order.
- **Astuce de navigation :** "Ctrl+clic (Cmd+clic sur macOS) sur les liens dans le Suggested Review Order pour sauter à chaque arrêt."
- Proposer de pousser et/ou créer une pull request.

Workflow terminé.

## On Complete

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu n'est pas vide, le suivre comme instruction terminale finale avant de sortir.
