# Glossaire BMAD Définitif — Version Française

Ce document sert de référence stricte pour la traduction de l'écosystème BMAD-METHOD. Il doit être suivi à la lettre par les contributeurs et les assistants IA pour garantir une cohérence totale.

---

## 🎯 Termes Métier Core (Toujours Traduits)

| Anglais | Français |
|---------|----------|
| User Story | Cas d'usage / User Story |
| Acceptance Criteria | Critères d'acceptation |
| Product Requirements Doc (PRD) | Cahier des charges produit (PRD) |
| Epic | Thème / Epic |
| Sprint | Sprint |
| Backlog | Backlog |
| Brainstorm | Brainstorming |
| Research | Recherche |
| Create Brief | Créer le brief |
| Create PRD | Rédiger le cahier des charges |
| Validate PRD | Valider le cahier des charges |
| Create Architecture | Concevoir l'architecture |
| Implementation Readiness | Préparation à l'implémentation |
| Correct Course | Changement de cap |
| Sprint Planning | Planification de sprint |
| Create Story | Définir le cas d'usage (Create Story) |
| Dev Story | Développer le cas d'usage (Dev Story) |
| Code Review | Revue de code |
| Automate | Automatiser |
| Epic Retrospective | Rétrospective du thème (Epic Retrospective) |
| Slash command | Commande slash |
| Menu trigger | Déclencheur (Trigger) |

---

## 🔢 Codes Triggers (NE JAMAIS TRADUIRE)

Conserver exactement ces identifiants dans les textes et les menus : `BP`, `RS`, `CB`, `CP`, `VP`, `EP`, `CE`, `IR`, `CC`, `CA`, `SP`, `CS`, `DS`, `CR`, `QA`, `CU`, `DP`, `WD`, `US`, `MG`, `ER`

---

## 💻 Termes Techniques (NE JAMAIS TRADUIRE)

### Commandes CLI
- `/bmad-plan`, `/bmad-dev`, `/bmad-help`, `/bmad-config`

### Acronymes Tech
- `API`, `HTTP`, `JSON`, `URL`, `JWT`, `OAuth`, `SQL`, `IDE`, `UI`, `UX`, `LLM`, `NLP`

### Mots-clés de Code
- `const`, `let`, `function`, `class`, `return`, `if`, `else`, `import`, `export`, `async`, `await`

### Fichiers de Configuration
- `package.json`, `tsconfig.json`, `.gitignore`, `.eslintrc`, `.prettierrc`

---

## 📁 Traduction par Type de Fichier (Règles pour les IA)

### Fichiers `.agent.yaml`

**Traduire :**
- `title` (titre de l'agent)
- `capabilities` (capacités)
- `role` (rôle)
- `identity` (identité)
- `communication_style` (style de communication)
- `principles` (principes)
- `critical_actions` (actions critiques)
- `description` dans le menu

**Ne PAS traduire :**
- `id`, `name`, `icon`, `module`, `hasSidecar`
- `trigger` (déclencheurs comme BP, CP)
- `exec`, `workflow`, `data` (chemins de fichiers)

### Fichiers `.yaml` / `.yml` (Workflows)

**Traduire :**
- `title` (titres)
- `description` (descriptions)
- `label` (libellés)
- `help` (textes d'aide)
- `summary` (résumés)

**Ne PAS traduire :**
- Clés (keys) elles-mêmes
- IDs
- Noms de variables
- Chemins de fichiers
- Noms de fonctions

---

## 🇫🇷 Adaptations Culturelles

### Exemples Adaptés

| Original (US) | Adaptation (FR) |
|---------------|-----------------|
| "Buy me a coffee" | "Soutenir le projet" |
| "Quick Start" | "Démarrage Rapide" |
| "Get Started" | "Commencer" |

### Formats 
- **Date :** Privilégier le format `JJ/MM/AAAA`
- **Nombres :** Utiliser l'espace insécable comme séparateur de milliers (`1 000`) et la virgule comme séparateur décimal (`3,14`)

---

## ✅ Vérification Post-Traduction

Pour chaque fichier traduit, le contributeur ou l'IA doit vérifier :
- [ ] Le glossaire métier est respecté.
- [ ] Les prénoms des personas sont francisés selon le mapping.
- [ ] Les Triggers (BP, CP, etc.) n'ont pas été altérés.
- [ ] La structure technique YAML/JSON est valide et intacte.
- [ ] Aucun code source ou commande CLI n'a été traduit.

