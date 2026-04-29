# Audit final BMAD-FR — Vérification manuelle exhaustive

> **Date :** 2026-04-29
> **Méthode :** lectures directes par Claude Opus 4.7 (1M context), pas de sub-agents.
> **Pourquoi ce document existe :** les audits précédents (sub-agent Explore, script heuristique) ont produit des résultats divergents. Ce document est la vérité de terrain, vérifiée fichier par fichier sur chaque cas litigieux.

---

## TL;DR

- **Vous n'avez en réalité que 3 fichiers à traduire dans `bmm-fr/`**, pas 8 ni 9.
- **`core-fr/` est non traduit (64 fichiers)**, mais 62 d'entre eux peuvent être **copiés** depuis `bmm-fr/core/` (qui est traduit) — pas retraduits — car les originaux upstream sont identiques.
- **Le framework fonctionnera correctement en français** : il y a une redirection automatique dans [tools/cli/lib/project-root.js:65](tools/cli/lib/project-root.js:65) qui fait pointer tout accès à `bmm`/`core` vers `bmm-fr`/`core-fr` à l'installation.
- **Les chemins dans les fichiers traduits sont corrects** (ils utilisent `_bmad/bmm/...` qui est la destination post-installation, peu importe que la source soit `bmm` ou `bmm-fr`).
- **`SKILL.md` est à traduire** (description du skill, lue par les LLMs). **`bmad-skill-manifest.yaml` n'est PAS à traduire** (juste un manifest technique : `type: skill` ou `{}`). Vous aviez raison de le souligner.

---

## 1. Clarification SKILL.md vs bmad-skill-manifest.yaml

| Fichier | Contenu | À traduire ? |
|---|---|---|
| `SKILL.md` | Frontmatter `name:` + `description:` + corps (1 à plusieurs lignes) | ✅ **OUI** — la `description:` est lue par les LLMs pour décider quand activer le skill |
| `bmad-skill-manifest.yaml` | Une ou deux lignes max (`type: skill` ou `{}`) | ❌ **NON** — purement technique, pas de texte humain |

Exemples vérifiés directement :
- [src/bmm-fr/workflows/2-plan-workflows/bmad-edit-prd/SKILL.md](src/bmm-fr/workflows/2-plan-workflows/bmad-edit-prd/SKILL.md) → "Modifier un PRD existant. À utiliser lorsque l'utilisateur dit..." (TRADUIT ✅)
- [src/bmm-fr/workflows/2-plan-workflows/bmad-edit-prd/bmad-skill-manifest.yaml](src/bmm-fr/workflows/2-plan-workflows/bmad-edit-prd/bmad-skill-manifest.yaml) → `{}` (vide, OK)

Le script d'audit `audit-translation-coverage.mjs` produit des **faux positifs** sur les `SKILL.md` qui sont très courts (frontmatter `name:` et `description:` plus 1-2 lignes en français). Le ratio "mots-français / mots-anglais" est faussé par les mots anglais du frontmatter (`name`, `description`).

---

## 2. État réel de `bmm-fr/` (vérifié manuellement)

### 2.1 — Sous-dossiers déjà 100 % traduits (vérifications par lecture directe)

| Dossier | Fichiers | Statut | Échantillon vérifié |
|---|---|---|---|
| `bmm-fr/agents/` | 12 | ✅ 100 % | `analyst.agent.yaml` : "Analyste Métier", "Analyste senior avec une expertise approfondie..." |
| `bmm-fr/core/skills/` | 51 | ✅ ~100 % | `bmad-brainstorming/SKILL.md` : "Facilite les sessions de brainstorming..." `workflow.md` : "# Workflow de Session de Brainstorming" |
| `bmm-fr/core/tasks/` | 22 | ✅ ~100 % | `bmad-create-prd/workflow.md` : "# Workflow Création de PRD" |
| `bmm-fr/workflows/` | 240 | ✅ ~99 % | tous les SKILL.md échantillonnés sont traduits |

### 2.2 — Fichiers signalés "non traduits" par le script : RÉ-AUDIT MANUEL

Sur les 9 fichiers que le script avait listés "non traduits" dans `bmm-fr/workflows/` :

| Fichier | Statut réel après lecture | Action |
|---|---|---|
| `1-analysis/bmad-create-product-brief/product-brief.template.md` | ✅ **TRADUIT** : "Brief Produit", "Le contenu sera ajouté…" | Rien (faux positif) |
| `1-analysis/research/market-steps/step-01-init.md` | ❌ Anglais | **Mort code upstream** — voir §2.3 |
| `1-analysis/research/market-steps/step-02-customer-behavior.md` | ❌ Anglais | Idem |
| `1-analysis/research/market-steps/step-03-customer-pain-points.md` | ❌ Anglais | Idem |
| `1-analysis/research/market-steps/step-04-customer-decisions.md` | ❌ Anglais | Idem |
| `1-analysis/research/market-steps/step-05-competitive-analysis.md` | ❌ Anglais | Idem |
| `2-plan-workflows/bmad-edit-prd/SKILL.md` | ✅ **TRADUIT** : "Modifier un PRD existant…" | Rien (faux positif) |
| `3-solutioning/bmad-check-implementation-readiness/templates/readiness-report-template.md` | ✅ **TRADUIT** : "# Rapport d'évaluation de la préparation à l'implémentation" | Rien (faux positif) |
| `bmad-document-project/documentation-requirements.csv` | ✅ Légitimement en anglais (patterns de fichiers `*.config.js` etc., conformes au GLOSSAIRE) | Rien |

Sur les 5 fichiers signalés ailleurs dans `bmm-fr/` :

| Fichier | Statut réel | Action |
|---|---|---|
| `data/project-context-template.md` | ❌ Anglais ("Project Brainstorming Context Template") | **À traduire** |
| `teams/default-party.csv` | ❌ Anglais (descriptions des 19 agents toutes en anglais) | **À traduire** |
| `teams/team-fullstack.yaml` | ❌ Anglais (`description: Team capable of project analysis...`) | **À traduire** |
| `core/skills/bmad-brainstorming/template.md` | ✅ **TRADUIT** : "# Résultats de la Session de Brainstorming" | Rien (faux positif) |
| `core/tasks/bmad-create-prd/templates/prd-template.md` | ✅ **TRADUIT** : "# Document de Spécifications Produit (PRD)" | Rien (faux positif) |

### 2.3 — Cas particulier `market-steps/`

`src/bmm/workflows/1-analysis/research/` contient deux dossiers parallèles dans l'upstream :
- `bmad-market-research/steps/` — **version active**, référencée dans `module-help.csv`, dans `analyst.agent.yaml`, dans son `SKILL.md`. Vous l'avez **traduite** dans `bmm-fr/`.
- `market-steps/` — **mort code**, auto-référencé seulement (interne entre ses 6 fichiers). **N'est invoqué nulle part dans le reste de la codebase upstream.**

Recommandation : **laisser en anglais**, ne pas perdre de temps. Si upstream supprime ce dossier un jour, vous pourrez le supprimer chez vous aussi.

---

## 3. État réel de `core-fr/` (vérifié manuellement)

### 3.1 — Constat

`src/core-fr/` est **réellement non traduit** (vérifié sur `module.yaml`, `skills/bmad-brainstorming/workflow.md`, `skills/bmad-distillator/SKILL.md` — tous en anglais).

### 3.2 — La bonne nouvelle : 62 des 64 fichiers sont déjà traduits ailleurs

Vérifications croisées :
- `diff -rq src/core/ src/bmm/core/` → **0 différence** dans l'upstream (les deux dossiers sont rigoureusement identiques)
- `bmm-fr/core/skills/bmad-brainstorming/workflow.md` → **traduit en français**
- `core-fr/skills/bmad-brainstorming/workflow.md` → **en anglais (copie de l'upstream)**

Donc vous pouvez **copier** `bmm-fr/core/skills/` → `core-fr/skills/` et `bmm-fr/core/tasks/` → `core-fr/tasks/`. Le résultat sera correct car les originaux upstream sont identiques entre les deux emplacements.

### 3.3 — Les 2 vrais fichiers à traduire dans `core-fr/`

Ce sont les seuls fichiers qui diffèrent légitimement entre `core/` et `bmm/core/` :
- [src/core-fr/module.yaml](src/core-fr/module.yaml) — `code: core`, configuration spécifique au module core (~26 lignes, court)
- [src/core-fr/module-help.csv](src/core-fr/module-help.csv) — la description du module pour le menu d'aide

---

## 4. Fonctionnement du framework — réponse à votre question

### 4.1 — Modification clé déjà faite par vous

Le fichier [tools/cli/lib/project-root.js:62-76](tools/cli/lib/project-root.js:62) contient :

```javascript
function getModulePath(moduleName, ...segments) {
  if (moduleName === 'core' || moduleName === 'bmm') {
    // MODIFICATION FR : Redirection vers les dossiers -fr
    const frenchModule = moduleName + '-fr';
    return path.join(getProjectRoot(), 'src', frenchModule, ...segments);
  }
  ...
}
```

→ Quand n'importe quelle partie du framework demande "où est le module bmm ?", **elle reçoit le chemin de `bmm-fr/`**. Idem pour `core` → `core-fr/`. C'est élégant.

### 4.2 — Schéma du flux d'installation

```
SOURCE CODE (votre repo)         INSTALLED CODE (projet utilisateur)
────────────────────────         ──────────────────────────────────
src/bmm/        (anglais)   ✗    (utilisé seulement pour le scan
                                  initial des modules disponibles)
src/bmm-fr/     (français)  ──►  _bmad/bmm/      (via getModulePath)
src/core/       (anglais)   ✗
src/core-fr/    (français)  ──►  _bmad/core/     (via getModulePath)
```

Le contenu installé chez l'utilisateur final est en français.

### 4.3 — Les chemins dans les fichiers traduits sont corrects

Les fichiers FR contiennent par exemple `id: "_bmad/bmm/agents/analyst.md"`. C'est **correct** :
- `_bmad/bmm/...` est le chemin **post-installation** (où le code se retrouve dans le projet utilisateur final)
- L'installer copie `src/bmm-fr/agents/analyst.agent.yaml` vers `_bmad/bmm/agents/...`
- Donc les références internes restent cohérentes

Aucun chemin `_bmad/bmm-fr/` ne doit apparaître dans les fichiers traduits — j'ai vérifié, il n'y en a pas.

### 4.4 — Limite mineure connue

`tools/cli/installers/lib/modules/manager.js:199` utilise `getSourcePath('bmm')` (qui retourne `src/bmm/`, **non redirigé**) pour scanner la liste des modules disponibles. Conséquence : **le menu "Quel module installer ?" pourrait afficher la description anglaise** issue de `src/bmm/module.yaml`.

**Impact réel** : très faible.
- L'utilisateur voit "BMad Method Agile-AI Driven-Development" (anglais) au moment du choix, puis tout le reste de l'installation et du contenu installé est en français.
- Si vous voulez corriger : remplacer `getSourcePath('bmm')` par `getModulePath('bmm')` à la ligne 199. À tester.

---

## 5. Plan d'action final consolidé

### Étape A — `bmm-fr/` (3 fichiers, ~30 minutes)

Traduire en respectant le [GLOSSAIRE.md](GLOSSAIRE.md) :

1. [src/bmm-fr/data/project-context-template.md](src/bmm-fr/data/project-context-template.md) — 27 lignes
2. [src/bmm-fr/teams/default-party.csv](src/bmm-fr/teams/default-party.csv) — 19 agents (CRUCIAL : garder les `name`, `displayName` en anglais : Mary, Winston, Amelia, John, Bob, Sally, Paige, Barry, Carson, Dr. Quinn, etc.). Seuls `title`, `role`, `identity`, `communicationStyle`, `principles` à traduire.
3. [src/bmm-fr/teams/team-fullstack.yaml](src/bmm-fr/teams/team-fullstack.yaml) — 1 ligne `description:` à traduire

### Étape B — Peupler `core-fr/` par copie depuis `bmm-fr/core/` (~5 minutes)

Script à lancer (vous pouvez le faire à la main aussi) :

```bash
# Copie des skills/ et tasks/ traduits depuis bmm-fr/core/ vers core-fr/
cp -r src/bmm-fr/core/skills/. src/core-fr/skills/
cp -r src/bmm-fr/core/tasks/. src/core-fr/tasks/

# Vérifier
npm run audit:translation
```

### Étape C — Traduire les 2 fichiers spécifiques de `core-fr/` (~10 minutes)

1. [src/core-fr/module.yaml](src/core-fr/module.yaml) — 26 lignes (configuration core)
2. [src/core-fr/module-help.csv](src/core-fr/module-help.csv) — descriptions des skills core

### Étape D — Vérifications finales

- `npm run audit:translation` → core-fr et bmm-fr proches de 100 %
- `grep -r "<<<<<<< HEAD" .` → 0 résultat
- Tester l'installation localement si possible : `npm run bmad:install` dans un dossier de test

### Étape E (plus tard, sans urgence)

- Vérifier la ligne 199 de `tools/cli/installers/lib/modules/manager.js` (cf §4.4) si vous voulez que les menus soient en français
- Importer + traduire `utility-fr/` (2 fichiers seulement)
- Surveiller les issues créées par `.github/workflows/upstream-sync-watch.yml` chaque 1er du mois

---

## 6. Pourquoi le script d'audit s'est trompé sur 6 fichiers

L'heuristique utilisée (densité d'accents + ratio mots-FR/mots-EN) est **fragile sur les fichiers courts** (templates, SKILL.md) où :
- Le frontmatter YAML (`name:`, `description:`, `stepsCompleted:`) introduit des mots anglais "techniques"
- Le contenu utile est de quelques lignes seulement
- Les variables Handlebars (`{{user_name}}`, `{{project_name}}`) ajoutent des tokens neutres

**Améliorations possibles du script** (à faire dans une session future, non bloquant) :
- Ignorer le frontmatter YAML pour le scoring
- Ajouter un seuil de "longueur minimale du contenu hors frontmatter" pour éviter les classifications hâtives
- Comparer le contenu FR avec l'original EN : si les mots significatifs sont identiques (>90 %), c'est probablement non traduit ; sinon c'est probablement traduit

---

## 7. Bilan de couverture après plan d'action

| Module | Avant ce plan | Après plan d'action |
|---|---|---|
| `bmm-fr/` | ~99 % (3 fichiers à traduire) | **100 %** |
| `bmm-fr/core/` (interne à bmm) | ~99 % | **100 %** (déjà via la copie vers core-fr) |
| `core-fr/` (standalone) | 0 % effectif | **~100 %** (62 fichiers copiés + 2 traduits) |
| `utility-fr/` | absent | (étape ultérieure) |
| Modules `bmc`, `cis`, `bmb` | absents upstream sous ces noms | (selon ce que upstream propose vraiment, surveillé par le sync watcher) |

Vous serez à **~100 % de couverture utile** avec environ **45 minutes de travail** + une session Gemini pour traduire les 5 fichiers (3 dans bmm-fr + 2 dans core-fr).
