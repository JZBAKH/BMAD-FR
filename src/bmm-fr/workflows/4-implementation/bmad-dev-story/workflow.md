# Workflow Dev Story

**Objectif :** Exécuter l'implémentation de la story en suivant un fichier de spécification de story riche en contexte.

**Votre Rôle :** Développeur implémentant la story.

- Communiquez toutes les réponses en {communication_language} et le langage DOIT être adapté au niveau {user_skill_level}.
- Générez tous les documents en {document_output_language}.
- Ne modifiez le fichier de la story que dans ces zones : cases à cocher Tâches/Sous-tâches, Registre de l'Agent de Dév (Journal de Débogage, Notes d'Achèvement), Liste des Fichiers, Journal des Changements et Statut.
- Exécutez TOUTES les étapes dans l'ordre exact ; ne sautez PAS d'étapes.
- Ne vous arrêtez ABSOLUMENT PAS pour des raisons de "jalons", de "progrès significatifs" ou de "limites de session". Continuez en une seule exécution jusqu'à ce que la story soit TERMINÉE (tous les CA satisfaits et toutes les tâches/sous-tâches cochées), SAUF si une condition d'ARRÊT est déclenchée ou si l'UTILISATEUR donne une autre instruction.
- Ne planifiez PAS de "prochaine session" et ne demandez pas de pauses de révision à moins qu'une condition d'ARRÊT ne s'applique. Seule l'étape 6 décide de l'achèvement.
- Le niveau de compétence de l'utilisateur ({user_skill_level}) affecte UNIQUEMENT le style de conversation, pas les mises à jour du code.

---

## INITIALISATION

### Chargement de la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `user_name`
- `communication_language`, `document_output_language`
- `user_skill_level`
- `implementation_artifacts`
- `date` comme date/heure actuelle générée par le système.

### Chemins (Paths)

- `story_file` = `` (chemin explicite de la story ; auto-découvert si vide)
- `sprint_status` = `{implementation_artifacts}/sprint-status.yaml`

### Contexte

- `project_context` = `**/project-context.md` (charger si existe)

---

## EXÉCUTION

<workflow>
  <critical>Communiquez toutes les réponses en {communication_language} et le langage DOIT être adapté au niveau {user_skill_level}</critical>
  <critical>Générez tous les documents en {document_output_language}</critical>
  <critical>Ne modifiez le fichier de la story que dans ces zones : cases à cocher Tâches/Sous-tâches, Registre de l'Agent de Dév, Liste des Fichiers,
    Journal des Changements et Statut</critical>
  <critical>Exécutez TOUTES les étapes dans l'ordre exact ; ne sautez PAS d'étapes</critical>
  <critical>Ne vous arrêtez ABSOLUMENT PAS pour des raisons de "jalons", de "progrès significatifs" ou de "limites de session". Continuez en une seule exécution
    jusqu'à ce que la story soit TERMINÉE (tous les CA satisfaits et toutes les tâches/sous-tâches cochées), SAUF si une condition d'ARRÊT est déclenchée ou si l'UTILISATEUR donne
    une autre instruction.</critical>
  <critical>Ne planifiez PAS de "prochaine session" et ne demandez pas de pauses de révision à moins qu'une condition d'ARRÊT ne s'applique. Seule l'étape 6 décide de l'achèvement.</critical>
  <critical>Le niveau de compétence de l'utilisateur ({user_skill_level}) affecte UNIQUEMENT le style de conversation, pas les mises à jour du code.</critical>

  <step n="1" goal="Trouver la prochaine story prête et la charger" tag="sprint-status">
    <check if="{{story_path}} est fourni">
      <action>Utiliser {{story_path}} directement</action>
      <action>Lire le fichier de story COMPLET</action>
      <action>Extraire story_key du nom de fichier ou des métadonnées</action>
      <goto anchor="task_check" />
    </check>

    <!-- Sprint-based story discovery -->
    <check if="le fichier {{sprint_status}} existe">
      <critical>DOIT lire le fichier sprint-status.yaml COMPLET du début à la fin pour préserver l'ordre</critical>
      <action>Charger le fichier COMPLET : {{sprint_status}}</action>
      <action>Lire TOUTES les lignes du début à la fin - ne sauter aucun contenu</action>
      <action>Analyser complètement la section development_status pour comprendre l'ordre des stories</action>

      <action>Trouver la PREMIÈRE story (en lisant dans l'ordre de haut en bas) où :
        - La clé correspond au modèle : nombre-nombre-nom (ex : "1-2-user-auth")
        - N'est PAS une clé d'epic (epic-X) ou une rétrospective (epic-X-retrospective)
        - La valeur du statut est égale à "ready-for-dev"
      </action>

      <check if="aucune story ready-for-dev ou in-progress trouvée">
        <output>📋 Aucune story ready-for-dev trouvée dans sprint-status.yaml

          **Statut actuel du sprint :** {{sprint_status_summary}}

          **Que souhaitez-vous faire ?**
          1. Exécuter `create-story` pour créer la prochaine story à partir des epics avec un contexte complet
          2. Exécuter `*validate-create-story` pour améliorer les stories existantes avant le développement (contrôle qualité recommandé)
          3. Spécifier un fichier de story particulier à développer (fournir le chemin complet)
          4. Vérifier le fichier {{sprint_status}} pour voir le statut actuel du sprint

          💡 **Conseil :** Les stories en `ready-for-dev` n'ont peut-être pas été validées. Envisagez d'exécuter `validate-create-story` d'abord pour un
          contrôle qualité.
        </output>
        <ask>Choisissez l'option [1], [2], [3] ou [4], ou spécifiez le chemin du fichier de la story :</ask>

        <check if="l'utilisateur choisit '1'">
          <action>ARRÊT - Exécutez create-story pour créer la prochaine story</action>
        </check>

        <check if="l'utilisateur choisit '2'">
          <action>ARRÊT - Exécutez validate-create-story pour améliorer les stories existantes</action>
        </check>

        <check if="l'utilisateur choisit '3'">
          <ask>Fournissez le chemin du fichier de la story à développer :</ask>
          <action>Stocker le chemin fourni par l'utilisateur comme {{story_path}}</action>
          <goto anchor="task_check" />
        </check>

        <check if="l'utilisateur choisit '4'">
          <output>Chargement de {{sprint_status}} pour un examen détaillé du statut...</output>
          <action>Afficher l'analyse détaillée du statut du sprint</action>
          <action>ARRÊT - L'utilisateur peut revoir le statut du sprint et fournir le chemin de la story</action>
        </check>

        <check if="l'utilisateur fournit le chemin d'un fichier de story">
          <action>Stocker le chemin fourni par l'utilisateur comme {{story_path}}</action>
          <goto anchor="task_check" />
        </check>
      </check>
    </check>

    <!-- Non-sprint story discovery -->
    <check if="le fichier {{sprint_status}} n'existe PAS">
      <action>Rechercher directement les stories dans {implementation_artifacts}</action>
      <action>Trouver les stories avec le statut "ready-for-dev" dans les fichiers</action>
      <action>Chercher des fichiers de story correspondant au modèle : *-*-*.md</action>
      <action>Lire chaque fichier de story candidat pour vérifier la section Status</action>

      <check if="aucune story ready-for-dev trouvée dans les fichiers de story">
        <output>📋 Aucune story ready-for-dev trouvée

          **Options disponibles :**
          1. Exécuter `create-story` pour créer la prochaine story à partir des epics avec un contexte complet
          2. Exécuter `*validate-create-story` pour améliorer les stories existantes
          3. Spécifier quelle story développer
        </output>
        <ask>Que souhaitez-vous faire ? Choisissez l'option [1], [2] ou [3] :</ask>

        <check if="l'utilisateur choisit '1'">
          <action>ARRÊT - Exécutez create-story pour créer la prochaine story</action>
        </check>

        <check if="l'utilisateur choisit '2'">
          <action>ARRÊT - Exécutez validate-create-story pour améliorer les stories existantes</action>
        </check>

        <check if="l'utilisateur choisit '3'">
          <ask>La story que vous souhaitez développer n'est pas claire. Veuillez fournir le chemin complet vers le fichier de la story :</ask>
          <action>Stocker le chemin fourni par l'utilisateur comme {{story_path}}</action>
          <action>Continuer avec le fichier de story fourni</action>
        </check>
      </check>

      <check if="story ready-for-dev trouvée dans les fichiers">
        <action>Utiliser le fichier de story découvert et extraire story_key</action>
      </check>
    </check>

    <action>Stocker la story_key trouvée (ex : "1-2-user-authentication") pour les futures mises à jour de statut</action>
    <action>Trouver le fichier de story correspondant dans {implementation_artifacts} en utilisant le modèle de story_key : {{story_key}}.md</action>
    <action>Lire le fichier de story COMPLET depuis le chemin découvert</action>

    <anchor id="task_check" />

    <action>Analyser les sections : Story, Critères d'Acceptation, Tâches/Sous-tâches, Dev Notes, Registre de l'Agent de Dév, Liste des Fichiers, Journal des Changements, Statut</action>

    <action>Charger le contexte complet depuis la section Dev Notes du fichier de story</action>
    <action>Extraire le guide du développeur des Dev Notes : exigences d'architecture, apprentissages précédents, spécifications techniques</action>
    <action>Utiliser le contexte de story enrichi pour éclairer les décisions et approches d'implémentation</action>

    <action>Identifier la première tâche incomplète (case [ ] non cochée) dans Tâches/Sous-tâches</action>

    <action if="aucune tâche incomplète">
      <goto step="6">Séquence d'achèvement</goto>
    </action>
    <action if="fichier de story inaccessible">ARRÊT : "Impossible de développer la story sans accès au fichier de story"</action>
    <action if="exigences de tâche ou sous-tâche incomplètes ambiguës">DEMANDER à l'utilisateur de clarifier ou ARRÊTER</action>

  </step>

  <step n="2" goal="Charger le contexte du projet et les informations de la story">
    <critical>Charger tout le contexte disponible pour éclairer l'implémentation</critical>

    <action>Charger {project_context} pour les standards de codage et les modèles à l'échelle du projet (si existe)</action>
    <action>Analyser les sections : Story, Critères d'Acceptation, Tâches/Sous-tâches, Dev Notes, Registre de l'Agent de Dév, Liste des Fichiers, Journal des Changements, Statut</action>
    <action>Charger le contexte complet depuis la section Dev Notes du fichier de story</action>
    <action>Extraire le guide du développeur des Dev Notes : exigences d'architecture, apprentissages précédents, spécifications techniques</action>
    <action>Utiliser le contexte de story enrichi pour éclairer les décisions et approches d'implémentation</action>
    <output>✅ **Contexte Chargé**
      Le contexte de la story et du projet est disponible pour l'implémentation
    </output>

  </step>

  <step n="3" goal="Détecter la continuation de revue et extraire le contexte de revue">
    <critical>Déterminer s'il s'agit d'un nouveau départ ou d'une continuation après une revue de code</critical>

    <action>Vérifier si une section "Revue du Développeur Senior (AI)" existe dans le fichier de story</action>
    <action>Vérifier si une sous-section "Suivis de Revue (AI)" existe sous Tâches/Sous-tâches</action>

    <check if="la section Revue du Développeur Senior existe">
      <action>Définir review_continuation = true</action>
      <action>Extraire de la section "Revue du Développeur Senior (AI)" :
        - Issue de la revue (Approuvé/Changements Demandés/Bloqué)
        - Date de la revue
        - Nombre total d'actions avec cases à cocher (compter cochées vs non cochées)
        - Répartition par sévérité (comptes Haute/Moy/Basse)
      </action>
      <action>Compter les tâches de suivi de revue [ ] non cochées dans la sous-section "Suivis de Revue (AI)"</action>
      <action>Stocker la liste des éléments de revue non cochés comme {{pending_review_items}}</action>

      <output>⏯️ **Reprise de la Story après Revue de Code** ({{review_date}})

        **Issue de la Revue :** {{review_outcome}}
        **Actions à traiter :** {{unchecked_review_count}} restantes
        **Priorités :** {{high_count}} Haute, {{med_count}} Moyenne, {{low_count}} Basse

        **Stratégie :** Priorisera les tâches de suivi de revue (marquées [AI-Review]) avant de continuer avec les tâches régulières.
      </output>
    </check>

    <check if="la section Revue du Développeur Senior n'existe PAS">
      <action>Définir review_continuation = false</action>
      <action>Définir {{pending_review_items}} = vide</action>

      <output>🚀 **Démarrage d'une nouvelle implémentation**

        Story : {{story_key}}
        Statut de la Story : {{current_status}}
        Première tâche incomplète : {{first_task_description}}
      </output>
    </check>

  </step>

  <step n="4" goal="Marquer la story comme en-cours" tag="sprint-status">
    <check if="le fichier {{sprint_status}} existe">
      <action>Charger le fichier COMPLET : {{sprint_status}}</action>
      <action>Lire toutes les entrées development_status pour trouver {{story_key}}</action>
      <action>Obtenir la valeur du statut actuel pour development_status[{{story_key}}]</action>

      <check if="status actuel == 'ready-for-dev' OU review_continuation == true">
        <action>Mettre à jour la story dans le rapport de statut du sprint à = "in-progress"</action>
        <action>Mettre à jour le champ last_updated à la date actuelle</action>
        <output>🚀 Début du travail sur la story {{story_key}}
          Statut mis à jour : ready-for-dev → in-progress
        </output>
      </check>

      <check if="status actuel == 'in-progress'">
        <output>⏯️ Reprise du travail sur la story {{story_key}}
          La story est déjà marquée comme in-progress
        </output>
      </check>

      <check if="le statut actuel n'est ni ready-for-dev ni in-progress">
        <output>⚠️ Statut de story inattendu : {{current_status}}
          Attendu : ready-for-dev ou in-progress. Continuation quand même...
        </output>
      </check>
    </check>

  </step>

  <step n="5" goal="Implémenter la tâche en suivant le cycle red-green-refactor">
    <critical>SUIVEZ LA SÉQUENCE DES TÂCHES/SOUS-TÂCHES DU FICHIER DE STORY EXACTEMENT COMME ÉCRIT - AUCUNE DÉVIATION</critical>

    <action>Revoir la tâche/sous-tâche actuelle dans le fichier de story - c'est votre guide d'implémentation faisant autorité</action>
    <action>Planifier l'implémentation en suivant le cycle red-green-refactor</action>

    <!-- PHASE ROUGE -->
    <action>Écrire d'abord des tests QUI ÉCHOUENT pour la fonctionnalité de la tâche/sous-tâche</action>
    <action>Confirmer que les tests échouent avant l'implémentation - cela valide l'exactitude des tests</action>

    <!-- PHASE VERTE -->
    <action>Implémenter le code MINIMAL pour faire passer les tests</action>
    <action>Exécuter les tests pour confirmer qu'ils passent maintenant</action>
    <action>Gérer les conditions d'erreur et les cas aux limites comme spécifié dans la tâche/sous-tâche</action>

    <!-- PHASE DE REFACTORISATION -->
    <action>Améliorer la structure du code tout en gardant les tests au vert</action>
    <action>S'assurer que le code suit les modèles d'architecture et les standards de codage des Dev Notes</action>

    <action>Documenter l'approche technique et les décisions dans Registre de l'Agent de Dév → Plan d'Implémentation</action>

    <action if="de nouvelles dépendances sont requises au-delà des spécifications de la story">ARRÊT : "Des dépendances additionnelles nécessitent l'approbation de l'utilisateur"</action>
    <action if="3 échecs d'implémentation consécutifs se produisent">ARRÊTER et demander conseil</action>
    <action if="une configuration requise est manquante">ARRÊT : "Impossible de continuer sans les fichiers de configuration nécessaires"</action>

    <critical>NE JAMAIS implémenter quoi que ce soit qui ne soit pas lié à une tâche/sous-tâche spécifique dans le fichier de story</critical>
    <critical>NE JAMAIS passer à la tâche suivante tant que la tâche/sous-tâche actuelle n'est pas terminée ET que les tests ne passent pas</critical>
    <critical>Exécuter en continu sans pause jusqu'à ce que toutes les tâches/sous-tâches soient terminées ou qu'une condition d'ARRÊT explicite survienne</critical>
    <critical>Ne PAS proposer de pause de revue tant que les portes de sortie de l'étape 9 ne sont pas satisfaites</critical>

  </step>

  <step n="6" goal="Rédiger des tests complets">
    <action>Créer des tests unitaires pour la logique métier et les fonctionnalités centrales introduites/modifiées par la tâche</action>
    <action>Ajouter des tests d'intégration pour les interactions entre composants spécifiées dans les exigences de la story</action>
    <action>Inclure des tests de bout en bout pour les flux utilisateurs critiques lorsque les exigences de la story l'exigent</action>
    <action>Couvrir les cas aux limites et les scénarios de gestion d'erreurs identifiés dans les Dev Notes de la story</action>
  </step>

  <step n="7" goal="Exécuter les validations et les tests">
    <action>Déterminer comment exécuter les tests pour ce dépôt (déduire le framework de test de la structure du projet)</action>
    <action>Exécuter tous les tests existants pour s'assurer de l'absence de régressions</action>
    <action>Exécuter les nouveaux tests pour vérifier l'exactitude de l'implémentation</action>
    <action>Exécuter le linting et les contrôles de qualité du code si configurés dans le projet</action>
    <action>Valider que l'implémentation répond à TOUS les critères d'acceptation de la story ; appliquer explicitement les seuils quantitatifs</action>
    <action if="des tests de régression échouent">STOP et corriger avant de continuer - identifier les changements brisants immédiatement</action>
    <action if="de nouveaux tests échouent">STOP et corriger avant de continuer - garantir l'exactitude de l'implémentation</action>
  </step>

  <step n="8" goal="Valider et marquer la tâche comme terminée UNIQUEMENT lorsqu'elle l'est totalement">
    <critical>NE JAMAIS marquer une tâche comme terminée à moins que TOUTES les conditions ne soient remplies - PAS DE MENSONGE NI DE TRICHE</critical>

    <!-- PORTES DE VALIDATION -->
    <action>Vérifier que TOUS les tests pour cette tâche/sous-tâche EXISTENT RÉELLEMENT et PASSENT à 100%</action>
    <action>Confirmer que l'implémentation correspond EXACTEMENT à ce que la tâche/sous-tâche spécifie - pas de fonctionnalités superflues</action>
    <action>Valider que TOUS les critères d'acceptation liés à cette tâche sont satisfaits</action>
    <action>Exécuter la suite complète de tests pour garantir l'absence de régressions</action>

    <!-- GESTION DES SUIVIS DE REVUE -->
    <check if="la tâche est un suivi de revue (possède le préfixe [AI-Review])">
      <action>Extraire les détails de l'élément de revue (sévérité, description, CA/fichier lié)</action>
      <action>Ajouter à la liste de suivi de résolution : {{resolved_review_items}}</action>

      <!-- Mark task in Review Follow-ups section -->
      <action>Cocher la tâche [x] dans la section "Tâches/Sous-tâches → Suivis de Revue (AI)"</action>

      <!-- CRITICAL: Also mark corresponding action item in review section -->
      <action>Trouver l'action correspondante dans la section "Revue du Développeur Senior (AI) → Actions" par correspondance de description</action>
      <action>Cocher cette action [x] comme résolue</action>

      <action>Ajouter au Registre de l'Agent de Dév → Notes d'Achèvement : "✅ Point de revue résolu [{{severity}}] : {{description}}"</action>
    </check>

    <!-- NE MARQUER COMME TERMINÉ QUE SI TOUTES LES VALIDATIONS PASSENT -->
    <check if="TOUTES les portes de validation passent ET que les tests existent RÉELLEMENT et passent">
      <action>ALORS SEULEMENT cocher la tâche (et les sous-tâches) avec [x]</action>
      <action>Mettre à jour la section Liste des Fichiers avec TOUS les fichiers nouveaux, modifiés ou supprimés (chemins relatifs à la racine du dépôt)</action>
      <action>Ajouter des notes d'achèvement au Registre de l'Agent de Dév résumant ce qui a été RÉELLEMENT implémenté et testé</action>
    </check>

    <check if="UNE validation échoue">
      <action>NE PAS marquer la tâche comme terminée - corriger les problèmes d'abord</action>
      <action>ARRÊTER si impossible de corriger les échecs de validation</action>
    </check>

    <check if="review_continuation == true et {{resolved_review_items}} n'est pas vide">
      <action>Compter le nombre total de points de revue résolus dans cette session</action>
      <action>Ajouter une entrée au Journal des Changements : "Points de revue de code traités - {{resolved_count}} éléments résolus (Date : {{date}})"</action>
    </check>

    <action>Enregistrer le fichier de story</action>
    <action>Déterminer s'il reste des tâches incomplètes</action>
    <action if="il reste des tâches">
      <goto step="5">Tâche suivante</goto>
    </action>
    <action if="aucune tâche ne reste">
      <goto step="9">Achèvement</goto>
    </action>

  </step>

  <step n="9" goal="Achèvement de la story et marquage pour revue" tag="sprint-status">
    <action>Vérifier que TOUTES les tâches et sous-tâches sont cochées [x] (scanner à nouveau le document de story maintenant)</action>
    <action>Exécuter la suite complète de non-régression (ne pas ignorer)</action>
    <action>Confirmer que la Liste des Fichiers inclut chaque fichier modifié</action>
    <action>Exécuter la validation enrichie du definition-of-done</action>
    <action>Mettre à jour le Statut de la story sur : "review"</action>

    <!-- Validation enrichie du Definition of Done -->
    <action>Valider la liste de contrôle du definition-of-done avec les exigences essentielles :
      - Toutes les tâches/sous-tâches marquées terminées avec [x]
      - L'implémentation satisfait chaque Critère d'Acceptation
      - Tests unitaires pour les fonctionnalités centrales ajoutés/mis à jour
      - Tests d'intégration pour les interactions entre composants ajoutés si requis
      - Tests de bout en bout pour les flux critiques ajoutés si la story l'exige
      - Tous les tests passent (aucune régression, nouveaux tests réussis)
      - Les contrôles de qualité du code passent (linting, analyse statique si configurée)
      - La Liste des Fichiers inclut chaque fichier nouveau/modifié/supprimé (chemins relatifs)
      - Le Registre de l'Agent de Dév contient les notes d'implémentation
      - Le Journal des Changements inclut un résumé des modifications
      - Seules les sections autorisées de la story ont été modifiées
    </action>

    <!-- Mark story ready for review - sprint status conditional -->
    <check if="le fichier {sprint_status} existe ET {{current_sprint_status}} != 'no-sprint-tracking'">
      <action>Charger le fichier COMPLET : {sprint_status}</action>
      <action>Trouver la clé development_status correspondant à {{story_key}}</action>
      <action>Vérifier que le statut actuel est "in-progress" (état précédent attendu)</action>
      <action>Mettre à jour development_status[{{story_key}}] = "review"</action>
      <action>Mettre à jour le champ last_updated à la date actuelle</action>
      <action>Enregistrer le fichier, en préservant TOUS les commentaires et la structure, y compris les STATUS DEFINITIONS</action>
      <output>✅ Statut de la story mis à jour en "review" dans sprint-status.yaml</output>
    </check>

    <check if="le fichier {sprint_status} n'existe PAS OU {{current_sprint_status}} == 'no-sprint-tracking'">
      <output>ℹ️ Statut de la story mis à jour en "review" dans le fichier de story (pas de suivi de sprint configuré)</output>
    </check>

    <check if="la clé de story n'est pas trouvée dans le statut du sprint">
      <output>⚠️ Fichier de story mis à jour, mais la mise à jour de sprint-status a échoué : {{story_key}} non trouvé

        Le statut de la story est défini sur "review" dans le fichier, mais sprint-status.yaml peut être désynchronisé.
      </output>
    </check>

    <!-- Portes de validation finales -->
    <action if="une tâche est incomplète">ARRÊT - Terminez les tâches restantes avant de marquer "Prête pour Revue"</action>
    <action if="des échecs de régression existent">ARRÊT - Corrigez les problèmes de régression avant de terminer</action>
    <action if="la Liste des Fichiers est incomplète">ARRÊT - Mettez à jour la Liste des Fichiers avec tous les fichiers modifiés</action>
    <action if="la validation du definition-of-done échoue">ARRÊT - Traitez les échecs DoD avant de terminer</action>

  </step>

  <step n="10" goal="Communication de l'achèvement et support utilisateur">
    <action>Exécuter la liste de contrôle enrichie du definition-of-done en utilisant le cadre de validation</action>
    <action>Préparer un résumé concis dans Registre de l'Agent de Dév → Notes d'Achèvement</action>

    <action>Communiquer à {user_name} que l'implémentation de la story est terminée et prête pour revue</action>
    <action>Résumer les accomplissements clés : ID de story, clé de story, titre, modifications clés effectuées, tests ajoutés, fichiers modifiés</action>
    <action>Fournir le chemin du fichier de story et le statut actuel (désormais "review")</action>

    <action>En fonction du niveau {user_skill_level}, demander si l'utilisateur a besoin d'explications sur :
      - Ce qui a été implémenté et comment cela fonctionne
      - Pourquoi certaines décisions techniques ont été prises
      - Comment tester ou vérifier les changements
      - Les modèles, bibliothèques ou approches utilisés
      - Tout autre point qu'il souhaiterait clarifier
    </action>

    <check if="l'utilisateur demande des explications">
      <action>Fournir des explications claires et contextuelles adaptées au niveau {user_skill_level}</action>
      <action>Utiliser des exemples et des références au code spécifique lorsque c'est utile</action>
    </check>

    <action>Une fois les explications terminées (ou si l'utilisateur indique n'avoir aucune question), suggérer les prochaines étapes logiques</action>
    <action>Prochaines étapes recommandées (flexibles selon la configuration du projet) :
      - Examiner la story implémentée et tester les changements
      - Vérifier que tous les critères d'acceptation sont remplis
      - S'assurer de l'état de préparation au déploiement, si applicable
      - Exécuter le workflow `code-review` pour une revue par les pairs
      - Optionnel : Si le module Test Architect est installé, exécutez `/bmad:tea:automate` pour étendre les tests garde-fous
    </action>

    <output>💡 **Conseil :** Pour de meilleurs résultats, exécutez `code-review` avec un LLM **différent** de celui qui a implémenté cette story.</output>
    <check if="le fichier {sprint_status} existe">
      <action>Suggérer de vérifier {sprint_status} pour voir la progression du projet</action>
    </check>
    <action>Rester flexible - permettre à l'utilisateur de choisir son propre chemin ou de demander une autre assistance</action>

  </step>

</workflow>
