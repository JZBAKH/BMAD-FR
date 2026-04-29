# Guide de contribution — BMAD-FR (workflow solo)

Ce projet est maintenu par une seule personne, sur plusieurs machines (VMs HyperV). Ce guide documente les règles à respecter pour éviter les divergences Git entre environnements et garder l'historique propre.

## Hygiène Git multi-machine

### Avant de quitter une machine

Toujours valider et pousser, **même si le travail n'est pas terminé** :

```bash
git add -A
git commit -m "wip(<scope>): <ce sur quoi vous étiez en train de travailler>"
git push origin bmad-fr
```

Un commit WIP est toujours préférable à du travail non poussé. On peut toujours `squash` ensuite.

### En arrivant sur une autre machine

Toujours synchroniser **avant** la moindre édition :

```bash
git fetch origin
git pull --rebase origin bmad-fr
```

Le `--rebase` garde l'historique linéaire, pas de merge commit parasite.

### Si un conflit survient malgré tout

Vu que vous êtes seul à push, il y a toujours une version "canonique" — celle de la machine où vous avez le travail le plus récent.

```bash
# Sauvegarde de sécurité
git branch backup-$(date +%Y%m%d) HEAD
git branch backup-origin-$(date +%Y%m%d) origin/bmad-fr

# Annuler le merge si Git en a tenté un
git merge --abort

# Depuis la machine canonique : écraser le distant
git push --force-with-lease origin bmad-fr
```

`--force-with-lease` (et **pas** `--force`) refuse de pousser si le distant a bougé entre-temps : un filet de sécurité.

### Hook pre-push local (optionnel)

Pour empêcher de pousser un merge non terminé, créer `.git/hooks/pre-push` (non versionné) :

```bash
#!/usr/bin/env bash
if grep -rE "^<<<<<<< |^>>>>>>> " --include="*.md" --include="*.yaml" --include="*.csv" --exclude-dir=node_modules . > /dev/null; then
  echo "Marqueurs de conflit détectés. Push refusé."
  exit 1
fi
```

Puis : `chmod +x .git/hooks/pre-push`.

## Convention de messages de commit

Format **[Conventional Commits](https://www.conventionalcommits.org/)** :

```
<type>(<scope>): <description courte impérative>

<corps optionnel : pourquoi, contexte, décisions>
```

**Types** : `feat`, `fix`, `chore`, `docs`, `ci`, `refactor`
**Scopes utiles** : `bmm-fr`, `core-fr`, `utility-fr`, `glossaire`, `audit`, `infra`

Exemples :
- `feat(bmm-fr): translate SKILL.md and workflow.md for bmad-create-product-brief`
- `chore(core-fr): remove duplicate file copied by mistake from upstream`
- `ci(infra): add monthly upstream-sync-watch action`

À éviter : `feat: src bmm`, `update files`, `wip` sans scope.

## Workflow de traduction d'un lot

1. **Identifier le lot** — soit via une issue ouverte par l'action `upstream-sync-watch`, soit en consultant `TRANSLATION-STATUS.md`.
2. **Préparer la sandbox** — copier les fichiers source upstream dans un dossier hors du repo (par exemple `~/translation-sandbox/<lot>/`).
3. **Briefer Gemini** avec deux entrées :
   - [GLOSSAIRE.md](GLOSSAIRE.md) en system prompt (règles strictes : noms d'agents en anglais, codes de menu intacts, balises XML, etc.)
   - Les fichiers source en anglais à traduire
4. **Récupérer la traduction** et placer chaque fichier traduit au chemin `src/<module>-fr/...` correspondant.
5. **Vérifier localement** :
   ```bash
   npm run audit:translation
   grep -rE "^<<<<<<< " . # doit être vide
   ```
6. **Demander une revue finale** (à un assistant IA différent ou à soi-même à tête reposée) pour vérifier la cohérence terminologique, les omissions, le respect du GLOSSAIRE.
7. **Commit** avec un message Conventional Commits précis :
   ```
   feat(<module>-fr): translate <skill or workflow group>
   ```
8. **Push** immédiatement.

## Checklist avant chaque push de traduction

- [ ] Aucun marqueur `<<<<<<<` dans les fichiers
- [ ] `npm run audit:translation` ne signale pas de régression sur les fichiers touchés
- [ ] Les noms d'agents (Mary, Winston, Amelia, John, Bob, Sally, Paige, Barry) sont restés en anglais
- [ ] Les codes de menu (BP, RS, CB, etc.) sont intacts
- [ ] Les balises XML (`<step>`, `<rules>`, etc.) ne sont pas traduites
- [ ] Les variables (`{output_folder}`, `{{module}}`, etc.) sont intactes
- [ ] Les blocs de code (```...```) ne sont pas traduits
- [ ] Le message de commit suit la convention Conventional Commits

## Référence

- [GLOSSAIRE.md](GLOSSAIRE.md) — règles de traduction strictes
- [TRANSLATION-STATUS.md](TRANSLATION-STATUS.md) — tableau de bord auto-généré (`npm run audit:translation`)
- [README.md](README.md) — vue d'ensemble du projet
