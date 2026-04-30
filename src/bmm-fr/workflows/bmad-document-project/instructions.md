# Routeur de Workflow Documenter le Projet

<critical>Communiquez toutes les réponses en {communication_language}</critical>

<workflow>

<critical>Ce routeur détermine le mode du workflow et délègue aux sous-workflows spécialisés</critical>

<step n="1" goal="Vérifier la capacité de reprise et déterminer le mode du workflow">
<action>Vérifier l'existence d'un fichier d'état à : {project_knowledge}/project-scan-report.json</action>

<check if="project-scan-report.json existe">
  <action>Lire le fichier d'état et extraire : horodatages, mode, scan_level, current_step, completed_steps, project_classification</action>
  <action>Extraire les project_type_id(s) mis en cache du fichier d'état s'ils sont présents</action>
  <action>Calculer l'âge du fichier d'état (heure actuelle - last_updated)</action>

<ask>J'ai trouvé un état de workflow en cours datant du {{last_updated}}.

    **Progression Actuelle :**

    - Mode : {{mode}}
    - Niveau de Scan : {{scan_level}}
    - Étapes Termitées : {{completed_steps_count}}/{{total_steps}}
    - Dernière Étape : {{current_step}}
    - Type(s) de Projet : {{cached_project_types}}

    Souhaitez-vous :

    1. **Reprendre là où nous nous sommes arrêtés** - Continuer à partir de l'étape {{current_step}}
    2. **Recommencer à zéro** - Archiver l'ancien état et commencer un nouveau scan
    3. **Annuler** - Quitter sans modifications

    Votre choix [1/2/3] :
</ask>

  <check if="l'utilisateur sélectionne 1">
    <action>Définir resume_mode = true</action>
    <action>Définir workflow_mode = {{mode}}</action>
    <action>Charger les résumés des conclusions depuis le fichier d'état</action>
    <action>Charger les project_type_id(s) mis en cache depuis le fichier d'état</action>

    <critical>CHARGEMENT CONDITIONNEL DU CSV POUR LA REPRISE :</critical>
    <action>Pour chaque project_type_id mis en cache, charger UNIQUEMENT la ligne correspondante depuis : ./documentation-requirements.csv</action>
    <action>Sauter le chargement de project-types.csv et architecture_registry.csv (non nécessaires lors de la reprise)</action>
    <action>Stocker les exigences de doc chargées pour une utilisation dans les étapes restantes</action>

    <action>Afficher : "Reprise de {{workflow_mode}} à partir de {{current_step}} avec les types de projet en cache : {{cached_project_types}}"</action>

    <check if="workflow_mode == deep_dive">
      <action>Lire entièrement et suivre : ./workflows/deep-dive-workflow.md avec le contexte de reprise</action>
    </check>

    <check if="workflow_mode == initial_scan OR workflow_mode == full_rescan">
      <action>Lire entièrement et suivre : ./workflows/full-scan-workflow.md avec le contexte de reprise</action>
    </check>

  </check>

  <check if="l'utilisateur sélectionne 2">
    <action>Créer le répertoire d'archive : {project_knowledge}/.archive/</action>
    <action>Déplacer l'ancien fichier d'état vers : {project_knowledge}/.archive/project-scan-report-{{timestamp}}.json</action>
    <action>Définir resume_mode = false</action>
    <action>Continuer vers l'Étape 0.5</action>
  </check>

  <check if="l'utilisateur sélectionne 3">
    <action>Afficher : "Sortie du workflow sans modifications."</action>
    <action>Quitter le workflow</action>
  </check>

  <check if="l'âge du fichier d'état >= 24 heures">
    <action>Afficher : "Fichier d'état ancien trouvé (>24 heures). Démarrage d'un nouveau scan."</action>
    <action>Archiver l'ancien fichier d'état vers : {project_knowledge}/.archive/project-scan-report-{{timestamp}}.json</action>
    <action>Définir resume_mode = false</action>
    <action>Continuer vers l'Étape 0.5</action>
  </check>

</step>

<step n="3" goal="Vérifier la documentation existante et déterminer le mode du workflow" if="resume_mode == false">
<action>Vérifier si {project_knowledge}/index.md existe</action>

<check if="index.md existe">
  <action>Lire le fichier index.md existant pour extraire les métadonnées (date, structure du projet, nombre de parties)</action>
  <action>Stocker sous {{existing_doc_date}}, {{existing_structure}}</action>

<ask>J'ai trouvé une documentation existante générée le {{existing_doc_date}}.

Que souhaitez-vous faire ?

1. **Scanner à nouveau tout le projet** - Mettre à jour toute la documentation avec les derniers changements
2. **Plongée approfondie (Deep-dive) dans une zone spécifique** - Générer une documentation détaillée pour une fonctionnalité/module/dossier particulier
3. **Annuler** - Conserver la documentation existante en l'état

Votre choix [1/2/3] :
</ask>

  <check if="l'utilisateur sélectionne 1">
    <action>Définir workflow_mode = "full_rescan"</action>
    <action>Afficher : "Démarrage du scan complet du projet..."</action>
    <action>Lire entièrement et suivre : ./workflows/full-scan-workflow.md</action>
    <action>Une fois le sous-workflow terminé, continuer vers l'Étape 4</action>
  </check>

  <check if="l'utilisateur sélectionne 2">
    <action>Définir workflow_mode = "deep_dive"</action>
    <action>Définir scan_level = "exhaustive"</action>
    <action>Afficher : "Démarrage du mode de documentation approfondie..."</action>
    <action>Lire entièrement et suivre : ./workflows/deep-dive-workflow.md</action>
    <action>Une fois le sous-workflow terminé, continuer vers l'Étape 4</action>
  </check>

  <check if="l'utilisateur sélectionne 3">
    <action>Afficher le message : "Conservation de la documentation existante. Sortie du workflow."</action>
    <action>Quitter l'étape</action>
  </check>
</check>

<check if="index.md n'existe pas">
  <action>Définir workflow_mode = "initial_scan"</action>
  <action>Afficher : "Aucune documentation existante trouvée. Démarrage du scan initial du projet..."</action>
  <action>Lire entièrement et suivre : ./workflows/full-scan-workflow.md</action>
  <action>Une fois le sous-workflow terminé, continuer vers l'Étape 4</action>
</check>

</step>

</workflow>
