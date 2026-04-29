# Étape 1b : Continuation du Flux de Travail

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- ✅ VOUS ÊTES UN ANIMATEUR DE CONTINUATION - pas un initiateur
- 🎯 RESPECTEZ l'état et les progrès existants du FLUX DE TRAVAIL
- 📋 COMPRENEZ le contexte et les résultats de la SESSION PRÉCÉDENTE
- 🔍 REPRENEZ NATURELLEMENT là où l'utilisateur s'est arrêté
- 💬 MAINTENEZ LA CONTINUITÉ dans le flux de la session et le rapport global
- ✅ VOUS DEVEZ TOUJOURS PARLER dans votre style de communication d'Agent avec la `communication_language`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Chargez et analysez minutieusement le document existant
- 💾 Mettez à jour le frontmatter avec l'état de continuation
- 📖 Présentez l'état actuel et les options suivantes de manière claire
- 🚫 INTERDIT de répéter le travail terminé ou de poser les mêmes questions

## LIMITES DE CONTEXTE :

- Le document existant avec le frontmatter est disponible
- Les étapes précédentes terminées indiquent les progrès de la session
- Le CSV des techniques de réflexion est chargé lorsque nécessaire pour les étapes restantes
- L'utilisateur peut vouloir continuer - modifier ou recommencer

## VOTRE TÂCHE :

Analysez l'état existant de la session de brainstorming et proposez des options de continuation transparentes.

## SÉQUENCE DE CONTINUATION :

### 1. Analyser la Session Existante

Chargez le document existant et analysez l'état actuel :

**Analyse du Document :**

- Lisez `{brainstorming_session_output_file}` existant
- Examinez le frontmatter pour `stepsCompleted` - `session_topic` - `session_goals`
- Examinez le contenu pour comprendre les progrès et résultats de la session
- Identifiez l'étape actuelle et les prochaines étapes logiques

**Évaluation du Statut de la Session :**
"Bon retour {{user_name}} ! Je vois votre session de brainstorming sur **[session_topic]** du **[date]**.

**Statut Actuel de la Session :**

- **Étapes Terminées :** [Liste des étapes terminées]
- **Techniques Utilisées :** [Liste des techniques à partir du frontmatter]
- **Idées Générées :** [Nombre à partir du frontmatter]
- **Étape Actuelle :** [Évaluer où ils se sont arrêtés]

**Progrès de la Session :**
[Bref résumé de ce qui a été accompli et ce qui reste à faire]"

### 2. Présenter Options de Continuation

Sur la base de l'analyse de la session - proposez les options appropriées :

**Si la Session est Terminée :**
"Votre session de brainstorming semble être terminée !

**Options :**
[1] Passer en revue les résultats - Parcourez vos idées documentées et vos points de vue
[2] Démarrer une Nouvelle Session - Commencez un brainstorming sur un nouveau sujet
[3] Prolonger la Session - Ajoutez plus de techniques ou explorez de nouveaux angles"

**Si la Session est en Cours :**
"Reprenons là où nous nous sommes arrêtés !

**Progrès Actuel :**
[Description de l'étape actuelle et des réalisations]

**Prochaines Étapes :**
[Continuez avec l'étape suivante appropriée selon l'état du flux de travail]"

### 3. Gérer le Choix de l'Utilisateur

Dirigez vers la prochaine étape appropriée selon la sélection :

**Passer en revue les résultats :** Chargez l'étape de revue/navigation correspondante
**Nouvelle Session :** Démarrez l'initialisation du nouveau flux de travail
**Prolonger la Session :** Continuez avec la prochaine technique ou phase
**Poursuivre la Progression :** Reprenez depuis l'étape actuelle du flux de travail

### 4. Mettre à Jour l'État de la Session

Mettez à jour le frontmatter pour refléter la continuation :

```yaml
---
stepsCompleted: [existing_steps]
session_continued: true
continuation_date: {{current_date}}
---
```

## MÉTRIQUES DE SUCCÈS :

✅ État de la session existante analysé et compris avec précision
✅ Continuation transparente sans perte de contexte ni de rapport
✅ Options de continuation appropriées présentées en fonction des progrès
✅ Choix de l'utilisateur correctement dirigé vers la prochaine étape du flux de travail
✅ Continuité de la session maintenue tout au long de l'interaction

## MODES D'ÉCHEC :

❌ Ne pas analyser correctement l'état du document existant
❌ Demander à l'utilisateur de répéter les informations déjà fournies
❌ Perte de continuité dans le flux ou le contexte de la session
❌ Absence de proposition d'options de continuation appropriées

## PROTOCOLES DE CONTINUATION :

- Reconnaissez toujours le travail antérieur et les avancées
- Maintenez le rapport et la dynamique de session établis
- Appuyez-vous sur les idées et points de vue existants plutôt que de recommencer
- Respectez le temps de l'utilisateur en évitant les questions répétitives

## PROCHAINE ÉTAPE :

Dirigez vers l'étape de flux de travail appropriée basée sur le choix de continuation de l'utilisateur et l'état actuel de la session.
