# Lot 2 — Tests linguistiques BMAD-FR

Tests de conformité au [GLOSSAIRE.md](../../GLOSSAIRE.md) : variables protégées, codes triggers, balises XML, termes obligatoires, couverture en français.

## Lancer

```bash
# Suite complète
npm run test:fr:language

# Un test spécifique
node test/language-fr/01-variables-preserved.js

# Avec détail des warnings
VERBOSE_WARNINGS=1 npm run test:fr:language
```

Exit code : **0** = tous les tests bloquants passent, **1** = au moins un échec.

## Tests

| #   | Fichier                        | Règle GLOSSAIRE vérifiée                                                                                                                                                                                                 |
| --- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 01  | `01-variables-preserved.js`    | §1 Sanctuaire — toutes les `{var}` et `{{var}}` de l'original sont présentes dans le FR (rien perdu, rien inventé)                                                                                                       |
| 02  | `02-agent-names-intact.js`     | §1 Sanctuaire — Mary, Winston, John, Bob, Sally, Paige, Barry préservés. **Exception tolérée** : `Amelia` ⇄ `Amélie` (choix du project owner, comptés ensemble)                                                          |
| 03  | `03-trigger-codes-intact.js`   | §1 Sanctuaire — codes BP, RS, CB, CP, VP, EP, CE, IR, CC, CA, SP, CS, DS, CR, QA, CU, DP, WD, US, MG, ER, BSP, BH, ID, SD, AR, ECH, DG, PM, QS, QD préservés                                                             |
| 04  | `04-xml-tags-intact.js`        | §1 Sanctuaire — noms de balises XML (`<step>`, `<rules>`, `<r>`, `<persona>`, `<menu>`, `<agent>`, `<action>`, `<example>`, `<handler>`…) jamais traduits + équilibre ouvertures/fermetures                              |
| 05  | `05-handler-attributes.js`     | §5 Directives — valeurs `type="action"`, `type="data"`, `type="exec"`, `type="multi"`, `type="tmpl"` jamais altérées                                                                                                     |
| 06  | `06-fuzzy-match-on.js`         | §1 Sanctuaire — la chaîne `fuzzy match on` reste intacte (parsée par le validateur Zod)                                                                                                                                  |
| 07  | `07-yaml-booleans.js`          | §3.4 — `true` / `false` jamais traduits en `vrai` / `faux` (casserait le parser YAML)                                                                                                                                    |
| 08  | `08-line-counters.js`          | §3.3 — nombre de puces, items numérotés et balises `<step>` identique entre original et FR                                                                                                                               |
| 09  | `09-glossary-terms.js`         | §4 Dictionnaire métier — termes obligatoires (Senior Implementation Engineer, Strategic Business Analyst, System Architect, Technical Scrum Master, Requirements Expert) appliqués correctement                          |
| 10  | `10-skill-descriptions-fr.js`  | §4 — `description:` du frontmatter de chaque `SKILL.md -fr` contient au moins un caractère accentué ou un mot français commun                                                                                            |
| 11  | `11-french-coverage-floor.js`  | §4 — score de "francisation" (ratio accents + mots FR/EN) ≥ 0.05 pour chaque fichier de prose, avec liste blanche pour les exceptions documentées                                                                        |
| 12  | `12-cli-no-english-strings.js` | Filet anti-régression : aucune chaîne anglaise user-facing dans `tools/cli/`, `tools/schema/` et `tools/validate-*.js` (détection par marqueurs anglais exclusifs)                                                       |
| 13  | `13-root-md-files-fr.js`       | Vitrine publique : `README.md`, `GLOSSAIRE.md`, `AGENTS.md`, `AUDIT-FINAL.md` rédigés en français. Les fichiers volontairement EN (SECURITY, TRADEMARK, CONTRIBUTING, CONTRIBUTORS, CHANGELOG) sont documentés et exclus |

## Liste blanche — exceptions documentées

Les fichiers qui ne doivent **pas** passer le test de couverture FR (test 11) sont listés dans [`test/fr-helpers/translation-exceptions.json`](../fr-helpers/translation-exceptions.json), groupés par identifiant de test, chaque entrée portant une `reason` versionnée.

**Cas typiques d'exception** :

- Mort code upstream conservé pour parité (ex : `1-analysis/research/market-steps/` — voir [AUDIT-FINAL.md §2.3](../../AUDIT-FINAL.md))
- CSV de patterns techniques (extensions `*.config.js`, identifiants `project_type_id`, etc.) légitimement non traduits selon GLOSSAIRE §1-§2
- YAML de clés purement techniques

**Ajouter une exception** :

```json
"11-french-coverage-floor": [
  {
    "path": "src/bmm-fr/path/to/file.csv",
    "reason": "Pourquoi ce fichier n'a pas vocation à être traduit (cite la règle du GLOSSAIRE ou le ticket associé)"
  }
]
```

## Quand un test échoue

1. Lire le message — il pointe le fichier, le nombre observé vs attendu, et l'élément protégé en cause.
2. Trois réactions possibles :
   - **Vraie violation** : corriger le fichier (la balise traduite, la variable manquante, etc.).
   - **Faux positif documenté** : ajouter une exception dans `translation-exceptions.json` avec sa raison.
   - **Limite du test** : améliorer l'extracteur dans `test/fr-helpers/extract-protected.js` ou le scoring dans `french-score.js`.

## Helpers partagés

Les tests reposent sur quatre utilitaires dans `test/fr-helpers/` :

- **`extract-protected.js`** — extrait variables, balises, codes, noms d'agents d'un texte
- **`french-score.js`** — heuristique de francisation (accents + mots FR/EN)
- **`pair-with-original.js`** — mappe `src/<module>-fr/foo` → `src/<module>/foo`
- **`exceptions.js`** — charge la liste blanche et résout les exclusions par test
- **`runner.js`** — runner minimal partagé (style aligné avec `test/test-file-refs-csv.js`)
- **`walk.js`** — walker récursif filtré par extension
