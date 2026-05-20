---
deferred_work_file: '{implementation_artifacts}/deferred-work.md'
---

# Étape 2 : Plan

## RÈGLES

- VOUS DEVEZ TOUJOURS PARLER EN SORTIE selon le style de communication de votre Agent avec la config `{communication_language}`
- Aucune approbation intermédiaire.

## INSTRUCTIONS

1. Vérification de reprise de brouillon. Si `{spec_file}` existe avec `status: draft`, lisez-le et capturez verbatim le bloc `<frozen-after-approval>...</frozen-after-approval>` comme `preserved_intent`. Sinon, `preserved_intent` est vide.
2. Investiguer la base de code. _Isolez l'exploration profonde dans des sub-agents/tâches lorsque c'est disponible. Pour éviter la boule de neige du contexte, demandez aux subagents de ne fournir que des résumés distillés._
3. Lisez `./spec-template.md` intégralement. Remplissez-le sur la base de l'intention et de l'investigation. Si `{preserved_intent}` est non vide, substituez-le au bloc `<frozen-after-approval>` dans votre spec remplie avant d'écrire. Écrivez le résultat dans `{spec_file}`.
4. Auto-révision selon le standard READY FOR DEVELOPMENT.
5. Si des lacunes d'intention existent, ne fantasmez pas, ne laissez pas de questions ouvertes, HALT et demandez à l'humain.
6. Vérification du nombre de tokens (voir SCOPE STANDARD). Si la spec dépasse 1600 tokens :
   - Affichez à l'utilisateur le nombre de tokens.
   - HALT et demandez à l'humain : `[S] Diviser — découper les objectifs secondaires` | `[K] Garder la spec complète — accepter les risques`
   - Sur **S** : Proposez la division — nommez chaque objectif secondaire. Ajoutez les objectifs reportés à `{deferred_work_file}`. Réécrivez la spec actuelle pour ne couvrir que l'objectif principal — ne découpez pas chirurgicalement les sections ; régénérez la spec pour la portée réduite. Continuez vers le checkpoint.
   - Sur **K** : Continuez vers le checkpoint avec la spec complète.

### CHECKPOINT 1

Présentez le résumé. Affichez le chemin du fichier de spec comme un chemin relatif au CWD (sans `/` initial) afin qu'il soit cliquable dans le terminal. Si le nombre de tokens a dépassé 1600 et que l'utilisateur a choisi [K], incluez le nombre de tokens et expliquez pourquoi cela peut être un problème.

Après avoir présenté le résumé, affichez cette note :

---

Avant d'approuver, vous pouvez ouvrir le fichier de spec dans un éditeur ou me poser des questions et me dire ce qu'il faut changer. Vous pouvez aussi utiliser les skills `bmad-advanced-elicitation`, `bmad-party-mode` ou `bmad-code-review`, idéalement dans une autre session pour éviter de surcharger le contexte.

---

HALT et demandez à l'humain : `[A] Approuver` | `[E] Éditer`

- **A** : Relisez `{spec_file}` depuis le disque.
  - **Si le fichier est manquant :** HALT. Indiquez à l'utilisateur que le fichier de spec a disparu et STOP — n'écrivez rien dans `{spec_file}`, ne définissez pas le statut, ne procédez pas à l'étape 3. Rien en dessous de ce point ne s'exécute.
  - **Si le fichier existe :** Comparez le contenu à ce que vous avez écrit. S'il a changé depuis votre écriture, reconnaissez les éditions externes — affichez un bref résumé de ce qui a changé — et procédez avec la version mise à jour. Puis définissez le statut `ready-for-dev` dans `{spec_file}`. Tout ce qui est à l'intérieur de `<frozen-after-approval>` est maintenant verrouillé — seul l'humain peut le modifier. → Étape 3.
- **E** : Appliquez les changements, puis revenez au CHECKPOINT 1.

## SUIVANT

Lisez intégralement et suivez `./step-03-implement.md`
