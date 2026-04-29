# Étape 5 : Analyse des Modèles UX et Inspiration

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur l'analyse des modèles (patterns) UX existants et l'extraction de l'inspiration.
- 🎯 Découverte COLLABORATIVE, pas un design basé sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu de l'analyse d'inspiration.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights plus profonds sur les modèles.
- **P (Mode Party)** : Apporter plusieurs perspectives pour analyser les modèles UX.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- Les objectifs de réponse émotionnelle de l'étape 4 alimentent l'analyse des modèles.
- Aucun fichier de données supplémentaire n'est nécessaire pour cette étape.
- Focus sur l'analyse des modèles UX existants et l'extraction de leçons.

## VOTRE TÂCHE :

Analyser les produits inspirants et les modèles UX pour éclairer les décisions de design du projet actuel.

## SÉQUENCE D'ANALYSE DE L'INSPIRATION :

### 1. Identifier les applications préférées de l'utilisateur

Commencez par rassembler les sources d'inspiration :
"Apprenons des produits que vos utilisateurs aiment déjà et utilisent régulièrement.

**Questions sur l'inspiration :**

- Citez 2-3 applications que vos utilisateurs cibles aiment déjà et UTILISENT fréquemment.
- Pour chacune, que font-elles bien d'un point de vue UX ?
- Qu'est-ce qui rend l'expérience captivante ou enchantée ?
- Qu'est-ce qui fait que les utilisateurs reviennent sur ces applications ?

Pensez à des applications de votre secteur ou même à des produits non liés qui offrent une excellente UX."

### 2. Analyser les modèles (patterns) et principes UX

Décomposez ce qui fait le succès de ces applications :
"Pour chaque application inspirante, analysons son succès UX :

**Pour [Nom de l'App] :**

- Quel problème central résout-elle avec élégance ?
- Qu'est-ce qui rend l'expérience d'onboarding efficace ?
- Comment gèrent-elles la navigation et la hiérarchie de l'information ?
- Quelles sont leurs interactions les plus innovantes ou les plus plaisantes ?
- Quels choix de design visuel soutiennent l'expérience utilisateur ?
- Comment gèrent-elles les erreurs ou les cas particuliers ?"

### 3. Extraire les modèles transférables

Identifiez les modèles qui pourraient s'appliquer à votre projet :
"**Modèles UX transférables :**
En examinant ces applications inspirantes, j'identifie des modèles que nous pourrions adapter :

**Modèles de Navigation :**
- [Modèle 1] - pourrait fonctionner pour votre [cas d'utilisation spécifique]
- [Modèle 2] - pourrait résoudre votre [défi spécifique]

**Modèles d'Interaction :**
- [Modèle 1] - excellent pour [votre objectif utilisateur]
- [Modèle 2] - répond à [votre point de douleur utilisateur]

**Modèles Visuels :**
- [Modèle 1] - soutient votre [objectif émotionnel]
- [Modèle 2] - s'aligne sur vos [exigences de plateforme]

Lesquels de ces modèles résonnent le plus pour votre produit ?"

### 4. Identifier les anti-modèles à éviter

Faites ressortir ce qu'il ne faut pas faire d'après l'analyse :
"**Anti-modèles UX à éviter :**
D'après l'analyse des succès et des échecs dans votre domaine, voici des modèles à éviter :

- [Anti-modèle 1] - les utilisateurs trouvent cela confus/frustrant.
- [Anti-modèle 2] - cela crée une friction inutile.
- [Anti-modèle 3] - ne s'aligne pas sur vos [objectifs émotionnels].

Apprendre des erreurs des autres est aussi important que d'apprendre de leurs succès."

### 5. Définir la stratégie d'inspiration de design

Créez une stratégie claire pour utiliser cette inspiration :
"**Stratégie d'inspiration de design :**

**À adopter :**
- [Modèle spécifique] - car il soutient [votre expérience de base].
- [Modèle spécifique] - car il s'aligne sur [les besoins des utilisateurs].

**À adapter :**
- [Modèle spécifique] - à modifier pour [vos exigences uniques].
- [Modèle spécifique] - à simplifier pour [le niveau de compétence de vos utilisateurs].

**À éviter :**
- [Anti-modèle spécifique] - entre en conflit avec [vos objectifs].
- [Anti-modèle spécifique] - ne convient pas à [votre plateforme].

Cette stratégie guidera nos décisions de design tout en gardant {{project_name}} unique."

### 6. Générer le contenu de l'analyse d'inspiration

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Analyse des Modèles UX et Inspiration

### Analyse des Produits Inspirants
[Analyse des produits inspirants selon la conversation]

### Modèles UX Transférables
[Modèles transférables identifiés selon la conversation]

### Anti-Modèles à Éviter
[Anti-modèles à éviter selon la conversation]

### Stratégie d'Inspiration de Design
[Stratégie d'utilisation de l'inspiration selon la conversation]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour l'analyse d'inspiration et présentez les choix :
"J'ai analysé les modèles UX et les produits inspirants pour éclairer notre stratégie de design pour {{project_name}}. Cela nous donne une base solide de modèles éprouvés sur lesquels construire.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Approfondissons notre analyse des modèles UX
[P] Mode Party - Apporter différentes perspectives sur les sources d'inspiration
[C] Continuer - Enregistrer cela dans le document et passer au choix du système de design"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de l'analyse d'inspiration.
- Traitez les insights enrichis sur les modèles qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations de l'analyse d'inspiration ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec l'analyse d'inspiration actuelle.
- Traitez les insights collaboratifs sur les modèles qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements de l'analyse d'inspiration ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Lisez complètement et suivez : `./step-06-design-system.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Produits inspirants identifiés et analysés minutieusement.
✅ Modèles UX extraits et catégorisés efficacement.
✅ Modèles transférables identifiés pour le projet actuel.
✅ Anti-modèles identifiés pour éviter les erreurs courantes.
✅ Stratégie claire d'inspiration de design établie.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Ne pas obtenir d'exemples spécifiques de produits inspirants.
❌ Analyse superficielle sans extraction profonde de modèles.
❌ Manquer des occasions d'adaptation de modèles.
❌ Ne pas identifier d'anti-modèles pertinents à éviter.
❌ Stratégie trop générique ou non activable.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-06-design-system.md` pour choisir l'approche appropriée du système de design.

Rappel : Ne passez PAS à l'étape 06 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
