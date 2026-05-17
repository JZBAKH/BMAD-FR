#!/usr/bin/env python3
"""
Résout la personnalisation d'un skill BMad par fusion TOML à trois niveaux.

Lit la personnalisation depuis trois couches (priorité la plus haute en premier) :
  1. {project-root}/_bmad/custom/{name}.user.toml  (personnel, gitignoré)
  2. {project-root}/_bmad/custom/{name}.toml        (équipe/organisation, commité)
  3. {skill-root}/customize.toml                    (valeurs par défaut du skill)

Le nom du skill est dérivé du nom de base du répertoire du skill.

Affiche le JSON fusionné sur stdout. Les erreurs vont sur stderr.

Nécessite Python 3.11+ (utilise `tomllib` de la stdlib). Pas de `uv`, pas de
`pip install`, pas de virtualenv — un simple `python3` suffit.

  python3 resolve_customization.py --skill /chemin/abs/vers/dossier-skill
  python3 resolve_customization.py --skill ... --key agent
  python3 resolve_customization.py --skill ... --key agent.menu

Règles de fusion (purement structurelles — aucun cas particulier par nom de champ) :
  - Scalaires (string, int, bool, float) : la valeur surchargée gagne
  - Tables : fusion profonde (application récursive de ces règles)
  - Tableaux de tables où chaque élément partage le *même* champ
    identifiant (chaque élément a `code`, ou chaque élément a `id`) :
    fusion par cette clé (clés correspondantes remplacées, nouvelles clés ajoutées)
  - Tous les autres tableaux — y compris ceux où seuls certains éléments ont
    `code` ou `id`, ou ceux où des éléments mélangent les deux clés :
    concaténation (éléments de base suivis des éléments surchargés)

Aucun mécanisme de suppression — les surcharges ne peuvent pas supprimer
des éléments de base. Pour supprimer une valeur par défaut, fork le skill ou
surcharge l'élément par code avec une description/prompt sans effet.
"""

import argparse
import json
import sys
from pathlib import Path

try:
    import tomllib
except ImportError:
    sys.stderr.write(
        "erreur : Python 3.11+ est requis (`tomllib` de la stdlib introuvable).\n"
        "Installe un Python plus récent ou lance la résolution manuellement selon les\n"
        "instructions de repli dans le SKILL.md du skill.\n"
    )
    sys.exit(3)


_MISSING = object()
_KEYED_MERGE_FIELDS = ("code", "id")


def find_project_root(start: Path):
    current = start.resolve()
    while True:
        if (current / "_bmad").exists() or (current / ".git").exists():
            return current
        parent = current.parent
        if parent == current:
            return None
        current = parent


def load_toml(file_path: Path, required: bool = False) -> dict:
    if not file_path.exists():
        if required:
            sys.stderr.write(f"erreur : fichier de personnalisation requis introuvable : {file_path}\n")
            sys.exit(1)
        return {}
    try:
        with file_path.open("rb") as f:
            parsed = tomllib.load(f)
        if not isinstance(parsed, dict):
            if required:
                sys.stderr.write(f"erreur : {file_path} n'a pas été analysé en table\n")
                sys.exit(1)
            return {}
        return parsed
    except tomllib.TOMLDecodeError as error:
        level = "erreur" if required else "avertissement"
        sys.stderr.write(f"{level} : échec de l'analyse de {file_path} : {error}\n")
        if required:
            sys.exit(1)
        return {}
    except OSError as error:
        level = "erreur" if required else "avertissement"
        sys.stderr.write(f"{level} : échec de la lecture de {file_path} : {error}\n")
        if required:
            sys.exit(1)
        return {}


def _detect_keyed_merge_field(items):
    """Return 'code' or 'id' if every table item carries that *same* field.

    All items must share the same identifier (all `code`, or all `id`).
    Mixed arrays — where some items use `code` and others use `id` —
    return None and fall through to append semantics. This is intentional:
    mixing identifier keys within one array is a schema smell, and
    append-fallback is safer than guessing which key should merge.
    """
    if not items or not all(isinstance(item, dict) for item in items):
        return None
    for candidate in _KEYED_MERGE_FIELDS:
        if all(item.get(candidate) is not None for item in items):
            return candidate
    return None


def _merge_by_key(base, override, key_name):
    result = []
    index_by_key = {}

    for item in base:
        if not isinstance(item, dict):
            continue
        if item.get(key_name) is not None:
            index_by_key[item[key_name]] = len(result)
        result.append(dict(item))

    for item in override:
        if not isinstance(item, dict):
            result.append(item)
            continue
        key = item.get(key_name)
        if key is not None and key in index_by_key:
            result[index_by_key[key]] = dict(item)
        else:
            if key is not None:
                index_by_key[key] = len(result)
            result.append(dict(item))

    return result


def _merge_arrays(base, override):
    """Shape-aware array merge. Base + override combined tables may opt into
    keyed merge if every item has `code` or `id`. Otherwise: append."""
    base_arr = base if isinstance(base, list) else []
    override_arr = override if isinstance(override, list) else []
    keyed_field = _detect_keyed_merge_field(base_arr + override_arr)
    if keyed_field:
        return _merge_by_key(base_arr, override_arr, keyed_field)
    return base_arr + override_arr


def deep_merge(base, override):
    """Recursively merge override into base using structural rules.
    - Table + table: deep merge
    - Array + array: shape-aware (keyed merge if all items have code/id, else append)
    - Anything else: override wins
    """
    if isinstance(base, dict) and isinstance(override, dict):
        result = dict(base)
        for key, over_val in override.items():
            if key in result:
                result[key] = deep_merge(result[key], over_val)
            else:
                result[key] = over_val
        return result
    if isinstance(base, list) and isinstance(override, list):
        return _merge_arrays(base, override)
    return override


def extract_key(data, dotted_key: str):
    parts = dotted_key.split(".")
    current = data
    for part in parts:
        if isinstance(current, dict) and part in current:
            current = current[part]
        else:
            return _MISSING
    return current


def main():
    parser = argparse.ArgumentParser(
        description="Résout la personnalisation d'un skill BMad par fusion TOML à trois niveaux.",
        add_help=True,
    )
    parser.add_argument(
        "--skill", "-s", required=True,
        help="Chemin absolu vers le dossier du skill (doit contenir customize.toml)",
    )
    parser.add_argument(
        "--key", "-k", action="append", default=[],
        help="Chemin de champ pointé à résoudre (répétable). Omettre pour un dump complet.",
    )
    args = parser.parse_args()

    skill_dir = Path(args.skill).resolve()
    skill_name = skill_dir.name
    defaults_path = skill_dir / "customize.toml"

    defaults = load_toml(defaults_path, required=True)

    # Prefer the project that contains this skill. Only fall back to cwd if
    # the skill isn't inside a recognizable project tree (unusual but possible
    # for standalone skills invoked directly). Using cwd first is unsafe when
    # an ancestor of cwd happens to have a stray _bmad/ from another project.
    project_root = find_project_root(skill_dir) or find_project_root(Path.cwd())

    team = {}
    user = {}
    if project_root:
        custom_dir = project_root / "_bmad" / "custom"
        team = load_toml(custom_dir / f"{skill_name}.toml")
        user = load_toml(custom_dir / f"{skill_name}.user.toml")

    merged = deep_merge(defaults, team)
    merged = deep_merge(merged, user)

    if args.key:
        output = {}
        for key in args.key:
            value = extract_key(merged, key)
            if value is not _MISSING:
                output[key] = value
    else:
        output = merged

    sys.stdout.write(json.dumps(output, indent=2, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
