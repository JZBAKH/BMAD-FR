---
---

# Étape 2 : Collecte de Contexte (Mode Direct)

**Objectif :** Recueillir rapidement le contexte pour les instructions directes — fichiers, patterns, dépendances.

**Note :** Cette étape ne s'exécute que pour le Mode B (instructions directes). Si `{execution_mode}` est "tech-spec", cette étape a été sautée.

---

## ÉTAT DISPONIBLE

Depuis l'étape 01 :

- `{baseline_commit}` - Git HEAD au début du workflow.
- `{execution_mode}` - Doit être "direct".
- `{project_context}` - Chargé s'il existe.

---

## SÉQUENCE D'EXÉCUTION

### 1. Identifier les Fichiers à Modifier

Basé sur les instructions directes de l'utilisateur :

- Recherchez les fichiers pertinents en utilisant glob/grep.
- Identifiez les fichiers spécifiques qui nécessitent des changements.
- Notez l'emplacement et le rôle de chaque fichier.

### 2. Trouver les Patterns Pertinents

Examinez les fichiers identifiés et leur environnement :

- Style de code et conventions utilisés.
- Patterns existants pour une fonctionnalité similaire.
- Patterns d'import/export.
- Approches de gestion d'erreurs.
- Patterns de test (si des tests existent à proximité).

### 3. Noter les Dépendances

Identifiez :

- Bibliothèques externes utilisées.
- Dépendances de modules internes.
- Fichiers de configuration qui pourraient nécessiter des mises à jour.
- Fichiers liés qui pourraient être affectés.

### 4. Créer un Plan Mental

Synthétisez le contexte recueilli en :

- Une liste de tâches à accomplir.
- Des critères d'acceptation (déduits de la requête utilisateur).
- Un ordre des opérations.
- Les fichiers à toucher.

---

## PRÉSENTER LE PLAN

Affichez à l'utilisateur :

```
**Contexte Recueilli :**

**Fichiers à modifier :**
- {liste des fichiers}

**Patterns identifiés :**
- {patterns clés}

**Plan :**
1. {tâche 1}
2. {tâche 2}
...

**AC Déduits :**
- {critères d'acceptation}

Prêt à exécuter ? (y/n/ajuster)
```

- **y :** Passer à l'exécution.
- **n :** Recueillir plus de contexte ou clarifier.
- **ajuster :** Modifier le plan en fonction des retours.

---

## DIRECTIVE ÉTAPE SUIVANTE

**CRITIQUE :** Lorsque l'utilisateur confirme qu'il est prêt, indiquez explicitement :

- **y :** "**SUIVANT :** Lire complètement et suivre : `./step-03-execute.md`"
- **n/ajuster :** Continuer à recueillir le contexte, puis re-présenter le plan.

---

## MÉTRIQUES DE RÉUSSITE

- Fichiers à modifier identifiés.
- Patterns pertinents documentés.
- Dépendances notées.
- Plan mental créé avec tâches et AC.
- L'utilisateur a confirmé être prêt à continuer.

## MODES D'ÉCHEC

- Exécuter cette étape en Mode A (tech-spec).
- Continuer sans identifier les fichiers à modifier.
- Ne pas présenter le plan pour confirmation utilisateur.
- Manquer des patterns évidents dans le code existant.
