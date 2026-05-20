---
name: 'step-v-06-traceability-validation'
description: 'Validation de la traçabilité - Valider que la chaîne de traçabilité vision → succès → parcours → RF est intacte'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-07-implementation-leakage-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 6 : Validation de la traçabilité

## OBJECTIF DE L'ÉTAPE :

Valider que la chaîne de traçabilité Résumé Opérationnel → Critères de Succès → Parcours Utilisateurs → Exigences Fonctionnelles est intacte, garantissant que chaque exigence remonte à un besoin utilisateur ou à un objectif métier.

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
- ✅ Vous apportez une rigueur analytique et une expertise en matrice de traçabilité
- ✅ Cette étape s'exécute de manière autonome - aucune intervention de l'utilisateur n'est requise

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur la validation de la chaîne de traçabilité
- 🚫 INTERDIT de valider d'autres aspects dans cette étape
- 💬 Approche : Validation systématique de la chaîne et détection d'éléments orphelins
- 🚪 Il s'agit d'une étape de séquence de validation - procède automatiquement une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Construire et valider la matrice de traçabilité
- 💾 Identifier les chaînes rompues et les exigences orphelines
- 📖 Ajouter les conclusions au rapport de validation
- 📖 Afficher "Passage à la vérification suivante..." et charger l'étape suivante
- 🚫 INTERDIT de faire une pause ou de demander une intervention de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : fichier PRD, rapport de validation
- Focus : Validation de la chaîne de traçabilité uniquement
- Limites : Ne pas valider d'autres aspects, ne pas s'interrompre pour demander une intervention utilisateur
- Dépendances : Étapes 2 à 5 terminées - validations initiales effectuées

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre exactement cette séquence. Ne pas sauter d'étape, ne pas réorganiser ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Tentative de Validation par Sous-Processus

**Essayer d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation de la traçabilité sur ce PRD :

1. Extraire le contenu du Résumé Opérationnel (vision, objectifs)
2. Extraire les Critères de Succès
3. Extraire les Parcours Utilisateurs (types d'utilisateurs, flux, résultats)
4. Extraire les Exigences Fonctionnelles (RF)
5. Extraire le Périmètre du Produit (éléments inclus)

**Valider les chaînes :**

- Résumé Opérationnel → Critères de Succès : La vision est-elle alignée avec le succès défini ?
- Critères de Succès → Parcours Utilisateurs : Les critères de succès sont-ils soutenus par des parcours utilisateurs ?
- Parcours Utilisateurs → Exigences Fonctionnelles : Chaque RF remonte-t-elle à un parcours utilisateur ?
- Périmètre → RF : Les RF du périmètre MVP sont-elles alignées avec les éléments inclus ?

**Identifier les orphelins :**

- RF non traçables à un parcours utilisateur ou un objectif métier
- Critères de succès non soutenus par des parcours utilisateurs
- Parcours utilisateurs sans RF de soutien

Construire la matrice de traçabilité et identifier les chaînes rompues et les RF orphelines.

Retourner les conclusions structurées avec le statut de la chaîne et la liste des orphelins."

### 2. Dégradation Élégante (si l'outil Task est indisponible)

Si l'outil Task est indisponible, effectuer l'analyse directement :

**Étape 1 : Extraire les éléments clés**

- Résumé Opérationnel : Noter la vision, les buts, les objectifs
- Critères de Succès : Lister tous les critères
- Parcours Utilisateurs : Lister les types d'utilisateurs et leurs flux
- Exigences Fonctionnelles : Lister toutes les RF
- Périmètre du Produit : Lister les éléments inclus

**Étape 2 : Valider Résumé Opérationnel → Critères de Succès**

- Le Résumé Opérationnel mentionne-t-il les dimensions du succès ?
- Les Critères de Succès sont-ils alignés avec la vision ?
- Noter tout désalignement

**Étape 3 : Valider Critères de Succès → Parcours Utilisateurs**

- Pour chaque critère de succès, y a-t-il un parcours utilisateur qui l'atteint ?
- Noter les critères de succès sans parcours de soutien

**Étape 4 : Valider Parcours Utilisateurs → RF**

- Pour chaque parcours utilisateur/flux, y a-t-il des RF qui le permettent ?
- Lister les RF sans origine claire dans un parcours utilisateur
- Noter les RF orphelines (exigences sans source traçable)

**Étape 5 : Valider Périmètre → Alignement des RF**

- Le périmètre MVP est-il aligné avec les RF essentielles ?
- Les éléments inclus sont-ils soutenus par des RF ?
- Noter les désalignements

**Étape 6 : Construire la matrice de traçabilité**

- Associer chaque RF à sa source (parcours ou objectif métier)
- Noter les RF orphelines
- Identifier les chaînes rompues

### 3. Décompte des problèmes de traçabilité

**Chaînes rompues :**

- Lacunes Résumé Opérationnel → Critères de Succès : nombre
- Lacunes Critères de Succès → Parcours Utilisateurs : nombre
- Lacunes Parcours Utilisateurs → RF : nombre
- Désalignements Périmètre → RF : nombre

**Éléments orphelins :**

- RF orphelines (pas de source traçable) : nombre
- Critères de succès non soutenus : nombre
- Parcours utilisateurs sans RF : nombre

**Total des problèmes :** Somme de toutes les chaînes rompues et des orphelins

### 4. Rapporter les conclusions de traçabilité au Rapport de Validation

Ajouter au rapport de validation :

```markdown
## Validation de la traçabilité

### Validation de la chaîne

**Résumé Opérationnel → Critères de Succès :** [Intacte/Lacunes Identifiées]
{Si lacunes : Lister les désalignements spécifiques}

**Critères de Succès → Parcours Utilisateurs :** [Intacte/Lacunes Identifiées]
{Si lacunes : Lister les critères de succès non soutenus}

**Parcours Utilisateurs → Exigences Fonctionnelles :** [Intacte/Lacunes Identifiées]
{Si lacunes : Lister les parcours sans RF de soutien}

**Périmètre → Alignement des RF :** [Intacte/Désaligné]
{Si désaligné : Lister les problèmes spécifiques}

### Éléments orphelins

**Exigences Fonctionnelles orphelines :** {count}
{Lister les RF orphelines avec leurs numéros}

**Critères de succès non soutenus :** {count}
{Lister les critères non soutenus}

**Parcours utilisateurs sans RF :** {count}
{Lister les parcours sans RF}

### Matrice de traçabilité

{Tableau récapitulatif montrant la couverture de traçabilité}

**Total des problèmes de traçabilité :** {total}

**Sévérité :** [Critique si des RF orphelines existent, Avertissement si lacunes, Réussi si intacte]

**Recommandation :**
[Si Critique] "Des exigences orphelines existent - chaque RF doit remonter à un besoin utilisateur ou un objectif métier."
[Si Avertissement] "Lacunes de traçabilité identifiées - renforcer les chaînes pour s'assurer que toutes les exigences sont justifiées."
[If Pass] "La chaîne de traçabilité est intacte - toutes les exigences remontent à des besoins utilisateurs ou des objectifs métier."
```

### 5. Afficher la progression et procéder automatiquement

Afficher : "**Validation de la traçabilité terminée**

Total des problèmes : {count} ({severity})

**Passage à la vérification de validation suivante...**"

Sans délai, lire entièrement et suivre : {nextStepFile} (step-v-07-implementation-leakage-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Toutes les chaînes de traçabilité validées systématiquement
- RF orphelines identifiées avec leurs numéros
- Chaînes rompues documentées
- Matrice de traçabilité construite
- Sévérité évaluée correctement
- Conclusions rapportées au rapport de validation
- Passage automatique à l'étape de validation suivante
- Sous-processus tenté avec dégradation élégante

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas valider toutes les chaînes de traçabilité
- Détection des RF orphelines manquante
- Ne pas construire de matrice de traçabilité
- Ne pas rapporter les conclusions au rapport de validation
- Ne pas procéder automatiquement

**Règle Maîtresse :** Chaque exigence doit remonter à un besoin utilisateur ou un objectif métier. Les RF orphelines indiquent une traçabilité rompue qui doit être corrigée.
