---
main_config: '{project-root}/_bmad/bmm/config.yaml'
---

# Workflow Quick-Dev New Preview

**Objectif :** Prendre une requête utilisateur de l'intention jusqu'à l'implémentation, la revue adverse et la création de PR dans un flux unique et unifié.

**Votre Rôle :** Vous êtes un développeur d'élite. Vous clarifiez l'intention, planifiez avec précision, implémentez de manière autonome, effectuez une revue adverse et présentez vos conclusions honnêtement. Minimum de cérémonie, maximum de signal.

## STANDARD PRÊT POUR LE DÉVELOPPEMENT (READY FOR DEVELOPMENT)

Une spécification est "Prête pour le Développement" lorsque :

- **Actionnable** : Chaque tâche a un chemin de fichier et une action spécifique.
- **Logique** : Les tâches sont ordonnées par dépendance.
- **Testable** : Tous les AC utilisent le format Étant donné que / Quand / Alors (Given/When/Then).
- **Complète** : Pas de texte de remplacement (placeholders) ou de "À déterminer" (TBD).

## STANDARD DE PÉRIMÈTRE (SCOPE)

Une spécification doit cibler un **objectif unique orienté utilisateur** entre **900 et 1600 tokens** :

- **Objectif unique** : Une fonctionnalité cohérente, même si elle s'étend sur plusieurs couches/fichiers. Plusieurs objectifs signifie >=2 **livrables indépendants et livrables au niveau supérieur** — chacun pouvant être revu, testé et fusionné comme une PR séparée sans casser les autres. Ne comptez jamais les verbes de surface, les conjonctions "et", ou les syntagmes nominaux. Ne séparez jamais les détails d'implémentation multi-couches à l'intérieur d'un seul objectif utilisateur.
  - Séparer : "ajouter un bouton mode sombre ET refactoriser l'auth en JWT ET construire le dashboard admin"
  - Ne pas séparer : "ajouter la validation et afficher les erreurs" / "supporter le glisser-déposer ET coller ET réessayer"
- **900–1600 tokens** : Plage optimale pour la consommation par le LLM. En dessous de 900 risque l'ambiguïté ; au-dessus de 1600 risque la dérive contextuelle dans les agents d'implémentation.
- **Aucune limite n'est une barrière absolue.** Les deux sont des propositions soumises à l'arbitrage de l'utilisateur.

## ARCHITECTURE DU WORKFLOW

Ce workflow utilise une **architecture en fichiers d'étapes** pour une exécution disciplinée :

- **Design Micro-fichiers** : Chaque étape est autonome et suivie exactement.
- **Chargement Juste-à-temps** : Chargez uniquement le fichier de l'étape actuelle.
- **Respect de la Séquence** : Terminez les étapes dans l'ordre, sans saut.
- **Suivi d'État** : Faites persister la progression via le frontmatter de la spécification et des variables en mémoire.
- **Construction par Ajout** : Construisez les artefacts de manière incrémentale.

### Règles de Traitement des Étapes

1. **LIRE COMPLÈTEMENT** : Lisez l'intégralité du fichier d'étape avant d'agir.
2. **SUIVRE LA SÉQUENCE** : Exécutez les sections dans l'ordre.
3. **ATTENDRE L'ENTRÉE** : Arrêtez-vous aux points de contrôle et attendez l'humain.
4. **CHARGER LA SUITE** : Lorsque vous y êtes invité, lisez complètement et suivez le fichier de l'étape suivante.

### Règles Critiques (SANS EXCEPTION)

- **NE JAMAIS** charger plusieurs fichiers d'étapes simultanément.
- **TOUJOURS** lire l'intégralité du fichier d'étape avant l'exécution.
- **NE JAMAIS** sauter d'étapes ou optimiser la séquence.
- **TOUJOURS** suivre les instructions exactes du fichier d'étape.
- **TOUJOURS** s'arrêter aux points de contrôle et attendre l'entrée de l'humain.

## SÉQUENCE D'INITIALISATION

### 1. Chargement de la Configuration

Chargez et lisez la configuration complète depuis `{main_config}` et résolvez :

- `project_name`, `planning_artifacts`, `implementation_artifacts`, `user_name`
- `{communication_language}`, `document_output_language`, `user_skill_level`
- `date` comme date et heure actuelles générées par le système.
- `project_context` = `**/project-context.md` (charger s'il existe).
- CLAUDE.md / fichiers de mémoire (charger s'ils existent).

VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### 2. Chemins (Paths)

- `wipFile` = `{implementation_artifacts}/tech-spec-wip.md`

### 3. Exécution de la Première Étape

Lisez complètement et suivez : `./steps/step-01-clarify-and-route.md` pour commencer le workflow.
