---
name: bmad-customize
description: Rédige et met à jour les overrides de personnalisation pour les Skills BMad installés. À utiliser quand l'utilisateur dit « personnaliser bmad », « override un skill », « changer le comportement d'un agent » ou « personnaliser un workflow ».
---

# BMad Customize

Traduit l'intention de l'utilisateur en un fichier d'override TOML correctement placé sous `{project-root}/_bmad/custom/` pour un Skill agent ou workflow personnalisable. Découvrir, router, rédiger, écrire, vérifier.

Périmètre v1 : overrides `[agent]` par Skill (`bmad-agent-<role>.toml` / `.user.toml`) et overrides `[workflow]` par Skill (`bmad-<workflow>.toml` / `.user.toml`). La configuration centrale (`{project-root}/_bmad/custom/config.toml`) est hors périmètre — orientez les utilisateurs vers le [guide How to Customize BMad](https://docs.bmad-method.org/how-to/customize-bmad/).

Quand le `customize.toml` de la cible n'expose pas ce que l'utilisateur veut, dites-le clairement. N'inventez pas de champs.

## Préflight

- Pas de `{project-root}/_bmad/` → BMad n'est pas installé. Dites-le, arrêtez.
- `{project-root}/_bmad/scripts/resolve_customization.py` manquant → continuez, mais l'étape 6 de vérification se rabat sur un merge manuel.
- Les deux présents → procédez.

## Activation

Chargez `_bmad/config.toml` et `_bmad/config.user.toml` depuis `{project-root}` pour `user_name` (par défaut `BMad`) et `communication_language` (par défaut `English`). Saluez. Si l'invocation de l'utilisateur nomme déjà un Skill cible ET un changement spécifique, sautez à l'étape 3.

## Étape 1 : Classifier l'intention

- **Dirigée** — Skill spécifique + changement spécifique → étape 3.
- **Exploratoire** — « que puis-je personnaliser ? » → étape 2.
- **Audit/itération** — veut relire ou modifier quelque chose déjà personnalisé → étape 2, mettez en avant les Skills qui ont des overrides existants ; lisez l'override existant à l'étape 3 avant de composer.
- **Transversale** — pourrait vivre sur plusieurs surfaces → étape 3, choisissez agent vs workflow explicitement avec l'utilisateur.

## Étape 2 : Découverte

```
python3 {skill-root}/scripts/list_customizable_skills.py --project-root {project-root}
```

Utilisez `--extra-root <path>` (répétable) si l'utilisateur a des Skills installés à des emplacements supplémentaires.

Regroupez les `agents` et `workflows` retournés pour l'utilisateur ; pour chacun affichez le nom, la description, et si `has_team_override` ou `has_user_override` vaut true. Faites remonter tout `errors[]`. Pour les intentions d'audit/itération, mettez en avant les entrées déjà overridées.

Liste vide : affichez `scanned_roots`, demandez si les Skills vivent ailleurs (proposez `--extra-root`) ; sinon arrêtez.

## Étape 3 : Déterminer la bonne surface

Lisez le `customize.toml` de la cible. Le bloc `[agent]` ou `[workflow]` de premier niveau définit la surface.

Si un override team ou user existe déjà, lisez-le d'abord et résumez ce qui est déjà overridé avant de composer.

**Intention transversale — parcourez les deux surfaces avec l'utilisateur :**
- Chaque workflow qu'un agent donné exécute → surface agent (par ex. `bmad-agent-pm.toml` avec `persistent_facts`, `principles`).
- Un seul workflow → surface workflow (par ex. `bmad-create-prd.toml` avec `activation_steps_prepend`).
- Plusieurs workflows spécifiques → plusieurs overrides workflow en séquence, pas un override agent.

**Heuristique single-surface :**
- Niveau workflow : swap de template, chemin de sortie, comportement spécifique à une étape, ou un scalaire nommé déjà exposé (`*_template`, `on_complete`). Chirurgical, fiable.
- Niveau agent : persona, style de communication, faits à l'échelle de l'organisation, changements de menu, comportement qui doit s'appliquer à chaque workflow que l'agent dispatche.

En cas d'ambiguïté, présentez les deux avec leurs compromis, recommandez-en un, laissez l'utilisateur décider.

Intention en dehors de la surface exposée (logique d'étape, ordonnancement, tout ce qui n'est pas dans `customize.toml`) : dites-le ; proposez `activation_steps_prepend`/`append` ou `persistent_facts` comme approximations, ou recommandez `bmad-builder` pour créer un Skill personnalisé.

## Étape 4 : Composer l'override

Traduisez l'anglais courant en TOML contre les champs du `customize.toml` de la cible. Si un override existant a été lu, présentez le changement comme additif.

Sémantique de merge :
- **Scalaires** (`icon`, `role`, `*_template`, `on_complete`) — l'override gagne.
- **Tableaux append** (`persistent_facts`, `activation_steps_prepend`/`append`, `principles`) — les entrées team/user s'ajoutent dans l'ordre.
- **Tableaux clés de tables** (items de menu avec `code` ou `id`) — les clés correspondantes remplacent, les nouvelles clés s'ajoutent.

Les overrides sont parcimonieux : seulement les champs modifiés. Ne copiez jamais l'intégralité du `customize.toml`.

**Swap de template** (scalaire `*_template`) : proposez de copier le template par défaut vers `{project-root}/_bmad/custom/{skill-name}-{purpose}-template.md`, pointez l'override vers le nouveau chemin, proposez d'aider à l'éditer.

## Étape 5 : Placement team ou user

Sous `{project-root}/_bmad/custom/` :
- `{skill-name}.toml` — team, commité. Politiques, conventions org, conformité.
- `{skill-name}.user.toml` — user, gitignoré. Ton personnel, faits privés, raccourcis.

Choix par défaut selon le caractère (politique → team, personnel → user), confirmez avant d'écrire.

## Étape 6 : Montrer, confirmer, écrire, vérifier

1. Affichez le TOML complet. Si le fichier existe, affichez un diff. N'écrasez jamais silencieusement.
2. Attendez un oui explicite.
3. Écrivez. Créez `{project-root}/_bmad/custom/` si nécessaire.
4. Vérifiez :
   ```
   python3 {project-root}/_bmad/scripts/resolve_customization.py --skill <install-path> --key <agent-or-workflow>
   ```
   Affichez la sortie mergée, pointez les champs modifiés.

   **Resolver manquant ou en échec :** lisez les couches qui existent — `<install-path>/customize.toml` (base), `{project-root}/_bmad/custom/{skill-name}.toml` (team), `{project-root}/_bmad/custom/{skill-name}.user.toml` (user) — appliquez base → team → user avec les mêmes règles de merge (les scalaires écrasent, les tables fusionnent en profondeur, les tableaux clés `code`/`id` mergent par clé, tous les autres tableaux s'ajoutent), décrivez comment les champs modifiés se résolvent.

   **La vérification montre que l'override n'a pas été pris en compte** (champ inchangé, conflit de merge, fichier non capté) : ré-entrez à l'étape 4 avec la sortie de vérification comme contexte. Habituellement mauvais nom de champ, mauvais mode de merge (scalaire vs tableau) ou mauvais scope.
5. Résumez ce qui a changé, où le fichier vit, comment itérer. Rappelez à l'utilisateur de commiter les overrides team.

## Terminé quand

- Fichier d'override écrit (ou utilisateur a explicitement abandonné).
- L'utilisateur a vu la sortie du resolver (ou le résumé de merge en fallback manuel).
- L'utilisateur a accusé réception du résumé.

Sinon le Skill n'est pas terminé — finissez ou dites à l'utilisateur qu'il sort de manière incomplète.

## Quand ce Skill ne peut pas aider

- **Configuration centrale** (`{project-root}/_bmad/custom/config.toml`) — voir le [guide How to Customize BMad](https://docs.bmad-method.org/how-to/customize-bmad/).
- **Logique d'étape, ordonnancement, comportement non présent dans `customize.toml`** — ouvrez une feature request, ou utilisez `bmad-builder` pour créer un Skill personnalisé. Proposez votre aide pour l'un ou l'autre.
- **Skills sans `customize.toml`** — non personnalisables.
