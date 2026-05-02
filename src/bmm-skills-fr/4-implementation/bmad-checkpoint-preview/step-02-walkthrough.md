# Étape 2 : Walkthrough

Affichez : `Orientation → [Walkthrough] → Detail Pass → Testing`

## Suivez les Règles globales d'étape dans SKILL.md

- Organisez par **préoccupation**, non par fichier. Une préoccupation est une intention de conception cohésive — par exemple, « validation d'entrée », « gestion d'état », « contrat d'API ». Un même fichier peut apparaître sous plusieurs préoccupations ; une même préoccupation peut couvrir plusieurs fichiers.
- Le walkthrough active le **jugement de conception**, pas la vérification de correction. Encadrez chaque préoccupation comme « voici ce que ce changement fait et pourquoi » — l'humain évalue si c'est la bonne approche pour le système.

## CONSTRUIRE LE WALKTHROUGH

### Identifier les préoccupations

**Avec un Suggested Review Order** (mode `full-trail` — le chemin normal, y compris quand step-01 a généré une piste) :

1. Lisez les arrêts du Suggested Review Order de la spec (ou du contexte de la conversation s'ils ont été générés par le repli de step-01).
2. Résolvez chaque arrêt vers un fichier dans le dépôt courant. Sortez au format `path:line` selon la règle permanente.
3. Lisez le diff pour comprendre ce que chaque arrêt fait réellement.
4. Regroupez les arrêts par préoccupation. Les arrêts qui partagent une intention de conception vont ensemble même s'ils sont dans des fichiers différents. Un arrêt peut apparaître sous plusieurs préoccupations s'il sert plusieurs objectifs.

**Sans Suggested Review Order** (repli quand la génération de piste a échoué, par exemple, git indisponible) :

1. Récupérez le diff par rapport à la baseline appropriée (mêmes règles que l'étape 1).
2. Identifiez les préoccupations en lisant le diff pour des intentions de conception cohésives :
   - Regroupements fonctionnels — quel comportement visible par l'utilisateur chaque cluster de changements supporte-t-il ?
   - Couches architecturales — le changement franchit-il des frontières (API → service → données) ?
   - Décisions de conception — où l'auteur a-t-il choisi entre des alternatives ?
3. Pour chaque préoccupation, identifiez les emplacements de code clés sous forme d'arrêts `path:line`.

### Ordonner pour la compréhension

Séquencez les préoccupations de haut en bas : commencez par l'intention de plus haut niveau (le « quoi et pourquoi »), puis descendez dans l'implémentation de support. Au sein de chaque préoccupation, ordonnez les arrêts pour que chacun s'appuie sur le précédent. Le lecteur ne devrait jamais rencontrer une référence à quelque chose qu'il n'a pas encore vu.

Si le changement a un point d'entrée naturel (par exemple, une nouvelle API publique, un changement de configuration, un point d'entrée d'UI), commencez par lui.

### Rédiger chaque préoccupation

Pour chaque préoccupation, produisez :

1. **Titre** — une phrase courte nommant l'intention de conception (pas un nom de fichier, pas un nom de module).
2. **Pourquoi** — 1 à 2 phrases : quel problème cette préoccupation adresse, pourquoi cette approche a été choisie plutôt que d'autres alternatives. Si la spec documente des alternatives rejetées, faites-y référence ici.
3. **Arrêts** — chaque arrêt sur sa propre ligne : `path:line` suivi d'une brève phrase (pas une phrase complète) décrivant ce que cet emplacement fait pour la préoccupation. Gardez le cadrage sous 15 mots par arrêt.

Visez 2 à 5 préoccupations pour un changement typique. Un changement à préoccupation unique convient — n'inventez pas de regroupements. Un changement avec plus de 7 préoccupations est un signal que la portée pourrait être trop large, mais présentez-le tout de même.

## PRÉSENTER

Sortez le walkthrough complet en un seul message avec cette structure :

```
Orientation → [Walkthrough] → Detail Pass → Testing
```

Puis chaque groupe de préoccupations en utilisant ce format :

```
### {Concern Heading}

{Why — 1–2 sentences}

- `path:line` — {brief framing}
- `path:line` — {brief framing}
- ...
```

Terminez le message par :

```
---

Take your time — click through the stops, read the diff, trace the logic. While you are reviewing, you can:
- "run advanced elicitation on the error handling"
- "party mode on whether this schema migration is safe"
- or just ask anything

When you're ready, say **next** and I'll surface the highest-risk spots.
```

## SORTIE ANTICIPÉE

Si à un moment donné l'humain signale qu'il veut prendre une décision sur ce {change_type} (par exemple, « let's ship it », « this needs a rethink », « I'm done reviewing », ou tout ce qui suggère qu'il est prêt à décider), confirmez son intention :

- S'il veut **approuver et livrer** → lisez intégralement et suivez `./step-05-wrapup.md`
- S'il veut **rejeter et retravailler** → lisez intégralement et suivez `./step-05-wrapup.md`
- Si vous l'avez mal interprété → reconnaissez-le et continuez l'étape courante.

## SUITE

Par défaut : lisez intégralement et suivez `./step-03-detail-pass.md`
