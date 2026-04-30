---
name: 'step-v-02-format-detection'
description: 'Détection du Format et Analyse de la Structure - Classifier le format du PRD et l''acheminer de manière appropriée'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-03-density-validation.md'
altStepFile: './step-v-02b-parity-check.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape V-2 : Détection du Format & Analyse de la Structure

## OBJECTIF DE L'ÉTAPE :

Détecter si le PRD suit le format BMAD et l'acheminer (router) de manière appropriée - le classifier comme BMAD Standard / Variante BMAD / Non-Standard, avec une vérification de parité optionnelle pour les formats non-standards.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans la contribution de l'utilisateur
- 📖 CRITIQUE : Lisez TOUJOURS le fichier d'étape en entier avant d'entreprendre la moindre action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que l'ensemble du fichier est lu et compris
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS EFFECTUER LA SORTIE ORALE dans votre style de communication d'Agent avec la `{communication_language}` configurée

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité
- ✅ Si l'on vous a déjà fourni des modèles de communication ou des personnas, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans un échange de type commande/réponse
- ✅ Vous apportez votre expertise en matière de validation systématique et de reconnaissance de modèles (pattern recognition)
- ✅ L'utilisateur apporte sa connaissance du domaine et le contexte du PRD

### Règles Spécifiques à cette Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur l'extraction des en-têtes et la classification du format
- 🚫 INTERDICTION d'effectuer une validation détaillée du contenu au cours de cette étape
- 💬 Approche : Analytique, objective et décisive
- 🚪 Cette étape détermine le chemin de validation qui sera emprunté

## PROTOCOLES D'EXÉCUTION :

- 🎯 Extrayez tous les en-têtes (headers) de Niveau 2 (##) du PRD
- 🎯 Comparez-les aux sections standards de BMAD
- 🎯 Classifiez le format du PRD
- 🎯 Consignez les constats dans le rapport de validation
- 💬 Informez l'utilisateur et routez-le en fonction de la classification

## LIMITES DU CONTEXTE :

- Contexte disponible : Le PRD chargé
- Concentration : Analyse de la structure du document
- Limites : Ne pas valider la densité ou la qualité du contenu
- Dépendances : L'étape v-01 est terminée et le PRD est chargé en mémoire

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence à la lettre. Ne sautez pas, ne réorganisez pas et n'improvisez pas.

### 1. Extraire les En-têtes de Niveau 2 (Level 2 Headers)

Parcourez le PRD et dressez la liste de tous les en-têtes de Niveau 2 (`##`). Comparez-les aux 9 sections centrales (core sections) de BMAD :
1. Résumé Exécutif (Executive Summary)
2. Critères de Réussite (Success Criteria)
3. Périmètre du Produit (Product Scope)
4. Parcours Utilisateurs (User Journeys)
5. Exigences du Domaine (Domain Requirements)
6. Analyse d'Innovation (Innovation Analysis)
7. Exigences du Type de Projet (Project-Type Requirements)
8. Exigences Fonctionnelles (Functional Requirements)
9. Exigences Non Fonctionnelles (Non-Functional Requirements)

### 2. Classifier le Format

En fonction de l'extraction des en-têtes :
- **BMAD Standard :** Contient les 9 sections fondamentales (Passez à l'étape 3, puis routez directement vers `step-v-03`)
- **Variante BMAD :** Contient 5 à 8 sections fondamentales (Passez à l'étape 3, puis routez directement vers `step-v-03`)
- **Non-Standard (Legacy) :** Contient moins de 5 sections fondamentales BMAD (Passez à l'étape 3, puis présentez le MENU à l'utilisateur)

### 3. Mettre à Jour le Rapport de Validation

Ajoutez silencieusement ce qui suit au fichier `{validationReportPath}` :

```markdown
## 2. Format et Structure
- **Format Détecté :** {BMAD Standard / Variante BMAD / Non-Standard}
- **Sections Fondamentales Présentes :** {count}/9
- **Sections Manquantes :** {liste des sections centrales manquantes, le cas échéant}
- **Sections Supplémentaires :** {liste des sections non-standards, le cas échéant}
```

### 4. Présenter les Constats (Findings) et Acheminer (Route)

**SI BMAD Standard OU Variante BMAD :**
Affichez : "**Format Détecté : {classification}**
J'ai identifié {count}/9 sections fondamentales BMAD.

**Passage automatique à la validation de la densité de l'information...**"
Lisez entièrement et suivez : `{nextStepFile}` (step-v-03-density-validation.md)

**SI Non-Standard (Legacy) :**
Affichez : "**Format Détecté : Non-Standard (Legacy)**
Ce PRD ne suit pas la structure standard BMAD (seulement {count}/9 sections fondamentales identifiées).

Pour garantir une validation de haute qualité, nous devons décider comment procéder. Je peux effectuer une \"Vérification de Parité\" (Parity Check) pour identifier les lacunes exactes par rapport à un PRD BMAD, ou nous pouvons valider la structure actuelle telle quelle.

**Comment souhaitez-vous procéder ?**"

Passez à l'étape 5 pour présenter le menu.

### 5. Présenter les OPTIONS DU MENU (Pour les formats Non-Standards uniquement)

**[A] Parity Check** - Analyser les lacunes et estimer l'effort pour atteindre la parité avec un PRD BMAD
**[B] Validate As-Is** - Poursuivre la validation en utilisant la structure actuelle
**[C] Exit** - Quitter la validation et examiner les conclusions sur le format

#### RÈGLES D'EXÉCUTION :

- Arrêtez-vous TOUJOURS et attendez la contribution de l'utilisateur
- Ne procédez qu'en fonction de la sélection de l'utilisateur

#### Logique de Gestion du Menu :

- SI A (Parity Check) : Lisez entièrement et suivez : `{altStepFile}` (step-v-02b-parity-check.md)
- SI B (Validate As-Is) : Affichez "Poursuite de la validation..." puis lisez entièrement et suivez : `{nextStepFile}`
- SI C (Exit) : Affichez le résumé des conclusions sur le format et quittez la validation
- SI tout autre choix : aidez l'utilisateur à répondre, puis réaffichez le menu

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Tous les en-têtes de Niveau 2 (##) ont été extraits avec succès
- Les sections centrales BMAD ont été vérifiées de manière systématique
- Le format a été classifié correctement selon le nombre de sections
- Les constats ont été consignés dans le rapport de validation
- Les PRDs Standard / Variante BMAD transitent directement à l'étape de validation suivante
- Les PRDs Non-Standards forcent une pause et présentent les options à l'utilisateur
- L'utilisateur peut choisir de vérifier la parité, de valider tel quel ou de quitter

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas extraire tous les en-têtes avant la classification
- Classification de format incorrecte
- Ne pas consigner les constats dans le rapport de validation
- Ne pas marquer de pause pour les PRDs non-standards
- Poursuivre sans la décision de l'utilisateur pour les formats non-standards

**Règle Principale :** La détection du format détermine le chemin de validation. Les documents non-standards nécessitent le consentement de l'utilisateur avant d'appliquer les règles de validation strictes de BMAD.
