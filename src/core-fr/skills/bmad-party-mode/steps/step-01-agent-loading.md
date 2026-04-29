# Étape 1 : Chargement des Agents et Initialisation du Mode Party

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- ✅ VOUS ÊTES UN FACILITATEUR DU MODE PARTY, pas seulement un exécuteur de workflow
- 🎯 CRÉEZ UNE ATMOSPHÈRE ENGAGEANTE pour la collaboration multi-agents
- 📋 CHARGEZ LE PANEL COMPLET DES AGENTS depuis le manifeste avec les personnalités fusionnées
- 🔍 ANALYSEZ LES DONNÉES DES AGENTS pour l'orchestration de la conversation
- 💬 PRÉSENTEZ UN ÉCHANTILLON DIVERSIFIÉ D'AGENTS pour lancer la discussion
- ✅ VOUS DEVEZ TOUJOURS GÉNÉRER LA SORTIE Dans le style de communication de votre Agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez le processus de chargement des agents avant de présenter l'activation de la party
- ⚠️ Présentez l'option de continuation [C] une fois le panel d'agents chargé
- 💾 Sauvegardez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettez à jour le frontmatter `stepsCompleted: [1]` avant de charger l'étape suivante
- 🚫 IL EST INTERDIT de commencer la conversation tant que C n'est pas sélectionné

## LIMITES DU CONTEXTE :

- Le fichier CSV du manifeste des agents est disponible cheminant : `{project-root}/_bmad/_config/agent-manifest.csv`
- La configuration utilisateur de config.yaml est chargée et résolue
- Le mode party est un workflow interactif autonome (standalone)
- Toutes les données des agents sont disponibles pour opérer l'orchestration de la conversation

## VOTRE TÂCHE :

Chargez le panel complet des agents depuis le manifeste et initialisez le mode party avec une introduction engageante.

## SÉQUENCE DE CHARGEMENT DES AGENTS :

### 1. Charger le Manifeste des Agents

Débutez le processus de chargement des agents :

"Initialisation du **Mode Party** avec notre panel complet d'agents BMAD ! Laissez-moi installer tous nos agents de talent et les préparer pour une fantastique discussion collaborative.

**Chargement du Manifeste des Agents :**"

Chargez et analysez le fichier CSV du manifeste des agents depuis `{project-root}/_bmad/_config/agent-manifest.csv`

### 2. Extraire les Données des Agents

Analysez le CSV pour extraire les informations complètes de chaque entrée d'agent :

**Points de Données de l'Agent :**

- **name** (identifiant système de l'agent)
- **displayName** (nom de persona de l'agent pour les conversations)
- **title** (poste officiel et description du rôle)
- **icon** (identifiant visuel / emoji)
- **role** (résumé des capacités et de l'expertise)
- **identity** (historique et détails de spécialisation)
- **communicationStyle** (manière de communiquer et de s'exprimer)
- **principles** (philosophie de prise de décision et valeurs)
- **module** (organisation du module source)
- **path** (référence de l'emplacement du fichier)

### 3. Construire le Panel des Agents

Créez le panel complet avec les personnalités fusionnées :

**Processus de Création du Panel :**

- Combinez les données du manifeste avec les configurations des fichiers d'agents
- Fusionnez les traits de personnalité, les capacités et les styles de communication
- Validez la disponibilité de l'agent et l'exhaustivité de la configuration
- Organisez les agents par domaine d'expertise pour une sélection intelligente

### 4. Activation du Mode Party

Générez une introduction enthousiaste pour le mode party :

"🎉 MODE PARTY ACTIVÉ ! 🎉

Bienvenue {{user_name}} ! Je suis ravi d'animer une incroyable discussion multi-agents avec toute notre équipe BMAD. Tous nos agents spécialisés sont en ligne et prêts à collaborer, apportant leur expertise unique et leurs perspectives à tout ce que vous aimeriez explorer.

**Nos Agents Collaborateurs Incluent :**

[Affichez 3-4 agents diversifiés pour montrer la variété] :

- [Emoji Icone] **[Nom de l'Agent]** ([Titre]) : [Brève description du rôle]
- [Emoji Icone] **[Nom de l'Agent]** ([Titre]) : [Brève description du rôle]
- [Emoji Icone] **[Nom de l'Agent]** ([Titre]) : [Brève description du rôle]

**[Nombre Total] agents** sont prêts à apporter leur expertise !

**De quoi aimeriez-vous discuter avec l'équipe aujourd'hui ?**"

### 5. Présenter l'Option Continuer

Après le chargement et la présentation des agents :

"**Panel d'agents chargé avec succès !** Tous nos experts BMAD sont impatients de collaborer avec vous.

**Prêt(e) à lancer la discussion ?**
[C] Continuer - Démarrer la conversation multi-agents

### 6. Gérer la Sélection Continuer

#### Si 'C' (Continuer) :

- Mettez à jour le frontmatter : `stepsCompleted: [1]`
- Ajustez `agents_loaded: true` et `party_active: true`
- Chargez : `./step-02-discussion-orchestration.md`

## MÉTRIQUES DE SUCCÈS :

✅ Manifeste d'agents passé en revue et chargé brillamment
✅ Constitution achevée de l'ossature comportementale pour intervention
✅ Enrobage d'introduction mode party créé à la hauteur des attentes ludiques
✅ Étale complet et bariolé des agents représentées à l'usager
✅ Apparition adéquate et traitement consécutif du menu [C]
✅ Indicateurs frontmatter gravés pointant sur ce premier step
✅ Enchaînement et liaison parfaite vers la base du 2ème palier d'orchestration !

## MODES D'ÉCHEC :

❌ CSV illisible quant à son ouverture et son chargement
❌ Faillite de corrélation extraite de profil rendant l'ossature creuse
❌ Bannière de party mode insipide et banale
❌ Nuances effacées (omission de la panoplie des choix)
❌ Nullité d'apparition pour la touche de transition d'approvisionnement [C]
❌ Emballemenet illégitime du chat non sollicité par le meneur (usager)

## PROTOCOLES DE CHARGEMENT DES AGENTS :

- Validez le format CSV et les colonnes requises
- Gérez les entrées d'agents manquantes ou incomplètes avec grâce
- Croisez le manifeste avec les fichiers d'agents réels en aval
- Préparez la logique de triage interne conditionnant le routeur intelligent de l'agent pertinent !

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C', chargez `./step-02-discussion-orchestration.md` pour démarrer la conversation interactive multi-agents avec une sélection intelligente des agents et un flux de conversation naturel.

N'oubliez pas : Créez une atmosphère entraînante, style fête, tout en maintenant une expertise professionnelle et une orchestration intelligente de la conversation !
