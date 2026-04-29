---
name: 'step-v-07-implementation-leakage-validation'
description: 'Contrôle de Fuite d''Implémentation - S''assurer que les EF et ENF n''incluent pas de détails d''implémentation'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-08-domain-compliance-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 7 : Validation des Fuites d'Implémentation

## OBJECTIF DE L'ÉTAPE :

S'assurer que les Exigences Fonctionnelles (EF) et les Exigences Non Fonctionnelles (ENF) n'incluent pas de détails d'implémentation - elles doivent spécifier le QUOI, pas le COMMENT.

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
- ✅ Vous apportez une rigueur analytique et une expertise en séparation des préoccupations (separation of concerns).
- ✅ Cette étape s'exécute de manière autonome - aucune entrée de l'utilisateur n'est nécessaire.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la détection des fuites d'implémentation.
- 🚫 INTERDICTION de valider d'autres aspects dans cette étape.
- 💬 Approche : Balayage systématique des termes technologiques et d'implémentation.
- 🚪 Il s'agit d'une étape de séquence de validation - elle passe automatiquement à la suite une fois terminée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Scanner les EF et ENF pour trouver des termes d'implémentation.
- 💾 Distinguer ce qui est pertinent pour la capacité de ce qui est une fuite.
- 📖 Ajouter les résultats au rapport de validation.
- 📖 Afficher "Passage au contrôle suivant..." et charger l'étape suivante.
- 🚫 INTERDICTION de s'arrêter ou de demander l'entrée de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD, rapport de validation.
- Focus : Détection des fuites d'implémentation uniquement.
- Limites : Ne pas valider d'autres aspects, ne pas s'arrêter pour l'entrée de l'utilisateur.
- Dépendances : Étapes 2 à 6 terminées - validations initiales effectuées.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter la validation par sous-processus

**Essayez d'utiliser l'outil Task pour lancer un sous-processus :**

"Effectuer la validation des fuites d'implémentation sur ce PRD :

**Scanner pour :**
1. Noms de technologies (React, Vue, Angular, PostgreSQL, MongoDB, AWS, GCP, Azure, Docker, Kubernetes, etc.).
2. Noms de bibliothèques (Redux, axios, lodash, Express, Django, Rails, Spring, etc.).
3. Structures de données (JSON, XML, CSV) sauf si pertinent pour la capacité.
4. Modèles d'architecture (MVC, microservices, serverless) sauf si c'est une exigence commerciale.
5. Noms de protocoles (HTTP, REST, GraphQL, WebSockets) - vérifiez si c'est pertinent pour la capacité.

**Pour chaque terme trouvé :**
- Est-ce pertinent pour la capacité ? (ex: 'Les consommateurs d'API peuvent accéder...' - API est une capacité).
- Ou est-ce un détail d'implémentation ? (ex: 'Composant React pour...' - implémentation).

Documenter les violations avec les numéros de ligne et une explication.

Retourner les résultats structurés avec les comptes de fuites et les exemples."

### 2. Dégradation gracieuse (si l'outil Task est indisponible)

Si l'outil Task est indisponible, effectuez l'analyse directement :

**Termes de fuite d'implémentation à scanner :**

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
JSON, XML, YAML, CSV (sauf si pertinent pour la capacité).

**Pour chaque terme trouvé dans les EF/ENF :**
- Déterminer s'il est pertinent pour la capacité ou s'il s'agit d'une fuite d'implémentation.
- Exemple : "Les consommateurs d'API peuvent accéder aux données via des points de terminaison REST" - API/REST est une capacité.
- Exemple : "Les composants React récupèrent les données en utilisant Redux" - fuite d'implémentation.

**Compter les violations et noter les numéros de ligne.**

### 3. Comptabiliser les fuites d'implémentation

**Par catégorie :**
- Fuite de framework frontend : nombre
- Fuite de framework backend : nombre
- Fuite de base de données : nombre
- Fuite de plateforme cloud : nombre
- Fuite d'infrastructure : nombre
- Fuite de bibliothèque : nombre
- Autres détails d'implémentation : nombre

**Total des violations de fuite d'implémentation :** somme

### 4. Rapporter les résultats de fuite d'implémentation dans le rapport de validation

Ajoutez au rapport de validation :

```markdown
## Validation des Fuites d'Implémentation

### Fuites par Catégorie

**Frameworks Frontend :** {count} violations
{Si violations, listez les exemples avec les numéros de ligne}

**Frameworks Backend :** {count} violations
{Si violations, listez les exemples avec les numéros de ligne}

**Bases de données :** {count} violations
{Si violations, listez les exemples avec les numéros de ligne}

**Plateformes Cloud :** {count} violations
{Si violations, listez les exemples avec les numéros de ligne}

**Infrastructure :** {count} violations
{Si violations, listez les exemples avec les numéros de ligne}

**Bibliothèques :** {count} violations
{Si violations, listez les exemples avec les numéros de ligne}

**Autres Détails d'Implémentation :** {count} violations
{Si violations, listez les exemples avec les numéros de ligne}

### Résumé

**Total des Violations de Fuite d'Implémentation :** {total}

**Sévérité :** [Critique si >5 violations, Avertissement si 2-5, Réussite si <2]

**Recommandation :**
[Si Critique] "Importante fuite d'implémentation trouvée. Les exigences spécifient le COMMENT au lieu du QUOI. Retirez tous les détails d'implémentation - ceux-ci appartiennent à l'architecture, pas au PRD."
[Si Avertissement] "Quelques fuites d'implémentation détectées. Examinez les violations et retirez les détails d'implémentation des exigences."
[Si Réussite] "Aucune fuite d'implémentation significative trouvée. Les exigences spécifient correctement le QUOI sans le COMMENT."

**Note :** Les consommateurs d'API, GraphQL (lorsque requis) et d'autres termes pertinents pour la capacité sont acceptables lorsqu'ils décrivent CE QUE le système doit faire, et non COMMENT le construire.
```

### 5. Afficher la progression et procéder automatiquement

Affichez : "**Validation des fuites d'implémentation terminée**

Total des violations : {count} ({sévérité})

**Passage au prochain contrôle de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-08-domain-compliance-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Analyse des EF et ENF effectuée pour toutes les catégories de termes d'implémentation.
- Distinction faite entre ce qui est pertinent pour la capacité et ce qui est une fuite d'implémentation.
- Violations documentées avec les numéros de ligne et des explications.
- Sévérité évaluée correctement.
- Résultats rapportés dans le rapport de validation.
- Passage automatique à l'étape de validation suivante.
- Sous-processus tenté avec dégradation gracieuse.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas scanner toutes les catégories de termes d'implémentation.
- Ne pas distinguer la pertinence de la capacité de la fuite.
- Numéros de ligne manquants pour les violations.
- Ne pas rapporter les résultats dans le rapport de validation.
- Ne pas procéder automatiquement.

**Règle Maîtresse :** Les exigences spécifient le QUOI, pas le COMMENT. Les détails d'implémentation appartiennent aux documents d'architecture, pas aux PRD.
