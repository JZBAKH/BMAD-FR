**Langage :** Utilisez `{communication_language}` pour toute la sortie.
**Langage de sortie :** Utilisez `{document_output_language}` pour les documents.
**Emplacement de sortie :** `{planning_artifacts}`
**Chemins :** Les chemins sans préfixe (par ex. `prompts/foo.md`) se résolvent depuis la racine du skill.

# Étape 5 : Finaliser

**Objectif :** Sauvegarder le brief poli, proposer le distillat LLM et orienter l'utilisateur vers la suite.

## Étape 1 : Polir et sauvegarder

Mettre à jour le document du product brief à `{planning_artifacts}/product-brief-{project_name}.md` :
- Mettre à jour le `status` du frontmatter à `"complete"`
- Mettre à jour le timestamp `updated`
- S'assurer que la mise en forme est propre et cohérente
- Confirmer que le document se lit bien comme un résumé exécutif autonome de 1 à 2 pages

## Étape 2 : Proposer le distillat

Tout au long du processus de découverte, vous avez probablement capturé des détails qui n'ont pas leur place dans un résumé exécutif de 1 à 2 pages mais qui sont précieux pour le travail en aval — indices d'exigences, préférences de plateforme, idées rejetées, contraintes techniques, scénarios utilisateurs détaillés, deep-dives concurrentiels, etc.

**Demander à l'utilisateur :**
"Votre product brief est complet. Au cours de notre conversation, j'ai capturé des détails supplémentaires qui dépassent le résumé exécutif — des choses comme [mentionner 2-3 exemples spécifiques de débordement capturé]. Souhaitez-vous que je crée un detail pack pour la création du PRD ? Il distille tout ce contexte supplémentaire dans un format concis et structuré, optimisé pour la phase suivante."

**Si oui, créer le distillat** à `{planning_artifacts}/product-brief-{project_name}-distillate.md` :

```yaml
---
title: "Distillat du Product Brief : {project_name}"
type: llm-distillate
source: "product-brief-{project_name}.md"
created: "{timestamp}"
purpose: "Contexte économe en tokens pour la création du PRD en aval"
---
```

**Principes du contenu du distillat :**
- Puces denses, pas de prose
- Chaque puce porte assez de contexte pour être comprise de manière autonome (ne supposez pas que le lecteur a le brief complet chargé)
- Grouper par thème, pas par ordre de mention
- Inclure :
  - **Idées rejetées** — pour que les workflows en aval ne les reproposent pas, avec une brève justification
  - **Indices d'exigences** — tout ce que l'utilisateur a mentionné qui ressemble à une exigence
  - **Contexte technique** — plateformes, intégrations, contraintes, préférences
  - **Scénarios utilisateurs détaillés** — plus riches que ce qui tient dans le résumé exécutif
  - **Intelligence concurrentielle** — éléments précis issus de la recherche web qui valent la peine d'être conservés
  - **Questions ouvertes** — éléments soulevés mais non résolus pendant la découverte
  - **Signaux de portée** — ce que l'utilisateur a indiqué comme étant dans/hors/peut-être pour le MVP
- Économe en tokens : être concis, mais donner suffisamment de contexte par puce pour qu'un LLM lisant ceci plus tard comprenne POURQUOI chaque point importe

**Mode headless :** Toujours créer le distillat automatiquement — sauf si la session était trop brève pour capturer un débordement significatif (dans ce cas, le noter dans la sortie de complétion plutôt que de créer un fichier vide).

## Étape 3 : Présenter la complétion

"Votre product brief pour {project_name} est complet !

**Brief exécutif :** `{planning_artifacts}/product-brief-{project_name}.md`
[Si distillat créé :] **Detail Pack :** `{planning_artifacts}/product-brief-{project_name}-distillate.md`

**Prochaine étape recommandée :** Utilisez le product brief (et le detail pack) comme entrée pour la création du PRD — dites à votre assistant 'create a PRD' et pointez-le vers ces fichiers."
[Si distillat créé :] "Le detail pack contient tout le contexte de débordement (indices d'exigences, idées rejetées, contraintes techniques) spécifiquement structuré pour que le workflow PRD le consomme."

**Mode headless :** Renvoyer les chemins de fichiers en JSON structuré et quitter :
```json
{
  "status": "complete",
  "brief": "{planning_artifacts}/product-brief-{project_name}.md",
  "distillate": "{path or null}",
  "confidence": "high|medium|low",
  "open_questions": ["any unresolved items"]
}
```

## Étape terminée

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu n'est pas vide, suivez-le comme instruction terminale finale avant de quitter. Après avoir délivré le message de complétion et les chemins de fichiers, le workflow est terminé. Si l'utilisateur demande d'autres révisions, retournez à `prompts/draft-and-review.md`. Sinon, quittez.
