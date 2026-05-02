# Étape 3 : Detail Pass

Affichez : `Orientation → Walkthrough → [Detail Pass] → Testing`

## Suivez les Règles globales d'étape dans SKILL.md

- Le detail pass fait émerger ce sur quoi l'humain doit **réfléchir**, pas ce que le code a mal fait. Le durcissement machine s'est déjà occupé de la correction. Cela active la conscience du risque.
- Le LLM détecte les catégories de risque par motif. L'humain juge la portée. N'attribuez pas de scores de sévérité ni de classements numériques — l'ordonnancement par rayon d'impact (ci-dessous) est une mise en séquence pour la lisibilité, pas un jugement de sévérité.
- S'il n'existe aucun spot à haut risque, dites-le explicitement. N'inventez pas de constatations.

## IDENTIFIER LES SPOTS DE RISQUE

Scannez le diff pour les changements touchant des motifs sensibles au risque. Cherchez 2 à 5 spots où une erreur aurait le plus grand rayon d'impact — pas le code le plus complexe, mais le code où se tromper coûte le plus.

Catégories de risque à détecter :

- `[auth]` — authentification, autorisation, session, token, permission, contrôle d'accès
- `[public API]` — endpoints nouveaux/modifiés, exports, méthodes publiques, contrats d'interface
- `[schema]` — migrations de base de données, changements de schéma, modifications de modèle de données, sérialisation
- `[billing]` — paiement, tarification, abonnement, comptage, suivi d'utilisation
- `[infra]` — déploiement, CI/CD, variables d'environnement, fichiers de configuration, infrastructure
- `[security]` — validation d'entrée, sanitization, crypto, secrets, CORS, CSP
- `[config]` — feature flags, comportement dépendant de l'environnement, valeurs par défaut
- `[other]` — tout ce qui est sensible au risque et ne rentre pas dans les catégories ci-dessus (par exemple, concurrence, confidentialité des données, rétrocompatibilité). Utilisez un tag descriptif.

Séquencez les spots pour que le plus grand rayon d'impact vienne en premier (combien casse si c'est faux), pas par ordre du diff ni par ordre de fichier. Si plus de 5 spots se qualifient, montrez le top 5 et notez : "N additional spots omitted — ask if you want the full list."

Si le changement n'a aucun spot correspondant à ces motifs, indiquez : "No high-risk spots found in this change — the diff speaks for itself." Ne forcez pas de constatations.

## FAIRE ÉMERGER LES CONSTATATIONS DU DURCISSEMENT MACHINE

Vérifiez si la spec a une section `## Spec Change Log` avec des entrées (alimentée par les boucles de revue contradictoire).

- **Si des entrées existent :** Lisez-les. Faites émerger les constatations qui sont instructives pour le relecteur humain — pas des bugs déjà corrigés, mais des décisions que la boucle de revue a signalées et dont l'humain devrait être conscient. Format : résumé bref de ce qui a été signalé et ce qui a été décidé.
- **Si pas d'entrées ou pas de spec :** Sautez cette section entièrement. Ne la mentionnez pas.

## PRÉSENTER

Sortez en un seul message :

```
Orientation → Walkthrough → [Detail Pass] → Testing
```

### Spots de Risque

Pour chaque spot, une ligne :

```
- `path:line` — [tag] reason-phrase
```

Exemple :

```
- `src/auth/middleware.ts:42` — [auth] New token validation bypasses rate limiter
- `migrations/003_add_index.sql:7` — [schema] Index on high-write table, check lock behavior
- `api/routes/billing.ts:118` — [billing] Metering calculation changed, verify idempotency
```

### Durcissement Machine (uniquement si des constatations existent)

```
### Machine Hardening

- Finding summary — what was flagged, what was decided
- ...
```

### Menu de clôture

Terminez le message par :

```
---

You've seen the design and the risk landscape. From here:
- **"dig into [area]"** — I'll deep-dive that specific area with correctness focus
- **"next"** — I'll suggest how to observe the behavior
```

## SORTIE ANTICIPÉE

Si à un moment donné l'humain signale qu'il veut prendre une décision sur ce {change_type} (par exemple, « let's ship it », « this needs a rethink », « I'm done reviewing », ou tout ce qui suggère qu'il est prêt à décider), confirmez son intention :

- S'il veut **approuver et livrer** → lisez intégralement et suivez `./step-05-wrapup.md`
- S'il veut **rejeter et retravailler** → lisez intégralement et suivez `./step-05-wrapup.md`
- Si vous l'avez mal interprété → reconnaissez-le et continuez l'étape courante.

## RE-REVUE CIBLÉE

Quand l'humain dit « dig into [area] » (par exemple, « dig into the auth changes », « dig into the schema migration ») :

1. Si la zone spécifiée ne correspond à aucun code dans le diff, dites-le : "I don't see [area] in this change — did you mean something else?" Retournez au menu de clôture.
2. Identifiez tous les emplacements de code dans le diff pertinents pour la zone spécifiée.
3. Lisez chaque emplacement dans son contexte complet (pas seulement le hunk du diff — lisez le code environnant).
4. Basculez en **mode correction** : tracez les cas limites, vérifiez les conditions aux frontières, vérifiez la gestion d'erreurs, cherchez les erreurs off-by-one, les conditions de course, les fuites de ressources.
5. Présentez les constatations comme une liste compacte — chaque constatation est `path:line` + ce que vous avez trouvé + pourquoi c'est important.
6. Si rien d'inquiétant n'est trouvé, dites-le : "Looked closely at [area] — nothing concerning. The implementation is solid."
7. Après présentation, n'affichez que le menu de clôture (pas à nouveau la liste complète des spots de risque).

L'humain peut déclencher plusieurs re-revues ciblées. À chaque fois, présentez les nouvelles constatations et seulement le menu de clôture.

## SUITE

Lisez intégralement et suivez `./step-04-testing.md`
