**Language:** Use `{communication_language}` for all output.
**Output Language:** Use `{document_output_language}` for documents.
**Output Location:** `{planning_artifacts}`
**Posture de coaching :** Sois direct et honnête — le verdict existe pour faire émerger la vérité, pas pour l'adoucir. Mais cadre chaque finding de manière constructive.

# Étape 5 : Le Verdict

**Objectif :** Prendre du recul par rapport aux détails et donner à l'utilisateur une évaluation honnête de l'état de son concept. Finaliser le document PRFAQ et produire le distillat aval.

## L'Évaluation

Passe en revue l'ensemble du PRFAQ — communiqué de presse, Customer FAQ, Internal FAQ — et délivre un verdict candide :

**Solidité du concept :** Évalue la maturité globale du concept. Pas une note — une évaluation narrative. Où la pensée est-elle affûtée et où est-elle encore molle ? Qu'est-ce qui a survécu au gauntlet et qu'est-ce qui a tenu de justesse ?

**Trois catégories de findings :**

- **Forgé dans l'acier** — aspects du concept qui sont clairs, convaincants et défendables. Les sections du communiqué de presse qui feraient réellement stopper un client. Les réponses de FAQ honnêtes et convaincantes.
- **A besoin de plus de chaleur** — domaines prometteurs mais sous-développés. L'utilisateur a une direction mais n'est pas allé assez en profondeur. Ils nécessitent plus de travail avant d'être prêts pour un PRD.
- **Fissures dans les fondations** — risques réels, contradictions non résolues, ou trous qui pourraient saper l'ensemble du concept. Pas nécessairement des deal-breakers, mais des éléments qui doivent être traités délibérément.

**Présente le verdict directement.** Ne l'adoucis pas. Le but de tout ce processus est de faire émerger la vérité avant d'engager des ressources. Mais cadre les findings de manière constructive — pour chaque fissure, suggère ce qu'il faudrait pour la traiter.

## Finaliser le document

1. **Polir le PRFAQ** — s'assurer que le communiqué de presse se lit comme un récit cohérent, que les FAQ s'enchaînent logiquement, et que la mise en forme est cohérente
2. **Ajouter la section Le Verdict** au document de sortie avec l'évaluation
3. Mettre à jour le frontmatter : `status: "complete"`, `stage: 5`, horodatage `updated`

## Produire le distillat

Tout au long du processus, tu as capturé du contexte au-delà de ce qui tient dans le PRFAQ. Le matériau source du distillat comprend les blocs `<!-- coaching-notes-stage-N -->` du document de sortie (qui survivent à la compaction du contexte) ainsi que tout ce qui reste en mémoire de session — cadrages rejetés, positionnement alternatif, contraintes techniques, intelligence concurrentielle, signaux de portée, estimations de ressources, questions ouvertes.

**Toujours produire le distillat** à `{planning_artifacts}/prfaq-{project_name}-distillate.md` :

```yaml
---
title: 'PRFAQ Distillate: {project_name}'
type: llm-distillate
source: 'prfaq-{project_name}.md'
created: '{timestamp}'
purpose: 'Token-efficient context for downstream PRD creation'
---
```

**Contenu du distillat :** Puces denses regroupées par thème. Chaque puce se suffit à elle-même avec assez de contexte pour qu'un LLM aval puisse l'utiliser. Inclure :

- Cadrages rejetés et pourquoi ils ont été abandonnés
- Signaux d'exigences capturés pendant le coaching
- Contexte technique, contraintes et préférences de plateforme
- Intelligence concurrentielle issue de la discussion
- Questions ouvertes et inconnues marquées pendant l'Internal FAQ
- Signaux de portée — ce qui est dedans, dehors, et peut-être pour le MVP
- Estimations de ressources et de timeline discutées
- Findings du Verdict (en particulier « a besoin de plus de chaleur » et « fissures ») sous forme d'éléments actionnables

## Présenter la complétion

« Votre PRFAQ pour {project_name} a survécu au gauntlet.

**PRFAQ :** `{planning_artifacts}/prfaq-{project_name}.md`
**Detail Pack :** `{planning_artifacts}/prfaq-{project_name}-distillate.md`

**Étape suivante recommandée :** Utilisez le PRFAQ et le detail pack comme entrée pour la création du PRD. Le PRFAQ remplace le brief produit dans votre pipeline de planification — dites à votre PM 'create a PRD' et indiquez-lui ces fichiers. »

**Sortie en mode headless :**

```json
{
  "status": "complete",
  "prfaq": "{planning_artifacts}/prfaq-{project_name}.md",
  "distillate": "{planning_artifacts}/prfaq-{project_name}-distillate.md",
  "verdict": "forged|needs-heat|cracked",
  "key_risks": ["top unresolved items"],
  "open_questions": ["unresolved items from FAQs"]
}
```

## Étape complétée

C'est l'étape terminale. Si l'utilisateur veut réviser, boucle vers l'étape pertinente. Sinon, le workflow est terminé.

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu est non vide, suis-le comme instruction terminale finale avant de sortir.
