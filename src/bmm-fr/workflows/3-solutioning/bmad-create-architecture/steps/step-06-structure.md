# Étape 6 : Structure du Projet & Frontières Architecturales

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant d'entreprendre toute action — une compréhension partielle mène à des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue et comprise avant de continuer
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la définition d'une structure de projet claire que les agents IA peuvent parcourir
- 🎯 METTEZ L'ACCENT sur les frontières, pas seulement sur les dossiers — spécifiez ce qui va où et pourquoi
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant d'entreprendre toute action
- 🎯 Se concentrer sur l'organisation logique et physique du projet
- ⚠️ Présenter le menu A/P/C après avoir généré la structure du projet
- 💾 Sauvegarder UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]` avant de charger l'étape suivante
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné

## MENUS DE COLLABORATION (A/P/C) :

Cette étape générera du contenu et présentera des choix :

- **A (Elicitation Avancée)** : Utiliser les protocoles de découverte pour concevoir des structures de projet complexes ou multi-modules
- **P (Mode Party)** : Apporter plusieurs perspectives pour optimiser l'organisation du projet pour différents flux de travail
- **C (Continuer)** : Sauvegarder la structure et passer à la validation de l'architecture

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez le skill `bmad-advanced-elicitation`
- Quand 'P' est sélectionné : Invoquez le skill `bmad-party-mode`
- Les PROTOCOLES reviennent toujours à l'affichage du menu A/P/C de cette étape une fois que A ou P est terminé
- L'utilisateur accepte/rejette les modifications du protocole avant de continuer

## LIMITES DE CONTEXTE :

- Les modèles d'implémentation de l'étape 5 sont terminés
- La pile technologique et les décisions fondamentales sont fixées
- Se concentrer sur l'organisation des fichiers, les répertoires et les frontières de composants
- Considérer comment les exigences (epics/stories) seront cartographiées vers cette structure

## VOTRE TÂCHE :

Définir la structure complète du répertoire du projet et les frontières architecturales qui guideront les agents IA dans l'emplacement correct du code et des ressources.

## SÉQUENCE DE DÉFINITION DE LA STRUCTURE :

### 1. Cartographier les Exigences vers les Composants

Sur la base de l'Analyse de Contexte (Étape 2) et des Décisions (Étape 4), identifiez les composants structurels nécessaires :

**Exigences Fonctionnelles & Epics :**
"Nous avons {{nombre_epics}} epics. Regroupons-les en domaines logiques qui deviendront nos répertoires principaux."

**Composants Techniques :**
"Basé sur {{tech_stack}}, nous aurons besoin de structures pour :

- {{composant_technique_1}} (ex: API, Frontend, Database)
- {{composant_technique_2}} (ex: Services, Utils, Config)"

### 2. Faciliter les Décisions de Structure

Pour chaque partie du projet, facilitez la définition collaborative de la structure :

**Présenter l'Organisation Logicielle :**
"Comment devrions-nous organiser notre logique métier ?

Options courantes pour {{tech_stack}} :

1. {{organisation_option_1}} (ex: Organisation par fonctionnalité / Domain-Driven)
2. {{organisation_option_2}} (ex: Organisation par type / Layered Architecture)

Quelle structure facilitera le travail indépendant des agents IA sans qu'ils ne se marchent sur les pieds ?"

**Définir les Frontières d'Intégration :**
"Où les composants se rencontrent-ils ? Définissons les points d'entrée et de sortie clairs."

### 3. Définir l'Arborescence du Projet

Créez une vue d'ensemble de la structure des répertoires du projet :

#### Racine du Projet & Configuration

- `_bmad/` : Artefacts de planification et configuration BMAD
- `docs/` : Documentation du projet
- `config/` : Fichiers de configuration globale
- `scripts/` : Scripts de build et d'automatisation
- `tests/` : Tests d'intégration et système

#### Code Source (`src/`)

**Organisation du Backend (si applicable) :**

- `/api` : Points de terminaison (endpoints) et contrôleurs
- `/services` : Logique métier et services
- `/models` : Définitions des données et schémas
- `/db` : Migrations et configuration de la base de données
- `/middleware` : Authentification et middleware de sécurité

**Organisation du Frontend (si applicable) :**

- `/components` : Composants UI réutilisables
- `/pages` ou `/app` : Pages et routage
- `/hooks` : Hooks personnalisés
- `/store` ou `/state` : Gestion d'état
- `/assets` : Images, styles, polices
- `/services` : Clients API frontend

#### Autres Répertoires Spécifiques

- `/lib` ou `/utils` : Bibliothèques et utilitaires partagés
- `/types` : Définitions de types (TypeScript)
- `/public` : Fichiers publics statiques

### 4. Définir les Frontières de Responsabilité

Pour chaque répertoire principal, spécifiez :

- **Responsabilité :** Que contient ce dossier ?
- **Interdictions :** Ce qui ne doit JAMAIS se trouver ici.
- **Dépendances :** Quels autres dossiers ce dossier a-t-il le droit d'importer ?

### 5. Générer le Contenu de la Structure

Préparez le contenu à ajouter au document :

#### Structure du Contenu :

````markdown
## Structure du Projet & Frontières Architecturales

### Arborescence Globale du Projet

```text
{{project_root_tree_diagram}}
```

### Organisation de la Logique Métier

**Approche d'Organisation :**
{{description_de_l'organisation_choisie_ex_domain_driven}}

**Cartographie des Epics vers les Répertoires :**
{{mapping_epics_stories_to_folders}}

### Arborescence Détaillée de la Source (`src/`)

```text
{{detailed_src_tree_diagram}}
```

### Définition des Frontières Architecturales

**Composant : {{nom_composant}}**

- **Chemin :** `{{path}}`
- **Responsabilité :** {{description}}
- **Règles d'Importation :** {{peut_importer_de_X_ne_doit_pas_importer_de_Y}}
- **Points d'Entrée Clairs :** {{ex_index_ts}}

**Composant : {{nom_composant_2}}**
... (répéter pour les composants clés)

### Cartographie des Exigences vers les Fichiers

| Exigence / Epic | Composant Principal | Répertoire Cible |
| :--- | :--- | :--- |
| {{epic_name}} | {{component_name}} | `{{path}}` |
| ... | ... | ... |

### Guide de Navigation pour les Agents IA

**Pour ajouter une nouvelle fonctionnalité :**

1. {{etape_navigation_1}}
2. {{etape_navigation_2}}
3. {{etape_navigation_3}}

**Pour modifier le schéma de données :**
...
````

### 6. Présenter le Contenu et le Menu

Affichez le contenu de la structure généré et présentez les choix :

"J'ai défini la structure complète du répertoire et les frontières architecturales de {{project_name}}. Cela garantit que chaque agent IA sait exactement où placer le code.

**Voici ce que je vais ajouter au document :**

[Afficher le contenu markdown complet de l'étape 5]

**Que souhaitez-vous faire ?**
[A] Elicitation Avancée — Concevoir des structures plus complexes ou spécialisées
[P] Mode Party — Optimiser l'organisation pour différents flux de travail
[C] Continuer — Sauvegarder cette structure et valider l'architecture globale"

### 7. Gérer la Sélection du Menu

#### Si 'A' (Elicitation Avancée) :

- Invoquez le skill `bmad-advanced-elicitation` avec la structure actuelle
- Traitez les organisations de projet enrichies qui reviennent
- Demandez à l'utilisateur : "Accepter ces affinements de structure ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'P' (Mode Party) :

- Invoquez le skill `bmad-party-mode` avec le contexte de structure du projet
- Traitez les informations collaboratives sur l'organisation des fichiers
- Demandez à l'utilisateur : "Accepter ces changements pour la structure du projet ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/architecture.md`
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Charger `./step-07-validation.md`

## AJOUT AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 5.

## INDICATEURS DE RÉUSSITE :

✅ Structure de répertoire complète et cohérente avec la pile technologique définie
✅ Frontières architecturales (responsabilités, imports) clairement spécifiées
✅ Cartographie explicite des epics/stories vers les répertoires du projet
✅ Guide de navigation pour les agents IA inclus
✅ Utilisateur ayant collaboré à l'organisation physique du code
✅ Menu A/P/C présenté et géré correctement
✅ Contenu correctement ajouté au document lorsque C est sélectionné

## MODES D'ÉCHEC :

❌ Créer une structure générique qui ne tient pas compte des spécificités du projet
❌ Oublier de définir les frontières d'importation (risques de dépendances circulaires)
❌ Ne pas lier les exigences métier (epics) à la structure physique
❌ Fournir une arborescence trop complexe ou trop simple pour l'échelle du projet
❌ Ne pas présenter le menu A/P/C après la génération de contenu

❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le prochain fichier d'étape
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé, chargez `./step-07-validation.md` pour valider l'architecture complète avant de terminer.

Rappel : NE PAS passer à step-07 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
