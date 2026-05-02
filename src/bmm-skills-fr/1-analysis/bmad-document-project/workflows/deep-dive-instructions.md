# Instructions de Documentation Approfondie (Deep-Dive)

<workflow>

<critical>Ce workflow effectue une documentation exhaustive approfondie de zones spécifiques</critical>
<critical>Gère uniquement le mode : deep_dive</critical>
<critical>VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`</critical>
<critical>VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`</critical>

<step n="13" goal="Documentation approfondie d'une zone spécifique" if="workflow_mode == deep_dive">
<critical>Le mode Deep-dive nécessite une révision littérale de chaque fichier complet. L'échantillonnage, les suppositions ou le fait de s'appuyer uniquement sur les sorties d'outils est INTERDIT.</critical>
<action>Charger la structure de projet existante depuis index.md et project-parts.json (si existants)</action>
<action>Charger l'analyse de l'arborescence source pour comprendre les zones disponibles</action>

<step n="13a" goal="Identifier la zone pour la plongée approfondie">
  <action>Analyser la documentation existante pour suggérer des options de deep-dive</action>

<ask>Quelle zone souhaiteriez-vous approfondir ?

**Zones Suggérées Basées sur la Structure du Projet :**

{{#if has_api_routes}}

## Routes API ({{api_route_count}} points de terminaison trouvés)

{{#each api_route_groups}}
{{group_index}}. {{group_name}} - {{endpoint_count}} points de terminaison dans `{{path}}`
{{/each}}
{{/if}}

{{#if has_feature_modules}}

## Modules de Fonctionnalités ({{feature_count}} fonctionnalités)

{{#each feature_modules}}
{{module_index}}. {{module_name}} - {{file_count}} fichiers dans `{{path}}`
{{/each}}
{{/if}}

{{#if has_ui_components}}

### Zones de Composants UI

{{#each component_groups}}
{{group_index}}. {{group_name}} - {{component_count}} composants dans `{{path}}`
{{/each}}
{{/if}}

{{#if has_services}}

### Services / Logique Métier

{{#each service_groups}}
{{service_index}}. {{service_name}} - `{{path}}`
{{/each}}
{{/if}}

**Ou spécifiez une zone personnalisée :**

- Chemin du dossier (ex: "client/src/features/dashboard")
- Chemin du fichier (ex: "server/src/api/users.ts")
- Nom de la fonctionnalité (ex: "système d'authentification")

Entrez votre choix (numéro ou chemin personnalisé) :
</ask>

<action>Analyser l'entrée utilisateur pour déterminer : - target_type : "folder" | "file" | "feature" | "api_group" | "component_group" - target_path : Chemin absolu à scanner - target_name : Nom lisible pour la documentation - target_scope : Liste de tous les fichiers à analyser
</action>

<action>Stocker sous {{deep_dive_target}}</action>

<action>Afficher la confirmation :
Cible : {{target_name}}
Type : {{target_type}}
Chemin : {{target_path}}
Estimation des fichiers à analyser : {{estimated_file_count}}

Cela lira CHAQUE fichier de cette zone. Continuer ? [y/n]
</action>

<action if="l'utilisateur confirme avec 'n'">Retourner à l'Étape 13a (sélectionner une zone différente)</action>
</step>

<step n="13b" goal="Scan complet et exhaustif de la zone cible">
  <action>Définir scan_mode = "exhaustive"</action>
  <action>Initialiser file_inventory = []</action>
  <critical>Vous devez lire chaque ligne de chaque fichier dans le périmètre et capturer une explication en langage clair (ce que fait le fichier, les effets de bord, pourquoi c'est important) que les futurs agents développeurs pourront exploiter. Aucun raccourci.</critical>

  <check if="target_type == folder">
    <action>Obtenir la liste complète récursive des fichiers de {{target_path}}</action>
    <action>Filtrer : node_modules/, .git/, dist/, build/, coverage/, *.min.js, *.map</action>
    <action>Pour CHAQUE fichier restant dans le dossier :
      - Lire le contenu complet du fichier (toutes les lignes)
      - Extraire tous les exports (fonctions, classes, types, interfaces, constantes)
      - Extraire tous les imports (dépendances)
      - Identifier l'objectif à partir des commentaires et de la structure du code
      - Écrire au moins 1-2 phrases en langage naturel décrivant le comportement, les effets de bord, les hypothèses et tout ce qu'un développeur doit savoir avant de modifier le fichier
      - Extraire les signatures de fonctions avec les types de paramètres et les types de retour
      - Noter tous les TODO, FIXME ou commentaires
      - Identifier les patterns (hooks, composants, services, contrôleurs, etc.)
      - Capturer les conseils pour les contributeurs par fichier : `contributor_note`, `risks`, `verification_steps`, `suggested_tests`
      - Stocker dans file_inventory
    </action>
  </check>

  <check if="target_type == file">
    <action>Lire le fichier complet à {{target_path}}</action>
    <action>Extraire toutes les informations comme ci-dessus</action>
    <action>Lire tous les fichiers qu'il importe (suivre la chaîne d'import sur 1 niveau de profondeur)</action>
    <action>Trouver tous les fichiers qui importent ce fichier (dépendants via grep)</action>
    <action>Stocker le tout dans file_inventory</action>
  </check>

  <check if="target_type == api_group">
    <action>Identifier tous les fichiers de routes/contrôleurs dans le groupe API</action>
    <action>Lire tous les gestionnaires de routes complètement</action>
    <action>Lire les middlewares, contrôleurs et services associés</action>
    <action>Lire les modèles de données et schémas utilisés</action>
    <action>Extraire les schémas complets de requête/réponse</action>
    <action>Documenter les exigences d'authentification et d'autorisation</action>
    <action>Stocker le tout dans file_inventory</action>
  </check>

  <check if="target_type == feature">
    <action>Rechercher dans la base de code tous les fichiers liés au nom de la fonctionnalité</action>
    <action>Inclure : composants UI, points de terminaison API, modèles, services, tests</action>
    <action>Lire chaque fichier complètement</action>
    <action>Stocker le tout dans file_inventory</action>
  </check>

  <check if="target_type == component_group">
    <action>Obtenir tous les fichiers de composants du groupe</action>
    <action>Lire chaque composant complètement</action>
    <action>Extraire : interfaces de Props, hooks utilisés, composants enfants, gestion de l'état</action>
    <action>Stocker le tout dans file_inventory</action>
  </check>

<action>Pour chaque fichier dans file_inventory, documenter : - **Chemin du Fichier :** Chemin complet - **Objectif :** Ce que fait ce fichier (1-2 phrases) - **Lignes de Code :** Total LOC - **Exports :** Liste complète avec signatures

- Fonctions : `nomFonction(param : Type) : TypeRetour` - Description
  - Classes : `NomClasse` - Description avec les méthodes clés
  - Types/Interfaces : `NomType` - Description
  - Constantes : `NOM_CONSTANTE : Type` - Description - **Imports/Dépendances :** Ce qu'il utilise et pourquoi - **Utilisé Par :** Fichiers qui importent ceci (dépendants) - **Détails d'Implémentation Clés :** Logique importante, algorithmes, patterns - **Gestion de l'État :** Si applicable (Redux, Context, état local) - **Effets de Bord (Side Effects) :** Appels API, requêtes de base de données, E/S de fichiers, services externes - **Gestion des Erreurs :** Blocs try/catch, limites d'erreur (error boundaries), validation - **Tests :** Fichiers de test associés et couverture - **Commentaires/TODO :** Toute documentation en ligne ou travail planifié
    </action>

<template-output>comprehensive_file_inventory</template-output>
</step>

<step n="13c" goal="Analyser les relations et le flux de données">
  <action>Construire le graphe de dépendances pour la zone scannée :
    - Créer le graphe avec les fichiers comme nœuds
    - Ajouter les arêtes pour les relations d'import
    - Identifier les dépendances circulaires s'il y en a
    - Trouver les points d'entrée (fichiers non importés par d'autres dans le périmètre)
    - Trouver les nœuds feuilles (fichiers qui n'importent aucun autre dans le périmètre)
  </action>

<action>Tracer le flux de données à travers le système : - Suivre les appels de fonctions et les transformations de données - Suivre les appels API et leurs réponses - Documenter les mises à jour et la propagation de l'état - Cartographier les requêtes et mutations de base de données
</action>

<action>Identifier les points d'intégration : - API externes consommées - API/services internes appelés - État partagé accédé - Événements publiés/souscrits - Tables de base de données accédées
</action>

<template-output>dependency_graph</template-output>
<template-output>data_flow_analysis</template-output>
<template-output>integration_points</template-output>
</step>

<step n="13d" goal="Trouver du code connexe et des patterns similaires">
  <action>Rechercher dans la base de code EN DEHORS de la zone scannée :
    - Naming patterns similaires pour les fichiers/dossiers
    - Signatures de fonctions similaires
    - Structures de composants similaires
    - Patterns d'API similaires
    - Utilitaires réutilisables qui pourraient être utilisés
  </action>

<action>Identifier les opportunités de réutilisation de code : - Utilitaires partagés disponibles - Patterns de conception utilisés ailleurs - Bibliothèques de composants disponibles - Fonctions d'aide qui pourraient s'appliquer
</action>

<action>Trouver des implémentations de référence : - Fonctionnalités similaires dans d'autres parties de la base de code - Patterns établis à suivre - Approches de test utilisées ailleurs
</action>

<template-output>related_code_references</template-output>
<template-output>reuse_opportunities</template-output>
</step>

<step n="13e" goal="Générer une documentation approfondie complète">
  <action>Créer le nom du fichier de documentation : deep-dive-{{sanitized_target_name}}.md</action>
  <action>Agréger les informations pour les contributeurs à travers les fichiers :
    - Combiner les notes uniques sur les risques/gotchas dans {{risks_notes}}
    - Combiner les étapes de vérification que les développeurs doivent exécuter avant les changements dans {{verification_steps}}
    - Combiner les commandes de test recommandées dans {{suggested_tests}}
  </action>

<action>Charger le template de deep-dive complet depuis : ../templates/deep-dive-template.md</action>
<action>Remplir le template avec toutes les données collectées lors des étapes 13b-13d</action>
<action>Écrire le template rempli dans : {project_knowledge}/deep-dive-{{sanitized_target_name}}.md</action>
<action>Valider la complétude du document de deep-dive</action>

<template-output>deep_dive_documentation</template-output>

<action>Mettre à jour le fichier d'état : - Ajouter au tableau deep_dive_targets : {"target_name": "{{target_name}}", "target_path": "{{target_path}}", "files_analyzed": {{file_count}}, "output_file": "deep-dive-{{sanitized_target_name}}.md", "timestamp": "{{now}}"} - Ajouter la sortie à outputs_generated - Mettre à jour l'horodatage last_updated
</action>
</step>

<step n="13f" goal="Mettre à jour l'index principal avec le lien de deep-dive">
  <action>Lire le fichier index.md existant</action>

<action>Vérifier si la section "Documentation Approfondie (Deep-Dive)" existe</action>

  <check if="la section n'existe pas">
    <action>Ajouter la nouvelle section après "Documentation Générée" :

## Documentation Approfondie (Deep-Dive)

Analyses exhaustives détaillées de zones spécifiques :

    </action>

  </check>

<action>Ajouter le lien vers le nouveau document de deep-dive :

- [Deep-Dive {{target_name}}](./deep-dive-{{sanitized_target_name}}.md) - Analyse exhaustive de {{target_description}} ({{file_count}} fichiers, {{total_loc}} LOC) - Généré le {{date}}
  </action>

  <action>Mettre à jour les métadonnées de l'index :
  Last Updated : {{date}}
  Deep-Dives : {{deep_dive_count}}
  </action>

  <action>Enregistrer le fichier index.md mis à jour</action>

  <template-output>updated_index</template-output>
  </step>

<step n="13g" goal="Proposer de continuer ou de terminer">
  <action>Afficher le résumé :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Documentation Deep-Dive Terminée ! ✓

**Générée :** {project_knowledge}/deep-dive-{{target_name}}.md
**Fichiers Analysés :** {{file_count}}
**Lignes de Code Scannées :** {{total_loc}}
**Temps Écoulé :** ~{{duration}}

**La Documentation Inclut :**

- Inventaire complet des fichiers avec tous les exports
- Graphe de dépendances et flux de données
- Points d'intégration et contrats d'API
- Analyse des tests et couverture
- Code connexe et opportunités de réutilisation
- Conseils d'implémentation

**Index Mis à Jour :** {project_knowledge}/index.md inclut désormais le lien vers ce deep-dive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<ask>Souhaitez-vous :

1. **Approfondir une autre zone** - Analyser une autre fonctionnalité/module/dossier
2. **Terminer** - Compléter le workflow

Votre choix [1/2] :
</ask>

  <check if="l'utilisateur sélectionne 1">
    <action>Effacer le deep_dive_target actuel</action>
    <action>Aller à l'Étape 13a (sélectionner une nouvelle zone)</action>
  </check>

  <check if="l'utilisateur sélectionne 2">
    <action>Afficher le message final :

Toute la documentation approfondie est terminée !

**Index Principal :** {project_knowledge}/index.md
**Deep-Dives Générés :** {{deep_dive_count}}

Ces documents complets sont maintenant prêts pour :

- Revue d'architecture
- Planification d'implémentation
- Compréhension du code
- Création de PRD brownfield

Merci d'avoir utilisé le workflow document-project !
</action>
<action>Quitter le workflow</action>
</check>
</step>
</step>

</workflow>
