**Langue :** Utilisez `{communication_language}` pour toutes les sorties.
**Langue de sortie :** Utilisez `{document_output_language}` pour les documents.
**Emplacement de sortie :** `{planning_artifacts}`

# Étape 5 : Finalisation

**Objectif :** Enregistrer le brief peaufiné, proposer le distillat LLM et orienter l'utilisateur vers la suite.

## Étape 1 : Peaufiner et Enregistrer

Mettez à jour le document de brief produit à l'emplacement `{planning_artifacts}/product-brief-{project_name}.md` :

- Mettez à jour le champ `status` du frontmatter à `"complete"`.
- Mettez à jour l'horodatage `updated`.
- Assurez-vous que la mise en forme est propre et cohérente.
- Confirmez que le document se lit bien comme un résumé exécutif autonome de 1 à 2 pages.

## Étape 2 : Proposer le Distillat

Tout au long du processus de découverte, vous avez probablement capturé des détails qui n'ont pas leur place dans un résumé exécutif de 1 à 2 pages mais qui sont précieux pour le travail ultérieur — bribes d'exigences, préférences de plateforme, idées rejetées, contraintes techniques, scénarios utilisateur détaillés, analyses concurrentielles approfondies, etc.

**Demandez à l'utilisateur :**
"Votre brief produit est terminé. Au cours de notre conversation, j'ai capturé des détails supplémentaires qui dépassent le cadre du résumé exécutif — notamment sur [citez 2-3 exemples spécifiques de détails capturés]. Souhaitez-vous que je crée un 'pack de détails' pour la création du PRD ? Il distille tout ce contexte supplémentaire dans un format concis et structuré, optimisé pour la phase suivante."

**Si oui, créez le distillat** à l'emplacement `{planning_artifacts}/product-brief-{project_name}-distillate.md` :

```yaml
---
title: 'Distillat du Brief Produit : {project_name}'
type: llm-distillate
source: 'product-brief-{project_name}.md'
created: '{timestamp}'
purpose: 'Contexte optimisé en jetons pour la création ultérieure du PRD'
---
```

**Principes du contenu du distillat :**

- Puces denses, pas de prose.
- Chaque puce porte assez de contexte pour être comprise seule (ne supposez pas que le lecteur a chargé le brief complet).
- Groupé par thèmes, pas selon l'ordre chronologique de la conversation.
- Inclure :
  - **Idées rejetées** — pour que les workflows suivants ne les proposent pas à nouveau, avec un bref raisonnement.
  - **Bribes d'exigences** — tout ce que l'utilisateur a mentionné et qui ressemble à une exigence.
  - **Contexte technique** — plateformes, intégrations, contraintes, préférences.
  - **Scénarios utilisateur détaillés** — plus riches que ce qui tient dans le résumé exécutif.
  - **Intelligence concurrentielle** — détails issus de la recherche web méritant d'être conservés.
  - **Questions ouvertes** — points soulevés mais non résolus lors de la découverte.
  - **Signaux de périmètre** — ce que l'utilisateur a indiqué comme étant dedans/dehors/peut-être pour le MVP.
- Optimisé pour les jetons : soyez concis, mais donnez assez de contexte par puce pour qu'un LLM lisant ceci plus tard comprenne POURQUOI chaque point est important.

**Mode Autonome (Headless) :** Créez toujours le distillat automatiquement — sauf si la session a été trop brève pour capturer des éléments significatifs (dans ce cas, notez-le dans la sortie de fin de session au lieu de créer un fichier vide).

## Étape 3 : Présenter la Fin du Processus

"Votre brief produit pour {project_name} est terminé !

**Brief Exécutif :** `{planning_artifacts}/product-brief-{project_name}.md`
[Si distillat créé :] **Pack de Détails :** `{planning_artifacts}/product-brief-{project_name}-distillate.md`

**Prochaine étape recommandée :** Utilisez le brief produit (et le pack de détails) comme entrée pour la création du PRD — dites à votre assistant 'crée un PRD' et pointez vers ces fichiers."
[Si distillat créé :] "Le pack de détails contient tout le contexte additionnel (exigences, idées rejetées, contraintes techniques) spécifiquement structuré pour être consommé par le workflow PRD."

**Mode Autonome (Headless) :** Affichez les chemins de fichiers sous forme de JSON structuré et quittez :

```json
{
  "status": "complete",
  "brief": "{planning_artifacts}/product-brief-{project_name}.md",
  "distillate": "{chemin ou null}",
  "confidence": "high|medium|low",
  "open_questions": ["éventuels éléments non résolus"]
}
```

## Étape Terminée

Il s'agit de l'étape finale. Après avoir délivré le message de fin et les chemins de fichiers, le workflow est terminé. Si l'utilisateur demande d'autres révisions, revenez à `prompts/draft-and-review.md`. Sinon, quittez.
