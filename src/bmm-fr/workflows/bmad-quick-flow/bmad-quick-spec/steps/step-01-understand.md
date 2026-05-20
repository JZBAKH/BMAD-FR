---
wipFile: '{implementation_artifacts}/tech-spec-wip.md'
---

# Étape 1 : Analyser le Delta des Exigences

**Progression : Étape 1 sur 4** - Suivant : Investigation Approfondie

## RÈGLES :

- NE PAS sauter d'étapes.
- NE PAS optimiser la séquence.
- SUIVRE les instructions exactes.
- NE PAS anticiper les étapes futures.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## CONTEXTE :

- Les variables de `workflow.md` sont disponibles en mémoire.
- Focus : Définir le delta des exigences techniques et le périmètre (scope).
- Investigation : Effectuer des scans de code de surface UNIQUEMENT pour vérifier le delta. Réserver les analyses approfondies des conséquences d'implémentation pour l'Étape 2.
- Objectif : Établir un delta vérifiable entre l'état actuel et l'état cible.

## SÉQUENCE D'INSTRUCTIONS

### 0. Vérifier le Travail en Cours (WIP)

a) **Avant toute chose, vérifiez si `{wipFile}` existe :**

b) **SI LE FICHIER WIP EXISTE :**

1. Lisez le frontmatter et extrayez : `title`, `slug`, `stepsCompleted`.
2. Calculez la progression : `lastStep = max(stepsCompleted)`.
3. Présentez à l'utilisateur :

```
Salut {user_name} ! J'ai trouvé une tech-spec en cours :

**{title}** - Étape {lastStep} sur 4 terminée

Est-ce ce que vous souhaitez continuer ?

[Y] Oui, reprendre là où je m'étais arrêté
[N] Non, l'archiver et commencer quelque chose de nouveau
```

4. **ARRÊTEZ-VOUS et attendez la sélection de l'utilisateur.**

a) **Gestion du Menu :**

- **[Y] Continuer l'existant :**
  - Sautez directement à l'étape appropriée basée sur `stepsCompleted` :
    - `[1]` → Lire complètement et suivre : `./step-02-investigate.md` (Étape 2)
    - `[1, 2]` → Lire complètement et suivre : `./step-03-generate.md` (Étape 3)
    - `[1, 2, 3]` → Lire complètement et suivre : `./step-04-review.md` (Étape 4)
- **[N] Archiver et repartir de zéro :**
  - Renommez `{wipFile}` en `{implementation_artifacts}/tech-spec-{slug}-archived-{date}.md`

### 1. Saluer et Demander la Requête Initiale

a) **Saluez brièvement l'utilisateur :**

"Salut {user_name} ! Qu'est-ce qu'on construit aujourd'hui ?"

b) **Obtenez sa description initiale.** Ne posez pas encore de questions détaillées — comprenez juste assez pour savoir où regarder.

### 2. Scan d'Orientation Rapide

a) **Avant de poser des questions détaillées, faites un scan rapide pour comprendre le paysage :**

b) **Vérifiez les documents de contexte existants :**

- Vérifiez `{implementation_artifacts}` et `{planning_artifacts}` pour les documents de planification (PRD, architecture, epics, recherche).
- Cherchez `**/project-context.md` — s'il existe, survolez les patterns et conventions.
- Cherchez toute story ou spécification existante liée à la requête de l'utilisateur.

c) **Si l'utilisateur a mentionné du code ou des fonctionnalités spécifiques, faites un scan rapide :**

- Recherchez les fichiers/classes/fonctions appropriés qu'il a mentionnés.
- Survolez la structure (ne plongez pas encore en profondeur — c'est pour l'Étape 2).
- Notez : la stack technique, les patterns évidents, l'emplacement des fichiers.

d) **Construisez un modèle mental :**

- Quel est le paysage probable pour cette fonctionnalité ?
- Quel est le périmètre probable basé sur ce que vous avez trouvé ?
- Quelles questions avez-vous MAINTENANT, éclairées par le code ?

**Ce scan devrait prendre moins de 30 secondes. Juste assez pour poser des questions intelligentes.**

### 3. Poser des Questions Éclairées

a) **Maintenant, posez des questions de clarification — mais faites-les ÉCLAIRÉES par ce que vous avez trouvé :**

Au lieu de questions génériques comme "Quel est le périmètre ?", posez des questions spécifiques comme :

- "Le `AuthService` gère la validation dans le contrôleur — la nouvelle donnée doit-elle suivre ce pattern ou être déplacée vers un validateur dédié ?"
- "Le composant `NavigationSidebar` utilise un état local pour le bouton 'réduire' — devons-nous rester sur cette approche ou passer par le store global ?"
- "Le document sur les epics mentionne X — est-ce lié ?"

**Adaptez-vous au `{user_skill_level}`.** Les utilisateurs techniques veulent des questions techniques. Les utilisateurs non techniques ont besoin de traduction.

b) **Si aucun code existant n'est trouvé :**

- Posez des questions sur l'architecture, les patterns et les contraintes prévus.
- Demandez quels systèmes similaires ils aimeraient émuler.

### 4. Capturer la Compréhension Centrale

a) **À partir de la conversation, extrayez et confirmez :**

- **Titre (Title)** : Un nom clair et concis pour ce travail.
- **Slug** : Version du titre compatible URL (minuscules, tirets, pas d'espaces).
- **Énoncé du Problème** : Quel problème résolvons-nous ?
- **Solution** : Approche de haut niveau (1-2 phrases).
- **Dans le périmètre (In Scope)** : Ce qui est inclus.
- **Hors périmètre (Out of Scope)** : Ce qui est explicitement EXCLU.

b) **Demandez à l'utilisateur de confirmer la compréhension capturée avant de continuer.**

### 5. Initialiser le Fichier WIP

a) **Créez le fichier tech-spec WIP :**

1. Copiez le modèle depuis `../tech-spec-template.md`.
2. Écrivez dans `{wipFile}`.
3. Mettez à jour le frontmatter avec les valeurs capturées :
   ```yaml
   ---
   title: '{title}'
   slug: '{slug}'
   created: '{date}'
   status: 'en-cours'
   stepsCompleted: [1]
   tech_stack: []
   files_to_modify: []
   code_patterns: []
   test_patterns: []
   ---
   ```
4. Remplissez la section Aperçu (Overview) avec l'Énoncé du Problème, la Solution et le Périmètre.
5. Remplissez la section Contexte pour le Développement avec toute préférence technique ou contrainte recueillie lors de la découverte éclairée.
6. Enregistrez le fichier.

b) **Rapportez à l'utilisateur :**

"Créé : `{wipFile}`

**Capturé :**

- Titre : {title}
- Problème : {problem_statement_summary}
- Périmètre : {scope_summary}"

### 6. Présenter le Menu Point de Contrôle (Checkpoint)

a) **Affichez le menu :**

Affichez : "**Sélectionnez :** [A] Élicitation Avancée [P] Mode Party [C] Continuer vers l'Investigation Approfondie (Étape 2 sur 4)"

b) **ARRÊTEZ-VOUS et attendez la sélection de l'utilisateur.**

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de la tech-spec, traitez les insights améliorés, demandez à l'utilisateur "Accepter les améliorations ? (y/n)", si oui mettez à jour le fichier WIP puis réaffichez le menu, si non gardez l'original puis réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` avec le contenu actuel de la tech-spec, traitez les insights collaboratifs, demandez à l'utilisateur "Accepter les changements ? (y/n)", si oui mettez à jour le fichier WIP puis réaffichez le menu, si non gardez l'original puis réaffichez le menu.
- SI C : Vérifiez que `{wipFile}` a `stepsCompleted: [1]`, puis lisez complètement et suivez : `./step-02-investigate.md`.
- SI Tout autre commentaire ou requête : répondez de manière utile puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Passer à l'étape suivante UNIQUEMENT lorsque l'utilisateur sélectionne 'C'.
- Après l'exécution de A ou P, revenir à ce menu.

---

## SORTIES REQUISES :

- DOIT initialiser le fichier WIP avec les métadonnées capturées.

## LISTE DE CONTRÔLE DE VALIDATION :

- [ ] Vérification du WIP effectuée en PREMIER avant toute salutation.
- [ ] `{wipFile}` créé avec le bon frontmatter, Aperçu, Contexte pour le Développement, et `stepsCompleted: [1]`.
- [ ] Utilisateur a sélectionné [C] pour continuer.
