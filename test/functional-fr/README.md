# Lot 1 — Tests fonctionnels BMAD-FR

Tests d'intégrité structurelle et de fonctionnement du fork francophone.

## Lancer

```bash
# Suite complète
npm run test:fr:functional

# Un test spécifique
node test/functional-fr/02-agent-yaml-schema.js

# Avec détail des warnings
VERBOSE_WARNINGS=1 npm run test:fr:functional
```

Exit code : **0** = tous les tests bloquants passent, **1** = au moins un échec.

## Tests

| #   | Fichier                             | Vérifie                                                                                                                              |
| --- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 01  | `01-fr-modules-exist.js`            | Présence physique de `src/bmm-fr`, `src/core-fr`, `src/utility-fr` avec leurs sous-dossiers attendus                                 |
| 02  | `02-agent-yaml-schema.js`           | Conformité de chaque `.agent.yaml` au schéma Zod de `tools/schema/agent.js` (métadonnées, persona, menu items, triggers kebab-case…) |
| 03  | `03-skill-md-frontmatter.js`        | Chaque `SKILL.md` a un frontmatter YAML valide avec `name` et `description` non vides                                                |
| 04  | `04-csv-structure.js`               | Les CSV parsent (champs cités correctement) et leur nombre de lignes est identique à l'original upstream                             |
| 05  | `05-yaml-parseable.js`              | Tous les `.yaml`/`.yml` -fr parsent sans erreur (détecte les coquilles d'indentation/quotes)                                         |
| 06  | `06-file-refs-integrity.js`         | Chaque chemin `{project-root}/_bmad/<module>/...` cité dans un fichier -fr pointe vers un fichier qui existe réellement              |
| 07  | `07-no-conflict-markers.js`         | Aucun fichier ne contient de marqueur `<<<<<<<` / `=======` / `>>>>>>>` (régression suite au merge problème initial)                 |
| 08  | `08-getmodulepath-redirect.js`      | `getModulePath('bmm'/'core'/'utility')` redirige bien vers les variantes `-fr` (vérifie le pilier de l'infrastructure)               |
| 09  | `09-no-orphan-en-folders.js`        | Aucun sous-dossier `*-en` ne réapparaît dans les arborescences `-fr` (régression Phase 2 cleanup)                                    |
| 10  | `10-utility-components-complete.js` | Les 10 fragments `agent-components/` sont présents dans `utility-fr/` et ont le même nombre de lignes que l'original                 |

## Quand un test échoue

1. Lire le message d'erreur — il indique précisément le fichier et la ligne en cause.
2. Si le test est en faux positif sur un fichier légitime, ajouter une exception dans `test/fr-helpers/translation-exceptions.json` (avec une raison documentée).
3. Sinon, corriger le fichier en cause — le test rejouera et passera au prochain push.

## Pré-requis pour ajouter un test

1. Créer `test/functional-fr/NN-nom-explicite.js` avec le pattern habituel :
   ```js
   const runner = require('../fr-helpers/runner');
   function run() {
     runner.section('NN — ...'); /* ... */
   }
   if (require.main === module) {
     runner.header('Lot 1 / NN — ...');
     run();
     runner.summary();
   }
   module.exports = { run };
   ```
2. L'ajouter au tableau `TESTS` dans `test/functional-fr/run-all.js`.
3. Documenter dans ce README.
