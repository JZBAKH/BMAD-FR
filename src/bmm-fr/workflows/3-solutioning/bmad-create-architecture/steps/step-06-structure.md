# Étape 6 : Structure du Projet & Frontières

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant d'entreprendre toute action — une compréhension partielle mène à des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue et comprise avant de continuer
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la définition d'une structure de projet complète et de frontières claires
- 🗺️ CARTOGRAPHIER les exigences/thèmes (epics) vers les composants architecturaux
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant d'entreprendre toute action
- 🗺️ Créer une arborescence de projet complète, pas des espaces réservés génériques
- ⚠️ Présenter le menu A/P/C après avoir généré la structure du projet
- 💾 Sauvegarder UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]` avant de charger l'étape suivante
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné

## MENUS DE COLLABORATION (A/P/C) :

Cette étape générera du contenu et présentera des choix :

- **A (Elicitation Avancée)** : Utiliser les protocoles de découverte pour explorer des approches innovantes d'organisation de projet
- **P (Mode Party)** : Apporter plusieurs perspectives pour évaluer les compromis de structure du projet
- **C (Continuer)** : Sauvegarder la structure du projet et passer à la validation

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez le skill `bmad-advanced-elicitation`
- Quand 'P' est sélectionné : Invoquez le skill `bmad-party-mode`
- Les PROTOCOLES reviennent toujours à l'affichage du menu A/P/C de cette étape une fois que A ou P est terminé
- L'utilisateur accepte/rejette les modifications du protocole avant de continuer

## LIMITES DE CONTEXTE :

- Toutes les décisions architecturales précédentes sont terminées
- Les modèles d'implémentation et les règles de cohérence sont définis
- Se concentrer sur la structure physique du projet et les frontières des composants
- Cartographier les exigences vers des fichiers et répertoires spécifiques

## VOTRE TÂCHE :

Définir la structure complète du projet et les frontières architecturales basées sur toutes les décisions prises, en créant un guide d'implémentation concret pour les agents IA.

## SÉQUENCE DE STRUCTURE DU PROJET :

### 1. Analyser la Cartographie des Exigences

Cartographier les exigences du projet vers les composants architecturaux :

**Depuis les Thèmes/Epics (si disponibles) :**
"Thème (Epic) : {{epic_name}} → Réside dans {{module/directory/service}}"

- Cas d'usage (user stories) au sein du thème
- Dépendances inter-thèmes
- Composants partagés nécessaires

**Depuis les Catégories de FR (si pas de thèmes) :**
"Catégorie de FR : {{fr_category_name}} → Réside dans {{module/directory/service}}"

- Exigences fonctionnelles connexes
- Fonctionnalités partagées entre catégories
- Points d'intégration entre catégories

### 2. Définir la Structure des Répertoires du Projet

Sur la base de la pile technologique et des modèles, créer la structure complète du projet :

**Fichiers de Configuration à la Racine :**

- Fichiers de gestion de paquets (package.json, requirements.txt, etc.)
- Configuration de build et de développement
- Fichiers de configuration d'environnement
- Fichiers de pipeline CI/CD
- Fichiers de documentation

**Organisation du Code Source :**

- Points d'entrée de l'application
- Structure principale de l'application
- Organisation des fonctionnalités/modules
- Utilitaires et bibliothèques partagés
- Fichiers de configuration et d'environnement

**Organisation des Tests :**

- Emplacements et structure des tests unitaires
- Organisation des tests d'intégration
- Structure des tests de bout en bout (end-to-end)
- Utilitaires et fixtures de test

**Build et Distribution :**

- Répertoires de sortie de build
- Fichiers de distribution
- Ressources statiques (assets)
- Build de la documentation

### 3. Définir les Frontières d'Intégration

Cartographier comment les composants communiquent et où les frontières existent :

**Frontières d'API :**

- Points de terminaison (endpoints) d'API externes
- Frontières de services internes
- Frontières d'authentification et d'autorisation
- Frontières de la couche d'accès aux données

**Frontières de Composants :**

- Modèles de communication des composants frontend
- Frontières de gestion d'état
- Modèles de communication des services
- Points d'intégration pilotés par les événements

**Frontières de Données :**

- Frontières du schéma de base de données
- Modèles d'accès aux données
- Frontières de mise en cache
- Points d'intégration de données externes

### 4. Créer une Arborescence Complète du Projet

Générer une structure de répertoires exhaustive montrant tous les fichiers et répertoires :

**Exemples de Structure Spécifiques à la Technologie :**

**Next.js Full-Stack :**

```
project-name/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   └── features/
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── types/
│   └── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── __mocks__/
│   ├── components/
│   └── e2e/
└── public/
    └── assets/
```

**Backend API (NestJS) :**

```
project-name/
├── package.json
├── nest-cli.json
├── tsconfig.json
├── .env
├── .env.example
├── .gitignore
├── README.md
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   └── common/
│   ├── services/
│   ├── repositories/
│   ├── decorators/
│   ├── pipes/
│   ├── guards/
│   └── interceptors/
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── docker-compose.yml
```

### 5. Cartographier les Exigences vers la Structure

Créer une cartographie explicite des exigences du projet vers des fichiers/répertoires spécifiques :

**Cartographie des Thèmes/Fonctionnalités :**
"Thème (Epic) : Gestion des Utilisateurs

- Composants : src/components/features/users/
- Services : src/services/users/
- Routes API : src/app/api/users/
- Base de données : prisma/migrations/_*users*_
- Tests : tests/features/users/"

**Préoccupations Transversales :**
"Système d'Authentification

- Composants : src/components/auth/
- Services : src/services/auth/
- Middleware : src/middleware/auth.ts
- Guards : src/guards/auth.guard.ts
- Tests : tests/auth/"

### 6. Générer le Contenu de la Structure

Préparez le contenu à ajouter au document :

#### Structure du Contenu :

```markdown
## Structure du Projet & Frontières

### Structure Complète du Répertoire du Projet
```

{{complete_project_tree_with_all_files_and_directories}}

```

### Frontières Architecturales

**Frontières d'API :**
{{api_boundary_definitions_and_endpoints}}

**Frontières de Composants :**
{{component_communication_patterns_and_boundaries}}

**Frontières de Services :**
{{service_integration_patterns_and_boundaries}}

**Frontières de Données :**
{{data_access_patterns_and_boundaries}}

### Cartographie Exigences vers Structure

**Cartographie Fonctionnalités/Thèmes :**
{{mapping_of_epics_or_features_to_specific_directories}}

**Préoccupations Transversales :**
{{mapping_of_shared_functionality_to_locations}}

### Points d'Intégration

**Communication Interne :**
{{how_components_within_the_project_communicate}}

**Intégrations Externes :**
{{third_party_service_integration_points}}

**Flux de Données :**
{{how_data_flows_through_the_architecture}}

### Modèles d'Organisation des Fichiers

**Fichiers de Configuration :**
{{where_and_how_config_files_are_organized}}

**Organisation des Sources :**
{{how_source_code_is_structured_and_organized}}

**Organisation des Tests :**
{{how_tests_are_structured_and_organized}}

**Organisation des Ressources :**
{{how_static_and_dynamic_assets_are_organized}}

### Intégration au Workflow de Développement

**Structure du Serveur de Développement :**
{{how_the_project_is organized_for_development}}

**Structure du Processus de Build :**
{{how_the_build_process_uses_the_project_structure}}

**Structure de Déploiement :**
{{how_the_project_structure_supports_deployment}}
```

### 7. Présenter le Contenu et le Menu

Affichez le contenu de la structure du projet généré et présentez les choix :

"J'ai créé une structure de projet complète basée sur toutes nos décisions architecturales.

**Voici ce que je vais ajouter au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Elicitation Avancée — Explorer des approches innovantes d'organisation de projet
[P] Mode Party — Revoir la structure sous différentes perspectives de développement
[C] Continuer — Sauvegarder cette structure et passer à la validation de l'architecture"

### 8. Gérer la Sélection du Menu

#### Si 'A' (Elicitation Avancée) :

- Invoquez le skill `bmad-advanced-elicitation` avec la structure actuelle du projet
- Traitez les informations organisationnelles enrichies qui reviennent
- Demandez à l'utilisateur : "Accepter ces changements pour la structure du projet ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'P' (Mode Party) :

- Invoquez le skill `bmad-party-mode` avec le contexte de structure du projet
- Traitez les informations collaboratives sur les compromis d'organisation
- Demandez à l'utilisateur : "Accepter ces changements pour la structure du projet ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/architecture.md`
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Charger `./step-07-validation.md`

## AJOUT AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## INDICATEURS DE RÉUSSITE :

✅ Arborescence complète du projet définie avec tous les fichiers et répertoires
✅ Toutes les frontières architecturales clairement documentées
✅ Exigences/thèmes cartographiés vers des emplacements spécifiques
✅ Points d'intégration et modèles de communication définis
✅ Structure du projet alignée avec la pile technologique choisie
✅ Menu A/P/C présenté et géré correctement
✅ Contenu correctement ajouté au document lorsque C est sélectionné

## MODES D'ÉCHEC :

❌ Créer une structure générique avec des espaces réservés au lieu d'une arborescence spécifique et complète
❌ Ne pas cartographier les exigences vers des fichiers et répertoires spécifiques
❌ Manquer d'importantes frontières d'intégration
❌ Ne pas tenir compte de la pile technologique choisie dans la conception de la structure
❌ Ne pas définir comment les composants communiquent à travers les frontières
❌ Ne pas présenter le menu A/P/C après la génération de contenu

❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le prochain fichier d'étape
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé, chargez `./step-07-validation.md` pour valider la cohérence et l'exhaustivité architecturales.

Rappel : NE PAS passer à step-07 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
