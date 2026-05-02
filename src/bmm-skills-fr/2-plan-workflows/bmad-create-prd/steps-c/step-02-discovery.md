# Étape 2 : Découverte du Projet (Project Discovery)

**Progression : Étape 2 sur 13** - Suivante : Vision du Produit (Product Vision)

## OBJECTIF DE L'ÉTAPE :

Découvrir et classifier le projet - comprendre de quel type de produit il s'agit, dans quel domaine il opère, et le contexte du projet (greenfield/nouveau projet vs brownfield/système existant).

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- 📖 CRITIQUE : Lisez le fichier d'étape complet avant d'entreprendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu
- ✅ ABORDEZ TOUJOURS cela comme une découverte collaborative entre pairs PM
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `{communication_language}` configurée.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout contenu d'artefact et de document dans la `{document_output_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un facilitateur PM (Product Manager) orienté produit collaborant avec un pair expert
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans un modèle commande-réponse
- ✅ Vous apportez une réflexion structurée et des compétences en facilitation, tandis que l'utilisateur apporte une expertise du domaine et une vision du produit

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous sur la classification et la compréhension - aucune génération de contenu pour le moment
- 🚫 INTERDICTION de générer les déclarations de résumé exécutif (executive summary) ou de vision (ce sont les étapes suivantes)
- 💬 APPROCHE : Conversation naturelle pour comprendre le projet
- 🎯 CHARGEZ les données de classification AVANT d'entamer la conversation de découverte

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant d'entreprendre toute action
- ⚠️ Présentez le menu A/P/C une fois la classification terminée
- 💾 Sauvegardez la classification dans le frontmatter UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettez à jour le frontmatter, en ajoutant cette étape à la fin de la liste des `stepsCompleted`
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'a pas été sélectionné

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter de l'étape 1 sont disponibles
- Les documents d'entrée déjà chargés sont en mémoire (product briefs, recherche, brainstorming, docs du projet)
- **Le nombre de documents est disponible dans le frontmatter `documentCounts`**
- Les données CSV de classification ne seront chargées que dans cette étape
- Pas encore de contenu de résumé exécutif ou de vision (il s'agit des étapes 2b et 2c)

## VOTRE TÂCHE :

Découvrir et classifier le projet par une conversation naturelle :
- Quel type de produit est-ce ? (application web, API, mobile, etc.)
- Dans quel domaine opère-t-il ? (santé, fintech, e-commerce, etc.)
- Quel est le contexte du projet ? (nouveau produit/greenfield vs système existant/brownfield)
- Quelle est la complexité de ce domaine ? (faible, moyenne, élevée)

## SÉQUENCE DE DÉCOUVERTE :

### 1. Vérifier l'État du Document

Lisez le frontmatter de `{outputFile}` pour obtenir le nombre de documents :
- `briefCount` - Product briefs disponibles
- `researchCount` - Documents de recherche disponibles
- `brainstormingCount` - Docs de brainstorming disponibles
- `projectDocsCount` - Documentation de projet existante

**Annoncez votre compréhension :**

"D'après l'étape 1, j'ai chargé :
- Product briefs : {{briefCount}}
- Recherche : {{researchCount}}
- Brainstorming : {{brainstormingCount}}
- Docs de projet : {{projectDocsCount}}

{{if projectDocsCount > 0}}Il s'agit d'un projet existant (brownfield) - je vais me concentrer sur la compréhension de ce que vous souhaitez ajouter ou modifier.{{else}}Il s'agit d'un nouveau projet (greenfield) - je vais vous aider à définir la vision globale du produit.{{/if}}"

### 2. Charger les Données de Classification

**Tentez une recherche de données sous la forme d'un sous-processus (subprocess) :**

**Recherche du Type de Projet (Project Type Lookup) :**
"Votre tâche : Rechercher les données dans ../data/project-types.csv

**Critères de recherche :**
- Trouver la ligne où `project_type` correspond à {{detectedProjectType}}

**Format de retour :**
Retournez UNIQUEMENT la ligne correspondante sous forme d'objet formaté en YAML avec ces champs :
project_type, detection_signals

**NE RETOURNEZ PAS l'ensemble du CSV - seulement la ligne correspondante.**"

**Recherche de la Complexité du Domaine (Domain Complexity Lookup) :**
"Votre tâche : Rechercher les données dans ../data/domain-complexity.csv

**Critères de recherche :**
- Trouver la ligne où `domain` correspond à {{detectedDomain}}

**Format de retour :**
Retournez UNIQUEMENT la ligne correspondante sous forme d'objet formaté en YAML avec ces champs :
domain, complexity, typical_concerns, compliance_requirements

**NE RETOURNEZ PAS l'ensemble du CSV - seulement la ligne correspondante.**"

**Dégradation gracieuse (Graceful degradation - si l'outil de Tâche est indisponible) :**
- Chargez les fichiers CSV directement
- Trouvez manuellement les lignes correspondantes
- Extrayez les champs requis
- Conservez en mémoire pour une classification intelligente

### 3. Commencer la Conversation de Découverte

**Commencez avec ce que vous savez :**

Si l'utilisateur a un product brief ou des docs de projet, reconnaissez-les et partagez votre compréhension. Posez ensuite des questions de clarification pour approfondir votre compréhension.

S'il s'agit d'un projet greenfield (nouveau) sans aucune documentation, commencez par une découverte ouverte :
- Quel problème cela résout-il ?
- A qui cela s'adresse-t-il ?
- Qu'est-ce qui vous passionne dans la construction de ceci ?

**Soyez à l'écoute des signaux de classification :**

Pendant que l'utilisateur décrit son produit, établissez des correspondances avec :
- **Les signaux de type de projet** (API, mobile, SaaS, etc.)
- **Les signaux de domaine** (santé, fintech, éducation, etc.)
- **Les indicateurs de complexité** (secteurs réglementés, technologie novatrice, etc.)

### 4. Confirmer la Classification

Une fois que vous avez une compréhension suffisante, partagez votre classification :

"Voici ce que je comprends :
- **Type de Projet :** {{detectedType}}
- **Domaine :** {{detectedDomain}}
- **Complexité :** {{complexityLevel}}

Cela vous semble-t-il correct ?"

Laissez l'utilisateur confirmer ou affiner votre classification.

### 5. Sauvegarder la Classification dans le Frontmatter

Lorsque l'utilisateur sélectionne 'C', mettez à jour le frontmatter avec la classification :
```yaml
classification:
  projectType: {{projectType}}
  domain: {{domain}}
  complexity: {{complexityLevel}}
  projectContext: {{greenfield|brownfield}}
```

### N. Présenter les OPTIONS DU MENU

Présentez la classification du projet pour une revue, puis affichez le menu :

"Sur la base de notre conversation, j'ai découvert et classifié votre projet.

**Voici la classification :**

**Type de Projet :** {{detectedType}}
**Domaine :** {{detectedDomain}}
**Complexité :** {{complexityLevel}}
**Contexte du Projet :** {{greenfield|brownfield}}

**Que souhaitez-vous faire ?**"

Affichez : "**Sélectionnez :** [A] Élicitation Avancée (Advanced Elicitation) [P] Mode Party (Party Mode) [C] Continuer vers la Vision du Produit (Étape 2b sur 13)"

#### Logique de Gestion du Menu :
- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec la classification actuelle, traitez les informations enrichies qui en reviennent, demandez à l'utilisateur s'il accepte les améliorations ; si oui, mettez à jour la classification puis réaffichez le menu, si non, conservez la classification d'origine puis réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` avec la classification actuelle, traitez les informations collaboratives, demandez à l'utilisateur s'il accepte les changements ; si oui, mettez à jour la classification puis réaffichez le menu, si non, conservez la classification d'origine puis réaffichez le menu.
- SI C : Sauvegardez la classification dans le frontmatter de `{outputFile}`, ajoutez le nom de cette étape à la fin du tableau `stepsCompleted`, puis lisez intégralement et suivez : `./step-02b-vision.md`
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :
- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- Après l'exécution d'autres options du menu, retournez à ce menu

## NOTE CRITIQUE DE FIN D'ÉTAPE

UNIQUEMENT LORSQUE [l'option de continuation C] est sélectionnée et que [la classification est sauvée dans le frontmatter], vous lirez alors intégralement et suivrez : `./step-02b-vision.md` pour explorer la vision du produit.

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC DU SYSTÈME

### ✅ SUCCÈS :

- L'état du document a été vérifié et annoncé à l'utilisateur
- Les données de classification ont été chargées et utilisées intelligemment
- Conversation naturelle pour comprendre le type, le domaine et la complexité du projet
- Classification validée avec l'utilisateur avant la sauvegarde
- Le frontmatter a été mis à jour avec la classification lorsque 'C' est sélectionné
- Les documents existants de l'utilisateur ont été reconnus et utilisés comme base

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas lire `documentCounts` dans le frontmatter en premier lieu
- Sauter le chargement des données de classification
- Générer du contenu de résumé exécutif (executive summary) ou de vision (il s'agit d'étapes ultérieures !)
- Ne pas valider la classification avec l'utilisateur
- Être prescriptif au lieu d'avoir une conversation naturelle
- Poursuivre sans que l'utilisateur sélectionne 'C'

**Règle Principale :** Il ne s'agit là que de classification et de compréhension. Aucune génération de contenu pour le moment. Fondez-vous sur ce que l'utilisateur possède déjà. Ayez des conversations naturelles, ne suivez pas de scripts rigides.
