# BMAD-METHOD (Fork francophone)

Framework open source pour la livraison logicielle structurée et assistée par Agents. Ce dépôt est un **fork communautaire francophone non officiel** de [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) — l'intégralité du contenu utilisateur (prompts, workflows, agents, skills, CLI) est traduite en français.

## Règles

- Utilisez les Conventional Commits pour chaque commit.
- Avant de pousser, exécutez `npm ci && npm run quality` sur `HEAD` dans la copie de travail exacte que vous vous apprêtez à pousser.
  `quality` reproduit les vérifications de `.github/workflows/quality.yaml`.
- Les chaînes destinées à l'utilisateur (CLI, agents, workflows) doivent être rédigées en français. Les identifiants techniques préservés (`BMAD`, `Skill`, `Module`, `Workflow`, `Agent`, `Sidecar`, etc.) suivent les règles définies dans [`GLOSSAIRE.md`](./GLOSSAIRE.md).
- Avant tout commit touchant à la traduction, exécutez `npm run test:fr` pour valider l'intégrité linguistique et fonctionnelle du fork.
