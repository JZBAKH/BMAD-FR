---
name: bmad-validate-prd
description: 'DÉPRÉCIÉ — consolidé dans l''intention validate de bmad-prd - ce skill sera supprimé en v7 au profit de `bmad-prd`.'
---

# DÉPRÉCIÉ — redirige vers bmad-prd (intention validate)

Ce skill a été consolidé dans `bmad-prd`. Il est conservé comme un mince shim de compatibilité afin que les invocations existantes par nom et les fichiers d'override `_bmad/custom/bmad-validate-prd.toml` continuent de fonctionner. Les nouveaux travaux doivent invoquer `bmad-prd` directement — il détecte l'intention create / update / validate à partir de la conversation.

## À l'activation

1. Résous la personnalisation : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`. Cela récupère tous les overrides `{project-root}/_bmad/custom/bmad-validate-prd.toml` et `bmad-validate-prd.user.toml` pour les champs hérités (`activation_steps_prepend`, `activation_steps_append`, `persistent_facts`, `on_complete`).

2. Charge `{project-root}/_bmad/bmm/config.yaml` (et `config.user.yaml` si présent) pour résoudre `{user_name}` et `{communication_language}`.

3. Émets un avis de dépréciation à l'utilisateur en `{communication_language}` :

   > Avis : `bmad-validate-prd` est déprécié et sera supprimé dans une future version. Il redirige désormais vers `bmad-prd` avec l'intention validate. Pour faire taire cet avis et accéder à la surface complète de personnalisation (`prd_template`, `validation_checklist`, `doc_standards`, `external_sources`, `external_handoffs`, `output_dir`, `output_folder_name`), migre `_bmad/custom/bmad-validate-prd.toml` vers `_bmad/custom/bmad-prd.toml` et invoque `bmad-prd` directement la prochaine fois. Les champs de personnalisation qui étaient dans cette version restent dans la nouvelle version et seront respectés s'ils sont présents dans `_bmad/custom/bmad-prd.toml`, mais la nouvelle version prend également en charge des champs additionnels dont tu peux profiter en migrant.

4. Invoque `bmad-prd` avec le contexte suivant. Passe-les comme contexte d'activation afin que `bmad-prd` les honore au lieu de résoudre sa propre personnalisation depuis zéro :

   - **Intention :** `validate` — saute l'étape habituelle de détection d'intention de `bmad-prd`.
   - **Personnalisation héritée pré-résolue** — utilise celles-ci au lieu de résoudre depuis le propre `customize.toml` de `bmad-prd` pour les quatre champs hérités. Pour tout le reste (`prd_template`, `validation_checklist`, `validation_report_template`, `doc_standards`, `output_dir`, `output_folder_name`, `external_sources`, `external_handoffs`), utilise les valeurs par défaut et overrides propres à `bmad-prd` comme d'habitude :
     - `activation_steps_prepend` = la valeur résolue à l'étape 1
     - `activation_steps_append` = la valeur résolue à l'étape 1
     - `persistent_facts` = la valeur résolue à l'étape 1
     - `on_complete` = la valeur résolue à l'étape 1
   - **Entrée utilisateur originale :** transmets verbatim ce que l'utilisateur a dit lors de l'invocation de ce skill (le chemin du PRD cible, etc.).

   `bmad-prd` reprend le workflow à partir d'ici. N'exécute aucune étape supplémentaire dans ce shim.
