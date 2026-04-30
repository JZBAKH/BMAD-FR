# Instructions de Scan Complet du Projet

<workflow>

<critical>Ce workflow effectue la documentation complète du projet (Étapes 1-12)</critical>
<critical>Gère les modes : initial_scan et full_rescan</critical>
<critical>VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la `{communication_language}` configurée</critical>
<critical>VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`</critical>

<step n="0.5" goal="Charger les données d'exigences de documentation pour les nouveaux départs (non nécessaire pour la reprise)" if="resume_mode == false">
<critical>STRATÉGIE DE CHARGEMENT DES DONNÉES - Comprendre le Système d'Exigences de Documentation :</critical>

<action>Afficher l'explication à l'utilisateur :

**Comment Fonctionne la Détection du Type de Projet :**

Ce workflow utilise un fichier CSV complet unique pour documenter intelligemment votre projet :

**documentation-requirements.csv** (../documentation-requirements.csv)

- Contient 12 types de projet (web, mobile, backend, cli, library, desktop, game, data, extension, infra, embedded)
- Schéma de 24 colonnes combinant la détection du type de projet ET les exigences de documentation
- **Colonnes de détection** : project_type_id, key_file_patterns (utilisés pour identifier le type de projet à partir de la base de code)
- **Colonnes d'exigences** : requires_api_scan, requires_data_models, requires_ui_components, etc.
- **Colonnes de patterns** : critical_directories, test_file_patterns, config_patterns, etc.
- Agit comme un "guide de scan" - indique au workflow OÙ regarder et QUOI documenter
- Exemple : Pour project_type_id="web", key_file_patterns inclut "package.json;tsconfig.json;\*.config.js" et requires_api_scan=true

**Quand les Exigences de Documentation sont Chargées :**

- **Nouveau Départ (initial_scan)** : Charge les 12 lignes → détecte le type via key_file_patterns → utilise les exigences de cette ligne
- **Reprise** : Charge UNIQUEMENT la ou les lignes d'exigences de doc pour le(s) project_type_id mis en cache
- **Rescan Complet** : Identique au nouveau départ (peut redétecter le type de projet)
- **Plongée Approfondie** : Charge UNIQUEMENT les exigences de doc pour la partie approfondie
  </action>

<action>Chargement actuel des données d'exigences de documentation pour un nouveau départ...</action>

<action>Charger documentation-requirements.csv depuis : ../documentation-requirements.csv</action>
<action>Stocker les 12 lignes indexées par project_type_id pour la détection de projet et la recherche d'exigences</action>
<action>Afficher : "Exigences de documentation chargées pour 12 types de projets (web, mobile, backend, cli, library, desktop, game, data, extension, infra, embedded)"</action>

<action>Afficher : "✓ Exigences de documentation chargées avec succès. Prêt à commencer l'analyse du projet."</action>
</step>

<step n="0.6" goal="Vérifier la documentation existante et déterminer le mode du workflow">
<action>Vérifier si {project_knowledge}/index.md existe</action>

<check if="index.md existe">
  <action>Lire le fichier index.md existant pour extraire les métadonnées (date, structure du projet, nombre de parties)</action>
  <action>Stocker sous {{existing_doc_date}}, {{existing_structure}}</action>

<ask>J'ai trouvé une documentation existante générée le {{existing_doc_date}}.

Que souhaitez-vous faire ?

1. **Re-scanner le projet entier** - Mettre à jour toute la documentation avec les derniers changements
2. **Plongée approfondie dans une zone spécifique** - Générer une documentation détaillée pour une fonctionnalité/module/dossier particulier
3. **Annuler** - Conserver la documentation existante en l'état

Votre choix [1/2/3] :
</ask>

  <check if="l'utilisateur sélectionne 1">
    <action>Définir workflow_mode = "full_rescan"</action>
    <action>Continuer vers la sélection du niveau de scan ci-dessous</action>
  </check>

  <check if="l'utilisateur sélectionne 2">
    <action>Définir workflow_mode = "deep_dive"</action>
    <action>Définir scan_level = "exhaustive"</action>
    <action>Initialiser le fichier d'état avec mode=deep_dive, scan_level=exhaustive</action>
    <action>Sauter à l'Étape 13</action>
  </check>

  <check if="l'utilisateur sélectionne 3">
    <action>Afficher le message : "Conservation de la documentation existante. Sortie du workflow."</action>
    <action>Quitter le workflow</action>
  </check>
</check>

<check if="index.md n'existe pas">
  <action>Définir workflow_mode = "initial_scan"</action>
  <action>Continuer vers la sélection du niveau de scan ci-dessous</action>
</check>

<action if="workflow_mode != deep_dive">Sélectionner le Niveau de Scan</action>

<check if="workflow_mode == initial_scan OR workflow_mode == full_rescan">
  <ask>Choisissez la profondeur de votre scan :

**1. Scan Rapide** (2-5 minutes) [PAR DÉFAUT]

- Analyse basée sur les patterns sans lecture des fichiers sources
- Scanne : fichiers de configuration, manifestes de paquets, structure des répertoires
- Idéal pour : aperçu rapide du projet, compréhension initiale
- Lecture de fichiers : minimale (configs, README, package.json, etc.)

**2. Scan Approfondi** (10-30 minutes)

- Lit les fichiers dans les répertoires critiques selon le type de projet
- Scanne : tous les chemins critiques issus des exigences de documentation
- Idéal pour : documentation complète pour PRD brownfield
- Lecture de fichiers : sélective (fichiers clés dans les répertoires critiques)

**3. Scan Exhaustif** (30-120 minutes)

- Lit TOUS les fichiers sources du projet
- Scanne : chaque fichier source (exclut node_modules, dist, build)
- Idéal pour : analyse complète, planification de migration, audit détaillé
- Lecture de fichiers : complète (tous les fichiers sources)

Votre choix [1/2/3] (défaut : 1) :
</ask>

  <action if="l'utilisateur sélectionne 1 OU appuie sur Entrée">
    <action>Définir scan_level = "quick"</action>
    <action>Afficher : "Utilisation du Scan Rapide (basé sur les patterns, pas de lecture de fichiers sources)"</action>
  </action>

  <action if="l'utilisateur sélectionne 2">
    <action>Définir scan_level = "deep"</action>
    <action>Afficher : "Utilisation du Scan Approfondi (lecture des fichiers critiques par type de projet)"</action>
  </action>

  <action if="l'utilisateur sélectionne 3">
    <action>Définir scan_level = "exhaustive"</action>
    <action>Afficher : "Utilisation du Scan Exhaustif (lecture de tous les fichiers sources)"</action>
  </action>

<action>Initialiser le fichier d'état : {project_knowledge}/project-scan-report.json</action>
<critical>Chaque fois que vous modifiez le fichier d'état, enregistrez : l'ID de l'étape, un résumé lisible (ce que vous avez réellement fait), un horodatage précis et toutes les sorties écrites. Les phrases vagues sont inacceptables.</critical>
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
<action>Continuer avec le workflow standard à partir de l'Étape 1</action>
</check>
</step>

<step n="1" goal="Détecter la structure du projet et classifier le type de projet" if="workflow_mode != deep_dive">
<action>Demander à l'utilisateur : "Quel est le répertoire racine du projet à documenter ?" (par défaut : répertoire de travail courant)</action>
<action>Stocker sous {{project_root_path}}</action>

<action>Scanner {{project_root_path}} pour détecter les indicateurs clés :

- Structure des répertoires (présence de client/, server/, api/, src/, app/, etc.)
- Fichiers clés (package.json, go.mod, requirements.txt, etc.)
- Marqueurs technologiques correspondant aux detection_keywords de project-types.csv
  </action>

<action>Détecter si le projet est :

- **Monolithe** : une seule base de code cohérente
- **Monorepo** : plusieurs parties dans un seul dépôt
- **Multi-parties** : architecture séparée client/serveur ou similaire
  </action>

<check if="plusieurs parties distinctes détectées (ex: dossiers client/ et server/)">
  <action>Lister les parties détectées avec leurs chemins</action>
  <ask>J'ai détecté plusieurs parties dans ce projet :
  {{detected_parts_list}}

Est-ce correct ? Dois-je documenter chaque partie séparément ? [y/n]
</ask>

<action if="l'utilisateur confirme">Définir repository_type = "monorepo" ou "multi-part"</action>
<action if="l'utilisateur confirme">Pour chaque partie détectée : - Identifier le chemin racine - Exécuter la détection du type de projet à l'aide de key_file_patterns issu de documentation-requirements.csv - Stocker dans le tableau project_parts
</action>

<action if="l'utilisateur refuse ou corrige">Demander à l'utilisateur de spécifier les parties correctes et leurs chemins</action>
</check>

<check if="projet unique cohérent détecté">
  <action>Définir repository_type = "monolith"</action>
  <action>Créer une seule partie dans le tableau project_parts avec root_path = {{project_root_path}}</action>
  <action>Exécuter la détection du type de projet à l'aide de key_file_patterns issu de documentation-requirements.csv</action>
</check>

<action>Pour chaque partie, faire correspondre les technologies détectées et les patterns de fichiers avec la colonne key_file_patterns de documentation-requirements.csv</action>
<action>Assigner un project_type_id à chaque partie</action>
<action>Charger la ligne documentation_requirements correspondante pour chaque partie</action>

<ask>J'ai classifié ce projet :
{{project_classification_summary}}

Est-ce que cela vous semble correct ? [y/n/edit]
</ask>

<template-output>project_structure</template-output>
<template-output>project_parts_metadata</template-output>

<action>Mettre IMMÉDIATEMENT à jour le fichier d'état avec la complétion de l'étape :

- Ajouter à completed_steps : {"step": "step_1", "status": "completed", "timestamp": "{{now}}", "summary": "Classifié en tant que {{repository_type}} avec {{parts_count}} parties"}
- Mettre à jour current_step = "step_2"
- Mettre à jour findings.project_classification avec le résumé de haut niveau uniquement
- **METTRE EN CACHE les project_type_id(s)** : Ajouter le tableau project_types : [{"part_id": "{{part_id}}", "project_type_id": "{{project_type_id}}", "display_name": "{{display_name}}"}]
- Ces données mises en cache empêchent le rechargement de tous les fichiers CSV lors d'une reprise - on peut charger uniquement la ou les lignes documentation_requirements nécessaires
- Mettre à jour l'horodatage last_updated
- Écrire le fichier d'état
  </action>

<action>PURGER les résultats détaillés du scan de la mémoire, ne conserver que le résumé : "{{repository_type}}, {{parts_count}} parties, {{primary_tech}}"</action>
</step>

<step n="2" goal="Découvrir la documentation existante et recueillir le contexte utilisateur" if="workflow_mode != deep_dive">
<action>Pour chaque partie, rechercher la documentation existante à l'aide des patterns :
- README.md, README.rst, README.txt
- CONTRIBUTING.md, CONTRIBUTING.rst
- ARCHITECTURE.md, ARCHITECTURE.txt, docs/architecture/
- DEPLOYMENT.md, DEPLOY.md, docs/deployment/
- API.md, docs/api/
- Tous les fichiers dans les dossiers docs/, documentation/, .github/
</action>

<action>Créer un inventaire des existing_docs avec :

- Chemin du fichier
- Type de fichier (readme, architecture, api, etc.)
- À quelle partie il appartient (si multi-parties)
  </action>

<ask>J'ai trouvé ces fichiers de documentation existants :
{{existing_docs_list}}

Y a-t-il d'autres documents importants ou des zones clés sur lesquels je devrais me concentrer lors de l'analyse de ce projet ? [Fournissez les chemins ou des conseils, ou tapez 'none']
</ask>

<action>Stocker les conseils utilisateur sous {{user_context}}</action>

<template-output>existing_documentation_inventory</template-output>
<template-output>user_provided_context</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_2", "status": "completed", "timestamp": "{{now}}", "summary": "{{existing_docs_count}} docs existants trouvés"}
- Mettre à jour current_step = "step_3"
- Mettre à jour l'horodatage last_updated
  </action>

<action>PURGER le contenu détaillé des docs de la mémoire, ne conserver que : "{{existing_docs_count}} docs trouvés"</action>
</step>

<step n="3" goal="Analyser la pile technologique pour chaque partie" if="workflow_mode != deep_dive">
<action>Pour chaque partie dans project_parts :
  - Charger key_file_patterns depuis documentation_requirements
  - Scanner la racine de la partie pour ces patterns
  - Analyser les fichiers manifestes technologiques (package.json, go.mod, requirements.txt, etc.)
  - Extraire : framework, langage, version, base de données, dépendances
  - Construire le tableau technology_table avec les colonnes : Catégorie, Technologie, Version, Justification
</action>

<action>Déterminer le pattern d'architecture en fonction de la pile technologique détectée :

- Utiliser project_type_id comme indicateur principal (ex: "web" → basé sur les composants/couches, "backend" → centré sur les services/API)
- Considérer les patterns de framework (ex: React → hiérarchie des composants, Express → pipeline de middlewares)
- Noter le style architectural dans le tableau technologique
- Stocker sous {{architecture_pattern}} pour chaque partie
  </action>

<template-output>technology_stack</template-output>
<template-output>architecture_patterns</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_3", "status": "completed", "timestamp": "{{now}}", "summary": "Pile technologique : {{primary_framework}}"}
- Mettre à jour current_step = "step_4"
- Mettre à jour findings.technology_stack avec le résumé par partie
- Mettre à jour l'horodatage last_updated
  </action>

<action>PURGER l'analyse technologique détaillée de la mémoire, ne conserver que : "{{framework}} sur {{language}}"</action>
</step>

<step n="4" goal="Effectuer une analyse conditionnelle basée sur les exigences du type de projet" if="workflow_mode != deep_dive">

<critical>STRATÉGIE DE LOTISSEMENT POUR LES SCANS APPROFONDIS/EXHAUSTIFS</critical>

<check if="scan_level == deep OR scan_level == exhaustive">
  <action>Cette étape nécessite la lecture de fichiers. Appliquez la stratégie de lotissement :</action>

<action>Identifier les sous-dossiers à traiter en fonction de : - scan_level == "deep" : utiliser critical_directories de documentation_requirements - scan_level == "exhaustive" : récupérer TOUS les sous-dossiers récursivement (en excluant node_modules, .git, dist, build, coverage)
</action>

<action>Pour chaque sous-dossier à scanner : 1. Lire tous les fichiers du sous-dossier (considérer la taille - faire preuve de jugement pour les fichiers >5000 lignes) 2. Extraire les informations requises selon les indicateurs conditionnels ci-dessous 3. Écrire IMMÉDIATEMENT les conclusions dans le fichier de sortie approprié 4. Valider le document écrit (validation au niveau des sections) 5. Mettre à jour le fichier d'état avec la complétion du lot 6. PURGER les conclusions détaillées du contexte, ne conserver qu'un résumé de 1-2 phrases 7. Passer au sous-dossier suivant
</action>

<action>Suivre les lots dans le fichier d'état :
findings.batches_completed: [
{"path": "{{subfolder_path}}", "files_scanned": {{count}}, "summary": "{{brief_summary}}"}
]
</action>
</check>

<check if="scan_level == quick">
  <action>Utiliser uniquement la correspondance de patterns - NE PAS lire les fichiers sources</action>
  <action>Utiliser glob/grep pour identifier les emplacements et les patterns de fichiers</action>
  <action>Extraire les informations à partir des noms de fichiers, de la structure des répertoires et des fichiers de configuration uniquement</action>
</check>

<action>Pour chaque partie, vérifier les indicateurs booléens de documentation_requirements et exécuter les scans correspondants :</action>

<check if="requires_api_scan == true">
  <action>Rechercher les routes et points de terminaison API à l'aide d'integration_scan_patterns</action>
  <action>Chercher dans : controllers/, routes/, api/, handlers/, endpoints/</action>

  <check if="scan_level == quick">
    <action>Utiliser glob pour trouver les fichiers de routes, extraire les patterns à partir des noms de fichiers et de la structure des dossiers</action>
  </check>

  <check if="scan_level == deep OR scan_level == exhaustive">
    <action>Lire les fichiers par lots (un sous-dossier à la fois)</action>
    <action>Extraire : méthodes HTTP, chemins, types de requête/réponse à partir du code réel</action>
  </check>

<action>Construire le catalogue des contrats API</action>
<action>Écrire IMMÉDIATEMENT dans : {project_knowledge}/api-contracts-{part_id}.md</action>
<action>Valider que le document possède toutes les sections requises</action>
<action>Mettre à jour le fichier d'état avec la sortie générée</action>
<action>PURGER les données API détaillées, ne conserver que : "{{api_count}} points de terminaison documentés"</action>
<template-output>api_contracts\*{part_id}</template-output>
</check>

<check if="requires_data_models == true">
  <action>Rechercher les modèles de données à l'aide de schema_migration_patterns</action>
  <action>Chercher dans : models/, schemas/, entities/, migrations/, prisma/, configs ORM</action>

  <check if="scan_level == quick">
    <action>Identifier les fichiers de schéma via glob, parser les noms de fichiers de migration pour découvrir les tables</action>
  </check>

  <check if="scan_level == deep OR scan_level == exhaustive">
    <action>Lire les fichiers de modèles par lots (un sous-dossier à la fois)</action>
    <action>Extraire : noms de tables, champs, relations, contraintes à partir du code réel</action>
  </check>

<action>Construire la documentation du schéma de base de données</action>
<action>Écrire IMMÉDIATEMENT dans : {project_knowledge}/data-models-{part_id}.md</action>
<action>Valider la complétude du document</action>
<action>Mettre à jour le fichier d'état avec la sortie générée</action>
<action>PURGER les données de schéma détaillées, ne conserver que : "{{table_count}} tables documentées"</action>
<template-output>data_models\*{part_id}</template-output>
</check>

<check if="requires_state_management == true">
  <action>Analyser les patterns de gestion d'état</action>
  <action>Chercher : Redux, Context API, MobX, Vuex, Pinia, patterns Provider</action>
  <action>Identifier : stores, reducers, actions, structure de l'état</action>
  <template-output>state_management_patterns_{part_id}</template-output>
</check>

<check if="requires_ui_components == true">
  <action>Inventorier la bibliothèque de composants UI</action>
  <action>Scanner les dossiers : components/, ui/, widgets/, views/</action>
  <action>Catégoriser : Layout, Formulaires, Affichage, Navigation, etc.</action>
  <action>Identifier : Design system, patterns de composants, éléments réutilisables</action>
  <template-output>ui_component_inventory_{part_id}</template-output>
</check>

<check if="requires_hardware_docs == true">
  <action>Rechercher les schémas matériels à l'aide de hardware_interface_patterns</action>
  <ask>Ceci semble être un projet embarqué/matériel. Disposez-vous de :
  - Diagrammes de brochage (pinout)
  - Schémas matériels
  - Mises en page de PCB
  - Documentation matérielle

Si oui, veuillez fournir les chemins ou les liens. [Fournissez les chemins ou tapez 'none']
</ask>
<action>Stocker les références de la documentation matérielle</action>
<template-output>hardware*documentation*{part_id}</template-output>
</check>

<check if="requires_asset_inventory == true">
  <action>Scanner et cataloguer les assets à l'aide d'asset_patterns</action>
  <action>Catégoriser par : Images, Audio, Modèles 3D, Sprites, Textures, etc.</action>
  <action>Calculer : taille totale, nombre de fichiers, formats utilisés</action>
  <template-output>asset_inventory_{part_id}</template-output>
</check>

<action>Scanner pour des patterns additionnels selon les exigences de doc :

- config_patterns → gestion de la configuration
- auth_security_patterns → approche d'authentification/autorisation
- entry_point_patterns → points d'entrée de l'application et bootstrap
- shared_code_patterns → bibliothèques et utilitaires partagés
- async_event_patterns → architecture orientée événements
- ci_cd_patterns → détails du pipeline CI/CD
- localization_patterns → support i18n/l10n
  </action>

<action>Appliquer la stratégie scan_level à chaque scan de pattern (quick=glob uniquement, deep/exhaustive=lecture des fichiers)</action>

<template-output>comprehensive*analysis*{part_id}</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_4", "status": "completed", "timestamp": "{{now}}", "summary": "Analyse conditionnelle terminée, {{files_generated}} fichiers écrits"}
- Mettre à jour current_step = "step_5"
- Mettre à jour l'horodatage last_updated
- Lister tous les outputs_generated
  </action>

<action>PURGER tous les résultats de scan détaillés du contexte. Ne conserver que les résumés :

- "APIs : {{api_count}} points de terminaison"
- "Données : {{table_count}} tables"
- "Composants : {{component_count}} composants"
  </action>
  </step>

<step n="5" goal="Générer l'analyse de l'arborescence source avec annotations" if="workflow_mode != deep_dive">
<action>Pour chaque partie, générer l'arborescence complète des répertoires en utilisant critical_directories des exigences de doc</action>

<action>Annoter l'arborescence avec :

- L'objectif de chaque répertoire critique
- Les points d'entrée marqués
- Les emplacements de fichiers clés mis en évidence
- Les points d'intégration notés (pour les projets multi-parties)
  </action>

<action if="projet multi-parties">Montrer comment les parties sont organisées et où elles s'interfacent</action>

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
│   │   ├── routes/      # Points de terminaison REST
│   │   ├── models/      # Modèles de base de données
│   │   └── services/    # Logique métier
```

</action>

<template-output>source_tree_analysis</template-output>
<template-output>critical_folders_summary</template-output>

<action>Écrire IMMÉDIATEMENT source-tree-analysis.md sur le disque</action>
<action>Valider la structure du document</action>
<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_5", "status": "completed", "timestamp": "{{now}}", "summary": "Arborescence source documentée"}
- Mettre à jour current_step = "step_6"
- Ajouter la sortie : "source-tree-analysis.md"
  </action>
  <action>PURGER l'arborescence détaillée du contexte, ne conserver que : "Arborescence source avec {{folder_count}} dossiers critiques"</action>
  </step>

<step n="6" goal="Extraire les informations de développement et opérationnelles" if="workflow_mode != deep_dive">
<action>Rechercher la configuration de développement à l'aide de key_file_patterns et des docs existantes :
- Prérequis (version Node, version Python, etc.)
- Étapes d'installation (npm install, etc.)
- Configuration de l'environnement (fichiers .env, configs)
- Commandes de build (npm run build, make, etc.)
- Commandes d'exécution (npm start, go run, etc.)
- Commandes de test à l'aide de test_file_patterns
</action>

<action>Rechercher la configuration de déploiement à l'aide de ci_cd_patterns :

- Dockerfile, docker-compose.yml
- Configurations Kubernetes (k8s/, helm/)
- Pipelines CI/CD (.github/workflows/, .gitlab-ci.yml)
- Scripts de déploiement
- Infrastructure as Code (terraform/, pulumi/)
  </action>

<action if="CONTRIBUTING.md ou similaire trouvé">
  <action>Extraire les directives de contribution :
    - Règles de style de code
    - Processus de PR
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
  <action>PURGER les instructions détaillées, ne conserver que : "Configuration dev et déploiement documentés"</action>
  </step>

<step n="7" goal="Détecter l'architecture d'intégration multi-parties" if="workflow_mode != deep_dive and project has multiple parts">
<action>Analyser comment les parties communiquent :
- Scanner integration_scan_patterns à travers les parties
- Identifier : appels REST, requêtes GraphQL, gRPC, files de messages, bases de données partagées
- Documenter : contrats API entre parties, flux de données, flux d'authentification
</action>

<action>Créer le tableau integration_points avec :

- from : partie source
- to : partie cible
- type : API REST, GraphQL, gRPC, Event Bus, etc.
- détails : points de terminaison, protocoles, formats de données
  </action>

<action>Écrire IMMÉDIATEMENT integration-architecture.md sur le disque</action>
<action>Valider la complétude du document</action>

<template-output>integration_architecture</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_7", "status": "completed", "timestamp": "{{now}}", "summary": "Architecture d'intégration documentée"}
- Mettre à jour current_step = "step_8"
  </action>
  <action>PURGER les détails d'intégration, ne conserver que : "{{integration_count}} points d'intégration"</action>
  </step>

<step n="8" goal="Générer la documentation d'architecture pour chaque partie" if="workflow_mode != deep_dive">
<action>Pour chaque partie dans project_parts :
  - Utiliser le template d'architecture matché à l'Étape 3 comme structure de base
  - Remplir toutes les sections avec les informations découvertes :
    * Résumé exécutif
    * Pile technologique (depuis l'Étape 3)
    * Pattern d'architecture (depuis le matching du registre)
    * Architecture des données (depuis le scan des modèles de données de l'Étape 4)
    * Conception API (depuis le scan API de l'Étape 4 si applicable)
    * Vue d'ensemble des composants (depuis le scan composants de l'Étape 4 si applicable)
    * Arborescence source (depuis l'Étape 5)
    * Workflow de développement (depuis l'Étape 6)
    * Architecture de déploiement (depuis l'Étape 6)
    * Stratégie de test (depuis les patterns de test)
</action>

<action if="projet monopartie">
  - Générer : architecture.md (sans suffixe de partie)
</action>

<action if="projet multi-parties">
  - Générer : architecture-{part_id}.md pour chaque partie
</action>

<action>Pour chaque fichier d'architecture généré :

- Écrire IMMÉDIATEMENT le fichier d'architecture sur le disque
- Valider par rapport au schéma de template d'architecture
- Mettre à jour le fichier d'état avec la sortie
- PURGER les détails d'architecture du contexte, ne conserver que : "Architecture pour {{part_id}} écrite"
  </action>

<template-output>architecture_document</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_8", "status": "completed", "timestamp": "{{now}}", "summary": "Docs d'architecture écrites pour {{parts_count}} parties"}
- Mettre à jour current_step = "step_9"
  </action>
  </step>

<step n="9" goal="Générer les fichiers de documentation de support" if="workflow_mode != deep_dive">
<action>Générer project-overview.md avec :
- Nom et objectif du projet (depuis le README ou saisie utilisateur)
- Résumé exécutif
- Tableau résumé de la pile technologique
- Classification du type d'architecture
- Structure du dépôt (monolithe/monorepo/multi-parties)
- Liens vers les docs détaillées
</action>

<action>Générer source-tree-analysis.md avec :

- Arborescence complète annotée de l'Étape 5
- Dossiers critiques expliqués
- Points d'entrée documentés
- Structure multi-parties (si applicable)
  </action>

<action>Écrire IMMÉDIATEMENT project-overview.md sur le disque</action>
<action>Valider les sections du document</action>

<action>Générer source-tree-analysis.md (s'il n'a pas déjà été écrit à l'Étape 5)</action>
<action>Écrire IMMÉDIATEMENT sur le disque et valider</action>

<action>Générer component-inventory.md (ou versions par partie) avec :

- Tous les composants découverts à l'Étape 4
- Catégorisés par type
- Composants réutilisables vs spécifiques
- Éléments du design system (s'ils sont trouvés)
  </action>
  <action>Écrire IMMÉDIATEMENT chaque inventaire de composants sur le disque et valider</action>

<action>Générer development-guide.md (ou versions par partie) avec :

- Prérequis et dépendances
- Instructions de configuration de l'environnement
- Commandes de développement local
- Processus de build
- Approche et commandes de test
- Tâches de développement courantes
  </action>
  <action>Écrire IMMÉDIATEMENT chaque guide de développement sur le disque et valider</action>

<action if="configuration de déploiement trouvée">
  <action>Générer deployment-guide.md avec :
    - Exigences d'infrastructure
    - Processus de déploiement
    - Configuration de l'environnement
    - Détails du pipeline CI/CD
  </action>
  <action>Écrire IMMÉDIATEMENT sur le disque et valider</action>
</action>

<action if="directives de contribution trouvées">
  <action>Générer contribution-guide.md avec :
    - Style de code et conventions
    - Processus de PR
    - Exigences de test
    - Standards de documentation
  </action>
  <action>Écrire IMMÉDIATEMENT sur le disque et valider</action>
</action>

<action if="contrats API documentés">
  <action>Générer api-contracts.md (ou par partie) avec :
    - Tous les points de terminaison API
    - Schémas de requête/réponse
    - Exigences d'authentification
    - Exemples de requêtes
  </action>
  <action>Écrire IMMÉDIATEMENT sur le disque et valider</action>
</action>

<action if="modèles de données documentés">
  <action>Générer data-models.md (ou par partie) avec :
    - Schéma de base de données
    - Relations entre tables
    - Modèles de données et entités
    - Stratégie de migration
  </action>
  <action>Écrire IMMÉDIATEMENT sur le disque et valider</action>
</action>

<action if="projet multi-parties">
  <action>Générer integration-architecture.md avec :
    - Comment les parties communiquent
    - Diagramme/description des points d'intégration
    - Flux de données entre parties
    - Dépendances partagées
  </action>
  <action>Écrire IMMÉDIATEMENT sur le disque et valider</action>

<action>Générer le fichier de métadonnées project-parts.json :
`json
    {
      "repository_type": "monorepo",
      "parts": [ ... ],
      "integration_points": [ ... ]
    }
    `
</action>
<action>Écrire IMMÉDIATEMENT sur le disque</action>
</action>

<template-output>supporting_documentation</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_9", "status": "completed", "timestamp": "{{now}}", "summary": "Toutes les docs de support écrites"}
- Mettre à jour current_step = "step_10"
- Lister toutes les nouvelles sorties générées
  </action>

<action>PURGER tous les contenus de documents du contexte, ne conserver que la liste des fichiers générés</action>
</step>

<step n="10" goal="Générer l'index maître comme source principale de récupération IA" if="workflow_mode != deep_dive">

<critical>CONVENTION DE MARQUEUR DE DOCUMENTATION INCOMPLÈTE :
Lorsqu'un document DEVRAIT être généré mais ne l'a pas été (en raison d'un scan rapide, de données manquantes, d'exigences conditionnelles non satisfaites) :

- Utiliser EXACTEMENT ce marqueur : _(À générer)_
- Le placer à la fin de la ligne de lien markdown
- Exemple : - [Contrats API - Server](./api-contracts-server.md) _(À générer)_
- Cela permet à l'Étape 11 de détecter et de proposer de compléter ces éléments
- TOUJOURS utiliser ce format exact pour la cohérence et la détection automatisée
  </critical>

<action>Créer index.md avec une navigation intelligente basée sur la structure du projet</action>

<action if="projet monopartie">
  <action>Générer un index simple avec :
    - Nom et type du projet
    - Référence rapide (pile technologique, type d'architecture)
    - Liens vers toutes les docs générées
    - Liens vers les docs existantes découvertes
    - Section de démarrage
  </action>
</action>

<action if="projet multi-parties">
  <action>Générer un index complet avec :
    - Aperçu du projet et résumé de structure
    - Section de navigation par partie
    - Référence rapide par partie
    - Liens d'intégration entre parties
    - Liens vers toutes les docs générées et existantes
    - Démarrage par partie
  </action>
</action>

<action>Inclure dans index.md :

## Index de la Documentation du Projet

### Aperçu du Projet

- **Type :** {{repository_type}} {{#if multi-part}}avec {{parts.length}} parties{{/if}}
- **Langage Principal :** {{primary_language}}
- **Architecture :** {{architecture_type}}

### Référence Rapide

{{#if single_part}}

- **Pile Technologique :** {{tech_stack_summary}}
- **Point d'Entrée :** {{entry_point}}
- **Pattern d'Architecture :** {{architecture_pattern}}
  {{else}}
  {{#each parts}}

#### {{part_name}} ({{part_id}})

- **Type :** {{project_type}}
- **Pile Technologique :** {{tech_stack}}
- **Racine :** {{root_path}}
  {{/each}}
  {{/if}}

### Documentation Générée

- [Aperçu du Projet](./project-overview.md)
- [Architecture](./architecture{{#if multi-part}}-{part\*id}{{/if}}.md){{#unless architecture_file_exists}} (À générer) {{/unless}}
- [Analyse de l'Arborescence Source](./source-tree-analysis.md)
- [Inventaire des Composants](./component-inventory{{#if multi-part}}-{part\*id}{{/if}}.md){{#unless component_inventory_exists}} (À générer) {{/unless}}
- [Guide de Développement](./development-guide{{#if multi-part}}-{part\*id}{{/if}}.md){{#unless dev_guide_exists}} (À générer) {{/unless}}
  {{#if deployment_found}}- [Guide de Déploiement](./deployment-guide.md){{#unless deployment_guide_exists}} (À générer) {{/unless}}{{/if}}
  {{#if contribution_found}}- [Guide de Contribution](./contribution-guide.md){{/if}}
  {{#if api_documented}}- [Contrats API](./api-contracts{{#if multi-part}}-{part_id}{{/if}}.md){{#unless api_contracts_exists}} (À générer) {{/unless}}{{/if}}
  {{#if data_models_documented}}- [Modèles de Données](./data-models{{#if multi-part}}-{part_id}{{/if}}.md){{#unless data_models_exists}} (À générer) {{/unless}}{{/if}}
  {{#if multi-part}}- [Architecture d'Intégration](./integration-architecture.md){{#unless integration_arch_exists}} (À générer) {{/unless}}{{/if}}

### Documentation Existante

{{#each existing_docs}}

- [{{title}}]({{relative_path}}) - {{description}}
  {{/each}}

### Démarrage

{{getting_started_instructions}}
</action>

<action>Avant d'écrire index.md, vérifier quels fichiers attendus existent réellement :

- Pour chaque document qui aurait dû être généré, vérifier si le fichier existe sur le disque
- Définir les indicateurs d'existence : architecture_file_exists, component_inventory_exists, dev_guide_exists, etc.
- Ces indicateurs déterminent s'il faut ajouter le marqueur _(À générer)_
- Suivre quels fichiers manquent dans {{missing_docs_list}} pour le rapport
  </action>

<action>Écrire IMMÉDIATEMENT index.md sur le disque avec les marqueurs _(À générer)_ appropriés pour les fichiers manquants</action>
<action>Valider que l'index possède toutes les sections requises et que les liens sont valides</action>

<template-output>index</template-output>

<action>Mettre à jour le fichier d'état :

- Ajouter à completed_steps : {"step": "step_10", "status": "completed", "timestamp": "{{now}}", "summary": "Index maître généré"}
- Mettre à jour current_step = "step_11"
- Ajouter la sortie : "index.md"
  </action>

<action>PURGER le contenu de l'index du contexte</action>
</step>

<step n="11" goal="Valider et réviser la documentation générée" if="workflow_mode != deep_dive">
<action>Afficher le résumé de tous les fichiers générés :
Générés dans {{project_knowledge}}/ :
{{file_list_with_sizes}}
</action>

<action>Exécuter la liste de contrôle de validation depuis ../checklist.md</action>

<critical>DÉTECTION DE DOCUMENTATION INCOMPLÈTE :

1. SCAN PRIMAIRE : chercher le marqueur exact : _(À générer)_
2. SCAN DE SECOURS : chercher des patterns flous (au cas où l'agent aurait été paresseux) :
   - _(TBD)_
   - _(TODO)_
   - _(Bientôt disponible)_
   - _(Pas encore généré)_
   - _(En attente)_
3. Extraire les métadonnées du document à partir de chaque correspondance pour la sélection par l'utilisateur
   </critical>

<action>Lire {project_knowledge}/index.md</action>

<action>Scanner les marqueurs de documentation incomplète :
Étape 1 : Rechercher le pattern exact "_(À générer)_" (sensible à la casse)
Étape 2 : Pour chaque correspondance trouvée, extraire la ligne entière
Étape 3 : Parser la ligne pour extraire :

- Titre du document (texte entre [crochets] ou en **gras**)
- Chemin du fichier (depuis le lien markdown ou déductible du titre)
- Type de document (déduire du nom de fichier : architecture, api-contracts, data-models, component-inventory, development-guide, deployment-guide, integration-architecture)
- ID de partie si applicable (extraire du nom de fichier comme "architecture-server.md" → part_id: "server")
  Étape 4 : Ajouter au tableau {{incomplete_docs_strict}}
  </action>

<action>Scan flou de secours pour les marqueurs alternatifs :
Chercher les patterns : _(TBD)_, _(TODO)_, _(Bientôt disponible)_, _(Pas encore généré)_, _(En attente)_
Pour chaque correspondance floue :

- Extraire les mêmes métadonnées que pour le scan strict
- Ajouter au tableau {{incomplete_docs_fuzzy}} avec le flag fuzzy_match
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

<ask>Génération de la documentation terminée !

Résumé :

- Type de Projet : {{project_type_summary}}
- Parties Documentées : {{parts_count}}
- Fichiers Générés : {{files_count}}
- Lignes Totales : {{total_lines}}

{{#if incomplete_docs_list.length > 0}}
⚠️ **Documentation Incomplète Détectée :**

J'ai trouvé {{incomplete_docs_list.length}} élément(s) marqué(s) comme incomplet(s) :

{{#each incomplete_docs_list}}
{{@index + 1}}. **{{title}}** ({{doc_type}}{{#if part_id}} pour {{part_id}}{{/if}}){{#if fuzzy_match}} ⚠️ [marqueur non standard]{{/if}}
{{/each}}

{{/if}}

Souhaitez-vous :

{{#if incomplete_docs_list.length > 0}}

1. **Générer la documentation incomplète** - Compléter l'un des {{incomplete_docs_list.length}} éléments ci-dessus
2. Réviser une section spécifique [tapez le nom de la section]
3. Ajouter plus de détails à une zone [tapez le nom de la zone]
4. Générer une documentation personnalisée supplémentaire [décrivez quoi]
5. Finaliser et terminer [tapez 'done']
   {{else}}
6. Réviser une section spécifique [tapez le nom de la section]
7. Ajouter plus de détails à une zone [tapez le nom de la zone]
8. Générer une documentation supplémentaire [décrivez quoi]
9. Finaliser et terminer [tapez 'done']
   {{/if}}

Votre choix :
</ask>

<check if="l'utilisateur sélectionne l'option 1 (générer incomplète)">
  <ask>Quels éléments incomplets souhaitez-vous générer ?

{{#each incomplete_docs_list}}
{{@index + 1}}. {{title}} ({{doc_type}}{{#if part_id}} - {{part_id}}{{/if}})
{{/each}}
{{incomplete_docs_list.length + 1}}. Tous

Entrez le(s) numéro(s) séparé(s) par des virgules (ex : "1,3,5"), ou tapez 'all' :
</ask>

<action>Parser la sélection utilisateur :

- Si "all", définir {{selected_items}} = tous les éléments de {{incomplete_docs_list}}
- Si numéros séparés par des virgules, extraire les éléments sélectionnés par index
- Stocker le résultat dans le tableau {{selected_items}}
  </action>

  <action>Afficher : "Génération de {{selected_items.length}} document(s)..."</action>

  <action>Pour chaque élément dans {{selected_items}} :

1. **Identifier la partie et les exigences :**
   - Extraire part_id de l'élément (s'il existe)
   - Rechercher les données de la partie dans le tableau project_parts depuis le fichier d'état
   - Charger documentation_requirements pour le project_type_id de cette partie

2. **Router vers la sous-étape de génération appropriée selon doc_type :**

   **Si doc_type == "architecture" :**
   - Afficher : "Génération de la documentation d'architecture pour {{part_id}}..."
   - Charger architecture_match pour cette partie depuis le fichier d'état (cache de l'Étape 3)
   - Ré-exécuter la logique de génération d'architecture de l'Étape 8 UNIQUEMENT pour cette partie spécifique
   - Utiliser le template matché et remplir avec les données mises en cache du fichier d'état
   - Écrire architecture-{{part_id}}.md sur le disque
   - Valider la complétude

   **Si doc_type == "api-contracts" :**
   - Afficher : "Génération des contrats API pour {{part_id}}..."
   - Charger les données de la partie et documentation_requirements
   - Ré-exécuter la sous-étape de scan API de l'Étape 4 ciblant UNIQUEMENT cette partie
   - Utiliser scan_level depuis le fichier d'état (quick/deep/exhaustive)
   - Générer api-contracts-{{part_id}}.md
   - Valider la structure du document

   **Si doc_type == "data-models" :**
   - Afficher : "Génération de la documentation des modèles de données pour {{part_id}}..."
   - Ré-exécuter la sous-étape de scan des modèles de données de l'Étape 4 ciblant UNIQUEMENT cette partie
   - Utiliser schema_migration_patterns de documentation_requirements
   - Générer data-models-{{part_id}}.md
   - Valider la complétude

   **Si doc_type == "component-inventory" :**
   - Afficher : "Génération de l'inventaire des composants pour {{part_id}}..."
   - Ré-exécuter la génération d'inventaire de composants de l'Étape 9 pour cette partie spécifique
   - Scanner les dossiers components/, ui/, widgets/
   - Générer component-inventory-{{part_id}}.md
   - Valider la structure

   **Si doc_type == "development-guide" :**
   - Afficher : "Génération du guide de développement pour {{part_id}}..."
   - Ré-exécuter la génération du guide de développement de l'Étape 9 pour cette partie spécifique
   - Utiliser key_file_patterns et test_file_patterns de documentation_requirements
   - Générer development-guide-{{part_id}}.md
   - Valider la complétude

   **Si doc_type == "deployment-guide" :**
   - Afficher : "Génération du guide de déploiement..."
   - Ré-exécuter le scan de configuration de déploiement de l'Étape 6
   - Ré-exécuter la génération du guide de déploiement de l'Étape 9
   - Générer deployment-guide.md
   - Valider la structure

   **Si doc_type == "integration-architecture" :**
   - Afficher : "Génération de l'architecture d'intégration..."
   - Ré-exécuter l'analyse d'intégration de l'Étape 7 pour toutes les parties
   - Générer integration-architecture.md
   - Valider la complétude

3. **Actions post-génération :**
   - Confirmer que le fichier a été écrit avec succès
   - Mettre à jour le fichier d'état avec la nouvelle sortie générée
   - Ajouter à la liste de suivi {{newly_generated_docs}}
   - Afficher : "✓ Généré : {{file_path}}"

4. **Gérer les erreurs :**
   - Si la génération échoue, logguer l'erreur et continuer avec l'élément suivant
   - Suivre les éléments échoués dans la liste {{failed_generations}}
     </action>

<action>Une fois tous les éléments sélectionnés traités :

**Mettre à jour index.md pour supprimer les marqueurs :**

1. Lire le contenu actuel de index.md
2. Pour chaque élément dans {{newly_generated_docs}} :
   - Trouver la ligne contenant le lien du fichier et le marqueur
   - Supprimer le texte _(À générer)_ ou le marqueur flou
   - Laisser le lien markdown intact
3. Réécrire le index.md mis à jour sur le disque
4. Mettre à jour le fichier d'état pour enregistrer la modification de index.md
   </action>

<action>Afficher le résumé de la génération :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ **Génération de la Documentation Terminée !**

**Générés avec Succès :**
{{#each newly_generated_docs}}

- {{title}} → {{file_path}}
  {{/each}}

{{#if failed_generations.length > 0}}
**Échecs de Génération :**
{{#each failed_generations}}

- {{title}} ({{error_message}})
  {{/each}}
  {{/if}}

**Mis à jour :** index.md (marqueurs d'incomplétude supprimés)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<action>Mettre à jour le fichier d'état avec toutes les activités de génération</action>

<action>Retourner au menu de l'Étape 11 (boucle pour vérifier d'éventuels éléments incomplets restants)</action>
</check>

<action if="l'utilisateur demande d'autres changements (options 2-3)">Effectuer les modifications demandées et régénérer les fichiers affectés</action>
<action if="l'utilisateur sélectionne finaliser (option 4 ou 5)">Passer à l'Étape 12 de finalisation</action>

<check if="pas en finalisation">
  <action>Mettre à jour le fichier d'état :
- Ajouter à completed_steps : {"step": "step_11_iteration", "status": "completed", "timestamp": "{{now}}", "summary": "Itération de revue terminée"}
- Conserver current_step = "step_11" (pour la boucle de retour)
- Mettre à jour l'horodatage last_updated
  </action>
  <action>Boucler au début de l'Étape 11 (re-scanner pour les docs incomplets restants)</action>
</check>

<check if="finalisation">
  <action>Mettre à jour le fichier d'état :
- Ajouter à completed_steps : {"step": "step_11", "status": "completed", "timestamp": "{{now}}", "summary": "Validation et revue terminées"}
- Mettre à jour current_step = "step_12"
  </action>
  <action>Passer à l'Étape 12</action>
</check>
</step>

<step n="12" goal="Finaliser et fournir les prochaines étapes" if="workflow_mode != deep_dive">
<action>Créer le rapport de résumé final</action>
<action>Compiler les variables du récapitulatif de vérification :
  - Définir {{verification_summary}} avec les tests, validations ou scripts concrets exécutés (ou "aucun exécuté").
  - Définir {{open_risks}} avec les risques restants ou les TODO de suivi (ou "aucun").
  - Définir {{next_checks}} avec les actions recommandées avant de merger/déployer (ou "aucune").
</action>

<action>Afficher le message de complétion :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Documentation du Projet Terminée ! ✓

**Emplacement :** {{project_knowledge}}/

**Index Maître :** {{project_knowledge}}/index.md
👆 C'est votre point d'entrée principal pour le développement assisté par IA

**Documentation Générée :**
{{generated_files_list}}

**Prochaines Étapes :**

1. Consultez index.md pour vous familiariser avec la structure de la documentation
2. Lors de la création d'un PRD brownfield, pointez le workflow PRD vers : {{project_knowledge}}/index.md
3. Pour les fonctionnalités UI uniquement : référez-vous à {{project_knowledge}}/architecture-{{ui_part_id}}.md
4. Pour les fonctionnalités API uniquement : référez-vous à {{project_knowledge}}/architecture-{{api_part_id}}.md
5. Pour les fonctionnalités full-stack : référez-vous aux architectures des deux parties + integration-architecture.md

**Récapitulatif de Vérification :**

- Tests/extractions exécutés : {{verification_summary}}
- Risques ou suivis en suspens : {{open_risks}}
- Vérifications recommandées avant PR : {{next_checks}}

**Commande PRD Brownfield :**
Lorsque vous serez prêt à planifier de nouvelles fonctionnalités, lancez le workflow PRD et fournissez cet index en entrée.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<action>FINALISER le fichier d'état :

- Ajouter à completed_steps : {"step": "step_12", "status": "completed", "timestamp": "{{now}}", "summary": "Workflow terminé"}
- Mettre à jour timestamps.completed = "{{now}}"
- Mettre à jour current_step = "completed"
- Écrire le fichier d'état final
  </action>

<action>Afficher : "Fichier d'état enregistré : {{project_knowledge}}/project-scan-report.json"</action>

</step>

</workflow>
