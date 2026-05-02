---
name: 'step-v-02-format-detection'
description: 'Détection de Format et Analyse de Structure - Classifier le format du PRD et router de manière appropriée'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-03-density-validation.md'
altStepFile: './step-v-02b-parity-check.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 2 : Détection de Format et Analyse de Structure

## OBJECTIF DE L'ÉTAPE :

Détecter si le PRD suit le format BMAD et router de manière appropriée - classifier comme Standard BMAD / Variante BMAD / Non-Standard, avec un contrôle de parité optionnel pour les formats non-standards.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité.
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une commande-réponse.
- ✅ Vous apportez une expertise de validation systématique et une reconnaissance des motifs (pattern recognition).
- ✅ L'utilisateur apporte la connaissance du domaine et le contexte du PRD.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la détection du format et la classification de la structure.
- 🚫 INTERDICTION d'effectuer d'autres vérifications de validation dans cette étape.
- 💬 Approche : Analytique et systématique, rapport clair des résultats.
- 🚪 Il s'agit d'une étape d'aiguillage - peut router vers le contrôle de parité pour les PRD non-standards.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Analyser la structure du PRD de manière systématique.
- 💾 Ajouter les résultats du format au rapport de validation.
- 📖 Router de manière appropriée en fonction de la classification du format.
- 🚫 INTERDICTION de sauter la détection de format ou de procéder sans classification.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD chargé à l'étape 1, rapport de validation initialisé.
- Focus : Détection de format et classification uniquement.
- Limites : Ne pas effectuer d'autres validations, ne pas sauter la classification.
- Dépendances : Étape 1 terminée - PRD chargé et rapport initialisé.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Extraire la Structure du PRD

Chargez le fichier PRD complet et extrayez :

**Tous les titres de Niveau 2 (##) :**
- Parcourez l'intégralité du document PRD.
- Extrayez tous les titres de section ##.
- Listez-les dans l'ordre.

**Frontmatter du PRD :**
- Extrayez classification.domain si présent.
- Extrayez classification.projectType si présent.
- Notez toute autre métadonnée pertinente.

### 2. Vérifier les Sections Core du PRD BMAD

Vérifiez si le PRD contient les sections clés suivantes du PRD BMAD :

1. **Executive Summary** (Résumé Analytique) (ou variations : ## Résumé Analytique, ## Vue d'ensemble, ## Introduction, ## Executive Summary)
2. **Success Criteria** (Critères de Succès) (ou : ## Critères de Succès, ## Objectifs, ## Success Criteria)
3. **Product Scope** (Périmètre du Produit) (ou : ## Périmètre du Produit, ## Périmètre, ## Dans le périmètre, ## Hors périmètre, ## Product Scope)
4. **User Journeys** (Parcours Utilisateurs) (ou : ## Parcours Utilisateurs, ## User Stories, ## Flux Utilisateurs, ## User Journeys)
5. **Functional Requirements** (Exigences Fonctionnelles) (ou : ## Exigences Fonctionnelles, ## Fonctionnalités, ## Capacités, ## Functional Requirements)
6. **Non-Functional Requirements** (Exigences Non Fonctionnelles) (ou : ## Exigences Non Fonctionnelles, ## ENF, ## Attributs de Qualité, ## Non-Functional Requirements)

**Compter les correspondances :**
- Combien de ces 6 sections clés sont présentes ?
- Quelles sections spécifiques sont présentes ?
- Lesquelles sont manquantes ?

### 3. Classifier le Format du PRD

Sur la base du nombre de sections clés, classifiez :

**Standard BMAD :**
- 5-6 sections clés présentes.
- Suit fidèlement la structure du PRD BMAD.

**Variante BMAD :**
- 3-4 sections clés présentes.
- Suit généralement les modèles BMAD mais peut présenter des différences structurelles.
- Certaines sections manquent mais le document est reconnaissable comme étant de style BMAD.

**Non-Standard :**
- Moins de 3 sections clés présentes.
- Ne suit pas la structure du PRD BMAD.
- Peut être un format complètement personnalisé, un format hérité ou provenant d'un autre framework.

### 4. Rapporter les Résultats de Format dans le Rapport de Validation

Ajoutez au rapport de validation :

```markdown
## Détection de Format

**Structure du PRD :**
[Listez tous les titres ## de Niveau 2 trouvés]

**Sections Clés BMAD Présentes :**
- Résumé Analytique : [Présent/Manquant]
- Critères de Succès : [Présent/Manquant]
- Périmètre du Produit : [Présent/Manquant]
- Parcours Utilisateurs : [Présent/Manquant]
- Exigences Fonctionnelles : [Présent/Manquant]
- Exigences Non Fonctionnelles : [Présent/Manquant]

**Classification du Format :** [Standard BMAD / Variante BMAD / Non-Standard]
**Sections Clés Présentes :** [nombre]/6
```

### 5. Router selon la Classification du Format

**SI le format est Standard BMAD ou Variante BMAD :**

Affichez : "**Format détecté :** {classification}

Passage aux vérifications de validation systématiques..."

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-03-density-validation.md)

**SI le format est Non-Standard (< 3 sections clés) :**

Affichez : "**Format détecté :** PRD Non-Standard

Ce PRD ne suit pas la structure standard BMAD (seulement {count}/6 sections clés présentes).

Vous avez des options :"

Présentez les OPTIONS DU MENU ci-dessous pour la sélection de l'utilisateur.

### 6. Présenter les OPTIONS DU MENU (PRD Non-Standards Uniquement)

**[A] Contrôle de Parité** - Analyser les lacunes et estimer l'effort pour atteindre la parité avec le PRD BMAD.
**[B] Valider en l'état** - Poursuivre la validation en utilisant la structure actuelle.
**[C] Quitter** - Quitter la validation et examiner les résultats de détection de format.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur.
- Procéder uniquement en fonction de la sélection de l'utilisateur.

#### Logique de Gestion du Menu :

- SI A (Contrôle de Parité) : Lisez complètement et suivez : {altStepFile} (step-v-02b-parity-check.md).
- SI B (Valider en l'état) : Affichez "Poursuite de la validation..." puis lisez complètement et suivez : {nextStepFile}.
- SI C (Quitter) : Affichez le résumé des résultats de détection de format et quittez la validation.
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Tous les titres ## de Niveau 2 extraits avec succès.
- Sections clés BMAD vérifiées systématiquement.
- Format classifié correctement en fonction du nombre de sections.
- Résultats rapportés dans le rapport de validation.
- Les PRD Standard/Variante BMAD passent directement à l'étape de validation suivante.
- Les PRD Non-Standards s'arrêtent et présentent des options à l'utilisateur.
- L'utilisateur peut choisir le contrôle de parité, la validation en l'état ou de quitter.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas extraire tous les titres avant la classification.
- Classification de format incorrecte.
- Ne pas rapporter les résultats dans le rapport de validation.
- Ne pas s'arrêter pour les PRD non-standards.
- Procéder sans décision de l'utilisateur pour les formats non-standards.

**Règle Maîtresse :** La détection de format détermine le chemin de validation. Les PRD non-standards nécessitent un choix de l'utilisateur avant de continuer.
