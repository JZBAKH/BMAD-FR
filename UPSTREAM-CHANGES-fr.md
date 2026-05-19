# 🔄 Rapport hebdomadaire — Changements upstream à traiter

_Rapport généré le 2026-05-19 par `.github/workflows/upstream-changes-report.yml`._

_Précédent rapport : 2026-05-18_

## 📊 Vue d'ensemble

- **origin/main** : `1da6bf80`
- **bmad-fr** : `1bcd87dd`
- **Fraîcheur de la traduction** : 92.5% (245/265 fichiers à jour)

| Catégorie | Nombre |
|---|---|
| 🆕 Nouveaux fichiers upstream à importer/traduire | **1** |
| 🔄 Traductions FR potentiellement obsolètes | **19** |
| 🗑️ Fichiers supprimés upstream (orphelins côté fork) | **6** |
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
- [ ] `src/bmm-skills/module.yaml` → `src/bmm-skills-fr/module.yaml`
- [ ] `src/core-skills/module.yaml` → `src/core-skills-fr/module.yaml`
- [ ] `tools/installer/core/installer.js` → `tools/installer-fr/core/installer.js`
- [ ] `tools/installer/core/manifest.js` → `tools/installer-fr/core/manifest.js`
- [ ] `tools/installer/ide/_config-driven.js` → `tools/installer-fr/ide/_config-driven.js`
- [ ] `tools/installer/modules/channel-plan.js` → `tools/installer-fr/modules/channel-plan.js`
- [ ] `tools/installer/modules/external-manager.js` → `tools/installer-fr/modules/external-manager.js`
- [ ] `tools/installer/modules/official-modules.js` → `tools/installer-fr/modules/official-modules.js`
- [ ] `tools/installer/prompts.js` → `tools/installer-fr/prompts.js`
- [ ] `tools/installer/ui.js` → `tools/installer-fr/ui.js`

## 🗑️ Fichiers supprimés upstream

Ces fichiers existent dans le fork mais ont été supprimés upstream. À évaluer :
garder (si toujours pertinent) ou supprimer (si obsolète).

- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/references/facilitation-guide.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/references/validation-render.md`
- [ ] `src/bmm-skills/2-plan-workflows/bmad-prd/scripts/render-validation-html.py`
- [ ] `tools/installer/modules/community-manager.js`
- [ ] `tools/installer/modules/registry-client.js`
- [ ] `tools/installer/modules/registry-fallback.yaml`

---

### 💡 Comment utiliser ce rapport

1. Lire la **fraîcheur** en haut — si > 95%, rien d'urgent.
2. Pour les **nouveaux fichiers** : le sync auto les importera dans `bmm-skills/`. Toi tu les traduis vers `bmm-skills-fr/`.
3. Pour les **traductions obsolètes** : compare avec `git diff origin/main..bmad-fr -- <chemin EN>` pour voir ce qui a changé, puis adapter la version FR.
4. Pour les **fichiers supprimés upstream** : décide cas par cas.

Le `test-fr.yml` continue de tourner en parallèle — si un test casse à cause d'un changement upstream, tu reçois un email automatique de GitHub.
