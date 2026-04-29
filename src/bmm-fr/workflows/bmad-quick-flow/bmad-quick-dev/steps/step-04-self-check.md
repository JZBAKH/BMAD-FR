---
---

# Étape 4 : Auto-vérification (Self-Check)

**Objectif :** Auditer le travail terminé par rapport aux tâches, tests, AC et patterns avant la revue externe.

---

## ÉTAT DISPONIBLE

Depuis les étapes précédentes :

- `{baseline_commit}` - Git HEAD au début du workflow.
- `{execution_mode}` - "tech-spec" ou "direct".
- `{tech_spec_path}` - Fichier tech-spec (si Mode A).
- `{project_context}` - Patterns du projet (si existant).

---

## AUDIT D'AUTO-VÉRIFICATION

### 1. Tâches Terminées

Vérifiez que toutes les tâches sont marquées comme terminées :

- [ ] Toutes les tâches de la tech-spec ou du plan mental sont marquées `[x]`.
- [ ] Aucune tâche n'a été sautée sans raison documentée.
- [ ] Toute tâche bloquée a une explication claire.

### 2. Tests Passés

Vérifiez le statut des tests :

- [ ] Tous les tests existants passent toujours.
- [ ] De nouveaux tests ont été écrits pour les nouvelles fonctionnalités.
- [ ] Pas d'avertissements de test ou de tests sautés sans raison.

### 3. Critères d'Acceptation (AC) Satisfaits

Pour chaque AC :

- [ ] L'AC est manifestement respecté.
- [ ] Capacité à expliquer comment l'implémentation satisfait l'AC.
- [ ] Les cas limites ont été pris en compte.

### 4. Patterns Suivis

Vérifiez la qualité du code :

- [ ] Suit les patterns de code existants dans la base de code.
- [ ] Suit les règles du project-context (si existant).
- [ ] Gestion des erreurs cohérente avec la base de code.
- [ ] Aucune "odeur de code" (code smell) évidente introduite.

---

## METTRE À JOUR LA TECH-SPEC (Mode A uniquement)

Si `{execution_mode}` est "tech-spec" :

1. Chargez `{tech_spec_path}`.
2. Marquez toutes les tâches comme `[x]` terminées.
3. Mettez à jour le statut à "Implémentation Terminée" (Implementation Complete).
4. Enregistrez les modifications.

---

## RÉSUMÉ DE L'IMPLÉMENTATION

Présentez un résumé pour passer à la revue :

```
**Implémentation Terminée !**

**Résumé :** {ce qui a été implémenté}
**Fichiers Modifiés :** {liste des fichiers}
**Tests :** {résumé des tests - passés/ajoutés/etc.}
**Statut AC :** {tous satisfaits / problèmes notés}

Passage à la revue de code adverse...
```

---

## ÉTAPE SUIVANTE

Passez immédiatement à `./step-05-adversarial-review.md`.

---

## MÉTRIQUES DE RÉUSSITE

- Toutes les tâches vérifiées comme terminées.
- Tous les tests passent.
- Tous les AC satisfaits.
- Patterns suivis.
- Tech-spec mise à jour (si Mode A).
- Résumé présenté.

## MODES D'ÉCHEC

- Affirmer que les tâches sont terminées alors qu'elles ne le sont pas.
- Ne pas lancer les tests avant de continuer.
- Oublier la vérification des AC.
- Ignorer les violations de patterns.
- Ne pas mettre à jour le statut de la tech-spec (Mode A).
