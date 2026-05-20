---
name: bmad-distillator
description: Compression sans perte de documents sources optimisée pour les LLM. À utiliser lorsque l'utilisateur demande de 'distiller des documents' ou 'confectionner un distillat'.
argument-hint: "[pour créer, fournir des chemins d'entrée] [--validate distillate-path pour confirmer que le distillat est sans perte et optimisé]"
---

# Distillator : Un Moteur de Distillation de Documents

## Vue d'Ensemble

Cette compétence produit des documents hyper-compressés, efficaces en termes de tokens (distillats), à partir de n'importe quel ensemble de documents sources. Un distillat préserve chaque fait, décision, contrainte et relation des sources tout en éliminant toutes les surcharges dont les humains ont besoin et que les LLMs n'utilisent pas. Agissez comme un spécialiste de l'extraction et de la compression de l'information. La sortie est un seul document dense (ou un ensemble fragmenté sémantiquement) qu'un workflow ou un Agent LLM en aval peut consommer comme unique entrée de contexte sans déperdition d'information.

Il s'agit d'une tâche de compression, non pas de résumé. Les résumés sont destructifs (lossy). Les distillats constituent une compression sans perte (lossless) finement réglée pour la consommation des LLM.

## À l'Activation

1. **Valider les entrées.** L'appelant doit fournir :
   - **source_documents** (requis) — Un ou plusieurs chemins de fichiers, chemins de dossiers ou motifs glob à distiller
   - **downstream_consumer** (optionnel) — Quel workflow/Agent consomme ce distillat (ex. "création de PRD", "design d'architecture"). Lorsqu'il est fourni, utilisez-le pour juger le signal par rapport au bruit. S'il est omis, préservez tout.
   - **token_budget** (optionnel) — Taille cible approximative. S'il est fourni et que le distillat le dépasse, déclenchez le fractionnement sémantique.
   - **output_path** (optionnel) — Où enregistrer. S'il est omis, enregistrez à côté du document source principal avec le suffixe `-distillate.md`.
   - **--validate** (flag) — Exécutez un test de reconstruction en cycle complet après avoir produit le distillat.

2. **Routage** — passez au Stade 1.

## Stades

| #   | Stade                    | Objectif                                                                 |
| --- | ------------------------ | ------------------------------------------------------------------------ |
| 1   | Analyser                 | Exécuter le script d'analyse, déterminer le routage et le découpage      |
| 2   | Compresser               | Lancer le(s) sous-Agent(s) compresseur(s) pour produire le distillat     |
| 3   | Vérifier & Exporter      | Contrôle d'exhaustivité, contrôle de format, enregistrement de la sortie |
| 4   | Valider le Cycle Complet | (uniquement --validate) Reconstruire et comparer avec les originaux      |

### Stade 1 : Analyser

Exécutez `scripts/analyze_sources.py --help` puis exécutez-le avec les chemins sources. Utilisez ses recommandations de routage et ses sorties de regroupement pour piloter le Stade 2. NE LISEZ PAS les documents sources vous-même.

### Stade 2 : Compresser

**Mode unique (single)** (routage = `"single"`, ≤3 fichiers, ≤15 000 tokens estimés) :

Générez un sous-Agent en utilisant `agents/distillate-compressor.md` avec l'ensemble des chemins des fichiers sources.

**Mode dispersion (fan-out)** (routage = `"fan-out"`) :

1. Générez un sous-Agent compresseur par groupe issu de la sortie d'analyse. Chaque compresseur ne reçoit que les chemins de fichiers de son groupe et crée un distillat intermédiaire.

2. Une fois tous les compresseurs revenus, générez un sous-Agent ultime **merge compressor** utilisant `agents/distillate-compressor.md`. Passez-lui le contenu des distillats intermédiaires comme entrée (et non les fichiers originaux). Son travail est la déduplication inter-groupes, le regroupement thématique et la compression finale.

3. Nettoyez le contenu du distillat intermédiaire (il n'existe qu'en mémoire, sans sauvegarde sur disque).

**Dégradation gracieuse :** Si le lancement d'un sous-Agent est indisponible, lisez les documents sources et effectuez le travail de compression directement en suivant les mêmes instructions venant de `agents/distillate-compressor.md`. Pour le fan-out, traitez les groupes séquentiellement puis fusionnez.

Le compresseur renvoie un résultat structuré en JSON incluant le contenu du distillat, les titres sources, les entités nommées et une estimation de tokens.

### Stade 3 : Vérifier & Exporter

Après le retour du compresseur (ou compresseur fusionneur) :

1. **Vérification d'exhaustivité.** En vous basant sur la liste des titres et entités nommées rendue par le compresseur, actez que chaque élément apparaît dans le contenu du distillat. En cas de manque constaté, rétroagissez auprès du compresseur pour un passage correctif ciblé — pas une re-compression entière. Limité à un maximum de 2 passes correctives.

2. **Vérification de format.** Assurez-vous que le rendu final observe bien le règlement de conception du distillat :
   - Pas de paragraphes en prose (uniquement des puces)
   - Aucune mise en forme décorative
   - Pas d'éléments redondants
   - Chaque ligne/point est autosuffisant
   - Les domaines thématiques s'adossent scrupuleusement aux titres (headings) en `##`

3. **Détermination du format d'exportation.** En associant la prédiction de fractionnement (Stade 1) à la taille effective du distillat :

   **Distillat unique** (≤~5 000 tokens ou token_budget non dépassé) :

   Enregistrez sous forme d'un fichier unique en ajoutant le frontmatter :

   ```yaml
   ---
   type: bmad-distillate
   sources:
     - '{chemin relatif vers fichier source 1}'
     - '{chemin relatif vers fichier source 2}'
   downstream_consumer: "{consommateur ou 'general'}"
   created: '{date}'
   token_estimate: { estimation indicative en tokens }
   parts: 1
   ---
   ```

   **Distillat fragmenté** (>~5 000 tokens, ou imposé par le token_budget) :

   Créez un dossier `{base-name}-distillate/` contenant :

   ```
   {base-name}-distillate/
   ├── _index.md           # Orientation, éléments transversaux, manifeste des sections
   ├── 01-{topic-slug}.md  # Section autonome
   ├── 02-{topic-slug}.md
   └── 03-{topic-slug}.md
   ```

   Le fichier `_index.md` contient :
   - Frontmatter avec les sources (chemins relatifs depuis le dossier du distillat vers les originaux)
   - Orientation en 3-5 puces (ce qui a été distillé, à partir de quoi)
   - Manifeste des sections : nom de fichier de chaque section + description en 1 ligne
   - Éléments transversaux qui couvrent plusieurs sections

   Chaque fichier de section est autonome — chargeable indépendamment. Incluez une en-tête de contexte d'une ligne : "This section covers [topic]. Part N of M."

   Les chemins des sources dans le frontmatter doivent être relatifs à l'emplacement du distillat.

4. **Mesurer le distillat.** Exécutez `scripts/analyze_sources.py` sur le(s) fichier(s) finaux du distillat pour obtenir un comptage précis des tokens en sortie. Utilisez la valeur `total_estimated_tokens` de cette analyse comme `distillate_total_tokens`.

5. **Reporter les résultats.** Retournez toujours une sortie JSON structurée :

   ```json
   {
     "status": "complete",
     "distillate": "{chemin fichier ou chemin répertoire}",
     "section_distillates": ["{path1}", "{path2}"] ou null,
     "source_total_tokens": N,
     "distillate_total_tokens": N,
     "compression_ratio": "X:1",
     "source_documents": ["{path1}", "{path2}"],
     "completeness_check": "pass" ou "pass_with_additions"
   }
   ```

   Où `source_total_tokens` provient de l'analyse du Stade 1 et `distillate_total_tokens` de l'étape 4. Le `compression_ratio` est `source_total_tokens / distillate_total_tokens` formaté en "X:1" (ex. : "3.2:1").

6. Si le flag `--validate` était spécifié, passez au Stade 4. Sinon, terminé.

### Stade 4 : Validation en Cycle Complet (--validate uniquement)

Ce stade prouve que le distillat est sans perte en reconstruisant les documents sources à partir du distillat seul. À utiliser pour les documents critiques où toute perte d'information est inacceptable, ou comme contrôle qualité pour les workflows aval à forts enjeux. Non recommandé pour un usage courant — ce stade ajoute un coût en tokens significatif.

1. **Lancez l'Agent reconstructeur** en utilisant `agents/round-trip-reconstructor.md`. Transmettez-lui UNIQUEMENT le chemin du fichier distillat (ou le chemin de `_index.md` pour les distillats fragmentés) — il NE DOIT PAS avoir accès aux documents sources d'origine.

   Pour les distillats fragmentés, lancez un reconstructeur par section en parallèle. Chacun reçoit son fichier de section ainsi que `_index.md` pour le contexte transversal.

   **Dégradation gracieuse :** Si le lancement de sous-Agents est indisponible, ce stade ne peut être exécuté par l'Agent principal (il a déjà vu les sources originales). Signalez que la validation en cycle complet requiert le support des sous-Agents et passez ce stade.

2. **Récupérez les reconstructions.** Le reconstructeur renvoie les chemins des fichiers de reconstruction enregistrés à côté du distillat.

3. **Effectuez le diff sémantique.** Lisez à la fois les documents sources originaux et les reconstructions. Pour chaque section de l'original, évaluez :
   - L'information essentielle est-elle présente dans la reconstruction ?
   - Les détails spécifiques sont-ils préservés (chiffres, noms, décisions) ?
   - Les relations et la justification sont-elles intactes ?
   - La reconstruction a-t-elle ajouté des éléments absents de l'original ? (signe d'hallucinations comblant des lacunes)

4. **Produisez le rapport de validation** enregistré à côté du distillat sous le nom `-validation-report.md` :

   ```markdown
   ---
   type: distillate-validation
   distillate: '{chemin distillat}'
   sources: ['{chemins sources}']
   created: '{date}'
   ---

   ## Synthèse de Validation

   - Statut : PASS | PASS_WITH_WARNINGS | FAIL
   - Information préservée : {estimation en pourcentage}
   - Lacunes détectées : {count}
   - Hallucinations détectées : {count}

   ## Lacunes (information présente dans les originaux mais absente de la reconstruction)

   - {description de la lacune} — Source : {fichier original concerné}, Section : {where}

   ## Hallucinations (information dans la reconstruction non traçable aux originaux)

   - {description de l'hallucination} — semble combler une lacune dans : {section}

   ## Marqueurs de Lacunes Possibles (signalés par le reconstructeur)

   - {description du marqueur}
   ```

5. **Si des lacunes sont détectées**, proposez d'effectuer une passe correctrice ciblée sur le distillat — pour ajouter l'information manquante sans recompression complète. Limité à 2 passes correctrices au maximum.

6. **Nettoyage** — supprimez les fichiers de reconstruction temporaires une fois le rapport généré.
