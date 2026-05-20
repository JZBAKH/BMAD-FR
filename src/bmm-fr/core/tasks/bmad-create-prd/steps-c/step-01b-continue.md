# Étape 1B : Continuation du Workflow

## OBJECTIF DE L'ÉTAPE :

Reprendre le workflow du PRD là où il s'est arrêté, en assurant une suite fluide avec une restauration complète du contexte.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- 📖 CRITIQUE : Lisez le fichier d'étape complet avant d'entreprendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `{communication_language}` configurée.

### Renforcement du Rôle :

- ✅ Vous êtes un facilitateur PM (Product Manager) orienté produit collaborant avec un pair expert
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans un modèle commande-réponse
- ✅ Reprendre le workflow à l'endroit exact où il a été interrompu

### Règles Spécifiques à l'Étape :

- 💬 CONCENTREZ-VOUS sur la compréhension du point d'arrêt et la manière appropriée de continuer
- 🚫 INTERDICTION de modifier le contenu réalisé lors des étapes précédentes
- 📖 Ne rechargez que les documents qui ont déjà été suivis dans `inputDocuments`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse de l'état actuel avant de passer à l'action
- Mettez à jour le frontmatter : ajoutez le nom de cette étape à la fin du tableau (array) des étapes terminées
- 📖 Ne chargez que les documents qui ont déjà été suivis dans `inputDocuments`
- 🚫 INTERDICTION de découvrir de nouveaux documents d'entrée pendant la continuation (reprise)

## LIMITES DU CONTEXTE :

- Contexte disponible : Le document actuel et le frontmatter sont déjà chargés
- Focus : Analyse de l'état du workflow et logique de continuation uniquement
- Limites : Ne présumez pas de connaissances au-delà de ce qui se trouve dans le document
- Dépendances : État du workflow existant de la session précédente

## Séquence d'Instructions (Ne pas dévier, ignorer ou optimiser)

### 1. Analyser l'État Actuel

**Évaluation de l'État :**
Passez en revue le frontmatter pour comprendre :

- `stepsCompleted` : Tableau des noms de fichiers d'étapes terminées
- Dernier élément du tableau `stepsCompleted` : L'étape la plus récemment terminée
- `inputDocuments` : Le contexte qui était déjà chargé
- Toutes les autres variables du frontmatter

### 2. Restaurer les Documents de Contexte

**Rechargement du Contexte :**

- Pour chaque document dans `inputDocuments`, chargez le fichier complet
- Cela garantit que vous disposez d'un contexte complet pour la continuation (reprise)
- Ne découvrez pas de nouveaux documents - ne rechargez que ce qui a été précédemment traité

### 3. Déterminer la Prochaine Étape

**Recherche de la Séquence d'Étapes :**

Utilisez la séquence ordonnée suivante pour déterminer l'étape suivante à partir de la dernière étape terminée :

| Dernière Étape Terminée       | Étape Suivante                |
| ----------------------------- | ----------------------------- |
| step-01-init.md               | step-02-discovery.md          |
| step-02-discovery.md          | step-02b-vision.md            |
| step-02b-vision.md            | step-02c-executive-summary.md |
| step-02c-executive-summary.md | step-03-success.md            |
| step-03-success.md            | step-04-journeys.md           |
| step-04-journeys.md           | step-05-domain.md             |
| step-05-domain.md             | step-06-innovation.md         |
| step-06-innovation.md         | step-07-project-type.md       |
| step-07-project-type.md       | step-08-scoping.md            |
| step-08-scoping.md            | step-09-functional.md         |
| step-09-functional.md         | step-10-nonfunctional.md      |
| step-10-nonfunctional.md      | step-11-polish.md             |
| step-11-polish.md             | step-12-complete.md           |

1. Récupérez le dernier élément du tableau `stepsCompleted`
2. Cherchez-le dans le tableau ci-dessus pour trouver l'étape suivante
3. C'est l'étape suivante à charger !

**Exemple :**

- Si `stepsCompleted = ["step-01-init.md", "step-02-discovery.md", "step-03-success.md"]`
- Le dernier élément est `"step-03-success.md"`
- Recherche dans le tableau → la prochaine étape est `./step-04-journeys.md`

### 4. Gérer l'Achèvement du Workflow

**Si le tableau `stepsCompleted` contient `"step-12-complete.md"` :**
"Bonne nouvelle ! Il semble que nous ayons déjà terminé le workflow du PRD pour {{project_name}}.

Le document final est prêt à `{outputFile}` avec toutes les sections terminées.

Souhaiteriez-vous que je :

- Passe en revue le PRD terminé avec vous
- Vous suggère les prochaines étapes de workflow (comme l'architecture ou la création d'epics)
- Démarre une nouvelle révision du PRD

Qu'est-ce qui vous serait le plus utile ?"

### 5. Présenter la Progression Actuelle

**Si le workflow n'est pas terminé :**
"Bon retour {{user_name}} ! Je reprends notre collaboration sur le PRD pour {{project_name}}.

**Progression Actuelle :**

- Dernière étape terminée : {dernier nom de fichier d'étape du tableau stepsCompleted}
- Prochaine étape : {étape suivante selon le tableau de recherche}
- Documents de contexte disponibles : {len(inputDocuments)} fichiers

**Statut du Document :**

- Le document PRD actuel est prêt avec toutes les sections terminées
- Prêt à continuer là où nous nous sommes arrêtés

Est-ce que cela semble correct, ou souhaitez-vous apporter des ajustements avant de poursuivre ?"

### 6. Présenter les OPTIONS DU MENU

Affichez : "**Sélectionnez une Option :** [C] Continuer vers {nom de l'étape suivante}"

#### Logique de Gestion du Menu :

- SI C : Lisez intégralement et suivez la prochaine étape déterminée à partir du tableau de correspondance de l'étape 3
- SI Autres commentaires ou requêtes : répondez et réaffichez le menu

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'

## NOTE CRITIQUE DE FIN D'ÉTAPE

UNIQUEMENT LORSQUE [l'option de continuation C] est sélectionnée et que [l'état actuel est confirmé], vous lirez alors intégralement et suivrez l'étape suivante (d'après le tableau de recherche) pour reprendre le workflow.

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC DU SYSTÈME

### ✅ SUCCÈS :

- Tous les documents d'entrée (input documents) précédents ont été rechargés avec succès
- L'état actuel du workflow a été analysé et présenté avec précision
- L'utilisateur confirme sa compréhension de la progression avant la continuation
- La prochaine étape correcte a été identifiée et préparée pour le chargement

### ❌ ÉCHEC DU SYSTÈME :

- Découverte de nouveaux documents d'entrée au lieu de recharger ceux existants
- Modification du contenu d'étapes déjà réalisées
- Échec dans la détermination de la prochaine étape à partir du tableau de recherche
- Poursuivre sans la confirmation de l'état actuel par l'utilisateur

**Règle Principale :** Sauter des étapes, optimiser des séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.
