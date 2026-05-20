# Validate

Le playbook de l'intention Validate. Autonome — cette intention critique un PRD existant sans le modifier et se termine une fois que l'utilisateur a consulté le rapport ; elle n'exécute pas Finalize. Le pipeline de synthèse ci-dessous est également réutilisé pour les demandes de rapport en cours de session durant Create/Update.

## Orient

Extraction de sources contre `.decision-log.md`, les données d'entrée d'origine, et le PRD/addendum eux-mêmes. Déléguer aux sous-agents selon la discipline PRD → « Extraire, ne pas ingérer » (dans SKILL.md) ; le parent assemble à partir des extraits.

## Run the Reviewer Gate

Exécuter la Reviewer Gate (voir SKILL.md) contre `prd.md` (et `addendum.md` si présent). Le rubric walker est l'entrée par défaut dans le menu de la gate ; sous l'intention Validate, il exécute également le pipeline de synthèse ci-dessous. La passe de discipline Finalize durant Create/Update ne produit PAS de rapport — les résultats restent dans la conversation.

## Rubric-walker pipeline

Le rubric walker est l'entrée de revue principale. Le lancer comme sous-agent avec cette invite :

> You are validating a PRD against the quality rubric at `{workflow.validation_checklist_template}`. Read the full rubric first, then read `prd.md` (and `addendum.md` if present). Form a judgment per dimension — _strong / adequate / thin / broken_ — and write findings only where they add information. Cite specific PRD locations and quote phrases. Severity ranks impact on the PRD's usefulness, not how easy the fix is. Write your review to `{doc_workspace}/review-rubric.md` in the format the rubric specifies. Return ONLY a compact summary (overall verdict, dimension verdicts, finding counts by severity, file path).

La Reviewer Gate peut également envoyer des évaluateurs supplémentaires depuis `{workflow.finalize_reviewers}` (adversarial-general par défaut) et tout évaluateur ad hoc que le parent juge nécessaire. Chacun écrit sa revue dans `{doc_workspace}/review-{slug}.md` et retourne un résumé compact. Exécuter en parallèle.

## Synthesis pipeline

Une fois que chaque évaluateur sélectionné a retourné ses résultats, le parent synthétise un rapport consolidé unique. **Ne pas sauter cette étape sous l'intention Validate** — elle produit l'artefact persistant que l'utilisateur ouvre.

### Inputs

- `{doc_workspace}/review-rubric.md` — primaire, structuré selon les sept dimensions
- Zéro ou plusieurs fichiers `{doc_workspace}/review-{slug}.md` — évaluateurs supplémentaires (adversarial, etc.)
- `{workflow.validation_report_template}` — le squelette HTML

### What the synthesis pass does

1. Lire chaque fichier d'évaluateur dans `{doc_workspace}/review-*.md`.
2. Remplir le squelette HTML :
   - **Header.** Nom et chemin du PRD. Note dérivée des verdicts du rubric et des comptages de sévérité : _Excellent_ = toutes les dimensions strong/adequate, aucun résultat high/critical · _Good_ = ≤1 dimension thin, aucun résultat critical · _Fair_ = plusieurs dimensions thin ou tout résultat high · _Poor_ = toute dimension broken ou tout résultat critical. Définir la classe `grade-excellent | grade-good | grade-fair | grade-poor` correspondante.
   - **Synthesis block.** Reprendre le paragraphe _Overall verdict_ du rubric comme introduction ; si des évaluateurs adversarial ou ad hoc modifient substantiellement le tableau, ajouter un second paragraphe nommant ce qu'ils ont mis en évidence.
   - **Dimension summary cards.** Une par dimension évaluée. Texte du verdict coloré. Omettre les dimensions que le rubric a marquées n/a pour ce PRD (par ex. la facilité d'utilisation en aval pour un PRD autonome).
   - **Dimension sections.** Un `<section class="dimension">` par dimension évaluée, dans l'ordre du rubric. `<details open>` pour _thin_ et *broken* ; fermé pour _strong_ et _adequate_. Chacun contient le jugement de la dimension (la prose de review-rubric.md) et la liste des résultats.
   - **Reviewer sections.** Un `<section class="reviewer-section">` par évaluateur supplémentaire ayant été exécuté. Le chemin du fichier source va dans le `<span class="reviewer-source">`. Fermé par défaut. Les résultats adversarial conservent leur voix adversariale — ne pas les adoucir.
   - **Mechanical notes.** Liste à puces provenant de la section « Mechanical notes » du rubric. Omettre le bloc s'il est vide.
   - **Footer.** Chemin du rubric, horodatage ISO.
3. Écrire le HTML rempli dans `{doc_workspace}/validation-report.html`.
4. Écrire le pendant Markdown dans `{doc_workspace}/validation-report.md` (même contenu, regroupé par sévérité plutôt que par dimension — voir le format ci-dessous ; c'est la forme canonique pour une relecture en aval).
5. Ouvrir le HTML dans le navigateur par défaut :
   ```bash
   python3 -c "import webbrowser, pathlib; webbrowser.open(pathlib.Path('{doc_workspace}/validation-report.html').resolve().as_uri())"
   ```
   Sauter l'étape d'ouverture en mode headless (voir `references/headless.md`).

### Markdown twin format

```markdown
# Validation Report — {prd_name}

- **PRD:** `{prd_path}`
- **Rubric:** `{rubric_path}`
- **Run at:** {ISO timestamp}
- **Grade:** {Excellent | Good | Fair | Poor}

## Overall verdict

{synthesis paragraphs}

## Dimension verdicts

- Decision-readiness — {verdict}
- Substance over theater — {verdict}
- (etc. for each assessed dimension)

## Findings by severity

### Critical (n)

**[Dimension or Reviewer]** — Title (§ location)
{Note}
Fix: {suggested fix}

### High (n)

...

### Medium (n)

...

### Low (n)

...

## Mechanical notes

- {bullet}

## Reviewer files

- `review-rubric.md`
- `review-adversarial-general.md` (if present)
- (etc.)
```

Relancer la validation écrase le rapport consolidé en place. Les fichiers `review-*.md` individuels sont préservés afin que l'utilisateur puisse approfondir chaque point.

## Close

Afficher les chemins des artefacts ; le HTML/Markdown rendu est l'artefact persistant. Proposer systématiquement d'intégrer les résultats dans une Update.
