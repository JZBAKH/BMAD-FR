---
# Références de fichiers
outputFile: '{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md'
---

# Étape 3 : Découverte des Utilisateurs Cibles

## OBJECTIF DE L'ÉTAPE :

Définir les utilisateurs cibles avec des personas riches et cartographier leurs interactions clés avec le produit grâce à une recherche utilisateur collaborative et une cartographie de parcours (journey mapping).

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- 📖 CRITIQUE : Lisez l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS RÉDIGER tout le contenu de l'artefact et du document en `{document_output_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un facilitateur Business Analyst orienté produit.
- ✅ Si un nom, un style de communication et un persona vous ont déjà été attribués, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une relation commande-réponse.
- ✅ Vous apportez une pensée structurée et des compétences de facilitation, tandis que l'utilisateur apporte son expertise métier et sa vision produit.
- ✅ Maintenez un ton de découverte collaborative tout au long du processus.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous uniquement sur la définition de qui ce produit sert et de la manière dont ils interagissent avec lui.
- 🚫 INTERDICTION de créer des profils d'utilisateurs génériques sans détails spécifiques.
- 💬 Approche : Développement systématique de personas avec cartographie de parcours.
- 📋 Développement COLLABORATIF de personas, pas une création d'utilisateurs basée sur des suppositions.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- 💾 Générez des personas et des parcours utilisateurs en collaboration avec l'utilisateur.
- 📖 Mettez à jour le frontmatter `stepsCompleted: [1, 2, 3]` avant de charger l'étape suivante.
- 🚫 INTERDICTION de continuer sans confirmation de l'utilisateur via le menu.

## LIMITES DE CONTEXTE :

- Contexte disponible : Document actuel et frontmatter des étapes précédentes, vision produit et problème déjà définis.
- Focus : Créer des personas d'utilisateurs vivants et actionnables qui s'alignent sur la vision du produit.
- Limites : Concentrez-vous sur les utilisateurs qui vivent directement le problème ou bénéficient de la solution.
- Dépendances : La vision produit et l'énoncé du problème de l'étape 02 doivent être terminés.

## Séquence d'Instructions (Ne pas dévier, sauter ou optimiser)

### 1. Commencer la Découverte des Utilisateurs

**Exploration d'ouverture :**
"Maintenant que nous comprenons ce que fait {{project_name}}, définissons pour qui il est fait.

**Découverte des Utilisateurs :**

- Qui vit le problème que nous résolvons ?
- Existe-t-il différents types d'utilisateurs avec des besoins différents ?
- Qui tire le plus de valeur de cette solution ?
- Y a-t-il des utilisateurs primaires et secondaires que nous devrions considérer ?

Commençons par identifier les principaux groupes d'utilisateurs."

### 2. Développement des Segments d'Utilisateurs Primaires

**Processus de Développement de Persona :**
Pour chaque segment d'utilisateur primaire, créez des personas riches :

**Nom & Contexte :**

- Donnez-leur un nom réaliste et une brève histoire.
- Définissez leur rôle, leur environnement et leur contexte.
- Qu'est-ce qui les motive ? Quels sont leurs objectifs ?

**Expérience du Problème :**

- Comment vivent-ils actuellement le problème ?
- Quelles solutions de contournement utilisent-ils ?
- Quels sont les impacts émotionnels et pratiques ?

**Vision du Succès :**

- À quoi ressemblerait le succès pour eux ?
- Qu'est-ce qui leur ferait dire "c'est exactement ce dont j'avais besoin" ?

**Questions sur l'Utilisateur Primaire :**

- "Parlez-moi d'une personne typique qui utiliserait {{project_name}}."
- "À quoi ressemble sa journée ? Où notre produit s'insère-t-il ?"
- "Qu'essaie-t-elle d'accomplir qui est difficile actuellement ?"

### 3. Exploration des Segments d'Utilisateurs Secondaires

**Considérations sur les Utilisateurs Secondaires :**

- "Qui d'autre bénéficie de cette solution, même s'il n'est pas l'utilisateur primaire ?"
- "Y a-t-il des rôles d'administration, de support ou de supervision à considérer ?"
- "Qui influence la décision d'adopter ou d'acheter ce produit ?"
- "Y a-t-il des utilisateurs partenaires ou des parties prenantes qui comptent ?"

### 4. Cartographie du Parcours Utilisateur (User Journey Mapping)

**Éléments du Parcours :**
Cartographiez les interactions clés pour chaque segment d'utilisateur :

- **Découverte :** Comment apprennent-ils l'existence de la solution ?
- **Onboarding :** À quoi ressemble leur première expérience ?
- **Usage Central :** Comment utilisent-ils le produit au quotidien ?
- **Moment de Succès :** À quel moment réalisent-ils la valeur ?
- **Long Terme :** Comment cela s'intègre-t-il dans leur routine ?

**Questions sur le Parcours :**

- "Expliquez-moi comment [Nom du Persona] découvrirait et commencerait à utiliser {{project_name}}."
- "Quel est son moment 'Aha!' ?"
- "Comment ce produit change-t-il sa façon de travailler ou de vivre ?"

### 5. Générer le Contenu des Utilisateurs Cibles

**Contenu à Ajouter :**
Préparez la structure suivante pour l'ajout au document :

```markdown
## Utilisateurs Cibles

### Utilisateurs Primaires

[Contenu du segment d'utilisateur primaire basé sur la conversation]

### Utilisateurs Secondaires

[Contenu du segment d'utilisateur secondaire basé sur la conversation, ou N/A si non abordé]

### Parcours Utilisateur (User Journey)

[Contenu du parcours utilisateur basé sur la conversation, ou N/A si non abordé]
```

### 6. Présenter les OPTIONS DU MENU

**Présentation du Contenu :**
"J'ai cartographié qui sert {{project_name}} et comment ils interagiront avec lui. Cela nous aide à garantir que nous construisons quelque chose que les gens aimeront vraiment utiliser.

**Voici ce que je vais ajouter au document :**
[Afficher le contenu markdown complet de l'étape 5]

**Sélectionnez une Option :** [A] Élicitation Avancée [P] Party Mode [C] Continuer"

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu utilisateur actuel pour approfondir les personas et les parcours.
- SI P : Invoquez la compétence `bmad-party-mode` pour apporter différentes perspectives afin de valider la compréhension des utilisateurs.
- SI C : Enregistrez le contenu dans `{outputFile}`, mettez à jour le frontmatter avec `stepsCompleted: [1, 2, 3]`, puis lisez complètement et suivez : `./step-04-metrics.md`.
- SI Tout autre commentaire ou requête : aidez l'utilisateur à répondre puis [Réafficher les Options du Menu](#6-present-menu-options).

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- UNIQUEMENT passer à l'étape suivante lorsque l'utilisateur sélectionne 'C'.
- Après l'exécution d'autres éléments du menu, revenez à ce menu avec le contenu mis à jour.
- L'utilisateur peut discuter ou poser des questions — répondez toujours et terminez en affichant à nouveau les options du menu.

## NOTE CRITIQUE DE FIN D'ÉTAPE

UNIQUEMENT LORSQUE [l'option C Continuer] est sélectionnée et que [les personas d'utilisateurs sont finalisés et enregistrés dans le document avec le frontmatter mis à jour], vous devrez alors lire complètement et suivre : `./step-04-metrics.md` pour commencer la définition des métriques de réussite.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Personas d'utilisateurs riches et crédibles avec des motivations claires.
- Distinction nette entre utilisateurs primaires et secondaires.
- Parcours utilisateurs montrant les points d'interaction clés et la création de valeur.
- Segments d'utilisateurs qui s'alignent sur la vision du produit et l'énoncé du problème.
- Menu A/P/C présenté et géré correctement avec une exécution appropriée de la tâche.
- Contenu correctement ajouté au document lorsque C est sélectionné.
- Frontmatter mis à jour avec `stepsCompleted: [1, 2, 3]`.

### ❌ ÉCHEC DU SYSTÈME :

- Créer des profils d'utilisateurs génériques sans détails spécifiques.
- Oublier des segments d'utilisateurs clés qui sont importants pour le succès.
- Parcours utilisateurs qui ne montrent pas comment le produit crée de la valeur.
- Ne pas relier les besoins des utilisateurs à l'énoncé du problème.
- Ne pas présenter le menu standard A/P/C après la génération du contenu.
- Ajouter le contenu sans que l'utilisateur ait sélectionné 'C'.
- Ne pas mettre à jour le frontmatter correctement.

**Règle Maîtresse :** Sauter des étapes, optimiser les séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.
