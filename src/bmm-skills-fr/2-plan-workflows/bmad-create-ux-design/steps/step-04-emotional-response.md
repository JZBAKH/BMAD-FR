# Étape 4 : Réponse Émotionnelle Souhaitée

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur la définition des réponses émotionnelles et des sentiments des utilisateurs souhaités.
- 🎯 Découverte COLLABORATIVE, pas un design basé sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu de la réponse émotionnelle.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights émotionnels plus profonds.
- **P (Mode Party)** : Apporter plusieurs perspectives pour définir les réponses émotionnelles optimales.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- La définition de l'expérience de base de l'étape 3 alimente cette réponse émotionnelle.
- Aucun fichier de données supplémentaire n'est nécessaire pour cette étape.
- Focus sur les sentiments de l'utilisateur et les objectifs de design émotionnel.

## VOTRE TÂCHE :

Définir les réponses émotionnelles souhaitées que les utilisateurs devraient ressentir en utilisant le produit.

## SÉQUENCE DE DÉCOUVERTE DE LA RÉPONSE ÉMOTIONNELLE :

### 1. Explorer les objectifs émotionnels centraux

Commencez par comprendre les objectifs émotionnels :
"Réfléchissons maintenant à la façon dont {{project_name}} devrait faire se sentir les utilisateurs.

**Questions sur la réponse émotionnelle :**

- Que devraient RESSENTIR les utilisateurs en utilisant ce produit ?
- Quelle émotion les pousserait à en parler à un ami ?
- Comment les utilisateurs devraient-ils se sentir après avoir atteint leur objectif principal ?
- Quel sentiment différencie ceci de la concurrence ?"

Objectifs émotionnels courants : Autonome et en contrôle ? Enchanté et surpris ? Efficace et productif ? Créatif et inspiré ? Calme et concentré ? Connecté et engagé ?"

### 2. Cartographie du parcours émotionnel

Explorez les sentiments à différentes étapes :
"**Considérations sur le parcours émotionnel :**

- Comment les utilisateurs devraient-ils se sentir lorsqu'ils découvrent le produit pour la première fois ?
- Quelle émotion pendant l'expérience/action de base ?
- Comment devraient-ils se sentir après avoir terminé leur tâche ?
- Et si quelque chose tourne mal - quelle réponse émotionnelle souhaitons-nous ?
- Comment devraient-ils se sentir en revenant l'utiliser à nouveau ?"

### 3. Définir les micro-émotions

Faites ressortir des états émotionnels subtils mais importants :
"**Micro-émotions à considérer :**

- Confiance vs Confusion
- Confiance vs Scepticisme
- Excitation vs Anxiété
- Accomplissement vs Frustration
- Enchantement vs Satisfaction
- Appartenance vs Isolation

Lesquels de ces états émotionnels sont les plus critiques pour le succès de votre produit ?"

### 4. Connecter les émotions aux décisions UX

Liez les sentiments aux implications de design :
"**Implications de design :**

- Si nous voulons que les utilisateurs ressentent [état émotionnel], quels choix UX soutiennent cela ?
- Quelles interactions pourraient créer des émotions négatives que nous voulons éviter ?
- Où pouvons-nous ajouter des moments d'enchantement ou de surprise ?
- Comment instaurer la confiance et la sérénité par le design ?

**Connexions Emotion-Design :**

- [Émotion 1] → [Approche de design UX]
- [Émotion 2] → [Approche de design UX]
- [Émotion 3] → [Approche de design UX]"

### 5. Valider les objectifs émotionnels

Vérifiez si les objectifs émotionnels s'alignent avec la vision du produit :
"Laissez-moi m'assurer que je comprends bien la vision émotionnelle de {{project_name}} :

**Objectif émotionnel principal :** [Résumé de la réponse émotionnelle principale]
**Sentiments secondaires :** [Liste des états émotionnels de soutien]
**Émotions à éviter :** [Liste des émotions négatives à prévenir]

Est-ce que cela capture bien l'expérience émotionnelle que vous souhaitez créer ? Des ajustements ?"

### 6. Générer le contenu de réponse émotionnelle

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Réponse Émotionnelle Souhaitée

### Objectifs Émotionnels Principaux
[Objectifs émotionnels principaux selon la conversation]

### Cartographie du Parcours Émotionnel
[Cartographie du parcours émotionnel selon la conversation]

### Micro-Émotions
[Micro-émotions identifiées selon la conversation]

### Implications de Design
[Implications de design UX pour les réponses émotionnelles selon la conversation]

### Principes de Design Émotionnel
[Principes directeurs pour le design émotionnel selon la conversation]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour la réponse émotionnelle et présentez les choix :
"J'ai défini les réponses émotionnelles souhaitées pour {{project_name}}. Ces objectifs émotionnels guideront nos décisions de design pour créer la bonne expérience utilisateur.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Affinons la définition de la réponse émotionnelle
[P] Mode Party - Apporter différentes perspectives sur les besoins émotionnels des utilisateurs
[C] Continuer - Enregistrer cela dans le document et passer à l'analyse de l'inspiration"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de la réponse émotionnelle.
- Traitez les insights enrichis qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations de la définition de la réponse émotionnelle ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec la définition actuelle de la réponse émotionnelle.
- Traitez les insights collaboratifs qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements de la définition de la réponse émotionnelle ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Chargez `./step-05-inspiration.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Objectifs émotionnels principaux clairement définis.
✅ Parcours émotionnel cartographié sur l'ensemble de l'expérience utilisateur.
✅ Micro-émotions identifiées et prises en compte.
✅ Implications de design liées aux réponses émotionnelles.
✅ Principes de design émotionnel établis.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Manquer les objectifs émotionnels centraux ou être trop générique.
❌ Ne pas considérer le parcours émotionnel à travers les différentes étapes.
❌ Négliger les micro-émotions qui impactent la satisfaction utilisateur.
❌ Ne pas lier les objectifs émotionnels à des choix de design UX spécifiques.
❌ Principes émotionnels trop vagues ou non activables.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-05-inspiration.md` pour analyser les modèles UX des produits inspirants.

Rappel : Ne passez PAS à l'étape 05 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
