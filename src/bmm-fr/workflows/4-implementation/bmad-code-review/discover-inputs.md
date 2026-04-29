# Protocole de Découverte des Entrées (Discover Inputs)

**Objectif :** Charger intelligemment les fichiers du projet (entiers ou partitionnés/sharded) en fonction de la configuration des fichiers d'entrée du workflow.

**Prérequis :** N'exécutez ce protocole que si le workflow définit une section "Input Files". Si aucun modèle de fichier d'entrée n'est configuré, ignorez complètement cette étape.

---

## Étape 1 : Analyser les Modèles de Fichiers d'Entrée

- Lire le tableau des fichiers d'entrée à partir de la configuration du workflow.
- Pour chaque groupe d'entrée (prd, architecture, epics, ux, etc.), noter la **stratégie de chargement** si elle est spécifiée.

## Étape 2 : Charger les Fichiers en Utilisant des Stratégies Intelligentes

Pour chaque modèle dans le tableau des fichiers d'entrée, suivez les sous-étapes suivantes dans l'ordre :

### 2a : Essayer d'abord les Documents Partitionnés (Sharded)

Si un modèle partitionné existe pour cette entrée, déterminer la stratégie de chargement (par défaut **FULL_LOAD** si non spécifiée), puis appliquer la stratégie correspondante :

#### Stratégie FULL_LOAD

Charger TOUS les fichiers dans le répertoire partitionné. Utilisez cette option pour le PRD, l'Architecture, l'UX, les documents existants (brownfield), ou chaque fois qu'une vue d'ensemble complète est nécessaire.

1. Utiliser le modèle glob pour trouver TOUS les fichiers `.md` (ex : `{planning_artifacts}/*architecture*/*.md`).
2. Charger ENTIÈREMENT chaque fichier correspondant.
3. Concaténer le contenu dans un ordre logique : `index.md` en premier s'il existe, puis par ordre alphabétique.
4. Stocker le résultat combiné dans une variable nommée `{pattern_name_content}` (ex : `{architecture_content}`).

#### Stratégie SELECTIVE_LOAD

Charger un fragment (shard) spécifique en utilisant une variable de modèle. Exemple : utilisé pour les epics avec `{{epic_num}}`.

1. Vérifier la présence de variables de modèle dans le motif partitionné (ex : `{{epic_num}}`).
2. Si la variable est indéfinie, demander la valeur à l'utilisateur OU la déduire du contexte.
3. Résoudre le modèle vers un chemin de fichier spécifique.
4. Charger ce fichier spécifique.
5. Stocker dans la variable : `{pattern_name_content}`.

#### Stratégie INDEX_GUIDED

Charger `index.md`, analyser la structure et la description de chaque document dans l'index, puis charger intelligemment les documents pertinents.

**NE SOYEZ PAS PARESSEUX** -- utilisez votre meilleur jugement pour charger des documents qui pourraient contenir des informations pertinentes, même s'il n'y a que 5 % de chances.

1. Charger `index.md` à partir du répertoire partitionné.
2. Analyser la table des matières, les liens et les en-têtes de section.
3. Analyser le but et l'objectif du workflow.
4. Identifier quels documents liés/référencés sont probablement pertinents.
   - *Exemple :* Si le workflow concerne l'authentification et que l'index affiche "Aperçu de l'Auth", "Configuration des Paiements", "Déploiement" -- chargez les documents d'authentification, considérez les documents de déploiement, ignorez les paiements.
5. Charger tous les documents identifiés comme pertinents.
6. Stocker le contenu combiné dans la variable : `{pattern_name_content}`.

**En cas de doute, CHARGEZ-LE** -- le contexte est précieux, et il vaut mieux être exhaustif que de manquer une information critique.

---

After applying the matching strategy, mark the pattern as **RESOLVED** and move to the next pattern.

### 2b : Essayer le Document Entier si Aucun Partitionné n'est Trouvé

Si aucune correspondance partitionnée n'a été trouvée OU si aucun modèle partitionné n'existe pour cette entrée :

1. Tenter une correspondance glob sur le modèle "entier" (ex : `{planning_artifacts}/*prd*.md`).
2. Si des correspondances sont trouvées, charger ENTIÈREMENT TOUS les fichiers correspondants (sans offset ni limite).
3. Stocker le contenu dans la variable : `{pattern_name_content}` (ex : `{prd_content}`).
4. Marquer le modèle comme **RÉSOLU** et passer au modèle suivant.

### 2c : Gérer les Cas de Non-Correspondance

Si aucune correspondance n'a été trouvée pour les modèles partitionnés ou entiers :

1. Définir `{pattern_name_content}` comme une chaîne vide.
2. Noter dans la session : "Aucun fichier {pattern_name} trouvé" -- ce n'est pas une erreur, juste une indisponibilité. Offrir à l'utilisateur la possibilité de fournir le fichier.

## Étape 3 : Rapporter les Résultats de la Découverte

Lister toutes les variables de contenu chargées avec le nombre de fichiers. Exemple :

```
OK Chargé {prd_content} à partir de 5 fichiers partitionnés : prd/index.md, prd/requirements.md, ...
OK Chargé {architecture_content} à partir de 1 fichier : Architecture.md
OK Chargé {epics_content} via chargement sélectif : epics/epic-3.md
-- Aucun fichier ux_design trouvé
```

Cela donne au workflow une transparence sur le contexte disponible.
