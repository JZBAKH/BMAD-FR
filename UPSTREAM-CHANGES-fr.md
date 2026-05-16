# 🔄 Rapport hebdomadaire — Changements upstream à traiter

_Rapport généré le 2026-05-16 par `.github/workflows/upstream-changes-report.yml`._

## 📊 Vue d'ensemble

- **origin/main** : `5090cfb0`
- **bmad-fr** : `17bb6e0f`
- **Fraîcheur de la traduction** : 100.0% (270/270 fichiers à jour)

| Catégorie | Nombre |
|---|---|
| 🆕 Nouveaux fichiers upstream à importer/traduire | **0** |
| 🔄 Traductions FR potentiellement obsolètes | **0** |
| 🗑️ Fichiers supprimés upstream (orphelins côté fork) | **52** |
| ❓ EN modifié mais sans équivalent FR identifiable | 0 |

## 🗑️ Fichiers supprimés upstream

Ces fichiers existent dans le fork mais ont été supprimés upstream. À évaluer :
garder (si toujours pertinent) ou supprimer (si obsolète).

- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/agents/artifact-analyzer.md`
- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/agents/opportunity-reviewer.md`
- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/agents/skeptic-reviewer.md`
- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/agents/web-researcher.md`
- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/bmad-manifest.json`
- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/prompts/contextual-discovery.md`
- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/prompts/draft-and-review.md`
- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/prompts/finalize.md`
- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/prompts/guided-elicitation.md`
- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/resources/brief-template.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/data/domain-complexity.csv`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/data/prd-purpose.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/data/project-types.csv`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-01-init.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-01b-continue.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-02-discovery.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-02b-vision.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-02c-executive-summary.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-03-success.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-04-journeys.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-05-domain.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-06-innovation.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-07-project-type.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-08-scoping.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-09-functional.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-10-nonfunctional.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-11-polish.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/steps-c/step-12-complete.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-create-prd/templates/prd-template.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-edit-prd/data/prd-purpose.md`
- _… et 22 autres_

---

### 💡 Comment utiliser ce rapport

1. Lire la **fraîcheur** en haut — si > 95%, rien d'urgent.
2. Pour les **nouveaux fichiers** : le sync auto les importera dans `bmm-skills/`. Toi tu les traduis vers `bmm-skills-fr/`.
3. Pour les **traductions obsolètes** : compare avec `git diff origin/main..bmad-fr -- <chemin EN>` pour voir ce qui a changé, puis adapter la version FR.
4. Pour les **fichiers supprimés upstream** : décide cas par cas.

Le `test-fr.yml` continue de tourner en parallèle — si un test casse à cause d'un changement upstream, tu reçois un email automatique de GitHub.
