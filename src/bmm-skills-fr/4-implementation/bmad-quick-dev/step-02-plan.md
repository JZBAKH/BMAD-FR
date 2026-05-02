---
wipFile: '{implementation_artifacts}/tech-spec-wip.md'
deferred_work_file: '{implementation_artifacts}/deferred-work.md'
---

# Étape 2 : Planifier

## RÈGLES

- VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- Pas d'approbations intermédiaires.

## INSTRUCTIONS

1. Investiger la base de code. _Isolez l'exploration approfondie dans des sous-agents/tâches lorsque cela est possible. Pour éviter l'explosion du contexte, demandez aux sous-agents de ne vous donner que des résumés distillés._
2. Lisez `../tech-spec-template.md` intégralement. Remplissez-le en vous basant sur l'intention et l'investigation, puis écrivez le résultat dans `{wipFile}`.
3. Auto-revue par rapport au standard PRÊT POUR LE DÉVELOPPEMENT.
4. Si des lacunes d'intention existent, ne fantasmez pas, ne laissez pas de questions ouvertes, ARRÊTEZ-VOUS et demandez à l'humain.
5. Vérification du nombre de tokens (voir STANDARD DE PÉRIMÈTRE). Si la spécification dépasse 1600 tokens :
   - Affichez le nombre de tokens à l'utilisateur.
   - ARRÊTEZ-VOUS et demandez à l'humain : `[S] Séparer — écarter les objectifs secondaires` | `[K] Tout garder — accepter les risques`.
   - Sur **S** : Proposez la séparation — nommez chaque objectif secondaire. Ajoutez les objectifs différés à `{deferred_work_file}`. Réécrivez la spécification actuelle pour ne couvrir que l'objectif principal — ne vous contentez pas de supprimer des sections chirurgicalement ; régénérez la spécification pour le périmètre réduit. Continuez vers le point de contrôle.
   - Sur **K** : Continuez vers le point de contrôle avec la spécification complète.

### POINT DE CONTRÔLE 1 (CHECKPOINT 1)

Présentez un résumé. Si le nombre de tokens a dépassé 1600 et que l'utilisateur a choisi [K], incluez le nombre de tokens et expliquez pourquoi cela peut poser problème. ARRÊTEZ-VOUS et demandez à l'humain : `[A] Approuver` | `[E] Modifier (Edit)`.

- **A** : Renommez `{wipFile}` en `{spec_file}`, définissez le statut `ready-for-dev`. Tout ce qui se trouve à l'intérieur de `<frozen-after-approval>` est désormais verrouillé — seul l'humain peut le modifier. → Étape 3.
- **E** : Appliquez les changements, puis revenez au POINT DE CONTRÔLE 1.

## SUIVANT

Lire complètement et suivre `./step-03-implement.md`.
