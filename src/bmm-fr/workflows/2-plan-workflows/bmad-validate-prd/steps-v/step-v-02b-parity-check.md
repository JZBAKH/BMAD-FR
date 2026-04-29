---
name: 'step-v-02b-parity-check'
description: 'Vérification de Parité Documentaire - Analyser un PRD non standard et identifier les écarts (gaps) pour atteindre la parité avec un PRD BMAD'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-03-density-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape V-2B : Vérification de Parité Documentaire

## OBJECTIF DE L'ÉTAPE :

Analyser un PRD non standard et identifier les écarts (gaps) pour atteindre la parité avec un PRD BMAD, en présentant à l'utilisateur des options sur la façon de procéder.

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
- ✅ Vous apportez votre expertise des normes BMAD pour PRD et l'analyse des écarts (gap analysis)
- ✅ L'utilisateur apporte sa connaissance du domaine et le contexte du PRD

### Règles Spécifiques à cette Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur l'analyse des écarts avec la structure standard BMAD
- 🚫 INTERDICTION de modifier le PRD au cours de cette étape
- 💬 Approche : Analytique, consultative et constructive
- 🚪 Cette étape offre à l'utilisateur une porte de sortie (off-ramp) vers l'édition (editing) si l'effort requis est trop important

## PROTOCOLES D'EXÉCUTION :

- 🎯 Identifiez quelles sections BMAD sont manquantes ou incomplètes
- 🎯 Estimez l'effort requis pour mettre le document en conformité
- 🎯 Enregistrez l'analyse dans le rapport de validation
- 💬 Demandez à l'utilisateur de décider de la marche à suivre
- 🚫 INTERDICTION de poursuivre la validation sans la décision de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : Le PRD chargé, sa classification (format hérité/legacy)
- Concentration : Comparaison structurelle uniquement (aucune validation détaillée du contenu)
- Limites : Ne pas restructurer le PRD automatiquement
- Dépendances : L'étape v-02 est terminée, ce document est confirmé comme n'étant pas au format standard BMAD

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence à la lettre. Ne sautez pas, ne réorganisez pas et n'improvisez pas.

### 1. Analyser le PRD par rapport à la Structure BMAD

Comparez le contenu actuel du PRD aux 6 sections fondamentales (core) de BMAD :
1. Résumé Exécutif & Objectifs (Executive Summary & Goals)
2. Critères de Réussite (Success Criteria)
3. Périmètre du Produit (Product Scope)
4. Parcours Utilisateurs (User Journeys)
5. Exigences Fonctionnelles (Functional Requirements)
6. Exigences Non Fonctionnelles (Non-Functional Requirements)

Pour chaque section, déterminez si elle est :
- **Présente & Adéquate :** L'équivalent existe avec une profondeur suffisante
- **Présente mais Carencée (Lacking) :** Une information partielle existe mais nécessite des ajouts
- **Manquante (Missing) :** Aucune information équivalente n'a été trouvée

### 2. Estimer l'Effort de Conversion

Sur la base de l'analyse des écarts (gap analysis), catégorisez l'effort requis pour atteindre la parité BMAD :
- **Faible (Low) :** Restructuration mineure, le contenu est majoritairement présent (Continuer la validation est recommandé)
- **Moyen (Medium) :** Il manque certaines sections, nécessitera une réécriture partielle (L'utilisateur devrait évaluer si valider maintenant a un sens)
- **Élevé (High) :** Refonte majeure requise, de nombreuses sections critiques sont manquantes (Il est recommandé de quitter et d'utiliser le workflow d'édition - Edit Workflow)

### 3. Mettre à Jour le Rapport de Validation

Ajoutez une nouvelle section au fichier `{validationReportPath}` :

```markdown
## 2. Analyse de Parité Documentaire (Pour les formats Legacy/Hérités)
- **Statut de Parité :** {Atteint / Partiel / Lacunaire}
- **Sections Manquantes :** {Liste des sections manquantes}
- **Effort de Conversion Estimé :** {Faible / Moyen / Élevé}
```
*Sauvegardez le rapport discrètement.*

### 4. Présenter le Résumé de Parité à l'Utilisateur

Affichez :

"**Analyse de Parité Terminée**

Puisque ce PRD utilise un format hérité (legacy) ou personnalisé, j'ai évalué ce qu'il faudrait pour le mettre en conformité avec les normes BMAD.

**Analyse des Écarts (Gap Analysis) :**
- **Présent :** {liste de ce qui correspond correctement}
- **À restructurer/Améliorer :** {liste de ce qui nécessite du travail}
- **Manquant :** {liste de ce qui est absent}

**Effort de Conversion Estimé :** {Faible/Moyen/Élevé}

**Bref Résumé :**
[Résumé de 2-3 phrases sur les écarts clés]

**Recommandation :**
{Recommandation issue de l'analyse}

**Comment souhaitez-vous procéder ?**"

### 5. Présenter les OPTIONS DU MENU

**[C] Continuer la Validation** - Poursuivre la validation en utilisant la structure actuelle
**[E] Quitter & Examiner** - Quitter la validation et examiner le rapport de parité
**[S] Sauvegarder & Quitter** - Sauvegarder le rapport de parité et quitter

#### RÈGLES D'EXÉCUTION :

- Arrêtez-vous TOUJOURS et attendez la contribution de l'utilisateur
- Ne procédez qu'en fonction de la sélection de l'utilisateur

#### Logique de Gestion du Menu :

- SI C (Continuer) : Affichez "Poursuite de la validation..." puis lisez entièrement et suivez : {nextStepFile}
- SI E (Quitter) : Affichez le résumé de parité et quittez la validation
- SI S (Sauvegarder) : Confirmez la sauvegarde, affichez le résumé, et quittez
- SI tout autre choix : aidez l'utilisateur à répondre, puis réaffichez le menu

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Les 6 sections du PRD BMAD ont été analysées pour identifier les écarts
- Des estimations d'effort ont été fournies pour chaque écart
- L'effort de parité global a été évalué correctement
- L'analyse de parité a été consignée dans le rapport de validation
- Un résumé clair a été présenté à l'utilisateur
- L'utilisateur a pu choisir entre continuer la validation, quitter, ou sauvegarder le rapport

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas analyser les 6 sections de façon systématique
- Manquer de fournir les estimations d'effort
- Ne pas consigner l'analyse de parité dans le rapport de validation
- Continuer automatiquement sans la décision de l'utilisateur
- Proposer des recommandations peu claires

**Règle Principale :** La vérification de parité informe l'utilisateur de l'état structurel de son document avant de plonger dans des validations plus détaillées. Laissez-le toujours choisir s'il souhaite continuer sur un document potentiellement lacunaire.
