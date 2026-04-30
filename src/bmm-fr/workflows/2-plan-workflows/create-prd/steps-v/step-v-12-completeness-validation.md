---
name: 'step-v-12-completeness-validation'
description: 'Contrôle de l''Exhaustivité - Dernier contrôle exhaustif complet avant la génération du rapport'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-13-report-complete.md'
prdFile: '{prd_file_path}'
prdFrontmatter: '{prd_frontmatter}'
validationReportPath: '{validation_report_path}'
---

# Étape 12 : Validation de l'Exhaustivité

## OBJECTIF DE L'ÉTAPE :

Dernier contrôle exhaustif de l'intégralité - valider qu'aucune variable de modèle ne subsiste, que chaque section contient le contenu requis, vérification de l'exhaustivité spécifique aux sections et que le frontmatter est correctement rempli.

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
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif.
- ✅ Vous apportez une attention particulière aux détails et à la vérification de l'exhaustivité.
- ✅ Cette étape s'exécute de manière autonome - aucune entrée de l'utilisateur n'est nécessaire.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la vérification de l'exhaustivité.
- 🚫 INTERDICTION de valider la qualité (fait à l'étape 11) ou d'autres aspects.
- 💬 Approche : Vérification systématique sous forme de checklist.
- 🚪 Il s'agit d'une étape de séquence de validation - elle passe automatiquement à la suite une fois terminée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Vérifier l'exhaustivité du modèle (aucune variable restante).
- 🎯 Valider l'exhaustivité du contenu (chaque section a le contenu requis).
- 🎯 Valider l'exhaustivité spécifique aux sections.
- 🎯 Valider l'exhaustivité du frontmatter.
- 💾 Ajouter la matrice d'exhaustivité au rapport de validation.
- 📖 Afficher "Passage à l'étape finale..." et charger l'étape suivante.
- 🚫 INTERDICTION de s'arrêter ou de demander l'entrée de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD complet, frontmatter, rapport de validation.
- Focus : Vérification de l'exhaustivité uniquement (touche finale).
- Limites : Ne pas évaluer la qualité, ne pas s'arrêter pour l'entrée de l'utilisateur.
- Dépendances : Étapes 1 à 11 terminées - tous les contrôles de validation effectués.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter la validation par sous-processus

**Essayez d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation de l'exhaustivité sur ce PRD - contrôle final :

**1. Exhaustivité du modèle :**
- Scanner le PRD pour toute variable de modèle restante.
- Rechercher : {variable}, {{variable}}, {placeholder}, [placeholder], etc.
- Lister tout élément trouvé avec les numéros de ligne.

**2. Exhaustivité du contenu :**
- Résumé Analytique : Contient l'énoncé de vision ? ({contenu clé})
- Critères de Succès : Tous les critères sont mesurables ? ({métriques présentes})
- Périmètre du Produit : Éléments inclus et hors périmètre définis ? ({les deux présents})
- Parcours Utilisateurs : Types d'utilisateurs identifiés ? ({utilisateurs listés})
- Exigences Fonctionnelles : EF listées avec le format approprié ? ({EF présentes})
- Exigences Non Fonctionnelles : ENF avec métriques ? ({ENF présentes})

Pour chaque section : Le contenu requis est-il présent ? (Oui/Non/Partiel)

**3. Exhaustivité spécifique aux sections :**
- Critères de Succès : Chacun a une méthode de mesure spécifique ?
- Parcours Utilisateurs : Couvrent tous les types d'utilisateurs ?
- Exigences Fonctionnelles : Couvrent le périmètre MVP ?
- Exigences Non Fonctionnelles : Chacune a des critères spécifiques ?

**4. Exhaustivité du frontmatter :**
- stepsCompleted : Rempli ?
- classification : Présent (domain, projectType) ?
- inputDocuments : Suivi ?
- date : Présent ?

Retourner la matrice d'exhaustivité avec l'état de chaque vérification."

**Dégradation gracieuse (si l'outil Task est indisponible) :**
- Scanner manuellement les variables de modèle.
- Vérifier manuellement chaque section pour le contenu requis.
- Vérifier manuellement les champs du frontmatter.
- Construire la matrice d'exhaustivité.

### 2. Construire la matrice d'exhaustivité

**Exhaustivité du modèle :**
- Variables de modèle trouvées : nombre
- Lister si des variables sont trouvées.

**Exhaustivité du contenu par section :**
- Résumé Analytique : Complet / Incomplet / Manquant
- Critères de Succès : Complet / Incomplet / Manquant
- Périmètre du Produit : Complet / Incomplet / Manquant
- Parcours Utilisateurs : Complet / Incomplet / Manquant
- Exigences Fonctionnelles : Complet / Incomplet / Manquant
- Exigences Non Fonctionnelles : Complet / Incomplet / Manquant
- Autres sections : [Lister l'exhaustivité]

**Exhaustivité spécifique aux sections :**
- Critères de succès mesurables : Tous / Certains / Aucun
- Parcours couvrant tous les utilisateurs : Oui / Partiel / Non
- EF couvrant le périmètre MVP : Oui / Partiel / Non
- ENF ayant des critères spécifiques : Tous / Certains / Aucun

**Exhaustivité du frontmatter :**
- stepsCompleted : Présent / Manquant
- classification : Présent / Manquant
- inputDocuments : Présent / Manquant
- date : Présent / Manquant

**Exhaustivité globale :**
- Sections complètes : X/Y
- Lacunes critiques : [liste le cas échéant]

### 3. Rapporter les résultats d'exhaustivité dans le rapport de validation

Ajoutez au rapport de validation :

```markdown
## Validation de l'Exhaustivité

### Exhaustivité du Modèle

**Variables de modèle trouvées :** {count}
{Si count > 0, listez les variables avec les numéros de ligne}
{Si count = 0, note : Aucune variable de modèle restante ✓}

### Exhaustivité du Contenu par Section

**Résumé Analytique :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, notez les lacunes spécifiques}

**Critères de Succès :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, notez les lacunes spécifiques}

**Périmètre du Produit :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, notez les lacunes spécifiques}

**Parcours Utilisateurs :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, notez les lacunes spécifiques}

**Exigences Fonctionnelles :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, notez les lacunes spécifiques}

**Exigences Non Fonctionnelles :** [Complet/Incomplet/Manquant]
{Si incomplet ou manquant, notez les lacunes spécifiques}

### Exhaustivité Spécifique aux Sections

**Mesurabilité des Critères de Succès :** [Tous/Certains/Aucun] mesurables
{Si Certains ou Aucun, notez quels critères manquent de métriques}

**Couverture des Parcours Utilisateurs :** [Oui/Partiel/Non] - couvre tous les types d'utilisateurs
{Si Partiel ou Non, notez les types d'utilisateurs manquants}

**Les EF couvrent le périmètre MVP :** [Oui/Partiel/Non]
{Si Partiel ou Non, notez les lacunes de périmètre}

**Les ENF ont des critères spécifiques :** [Tous/Certains/Aucun]
{Si Certains ou Aucun, notez quelles ENF manquent de spécificité}

### Exhaustivité du Frontmatter

**stepsCompleted :** [Présent/Manquant]
**classification :** [Présent/Manquant]
**inputDocuments :** [Présent/Manquant]
**date :** [Présent/Manquant]

**Exhaustivité du Frontmatter :** {complete_fields}/4

### Résumé de l'Exhaustivité

**Exhaustivité Globale :** {percentage}% ({complete_sections}/{total_sections})

**Lacunes Critiques :** [nombre] [liste le cas échéant]
**Lacunes Mineures :** [nombre] [liste le cas échéant]

**Sévérité :** [Critique si des variables de modèle existent ou si des sections critiques manquent, Avertissement si lacunes mineures, Réussite si complet]

**Recommandation :**
[Si Critique] "Le PRD présente des lacunes d'exhaustivité qui doivent être traitées avant utilisation. Corrigez les variables de modèle et complétez les sections manquantes."
[Si Avertissement] "Le PRD présente des lacunes d'exhaustivité mineures. Traitez ces lacunes pour une documentation complète."
[Si Réussite] "Le PRD est complet avec toutes les sections et tout le contenu requis présents."
```

### 4. Afficher la progression et procéder automatiquement

Affichez : "**Validation de l'exhaustivité terminée**

Exhaustivité globale : {percentage}% ({severity})

**Passage à l'étape finale...**"

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-13-report-complete.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Balayage systématique des variables de modèle effectué.
- Chaque section validée pour le contenu requis.
- Exhaustivité spécifique aux sections validée (mesurabilité, couverture, périmètre).
- Exhaustivité du frontmatter validée.
- Matrice d'exhaustivité construite avec tous les contrôles.
- Sévérité évaluée correctement.
- Résultats rapportés dans le rapport de validation.
- Passage automatique à l'étape finale.
- Sous-processus tenté avec dégradation gracieuse.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas scanner les variables de modèle.
- Contrôles d'exhaustivité spécifiques aux sections manquants.
- Ne pas valider le frontmatter.
- Ne pas construire de matrice d'exhaustivité.
- Ne pas rapporter les résultats dans le rapport de validation.
- Ne pas procéder automatiquement.

**Règle Maîtresse :** Dernière barrière pour s'assurer que le document est complet avant de présenter les résultats. Les variables de modèle ou les lacunes critiques doivent être corrigées.
