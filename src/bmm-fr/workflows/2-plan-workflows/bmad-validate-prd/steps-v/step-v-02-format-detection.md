---
name: 'step-v-02-format-detection'
description: 'Détection du format et analyse de la structure - Classifier le format du cahier des charges produit (PRD) et l''acheminer de manière appropriée'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-03-density-validation.md'
altStepFile: './step-v-02b-parity-check.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 2 : Détection du format et analyse de la structure

## OBJECTIF DE L'ÉTAPE :

Détecter si le cahier des charges produit (PRD) suit le format BMAD et l'acheminer de manière appropriée - le classifier comme BMAD Standard / Variante BMAD / Non-Standard, avec une vérification de parité optionnelle pour les formats non-standards.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans la contribution de l'utilisateur
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre la moindre action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'ensemble du fichier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PRODUIRE LA SORTIE dans votre style de communication d'agent avec la configuration `{communication_language}`

### Renforcement du rôle :

- ✅ Vous êtes un Architecte de validation et un Spécialiste de l'assurance qualité
- ✅ Si l'on vous a déjà fourni des modèles de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans un échange de type commande-réponse
- ✅ Vous apportez une expertise systématique de validation et de la reconnaissance de modèles (pattern recognition)
- ✅ L'utilisateur apporte sa connaissance du domaine et le contexte du cahier des charges produit (PRD)

### Règles spécifiques à cette étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la détection du format et la classification de la structure
- 🚫 INTERDICTION d'effectuer d'autres vérifications de validation à cette étape
- 💬 Approche : Analytique et systématique, compte rendu clair des constats
- 🚪 Il s'agit d'une étape de branchement - peut router vers la vérification de parité pour les cahiers des charges produit (PRD) non-standards

## PROTOCOLES D'EXÉCUTION :

- 🎯 Analyser systématiquement la structure du cahier des charges produit (PRD)
- 💾 Ajouter les constats relatifs au format au rapport de validation
- 📖 Acheminer de manière appropriée selon la classification du format
- 🚫 INTERDICTION de sauter la détection du format ou de poursuivre sans classification

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier de cahier des charges produit (PRD) chargé à l'étape 1, rapport de validation initialisé
- Concentration : Détection et classification du format uniquement
- Limites : Ne pas effectuer d'autres validations, ne pas sauter la classification
- Dépendances : Étape 1 terminée - cahier des charges produit (PRD) chargé et rapport initialisé

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence à la lettre. Ne sautez pas, ne réorganisez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Extraire la structure du cahier des charges produit (PRD)

Charger l'intégralité du fichier de cahier des charges produit (PRD) et extraire :

**Tous les en-têtes de niveau 2 (##) :**
- Parcourir l'intégralité du document de cahier des charges produit (PRD)
- Extraire tous les en-têtes de section ##
- Les lister dans l'ordre

**Frontmatter du cahier des charges produit (PRD) :**
- Extraire classification.domain s'il est présent
- Extraire classification.projectType s'il est présent
- Noter toute autre métadonnée pertinente

### 2. Vérifier les sections fondamentales du cahier des charges produit (PRD) BMAD

Vérifier si le cahier des charges produit (PRD) contient les sections fondamentales suivantes du cahier des charges produit (PRD) BMAD :

1. **Résumé exécutif** (ou variations : ## Executive Summary, ## Overview, ## Introduction)
2. **Critères de réussite** (ou : ## Success Criteria, ## Goals, ## Objectives)
3. **Périmètre du produit** (ou : ## Product Scope, ## Scope, ## In Scope, ## Out of Scope)
4. **Parcours utilisateurs** (ou : ## User Journeys, ## User Stories, ## User Flows)
5. **Exigences fonctionnelles** (ou : ## Functional Requirements, ## Features, ## Capabilities)
6. **Exigences non-fonctionnelles** (ou : ## Non-Functional Requirements, ## NFRs, ## Quality Attributes)

**Compter les correspondances :**
- Combien de ces 6 sections fondamentales sont présentes ?
- Quelles sections spécifiques sont présentes ?
- Lesquelles sont manquantes ?

### 3. Classifier le format du cahier des charges produit (PRD)

Selon le nombre de sections fondamentales, classifier :

**BMAD Standard :**
- 5-6 sections fondamentales présentes
- Suit étroitement la structure du cahier des charges produit (PRD) BMAD

**Variante BMAD :**
- 3-4 sections fondamentales présentes
- Suit globalement les modèles BMAD mais peut présenter des différences structurelles
- Manque certaines sections mais reconnaissable comme étant de style BMAD

**Non-Standard :**
- Moins de 3 sections fondamentales présentes
- Ne suit pas la structure du cahier des charges produit (PRD) BMAD
- Peut être un format entièrement personnalisé, hérité (legacy), ou provenir d'un autre framework

### 4. Consigner les constats relatifs au format dans le rapport de validation

Ajouter au rapport de validation :

```markdown
## Détection du format

**Structure du cahier des charges produit (PRD) :**
[Lister tous les en-têtes ## de niveau 2 trouvés]

**Sections fondamentales BMAD présentes :**
- Résumé exécutif : [Présente/Manquante]
- Critères de réussite : [Présente/Manquante]
- Périmètre du produit : [Présente/Manquante]
- Parcours utilisateurs : [Présente/Manquante]
- Exigences fonctionnelles : [Présente/Manquante]
- Exigences non-fonctionnelles : [Présente/Manquante]

**Classification du format :** [BMAD Standard / Variante BMAD / Non-Standard]
**Sections fondamentales présentes :** [count]/6
```

### 5. Acheminer en fonction de la classification du format

**SI le format est BMAD Standard ou Variante BMAD :**

Afficher : "**Format détecté :** {classification}

Passage aux vérifications de validation systématiques..."

Sans délai, lire intégralement et suivre : {nextStepFile} (step-v-03-density-validation.md)

**SI le format est Non-Standard (< 3 sections fondamentales) :**

Afficher : "**Format détecté :** Cahier des charges produit (PRD) non-standard

Ce cahier des charges produit (PRD) ne suit pas la structure standard BMAD (seulement {count}/6 sections fondamentales présentes).

Vous avez plusieurs options :"

Présenter les OPTIONS DU MENU ci-dessous pour la sélection de l'utilisateur

### 6. Présenter les OPTIONS DU MENU (Cahiers des charges produit (PRD) non-standards uniquement)

**[A] Vérification de parité** - Analyser les écarts et estimer l'effort pour atteindre la parité avec le cahier des charges produit (PRD) BMAD
**[B] Valider tel quel** - Procéder à la validation en utilisant la structure actuelle
**[C] Quitter** - Quitter la validation et examiner les constats sur le format

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre la contribution de l'utilisateur
- Ne procéder qu'en fonction de la sélection de l'utilisateur

#### Logique de gestion du menu :

- SI A (Vérification de parité) : Lire intégralement et suivre : {altStepFile} (step-v-02b-parity-check.md)
- SI B (Valider tel quel) : Afficher "Poursuite de la validation..." puis lire intégralement et suivre : {nextStepFile}
- SI C (Quitter) : Afficher le résumé des constats relatifs au format et quitter la validation
- SI tout autre choix : aider l'utilisateur à répondre, puis réafficher le menu

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Tous les en-têtes de niveau 2 (##) ont été extraits avec succès
- Les sections fondamentales BMAD ont été vérifiées de manière systématique
- Le format a été classifié correctement selon le nombre de sections
- Les constats ont été consignés dans le rapport de validation
- Les cahiers des charges produit (PRD) BMAD Standard/Variante passent directement à l'étape de validation suivante
- Les cahiers des charges produit (PRD) non-standards font une pause et présentent des options à l'utilisateur
- L'utilisateur peut choisir la vérification de parité, valider tel quel ou quitter

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas extraire tous les en-têtes avant la classification
- Classification de format incorrecte
- Ne pas consigner les constats dans le rapport de validation
- Ne pas marquer de pause pour les cahiers des charges produit (PRD) non-standards
- Poursuivre sans la décision de l'utilisateur pour les formats non-standards

**Règle principale :** La détection du format détermine le chemin de validation. Les cahiers des charges produit (PRD) non-standards exigent un choix de l'utilisateur avant de continuer.
