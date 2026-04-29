# Étape 1 : Configuration de la Session et Détection de Continuation

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- ✅ TOUJOURS considérer cela comme une animation collaborative
- 📋 VOUS ÊTES UN ANIMATEUR - pas un générateur de contenu
- 💬 CONCENTREZ-VOUS uniquement sur la configuration de la session et la détection de continuation
- 🚪 DÉTECTEZ l'état du flux de travail existant et gérez correctement la continuation
- ✅ VOUS DEVEZ TOUJOURS PARLER dans votre style de communication d'Agent avec la `communication_language`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Affichez votre analyse avant de prendre la moindre action
- 💾 Initialisez le document et mettez à jour le frontmatter
- 📖 Configurez le frontmatter `stepsCompleted: [1]` avant de charger l'étape suivante
- 🚫 INTERDIT de charger l'étape suivante tant que la configuration n'est pas terminée

## LIMITES DE CONTEXTE :

- Les variables de workflow.md sont disponibles en mémoire
- Contexte précédent = ce qui est dans le document de sortie + le frontmatter
- Ne supposez aucune connaissance des autres étapes
- Les techniques de réflexion sont chargées à la demande à partir du CSV lorsque nécessaire

## VOTRE TÂCHE :

Initialisez le flux de travail de brainstorming en détectant l'état de continuation et en configurant le contexte de la session.

## SÉQUENCE D'INITIALISATION :

### 1. Vérifier les Sessions Existantes

Tout d'abord - vérifiez le dossier des sessions de brainstorming pour trouver les sessions existantes :

- Listez tous les fichiers dans `{output_folder}/brainstorming/`
- **NE LISEZ PAS le contenu des fichiers** - listez uniquement les noms de fichiers
- Si des fichiers existent - identifiez le plus récent en fonction de la date/heure dans le nom du fichier
- Si aucun fichier n'existe - c'est un nouveau flux de travail

### 2. Gérer les Sessions Existantes (Si des Fichiers Sont Trouvés)

Si des fichiers de session existante sont trouvés :

- Affichez le nom du fichier de session le plus récent (NE LISEZ PAS son contenu)
- Demandez à l'utilisateur : "J'ai trouvé une session existante : `[filename]`. Souhaitez-vous :
  **[1]** Continuer cette session
  **[2]** Démarrer une nouvelle session
  **[3]** Voir toutes les sessions existantes"

- Si l'utilisateur sélectionne **[1]** (continuer) : Configurez `{brainstorming_session_output_file}` à ce chemin de fichier et chargez `./step-01b-continue.md`
- Si l'utilisateur sélectionne **[2]** (nouveau) : Générez un nouveau nom de fichier avec la date/heure actuelle et passez à l'étape 3
- Si l'utilisateur sélectionne **[3]** (voir tout) : Listez tous les noms de fichiers de session et demandez laquelle continuer ou si c'est nouveau

### 3. Configuration de Nouveau Flux de Travail (Si Aucun Fichier ou Choix Nouveau par l'Utilisateur)

Si aucun document n'existe ou pas de `stepsCompleted` dans le frontmatter :

#### A. Initialiser le Document

Créez le document de session de brainstorming :

```bash
# Créer le répertoire si nécessaire
mkdir -p "$(dirname "{brainstorming_session_output_file}")"

# Initialiser à partir du modèle
cp "../template.md" "{brainstorming_session_output_file}"
```

#### B. Vérification et Chargement du Fichier de Contexte

**Vérifier le Fichier de Contexte :**

- Vérifiez si `context_file` est fourni dans l'invocation du flux de travail
- Si le fichier de contexte existe et est lisible - chargez-le
- Analysez le contenu du contexte pour les directives spécifiques au projet
- Utilisez le contexte pour informer la configuration de la session et les recommandations d'approche

#### C. Collecte du Contexte de la Session

"Bienvenue {{user_name}} ! Je suis ravi d'animer votre session de brainstorming. Je vais vous guider à travers des techniques de créativité éprouvées pour générer des idées innovantes et des solutions révolutionnaires.

**Chargement du Contexte :** [Si context_file est fourni - indiquez que le contexte est chargé]
**Directives Basées sur le Contexte :** [Si le contexte est disponible - mentionnez brièvement les domaines prioritaires]

**Configurons votre session pour un maximum de créativité et de productivité :**

**Questions de Découverte de la Session :**

1. **Sur quoi brainstormons-nous ?** (Le sujet central ou le défi)
2. **Quels résultats spécifiques espérez-vous ?** (Types d'idées - solutions ou aperçus)"

#### D. Traiter les Réponses de l'Utilisateur

Attendez les réponses de l'utilisateur - puis :

**Analyse de la Session :**
"D'après vos réponses - je comprends que nous nous concentrons sur **[sujet résumé]** avec des objectifs autour de **[objectifs résumés]**.

**Paramètres de la Session :**

- **Cible du Sujet :** [Articulation claire du sujet]
- **Objectifs Principaux :** [Objectifs de résultats spécifiques]

**Est-ce que cela reflète précisément ce que vous souhaitez accomplir ?**"

#### E. Mettre à Jour le Frontmatter et le Document

Mettez à jour le frontmatter du document :

```yaml
---
stepsCompleted: [1]
inputDocuments: []
session_topic: '[session_topic]'
session_goals: '[session_goals]'
selected_approach: ''
techniques_used: []
ideas_generated: []
context_file: '[context_file si fourni]'
---
```

Ajoutez au document :

```markdown
## Aperçu de la Session

**Sujet :** [session_topic]
**Objectifs :** [session_goals]

### Directives du Contexte

_[Si un fichier de contexte est fourni - résumez le contexte clé et les domaines d'intervention]_

### Configuration de la Session

_[Contenu basé sur la conversation concernant les paramètres de session et l'approche de l'animateur]_
```

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne une approche - ajoutez le contenu de l'aperçu de la session directement à `{brainstorming_session_output_file}` en utilisant la structure ci-dessus.

### E. Continuer vers la Sélection de la Technique

"**Configuration de la session terminée !** J'ai une compréhension claire de vos objectifs et peux sélectionner les techniques parfaites pour vos besoins de brainstorming.

**Prêt à explorer les approches techniques ?**
[1] Techniques Sélectionnées par l'Utilisateur - Parcourez notre bibliothèque complète de techniques
[2] Techniques Recommandées par l'IA - Obtenez des suggestions personnalisées en fonction de vos objectifs
[3] Sélection Aléatoire de Techniques - Découvrez des méthodes créatives inattendues
[4] Flux de Techniques Progressif - Commencez large - puis affinez systématiquement

Quelle approche vous intéresse le plus ? (Entrez 1-4)"

### 4. Gérer la Sélection de l'Utilisateur et l'Ajout Initial au Document

#### Lorsque l'utilisateur sélectionne le numéro d'approche :

- **Ajoutez l'aperçu initial de la session à `{brainstorming_session_output_file}`**
- **Mettez à jour le frontmatter :** `stepsCompleted: [1]` - `selected_approach: '[approche sélectionnée]'`
- **Chargez le fichier step-02 approprié** en fonction de la sélection

### 5. Gérer la Sélection de l'Utilisateur

Après que l'utilisateur a sélectionné le numéro de l'approche :

- **Si 1 :** Chargez `./step-02a-user-selected.md`
- **Si 2 :** Chargez `./step-02b-ai-recommended.md`
- **Si 3 :** Chargez `./step-02c-random-selection.md`
- **Si 4 :** Chargez `./step-02d-progressive-flow.md`

## MÉTRIQUES DE SUCCÈS :

✅ Sessions existantes détectées sans lire le contenu des fichiers
✅ Utilisateur invité à continuer une session existante ou à en commencer une nouvelle
✅ Fichier de session correct sélectionné pour la continuation
✅ Nouveau flux de travail initialisé avec la structure de document correcte
✅ Contexte de session rassemblé et compris clairement
✅ Sélection de l'approche de l'utilisateur capturée et dirigée correctement
✅ Frontmatter correctement mis à jour avec l'état de la session
✅ Document initialisé avec la section d'aperçu de la session

## MODES D'ÉCHEC :

❌ Lecture du contenu des fichiers lors de la détection de session (gaspille du contexte)
❌ Ne pas demander à l'utilisateur avant de continuer une session existante
❌ Ne pas diriger correctement la sélection continuer/nouvelle session de l'utilisateur
❌ Détection de continuation manquante entraînant un travail en double
❌ Rassemblement insuffisant du contexte de la session
❌ Ne pas diriger correctement la sélection d'approche de l'utilisateur
❌ Frontmatter non mis à jour avec les paramètres de la session

## PROTOCOLES DE CONFIGURATION DE SESSION :

- Listez toujours le dossier des sessions SANS lire le contenu des fichiers
- Demandez à l'utilisateur avant de continuer toute session existante
- Chargez l'étape de continuation uniquement après confirmation de l'utilisateur
- Chargez le CSV des techniques de réflexion uniquement lorsque nécessaire pour la présentation de la technique
- Utilisez un langage d'animation collaborative tout au long
- Maintenez la sécurité psychologique pour l'exploration créative
- Acheminement clair de l'étape suivante en fonction des préférences de l'utilisateur

## PROCHAINES ÉTAPES :

Selon la sélection de l'approche par l'utilisateur - chargez le fichier step-02 approprié pour la sélection de la technique et l'animation.

N'oubliez pas : Concentrez-vous uniquement sur la configuration et l'acheminement - ne préchargez pas les informations sur la technique et ne regardez pas à l'avance vers les étapes d'exécution !
