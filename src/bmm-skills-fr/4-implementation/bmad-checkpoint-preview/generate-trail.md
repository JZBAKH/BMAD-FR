# Générer une Piste de Revue

Génère une piste de revue à partir du diff et du contexte de la base de code. Une piste générée est de moindre qualité qu'une piste produite par l'auteur, mais bien meilleure qu'aucune.

## Suivez les Règles globales d'étape dans SKILL.md

## INSTRUCTIONS

1. Récupérez le diff complet par rapport à la baseline appropriée (mêmes règles que les Surface Area Stats à l'étape 01).
2. Lisez intégralement les fichiers modifiés — pas seulement les hunks du diff. Le code environnant révèle l'intention que les hunks seuls manquent. Si le contenu total des fichiers dépasse ~50k tokens, lisez intégralement seulement les fichiers ayant les plus gros hunks de diff et utilisez les hunks pour le reste.
3. Si une spec existe, utilisez sa section Intent pour ancrer l'identification des préoccupations.
4. Identifiez 2 à 5 préoccupations : des intentions de conception cohésives qui chacune expliquent le *pourquoi* d'un cluster de changements. Préférez les regroupements fonctionnels et les frontières architecturales aux découpages au niveau fichier. Un changement à préoccupation unique convient — n'inventez pas de regroupements.
5. Pour chaque préoccupation, sélectionnez 1 à 4 arrêts `path:line` — emplacements où la préoccupation est la plus visible. Préférez les points d'entrée, les points de décision et les franchissements de frontières aux changements mécaniques.
6. Commencez par le point d'entrée — l'arrêt à plus fort effet de levier qu'un relecteur devrait voir en premier. Au sein de chaque préoccupation, ordonnez les arrêts pour que chacun s'appuie sur le précédent. Terminez par les périphériques (tests, configuration, types).
7. Formatez chaque arrêt en utilisant `path:line` selon les règles globales d'étape :

```
**{Concern name}**

- {one-line framing, ≤15 words}
  `src/path/to/file.ts:42`
```

Lorsqu'il n'y a qu'une seule préoccupation, omettez l'étiquette en gras — listez simplement les arrêts directement.

## PRÉSENTER

Sortie après l'orientation :

```
I built a review trail for this {change_type} (no author-produced trail was found):

{generated trail}
```

La piste générée sert d'Ordre de Revue Suggéré pour les étapes suivantes. Définissez `review_mode` à `full-trail` — une piste existe maintenant, donc toutes les étapes en aval doivent la traiter comme telle.

Si git est indisponible ou que le diff ne peut être récupéré, retournez à step-01 avec : "Could not generate trail — git unavailable."
