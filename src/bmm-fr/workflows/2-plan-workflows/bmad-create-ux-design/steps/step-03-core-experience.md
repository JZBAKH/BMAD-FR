# Étape 3 : Définition de l'Expérience de Base

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur la définition de l'expérience utilisateur de base et de la plateforme.
- 🎯 Découverte COLLABORATIVE, pas un design basé sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu de l'expérience de base.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights d'expérience plus profonds.
- **P (Mode Party)** : Apporter plusieurs perspectives pour définir l'expérience utilisateur optimale.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- La compréhension du projet issue de l'étape 2 alimente cette étape.
- Aucun fichier de données supplémentaire n'est nécessaire pour cette étape.
- Focus sur l'expérience de base et les décisions de plateforme.

## VOTRE TÂCHE :

Définir l'expérience utilisateur de base, les exigences de la plateforme et ce qui rend l'interaction sans effort.

## SÉQUENCE DE DÉCOUVERTE DE L'EXPÉRIENCE DE BASE :

### 1. Définir l'action utilisateur centrale

Commencez par identifier l'interaction la plus importante pour l'utilisateur :
"Creusons maintenant au cœur de l'expérience utilisateur pour {{project_name}}.

**Questions sur l'expérience de base :**

- Quelle est la SEULE chose que les utilisateurs feront le plus fréquemment ?
- Quelle action utilisateur est absolument critique à réussir ?
- Qu'est-ce qui devrait être totalement fluide (effortless) pour les utilisateurs ?
- Si nous réussissons une seule interaction, tout le reste suit - laquelle est-ce ?"

Pensez à la boucle principale ou à l'action primaire qui définit la valeur de votre produit."

### 2. Explorer les exigences de la plateforme

Déterminez où et comment les utilisateurs interagiront :
"Définissons le contexte de la plateforme pour {{project_name}} :

**Questions sur la plateforme :**

- Web, application mobile, bureau ou plusieurs plateformes ?
- S'agira-t-il principalement d'une interface tactile ou souris/clavier ?
- Des exigences ou contraintes spécifiques à la plateforme ?
- Devons-nous envisager une fonctionnalité hors ligne ?
- Des capacités spécifiques aux appareils que nous devrions exploiter ?"

### 3. Identifier les interactions fluides (Effortless)

Faites ressortir ce qui devrait sembler magique ou totalement fluide :
"**Conception d'une expérience fluide (Effortless Experience) :**

- Quelles actions utilisateur devraient sembler tout à fait naturelles et ne nécessiter aucune réflexion ?
- Où les utilisateurs rencontrent-ils actuellement des difficultés avec des produits similaires ?
- Quelle interaction, si elle était rendue fluide, créerait de l'enchantement ?
- Qu'est-ce qui devrait se produire automatiquement sans intervention de l'utilisateur ?
- Où pouvons-nous éliminer des étapes que les concurrents imposent ?"

### 4. Définir les moments critiques de succès

Identifiez les moments qui déterminent le succès ou l'échec :
"**Moments critiques de succès :**

- Quel est le moment où les utilisateurs se disent 'ça, c'est mieux' ?
- Quand l'utilisateur se sent-il victorieux ou accompli ?
- Quelle interaction, en cas d'échec, ruinerait l'expérience ?
- Quels sont les flux utilisateurs déterminants (make-or-break) ?
- Où se produit le succès de l'utilisateur lors de sa première utilisation ?"

### 5. Synthétiser les principes d'expérience

Extrayez les principes directeurs de la conversation :
"Sur la base de notre discussion, j'identifie ces principes d'expérience de base pour {{project_name}} :

**Principes d'Expérience :**

- [Principe 1 basé sur l'action centrale]
- [Principe 2 basé sur les interactions fluides]
- [Principe 3 basé sur les considérations de plateforme]
- [Principe 4 basé sur les moments critiques de succès]

Ces principes guideront toutes nos décisions UX. Est-ce que cela capture l'essentiel ?"

### 6. Générer le contenu de l'expérience de base

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Expérience Utilisateur de Base

### Définition de l'Expérience

[Définition de l'expérience de base selon la conversation]

### Stratégie de Plateforme

[Exigences et décisions de plateforme selon la conversation]

### Interactions Fluides (Effortless)

[Domaines d'interactions fluides identifiés selon la conversation]

### Moments Critiques de Succès

[Moments critiques de succès définis selon la conversation]

### Principes d'Expérience

[Principes directeurs pour les décisions UX selon la conversation]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour l'expérience de base et présentez les choix :
"J'ai défini l'expérience utilisateur de base pour {{project_name}} à partir de notre discussion. Cela établit les fondations de toutes nos décisions de design UX.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Affinons la définition de l'expérience de base
[P] Mode Party - Apporter différentes perspectives sur l'expérience utilisateur
[C] Continuer - Enregistrer cela dans le document et passer à la définition de la réponse émotionnelle"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de l'expérience de base.
- Traitez les insights enrichis qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations de la définition de l'expérience de base ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec la définition actuelle de l'expérience de base.
- Traitez les améliorations collaboratives qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements de la définition de l'expérience de base ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Chargez `./step-04-emotional-response.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Action utilisateur centrale clairement identifiée et définie.
✅ Exigences de la plateforme explorées en profondeur.
✅ Domaines d'interactions fluides identifiés.
✅ Moments critiques de succès cartographiés.
✅ Principes d'expérience établis comme cadre directeur.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Manquer l'action utilisateur centrale qui définit le produit.
❌ Ne pas considérer correctement les exigences de la plateforme.
❌ Négliger ce qui devrait être fluide pour les utilisateurs.
❌ Ne pas identifier les interactions critiques déterminantes.
❌ Principes d'expérience trop génériques ou non activables.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-04-emotional-response.md` pour définir les réponses émotionnelles souhaitées.

Rappel : Ne passez PAS à l'étape 04 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
