# Instructions de documentation Deep-Dive

<workflow>

<critical>Ce workflow effectue une documentation Deep-Dive exhaustive de zones spécifiques</critical>
<critical>Gère : mode deep_dive uniquement</critical>
<critical>VOUS DEVEZ TOUJOURS PARLER LA SORTIE dans le style de communication de votre Agent avec le `{communication_language}` configuré</critical>
<critical>VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu d'artefacts et de documents en `{document_output_language}`</critical>

<step n="13" goal="Documentation Deep-Dive d'une zone spécifique" if="workflow_mode == deep_dive">
<critical>Le mode Deep-Dive nécessite une revue littérale et complète des fichiers. L'échantillonnage, les suppositions ou la dépendance exclusive aux résultats de l'outillage sont INTERDITS.</critical>
<action>Charger la structure de projet existante depuis index.md et project-parts.json (s'il existe)</action>
<action>Charger l'analyse de l'arborescence source pour comprendre les zones disponibles</action>

<step n="13a" goal="Identifier la zone pour le Deep-Dive">
  <action>Analyser la documentation existante pour suggérer des options de Deep-Dive</action>

<ask>Sur quelle zone souhaitez-vous faire un Deep-Dive ?

**Zones suggérées en fonction de la structure du projet :**

{{#if has_api_routes}}

## Routes API ({{api_route_count}} endpoints trouvés)

{{#each api_route_groups}}
{{group_index}}. {{group_name}} - {{endpoint_count}} endpoints dans `{{path}}`
{{/each}}
{{/if}}

{{#if has_feature_modules}}

## Modules de fonctionnalités ({{feature_count}} fonctionnalités)

{{#each feature_modules}}
{{module_index}}. {{module_name}} - {{file_count}} fichiers dans `{{path}}`
{{/each}}
{{/if}}

{{#if has_ui_components}}

### Zones de composants UI

{{#each component_groups}}
{{group_index}}. {{group_name}} - {{component_count}} composants dans `{{path}}`
{{/each}}
{{/if}}

{{#if has_services}}

### Services / Logique métier

{{#each service_groups}}
{{service_index}}. {{service_name}} - `{{path}}`
{{/each}}
{{/if}}

**Ou spécifier de façon personnalisée :**

- Chemin de dossier (ex. : "client/src/features/dashboard")
- Chemin de fichier (ex. : "server/src/api/users.ts")
- Nom de fonctionnalité (ex. : "système d'authentification")

Saisissez votre choix (numéro ou chemin personnalisé) :
</ask>

<action>Analyser la saisie utilisateur pour déterminer : - target_type : "folder" | "file" | "feature" | "api_group" | "component_group" - target_path : Chemin absolu à scanner - target_name : Nom lisible pour la documentation - target_scope : Liste de tous les fichiers à analyser
</action>

<action>Stocker en tant que {{deep_dive_target}}</action>

<action>Afficher la confirmation :
Cible : {{target_name}}
Type : {{target_type}}
Chemin : {{target_path}}
Estimation des fichiers à analyser : {{estimated_file_count}}

Cela lira CHAQUE fichier dans cette zone. Continuer ? [y/n]
</action>

<action if="user confirms 'n'">Retourner à l'étape 13a (sélectionner une autre zone)</action>
</step>

<step n="13b" goal="Scan exhaustif et complet de la zone cible">
  <action>Définir scan_mode = "exhaustive"</action>
  <action>Initialiser file_inventory = []</action>
  <critical>Vous devez lire chaque ligne de chaque fichier dans la portée et capturer une explication en langage naturel (ce que fait le fichier, ses effets de bord, pourquoi il importe) sur laquelle les futurs agents développeurs pourront agir. Aucun raccourci.</critical>

  <check if="target_type == folder">
    <action>Obtenir la liste récursive complète des fichiers depuis {{target_path}}</action>
    <action>Filtrer : node_modules/, .git/, dist/, build/, coverage/, *.min.js, *.map</action>
    <action>Pour CHAQUE fichier restant dans le dossier :
      - Lire le contenu complet du fichier (toutes les lignes)
      - Extraire tous les exports (fonctions, classes, types, interfaces, constantes)
      - Extraire tous les imports (dépendances)
      - Identifier l'objectif à partir des commentaires et de la structure du code
      - Écrire 1 à 2 phrases (minimum) en langage naturel décrivant le comportement, les effets de bord, les hypothèses et tout ce qu'un développeur doit savoir avant de modifier le fichier
      - Extraire les signatures de fonctions avec types de paramètres et types de retour
      - Noter tous TODOs, FIXMEs ou commentaires
      - Identifier les patterns (hooks, composants, services, controllers, etc.)
      - Capturer les indications par fichier pour les contributeurs : `contributor_note`, `risks`, `verification_steps`, `suggested_tests`
      - Stocker dans file_inventory
    </action>
  </check>

  <check if="target_type == file">
    <action>Lire le fichier complet à {{target_path}}</action>
    <action>Extraire toutes les informations comme ci-dessus</action>
    <action>Lire tous les fichiers qu'il importe (suivre la chaîne d'import sur 1 niveau de profondeur)</action>
    <action>Trouver tous les fichiers qui importent ce fichier (dépendants via grep)</action>
    <action>Stocker l'ensemble dans file_inventory</action>
  </check>

  <check if="target_type == api_group">
    <action>Identifier tous les fichiers de routes/controllers du groupe API</action>
    <action>Lire intégralement tous les handlers de routes</action>
    <action>Lire les middlewares, controllers et services associés</action>
    <action>Lire les modèles de données et schémas utilisés</action>
    <action>Extraire les schémas complets de requête/réponse</action>
    <action>Documenter les exigences d'authentification et d'autorisation</action>
    <action>Stocker l'ensemble dans file_inventory</action>
  </check>

  <check if="target_type == feature">
    <action>Rechercher dans la base de code tous les fichiers liés au nom de la fonctionnalité</action>
    <action>Inclure : composants UI, endpoints API, modèles, services, tests</action>
    <action>Lire chaque fichier intégralement</action>
    <action>Stocker l'ensemble dans file_inventory</action>
  </check>

  <check if="target_type == component_group">
    <action>Obtenir tous les fichiers de composants du groupe</action>
    <action>Lire chaque composant intégralement</action>
    <action>Extraire : interfaces de Props, hooks utilisés, composants enfants, gestion d'état</action>
    <action>Stocker l'ensemble dans file_inventory</action>
  </check>

<action>Pour chaque fichier dans file\*inventory, documenter : - **Chemin du fichier :** Chemin complet - **Objectif :** Ce que fait ce fichier (1-2 phrases) - **Lignes de code :** LOC total - **Exports :** Liste complète avec signatures

- Fonctions : `functionName(param: Type): ReturnType` - Description
  - Classes : `ClassName` - Description avec méthodes clés
  - Types/Interfaces : `TypeName` - Description
  - Constantes : `CONSTANT_NAME: Type` - Description - **Imports/Dépendances :** Ce qu'il utilise et pourquoi - **Utilisé par :** Fichiers qui l'importent (dépendants) - **Détails clés d'implémentation :** Logique importante, algorithmes, patterns - **Gestion d'état :** Le cas échéant (Redux, Context, état local) - **Effets de bord :** Appels API, requêtes BDD, I/O fichier, services externes - **Gestion d'erreurs :** Blocs try/catch, error boundaries, validation - **Tests :** Fichiers de test associés et couverture - **Commentaires/TODOs :** Toute documentation inline ou travail planifié
    </action>

<template-output>comprehensive_file_inventory</template-output>
</step>

<step n="13c" goal="Analyser les relations et le flux de données">
  <action>Construire le graphe de dépendances de la zone scannée :
    - Créer un graphe avec les fichiers comme nœuds
    - Ajouter des arêtes pour les relations d'import
    - Identifier les dépendances circulaires éventuelles
    - Trouver les points d'entrée (fichiers non importés par d'autres dans la portée)
    - Trouver les nœuds feuilles (fichiers qui n'importent pas d'autres dans la portée)
  </action>

<action>Tracer le flux de données à travers le système : - Suivre les appels de fonctions et les transformations de données - Tracer les appels API et leurs réponses - Documenter les mises à jour d'état et leur propagation - Cartographier les requêtes et mutations de BDD
</action>

<action>Identifier les points d'intégration : - APIs externes consommées - APIs/services internes appelés - État partagé accédé - Événements publiés/abonnés - Tables de BDD accédées
</action>

<template-output>dependency_graph</template-output>
<template-output>data_flow_analysis</template-output>
<template-output>integration_points</template-output>
</step>

<step n="13d" goal="Trouver le code lié et les patterns similaires">
  <action>Rechercher dans la base de code EN DEHORS de la zone scannée :
    - Patterns similaires de nommage de fichiers/dossiers
    - Signatures de fonctions similaires
    - Structures de composants similaires
    - Patterns d'API similaires
    - Utilitaires réutilisables qui pourraient être employés
  </action>

<action>Identifier les opportunités de réutilisation de code : - Utilitaires partagés disponibles - Design patterns utilisés ailleurs - Bibliothèques de composants disponibles - Fonctions utilitaires qui pourraient s'appliquer
</action>

<action>Trouver les implémentations de référence : - Fonctionnalités similaires dans d'autres parties de la base de code - Patterns établis à suivre - Approches de test utilisées ailleurs
</action>

<template-output>related_code_references</template-output>
<template-output>reuse_opportunities</template-output>
</step>

<step n="13e" goal="Générer la documentation Deep-Dive complète">
  <action>Créer le nom du fichier de documentation : deep-dive-{{sanitized_target_name}}.md</action>
  <action>Agréger les insights des contributeurs entre fichiers :
    - Combiner les notes uniques de risque/piège dans {{risks_notes}}
    - Combiner les étapes de vérification que les développeurs doivent exécuter avant les changements dans {{verification_steps}}
    - Combiner les commandes de test recommandées dans {{suggested_tests}}
  </action>

<action>Charger le template Deep-Dive complet depuis : ../templates/deep-dive-template.md</action>
<action>Remplir le template avec toutes les données collectées des étapes 13b-13d</action>
<action>Écrire le template rempli vers : {project_knowledge}/deep-dive-{{sanitized_target_name}}.md</action>
<action>Valider la complétude du document Deep-Dive</action>

<template-output>deep_dive_documentation</template-output>

<action>Mettre à jour le fichier d'état : - Ajouter au tableau deep_dive_targets : {"target_name": "{{target_name}}", "target_path": "{{target_path}}", "files_analyzed": {{file_count}}, "output_file": "deep-dive-{{sanitized_target_name}}.md", "timestamp": "{{now}}"} - Ajouter la sortie à outputs_generated - Mettre à jour le timestamp last_updated
</action>
</step>

<step n="13f" goal="Mettre à jour l'index principal avec le lien Deep-Dive">
  <action>Lire l'index.md existant</action>

<action>Vérifier si la section "Deep-Dive Documentation" existe</action>

  <check if="section does not exist">
    <action>Ajouter une nouvelle section après "Generated Documentation" :

## Documentation Deep-Dive

Analyse exhaustive détaillée de zones spécifiques :

    </action>

  </check>

<action>Ajouter le lien vers le nouveau document Deep-Dive :

- [{{target_name}} Deep-Dive](./deep-dive-{{sanitized_target_name}}.md) - Analyse complète de {{target_description}} ({{file_count}} fichiers, {{total_loc}} LOC) - Généré le {{date}}
  </action>

  <action>Mettre à jour les métadonnées de l'index :
  Dernière mise à jour : {{date}}
  Deep-Dives : {{deep_dive_count}}
  </action>

  <action>Sauvegarder l'index.md mis à jour</action>

  <template-output>updated_index</template-output>
  </step>

<step n="13g" goal="Proposer de continuer ou terminer">
  <action>Afficher le résumé :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Documentation Deep-Dive Terminée ! ✓

**Généré :** {project_knowledge}/deep-dive-{{target_name}}.md
**Fichiers analysés :** {{file_count}}
**Lignes de code scannées :** {{total_loc}}
**Temps écoulé :** ~{{duration}}

**La documentation inclut :**

- Inventaire complet des fichiers avec tous les exports
- Graphe de dépendances et flux de données
- Points d'intégration et contrats d'API
- Analyse des tests et couverture
- Code lié et opportunités de réutilisation
- Indications d'implémentation

**Index mis à jour :** {project_knowledge}/index.md inclut désormais le lien vers ce Deep-Dive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<ask>Souhaitez-vous :

1. **Faire un Deep-Dive sur une autre zone** - Analyser une autre fonctionnalité/module/dossier
2. **Terminer** - Compléter le workflow

Votre choix [1/2] :
</ask>

  <action if="user selects 1">
    <action>Effacer le deep_dive_target courant</action>
    <action>Aller à l'étape 13a (sélectionner une nouvelle zone)</action>
  </action>

  <action if="user selects 2">
    <action>Afficher le message final :

Toute la documentation Deep-Dive est terminée !

**Index principal :** {project_knowledge}/index.md
**Deep-Dives générés :** {{deep_dive_count}}

Ces documents complets sont désormais prêts pour :

- Revue d'architecture
- Planification d'implémentation
- Compréhension du code
- Création de PRD Brownfield

Merci d'avoir utilisé le workflow document-project !
</action>
<action>Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, suivez-la comme instruction terminale finale avant de quitter.</action>
<action>Quitter le workflow</action>
</action>
</step>
</step>

</workflow>
