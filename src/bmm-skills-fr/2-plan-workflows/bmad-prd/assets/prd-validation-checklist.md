# Checklist de validation du PRD

Chargée par le subagent validateur du PRD. Pour chaque item, retourne `{id, status: pass|fail|warn|n/a, severity: low|medium|high|critical, location, note}`. Saute les items non applicables aux enjeux convenus. Cite des emplacements spécifiques du PRD — jamais de critique abstraite.

## Quality

- **Q-1. Densité d'information.** Les phrases portent du poids. Signale le remplissage, les atténuations, et le rembourrage conversationnel.
- **Q-2. Mesurabilité.** Là où la mesure compte, les FRs et Success Metrics sont mesurables ; les adjectifs subjectifs sont signalés. Les contre-métriques sont nommées quand Success Metrics existe.
- **Q-3. Traçabilité.** Là où la chaîne compte, les FRs nomment leur lien à un user journey ou à un critère de succès en ligne.
- **Q-4. Vision et JTBDs concrets.** Vision est spécifique et tient seule — pas une liste de fonctionnalités générique. Les JTBDs sont ancrés à l'audience, non abstraits.
- **Q-5. Non-Goals explicites.** Une section Non-Goals est présente là où elle ferait un vrai travail ; callouts en ligne `[NON-GOAL]` et `[v2]` là où les omissions seraient sinon silencieusement supposées.
- **Q-6. Double-audience et autonome.** Chaque section a du sens extraite seule (références croisées via termes de Glossary, non « voir ci-dessus ») ; le PRD est lisible par les humains et structuré proprement pour l'extraction de sources en aval par les workflows UX, architecture, et création de stories.

## Discipline

- **D-1. Capacités, pas implémentation.** Les FRs décrivent ce que les utilisateurs/systèmes peuvent faire, pas comment. Signale les noms de technologie, les choix de bibliothèques, les décisions d'architecture.
- **D-2. Fidélité aux entrées.** Les exigences des documents d'entrée (brief, recherche, PRD antérieur) sont encore dans le scope ou explicitement gérées via Non-Goals ou `[ASSUMPTION]`.
- **D-3. Personas ancrés.** Si des personas existent, ils sont ancrés dans la recherche ou marqués `[ILLUSTRATIVE]`. Chaque persona pilote au moins une décision.
- **D-4. Pas de théâtre d'innovation.** Les revendications de nouveauté sont réelles, non inventées.

## Intégrité structurelle

- **S-1. Intégrité du Glossary.** Chaque nom commun du domaine est défini dans le Glossary et utilisé identiquement partout. Signale la dérive (casse, pluriel, synonymes) et les entrées candidates manquantes.
- **S-2. Continuité des IDs.** Les IDs FR / UJ / Story sont contigus, uniques, et les références croisées résolvent.
- **S-3. Index des hypothèses.** Chaque `[ASSUMPTION: ...]` en ligne apparaît dans l'Assumptions Index et vice versa.
- **S-4. Densité d'items ouverts.** Compte Open Questions + `[ASSUMPTION]` + `[NOTE FOR PM]`. Drapeau rouge si la densité est élevée par rapport aux enjeux convenus.

## Stakes-gated

- **STK-1. Sections requises.** Le PRD inclut les sections que les enjeux convenus et le type de produit justifient.
