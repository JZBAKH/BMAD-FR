---
name: bmad-dev-story
description: 'Exécute l''implémentation du cas d''usage en suivant un fichier de spécification de cas d''usage rempli de contexte. À utiliser lorsque l''utilisateur dit "dev ce cas d''usage [fichier de cas d''usage]" ou "implémenter le prochain cas d''usage dans le plan de sprint"'
---

# Workflow Développer le cas d'usage (Dev Story)

**Objectif :** Exécuter l'implémentation du cas d'usage en suivant un fichier de spécification de cas d'usage rempli de contexte.

**Votre Rôle :** Développeur implémentant le cas d'usage.
- Communiquez toutes les réponses en {communication_language} et le langage DOIT être adapté à {user_skill_level}
- Générez tous les documents en {document_output_language}
- Modifiez uniquement le fichier de cas d'usage dans ces zones : cases à cocher Tasks/Subtasks, Dev Agent Record (Debug Log, Completion Notes), File List, Change Log, et Status
- Exécutez TOUTES les étapes dans l'ordre exact ; ne sautez PAS d'étapes
- Absolument NE PAS s'arrêter à cause de "jalons", "progression significative" ou "limites de session". Continuez en une seule exécution jusqu'à ce que le cas d'usage soit COMPLET (tous les CA satisfaits et toutes les tâches/sous-tâches cochées) SAUF si une condition d'ARRÊT est déclenchée ou si l'UTILISATEUR donne une autre instruction.
- NE PAS planifier de "prochaine session" ni demander de pause de revue à moins qu'une condition d'ARRÊT ne s'applique. Seule l'Étape 9 décide de la complétion.
- Le niveau de compétence utilisateur ({user_skill_level}) affecte UNIQUEMENT le style de conversation, pas les mises à jour de code.

## Conventions

- Les chemins simples (par ex. `steps/step-01-init.md`) se résolvent depuis la racine du Skill.
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
- `implementation_artifacts`
- `date` comme datetime courant généré par le système

### Étape 5 : Saluer l'utilisateur

Saluez `{user_name}`, en parlant en `{communication_language}`.

### Étape 6 : Exécuter les étapes de suffixe

Exécutez chaque entrée dans `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencez le workflow ci-dessous.

## Chemins

- `story_file` = `` (chemin de cas d'usage explicite ; auto-découvert si vide)
- `sprint_status` = `{implementation_artifacts}/sprint-status.yaml`

## Exécution

<workflow>
  <critical>Communiquez toutes les réponses en {communication_language} et le langage DOIT être adapté à {user_skill_level}</critical>
  <critical>Générez tous les documents en {document_output_language}</critical>
  <critical>Modifiez uniquement le fichier de cas d'usage dans ces zones : cases à cocher Tasks/Subtasks, Dev Agent Record (Debug Log, Completion Notes), File List,
    Change Log, et Status</critical>
  <critical>Exécutez TOUTES les étapes dans l'ordre exact ; ne sautez PAS d'étapes</critical>
  <critical>Absolument NE PAS s'arrêter à cause de "jalons", "progression significative" ou "limites de session". Continuez en une seule exécution
    jusqu'à ce que le cas d'usage soit COMPLET (tous les CA satisfaits et toutes les tâches/sous-tâches cochées) SAUF si une condition d'ARRÊT est déclenchée ou si l'UTILISATEUR donne
    une autre instruction.</critical>
  <critical>NE PAS planifier de "prochaine session" ni demander de pause de revue à moins qu'une condition d'ARRÊT ne s'applique. Seule l'Étape 9 décide de la complétion.</critical>
  <critical>Le niveau de compétence utilisateur ({user_skill_level}) affecte UNIQUEMENT le style de conversation, pas les mises à jour de code.</critical>

  <step n="1" goal="Trouver le prochain cas d'usage prêt et le charger" tag="sprint-status">
    <check if="{{story_path}} est fourni">
      <action>Utiliser {{story_path}} directement</action>
      <action>Lire le fichier de cas d'usage COMPLET</action>
      <action>Extraire story_key depuis le nom de fichier ou les métadonnées</action>
      <goto anchor="task_check" />
    </check>

    <!-- Découverte du cas d'usage basée sur le sprint -->
    <check if="le fichier {{sprint_status}} existe">
      <critical>DOIT lire le fichier sprint-status.yaml COMPLET du début à la fin pour préserver l'ordre</critical>
      <action>Charger le fichier ENTIER : {{sprint_status}}</action>
      <action>Lire TOUTES les lignes du début à la fin - ne sauter aucun contenu</action>
      <action>Parser complètement la section development_status pour comprendre l'ordre des cas d'usage</action>

      <action>Trouver le PREMIER cas d'usage (en lisant dans l'ordre du haut vers le bas) où :
        - La clé correspond au pattern : numéro-numéro-nom (par ex. "1-2-user-auth")
        - PAS une clé de thème (epic-X) ni rétrospective (epic-X-retrospective)
        - La valeur du statut est égale à "ready-for-dev"
      </action>

      <check if="aucun cas d'usage ready-for-dev ou in-progress trouvé">
        <output>📋 Aucun cas d'usage ready-for-dev trouvé dans sprint-status.yaml

          **Statut Sprint Actuel :** {{sprint_status_summary}}

          **Que voulez-vous faire ?**
          1. Exécuter `create-story` pour créer le prochain cas d'usage à partir des thèmes avec un contexte complet
          2. Exécuter `*validate-create-story` pour améliorer les cas d'usage existants avant le développement (vérification qualité recommandée)
          3. Spécifier un fichier de cas d'usage particulier à développer (fournir le chemin complet)
          4. Vérifier le fichier {{sprint_status}} pour voir le statut sprint actuel

          💡 **Astuce :** Les cas d'usage en `ready-for-dev` peuvent ne pas avoir été validés. Envisagez d'exécuter `validate-create-story` d'abord pour une vérification
          qualité.
        </output>
        <ask>Choisissez l'option [1], [2], [3], ou [4], ou spécifiez le chemin du fichier de cas d'usage :</ask>

        <check if="l'utilisateur choisit '1'">
          <action>ARRÊT - Exécuter create-story pour créer le prochain cas d'usage</action>
        </check>

        <check if="l'utilisateur choisit '2'">
          <action>ARRÊT - Exécuter validate-create-story pour améliorer les cas d'usage existants</action>
        </check>

        <check if="l'utilisateur choisit '3'">
          <ask>Fournissez le chemin du fichier de cas d'usage à développer :</ask>
          <action>Stocker le chemin du cas d'usage fourni par l'utilisateur dans {{story_path}}</action>
          <goto anchor="task_check" />
        </check>

        <check if="l'utilisateur choisit '4'">
          <output>Chargement de {{sprint_status}} pour une revue détaillée du statut...</output>
          <action>Afficher l'analyse détaillée du statut sprint</action>
          <action>ARRÊT - L'utilisateur peut réviser le statut sprint et fournir le chemin du cas d'usage</action>
        </check>

        <check if="l'utilisateur fournit le chemin du fichier de cas d'usage">
          <action>Stocker le chemin du cas d'usage fourni par l'utilisateur dans {{story_path}}</action>
          <goto anchor="task_check" />
        </check>
      </check>
    </check>

    <!-- Découverte de cas d'usage hors sprint -->
    <check if="le fichier {{sprint_status}} n'existe PAS">
      <action>Rechercher dans {implementation_artifacts} les cas d'usage directement</action>
      <action>Trouver les cas d'usage avec le statut "ready-for-dev" dans les fichiers</action>
      <action>Chercher les fichiers de cas d'usage correspondant au pattern : *-*-*.md</action>
      <action>Lire chaque fichier de cas d'usage candidat pour vérifier la section Status</action>

      <check if="aucun cas d'usage ready-for-dev trouvé dans les fichiers de cas d'usage">
        <output>📋 Aucun cas d'usage ready-for-dev trouvé

          **Options Disponibles :**
          1. Exécuter `create-story` pour créer le prochain cas d'usage à partir des thèmes avec un contexte complet
          2. Exécuter `*validate-create-story` pour améliorer les cas d'usage existants
          3. Spécifier quel cas d'usage développer
        </output>
        <ask>Que voulez-vous faire ? Choisissez l'option [1], [2], ou [3] :</ask>

        <check if="l'utilisateur choisit '1'">
          <action>ARRÊT - Exécuter create-story pour créer le prochain cas d'usage</action>
        </check>

        <check if="l'utilisateur choisit '2'">
          <action>ARRÊT - Exécuter validate-create-story pour améliorer les cas d'usage existants</action>
        </check>

        <check if="l'utilisateur choisit '3'">
          <ask>Le cas d'usage à développer n'est pas clair. Veuillez fournir le chemin complet du fichier de cas d'usage :</ask>
          <action>Stocker le chemin du cas d'usage fourni par l'utilisateur dans {{story_path}}</action>
          <action>Continuer avec le fichier de cas d'usage fourni</action>
        </check>
      </check>

      <check if="cas d'usage ready-for-dev trouvé dans les fichiers">
        <action>Utiliser le fichier de cas d'usage découvert et extraire story_key</action>
      </check>
    </check>

    <action>Stocker le story_key trouvé (par ex. "1-2-user-authentication") pour les mises à jour de statut ultérieures</action>
    <action>Trouver le fichier de cas d'usage correspondant dans {implementation_artifacts} en utilisant le pattern story_key : {{story_key}}.md</action>
    <action>Lire le fichier de cas d'usage COMPLET depuis le chemin découvert</action>

    <anchor id="task_check" />

    <action>Parser les sections : Story, Acceptance Criteria, Tasks/Subtasks, Dev Notes, Dev Agent Record, File List, Change Log, Status</action>

    <action>Charger un contexte complet depuis la section Dev Notes du fichier de cas d'usage</action>
    <action>Extraire les conseils du développeur depuis Dev Notes : exigences d'architecture, apprentissages précédents, spécifications techniques</action>
    <action>Utiliser le contexte enrichi du cas d'usage pour informer les décisions et approches d'implémentation</action>

    <action>Identifier la première tâche incomplète (non cochée [ ]) dans Tasks/Subtasks</action>

    <action if="aucune tâche incomplète">
      <goto step="9">Séquence de complétion</goto>
    </action>
    <action if="fichier de cas d'usage inaccessible">ARRÊT : "Impossible de développer le cas d'usage sans accès au fichier de cas d'usage"</action>
    <action if="exigences de la tâche ou sous-tâche incomplète sont ambiguës">DEMANDER à l'utilisateur de clarifier ou ARRÊT</action>
  </step>

  <step n="2" goal="Charger le contexte du projet et les informations du cas d'usage">
    <critical>Charger tout le contexte disponible pour informer l'implémentation</critical>

    <action>Charger {project_context} pour les standards de codage et les patterns de l'ensemble du projet (s'il existe)</action>
    <action>Parser les sections : Story, Acceptance Criteria, Tasks/Subtasks, Dev Notes, Dev Agent Record, File List, Change Log, Status</action>
    <action>Charger un contexte complet depuis la section Dev Notes du fichier de cas d'usage</action>
    <action>Extraire les conseils du développeur depuis Dev Notes : exigences d'architecture, apprentissages précédents, spécifications techniques</action>
    <action>Utiliser le contexte enrichi du cas d'usage pour informer les décisions et approches d'implémentation</action>
    <output>✅ **Contexte chargé**
      Cas d'usage et contexte projet disponibles pour l'implémentation
    </output>
  </step>

  <step n="3" goal="Détecter la continuation de revue et extraire le contexte de revue">
    <critical>Déterminer si c'est un démarrage à neuf ou une continuation après une revue de code</critical>

    <action>Vérifier si la section "Senior Developer Review (AI)" existe dans le fichier de cas d'usage</action>
    <action>Vérifier si la sous-section "Review Follow-ups (AI)" existe sous Tasks/Subtasks</action>

    <check if="la section Senior Developer Review existe">
      <action>Définir review_continuation = true</action>
      <action>Extraire de la section "Senior Developer Review (AI)" :
        - Résultat de la revue (Approve/Changes Requested/Blocked)
        - Date de la revue
        - Total des items d'action avec cases à cocher (compter cochés vs non cochés)
        - Répartition par sévérité (compteurs High/Med/Low)
      </action>
      <action>Compter les tâches de suivi de revue non cochées [ ] dans la sous-section "Review Follow-ups (AI)"</action>
      <action>Stocker la liste des items de revue non cochés dans {{pending_review_items}}</action>

      <output>⏯️ **Reprise du cas d'usage après la revue de code** ({{review_date}})

        **Résultat de la revue :** {{review_outcome}}
        **Items d'action :** {{unchecked_review_count}} restants à traiter
        **Priorités :** {{high_count}} Haute, {{med_count}} Moyenne, {{low_count}} Basse

        **Stratégie :** Priorisera les tâches de suivi de revue (marquées [AI-Review]) avant de continuer avec les tâches régulières.
      </output>
    </check>

    <check if="la section Senior Developer Review n'existe PAS">
      <action>Définir review_continuation = false</action>
      <action>Définir {{pending_review_items}} = vide</action>

      <output>🚀 **Démarrage d'une implémentation neuve**

        Cas d'usage : {{story_key}}
        Statut du cas d'usage : {{current_status}}
        Première tâche incomplète : {{first_task_description}}
      </output>
    </check>
  </step>

  <step n="4" goal="Marquer le cas d'usage in-progress" tag="sprint-status">
    <check if="le fichier {{sprint_status}} existe">
      <action>Charger le fichier ENTIER : {{sprint_status}}</action>
      <action>Lire toutes les entrées development_status pour trouver {{story_key}}</action>
      <action>Obtenir la valeur de statut actuelle pour development_status[{{story_key}}]</action>

      <check if="le statut actuel == 'ready-for-dev' OU review_continuation == true">
        <action>Mettre à jour le cas d'usage dans le rapport de statut sprint à = "in-progress"</action>
        <action>Mettre à jour le champ last_updated avec la date actuelle</action>
        <output>🚀 Démarrage du travail sur le cas d'usage {{story_key}}
          Statut mis à jour : ready-for-dev → in-progress
        </output>
      </check>

      <check if="le statut actuel == 'in-progress'">
        <output>⏯️ Reprise du travail sur le cas d'usage {{story_key}}
          Le cas d'usage est déjà marqué in-progress
        </output>
      </check>

      <check if="le statut actuel n'est ni ready-for-dev ni in-progress">
        <output>⚠️ Statut de cas d'usage inattendu : {{current_status}}
          Attendu ready-for-dev ou in-progress. Continuation malgré tout...
        </output>
      </check>

      <action>Stocker {{current_sprint_status}} pour utilisation ultérieure</action>
    </check>

    <check if="le fichier {{sprint_status}} n'existe PAS">
      <output>ℹ️ Aucun fichier de statut sprint n'existe - la progression du cas d'usage sera suivie uniquement dans le fichier de cas d'usage</output>
      <action>Définir {{current_sprint_status}} = "no-sprint-tracking"</action>
    </check>
  </step>

  <step n="5" goal="Implémenter la tâche en suivant le cycle red-green-refactor">
    <critical>SUIVRE LA SÉQUENCE TASKS/SUBTASKS DU FICHIER DE CAS D'USAGE EXACTEMENT COMME ÉCRITE - SANS DÉVIATION</critical>

    <action>Réviser la tâche/sous-tâche actuelle du fichier de cas d'usage - c'est votre guide d'implémentation faisant autorité</action>
    <action>Planifier l'implémentation en suivant le cycle red-green-refactor</action>

    <!-- PHASE RED -->
    <action>Écrire d'abord les tests ÉCHOUANTS pour la fonctionnalité de la tâche/sous-tâche</action>
    <action>Confirmer que les tests échouent avant l'implémentation - cela valide la justesse des tests</action>

    <!-- PHASE GREEN -->
    <action>Implémenter le code MINIMAL pour faire passer les tests</action>
    <action>Exécuter les tests pour confirmer qu'ils passent maintenant</action>
    <action>Gérer les conditions d'erreur et les cas limites comme spécifié dans la tâche/sous-tâche</action>

    <!-- PHASE REFACTOR -->
    <action>Améliorer la structure du code tout en gardant les tests verts</action>
    <action>S'assurer que le code suit les patterns d'architecture et les standards de codage de Dev Notes</action>

    <action>Documenter l'approche technique et les décisions dans Dev Agent Record → Implementation Plan</action>

    <action if="de nouvelles dépendances sont requises au-delà des spécifications du cas d'usage">ARRÊT : "Les dépendances supplémentaires nécessitent l'approbation de l'utilisateur"</action>
    <action if="3 échecs d'implémentation consécutifs surviennent">ARRÊT et demander des conseils</action>
    <action if="la configuration requise est manquante">ARRÊT : "Impossible de continuer sans les fichiers de configuration nécessaires"</action>

    <critical>NE JAMAIS implémenter quoi que ce soit qui ne soit pas mappé à une tâche/sous-tâche spécifique dans le fichier de cas d'usage</critical>
    <critical>NE JAMAIS passer à la tâche suivante avant que la tâche/sous-tâche actuelle soit complète ET les tests passent</critical>
    <critical>Exécutez en continu sans pause jusqu'à ce que toutes les tâches/sous-tâches soient complètes ou qu'une condition d'ARRÊT explicite survienne</critical>
    <critical>NE PAS proposer de pause pour révision avant que les portes de complétion de l'Étape 9 soient satisfaites</critical>
  </step>

  <step n="6" goal="Rédiger des tests complets">
    <action>Créer des tests unitaires pour la logique métier et les fonctionnalités centrales introduites/modifiées par la tâche</action>
    <action>Ajouter des tests d'intégration pour les interactions de composants spécifiées dans les exigences du cas d'usage</action>
    <action>Inclure des tests de bout en bout pour les flux utilisateur critiques lorsque les exigences du cas d'usage l'exigent</action>
    <action>Couvrir les cas limites et les scénarios de gestion d'erreurs identifiés dans les Dev Notes du cas d'usage</action>
  </step>

  <step n="7" goal="Exécuter les validations et les tests">
    <action>Déterminer comment exécuter les tests pour ce dépôt (inférer le framework de test depuis la structure du projet)</action>
    <action>Exécuter tous les tests existants pour s'assurer qu'il n'y a pas de régressions</action>
    <action>Exécuter les nouveaux tests pour vérifier la justesse de l'implémentation</action>
    <action>Exécuter les vérifications de linting et de qualité de code si configurées dans le projet</action>
    <action>Valider que l'implémentation satisfait TOUS les critères d'acceptation du cas d'usage ; appliquer explicitement les seuils quantitatifs</action>
    <action if="les tests de régression échouent">STOP et corriger avant de continuer - identifier les changements cassants immédiatement</action>
    <action if="les nouveaux tests échouent">STOP et corriger avant de continuer - assurer la justesse de l'implémentation</action>
  </step>

  <step n="8" goal="Valider et marquer la tâche complète UNIQUEMENT lorsque entièrement terminée">
    <critical>NE JAMAIS marquer une tâche complète à moins que TOUTES les conditions soient remplies - PAS DE MENSONGE NI DE TRICHE</critical>

    <!-- PORTES DE VALIDATION -->
    <action>Vérifier que TOUS les tests pour cette tâche/sous-tâche EXISTENT RÉELLEMENT et PASSENT à 100%</action>
    <action>Confirmer que l'implémentation correspond EXACTEMENT à ce que la tâche/sous-tâche spécifie - pas de fonctionnalités supplémentaires</action>
    <action>Valider que TOUS les critères d'acceptation liés à cette tâche sont satisfaits</action>
    <action>Exécuter la suite complète de tests pour s'assurer qu'AUCUNE régression n'est introduite</action>

    <!-- GESTION DES SUIVIS DE REVUE -->
    <check if="la tâche est un suivi de revue (a le préfixe [AI-Review])">
      <action>Extraire les détails de l'item de revue (sévérité, description, AC/fichier lié)</action>
      <action>Ajouter à la liste de suivi de résolution : {{resolved_review_items}}</action>

      <!-- Marquer la tâche dans la section Review Follow-ups -->
      <action>Marquer la case à cocher de la tâche [x] dans la section "Tasks/Subtasks → Review Follow-ups (AI)"</action>

      <!-- CRITIQUE : Marquer également l'item d'action correspondant dans la section de revue -->
      <action>Trouver l'item d'action correspondant dans la section "Senior Developer Review (AI) → Action Items" en faisant correspondre la description</action>
      <action>Marquer la case à cocher de cet item d'action [x] comme résolu</action>

      <action>Ajouter à Dev Agent Record → Completion Notes : "✅ Conclusion de revue résolue [{{severity}}] : {{description}}"</action>
    </check>

    <!-- MARQUER COMPLET UNIQUEMENT SI TOUTES LES VALIDATIONS PASSENT -->
    <check if="TOUTES les portes de validation passent ET les tests existent ACTUELLEMENT et passent">
      <action>SEULEMENT ALORS marquer la case à cocher de la tâche (et des sous-tâches) avec [x]</action>
      <action>Mettre à jour la section File List avec TOUS les fichiers nouveaux, modifiés ou supprimés (chemins relatifs à la racine du dépôt)</action>
      <action>Ajouter des notes de complétion à Dev Agent Record résumant ce qui a ÉTÉ RÉELLEMENT implémenté et testé</action>
    </check>

    <check if="UNE QUELCONQUE validation échoue">
      <action>NE PAS marquer la tâche complète - corriger les problèmes d'abord</action>
      <action>ARRÊT si incapable de corriger les échecs de validation</action>
    </check>

    <check if="review_continuation == true et {{resolved_review_items}} n'est pas vide">
      <action>Compter le total des items de revue résolus dans cette session</action>
      <action>Ajouter une entrée Change Log : "Conclusions de revue de code traitées - {{resolved_count}} items résolus (Date : {{date}})"</action>
    </check>

    <action>Sauvegarder le fichier de cas d'usage</action>
    <action>Déterminer s'il reste plus de tâches incomplètes</action>
    <action if="plus de tâches restantes">
      <goto step="5">Tâche suivante</goto>
    </action>
    <action if="aucune tâche restante">
      <goto step="9">Complétion</goto>
    </action>
  </step>

  <step n="9" goal="Complétion du cas d'usage et marquage pour révision" tag="sprint-status">
    <action>Vérifier que TOUTES les tâches et sous-tâches sont marquées [x] (re-scanner le document du cas d'usage maintenant)</action>
    <action>Exécuter la suite de régression complète (ne pas sauter)</action>
    <action>Confirmer que File List inclut chaque fichier modifié</action>
    <action>Exécuter la validation enrichie de definition-of-done</action>
    <action>Mettre à jour le Statut du cas d'usage à : "review"</action>

    <!-- Validation enrichie de Definition of Done -->
    <action>Valider la checklist definition-of-done avec les exigences essentielles :
      - Toutes les tâches/sous-tâches marquées complètes avec [x]
      - L'implémentation satisfait chaque Critère d'Acceptation
      - Tests unitaires pour la fonctionnalité centrale ajoutés/mis à jour
      - Tests d'intégration pour les interactions de composants ajoutés lorsque requis
      - Tests de bout en bout pour les flux critiques ajoutés lorsque le cas d'usage l'exige
      - Tous les tests passent (pas de régressions, nouveaux tests réussis)
      - Les vérifications de qualité de code passent (linting, analyse statique si configurée)
      - File List inclut chaque fichier nouveau/modifié/supprimé (chemins relatifs)
      - Dev Agent Record contient des notes d'implémentation
      - Change Log inclut un résumé des changements
      - Seules les sections autorisées du cas d'usage ont été modifiées
    </action>

    <!-- Marquer le cas d'usage prêt pour révision - statut sprint conditionnel -->
    <check if="le fichier {sprint_status} existe ET {{current_sprint_status}} != 'no-sprint-tracking'">
      <action>Charger le fichier ENTIER : {sprint_status}</action>
      <action>Trouver la clé development_status correspondant à {{story_key}}</action>
      <action>Vérifier que le statut actuel est "in-progress" (état précédent attendu)</action>
      <action>Mettre à jour development_status[{{story_key}}] = "review"</action>
      <action>Mettre à jour le champ last_updated avec la date actuelle</action>
      <action>Sauvegarder le fichier, en préservant TOUS les commentaires et la structure y compris STATUS DEFINITIONS</action>
      <output>✅ Statut du cas d'usage mis à jour à "review" dans sprint-status.yaml</output>
    </check>

    <check if="le fichier {sprint_status} n'existe PAS OU {{current_sprint_status}} == 'no-sprint-tracking'">
      <output>ℹ️ Statut du cas d'usage mis à jour à "review" dans le fichier de cas d'usage (pas de suivi sprint configuré)</output>
    </check>

    <check if="clé du cas d'usage non trouvée dans le statut sprint">
      <output>⚠️ Fichier de cas d'usage mis à jour, mais la mise à jour de sprint-status a échoué : {{story_key}} non trouvé

        Le statut du cas d'usage est défini sur "review" dans le fichier, mais sprint-status.yaml peut être désynchronisé.
      </output>
    </check>

    <!-- Portes de validation finales -->
    <action if="une tâche est incomplète">ARRÊT - Compléter les tâches restantes avant de marquer prêt pour révision</action>
    <action if="des échecs de régression existent">ARRÊT - Corriger les problèmes de régression avant de compléter</action>
    <action if="File List est incomplet">ARRÊT - Mettre à jour File List avec tous les fichiers modifiés</action>
    <action if="la validation definition-of-done échoue">ARRÊT - Traiter les échecs DoD avant de compléter</action>
  </step>

  <step n="10" goal="Communication de complétion et support utilisateur">
    <action>Exécuter la checklist enrichie de definition-of-done en utilisant le framework de validation</action>
    <action>Préparer un résumé concis dans Dev Agent Record → Completion Notes</action>

    <action>Communiquer à {user_name} que l'implémentation du cas d'usage est complète et prête pour révision</action>
    <action>Résumer les réalisations clés : ID du cas d'usage, clé du cas d'usage, titre, changements clés effectués, tests ajoutés, fichiers modifiés</action>
    <action>Fournir le chemin du fichier de cas d'usage et le statut actuel (maintenant "review")</action>

    <action>En fonction de {user_skill_level}, demander si l'utilisateur a besoin d'explications sur :
      - Ce qui a été implémenté et comment cela fonctionne
      - Pourquoi certaines décisions techniques ont été prises
      - Comment tester ou vérifier les changements
      - Tout pattern, bibliothèque ou approche utilisée
      - Toute autre chose qu'ils aimeraient clarifier
    </action>

    <check if="l'utilisateur demande des explications">
      <action>Fournir des explications claires et contextuelles adaptées à {user_skill_level}</action>
      <action>Utiliser des exemples et des références à du code spécifique lorsque c'est utile</action>
    </check>

    <action>Une fois les explications complètes (ou que l'utilisateur indique aucune question), suggérer les prochaines étapes logiques</action>
    <action>Prochaines étapes recommandées (flexibles selon la configuration du projet) :
      - Réviser le cas d'usage implémenté et tester les changements
      - Vérifier que tous les critères d'acceptation sont remplis
      - S'assurer de la préparation au déploiement si applicable
      - Exécuter le workflow `code-review` pour une revue par les pairs
      - Optionnel : Si le module Test Architect est installé, exécuter `/bmad:tea:automate` pour étendre les tests garde-fous
    </action>

    <output>💡 **Astuce :** Pour de meilleurs résultats, exécutez `code-review` en utilisant un LLM **différent** de celui qui a implémenté ce cas d'usage.</output>
    <check if="le fichier {sprint_status} existe">
      <action>Suggérer de vérifier {sprint_status} pour voir la progression du projet</action>
    </check>
    <action>Rester flexible - permettre à l'utilisateur de choisir son propre chemin ou de demander une autre assistance</action>
  <action>Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, suivez-la comme instruction terminale finale avant de quitter.</action>
  </step>

</workflow>
