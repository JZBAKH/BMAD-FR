---
name: 'step-v-12-completeness-validation'
description: 'Vérification de l\'exhaustivité - Dernière vérification complète de l\'exhaustivité avant la génération du rapport'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-13-report-complete.md'
prdFile: '{prd_file_path}'
prdFrontmatter: '{prd_frontmatter}'
validationReportPath: '{validation_report_path}'
---

# Étape 12 : Validation de l'exhaustivité

## OBJECTIF DE L'ÉTAPE :

Vérification finale complète de l'exhaustivité - valider qu'aucune variable de modèle ne subsiste, que chaque section a le contenu requis, vérifier l'exhaustivité spécifique aux sections et que le frontmatter est correctement rempli.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans intervention de l'utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant de prendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec [C], s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS VOUS EXPRIMER selon votre style de communication d'Agent avec la configuration `{communication_language}`

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif
- ✅ Vous apportez un souci du détail et une vérification de l'exhaustivité
- ✅ Cette étape s'exécute de manière autonome - aucune intervention de l'utilisateur n'est requise

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur la vérification de l'exhaustivité
- 🚫 INTERDIT de valider la qualité (fait à l'étape 11) ou d'autres aspects
- 💬 Approche : Vérification systématique sous forme de liste de contrôle (checklist)
- 🚪 Il s'agit d'une étape de séquence de validation - procède automatiquement une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Vérifier l'exhaustivité du modèle (aucune variable restante)
- 🎯 Valider l'exhaustivité du contenu (chaque section a le contenu requis)
- 🎯 Valider l'exhaustivité spécifique aux sections
- 🎯 Valider l'exhaustivité du frontmatter
- 💾 Ajouter la matrice d'exhaustivité au rapport de validation
- 📖 Afficher "Passage à l'étape finale..." et charger l'étape suivante
- 🚫 INTERDIT de faire une pause ou de demander une intervention de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : fichier PRD complet, frontmatter, rapport de validation
- Focus : Vérification de l'exhaustivité uniquement (dernière étape de contrôle)
- Limites : Ne pas évaluer la qualité, ne pas s'interrompre pour demander l'avis de l'utilisateur
- Dépendances : Étapes 1 à 11 terminées - toutes les vérifications de validation effectuées

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre exactement cette séquence. Ne pas sauter d'étape, ne pas réorganiser ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Tentative de validation par sous-processus

**Essayer d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation de l'exhaustivité sur ce PRD - vérification finale :

**1. Exhaustivité du modèle :**

- Analyser le PRD pour toute variable de modèle restante
- Rechercher : {variable}, {{variable}}, {placeholder}, [placeholder], etc.
- Lister tout élément trouvé avec les numéros de ligne

**2. Exhaustivité du contenu :**

- Résumé Opérationnel : Contient une déclaration de vision ? ({content key})
- Critères de Succès : Tous les critères sont mesurables ? ({metrics present})
- Périmètre du Produit : Périmètre inclus et exclu définis ? ({both present})
- Parcours Utilisateurs : Types d'utilisateurs identifiés ? ({users listed})
- Exigences Fonctionnelles : RF listées avec le format approprié ? ({RF present})
- Exigences Non-Fonctionnelles : RNF avec des métriques ? ({RNF present})

Pour chaque section : Le contenu requis est-il présent ? (Oui/Non/Partiel)

**3. Exhaustivité spécifique aux sections :**

- Critères de Succès : Chacun a une méthode de mesure spécifique ?
- Parcours Utilisateurs : Couvrent tous les types d'utilisateurs ?
- Exigences Fonctionnelles : Couvrent le périmètre MVP ?
- Exigences Non-Fonctionnelles : Chacune a des critères spécifiques ?

**4. Exhaustivité du Frontmatter :**

- stepsCompleted : Rempli ?
- classification : Présente (domaine, type de projet) ?
- inputDocuments : Suivis ?
- date : Présente ?

Retourner la matrice d'exhaustivité avec le statut pour chaque vérification."

**Dégradation élégante (si pas d'outil Task) :**

- Rechercher manuellement les variables de modèle
- Vérifier manuellement chaque section pour le contenu requis
- Vérifier manuellement les champs du frontmatter
- Construire la matrice d'exhaustivité

### 2. Construire la matrice d'exhaustivité

**Exhaustivité du modèle :**

- Variables de modèle trouvées : nombre
- Lister si des variables sont trouvées

**Exhaustivité du contenu par section :**

- Résumé Opérationnel : Complet / Incomplet / Manquant
- Critères de Succès : Complet / Incomplet / Manquant
- Périmètre du Produit : Complet / Incomplet / Manquant
- Parcours Utilisateurs : Complet / Incomplet / Manquant
- Exigences Fonctionnelles : Complet / Incomplet / Manquant
- Exigences Non-Fonctionnelles : Complet / Incomplet / Manquant
- Autres sections : [Lister l'exhaustivité]

**Exhaustivité spécifique aux sections :**

- Critères de succès mesurables : Tous / Certains / Aucun
- Les parcours couvrent tous les utilisateurs : Oui / Partiel / Non
- Les RF couvrent le périmètre MVP : Oui / Partiel / Non
- Les RNF ont des critères spécifiques : Tous / Certains / Aucun

**Exhaustivité du Frontmatter :**

- stepsCompleted : Présent / Manquant
- classification : Présent / Manquant
- inputDocuments : Présent / Manquant
- date : Présent / Manquant

**Exhaustivité globale :**

- Sections complètes : X/Y
- Lacunes critiques : [liste si présentes]

### 3. Rapporter les conclusions de l'exhaustivité au Rapport de Validation

Ajouter au rapport de validation :

```markdown
## Validation de l'exhaustivité

### Exhaustivité du modèle

**Variables de modèle trouvées :** {count}
{Si count > 0, lister les variables avec les numéros de ligne}
{Si count = 0, noter : Aucune variable de modèle restante ✓}

### Exhaustivité du contenu par section

**Résumé Opérationnel :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, noter les lacunes spécifiques}

**Critères de Succès :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, noter les lacunes spécifiques}

**Périmètre du Produit :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, noter les lacunes spécifiques}

**Parcours Utilisateurs :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, noter les lacunes spécifiques}

**Exigences Fonctionnelles :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, noter les lacunes spécifiques}

**Exigences Non-Fonctionnelles :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, noter les lacunes spécifiques}

### Exhaustivité spécifique aux sections

**Mesurabilité des critères de succès :** [Tous/Certains/Aucun] mesurables
{Si Certains ou Aucun, noter quels critères manquent de métriques}

**Couverture des parcours utilisateurs :** [Oui/Partiel/Non] - couvre tous les types d'utilisateurs
{Si Partiel ou Non, noter les types d'utilisateurs manquants}

**Les RF couvrent le périmètre MVP :** [Oui/Partiel/Non]
{Si Partiel ou Non, noter les lacunes de périmètre}

**Les RNF ont des critères spécifiques :** [Tous/Certains/Aucun]
{Si Certains ou Aucun, noter quelles RNF manquent de spécificité}

### Exhaustivité du Frontmatter

**stepsCompleted :** [Présent/Manquant]
**classification :** [Présente/Manquante]
**inputDocuments :** [Présents/Manquants]
**date :** [Présente/Manquante]

**Exhaustivité du Frontmatter :** {complete_fields}/4

### Résumé de l'exhaustivité

**Exhaustivité globale :** {percentage}% ({complete_sections}/{total_sections})

**Lacunes critiques :** [nombre] [lister si présentes]
**Lacunes mineures :** [nombre] [lister si présentes]

**Sévérité :** [Critique si des variables de modèle existent ou si des sections critiques manquent, Avertissement si lacunes mineures, Réussi si complet]

**Recommandation :**
[Si Critique] "Le PRD présente des lacunes d'exhaustivité qui doivent être corrigées avant utilisation. Supprimer les variables de modèle et compléter les sections manquantes."
[Si Avertissement] "Le PRD présente des lacunes d'exhaustivité mineures. Corriger ces lacunes pour une documentation complète."
[Si Réussi] "Le PRD est complet, toutes les sections et le contenu requis sont présents."
```

### 4. Afficher la progression et procéder automatiquement

Afficher : "**Validation de l'exhaustivité terminée**

Exhaustivité globale : {percentage}% ({severity})

**Passage à l'étape finale...**"

Sans délai, lire entièrement et suivre : {nextStepFile} (step-v-13-report-complete.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Recherche systématique des variables de modèle
- Validation de chaque section pour le contenu requis
- Validation de l'exhaustivité spécifique aux sections (mesurabilité, couverture, périmètre)
- Validation de l'exhaustivité du frontmatter
- Matrice d'exhaustivité construite avec toutes les vérifications
- Sévérité évaluée correctement
- Conclusions rapportées au rapport de validation
- Passage automatique à l'étape finale
- Sous-processus tenté avec dégradation élégante

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas rechercher les variables de modèle
- Vérifications d'exhaustivité spécifiques aux sections manquantes
- Ne pas valider le frontmatter
- Ne pas construire de matrice d'exhaustivité
- Ne pas rapporter les conclusions au rapport de validation
- Ne pas procéder automatiquement

**Règle Maîtresse :** Dernière étape de contrôle pour s'assurer que le document est complet avant de présenter les conclusions. Les variables de modèle ou les lacunes critiques doivent être corrigées.
