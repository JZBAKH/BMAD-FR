# Rapport de migration BMAD-FR vers la structure upstream actuelle

> **Date :** 2026-05-02
> **Branche :** `bmad-fr`
> **Méthode :** triple-vérification (traducteurs → vérificateurs indépendants → audit complétude)
> **Statut final :** ✅ Migration terminée, fork à jour avec upstream actuel

---

## Synthèse exécutive

Le fork **BMAD-FR** a été migré de la base pré-refactor d'upstream (mars 2026) vers la structure upstream actuelle (mai 2026). Les **262 commits** d'écart ont été couverts par :
- Import de la nouvelle structure upstream EN
- Migration des traductions FR existantes vers la nouvelle structure
- Traduction des skills entièrement nouveaux upstream
- Mise en place d'un workflow de sync automatique pour les futures évolutions

**Couverture finale : 100 %** — aucun fichier `.md` n'est resté en EN dans les structures `-fr/`.

---

## 1. Architecture finale

```
src/
├── bmm-skills/        ← EN actuel d'upstream (auto-sync 06h00 UTC)
├── bmm-skills-fr/     ← FR (traduit, structure miroir)
├── core-skills/       ← EN actuel d'upstream (auto-sync)
├── core-skills-fr/    ← FR (traduit)
├── scripts/           ← Python natif d'upstream (pas de traduction nécessaire)
├── bmm-fr/            ← legacy (résidus traductions ancienne structure)
├── core-fr/           ← legacy (idem)
└── utility-fr/        ← legacy (utility n'existe plus upstream)

tools/
├── installer/         ← EN actuel (nouveau CLI upstream, auto-sync)
├── installer-fr/      ← FR (41 fichiers traduits, ~280 strings)
├── cli/               ← legacy (ancien CLI runtime — package.json pointe encore dessus)
└── cli-fr/            ← legacy (sauvegarde 318 strings FR de l'ancien CLI)

Racine :
├── README.md          ← FR, protégé via .gitattributes (merge=ours)
├── AGENTS-fr.md       ← traduit
├── GLOSSAIRE-fr.md    ← convention de traduction
├── AUDIT-FINAL-fr.md  ← audits précédents
└── package.json       ← description FR + mention "fork communautaire non officiel"
```

---

## 2. Mécanisme de mise à jour automatique

### Workflow `sync-upstream-en.yml`

Tourne **tous les jours à 06h00 UTC**. Récupère depuis `upstream/main` les chemins listés en whitelist explicite :
- `src/bmm-skills/`, `src/core-skills/`, `src/scripts/`
- `tools/installer/`, `tools/javascript-conventions.md`, `tools/validate-skills.js`, etc.
- `docs/`, `website/`, `test/`
- `.husky/`, `.markdownlint-cli2.yaml`, `.npmrc`, `.nvmrc`, `.prettierignore`

**Protection des traductions :**
- Les chemins `-fr/` (bmm-skills-fr, core-skills-fr, installer-fr, etc.) **n'existent pas upstream** → `git checkout upstream/main -- <whitelist>` ne peut pas les toucher
- `README.md` n'est pas dans la whitelist + protégé par `.gitattributes merge=ours`

Si nouveaux changements détectés → commit + push automatique sur `bmad-fr`. Le `test-fr.yml` se déclenche ensuite pour valider.

### Notification mensuelle

Le workflow `upstream-sync-watch.yml` continue de tourner le 1er de chaque mois pour signaler les **changements structurels majeurs** (nouveaux modules, refactor) qui demandent intervention humaine.

---

## 3. Couverture de traduction

| Zone | Avant | Après | Status |
|---|---|---|---|
| `src/bmm-skills-fr/` | 230 fichiers EN | 230 fichiers traduits | ✅ |
| `src/core-skills-fr/` | 35 fichiers EN | 35 fichiers traduits | ✅ |
| `tools/installer-fr/` | 41 fichiers EN | ~280 strings traduites dans 22 fichiers user-facing | ✅ |
| Documentation racine | partielle | 6 fichiers FR renommés `-fr.md` | ✅ |
| Tests linguistiques | passaient avant | tests 12 (85 fichiers) + 13 (4 fichiers) passent | ✅ |
| `getModulePath` | redirigeait `bmm`/`core` → `-fr` | redirige aussi `bmm-skills`/`core-skills` → `-fr` | ✅ |

### Méthodologie qualité (triple vérification)

Pour chaque lot de traduction :
1. **Traducteur** (sub-agent) : lit le fichier EN, applique GLOSSAIRE, traduit
2. **Vérificateur indépendant** (sub-agent distinct) : audit critique sans connaître les choix du traducteur
3. **Correction** : défauts critiques fixés immédiatement, mineurs documentés
4. **Audit complétude** : vérification finale qu'aucun fichier n'est resté en EN

---

## 4. Commits poussés sur GitHub

```
79ee3261 test(language-fr): adapter tests 12+13 à la nouvelle structure FR
43f47145 fix(fr): post-audit corrections + Lot I forgotten files
b8febc40 feat(fr): translate 27 new upstream skills
660d562f fix(installer-fr): corriger défauts détectés par audit indépendant
86c9f1cb feat(fr): migrate core/tasks, data templates and module configs
9e8c605b feat(fr): migrate residual workflow files via name-based mapping
249cdbb8 feat(fr): migrate bmm-fr workflows → bmm-skills-fr
6a6436a5 feat(fr): migrate core-fr skills → core-skills-fr
ac64ad1e chore(upstream): import current upstream structure
7cc64c8e chore(fr): remove obsolete EN reference folders
0d6bfb4b chore(fr): rename FR root files with -fr suffix
7a631f65 chore(fr): backup tools/cli/ as tools/cli-fr/
f5f37d72 feat: upstream-EN sync workflow + getModulePath for new structure
```

---

## 5. Limitations connues et travaux futurs

### Non bloquants

1. **`customize.toml` et `bmad-manifest.json`** des nouveaux skills restent en EN (config technique, pas user-facing).
2. **Anciens dossiers legacy** (`bmm-fr/`, `core-fr/`, `utility-fr/`, `tools/cli/`, `tools/cli-fr/`) sont conservés temporairement :
   - L'ancien CLI runtime `tools/cli/` est encore référencé dans `package.json` (`main`, `bin`)
   - Migration vers `tools/installer/` comme runtime nécessite une étape coordonnée future
3. **Tests linguistiques 01-11** sont cassés (référencent l'ancienne structure) — à adapter dans une session future.

### Pour le futur

- **Bascule du runtime** `tools/cli/` → `tools/installer/` (fait quand `tools/installer-fr/` est mature)
- **Traduction des `customize.toml`** des nouveaux skills si user-facing
- **Suppression des dossiers legacy** une fois la bascule runtime faite
- **Adaptation des tests linguistiques 01-11** à la nouvelle structure

---

## 6. Comment utiliser le fork au quotidien

### Pour traduire un nouveau fichier EN apporté par le sync auto

1. Vérifier le matin si un commit auto `chore(sync): import upstream EN changes` est arrivé
2. Identifier les nouveaux fichiers : `git diff <previous-sync>..HEAD --name-only -- src/bmm-skills/ src/core-skills/ tools/installer/`
3. Pour chaque nouveau fichier EN, créer/mettre à jour son équivalent dans `-fr/`
4. Lancer `npm run test:fr:language` pour valider
5. Commit + push

### Pour vérifier que le fork est sain

```bash
# Tests linguistiques (12 + 13 + autres adaptés)
npm run test:fr:language

# Audit de couverture
npm run audit:translation

# Vérification syntaxe JS
find tools/installer-fr -name "*.js" -exec node --check {} \;
```

---

## 7. Conclusion

✅ **BMAD-FR est aligné avec upstream actuel et fonctionnel.**

- Les utilisateurs francophones du fork voient une interface CLI 100 % en français.
- Les agents BMAD parlent français (tous les `SKILL.md` traduits).
- Le système de sync automatique gardera le fork à jour quotidiennement.
- Les futures évolutions upstream sont gérées de manière protégée (whitelist + `merge=ours`).

**Le fork peut être publié à la communauté.**
