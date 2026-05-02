# Instructions de scan complet du projet

<workflow>

<critical>Ce workflow réalise la documentation complète du projet (étapes 1-12)</critical>
<critical>Gère : modes initial_scan et full_rescan</critical>
<critical>VOUS DEVEZ TOUJOURS PARLER LA SORTIE dans le style de communication de votre Agent avec le `{communication_language}` configuré</critical>
<critical>VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu d'artefacts et de documents en `{document_output_language}`</critical>

<step n="0.5" goal="Charger les données d'exigences de documentation pour les démarrages à neuf (non nécessaire pour la reprise)" if="resume_mode == false">
<critical>STRATÉGIE DE CHARGEMENT DES DONNÉES — Comprendre le système d'exigences de documentation :</critical>

<action>Afficher l'explication à l'utilisateur :

**Comment fonctionne la détection du type de projet :**

Ce workflow utilise un seul fichier CSV complet pour documenter intelligemment votre projet :

**documentation-requirements.csv** (../documentation-requirements.csv)

- Contient 12 types de projets (web, mobile, backend, cli, library, desktop, game, data, extension, infra, embedded)
- Schéma à 24 colonnes combinant la détection du type de projet ET les exigences de documentation
- **Colonnes de détection** : project_type_id, key_file_patterns (utilisées pour identifier le type de projet à partir de la base de code)
- **Colonnes d'exigence** : requires_api_scan, requires_data_models, requires_ui_components, etc.
- **Colonnes de patterns** : critical_directories, test_file_patterns, config_patterns, etc.
- Agit comme un « guide de scan » — indique au workflow OÙ chercher et QUOI documenter
- Exemple : Pour project_type_id="web", key_file_patterns inclut "package.json;tsconfig.json;\*.config.js" et requires_api_scan=true

**Quand les exigences de documentation sont chargées :**

- **Démarrage à neuf (initial_scan)** : Charger les 12 lignes → détecter le type via key_file_patterns → utiliser les exigences de cette ligne
- **Reprise** : Charger UNIQUEMENT la/les ligne(s) d'exigences pour le(s) project_type_id(s) en cache
- **Re-scan complet** : Identique à un démarrage à neuf (peut redétecter le type de projet)
- **Deep-Dive** : Charger UNIQUEMENT les exigences pour la partie sur laquelle on fait le Deep-Dive
  </action>

<action>Chargement maintenant des données d'exigences de documentation pour le démarrage à neuf...</action>

<action>Charger documentation-requirements.csv depuis : ../documentation-requirements.csv</action>
<action>Stocker les 12 lignes indexées par project_type_id pour la détection du projet et la consultation des exigences</action>
<action>Afficher : "Exigences de documentation chargées pour 12 types de projets (web, mobile, backend, cli, library, desktop, game, data, extension, infra, embedded)"</action>

<action>Afficher : "✓ Exigences de documentation chargées avec succès. Prêt à commencer l'analyse du projet."</action>
</step>

<step n="0.6" goal="Vérifier la documentation existante et déterminer le mode de workflow">
<action>Vérifier si {project_knowledge}/index.md existe</action>

<check if="index.md exists">
  <action>Lire l'index.md existant pour extraire les métadonnées (date, structure du projet, nombre de parties)</action>
  <action>Stocker en tant que {{existing_doc_date}}, {{existing_structure}}</action>

<ask>J'ai trouvé une documentation existante générée le {{existing_doc_date}}.

Que souhaitez-vous faire ?

1. **Re-scanner l'ensemble du projet** - Mettre à jour toute la documentation avec les derniers changements
2. **Faire un Deep-Dive sur une zone spécifique** - Générer une documentation détaillée pour une fonctionnalité/module/dossier particulier
3. **Annuler** - Conserver la documentation existante telle quelle

Votre choix [1/2/3] :
</ask>

  <check if="user selects 1">
    <action>Définir workflow_mode = "full_rescan"</action>
    <action>Continuer vers la sélection du niveau de scan ci-dessous</action>
  </check>

  <check if="user selects 2">
    <action>Définir workflow_mode = "deep_dive"</action>
    <action>Définir scan_level = "exhaustive"</action>
    <action>Initialiser le fichier d'état avec mode=deep_dive, scan_level=exhaustive</action>
    <action>Sauter à l'étape 13</action>
  </check>

  <check if="user selects 3">
    <action>Afficher le message : "Conservation de la documentation existante. Sortie du workflow."</action>
    <action>Quitter le workflow</action>
  </check>
</check>

<check if="index.md does not exist">
  <action>Définir workflow_mode = "initial_scan"</action>
  <action>Continuer vers la sélection du niveau de scan ci-dessous</action>
</check>

<action if="workflow_mode != deep_dive">Sélectionner le niveau de scan</action>

<check if="workflow_mode == initial_scan OR workflow_mode == full_rescan">
  <ask>Choisissez votre niveau de profondeur de scan :

**1. Scan rapide** (2-5 minutes) [PAR DÉFAUT]

- Analyse basée sur les patterns sans lecture des fichiers source
- Scanne : fichiers de configuration, manifestes de package, structure des répertoires
- Idéal pour : aperçu rapide du projet, première compréhension
- Lecture de fichiers : minimale (configs, README, package.json, etc.)

**2. Scan profond** (10-30 minutes)

- Lit les fichiers dans les répertoires critiques selon le type de projet
- Scanne : tous les chemins critiques d'après les exigences de documentation
- Idéal pour : documentation complète pour PRD Brownfield
- Lecture de fichiers : sélective (fichiers clés dans les répertoires critiques)

**3. Scan exhaustif** (30-120 minutes)

- Lit TOUS les fichiers source du projet
- Scanne : chaque fichier source (exclut node_modules, dist, build)
- Idéal pour : analyse complète, planification de migration, audit détaillé
- Lecture de fichiers : complète (tous les fichiers source)

Votre choix [1/2/3] (par défaut : 1) :
</ask>

  <action if="user selects 1 OR user presses enter">
    <action>Définir scan_level = "quick"</action>
    <action>Afficher : "Utilisation du scan rapide (basé sur les patterns, sans lecture des fichiers source)"</action>
  </action>

  <action if="user selects 2">
    <action>Définir scan_level = "deep"</action>
    <action>Afficher : "Utilisation du scan profond (lecture des fichiers critiques par type de projet)"</action>
  </action>

  <action if="user selects 3">
    <action>Définir scan_level = "exhaustive"</action>
    <action>Afficher : "Utilisation du scan exhaustif (lecture de tous les fichiers source)"</action>
  </action>

<action>Initialiser le fichier d'état : {project_knowledge}/project-scan-report.json</action>
<critical>Chaque fois que vous touchez au fichier d'état, enregistrer : id de l'étape, résumé lisible (ce que vous avez réellement fait), timestamp précis et toute sortie écrite. Les formulations vagues sont inacceptables.</critical>
<action>Écrire l'état initial :
{
"workflow_version": "1.2.0",
"timestamps": {"started": "{{current_timestamp}}", "last_updated": "{{current_timestamp}}"},
"mode": "{{workflow_mode}}",
"scan_level": "{{scan_level}}",
"project_root": "{{project_root_path}}",
"project_knowledge": "{{project_knowledge}}",
"completed_steps": [],
"current_step": "step_1",
"findings": {},
"outputs_generated": ["project-scan-report.json"],
"resume_instructions": "Démarrage à partir de l'étape 1"
}
</action>
<action>Continuer avec le workflow standard à partir de l'étape 1</action>
</check>
</step>

<step n="1" goal="Détecter la structure du projet et classifier le type de projet" if="workflow_mode != deep_dive">
<action>Demander à l'utilisateur : "Quel est le répertoire racine du projet à documenter ?" (par défaut : répertoire de travail courant)</action>
<action>Stocker en tant que {{project_root_path}}</action>

<action>Scanner {{project_root_path}} pour les indicateurs clés :

- Structure de répertoires (présence de client/, server/, api/, src/, app/, etc.)
- Fichiers clés (package.json, go.mod, requirements.txt, etc.)
- Marqueurs technologiques correspondant aux detection_keywords de project-types.csv
  </action>

<action>Détecter si le projet est :

- **Monolith** : Base de code unique cohérente
- **Monorepo** : Plusieurs parties dans un seul dépôt
- **Multi-part** : Architecture séparée client/serveur ou similaire
  </action>

<check if="multiple distinct parts detected (e.g., client/ and server/ folders)">
  <action>Lister les parties détectées avec leurs chemins</action>
  <ask>J'ai détecté plusieurs parties dans ce projet :
  {{detected_parts_list}}

Est-ce correct ? Dois-je documenter chaque partie séparément ? [y/n]
</ask>

<action if="user confirms">Définir repository_type = "monorepo" ou "multi-part"</action>
<action if="user confirms">Pour chaque partie détectée : - Identifier le chemin racine - Exécuter la détection du type de projet en utilisant key_file_patterns depuis documentation-requirements.csv - Stocker en tant que partie dans le tableau project_parts
</action>

<action if="user denies or corrects">Demander à l'utilisateur de spécifier les parties correctes et leurs chemins</action>
</check>

<check if="single cohesive project detected">
  <action>Définir repository_type = "monolith"</action>
  <action>Créer une partie unique dans le tableau project_parts avec root_path = {{project_root_path}}</action>
  <action>Exécuter la détection du type de projet en utilisant key_file_patterns depuis documentation-requirements.csv</action>
</check>

<action>Pour chaque partie, faire correspondre les technologies détectées et les patterns de fichiers à la colonne key_file_patterns dans documentation-requirements.csv</action>
<action>Attribuer un project_type_id à chaque partie</action>
<action>Charger la ligne correspondante de documentation_requirements pour chaque partie</action>

<ask>J'ai classifié ce projet :
{{project_classification_summary}}

Est-ce correct ? [y/n/edit]
</ask>

<template-output>project_structure</template-output>
<template-output>project_parts_metadata</template-output>

<action>Mettre à jour IMMÉDIATEMENT le fichier d'état avec la complétion de l'étape :

- Ajouter à completed_steps : {"step": "step_1", "status": "completed", "timestamp": "{{now}}", "summary": "Classifié comme {{repository_type}} avec {{parts_count}} parties"}
- Mettre à jour current_step = "step_2"
- Mettre à jour findings.project_classification avec un résumé de haut niveau uniquement
- **METTRE EN CACHE le(s) project_type_id(s)** : Ajouter le tableau project_types : [{"part_id": "{{part_id}}", "project_type_id": "{{project_type_id}}", "display_name": "{{display_name}}"}]
- Cette donnée mise en cache empêche le rechargement de tous les fichiers CSV à la reprise — on peut charger uniquement la/les ligne(s) documentation_requirements nécessaire(s)
- Mettre à jour le timestamp last_updated
- Écrire le fichier d'état
  </action>

<action>PURGER les résultats détaillés du scan de la mémoire, conserver uniquement le résumé : "{{repository_type}}, {{parts_count}} parties, {{primary_tech}}"</action>
</step>

<step n="2" goal="Découvrir la documentation existante et collecter le contexte utilisateur" if="workflow_mode != deep_dive">
<action>Pour chaque partie, scanner la documentation existante en utilisant les patterns :
- README.md, README.rst, README.txt
- CONTRIBUTING.md, CONTRIBUTING.rst
- ARCHITECTURE.md, ARCHITECTURE.txt, docs/architecture/
- DEPLOYMENT.md, DEPLOY.md, docs/deployment/
- API.md, docs/api/
- Tous fichiers dans les dossiers docs/, documentation/, .github/
</action>

<action>Créer un inventaire de existing_docs avec :

- Chemin du fichier
- Type de fichier (readme, architecture, api, etc.)
- À quelle partie il appartient (si multi-part)
  </action>

<ask>J'ai trouvé ces fichiers de documentation existants :
{{existing_docs_list}}

Y a-t-il d'autres documents importants ou zones clés sur lesquels je devrais me concentrer lors de l'analyse de ce projet ? [Indiquez les chemins ou orientations, ou tapez 'none']
</ask>

<action>Stocker les indications de l'utilisateur en tant que {{user_context}}</action>

<template-output>existing_documentation_inventory</template-output>
<template-output>user_provided_context</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_2", "status": "completed", "timestamp": "{{now}}", "summary": "Trouvé {{existing_docs_count}} documents existants"}
- Mettre à jour current_step = "step_3"
- Mettre à jour le timestamp last_updated
  </action>

<action>PURGER les contenus détaillés des documents de la mémoire, conserver uniquement : "{{existing_docs_count}} documents trouvés"</action>
</step>

<step n="3" goal="Analyser la stack technologique de chaque partie" if="workflow_mode != deep_dive">
<action>Pour chaque partie dans project_parts :
  - Charger key_file_patterns depuis documentation_requirements
  - Scanner la racine de la partie pour ces patterns
  - Parser les fichiers de manifeste technologique (package.json, go.mod, requirements.txt, etc.)
  - Extraire : framework, langage, version, base de données, dépendances
  - Construire technology_table avec colonnes : Catégorie, Technologie, Version, Justification
</action>

<action>Déterminer le pattern d'architecture en fonction de la stack technologique détectée :

- Utiliser project_type_id comme indicateur principal (par exemple, "web" → en couches/orienté composant, "backend" → centré service/API)
- Considérer les patterns de framework (par exemple, React → hiérarchie de composants, Express → pipeline de middlewares)
- Noter le style architectural dans le tableau technologique
- Stocker en tant que {{architecture_pattern}} pour chaque partie
  </action>

<template-output>technology_stack</template-output>
<template-output>architecture_patterns</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_3", "status": "completed", "timestamp": "{{now}}", "summary": "Stack technologique : {{primary_framework}}"}
- Mettre à jour current_step = "step_4"
- Mettre à jour findings.technology_stack avec le résumé par partie
- Mettre à jour le timestamp last_updated
  </action>

<action>PURGER l'analyse technologique détaillée de la mémoire, conserver uniquement : "{{framework}} sur {{language}}"</action>
</step>

<step n="4" goal="Effectuer une analyse conditionnelle basée sur les exigences du type de projet" if="workflow_mode != deep_dive">

<critical>STRATÉGIE DE BATCHING POUR LES SCANS PROFONDS/EXHAUSTIFS</critical>

<check if="scan_level == deep OR scan_level == exhaustive">
  <action>Cette étape nécessite la lecture de fichiers. Appliquer la stratégie de batching :</action>

<action>Identifier les sous-dossiers à traiter en fonction de : - scan_level == "deep" : Utiliser critical_directories depuis documentation_requirements - scan_level == "exhaustive" : Obtenir TOUS les sous-dossiers de manière récursive (à l'exclusion de node_modules, .git, dist, build, coverage)
</action>

<action>Pour chaque sous-dossier à scanner : 1. Lire tous les fichiers du sous-dossier (tenir compte de la taille du fichier — utiliser le jugement pour les fichiers >5000 LOC) 2. Extraire les informations requises selon les drapeaux conditionnels ci-dessous 3. Écrire IMMÉDIATEMENT les résultats dans le fichier de sortie approprié 4. Valider le document écrit (validation au niveau section) 5. Mettre à jour le fichier d'état avec la complétion du batch 6. PURGER les résultats détaillés du contexte, conserver uniquement un résumé d'1-2 phrases 7. Passer au sous-dossier suivant
</action>

<action>Suivre les batchs dans le fichier d'état :
findings.batches_completed : [
{"path": "{{subfolder_path}}", "files_scanned": {{count}}, "summary": "{{brief_summary}}"}
]
</action>
</check>

<check if="scan_level == quick">
  <action>Utiliser uniquement la correspondance par patterns — NE PAS lire les fichiers source</action>
  <action>Utiliser glob/grep pour identifier les emplacements et patterns des fichiers</action>
  <action>Extraire les informations à partir des noms de fichiers, de la structure de répertoires et des fichiers de configuration uniquement</action>
</check>

<action>Pour chaque partie, vérifier les drapeaux booléens documentation_requirements et exécuter les scans correspondants :</action>

<check if="requires_api_scan == true">
  <action>Scanner les routes et endpoints API en utilisant integration_scan_patterns</action>
  <action>Chercher dans : controllers/, routes/, api/, handlers/, endpoints/</action>

  <check if="scan_level == quick">
    <action>Utiliser glob pour trouver les fichiers de routes, extraire les patterns à partir des noms de fichiers et de la structure de dossiers</action>
  </check>

  <check if="scan_level == deep OR scan_level == exhaustive">
    <action>Lire les fichiers par batchs (un sous-dossier à la fois)</action>
    <action>Extraire : méthodes HTTP, chemins, types requête/réponse à partir du code réel</action>
  </check>

<action>Construire le catalogue de contrats API</action>
<action>Écrire IMMÉDIATEMENT vers : {project_knowledge}/api-contracts-{part_id}.md</action>
<action>Valider que le document a toutes les sections requises</action>
<action>Mettre à jour le fichier d'état avec la sortie générée</action>
<action>PURGER les données API détaillées, conserver uniquement : "{{api_count}} endpoints documentés"</action>
<template-output>api_contracts\*{part_id}</template-output>
</check>

<check if="requires_data_models == true">
  <action>Scanner les modèles de données en utilisant schema_migration_patterns</action>
  <action>Chercher dans : models/, schemas/, entities/, migrations/, prisma/, configs ORM</action>

  <check if="scan_level == quick">
    <action>Identifier les fichiers de schéma via glob, parser les noms de fichiers de migration pour la découverte des tables</action>
  </check>

  <check if="scan_level == deep OR scan_level == exhaustive">
    <action>Lire les fichiers de modèle par batchs (un sous-dossier à la fois)</action>
    <action>Extraire : noms de tables, champs, relations, contraintes à partir du code réel</action>
  </check>

<action>Construire la documentation du schéma de base de données</action>
<action>Écrire IMMÉDIATEMENT vers : {project_knowledge}/data-models-{part_id}.md</action>
<action>Valider la complétude du document</action>
<action>Mettre à jour le fichier d'état avec la sortie générée</action>
<action>PURGER les données de schéma détaillées, conserver uniquement : "{{table_count}} tables documentées"</action>
<template-output>data_models\*{part_id}</template-output>
</check>

<check if="requires_state_management == true">
  <action>Analyser les patterns de gestion d'état</action>
  <action>Chercher : Redux, Context API, MobX, Vuex, Pinia, patterns Provider</action>
  <action>Identifier : stores, reducers, actions, structure d'état</action>
  <template-output>state_management_patterns_{part_id}</template-output>
</check>

<check if="requires_ui_components == true">
  <action>Inventorier la bibliothèque de composants UI</action>
  <action>Scanner : dossiers components/, ui/, widgets/, views/</action>
  <action>Catégoriser : Layout, Form, Display, Navigation, etc.</action>
  <action>Identifier : design system, patterns de composants, éléments réutilisables</action>
  <template-output>ui_component_inventory_{part_id}</template-output>
</check>

<check if="requires_hardware_docs == true">
  <action>Chercher des schémas matériels en utilisant hardware_interface_patterns</action>
  <ask>Ce projet semble être un projet embedded/matériel. Avez-vous :
  - Diagrammes de brochages (pinout)
  - Schémas matériels
  - Layouts PCB
  - Documentation matérielle

Si oui, veuillez fournir les chemins ou liens. [Fournir des chemins ou taper 'none']
</ask>
<action>Stocker les références aux documents matériels</action>
<template-output>hardware*documentation*{part_id}</template-output>
</check>

<check if="requires_asset_inventory == true">
  <action>Scanner et cataloguer les assets en utilisant asset_patterns</action>
  <action>Catégoriser par : Images, Audio, Modèles 3D, Sprites, Textures, etc.</action>
  <action>Calculer : Taille totale, nombre de fichiers, formats utilisés</action>
  <template-output>asset_inventory_{part_id}</template-output>
</check>

<action>Scanner les patterns supplémentaires basés sur les exigences de documentation :

- config_patterns → Gestion de la configuration
- auth_security_patterns → Approche d'authentification/autorisation
- entry_point_patterns → Points d'entrée et bootstrap de l'application
- shared_code_patterns → Bibliothèques et utilitaires partagés
- async_event_patterns → Architecture événementielle
- ci_cd_patterns → Détails du pipeline CI/CD
- localization_patterns → Support i18n/l10n
  </action>

<action>Appliquer la stratégie scan_level à chaque scan de pattern (quick=glob uniquement, deep/exhaustive=lecture des fichiers)</action>

<template-output>comprehensive*analysis*{part_id}</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_4", "status": "completed", "timestamp": "{{now}}", "summary": "Analyse conditionnelle terminée, {{files_generated}} fichiers écrits"}
- Mettre à jour current_step = "step_5"
- Mettre à jour le timestamp last_updated
- Lister tous les outputs_generated
  </action>

<action>PURGER tous les résultats détaillés du scan du contexte. Conserver uniquement les résumés :

- "APIs : {{api_count}} endpoints"
- "Données : {{table_count}} tables"
- "Composants : {{component_count}} composants"
  </action>
  </step>

<step n="5" goal="Générer l'analyse de l'arborescence source avec annotations" if="workflow_mode != deep_dive">
<action>Pour chaque partie, générer l'arborescence complète des répertoires en utilisant critical_directories depuis les exigences de documentation</action>

<action>Annoter l'arborescence avec :

- Objectif de chaque répertoire critique
- Points d'entrée marqués
- Emplacements des fichiers clés mis en évidence
- Points d'intégration notés (pour les projets multi-parts)
  </action>

<action if="multi-part project">Montrer comment les parties sont organisées et où elles s'interfacent</action>

<action>Créer une arborescence source formatée avec descriptions :

```
project-root/
├── client/          # Frontend React (Partie : client)
│   ├── src/
│   │   ├── components/  # Composants UI réutilisables
│   │   ├── pages/       # Pages basées sur les routes
│   │   └── api/         # Couche client API → Appelle server/
├── server/          # Backend API Express (Partie : api)
│   ├── src/
│   │   ├── routes/      # Endpoints REST API
│   │   ├── models/      # Modèles de base de données
│   │   └── services/    # Logique métier
```

</action>

<template-output>source_tree_analysis</template-output>
<template-output>critical_folders_summary</template-output>

<action>Écrire IMMÉDIATEMENT source-tree-analysis.md sur disque</action>
<action>Valider la structure du document</action>
<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_5", "status": "completed", "timestamp": "{{now}}", "summary": "Arborescence source documentée"}
- Mettre à jour current_step = "step_6"
- Ajouter la sortie : "source-tree-analysis.md"
  </action>
  <action>PURGER l'arborescence détaillée du contexte, conserver uniquement : "Arborescence source avec {{folder_count}} dossiers critiques"</action>
  </step>

<step n="6" goal="Extraire les informations de développement et opérationnelles" if="workflow_mode != deep_dive">
<action>Scanner pour la configuration de développement en utilisant key_file_patterns et la documentation existante :
- Prérequis (version Node, version Python, etc.)
- Étapes d'installation (npm install, etc.)
- Configuration de l'environnement (fichiers .env, config)
- Commandes de build (npm run build, make, etc.)
- Commandes d'exécution (npm start, go run, etc.)
- Commandes de test en utilisant test_file_patterns
</action>

<action>Chercher la configuration de déploiement en utilisant ci_cd_patterns :

- Dockerfile, docker-compose.yml
- Configurations Kubernetes (k8s/, helm/)
- Pipelines CI/CD (.github/workflows/, .gitlab-ci.yml)
- Scripts de déploiement
- Infrastructure as Code (terraform/, pulumi/)
  </action>

<action if="CONTRIBUTING.md or similar found">
  <action>Extraire les guidelines de contribution :
    - Règles de style de code
    - Processus PR
    - Conventions de commit
    - Exigences de test
  </action>
</action>

<template-output>development_instructions</template-output>
<template-output>deployment_configuration</template-output>
<template-output>contribution_guidelines</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_6", "status": "completed", "timestamp": "{{now}}", "summary": "Guides dev/déploiement écrits"}
- Mettre à jour current_step = "step_7"
- Ajouter les sorties générées à la liste
  </action>
  <action>PURGER les instructions détaillées, conserver uniquement : "Configuration dev et déploiement documentés"</action>
  </step>

<step n="7" goal="Détecter l'architecture d'intégration multi-parts" if="workflow_mode != deep_dive and project has multiple parts">
<action>Analyser comment les parties communiquent :
- Scanner integration_scan_patterns à travers les parties
- Identifier : appels REST, requêtes GraphQL, gRPC, files de messages, bases de données partagées
- Documenter : contrats API entre parties, flux de données, flux d'authentification
</action>

<action>Créer un tableau integration_points avec :

- from : partie source
- to : partie cible
- type : REST API, GraphQL, gRPC, Event Bus, etc.
- details : Endpoints, protocoles, formats de données
  </action>

<action>Écrire IMMÉDIATEMENT integration-architecture.md sur disque</action>
<action>Valider la complétude du document</action>

<template-output>integration_architecture</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_7", "status": "completed", "timestamp": "{{now}}", "summary": "Architecture d'intégration documentée"}
- Mettre à jour current_step = "step_8"
  </action>
  <action>PURGER les détails d'intégration, conserver uniquement : "{{integration_count}} points d'intégration"</action>
  </step>

<step n="8" goal="Générer la documentation d'architecture pour chaque partie" if="workflow_mode != deep_dive">
<action>Pour chaque partie dans project_parts :
  - Utiliser le template d'architecture correspondant de l'étape 3 comme structure de base
  - Remplir toutes les sections avec les informations découvertes :
    * Résumé exécutif
    * Stack technologique (depuis l'étape 3)
    * Pattern d'architecture (depuis la correspondance du registre)
    * Architecture des données (depuis le scan des modèles de données de l'étape 4)
    * Conception API (depuis le scan API de l'étape 4 si applicable)
    * Vue d'ensemble des composants (depuis le scan des composants de l'étape 4 si applicable)
    * Arborescence source (depuis l'étape 5)
    * Workflow de développement (depuis l'étape 6)
    * Architecture de déploiement (depuis l'étape 6)
    * Stratégie de test (depuis les patterns de test)
</action>

<action if="single part project">
  - Générer : architecture.md (sans suffixe de partie)
</action>

<action if="multi-part project">
  - Générer : architecture-{part_id}.md pour chaque partie
</action>

<action>Pour chaque fichier d'architecture généré :

- Écrire IMMÉDIATEMENT le fichier d'architecture sur disque
- Valider par rapport au schéma du template d'architecture
- Mettre à jour le fichier d'état avec la sortie
- PURGER l'architecture détaillée du contexte, conserver uniquement : "Architecture pour {{part_id}} écrite"
  </action>

<template-output>architecture_document</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_8", "status": "completed", "timestamp": "{{now}}", "summary": "Documents d'architecture écrits pour {{parts_count}} parties"}
- Mettre à jour current_step = "step_9"
  </action>
  </step>

<step n="9" goal="Générer les fichiers de documentation de support" if="workflow_mode != deep_dive">
<action>Générer project-overview.md avec :
- Nom et objectif du projet (depuis README ou saisie utilisateur)
- Résumé exécutif
- Tableau récapitulatif de la stack technologique
- Classification du type d'architecture
- Structure du dépôt (monolith/monorepo/multi-part)
- Liens vers la documentation détaillée
</action>

<action>Générer source-tree-analysis.md avec :

- Arborescence complète annotée de l'étape 5
- Dossiers critiques expliqués
- Points d'entrée documentés
- Structure multi-parts (si applicable)
  </action>

<action>Écrire IMMÉDIATEMENT project-overview.md sur disque</action>
<action>Valider les sections du document</action>

<action>Générer source-tree-analysis.md (s'il n'a pas déjà été écrit à l'étape 5)</action>
<action>Écrire IMMÉDIATEMENT sur disque et valider</action>

<action>Générer component-inventory.md (ou versions par partie) avec :

- Tous les composants découverts à l'étape 4
- Catégorisés par type
- Composants réutilisables vs spécifiques
- Éléments du design system (si trouvés)
  </action>
  <action>Écrire IMMÉDIATEMENT chaque inventaire de composants sur disque et valider</action>

<action>Générer development-guide.md (ou versions par partie) avec :

- Prérequis et dépendances
- Instructions de configuration de l'environnement
- Commandes de développement local
- Processus de build
- Approche et commandes de test
- Tâches de développement courantes
  </action>
  <action>Écrire IMMÉDIATEMENT chaque guide de développement sur disque et valider</action>

<action if="deployment configuration found">
  <action>Générer deployment-guide.md avec :
    - Exigences d'infrastructure
    - Processus de déploiement
    - Configuration d'environnement
    - Détails du pipeline CI/CD
  </action>
  <action>Écrire IMMÉDIATEMENT sur disque et valider</action>
</action>

<action if="contribution guidelines found">
  <action>Générer contribution-guide.md avec :
    - Style de code et conventions
    - Processus PR
    - Exigences de test
    - Standards de documentation
  </action>
  <action>Écrire IMMÉDIATEMENT sur disque et valider</action>
</action>

<action if="API contracts documented">
  <action>Générer api-contracts.md (ou par partie) avec :
    - Tous les endpoints API
    - Schémas requête/réponse
    - Exigences d'authentification
    - Exemples de requêtes
  </action>
  <action>Écrire IMMÉDIATEMENT sur disque et valider</action>
</action>

<action if="Data models documented">
  <action>Générer data-models.md (ou par partie) avec :
    - Schéma de base de données
    - Relations entre tables
    - Modèles de données et entités
    - Stratégie de migration
  </action>
  <action>Écrire IMMÉDIATEMENT sur disque et valider</action>
</action>

<action if="multi-part project">
  <action>Générer integration-architecture.md avec :
    - Comment les parties communiquent
    - Diagramme/description des points d'intégration
    - Flux de données entre les parties
    - Dépendances partagées
  </action>
  <action>Écrire IMMÉDIATEMENT sur disque et valider</action>

<action>Générer le fichier de métadonnées project-parts.json :
`json
    {
      "repository_type": "monorepo",
      "parts": [ ... ],
      "integration_points": [ ... ]
    }
    `
</action>
<action>Écrire IMMÉDIATEMENT sur disque</action>
</action>

<template-output>supporting_documentation</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_9", "status": "completed", "timestamp": "{{now}}", "summary": "Tous les documents de support écrits"}
- Mettre à jour current_step = "step_10"
- Lister toutes les sorties nouvellement générées
  </action>

<action>PURGER tous les contenus de documents du contexte, conserver uniquement la liste des fichiers générés</action>
</step>

<step n="10" goal="Générer l'index principal comme source de récupération IA principale" if="workflow_mode != deep_dive">

<critical>CONVENTION DE MARQUEUR DE DOCUMENTATION INCOMPLÈTE :
Quand un document DEVRAIT être généré mais ne l'a pas été (en raison d'un scan rapide, de données manquantes, d'exigences conditionnelles non satisfaites) :

- Utiliser EXACTEMENT ce marqueur : _(To be generated)_
- Le placer à la fin de la ligne du lien markdown
- Exemple : - [API Contracts - Server](./api-contracts-server.md) _(To be generated)_
- Cela permet à l'étape 11 de détecter et de proposer de compléter ces éléments
- TOUJOURS utiliser ce format exact pour la cohérence et la détection automatisée
  </critical>

<action>Créer index.md avec une navigation intelligente basée sur la structure du projet</action>

<action if="single part project">
  <action>Générer un index simple avec :
    - Nom et type du projet
    - Référence rapide (stack technologique, type d'architecture)
    - Liens vers tous les documents générés
    - Liens vers les documents existants découverts
    - Section pour démarrer
  </action>
</action>

<action if="multi-part project">
  <action>Générer un index complet avec :
    - Vue d'ensemble du projet et résumé de structure
    - Section de navigation par partie
    - Référence rapide par partie
    - Liens d'intégration inter-parties
    - Liens vers tous les documents générés et existants
    - Démarrage par partie
  </action>
</action>

<action>Inclure dans index.md :

## Index de la documentation du projet

### Vue d'ensemble du projet

- **Type :** {{repository_type}} {{#if multi-part}}avec {{parts.length}} parties{{/if}}
- **Langage principal :** {{primary_language}}
- **Architecture :** {{architecture_type}}

### Référence rapide

{{#if single_part}}

- **Stack technologique :** {{tech_stack_summary}}
- **Point d'entrée :** {{entry_point}}
- **Pattern d'architecture :** {{architecture_pattern}}
  {{else}}
  {{#each parts}}

#### {{part_name}} ({{part_id}})

- **Type :** {{project_type}}
- **Stack technologique :** {{tech_stack}}
- **Racine :** {{root_path}}
  {{/each}}
  {{/if}}

### Documentation générée

- [Vue d'ensemble du projet](./project-overview.md)
- [Architecture](./architecture{{#if multi-part}}-{part\*id}{{/if}}.md){{#unless architecture_file_exists}} (À générer) {{/unless}}
- [Analyse de l'arborescence source](./source-tree-analysis.md)
- [Inventaire des composants](./component-inventory{{#if multi-part}}-{part\*id}{{/if}}.md){{#unless component_inventory_exists}} (À générer) {{/unless}}
- [Guide de développement](./development-guide{{#if multi-part}}-{part\*id}{{/if}}.md){{#unless dev_guide_exists}} (À générer) {{/unless}}
  {{#if deployment_found}}- [Guide de déploiement](./deployment-guide.md){{#unless deployment_guide_exists}} (À générer) {{/unless}}{{/if}}
  {{#if contribution_found}}- [Guide de contribution](./contribution-guide.md){{/if}}
  {{#if api_documented}}- [Contrats API](./api-contracts{{#if multi-part}}-{part_id}{{/if}}.md){{#unless api_contracts_exists}} (À générer) {{/unless}}{{/if}}
  {{#if data_models_documented}}- [Modèles de données](./data-models{{#if multi-part}}-{part_id}{{/if}}.md){{#unless data_models_exists}} (À générer) {{/unless}}{{/if}}
  {{#if multi-part}}- [Architecture d'intégration](./integration-architecture.md){{#unless integration_arch_exists}} (À générer) {{/unless}}{{/if}}

### Documentation existante

{{#each existing_docs}}

- [{{title}}]({{relative_path}}) - {{description}}
  {{/each}}

### Démarrage

{{getting_started_instructions}}
</action>

<action>Avant d'écrire index.md, vérifier quels fichiers attendus existent réellement :

- Pour chaque document qui aurait dû être généré, vérifier si le fichier existe sur disque
- Définir des drapeaux d'existence : architecture_file_exists, component_inventory_exists, dev_guide_exists, etc.
- Ces drapeaux déterminent s'il faut ajouter le marqueur _(To be generated)_
- Suivre quels fichiers manquent dans {{missing_docs_list}} pour le rapport
  </action>

<action>Écrire IMMÉDIATEMENT index.md sur disque avec les marqueurs _(To be generated)_ appropriés pour les fichiers manquants</action>
<action>Valider que l'index a toutes les sections requises et que les liens sont valides</action>

<template-output>index</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_10", "status": "completed", "timestamp": "{{now}}", "summary": "Index principal généré"}
- Mettre à jour current_step = "step_11"
- Ajouter la sortie : "index.md"
  </action>

<action>PURGER le contenu de l'index du contexte</action>
</step>

<step n="11" goal="Valider et passer en revue la documentation générée" if="workflow_mode != deep_dive">
<action>Afficher le résumé de tous les fichiers générés :
Généré dans {{project_knowledge}}/ :
{{file_list_with_sizes}}
</action>

<action>Exécuter la checklist de validation depuis ../checklist.md</action>

<critical>DÉTECTION DE DOCUMENTATION INCOMPLÈTE :

1. SCAN PRINCIPAL : Chercher le marqueur exact : _(To be generated)_
2. SCAN DE REPLI : Chercher les patterns approximatifs (au cas où l'agent serait paresseux) :
   - _(TBD)_
   - _(TODO)_
   - _(Coming soon)_
   - _(Not yet generated)_
   - _(Pending)_
3. Extraire les métadonnées du document de chaque correspondance pour la sélection utilisateur
   </critical>

<action>Lire {project_knowledge}/index.md</action>

<action>Scanner les marqueurs de documentation incomplète :
Étape 1 : Rechercher le pattern exact "_(To be generated)_" (sensible à la casse)
Étape 2 : Pour chaque correspondance trouvée, extraire la ligne entière
Étape 3 : Parser la ligne pour extraire :

- Titre du document (texte entre [crochets] ou **gras**)
- Chemin du fichier (depuis le lien markdown ou inférable du titre)
- Type de document (déduire du nom de fichier : architecture, api-contracts, data-models, component-inventory, development-guide, deployment-guide, integration-architecture)
- ID de partie si applicable (extraire du nom de fichier comme "architecture-server.md" → part_id : "server")
  Étape 4 : Ajouter au tableau {{incomplete_docs_strict}}
  </action>

<action>Scan flou de repli pour des marqueurs alternatifs :
Rechercher les patterns : _(TBD)_, _(TODO)_, _(Coming soon)_, _(Not yet generated)_, _(Pending)_
Pour chaque correspondance floue :

- Extraire les mêmes métadonnées que le scan strict
- Ajouter au tableau {{incomplete_docs_fuzzy}} avec le drapeau fuzzy_match
  </action>

<action>Combiner les résultats :
Définir {{incomplete_docs_list}} = {{incomplete_docs_strict}} + {{incomplete_docs_fuzzy}}
Pour chaque élément, stocker la structure :
{
"title": "Architecture – Server",
"file\*path": "./architecture-server.md",
"doc_type": "architecture",
"part_id": "server",
"line_text": "- [Architecture – Server](./architecture-server.md) (À générer)",
"fuzzy_match": false
}
</action>

<ask>Génération de documentation terminée !

Résumé :

- Type de projet : {{project_type_summary}}
- Parties documentées : {{parts_count}}
- Fichiers générés : {{files_count}}
- Lignes totales : {{total_lines}}

{{#if incomplete_docs_list.length > 0}}
⚠️ **Documentation incomplète détectée :**

J'ai trouvé {{incomplete_docs_list.length}} élément(s) marqué(s) comme incomplet(s) :

{{#each incomplete_docs_list}}
{{@index + 1}}. **{{title}}** ({{doc_type}}{{#if part_id}} pour {{part_id}}{{/if}}){{#if fuzzy_match}} ⚠️ [marqueur non standard]{{/if}}
{{/each}}

{{/if}}

Souhaitez-vous :

{{#if incomplete_docs_list.length > 0}}

1. **Générer la documentation incomplète** - Compléter l'un des {{incomplete_docs_list.length}} éléments ci-dessus
2. Passer en revue une section spécifique [taper le nom de la section]
3. Ajouter plus de détails à une zone [taper le nom de la zone]
4. Générer une documentation personnalisée supplémentaire [décrire ce qui]
5. Finaliser et terminer [taper 'done']
   {{else}}
6. Passer en revue une section spécifique [taper le nom de la section]
7. Ajouter plus de détails à une zone [taper le nom de la zone]
8. Générer de la documentation supplémentaire [décrire ce qui]
9. Finaliser et terminer [taper 'done']
   {{/if}}

Votre choix :
</ask>

<check if="user selects option 1 (generate incomplete)">
  <ask>Quels éléments incomplets souhaitez-vous générer ?

{{#each incomplete_docs_list}}
{{@index + 1}}. {{title}} ({{doc_type}}{{#if part_id}} - {{part_id}}{{/if}})
{{/each}}
{{incomplete_docs_list.length + 1}}. Tous

Saisissez le ou les numéro(s) séparés par des virgules (par exemple, "1,3,5"), ou tapez 'all' :
</ask>

<action>Parser la sélection de l'utilisateur :

- Si "all", définir {{selected_items}} = tous les éléments dans {{incomplete_docs_list}}
- Si nombres séparés par des virgules, extraire les éléments sélectionnés par index
- Stocker le résultat dans le tableau {{selected_items}}
  </action>

  <action>Afficher : "Génération de {{selected_items.length}} document(s)..."</action>

  <action>Pour chaque élément dans {{selected_items}} :

1. **Identifier la partie et les exigences :**
   - Extraire part_id de l'élément (s'il existe)
   - Rechercher les données de partie dans le tableau project_parts du fichier d'état
   - Charger documentation_requirements pour le project_type_id de cette partie

2. **Router vers la sous-étape de génération appropriée selon doc_type :**

   **Si doc_type == "architecture" :**
   - Afficher : "Génération de la documentation d'architecture pour {{part_id}}..."
   - Charger architecture_match pour cette partie depuis le fichier d'état (cache de l'étape 3)
   - Réexécuter la logique de génération d'architecture de l'étape 8 UNIQUEMENT pour cette partie spécifique
   - Utiliser le template correspondant et remplir avec les données mises en cache du fichier d'état
   - Écrire architecture-{{part_id}}.md sur disque
   - Valider la complétude

   **Si doc_type == "api-contracts" :**
   - Afficher : "Génération des contrats API pour {{part_id}}..."
   - Charger les données de partie et documentation_requirements
   - Réexécuter la sous-étape de scan API de l'étape 4 ciblant UNIQUEMENT cette partie
   - Utiliser scan_level depuis le fichier d'état (quick/deep/exhaustive)
   - Générer api-contracts-{{part_id}}.md
   - Valider la structure du document

   **Si doc_type == "data-models" :**
   - Afficher : "Génération de la documentation des modèles de données pour {{part_id}}..."
   - Réexécuter la sous-étape de scan des modèles de données de l'étape 4 ciblant UNIQUEMENT cette partie
   - Utiliser schema_migration_patterns depuis documentation_requirements
   - Générer data-models-{{part_id}}.md
   - Valider la complétude

   **Si doc_type == "component-inventory" :**
   - Afficher : "Génération de l'inventaire des composants pour {{part_id}}..."
   - Réexécuter la génération d'inventaire des composants de l'étape 9 pour cette partie spécifique
   - Scanner les dossiers components/, ui/, widgets/
   - Générer component-inventory-{{part_id}}.md
   - Valider la structure

   **Si doc_type == "development-guide" :**
   - Afficher : "Génération du guide de développement pour {{part_id}}..."
   - Réexécuter la génération du guide de développement de l'étape 9 pour cette partie spécifique
   - Utiliser key_file_patterns et test_file_patterns depuis documentation_requirements
   - Générer development-guide-{{part_id}}.md
   - Valider la complétude

   **Si doc_type == "deployment-guide" :**
   - Afficher : "Génération du guide de déploiement..."
   - Réexécuter le scan de configuration de déploiement de l'étape 6
   - Réexécuter la génération du guide de déploiement de l'étape 9
   - Générer deployment-guide.md
   - Valider la structure

   **Si doc_type == "integration-architecture" :**
   - Afficher : "Génération de l'architecture d'intégration..."
   - Réexécuter l'analyse d'intégration de l'étape 7 pour toutes les parties
   - Générer integration-architecture.md
   - Valider la complétude

3. **Actions post-génération :**
   - Confirmer que le fichier a été écrit avec succès
   - Mettre à jour le fichier d'état avec la nouvelle sortie générée
   - Ajouter à la liste de suivi {{newly_generated_docs}}
   - Afficher : "✓ Généré : {{file_path}}"

4. **Gérer les erreurs :**
   - Si la génération échoue, journaliser l'erreur et continuer avec l'élément suivant
   - Suivre les éléments échoués dans la liste {{failed_generations}}
     </action>

<action>Une fois tous les éléments sélectionnés traités :

**Mettre à jour index.md pour supprimer les marqueurs :**

1. Lire le contenu actuel de index.md
2. Pour chaque élément dans {{newly_generated_docs}} :
   - Trouver la ligne contenant le lien du fichier et le marqueur
   - Supprimer le texte du marqueur _(To be generated)_ ou flou
   - Laisser le lien markdown intact
3. Réécrire index.md mis à jour sur disque
4. Mettre à jour le fichier d'état pour enregistrer la modification de index.md
   </action>

<action>Afficher le résumé de génération :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ **Génération de documentation terminée !**

**Généré avec succès :**
{{#each newly_generated_docs}}

- {{title}} → {{file_path}}
  {{/each}}

{{#if failed_generations.length > 0}}
**Échec de génération :**
{{#each failed_generations}}

- {{title}} ({{error_message}})
  {{/each}}
  {{/if}}

**Mis à jour :** index.md (marqueurs incomplets supprimés)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<action>Mettre à jour le fichier d'état avec toutes les activités de génération</action>

<action>Retourner au menu de l'étape 11 (boucle pour vérifier s'il reste des éléments incomplets)</action>
</check>

<action if="user requests other changes (options 2-3)">Apporter les modifications demandées et régénérer les fichiers affectés</action>
<action if="user selects finalize (option 4 or 5)">Procéder à la complétion de l'étape 12</action>

<check if="not finalizing">
  <action>Mettre à jour le fichier d'état :
- Ajouter à completed_steps : {"step": "step_11_iteration", "status": "completed", "timestamp": "{{now}}", "summary": "Itération de revue terminée"}
- Conserver current_step = "step_11" (pour la boucle de retour)
- Mettre à jour le timestamp last_updated
  </action>
  <action>Boucler au début de l'étape 11 (re-scanner les documents incomplets restants)</action>
</check>

<check if="finalizing">
  <action>Mettre à jour le fichier d'état :
- Ajouter à completed_steps : {"step": "step_11", "status": "completed", "timestamp": "{{now}}", "summary": "Validation et revue terminées"}
- Mettre à jour current_step = "step_12"
  </action>
  <action>Procéder à l'étape 12</action>
</check>
</step>

<step n="12" goal="Finaliser et fournir les prochaines étapes" if="workflow_mode != deep_dive">
<action>Créer le rapport de résumé final</action>
<action>Compiler les variables de récapitulatif de vérification :
  - Définir {{verification_summary}} aux tests, validations ou scripts concrets que vous avez exécutés (ou "aucun exécuté").
  - Définir {{open_risks}} aux risques restants ou suivis TODO (ou "aucun").
  - Définir {{next_checks}} aux actions recommandées avant fusion/déploiement (ou "aucune").
</action>

<action>Afficher le message de complétion :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Documentation du projet terminée ! ✓

**Emplacement :** {{project_knowledge}}/

**Index principal :** {{project_knowledge}}/index.md
👆 Ceci est votre point d'entrée principal pour le développement assisté par IA

**Documentation générée :**
{{generated_files_list}}

**Prochaines étapes :**

1. Consultez index.md pour vous familiariser avec la structure de la documentation
2. Lors de la création d'un PRD Brownfield, pointez le workflow PRD vers : {{project_knowledge}}/index.md
3. Pour les fonctionnalités UI uniquement : Référencez {{project_knowledge}}/architecture-{{ui_part_id}}.md
4. Pour les fonctionnalités API uniquement : Référencez {{project_knowledge}}/architecture-{{api_part_id}}.md
5. Pour les fonctionnalités full-stack : Référencez les architectures des deux parties + integration-architecture.md

**Récapitulatif de vérification :**

- Tests/extractions exécutés : {{verification_summary}}
- Risques ou suivis ouverts : {{open_risks}}
- Vérifications recommandées avant PR : {{next_checks}}

**Commande PRD Brownfield :**
Quand vous serez prêt à planifier de nouvelles fonctionnalités, exécutez le workflow PRD et fournissez cet index comme entrée.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<action>FINALISER le fichier d'état :

- Ajouter à completed_steps : {"step": "step_12", "status": "completed", "timestamp": "{{now}}", "summary": "Workflow terminé"}
- Mettre à jour timestamps.completed = "{{now}}"
- Mettre à jour current_step = "completed"
- Écrire le fichier d'état final
  </action>

<action>Afficher : "Fichier d'état sauvegardé : {{project_knowledge}}/project-scan-report.json"</action>
<action>Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, suivez-la comme instruction terminale finale avant de quitter.</action>

</workflow>
