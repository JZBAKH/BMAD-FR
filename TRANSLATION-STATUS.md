# Tableau de bord de la traduction BMAD-FR

_Généré automatiquement le 2026-05-11 01:29:18 UTC par `tools/audit-translation-coverage.mjs`._

## Résumé global

| Module | Présence | Traduction effective | Manquants | Statut |
|---|---|---|---|---|
| `bmm-skills` | 200/200 (100.0%) | 99.5% | 0 | ✅ Complet |
| `core-skills` | 31/31 (100.0%) | 100.0% | 0 | ✅ Complet |
| `scripts` | 0/0 | — | 0 | ❌ Module `-fr` absent |

## Modules upstream non importés

- `bmm` — à importer depuis upstream puis traduire en `bmm-fr`
- `core` — à importer depuis upstream puis traduire en `core-fr`
- `utility` — à importer depuis upstream puis traduire en `utility-fr`
- `bmc` — à importer depuis upstream puis traduire en `bmc-fr`
- `cis` — à importer depuis upstream puis traduire en `cis-fr`
- `bmb` — à importer depuis upstream puis traduire en `bmb-fr`

## Détail par module

## Module : `bmm-skills`

- **Présence** : 200/200 fichiers (100.0%)
- **Traduits effectivement** : 199/200 (99.5%)
- **Non traduits (copiés mais en anglais)** : 1
- **Manquants** : 0

<details><summary>Fichiers présents mais non traduits</summary>

- `1-analysis/bmad-document-project/documentation-requirements.csv` (score=0.000, FR=0, EN=0)

</details>

## Module : `core-skills`

- **Présence** : 31/31 fichiers (100.0%)
- **Traduits effectivement** : 31/31 (100.0%)
- **Non traduits (copiés mais en anglais)** : 0
- **Manquants** : 0

## Module : `scripts`

❌ **Pas de version `-fr`** — `src/scripts-fr/` n'existe pas.

- 0 fichiers à traduire dans l'original

## Méthodologie

- **Présence** : un fichier est compté comme présent si son chemin relatif existe à l'identique dans `<module>-fr/`.
- **Traduction effective** : heuristique combinant la densité de caractères accentués (é, è, à, ç…) et le ratio mots français vs anglais courants. Score `>= 0.05` = traduit.
- **Limites** : un fichier essentiellement composé de code, d'identifiants techniques ou très court peut être classé incorrectement. Le GLOSSAIRE.md autorise (et exige) de garder en anglais les clés système, prénoms d'agents, codes de menu, balises XML, blocs de code, etc.
- **Extensions analysées** : `.md`, `.yaml`, `.yml`, `.csv`. Les `.json` (souvent métadonnées système) sont ignorés.