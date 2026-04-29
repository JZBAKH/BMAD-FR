---
---

# Étape 6 : Résoudre les Conclusions

**Objectif :** Gérer les conclusions de la revue adverse de manière interactive, appliquer les corrections, finaliser la tech-spec.

---

## ÉTAT DISPONIBLE

Depuis les étapes précédentes :

- `{baseline_commit}` - Git HEAD au début du workflow.
- `{execution_mode}` - "tech-spec" ou "direct".
- `{tech_spec_path}` - Fichier tech-spec (si Mode A).
- Tableau des conclusions de l'étape 05.

---

## OPTIONS DE RÉSOLUTION

Présentez : "Comment souhaitez-vous gérer ces conclusions ?"

Affichez :

**[W] Parcours guidé (Walk through)** - Discuter de chaque conclusion individuellement
**[F] Correction automatique (Fix automatically)** - Corriger automatiquement les problèmes classés comme "réels"
**[S] Passer (Skip)** - Prendre acte et passer au commit

### Logique de Gestion du Menu :

- SI W : Exécutez la section PARCOURS GUIDÉ ci-dessous.
- SI F : Exécutez la section CORRECTION AUTOMATIQUE ci-dessous.
- SI S : Exécutez la section PASSER ci-dessous.

### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Continuer UNIQUEMENT lorsque l'utilisateur fait une sélection.

---

## PARCOURS GUIDÉ [W]

Pour chaque conclusion dans l'ordre :

1. Présentez la conclusion avec son contexte.
2. Demandez : **corriger maintenant / passer / discuter**.
3. Si corriger : Appliquez la correction immédiatement.
4. Si passer : Notez comme acquitté, continuez.
5. Si discuter : Fournissez plus de contexte, demandez à nouveau.
6. Passez à la conclusion suivante.

Une fois toutes les conclusions traitées, résumez ce qui a été corrigé/passé.

---

## CORRECTION AUTOMATIQUE [F]

1. Filtrez les conclusions pour ne garder que celles classées comme "réelles".
2. Appliquez les corrections pour chaque conclusion réelle.
3. Rapportez ce qui a été corrigé :

```
**Corrections automatiques appliquées :**
- F1 : {description de la correction}
- F3 : {description de la correction}
...

Passées (bruit/incertain) : F2, F4
```

---

## PASSER [S]

1. Prenez acte que toutes les conclusions ont été passées en revue.
2. Notez que l'utilisateur a choisi de continuer sans corrections.
3. Continuez vers l'achèvement.

---

## METTRE À JOUR LA TECH-SPEC (Mode A uniquement)

Si `{execution_mode}` est "tech-spec" :

1. Chargez `{tech_spec_path}`.
2. Mettez à jour le statut à "Terminé" (Completed).
3. Ajoutez des notes de revue :
   ```
   ## Notes de Revue
   - Revue adverse terminée
   - Conclusions : {count} au total, {fixed} corrigées, {skipped} passées
   - Approche de résolution : {walk-through/auto-fix/skip}
   ```
4. Enregistrez les modifications.

---

## SORTIE D'ACHÈVEMENT

```
**Revue terminée. Prêt pour le commit.**

**Résumé de l'Implémentation :**
- {ce qui a été implémenté}
- Fichiers modifiés : {count}
- Tests : {status}
- Conclusions de la revue : {X} traitées, {Y} passées

{Expliquez ce qui a été implémenté selon le niveau user_skill_level}
```

---

## WORKFLOW TERMINÉ

Ceci est la dernière étape. Le workflow Quick Dev est maintenant terminé.

L'utilisateur peut :

- Committer les changements.
- Lancer des tests supplémentaires.
- Démarrer une nouvelle session Quick Dev.

---

## MÉTRIQUES DE RÉUSSITE

- Options de résolution présentées à l'utilisateur.
- Approche choisie exécutée correctement.
- Corrections appliquées proprement (si applicable).
- Tech-spec mise à jour avec le statut final (Mode A).
- Résumé d'achèvement fourni.
- L'utilisateur comprend ce qui a été implémenté.

## MODES D'ÉCHEC

- Ne pas présenter les options de résolution.
- Corriger automatiquement des conclusions de type "bruit" ou "incertaines".
- Ne pas mettre à jour la tech-spec après la résolution (Mode A).
- Pas de résumé d'achèvement.
- Laisser l'utilisateur dans le flou sur les étapes suivantes.
