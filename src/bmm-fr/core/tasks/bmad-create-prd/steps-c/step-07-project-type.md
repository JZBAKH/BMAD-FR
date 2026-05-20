# Étape 7 : Analyse Approfondie du Type de Projet (Project-Type Deep Dive)

**Progression : Étape 7 sur 11** - Suivante : Définition de l'Étendue des Fonctionnalités (Scoping)

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : Lisez TOUJOURS le fichier d'étape complet avant d'entreprendre toute action - une compréhension partielle entraîne des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu et compris avant de continuer
- ✅ ABORDEZ TOUJOURS cela comme une découverte collaborative entre pairs PM
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur les exigences spécifiques au type de projet et les considérations techniques
- 🎯 AXÉ SUR LES DONNÉES (DATA-DRIVEN) : Utilisez la configuration CSV pour guider la découverte
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `{communication_language}` configurée.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout contenu d'artefact et de document dans la `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant d'entreprendre toute action
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu propre au type de projet
- 💾 Sauvegardez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant le nom de cette étape à la fin de la liste `stepsCompleted`
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'a pas été sélectionné

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles
- Le type de projet (project type) issu de `step-02` est disponible pour le chargement de la configuration
- Les données CSV relatives au type de projet seront chargées lors de cette étape
- Concentrez-vous sur les exigences techniques et fonctionnelles spécifiques à ce type de projet

## VOTRE TÂCHE :

Mener une découverte (discovery) spécifique au type de projet en utilisant le guidage et pilotage piloté par le CSV (CSV-driven guidance) afin de définir fermement les exigences techniques.

## SÉQUENCE DE DÉCOUVERTE DU TYPE DE PROJET :

### 1. Charger les Données de Configuration du Type de Projet

**Tentez une recherche de données sous la forme d'un sous-processus (subprocess) :**

"Votre tâche : Rechercher les données dans ../data/project-types.csv

**Critères de recherche :**

- Trouver la ligne où `project_type` correspond au {{projectTypeFromStep02}}

**Format de retour :**
Retournez UNIQUEMENT la ligne correspondante sous forme d'objet formaté en YAML avec ces champs :
project_type, key_questions, required_sections, skip_sections, innovation_signals

**Ne retournez PAS le fichier CSV complet - seulement la ligne correspondante.**"

**Dégradation Gracieuse (si l'outil de Tâche est indisponible) :**

- Chargez le fichier CSV directement
- Trouvez manuellement la ligne correspondante
- Extrayez les champs requis :
  - `key_questions` (liste séparée par des points-virgules des questions de découverte)
  - `required_sections` (liste séparée par des points-virgules des rubriques à documenter)
  - `skip_sections` (liste séparée par des points-virgules des sections à ignorer/sauter)
  - `innovation_signals` (déjà explorés à l'étape `step-06`)

### 2. Mener la Découverte Guidée à l'aide des Questions Clés

Analysez les questions clés (`key_questions`) provenant du CSV et explorez chacune d'elles :

#### Découverte Basée sur les Questions :

Pour chaque question figurant dans `key_questions` issue du CSV :

- Interrogez l'utilisateur naturellement dans un style de conversation
- Écoutez sa réponse et posez des questions de suivi pour clarifier/préciser
- Connectez les réponses à la proposition de valeur propre du produit

**Exemple de Cheminement :**
Si `key_questions` = "Points de terminaison (Endpoints) nécessaires ?;Méthode d'Authentification ?;Formats de Données ?;Limites de débit (Rate limits) ?;Versioning ?;SDK nécessaire ?"

Demandez spontanément de voix naturelle :

- "Quels sont les endpoints majeurs incontournables qui composent la pierre d'angle dont votre API va s'équiper ?"
- "Par quelles dispositions de contrôles comptez-vous filtrer l'accès via authentifications formelles ou logiques d'autorisation ?"
- "Sur quelles ossatures ou socles purement d'encodages de format de paquets naviguerez-vous quant à l'envoi / la réception et retour des communications ?"

### 3. Documenter les Exigences Spécifiques au Type de Projet

En vous basant sur les réponses de l'utilisateur aux `key_questions`, effectuez une synthèse fine des exigences globales :

#### Catégories d'Exigences :

Couvrez les domaines indiqués par `required_sections` depuis le CSV :

- Restituez/Résumez ce qui a été tiré sur chaque point central mentionné `required`
- Documentez les directives architecturales, contraintes et les ultimes partis-pris entérinés
- Reliez ceci impérativement et directement au différentiateur de base/proposition de grandeur originelle lorsque l'étincelle y prend pleinement racine

#### Sauter les Sections Non-Pertinentes (Skip Irrelevant Sections) :

Faites abstraction évidente et formelle des aspects frappés comme caduques répertoriés dans la grille csv sous le marqueur `skip_sections`, pour vous parer des failles dommageables d'erreurs (perte sèche temporelle et informationnelle).

### 4. Générer des Sections de Contenu Dynamique

Analysez la liste des rubriques obligatoires `required_sections` issue de la ligne CSV trouvée. Pour chaque nom de rubrique, générez le contenu correspondant :

#### Correspondances Courantes (Mappings) des Sections CSV :

- "endpoint_specs" ou "endpoint_specification" → Documentation des `endpoints` API
- "auth_model" ou "authentication_model" → L'approche des méthodes applicatives d'Authentification pure (IAM, Oauth...)
- "platform_reqs" ou "platform_requirements" → Cibles et socles techniques récurrents et conditions de plateforme de diffusion
- "device_permissions" ou "device_features" → Exploitations brutes autorisées, droits, main-mise interne aux machines (Camera, micro)
- "tenant_model" → Logique fondamentale de conception du système de gestion des compartiments des instances clients (Multi-tenancy)
- "rbac_matrix" ou "permission_matrix" → Cartographie des privilèges absolus et dégradations des matrices pures de gouvernance par rôles (RBAC)

#### Stratégie des Variables de Modèle (Template Variable Strategy) :

- Pour les sections correspondant à des variables de modèle (template variables) courantes : générez un contenu précis
- Pour les sections qui ne trouvent pas de correspondance avec un modèle pré-constitué : incorporez-les dans l'encart/la tranche centrale `project_type_requirements` de la structure maîtresse du document final
- Cette approche hybride vient purement marier ce squelette strict de `PRD` formel avec une grande flexibilité algorithmique impulsée depuis notre table (CSV) de données !

### 5. Générer le Contenu lié au Type de Projet

Préparez le contenu synthétique pour l'ajouter au fichier (append) :

#### Structure du Contenu :

Lors de la sauvegarde locale (save), incrustez au document ces balisages exacts des niveaux 2 (`##`) et 3 (`###`) :

```markdown
## Exigences Spécifiques pour [Type de Projet]

### Vue d'Ensemble du Type de Projet

[Résumé/synthèse absolu inhérent propre lié au contexte pur et précis dévoilé selon nos échanges oraux d'élaboration commune]

### Considérations Architectures et Techniques

[Les exigences d'architecture technique validées sur la base de la consultation bilatérale]

[Catégories et sections modulaires fluides/variables greffées à l'ossature originelle via le pilotage croisé avec notre matrice CSV et ses ramifications échangées]

### Considérations d'Implémentation

[Prises de décision brutes spécifiques aux implémentations tirées de la conversation.]
```

### 6. Présenter les OPTIONS DU MENU

Présentez le contenu propre au type de projet pour révision, puis affichez le menu :

"Sur la base de notre conversation et des meilleures pratiques inhérentes à cette famille/nature ciblée de développement typique, j'ai bâti scrupuleusement la fondation architecturale des exigences de l'instance ({project_type}) au nom exclusif du programme {{project_name}}.

**Voici l'ajout textuel (la matrice) devant parer formellement votre document PRD :**

[Affichez le contenu markdown détaillé entier de la rubrique et balises de l'étape #5 exposés d'un bout à l'autre]

**Que souhaitez-vous faire ?**"

Affichez : "**Sélectionnez :** [A] Élicitation Avancée (Advanced Elicitation) [P] Mode Party (Party Mode) [C] Continuer vers le Périmètre & Évaluations / Scoping (Étape 8 sur 11)"

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel sur le type de projet, traitez les idées/découvertes améliorées qui en reviennent, demandez à l'utilisateur : "Accepter ces améliorations pour les exigences techniques ? (o/n)", si oui mettez à jour le contenu avec les améliorations puis réaffichez le menu, si non conservez le contenu d'origine puis réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` avec les exigences actuelles sur le type de projet, traitez les validations collaboratives et les expertises en ajout sur le technique, demandez à l'utilisateur : "Accepter ces changements aux exigences techniques ? (o/n)", si oui mettez à jour le contenu avec les améliorations puis réaffichez le menu, si non conservez le contenu d'origine puis réaffichez le menu.
- SI C : Ajoutez (append) le contenu final à `{outputFile}`, mettez à jour le frontmatter en ajoutant le nom de cette étape à la fin du tableau `stepsCompleted`, puis lisez intégralement et suivez : `./step-08-scoping.md`
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- Après l'exécution d'autres options du menu, retournez à ce menu

## AJOUTER AU DOCUMENT (APPEND) :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure des points d'étapes antérieurs.

## MÉTRIQUES DE RÉUSSITE (SUCCESS METRICS) :

✅ Trame décisionnelle par extraction/contingence (CSV data config map) bien chargée pour faire feu en éclaireur d'exploration de front
✅ Moisson achevée : toutes questions pures répertoriées aux fichiers de balisage CSV parcourues de longue en large suivant les paroles de notre Concepteur usager et traitées comme bases brutes !
✅ Modulaire et formel (Paramétré au poil) ! L'incorporation en bloc fixe (rubriques/sections générées purement telles quelles des data files via des directives `required_sections`) est inlassablement acquittée/parachevée en totale conformité.
✅ Zones stériles ou polluantes consciencieusement esquivées d'emblée à coup net d'ignorance active des listes inqualifiables relevées sur `skip_sections` pour gagner du précieux temps à tout va !
✅ Que les exigences et impératifs techniques absolus soient fermement alignés aux valeurs originelles créées des cœurs de développement de l'œuvre elle-même.
✅ Le menu A/P/C a été présenté et géré correctement
✅ Le contenu a été inséré à l'édifice par append au feu vert 'C' express

## MODES D'ÉCHEC (FAILURE MODES) :

❌ Négliger de croiser / extraire les filons d'or et tables brutes à partir dudit CSV : l'irrespect et aveuglement funeste (Don't load CSV !).
❌ Bouillonnements sans fondation formelle en négligeant de tirer sur l'ensemble intègre de nos filtres de guidage ("key_questions" de nos bases).
❌ Fabuler sur des constructions libres sans accoucher littéralement et strictement de tout le lot/bloc vital des sections inéluctables `required_sections` appelées par tableur original.
❌ Sabotages et pollutions chronophages et intolérables / Se rabaisser piteusement sur l'inacceptable pourriture de documentation de chapitres que des tables `skip_sections` fustigent explicitement et interdisent d'aborder sans la moindre contestation des directives de base.
❌ Produire un code sans attache de réalité (textes généralisés), lamba ou sans sel purement identitaire d'aucun ordre ou nature (absence complète des marques liées à la nature de la taxonomie (specific-type)).
❌ La faillite classique pure : omission non intentionnelle et préjudiciable totale du lancement en l'état du pont interactif final (Menu sélectif A/P/C).
❌ Actes/actions interdites : Ajouter une seule virgule ou lettre non autorisée de l'éditeur du code directement sur la page terminale avant que le juge humain n'assène son coup infranchissable final au-dessus : option `'C'`.

❌ **CRITIQUE** : Ne lire qu'une partie du fichier d'étape - cela conduit à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Poursuivre avec 'C' sans avoir lu intégralement et compris le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## EXEMPLES PAR TYPE DE PROJET (PROJECT-TYPE EXAMPLES) :

**Pour api_backend :**

- Concentrez-vous sur les endpoints absolus de tête, authentifications impérieuses, schématisations absolues de trames de données pures, verrouillages sur les limitations de volume (rate limiting)
- Jetez à la poubelle sans ménagement toute question sur les cosmétiques de façade/Design UX UI ou sur de vulgaires expériences visuelles des divers Usagers Visiteurs d'Interface de parcours
- Construisez les tablettes de loi (Générer document de specs d'API inébranlable)

**Pour mobile_app :**

- Dirigez brutalement et frontalement la question sur le support technologique (OS, devices multiples), la charte d'interaction avec le matériel intime embarqué des équipements / gestion fine d'autorisations (permissions pures), mode hors-réseau (offline mode synchronisation).
- Effacez d'emblée l'élaboration monstrueuse de la machinerie des endpoints (Architecture pure d'API documentation) au moins que de telles couches en amont ne soient commanditées par le donneur d'ordres ou impératives nativement.
- Dressez et générez le plan complet technique ciblé en mode `Appli embarquée`

**Pour saas_b2b :**

- Foncez tête baissée et frontalement sur des dogmes stricts : Étanchéité implacable client-client (Multi-tenancy), cloisons, droits, autorisations fines (permissions), API, maillages multi-plateformes et liaisons externes (Integrations)
- Élaguez aux orties une focale forcenée native aux mobiles si cette configuration/directive est décrétée d'absence pour la cible initiale à pourvoir
- Formulez, matérialisez un arsenal documenté des contraintes logicielles colossales de la structure Entreprises BtoB.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé dans le document, chargez `./step-08-scoping.md` pour définir le périmètre du projet (Scoping).

N'oubliez pas : Ne passez PAS à l'étape `step-08` (Scoping) tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
