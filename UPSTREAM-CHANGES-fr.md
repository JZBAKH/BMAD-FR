# 🔄 Rapport hebdomadaire — Changements upstream à traiter

_Rapport généré le 2026-05-11 par `.github/workflows/upstream-changes-report.yml`._

## 📊 Vue d'ensemble

- **upstream/main** : `b5b33c08`
- **bmad-fr** : `d7d057c7`
- **Fraîcheur de la traduction** : 100.0% (302/302 fichiers à jour)

| Catégorie | Nombre |
|---|---|
| 🆕 Nouveaux fichiers upstream à importer/traduire | **0** |
| 🔄 Traductions FR potentiellement obsolètes | **0** |
| 🗑️ Fichiers supprimés upstream (orphelins côté fork) | **10** |
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

---

### 💡 Comment utiliser ce rapport

1. Lire la **fraîcheur** en haut — si > 95%, rien d'urgent.
2. Pour les **nouveaux fichiers** : le sync auto les importera dans `bmm-skills/`. Toi tu les traduis vers `bmm-skills-fr/`.
3. Pour les **traductions obsolètes** : compare avec `git diff upstream/main..bmad-fr -- <chemin EN>` pour voir ce qui a changé, puis adapter la version FR.
4. Pour les **fichiers supprimés upstream** : décide cas par cas.

Le `test-fr.yml` continue de tourner en parallèle — si un test casse à cause d'un changement upstream, tu reçois un email automatique de GitHub.
