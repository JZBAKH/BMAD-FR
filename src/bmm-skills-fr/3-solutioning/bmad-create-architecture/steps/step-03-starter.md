# Étape 3 : Évaluation du Modèle de Départ (Starter Template)

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur l'évaluation des options de modèle de départ avec les versions actuelles
- 🌐 TOUJOURS effectuer une recherche sur le web pour vérifier les versions actuelles — ne faites JAMAIS confiance aux versions codées en dur
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant d'entreprendre toute action — une compréhension partielle mène à une architecture incomplète
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue et comprise avant de continuer
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant d'entreprendre toute action
- 🌐 Effectuer une recherche sur le web pour vérifier les versions et options actuelles
- ⚠️ Présenter le menu A/P/C après avoir généré l'analyse du modèle de départ
- 💾 Sauvegarder UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2, 3]` avant de charger l'étape suivante
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné

## MENUS DE COLLABORATION (A/P/C) :

Cette étape générera du contenu et présentera des choix :

- **A (Elicitation Avancée)** : Utiliser les protocoles de découverte pour explorer des options de départ non conventionnelles ou des approches personnalisées
- **P (Mode Party)** : Apporter plusieurs perspectives pour évaluer les compromis des modèles de départ pour différents cas d'utilisation
- **C (Continuer)** : Sauvegarder le contenu dans le document et passer à l'étape suivante

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez le skill `bmad-advanced-elicitation`
- Quand 'P' est sélectionné : Invoquez le skill `bmad-party-mode`
- Les PROTOCOLES reviennent toujours à l'affichage du menu A/P/C de cette étape une fois que A ou P est terminé
- L'utilisateur accepte/rejette les modifications du protocole avant de continuer

## LIMITES DE CONTEXTE :

- Le contexte du projet de l'étape 2 est disponible et complet
- Le fichier de contexte projet de l'étape 01 peut contenir des préférences techniques
- Aucune décision architecturale prise pour l'instant — évaluation des fondations
- Se concentrer sur la découverte des préférences techniques et l'évaluation du modèle de départ
- Prendre en compte les exigences du projet et les préférences existantes lors de l'évaluation des options

## VOTRE TÂCHE :

Découvrir les préférences techniques et évaluer les options de modèle de départ, en tirant parti des préférences existantes et en établissant des bases architecturales solides.

## SÉQUENCE D'ÉVALUATION DU MODÈLE DE DÉPART :

### 0. Vérifier les Préférences Techniques & le Contexte

**Vérifier le Contexte Projet pour les Préférences Techniques Existantes :**
"Avant de plonger dans les modèles de départ, laissez-moi vérifier si vous avez déjà documenté des préférences techniques.

{{if_project_context_exists}}
J'ai trouvé quelques règles techniques dans votre fichier de contexte projet :
{{extracted_technical_preferences_from_project_context}}

**Règles techniques du contexte projet trouvées :**

- Langages/Frameworks : {{languages_frameworks_from_context}}
- Outils & Bibliothèques : {{tools_from_context}}
- Modèles de développement : {{patterns_from_context}}
- Préférences de plateforme : {{platforms_from_context}}

{{else}}
Aucune préférence technique existante n'a été trouvée dans le fichier de contexte projet. Nous allons établir vos préférences techniques maintenant.
{{/if_project_context}}"

**Découvrir les Préférences Techniques de l'Utilisateur :**
"Sur la base de votre contexte projet, discutons de vos préférences techniques :

Préférences pour la catégorie de technologie {{primary_technology_category}} :

- **Langages** : Avez-vous des préférences entre TypeScript/JavaScript, Python, Go, Rust, etc. ?
- **Frameworks** : Des familiarités ou préférences existantes (React, Vue, Angular, Next.js, etc.) ?
- **Bases de données** : Des préférences ou une infrastructure existante (PostgreSQL, MongoDB, MySQL, etc.) ?

**Expérience de Développement :**

- Quel est le niveau d'expérience de votre équipe avec les différentes technologies ?
- Y a-t-il des technologies que vous souhaitez apprendre par rapport à celles avec lesquelles vous êtes à l'aise ?

**Préférences de Plateforme/Déploiement :**

- Préférences pour le fournisseur de cloud (AWS, Vercel, Railway, etc.) ?
- Préférences pour les conteneurs (Docker, Serverless, Traditionnel) ?

**Intégrations :**

- Des systèmes ou API existants avec lesquels vous devez vous intégrer ?
- Des services tiers que vous prévoyez d'utiliser (paiement, authentification, analytics, etc.) ?

Ces préférences m'aideront à recommander les modèles de départ les plus appropriés et à guider nos décisions architecturales."

### 1. Identifier le Domaine Technologique Principal

Sur la base de l'analyse du contexte du projet et des préférences techniques, identifiez la pile technologique principale :

- **Application Web** → Chercher les modèles pour Next.js, Vite, Remix, SvelteKit
- **Application Mobile** → Chercher les modèles pour React Native, Expo, Flutter
- **API/Backend** → Chercher les modèles pour NestJS, Express, Fastify, Supabase
- **Outil CLI** → Chercher les modèles pour les frameworks CLI (oclif, commander, etc.)
- **Full-stack** → Chercher les modèles pour T3, RedwoodJS, Blitz, Next.js
- **Desktop** → Chercher les modèles pour Electron, Tauri

### 2. Prise en Compte des Exigences UX

Si une spécification UX a été chargée, tenez compte des exigences UX lors de la sélection du modèle de départ :

- **Animations riches** → Modèle compatible Framer Motion
- **Formulaires complexes** → Modèle incluant React Hook Form
- **Fonctionnalités temps réel** → Modèle prêt pour Socket.io ou WebSocket
- **Design system** → Modèle avec Storybook activé
- **Capacité hors ligne** → Modèle configuré pour Service Worker ou PWA

### 3. Rechercher les Options de Modèle de Départ Actuelles

Effectuez une recherche sur le web pour trouver des modèles de départ actuels et maintenus :

```
Search the web: "{{primary_technology}} starter template CLI create command latest"
Search the web: "{{primary_technology}} boilerplate generator latest options"
Search the web: "{{primary_technology}} production-ready starter best practices"
```

### 4. Étudier les Meilleures Options de Modèle de Départ

Pour chaque modèle prometteur trouvé, étudiez les détails :

```
Search the web: "{{starter_name}} default setup technologies included latest"
Search the web: "{{starter_name}} project structure file organization"
Search the web: "{{starter_name}} production deployment capabilities"
Search the web: "{{starter_name}} recent updates maintenance status"
```

### 5. Analyser ce que Chaque Modèle de Départ Fournit

Pour chaque option de départ viable, documentez :

**Décisions Technologiques Prises :**

- Configuration du Langage/TypeScript
- Solution de style (CSS, Tailwind, Styled Components, etc.)
- Configuration du framework de test
- Configuration de Linting/Formatage
- Outillage de build et optimisation
- Structure et organisation du projet

**Modèles Architecturaux Établis :**

- Modèles d'organisation du code
- Conventions de structure des composants
- Approche de stratification de l'API (layering)
- Configuration de la gestion d'état (state management)
- Modèles de routage
- Configuration de l'environnement

**Fonctionnalités d'Expérience de Développement :**

- Rechargement à chaud (Hot reloading) et serveur de développement
- Configuration TypeScript
- Configuration du débogage
- Infrastructure de test
- Génération de documentation

### 6. Présenter les Options de Modèle de Départ

En fonction du niveau de compétence de l'utilisateur et des besoins du projet :

**Pour les Utilisateurs Experts :**
"Trouvé {{starter_name}} qui fournit :
{{quick_decision_list_of_key_decisions}}

Cela établirait notre architecture de base avec ces décisions techniques déjà prises. L'utiliser ?"

**Pour les Utilisateurs Intermédiaires :**
"J'ai trouvé {{starter_name}}, qui est un modèle de départ bien maintenu pour les projets de type {{project_type}}.

Il prend ces décisions architecturales pour nous :
{{decision_list_with_explanations}}

Cela nous donne une base solide suivant les meilleures pratiques actuelles. Devrions-nous l'utiliser ?"

**Pour les Utilisateurs Débutants :**
"J'ai trouvé {{starter_name}}, qui est comme une fondation pré-construite pour votre projet.

Pensez-y comme à l'achat d'une structure de maison préfabriquée au lieu de couper chaque planche vous-même.

Il prend ces décisions pour nous :
{{friendly_explanation_of_decisions}}

C'est un excellent point de départ qui suit les meilleures pratiques et nous évite de faire des dizaines de petits choix techniques. Devrions-nous l'utiliser ?"

### 7. Obtenir les Commandes CLI Actuelles

Si l'utilisateur manifeste de l'intérêt pour un modèle de départ, obtenez les commandes exactes actuelles :

```
Search the web: "{{starter_name}} CLI command options flags latest"
Search the web: "{{starter_name}} create new project command examples"
```

### 8. Générer le Contenu du Modèle de Départ

Préparez le contenu à ajouter au document :

#### Structure du Contenu :

````markdown
## Évaluation du Modèle de Départ

### Domaine Technologique Principal

{{identified_domain}} basé sur l'analyse des exigences du projet

### Options de Départ Étudiées

{{analysis_of_evaluated_starters}}

### Modèle de Départ Sélectionné : {{starter_name}}

**Raison du choix :**
{{why_this_starter_was_chosen}}

**Commande d'initialisation :**

```bash
{{full_starter_command_with_options}}
```

**Décisions Architecturales Fournies par le Modèle de Départ :**

**Langage & Runtime :**
{{language_typescript_setup}}

**Solution de Style :**
{{styling_solution_configuration}}

**Outillage de Build :**
{{build_tools_and_optimization}}

**Framework de Test :**
{{testing_setup_and_configuration}}

**Organisation du Code :**
{{project_structure_and_patterns}}

**Expérience de Développement :**
{{development_tools_and_workflow}}

**Note :** L'initialisation du projet à l'aide de cette commande devrait être la première story d'implémentation.

````

### 9. Présenter le Contenu et le Menu

Affichez le contenu généré et présentez les choix :

"J'ai analysé les options de modèle de départ pour les projets de type {{project_type}}.

**Voici ce que je vais ajouter au document :**

[Afficher le contenu markdown complet de l'étape 8]

**Que souhaitez-vous faire ?**
[A] Elicitation Avancée — Explorer des approches personnalisées ou des modèles non conventionnels
[P] Mode Party — Évaluer les compromis sous différentes perspectives
[C] Continuer — Sauvegarder cette décision et passer aux décisions architecturales"

### 10. Gérer la Sélection du Menu

#### Si 'A' (Elicitation Avancée) :

- Invoquez le skill `bmad-advanced-elicitation` avec l'analyse de départ actuelle
- Traitez les informations approfondies sur les options de départ ou les approches personnalisées
- Demandez à l'utilisateur : "Accepter ces changements pour l'évaluation du modèle de départ ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'P' (Mode Party) :

- Invoquez le skill `bmad-party-mode` avec le contexte d'évaluation du modèle de départ
- Traitez les informations collaboratives sur les compromis des modèles
- Demandez à l'utilisateur : "Accepter ces changements pour l'évaluation du modèle de départ ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/architecture.md`
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2, 3]`
- Charger `./step-04-decisions.md`

## AJOUT AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 8.

## INDICATEURS DE RÉUSSITE :

✅ Domaine technologique principal correctement identifié à partir du contexte du projet
✅ Modèles de départ actuels et maintenus recherchés et évalués
✅ Toutes les versions vérifiées via une recherche web, pas codées en dur
✅ Implications architecturales du choix du modèle de départ clairement documentées
✅ Utilisateur bénéficiant d'une justification claire pour la sélection du modèle
✅ Menu A/P/C présenté et géré correctement
✅ Contenu correctement ajouté au document lorsque C est sélectionné

## MODES D'ÉCHEC :

❌ Ne pas vérifier les versions actuelles avec une recherche web
❌ Ignorer les exigences UX lors de l'évaluation des modèles de départ
❌ Ne pas documenter quelles décisions architecturales le modèle de départ prend
❌ Oublier de considérer l'état de maintenance des modèles de départ
❌ Ne pas fournir de justification claire pour la sélection du modèle de départ
❌ Ne pas présenter le menu A/P/C après la génération de contenu
❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le prochain fichier d'étape
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé, chargez `./step-04-decisions.md` pour commencer à prendre des décisions architecturales spécifiques.

Rappel : NE PAS passer à step-04 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
