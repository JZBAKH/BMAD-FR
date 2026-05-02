# Étape 2 : Compréhension du Projet

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur la compréhension du contexte du projet et des besoins des utilisateurs.
- 🎯 Découverte COLLABORATIVE, pas un design basé sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu de compréhension du projet.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights projet plus profonds.
- **P (Mode Party)** : Apporter plusieurs perspectives pour comprendre le contexte du projet.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter de l'étape 1 sont disponibles.
- Les documents sources (PRD, briefs, epics) déjà chargés sont en mémoire.
- Aucun fichier de données supplémentaire n'est nécessaire pour cette étape.
- Focus sur la compréhension du projet et des utilisateurs.

## VOTRE TÂCHE :

Comprendre le contexte du projet, les utilisateurs cibles et ce qui rend ce produit spécial d'un point de vue UX.

## SÉQUENCE DE DÉCOUVERTE DU PROJET :

### 1. Passer en revue le contexte chargé

Commencez par analyser ce que nous savons d'après les documents chargés :
"Sur la base de la documentation du projet que nous avons chargée, laissez-moi confirmer ce que je comprends de {{project_name}}.

**D'après les documents :**
{résumé des insights clés issus du PRD, des briefs et d'autres documents de contexte chargés}

**Utilisateurs Cibles :**
{résumé des informations utilisateurs issues des documents chargés}

**Fonctionnalités/Objectifs Clés :**
{résumé des principales fonctionnalités et objectifs issus des documents chargés}

Est-ce que cela correspond à votre compréhension ? Y a-t-il des corrections ou des ajouts que vous aimeriez apporter ?"

### 2. Combler les lacunes de contexte (si aucun document ou s'il manque des informations clés)

Si aucun document n'a été chargé ou si des informations clés manquent :
"Puisque nous n'avons pas de documentation complète, commençons par l'essentiel :

**Qu'est-ce que vous construisez ?** (Décrivez votre produit en 1-2 phrases)

**À qui est-ce destiné ?** (Décrivez votre utilisateur idéal ou votre public cible)

**Qu'est-ce qui rend cela spécial ou différent ?** (Quelle est la proposition de valeur unique ?)

**Quelle est la chose principale que les utilisateurs feront avec cela ?** (Action ou objectif principal de l'utilisateur)"

### 3. Explorer le contexte utilisateur plus en profondeur

Plongez dans la compréhension de l'utilisateur :
"Laissez-moi mieux comprendre vos utilisateurs pour éclairer le design UX :

**Questions sur le contexte utilisateur :**

- Quel problème les utilisateurs essaient-ils de résoudre ?
- Qu'est-ce qui les frustre avec les solutions actuelles ?
- Qu'est-ce qui leur ferait dire 'c'est exactement ce dont j'avais besoin' ?
- Quel est le niveau d'aisance technique de vos utilisateurs cibles ?
- Quels appareils utiliseront-ils le plus ?
- Quand/où utiliseront-ils ce produit ?"

### 4. Identifier les défis de design UX

Faites ressortir les principaux défis UX à relever :
"D'après ce que nous avons discuté, je vois des points d'attention majeurs pour le design UX :

**Défis de Design :**

- [Identifier 2-3 défis UX clés en fonction du type de projet et des besoins des utilisateurs]
- [Noter toute considération spécifique à la plateforme]
- [Mettre en évidence les flux utilisateurs ou interactions complexes]

**Opportunités de Design :**

- [Identifier 2-3 domaines où une excellente UX pourrait créer un avantage concurrentiel]
- [Noter toute opportunité pour des modèles UX innovants]

Est-ce que cela capture les considérations UX clés que nous devons aborder ?"

### 5. Générer le contenu de compréhension du projet

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Résumé Analytique

### Vision du Projet

[Résumé de la vision du projet basé sur la conversation]

### Utilisateurs Cibles

[Descriptions des utilisateurs cibles basées sur la conversation]

### Principaux Défis de Design

[Principaux défis UX identifiés lors de la conversation]

### Opportunités de Design

[Opportunités de design identifiées lors de la conversation]
```

### 6. Présenter le contenu et le menu

Afficher le contenu de compréhension du projet généré et présenter les choix :
"J'ai documenté notre compréhension de {{project_name}} d'un point de vue UX. Cela guidera toutes nos décisions de design à l'avenir.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 5]

**Que souhaitez-vous faire ?**
[C] Continuer - Enregistrer cela dans le document et passer à la définition de l'expérience de base"

### 7. Gérer la sélection du menu

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : `stepsCompleted: [1, 2]`.
- Chargez `./step-03-core-experience.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document. Ce n'est qu'après l'enregistrement du contenu dans le document que vous devez lire complètement et suivre : `./step-03-core-experience.md`.

## MÉTRIQUES DE RÉUSSITE :

✅ Tous les documents de contexte disponibles ont été examinés et synthétisés.
✅ Vision du projet clairement articulée.
✅ Utilisateurs cibles bien compris.
✅ Défis UX clés identifiés.
✅ Opportunités de design mises en évidence.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Ne pas examiner minutieusement les documents de contexte chargés.
❌ Faire des suppositions sur les utilisateurs sans poser de questions.
❌ Manquer des défis UX clés qui impacteront le design.
❌ Ne pas identifier d'opportunités de design.
❌ Générer du contenu générique sans réel aperçu du projet.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Rappel : Ne passez PAS à l'étape 03 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu et que le contenu n'est pas enregistré !
