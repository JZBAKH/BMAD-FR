# Étape 4 : Testing

Affichez : `Orientation → Walkthrough → Detail Pass → [Testing]`

## Suivez les Règles globales d'étape dans SKILL.md

- Cette étape est **expérientielle**, non analytique. Le detail pass demandait « avez-vous pensé à X ? » — celle-ci dit « vous pourriez voir X de vos propres yeux ».
- Ne prescrivez pas. L'humain décide si observer le comportement vaut son temps. Cadrez les suggestions comme des options, pas des obligations.
- Ne dupliquez pas la CI, les suites de tests ou les vérifications automatisées. Supposez qu'elles existent et fonctionnent. Il s'agit d'observation manuelle — le type de confiance qu'aucun test automatisé ne fournit.
- Si le changement n'a pas de comportement visible par l'utilisateur, dites-le explicitement. N'inventez pas d'observations.

## IDENTIFIER LE COMPORTEMENT OBSERVABLE

Scannez le diff et la spec pour les changements qui produisent un comportement qu'un humain peut directement observer. Catégories à rechercher :

- **Changements UI** — nouveaux écrans, layouts modifiés, interactions changées, états d'erreur
- **Sortie CLI/terminal** — nouvelles commandes, sortie modifiée, nouveaux flags ou options
- **Réponses API** — nouveaux endpoints, payloads modifiés, codes de statut différents
- **Changements d'état** — enregistrements de base de données, artefacts de système de fichiers, effets de configuration
- **Chemins d'erreur** — entrée invalide, dépendances manquantes, conditions limites

Pour chaque comportement observable, déterminez :

1. **Quoi faire** — l'action spécifique (commande à exécuter, bouton à cliquer, requête à envoyer)
2. **À quoi s'attendre** — le résultat observable qui confirme que le changement fonctionne
3. **Pourquoi se donner la peine** — une phrase reliant cette observation à l'intention du changement (à omettre si évident d'après le contexte)

Visez 2 à 5 suggestions pour un changement typique. Si plus de 5 se qualifient, priorisez par la confiance que l'observation procure relativement à l'effort. Un changement sans aucun comportement observable convient — ne rembourrez pas avec des observations triviales.

## PRÉSENTER

Sortez en un seul message :

```
Orientation → Walkthrough → Detail Pass → [Testing]
```

Puis les suggestions de testing en utilisant ce format :

```
### How to See It Working

**{Brief description}**
Do: {specific action}
Expect: {observable result}

**{Brief description}**
Do: {specific action}
Expect: {observable result}
```

Incluez des blocs de code pour les commandes ou requêtes lorsque c'est utile.

Si le changement n'a pas de comportement observable, remplacez les suggestions par :

```
### How to See It Working

This change is internal — no user-visible behavior to observe. The diff and tests tell the full story.
```

### Clôture

Terminez le message par :

```
---

You've seen the change and how to verify it. When you're ready to make a call, just say so.
```

## SUITE

Quand l'humain signale qu'il est prêt à prendre une décision sur ce {change_type}, lisez intégralement et suivez `./step-05-wrapup.md`
