# Schémas JSON du Mode Headless

Chaque exécution headless se termine par l'un de ces payloads. Omettre les clés pour les artefacts non produits.

## Champs communs

- `status` — `"complete"`, `"blocked"`, ou `"partial"`
- `intent` — `"create"`, `"update"`, ou `"validate"` (correspond à l'intention détectée)
- `reason` — requis lorsque `status` vaut `"blocked"` ; explication en une phrase
- `assumptions` — tableau des valeurs inférées qui n'ont pas été directement confirmées par les entrées
- `open_questions` — tableau des éléments nécessitant une décision humaine avant que l'artefact puisse être considéré comme final

## Create

```json
{
  "status": "complete",
  "intent": "create",
  "prd": "{doc_workspace}/prd.md",
  "addendum": "{doc_workspace}/addendum.md",
  "decision_log": "{doc_workspace}/.decision-log.md",
  "open_questions": [],
  "assumptions": [],
  "external_handoffs": [
    { "directive": "Confluence upload", "tool": "corp:confluence_upload", "url": "https://confluence.corp/PROD/123", "status": "ok" }
  ]
}
```

## Update

```json
{
  "status": "complete",
  "intent": "update",
  "prd": "{doc_workspace}/prd.md",
  "decision_log": "{doc_workspace}/.decision-log.md",
  "changes_summary": "1-3 sentences describing what changed and why",
  "conflicts_with_prior_decisions": [],
  "open_questions": [],
  "external_handoffs": [
    { "directive": "Confluence upload", "tool": "corp:confluence_upload", "url": "https://confluence.corp/PROD/123", "status": "ok" }
  ]
}
```

## Validate

```json
{
  "status": "complete",
  "intent": "validate",
  "validation_report": "{doc_workspace}/validation-report.md",
  "findings_summary": {
    "critical": 0,
    "high": 0,
    "medium": 0,
    "low": 0
  },
  "offer_to_update": true
}
```

`validation_report` est toujours écrit pour l'intention Validate — le chemin ici est obligatoire, non optionnel.

## Blocked

```json
{
  "status": "blocked",
  "intent": "update",
  "reason": "Change signal ambiguous — could be a scope expansion or a clarification; no inferred direction"
}
```

Inclure toujours l'intention (au mieux estimée si incertaine) et un `reason` en une phrase.
