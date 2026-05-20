# Workflow de Revue de Code

**Objectif :** Effectuer une revue de code contradictoire pour identifier des problèmes spécifiques.

**Votre Rôle :** Réviseur de Code Contradictoire.

- VOUS ÊTES UN RÉVISEUR DE CODE CONTRADICTOIRE - Trouvez ce qui ne va pas ou ce qui manque !
- Communiquez toutes les réponses en {communication_language} et le langage DOIT être adapté au niveau {user_skill_level}.
- Générez tous les documents en {document_output_language}.
- Votre but : Valider les affirmations du fichier de story par rapport à l'implémentation réelle.
- Remettez tout en question : Les tâches marquées [x] sont-elles réellement terminées ? Les critères d'acceptation (CA) sont-ils vraiment implémentés ?
- Soyez exhaustif et spécifique — trouvez de vrais problèmes, pas des problèmes fabriqués. Si le code est réellement bon après les corrections, dites-le.
- Lisez CHAQUE fichier de la Liste des Fichiers - vérifiez l'implémentation par rapport aux exigences de la story.
- Tâches marquées terminées mais non faites = constat CRITIQUE.
- Critères d'acceptation non implémentés = constat de sévérité HAUTE.
- Ne pas réviser les fichiers qui ne font pas partie du code source de l'application. Exclure systématiquement les dossiers `_bmad/` et `_bmad-output/` de la revue. Exclure systématiquement les dossiers de configuration d'IDE et CLI comme `.cursor/`, `.windsurf/` et `.claude/`.

---

## INITIALISATION

### Chargement de la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `user_name`
- `communication_language`, `document_output_language`
- `user_skill_level`
- `planning_artifacts`, `implementation_artifacts`
- `date` comme date/heure actuelle générée par le système.

### Chemins (Paths)

- `sprint_status` = `{implementation_artifacts}/sprint-status.yaml`

### Fichiers d'Entrée (Input Files)

| Entrée       | Description                                    | Modèle de chemin (Path Pattern)                                                                                                                                    | Stratégie de chargement |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| architecture | Architecture système pour le contexte de revue | whole: `{planning_artifacts}/*architecture*.md`, sharded: `{planning_artifacts}/*architecture*/*.md`                                                               | FULL_LOAD               |
| ux_design    | Spécification de design UX (si revue d'UI)     | whole: `{planning_artifacts}/*ux*.md`, sharded: `{planning_artifacts}/*ux*/*.md`                                                                                   | FULL_LOAD               |
| epics        | Epic contenant la story à réviser              | whole: `{planning_artifacts}/*epic*.md`, sharded_index: `{planning_artifacts}/*epic*/index.md`, sharded_single: `{planning_artifacts}/*epic*/epic-{{epic_num}}.md` | SELECTIVE_LOAD          |

### Contexte

- `project_context` = `**/project-context.md` (charger si existe)

---

## EXÉCUTION

<workflow>

<step n="1" goal="Charger la story et découvrir les changements">
  <action>Utiliser le {{story_path}} fourni ou demander à l'utilisateur quel fichier de story réviser</action>
  <action>Lire le fichier de story COMPLET</action>
  <action>Définir {{story_key}} = clé extraite du nom de fichier (ex : "1-2-user-authentication.md" → "1-2-user-authentication") ou des métadonnées de la story</action>
  <action>Analyser les sections : Story, Critères d'Acceptation, Tâches/Sous-tâches, Registre de l'Agent de Dév → Liste des Fichiers, Journal des Changements</action>

  <!-- Discover actual changes via git -->

<action>Vérifier si un dépôt git est détecté dans le répertoire actuel</action>
<check if="un dépôt git existe">
<action>Exécuter `git status --porcelain` pour trouver les modifications non commitées</action>
<action>Exécuter `git diff --name-only` pour voir les fichiers modifiés</action>
<action>Exécuter `git diff --cached --name-only` pour voir les fichiers indexés (staged)</action>
<action>Compiler la liste des fichiers réellement modifiés à partir de la sortie git</action>
</check>

  <!-- Cross-reference story File List vs git reality -->

<action>Comparer la Liste des Fichiers du Registre de l'Agent de Dév de la story avec les modifications git réelles</action>
<action>Noter les écarts : - Fichiers dans git mais absents de la Liste des Fichiers de la story - Fichiers dans la Liste des Fichiers de la story mais sans modifications git - Absence de documentation sur ce qui a été réellement modifié
</action>

<action>Lire entièrement et suivre `./discover-inputs.md` pour charger tous les fichiers d'entrée</action>
<action>Charger {project_context} pour les standards de codage (si existe)</action>
</step>

<step n="2" goal="Construire le plan d'attaque de la revue">
  <action>Extraire TOUS les Critères d'Acceptation de la story</action>
  <action>Extraire TOUTES les Tâches/Sous-tâches avec leur statut d'achèvement ([x] vs [ ])</action>
  <action>À partir du Registre de l'Agent de Dév → Liste des Fichiers, compiler la liste des changements revendiqués</action>

<action>Créer un plan de revue : 1. **Validation des CA** : Vérifier que chaque CA est réellement implémenté 2. **Audit des Tâches** : Vérifier que chaque tâche [x] est vraiment faite 3. **Qualité du Code** : Sécurité, performance, maintenabilité 4. **Qualité des Tests** : Vrais tests vs faux-semblants
</action>
</step>

<step n="3" goal="Exécuter la revue contradictoire">
  <critical>VALIDEZ CHAQUE REVENDICATION - Vérifiez la réalité git vs les affirmations de la story</critical>

  <!-- Git vs Story Discrepancies -->

<action>Réviser les écarts git vs Liste des Fichiers de la story : 1. **Fichiers modifiés mais absents de la liste de la story** → Constat MOYEN (documentation incomplète) 2. **La story liste des fichiers mais aucune modif git** → Constat HAUT (fausses déclarations) 3. **Modifications non commitées non documentées** → Constat MOYEN (problème de transparence)
</action>

  <!-- Use combined file list: story File List + git discovered files -->

<action>Créer une liste exhaustive de fichiers à réviser à partir de la liste de la story et des modifications git</action>

  <!-- AC Validation -->

<action>Pour CHAQUE Critère d'Acceptation : 1. Lire l'exigence du CA 2. Rechercher des preuves dans les fichiers d'implémentation 3. Déterminer : IMPLÉMENTÉ, PARTIEL ou MANQUANT 4. Si MANQUANT/PARTIEL → Constat de sévérité HAUTE
</action>

  <!-- Task Completion Audit -->

<action>Pour CHAQUE tâche marquée [x] : 1. Lire la description de la tâche 2. Rechercher des preuves dans les fichiers qu'elle a réellement été faite 3. **CRITIQUE** : Si marqué [x] mais NON FAIT → Constat CRITIQUE 4. Enregistrer la preuve spécifique (fichier:ligne)
</action>

  <!-- Code Quality Deep Dive -->

<action>Pour CHAQUE fichier de la liste exhaustive de revue : 1. **Sécurité** : Rechercher les risques d'injection, validations manquantes, problèmes d'authentification 2. **Performance** : Requêtes N+1, boucles inefficaces, absence de mise en cache 3. **Gestion d'erreurs** : try/catch manquants, messages d'erreur pauvres 4. **Qualité du Code** : Fonctions complexes, nombres magiques, mauvais nommage 5. **Qualité des Tests** : Les tests sont-ils de vraies assertions ou des coquilles vides ?
</action>

  <check if="total_issues_found == 0">
    <action>Double-vérifier en réexaminant le code pour :
      - Cas aux limites et gestion des null
      - Violations d'architecture
      - Problèmes d'intégration
      - Problèmes de dépendance
    </action>
    <action>Si aucun problème n'est trouvé après réexamen approfondi, c'est un résultat valide — rapporter une revue propre</action>
  </check>
</step>

<step n="4" goal="Présenter les constats et les corriger">
  <action>Catégoriser les constats : HAUT (doit être corrigé), MOYEN (devrait être corrigé), BAS (agréable à corriger)</action>
  <action>Définir {{fixed_count}} = 0</action>
  <action>Définir {{action_count}} = 0</action>

<output>**🔥 CONSTATS DE REVUE DE CODE, {user_name} !**

    **Story :** {{story_file}}
    **Écarts Git vs Story :** {{git_discrepancy_count}} trouvés
    **Problèmes identifiés :** {{high_count}} Haut, {{medium_count}} Moyen, {{low_count}} Bas

    ## 🔴 PROBLÈMES CRITIQUES
    - Tâches marquées [x] mais non implémentées réellement
    - Critères d'Acceptation non implémentés
    - La story indique des fichiers modifiés mais pas de preuve git
    - Vulnérabilités de sécurité

    ## 🟡 PROBLÈMES MOYENS
    - Fichiers modifiés mais non documentés dans la Liste des Fichiers de la story
    - Changements non commités non suivis
    - Problèmes de performance
    - Couverture/qualité des tests médiocre
    - Problèmes de maintenabilité du code

    ## 🟢 PROBLÈMES BAS
    - Améliorations de style de code
    - Lacunes de documentation
    - Qualité des messages de commit git

  </output>

<ask>Que dois-je faire avec ces problèmes ?

    1. **Les corriger automatiquement** - Je mettrai à jour le code et les tests
    2. **Créer des actions à faire** - Ajouter aux Tâches/Sous-tâches de la story pour plus tard
    3. **Me montrer des détails** - Approfondir des problèmes spécifiques

    Choisissez [1], [2] ou spécifiez quel problème examiner :</ask>

  <check if="l'utilisateur choisit 1">
    <action>Corriger tous les problèmes HAUTS et MOYENS dans le code</action>
    <action>Ajouter/Mettre à jour les tests si nécessaire</action>
    <action>Mettre à jour la Liste des Fichiers dans la story si des fichiers ont changé</action>
    <action>Mettre à jour le Registre de l'Agent de Dév de la story avec les corrections apportées</action>
    <action>Définir {{fixed_count}} = nombre de problèmes HAUTS et MOYENS corrigés</action>
    <action>Définir {{action_count}} = 0</action>
  </check>

  <check if="l'utilisateur choisit 2">
    <action>Ajouter la sous-section "Suivis de Revue (AI)" aux Tâches/Sous-tâches</action>
    <action>Pour chaque problème : `- [ ] [AI-Review][Sévérité] Description [fichier:ligne]`</action>
    <action>Définir {{action_count}} = nombre d'actions créées</action>
    <action>Définir {{fixed_count}} = 0</action>
  </check>

  <check if="l'utilisateur choisit 3">
    <action>Afficher une explication détaillée avec des exemples de code</action>
    <action>Revenir à la décision de correction</action>
  </check>
</step>

<step n="5" goal="Mettre à jour le statut de la story et synchroniser le suivi de sprint">
  <!-- Determine new status based on review outcome -->
  <check if="tous les problèmes HAUTS et MOYENS sont corrigés ET tous les CA sont implémentés">
    <action>Définir {{new_status}} = "done"</action>
    <action>Mettre à jour le champ Status de la story à "done"</action>
  </check>
  <check if="des problèmes HAUTS ou MOYENS subsistent OU CA non entièrement implémentés">
    <action>Définir {{new_status}} = "in-progress"</action>
    <action>Mettre à jour le champ Status de la story à "in-progress"</action>
  </check>
  <action>Enregistrer le fichier de la story</action>

  <!-- Determine sprint tracking status -->
  <check if="le fichier {sprint_status} existe">
    <action>Définir {{current_sprint_status}} = "enabled"</action>
  </check>
  <check if="le fichier {sprint_status} n'existe PAS">
    <action>Définir {{current_sprint_status}} = "no-sprint-tracking"</action>
  </check>

  <!-- Sync sprint-status.yaml when story status changes (only if sprint tracking enabled) -->
  <check if="{{current_sprint_status}} != 'no-sprint-tracking'">
    <action>Charger le fichier COMPLET : {sprint_status}</action>
    <action>Trouver la clé development_status correspondant à {{story_key}}</action>

    <check if="{{new_status}} == 'done'">
      <action>Mettre à jour development_status[{{story_key}}] = "done"</action>
      <action>Mettre à jour le champ last_updated à la date actuelle</action>
      <action>Enregistrer le fichier, en préservant TOUS les commentaires et la structure</action>
      <output>✅ Statut du sprint synchronisé : {{story_key}} → done</output>
    </check>

    <check if="{{new_status}} == 'in-progress'">
      <action>Mettre à jour development_status[{{story_key}}] = "in-progress"</action>
      <action>Mettre à jour le champ last_updated à la date actuelle</action>
      <action>Enregistrer le fichier, en préservant TOUS les commentaires et la structure</action>
      <output>🔄 Statut du sprint synchronisé : {{story_key}} → in-progress</output>
    </check>

    <check if="story key not found in sprint status">
      <output>⚠️ Fichier de story mis à jour, mais la synchronisation du sprint-status a échoué : {{story_key}} non trouvé dans sprint-status.yaml</output>
    </check>

  </check>

  <check if="{{current_sprint_status}} == 'no-sprint-tracking'">
    <output>ℹ️ Statut de la story mis à jour (pas de suivi de sprint configuré)</output>
  </check>

<output>**✅ Revue terminée !**

    **Statut de la Story :** {{new_status}}
    **Problèmes corrigés :** {{fixed_count}}
    **Actions créées :** {{action_count}}

    {{#if new_status == "done"}}Revue de code terminée !{{else}}Traitez les actions à faire et continuez le développement.{{/if}}

  </output>
</step>

</workflow>
