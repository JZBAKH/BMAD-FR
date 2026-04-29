---
---

# Étape 5 : Revue de Code Adverse

**Objectif :** Construire un diff de tous les changements, invoquer la compétence de revue adverse, présenter les conclusions.

---

## ÉTAT DISPONIBLE

Depuis les étapes précédentes :

- `{baseline_commit}` - Git HEAD au début du workflow (CRITIQUE pour le diff).
- `{execution_mode}` - "tech-spec" ou "direct".
- `{tech_spec_path}` - Fichier tech-spec (si Mode A).

---

### 1. Construire le Diff

Construisez un diff complet de tous les changements depuis le début du workflow.

### Si `{baseline_commit}` est un hash de commit Git :

**Changements des fichiers suivis (tracked) :**

```bash
git diff {baseline_commit}
```

**Nouveaux fichiers non suivis (untracked) :**
Incluez uniquement les fichiers non suivis que VOUS avez créés durant ce workflow (étapes 2 à 4).
N'incluez pas les fichiers non suivis préexistants.
Pour chaque nouveau fichier créé, incluez son contenu complet comme un ajout de "nouveau fichier".

### Si `{baseline_commit}` est "NO_GIT" :

Utilisez une construction de diff au mieux :

- Listez tous les fichiers que vous avez modifiés durant les étapes 2 à 4.
- Pour chaque fichier, montrez les changements que vous avez effectués (avant/après si vous vous en souvenez, ou simplement l'état actuel).
- Incluez tous les nouveaux fichiers que vous avez créés avec leur contenu complet.
- Note : C'est moins précis qu'un diff Git mais cela permet tout de même une revue significative.

### Capturer sous `{diff_output}`

Fusionnez tous les changements dans `{diff_output}`.

**Note :** NE PAS faire de `git add` — il s'agit d'une inspection en lecture seule.

---

### 2. Invoquer la Revue Adverse

Avec `{diff_output}` construit, invoquez la compétence `bmad-review-adversarial-general`. Si possible, utilisez l'asymétrie d'information : invoquez la compétence dans un sous-agent ou processus séparé avec un accès en lecture au projet, mais sans autre contexte que le `{diff_output}`.

Passez `{diff_output}` comme contenu à réviser. La compétence doit renvoyer une liste de conclusions.

---

### 3. Traiter les Conclusions

Capturez les conclusions du retour de la compétence.
**Si zéro conclusion :** ARRÊTEZ-VOUS — c'est suspect. Ré-analysez ou demandez conseil à l'utilisateur.
Évaluez la sévérité (Critique, Haute, Moyenne, Basse) et la validité (réelle, bruit, indécis).
NE PAS exclure de conclusions basées sur la sévérité ou la validité à moins d'une demande explicite.
Ordonnez les conclusions par sévérité.
Numérotez les conclusions ordonnées (F1, F2, F3, etc.).
Si un outil de type TodoWrite est disponible, transformez chaque conclusion en TODO, incluez l'ID, la sévérité, la validité et la description dans le TODO ; sinon, présentez les conclusions sous forme de tableau avec les colonnes : ID, Sévérité, Validité, Description.

---

## ÉTAPE SUIVANTE

Avec les conclusions en main, lisez complètement et suivez : `./step-06-resolve-findings.md` pour que l'utilisateur choisisse l'approche de résolution.

---

## MÉTRIQUES DE RÉUSSITE

- Diff construit à partir du baseline_commit.
- Nouveaux fichiers inclus dans le diff.
- Compétence invoquée avec le diff en entrée.
- Conclusions reçues.
- Conclusions traitées en TODOs ou tableau et présentées à l'utilisateur.

## MODES D'ÉCHEC

- baseline_commit manquant (impossible de construire un diff précis).
- Oubli des nouveaux fichiers non suivis dans le diff.
- Invoquer la compétence sans fournir l'entrée diff.
- Accepter zéro conclusion sans se questionner.
- Présenter moins de conclusions que ce que la compétence de revue a renvoyé sans instruction explicite.
