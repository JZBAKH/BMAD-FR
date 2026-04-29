---
wipFile: '{implementation_artifacts}/tech-spec-wip.md'
---

# Étape 2 : Cartographier les Contraintes Techniques & Points d'Ancrage

**Progression : Étape 2 sur 4** - Suivant : Générer le Plan

## RÈGLES :

- NE PAS sauter d'étapes.
- NE PAS optimiser la séquence.
- SUIVRE les instructions exactes.
- NE PAS encore générer la spécification complète (c'est pour l'Étape 3).
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## CONTEXTE :

- Nécessite le fichier `{wipFile}` de l'Étape 1 avec l'"Énoncé du Problème" défini.
- Focus : Faire correspondre l'énoncé du problème à des points d'ancrage spécifiques dans la base de code.
- Sortie : Fichiers exacts à toucher, classes/patterns à étendre, et contraintes techniques identifiées.
- Objectif : Fournir la "vérité terrain" prête pour l'implémentation du plan.

## SÉQUENCE D'INSTRUCTIONS

### 1. Charger l'État Actuel

**Lisez `{wipFile}` et extrayez :**

- L'énoncé du problème et le périmètre de la section Aperçu (Overview).
- Tout contexte recueilli à l'Étape 1.

### 2. Exécuter le Parcours d'Investigation

**Investigation de Code Universelle :**

_Isolez l'exploration approfondie dans des sous-agents/tâches lorsque cela est possible. Ne renvoyez que des résumés distillés pour éviter l'explosion du contexte._

a) **S'appuyer sur le Scan Rapide de l'Étape 1**

Passez en revue ce qui a été trouvé lors du scan d'orientation de l'Étape 1. Puis demandez :

"D'après mon premier examen, j'ai identifié [fichiers/patterns trouvés]. Y a-t-il d'autres fichiers ou répertoires que je devrais analyser en profondeur ?"

b) **Lire et Analyser le Code**

Pour chaque fichier/répertoire fourni :

- Lisez le(s) fichier(s) complet(s).
- Identifiez les patterns, les conventions et le style de codage.
- Notez les dépendances et les imports.
- Trouvez les fichiers de test associés.

**Si AUCUN code pertinent n'est trouvé (Feuille Blanche) :**

- Identifiez le répertoire cible où la fonctionnalité devrait résider.
- Scannez les répertoires parents pour le contexte architectural.
- Identifiez les utilitaires standard du projet ou le boilerplate qui DEVRAIT être utilisé.
- Documentez cela comme "Feuille Blanche Confirmée" — en établissant qu'aucune contrainte héritée n'existe.

c) **Documenter le Contexte Technique**

Capturez et confirmez avec l'utilisateur :

- **Stack Technique** : Langages, frameworks, bibliothèques.
- **Patterns de Code** : Patterns d'architecture, conventions de nommage, structure des fichiers.
- **Fichiers à Modifier/Créer** : Fichiers spécifiques qui nécessiteront des changements ou nouveaux fichiers à créer.
- **Patterns de Test** : Comment les tests sont structurés, frameworks de test utilisés.

d) **Chercher project-context.md**

Si `**/project-context.md` existe et n'a pas été chargé à l'Étape 1 :

- Chargez-le maintenant.
- Extrayez les patterns et conventions.
- Notez toutes les règles qui doivent être suivies.

### 3. Mettre à Jour le Fichier WIP

**Mettez à jour le frontmatter de `{wipFile}` :**

```yaml
---
# ... frontmatter existant ...
stepsCompleted: [1, 2]
tech_stack: ['{captured_tech_stack}']
files_to_modify: ['{captured_files}']
code_patterns: ['{captured_patterns}']
test_patterns: ['{captured_test_patterns}']
---
```

**Mettez à jour la section Contexte pour le Développement :**

Remplissez :

- Patterns de la Base de Code (issus de l'investigation).
- Tableau des Fichiers de Référence (fichiers revus).
- Décisions Techniques (toute décision prise pendant l'investigation).

**Rapportez à l'utilisateur :**

"**Contexte Recueilli :**

- Stack Technique : {tech_stack_summary}
- Fichiers à Modifier : {files_count} fichiers identifiés
- Patterns : {patterns_summary}
- Tests : {test_patterns_summary}"

### 4. Présenter le Menu Point de Contrôle (Checkpoint)

Affichez : "**Sélectionnez :** [A] Élicitation Avancée [P] Mode Party [C] Continuer vers la Génération de la Spécification (Étape 3 sur 4)"

**ARRÊTEZ-VOUS et attendez la sélection de l'utilisateur.**

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de la tech-spec, traitez les insights améliorés, demandez à l'utilisateur "Accepter les améliorations ? (y/n)", si oui mettez à jour le fichier WIP puis réaffichez le menu, si non gardez l'original puis réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` avec le contenu actuel de la tech-spec, traitez les insights collaboratifs, demandez à l'utilisateur "Accepter les changements ? (y/n)", si oui mettez à jour le fichier WIP puis réaffichez le menu, si non gardez l'original puis réaffichez le menu.
- SI C : Vérifiez que le frontmatter est à jour avec `stepsCompleted: [1, 2]`, puis lisez complètement et suivez : `./step-03-generate.md`.
- SI Tout autre commentaire ou requête : répondez de manière utile puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Passer à l'étape suivante UNIQUEMENT lorsque l'utilisateur sélectionne 'C'.
- Après l'exécution de A ou P, revenir à ce menu.

---

## SORTIES REQUISES :

- DOIT documenter le contexte technique (stack, patterns, fichiers identifiés).
- DOIT mettre à jour `{wipFile}` avec le contexte fonctionnel.

## LISTE DE CONTRÔLE DE VALIDATION :

- [ ] Cartographie technique effectuée et documentée.
- [ ] `stepsCompleted: [1, 2]` défini dans le frontmatter.
