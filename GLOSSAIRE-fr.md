# Glossaire BMAD Définitif — Version Française (Guide de Traduction Strict)

> **IMPORTANT POUR LES ASSISTANTS IA :** Ce document est votre System Prompt de référence. Vous devez appliquer ces règles avec une rigueur absolue. Toute déviation corrompra le code source du framework et brisera la logique conditionnelle des templates.

---

## 1. 🔒 SANCTUAIRE ABSOLU (NE JAMAIS TRADUIRE)

La modification (même un simple espace ou un changement de casse) des éléments suivants provoquera des crashs de compilation. Ils doivent être recopiés **à l'identique**.

### Variables Système & Templates

- Variables simples : `{communication_language}`, `{document_output_language}`, `{user_skill_level}`, `{user_name}`, `{output_folder}`, `{project-root}`, `{project_name}`, `{planning_artifacts}`, `{implementation_artifacts}`, `{project_knowledge}`, `{directory_name}`, `{value}`
- Variables de template : `{{module}}`, `{{date}}`, `{{language}}`, `{{framework}}`
- Logique conditionnelle : `{{#if ...}}...{{/if}}`, `{{#unless ...}}...{{/unless}}`
- Placeholders d'activation : `{agent-file-basename}`, `{MENU_STEP}`, `{HELP_STEP}`, `{HALT_STEP}`, `{INPUT_STEP}`, `{EXECUTE_STEP}`, `{AGENT_SPECIFIC_STEPS}`, `{DYNAMIC_HANDLERS}`

### Identifiants & Noms d'Agents

Les prénoms sont des identifiants système. **Règle générale : ne jamais les franciser.**

- Agents `bmm` : `Mary` (analyst), `Winston` (architect), `John` (pm), `Bob` (sm), `Sally` (ux-designer), `Paige` (tech-writer), `Barry` (quick-flow-solo-dev).
- Agents `cis` (méthodes créatives) : `Carson`, `Dr. Quinn`, `Maya`, `Victor`, `Spike`, `Sophia`, `Leonardo di ser Piero`, `Salvador Dali`, `Edward de Bono`, `Joseph Campbell`, `Steve Jobs`.

**🟡 Exception documentée — Amélie (dev) :** Dans ce fork, l'agent `dev` (Implementation Engineer) a été délibérément francisé de `Amelia` → `Amélie` par le project owner. Cette exception est unique, intentionnelle, et doit être préservée à TOUS les emplacements (CSV `default-party.csv`, YAML `dev.agent.yaml`, prompts, workflows). Le test [`02-agent-names-intact.js`](test/language-fr/02-agent-names-intact.js) tolère explicitement les deux formes comme équivalentes.

⚠️ N'ajoutez **aucune autre francisation** — toutes les autres références à des prénoms d'agents doivent rester strictement identiques à l'amont.

### Triggers & Regex

Les codes et instructions de déclenchement parsés par le code :

- Codes de menu : `BP`, `RS`, `CB`, `CP`, `VP`, `EP`, `CE`, `IR`, `CC`, `CA`, `SP`, `CS`, `DS`, `CR`, `QA`, `CU`, `DP`, `WD`, `US`, `MG`, `ER`.
- Instructions regex : Ne jamais traduire la chaîne `fuzzy match on`. (Exemple à conserver tel quel : `BP or fuzzy match on brainstorm-project`).

### Balises XML

Les fichiers Markdown contiennent du XML. **Traduisez le texte à l'intérieur, JAMAIS la balise.**

- `<step n="1">`, `<rules>`, `<r>`, `<persona>`, `<menu>`, `<agent>`, `<action>`, `<example>`.

---

## 2. ⚠️ RÈGLE VITALE : CLÉS SYSTÈMES VS LIBELLÉS (FICHIERS .CSV ET .YAML)

Dans les fichiers de données et de configuration, il faut séparer la logique interne de l'affichage utilisateur.

- **CLÉS, IDs, CODES (Pour la machine) = NE JAMAIS TRADUIRE.**
- **NOMS, LIBELLÉS, DESCRIPTIONS (Pour l'humain) = TRADUIRE.**

**Exemple concret (Typologies de projets) :**

- Clé interne (INTACTE) : `brownfield`
- Libellé utilisateur (TRADUIT) : `Projet existant (Brownfield)`
- Clé interne (INTACTE) : `greenfield`
- Libellé utilisateur (TRADUIT) : `Nouveau projet (Greenfield)`

_Si vous traduisez une clé (ex: remplacer `brownfield` par `projet_existant`), la logique conditionnelle du framework plantera._

---

## 3. ⚠️ PIÈGES ANTI-HALLUCINATION (RÈGLES POUR IA)

1. **Aucune invention :** Si un terme technique n'a pas d'équivalent clair, le garder en anglais.
2. **Structure Intacte :** Ne JAMAIS fusionner ou diviser des fichiers, ne JAMAIS ajouter ou supprimer de lignes vides. Le parseur est extrêmement sensible aux sauts de ligne.
3. **Respect des compteurs :** Si l'original a 8 items dans une liste à puces, la traduction doit avoir exactement 8 items.
4. **YAML Flow :** Ne JAMAIS traduire les valeurs booléennes `true` ou `false` (ex: `required: true`).
5. **Markdown :** Préserver les emojis (✅, 🚨), ne pas traduire le contenu des blocs de code (`...`), et traduire uniquement le texte d'ancrage des liens `[texte à traduire](chemin/intact)`.

---

## 4. 🎯 DICTIONNAIRE MÉTIER OBLIGATOIRE

Afin de ne pas perdre les utilisateurs familiers avec la méthode BMAD, utilisez cette nomenclature hybride stricte.

### Concepts Cœur

| Anglais                        | Traduction Obligatoire           |
| ------------------------------ | -------------------------------- |
| Skill                          | Skill                            |
| User Story                     | Cas d'usage / User Story         |
| Epic                           | Thème / Epic                     |
| Product Requirements Doc (PRD) | Cahier des charges produit (PRD) |
| Acceptance Criteria (AC)       | Critères d'acceptation (CA)      |
| Sprint                         | Sprint                           |
| Backlog                        | Backlog                          |
| Brainstorm                     | Brainstorming                    |
| Sidecar                        | Sidecar                          |

### Workflows & Actions BMAD

| Anglais                  | Traduction Obligatoire                       |
| ------------------------ | -------------------------------------------- |
| Create Story             | Définir le cas d'usage (Create Story)        |
| Dev Story                | Développer le cas d'usage (Dev Story)        |
| Epic Retrospective       | Rétrospective du thème (Epic Retrospective)  |
| Correct Course           | Changement de cap (Correct Course)           |
| Implementation Readiness | Préparation à l'implémentation               |
| Create PRD               | Rédiger le cahier des charges (Create PRD)   |
| Validate PRD             | Valider le cahier des charges (Validate PRD) |
| Create Architecture      | Concevoir l'architecture                     |
| Sprint Planning          | Planification de sprint                      |
| Code Review              | Revue de code                                |

### Rôles (Personas)

| Anglais                            | Traduction Obligatoire                 |
| ---------------------------------- | -------------------------------------- |
| Strategic Business Analyst         | Analyste Métier Stratégique            |
| Requirements Expert                | Experte en Exigences                   |
| System Architect                   | Architecte Système                     |
| Technical Design Leader            | Responsable de Conception Technique    |
| Senior Implementation Engineer     | Ingénieur d'Implémentation Senior      |
| Investigative Product Strategist   | Stratège Produit Investigateur         |
| Technical Scrum Master             | Scrum Master Technique                 |
| Story Preparation Specialist       | Spécialiste en Préparation de Stories  |
| Technical Documentation Specialist | Spécialiste en Documentation Technique |
| User Experience Designer           | Designer d'Expérience Utilisateur      |
| Quick Flow Specialist              | Spécialiste du Flux Rapide             |

---

## 5. 📄 DIRECTIVES SPÉCIFIQUES PAR TYPE DE FICHIER

### Fichiers `.agent.yaml`

- **TRADUIRE :** `title`, `capabilities`, `role`, `identity`, `communication_style`, `principles`, `critical_actions`, et les valeurs textuelles de la clé `description`.
- **NE PAS TRADUIRE :** Les clés elles-mêmes, `id`, `name`, `icon`, `module`, `hasSidecar`, `trigger`, `exec`, `workflow`, `data`.

### Fichiers `workflows` (.yaml / .yml / .md)

- **TRADUIRE :** Titres (`title`), descriptions (`description`), libellés (`label`), aides (`help`), résumés (`summary`), instructions textuelles dans le Markdown.
- **NE PAS TRADUIRE :** Clés YAML, IDs, chemins de fichiers, commandes CLI (ex: `/bmad-plan`).

---

## 6. ✅ CHECKLIST DE VALIDATION POST-TRADUCTION

Pour chaque fichier généré, l'IA (ou l'humain) doit vérifier implicitement :

- [ ] Les balises `{...}` et `{{...}}` sont intactes (sans espaces ajoutés ni traduction).
- [ ] Les Triggers (BP, CP...) n'ont pas été traduits ou modifiés.
- [ ] Les Clés/IDs dans les `.csv` et `.yaml` sont restés en anglais.
- [ ] Le dictionnaire hybride (ex: _Définir le cas d'usage (Create Story)_) a été rigoureusement respecté.
- [ ] Les balises `<xml>` encadrent toujours leur contenu correctement sans avoir été traduites.
