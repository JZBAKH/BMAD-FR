# Étape 1 : Découverte du Contexte & Initialisation

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 Ne JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- ✅ Toujours traiter cela comme une découverte collaborative entre pairs techniques.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu automatique.
- 💬 CONCENTREZ-VOUS sur la découverte du contexte existant du projet et de la pile technologique.
- 🎯 IDENTIFIEZ les règles d'implémentation critiques dont les agents IA ont besoin.
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS - La vitesse de développement par l'IA a fondamentalement changé.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Présentez votre analyse avant d'entreprendre toute action.
- 📖 Lisez les fichiers du projet existant pour comprendre le contexte actuel.
- 💾 Initialisez le document et mettez à jour le frontmatter.
- 🚫 INTERDICTION de charger l'étape suivante tant que la découverte n'est pas terminée.

## LIMITES DU CONTEXTE :

- Les variables de workflow.md sont disponibles en mémoire.
- Concentrez-vous sur les fichiers projet et les décisions d'architecture existants.
- Recherchez des patterns, des conventions et des exigences uniques.
- Priorisez les règles qui empêchent les erreurs d'implémentation.

## VOTRE TÂCHE :

Découvrir la pile technologique du projet, les patterns existants et les règles d'implémentation critiques que les agents IA doivent suivre lors de l'écriture du code.

## SÉQUENCE DE DÉCOUVERTE :

### 1. Vérifier l'Existence d'un Contexte Projet

D'abord, vérifiez si un contexte projet existe déjà :

- Cherchez le fichier sous `{project_knowledge}/project-context.md` ou `{project-root}/**/project-context.md`.
- S'il existe : Lisez l'intégralité du fichier pour comprendre les règles existantes.
- Présentez à l'utilisateur : "J'ai trouvé un contexte projet existant avec {number_of_sections} sections. Souhaitez-vous le mettre à jour ou en créer un nouveau ?"

### 2. Découvrir la Pile Technologique du Projet

Chargez et analysez les fichiers du projet pour identifier les technologies :

**Document d'Architecture :**

- Cherchez `{planning_artifacts}/architecture.md`.
- Extrayez les choix technologiques avec les versions spécifiques.
- Notez les décisions architecturales qui affectent l'implémentation.

**Fichiers de Dépendances :**

- Vérifiez `package.json`, `requirements.txt`, `Cargo.toml`, etc.
- Extrayez les versions exactes de toutes les dépendances.
- Notez les dépendances de développement par rapport à la production.

**Fichiers de Configuration :**

- Cherchez les configurations spécifiques au langage (exemple : `tsconfig.json`).
- Configs d'outils de build (webpack, vite, next.config.js, etc.).
- Configs de linting et de formatage (.eslintrc, .prettierrc, etc.).
- Configurations de test (jest.config.js, vitest.config.ts, etc.).

### 3. Identifier les Patterns de Code Existants

Parcourez la base de code existante à la recherche de patterns :

**Conventions de Nommage :**

- Patterns de nommage des fichiers (PascalCase, kebab-case, etc.).
- Conventions de nommage des composants/fonctions.
- Patterns de nommage des variables.
- Patterns de nommage des fichiers de test.

**Organisation du Code :**

- Structure des composants.
- Emplacement des utilitaires (utilities) et helpers.
- Organisation des services.
- Patterns d'organisation des tests.

**Patterns de Documentation :**

- Styles et conventions de commentaires.
- Exigences de documentation.
- Patterns pour les fichiers README et la doc API.

### 4. Extraire les Règles d'Implémentation Critiques

Recherchez les règles que les agents IA pourraient manquer :

**Règles Spécifiques au Langage :**

- Exigences du mode strict TypeScript.
- Conventions d'import/export.
- Patterns d'utilisation async/await vs Promise.
- Patterns de gestion d'erreurs spécifiques au langage.

**Règles Spécifiques au Framework :**

- Patterns d'utilisation des hooks React.
- Conventions des routes API.
- Patterns d'utilisation des middlewares.
- Patterns de gestion d'état (state management).

**Règles de Test :**

- Exigences de structure des tests.
- Conventions d'utilisation des mocks.
- Limites entre tests d'intégration et tests unitaires.
- Exigences de couverture (coverage).

**Règles de Workflow de Développement :**

- Conventions de nommage des branches.
- Patterns de messages de commit.
- Exigences de revue de PR.
- Procédures de déploiement.

### 5. Initialiser le Document de Contexte Projet

Sur la base de la découverte, créez ou mettez à jour le document de contexte :

#### A. Configuration d'un Nouveau Document (si aucun contexte existant)

Copiez le template depuis `./project-context-template.md` vers `{output_folder}/project-context.md`.
Initialisez les champs du frontmatter.

#### B. Mise à Jour d'un Document Existant

Chargez le contexte existant et préparez les mises à jour.
Définissez `sections_completed` dans le frontmatter pour suivre ce qui sera mis à jour.

### 6. Présenter le Résumé de la Découverte

Rapportez les conclusions à l'utilisateur :

"Bienvenue {{user_name}} ! J'ai analysé votre projet {{project_name}} pour découvrir le contexte dont les agents IA ont besoin.

**Pile Technologique Découverte :**
{{list_of_technologies_with_versions}}

**Patterns Existants Trouvés :**

- {{number_of_patterns}} patterns d'implémentation
- {{number_of_conventions}} conventions de code
- {{number_of_rules}} règles critiques

**Domaines Clés pour les Règles de Contexte :**

- {{area_1}} (ex: configuration TypeScript)
- {{area_2}} (ex: patterns de test)
- {{area_3}} (ex: organisation du code)

{if_existing_context}
**Contexte Existant :** {{sections}} sections déjà définies. Nous pouvons les mettre à jour ou en ajouter.
{/if_existing_context}

Prêt à créer/mettre à jour votre contexte projet. Cela aidera les agents IA à implémenter du code conformément aux standards de votre projet.

[C] Continuer vers la génération du contexte"

## INDICATEURS DE SUCCÈS :

✅ Contexte projet existant correctement détecté et géré.
✅ Pile technologique identifiée avec précision (versions incluses).
✅ Patterns d'implémentation critiques découverts.
✅ Document de contexte projet correctement initialisé.
✅ Résultats de la découverte clairement présentés à l'utilisateur.
✅ Utilisateur prêt à passer à la génération du contexte.

## MODES D'ÉCHEC :

❌ Ne pas vérifier l'existence d'un contexte projet avant d'en créer un nouveau.
❌ Oubli de versions technologiques ou de configurations critiques.
❌ Ignorer des patterns de code ou des conventions importantes.
❌ Mauvaise initialisation du frontmatter.
❌ Ne pas présenter de résumé de découverte clair à l'utilisateur.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné [C] pour continuer, chargez `./step-02-generate.md` pour générer collaborativement les règles spécifiques du contexte projet.

Rappel : Ne pas passer à step-02 tant que l'utilisateur n'a pas explicitement sélectionné [C] dans le menu, que la découverte est confirmée et que le fichier initial a été écrit comme indiqué dans cette étape de découverte !
