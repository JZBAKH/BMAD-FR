---
name: 'step-v-07-implementation-leakage-validation'
description: 'Vérification de la fuite d\'implémentation - S\'assurer que les RF et RNF n\'incluent pas de détails d\'implémentation'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-08-domain-compliance-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 7 : Validation de la fuite d'implémentation

## OBJECTIF DE L'ÉTAPE :

S'assurer que les Exigences Fonctionnelles et les Exigences Non-Fonctionnelles n'incluent pas de détails d'implémentation - elles doivent spécifier le QUOI, pas le COMMENT.

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
- ✅ Vous apportez une rigueur analytique et une expertise en séparation des préoccupations
- ✅ Cette étape s'exécute de manière autonome - aucune intervention de l'utilisateur n'est requise

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur la détection des fuites d'implémentation
- 🚫 INTERDIT de valider d'autres aspects dans cette étape
- 💬 Approche : Analyse systématique des termes technologiques et d'implémentation
- 🚪 Il s'agit d'une étape de séquence de validation - procède automatiquement une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Analyser les RF et RNF pour les termes d'implémentation
- 💾 Distinguer ce qui est pertinent pour la capacité de ce qui est une fuite
- 📖 Ajouter les conclusions au rapport de validation
- 📖 Afficher "Passage à la vérification suivante..." et charger l'étape suivante
- 🚫 INTERDIT de faire une pause ou de demander une intervention de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : fichier PRD, rapport de validation
- Focus : Détection des fuites d'implémentation uniquement
- Limites : Ne pas valider d'autres aspects, ne pas s'interrompre pour demander une intervention utilisateur
- Dépendances : Étapes 2 à 6 terminées - validations initiales effectuées

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre exactement cette séquence. Ne pas sauter d'étape, ne pas réorganiser ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Tentative de Validation par Sous-Processus

**Essayer d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation de la fuite d'implémentation sur ce PRD :

**Rechercher :**

1. Noms de technologies (React, Vue, Angular, PostgreSQL, MongoDB, AWS, GCP, Azure, Docker, Kubernetes, etc.)
2. Noms de bibliothèques (Redux, axios, lodash, Express, Django, Rails, Spring, etc.)
3. Structures de données (JSON, XML, CSV) sauf si pertinent pour la capacité
4. Modèles d'architecture (MVC, microservices, serverless) sauf exigence métier
5. Noms de protocoles (HTTP, REST, GraphQL, WebSockets) - vérifier si pertinent pour la capacité

**Pour chaque terme trouvé :**

- Est-ce pertinent pour la capacité ? (ex: 'Les consommateurs d'API peuvent accéder...' - API est une capacité)
- Ou est-ce un détail d'implémentation ? (ex: 'Composant React pour...' - implémentation)

Documenter les violations avec les numéros de ligne et une explication.

Retourner les conclusions structurées avec le décompte des fuites et des exemples."

### 2. Dégradation Élégante (si l'outil Task est indisponible)

Si l'outil Task est indisponible, effectuer l'analyse directement :

**Termes de fuite d'implémentation à rechercher :**

**Frameworks Frontend :**
React, Vue, Angular, Svelte, Solid, Next.js, Nuxt, etc.

**Frameworks Backend :**
Express, Django, Rails, Spring, Laravel, FastAPI, etc.

**Bases de données :**
PostgreSQL, MySQL, MongoDB, Redis, DynamoDB, Cassandra, etc.

**Plateformes Cloud :**
AWS, GCP, Azure, Cloudflare, Vercel, Netlify, etc.

**Infrastructure :**
Docker, Kubernetes, Terraform, Ansible, etc.

**Bibliothèques :**
Redux, Zustand, axios, fetch, lodash, jQuery, etc.

**Formats de données :**
JSON, XML, YAML, CSV (sauf si pertinent pour la capacité)

**Pour chaque terme trouvé dans les RF/RNF :**

- Déterminer s'il est pertinent pour la capacité ou s'il s'agit d'une fuite d'implémentation
- Exemple : "Les consommateurs d'API peuvent accéder aux données via des points de terminaison REST" - API/REST est une capacité
- Exemple : "Les composants React récupèrent les données en utilisant Redux" - fuite d'implémentation

**Compter les violations et noter les numéros de ligne**

### 3. Décompte des fuites d'implémentation

**Par catégorie :**

- Fuite de framework frontend : nombre
- Fuite de framework backend : nombre
- Fuite de base de données : nombre
- Fuite de plateforme cloud : nombre
- Fuite d'infrastructure : nombre
- Fuite de bibliothèque : nombre
- Autres détails d'implémentation : nombre

**Total des violations de fuite d'implémentation :** somme

### 4. Rapporter les conclusions de fuite d'implémentation au Rapport de Validation

Ajouter au rapport de validation :

```markdown
## Validation de la fuite d'implémentation

### Fuite par catégorie

**Frameworks Frontend :** {count} violations
{Si violations, lister des exemples avec numéros de ligne}

**Frameworks Backend :** {count} violations
{Si violations, lister des exemples avec numéros de ligne}

**Bases de données :** {count} violations
{Si violations, lister des exemples avec numéros de ligne}

**Plateformes Cloud :** {count} violations
{Si violations, lister des exemples avec numéros de ligne}

**Infrastructure :** {count} violations
{Si violations, lister des exemples avec numéros de ligne}

**Bibliothèques :** {count} violations
{Si violations, lister des exemples avec numéros de ligne}

**Autres détails d'implémentation :** {count} violations
{Si violations, lister des exemples avec numéros de ligne}

### Résumé

**Total des violations de fuite d'implémentation :** {total}

**Sévérité :** [Critique si >5 violations, Avertissement si 2-5, Réussi si <2]

**Recommandation :**
[Si Critique] "Fuite d'implémentation importante trouvée. Les exigences spécifient le COMMENT au lieu du QUOI. Retirer tous les détails d'implémentation - ils appartiennent à l'architecture, pas au PRD."
[Si Avertissement] "Certaines fuites d'implémentation détectées. Revoir les violations et retirer les détails d'implémentation des exigences."
[Si Réussi] "Aucune fuite d'implémentation significative trouvée. Les exigences spécifient correctement le QUOI sans le COMMENT."

**Note :** Les consommateurs d'API, GraphQL (si requis) et d'autres termes pertinents pour la capacité sont acceptables lorsqu'ils décrivent CE QUE le système doit faire, et non COMMENT le construire.
```

### 5. Afficher la progression et procéder automatiquement

Afficher : "**Validation de la fuite d'implémentation terminée**

Total des violations : {count} ({severity})

**Passage à la vérification de validation suivante...**"

Sans délai, lire entièrement et suivre : {nextStepFile} (step-v-08-domain-compliance-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Analyse des RF et RNF pour toutes les catégories de termes d'implémentation
- Distinction entre ce qui est pertinent pour la capacité et une fuite d'implémentation
- Violations documentées avec numéros de ligne et explications
- Sévérité évaluée correctement
- Conclusions rapportées au rapport de validation
- Passage automatique à l'étape de validation suivante
- Sous-processus tenté avec dégradation élégante

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas analyser toutes les catégories de termes d'implémentation
- Ne pas distinguer la pertinence pour la capacité de la fuite
- Numéros de ligne manquants pour les violations
- Ne pas rapporter les conclusions au rapport de validation
- Ne pas procéder automatiquement

**Règle Maîtresse :** Les exigences spécifient le QUOI, pas le COMMENT. Les détails d'implémentation appartiennent aux documents d'architecture, pas aux PRD.
