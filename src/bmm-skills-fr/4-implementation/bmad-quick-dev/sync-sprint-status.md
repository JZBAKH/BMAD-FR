# Synchroniser le statut du sprint

Sous-étape partagée pour mettre à jour `sprint-status.yaml` pendant quick-dev. Appelée depuis n'importe quelle route (plan-code-review, one-shot, futures routes) avec un paramètre `{target_status}`.

## Préconditions

Sauter entièrement ce fichier (revenir à l'appelant) si l'UNE des conditions suivantes est vraie :

- `{story_key}` n'est pas défini
- `{sprint_status}` n'existe pas sur le disque

## Instructions

1. Charger le fichier `{sprint_status}` ENTIER.
2. Trouver l'entrée `development_status` correspondant à `{story_key}`. Si elle est introuvable, avertir l'utilisateur une seule fois (`"{story_key} not found in sprint-status; skipping sprint sync"`) et revenir à l'appelant.
3. **Vérification d'idempotence.** Si `development_status[{story_key}]` est déjà à `{target_status}` ou à un état ultérieur (`review` est ultérieur à `in-progress` ; `done` est ultérieur aux deux), revenir à l'appelant — aucune écriture nécessaire. Ne jamais faire régresser le statut d'une story.
4. Définir `development_status[{story_key}]` à `{target_status}`.
5. **Élévation du thème (uniquement quand `{target_status}` = `in-progress`).** Dériver la clé du thème parent comme `epic-{N}` à partir du segment numérique de tête de `{story_key}` (ex. `3-2-digest-delivery` → `epic-3`). Si cette entrée existe et vaut `backlog`, la passer à `in-progress`. Sinon, ne pas y toucher. Sauter entièrement cette sous-étape lorsque `{target_status}` n'est pas `in-progress`.
6. Rafraîchir `last_updated` à la date courante.
7. Sauvegarder le fichier en préservant TOUS les commentaires et la structure, y compris STATUS DEFINITIONS et WORKFLOW NOTES.
