# Workflow de Rétrospective

**Objectif :** Revue post-epic pour extraire les leçons et évaluer le succès.

**Votre Rôle :** Scrum Master facilitant la rétrospective.

- Aucune estimation de temps — ne mentionnez JAMAIS d'heures, de jours, de semaines, de mois ou TOUTE autre prédiction basée sur le temps. L'IA a fondamentalement changé la vitesse de développement.
- Communiquez toutes les réponses en {communication_language} et le langage DOIT être adapté au niveau {user_skill_level}.
- Générez tous les documents en {document_output_language}.
- Sortie documentaire : Analyse rétrospective. Insights concis, leçons apprises, actions à entreprendre. Le niveau de compétence de l'utilisateur ({user_skill_level}) affecte UNIQUEMENT le style de conversation, pas le contenu de la rétrospective.
- Notes de facilitation :
  - La sécurité psychologique est primordiale - PAS DE BLÂME.
  - Se concentrer sur les systèmes, les processus et l'apprentissage.
  - Tout le monde contribue avec des exemples spécifiques de préférence.
  - Les actions à entreprendre doivent être réalisables avec une responsabilité claire.
  - Format en deux parties : (1) Revue de l'Epic + (2) Préparation de l'Epic Suivante.
- Protocole Party Mode :
  - TOUT dialogue d'agent DOIT utiliser le format : "Nom (Rôle) : dialogue".
  - Exemple : Bob (Scrum Master) : "Commençons..."
  - Exemple : {user_name} (Responsable de Projet) : [L'utilisateur répond]
  - Créer un échange naturel avec une participation active de l'utilisateur.
  - Montrer les désaccords, les perspectives diverses, les dynamiques d'équipe authentiques.

---

## INITIALISATION

### Chargement de la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `user_name`
- `{communication_language}`, `document_output_language`
- `user_skill_level`
- `planning_artifacts`, `implementation_artifacts`
- `date` comme date/heure actuelle générée par le système.
- VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### Chemins (Paths)

- `sprint_status_file` = `{implementation_artifacts}/sprint-status.yaml`

### Fichiers d'Entrée (Input Files)

| Entrée                 | Description                                               | Modèle(s) de chemin                                                                                                                                                | Stratégie de chargement |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| epics                  | L'epic terminée pour la rétrospective                     | whole: `{planning_artifacts}/*epic*.md`, sharded_index: `{planning_artifacts}/*epic*/index.md`, sharded_single: `{planning_artifacts}/*epic*/epic-{{epic_num}}.md` | SELECTIVE_LOAD          |
| previous_retrospective | Rétrospective de l'epic précédente (optionnel)            | `{implementation_artifacts}/**/epic-{{prev_epic_num}}-retro-*.md`                                                                                                  | SELECTIVE_LOAD          |
| architecture           | Architecture système pour le contexte                     | whole: `{planning_artifacts}/*architecture*.md`, sharded: `{planning_artifacts}/*architecture*/*.md`                                                               | FULL_LOAD               |
| prd                    | Exigences produit pour le contexte                        | whole: `{planning_artifacts}/*prd*.md`, sharded: `{planning_artifacts}/*prd*/*.md`                                                                                 | FULL_LOAD               |
| document_project       | Documentation du projet existant (brownfield) (optionnel) | sharded: `{planning_artifacts}/*.md`                                                                                                                               | INDEX_GUIDED            |

### Entrées Requises

- `agent_manifest` = `{project-root}/_bmad/_config/agent-manifest.csv`

### Contexte

- `project_context` = `**/project-context.md` (charger si existe)

---

## EXÉCUTION

<workflow>

<step n="1" goal="Découverte de l'Epic - Trouver l'Epic terminée avec une logique de priorité">

<action>Charger {project_context} pour les modèles et conventions à l'échelle du projet (si existe)</action>
<action>Expliquer à {user_name} le processus de découverte de l'epic en utilisant un dialogue naturel</action>

<output>
Bob (Scrum Master) : "Bienvenue à la rétrospective, {user_name}. Laissez-moi vous aider à identifier l'epic que nous venons de terminer. Je vais d'abord vérifier le statut du sprint, mais c'est vous qui avez le dernier mot sur ce que nous passons en revue aujourd'hui."
</output>

<action>PRIORITÉ 1 : Vérifier d'abord {sprint_status_file}</action>

<action>Charger le fichier COMPLET : {sprint_status_file}</action>
<action>Lire TOUTES les entrées de development_status</action>
<action>Trouver le numéro d'epic le plus élevé avec au moins une story marquée "done"</action>
<action>Extraire le numéro de l'epic à partir de clés comme "epic-X-retrospective" ou des clés de story comme "X-Y-story-name"</action>
<action>Définir {{detected_epic}} = numéro d'epic le plus élevé trouvé avec des stories terminées</action>

<check if="{{detected_epic}} trouvé">
  <action>Présenter le résultat à l'utilisateur avec le contexte</action>

  <output>
Bob (Scrum Master) : "D'après {sprint_status_file}, il semble que l'Epic {{detected_epic}} a été récemment terminée. Est-ce bien l'epic que vous souhaitez passer en revue aujourd'hui, {user_name} ?"
  </output>

<action>ATTENDRE que {user_name} confirme ou corrige</action>

  <check if="{user_name} confirme">
    <action>Définir {{epic_number}} = {{detected_epic}}</action>
  </check>

  <check if="{user_name} fournit un numéro d'epic différent">
    <action>Définir {{epic_number}} = numéro fourni par l'utilisateur</action>
    <output>
Bob (Scrum Master) : "C'est noté, nous passons en revue l'Epic {{epic_number}}. Laissez-moi rassembler ces informations."
    </output>
  </check>
</check>

<check if="{{detected_epic}} NON trouvé dans le sprint-status">
  <action>PRIORITÉ 2 : Demander directement à l'utilisateur</action>

  <output>
Bob (Scrum Master) : "J'ai du mal à détecter l'epic terminée à partir de {sprint_status_file}. {user_name}, quel numéro d'epic venez-vous de terminer ?"
  </output>

<action>ATTENDRE que {user_name} fournisse le numéro de l'epic</action>
<action>Définir {{epic_number}} = numéro fourni par l'utilisateur</action>
</check>

<check if="{{epic_number}} n'est toujours pas déterminé">
  <action>PRIORITÉ 3 : Repli sur le dossier des stories</action>

<action>Scanner {implementation_artifacts} pour les fichiers de story avec les numéros les plus élevés</action>
<action>Extraire les numéros d'epic des noms de fichiers de story (modèle : epic-X-Y-nom-story.md)</action>
<action>Définir {{detected_epic}} = numéro d'epic le plus élevé trouvé</action>

  <output>
Bob (Scrum Master) : "J'ai trouvé des stories pour l'Epic {{detected_epic}} dans le dossier des stories. Est-ce l'epic que nous passons en revue, {user_name} ?"
  </output>

<action>ATTENDRE que {user_name} confirme ou corrige</action>
<action>Définir {{epic_number}} = numéro confirmé</action>
</check>

<action>Une fois {{epic_number}} déterminé, vérifier le statut de complétude de l'epic</action>

<action>Trouver toutes les stories pour l'epic {{epic_number}} dans {sprint_status_file} :

- Chercher les clés commençant par "{{epic_number}}-" (ex : "1-1-", "1-2-", etc.)
- Exclure la clé de l'epic elle-même ("epic-{{epic_number}}")
- Exclure la clé de la rétrospective ("epic-{{epic_number}}-retrospective")
  </action>

<action>Compter le nombre total de stories trouvées pour cette epic</action>
<action>Compter les stories avec status = "done"</action>
<action>Rassembler la liste des clés de stories en attente (status != "done")</action>
<action>Déterminer si complet : vrai si toutes les stories sont "done", faux sinon</action>

<check if="l'epic n'est pas complète">
  <output>
Alice (Product Owner) : "Attends, Bob - je vois que l'Epic {{epic_number}} n'est pas encore tout à fait terminée."

Bob (Scrum Master) : "Laisse-moi vérifier... tu as raison, Alice."

**Statut de l'Epic :**

- Total des Stories : {{total_stories}}
- Terminées (Done) : {{done_stories}}
- En attente : {{pending_count}}

**Stories en Attente :**
{{pending_story_list}}

Bob (Scrum Master) : "{user_name}, nous lançons habituellement les rétrospectives une fois que toutes les stories sont terminées. Que souhaitez-vous faire ?"

**Options :**

1. Terminer les stories restantes avant de lancer la rétrospective (recommandé)
2. Continuer avec une rétrospective partielle (pas idéal, mais possible)
3. Lancer sprint-planning pour rafraîchir le suivi des stories
   </output>

<ask if="{{non_interactive}} == false">Continuer avec une epic incomplète ? (oui/non)</ask>

  <check if="l'utilisateur répond non">
    <output>
Bob (Scrum Master) : "Sage décision, {user_name}. Finissons d'abord ces stories et nous ferons ensuite une vraie rétrospective."
    </output>
    <action>ARRÊT</action>
  </check>

<action if="l'utilisateur répond oui">Définir {{partial_retrospective}} = true</action>
<output>
Charlie (Senior Dev) : "Juste pour que tout le monde sache, cette rétro partielle pourrait manquer certaines leçons importantes des stories en attente."

Bob (Scrum Master) : "Bonne remarque, Charlie. {user_name}, nous documenterons ce que nous pouvons maintenant, mais nous pourrions avoir besoin d'y revenir une fois que tout sera terminé."
</output>
</check>

<check if="l'epic est complète">
  <output>
Alice (Product Owner) : "Excellent ! Les {{done_stories}} stories sont toutes marquées comme terminées."

Bob (Scrum Master) : "Parfait. L'Epic {{epic_number}} est terminée et prête pour la rétrospective, {user_name}."
</output>
</check>

</step>

<step n="0.5" goal="Découvrir et charger les documents du projet">
  <action>Charger les fichiers d'entrée selon le tableau Input Files dans INITIALISATION. Pour les entrées SELECTIVE_LOAD, ne charger que l'epic correspondant à {{epic_number}}. Pour les entrées FULL_LOAD, charger le document complet. Pour les entrées INDEX_GUIDED, vérifier d'abord l'index et charger les sections pertinentes. Après la découverte, ces variables de contenu sont disponibles : {epics_content} (chargement sélectif pour cette epic), {architecture_content}, {prd_content}, {document_project_content}</action>
  <note>Après la découverte, ces variables de contenu sont disponibles : {epics_content} (chargement sélectif pour cette epic), {architecture_content}, {prd_content}, {document_project_content}</note>
</step>

<step n="2" goal="Analyse approfondie de la Story - Extraire les leçons de l'implémentation">

<output>
Bob (Scrum Master) : "Avant de commencer la discussion d'équipe, laissez-moi passer en revue tous les enregistrements de stories pour faire émerger les thèmes clés. Cela nous aidera à avoir une conversation plus riche."

Charlie (Senior Dev) : "Bonne idée - ces notes de dév contiennent toujours des pépites."
</output>

<action>Pour chaque story de l'epic {{epic_number}}, lire le fichier de story complet depuis {implementation_artifacts}/{{epic_number}}-{{story_num}}-\*.md</action>

<action>Extraire et analyser de chaque story :</action>

**Notes de Dév et Difficultés :**

- Chercher les sections comme "## Dev Notes", "## Implementation Notes", "## Challenges", "## Development Log"
- Identifier où les développeurs ont peiné ou fait des erreurs
- Noter la complexité inattendue ou les pièges découverts
- Enregistrer les décisions techniques qui n'ont pas fonctionné comme prévu
- Suivre les cas où les estimations étaient très éloignées (trop hautes ou trop basses)

**Modèles de retours de revue (Review Feedback) :**

- Chercher les sections "## Review", "## Code Review", "## SM Review", "## Scrum Master Review"
- Identifier les thèmes récurrents des retours à travers les stories
- Noter quels types de problèmes sont revenus à plusieurs reprises
- Suivre les préoccupations de qualité ou les désalignements architecturaux
- Documenter les félicitations ou le travail exemplaire soulignés lors des revues

**Leçons Apprises :**

- Chercher les sections "## Lessons Learned", "## Retrospective Notes", "## Takeaways" dans les stories
- Extraire les leçons explicites documentées pendant le développement
- Identifier les "moments eurêka" ou les percées
- Noter ce qui serait fait différemment
- Suivre les expériences ou approches réussies

**Dette Technique Contractée :**

- Chercher les sections "## Technical Debt", "## TODO", "## Known Issues", "## Future Work"
- Documenter les raccourcis pris et pourquoi
- Suivre les éléments de dette qui affectent l'epic suivante
- Noter la sévérité et la priorité des éléments de dette

**Insights sur les Tests et la Qualité :**

- Chercher les sections "## Testing", "## QA Notes", "## Test Results"
- Noter les défis ou les surprises lors des tests
- Suivre les modèles de bugs ou les problèmes de régression
- Documenter les lacunes de couverture de tests

<action>Synthétiser les modèles à travers toutes les stories :</action>

**Difficultés Communes :**

- Identifier les problèmes apparus dans au moins 2 stories (ex : "3 stories sur 5 ont eu des problèmes d'authentification d'API")
- Noter les domaines où l'équipe a systématiquement peiné
- Suivre les cas où la complexité a été sous-estimée

**Retours de Revue Récurrents :**

- Identifier les thèmes de retours (ex : "La gestion des erreurs a été signalée dans chaque revue")
- Noter les modèles de qualité (positifs et négatifs)
- Suivre les domaines où l'équipe s'est améliorée au cours de l'epic

**Moments de Percée :**

- Documenter les découvertes clés (ex : "La Story 3 a permis de découvrir le modèle de mise en cache que nous avons utilisé pour le reste de l'epic")
- Noter quand la vélocité de l'équipe s'est améliorée de manière spectaculaire
- Suivre les solutions innovantes valant la peine d'être répétées

**Modèles de Vélocité :**

- Calculer le temps de complétion moyen par story
- Noter les tendances de vélocité (ex : "Les 2 premières stories ont pris 3 fois plus de temps que prévu")
- Identifier quels types de stories sont allés plus vite ou plus lentement

**Points Forts de la Collaboration d'Équipe :**

- Noter les moments d'excellente collaboration mentionnés dans les stories
- Suivre les cas où le pair programming ou le mob programming a été efficace
- Documenter les sessions de résolution de problèmes efficaces

<action>Stocker cette synthèse - ces modèles guideront la discussion de la rétrospective</action>

<output>
Bob (Scrum Master) : "D'accord, j'ai passé en revue les {{total_stories}} enregistrements de stories. J'ai trouvé des modèles vraiment intéressants dont nous devrions discuter."

Dana (Ingénieure QA) : "Je suis curieuse de voir ce que tu as trouvé, Bob. J'ai remarqué certaines choses lors de mes tests aussi."

Bob (Scrum Master) : "Nous y viendrons. Mais d'abord, laissez-moi charger la rétro de l'epic précédente pour voir si nous avons tiré les leçons de la dernière fois."
</output>

</step>

<step n="3" goal="Charger et intégrer la rétrospective de l'Epic précédente">

<action>Calculer le numéro de l'epic précédente : {{prev_epic_num}} = {{epic_number}} - 1</action>

<check if="{{prev_epic_num}} >= 1">
  <action>Rechercher les rétrospectives précédentes avec le modèle : {implementation_artifacts}/epic-{{prev_epic_num}}-retro-*.md</action>

  <check if="des rétrospectives précédentes ont été trouvées">
    <output>
Bob (Scrum Master) : "J'ai trouvé nos rétrospectives de l'Epic {{prev_epic_num}}. Voyons ce que nous nous étions engagés à faire à l'époque..."
    </output>

    <action>Lire les rétrospectives précédentes</action>

    <action>Extraire les éléments clés :</action>
    - **Actions engagées** : Qu'est-ce que l'équipe avait accepté d'améliorer ?
    - **Leçons apprises** : Quelles connaissances ont été capturées ?
    - **Améliorations de processus** : Quels changements ont été convenus ?
    - **Dette technique signalée** : Quelle dette a été documentée ?
    - **Accords d'équipe** : Quels engagements ont été pris ?
    - **Tâches de préparation** : Qu'est-ce qui était nécessaire pour cette epic ?

    <action>Croiser avec l'exécution de l'epic actuelle :</action>

    **Suivi des Actions :**
    - Pour chaque action de la rétro de l'Epic {{prev_epic_num}}, vérifier si elle a été réalisée
    - Chercher des preuves dans les enregistrements de stories de l'epic actuelle
    - Marquer chaque action : ✅ Terminée, ⏳ En cours, ❌ Non traitée

    **Leçons Appliquées :**
    - Pour chaque leçon de l'Epic {{prev_epic_num}}, vérifier si l'équipe l'a appliquée dans l'Epic {{epic_number}}
    - Chercher des preuves dans les notes de dév, les retours de revue ou les résultats
    - Documenter les succès et les opportunités manquées

    **Efficacité des Améliorations de Processus :**
    - Pour chaque changement de processus convenu dans l'Epic {{prev_epic_num}}, évaluer s'il a aidé
    - Le changement a-t-il amélioré la vélocité, la qualité ou la satisfaction de l'équipe ?
    - Devons-nous le conserver, le modifier ou l'abandonner ?

    **Statut de la Dette Technique :**
    - Pour chaque élément de dette de l'Epic {{prev_epic_num}}, vérifier s'il a été traité
    - La dette non traitée a-t-elle causé des problèmes dans l'Epic {{epic_number}} ?
    - La dette a-t-elle augmenté ou diminué ?

    <action>Préparer des "insights de continuité" pour la discussion de la rétrospective</action>

    <action>Identifier les victoires où les leçons précédentes ont été appliquées avec succès :</action>
    - Documenter des exemples spécifiques d'apprentissages appliqués
    - Noter l'impact positif sur les résultats de l'Epic {{epic_number}}
    - Célébrer la croissance et l'amélioration de l'équipe

    <action>Identifier les opportunités manquées où les leçons précédentes ont été ignorées :</action>
    - Documenter les cas où l'équipe a répété les erreurs précédentes
    - Noter l'impact de la non-application des leçons (sans blâme)
    - Explorer les barrières qui ont empêché l'application

    <output>

Bob (Scrum Master) : "Intéressant... lors de la rétro de l'Epic {{prev_epic_num}}, nous nous étions engagés sur {{action_count}} actions."

Alice (Product Owner) : "Comment nous en sommes-nous sortis, Bob ?"

Bob (Scrum Master) : "Nous en avons terminé {{completed_count}}, progressé sur {{in_progress_count}}, mais {{not_addressed_count}} n'ont pas été traitées."

Charlie (Senior Dev) : _l'air préoccupé_ "Lesquelles n'avons-nous pas traitées ?"

Bob (Scrum Master) : "Nous en discuterons lors de la rétro. Certaines d'entre elles pourraient expliquer des défis que nous avons rencontrés durant cette epic."

Elena (Junior Dev) : "C'est... en fait assez révélateur."

Bob (Scrum Master) : "C'est pour ça que nous suivons ces choses. La reconnaissance de modèles nous aide à nous améliorer."
</output>

  </check>

  <check if="aucune rétro précédente trouvée">
    <output>
Bob (Scrum Master) : "Je ne vois pas de rétrospective pour l'Epic {{prev_epic_num}}. Soit nous l'avons sautée, soit c'est votre première rétro."

Alice (Product Owner) : "C'est probablement notre première. C'est le bon moment pour prendre cette habitude !"
</output>
<action>Définir {{first_retrospective}} = true</action>
</check>
</check>

<check if="{{prev_epic_num}} < 1">
  <output>
Bob (Scrum Master) : "C'est l'Epic 1, donc naturellement il n'y a pas de rétro précédente à laquelle se référer. Nous repartons à zéro !"

Charlie (Senior Dev) : "Première epic, première rétro. Faisons en sorte qu'elle compte."
</output>
<action>Définir {{first_retrospective}} = true</action>
</check>

</step>

<step n="4" goal="Aperçu de l'Epic Suivante avec Détection de changement">

<action>Calculer le numéro de l'epic suivante : {{next_epic_num}} = {{epic_number}} + 1</action>

<output>
Bob (Scrum Master) : "Avant de plonger dans la discussion, laissez-moi jeter un coup d'œil rapide à l'Epic {{next_epic_num}} pour comprendre ce qui arrive."

Alice (Product Owner) : "Bonne idée - cela nous aide à relier ce que nous avons appris à ce que nous sommes sur le point de faire."
</output>

<action>Tenter de charger l'epic suivante en utilisant la stratégie de chargement sélectif :</action>

**Essayer d'abord la version partitionnée (sharded) (plus spécifique) :**
<action>Vérifier si le fichier existe : {planning_artifacts}/epic\*/epic-{{next_epic_num}}.md</action>

<check if="le fichier d'epic partitionné est trouvé">
  <action>Charger {planning_artifacts}/*epic*/epic-{{next_epic_num}}.md</action>
  <action>Définir {{next_epic_source}} = "sharded"</action>
</check>

**Repli sur le document entier :**
<check if="l'epic partitionnée n'est pas trouvée">
<action>Vérifier si le fichier existe : {planning_artifacts}/epic\*.md</action>

  <check if="le fichier d'epic complet est trouvé">
    <action>Charger le document d'epics complet</action>
    <action>Extraire la section de l'Epic {{next_epic_num}}</action>
    <action>Définir {{next_epic_source}} = "whole"</action>
  </check>
</check>

<check if="l'epic suivante est trouvée">
  <action>Analyser l'epic suivante pour :</action>
  - Titre et objectifs de l'epic
  - Stories planifiées et estimations de complexité
  - Dépendances vis-à-vis du travail de l'Epic {{epic_number}}
  - Nouvelles exigences techniques ou capacités nécessaires
  - Risques potentiels ou inconnues
  - Objectifs métier et critères de succès

<action>Identifier les dépendances vis-à-vis du travail terminé :</action>

- Sur quels composants de l'Epic {{epic_number}} l'Epic {{next_epic_num}} s'appuie-t-elle ?
- Tous les prérequis sont-ils terminés et stables ?
- Y a-t-il du travail incomplet qui crée des dépendances bloquantes ?

<action>Noter les lacunes potentielles ou la préparation nécessaire :</action>

- Configuration technique requise (infrastructure, outils, bibliothèques)
- Lacunes de connaissances à combler (recherche, formation, spikes)
- Refactorisation nécessaire avant de commencer l'epic suivante
- Documentation ou spécifications à créer

<action>Vérifier les prérequis techniques :</action>

- API ou intégrations qui doivent être prêtes
- Migrations de données ou changements de schéma nécessaires
- Exigences en matière d'infrastructure de test
- Configuration du déploiement ou de l'environnement

  <output>
Bob (Scrum Master) : "Très bien, j'ai passé en revue l'Epic {{next_epic_num}} : '{{next_epic_title}}'"

Alice (Product Owner) : "À quoi sommes-nous confrontés ?"

Bob (Scrum Master) : "{{next_epic_num}} stories planifiées, s'appuyant sur la {{dependency_description}} de l'Epic {{epic_number}}."

Charlie (Senior Dev) : "Les dépendances m'inquiètent. Avons-nous fini tout ce dont nous avons besoin pour ça ?"

Bob (Scrum Master) : "Bonne question - c'est exactement ce que nous devons explorer lors de cette rétro."
</output>

<action>Définir {{next_epic_exists}} = true</action>
</check>

<check if="l'epic suivante n'est PAS trouvée">
  <output>
Bob (Scrum Master) : "Hmm, je ne vois pas d'Epic {{next_epic_num}} encore définie."

Alice (Product Owner) : "Nous sommes peut-être à la fin de la feuille de route, ou nous n'avons pas encore planifié aussi loin."

Bob (Scrum Master) : "Pas de souci. Nous allons quand même faire une rétro approfondie sur l'Epic {{epic_number}}. Les leçons seront précieuses dès que nous planifierons la suite du travail."
</output>

<action>Définir {{next_epic_exists}} = false</action>
</check>

</step>

<step n="5" goal="Initialiser la rétrospective avec un contexte riche">

<action>Charger les configurations d'agents depuis {agent_manifest}</action>
<action>Identifier quels agents ont participé à l'Epic {{epic_number}} sur la base des enregistrements de stories</action>
<action>S'assurer que les rôles clés sont présents : Product Owner, Scrum Master (facilitant), Développeurs, Test/QA, Architecte</action>

<output>
Bob (Scrum Master) : "Très bien l'équipe, tout le monde est là. Laissez-moi planter le décor pour notre rétrospective."

═══════════════════════════════════════════════════════════
🔄 RÉTROSPECTIVE D'ÉQUIPE - Epic {{epic_number}} : {{epic_title}}
═══════════════════════════════════════════════════════════

Bob (Scrum Master) : "Voici ce que nous avons accompli ensemble."

**RÉSUMÉ DE L'EPIC {{epic_number}} :**

Mesures de livraison :

- Terminées : {{completed_stories}}/{{total_stories}} stories ({{completion_percentage}}%)
- Vélocité : {{actual_points}} points de story{{#if planned_points}} (prévu : {{planned_points}}){{/if}}
- Durée : {{actual_sprints}} sprints{{#if planned_sprints}} (prévu : {{planned_sprints}}){{/if}}
- Vélocité moyenne : {{points_per_sprint}} points/sprint

Qualité et Technique :

- Bloqueurs rencontrés : {{blocker_count}}
- Éléments de dette technique : {{debt_count}}
- Couverture de test : {{coverage_info}}
- Incidents en production : {{incident_count}}

Résultats métier :

- Objectifs atteints : {{goals_met}}/{{total_goals}}
- Critères de succès : {{criteria_status}}
- Retours des parties prenantes : {{feedback_summary}}

Alice (Product Owner) : "Ces chiffres racontent une belle histoire. Un taux de complétion de {{completion_percentage}}%, c'est {{#if completion_percentage >= 90}}excellent{{else}}quelque chose dont nous devrions discuter{{/if}}."

Charlie (Senior Dev) : "Je m'intéresse davantage au chiffre de la dette technique - {{debt_count}} éléments, c'est {{#if debt_count > 10}}préoccupant{{else}}gérable{{/if}}."

Dana (Ingénieure QA) : "{{incident_count}} incidents en production - {{#if incident_count == 0}}une epic propre !{{else}}nous devrions en parler{{/if}}."

{{#if next_epic_exists}}
═══════════════════════════════════════════════════════════
**APERÇU DE L'EPIC SUIVANTE :** Epic {{next_epic_num}} : {{next_epic_title}}
═══════════════════════════════════════════════════════════

Dépendances vis-à-vis de l'Epic {{epic_number}} :
{{list_dependencies}}

Préparation nécessaire :
{{list_preparation_gaps}}

Prérequis techniques :
{{list_technical_prereqs}}

Bob (Scrum Master) : "Et voici ce qui arrive ensuite. L'Epic {{next_epic_num}} s'appuie sur ce que nous venons de terminer."

Elena (Junior Dev) : "Waouh, ça fait beaucoup de dépendances vis-à-vis de notre travail."

Charlie (Senior Dev) : "Ce qui veut dire que nous avons intérêt à nous assurer que l'Epic {{epic_number}} est vraiment solide avant de passer à la suite."
{{/if}}

═══════════════════════════════════════════════════════════

Bob (Scrum Master) : "Équipe réunie pour cette rétrospective :"

{{list_participating_agents}}

Bob (Scrum Master) : "{user_name}, vous vous joignez à nous en tant que Responsable de Projet. Votre perspective est cruciale ici."

{user_name} (Responsable de Projet) : [Participe à la rétrospective]

Bob (Scrum Master) : "Notre focus aujourd'hui :"

1. Apprendre de l'exécution de l'Epic {{epic_number}}
   {{#if next_epic_exists}}2. Préparer le succès de l'Epic {{next_epic_num}}{{/if}}

Bob (Scrum Master) : "Règles de base : la sécurité psychologique d'abord. Pas de blâme, pas de jugement. Nous nous concentrons sur les systèmes et les processus, pas sur les individus. La voix de chacun compte. Les exemples spécifiques valent mieux que les généralités."

Alice (Product Owner) : "Et tout ce qui est partagé ici reste dans cette pièce - à moins que nous ne décidions ensemble de faire remonter quelque chose."

Bob (Scrum Master) : "Exactement. {user_name}, des questions avant de plonger ?"
</output>

<action>ATTENDRE que {user_name} réponde ou indique qu'il est prêt</action>

</step>

<step n="6" goal="Discussion sur la revue de l'Epic - Ce qui a bien fonctionné, ce qui a moins bien fonctionné">

<output>
Bob (Scrum Master) : "Commençons par le positif. Qu'est-ce qui a bien fonctionné dans l'Epic {{epic_number}} ?"

Bob (Scrum Master) : _fait une pause, laissant de l'espace_

Alice (Product Owner) : "Je commence. Le flux d'authentification utilisateur que nous avons livré a dépassé mes attentes. L'UX est fluide, et les premiers retours des utilisateurs sont vraiment positifs."

Charlie (Senior Dev) : "J'ajouterai à cela que la stratégie de mise en cache que nous avons implémentée dans la Story {{breakthrough_story_num}} a changé la donne. Nous avons réduit les appels API de 60 % et cela a défini le modèle pour le reste de l'epic."

Dana (Ingénieure QA) : "De mon côté, les tests se sont déroulés plus sereinement que d'habitude. La documentation de l'équipe de dév a été bien meilleure pour cette epic - des plans de test réellement exploitables !"

Elena (Junior Dev) : _souriante_ "C'est parce que Charlie m'a obligée à tout documenter après la revue de code de la Story 1 !"

Charlie (Senior Dev) : _riant_ "La fermeté finit par payer."
</output>

<action>Bob (Scrum Master) se tourne naturellement vers {user_name} pour l'impliquer dans la discussion</action>

<output>
Bob (Scrum Master) : "{user_name}, qu'est-ce qui vous a semblé particulièrement réussi dans cette epic ?"
</output>

<action>ATTENDRE que {user_name} réponde - c'est un moment CLÉ D'INTERACTION UTILISATEUR</action>

<action>Après la réponse de {user_name}, faire réagir 1 ou 2 membres de l'équipe ou les faire rebondir sur ce que {user_name} a partagé</action>

<output>
Alice (Product Owner) : [Répond naturellement à ce que {user_name} a dit, soit en approuvant, en ajoutant du contexte ou en proposant une perspective différente]

Charlie (Senior Dev) : [Rebondit sur la discussion, peut-être en ajoutant des détails techniques ou en se référant à des stories spécifiques]
</output>

<action>Continuer à faciliter un dialogue naturel, en ramenant périodiquement {user_name} dans la conversation</action>

<action>Après avoir couvert les succès, guider la transition vers les défis avec soin</action>

<output>
Bob (Scrum Master) : "D'accord, nous avons célébré de belles victoires. Maintenant, parlons des défis - où avons-nous buté ? Qu'est-ce qui nous a ralentis ?"

Bob (Scrum Master) : _crée un espace sécurisant par le ton et le rythme_

Elena (Junior Dev) : _hésite_ "Eh bien... j'ai vraiment eu du mal avec les migrations de base de données dans la Story {{difficult_story_num}}. La documentation n'était pas claire, et j'ai dû m'y reprendre à trois fois. J'ai perdu presque un sprint entier sur cette story à elle seule."

Charlie (Senior Dev) : _sur la défensive_ "Attends une minute - c'est moi qui ai écrit ces docs de migration, et elles étaient parfaitement claires. Le problème, c'est que les exigences n'arrêtaient pas de changer en milieu de story !"

Alice (Product Owner) : _frustrée_ "Ce n'est pas juste, Charlie. Nous n'avons clarifié les exigences qu'une seule fois, et c'était parce que l'équipe technique n'avait pas posé les bonnes questions lors de la planification !"

Charlie (Senior Dev) : _le ton monte_ "Nous en avons posé plein, des questions ! Tu as dit que le schéma était finalisé, et deux jours après le début du dév, tu voulais ajouter trois nouveaux champs !"

Bob (Scrum Master) : _intervenant calmement_ "Prenons une grande inspiration. C'est exactement le genre de choses que nous devons analyser."

Bob (Scrum Master) : "Elena, tu as passé presque un sprint entier sur la Story {{difficult_story_num}}. Charlie, tu dis que les exigences ont changé. Alice, tu as le sentiment que les bonnes questions n'ont pas été posées au départ."

Bob (Scrum Master) : "{user_name}, vous avez une visibilité sur l'ensemble du projet. Quel est votre avis sur cette situation ?"
</output>

<action>ATTENDRE que {user_name} réponde et aide à faciliter la résolution du conflit</action>

<action>Utiliser la réponse de {user_name} pour guider la discussion vers une compréhension systémique plutôt que vers le blâme</action>

<output>
Bob (Scrum Master) : [Synthétise l'apport de {user_name} avec ce que l'équipe a partagé] "Il semble donc que le problème central était {{root_cause_based_on_discussion}}, et non la faute d'une personne en particulier."

Elena (Junior Dev) : "C'est logique. Si nous avions eu {{preventive_measure}}, j'aurais probablement pu éviter ces recommencements."

Charlie (Senior Dev) : _s'adoucissant_ "Oui, et j'aurais pu être plus explicite sur les hypothèses dans les docs. Désolé d'être monté sur mes grands chevaux, Alice."

Alice (Product Owner) : "J'apprécie cela. J'aurais pu être plus proactive pour signaler les ajouts au schéma plus tôt, moi aussi."

Bob (Scrum Master) : "C'est bien. Nous identifions des améliorations systémiques, pas des coupables."
</output>

<action>Continuer la discussion, en y intégrant les modèles découverts lors de l'analyse approfondie des stories (Étape 2)</action>

<output>
Bob (Scrum Master) : "En parlant de modèles, j'ai remarqué quelque chose en passant en revue tous les enregistrements de stories..."

Bob (Scrum Master) : "{{pattern_1_description}} - cela est apparu dans {{pattern_1_count}} stories sur {{total_stories}}."

Dana (Ingénieure QA) : "Oh waouh, je ne savais pas que c'était aussi répandu."

Bob (Scrum Master) : "Oui. Et il y a plus - {{pattern_2_description}} est revenu dans presque chaque revue de code."

Charlie (Senior Dev) : "C'est... en fait assez embarrassant. Nous aurions dû repérer ce modèle plus tôt."

Bob (Scrum Master) : "Aucune honte à avoir, Charlie. Maintenant nous le savons, et nous pouvons nous améliorer. {user_name}, aviez-vous remarqué ces modèles durant l'epic ?"
</output>

<action>ATTENDRE que {user_name} partage ses observations</action>

<action>Continuer la discussion de la rétrospective, en créant des moments où :</action>

- Les membres de l'équipe posent des questions directement à {user_name}
- L'apport de {user_name} change la direction de la discussion
- Des désaccords surgissent naturellement et sont résolus
- Les membres plus discrets de l'équipe sont invités à contribuer
- Des stories spécifiques sont référencées avec des exemples réels
- Les émotions sont authentiques (frustration, fierté, inquiétude, espoir)

<check if="une rétrospective précédente existe">
  <output>
Bob (Scrum Master) : "Avant de passer à la suite, je veux revenir sur la rétrospective de l'Epic {{prev_epic_num}}."

Bob (Scrum Master) : "Nous avons pris des engagements lors de cette rétro. Voyons comment nous nous en sommes sortis."

Bob (Scrum Master) : "Action 1 : {{prev_action_1}}. Statut : {{prev_action_1_status}}"

Alice (Product Owner) : {{#if prev_action_1_status == "completed"}}"On a assuré sur ce coup-là !"{{else}}"On... on ne l'a pas fait, celle-là."{{/if}}

Charlie (Senior Dev) : {{#if prev_action_1_status == "completed"}}"Et ça a aidé ! J'ai remarqué {{evidence_of_impact}}"{{else}}"Oui, et je pense que c'est pour ça que nous avons eu {{consequence_of_not_doing_it}} dans cette epic."{{/if}}

Bob (Scrum Master) : "Action 2 : {{prev_action_2}}. Statut : {{prev_action_2_status}}"

Dana (Ingénieure QA) : {{#if prev_action_2_status == "completed"}}"Celle-ci a rendu les tests beaucoup plus faciles cette fois."{{else}}"Si nous l'avions fait, je pense que les tests auraient été plus rapides."{{/if}}

Bob (Scrum Master) : "{user_name}, en regardant ce sur quoi nous nous étions engagés la dernière fois et ce que nous avons réellement fait - quelle est votre réaction ?"
</output>

<action>ATTENDRE que {user_name} réponde</action>

<action>Utiliser le suivi de la rétro précédente comme un moment d'apprentissage sur l'engagement et la responsabilité</action>
</check>

<output>
Bob (Scrum Master) : "Très bien, nous avons couvert beaucoup de terrain. Laissez-moi résumer ce que j'entends..."

Bob (Scrum Master) : "**Succès :**"
{{list_success_themes}}

Bob (Scrum Master) : "**Défis :**"
{{list_challenge_themes}}

Bob (Scrum Master) : "**Insights clés :**"
{{list_insight_themes}}

Bob (Scrum Master) : "Cela résume bien les choses ? Est-ce que quelqu'un a quelque chose d'important à ajouter ?"
</output>

<action>Permettre aux membres de l'équipe d'ajouter leurs dernières pensées sur la revue de l'epic</action>
<action>S'assurer que {user_name} a l'opportunité d'ajouter sa perspective</action>

</step>

<step n="7" goal="Discussion sur la préparation de l'Epic Suivante - Interactive et Collaborative">

<check if="{{next_epic_exists}} == false">
  <output>
Bob (Scrum Master) : "Normalement, nous discuterions de la préparation de l'epic suivante, mais comme l'Epic {{next_epic_num}} n'est pas encore définie, passons directement aux actions à entreprendre."
  </output>
  <action>Sauter à l'Étape 8</action>
</check>

<output>
Bob (Scrum Master) : "Passons maintenant à la suite. L'Epic {{next_epic_num}} arrive : '{{next_epic_title}}'"

Bob (Scrum Master) : "La question est : sommes-nous prêts ? Que devons-nous préparer ?"

Alice (Product Owner) : "De mon point de vue, nous devons nous assurer que {{dependency_concern_1}} de l'Epic {{epic_number}} est solide avant de commencer à construire par-dessus."

Charlie (Senior Dev) : _inquiet_ "Je suis préoccupé par {{technical_concern_1}}. Nous avons {{technical_debt_item}} de cette epic qui va nous exploser à la figure si nous ne le traitons pas avant l'Epic {{next_epic_num}}."

Dana (Ingénieure QA) : "Et j'ai besoin que {{testing_infrastructure_need}} soit en place, sinon nous allons avoir le même goulot d'étranglement lors des tests que nous avons eu dans la Story {{bottleneck_story_num}}."

Elena (Junior Dev) : "Je m'inquiète moins pour l'infrastructure que pour les connaissances. Je ne comprends pas assez bien {{knowledge_gap}} pour travailler sur les stories de l'Epic {{next_epic_num}}."

Bob (Scrum Master) : "{user_name}, l'équipe soulève de réelles inquiétudes ici. Quel est votre sentiment sur notre état de préparation ?"
</output>

<action>ATTENDRE que {user_name} partage son évaluation</action>

<action>Utiliser l'apport de {user_name} pour guider une exploration plus approfondie des besoins de préparation</action>

<output>
Alice (Product Owner) : [Réagit à ce que {user_name} a dit] "Je suis d'accord avec {user_name} sur {{point_of_agreement}}, mais je suis toujours inquiète pour {{lingering_concern}}."

Charlie (Senior Dev) : "Voici ce dont je pense que nous avons besoin techniquement avant que l'Epic {{next_epic_num}} puisse commencer..."

Charlie (Senior Dev) : "1. {{tech_prep_item_1}} - estimé à {{hours_1}} heures"
Charlie (Senior Dev) : "2. {{tech_prep_item_2}} - estimé à {{hours_2}} heures"
Charlie (Senior Dev) : "3. {{tech_prep_item_3}} - estimé à {{hours_3}} heures"

Elena (Junior Dev) : "Ça fait {{total_hours}} heures ! C'est un sprint entier de travail de préparation !"

Charlie (Senior Dev) : "Exactement. On ne peut pas simplement sauter dans l'Epic {{next_epic_num}} lundi matin."

Alice (Product Owner) : _frustrée_ "Mais nous avons une pression des parties prenantes pour continuer à livrer des fonctionnalités. Ils ne vont pas apprécier un 'sprint de préparation'."

Bob (Scrum Master) : "Voyons les choses différemment. Que se passe-t-il si nous NE FAISONS PAS ce travail de préparation ?"

Dana (Ingénieure QA) : "Nous allons rencontrer des bloqueurs au milieu de l'Epic {{next_epic_num}}, la vélocité va s'effondrer, et nous livrerons en retard de toute façon."

Charlie (Senior Dev) : "Pire - nous livrerons quelque chose de construit sur {{technical_concern_1}}, et ce sera fragile."

Bob (Scrum Master) : "{user_name}, vous équilibrez la pression des parties prenantes et la réalité technique. Comment voulez-vous gérer cela ?"
</output>

<action>ATTENDRE que {user_name} fournisse une direction sur l'approche de la préparation</action>

<action>Créer un espace pour le débat et le désaccord sur les priorités</action>

<output>
Alice (Product Owner) : [Peut exprimer son désaccord avec l'approche de {user_name}] "Je comprends ce que vous dites, {user_name}, mais d'un point de vue métier, {{business_concern}}."

Charlie (Senior Dev) : [Peut soutenir ou contester le point de vue d'Alice] "Le point de vue métier est valable, mais {{technical_counter_argument}}."

Bob (Scrum Master) : "Il y a une tension saine ici entre les besoins métier et la réalité technique. C'est bien - cela montre que nous sommes honnêtes."

Bob (Scrum Master) : "Explorons un terrain d'entente. Charlie, lesquels de vos éléments de préparation sont absolument critiques par rapport à ceux qui sont 'plus-que-bienvenus' ?"

Charlie (Senior Dev) : "{{critical_prep_item_1}} et {{critical_prep_item_2}} ne sont pas négociables. {{nice_to_have_prep_item}} peut attendre."

Alice (Product Owner) : "Et est-ce qu'une partie de la préparation critique peut se faire en parallèle du lancement de l'Epic {{next_epic_num}} ?"

Charlie (Senior Dev) : _réfléchissant_ "Peut-être. Si nous nous attaquons à {{first_critical_item}} avant le début de l'epic, nous pourrions faire {{second_critical_item}} durant le premier sprint."

Dana (Ingénieure QA) : "Mais cela signifie que la Story 1 de l'Epic {{next_epic_num}} ne peut pas dépendre de {{second_critical_item}}."

Alice (Product Owner) : _regardant le plan de l'epic_ "En fait, les Stories 1 et 2 concernent {{independent_work}}, donc elles n'en dépendent pas. Nous pourrions faire fonctionner ça."

Bob (Scrum Master) : "{user_name}, l'équipe trouve un compromis viable ici. Est-ce que cette approche vous convient ?"
</output>

<action>ATTENDRE que {user_name} valide ou ajuste la stratégie de préparation</action>

<action>Continuer à travailler sur les besoins de préparation dans toutes les dimensions :</action>

- Dépendances vis-à-vis du travail de l'Epic {{epic_number}}
- Configuration technique et infrastructure
- Lacunes de connaissances et besoins de recherche
- Travail de documentation ou de spécification
- Infrastructure de test
- Refactorisation ou réduction de la dette
- Dépendances externes (API, intégrations, etc.)

<action>Pour chaque domaine de préparation, faciliter une discussion d'équipe qui :</action>

- Identifie des besoins spécifiques avec des exemples concrets
- Estime l'effort de manière réaliste sur la base de l'expérience de l'Epic {{epic_number}}
- Assigne la responsabilité à des agents spécifiques
- Détermine la criticité et le calendrier
- Fait émerger les risques de NE PAS faire la préparation
- Explore les opportunités de travail en parallèle
- Implique {user_name} pour les décisions clés

<output>
Bob (Scrum Master) : "J'ai une vision claire de ce dont nous avons besoin avant l'Epic {{next_epic_num}}. Laissez-moi résumer..."

**PRÉPARATION CRITIQUE (Doit être terminée avant le début de l'epic) :**
{{list_critical_prep_items_with_owners_and_estimates}}

**PRÉPARATION EN PARALLÈLE (Peut se faire durant les premières stories) :**
{{list_parallel_prep_items_with_owners_and_estimates}}

**PRÉPARATION SOUHAITABLE (Aiderait mais n'est pas bloquante) :**
{{list_nice_to_have_prep_items}}

Bob (Scrum Master) : "Effort total de préparation critique : {{critical_hours}} heures ({{critical_days}} jours)"

Alice (Product Owner) : "C'est gérable. Nous pouvons communiquer cela aux parties prenantes."

Bob (Scrum Master) : "{user_name}, est-ce que ce plan de préparation vous convient ?"
</output>

<action>ATTENDRE la validation finale de {user_name} sur le plan de préparation</action>

</step>

<step n="8" goal="Synthétiser les actions à entreprendre avec détection de changements significatifs">

<output>
Bob (Scrum Master) : "Capturons des actions concrètes à partir de tout ce dont nous avons discuté."

Bob (Scrum Master) : "Je veux des actions spécifiques et réalisables, avec des responsables clairs. Pas d'aspirations vagues."
</output>

<action>Synthétiser les thèmes de la discussion de revue de l'Epic {{epic_number}} en améliorations exploitables</action>

<action>Créer des actions spécifiques avec :</action>

- Description claire de l'action
- Responsable assigné (agent ou rôle spécifique)
- Échéancier ou date limite
- Critères de succès (comment saurons-nous que c'est fait)
- Catégorie (processus, technique, documentation, équipe, etc.)

<action>S'assurer que les actions sont SMART :</action>

- Spécifiques : Claires et sans ambiguïté
- Mesurables : On peut vérifier la complétude
- Atteignables : Réalistes compte tenu des contraintes
- Pertinentes : Répondent aux vrais problèmes de la rétro
- Temporellement définies : Ont une échéance claire

<output>
Bob (Scrum Master) : "Sur la base de notre discussion, voici les actions que je propose..."

═══════════════════════════════════════════════════════════
📝 ACTIONS DE L'EPIC {{epic_number}} :
═══════════════════════════════════════════════════════════

**Améliorations de Processus :**

1. {{action_item_1}}
   Responsable : {{agent_1}}
   Échéance : {{timeline_1}}
   Critères de succès : {{criteria_1}}

2. {{action_item_2}}
   Responsable : {{agent_2}}
   Échéance : {{timeline_2}}
   Critères de succès : {{criteria_2}}

Charlie (Senior Dev) : "Je peux prendre la responsabilité de l'action 1, mais l'échéance {{timeline_1}} est serrée. Est-ce qu'on peut la repousser à {{alternative_timeline}} ?"

Bob (Scrum Master) : "Qu'en pensent les autres ? Est-ce que ce nouveau délai convient toujours ?"

Alice (Product Owner) : "{{alternative_timeline}} me convient, tant que c'est fait avant le début de l'Epic {{next_epic_num}}."

Bob (Scrum Master) : "D'accord. Mis à jour pour {{alternative_timeline}}."

**Dette Technique :**

1. {{debt_item_1}}
   Responsable : {{agent_3}}
   Priorité : {{priority_1}}
   Effort estimé : {{effort_1}}

2. {{debt_item_2}}
   Responsable : {{agent_4}}
   Priorité : {{priority_2}}
   Effort estimé : {{effort_2}}

Dana (Ingénieure QA) : "Pour l'élément de dette 1, pouvons-nous lui donner une priorité haute ? Il a causé des problèmes de tests dans trois stories différentes."

Charlie (Senior Dev) : "Je l'avais marqué en moyen parce que {{reasoning}}, mais je comprends ton point de vue."

Bob (Scrum Master) : "{user_name}, c'est une décision de priorité. Impact sur les tests vs {{reasoning}} - comment voulez-vous le prioriser ?"
</output>

<action>ATTENDRE que {user_name} aide à résoudre les discussions de priorité</action>

<output>
**Documentation :**
1. {{doc_need_1}}
   Responsable : {{agent_5}}
   Échéance : {{timeline_3}}

2. {{doc_need_2}}
   Responsable : {{agent_6}}
   Échéance : {{timeline_4}}

**Accords d'Équipe :**

- {{agreement_1}}
- {{agreement_2}}
- {{agreement_3}}

Bob (Scrum Master) : "Ces accords sont la manière dont nous nous engageons à travailler différemment à l'avenir."

Elena (Junior Dev) : "J'aime bien l'accord 2 - cela m'aurait évité bien des soucis sur la Story {{difficult_story_num}}."

═══════════════════════════════════════════════════════════
🚀 TÂCHES DE PRÉPARATION POUR L'EPIC {{next_epic_num}} :
═══════════════════════════════════════════════════════════

**Configuration Technique :**
[ ] {{setup_task_1}}
Responsable : {{owner_1}}
Estimation : {{est_1}}

[ ] {{setup_task_2}}
Responsable : {{owner_2}}
Estimation : {{est_2}}

**Développement des Connaissances :**
[ ] {{research_task_1}}
Responsable : {{owner_3}}
Estimation : {{est_3}}

**Nettoyage/Refactorisation :**
[ ] {{refactor_task_1}}
Responsable : {{owner_4}}
Estimation : {{est_4}}

**Effort total estimé :** {{total_hours}} heures ({{total_days}} jours)

═══════════════════════════════════════════════════════════
⚠️ CHEMIN CRITIQUE :
═══════════════════════════════════════════════════════════

**Bloqueurs à résoudre avant l'Epic {{next_epic_num}} :**

1. {{critical_item_1}}
   Responsable : {{critical_owner_1}}
   Doit être terminé d'ici : {{critical_deadline_1}}

2. {{critical_item_2}}
   Responsable : {{critical_owner_2}}
   Doit être terminé d'ici : {{critical_deadline_2}}
   </output>

<action>ANALYSE CRITIQUE - Détecter si les découvertes nécessitent des mises à jour de l'epic</action>

<action>Vérifier si l'un des points suivants est vrai sur la base de la discussion de rétrospective :</action>

- Les hypothèses architecturales de la planification se sont révélées fausses pendant l'Epic {{epic_number}}
- Des changements majeurs de périmètre ou des abandons de fonctionnalités ont eu lieu, affectant l'epic suivante
- L'approche technique nécessite un changement fondamental pour l'Epic {{next_epic_num}}
- Des dépendances ont été découvertes dont l'Epic {{next_epic_num}} ne tient pas compte
- Les besoins des utilisateurs sont significativement différents de ce qui était initialement compris
- Préoccupations de performance/scalabilité affectant la conception de l'Epic {{next_epic_num}}
- Problèmes de sécurité ou de conformité découverts changeant l'approche
- Hypothèses d'intégration révélées incorrectes
- Capacité de l'équipe ou lacunes de compétences plus sévères que prévu
- Niveau de dette technique insoutenable sans intervention

<check if="des découvertes significatives sont détectées">
  <output>

═══════════════════════════════════════════════════════════
🚨 ALERTE DE DÉCOUVERTE SIGNIFICATIVE 🚨
═══════════════════════════════════════════════════════════

Bob (Scrum Master) : "{user_name}, nous devons signaler quelque chose d'important."

Bob (Scrum Master) : "Durant l'Epic {{epic_number}}, l'équipe a fait des découvertes qui pourraient nécessiter de mettre à jour le plan de l'Epic {{next_epic_num}}."

**Changements significatifs identifiés :**

1. {{significant_change_1}}
   Impact : {{impact_description_1}}

2. {{significant_change_2}}
   Impact : {{impact_description_2}}

{{#if significant_change_3}} 3. {{significant_change_3}}
Impact : {{impact_description_3}}
{{/if}}

Charlie (Senior Dev) : "Oui, quand nous avons découvert {{technical_discovery}}, cela a fondamentalement changé notre compréhension de {{affected_area}}."

Alice (Product Owner) : "Et d'un point de vue produit, {{product_discovery}} signifie que les stories de l'Epic {{next_epic_num}} reposent sur de fausses hypothèses."

Dana (Ingénieure QA) : "Si nous commençons l'Epic {{next_epic_num}} en l'état, nous allons nous heurter à des murs rapidement."

**Impact sur l'Epic {{next_epic_num}} :**

Le plan actuel pour l'Epic {{next_epic_num}} suppose :

- {{wrong_assumption_1}}
- {{wrong_assumption_2}}

Mais l'Epic {{epic_number}} a révélé :

- {{actual_reality_1}}
- {{actual_reality_2}}

Cela signifie que l'Epic {{next_epic_num}} a probablement besoin de :
{{list_likely_changes_needed}}

**ACTIONS RECOMMANDÉES :**

1. Revoir et mettre à jour la définition de l'Epic {{next_epic_num}} sur la base des nouveaux apprentissages
2. Mettre à jour les stories affectées dans l'Epic {{next_epic_num}} pour refléter la réalité
3. Envisager de mettre à jour l'architecture ou les spécifications techniques si nécessaire
4. Tenir une session d'alignement avec le Product Owner avant de commencer l'Epic {{next_epic_num}}
   {{#if prd_update_needed}}5. Mettre à jour les sections du PRD affectées par la nouvelle compréhension{{/if}}

Bob (Scrum Master) : "**Mise à jour d'Epic requise** : OUI - Planifier une session de revue de planification d'epic"

Bob (Scrum Master) : "{user_name}, c'est significatif. Nous devons traiter cela avant de nous engager sur le plan actuel de l'Epic {{next_epic_num}}. Comment voulez-vous gérer cela ?"
</output>

<action>ATTENDRE que {user_name} décide de la manière de gérer les changements significatifs</action>

<action>Ajouter une session de revue d'epic au chemin critique si l'utilisateur est d'accord</action>

  <output>
Alice (Product Owner) : "Je suis d'accord avec l'approche de {user_name}. Mieux vaut ajuster le plan maintenant que d'échouer au milieu de l'epic."

Charlie (Senior Dev) : "C'est pour ça que les rétrospectives sont importantes. Nous avons repéré ça avant que ça ne devienne un désastre."

Bob (Scrum Master) : "Ajout au chemin critique : session de revue de planification de l'Epic {{next_epic_num}} avant le lancement de l'epic."
</output>
</check>

<check if="aucune découverte significative">
  <output>
Bob (Scrum Master) : "Bonne nouvelle - rien dans l'Epic {{epic_number}} ne change fondamentalement notre plan pour l'Epic {{next_epic_num}}. Le plan reste solide."

Alice (Product Owner) : "Nous avons beaucoup appris, mais la direction est la bonne."
</output>
</check>

<output>
Bob (Scrum Master) : "Laissez-moi vous montrer le plan d'action complet..."

Bob (Scrum Master) : "Cela fait {{total_action_count}} actions, {{prep_task_count}} tâches de préparation et {{critical_count}} éléments au chemin critique."

Bob (Scrum Master) : "Tout le monde est au clair sur ses responsabilités ?"
</output>

<action>Laisser à chaque agent ayant des tâches un moment pour confirmer sa responsabilité</action>

<action>S'assurer que {user_name} approuve le plan d'action complet</action>

</step>

<step n="9" goal="Exploration critique de l'état de préparation - Approfondissement interactif">

<output>
Bob (Scrum Master) : "Avant de conclure, je veux faire une dernière vérification de notre état de préparation."

Bob (Scrum Master) : "L'Epic {{epic_number}} est marquée comme terminée dans le compte rendu du sprint (sprint-status), mais est-elle VRAIMENT finie ?"

Alice (Product Owner) : "Qu'est-ce que tu veux dire par là, Bob ?"

Bob (Scrum Master) : "Je veux dire vraiment prête pour la production, les parties prenantes satisfaites, pas de fils qui dépassent et qui pourraient nous poser problème plus tard."

Bob (Scrum Master) : "{user_name}, parcourons cela ensemble."
</output>

<action>Explorer l'état des tests et de la qualité à travers une conversation naturelle</action>

<output>
Bob (Scrum Master) : "{user_name}, parlez-moi des tests pour l'Epic {{epic_number}}. Quelle vérification a été effectuée ?"
</output>

<action>ATTENDRE que {user_name} décrive le statut des tests</action>

<output>
Dana (Ingénieure QA) : [Réagit à ce que {user_name} a partagé] "Je peux ajouter ceci - {{additional_testing_context}}."

Dana (Ingénieure QA) : "Mais honnêtement, {{testing_concern_if_any}}."

Bob (Scrum Master) : "{user_name}, êtes-vous confiant dans le fait que l'Epic {{epic_number}} est prête pour la production du point de vue de la qualité ?"
</output>

<action>ATTENDRE que {user_name} évalue l'état de préparation de la qualité</action>

<check if="{user_name} exprime des inquiétudes">
  <output>
Bob (Scrum Master) : "D'accord, notons cela. Quels tests spécifiques sont encore nécessaires ?"

Dana (Ingénieure QA) : "Je peux m'occuper de {{testing_work_needed}}, estimé à {{testing_hours}} heures."

Bob (Scrum Master) : "Ajout au chemin critique : Terminer {{testing_work_needed}} avant l'Epic {{next_epic_num}}."
</output>
<action>Ajouter la complétion des tests au chemin critique</action>
</check>

<action>Explorer le statut du déploiement et de la mise en production</action>

<output>
Bob (Scrum Master) : "{user_name}, quel est le statut du déploiement pour l'Epic {{epic_number}} ? Est-il en ligne en production, prévu pour bientôt ou toujours en attente ?"
</output>

<action>ATTENDRE que {user_name} fournisse le statut du déploiement</action>

<check if="pas encore déployé">
  <output>
Charlie (Senior Dev) : "Si ce n'est pas encore déployé, nous devons en tenir compte dans le calendrier de l'Epic {{next_epic_num}}."

Bob (Scrum Master) : "{user_name}, quand le déploiement est-il prévu ? Est-ce que ce calendrier est compatible avec le début de l'Epic {{next_epic_num}} ?"
</output>

<action>ATTENDRE que {user_name} clarifie le calendrier de déploiement</action>

<action>Ajouter le jalon de déploiement au chemin critique avec le calendrier convenu</action>
</check>

<action>Explorer l'acceptation par les parties prenantes</action>

<output>
Bob (Scrum Master) : "{user_name}, les parties prenantes ont-elles vu et accepté les livrables de l'Epic {{epic_number}} ?"

Alice (Product Owner) : "C'est important - j'ai déjà vu des epics 'finies' être rejetées par les parties prenantes, forçant ainsi des reprises de travail."

Bob (Scrum Master) : "{user_name}, y a-t-il encore des retours en attente des parties prenantes ?"
</output>

<action>ATTENDRE que {user_name} décrive le statut d'acceptation par les parties prenantes</action>

<check if="acceptation incomplète ou retours en attente">
  <output>
Alice (Product Owner) : "Nous devrions obtenir une acceptation formelle avant de passer à la suite. Sinon, l'Epic {{next_epic_num}} pourrait être interrompue par des corrections."

Bob (Scrum Master) : "{user_name}, comment voulez-vous gérer l'acceptation par les parties prenantes ? Devrions-nous en faire un élément du chemin critique ?"
</output>

<action>ATTENDRE la décision de {user_name}</action>

<action>Ajouter l'acceptation par les parties prenantes au chemin critique si l'utilisateur est d'accord</action>
</check>

<action>Explorer la santé technique et la stabilité</action>

<output>
Bob (Scrum Master) : "{user_name}, voici une question 'de ressenti' : que pensez-vous de l'état du code après l'Epic {{epic_number}} ?"

Bob (Scrum Master) : "C'est stable et maintenable ? Ou y a-t-il des inquiétudes qui rôdent ?"

Charlie (Senior Dev) : "Soyez honnête, {user_name}. Nous avons tous déjà livré des epics qui semblaient... fragiles."
</output>

<action>ATTENDRE que {user_name} évalue la santé de la base de code</action>

<check if="{user_name} exprime des préoccupations sur la stabilité">
  <output>
Charlie (Senior Dev) : "D'accord, creusons ça. Qu'est-ce qui cause ces inquiétudes ?"

Charlie (Senior Dev) : [Aide {user_name} à articuler les préoccupations techniques]

Bob (Scrum Master) : "Que faudrait-il faire pour répondre à ces inquiétudes et être serein sur la stabilité ?"

Charlie (Senior Dev) : "Je dirais que nous avons besoin de {{stability_work_needed}}, environ {{stability_hours}} heures."

Bob (Scrum Master) : "{user_name}, est-ce que ce travail sur la stabilité vaut la peine d'être fait avant l'Epic {{next_epic_num}} ?"
</output>

<action>ATTENDRE la décision de {user_name}</action>

<action>Ajouter le travail de stabilité au sprint de préparation si l'utilisateur est d'accord</action>
</check>

<action>Explorer les bloqueurs non résolus</action>

<output>
Bob (Scrum Master) : "{user_name}, y a-t-il des bloqueurs non résolus ou des problèmes techniques de l'Epic {{epic_number}} que nous traînons avec nous ?"

Dana (Ingénieure QA) : "Des choses qui pourraient créer des problèmes pour l'Epic {{next_epic_num}} si nous ne nous en occupons pas ?"

Bob (Scrum Master) : "Rien n'est tabou ici. S'il y a un problème, nous devons le savoir."
</output>

<action>ATTENDRE que {user_name} fasse remonter d'éventuels bloqueurs</action>

<check if="des bloqueurs sont identifiés">
  <output>
Bob (Scrum Master) : "Capturons ces bloqueurs et voyons comment ils affectent l'Epic {{next_epic_num}}."

Charlie (Senior Dev) : "Pour {{blocker_1}}, si nous le laissons non résolu, il va {{impact_description_1}}."

Alice (Product Owner) : "Cela semble critique. Nous devons régler ça avant d'avancer."

Bob (Scrum Master) : "D'accord. Ajout au chemin critique : Résoudre {{blocker_1}} avant le lancement de l'Epic {{next_epic_num}}."

Bob (Scrum Master) : "Qui est responsable de ce travail ?"
</output>

<action>Assigner la résolution du bloqueur à l'agent approprié</action>
<action>Ajouter au chemin critique avec priorité et échéance</action>
</check>

<action>Synthétiser l'évaluation de l'état de préparation</action>

<output>
Bob (Scrum Master) : "D'accord {user_name}, laissez-moi synthétiser ce que nous venons de découvrir..."

**ÉVALUATION DE L'ÉTAT DE PRÉPARATION DE L'EPIC {{epic_number}} :**

Tests & Qualité : {{quality_status}}
{{#if quality_concerns}}⚠️ Action requise : {{quality_action_needed}}{{/if}}

Déploiement : {{deployment_status}}
{{#if deployment_pending}}⚠️ Prévu pour le : {{deployment_date}}{{/if}}

Acceptation par les parties prenantes : {{acceptance_status}}
{{#if acceptance_incomplete}}⚠️ Action requise : {{acceptance_action_needed}}{{/if}}

Santé technique : {{stability_status}}
{{#if stability_concerns}}⚠️ Action requise : {{stability_action_needed}}{{/if}}

Bloqueurs non résolus : {{blocker_status}}
{{#if blockers_exist}}⚠️ Doit être résolu : {{blocker_list}}{{/if}}

Bob (Scrum Master) : "{user_name}, est-ce que cette évaluation correspond à votre compréhension ?"
</output>

<action>ATTENDRE que {user_name} confirme ou corrige l'évaluation</action>

<output>
Bob (Scrum Master) : "Sur la base de cette évaluation, l'Epic {{epic_number}} est {{#if all_clear}}entièrement terminée et nous avons le champ libre pour continuer{{else}}terminée du point de vue des stories, mais nous avons {{critical_work_count}} points critiques à régler avant l'Epic {{next_epic_num}}{{/if}}."

Alice (Product Owner) : "Ce niveau de rigueur est ce qui rend les rétrospectives précieuses."

Charlie (Senior Dev) : "Mieux vaut s'en rendre compte maintenant qu'après trois stories dans la prochaine epic."
</output>

</step>

<step n="10" goal="Clôture de la rétrospective avec célébration et engagement">

<output>
Bob (Scrum Master) : "Nous avons couvert beaucoup de terrain aujourd'hui. Laissez-moi clore cette rétrospective."

═══════════════════════════════════════════════════════════
✅ RÉTROSPECTIVE TERMINÉE
═══════════════════════════════════════════════════════════

Bob (Scrum Master) : "Epic {{epic_number}} : {{epic_title}} - PASSÉE EN REVUE"

**Points clés à retenir :**

1. {{key_lesson_1}}
2. {{key_lesson_2}}
3. {{key_lesson_3}}
   {{#if key_lesson_4}}4. {{key_lesson_4}}{{/if}}

Alice (Product Owner) : "Le premier point est capital - {{impact_of_lesson_1}}."

Charlie (Senior Dev) : "Et la leçon 2 est quelque chose que nous pouvons appliquer immédiatement."

Bob (Scrum Master) : "Engagements pris aujourd'hui :"

- Actions à entreprendre : {{action_count}}
- Tâches de préparation : {{prep_task_count}}
- Éléments du chemin critique : {{critical_count}}

Dana (Ingénieure QA) : "C'est beaucoup d'engagements. Nous devons vraiment assurer le suivi cette fois."

Bob (Scrum Master) : "D'accord. C'est pourquoi nous passerons en revue ces actions lors de notre prochain standup."

═══════════════════════════════════════════════════════════
🎯 ÉTAPES SUIVANTES :
═══════════════════════════════════════════════════════════

1. Exécuter le Sprint de Préparation (Est : {{prep_days}} jours)
2. Terminer les éléments du Chemin Critique avant l'Epic {{next_epic_num}}
3. Passer en revue les actions lors du prochain standup
   {{#if epic_update_needed}}4. Tenir une session de revue de planification de l'Epic {{next_epic_num}}{{else}}4. Commencer la planification de l'Epic {{next_epic_num}} une fois la préparation terminée{{/if}}

Elena (Junior Dev) : "{{prep_days}} jours de travail de préparation, c'est significatif, mais nécessaire."

Alice (Product Owner) : "Je communiquerai le calendrier aux parties prenantes. Ils comprendront si nous le présentons comme 'garantir le succès de l'Epic {{next_epic_num}}'."

═══════════════════════════════════════════════════════════

Bob (Scrum Master) : "Avant de finir, je tiens à prendre un moment pour remercier l'équipe."

Bob (Scrum Master) : "L'Epic {{epic_number}} a livré {{completed_stories}} stories avec une vélocité {{velocity_description}}. Nous avons surmonté {{blocker_count}} bloqueurs. Nous avons beaucoup appris. C'est du vrai travail, accompli par de vraies personnes."

Charlie (Senior Dev) : "Bravo à tous."

Alice (Product Owner) : "Je suis fière de ce que nous avons livré."

Dana (Ingénieure QA) : "Et je suis impatiente de commencer l'Epic {{next_epic_num}} - surtout maintenant que nous y sommes préparés."

Bob (Scrum Master) : "{user_name}, un dernier mot avant de clôturer ?"
</output>

<action>ATTENDRE que {user_name} partage ses réflexions finales</action>

<output>
Bob (Scrum Master) : [Prend acte de ce que {user_name} a partagé] "Merci pour cela, {user_name}."

Bob (Scrum Master) : "Très bien l'équipe - excellent travail aujourd'hui. Nous avons beaucoup appris de l'Epic {{epic_number}}. Utilisons ces insights pour rendre l'Epic {{next_epic_num}} encore meilleure."

Bob (Scrum Master) : "On se retrouve quand le travail de préparation sera terminé. La séance est levée !"

═══════════════════════════════════════════════════════════
</output>

<action>Se préparer à sauvegarder le document de résumé de la rétrospective</action>

</step>

<step n="11" goal="Sauvegarder la rétrospective et mettre à jour le compte rendu du sprint (sprint-status)">

<action>S'assurer que le dossier des rétrospectives existe : {implementation_artifacts}</action>
<action>Créer le dossier s'il n'existe pas</action>

<action>Générer un document résumé complet de la rétrospective incluant :</action>

- Résumé de l'epic et mesures (metrics)
- Participants de l'équipe
- Succès et forces identifiés
- Défis et axes de progression
- Insights et apprentissages clés
- Analyse du suivi de la rétro précédente (si applicable)
- Aperçu de l'epic suivante et dépendances
- Actions à entreprendre avec responsables et échéanciers
- Tâches de préparation pour l'epic suivante
- Éléments du chemin critique
- Découvertes significatives et recommandations de mise à jour d'epic (le cas échéant)
- Évaluation de l'état de préparation
- Engagements et étapes suivantes

<action>Formater le document de rétrospective en markdown lisible avec des sections claires</action>
<action>Définir le nom du fichier : {implementation_artifacts}/epic-{{epic_number}}-retro-{date}.md</action>
<action>Sauvegarder le document de rétrospective</action>

<output>
✅ Document de rétrospective sauvegardé : {implementation_artifacts}/epic-{{epic_number}}-retro-{date}.md
</output>

<action>Mettre à jour {sprint_status_file} pour marquer la rétrospective comme terminée</action>

<action>Charger le fichier COMPLET : {sprint_status_file}</action>
<action>Trouver la clé development_status "epic-{{epic_number}}-retrospective"</action>
<action>Vérifier le statut actuel (généralement "optional" ou "pending")</action>
<action>Mettre à jour development_status["epic-{{epic_number}}-retrospective"] = "done"</action>
<action>Mettre à jour le champ last_updated avec la date actuelle</action>
<action>Sauvegarder le fichier, en préservant TOUS les commentaires et la structure, y compris les STATUS DEFINITIONS</action>

<check if="mise à jour réussie">
  <output>
✅ Rétrospective marquée comme terminée dans {sprint_status_file}

Clé de rétrospective : epic-{{epic_number}}-retrospective
Statut : {{previous_status}} → done
</output>
</check>

<check if="clé de rétrospective non trouvée">
  <output>
⚠️ Impossible de mettre à jour le statut de la rétrospective : epic-{{epic_number}}-retrospective non trouvé dans {sprint_status_file}

Le document de rétrospective a été sauvegardé avec succès, mais {sprint_status_file} pourrait nécessiter une mise à jour manuelle.
</output>
</check>

</step>

<step n="12" goal="Résumé final et Handoff">

<output>
**✅ Rétrospective terminée, {user_name} !**

**Revue de l'Epic :**

- Epic {{epic_number}} : {{epic_title}} passée en revue
- Statut de la rétrospective : terminé
- Rétrospective sauvegardée : {implementation_artifacts}/epic-{{epic_number}}-retro-{date}.md

**Engagements pris :**

- Actions à entreprendre : {{action_count}}
- Tâches de préparation : {{prep_task_count}}
- Éléments du chemin critique : {{critical_count}}

**Étapes suivantes :**

1. **Passer en revue le résumé de la rétrospective** : {implementation_artifacts}/epic-{{epic_number}}-retro-{date}.md

2. **Exécuter le sprint de préparation** (Est : {{prep_days}} jours)
   - Terminer les {{critical_count}} éléments du chemin critique
   - Exécuter les {{prep_task_count}} tâches de préparation
   - Vérifier que toutes les actions sont en cours

3. **Passer en revue les actions lors du prochain standup**
   - S'assurer que les responsabilités sont claires
   - Suivre l'avancement des engagements
   - Ajuster les délais si nécessaire

{{#if epic_update_needed}} 4. **IMPORTANT : Planifier une session de revue de planification de l'Epic {{next_epic_num}}**

- Des découvertes significatives de l'Epic {{epic_number}} nécessitent des mises à jour de l'epic
- Revoir et mettre à jour les stories affectées
- Aligner l'équipe sur l'approche révisée
- Ne PAS commencer l'Epic {{next_epic_num}} avant que la revue ne soit terminée
  {{else}}

4. **Commencer l'Epic {{next_epic_num}} quand vous êtes prêts**
   - Commencer à créer des stories avec l'agent SM via `create-story`
   - L'Epic sera marquée comme `in-progress` automatiquement lors de la création de la première story
   - S'assurer que tous les éléments du chemin critique sont terminés en priorité
     {{/if}}

**Performance de l'équipe :**
L'Epic {{epic_number}} a livré {{completed_stories}} stories avec une vélocité {{velocity_summary}}. La rétrospective a fait émerger {{insight_count}} insights clés et {{significant_discovery_count}} découvertes significatives. L'équipe est bien positionnée pour le succès de l'Epic {{next_epic_num}}.

{{#if significant_discovery_count > 0}}
⚠️ **RAPPEL** : Mise à jour d'Epic requise avant de commencer l'Epic {{next_epic_num}}
{{/if}}

---

Bob (Scrum Master) : "Excellente session aujourd'hui, {user_name}. L'équipe a fait un superbe travail."

Alice (Product Owner) : "On se voit pour la planification de l'epic !"

Charlie (Senior Dev) : "C'est parti pour le travail de préparation."

</output>

</step>

</workflow>

<facilitation-guidelines>
<guideline>PARTY MODE REQUIS : Tous les dialogues d'agents utilisent le format "Nom (Rôle) : dialogue"</guideline>
<guideline>Le Scrum Master maintient la sécurité psychologique tout au long - pas de blâme ni de jugement</guideline>
<guideline>Se concentrer sur les systèmes et les processus, pas sur la performance individuelle</guideline>
<guideline>Créer une dynamique d'équipe authentique : désaccords, perspectives diverses, émotions</guideline>
<guideline>L'utilisateur ({user_name}) est un participant actif, pas un observateur passif</guideline>
<guideline>Encourager les exemples spécifiques plutôt que les déclarations générales</guideline>
<guideline>Équilibrer la célébration des victoires avec une évaluation honnête des défis</guideline>
<guideline>S'assurer que chaque voix est entendue - tous les agents contribuent</guideline>
<guideline>Les actions à entreprendre doivent être spécifiques, réalisables et avoir un responsable</guideline>
<guideline>Mentalité tournée vers l'avenir - comment s'améliorer pour la prochaine epic ?</guideline>
<guideline>Facilitation basée sur l'intention, pas sur des phrases scriptées</guideline>
<guideline>L'analyse approfondie des stories fournit un matériau riche pour la discussion</guideline>
<guideline>L'intégration de la rétro précédente crée de la responsabilité et de la continuité</guideline>
<guideline>La détection de changements significatifs évite le désalignement des epics</guideline>
<guideline>La vérification critique empêche de démarrer l'epic suivante prématurément</guideline>
<guideline>Tout documenter - les insights de rétrospective sont précieux pour référence future</guideline>
<guideline>La structure en deux parties assure à la fois la réflexion ET la préparation</guideline>
</facilitation-guidelines>
