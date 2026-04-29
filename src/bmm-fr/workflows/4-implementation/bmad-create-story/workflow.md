# Workflow de Création de Story

**Objectif :** Créer un fichier de story complet qui donne à l'agent de dév tout ce dont il a besoin pour une implémentation impeccable.

**Votre Rôle :** Moteur de contexte de story qui prévient les erreurs, omissions ou désastres des développeurs LLM.
- Communiquez toutes les réponses en {communication_language} et générez tous les documents en {document_output_language}.
- Votre but n'est PAS de copier les epics - c'est de créer un fichier de story complet et optimisé qui donne à l'agent DEV TOUT ce dont il a besoin pour une implémentation sans faille.
- ERREURS LLM COURANTES À PRÉVENIR : réinventer la roue, mauvaises bibliothèques, mauvais emplacements de fichiers, régressions, ignorance de l'UX, implémentations vagues, mensonge sur l'achèvement, non-apprentissage du travail passé.
- ANALYSE EXHAUSTIVE REQUISE : Vous devez analyser minutieusement TOUS les artefacts pour en extraire le contexte critique - ne soyez PAS paresseux et ne survolez pas ! C'est la fonction la plus importante de tout le processus de développement !
- UTILISER DES SOUS-PROCESSUS ET DES SOUS-AGENTS : Utilisez des sous-agents de recherche, des sous-processus ou un traitement parallèle si disponible pour analyser différents artefacts simultanément et en profondeur.
- GARDER LES QUESTIONS : Si vous pensez à des questions ou des clarifications pendant l'analyse, gardez-les pour la fin une fois la story complète écrite.
- ZÉRO INTERVENTION UTILISATEUR : Le processus doit être entièrement automatisé, sauf pour la sélection initiale de l'epic/story ou les documents manquants.

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
- `epics_file` = `{planning_artifacts}/epics.md`
- `prd_file` = `{planning_artifacts}/prd.md`
- `architecture_file` = `{planning_artifacts}/architecture.md`
- `ux_file` = `{planning_artifacts}/*ux*.md`
- `story_title` = "" (sera élicité si non dérivable)
- `project_context` = `**/project-context.md` (charger si existe)
- `default_output_file` = `{implementation_artifacts}/{{story_key}}.md`

### Fichiers d'Entrée

| Entrée | Description | Modèle(s) de Chemin | Stratégie de Chargement |
|-------|-------------|------------------|---------------|
| prd | PRD (repli - le fichier d'epics devrait avoir la majeure partie du contenu) | entier: `{planning_artifacts}/*prd*.md`, partitionné: `{planning_artifacts}/*prd*/*.md` | SELECTIVE_LOAD |
| architecture | Architecture (repli - le fichier d'epics devrait avoir les sections pertinentes) | entier: `{planning_artifacts}/*architecture*.md`, partitionné: `{planning_artifacts}/*architecture*/*.md` | SELECTIVE_LOAD |
| ux | Design UX (repli - le fichier d'epics devrait avoir les sections pertinentes) | entier: `{planning_artifacts}/*ux*.md`, partitionné: `{planning_artifacts}/*ux*/*.md` | SELECTIVE_LOAD |
| epics | Fichier epics+stories enrichi avec BDD et indices sources | entier: `{planning_artifacts}/*epic*.md`, partitionné: `{planning_artifacts}/*epic*/*.md` | SELECTIVE_LOAD |

---

## EXÉCUTION

<workflow>

<step n="1" goal="Déterminer la story cible">
  <check if="{{story_path}} est fourni par l'utilisateur ou si l'utilisateur a fourni le numéro d'epic et de story tel que 2-4 ou 1.6 ou epic 1 story 5">
    <action>Analyser le chemin de story fourni par l'utilisateur : extraire epic_num, story_num, story_title du format comme "1-2-user-auth"</action>
    <action>Définir {{epic_num}}, {{story_num}}, {{story_key}} à partir de l'entrée utilisateur</action>
    <action>ALLER À l'étape 2a</action>
  </check>

  <action>Vérifier si le fichier {{sprint_status}} existe pour l'auto-découverte</action>
  <check if="le fichier de statut de sprint n'existe PAS">
    <output>🚫 Aucun fichier de statut de sprint trouvé et aucune story spécifiée</output>
    <output>
      **Options Requises :**
      1. Exécuter `sprint-planning` pour initialiser le suivi du sprint (recommandé)
      2. Fournir un numéro epic-story spécifique à créer (ex : "1-2-user-auth")
      3. Fournir le chemin vers les documents de la story si le statut de sprint n'existe pas encore
    </output>
    <ask>Choisissez l'option [1], fournissez le numéro epic-story, le chemin vers les docs de story, ou [q] pour quitter :</ask>

    <check if="l'utilisateur choisit 'q'">
      <action>ARRÊT - Aucun travail requis</action>
    </check>

    <check if="l'utilisateur choisit '1'">
      <output>Exécutez d'abord le workflow sprint-planning pour créer sprint-status.yaml</output>
      <action>ARRÊT - L'utilisateur doit exécuter sprint-planning</action>
    </check>

    <check if="l'utilisateur fournit un numéro epic-story">
      <action>Analyser l'entrée utilisateur : extraire epic_num, story_num, story_title</action>
      <action>Définir {{epic_num}}, {{story_num}}, {{story_key}} à partir de l'entrée utilisateur</action>
      <action>ALLER À l'étape 2a</action>
    </check>

    <check if="l'utilisateur fournit le chemin des docs de story">
      <action>Utiliser le chemin fourni par l'utilisateur pour les documents de story</action>
      <action>ALLER À l'étape 2a</action>
    </check>
  </check>

  <!-- Auto-découverte à partir du statut de sprint uniquement si aucune entrée utilisateur -->
  <check if="aucune entrée utilisateur fournie">
    <critical>DOIT lire le fichier {sprint_status} COMPLET du début à la fin pour préserver l'ordre</critical>
    <action>Charger le fichier COMPLET : {{sprint_status}}</action>
    <action>Lire TOUTES les lignes du début à la fin - ne sauter aucun contenu</action>
    <action>Analyser complètement la section development_status</action>

    <action>Trouver la PREMIÈRE story (en lisant dans l'ordre de haut en bas) où :
      - La clé correspond au modèle : nombre-nombre-nom (ex : "1-2-user-auth")
      - N'est PAS une clé d'epic (epic-X) ou une rétrospective (epic-X-retrospective)
      - La valeur du statut est égale à "backlog"
    </action>

    <check if="aucune story de backlog trouvée">
      <output>📋 Aucune story en backlog trouvée dans sprint-status.yaml

        Toutes les stories sont soit déjà créées, en cours, ou terminées.

        **Options :**
        1. Exécuter sprint-planning pour rafraîchir le suivi des stories
        2. Charger l'agent PM et exécuter correct-course pour ajouter plus de stories
        3. Vérifier si le sprint actuel est terminé et exécuter retrospective
      </output>
      <action>ARRÊT</action>
    </check>

    <action>Extraire de la clé de story trouvée (ex : "1-2-user-authentication") :
      - epic_num : premier nombre avant le tiret (ex : "1")
      - story_num : deuxième nombre après le premier tiret (ex : "2")
      - story_title : le reste après le deuxième tiret (ex : "user-authentication")
    </action>
    <action>Définir {{story_id}} = "{{epic_num}}.{{story_num}}"</action>
    <action>Stocker story_key pour une utilisation ultérieure (ex : "1-2-user-authentication")</action>

    <!-- Marquer l'epic comme en-cours s'il s'agit de la première story -->
    <action>Vérifier s'il s'agit de la première story de l'epic {{epic_num}} en cherchant le modèle {{epic_num}}-1-*</action>
    <check if="c'est la première story de l'epic {{epic_num}}">
      <action>Charger {{sprint_status}} et vérifier le statut de epic-{{epic_num}}</action>
      <action>Si le statut de l'epic est "backlog" → mettre à jour en "in-progress"</action>
      <action>Si le statut de l'epic est "contexted" (statut hérité) → mettre à jour en "in-progress" (rétrocompatibilité)</action>
      <action>Si le statut de l'epic est "in-progress" → aucun changement requis</action>
      <check if="le statut de l'epic est 'done'">
        <output>🚫 ERREUR : Impossible de créer une story dans un epic terminé</output>
        <output>L'epic {{epic_num}} est marqué comme 'done'. Toutes les stories sont terminées.</output>
        <output>Si vous devez ajouter plus de travail, soit :</output>
        <output>1. Changez manuellement le statut de l'epic en 'in-progress' dans sprint-status.yaml</output>
        <output>2. Créez un nouvel epic pour le travail additionnel</output>
        <action>ARRÊT - Impossible de continuer</action>
      </check>
      <check if="le statut de l'epic n'est pas l'un des suivants : backlog, contexted, in-progress, done">
        <output>🚫 ERREUR : Statut d'epic invalide '{{epic_status}}'</output>
        <output>L'epic {{epic_num}} a un statut invalide. Attendu : backlog, in-progress, ou done</output>
        <output>Veuillez corriger sprint-status.yaml manuellement ou exécuter sprint-planning pour régénérer</output>
        <action>ARRÊT - Impossible de continuer</action>
      </check>
      <output>📊 Statut de l'epic {{epic_num}} mis à jour en in-progress</output>
    </check>

    <action>ALLER À l'étape 2a</action>
  </check>
  <action>Charger le fichier COMPLET : {{sprint_status}}</action>
  <action>Lire TOUTES les lignes du début à la fin - ne sauter aucun contenu</action>
  <action>Analyser complètement la section development_status</action>

  <action>Trouver la PREMIÈRE story (en lisant dans l'ordre de haut en bas) où :
    - La clé correspond au modèle : nombre-nombre-nom (ex : "1-2-user-auth")
    - N'est PAS une clé d'epic (epic-X) ou une rétrospective (epic-X-retrospective)
    - La valeur du statut est égale à "backlog"
  </action>

  <check if="aucune story de backlog trouvée">
    <output>Aucune story en backlog trouvée dans sprint-status.yaml

      Toutes les stories sont soit déjà créées, en cours, ou terminées.

      **Options :**
      1. Exécuter sprint-planning pour rafraîchir le suivi des stories
      2. Charger l'agent PM et exécuter correct-course pour ajouter plus de stories
      3. Vérifier si le sprint actuel est terminé et exécuter retrospective
    </output>
    <action>ARRÊT</action>
  </check>

  <action>Extraire de la clé de story trouvée (ex : "1-2-user-authentication") :
    - epic_num : premier nombre avant le tiret (ex : "1")
    - story_num : deuxième nombre après le premier tiret (ex : "2")
    - story_title : le reste après le deuxième tiret (ex : "user-authentication")
  </action>
  <action>Définir {{story_id}} = "{{epic_num}}.{{story_num}}"</action>
  <action>Stocker story_key pour une utilisation ultérieure (ex : "1-2-user-authentication")</action>

  <!-- Marquer l'epic comme en-cours s'il s'agit de la première story -->
  <action>Vérifier s'il s'agit de la première story de l'epic {{epic_num}} en cherchant le modèle {{epic_num}}-1-*</action>
  <check if="c'est la première story de l'epic {{epic_num}}">
    <action>Charger {{sprint_status}} et vérifier le statut de epic-{{epic_num}}</action>
    <action>Si le statut de l'epic est "backlog" → mettre à jour en "in-progress"</action>
    <action>Si le statut de l'epic est "contexted" (statut hérité) → mettre à jour en "in-progress" (rétrocompatibilité)</action>
    <action>Si le statut de l'epic est "in-progress" → aucun changement requis</action>
    <check if="le statut de l'epic est 'done'">
      <output>ERREUR : Impossible de créer une story dans un epic terminé</output>
      <output>L'epic {{epic_num}} est marqué comme 'done'. Toutes les stories sont terminées.</output>
      <output>Si vous devez ajouter plus de travail, soit :</output>
      <output>1. Changez manuellement le statut de l'epic en 'in-progress' dans sprint-status.yaml</output>
      <output>2. Créez un nouvel epic pour le travail additionnel</output>
      <action>ARRÊT - Impossible de continuer</action>
    </check>
    <check if="le statut de l'epic n'est pas l'un des suivants : backlog, contexted, in-progress, done">
      <output>ERREUR : Statut d'epic invalide '{{epic_status}}'</output>
      <output>L'epic {{epic_num}} a un statut invalide. Attendu : backlog, in-progress, ou done</output>
      <output>Veuillez corriger sprint-status.yaml manuellement ou exécuter sprint-planning pour régénérer</output>
      <action>ARRÊT - Impossible de continuer</action>
    </check>
    <output>Statut de l'epic {{epic_num}} mis à jour en in-progress</output>
  </check>

  <action>ALLER À l'étape 2a</action>
</step>

<step n="2" goal="Charger et analyser les artefacts de base">
  <critical>🔬 ANALYSE EXHAUSTIVE D'ARTEFACTS - C'est ici que vous prévenez les futures erreurs des développeurs !</critical>

  <!-- Load all available content through discovery protocol -->
  <action>Lire entièrement et suivre `./discover-inputs.md` pour charger tous les fichiers d'entrée</action>
  <note>Contenu disponible : {epics_content}, {prd_content}, {architecture_content}, {ux_content},
  {project_context}</note>

  <!-- Analyze epics file for story foundation -->
  <action>À partir de {epics_content}, extraire le contexte complet de l'Epic {{epic_num}} :</action> **ANALYSE D'EPIC :** - Objectifs de l'epic
  et valeur métier - TOUTES les stories de cet epic pour le contexte transverse - Les exigences de notre story spécifique, l'énoncé de la
  user story, les critères d'acceptation - Exigences techniques et contraintes - Dépendances sur d'autres stories/epics - Indices sources
  pointant vers les documents originaux <!-- Extract specific story requirements -->
  <action>Extraire les détails de notre story ({{epic_num}}-{{story_num}}) :</action> **FONDATION DE LA STORY :** - Énoncé de la user story
  (En tant que, je veux, afin de) - Critères d'acceptation détaillés (déjà formatés en BDD) - Exigences techniques spécifiques à cette story -
  Contexte métier et valeur - Critères de succès <!-- Previous story analysis for context continuity -->
  <check if="story_num > 1">
    <action>Trouver {{previous_story_num}} : scanner {implementation_artifacts} pour le fichier de story dans l'epic {{epic_num}} avec le numéro de story le plus élevé inférieur à {{story_num}}</action>
    <action>Charger le fichier de la story précédente : {implementation_artifacts}/{{epic_num}}-{{previous_story_num}}-*.md</action> **INTELLIGENCE DE LA STORY PRÉCÉDENTE :** -
  Notes de dév et apprentissages de la story précédente - Feedback de revue et corrections nécessaires - Fichiers créés/modifiés et leurs
  modèles - Approches de test qui ont fonctionné ou non - Problèmes rencontrés et solutions trouvées - Modèles de code établis <action>Extraire
  tous les apprentissages qui pourraient impacter l'implémentation de la story actuelle</action>
  </check>

  <!-- Git intelligence for previous work patterns -->
  <check
    if="la story précédente existe ET un dépôt git est détecté">
    <action>Obtenir les titres des 5 derniers commits pour comprendre les modèles de travail récents</action>
    <action>Analyser les 1 à 5 commits les plus récents pour leur pertinence par rapport à la story actuelle :
      - Fichiers créés/modifiés
      - Modèles de code et conventions utilisés
      - Dépendances de bibliothèques ajoutées/modifiées
      - Décisions d'architecture implémentées
      - Approches de test utilisées
    </action>
    <action>Extraire des insights exploitables pour l'implémentation de la story actuelle</action>
  </check>
</step>

<step n="3" goal="Analyse de l'architecture pour les garde-fous du développeur">
  <critical>🏗️ INTELLIGENCE D'ARCHITECTURE - Extraire tout ce que le développeur DOIT suivre !</critical> **ANALYSE DU DOCUMENT D'ARCHITECTURE :** <action>Analyser
  systématiquement le contenu de l'architecture pour les exigences pertinentes à la story :</action>

  <!-- Load architecture - single file or sharded -->
  <check if="le fichier d'architecture est un fichier unique">
    <action>Charger le contenu complet de {architecture_content}</action>
  </check>
  <check if="l'architecture est partitionnée en dossier">
    <action>Charger l'index de l'architecture et scanner tous les fichiers d'architecture</action>
  </check> **EXTRACTION CRITIQUE D'ARCHITECTURE :** <action>Pour
  chaque section d'architecture, déterminer si elle est pertinente pour cette story :</action> - **Pile Technique :** Langages, frameworks, bibliothèques avec
  leurs versions - **Structure du Code :** Organisation des dossiers, conventions de nommage, modèles de fichiers - **Modèles d'API :** Structure de service, modèles
  d'endpoints, contrats de données - **Schémas de Base de Données :** Tables, relations, contraintes pertinentes pour la story - **Exigences de Sécurité :**
  Modèles d'authentification, règles d'autorisation - **Exigences de Performance :** Stratégies de mise en cache, modèles d'optimisation - **Normes de
  Test :** Frameworks de test, attentes de couverture, modèles de tests - **Modèles de Déploiement :** Configurations d'environnement, processus de
  build - **Modèles d'Intégration :** Intégrations de services externes, flux de données <action>Extraire toute exigence spécifique à la story que le
  développeur DOIT suivre</action>
  <action>Identifier toute décision architecturale qui outrepasse les modèles précédents</action>
</step>

<step n="4" goal="Recherche web pour les spécificités techniques les plus récentes">
  <critical>🌐 GARANTIR DES CONNAISSANCES TECHNIQUES À JOUR - Prévenir les implémentations obsolètes !</critical> **INTELLIGENCE WEB :** <action>Identifier les domaines
  techniques spécifiques qui nécessitent une connaissance de la version la plus récente :</action>

  <!-- Check for libraries/frameworks mentioned in architecture -->
  <action>À partir de l'analyse de l'architecture, identifier les bibliothèques, API ou
  frameworks spécifiques</action>
  <action>Pour chaque technologie critique, rechercher la dernière version stable et les changements clés :
    - Documentation de la dernière API et changements de rupture (breaking changes)
    - Vulnérabilités de sécurité ou mises à jour
    - Améliorations de performance ou dépréciations
    - Meilleures pratiques pour les versions actuelles
  </action>
  **INCLUSION DU CONTEXTE EXTERNE :** <action>Inclure dans la story toute information critique à jour dont le développeur a besoin :
    - Versions spécifiques des bibliothèques et pourquoi elles ont été choisies
    - Endpoints d'API avec paramètres et authentification
    - Correctifs de sécurité récents ou considérations
    - Techniques d'optimisation de la performance
    - Considérations de migration en cas de mise à jour
  </action>
</step>

<step n="5" goal="Créer un fichier de story complet">
  <critical>📝 CRÉER LE FICHIER DE STORY ULTIME - Le guide d'implémentation maître du développeur !</critical>

  <action>Initialiser à partir de template.md :
  {default_output_file}</action>
  <template-output file="{default_output_file}">story_header</template-output>

  <!-- Story foundation from epics analysis -->
  <template-output
    file="{default_output_file}">story_requirements</template-output>

  <!-- Developer context section - MOST IMPORTANT PART -->
  <template-output file="{default_output_file}">
  developer_context_section</template-output> **GARDE-FOUS DE L'AGENT DEV :** <template-output file="{default_output_file}">
  technical_requirements</template-output>
  <template-output file="{default_output_file}">architecture_compliance</template-output>
  <template-output
    file="{default_output_file}">library_framework_requirements</template-output>
  <template-output file="{default_output_file}">
  file_structure_requirements</template-output>
  <template-output file="{default_output_file}">testing_requirements</template-output>

  <!-- Previous story intelligence -->
  <check
    if="des apprentissages de stories précédentes sont disponibles">
    <template-output file="{default_output_file}">previous_story_intelligence</template-output>
  </check>

  <!-- Git intelligence -->
  <check
    if="l'analyse git est terminée">
    <template-output file="{default_output_file}">git_intelligence_summary</template-output>
  </check>

  <!-- Latest technical specifics -->
  <check if="la recherche web est terminée">
    <template-output file="{default_output_file}">latest_tech_information</template-output>
  </check>

  <!-- Project context reference -->
  <template-output
    file="{default_output_file}">project_context_reference</template-output>

  <!-- Final status update -->
  <template-output file="{default_output_file}">
  story_completion_status</template-output>

  <!-- CRITICAL: Set status to ready-for-dev -->
  <action>Définir le statut de la story sur : "ready-for-dev"</action>
  <action>Ajouter une note d'achèvement : "Analyse du moteur de contexte ultime terminée - guide complet du développeur créé"</action>
</step>

<step n="6" goal="Mettre à jour le statut du sprint et finaliser">
  <action>Valider le fichier de story nouvellement créé {story_file} par rapport à `./checklist.md` et appliquer toutes les corrections requises avant de finaliser</action>
  <action>Enregistrer inconditionnellement le document de story</action>

  <!-- Update sprint status -->
  <check if="le fichier de statut de sprint existe">
    <action>Mettre à jour {{sprint_status}}</action>
    <action>Charger le fichier COMPLET et lire toutes les entrées de development_status</action>
    <action>Trouver la clé development_status correspondant à {{story_key}}</action>
    <action>Vérifier que le statut actuel est "backlog" (état précédent attendu)</action>
    <action>Mettre à jour development_status[{{story_key}}] = "ready-for-dev"</action>
    <action>Mettre à jour le champ last_updated avec la date actuelle</action>
    <action>Enregistrer le fichier, en préservant TOUS les commentaires et la structure, y compris les STATUS DEFINITIONS</action>
  </check>

  <action>Rapporter l'achèvement</action>
  <output>**🎯 CONTEXTE DE STORY MÉTHODE BMad ULTIME CRÉÉ, {user_name} !**

    **Détails de la Story :**
    - ID de Story : {{story_id}}
    - Clé de Story : {{story_key}}
    - Fichier : {{story_file}}
    - Statut : ready-for-dev

    **Prochaines Étapes :**
    1. Relisez la story complète dans {{story_file}}
    2. Exécutez l'agent de dév `dev-story` pour une implémentation optimisée
    3. Exécutez `code-review` une fois terminé (marque automatiquement comme fait)
    4. Optionnel : Si le module Test Architect est installé, exécutez `/bmad:tea:automate` après `dev-story` pour générer des tests garde-fous

    **Le développeur a maintenant tout le nécessaire pour une implémentation impeccable !**
  </output>
</step>

</workflow>
