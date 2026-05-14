# Template de PRD — Un menu, pas un squelette

C'est un menu de sections parmi lesquelles le facilitateur choisit selon ce dont le produit, les enjeux, l'audience, et les entrées existantes ont réellement besoin. Les projets hobby utilisent l'épine dorsale essentielle et s'arrêtent. Les initiatives d'entreprise, les soumissions réglementées, et les lancements grand public ajoutent des clusters depuis le menu adapt-in ci-dessous. **N'inclus jamais une section juste parce qu'elle apparaît ici.** Abandonne, réordonne, renomme, combine — peu importe ce dont le PRD a besoin.

---

## Épine dorsale essentielle *(presque toujours présente)*

```markdown
---
title: {Product Name}
created: {YYYY-MM-DD}
updated: {YYYY-MM-DD}
---

# PRD: {Product Name}
*Working title — confirm.*

## 0. Document Purpose
[1 paragraph: who this PRD is for (PM, stakeholders, downstream workflow owners), how it's structured (Glossary-anchored vocabulary, features grouped with FRs nested, assumptions tagged inline and indexed). If UX work or other inputs already exist, name them here and reference where they live — this PRD builds on them, it does not duplicate.]

## 1. Vision
[2-3 paragraphs: what this is, what it does for the user, why it matters. Compelling enough to stand alone.]

## 2. Target User

### 2.1 Primary Persona
[Vivid but tight. Who they are, how this product fits their context.]

### 2.2 Jobs To Be Done
[Bulleted. Emotional, social, functional, contextual — whichever apply. Even "this is for me as the builder" is a valid persona for a hobby project.]

### 2.3 Non-Users (v1) *(add when the audience boundary is non-obvious)*
[Who this is explicitly not for in v1.]

### 2.4 Key User Journeys
*Named flows the product enables — one line each, numbered globally as UJ-1 through UJ-N for downstream traceability. Detailed flow design (steps, screens, edge flows) is the job of the UX workflow, not this PRD. Features in §4 may reference journeys by ID inline ("realizes UJ-3").*

- **UJ-1** — [Named flow, one line: who does what, to what end.]
- **UJ-2** — ...

[For hobby/utility projects, 1-3 journeys may be enough. For complex multi-feature products (onboarding, checkout, multi-step approvals), expand. For libraries/CLIs with minimal flow, reduce to a single line or collapse into §2.2 JTBD.]

## 3. Glossary
*Downstream workflows and readers must use these terms exactly.*

- **Term** — Definition. Relationships to other Glossary terms. Cardinality where relevant.
- **Term** — ...

[Every domain noun the rest of the document uses. Defined once. No synonyms anywhere else in the PRD.]

## 4. Features
*Each subsection is a coherent feature: behavioral description first, FRs nested under it, optional feature-specific NFRs and notes. FRs are numbered globally (FR-1 through FR-N) so downstream artifacts have stable references even if features get reorganized. Reference user journeys by ID inline ("realizes UJ-2") where the chain matters.*

### 4.1 {Feature Name}
**Description:** [Behavioral narrative — how this feature works, who uses it, the user experience, edge cases. Use Glossary terms exactly. Embed inline `[ASSUMPTION: ...]` tags where you inferred without confirmation.]

**Functional Requirements:**
- **FR-1** — [Actor] can [capability] [under conditions / with measurement].
- **FR-2** — ...

**Feature-specific NFRs:** *(only if any apply uniquely to this feature)*
- Performance / security / accessibility / etc. specific to this feature.

**Notes:** *(optional — open questions specific to this feature, `[NOTE FOR PM]` callouts)*

### 4.2 {Feature Name}
...

## 5. Non-Goals (Explicit)
[Bulleted. What this product is *not* and what it will *not* do in v1. Does outsized work for downstream readers and workflows — prevents the "let me also add this nearby thing" failure mode at every level (epic, ticket, code). Inline `[NON-GOAL for MVP]` callouts within §4 Features cover deferred items within features; this section captures the broader "we are not building X / we are not becoming Y" statements.]

## 6. MVP Scope

### 6.1 In Scope
[Bulleted, crisp.]

### 6.2 Out of Scope for MVP
[Bulleted. Each item with a one-line reason if the reason matters. Mark items deferred to v2/v3 explicitly. Add `[NOTE FOR PM]` callouts where a deferred item is emotionally load-bearing — flags it for revisit if timeline permits.]

## 7. Success Metrics

**Primary**
- Metric — definition, target.

**Secondary**
- Metric — definition, target.

**Counter-metrics (do not optimize)**
- Metric — why this should *not* be optimized.

[Length scales with stakes. Hobby/utility PRD: a single sentence may be enough ("Success: I use this weekly and don't abandon it after a month"). Public launch / enterprise: full quantitative breakdown with measurement methods. Counter-metrics are as load-bearing as primary metrics — they prevent the architect from optimizing the wrong thing and the dev from gaming the wrong target.]

## 8. Open Questions
[Numbered. Things still unknown — they become future tickets or follow-up research, not silent gaps.]

## 9. Assumptions Index
*Every `[ASSUMPTION]` from the document, surfaced for explicit confirmation:*
- Inline assumption from §X.Y — short description.
- ...
```

---

## Menu adapt-in *(ajoute les clusters que le produit appelle)*

### Qualité et forme transversales *(la plupart des PRD non triviaux)*
- **Cross-Cutting NFRs** — exigences non fonctionnelles à l'échelle système non liées à une seule fonctionnalité (performance, sécurité, fiabilité, observabilité). À ajouter quand les attributs de qualité à l'échelle système sont significatifs.
- **Constraints and Guardrails** — Safety, Privacy, Cost. Sous-section par cluster. À ajouter quand l'un de ceux-ci est une vraie préoccupation.
- **Why Now** — à ajouter quand le timing est porteur (un changement de marché, un catalyseur technologique, une échéance réglementaire). À abandonner quand le timing est incident.

### Produits grand public / marqués
- **Aesthetic and Tone** — références visuelles, anti-références, voix/ton pour tout texte généré par le produit.
- **Information Architecture** — surfaces de premier niveau, navigation, écrans.
- **Monetization** — gratuit vs. payant, hypothèses de tarification, politique publicitaire.
- **Platform** — web, mobile, PWA, native, v1 vs. v2+.

### Initiatives d'entreprise
- **Stakeholders and Approvals** — qui doit signer, à quelle étape.
- **Risk and Mitigations** — registre de risques opérationnels, sécurité, business, réputationnels.
- **ROI / Business Case** — bénéfice quantifié, coût, période de retour sur investissement.
- **Operational Requirements** — SLAs, RTO/RPO, palier de support, attentes d'astreinte.
- **Integration and Dependencies** — SSO, systèmes d'entreprise existants, sources de données, consommateurs en aval.
- **Rollout and Change Management** — plan de déploiement phasé, formation, communication interne.
- **Data Governance** — résidence, souveraineté, classification, rétention.
- **Audit Trail / Decision Provenance** — exigences de documentation formelle pour les environnements réglementés.

### Domaines réglementés
- **Compliance and Regulatory** — HIPAA, PCI-DSS, GDPR, SOX, SOC 2, Section 508 / WCAG 2.1 AA, FedRAMP, etc. — selon ce qui s'applique. Si un item nécessite de la profondeur, ajoute un callout `[NOTE FOR PM]` pour revisiter ou déplacer vers un addendum.

### Produits pour développeurs (bibliothèques, APIs, CLIs, SDKs)
- **API Contracts / Public Surface** — formes d'endpoints, politique de breaking changes.
- **Versioning and Deprecation Policy**.
- **Performance Budgets** — latence, débit, usage de ressources.
- **Language / Runtime Targets and Dependency Policy**.

### Embarqué / matériel
- **Hardware Constraints** — mémoire, énergie, facteur de forme.
- **Deployment and Update Mechanism** — OTA, manuel, basé sur image.
- **Environmental and Reliability Requirements**.

### Tout-inclus à petit scope *(à utiliser quand le scope vaut 1-2 stories et que l'utilisateur veut un artefact capturé unique — choisi pendant le Right-skill check dans Discovery)*
- **Stories** — specs au niveau story listées en ligne à la fin du document. Chaque story : *"As a [persona], I can [action] [under conditions]. Acceptance: [testable criteria]."* Numérotées Story-1, Story-2, ... pour référence. Associe avec un §1 Vision très léger, §2 Target User (souvent juste JTBD + un UJ), §3 Glossary (poignée de termes), §4 Features (souvent une seule feature), §6 MVP Scope (in/out très serré). Le doc entier tient sur une page ou deux et capture l'intention + les stories implémentables au même endroit. Si l'utilisateur ne veut pas du tout l'artefact capturé, `bmad-quick-dev` est le meilleur chemin — ce cluster est uniquement pour « je veux un doc *et* les stories ».

---

## Notes pour le facilitateur

- **L'épine dorsale essentielle est le plancher, pas le plafond.** Un PRD hobby peut garder les dix sections courtes. Un PRD d'entreprise superpose plusieurs clusters depuis le menu adapt-in.
- **§3 Glossary avant §4 Features.** La mécanique n'introduit jamais un nouveau nom commun de domaine sans l'ajouter au Glossary dans la même passe. Persona, JTBD, et Journeys peuvent utiliser des termes du Glossary avant que §3 ne les définisse formellement — le contexte est inférable ; le Glossary sert d'ancrage en aval.
- **§2.4 Key User Journeys sont brefs.** Une ligne chacun. Numérotés globalement (UJ-1 à UJ-N) afin que architecture, epics, stories, et tickets puissent les référencer par ID stable. Le design détaillé de flux se passe dans le workflow UX — pas ici.
- **§4 Features pattern à toute échelle.** Description → FRs imbriquées → NFRs optionnelles → notes optionnelles. PRD hobby : un court paragraphe et trois FRs par feature. Feature d'entreprise : description multi-paragraphes, quinze FRs, plusieurs NFRs spécifiques à la feature, questions ouvertes. Même forme, profondeur différente.
- **Les callouts `[ASSUMPTION]`, `[NON-GOAL]`, `[v2 — out of MVP]`, `[NOTE FOR PM]` sont de première classe.** Ils signalent aux lecteurs en aval et à la prochaine session de travail. Chaque `[ASSUMPTION]` atterrit dans §9 Assumptions Index.
- **Quand UX est *entrée* du PRD** (journeys déjà conçus ailleurs) : §2.4 nomme les journeys par ID et pointe vers le doc UX existant. Référence, ne duplique pas.
- **Quand UX est *sortie* du PRD** (pas encore de travail UX — `bmad-create-ux-design` en aval le produira) : §2.4 capture l'intention du PM sur quels journeys existent ; UX les élabore en flux détaillés en aval.
- **§7 Success Metrics s'échelonne avec les enjeux** mais est toujours présent. Les contre-métriques comptent autant que les métriques primaires — elles façonnent ce qu'il ne faut PAS optimiser.
- **Option tout-inclus à petit scope.** Quand le scope est vraiment 1-2 stories et que l'utilisateur veut un artefact unique au lieu de lancer un workflow `bmad-create-story` séparé, ajoute le cluster adapt-in *Stories* : §1-§6 légères plus §Stories en ligne à la fin. Le doc entier tient sur une page ou deux. C'est une forme de PRD valide pour du travail minuscule — ne t'en excuse pas.
- **Adapte la numérotation des sections.** L'épine dorsale utilise 0-9 ; les ajouts adapt-in s'insèrent où ils se lisent le mieux (par ex. Aesthetic & Tone avant §3 si le branding est fondamental, Compliance après §5 Non-Goals, Constraints & Guardrails entre Features et Non-Goals, Stories tout à la fin après Assumptions Index).
