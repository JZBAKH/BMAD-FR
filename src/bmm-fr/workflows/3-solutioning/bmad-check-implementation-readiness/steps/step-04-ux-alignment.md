---
outputFile: '{planning_artifacts}/implementation-readiness-report-{{date}}.md'
---

# Étape 4 : Alignement UX

## OBJECTIF DE L'ÉTAPE :

Vérifier si une documentation UX existe et valider qu'elle s'aligne sur les exigences du PRD et les décisions d'Architecture, en s'assurant que l'architecture prend en compte à la fois les besoins du PRD et de l'UX.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre toute action.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un VALIDATEUR UX garantissant que l'expérience utilisateur est correctement traitée.
- ✅ Les exigences UX doivent être prises en charge par l'architecture.
- ✅ L'absence de documentation UX constitue un avertissement si une interface utilisateur (UI) est implicite.
- ✅ Les écarts d'alignement doivent être documentés.

### Règles Spécifiques à l'Étape :

- 🎯 Vérifiez d'abord l'existence d'un document UX.
- 🚫 Ne supposez pas que l'UX n'est pas nécessaire.
- 💬 Validez l'alignement entre l'UX, le PRD et l'Architecture.
- 🚪 Ajoutez les résultats au rapport de sortie.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Rechercher la documentation UX.
- 💾 Si elle est trouvée, valider l'alignement.
- 📖 Si elle n'est pas trouvée, évaluer si l'UX est implicite.
- 🚫 INTERDICTION de poursuivre sans avoir terminé l'évaluation.

## PROCESSUS D'ALIGNEMENT UX :

### 1. Initialiser la Validation UX

"Début de la validation de l'**Alignement UX**.

Je vais :

1. Vérifier si une documentation UX existe.
2. Si l'UX existe : valider l'alignement avec le PRD et l'Architecture.
3. Si aucune UX n'existe : déterminer si l'UX est implicite et documenter un avertissement."

### 2. Rechercher la Documentation UX

Modèles de recherche :

- `{planning_artifacts}/*ux*.md` (document complet)
- `{planning_artifacts}/*ux*/index.md` (segmenté)
- Rechercher des termes liés à l'interface utilisateur dans d'autres documents.

### 3. Si un document UX existe

#### A. Alignement UX ↔ PRD

- Vérifier que les exigences UX sont reflétées dans le PRD.
- Vérifier que les parcours utilisateurs dans l'UX correspondent aux cas d'usage du PRD.
- Identifier les exigences UX absentes du PRD.

#### B. Alignement UX ↔ Architecture

- Vérifier que l'architecture prend en charge les exigences UX.
- Vérifier les besoins de performance (réactivité, temps de chargement).
- Identifier les composants UI non pris en charge par l'architecture.

### 4. Si aucun document UX n'existe

Évaluer si une UX/UI est implicite :

- Le PRD mentionne-t-il une interface utilisateur ?
- Des composants web/mobiles sont-ils implicites ?
- S'agit-il d'une application destinée aux utilisateurs finaux ?

Si l'UX est implicite mais manquante : Ajouter un avertissement au rapport.

### 5. Ajouter les Résultats au Rapport

Ajouter à {outputFile} :

```markdown
## Évaluation de l'alignement UX

### État du document UX

[Trouvé/Non trouvé]

### Problèmes d'alignement

[Lister tout défaut d'alignement entre l'UX, le PRD et l'Architecture]

### Avertissements

[Tout avertissement concernant une UX manquante ou des lacunes architecturales]
```

### 6. Passage Automatique à l'Étape Suivante

Une fois l'évaluation UX terminée, chargez immédiatement l'étape suivante.

## PASSAGE À LA REVUE DE QUALITÉ DES EPICS

Évaluation de l'alignement UX terminée. Lisez complètement et suivez : `./step-05-epic-quality-review.md`

---

## 🚨 MESURES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Existence du document UX vérifiée.
- Alignement validé si l'UX existe.
- Avertissement émis si l'UX est implicite mais manquante.
- Résultats ajoutés au rapport.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas vérifier l'existence du document UX.
- Ignorer les problèmes d'alignement.
- Ne pas documenter les avertissements.

**Règle Maîtresse :** L'expérience utilisateur doit être intégrée dans les fondations du produit.
