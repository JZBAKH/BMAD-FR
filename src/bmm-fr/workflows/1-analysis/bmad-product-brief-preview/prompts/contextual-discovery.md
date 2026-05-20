**Langue :** Utilisez `{communication_language}` pour toutes les sorties.
**Langue de sortie :** Utilisez `{document_output_language}` pour les documents.
**Emplacement de sortie :** `{planning_artifacts}`

# Étape 2 : Découverte Contextuelle

**Objectif :** Armé de l'intention déclarée par l'utilisateur, rassembler et synthétiser intelligemment tout le contexte disponible — documents, connaissances du projet et recherche web — afin que les étapes ultérieures s'appuient sur une base riche et pertinente.

## Lancement des Sous-agents (Fan-Out)

Maintenant que vous savez de quoi traite le brief, lancez des sous-agents en parallèle pour rassembler le contexte. Chaque sous-agent reçoit le résumé de l'intention du produit afin de savoir ce qui est pertinent.

**Lancement en parallèle :**

1. **Analyseur d'Artefacts** (`agents/artifact-analyzer.md`) — Scanne `{planning_artifacts}` et `{project_knowledge}` pour les documents pertinents. Scanne également tous les chemins spécifiques fournis par l'utilisateur. Renvoie une synthèse structurée de ce qu'il a trouvé.

2. **Chercheur Web** (`agents/web-researcher.md`) — Recherche le paysage concurrentiel, le contexte du marché, les tendances et les données sectorielles pertinentes. Renvoie des résultats structurés cadrés sur le domaine du produit.

### Dégradation Nominale (Graceful Degradation)

Si les sous-agents sont indisponibles ou échouent :

- Lisez uniquement les 1 ou 2 documents les plus pertinents dans le contexte principal et résumez (ne lisez pas tout intégralement — limitez l'impact sur le contexte en mode dégradé).
- Effectuez quelques recherches web ciblées en ligne (inline).
- Ne bloquez jamais le workflow parce qu'une fonctionnalité de sous-agent est indisponible.

## Synthèse

Une fois les résultats des sous-agents reçus (ou le scan en ligne terminé) :

1. **Fusionnez les résultats** avec ce que l'utilisateur vous a déjà dit.
2. **Identifiez les lacunes** — que devez-vous encore savoir pour rédiger un brief solide ?
3. **Notez les surprises** — y a-t-il des éléments issus de la recherche qui contredisent ou enrichissent les hypothèses de l'utilisateur ?

## Comportement Spécifique au Mode

**Mode Guidé :**

- Présentez un résumé concis de ce que vous avez trouvé : "Voici ce que j'ai appris de vos documents et de la recherche web..."
- Mettez en évidence tout ce qui est surprenant ou mérite discussion.
- Partagez les lacunes que vous avez identifiées.
- Demandez : "Autre chose que vous aimeriez ajouter, ou devons-nous passer au remplissage des détails ?"
- Orientez vers `prompts/guided-elicitation.md`.

**Mode Yolo :**

- Absorbez tous les résultats silencieusement.
- Passez directement à `prompts/draft-and-review.md` — vous en avez assez pour rédiger.
- L'utilisateur affinera plus tard.

**Mode Autonome (Headless) :**

- Absorbez tous les résultats.
- Passez directement à `prompts/draft-and-review.md`.
- Aucune interaction.

## Étape Terminée

Cette étape est terminée lorsque les résultats des sous-agents (ou la solution de repli par scan en ligne) ont été reçus et que les conclusions sont fusionnées avec le contexte utilisateur. Orientez selon le mode :

- **Guidé** → `prompts/guided-elicitation.md`
- **Yolo / Autonome** → `prompts/draft-and-review.md`
