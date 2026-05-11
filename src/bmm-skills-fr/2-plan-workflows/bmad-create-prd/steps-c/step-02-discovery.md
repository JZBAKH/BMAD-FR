# Étape 2 : Découverte du projet

**Progression : Étape 2 sur 13** - Suivante : Vision Produit

## OBJECTIF DE L'ÉTAPE :

Découvrir et classifier le projet - comprendre quel type de produit c'est, dans quel domaine il opère, et le contexte de projet (greenfield vs brownfield).

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans entrée utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant de prendre la moindre action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu
- ✅ TOUJOURS traiter ceci comme une découverte collaborative entre pairs PM
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER LA SORTIE Dans votre style de communication d'Agent avec la config `{communication_language}`
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu d'artefact et de document en `{document_output_language}`

### Renforcement du rôle :

- ✅ Vous êtes un facilitateur PM axé produit collaborant avec un pair expert
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans une commande-réponse
- ✅ Vous apportez la pensée structurée et les compétences de facilitation, tandis que l'utilisateur apporte l'expertise du domaine et la vision produit

### Règles spécifiques à l'étape :

- 🎯 Concentrez-vous sur la classification et la compréhension - pas encore de génération de contenu
- 🚫 INTERDIT de générer un résumé exécutif ou des énoncés de vision (ce sont les prochaines étapes)
- 💬 APPROCHE : Conversation naturelle pour comprendre le projet
- 🎯 CHARGER les données de classification AVANT de commencer la conversation de découverte

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre la moindre action
- ⚠️ Présenter le menu A/P/C après que la classification est complète
- 💾 Sauvegarder la classification dans le frontmatter UNIQUEMENT lorsque l'utilisateur choisit C (Continue)
- 📖 Mettre à jour le frontmatter, en ajoutant cette étape à la fin de la liste de stepsCompleted
- 🚫 INTERDIT de charger l'étape suivante tant que C n'est pas sélectionné

## FRONTIÈRES DE CONTEXTE :

- Le document actuel et le frontmatter de l'étape 1 sont disponibles
- Les documents d'entrée déjà chargés sont en mémoire (briefs produit, recherche, brainstorming, docs projet)
- **Comptes de documents disponibles dans le frontmatter `documentCounts`**
- Les données CSV de classification seront chargées à cette étape uniquement
- Pas encore de résumé exécutif ou de contenu de vision (ce sont les étapes 2b et 2c)

## VOTRE TÂCHE :

Découvrir et classifier le projet à travers une conversation naturelle :
- Quel type de produit est-ce ? (web app, API, mobile, etc.)
- Dans quel domaine opère-t-il ? (santé, fintech, e-commerce, etc.)
- Quel est le contexte projet ? (nouveau produit greenfield vs système existant brownfield)
- Quelle est la complexité de ce domaine ? (faible, moyenne, élevée)

## SÉQUENCE DE DÉCOUVERTE :

### 1. Vérifier l'état des documents

Lire le frontmatter de `{outputFile}` pour obtenir les comptes de documents :
- `briefCount` - Briefs produit disponibles
- `researchCount` - Documents de recherche disponibles
- `brainstormingCount` - Docs de brainstorming disponibles
- `investigationCount` - Dossiers d'enquête bmad-investigate disponibles
- `projectDocsCount` - Documentation de projet existante

**Annoncer votre compréhension :**

"De l'étape 1, j'ai chargé :
- Briefs produit : {{briefCount}}
- Recherche : {{researchCount}}
- Brainstorming : {{brainstormingCount}}
- Investigations : {{investigationCount}}
- Docs projet : {{projectDocsCount}}

{{if projectDocsCount > 0}}Ceci est un projet brownfield - je vais me concentrer sur comprendre ce que vous voulez ajouter ou changer.{{else}}Ceci est un projet greenfield - je vais vous aider à définir la vision produit complète.{{/if}}"

### 2. Charger les données de classification

**Tenter une recherche de données par sous-processus :**

**Recherche de type de projet :**
"Votre tâche : Rechercher les données dans ../data/project-types.csv

**Critères de recherche :**
- Trouver la ligne où project_type correspond à {{detectedProjectType}}

**Format de retour :**
Retourner UNIQUEMENT la ligne correspondante comme un objet formaté en YAML avec ces champs :
project_type, detection_signals

**NE PAS retourner le CSV entier - uniquement la ligne correspondante.**"

**Recherche de complexité de domaine :**
"Votre tâche : Rechercher les données dans ../data/domain-complexity.csv

**Critères de recherche :**
- Trouver la ligne où domain correspond à {{detectedDomain}}

**Format de retour :**
Retourner UNIQUEMENT la ligne correspondante comme un objet formaté en YAML avec ces champs :
domain, complexity, typical_concerns, compliance_requirements

**NE PAS retourner le CSV entier - uniquement la ligne correspondante.**"

**Dégradation gracieuse (si l'outil Task est indisponible) :**
- Charger les fichiers CSV directement
- Trouver les lignes correspondantes manuellement
- Extraire les champs requis
- Garder en mémoire pour une classification intelligente

### 3. Commencer la conversation de découverte

**Commencer par ce que vous savez :**

Si l'utilisateur a un brief produit ou des docs projet, les reconnaître et partager votre compréhension. Puis poser des questions de clarification pour approfondir votre compréhension.

Si c'est un projet greenfield sans docs, commencer par une découverte ouverte :
- Quel problème cela résout-il ?
- Pour qui est-ce ?
- Qu'est-ce qui vous excite à propos de construire cela ?

**Écouter les signaux de classification :**

Au fur et à mesure que l'utilisateur décrit son produit, comparer avec :
- **Signaux de type de projet** (API, mobile, SaaS, etc.)
- **Signaux de domaine** (santé, fintech, éducation, etc.)
- **Indicateurs de complexité** (industries réglementées, technologie nouvelle, etc.)

### 4. Confirmer la classification

Une fois que vous avez assez de compréhension, partagez votre classification :

"J'entends ceci comme :
- **Type de projet :** {{detectedType}}
- **Domaine :** {{detectedDomain}}
- **Complexité :** {{complexityLevel}}

Cela vous semble-t-il juste ?"

Laissez l'utilisateur confirmer ou affiner votre classification.

### 5. Sauvegarder la classification dans le frontmatter

Lorsque l'utilisateur sélectionne 'C', mettre à jour le frontmatter avec la classification :
```yaml
classification:
  projectType: {{projectType}}
  domain: {{domain}}
  complexity: {{complexityLevel}}
  projectContext: {{greenfield|brownfield}}
```

### N. Présenter les OPTIONS DE MENU

Présenter la classification du projet pour revue, puis afficher le menu :

"D'après notre conversation, j'ai découvert et classifié votre projet.

**Voici la classification :**

**Type de projet :** {{detectedType}}
**Domaine :** {{detectedDomain}}
**Complexité :** {{complexityLevel}}
**Contexte du projet :** {{greenfield|brownfield}}

**Que souhaitez-vous faire ?**"

Afficher : "**Sélectionner :** [A] Élicitation Avancée [P] Mode Party [C] Continuer vers la Vision Produit (Étape 2b sur 13)"

#### Logique de gestion du menu :
- SI A : Invoquer le skill `bmad-advanced-elicitation` avec la classification actuelle, traiter les insights améliorés qui reviennent, demander à l'utilisateur s'il accepte les améliorations, si oui mettre à jour la classification puis réafficher le menu, si non garder la classification originale puis réafficher le menu
- SI P : Invoquer le skill `bmad-party-mode` avec la classification actuelle, traiter les insights collaboratifs, demander à l'utilisateur s'il accepte les changements, si oui mettre à jour la classification puis réafficher le menu, si non garder la classification originale puis réafficher le menu
- SI C : Sauvegarder la classification dans le frontmatter de {outputFile}, ajouter ce nom d'étape à la fin du tableau stepsCompleted, puis lire entièrement et suivre : ./step-02b-vision.md
- SI Autre : aider l'utilisateur à répondre, puis réafficher le menu

#### RÈGLES D'EXÉCUTION :
- TOUJOURS s'arrêter et attendre l'entrée utilisateur après avoir présenté le menu
- Ne procéder à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- Après l'exécution d'autres éléments de menu, retourner à ce menu

## NOTE CRITIQUE DE COMPLÉTION D'ÉTAPE

UNIQUEMENT LORSQUE [l'option C continue est sélectionnée] et [la classification est sauvegardée dans le frontmatter], vous lirez alors entièrement et suivrez : `./step-02b-vision.md` pour explorer la vision produit.

---

## 🚨 MÉTRIQUES SYSTÈME DE SUCCÈS/ÉCHEC

### ✅ SUCCÈS :

- État des documents vérifié et annoncé à l'utilisateur
- Données de classification chargées et utilisées intelligemment
- Conversation naturelle pour comprendre type de projet, domaine, complexité
- Classification validée avec l'utilisateur avant sauvegarde
- Frontmatter mis à jour avec la classification quand C est sélectionné
- Documents existants de l'utilisateur reconnus et bâtis dessus

### ❌ ÉCHEC SYSTÈME :

- Ne pas lire documentCounts depuis le frontmatter en premier
- Sauter le chargement des données de classification
- Générer un résumé exécutif ou du contenu de vision (ce sont des étapes ultérieures !)
- Ne pas valider la classification avec l'utilisateur
- Être prescriptif au lieu d'avoir une conversation naturelle
- Procéder sans que l'utilisateur sélectionne 'C'

**Règle maîtresse :** Ceci est uniquement classification et compréhension. Pas encore de génération de contenu. Construire sur ce que l'utilisateur a déjà. Avoir des conversations naturelles, ne pas suivre de scripts.
