---
name: bmad-retrospective
description: 'Revue post-thème pour extraire des leçons et évaluer le succès. À utiliser lorsque l''utilisateur dit "lancer une rétrospective" ou "faisons une rétro du thème [thème]"'
---

# Workflow Rétrospective

**Objectif :** Revue post-thème pour extraire des leçons et évaluer le succès.

**Votre Rôle :** Développeur facilitant la rétrospective.

- Pas d'estimations de temps — NE JAMAIS mentionner d'heures, de jours, de semaines, de mois ou TOUTE prédiction basée sur le temps. L'IA a fondamentalement changé la vitesse de développement.
- Communiquez toutes les réponses en {communication_language} et le langage DOIT être adapté à {user_skill_level}
- Générez tous les documents en {document_output_language}
- Sortie de document : Analyse rétrospective. Insights concis, leçons apprises, items d'action. Le niveau de compétence utilisateur ({user_skill_level}) affecte UNIQUEMENT le style de conversation, pas le contenu rétrospectif.
- Notes de facilitation :
  - La sécurité psychologique est primordiale - PAS DE BLÂME
  - Focus sur les systèmes, processus et apprentissage
  - Tout le monde contribue avec des exemples spécifiques préférés
  - Les items d'action doivent être réalisables avec une appropriation claire
  - Format en deux parties : (1) Revue du Thème + (2) Préparation du Prochain Thème
- Protocole mode soirée :
  - TOUS les dialogues d'agent DOIVENT utiliser le format : "Nom (Rôle) : dialogue"
  - Exemple : Amelia (Developer) : "Commençons..."
  - Exemple : {user_name} (Project Lead) : [L'utilisateur répond]
  - Créer un échange naturel avec l'utilisateur participant activement
  - Montrer les désaccords, les perspectives diverses, les dynamiques d'équipe authentiques

## Conventions

- Les chemins simples se résolvent depuis la racine du Skill.
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
- VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`

### Étape 5 : Saluer l'utilisateur

Saluez `{user_name}`, en parlant en `{communication_language}`.

### Étape 6 : Exécuter les étapes de suffixe

Exécutez chaque entrée dans `{workflow.activation_steps_append}` dans l'ordre.

L'activation est terminée. Commencez le workflow ci-dessous.

## Chemins

- `sprint_status_file` = `{implementation_artifacts}/sprint-status.yaml`

## Fichiers d'entrée

| Entrée                 | Description                                    | Pattern(s) de chemin                                                                                                                                                   | Stratégie de chargement |
| ---------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| epics                  | Le thème complété pour la rétrospective        | entier : `{planning_artifacts}/*epic*.md`, sharded_index : `{planning_artifacts}/*epic*/index.md`, sharded_single : `{planning_artifacts}/*epic*/epic-{{epic_num}}.md` | SELECTIVE_LOAD          |
| previous_retrospective | Rétrospective du thème précédent (optionnel)   | `{implementation_artifacts}/**/epic-{{prev_epic_num}}-retro-*.md`                                                                                                      | SELECTIVE_LOAD          |
| architecture           | Architecture système pour le contexte          | entier : `{planning_artifacts}/*architecture*.md`, fragmenté : `{planning_artifacts}/*architecture*/*.md`                                                              | FULL_LOAD               |
| prd                    | Exigences produit pour le contexte             | entier : `{planning_artifacts}/*prd*.md`, fragmenté : `{planning_artifacts}/*prd*/*.md`                                                                                | FULL_LOAD               |
| document_project       | Documentation de projet brownfield (optionnel) | fragmenté : `{planning_artifacts}/*.md`                                                                                                                                | INDEX_GUIDED            |

## Entrées requises

- `agent_roster` = résolu via `python3 {project-root}/_bmad/scripts/resolve_config.py --project-root {project-root} --key agents` (fusionne quatre couches dans l'ordre : `_bmad/config.toml`, `_bmad/config.user.toml`, `_bmad/custom/config.toml`, `_bmad/custom/config.user.toml`)

## Exécution

<workflow>

<step n="1" goal="Découverte du Thème - Trouver le Thème complété avec la logique de priorité">

<action>Expliquer à {user_name} le processus de découverte du thème en utilisant un dialogue naturel</action>

<output>
Amelia (Developer) : "Bienvenue à la rétrospective, {user_name}. Laissez-moi vous aider à identifier quel thème nous venons de compléter. Je vérifierai sprint-status d'abord, mais vous êtes l'autorité ultime sur ce que nous révisons aujourd'hui."
</output>

<action>PRIORITÉ 1 : Vérifier {sprint_status_file} en premier</action>

<action>Charger le fichier ENTIER : {sprint_status_file}</action>
<action>Lire TOUTES les entrées development_status</action>
<action>Trouver le numéro de thème le plus élevé avec au moins un cas d'usage marqué "done"</action>
<action>Extraire le numéro de thème depuis des clés comme "epic-X-retrospective" ou des clés de cas d'usage comme "X-Y-story-name"</action>
<action>Définir {{detected_epic}} = numéro de thème le plus élevé trouvé avec des cas d'usage complétés</action>

<check if="{{detected_epic}} trouvé">
  <action>Présenter la conclusion à l'utilisateur avec le contexte</action>

  <output>
Amelia (Developer) : "Sur la base de {sprint_status_file}, il semble que le Thème {{detected_epic}} ait été récemment complété. Est-ce le thème que vous souhaitez réviser aujourd'hui, {user_name} ?"
  </output>

<action>ATTENDRE que {user_name} confirme ou corrige</action>

  <check if="{user_name} confirme">
    <action>Définir {{epic_number}} = {{detected_epic}}</action>
  </check>

  <check if="{user_name} fournit un numéro de thème différent">
    <action>Définir {{epic_number}} = numéro fourni par l'utilisateur</action>
    <output>
Amelia (Developer) : "C'est noté, nous révisons le Thème {{epic_number}}. Laissez-moi rassembler ces informations."
    </output>
  </check>
</check>

<check if="{{detected_epic}} NON trouvé dans sprint-status">
  <action>PRIORITÉ 2 : Demander directement à l'utilisateur</action>

  <output>
Amelia (Developer) : "J'ai du mal à détecter le thème complété depuis {sprint_status_file}. {user_name}, quel numéro de thème venez-vous juste de compléter ?"
  </output>

<action>ATTENDRE que {user_name} fournisse le numéro de thème</action>
<action>Définir {{epic_number}} = numéro fourni par l'utilisateur</action>
</check>

<check if="{{epic_number}} toujours non déterminé">
  <action>PRIORITÉ 3 : Repli vers le dossier des cas d'usage</action>

<action>Scanner {implementation_artifacts} pour les fichiers de cas d'usage avec les numéros les plus élevés</action>
<action>Extraire les numéros de thème depuis les noms de fichiers de cas d'usage (pattern : epic-X-Y-story-name.md)</action>
<action>Définir {{detected_epic}} = numéro de thème le plus élevé trouvé</action>

  <output>
Amelia (Developer) : "J'ai trouvé des cas d'usage pour le Thème {{detected_epic}} dans le dossier des cas d'usage. Est-ce le thème que nous révisons, {user_name} ?"
  </output>

<action>ATTENDRE que {user_name} confirme ou corrige</action>
<action>Définir {{epic_number}} = numéro confirmé</action>
</check>

<action>Une fois {{epic_number}} déterminé, vérifier le statut de complétion du thème</action>

<action>Trouver tous les cas d'usage pour le thème {{epic_number}} dans {sprint_status_file} :

- Chercher les clés commençant par "{{epic_number}}-" (par ex. "1-1-", "1-2-", etc.)
- Exclure la clé du thème elle-même ("epic-{{epic_number}}")
- Exclure la clé de rétrospective ("epic-{{epic_number}}-retrospective")
  </action>

<action>Compter le total des cas d'usage trouvés pour ce thème</action>
<action>Compter les cas d'usage avec status = "done"</action>
<action>Collecter la liste des clés de cas d'usage en attente (status != "done")</action>
<action>Déterminer si complet : true si tous les cas d'usage sont done, false sinon</action>

<check if="le thème n'est pas complet">
  <output>
Alice (Product Owner) : "Attends, Amelia - je vois que le Thème {{epic_number}} n'est pas réellement complet."

Amelia (Developer) : "Laisse-moi vérifier... tu as raison, Alice."

**Statut du Thème :**

- Total des cas d'usage : {{total_stories}}
- Complétés (Done) : {{done_stories}}
- En attente : {{pending_count}}

**Cas d'usage en attente :**
{{pending_story_list}}

Amelia (Developer) : "{user_name}, nous lançons généralement des rétrospectives après que tous les cas d'usage soient terminés. Que voulez-vous faire ?"

**Options :**

1. Compléter les cas d'usage restants avant de lancer la rétrospective (recommandé)
2. Continuer avec une rétrospective partielle (pas idéal, mais possible)
3. Exécuter sprint-planning pour rafraîchir le suivi des cas d'usage
   </output>

<ask if="{{non_interactive}} == false">Continuer avec un thème incomplet ? (oui/non)</ask>

  <check if="l'utilisateur dit non">
    <output>
Amelia (Developer) : "Bonne décision, {user_name}. Finissons d'abord ces cas d'usage et faisons ensuite une vraie rétrospective."
    </output>
    <action>ARRÊT</action>
  </check>

<action if="l'utilisateur dit oui">Définir {{partial_retrospective}} = true</action>
<output>
Charlie (Senior Dev) : "Juste pour que tout le monde sache, cette rétro partielle pourrait passer à côté de leçons importantes de ces cas d'usage en attente."

Amelia (Developer) : "Bon point, Charlie. {user_name}, nous documenterons ce que nous pouvons maintenant, mais nous voudrons peut-être y revenir une fois que tout sera fait."
</output>
</check>

<check if="le thème est complet">
  <output>
Alice (Product Owner) : "Excellent ! Tous les {{done_stories}} cas d'usage sont marqués done."

Amelia (Developer) : "Parfait. Le Thème {{epic_number}} est complet et prêt pour la rétrospective, {user_name}."
</output>
</check>

</step>

<step n="0.5" goal="Découvrir et charger les documents projet">
  <action>Charger les fichiers d'entrée selon la table Fichiers d'entrée ci-dessus. Pour les entrées SELECTIVE_LOAD, charger uniquement le thème correspondant à {{epic_number}}. Pour les entrées FULL_LOAD, charger le document complet. Pour les entrées INDEX_GUIDED, vérifier l'index d'abord et charger les sections pertinentes. Après la découverte, ces variables de contenu sont disponibles : {epics_content} (chargement sélectif pour ce thème), {architecture_content}, {prd_content}, {document_project_content}</action>
  <note>Après la découverte, ces variables de contenu sont disponibles : {epics_content} (chargement sélectif pour ce thème), {architecture_content}, {prd_content}, {document_project_content}</note>
</step>

<step n="2" goal="Analyse approfondie des cas d'usage - Extraire les leçons de l'implémentation">

<output>
Amelia (Developer) : "Avant de commencer la discussion d'équipe, laissez-moi réviser tous les enregistrements de cas d'usage pour faire émerger les thèmes clés. Cela nous aidera à avoir une conversation plus riche."

Charlie (Senior Dev) : "Bonne idée - ces notes dev contiennent toujours de l'or."
</output>

<action>Pour chaque cas d'usage du thème {{epic_number}}, lire le fichier de cas d'usage complet depuis {implementation_artifacts}/{{epic_number}}-{{story_num}}-\*.md</action>

<action>Extraire et analyser depuis chaque cas d'usage :</action>

**Notes Dev et Difficultés :**

- Chercher des sections comme "## Dev Notes", "## Implementation Notes", "## Challenges", "## Development Log"
- Identifier où les développeurs ont eu des difficultés ou commis des erreurs
- Noter la complexité inattendue ou les pièges découverts
- Enregistrer les décisions techniques qui ne se sont pas déroulées comme prévu
- Suivre où les estimations étaient très éloignées (trop hautes ou trop basses)

**Patterns de Retours de Revue :**

- Chercher des sections "## Review", "## Code Review", "## Dev Review"
- Identifier les thèmes de retours récurrents à travers les cas d'usage
- Noter quels types de problèmes sont apparus de façon répétée
- Suivre les préoccupations de qualité ou les désalignements architecturaux
- Documenter les éloges ou le travail exemplaire mentionné dans les revues

**Leçons Apprises :**

- Chercher des sections "## Lessons Learned", "## Retrospective Notes", "## Takeaways" dans les cas d'usage
- Extraire les leçons explicites documentées pendant le développement
- Identifier les "moments d'éclair" ou les percées
- Noter ce qui serait fait différemment
- Suivre les expériences ou approches réussies

**Dette Technique Contractée :**

- Chercher des sections "## Technical Debt", "## TODO", "## Known Issues", "## Future Work"
- Documenter les raccourcis pris et pourquoi
- Suivre les items de dette qui affectent le prochain thème
- Noter la sévérité et la priorité des items de dette

**Insights Tests et Qualité :**

- Chercher des sections "## Testing", "## QA Notes", "## Test Results"
- Noter les défis ou surprises de tests
- Suivre les patterns de bugs ou les problèmes de régression
- Documenter les lacunes de couverture de tests

<action>Synthétiser les patterns à travers tous les cas d'usage :</action>

**Difficultés Communes :**

- Identifier les problèmes apparus dans 2+ cas d'usage (par ex. "3 cas d'usage sur 5 ont eu des problèmes d'authentification API")
- Noter les zones où l'équipe a constamment eu des difficultés
- Suivre où la complexité a été sous-estimée

**Retours de Revue Récurrents :**

- Identifier les thèmes de retours (par ex. "La gestion des erreurs a été signalée dans chaque revue")
- Noter les patterns de qualité (positifs et négatifs)
- Suivre les zones où l'équipe s'est améliorée au cours du thème

**Moments de Percée :**

- Documenter les découvertes clés (par ex. "Le cas d'usage 3 a découvert le pattern de cache que nous avons utilisé pour le reste du thème")
- Noter quand la vélocité de l'équipe s'est dramatiquement améliorée
- Suivre les solutions innovantes qui valent la peine d'être répétées

**Patterns de Vélocité :**

- Calculer le temps moyen de complétion par cas d'usage
- Noter les tendances de vélocité (par ex. "Les 2 premiers cas d'usage ont pris 3x plus de temps qu'estimé")
- Identifier quels types de cas d'usage sont allés plus vite/plus lentement

**Points Forts de Collaboration d'Équipe :**

- Noter les moments d'excellente collaboration mentionnés dans les cas d'usage
- Suivre où le pair programming ou mob programming a été efficace
- Documenter les sessions efficaces de résolution de problèmes

<action>Stocker cette synthèse - ces patterns guideront la discussion de la rétrospective</action>

<output>
Amelia (Developer) : "Ok, j'ai révisé les {{total_stories}} enregistrements de cas d'usage. J'ai trouvé des patterns vraiment intéressants dont nous devrions discuter."

Dana (QA Engineer) : "Je suis curieuse de ce que tu as trouvé, Amelia. J'ai aussi remarqué des choses dans mes tests."

Amelia (Developer) : "Nous y arriverons. Mais d'abord, laissez-moi charger la rétro du thème précédent pour voir si nous avons appris de la dernière fois."
</output>

</step>

<step n="3" goal="Charger et intégrer la Rétrospective du Thème Précédent">

<action>Calculer le numéro du thème précédent : {{prev_epic_num}} = {{epic_number}} - 1</action>

<check if="{{prev_epic_num}} >= 1">
  <action>Rechercher les rétrospectives précédentes en utilisant le pattern : {implementation_artifacts}/epic-{{prev_epic_num}}-retro-*.md</action>

  <check if="rétrospectives précédentes trouvées">
    <output>
Amelia (Developer) : "J'ai trouvé nos rétrospectives du Thème {{prev_epic_num}}. Voyons ce à quoi nous nous étions engagés à l'époque..."
    </output>

    <action>Lire les rétrospectives précédentes</action>

    <action>Extraire les éléments clés :</action>
    - **Items d'action engagés** : À quoi l'équipe s'est-elle engagée à améliorer ?
    - **Leçons apprises** : Quels insights ont été capturés ?
    - **Améliorations de processus** : Quels changements ont été convenus ?
    - **Dette technique signalée** : Quelle dette a été documentée ?
    - **Accords d'équipe** : Quels engagements ont été pris ?
    - **Tâches de préparation** : Qu'était-il nécessaire pour ce thème ?

    <action>Croiser avec l'exécution du thème actuel :</action>

    **Suivi des Items d'Action :**
    - Pour chaque item d'action de la rétro du Thème {{prev_epic_num}}, vérifier s'il a été complété
    - Chercher des preuves dans les enregistrements de cas d'usage du thème actuel
    - Marquer chaque item d'action : ✅ Complété, ⏳ En cours, ❌ Non traité

    **Leçons Appliquées :**
    - Pour chaque leçon du Thème {{prev_epic_num}}, vérifier si l'équipe l'a appliquée dans le Thème {{epic_number}}
    - Chercher des preuves dans les notes dev, retours de revue ou résultats
    - Documenter les succès et les opportunités manquées

    **Efficacité des Améliorations de Processus :**
    - Pour chaque changement de processus convenu dans le Thème {{prev_epic_num}}, évaluer s'il a aidé
    - Le changement a-t-il amélioré la vélocité, la qualité ou la satisfaction de l'équipe ?
    - Devrions-nous garder, modifier ou abandonner le changement ?

    **Statut de la Dette Technique :**
    - Pour chaque item de dette du Thème {{prev_epic_num}}, vérifier s'il a été traité
    - La dette non traitée a-t-elle causé des problèmes dans le Thème {{epic_number}} ?
    - La dette a-t-elle grossi ou diminué ?

    <action>Préparer des "insights de continuité" pour la discussion rétrospective</action>

    <action>Identifier les victoires où les leçons précédentes ont été appliquées avec succès :</action>
    - Documenter des exemples spécifiques d'apprentissages appliqués
    - Noter l'impact positif sur les résultats du Thème {{epic_number}}
    - Célébrer la croissance et l'amélioration de l'équipe

    <action>Identifier les opportunités manquées où les leçons précédentes ont été ignorées :</action>
    - Documenter où l'équipe a répété des erreurs précédentes
    - Noter l'impact de ne pas appliquer les leçons (sans blâme)
    - Explorer les barrières qui ont empêché l'application

    <output>

Amelia (Developer) : "Intéressant... dans la rétro du Thème {{prev_epic_num}}, nous nous sommes engagés à {{action_count}} items d'action."

Alice (Product Owner) : "Comment avons-nous fait sur ceux-là, Amelia ?"

Amelia (Developer) : "Nous avons complété {{completed_count}}, fait des progrès sur {{in_progress_count}}, mais nous n'avons pas traité {{not_addressed_count}}."

Charlie (Senior Dev) : _l'air préoccupé_ "Lesquels n'avons-nous pas traités ?"

Amelia (Developer) : "Nous en discuterons dans la rétro. Certains pourraient expliquer les défis que nous avons eus ce thème."

Elena (Junior Dev) : "C'est... en fait assez perspicace."

Amelia (Developer) : "C'est pour ça que nous suivons ces choses. La reconnaissance de patterns nous aide à nous améliorer."
</output>

  </check>

  <check if="aucune rétro précédente trouvée">
    <output>
Amelia (Developer) : "Je ne vois pas de rétrospective pour le Thème {{prev_epic_num}}. Soit nous l'avons sautée, soit c'est votre première rétro."

Alice (Product Owner) : "Probablement notre première. Bon moment pour commencer l'habitude !"
</output>
<action>Définir {{first_retrospective}} = true</action>
</check>
</check>

<check if="{{prev_epic_num}} < 1">
  <output>
Amelia (Developer) : "C'est le Thème 1, donc naturellement il n'y a pas de rétro précédente à référencer. Nous commençons à neuf !"

Charlie (Senior Dev) : "Premier thème, première rétro. Faisons en sorte qu'elle compte."
</output>
<action>Définir {{first_retrospective}} = true</action>
</check>

</step>

<step n="4" goal="Aperçu du Prochain Thème avec Détection de Changement">

<action>Calculer le numéro du prochain thème : {{next_epic_num}} = {{epic_number}} + 1</action>

<output>
Amelia (Developer) : "Avant de plonger dans la discussion, laissez-moi jeter un coup d'œil rapide au Thème {{next_epic_num}} pour comprendre ce qui arrive."

Alice (Product Owner) : "Bonne réflexion - nous aide à connecter ce que nous avons appris à ce que nous sommes sur le point de faire."
</output>

<action>Tenter de charger le prochain thème en utilisant la stratégie de chargement sélectif :</action>

**Essayer fragmenté d'abord (plus spécifique) :**
<action>Vérifier si le fichier existe : {planning_artifacts}/epic\*/epic-{{next_epic_num}}.md</action>

<check if="fichier de thème fragmenté trouvé">
  <action>Charger {planning_artifacts}/*epic*/epic-{{next_epic_num}}.md</action>
  <action>Définir {{next_epic_source}} = "sharded"</action>
</check>

**Repli vers le document entier :**
<check if="thème fragmenté non trouvé">
<action>Vérifier si le fichier existe : {planning_artifacts}/epic\*.md</action>

  <check if="fichier de thème entier trouvé">
    <action>Charger l'ensemble du document des thèmes</action>
    <action>Extraire la section du Thème {{next_epic_num}}</action>
    <action>Définir {{next_epic_source}} = "whole"</action>
  </check>
</check>

<check if="prochain thème trouvé">
  <action>Analyser le prochain thème pour :</action>
  - Titre du thème et objectifs
  - Cas d'usage planifiés et estimations de complexité
  - Dépendances sur le travail du Thème {{epic_number}}
  - Nouvelles exigences techniques ou capacités nécessaires
  - Risques potentiels ou inconnues
  - Objectifs métier et critères de succès

<action>Identifier les dépendances sur le travail complété :</action>

- Quels composants du Thème {{epic_number}} le Thème {{next_epic_num}} utilise-t-il ?
- Tous les prérequis sont-ils complets et stables ?
- Y a-t-il du travail incomplet qui crée des dépendances bloquantes ?

<action>Noter les lacunes potentielles ou la préparation nécessaire :</action>

- Configuration technique requise (infrastructure, outils, bibliothèques)
- Lacunes de connaissances à combler (recherche, formation, spikes)
- Refactorisation nécessaire avant de commencer le prochain thème
- Documentation ou spécifications à créer

<action>Vérifier les prérequis techniques :</action>

- APIs ou intégrations qui doivent être prêtes
- Migrations de données ou changements de schéma nécessaires
- Exigences d'infrastructure de tests
- Configuration de déploiement ou d'environnement

  <output>
Amelia (Developer) : "Très bien, j'ai révisé le Thème {{next_epic_num}} : '{{next_epic_title}}'"

Alice (Product Owner) : "Qu'est-ce qu'on a là ?"

Amelia (Developer) : "{{next_epic_num}} cas d'usage planifiés, construits sur le {{dependency_description}} du Thème {{epic_number}}."

Charlie (Senior Dev) : "Les dépendances me préoccupent. Avons-nous fini tout ce dont nous avons besoin pour ça ?"

Amelia (Developer) : "Bonne question - c'est exactement ce que nous devons explorer dans cette rétro."
</output>

<action>Définir {{next_epic_exists}} = true</action>
</check>

<check if="prochain thème NON trouvé">
  <output>
Amelia (Developer) : "Hmm, je ne vois pas le Thème {{next_epic_num}} encore défini."

Alice (Product Owner) : "Nous sommes peut-être à la fin de la roadmap, ou nous n'avons pas planifié aussi loin."

Amelia (Developer) : "Pas de problème. Nous ferons quand même une rétro approfondie sur le Thème {{epic_number}}. Les leçons seront précieuses chaque fois que nous planifierons le prochain travail."
</output>

<action>Définir {{next_epic_exists}} = false</action>
</check>

</step>

<step n="5" goal="Initialiser la Rétrospective avec un Contexte Riche">

<action>Charger l'effectif d'agents depuis {agent_roster}</action>
<action>Identifier quels agents ont participé au Thème {{epic_number}} sur la base des enregistrements de cas d'usage</action>
<action>S'assurer que les rôles clés sont présents : Product Owner, Developer (facilitant), Testing/QA, Architect</action>

<output>
Amelia (Developer) : "Très bien équipe, tout le monde est là. Laissez-moi mettre en place la scène pour notre rétrospective."

═══════════════════════════════════════════════════════════
🔄 RÉTROSPECTIVE D'ÉQUIPE - Thème {{epic_number}} : {{epic_title}}
═══════════════════════════════════════════════════════════

Amelia (Developer) : "Voici ce que nous avons accompli ensemble."

**RÉSUMÉ DU THÈME {{epic_number}} :**

Métriques de Livraison :

- Complétés : {{completed_stories}}/{{total_stories}} cas d'usage ({{completion_percentage}}%)
- Vélocité : {{actual_points}} points de cas d'usage{{#if planned_points}} (planifiés : {{planned_points}}){{/if}}
- Durée : {{actual_sprints}} sprints{{#if planned_sprints}} (planifiés : {{planned_sprints}}){{/if}}
- Vélocité moyenne : {{points_per_sprint}} points/sprint

Qualité et Technique :

- Bloqueurs rencontrés : {{blocker_count}}
- Items de dette technique : {{debt_count}}
- Couverture de tests : {{coverage_info}}
- Incidents en production : {{incident_count}}

Résultats Métier :

- Objectifs atteints : {{goals_met}}/{{total_goals}}
- Critères de succès : {{criteria_status}}
- Retours des parties prenantes : {{feedback_summary}}

Alice (Product Owner) : "Ces chiffres racontent une bonne histoire. {{completion_percentage}}% de complétion est {{#if completion_percentage >= 90}}excellent{{else}}quelque chose dont nous devrions discuter{{/if}}."

Charlie (Senior Dev) : "Je suis plus intéressé par ce nombre de dette technique - {{debt_count}} items est {{#if debt_count > 10}}préoccupant{{else}}gérable{{/if}}."

Dana (QA Engineer) : "{{incident_count}} incidents en production - {{#if incident_count == 0}}thème propre !{{else}}nous devrions parler de ceux-là{{/if}}."

{{#if next_epic_exists}}
═══════════════════════════════════════════════════════════
**APERÇU DU PROCHAIN THÈME :** Thème {{next_epic_num}} : {{next_epic_title}}
═══════════════════════════════════════════════════════════

Dépendances sur le Thème {{epic_number}} :
{{list_dependencies}}

Préparation Nécessaire :
{{list_preparation_gaps}}

Prérequis Techniques :
{{list_technical_prereqs}}

Amelia (Developer) : "Et voici ce qui arrive ensuite. Le Thème {{next_epic_num}} se construit sur ce que nous venons de finir."

Elena (Junior Dev) : "Wow, c'est beaucoup de dépendances sur notre travail."

Charlie (Senior Dev) : "Ce qui signifie que nous devrions mieux nous assurer que le Thème {{epic_number}} est vraiment solide avant d'avancer."
{{/if}}

═══════════════════════════════════════════════════════════

Amelia (Developer) : "Équipe rassemblée pour cette rétrospective :"

{{list_participating_agents}}

Amelia (Developer) : "{user_name}, vous nous rejoignez en tant que Project Lead. Votre perspective est cruciale ici."

{user_name} (Project Lead) : [Participe à la rétrospective]

Amelia (Developer) : "Notre focus aujourd'hui :"

1. Apprendre de l'exécution du Thème {{epic_number}}
   {{#if next_epic_exists}}2. Préparer le succès du Thème {{next_epic_num}}{{/if}}

Amelia (Developer) : "Règles de base : sécurité psychologique d'abord. Pas de blâme, pas de jugement. Nous nous concentrons sur les systèmes et les processus, pas sur les individus. La voix de chacun compte. Les exemples spécifiques sont mieux que les généralisations."

Alice (Product Owner) : "Et tout ce qui est partagé ici reste dans cette pièce - sauf si nous décidons ensemble d'escalader quelque chose."

Amelia (Developer) : "Exactement. {user_name}, des questions avant de plonger ?"
</output>

<action>ATTENDRE que {user_name} réponde ou indique qu'il/elle est prêt(e)</action>

</step>

<step n="6" goal="Discussion de Revue du Thème - Ce qui s'est bien passé, Ce qui ne l'a pas été">

<output>
Amelia (Developer) : "Commençons par les bonnes choses. Qu'est-ce qui s'est bien passé dans le Thème {{epic_number}} ?"

Amelia (Developer) : _fait une pause, créant de l'espace_

Alice (Product Owner) : "Je commence. Le flux d'authentification utilisateur que nous avons livré a dépassé mes attentes. L'UX est fluide, et les premiers retours utilisateurs ont été vraiment positifs."

Charlie (Senior Dev) : "Je vais ajouter à ça - la stratégie de cache que nous avons implémentée dans le Cas d'usage {{breakthrough_story_num}} a changé la donne. Nous avons réduit les appels API de 60% et cela a établi le pattern pour le reste du thème."

Dana (QA Engineer) : "De mon côté, les tests se sont déroulés plus facilement que d'habitude. La documentation du Developer était bien meilleure ce thème - des plans de tests réellement utilisables !"

Elena (Junior Dev) : _souriant_ "C'est parce que Charlie m'a obligée à tout documenter après la revue de code du Cas d'usage 1 !"

Charlie (Senior Dev) : _riant_ "L'amour vache paie."
</output>

<action>Amelia (Developer) se tourne naturellement vers {user_name} pour l'engager dans la discussion</action>

<output>
Amelia (Developer) : "{user_name}, qu'est-ce qui s'est démarqué pour vous comme bien passé dans ce thème ?"
</output>

<action>ATTENDRE que {user_name} réponde - c'est un moment d'INTERACTION UTILISATEUR CLÉ</action>

<action>Après que {user_name} réponde, faire en sorte que 1-2 membres d'équipe réagissent ou élaborent sur ce que {user_name} a partagé</action>

<output>
Alice (Product Owner) : [Répond naturellement à ce que {user_name} a dit, soit en étant d'accord, en ajoutant du contexte, soit en offrant une perspective différente]

Charlie (Senior Dev) : [Construit sur la discussion, peut-être en ajoutant des détails techniques ou en se connectant à des cas d'usage spécifiques]
</output>

<action>Continuer à faciliter le dialogue naturel, en ramenant périodiquement {user_name} dans la conversation</action>

<action>Après avoir couvert les succès, guider la transition vers les défis avec soin</action>

<output>
Amelia (Developer) : "Ok, nous avons célébré de vraies victoires. Maintenant parlons des défis - où avons-nous eu des difficultés ? Qu'est-ce qui nous a ralentis ?"

Amelia (Developer) : _crée un espace sûr avec le ton et le rythme_

Elena (Junior Dev) : _hésitant_ "Eh bien... j'ai vraiment galéré avec les migrations de base de données dans le Cas d'usage {{difficult_story_num}}. La documentation n'était pas claire, et j'ai dû refaire trois fois. J'ai perdu presque un sprint complet sur ce seul cas d'usage."

Charlie (Senior Dev) : _défensif_ "Attends - j'ai écrit ces docs de migration, et elles étaient parfaitement claires. Le problème était que les exigences continuaient de changer en plein milieu du cas d'usage !"

Alice (Product Owner) : _frustrée_ "Ce n'est pas juste, Charlie. Nous n'avons clarifié les exigences qu'une fois, et c'était parce que l'équipe technique n'a pas posé les bonnes questions pendant la planification !"

Charlie (Senior Dev) : _la chaleur monte_ "Nous avons posé plein de questions ! Tu as dit que le schéma était finalisé, puis deux jours après le début du développement tu as voulu ajouter trois nouveaux champs !"

Amelia (Developer) : _intervenant calmement_ "Prenons une respiration ici. C'est exactement le genre de chose que nous devons décortiquer."

Amelia (Developer) : "Elena, tu as passé presque un sprint complet sur le Cas d'usage {{difficult_story_num}}. Charlie, tu dis que les exigences ont changé. Alice, tu sens que les bonnes questions n'ont pas été posées dès le début."

Amelia (Developer) : "{user_name}, vous avez de la visibilité sur l'ensemble du projet. Quel est votre avis sur cette situation ?"
</output>

<action>ATTENDRE que {user_name} réponde et aide à faciliter la résolution du conflit</action>

<action>Utiliser la réponse de {user_name} pour guider la discussion vers une compréhension systémique plutôt que le blâme</action>

<output>
Amelia (Developer) : [Synthétise l'apport de {user_name} avec ce que l'équipe a partagé] "Donc il semble que le problème principal était {{root_cause_based_on_discussion}}, pas la faute d'une personne en particulier."

Elena (Junior Dev) : "Ça a du sens. Si nous avions eu {{preventive_measure}}, j'aurais probablement pu éviter ces refontes."

Charlie (Senior Dev) : _s'adoucissant_ "Ouais, et j'aurais pu être plus clair sur les hypothèses dans les docs. Désolé d'avoir été défensif, Alice."

Alice (Product Owner) : "J'apprécie ça. J'aurais aussi pu être plus proactive en signalant les ajouts de schéma plus tôt."

Amelia (Developer) : "C'est bien. Nous identifions des améliorations systémiques, pas en assignant le blâme."
</output>

<action>Continuer la discussion, en intégrant les patterns découverts lors de l'analyse approfondie des cas d'usage (Étape 2)</action>

<output>
Amelia (Developer) : "En parlant de patterns, j'ai remarqué quelque chose en révisant tous les enregistrements de cas d'usage..."

Amelia (Developer) : "{{pattern_1_description}} - cela est apparu dans {{pattern_1_count}} cas d'usage sur {{total_stories}}."

Dana (QA Engineer) : "Oh wow, je ne savais pas que c'était si répandu."

Amelia (Developer) : "Ouais. Et il y a plus - {{pattern_2_description}} est apparu dans presque chaque revue de code."

Charlie (Senior Dev) : "C'est... en fait embarrassant. Nous aurions dû repérer ce pattern plus tôt."

Amelia (Developer) : "Pas de honte, Charlie. Maintenant nous savons, et nous pouvons nous améliorer. {user_name}, avez-vous remarqué ces patterns pendant le thème ?"
</output>

<action>ATTENDRE que {user_name} partage ses observations</action>

<action>Continuer la discussion rétrospective, en créant des moments où :</action>

- Les membres de l'équipe posent directement des questions à {user_name}
- L'apport de {user_name} change la direction de la discussion
- Les désaccords surgissent naturellement et sont résolus
- Les membres plus silencieux sont invités à contribuer
- Des cas d'usage spécifiques sont référencés avec de vrais exemples
- Les émotions sont authentiques (frustration, fierté, préoccupation, espoir)

<check if="rétrospective précédente existe">
  <output>
Amelia (Developer) : "Avant de passer à autre chose, je veux revenir à la rétrospective du Thème {{prev_epic_num}}."

Amelia (Developer) : "Nous avons pris des engagements dans cette rétro. Voyons comment nous nous en sommes sortis."

Amelia (Developer) : "Item d'action 1 : {{prev_action_1}}. Statut : {{prev_action_1_status}}"

Alice (Product Owner) : {{#if prev_action_1_status == "completed"}}"Nous avons cloué celui-là !"{{else}}"Nous... n'avons pas fait celui-là."{{/if}}

Charlie (Senior Dev) : {{#if prev_action_1_status == "completed"}}"Et ça a aidé ! J'ai remarqué {{evidence_of_impact}}"{{else}}"Ouais, et je pense que c'est pour ça que nous avons eu {{consequence_of_not_doing_it}} ce thème."{{/if}}

Amelia (Developer) : "Item d'action 2 : {{prev_action_2}}. Statut : {{prev_action_2_status}}"

Dana (QA Engineer) : {{#if prev_action_2_status == "completed"}}"Celui-là a rendu les tests beaucoup plus faciles cette fois."{{else}}"Si nous avions fait ça, je pense que les tests seraient allés plus vite."{{/if}}

Amelia (Developer) : "{user_name}, en regardant ce à quoi nous nous étions engagés la dernière fois et ce que nous avons réellement fait - quelle est votre réaction ?"
</output>

<action>ATTENDRE que {user_name} réponde</action>

<action>Utiliser le suivi de la rétro précédente comme moment d'apprentissage sur l'engagement et la responsabilité</action>
</check>

<output>
Amelia (Developer) : "Très bien, nous avons couvert beaucoup de terrain. Laissez-moi résumer ce que j'entends..."

Amelia (Developer) : "**Succès :**"
{{list_success_themes}}

Amelia (Developer) : "**Défis :**"
{{list_challenge_themes}}

Amelia (Developer) : "**Insights Clés :**"
{{list_insight_themes}}

Amelia (Developer) : "Cela capture-t-il l'essentiel ? Quelqu'un a-t-il quelque chose d'important que nous avons manqué ?"
</output>

<action>Permettre aux membres de l'équipe d'ajouter des réflexions finales sur la revue du thème</action>
<action>S'assurer que {user_name} a l'opportunité d'ajouter sa perspective</action>

</step>

<step n="7" goal="Discussion de Préparation du Prochain Thème - Interactive et Collaborative">

<check if="{{next_epic_exists}} == false">
  <output>
Amelia (Developer) : "Normalement nous discuterions de la préparation du prochain thème, mais comme le Thème {{next_epic_num}} n'est pas encore défini, passons aux items d'action."
  </output>
  <action>Sauter à l'Étape 8</action>
</check>

<output>
Amelia (Developer) : "Maintenant changeons de vitesse. Le Thème {{next_epic_num}} arrive : '{{next_epic_title}}'"

Amelia (Developer) : "La question est : sommes-nous prêts ? Que devons-nous préparer ?"

Alice (Product Owner) : "De mon point de vue, nous devons nous assurer que {{dependency_concern_1}} du Thème {{epic_number}} est solide avant que nous commencions à construire dessus."

Charlie (Senior Dev) : _préoccupé_ "Je suis inquiet à propos de {{technical_concern_1}}. Nous avons {{technical_debt_item}} de ce thème qui va exploser si nous ne le traitons pas avant le Thème {{next_epic_num}}."

Dana (QA Engineer) : "Et j'ai besoin de {{testing_infrastructure_need}} en place, ou nous allons avoir le même goulot d'étranglement de test qu'au Cas d'usage {{bottleneck_story_num}}."

Elena (Junior Dev) : "Je suis moins inquiète à propos de l'infrastructure et plus à propos des connaissances. Je ne comprends pas {{knowledge_gap}} assez bien pour travailler sur les cas d'usage du Thème {{next_epic_num}}."

Amelia (Developer) : "{user_name}, l'équipe fait remonter de vraies préoccupations ici. Quel est votre sentiment sur notre préparation ?"
</output>

<action>ATTENDRE que {user_name} partage son évaluation</action>

<action>Utiliser l'apport de {user_name} pour guider une exploration plus profonde des besoins de préparation</action>

<output>
Alice (Product Owner) : [Réagit à ce que {user_name} a dit] "Je suis d'accord avec {user_name} à propos de {{point_of_agreement}}, mais je suis toujours inquiète à propos de {{lingering_concern}}."

Charlie (Senior Dev) : "Voici ce que je pense que nous avons besoin techniquement avant que le Thème {{next_epic_num}} puisse commencer..."

Charlie (Senior Dev) : "1. {{tech_prep_item_1}} - estimé {{hours_1}} heures"
Charlie (Senior Dev) : "2. {{tech_prep_item_2}} - estimé {{hours_2}} heures"
Charlie (Senior Dev) : "3. {{tech_prep_item_3}} - estimé {{hours_3}} heures"

Elena (Junior Dev) : "C'est environ {{total_hours}} heures ! C'est un sprint complet de travail de préparation !"

Charlie (Senior Dev) : "Exactement. Nous ne pouvons pas juste plonger dans le Thème {{next_epic_num}} lundi."

Alice (Product Owner) : _frustrée_ "Mais nous avons une pression des parties prenantes pour continuer à livrer des fonctionnalités. Elles ne seront pas contentes d'un 'sprint de préparation'."

Amelia (Developer) : "Pensons-y différemment. Que se passe-t-il si nous ne faisons PAS ce travail de préparation ?"

Dana (QA Engineer) : "Nous allons rencontrer des bloqueurs au milieu du Thème {{next_epic_num}}, la vélocité va plonger, et nous livrerons en retard de toute façon."

Charlie (Senior Dev) : "Pire - nous livrerons quelque chose construit sur {{technical_concern_1}}, et ce sera fragile."

Amelia (Developer) : "{user_name}, vous équilibrez la pression des parties prenantes contre la réalité technique. Comment voulez-vous gérer cela ?"
</output>

<action>ATTENDRE que {user_name} fournisse une direction sur l'approche de préparation</action>

<action>Créer de l'espace pour le débat et le désaccord sur les priorités</action>

<output>
Alice (Product Owner) : [Potentiellement en désaccord avec l'approche de {user_name}] "Je comprends ce que vous dites, {user_name}, mais d'un point de vue commercial, {{business_concern}}."

Charlie (Senior Dev) : [Potentiellement soutient ou conteste le point d'Alice] "La perspective commerciale est valide, mais {{technical_counter_argument}}."

Amelia (Developer) : "Nous avons une saine tension ici entre les besoins commerciaux et la réalité technique. C'est bien - cela signifie que nous sommes honnêtes."

Amelia (Developer) : "Explorons un terrain d'entente. Charlie, lesquels de tes items de préparation sont absolument critiques vs nice-to-have ?"

Charlie (Senior Dev) : "{{critical_prep_item_1}} et {{critical_prep_item_2}} sont non-négociables. {{nice_to_have_prep_item}} peut attendre."

Alice (Product Owner) : "Et est-ce que de la préparation critique peut se passer en parallèle avec le démarrage du Thème {{next_epic_num}} ?"

Charlie (Senior Dev) : _réfléchissant_ "Peut-être. Si nous attaquons {{first_critical_item}} avant le démarrage du thème, nous pourrions faire {{second_critical_item}} pendant le premier sprint."

Dana (QA Engineer) : "Mais cela signifie que le Cas d'usage 1 du Thème {{next_epic_num}} ne peut pas dépendre de {{second_critical_item}}."

Alice (Product Owner) : _regardant le plan du thème_ "En fait, les Cas d'usage 1 et 2 portent sur {{independent_work}}, donc ils n'en dépendent pas. Nous pourrions faire en sorte que ça marche."

Amelia (Developer) : "{user_name}, l'équipe trouve un compromis viable ici. Cette approche a-t-elle du sens pour vous ?"
</output>

<action>ATTENDRE que {user_name} valide ou ajuste la stratégie de préparation</action>

<action>Continuer à travailler à travers les besoins de préparation dans toutes les dimensions :</action>

- Dépendances sur le travail du Thème {{epic_number}}
- Configuration technique et infrastructure
- Lacunes de connaissances et besoins de recherche
- Travail de documentation ou spécification
- Infrastructure de tests
- Refactorisation ou réduction de dette
- Dépendances externes (APIs, intégrations, etc.)

<action>Pour chaque zone de préparation, faciliter une discussion d'équipe qui :</action>

- Identifie les besoins spécifiques avec des exemples concrets
- Estime l'effort de manière réaliste basée sur l'expérience du Thème {{epic_number}}
- Assigne la propriété à des agents spécifiques
- Détermine la criticité et le timing
- Fait surgir les risques de NE PAS faire la préparation
- Explore les opportunités de travail parallèle
- Implique {user_name} dans les décisions clés

<output>
Amelia (Developer) : "J'entends une image claire de ce dont nous avons besoin avant le Thème {{next_epic_num}}. Laissez-moi résumer..."

**PRÉPARATION CRITIQUE (Doit se compléter avant le démarrage du thème) :**
{{list_critical_prep_items_with_owners_and_estimates}}

**PRÉPARATION PARALLÈLE (Peut se passer pendant les premiers cas d'usage) :**
{{list_parallel_prep_items_with_owners_and_estimates}}

**PRÉPARATION NICE-TO-HAVE (Aiderait mais pas bloquant) :**
{{list_nice_to_have_prep_items}}

Amelia (Developer) : "Effort total de préparation critique : {{critical_hours}} heures ({{critical_days}} jours)"

Alice (Product Owner) : "C'est gérable. Nous pouvons communiquer cela aux parties prenantes."

Amelia (Developer) : "{user_name}, ce plan de préparation fonctionne-t-il pour vous ?"
</output>

<action>ATTENDRE la validation finale par {user_name} du plan de préparation</action>

</step>

<step n="8" goal="Synthétiser les Items d'Action avec Détection de Changement Significatif">

<output>
Amelia (Developer) : "Capturons des items d'action concrets de tout ce dont nous avons discuté."

Amelia (Developer) : "Je veux des actions spécifiques, réalisables avec des propriétaires clairs. Pas des aspirations vagues."
</output>

<action>Synthétiser les thèmes de la discussion de revue du Thème {{epic_number}} en améliorations actionnables</action>

<action>Créer des items d'action spécifiques avec :</action>

- Description claire de l'action
- Propriétaire assigné (agent ou rôle spécifique)
- Calendrier ou date limite
- Critères de succès (comment nous saurons que c'est fait)
- Catégorie (processus, technique, documentation, équipe, etc.)

<action>S'assurer que les items d'action sont SMART :</action>

- Spécifique : Clair et sans ambiguïté
- Mesurable : Peut vérifier la complétion
- Atteignable : Réaliste compte tenu des contraintes
- Pertinent : Traite de vrais problèmes de la rétro
- Temporel : A une date limite claire

<output>
Amelia (Developer) : "Sur la base de notre discussion, voici les items d'action que je propose..."

═══════════════════════════════════════════════════════════
📝 ITEMS D'ACTION DU THÈME {{epic_number}} :
═══════════════════════════════════════════════════════════

**Améliorations de Processus :**

1. {{action_item_1}}
   Propriétaire : {{agent_1}}
   Date limite : {{timeline_1}}
   Critères de succès : {{criteria_1}}

2. {{action_item_2}}
   Propriétaire : {{agent_2}}
   Date limite : {{timeline_2}}
   Critères de succès : {{criteria_2}}

Charlie (Senior Dev) : "Je peux prendre l'item d'action 1, mais {{timeline_1}} est serré. Pouvons-nous le repousser à {{alternative_timeline}} ?"

Amelia (Developer) : "Qu'en pensent les autres ? Est-ce que ce timing fonctionne toujours ?"

Alice (Product Owner) : "{{alternative_timeline}} fonctionne pour moi, tant que c'est fait avant le démarrage du Thème {{next_epic_num}}."

Amelia (Developer) : "D'accord. Mis à jour à {{alternative_timeline}}."

**Dette Technique :**

1. {{debt_item_1}}
   Propriétaire : {{agent_3}}
   Priorité : {{priority_1}}
   Effort estimé : {{effort_1}}

2. {{debt_item_2}}
   Propriétaire : {{agent_4}}
   Priorité : {{priority_2}}
   Effort estimé : {{effort_2}}

Dana (QA Engineer) : "Pour l'item de dette 1, pouvons-nous le prioriser comme haut ? Il a causé des problèmes de tests dans trois cas d'usage différents."

Charlie (Senior Dev) : "Je l'ai marqué moyen parce que {{reasoning}}, mais j'entends ton point."

Amelia (Developer) : "{user_name}, c'est un appel de priorité. Impact des tests vs {{reasoning}} - comment voulez-vous le prioriser ?"
</output>

<action>ATTENDRE que {user_name} aide à résoudre les discussions de priorité</action>

<output>
**Documentation :**
1. {{doc_need_1}}
   Propriétaire : {{agent_5}}
   Date limite : {{timeline_3}}

2. {{doc_need_2}}
   Propriétaire : {{agent_6}}
   Date limite : {{timeline_4}}

**Accords d'Équipe :**

- {{agreement_1}}
- {{agreement_2}}
- {{agreement_3}}

Amelia (Developer) : "Ces accords sont la façon dont nous nous engageons à travailler différemment à l'avenir."

Elena (Junior Dev) : "J'aime l'accord 2 - cela m'aurait sauvée sur le Cas d'usage {{difficult_story_num}}."

═══════════════════════════════════════════════════════════
🚀 TÂCHES DE PRÉPARATION DU THÈME {{next_epic_num}} :
═══════════════════════════════════════════════════════════

**Configuration Technique :**
[ ] {{setup_task_1}}
Propriétaire : {{owner_1}}
Estimé : {{est_1}}

[ ] {{setup_task_2}}
Propriétaire : {{owner_2}}
Estimé : {{est_2}}

**Développement de Connaissances :**
[ ] {{research_task_1}}
Propriétaire : {{owner_3}}
Estimé : {{est_3}}

**Nettoyage/Refactorisation :**
[ ] {{refactor_task_1}}
Propriétaire : {{owner_4}}
Estimé : {{est_4}}

**Effort Total Estimé :** {{total_hours}} heures ({{total_days}} jours)

═══════════════════════════════════════════════════════════
⚠️ CHEMIN CRITIQUE :
═══════════════════════════════════════════════════════════

**Bloqueurs à résoudre avant le Thème {{next_epic_num}} :**

1. {{critical_item_1}}
   Propriétaire : {{critical_owner_1}}
   Doit être complété avant le : {{critical_deadline_1}}

2. {{critical_item_2}}
   Propriétaire : {{critical_owner_2}}
   Doit être complété avant le : {{critical_deadline_2}}
   </output>

<action>ANALYSE CRITIQUE - Détecter si les découvertes nécessitent des mises à jour de thème</action>

<action>Vérifier si l'un des éléments suivants est vrai sur la base de la discussion rétrospective :</action>

- Hypothèses architecturales de la planification prouvées fausses pendant le Thème {{epic_number}}
- Changements majeurs de périmètre ou réduction de périmètre survenus qui affectent le prochain thème
- L'approche technique nécessite un changement fondamental pour le Thème {{next_epic_num}}
- Dépendances découvertes que le Thème {{next_epic_num}} ne prend pas en compte
- Les besoins utilisateur sont significativement différents de ce qui était initialement compris
- Préoccupations de performance/scalabilité qui affectent la conception du Thème {{next_epic_num}}
- Problèmes de sécurité ou conformité découverts qui changent l'approche
- Hypothèses d'intégration prouvées incorrectes
- Capacité d'équipe ou lacunes de compétences plus sévères que prévu
- Niveau de dette technique non soutenable sans intervention

<check if="découvertes significatives détectées">
  <output>

═══════════════════════════════════════════════════════════
🚨 ALERTE DÉCOUVERTE SIGNIFICATIVE 🚨
═══════════════════════════════════════════════════════════

Amelia (Developer) : "{user_name}, nous devons signaler quelque chose d'important."

Amelia (Developer) : "Pendant le Thème {{epic_number}}, l'équipe a découvert des conclusions qui peuvent nécessiter de mettre à jour le plan pour le Thème {{next_epic_num}}."

**Changements Significatifs Identifiés :**

1. {{significant_change_1}}
   Impact : {{impact_description_1}}

2. {{significant_change_2}}
   Impact : {{impact_description_2}}

{{#if significant_change_3}} 3. {{significant_change_3}}
Impact : {{impact_description_3}}
{{/if}}

Charlie (Senior Dev) : "Ouais, quand nous avons découvert {{technical_discovery}}, cela a fondamentalement changé notre compréhension de {{affected_area}}."

Alice (Product Owner) : "Et d'un point de vue produit, {{product_discovery}} signifie que les cas d'usage du Thème {{next_epic_num}} sont basés sur de mauvaises hypothèses."

Dana (QA Engineer) : "Si nous démarrons le Thème {{next_epic_num}} en l'état, nous allons vite frapper des murs."

**Impact sur le Thème {{next_epic_num}} :**

Le plan actuel pour le Thème {{next_epic_num}} suppose :

- {{wrong_assumption_1}}
- {{wrong_assumption_2}}

Mais le Thème {{epic_number}} a révélé :

- {{actual_reality_1}}
- {{actual_reality_2}}

Cela signifie que le Thème {{next_epic_num}} a probablement besoin de :
{{list_likely_changes_needed}}

**ACTIONS RECOMMANDÉES :**

1. Réviser et mettre à jour la définition du Thème {{next_epic_num}} sur la base des nouveaux apprentissages
2. Mettre à jour les cas d'usage affectés du Thème {{next_epic_num}} pour refléter la réalité
3. Envisager de mettre à jour l'architecture ou les spécifications techniques si applicable
4. Tenir une session d'alignement avec le Product Owner avant de démarrer le Thème {{next_epic_num}}
   {{#if prd_update_needed}}5. Mettre à jour les sections du PRD affectées par la nouvelle compréhension{{/if}}

Amelia (Developer) : "**Mise à jour du Thème requise** : OUI - Planifier une session de revue de planification du thème"

Amelia (Developer) : "{user_name}, c'est significatif. Nous devons traiter ceci avant de nous engager au plan actuel du Thème {{next_epic_num}}. Comment voulez-vous le gérer ?"
</output>

<action>ATTENDRE que {user_name} décide de comment gérer les changements significatifs</action>

<action>Ajouter la session de revue du thème au chemin critique si l'utilisateur est d'accord</action>

  <output>
Alice (Product Owner) : "Je suis d'accord avec l'approche de {user_name}. Mieux vaut ajuster le plan maintenant que d'échouer en plein thème."

Charlie (Senior Dev) : "C'est pourquoi les rétrospectives comptent. Nous avons attrapé ceci avant que cela ne devienne un désastre."

Amelia (Developer) : "Ajout au chemin critique : Session de revue de planification du Thème {{next_epic_num}} avant le démarrage du thème."
</output>
</check>

<check if="aucune découverte significative">
  <output>
Amelia (Developer) : "Bonne nouvelle - rien du Thème {{epic_number}} ne change fondamentalement notre plan pour le Thème {{next_epic_num}}. Le plan est toujours solide."

Alice (Product Owner) : "Nous avons beaucoup appris, mais la direction est bonne."
</output>
</check>

<output>
Amelia (Developer) : "Laissez-moi vous montrer le plan d'action complet..."

Amelia (Developer) : "C'est {{total_action_count}} items d'action, {{prep_task_count}} tâches de préparation, et {{critical_count}} items du chemin critique."

Amelia (Developer) : "Tout le monde est clair sur ce qu'il/elle possède ?"
</output>

<action>Donner à chaque agent avec des assignations un moment pour reconnaître leur propriété</action>

<action>S'assurer que {user_name} approuve le plan d'action complet</action>

</step>

<step n="9" goal="Exploration de Préparation Critique - Plongée Profonde Interactive">

<output>
Amelia (Developer) : "Avant de clôturer, je veux faire un dernier check de préparation."

Amelia (Developer) : "Le Thème {{epic_number}} est marqué complet dans sprint-status, mais est-il VRAIMENT terminé ?"

Alice (Product Owner) : "Que veux-tu dire, Amelia ?"

Amelia (Developer) : "Je veux dire vraiment prêt pour la production, parties prenantes contentes, pas de bouts en l'air qui vont nous mordre plus tard."

Amelia (Developer) : "{user_name}, marchons à travers ceci ensemble."
</output>

<action>Explorer l'état des tests et de la qualité à travers une conversation naturelle</action>

<output>
Amelia (Developer) : "{user_name}, parlez-moi des tests pour le Thème {{epic_number}}. Quelle vérification a été faite ?"
</output>

<action>ATTENDRE que {user_name} décrive le statut des tests</action>

<output>
Dana (QA Engineer) : [Répond à ce que {user_name} a partagé] "Je peux ajouter à ça - {{additional_testing_context}}."

Dana (QA Engineer) : "Mais honnêtement, {{testing_concern_if_any}}."

Amelia (Developer) : "{user_name}, êtes-vous confiant que le Thème {{epic_number}} est prêt pour la production d'un point de vue qualité ?"
</output>

<action>ATTENDRE que {user_name} évalue la préparation qualité</action>

<check if="{user_name} exprime des préoccupations">
  <output>
Amelia (Developer) : "Ok, capturons cela. Quels tests spécifiques sont encore nécessaires ?"

Dana (QA Engineer) : "Je peux gérer {{testing_work_needed}}, estimé {{testing_hours}} heures."

Amelia (Developer) : "Ajout au chemin critique : Compléter {{testing_work_needed}} avant le Thème {{next_epic_num}}."
</output>
<action>Ajouter la complétion des tests au chemin critique</action>
</check>

<action>Explorer le statut de déploiement et de release</action>

<output>
Amelia (Developer) : "{user_name}, quel est le statut de déploiement pour le Thème {{epic_number}} ? Est-il en production, planifié pour déploiement, ou toujours en attente ?"
</output>

<action>ATTENDRE que {user_name} fournisse le statut de déploiement</action>

<check if="pas encore déployé">
  <output>
Charlie (Senior Dev) : "S'il n'est pas encore déployé, nous devons en tenir compte dans le timing du Thème {{next_epic_num}}."

Amelia (Developer) : "{user_name}, quand le déploiement est-il planifié ? Ce timing fonctionne-t-il pour démarrer le Thème {{next_epic_num}} ?"
</output>

<action>ATTENDRE que {user_name} clarifie le calendrier de déploiement</action>

<action>Ajouter un jalon de déploiement au chemin critique avec le calendrier convenu</action>
</check>

<action>Explorer l'acceptation des parties prenantes</action>

<output>
Amelia (Developer) : "{user_name}, les parties prenantes ont-elles vu et accepté les livrables du Thème {{epic_number}} ?"

Alice (Product Owner) : "C'est important - j'ai vu des thèmes 'done' être rejetés par les parties prenantes et forcer du retravail."

Amelia (Developer) : "{user_name}, des retours de parties prenantes encore en attente ?"
</output>

<action>ATTENDRE que {user_name} décrive le statut d'acceptation des parties prenantes</action>

<check if="acceptation incomplète ou retours en attente">
  <output>
Alice (Product Owner) : "Nous devrions obtenir une acceptation formelle avant de passer à autre chose. Sinon le Thème {{next_epic_num}} pourrait être interrompu par du retravail."

Amelia (Developer) : "{user_name}, comment voulez-vous gérer l'acceptation des parties prenantes ? Devrions-nous en faire un item du chemin critique ?"
</output>

<action>ATTENDRE la décision de {user_name}</action>

<action>Ajouter l'acceptation des parties prenantes au chemin critique si l'utilisateur est d'accord</action>
</check>

<action>Explorer la santé technique et la stabilité</action>

<output>
Amelia (Developer) : "{user_name}, c'est une question de bon sens : Comment se sent le codebase après le Thème {{epic_number}} ?"

Amelia (Developer) : "Stable et maintenable ? Ou y a-t-il des préoccupations qui rôdent ?"

Charlie (Senior Dev) : "Soyez honnête, {user_name}. Nous avons tous livré des thèmes qui se sentaient... fragiles."
</output>

<action>ATTENDRE que {user_name} évalue la santé du codebase</action>

<check if="{user_name} exprime des préoccupations de stabilité">
  <output>
Charlie (Senior Dev) : "Ok, creusons cela. Qu'est-ce qui cause ces préoccupations ?"

Charlie (Senior Dev) : [Aide {user_name} à articuler les préoccupations techniques]

Amelia (Developer) : "Que faudrait-il pour traiter ces préoccupations et se sentir confiant à propos de la stabilité ?"

Charlie (Senior Dev) : "Je dirais que nous avons besoin de {{stability_work_needed}}, environ {{stability_hours}} heures."

Amelia (Developer) : "{user_name}, traiter ce travail de stabilité vaut-il la peine d'être fait avant le Thème {{next_epic_num}} ?"
</output>

<action>ATTENDRE la décision de {user_name}</action>

<action>Ajouter le travail de stabilité au sprint de préparation si l'utilisateur est d'accord</action>
</check>

<action>Explorer les bloqueurs non résolus</action>

<output>
Amelia (Developer) : "{user_name}, y a-t-il des bloqueurs non résolus ou des problèmes techniques du Thème {{epic_number}} que nous portons en avant ?"

Dana (QA Engineer) : "Des choses qui pourraient créer des problèmes pour le Thème {{next_epic_num}} si nous ne les traitons pas ?"

Amelia (Developer) : "Rien n'est interdit ici. S'il y a un problème, nous devons le savoir."
</output>

<action>ATTENDRE que {user_name} fasse remonter les bloqueurs</action>

<check if="bloqueurs identifiés">
  <output>
Amelia (Developer) : "Capturons ces bloqueurs et déterminons comment ils affectent le Thème {{next_epic_num}}."

Charlie (Senior Dev) : "Pour {{blocker_1}}, si nous le laissons non résolu, cela {{impact_description_1}}."

Alice (Product Owner) : "Cela semble critique. Nous devons le traiter avant d'avancer."

Amelia (Developer) : "D'accord. Ajout au chemin critique : Résoudre {{blocker_1}} avant le démarrage du Thème {{next_epic_num}}."

Amelia (Developer) : "Qui possède ce travail ?"
</output>

<action>Assigner la résolution du bloqueur à l'agent approprié</action>
<action>Ajouter au chemin critique avec priorité et date limite</action>
</check>

<action>Synthétiser l'évaluation de préparation</action>

<output>
Amelia (Developer) : "Ok {user_name}, laissez-moi synthétiser ce que nous venons de découvrir..."

**ÉVALUATION DE PRÉPARATION DU THÈME {{epic_number}} :**

Tests & Qualité : {{quality_status}}
{{#if quality_concerns}}⚠️ Action nécessaire : {{quality_action_needed}}{{/if}}

Déploiement : {{deployment_status}}
{{#if deployment_pending}}⚠️ Planifié pour : {{deployment_date}}{{/if}}

Acceptation des Parties Prenantes : {{acceptance_status}}
{{#if acceptance_incomplete}}⚠️ Action nécessaire : {{acceptance_action_needed}}{{/if}}

Santé Technique : {{stability_status}}
{{#if stability_concerns}}⚠️ Action nécessaire : {{stability_action_needed}}{{/if}}

Bloqueurs Non Résolus : {{blocker_status}}
{{#if blockers_exist}}⚠️ Doit résoudre : {{blocker_list}}{{/if}}

Amelia (Developer) : "{user_name}, cette évaluation correspond-elle à votre compréhension ?"
</output>

<action>ATTENDRE que {user_name} confirme ou corrige l'évaluation</action>

<output>
Amelia (Developer) : "Sur la base de cette évaluation, le Thème {{epic_number}} est {{#if all_clear}}entièrement complet et nous sommes libres de continuer{{else}}complet d'un point de vue cas d'usage, mais nous avons {{critical_work_count}} items critiques avant le Thème {{next_epic_num}}{{/if}}."

Alice (Product Owner) : "Ce niveau de minutie est pourquoi les rétrospectives sont précieuses."

Charlie (Senior Dev) : "Mieux vaut attraper ceci maintenant que trois cas d'usage dans le prochain thème."
</output>

</step>

<step n="10" goal="Clôture de la Rétrospective avec Célébration et Engagement">

<output>
Amelia (Developer) : "Nous avons couvert beaucoup de terrain aujourd'hui. Laissez-moi clôturer cette rétrospective."

═══════════════════════════════════════════════════════════
✅ RÉTROSPECTIVE COMPLÈTE
═══════════════════════════════════════════════════════════

Amelia (Developer) : "Thème {{epic_number}} : {{epic_title}} - RÉVISÉ"

**Points Clés à Retenir :**

1. {{key_lesson_1}}
2. {{key_lesson_2}}
3. {{key_lesson_3}}
   {{#if key_lesson_4}}4. {{key_lesson_4}}{{/if}}

Alice (Product Owner) : "Ce premier point à retenir est énorme - {{impact_of_lesson_1}}."

Charlie (Senior Dev) : "Et la leçon 2 est quelque chose que nous pouvons appliquer immédiatement."

Amelia (Developer) : "Engagements pris aujourd'hui :"

- Items d'Action : {{action_count}}
- Tâches de Préparation : {{prep_task_count}}
- Items du Chemin Critique : {{critical_count}}

Dana (QA Engineer) : "C'est beaucoup d'engagements. Nous devons réellement nous y tenir cette fois."

Amelia (Developer) : "D'accord. C'est pourquoi nous réviserons ces items d'action lors de notre prochain standup."

═══════════════════════════════════════════════════════════
🎯 PROCHAINES ÉTAPES :
═══════════════════════════════════════════════════════════

1. Exécuter le Sprint de Préparation (Est : {{prep_days}} jours)
2. Compléter les items du Chemin Critique avant le Thème {{next_epic_num}}
3. Réviser les items d'action lors du prochain standup
   {{#if epic_update_needed}}4. Tenir une session de revue de planification du Thème {{next_epic_num}}{{else}}4. Commencer la planification du Thème {{next_epic_num}} une fois la préparation complète{{/if}}

Elena (Junior Dev) : "{{prep_days}} jours de travail de préparation est significatif, mais nécessaire."

Alice (Product Owner) : "Je communiquerai le calendrier aux parties prenantes. Elles comprendront si nous le présentons comme 'assurer le succès du Thème {{next_epic_num}}'."

═══════════════════════════════════════════════════════════

Amelia (Developer) : "Avant de clôturer, je veux prendre un moment pour reconnaître l'équipe."

Amelia (Developer) : "Le Thème {{epic_number}} a livré {{completed_stories}} cas d'usage avec {{velocity_description}} de vélocité. Nous avons surmonté {{blocker_count}} bloqueurs. Nous avons beaucoup appris. C'est du vrai travail par de vraies personnes."

Charlie (Senior Dev) : "Bien dit."

Alice (Product Owner) : "Je suis fière de ce que nous avons livré."

Dana (QA Engineer) : "Et je suis impatiente du Thème {{next_epic_num}} - surtout maintenant que nous y sommes préparés."

Amelia (Developer) : "{user_name}, des réflexions finales avant de clôturer ?"
</output>

<action>ATTENDRE que {user_name} partage ses réflexions finales</action>

<output>
Amelia (Developer) : [Reconnaît ce que {user_name} a partagé] "Merci pour cela, {user_name}."

Amelia (Developer) : "Très bien équipe - excellent travail aujourd'hui. Nous avons beaucoup appris du Thème {{epic_number}}. Utilisons ces insights pour rendre le Thème {{next_epic_num}} encore meilleur."

Amelia (Developer) : "À bientôt quand le travail de préparation sera fait. Réunion levée !"

═══════════════════════════════════════════════════════════
</output>

<action>Préparer la sauvegarde du document résumé de rétrospective</action>

</step>

<step n="11" goal="Sauvegarder la Rétrospective et Mettre à Jour le Statut Sprint">

<action>S'assurer que le dossier des rétrospectives existe : {implementation_artifacts}</action>
<action>Créer le dossier s'il n'existe pas</action>

<action>Générer un document résumé de rétrospective complet incluant :</action>

- Résumé du thème et métriques
- Participants de l'équipe
- Succès et forces identifiées
- Défis et zones de croissance
- Insights clés et apprentissages
- Analyse de suivi de la rétro précédente (si applicable)
- Aperçu du prochain thème et dépendances
- Items d'action avec propriétaires et calendriers
- Tâches de préparation pour le prochain thème
- Items du chemin critique
- Découvertes significatives et recommandations de mise à jour du thème (le cas échéant)
- Évaluation de préparation
- Engagements et prochaines étapes

<action>Formater le document de rétrospective en markdown lisible avec des sections claires</action>
<action>Définir le nom du fichier : {implementation_artifacts}/epic-{{epic_number}}-retro-{date}.md</action>
<action>Sauvegarder le document de rétrospective</action>

<output>
✅ Document de rétrospective sauvegardé : {implementation_artifacts}/epic-{{epic_number}}-retro-{date}.md
</output>

<action>Mettre à jour {sprint_status_file} pour marquer la rétrospective comme complétée</action>

<action>Charger le fichier ENTIER : {sprint_status_file}</action>
<action>Trouver la clé development_status "epic-{{epic_number}}-retrospective"</action>
<action>Vérifier le statut actuel (typiquement "optional" ou "pending")</action>
<action>Mettre à jour development_status["epic-{{epic_number}}-retrospective"] = "done"</action>
<action>Mettre à jour le champ last_updated avec la date actuelle</action>
<action>Sauvegarder le fichier, en préservant TOUS les commentaires et la structure y compris STATUS DEFINITIONS</action>

<check if="mise à jour réussie">
  <output>
✅ Rétrospective marquée comme complétée dans {sprint_status_file}

Clé de rétrospective : epic-{{epic_number}}-retrospective
Statut : {{previous_status}} → done
</output>
</check>

<check if="clé de rétrospective non trouvée">
  <output>
⚠️ Impossible de mettre à jour le statut de rétrospective : epic-{{epic_number}}-retrospective non trouvée dans {sprint_status_file}

Le document de rétrospective a été sauvegardé avec succès, mais {sprint_status_file} peut nécessiter une mise à jour manuelle.
</output>
</check>

</step>

<step n="12" goal="Résumé Final et Transmission">

<output>
**✅ Rétrospective Complète, {user_name} !**

**Revue du Thème :**

- Thème {{epic_number}} : {{epic_title}} révisé
- Statut de la Rétrospective : complétée
- Rétrospective sauvegardée : {implementation_artifacts}/epic-{{epic_number}}-retro-{date}.md

**Engagements Pris :**

- Items d'Action : {{action_count}}
- Tâches de Préparation : {{prep_task_count}}
- Items du Chemin Critique : {{critical_count}}

**Prochaines Étapes :**

1. **Réviser le résumé de rétrospective** : {implementation_artifacts}/epic-{{epic_number}}-retro-{date}.md

2. **Exécuter le sprint de préparation** (Est : {{prep_days}} jours)
   - Compléter {{critical_count}} items du chemin critique
   - Exécuter {{prep_task_count}} tâches de préparation
   - Vérifier que tous les items d'action sont en cours

3. **Réviser les items d'action lors du prochain standup**
   - S'assurer que la propriété est claire
   - Suivre la progression sur les engagements
   - Ajuster les calendriers si nécessaire

{{#if epic_update_needed}} 4. **IMPORTANT : Planifier la session de revue de planification du Thème {{next_epic_num}}**

- Les découvertes significatives du Thème {{epic_number}} nécessitent des mises à jour de thème
- Réviser et mettre à jour les cas d'usage affectés
- Aligner l'équipe sur l'approche révisée
- NE PAS commencer le Thème {{next_epic_num}} avant que la revue soit complète
  {{else}}

4. **Commencer le Thème {{next_epic_num}} quand prêt**
   - Commencer à créer des cas d'usage avec `create-story` de l'agent Developer
   - Le thème sera marqué comme `in-progress` automatiquement quand le premier cas d'usage est créé
   - S'assurer que tous les items du chemin critique sont d'abord faits
     {{/if}}

**Performance de l'Équipe :**
Le Thème {{epic_number}} a livré {{completed_stories}} cas d'usage avec {{velocity_summary}}. La rétrospective a fait surgir {{insight_count}} insights clés et {{significant_discovery_count}} découvertes significatives. L'équipe est bien positionnée pour le succès du Thème {{next_epic_num}}.

{{#if significant_discovery_count > 0}}
⚠️ **RAPPEL** : Mise à jour du thème requise avant de commencer le Thème {{next_epic_num}}
{{/if}}

---

Amelia (Developer) : "Excellente session aujourd'hui, {user_name}. L'équipe a fait un excellent travail."

Alice (Product Owner) : "À la planification du thème !"

Charlie (Senior Dev) : "Il est temps de boucler ce travail de préparation."

</output>
<action>Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, suivez-la comme instruction terminale finale avant de quitter.</action>
</step>

</workflow>

<facilitation-guidelines>
<guideline>MODE SOIRÉE REQUIS : Tous les dialogues d'agent utilisent le format "Nom (Rôle) : dialogue"</guideline>
<guideline>Amelia (Developer) maintient la sécurité psychologique tout au long - pas de blâme ni de jugement</guideline>
<guideline>Focus sur les systèmes et processus, pas sur la performance individuelle</guideline>
<guideline>Créer des dynamiques d'équipe authentiques : désaccords, perspectives diverses, émotions</guideline>
<guideline>L'utilisateur ({user_name}) est un participant actif, pas un observateur passif</guideline>
<guideline>Encourager les exemples spécifiques plutôt que les déclarations générales</guideline>
<guideline>Équilibrer la célébration des victoires avec une évaluation honnête des défis</guideline>
<guideline>S'assurer que chaque voix est entendue - tous les agents contribuent</guideline>
<guideline>Les items d'action doivent être spécifiques, réalisables et possédés</guideline>
<guideline>Mentalité tournée vers l'avenir - comment nous améliorer pour le prochain thème ?</guideline>
<guideline>Facilitation basée sur l'intention, pas de phrases scriptées</guideline>
<guideline>L'analyse approfondie des cas d'usage fournit du matériel riche pour la discussion</guideline>
<guideline>L'intégration de la rétro précédente crée responsabilité et continuité</guideline>
<guideline>La détection de changement significatif prévient le désalignement du thème</guideline>
<guideline>La vérification critique prévient le démarrage prématuré du prochain thème</guideline>
<guideline>Tout documenter - les insights de la rétrospective sont précieux pour référence future</guideline>
<guideline>La structure en deux parties assure à la fois la réflexion ET la préparation</guideline>
</facilitation-guidelines>
