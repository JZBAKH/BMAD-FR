# Rendu de validation

Comment les constats du subagent validateur deviennent un rapport de validation. Chargé uniquement quand l'utilisateur a explicitement demandé une analyse — soit intention Validate, soit demande de rapport en cours de session. La passe de discipline Finalize pendant Create/Update NE rend PAS de rapport ; ses constats restent en-conversation.

## Contrat de sortie du subagent validateur

Le subagent parcourt `{workflow.validation_checklist}` contre `prd.md` (et `addendum.md` s'il est présent) et écrit `{doc_workspace}/validation-findings.json` :

```json
{
  "prd_name": "Plantsona",
  "prd_path": "{doc_workspace}/prd.md",
  "checklist_path": "{workflow.validation_checklist}",
  "timestamp": "2026-05-11T09:14:00",
  "overall_synthesis": "2-3 sentences of judgment about the PRD's overall state — what holds up, what's at risk. Written by the subagent, not the parent.",
  "findings": [
    {
      "id": "Q-2",
      "category": "Quality",
      "title": "Measurability",
      "status": "warn",
      "severity": "medium",
      "location": "§16 Success Metrics, lines 408-422",
      "note": "Success Metrics list is measurable but counter-metrics are named only for premium conversion. Other metrics lack paired counter-metrics.",
      "suggested_fix": "Add counter-metrics for engagement (e.g., DAU/MAU) and seasonal cadence."
    }
  ]
}
```

Champs par constat :

- `id` (requis) — ID de l'item de checklist (ex. `Q-1`, `D-2`, `STK-1`, ou des préfixes org-custom).
- `category` (optionnel) — nom de catégorie explicite ; si omis, le moteur de rendu déduit depuis le préfixe d'ID.
- `title` (optionnel mais recommandé) — le nom court de l'item de checklist.
- `status` — `pass` | `warn` | `fail` | `n/a`.
- `severity` — `low` | `medium` | `high` | `critical`.
- `location` (optionnel) — section/ligne/plage dans le PRD où vit le constat. Cite des spécificités, jamais de critique abstraite.
- `note` (optionnel) — le constat lui-même, en une ou deux phrases.
- `suggested_fix` (optionnel) — prochaine action concrète.

## Invocation du rendu

Après que le subagent ait écrit les constats :

```bash
python3 {skill-root}/scripts/render-validation-html.py \
  --findings {doc_workspace}/validation-findings.json \
  --template {workflow.validation_report_template} \
  --output {doc_workspace}/validation-report.html \
  --open
```

Inclus `--open` pour les exécutions interactives (ouvre automatiquement dans le navigateur par défaut). Omets `--open` dans les exécutions headless.

Le script écrit deux artefacts côte à côte : le rapport HTML à `--output`, et un compagnon markdown au même chemin avec l'extension `.md` (ex. `validation-report.md`). Les deux sont toujours produits quand le script s'exécute — le gating de déclenchement se passe en amont (le script n'est invoqué que quand l'utilisateur a demandé une analyse). Il calcule les comptes pass/warn/fail/na, dérive une note (Excellent / Good / Fair / Poor) à partir des comptes de critical-fail et total-fail, rend une barre de score SVG en ligne dans le HTML, groupe les constats par catégorie, et retourne un résumé JSON d'une ligne sur stdout : `{"output": "...", "markdown": "...", "grade": "...", "stats": {...}}`.

Réexécuter la validation écrase les fichiers de rapport existants sur place. La forme markdown est ce que le mode Update lit en roulant les constats dans une révision.
