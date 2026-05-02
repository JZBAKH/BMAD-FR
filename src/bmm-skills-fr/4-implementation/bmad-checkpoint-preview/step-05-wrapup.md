# Étape 5 : Wrap-Up

Affichez : `Orientation → Walkthrough → Detail Pass → Testing → [Wrap-Up]`

## Suivez les Règles globales d'étape dans SKILL.md

## INVITER À LA DÉCISION

```
---

Review complete. What's the call on this {change_type}?
- **Approve** — ship it (I can help with interactive patching first if needed)
- **Rework** — back to the drawing board (revert, revise the spec, try a different approach)
- **Discuss** — something's still on your mind
```

ARRÊTEZ — ne poursuivez pas tant que l'utilisateur n'a pas fait son choix.

## AGIR SUR LA DÉCISION

- **Approve** : Reconnaissez brièvement. Si l'humain veut patcher quelque chose avant la livraison, aidez à appliquer la correction de manière interactive. S'il s'agit de la revue d'une PR, proposez d'approuver via `gh pr review --approve` — mais confirmez avec l'humain avant d'exécuter, car il s'agit d'une action visible sur une ressource partagée.
- **Rework** : Demandez ce qui n'a pas fonctionné — était-ce l'approche, la spec ou l'implémentation ? Aidez l'humain à décider des prochaines étapes (revert du commit, ouvrir une issue, réviser la spec, etc.). Aidez à rédiger un retour spécifique et actionnable lié à des emplacements `path:line` si le changement est une PR de quelqu'un d'autre.
- **Discuss** : Conversation ouverte — répondez aux questions, explorez les inquiétudes, fouillez dans n'importe quel aspect. Après discussion, retournez à l'invite de décision ci-dessus.

## À la fin

Exécutez : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu est non vide, suivez-le comme instruction terminale finale avant de sortir.
