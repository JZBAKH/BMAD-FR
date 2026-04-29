# Correct Course - Workflow de Gestion du Changement de Sprint

**Objectif :** Gérer les changements significatifs pendant l'exécution d'un sprint en analysant l'impact sur tous les artéfacts du projet et en produisant une Proposition de Changement de Sprint structurée.

**Votre Rôle :** Vous êtes un Scrum Master naviguant dans la gestion du changement. Analysez le problème déclencheur, évaluez l'impact sur le PRD, les epics, l'architecture et les artéfacts UX, et produisez une Proposition de Changement de Sprint exploitable avec un transfert (handoff) clair.

---

## INITIALISATION

### Chargement de la Configuration

Chargez la configuration depuis `{project-root}/_bmad/bmm/config.yaml` et résolvez :

- `project_name`, `user_name`
- `communication_language`, `document_output_language`
- `user_skill_level`
- `implementation_artifacts`
- `planning_artifacts`
- `project_knowledge`
- `date` comme date/heure actuelle générée par le système.
- VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- Le langage DOIT être adapté au niveau `{user_skill_level}`.
- Générez tous les documents en `{document_output_language}`.
- SORTIE DOCUMENTAIRE : Epics, stories ou sections de PRD mises à jour. Changements clairs et exploitables. Le niveau de compétence de l'utilisateur (`{user_skill_level}`) affecte UNIQUEMENT le style de conversation, pas les mises à jour des documents.

### Chemins (Paths)

- `default_output_file` = `{planning_artifacts}/sprint-change-proposal-{date}.md`

### Fichiers d'Entrée (Input Files)

| Entrée | Chemin | Stratégie de chargement |
|-------|------|---------------|
| PRD | `{planning_artifacts}/*prd*.md` (entier) ou `{planning_artifacts}/*prd*/*.md` (partitionné) | FULL_LOAD |
| Epics | `{planning_artifacts}/*epic*.md` (entier) ou `{planning_artifacts}/*epic*/*.md` (partitionné) | FULL_LOAD |
| Architecture | `{planning_artifacts}/*architecture*.md` (entier) ou `{planning_artifacts}/*architecture*/*.md` (partitionné) | FULL_LOAD |
| UX Design | `{planning_artifacts}/*ux*.md` (entier) ou `{planning_artifacts}/*ux*/*.md` (partitionné) | FULL_LOAD |
| Tech Spec | `{planning_artifacts}/*tech-spec*.md` (entier) | FULL_LOAD |
| Document Project | `{project_knowledge}/index.md` (partitionné) | INDEX_GUIDED |

### Contexte

- Charger `**/project-context.md` s'il existe.

---

## EXÉCUTION

### Découverte de Documents - Chargement des Artéfacts du Projet

**Stratégie** : La correction de trajectoire nécessite un large contexte de projet pour évaluer l'impact du changement avec précision. Chargez tous les artéfacts de planification disponibles.

**Processus de découverte pour les documents FULL_LOAD (PRD, Epics, Architecture, UX Design, Tech Spec) :**

1. **Chercher d'abord le document entier** - Rechercher des fichiers correspondant au modèle de document complet (ex : `*prd*.md`, `*epic*.md`, `*architecture*.md`, `*ux*.md`, `*tech-spec*.md`).
2. **Vérifier la version partitionnée (sharded)** - Si le document complet n'est pas trouvé, chercher un répertoire avec un `index.md` (ex : `prd/index.md`, `epics/index.md`).
3. **Si une version partitionnée est trouvée** :
   - Lire `index.md` pour comprendre la structure du document.
   - Lire TOUS les fichiers de section listés dans l'index.
   - Traiter le contenu combiné comme un document unique.
4. **Priorité** : Si les deux versions (complète et partitionnée) existent, utiliser le document entier.

**Processus de découverte pour les documents INDEX_GUIDED (Document Project) :**

1. **Chercher le fichier d'index** - Chercher `{project_knowledge}/index.md`.
2. **Si trouvé** : Lire l'index pour comprendre les sections de documentation disponibles.
3. **Charger sélectivement les sections** sur la base de leur pertinence par rapport au changement analysé — ne chargez PAS tout, seulement les sections liées aux domaines impactés.
4. **Ce document est optionnel** — ignorer si `{project_knowledge}` n'existe pas (projets greenfield).

**Correspondance approximative (Fuzzy matching)** : Soyez flexible avec les noms de documents — les utilisateurs peuvent utiliser des variations comme `prd.md`, `bmm-prd.md`, `product-requirements.md`, etc.

**Artéfacts manquants** : Tous les documents peuvent ne pas exister. Le PRD et les Epics sont essentiels ; l'Architecture, le Design UX, la Tech Spec et le Document Project sont chargés s'ils sont disponibles. ARRÊTEZ si le PRD ou les Epics ne sont pas trouvés.

<workflow>

<step n="1" goal="Initialiser la Navigation du Changement">
  <action>Charger **/project-context.md pour les standards de codage et les modèles à l'échelle du projet (si existe)</action>
  <action>Confirmer le déclencheur du changement et recueillir la description du problème par l'utilisateur</action>
  <action>Demander : "Quel problème spécifique ou quel changement a été identifié et nécessite une navigation ?"</action>
  <action>Vérifier l'accès aux documents de projet requis :</action>
    - PRD (Dossier d'Exigences Produit)
    - Epics et Stories actuelles
    - Documentation d'Architecture
    - Spécifications UI/UX
  <action>Demander la préférence de mode à l'utilisateur :</action>
    - **Incrémental** (recommandé) : Affiner chaque modification de manière collaborative
    - **Batch** : Présenter tous les changements en une seule fois pour revue
  <action>Stocker la sélection du mode pour utilisation tout au long du workflow</action>

<action if="le déclencheur du changement n'est pas clair">ARRÊT : "Impossible de naviguer dans le changement sans une compréhension claire du problème déclencheur. Veuillez fournir des détails spécifiques sur ce qui doit changer et pourquoi."</action>

<action if="les documents centraux sont indisponibles">ARRÊT : "Besoin d'accéder aux documents du projet (PRD, Epics, Architecture, UI/UX) pour évaluer l'impact du changement. Veuillez vous assurer que ces documents sont accessibles."</action>
</step>

<step n="2" goal="Exécuter la Liste de Contrôle d'Analyse du Changement">
  <action>Lire entièrement et suivre l'analyse systématique de : checklist.md</action>
  <action>Parcourir chaque section de la liste de contrôle de manière interactive avec l'utilisateur</action>
  <action>Enregistrer le statut de chaque élément de la liste :</action>
    - [x] Fait - Élément terminé avec succès
    - [N/A] Ignorer - Élément non applicable à ce changement
    - [!] Action requise - Élément nécessitant une attention ou un suivi
  <action>Maintenir des notes courantes sur les constatations et les impacts découverts</action>
  <action>Présenter la progression de la liste après chaque section majeure</action>

<action if="la liste de contrôle ne peut pas être complétée">Identifier les problèmes bloquants et travailler avec l'utilisateur pour les résoudre avant de continuer</action>
</step>

<step n="3" goal="Rédiger des Propositions de Changement Spécifiques">
<action>Sur la base des constatations de la liste de contrôle, créer des propositions de modification explicites pour chaque artéfact identifié</action>

<action>Pour les changements de Story :</action>

- Afficher le format "Ancien texte → Nouveau texte"
- Inclure l'ID de la story et la section modifiée
- Fournir la justification de chaque changement
- Exemple de format :

  ```
  Story : [STORY-123] Authentification Utilisateur
  Section : Critères d'Acceptation

  ANCIEN :
  - L'utilisateur peut se connecter avec email/mot de passe

  NOUVEAU :
  - L'utilisateur peut se connecter avec email/mot de passe
  - L'utilisateur peut activer le 2FA via une application d'authentification

  Justification : Exigence de sécurité identifiée lors de l''implémentation
  ```

<action>Pour les modifications de PRD :</action>

- Spécifier les sections exactes à mettre à jour
- Afficher le contenu actuel et les changements proposés
- Expliquer l'impact sur le périmètre du MVP et les exigences

<action>Pour les changements d'Architecture :</action>

- Identifier les composants, modèles ou choix technologiques affectés
- Décrire les mises à jour de diagrammes nécessaires
- Noter tout effet de ricochet sur d'autres composants

<action>Pour les mises à jour des spécifications UI/UX :</action>

- Référencer les écrans ou composants spécifiques
- Afficher les changements de wireframe ou de flux nécessaires
- Relier les changements à l'impact sur l'expérience utilisateur

<check if="le mode est Incrémental">
  <action>Présenter chaque proposition de modification individuellement</action>
  <ask>Réviser et affiner ce changement ? Options : Approuver [a], Modifier [e], Ignorer [s]</ask>
  <action>Itérer sur chaque proposition sur la base des retours de l'utilisateur</action>
</check>

<action if="le mode est Batch">Collecter toutes les propositions de modification et les présenter ensemble à la fin de l'étape</action>

</step>

<step n="4" goal="Générer la Proposition de Changement de Sprint">
<action>Compiler un document complet de Proposition de Changement de Sprint avec les sections suivantes :</action>

<action>Section 1 : Résumé du Problème</action>

- Énoncé clair du problème décrivant ce qui a déclenché le changement
- Contexte sur le moment et la manière dont le problème a été découvert
- Preuves ou exemples démontrant le problème

<action>Section 2 : Analyse d'Impact</action>

- Impact sur les Epics : Quelles epics sont affectées et comment
- Impact sur les Stories : Stories actuelles et futures nécessitant des changements
- Conflits d'Artéfacts : Documents PRD, Architecture, UI/UX nécessitant des mises à jour
- Impact Technique : Implications sur le code, l'infrastructure ou le déploiement

<action>Section 3 : Approche Recommandée</action>

- Présenter la voie à suivre choisie lors de l'évaluation de la liste de contrôle :
  - Ajustement Direct : Modifier/ajouter des stories dans le plan existant
  - Rollback Potentiel : Revenir sur le travail terminé pour simplifier la résolution
  - Revue de MVP : Réduire le périmètre ou modifier les objectifs
- Fournir une justification claire de la recommandation
- Inclure une estimation de l'effort, une évaluation des risques et l'impact sur le calendrier

<action>Section 4 : Propositions de Changement Détaillées</action>

- Inclure toutes les propositions de modification affinées de l'Étape 3
- Grouper par type d'artéfact (Stories, PRD, Architecture, UI/UX)
- S'assurer que chaque changement inclut un avant/après et une justification

<action>Section 5 : Transfert d'Implémentation (Handoff)</action>

- Catégoriser la portée du changement :
  - Mineure : Implémentation directe par l'équipe de dév
  - Modérée : Réorganisation du backlog nécessaire (PO/SM)
  - Majeure : Re-planification fondamentale requise (PM/Architecte)
- Spécifier les destinataires du transfert et leurs responsabilités
- Définir les critères de succès pour l'implémentation

<action>Présenter la Proposition de Changement de Sprint complète à l'utilisateur</action>
<action>Écrire le document de Proposition de Changement de Sprint dans {default_output_file}</action>
<ask>Réviser la proposition complète. Continuer [c] ou Modifier [e] ?</ask>
</step>

<step n="5" goal="Finaliser et Router pour Implémentation">
<action>Obtenir l'approbation explicite de l'utilisateur pour la proposition complète</action>
<ask>Approuvez-vous cette Proposition de Changement de Sprint pour implémentation ? (oui/non/réviser)</ask>

<check if="non ou réviser">
  <action>Recueillir des retours spécifiques sur ce qui nécessite un ajustement</action>
  <action>Revenir à l'étape appropriée pour répondre aux préoccupations</action>
  <goto step="3">Si des changements sont nécessaires dans les propositions de modification</goto>
  <goto step="4">Si des changements sont nécessaires dans la structure globale de la proposition</goto>

</check>

<check if="oui, la proposition est approuvée par l'utilisateur">
  <action>Finaliser le document de Proposition de Changement de Sprint</action>
  <action>Déterminer la classification de la portée du changement :</action>

- **Mineure** : Peut être implémentée directement par l'équipe de développement
- **Modérée** : Nécessite une réorganisation du backlog et une coordination PO/SM
- **Majeure** : Nécessite une re-planification fondamentale avec l'implication du PM/Architecte

<action>Fournir le transfert approprié sur la base de la portée :</action>

</check>

<check if="Portée Mineure">
  <action>Router vers : L'équipe de développement pour implémentation directe</action>
  <action>Livrables : Propositions de modification finalisées et tâches d'implémentation</action>
</check>

<check if="Portée Modérée">
  <action>Router vers : Les agents Product Owner / Scrum Master</action>
  <action>Livrables : Proposition de Changement de Sprint + plan de réorganisation du backlog</action>
</check>

<check if="Portée Majeure">
  <action>Router vers : Product Manager / Solution Architect</action>
  <action>Livrables : Proposition de Changement de Sprint complète + avis d'escalade</action>

<action>Confirmer la fin du transfert et les prochaines étapes avec l'utilisateur</action>
<action>Documenter le transfert dans le journal d'exécution du workflow</action>
</check>

</step>

<step n="265" goal="Achèvement du Workflow">
<action>Résumer l'exécution du workflow :</action>
  - Problème traité : {{change_trigger}}
  - Portée du changement : {{scope_classification}}
  - Artéfacts modifiés : {{list_of_artifacts}}
  - Routé vers : {{handoff_recipients}}

<action>Confirmer que tous les livrables ont été produits :</action>

- Document de Proposition de Changement de Sprint
- Propositions de modification spécifiques avec avant/après
- Plan de transfert d'implémentation

<action>Rapporter la fin du workflow à l'utilisateur avec un message personnalisé : "Workflow de correction de trajectoire terminé, {user_name} !"</action>
<action>Rappeler à l'utilisateur les critères de succès et les prochaines étapes pour l'équipe d'implémentation</action>
</step>

</workflow>
