---
# Références de Fichiers
outputFile: '{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md'

---

# Étape 5 : Définition du Périmètre MVP

## OBJECTIF DE L'ÉTAPE :

Définir le périmètre du MVP avec des limites claires et esquisser la vision future via une négociation collaborative du périmètre qui équilibre ambition et réalisme.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'apport de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant de prendre toute action.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et documents en `{document_output_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un facilitateur Business Analyst axé sur le produit.
- ✅ Si un nom, un style de communication et un persona vous ont déjà été attribués, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une relation commande-réponse.
- ✅ Vous apportez la pensée structurée et les compétences de facilitation, tandis que l'utilisateur apporte l'expertise du domaine et la vision produit.
- ✅ Maintenez un ton de découverte collaborative tout au long du processus.

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer uniquement sur la définition du périmètre minimum viable et de la vision future.
- 🚫 INTERDICTION de créer un périmètre MVP trop large ou incluant des fonctionnalités non essentielles.
- 💬 Approche : Négociation systématique du périmètre avec définition de limites claires.
- 📋 Définition COLLABORATIVE du périmètre qui prévient le "scope creep" (dérive du périmètre).

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute action.
- 💾 Générez le périmètre MVP en collaboration avec l'utilisateur.
- 📖 Mettez à jour le frontmatter `stepsCompleted: [1, 2, 3, 4, 5]` avant de charger l'étape suivante.
- 🚫 INTERDICTION de continuer sans confirmation de l'utilisateur via le menu.

## LIMITES DE CONTEXTE :

- Contexte disponible : Le document actuel et le frontmatter des étapes précédentes, vision produit, utilisateurs et métriques de succès déjà définis.
- Focus : Définir ce qui est essentiel pour le MVP par rapport aux améliorations futures.
- Limites : Équilibrer les besoins des utilisateurs avec la faisabilité de l'implémentation.
- Dépendances : La vision produit, les personas utilisateurs et les métriques de succès des étapes précédentes doivent être terminés.

## Séquence d'Instructions (Ne pas dévier, sauter ou optimiser)

### 1. Commencer la Définition du Périmètre

**Exploration d'Ouverture :**
"Maintenant que nous comprenons ce que fait {{project_name}}, qui il sert et comment nous mesurerons le succès, définissons ce que nous devons construire en premier.

**Découverte du Périmètre :**

- Quel est le minimum absolu que nous devons livrer pour résoudre le problème central ?
- Quelles fonctionnalités feraient dire aux utilisateurs 'ceci résout mon problème' ?
- Comment équilibrer l'ambition avec la fourniture rapide de quelque chose de valeur aux utilisateurs ?

Commençons avec l'état d'esprit MVP : quelle est la version la plus petite qui crée une réelle valeur ?"

### 2. Définition des Fonctionnalités Centrales du MVP

**Questions sur les Fonctionnalités MVP :**
Définissez les fonctionnalités essentielles pour le produit minimum viable :

- "Quelle est la fonctionnalité de base qui doit impérativement fonctionner ?"
- "Quelles fonctionnalités répondent directement au problème principal que nous résolvons ?"
- "Qu'est-ce que les utilisateurs considéreraient comme 'incomplet' s'il manquait ?"
- "Quelles fonctionnalités créent le moment 'Aha !' dont nous avons discuté plus tôt ?"

**Critères MVP :**

- **Résout le Problème Central** : Répond efficacement au principal point de friction.
- **Valeur Utilisateur** : Crée un résultat significatif pour les utilisateurs cibles.
- **Faisable** : Réalisable avec les ressources et les délais disponibles.
- **Testable** : Permet l'apprentissage et l'itération basés sur les retours utilisateurs.

### 3. Limites Hors Périmètre

**Exploration du Hors Périmètre :**
Définissez ce qui ne sera explicitement pas dans le MVP :

- "Quelles fonctionnalités seraient agréables à avoir mais ne sont pas essentielles ?"
- "Quelle fonctionnalité pourrait attendre la version 2.0 ?"
- "À quoi disons-nous intentionnellement 'non' pour le moment ?"
- "Comment communiquons-nous ces limites aux parties prenantes ?"

**Définition des Limites :**

- Communication claire sur ce qui n'est pas inclus.
- Justification du report de certaines fonctionnalités.
- Considérations de calendrier pour les ajouts futurs.
- Explications sur les arbitrages pour les parties prenantes.

### 4. Critères de Succès du MVP

**Validation du Succès :**
Définissez ce qui rend le MVP réussi :

- "Comment saurons-nous que le MVP est un succès ?"
- "Quelles métriques indiqueront que nous devrions aller au-delà du MVP ?"
- "Quels signaux dans les retours utilisateurs valident notre approche ?"
- "Quel est le point de décision pour passer à l'échelle après le MVP ?"

**Points de Passage (Gates) du Succès :**

- Métriques d'adoption par les utilisateurs.
- Preuves de validation du problème.
- Confirmation de la faisabilité technique.
- Validation du modèle d'affaires.

### 5. Exploration de la Vision Future

**Questions sur la Vision :**
Définissez la vision produit à long terme :

- "Si c'est un succès phénoménal, que devient ce projet dans 2 ou 3 ans ?"
- "Quelles capacités ajouterions-nous avec plus de ressources ?"
- "Comment le MVP évolue-t-il vers la vision produit complète ?"
- "Vers quels marchés ou segments d'utilisateurs pourrions-nous nous étendre ?"

**Fonctionnalités Futures :**

- Améliorations post-MVP s'appuyant sur les fonctionnalités centrales.
- Considérations de mise à l'échelle et capacités de croissance.
- Opportunités d'expansion vers une plateforme ou un écosystème.
- Fonctionnalités avancées pour se différencier à long terme.

### 6. Générer le Contenu du Périmètre MVP

**Contenu à Ajouter (Append) :**
Préparez la structure suivante pour l'ajout au document :

```markdown
## Périmètre MVP

### Fonctionnalités Centrales

[Contenu des fonctionnalités centrales basé sur la conversation]

### Hors Périmètre pour le MVP

[Contenu hors périmètre basé sur la conversation, ou N/A si non discuté]

### Critères de Succès du MVP

[Contenu des critères de succès du MVP basé sur la conversation, ou N/A si non discuté]

### Vision Future

[Contenu de la vision future basé sur la conversation, ou N/A si non discuté]
```

### 7. Présenter les OPTIONS DU MENU

**Présentation du Contenu :**
"J'ai défini le périmètre MVP pour {{project_name}} qui équilibre la fourniture d'une valeur réelle avec des limites réalistes. Cela nous donne un chemin clair tout en gardant nos options ouvertes pour une croissance future.

**Voici ce que je vais ajouter au document :**
[Afficher le contenu markdown complet de l'étape 6]

**Sélectionnez une option :** [A] Élicitation Avancée [P] Mode Party [C] Continuer"

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu du périmètre actuel pour optimiser la définition du périmètre.
- SI P : Invoquez la compétence `bmad-party-mode` pour apporter différentes perspectives afin de valider le périmètre MVP.
- SI C : Enregistrez le contenu dans `{outputFile}`, mettez à jour le frontmatter avec `stepsCompleted: [1, 2, 3, 4, 5]`, puis lisez intégralement et suivez : `./step-06-complete.md`.
- SI tout autre commentaire ou question : aidez l'utilisateur à répondre puis [Réaffichez les Options du Menu](#7-presenter-les-options-du-menu).

#### RÈGLES d'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Passer à l'étape suivante UNIQUEMENT lorsque l'utilisateur sélectionne 'C'.
- Après l'exécution des autres éléments du menu, revenez à ce menu avec le contenu mis à jour.
- L'utilisateur peut discuter ou poser des questions — répondez toujours puis terminez en affichant à nouveau les options du menu.

## NOTE CRITIQUE SUR LA FIN DE L'ÉTAPE

UNIQUEMENT LORSQUE [l'option C continuer est sélectionnée] et [le périmètre MVP est finalisé et enregistré dans le document avec le frontmatter mis à jour], vous lirez alors intégralement et suivrez : `./step-06-complete.md` pour terminer le workflow du brief produit.

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC DU SYSTÈME

### ✅ SUCCÈS :

- Fonctionnalités MVP résolvant efficacement le problème central.
- Limites hors périmètre claires empêchant la dérive du projet.
- Critères de succès validant l'approche MVP et éclairant les décisions go/no-go.
- Vision future inspirante tout en maintenant le focus sur le MVP.
- Menu A/P/C présenté et géré correctement avec une exécution appropriée des tâches.
- Contenu correctement ajouté au document lorsque C est sélectionné.
- Frontmatter mis à jour avec `stepsCompleted: [1, 2, 3, 4, 5]`.

### ❌ ÉCHEC DU SYSTÈME :

- Périmètre MVP trop large ou incluant des fonctionnalités non essentielles.
- Absence de limites claires menant à une dérive du périmètre.
- Aucun critère de succès pour valider l'approche MVP.
- Vision future déconnectée des fondations du MVP.
- Ne pas présenter le menu standard A/P/C après la génération du contenu.
- Ajouter du contenu sans que l'utilisateur n'ait sélectionné 'C'.
- Ne pas mettre à jour correctement le frontmatter.

**Règle Maîtresse : Sauter des étapes, optimiser les séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.**
