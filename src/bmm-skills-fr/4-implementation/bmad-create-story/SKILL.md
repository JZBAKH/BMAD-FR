---
name: bmad-create-story
description: 'Crée un fichier de cas d''usage dédié avec tout le contexte dont l''agent aura besoin pour l''implémenter plus tard. À utiliser lorsque l''utilisateur dit "créer le prochain cas d''usage" ou "créer le cas d''usage [identifiant du cas d''usage]"'
---

# Workflow Définir le cas d'usage (Create Story)

**Objectif :** Créer un fichier de cas d'usage complet qui donne à l'agent dev tout ce qui est nécessaire pour une implémentation impeccable.

**Votre Rôle :** Moteur de contexte de cas d'usage qui prévient les erreurs, omissions ou désastres des développeurs LLM.
- Communiquez toutes les réponses en {communication_language} et générez tous les documents en {document_output_language}
- Votre objectif n'est PAS de copier depuis les thèmes (epics) - c'est de créer un fichier de cas d'usage complet et optimisé qui donne à l'agent DEV TOUT ce qui est nécessaire pour une implémentation impeccable
- ERREURS LLM COURANTES À PRÉVENIR : réinventer la roue, mauvaises bibliothèques, mauvais emplacements de fichiers, casser des régressions, ignorer l'UX, implémentations vagues, mentir sur la complétude, ne pas apprendre du travail passé
- ANALYSE EXHAUSTIVE REQUISE : Vous devez analyser en profondeur TOUS les artefacts pour extraire le contexte critique - ne soyez PAS paresseux ni superficiel ! C'est la fonction la plus importante de tout le processus de développement !
- UTILISER SOUS-PROCESSUS ET SOUS-AGENTS : Utilisez des sous-agents de recherche, des sous-processus ou un traitement parallèle si disponible pour analyser différents artefacts simultanément et en profondeur
- CONSERVER LES QUESTIONS : Si vous pensez à des questions ou clarifications pendant l'analyse, gardez-les pour la fin après que le cas d'usage complet soit écrit
- ZÉRO INTERVENTION UTILISATEUR : Le processus doit être entièrement automatisé sauf pour la sélection initiale du thème/cas d'usage ou les documents manquants

## Conventions

- Les chemins simples (par ex. `discover-inputs.md`) se résolvent depuis la racine du Skill.
- `{skill-root}` se résout vers le répertoire d'installation de ce Skill (où se trouve `customize.toml`).
- Les chemins préfixés `{project-root}` se résolvent depuis le répertoire de travail du projet.
- `{skill-name}` se résout vers le basename du répertoire du Skill.

## À l'activation

### Étape 1 : Résoudre le bloc Workflow

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**Si le script échoue**, résolvez le bloc `workflow` vous-même en lisant ces trois fichiers dans l'ordre base → équipe → utilisateur et en appliquant les mêmes règles de fusion structurelle que le résolveur :

1. `{skill-root}/customize.toml` — valeurs par défaut
2. `{project-root}/_bmad/custom/{skill-name}.toml` — surcharges d'équipe
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — surcharges personnelles

Tout fichier manquant est ignoré. Les scalaires écrasent, les tables sont fusionnées en profondeur, les tableaux de tables clés par `code` ou `id` remplacent les entrées correspondantes et ajoutent les nouvelles entrées, et tous les autres tableaux sont concaténés.

### Étape 2 : Exécuter les étapes de préfixe

Exécutez chaque entrée dans `{workflow.activation_steps_prepend}` dans l'ordre avant de continuer.

### Étape 3 : Charger les faits persistants

Traitez chaque entrée dans `{workflow.persistent_facts}` comme un contexte fondamental que vous portez pour le reste de l'exécution du workflow. Les entrées préfixées `file:` sont des chemins ou des globs sous `{project-root}` — chargez le contenu référencé comme faits. Toutes les autres entrées sont des faits littéraux.

### Étape 4 : Charger la config

Chargez la config depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `user_name`
- `communication_language`, `document_output_language`
- `user_skill_level`
- `planning_artifacts`, `implementation_artifacts`
- `date` comme datetime courant généré par le système

### Étape 5 : Saluer l'utilisateur

Saluez `{user_name}`, en parlant en `{communication_language}`.

### Étape 6 : Exécuter les étapes de suffixe

Exécutez chaque entrée dans `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencez le workflow ci-dessous.

## Chemins

- `sprint_status` = `{implementation_artifacts}/sprint-status.yaml`
- `epics_file` = `{planning_artifacts}/epics.md`
- `prd_file` = `{planning_artifacts}/prd.md`
- `architecture_file` = `{planning_artifacts}/architecture.md`
- `ux_file` = `{planning_artifacts}/*ux*.md`
- `story_title` = "" (sera demandé si non dérivable)
- `default_output_file` = `{implementation_artifacts}/{{story_key}}.md`

## Fichiers d'entrée

| Entrée | Description | Pattern(s) de chemin | Stratégie de chargement |
|-------|-------------|------------------|---------------|
| prd | PRD (de secours - le fichier des thèmes (epics) devrait avoir le plus de contenu) | entier : `{planning_artifacts}/*prd*.md`, fragmenté : `{planning_artifacts}/*prd*/*.md` | SELECTIVE_LOAD |
| architecture | Architecture (de secours - le fichier des thèmes (epics) devrait avoir les sections pertinentes) | entier : `{planning_artifacts}/*architecture*.md`, fragmenté : `{planning_artifacts}/*architecture*/*.md` | SELECTIVE_LOAD |
| ux | Conception UX (de secours - le fichier des thèmes (epics) devrait avoir les sections pertinentes) | entier : `{planning_artifacts}/*ux*.md`, fragmenté : `{planning_artifacts}/*ux*/*.md` | SELECTIVE_LOAD |
| epics | Fichier amélioré thèmes+cas d'usage avec BDD et indices source | entier : `{planning_artifacts}/*epic*.md`, fragmenté : `{planning_artifacts}/*epic*/*.md` | SELECTIVE_LOAD |

## Exécution

<workflow>

<step n="1" goal="Déterminer le cas d'usage cible">
  <check if="{{story_path}} est fourni par l'utilisateur ou que l'utilisateur a fourni le numéro du thème et du cas d'usage tel que 2-4 ou 1.6 ou epic 1 story 5">
    <action>Parser le chemin du cas d'usage fourni par l'utilisateur : extraire epic_num, story_num, story_title du format comme "1-2-user-auth"</action>
    <action>Définir {{epic_num}}, {{story_num}}, {{story_key}} à partir de l'entrée utilisateur</action>
    <action>ALLER À étape 2a</action>
  </check>

  <action>Vérifier si le fichier {{sprint_status}} existe pour la découverte automatique</action>
  <check if="le fichier de statut sprint n'existe PAS">
    <output>🚫 Aucun fichier de statut sprint trouvé et aucun cas d'usage spécifié</output>
    <output>
      **Options requises :**
      1. Exécutez `sprint-planning` pour initialiser le suivi du sprint (recommandé)
      2. Fournissez un numéro epic-story spécifique à créer (par ex. "1-2-user-auth")
      3. Fournissez le chemin vers les documents du cas d'usage si le statut sprint n'existe pas encore
    </output>
    <ask>Choisissez l'option [1], fournissez un numéro epic-story, le chemin vers les docs du cas d'usage, ou [q] pour quitter :</ask>

    <check if="l'utilisateur choisit 'q'">
      <action>ARRÊT - Aucun travail nécessaire</action>
    </check>

    <check if="l'utilisateur choisit '1'">
      <output>Exécutez d'abord le workflow sprint-planning pour créer sprint-status.yaml</output>
      <action>ARRÊT - L'utilisateur doit exécuter sprint-planning</action>
    </check>

    <check if="l'utilisateur fournit un numéro epic-story">
      <action>Parser l'entrée utilisateur : extraire epic_num, story_num, story_title</action>
      <action>Définir {{epic_num}}, {{story_num}}, {{story_key}} à partir de l'entrée utilisateur</action>
      <action>ALLER À étape 2a</action>
    </check>

    <check if="l'utilisateur fournit le chemin des docs du cas d'usage">
      <action>Utiliser le chemin fourni par l'utilisateur pour les documents du cas d'usage</action>
      <action>ALLER À étape 2a</action>
    </check>
  </check>

  <!-- Découverte automatique depuis le statut sprint uniquement si pas d'entrée utilisateur -->
  <check if="aucune entrée utilisateur fournie">
    <critical>DOIT lire le fichier {sprint_status} COMPLET du début à la fin pour préserver l'ordre</critical>
    <action>Charger le fichier ENTIER : {{sprint_status}}</action>
    <action>Lire TOUTES les lignes du début à la fin - ne sauter aucun contenu</action>
    <action>Parser complètement la section development_status</action>

    <action>Trouver le PREMIER cas d'usage (en lisant dans l'ordre du haut vers le bas) où :
      - La clé correspond au pattern : numéro-numéro-nom (par ex. "1-2-user-auth")
      - PAS une clé de thème (epic-X) ni rétrospective (epic-X-retrospective)
      - La valeur du statut est égale à "backlog"
    </action>

    <check if="aucun cas d'usage backlog trouvé">
      <output>📋 Aucun cas d'usage backlog trouvé dans sprint-status.yaml

        Tous les cas d'usage sont soit déjà créés, en cours, ou terminés.

        **Options :**
        1. Exécutez sprint-planning pour rafraîchir le suivi des cas d'usage
        2. Chargez l'agent PM et exécutez correct-course pour ajouter plus de cas d'usage
        3. Vérifiez si le sprint actuel est complet et exécutez la rétrospective
      </output>
      <action>ARRÊT</action>
    </check>

    <action>Extraire de la clé du cas d'usage trouvé (par ex. "1-2-user-authentication") :
      - epic_num : premier numéro avant le tiret (par ex. "1")
      - story_num : deuxième numéro après le premier tiret (par ex. "2")
      - story_title : reste après le deuxième tiret (par ex. "user-authentication")
    </action>
    <action>Définir {{story_id}} = "{{epic_num}}.{{story_num}}"</action>
    <action>Stocker story_key pour utilisation ultérieure (par ex. "1-2-user-authentication")</action>

    <!-- Marquer le thème comme en cours s'il s'agit du premier cas d'usage -->
    <action>Vérifier si c'est le premier cas d'usage du thème {{epic_num}} en cherchant le pattern {{epic_num}}-1-*</action>
    <check if="c'est le premier cas d'usage du thème {{epic_num}}">
      <action>Charger {{sprint_status}} et vérifier le statut epic-{{epic_num}}</action>
      <action>Si le statut du thème est "backlog" → mettre à jour vers "in-progress"</action>
      <action>Si le statut du thème est "contexted" (statut hérité) → mettre à jour vers "in-progress" (rétrocompatibilité)</action>
      <action>Si le statut du thème est "in-progress" → aucun changement nécessaire</action>
      <check if="le statut du thème est 'done'">
        <output>🚫 ERREUR : Impossible de créer un cas d'usage dans un thème complété</output>
        <output>Le thème {{epic_num}} est marqué comme 'done'. Tous les cas d'usage sont complets.</output>
        <output>Si vous devez ajouter plus de travail, soit :</output>
        <output>1. Changez manuellement le statut du thème vers 'in-progress' dans sprint-status.yaml</output>
        <output>2. Créez un nouveau thème pour du travail supplémentaire</output>
        <action>ARRÊT - Impossible de continuer</action>
      </check>
      <check if="le statut du thème n'est aucun de : backlog, contexted, in-progress, done">
        <output>🚫 ERREUR : Statut de thème invalide '{{epic_status}}'</output>
        <output>Le thème {{epic_num}} a un statut invalide. Attendu : backlog, in-progress, ou done</output>
        <output>Veuillez corriger sprint-status.yaml manuellement ou exécuter sprint-planning pour le régénérer</output>
        <action>ARRÊT - Impossible de continuer</action>
      </check>
      <output>📊 Statut du thème {{epic_num}} mis à jour vers in-progress</output>
    </check>

    <action>ALLER À étape 2a</action>
  </check>
  <action>Charger le fichier ENTIER : {{sprint_status}}</action>
  <action>Lire TOUTES les lignes du début à la fin - ne sauter aucun contenu</action>
  <action>Parser complètement la section development_status</action>

  <action>Trouver le PREMIER cas d'usage (en lisant dans l'ordre du haut vers le bas) où :
    - La clé correspond au pattern : numéro-numéro-nom (par ex. "1-2-user-auth")
    - PAS une clé de thème (epic-X) ni rétrospective (epic-X-retrospective)
    - La valeur du statut est égale à "backlog"
  </action>

  <check if="aucun cas d'usage backlog trouvé">
    <output>Aucun cas d'usage backlog trouvé dans sprint-status.yaml

      Tous les cas d'usage sont soit déjà créés, en cours, ou terminés.

      **Options :**
      1. Exécutez sprint-planning pour rafraîchir le suivi des cas d'usage
      2. Chargez l'agent PM et exécutez correct-course pour ajouter plus de cas d'usage
      3. Vérifiez si le sprint actuel est complet et exécutez la rétrospective
    </output>
    <action>ARRÊT</action>
  </check>

  <action>Extraire de la clé du cas d'usage trouvé (par ex. "1-2-user-authentication") :
    - epic_num : premier numéro avant le tiret (par ex. "1")
    - story_num : deuxième numéro après le premier tiret (par ex. "2")
    - story_title : reste après le deuxième tiret (par ex. "user-authentication")
  </action>
  <action>Définir {{story_id}} = "{{epic_num}}.{{story_num}}"</action>
  <action>Stocker story_key pour utilisation ultérieure (par ex. "1-2-user-authentication")</action>

  <!-- Marquer le thème comme en cours s'il s'agit du premier cas d'usage -->
  <action>Vérifier si c'est le premier cas d'usage du thème {{epic_num}} en cherchant le pattern {{epic_num}}-1-*</action>
  <check if="c'est le premier cas d'usage du thème {{epic_num}}">
    <action>Charger {{sprint_status}} et vérifier le statut epic-{{epic_num}}</action>
    <action>Si le statut du thème est "backlog" → mettre à jour vers "in-progress"</action>
    <action>Si le statut du thème est "contexted" (statut hérité) → mettre à jour vers "in-progress" (rétrocompatibilité)</action>
    <action>Si le statut du thème est "in-progress" → aucun changement nécessaire</action>
    <check if="le statut du thème est 'done'">
      <output>ERREUR : Impossible de créer un cas d'usage dans un thème complété</output>
      <output>Le thème {{epic_num}} est marqué comme 'done'. Tous les cas d'usage sont complets.</output>
      <output>Si vous devez ajouter plus de travail, soit :</output>
      <output>1. Changez manuellement le statut du thème vers 'in-progress' dans sprint-status.yaml</output>
      <output>2. Créez un nouveau thème pour du travail supplémentaire</output>
      <action>ARRÊT - Impossible de continuer</action>
    </check>
    <check if="le statut du thème n'est aucun de : backlog, contexted, in-progress, done">
      <output>ERREUR : Statut de thème invalide '{{epic_status}}'</output>
      <output>Le thème {{epic_num}} a un statut invalide. Attendu : backlog, in-progress, ou done</output>
      <output>Veuillez corriger sprint-status.yaml manuellement ou exécuter sprint-planning pour le régénérer</output>
      <action>ARRÊT - Impossible de continuer</action>
    </check>
    <output>Statut du thème {{epic_num}} mis à jour vers in-progress</output>
  </check>

  <action>ALLER À étape 2a</action>
</step>

<step n="2" goal="Charger et analyser les artefacts principaux">
  <critical>🔬 ANALYSE EXHAUSTIVE DES ARTEFACTS - C'est ici que vous prévenez les futures erreurs des développeurs !</critical>

  <!-- Charger tout le contenu disponible via le protocole de découverte -->
  <action>Lire intégralement et suivre `./discover-inputs.md` pour charger tous les fichiers d'entrée</action>
  <note>Contenu disponible : {epics_content}, {prd_content}, {architecture_content}, {ux_content}, plus les faits de contexte projet chargés pendant l'activation via `persistent_facts`.</note>

  <!-- Analyser le fichier des thèmes pour les fondations du cas d'usage -->
  <action>Depuis {epics_content}, extraire le contexte complet du Thème {{epic_num}} :</action> **ANALYSE DU THÈME :** - Objectifs
  du thème et valeur métier - TOUS les cas d'usage de ce thème pour le contexte inter-cas d'usage - Exigences spécifiques de notre cas d'usage, énoncé du cas d'usage,
  critères d'acceptation - Exigences techniques et contraintes - Dépendances sur d'autres cas d'usage/thèmes - Indices source pointant vers
  les documents originaux <!-- Extraire les exigences spécifiques du cas d'usage -->
  <action>Extraire les détails de notre cas d'usage ({{epic_num}}-{{story_num}}) :</action> **FONDATION DU CAS D'USAGE :** - Énoncé du cas d'usage
  (En tant que, je veux, afin que) - Critères d'acceptation détaillés (déjà au format BDD) - Exigences techniques spécifiques à ce cas d'usage -
  Contexte métier et valeur - Critères de succès <!-- Analyse du cas d'usage précédent pour la continuité du contexte -->
  <check if="story_num > 1">
    <action>Trouver {{previous_story_num}} : scanner {implementation_artifacts} pour le fichier de cas d'usage du thème {{epic_num}} avec le numéro de cas d'usage le plus élevé inférieur à {{story_num}}</action>
    <action>Charger le fichier du cas d'usage précédent : {implementation_artifacts}/{{epic_num}}-{{previous_story_num}}-*.md</action> **INTELLIGENCE DU CAS D'USAGE PRÉCÉDENT :** -
  Notes dev et apprentissages du cas d'usage précédent - Retours de revue et corrections nécessaires - Fichiers créés/modifiés et leurs
  patterns - Approches de tests qui ont fonctionné/n'ont pas fonctionné - Problèmes rencontrés et solutions trouvées - Patterns de code établis <action>Extraire
  tous les apprentissages qui pourraient impacter l'implémentation du cas d'usage actuel</action>
  </check>

  <!-- Intelligence Git pour les patterns de travail précédents -->
  <check
    if="le cas d'usage précédent existe ET un dépôt git est détecté">
    <action>Obtenir les 5 derniers titres de commit pour comprendre les patterns de travail récents</action>
    <action>Analyser 1-5 commits les plus récents pour leur pertinence vis-à-vis du cas d'usage actuel :
      - Fichiers créés/modifiés
      - Patterns de code et conventions utilisés
      - Dépendances de bibliothèques ajoutées/modifiées
      - Décisions d'architecture implémentées
      - Approches de tests utilisées
    </action>
    <action>Extraire des informations actionnables pour l'implémentation du cas d'usage actuel</action>
  </check>
</step>

<step n="3" goal="Analyse architecturale pour les garde-fous des développeurs">
  <critical>🏗️ INTELLIGENCE ARCHITECTURALE - Extraire tout ce que le développeur DOIT suivre !</critical> **ANALYSE DU DOCUMENT D'ARCHITECTURE :** <action>Analyser
  systématiquement le contenu d'architecture pour les exigences pertinentes au cas d'usage :</action>

  <!-- Charger l'architecture - fichier unique ou fragmenté -->
  <check if="le fichier d'architecture est un fichier unique">
    <action>Charger {architecture_content} complet</action>
  </check>
  <check if="l'architecture est fragmentée dans un dossier">
    <action>Charger l'index d'architecture et scanner tous les fichiers d'architecture</action>
  </check> **EXTRACTION D'ARCHITECTURE CRITIQUE :** <action>Pour
  chaque section d'architecture, déterminer si elle est pertinente pour ce cas d'usage :</action> - **Stack Technique :** Langages, frameworks, bibliothèques avec
  versions - **Structure du Code :** Organisation des dossiers, conventions de nommage, patterns de fichiers - **Patterns d'API :** Structure des services, patterns
  d'endpoints, contrats de données - **Schémas de Base de Données :** Tables, relations, contraintes pertinentes pour le cas d'usage - **Exigences de Sécurité :**
  Patterns d'authentification, règles d'autorisation - **Exigences de Performance :** Stratégies de cache, patterns d'optimisation - **Standards
  de Tests :** Frameworks de tests, attentes de couverture, patterns de tests - **Patterns de Déploiement :** Configurations d'environnement, processus
  de build - **Patterns d'Intégration :** Intégrations de services externes, flux de données <action>Extraire toutes les exigences spécifiques au cas d'usage que le
  développeur DOIT suivre</action>
  <action>Identifier toutes les décisions architecturales qui surpassent les patterns précédents</action>

  <!-- Lire le code existant en cours de modification — non-négociable -->
  <critical>📂 LIRE LES FICHIERS EN COURS DE MODIFICATION — sauter cela est la principale cause des échecs d'implémentation et des cycles de revue</critical>
  <action>Depuis la structure du répertoire d'architecture, identifier chaque fichier marqué UPDATE (pas NEW) que ce cas d'usage va toucher</action>
  <action>Lire chaque fichier UPDATE pertinent dans son intégralité. Pour chacun, documenter dans les notes dev :
    - État actuel : ce qu'il fait aujourd'hui (machine d'état, appels API, formes de données, comportements existants)
    - Ce que ce cas d'usage change : les sections ou comportements spécifiques en cours de modification
    - Ce qui doit être préservé : interactions et comportements existants que le cas d'usage ne doit pas casser
  </action>
  <critical>L'implémentation d'un cas d'usage doit laisser le système fonctionnant de bout en bout — pas seulement satisfaire ses CA déclarés.
  Si un comportement est requis pour que la fonctionnalité fonctionne correctement dans le système existant, c'est une exigence
  qu'elle soit ou non explicitement écrite dans le cas d'usage. L'agent dev en est responsable.</critical>
</step>

<step n="4" goal="Recherche web pour les spécificités techniques les plus récentes">
  <critical>🌐 ASSURER LA CONNAISSANCE TECH LA PLUS RÉCENTE - Prévenir les implémentations obsolètes !</critical> **INTELLIGENCE WEB :** <action>Identifier les zones
  techniques spécifiques qui nécessitent une connaissance des dernières versions :</action>

  <!-- Vérifier les bibliothèques/frameworks mentionnés dans l'architecture -->
  <action>Depuis l'analyse de l'architecture, identifier les bibliothèques, APIs ou
  frameworks spécifiques</action>
  <action>Pour chaque technologie critique, rechercher la dernière version stable et les changements clés :
    - Documentation API la plus récente et changements cassants
    - Vulnérabilités de sécurité ou mises à jour
    - Améliorations de performance ou dépréciations
    - Bonnes pratiques pour la version actuelle
  </action>
  **INCLUSION DE CONTEXTE EXTERNE :** <action>Inclure dans le cas d'usage toute information critique récente dont le développeur a besoin :
    - Versions de bibliothèques spécifiques et pourquoi elles ont été choisies
    - Endpoints API avec paramètres et authentification
    - Patches de sécurité récents ou considérations
    - Techniques d'optimisation de performance
    - Considérations de migration en cas de mise à niveau
  </action>
</step>

<step n="5" goal="Créer un fichier de cas d'usage complet">
  <critical>📝 CRÉER LE FICHIER DE CAS D'USAGE ULTIME - Le guide d'implémentation maître du développeur !</critical>

  <action>Initialiser depuis template.md :
  {default_output_file}</action>
  <template-output file="{default_output_file}">story_header</template-output>

  <!-- Fondation du cas d'usage à partir de l'analyse des thèmes -->
  <template-output
    file="{default_output_file}">story_requirements</template-output>

  <!-- Section contexte développeur - PARTIE LA PLUS IMPORTANTE -->
  <template-output file="{default_output_file}">
  developer_context_section</template-output> **GARDE-FOUS DE L'AGENT DEV :** <template-output file="{default_output_file}">
  technical_requirements</template-output>
  <template-output file="{default_output_file}">architecture_compliance</template-output>
  <template-output
    file="{default_output_file}">library_framework_requirements</template-output>
  <template-output file="{default_output_file}">
  file_structure_requirements</template-output>
  <template-output file="{default_output_file}">testing_requirements</template-output>

  <!-- Intelligence du cas d'usage précédent -->
  <check
    if="apprentissages du cas d'usage précédent disponibles">
    <template-output file="{default_output_file}">previous_story_intelligence</template-output>
  </check>

  <!-- Intelligence Git -->
  <check
    if="analyse git complétée">
    <template-output file="{default_output_file}">git_intelligence_summary</template-output>
  </check>

  <!-- Spécificités techniques les plus récentes -->
  <check if="recherche web complétée">
    <template-output file="{default_output_file}">latest_tech_information</template-output>
  </check>

  <!-- Référence du contexte projet -->
  <template-output
    file="{default_output_file}">project_context_reference</template-output>

  <!-- Mise à jour finale du statut -->
  <template-output file="{default_output_file}">
  story_completion_status</template-output>

  <!-- CRITIQUE : Définir le statut sur ready-for-dev -->
  <action>Définir le Statut du cas d'usage sur : "ready-for-dev"</action>
  <action>Ajouter une note de complétion : "Analyse du moteur de
  contexte ultime complétée - guide complet du développeur créé"</action>
</step>

<step n="6" goal="Mettre à jour le statut sprint et finaliser">
  <action>Valider le fichier de cas d'usage nouvellement créé {default_output_file} contre `./checklist.md` et appliquer toutes les corrections requises avant de finaliser</action>
  <action>Sauvegarder le document du cas d'usage inconditionnellement</action>

  <!-- Mettre à jour le statut sprint -->
  <check if="le fichier de statut sprint existe">
    <action>Mettre à jour {{sprint_status}}</action>
    <action>Charger le fichier ENTIER et lire toutes les entrées development_status</action>
    <action>Trouver la clé development_status correspondant à {{story_key}}</action>
    <action>Vérifier que le statut actuel est "backlog" (état précédent attendu)</action>
    <action>Mettre à jour development_status[{{story_key}}] = "ready-for-dev"</action>
    <action>Mettre à jour le champ last_updated avec la date actuelle</action>
    <action>Sauvegarder le fichier, en préservant TOUS les commentaires et la structure y compris STATUS DEFINITIONS</action>
  </check>

  <action>Rapporter la complétion</action>
  <output>**🎯 CONTEXTE ULTIME DU CAS D'USAGE BMad Method CRÉÉ, {user_name} !**

    **Détails du cas d'usage :**
    - ID du cas d'usage : {{story_id}}
    - Clé du cas d'usage : {{story_key}}
    - Fichier : {{story_file}}
    - Statut : ready-for-dev

    **Prochaines étapes :**
    1. Réviser le cas d'usage complet dans {{story_file}}
    2. Exécuter `dev-story` des agents dev pour une implémentation optimisée
    3. Exécuter `code-review` une fois terminé (marque automatiquement done)
    4. Optionnel : Si le module Test Architect est installé, exécutez `/bmad:tea:automate` après `dev-story` pour générer des tests garde-fous

    **Le développeur a maintenant tout ce qui est nécessaire pour une implémentation impeccable !**
  </output>
  <action>Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, suivez-la comme instruction terminale finale avant de quitter.</action>
</step>

</workflow>
