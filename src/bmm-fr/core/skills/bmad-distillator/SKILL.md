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

| # | Stade | Objectif |
|---|-------|---------|
| 1 | Analyser | Exécuter le script d'analyse, déterminer le routage et le découpage |
| 2 | Compresser | Lancer le(s) sous-Agent(s) compresseur(s) pour produire le distillat |
| 3 | Vérifier & Exporter | Contrôle d'exhaustivité, contrôle de format, enregistrement de la sortie |
| 4 | Valider le Cycle Complet | (uniquement --validate) Reconstruire et comparer avec les originaux |

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

3. **Détermination du format d'exportation.** En associant les anticipations de division (Stade 1) à l'envergure confirmée du rendu :

   **Distillat unique** (≤~5 000 tokens ou un paramètre token_budget maintenu intact) :

   Enregistrez sous la forme d'un simple fichier en y greffant le frontmatter :

   ```yaml
   ---
   type: bmad-distillate
   sources:
     - "{chemin relatif vers fichier source 1}"
     - "{chemin relatif vers fichier source 2}"
   downstream_consumer: "{consommateur ou 'general'}"
   created: "{{date}}"
   token_estimate: {estimation indicative en tokens}
   parts: 1
   ---
   ```

   **Distillat fragmenté** (>~5 000 tokens, ou imposé par le token_budget) :

   Aménagez un sous-dossier `{base-name}-distillate/` embarquant :

   ```
   {base-name}-distillate/
   ├── _index.md           # Clés, axes transversaux, descriptif des sections (manifest)
   ├── 01-{topic-slug}.md  # Tronçon monolithique
   ├── 02-{topic-slug}.md
   └── 03-{topic-slug}.md
   ```

   Le fichier `_index.md` détient :
   - Frontmatter agrégeant sources (accès relatifs reliant au dossier du distillat jusqu'aux bases d'origine)
   - Accompagnement en 3-5 traits pour l'orientation (ce qui a été épuré/et sa provenance)
   - Manifest des volets de découpe : intitulé de fichier par tronçon + bref résumé (1 ligne)
   - Considérations transversales englobant ou débordant plusieurs unités segmentées

   Chaque sous-section fait office de format clos — sollicitable unitairement. Munissez les extraits d'une brève estampille liminaire formatée : "This section covers [topic]. Part N of M."

   Les liens sources logés via frontmatter répondront impérativement à des trajectoires localisées au regard du socle du distillat.

4. **Mesurer le distillat.** Assurez le passage de l'exécutif `scripts/analyze_sources.py` sur ce/ces fichier(s) du rendu propre final de sorte d'obtenir la bonne métrique "token" visée à l'export. Retenez la mention de la sortie `total_estimated_tokens` livrée comme valeur globale indexée pour `distillate_total_tokens`.

5. **Remettre vos conclusions.** Retournez immanquablement un constat sous encodage JSON organisé :

   ```json
   {
     "status": "complete",
     "distillate": "{chemin fichier ou chemin répertoire}",
     "section_distillates": ["{chemin1}", "{chemin2}"] ou null,
     "source_total_tokens": N,
     "distillate_total_tokens": N,
     "compression_ratio": "X:1",
     "source_documents": ["{chemin1}", "{chemin2}"],
     "completeness_check": "pass" ou "pass_with_additions"
   }
   ```

   Où `source_total_tokens` traduit le verdict initial à l'analyse (Stade 1) et `distillate_total_tokens` la captation du pas numéro 4. Cet indicateur de ratio `compression_ratio` s'observe par : `source_total_tokens / distillate_total_tokens` mis en page par la déclinaison formelle "X:1" (ex: "3.2:1").

6. Si la clé de lancement signalait `--validate`, passez sans délai au Stade 4. Sinon, l'activité s'achève ici.

### Stade 4 : Validation en Cycle Complet (--validate uniquement)

Ce process valide par un tour probatoire le maintien du distillat comme porteur sans perte puisque l'idée consiste à recomposer une abstraction du fond depuis cet unique extrait allégé. Sollicité particulièrement sur de la donnée dont le degré de préjudice (pour lacune info) excède des normes, ou faisant figure de filtre de très haute instance lié aux travaux d'un workflow critique aval. Non prescrit sur de l'usage classique du quotidien — ajout non anodin lié à la facturation des tokens par sollicitation du sous-Agent dédié.

1. **Lancez un Agent reconstructeur** en chargeant `agents/round-trip-reconstructor.md`. Veillez formellement à relayer de manière stricte et EXCLUSIVE l'unique pont au fichier épuré/distillat (ou chemin sur le socle `_index.md` en format splitté) — ledit agent est absolument tenu sous secret au demeurant par rapport au document originel dont les traces et données ont été édictées puis purgées !

   Contexte à divisions multiples, lancez l'ingérence en parallèle de sous-Agents (un par bloc de coupe). Chacun d'eux recueillant sa division assortie du contexte mère de la souche structurelle issue de `_index.md`.

   **Dégradation gracieuse :** À défaut d'accessibilité avérée aux méthodes d'invocation des instances filles propres, il sera interdit à ce sous-groupe (disposant de la réalité primitive ancrée par mémorisation liée en phase 1-2 d'opérer ces requêtes par ses capacités "propres"). Transmettez que cette phase doit opérer "uniquement à travers un pool fonctionnellement ouvert rattaché aux capacités en de sous-Agents distanciés de contexte global", et éludez ce Stade.

2. **Rapatrier ces essais recréés.** Le compilateur d'analyse retourne alors l'adresse des livrables recréés pour stationner à proximité du socle d'origine allégé (le distillat final de l'(Agent d'Étape 2).

3. **Opérer la réconciliation via Diff Sémantique.** Incorporez conjointement données des parquets primaires avec ce rendu récent de recomposition. Section après section comparez :
   - La nature intrinsèque des informations mères est-elle reflétée à travers le jumeau recréé ?
   - Les particularismes affilés sont-ils là avec acuité et discernement ? (chiffres, nomenclatures des actes ou noms de validation et seuils) ?
   - Intégrité liée aux raisons d'êtres fondatrices de chaque règle est-elle constante et fluide ?
   - Le pendant reconstitué présente-il des données inattendues non certifiées sur le terreau source ? (indicateur pointant une imagination comblant d'hypothétiques vides ou hallucinations du modèle générant).

4. **Produire l'Audit Diagnostique** que vous fixerez contre votre composante "distillat" sous affichage standard `-validation-report.md` :

   ```markdown
   ---
   type: distillate-validation
   distillate: "{chemin distillat}"
   sources: ["{chemins sources}"]
   created: "{{date}}"
   ---

   ## Bilan Sommaire
   - Statut: PASS | PASS_WITH_WARNINGS | FAIL
   - Conservation Informative: {estimation taux pourcentage}
   - Filles et Ruptures de fil info localisées: {compte}
   - Hallucinations reconnues: {compte}

   ## Ruptures Mémorielles (Manque du jet reconstruisant d'une info existante)
   - {intitulé du point manqué} — Donnée Primaire d'Origine: {fichier/feuillet de la source}, Tronçon source: {la section incréminée originairement}

   ## Faux Positifs Assumés ou Contenu Distrait/Inventé
   - {aperçu du leurre} — Tente à priori de combler un axe défaillant positionné vers : {la section défaillante en corolaire de sa présence fictive}

   ## Traceurs de Vices Possibles (Reconnu au travers du reconstructeur ciblé)
   - {marqueur local décrié descriptif}
   ```

5. **Preuve constatant un dommage ou disparition notable**, proposez alors une courte navette opératoire de retouche visant votre allégement certifié — corrigeant en complétant l'attendu amputé n'entrainant point là de processus réitératif à charge globale. Limitation figée actant de l'arbitrage maximal de vos interventions : 2 exécutions au demeurant.

6. **Purgation achevée** — broyez et oblitérez de concert tous documents à portée reconstructionnelle mis sur pied momentanément juste après que l'acte finalisant le script du diagnostic de rapport se soit vu gravé et enregistré.