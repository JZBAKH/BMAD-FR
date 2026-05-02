# Tableau de bord de la traduction BMAD-FR

_Généré automatiquement le 2026-04-30 13:25:50 UTC par `tools/audit-translation-coverage.mjs`._

## Résumé global

| Module | Présence | Traduction effective | Manquants | Statut |
|---|---|---|---|---|
| `bmm` | 330/330 (100.0%) | 98.0% | 0 | ✅ Complet |
| `core` | 75/75 (100.0%) | 100.0% | 0 | ✅ Complet |
| `utility` | 2/2 (100.0%) | 100.0% | 0 | ✅ Complet |

## Modules upstream non importés

- `bmc` — à importer depuis upstream puis traduire en `bmc-fr`
- `cis` — à importer depuis upstream puis traduire en `cis-fr`
- `bmb` — à importer depuis upstream puis traduire en `bmb-fr`

## Détail par module

## Module : `bmm`

- **Présence** : 330/330 fichiers (100.0%)
- **Traduits effectivement** : 289/295 (98.0%)
- **Non traduits (copiés mais en anglais)** : 6
- **Manquants** : 0
- **Indéterminés (trop courts)** : 35

<details><summary>Fichiers présents mais non traduits</summary>

- `workflows/1-analysis/research/market-steps/step-01-init.md` (score=0.000, FR=0, EN=128)
- `workflows/1-analysis/research/market-steps/step-02-customer-behavior.md` (score=0.000, FR=0, EN=155)
- `workflows/1-analysis/research/market-steps/step-03-customer-pain-points.md` (score=0.000, FR=0, EN=173)
- `workflows/1-analysis/research/market-steps/step-04-customer-decisions.md` (score=0.000, FR=0, EN=148)
- `workflows/1-analysis/research/market-steps/step-05-competitive-analysis.md` (score=0.000, FR=0, EN=104)
- `workflows/bmad-document-project/documentation-requirements.csv` (score=0.000, FR=0, EN=0)

</details>

## Module : `core`

- **Présence** : 75/75 fichiers (100.0%)
- **Traduits effectivement** : 64/64 (100.0%)
- **Non traduits (copiés mais en anglais)** : 0
- **Manquants** : 0
- **Indéterminés (trop courts)** : 11

## Module : `utility`

- **Présence** : 2/2 fichiers (100.0%)
- **Traduits effectivement** : 2/2 (100.0%)
- **Non traduits (copiés mais en anglais)** : 0
- **Manquants** : 0

## Méthodologie

- **Présence** : un fichier est compté comme présent si son chemin relatif existe à l'identique dans `<module>-fr/`.
- **Traduction effective** : heuristique combinant la densité de caractères accentués (é, è, à, ç…) et le ratio mots français vs anglais courants. Score `>= 0.05` = traduit.
- **Limites** : un fichier essentiellement composé de code, d'identifiants techniques ou très court peut être classé incorrectement. Le GLOSSAIRE.md autorise (et exige) de garder en anglais les clés système, prénoms d'agents, codes de menu, balises XML, blocs de code, etc.
- **Extensions analysées** : `.md`, `.yaml`, `.yml`, `.csv`. Les `.json` (souvent métadonnées système) sont ignorés.