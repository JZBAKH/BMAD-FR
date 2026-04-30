# Étape 5 : Modèles d'Implémentation & Règles de Cohérence

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant d'entreprendre toute action — une compréhension partielle mène à des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue et comprise avant de continuer
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur les modèles qui préviennent les conflits d'implémentation entre agents IA
- 🎯 METTEZ L'ACCENT sur ce que les agents pourraient décider DIFFÉREMMENT s'ils ne sont pas spécifiés
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant d'entreprendre toute action
- 🎯 Se concentrer sur la cohérence, pas sur les détails d'implémentation
- ⚠️ Présenter le menu A/P/C après avoir généré le contenu des modèles
- 💾 Sauvegarder UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2, 3, 4, 5]` avant de charger l'étape suivante
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné

## MENUS DE COLLABORATION (A/P/C) :

Cette étape générera du contenu et présentera des choix :

- **A (Elicitation Avancée)** : Utiliser les protocoles de découverte pour développer des modèles de cohérence complets
- **P (Mode Party)** : Apporter plusieurs perspectives pour identifier les points de conflit potentiels
- **C (Continuer)** : Sauvegarder les modèles et passer à la structure du projet

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez le skill `bmad-advanced-elicitation`
- Quand 'P' est sélectionné : Invoquez le skill `bmad-party-mode`
- Les PROTOCOLES reviennent toujours à l'affichage du menu A/P/C de cette étape une fois que A ou P est terminé
- L'utilisateur accepte/rejette les modifications du protocole avant de continuer

## LIMITES DE CONTEXTE :

- Les décisions architecturales fondamentales de l'étape 4 sont terminées
- La pile technologique est décidée et les versions sont vérifiées
- Se concentrer sur COMMENT les agents doivent implémenter, pas sur QUOI ils doivent implémenter
- Considérer ce qui pourrait varier entre différents agents IA

## VOTRE TÂCHE :

Définir des modèles d'implémentation et des règles de cohérence garantissant que plusieurs agents IA écrivent du code compatible et cohérent qui fonctionne ensemble de manière transparente.

## SÉQUENCE DE DÉFINITION DES MODÈLES :

### 1. Identifier les Points de Conflit Potentiels

Sur la base de la pile technologique choisie et des décisions prises, identifiez les domaines où les agents IA pourraient faire des choix différents :

**Conflits de Nommage :**

- Conventions de nommage des tables/colonnes de base de données
- Modèles de nommage des points de terminaison (endpoints) de l'API
- Nommage des fichiers et répertoires
- Nommage des composants/fonctions/variables
- Formats des paramètres de route

**Conflits Structurels :**

- Emplacement des tests
- Organisation des composants
- Emplacement des utilitaires (utilities) et des assistants (helpers)
- Organisation des fichiers de configuration
- Organisation des ressources statiques (assets)

**Conflits de Format :**

- Formats des wrappers de réponse API
- Structures de réponse d'erreur
- Formats de date/heure dans les API et l'UI
- Conventions de nommage des champs JSON
- Utilisation des codes de statut API

**Conflits de Communication :**

- Conventions de nommage des événements
- Structures de charge utile (payload) des événements
- Modèles de mise à jour d'état
- Conventions de nommage des actions
- Formats et niveaux de journalisation (logging)

**Conflits de Processus :**

- Gestion de l'état de chargement
- Modèles de récupération d'erreur
- Approches d'implémentation des tentatives (retry)
- Modèles de flux d'authentification
- Moment et méthodes de validation

### 2. Faciliter les Décisions sur les Modèles

Pour chaque catégorie de conflit, facilitez la définition collaborative des modèles :

**Présenter le Point de Conflit :**
"Étant donné que nous utilisons {{tech_stack}}, différents agents IA pourraient gérer {{conflict_area}} différemment.

Par exemple, un agent pourrait nommer les tables de base de données 'users' tandis qu'un autre utiliserait 'Users' — cela causerait des conflits.

Nous devons établir des modèles cohérents que tous les agents suivront."

**Montrer les Options et les Compromis :**
"Approches courantes pour {{pattern_category}} :

1. {{option_1}} — {{avantages_et_inconvénients}}
2. {{option_2}} — {{avantages_et_inconvénients}}
3. {{option_3}} — {{avantages_et_inconvénients}}

Quelle approche semble la plus logique pour notre projet ?"

**Obtenir la Décision de l'Utilisateur :**
"Quelle est votre préférence pour ce modèle ? (ou discutez davantage des compromis)"

### 3. Définir les Catégories de Modèles

#### Modèles de Nommage

**Nommage de la Base de Données :**

- Nommage des tables : users, Users, ou user ?
- Nommage des colonnes : user_id ou userId ?
- Format des clés étrangères : user_id ou fk_user ?
- Nommage des index : idx_users_email ou users_email_index ?

**Nommage de l'API :**

- Nommage des endpoints REST : /users ou /user ? Pluriel ou singulier ?
- Format des paramètres de route : :id ou {id} ?
- Nommage des paramètres de requête (query params) : user_id ou userId ?
- Conventions de nommage des en-têtes (headers) : X-Custom-Header ou Custom-Header ?

**Nommage du Code :**

- Nommage des composants : UserCard ou user-card ?
- Nommage des fichiers : UserCard.tsx ou user-card.tsx ?
- Nommage des fonctions : getUserData ou get_user_data ?
- Nommage des variables : userId ou user_id ?

#### Modèles de Structure

**Organisation du Projet :**

- Où vivent les tests ? Dans un dossier **tests**/ ou co-localisés sous la forme \*.test.ts ?
- Comment les composants sont-ils organisés ? Par fonctionnalité ou par type ?
- Où vont les utilitaires partagés ?
- Comment les services et référentiels (repositories) sont-ils organisés ?

**Structure des Fichiers :**

- Emplacements et nommage des fichiers de configuration
- Organisation des ressources statiques
- Emplacement de la documentation
- Organisation des fichiers d'environnement

#### Modèles de Format

**Formats d'API :**

- Wrapper de réponse API ? {data: ..., error: ...} ou réponse directe ?
- Format d'erreur ? {message, code} ou {error: {type, detail}} ?
- Format de date dans le JSON ? Chaînes ISO ou horodatages ?
- Structure de la réponse de succès ?

**Formats de Données :**

- Nommage des champs JSON : snake_case ou camelCase ?
- Représentations booléennes : true/false ou 1/0 ?
- Modèles de gestion des valeurs nulles
- Tableau vs objet pour les éléments uniques

#### Modèles de Communication

**Systèmes d'Événements :**

- Convention de nommage des événements : user.created ou UserCreated ?
- Normes de structure de la charge utile des événements
- Approche de versionnage des événements
- Modèles de gestion d'événements asynchrones

**Gestion d'État (State Management) :**

- Modèles de mise à jour d'état : mises à jour immuables ou mutation directe ?
- Conventions de nommage des actions
- Modèles de sélecteurs
- Principes d'organisation de l'état

#### Modèles de Processus

**Gestion des Erreurs :**

- Approche globale de gestion des erreurs
- Modèles de frontières d'erreur (error boundaries)
- Format du message d'erreur destiné à l'utilisateur
- Distinction entre journalisation (logging) et erreur utilisateur

**États de Chargement :**

- Conventions de nommage des états de chargement
- États de chargement globaux vs locaux
- Persistance de l'état de chargement
- Modèles d'interface utilisateur de chargement

### 4. Générer le Contenu des Modèles

Préparez le contenu à ajouter au document :

#### Structure du Contenu :

```markdown
## Modèles d'Implémentation & Règles de Cohérence

### Catégories de Modèles Définies

**Points de Conflit Critiques Identifiés :**
{{number_of_potential_conflicts}} zones où les agents IA pourraient faire des choix différents

### Modèles de Nommage

**Conventions de Nommage de la Base de Données :**
{{règles_de_nommage_bdd_avec_exemples}}

**Conventions de Nommage de l'API :**
{{règles_de_nommage_api_avec_exemples}}

**Conventions de Nommage du Code :**
{{règles_de_nommage_code_avec_exemples}}

### Modèles de Structure

**Organisation du Projet :**
{{règles_de_structure_projet_avec_exemples}}

**Modèles de Structure de Fichiers :**
{{règles_d'organisation_fichiers_avec_exemples}}

### Modèles de Format

**Formats de Réponse API :**
{{règles_de_structure_réponse_api}}

**Formats d'Échange de Données :**
{{règles_de_format_données_avec_exemples}}

### Modèles de Communication

**Modèles du Système d'Événements :**
{{règles_de_nommage_et_structure_événements}}

**Modèles de Gestion d'État :**
{{règles_de_mise_à_jour_et_organisation_état}}

### Modèles de Processus

**Modèles de Gestion des Erreurs :**
{{approches_cohérentes_de_gestion_erreurs}}

**Modèles d'État de Chargement :**
{{règles_de_gestion_état_chargement}}

### Directives d'Application

**Tous les Agents IA DOIVENT :**

- {{modèle_obligatoire_1}}
- {{modèle_obligatoire_2}}
- {{modèle_obligatoire_3}}

**Application des Modèles :**

- Comment vérifier que les modèles sont suivis
- Où documenter les violations de modèles
- Processus de mise à jour des modèles

### Exemples de Modèles

**Bons Exemples :**
{{exemples_concrets_d'utilisation_correcte_des_modèles}}

**Anti-modèles (À éviter) :**
{{exemples_de_ce_qu'il_faut_éviter}}
```

### 5. Présenter le Contenu et le Menu

Affichez le contenu des modèles généré et présentez les choix :

"J'ai documenté les modèles d'implémentation qui préviendront les conflits entre les agents IA travaillant sur ce projet.

**Voici ce que je vais ajouter au document :**

[Afficher le contenu markdown complet de l'étape 4]

**Que souhaitez-vous faire ?**
[A] Elicitation Avancée — Explorer des modèles de cohérence supplémentaires
[P] Mode Party — Revoir les modèles sous différentes perspectives d'implémentation
[C] Continuer — Sauvegarder ces modèles et passer à la structure du projet"

### 6. Gérer la Sélection du Menu

#### Si 'A' (Elicitation Avancée) :

- Invoquez le skill `bmad-advanced-elicitation` avec les modèles actuels
- Traitez les règles de cohérence enrichies qui reviennent
- Demandez à l'utilisateur : "Accepter ces affinements supplémentaires des modèles ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'P' (Mode Party) :

- Invoquez le skill `bmad-party-mode` avec le contexte des modèles d'implémentation
- Traitez les informations collaboratives sur les conflits potentiels
- Demandez à l'utilisateur : "Accepter ces changements pour les modèles d'implémentation ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/architecture.md`
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2, 3, 4, 5]`
- Charger `./step-06-structure.md`

## AJOUT AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 4.

## INDICATEURS DE RÉUSSITE :

✅ Tous les points de conflit potentiels entre agents IA identifiés et traités
✅ Modèles complets définis pour le nommage, la structure et la communication
✅ Exemples concrets fournis pour chaque modèle
✅ Directives d'application clairement documentées
✅ Utilisateur ayant collaboré aux décisions sur les modèles au lieu de recevoir des recommandations imposées
✅ Menu A/P/C présenté et géré correctement
✅ Contenu correctement ajouté au document lorsque C est sélectionné

## MODES D'ÉCHEC :

❌ Manquer des points de conflit potentiels qui pourraient causer des désaccords entre agents
❌ Être trop normatif sur les détails d'implémentation au lieu de se concentrer sur la cohérence
❌ Ne pas fournir d'exemples concrets pour chaque modèle
❌ Oublier de traiter les préoccupations transversales comme la gestion des erreurs
❌ Ne pas tenir compte de la pile technologique choisie lors de la définition des modèles
❌ Ne pas présenter le menu A/P/C après la génération de contenu

❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le prochain fichier d'étape
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé, chargez `./step-06-structure.md` pour définir la structure complète du projet.

Rappel : NE PAS passer à step-06 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
