# 🔄 Rapport hebdomadaire — Changements upstream à traiter

_Rapport généré le 2026-05-17 par `.github/workflows/upstream-changes-report.yml`._

## 📊 Vue d'ensemble

- **origin/main** : `71136bc6`
- **bmad-fr** : `a1ec2816`
- **Fraîcheur de la traduction** : 95.5% (256/268 fichiers à jour)

| Catégorie | Nombre |
|---|---|
| 🆕 Nouveaux fichiers upstream à importer/traduire | **1** |
| 🔄 Traductions FR potentiellement obsolètes | **11** |
| 🗑️ Fichiers supprimés upstream (orphelins côté fork) | **3** |
| ❓ EN modifié mais sans équivalent FR identifiable | 0 |

## 🆕 Nouveaux fichiers upstream (à importer + traduire)

Ces fichiers existent dans upstream mais pas dans le fork. À importer via le
workflow `sync-upstream-en.yml` (auto quotidien) puis à traduire manuellement.

- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/references/validate.md` → traduire dans `src/bmm-skills-fr/2-plan-workflows/bmad-prd/references/validate.md`

## 🔄 Traductions FR potentiellement obsolètes

Ces fichiers EN ont été modifiés upstream. La version FR existe mais peut
avoir besoin d'être mise à jour.

- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/SKILL.md` → `src/bmm-skills-fr/1-analysis/bmad-product-brief/SKILL.md`
- [ ] `src/bmm-skills/1-analysis/bmad-product-brief/customize.toml` → `src/bmm-skills-fr/1-analysis/bmad-product-brief/customize.toml`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/SKILL.md` → `src/bmm-skills-fr/2-plan-workflows/bmad-prd/SKILL.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/assets/headless-schemas.md` → `src/bmm-skills-fr/2-plan-workflows/bmad-prd/assets/headless-schemas.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/assets/prd-template.md` → `src/bmm-skills-fr/2-plan-workflows/bmad-prd/assets/prd-template.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/assets/prd-validation-checklist.md` → `src/bmm-skills-fr/2-plan-workflows/bmad-prd/assets/prd-validation-checklist.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/assets/validation-report-template.html` → `src/bmm-skills-fr/2-plan-workflows/bmad-prd/assets/validation-report-template.html`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/customize.toml` → `src/bmm-skills-fr/2-plan-workflows/bmad-prd/customize.toml`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/references/headless.md` → `src/bmm-skills-fr/2-plan-workflows/bmad-prd/references/headless.md`
- [ ] `tools/installer/prompts.js` → `tools/installer-fr/prompts.js`
- [ ] `tools/installer/ui.js` → `tools/installer-fr/ui.js`

## 🗑️ Fichiers supprimés upstream

Ces fichiers existent dans le fork mais ont été supprimés upstream. À évaluer :
garder (si toujours pertinent) ou supprimer (si obsolète).

- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/references/facilitation-guide.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/references/validation-render.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/scripts/render-validation-html.py`

---

### 💡 Comment utiliser ce rapport

1. Lire la **fraîcheur** en haut — si > 95%, rien d'urgent.
2. Pour les **nouveaux fichiers** : le sync auto les importera dans `bmm-skills/`. Toi tu les traduis vers `bmm-skills-fr/`.
3. Pour les **traductions obsolètes** : compare avec `git diff origin/main..bmad-fr -- <chemin EN>` pour voir ce qui a changé, puis adapter la version FR.
4. Pour les **fichiers supprimés upstream** : décide cas par cas.

Le `test-fr.yml` continue de tourner en parallèle — si un test casse à cause d'un changement upstream, tu reçois un email automatique de GitHub.
