**Langue :** Utilisez `{communication_language}` pour toutes les sorties.
**Langue de sortie :** Utilisez `{document_output_language}` pour les documents.
**Emplacement de sortie :** `{planning_artifacts}`

# Étape 4 : Rédaction & Revue

**Objectif :** Produire le brief produit exécutif et le soumettre à plusieurs prismes de revue pour détecter les angles morts avant que l'utilisateur ne voie la version finale.

## Étape 1 : Rédiger le Brief Exécutif

Utilisez `resources/brief-template.md` comme guide — adaptez la structure pour qu'elle corresponde à l'histoire du produit.

**Principes de rédaction :**

- **Audience exécutive** — persuasif, clair, concis. 1 à 2 pages.
- **Commencez par le problème** — faites ressentir la douleur au lecteur avant de présenter la solution.
- **Concret plutôt qu'abstrait** — exemples spécifiques, scénarios réels, résultats mesurables.
- **Voix assurée** — c'est un pitch, pas une hésitation.
- Écrivez en `{document_output_language}`.

**Créez le document de sortie à :** `{planning_artifacts}/product-brief-{project_name}.md`

Incluez le frontmatter YAML :

```yaml
---
title: 'Brief Produit : {project_name}'
status: 'draft'
created: '{timestamp}'
updated: '{timestamp}'
inputs: [liste des fichiers d'entrée utilisés]
---
```

## Étape 2 : Lancement des Sous-agents de Revue

Avant de montrer le projet à l'utilisateur, soumettez-le à plusieurs prismes de revue en parallèle.

**Lancement en parallèle :**

1. **Revue Sceptique** (`agents/skeptic-reviewer.md`) — "Qu'est-ce qui manque ? Quelles hypothèses ne sont pas testées ? Qu'est-ce qui pourrait mal tourner ? Où le brief est-il vague ou évasif ?"

2. **Revue d'Opportunités** (`agents/opportunity-reviewer.md`) — "Quelles propositions de valeur adjacentes sont oubliées ? Quels angles de marché ou partenariats pourraient renforcer cela ? Qu'est-ce qui est sous-estimé ?"

3. **Revue Contextuelle** — Vous (l'agent principal) choisissez le troisième prisme le plus utile en fonction de CE produit spécifique. Choisissez le prisme qui traite du risque UNIQUE LE PLUS IMPORTANT que les revues sceptique et d'opportunités ne capteraient pas naturellement. Exemples :
   - Pour let healthtech : "Revue des risques réglementaires et de conformité".
   - Pour les solutions développeurs (devtools) : "Critique de l'expérience développeur et des frictions d'adoption".
   - Pour une place de marché (marketplace) : "Analyse des effets de réseau et du problème de l'œuf et de la poule".
   - Pour l'entreprise (B2B) : "Revue des achats et de la gestion du changement organisationnel".
   - **Lorsque le domaine n'est pas clair, par défaut :** "Revue des risques de mise sur le marché (GTM) et de lancement" — examine la distribution, la tarification et l'acquisition des premiers clients. Presque toujours utile, souvent négligé.
     Décrivez le prisme, effectuez la revue vous-même en ligne (inline).

### Dégradation Nominale (Graceful Degradation)

Si les sous-agents sont indisponibles :

- Effectuez les trois passes de revue vous-même, séquentiellement.
- Appliquez chaque prisme délibérément — ne les mélangez pas en une revue générique.
- La qualité de la revue importe plus que le parallélisme.

## Étape 3 : Intégrer les Insights de Revue

Une fois toutes les revues terminées :

1. **Triez les conclusions** — groupez par thème, supprimez les doublons.
2. **Appliquez les améliorations non litigieuses** directement au projet (lacunes évidentes, langage imprécis, manque de détails).
3. **Signalez les suggestions substantielles** qui nécessitent l'avis de l'utilisateur (choix stratégiques, questions de périmètre, décisions de positionnement sur le marché).

## Étape 4 : Présenter à l'Utilisateur

**Mode Autonome (Headless) :** Passez à `prompts/finalize.md` — pas d'interaction utilisateur. Enregistrez directement le projet amélioré.

**Modes Yolo et Guidé :**

Présentez le projet de brief à l'utilisateur. Ensuite, partagez les conclusions des revues :

"Voici votre projet de brief produit. Avant de finaliser, mon comité de revue a soulevé quelques points méritant réflexion :

**[Conclusions groupées des revues — uniquement les plus substantielles nécessitant l'avis de l'utilisateur]**

Qu'en pensez-vous ? Y a-t-il des modifications que vous aimeriez apporter ?"

Présentez les conclusions avec un bref raisonnement, puis proposez : "Voulez-vous que j'approfondisse l'un de ces points, ou êtes-vous prêt à faire vos révisions ?"

**Itérez** tant que l'utilisateur souhaite affiner. Utilisez la validation douce : "Autre chose, ou sommes-nous satisfaits du résultat ?".

## Étape Terminée

Cette étape est terminée lorsque : (a) le projet a été examiné par les trois prismes et les améliorations ont été intégrées, ET soit (autonome) enregistrement et orientation directs, soit (guidé/yolo) l'utilisateur est satisfait. Orientez vers `prompts/finalize.md`.
