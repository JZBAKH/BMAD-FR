# 🤖 Protocole de session pour assistant IA — BMAD-FR

> **Lecture obligatoire** à chaque début de session de travail sur ce fork.
> Ce protocole garantit qu'on travaille toujours sur des bases à jour
> (max 12h de décalage avec upstream) sans rien casser.

---

## 📋 Phase 1 — État des lieux (toujours faire d'abord)

Exécuter dans l'ordre :

```bash
cd "$HOME/Documents/Projet/BMAD/BMAD-FR"   # adapter au chemin du repo
git checkout bmad-fr                        # toujours sur la branche de travail
git pull origin bmad-fr                     # récupérer les commits récents (rapport auto, etc.)
```

Puis **lire le fichier `UPSTREAM-CHANGES-fr.md`** à la racine. Ce fichier est régénéré automatiquement 2× par jour (07h et 19h UTC, après chaque sync-main).

Extraire :
- **Score de fraîcheur** (en haut)
- Nombre de fichiers dans chaque catégorie : 🆕 nouveaux, 🔄 obsolètes, 🗑️ supprimés upstream

---

## 🚦 Phase 2 — Décision selon la fraîcheur

| Fraîcheur | Décision | Action |
|---|---|---|
| **100%** | Synchronisé | Continuer le travail normal sans inquiétude |
| **95-99%** | Acceptable | Mentionner au user les éléments dérivés, mais ne pas bloquer son travail |
| **80-94%** | Dérive modérée | **Proposer au user une session de mise à jour** avant de continuer son travail |
| **< 80%** | Dérive forte | **Recommander fortement la mise à jour** — risque de casse |

---

## 🔄 Phase 3 — Session de mise à jour (si fraîcheur < 95% et user d'accord)

Procédure stricte, dans l'ordre :

### 3.1 — Priorisation des actions

Traiter dans cet ordre :
1. **🆕 Nouveaux fichiers upstream** — importer + traduire (impact utilisateur le plus élevé)
2. **🔄 Traductions FR potentiellement obsolètes** — réaligner sur la nouvelle version EN
3. **🗑️ Fichiers supprimés upstream** — décider cas par cas (supprimer si refactor confirmé)

### 3.2 — Pour CHAQUE fichier à traiter

```bash
# Pour un nouveau fichier upstream → import + traduction
cp src/<module>/<path-en> src/<module>-fr/<path-en>
# Puis traduire avec sub-agent

# Pour une traduction obsolète → restauration EN puis re-traduction
cp src/<module>/<path-en> src/<module>-fr/<path-en>
# Puis traduire avec sub-agent

# Pour un fichier supprimé upstream → vérifier qu'il n'est plus référencé puis
git rm src/<module>-fr/<path-en>
```

### 3.3 — Triple vérification (obligatoire pour traductions)

Pour chaque lot traduit par sub-agent traducteur :
1. **Traducteur** (sub-agent 1) : lit l'EN, applique GLOSSAIRE-fr.md, traduit
2. **Vérificateur** (sub-agent 2, indépendant) : audit critique
3. **Corrections** : appliquer les défauts critiques détectés

### 3.4 — Tests bloquants

Après chaque vague de modifications, lancer **dans l'ordre** :

```bash
node test/language-fr/run-all.js     # doit afficher : 0 échec
node test/functional-fr/run-all.js   # doit afficher : 0 échec
```

Si échec → **NE PAS COMMITER**. Corriger d'abord.

### 3.5 — Commit + push

Format obligatoire (Conventional Commits) :

```
git add -A
git commit -m "feat(fr): <résumé court>

<description détaillée>

Tests : <fonctionnels>/156 + <linguistiques>/964 ✅

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin bmad-fr
```

---

## 📐 Règles strictes de traduction (rappel)

Référence canonique : **`GLOSSAIRE-fr.md`** à la racine.

### À NE JAMAIS traduire

- Variables `${...}`, `{var}`, `{{var}}` (notamment `{project-root}`, `{skill-root}`, `{user_name}`, `{communication_language}`)
- Identifiants : `BMAD`, `BMad`, `Skill`, `Module`, `Workflow`, `Agent`, `Sidecar`
- Codes triggers : BP, RS, CB, CP, VP, EP, CE, IR, etc.
- Valeurs YAML : `true`, `false`, sentinelles `'unknown'`, `'built-in'`, etc.
- Noms d'agents : Mary, Winston, John, Bob, Sally, Paige, Barry, Carson, Dr. Quinn, etc.
- **Exception unique : Amélie** (francisée pour `Amelia` — agent `dev`)

### À PRÉSERVER

- Frontmatter YAML : keys EN, values FR
- Blocs de code : `​```...```` → intacts
- Liens markdown : `[texte](url)` → texte traduit, URL inchangée
- Balises XML : texte intérieur traduit, balises pas

### Style FR

- Ponctuation française : espace insécable avant `:`, `;`, `?`, `!`
- Accents corrects, pluriels accordés
- **Compteurs préservés** : nombre d'items dans chaque liste = identique à EN

---

## 🏗️ Architecture du fork (rappel)

```
src/
├── bmm-skills/      ← EN upstream (figé jusqu'à la prochaine sync depuis main)
├── bmm-skills-fr/   ← FR traduit (notre travail)
├── core-skills/     ← EN
├── core-skills-fr/  ← FR
├── scripts/         ← Python natif (pas de traduction nécessaire)
└── (anciens dossiers legacy bmm-fr/, core-fr/, utility-fr/ — réservés au fallback CLI ancien)

tools/
├── installer/       ← Nouveau CLI EN (depuis upstream)
├── installer-fr/    ← Nouveau CLI FR (runtime actif via package.json main)
├── cli/             ← Ancien CLI legacy (fallback)
└── cli-fr/          ← Ancien CLI FR (sauvegarde)
```

### Branches Git

- `bmad-fr` : **branche de travail principale** (FR). Toujours travailler ici.
- `main` : **miroir d'upstream** (force-pushed 2× par jour via `sync-main.yml`). NE PAS y travailler.

### Workflows GitHub Actions actifs

| Workflow | Fréquence | Rôle |
|---|---|---|
| `sync-main.yml` | 06h00 + 18h00 UTC | Miroir upstream → main |
| `upstream-changes-report.yml` | 07h00 + 19h00 UTC | Rapport cumulatif `UPSTREAM-CHANGES-fr.md` |
| `test-fr.yml` | Sur chaque push | Tests linguistiques + fonctionnels CI |
| `upstream-sync-watch.yml` | 1er du mois 07h UTC | Notification mensuelle gros changements |

---

## 🚀 Routine standard de session

1. **Phase 1** : pull + lire `UPSTREAM-CHANGES-fr.md`
2. **Annoncer au user** : "Fraîcheur actuelle : X%. Décalage : N fichiers à traiter."
3. **Demander** : "On part en mise à jour avant de continuer, ou tu préfères avancer sur ton projet en l'état ?"
4. Procéder selon sa décision

---

## 💡 Bon à savoir

- **Le user travaille sur Windows** (Git Bash ou PowerShell). Adapter les commandes si nécessaire.
- **Installation globale chez le user** : `C:\Users\ARN-VM\bmad-fr-global` + `~/.claude/skills` (symlink ou copie).
- **Pour propager des nouvelles trads vers son install** : il doit faire `quick-update` puis re-copier vers `~/.claude/skills`.
- **Workflow `sync-upstream-en.yml.disabled`** : désactivé par décision projet (push auto sur bmad-fr non souhaité). Ne PAS le réactiver.
- **Tests cassés en CI** = signal d'alerte. Toujours diagnostiquer avant de continuer.
