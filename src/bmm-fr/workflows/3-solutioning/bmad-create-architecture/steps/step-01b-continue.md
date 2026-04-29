# Étape 1b : Gestionnaire de Poursuite du Workflow

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant d'entreprendre toute action — une compréhension partielle mène à des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue et comprise avant de continuer
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la compréhension de l'état actuel et l'obtention de la confirmation de l'utilisateur
- 🚪 GÉRER la reprise du workflow de manière fluide et transparente
- ⚠️ ABSOLUTELY AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant d'entreprendre toute action
- 📖 Lire l'intégralité du document existant pour comprendre l'état actuel
- 💾 Mettre à jour le frontmatter pour refléter la poursuite
- 🚫 INTERDICTION de passer à l'étape suivante sans la confirmation de l'utilisateur

## LIMITES DE CONTEXTE :

- Le document existant et le frontmatter sont disponibles
- Les documents d'entrée déjà chargés doivent être dans `inputDocuments` du frontmatter
- Les étapes déjà terminées sont dans le tableau `stepsCompleted`
- Se concentrer sur la compréhension de l'endroit où nous nous sommes arrêtés

## VOTRE TÂCHE :

Gérer la poursuite du workflow en analysant le travail existant et en guidant l'utilisateur pour reprendre à l'étape appropriée.

## SÉQUENCE DE POURSUITE :

### 1. Analyser l'État Actuel du Document

Lisez intégralement le document d'architecture existant et analysez :

**Analyse du Frontmatter :**

- `stepsCompleted` : Quelles étapes ont été réalisées
- `inputDocuments` : Quels documents ont été chargés
- `lastStep` : Dernière étape exécutée
- `project_name`, `user_name`, `date` : Contexte de base

**Analyse du Contenu :**

- Quelles sections existent dans le document
- Quelles décisions architecturales ont été prises
- Ce qui semble incomplet ou en cours
- Tous les TODOs ou espaces réservés (placeholders) restants

### 2. Présenter le Résumé de la Poursuite

Montrez à l'utilisateur ses progrès actuels :

"Bon retour {{user_name}} ! J'ai trouvé votre travail d'Architecture pour {{project_name}}.

**Progrès actuel :**

- Étapes terminées : {{liste stepsCompleted}}
- Dernière étape travaillée : Étape {{lastStep}}
- Documents d'entrée chargés : {{nombre d'inputDocuments}} fichiers

**Sections de document trouvées :**
{lister toutes les sections H2/H3 trouvées dans le document}

{if_incomplete_sections}
**Zones incomplètes :**

- {zones qui semblent incomplètes ou possèdent des placeholders}
  {/if_incomplete_sections}

**Que souhaitez-vous faire ?**
[R] Reprendre là où nous nous sommes arrêtés
[C] Continuer vers la prochaine étape logique
[O] Vue d'ensemble de toutes les étapes restantes
[X] Recommencer (écrasera le travail existant)
"

### 3. Gérer le Choix de l'Utilisateur

#### Si 'R' (Reprendre là où nous nous sommes arrêtés) :

- Identifier l'étape suivante en fonction de `stepsCompleted`
- Charger le fichier d'étape approprié pour continuer
- Exemple : Si `stepsCompleted: [1, 2, 3]`, charger `./step-04-decisions.md`

#### Si 'C' (Continuer vers la prochaine étape logique) :

- Analyser le contenu du document pour déterminer la prochaine étape logique
- Peut nécessiter de revoir la qualité et l'exhaustivité du contenu
- Si le contenu semble complet pour l'étape actuelle, passer à la suivante
- Si le contenu semble incomplet, suggérer de rester sur l'étape actuelle

#### Si 'O' (Vue d'ensemble de toutes les étapes restantes) :

- Fournir une brève description de toutes les étapes restantes
- Laisser l'utilisateur choisir l'étape sur laquelle travailler
- Ne pas supposer qu'une progression séquentielle est toujours préférable

#### Si 'X' (Recommencer) :

- Confirmer : "Cela supprimera toutes les décisions architecturales existantes. Êtes-vous sûr ? (y/n)"
- Si confirmé : Supprimer le document existant, lire intégralement et suivre : `./step-01-init.md`
- Si non confirmé : Retourner au menu de poursuite

### 4. Naviguer vers l'Étape Sélectionnée

Une fois que l'utilisateur a fait son choix :

**Charger le fichier d'étape sélectionné :**

- Mettre à jour `lastStep` dans le frontmatter pour refléter la navigation actuelle
- Exécuter le fichier de l'étape sélectionnée
- Laisser cette étape gérer la logique de poursuite détaillée

**Préservation de l'État :**

- Conserver tout le contenu existant dans le document
- Maintenir `stepsCompleted` exact
- Suivre la reprise dans l'état du workflow

### 5. Cas de Poursuite Spéciaux

#### Si `stepsCompleted` est vide mais que le document contient du contenu :

- Cela suggère un workflow interrompu
- Demander à l'utilisateur : "Je vois que le document a du contenu mais aucune étape n'est marquée comme terminée. Dois-je analyser ce qui s'y trouve et définir l'état de l'étape appropriée ?"

#### Si le document semble corrompu ou incomplet :

- Demander à l'utilisateur : "Le document semble incomplet. Souhaitez-vous que j'essaie de récupérer ce qui s'y trouve, ou préférez-vous repartir de zéro ?"

#### Si le document est complet mais que le workflow n'est pas marqué comme terminé :

- Demander à l'utilisateur : "L'architecture semble complète ! Dois-je marquer ce workflow comme terminé, ou y a-t-il autre chose sur lequel vous aimeriez travailler ?"

## INDICATEURS DE RÉUSSITE :

✅ État du document existant correctement analysé et compris
✅ Utilisateur présenté avec des options de poursuite claires
✅ Choix de l'utilisateur géré de manière appropriée et transparente
✅ État du workflow préservé et mis à jour correctement
✅ Navigation vers l'étape appropriée gérée de manière fluide

## MODES D'ÉCHEC :

❌ Ne pas lire l'intégralité du document existant avant de faire des suggestions
❌ Perdre la trace des étapes qui ont été réellement terminées
❌ Continuer automatiquement sans la confirmation de l'utilisateur sur les prochaines étapes
❌ Ne pas vérifier le contenu incomplet ou les placeholders
❌ Perdre le contenu du document existant lors de la reprise

❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le prochain fichier d'étape
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## ÉTAPE SUIVANTE :

Une fois que l'utilisateur a sélectionné son option de poursuite, chargez le fichier d'étape approprié en fonction de son choix. Le fichier d'étape gérera le travail détaillé à partir de ce point.

Fichiers d'étape valides à charger :
- `./step-02-context.md`
- `./step-03-starter.md`
- `./step-04-decisions.md`
- `./step-05-patterns.md`
- `./step-06-structure.md`
- `./step-07-validation.md`
- `./step-08-complete.md`

Rappel : L'objectif est une reprise fluide et transparente qui respecte le travail déjà accompli tout en donnant à l'utilisateur le contrôle sur la manière de procéder.
