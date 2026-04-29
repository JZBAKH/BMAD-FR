---
name: 'step-v-06-traceability-validation'
description: 'Validation de la Traçabilité - Valider que la chaîne de traçabilité vision → succès → parcours → EF est intacte'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-07-implementation-leakage-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 6 : Validation de la Traçabilité

## OBJECTIF DE L'ÉTAPE :

Valider que la chaîne de traçabilité depuis le Résumé Analytique → Critères de Succès → Parcours Utilisateurs → Exigences Fonctionnelles est intacte, garantissant que chaque exigence remonte à un besoin utilisateur ou à un objectif commercial.

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
- ✅ Vous apportez une rigueur analytique et une expertise en matrice de traçabilité.
- ✅ Cette étape s'exécute de manière autonome - aucune entrée de l'utilisateur n'est nécessaire.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la validation de la chaîne de traçabilité.
- 🚫 INTERDICTION de valider d'autres aspects dans cette étape.
- 💬 Approche : Validation systématique de la chaîne et détection d'éléments orphelins.
- 🚪 Il s'agit d'une étape de séquence de validation - elle passe automatiquement à la suite une fois terminée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Construire et valider la matrice de traçabilité.
- 💾 Identifier les chaînes brisées et les exigences orphelines.
- 📖 Ajouter les résultats au rapport de validation.
- 📖 Afficher "Passage au contrôle suivant..." et charger l'étape suivante.
- 🚫 INTERDICTION de s'arrêter ou de demander l'entrée de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD, rapport de validation.
- Focus : Validation de la chaîne de traçabilité uniquement.
- Limites : Ne pas valider d'autres aspects, ne pas s'arrêter pour l'entrée de l'utilisateur.
- Dépendances : Étapes 2 à 5 terminées - validations initiales effectuées.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter la validation par sous-processus

**Essayez d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation de la traçabilité sur ce PRD :

1. Extraire le contenu du Résumé Analytique (vision, buts).
2. Extraire les Critères de Succès.
3. Extraire les Parcours Utilisateurs (types d'utilisateurs, flux, résultats).
4. Extraire les Exigences Fonctionnelles (EF).
5. Extraire le Périmètre du Produit (éléments inclus).

**Valider les chaînes :**
- Résumé Analytique → Critères de Succès : La vision est-elle alignée avec le succès défini ?
- Critères de Succès → Parcours Utilisateurs : Les critères de succès sont-ils soutenus par des parcours utilisateurs ?
- Parcours Utilisateurs → Exigences Fonctionnelles : Chaque EF remonte-t-elle à un parcours utilisateur ?
- Périmètre → EF : Les EF du périmètre MVP sont-elles alignées avec les éléments inclus ?

**Identifier les éléments orphelins :**
- EF non traçables à un parcours utilisateur ou un objectif commercial.
- Critères de succès non soutenus par des parcours utilisateurs.
- Parcours utilisateurs sans EF de soutien.

Construire la matrice de traçabilité et identifier les chaînes brisées et les EF orphelines.

Retourner les résultats structurés avec l'état de la chaîne et la liste des éléments orphelins."

### 2. Dégradation gracieuse (si l'outil Task est indisponible)

Si l'outil Task est indisponible, effectuez l'analyse directement :

**Étape 1 : Extraire les éléments clés**
- Résumé Analytique : Notez la vision, les buts, les objectifs.
- Critères de Succès : Listez tous les critères.
- Parcours Utilisateurs : Listez les types d'utilisateurs et leurs flux.
- Exigences Fonctionnelles : Listez toutes les EF.
- Périmètre du Produit : Listez les éléments inclus.

**Étape 2 : Valider Résumé Analytique → Critères de Succès**
- Le Résumé Analytique mentionne-t-il les dimensions du succès ?
- Les Critères de Succès sont-ils alignés avec la vision ?
- Notez tout désalignement.

**Étape 3 : Valider Critères de Succès → Parcours Utilisateurs**
- Pour chaque critère de succès, existe-t-il un parcours utilisateur qui permet de l'atteindre ?
- Notez les critères de succès sans parcours de soutien.

**Étape 4 : Valider Parcours Utilisateurs → EF**
- Pour chaque parcours/flux utilisateur, existe-t-il des EF qui l'activent ?
- Listez les EF sans origine claire dans un parcours utilisateur.
- Notez les EF orphelines (exigences sans source traçable).

**Étape 5 : Valider l'alignement Périmètre → EF**
- Le périmètre MVP est-il aligné avec les EF essentielles ?
- Les éléments inclus sont-ils soutenus par des EF ?
- Notez les désalignements.

**Étape 6 : Construire la matrice de traçabilité**
- Mapper chaque EF à sa source (parcours ou objectif commercial).
- Notez les EF orphelines.
- Identifiez les chaînes brisées.

### 3. Comptabiliser les problèmes de traçabilité

**Chaînes brisées :**
- Résumé Analytique → Lacunes Critères de Succès : nombre
- Critères de Succès → Lacunes Parcours Utilisateurs : nombre
- Parcours Utilisateurs → Lacunes EF : nombre
- Périmètre → Désalignements EF : nombre

**Éléments orphelins :**
- EF orphelines (pas de source traçable) : nombre
- Critères de succès non soutenus : nombre
- Parcours utilisateurs sans EF : nombre

**Total des problèmes :** Somme de toutes les chaînes brisées et des éléments orphelins.

### 4. Rapporter les résultats de traçabilité dans le rapport de validation

Ajoutez au rapport de validation :

```markdown
## Validation de la Traçabilité

### Validation de la Chaîne

**Résumé Analytique → Critères de Succès :** [Intacte/Lacunes identifiées]
{Si lacunes : Listez les désalignements spécifiques}

**Critères de Succès → Parcours Utilisateurs :** [Intacte/Lacunes identifiées]
{Si lacunes : Listez les critères de succès non soutenus}

**Parcours Utilisateurs → Exigences Fonctionnelles :** [Intacte/Lacunes identifiées]
{Si lacunes : Listez les parcours sans EF de soutien}

**Périmètre → Alignement EF :** [Intacte/Désaligné]
{Si désaligné : Listez les problèmes spécifiques}

### Éléments Orphelins

**Exigences Fonctionnelles Orphelines :** {count}
{Listez les EF orphelines avec leurs numéros}

**Critères de Succès Non Soutenus :** {count}
{Listez les critères non soutenus}

**Parcours Utilisateurs Sans EF :** {count}
{Listez les parcours sans EF}

### Matrice de Traçabilité

{Tableau récapitulatif montrant la couverture de la traçabilité}

**Total des problèmes de traçabilité :** {total}

**Sévérité :** [Critique si des EF orphelines existent, Avertissement si lacunes, Réussite si intacte]

**Recommandation :**
[Si Critique] "Des exigences orphelines existent - chaque EF doit remonter à un besoin utilisateur ou un objectif commercial."
[Si Avertissement] "Lacunes de traçabilité identifiées - renforcez les chaînes pour garantir que toutes les exigences sont justifiées."
[Si Réussite] "La chaîne de traçabilité est intacte - toutes les exigences remontent à des besoins utilisateurs ou des objectifs commerciaux."
```

### 5. Afficher la progression et procéder automatiquement

Affichez : "**Validation de la traçabilité terminée**

Total des problèmes : {count} ({sévérité})

**Passage au prochain contrôle de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-07-implementation-leakage-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Toutes les chaînes de traçabilité validées systématiquement.
- EF orphelines identifiées avec leurs numéros.
- Chaînes brisées documentées.
- Matrice de traçabilité construite.
- Sévérité évaluée correctement.
- Résultats rapportés dans le rapport de validation.
- Passage automatique à l'étape de validation suivante.
- Sous-processus tenté avec dégradation gracieuse.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas valider toutes les chaînes de traçabilité.
- Détection des EF orphelines manquante.
- Ne pas construire la matrice de traçabilité.
- Ne pas rapporter les résultats dans le rapport de validation.
- Ne pas procéder automatiquement.

**Règle Maîtresse :** Chaque exigence doit remonter à un besoin utilisateur ou un objectif commercial. Les EF orphelines indiquent une traçabilité rompue qui doit être corrigée.
