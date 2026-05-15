# BMAD-METHOD (Fork francophone)

Framework open source pour la livraison logicielle structurée et assistée par Agents. Ce dépôt est un **fork communautaire francophone non officiel** de [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) — l'intégralité du contenu utilisateur (prompts, workflows, agents, skills, CLI) est traduite en français.

## 🤖 Instructions pour les assistants IA (Claude Code, Cursor, etc.)

**Au début de chaque session de travail sur ce repo, LIRE OBLIGATOIREMENT :**

1. **[`SESSION-PROTOCOL-fr.md`](./SESSION-PROTOCOL-fr.md)** — Protocole strict en 3 phases (état des lieux, décision, mise à jour si nécessaire). Définit le déroulé standard à chaque session.
2. **[`UPSTREAM-CHANGES-fr.md`](./UPSTREAM-CHANGES-fr.md)** — Rapport cumulatif du décalage avec upstream, régénéré 2× par jour (07h et 19h UTC, max 12h de retard). Contient la checklist priorisée.
3. **[`GLOSSAIRE-fr.md`](./GLOSSAIRE-fr.md)** — Règles strictes de traduction. À respecter sans exception.

**Routine standard à appliquer en début de session** :

```bash
git checkout bmad-fr
git pull origin bmad-fr
# Puis lire UPSTREAM-CHANGES-fr.md → annoncer au user la fraîcheur actuelle
# et proposer une mise à jour si < 95%.
```

## Règles

- Toujours travailler sur la branche `bmad-fr` (la branche `main` est un miroir d'upstream, force-pushed 2× par jour).
- Utiliser les Conventional Commits pour chaque commit.
- Avant tout commit touchant à la traduction, exécuter `npm run test:fr` pour valider l'intégrité linguistique et fonctionnelle.
- Les chaînes destinées à l'utilisateur (CLI, agents, workflows) doivent être rédigées en français. Les identifiants techniques préservés (`BMAD`, `Skill`, `Module`, `Workflow`, `Agent`, `Sidecar`, etc.) suivent les règles définies dans [`GLOSSAIRE-fr.md`](./GLOSSAIRE-fr.md).
- Avant de pousser, exécuter `npm ci && npm run quality` sur `HEAD` dans la copie de travail exacte qui sera poussée.
