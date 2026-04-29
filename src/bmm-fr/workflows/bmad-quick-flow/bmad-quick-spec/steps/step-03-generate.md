---
wipFile: '{implementation_artifacts}/tech-spec-wip.md'
---

# Étape 3 : Générer le Plan d'Implémentation

**Progression : Étape 3 sur 4** - Suivant : Revue & Finalisation

## RÈGLES :

- NE PAS sauter d'étapes.
- NE PAS optimiser la séquence.
- SUIVRE les instructions exactes.
- NE PAS implémenter quoi que ce soit — seulement documenter.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## CONTEXTE :

- Nécessite le fichier `{wipFile}` avec les sections "Aperçu" (Overview) et "Contexte pour le Développement" définies.
- Focus : Créer la séquence d'implémentation qui adresse le delta des exigences en utilisant le contexte technique capturé.
- Sortie : Tâches prêtes pour l'implémentation avec fichiers spécifiques et instructions.
- Cible : Atteindre le standard **READY FOR DEVELOPMENT** défini dans `workflow.md`.

## SÉQUENCE D'INSTRUCTIONS

### 1. Charger l'État Actuel

**Lisez `{wipFile}` complètement et extrayez :**

- Toutes les valeurs du frontmatter.
- La section Aperçu (Problème, Solution, Périmètre).
- La section Contexte pour le Développement (Patterns, Fichiers, Décisions).

### 2. Générer le Plan d'Implémentation

Générez des tâches d'implémentation spécifiques :

a) **Décomposition des Tâches**

- Chaque tâche doit être une unité de travail discrète et finalisable.
- Les tâches doivent être ordonnées logiquement (dépendances en premier).
- Incluez les fichiers spécifiques à modifier dans chaque tâche.
- Soyez explicite sur les changements à effectuer.

b) **Format des Tâches**

```markdown
- [ ] Tâche N : Description claire de l'action
  - Fichier : `chemin/vers/fichier.ext`
  - Action : Changement spécifique à effectuer
  - Notes : Tous détails d'implémentation
```

### 3. Générer les Critères d'Acceptation (AC)

**Créez des critères d'acceptation testables :**

Chaque AC doit suivre le format Étant donné que / Quand / Alors (Given/When/Then) :

```markdown
- [ ] AC N : Étant donné [précondition], quand [action], alors [résultat attendu]
```

**S'assurer que les AC couvrent :**

- La fonctionnalité du chemin nominal (happy path).
- La gestion des erreurs.
- Les cas limites (si pertinent).
- Les points d'intégration (si pertinent).

### 4. Compléter le Contexte Additionnel

**Remplissez les sections restantes :**

a) **Dépendances**

- Bibliothèques ou services externes nécessaires.
- Autres tâches ou fonctionnalités dont celle-ci dépend.
- Dépendances d'API ou de données.

b) **Stratégie de Test**

- Tests unitaires nécessaires.
- Tests d'intégration nécessaires.
- Étapes de test manuel.

c) **Notes**

- Éléments à haut risque issus d'une analyse pré-mortem.
- Limitations connues.
- Considérations futures (hors périmètre mais valant d'être notées).

### 5. Rédiger la Spécification Complète

a) **Mettez à jour `{wipFile}` avec tout le contenu généré :**

- Assurez-vous que toutes les sections du modèle sont remplies.
- Aucun texte de remplacement (placeholders) ne doit rester.
- Toutes les valeurs du frontmatter sont à jour.
- Mettez à jour le statut à 'review' (PAS encore 'ready-for-dev' — cela arrive après la revue utilisateur à l'Étape 4).

b) **Mettez à jour le frontmatter :**

```yaml
---
# ... valeurs existantes ...
status: 'review'
stepsCompleted: [1, 2, 3]
---
```

c) **Lisez complètement et suivez : `./step-04-review.md` (Étape 4)**

## SORTIES REQUISES :

- Les tâches DOIVENT être spécifiques, exploitables, ordonnées logiquement, avec les fichiers à modifier.
- Les AC DOIVENT être testables, utilisant le format Étant donné que / Quand / Alors.
- Le statut DOIT être mis à jour à 'review'.

## LISTE DE CONTRÔLE DE VALIDATION :

- [ ] `stepsCompleted: [1, 2, 3]` défini dans le frontmatter.
- [ ] La spécification répond au standard **READY FOR DEVELOPMENT**.
