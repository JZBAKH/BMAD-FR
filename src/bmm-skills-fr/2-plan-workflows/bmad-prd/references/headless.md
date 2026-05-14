# Mode Headless

Charge ce fichier lorsque bmad-prd est invoqué en headless (pas d'utilisateur interactif). Suis-le pour toute l'exécution.

## Général

Ne demande pas. Complète l'intention en utilisant ce qui est fourni, ce qui existe dans `{doc_workspace}`, ou ce que tu peux découvrir toi-même. Si l'intention reste ambiguë après inférence, arrête avec un statut JSON `blocked` et un champ `reason` — ne propose pas. Ne salue pas.

Termine par une réponse JSON listant statut, intention, et chemins d'artefacts. Le champ `intent` doit correspondre à l'intention détectée : `"create"`, `"update"`, ou `"validate"`. Omets les clés pour les artefacts non produits. Les schémas complets avec exemples pour chaque intention sont dans `assets/headless-schemas.md`. Forme minimale :

```json
{
  "status": "complete",
  "intent": "validate",
  "validation_report": "{doc_workspace}/validation-report.md",
  "offer_to_update": true
}
```

## Overrides spécifiques au mode

**Update.** Journalise le retour en arrière dans `decision-log.md`, puis applique. Arrête `blocked` si l'intention est ambiguë.

**Validate.** Écris toujours `validation-report.md` dans `{doc_workspace}` quel que soit le nombre de constats. Inclus toujours `"offer_to_update": true` dans le bloc JSON de statut.
