---
name: 'step-v-02b-parity-check'
description: 'Vérification de la parité documentaire - Analyser un cahier des charges produit (PRD) non-standard et identifier les écarts pour atteindre la parité avec un cahier des charges produit (PRD) BMAD'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-03-density-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 2B : Vérification de la parité documentaire

## OBJECTIF DE L'ÉTAPE :

Analyser un cahier des charges produit (PRD) non-standard et identifier les écarts pour atteindre la parité avec un cahier des charges produit (PRD) BMAD, en présentant à l'utilisateur des options sur la façon de procéder.

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
- ✅ Vous apportez une expertise des standards du cahier des charges produit (PRD) BMAD et de l'analyse des écarts
- ✅ L'utilisateur apporte sa connaissance du domaine et le contexte du cahier des charges produit (PRD)

### Règles spécifiques à cette étape :

- 🎯 Concentrez-vous UNIQUEMENT sur l'analyse des écarts et l'estimation de l'effort de parité
- 🚫 INTERDICTION d'effectuer d'autres vérifications de validation à cette étape
- 💬 Approche : Analyse systématique des écarts avec des recommandations claires
- 🚪 Il s'agit d'une étape de branchement optionnelle - l'utilisateur choisit l'action suivante

## PROTOCOLES D'EXÉCUTION :

- 🎯 Analyser chaque section du cahier des charges produit (PRD) BMAD pour identifier les écarts
- 💾 Ajouter l'analyse de parité au rapport de validation
- 📖 Présenter les options et attendre la décision de l'utilisateur
- 🚫 INTERDICTION de poursuivre sans la sélection de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : Cahier des charges produit (PRD) non-standard issu de l'étape 2, rapport de validation en cours
- Concentration : Analyse de parité uniquement - ce qui manque, ce qui est nécessaire
- Limites : Ne pas effectuer de vérifications de validation, ne pas continuer automatiquement
- Dépendances : L'étape 2 a classifié le cahier des charges produit (PRD) comme non-standard et l'utilisateur a choisi la vérification de parité

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence à la lettre. Ne sautez pas, ne réorganisez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Analyser chaque section du cahier des charges produit (PRD) BMAD

Pour chacune des 6 sections fondamentales du cahier des charges produit (PRD) BMAD, analyser :

**Résumé exécutif :**

- Le cahier des charges produit (PRD) a-t-il une vision/un aperçu ?
- L'énoncé du problème est-il clair ?
- Les utilisateurs cibles sont-ils identifiés ?
- Écart : [Ce qui manque ou est incomplet]

**Critères de réussite :**

- Des objectifs mesurables sont-ils définis ?
- Le succès est-il clairement défini ?
- Écart : [Ce qui manque ou est incomplet]

**Périmètre du produit :**

- Le périmètre est-il clairement défini ?
- Les éléments inclus dans le périmètre sont-ils listés ?
- Les éléments hors périmètre sont-ils listés ?
- Écart : [Ce qui manque ou est incomplet]

**Parcours utilisateurs :**

- Les types d'utilisateurs/personas sont-ils identifiés ?
- Les flux utilisateurs sont-ils documentés ?
- Écart : [Ce qui manque ou est incomplet]

**Exigences fonctionnelles :**

- Les fonctionnalités/capacités sont-elles listées ?
- Les exigences sont-elles structurées ?
- Écart : [Ce qui manque ou est incomplet]

**Exigences non-fonctionnelles :**

- Les attributs de qualité sont-ils définis ?
- Les exigences de performance/sécurité/etc. sont-elles documentées ?
- Écart : [Ce qui manque ou est incomplet]

### 2. Estimer l'effort pour atteindre la parité

Pour chaque section manquante ou incomplète, estimer :

**Niveau d'effort :**

- Minimal - La section existe mais nécessite des améliorations mineures
- Modéré - La section est manquante mais le contenu existe ailleurs dans le cahier des charges produit (PRD)
- Significatif - La section est manquante, requiert la création de nouveau contenu

**Effort total de parité :**

- Basé sur les estimations de chaque section
- Classer globalement : effort Rapide / Modéré / Substantiel

### 3. Consigner l'analyse de parité dans le rapport de validation

Ajouter au rapport de validation :

```markdown
## Analyse de parité (Cahier des charges produit (PRD) non-standard)

### Analyse section par section des écarts

**Résumé exécutif :**

- Statut : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort à fournir : [Minimal/Modéré/Significatif]

**Critères de réussite :**

- Statut : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort à fournir : [Minimal/Modéré/Significatif]

**Périmètre du produit :**

- Statut : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort à fournir : [Minimal/Modéré/Significatif]

**Parcours utilisateurs :**

- Statut : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort à fournir : [Minimal/Modéré/Significatif]

**Exigences fonctionnelles :**

- Statut : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort à fournir : [Minimal/Modéré/Significatif]

**Exigences non-fonctionnelles :**

- Statut : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort à fournir : [Minimal/Modéré/Significatif]

### Évaluation globale de parité

**Effort global pour atteindre le standard BMAD :** [Rapide/Modéré/Substantiel]
**Recommandation :** [Brève recommandation basée sur l'analyse]
```

### 4. Présenter l'analyse de parité et les options

Afficher :

"**Analyse de parité terminée**

Votre cahier des charges produit (PRD) ne contient pas {count} des 6 sections fondamentales du cahier des charges produit (PRD) BMAD. L'effort global pour atteindre le standard BMAD est : **{effort level}**

**Bref résumé :**
[Résumé de 2-3 phrases sur les écarts clés]

**Recommandation :**
{recommendation from analysis}

**Comment souhaitez-vous procéder ?**"

### 5. Présenter les OPTIONS DU MENU

**[C] Continuer la validation** - Procéder à la validation en utilisant la structure actuelle
**[E] Quitter & Examiner** - Quitter la validation et examiner le rapport de parité
**[S] Sauvegarder & Quitter** - Sauvegarder le rapport de parité et quitter

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre la contribution de l'utilisateur
- Ne procéder qu'en fonction de la sélection de l'utilisateur

#### Logique de gestion du menu :

- SI C (Continuer) : Afficher "Poursuite de la validation..." puis lire intégralement et suivre : {nextStepFile}
- SI E (Quitter) : Afficher le résumé de parité et quitter la validation
- SI S (Sauvegarder) : Confirmer la sauvegarde, afficher le résumé, quitter
- SI tout autre choix : aider l'utilisateur à répondre, puis réafficher le menu

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Les 6 sections du cahier des charges produit (PRD) BMAD ont été analysées pour identifier les écarts
- Des estimations d'effort ont été fournies pour chaque écart
- L'effort de parité global a été évalué correctement
- L'analyse de parité a été consignée dans le rapport de validation
- Un résumé clair a été présenté à l'utilisateur
- L'utilisateur peut choisir de continuer la validation, quitter ou sauvegarder le rapport

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas analyser les 6 sections de manière systématique
- Estimations d'effort manquantes
- Ne pas consigner l'analyse de parité dans le rapport de validation
- Continuer automatiquement sans la décision de l'utilisateur
- Recommandations peu claires

**Règle principale :** La vérification de parité informe l'utilisateur des écarts et de l'effort, mais c'est l'utilisateur qui décide s'il poursuit la validation ou s'il comble d'abord les écarts.
