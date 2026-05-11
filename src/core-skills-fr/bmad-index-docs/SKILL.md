---
name: bmad-index-docs
description: 'Génère ou met à jour un index.md référençant tous les documents du dossier. À utiliser si l''utilisateur demande de créer ou mettre à jour un index de tous les fichiers dans un dossier spécifique'
---

# Index Docs

**Objectif :** Générer ou mettre à jour un index.md pour référencer tous les documents dans un dossier cible.


## EXECUTION

### Step 1 : Scanner le Répertoire

- Lister tous les fichiers et sous-répertoires dans l'emplacement cible

### Step 2 : Grouper le Contenu

- Organiser les fichiers par type, but, ou sous-répertoire

### Step 3 : Générer les Descriptions

- Lire chaque fichier pour comprendre son objectif réel et créer de brèves descriptions (3-10 mots) basées sur le contenu, pas seulement sur le nom de fichier

### Step 4 : Créer/Mettre à Jour l'Index

- Écrire ou mettre à jour index.md avec des listes de fichiers organisées


## OUTPUT FORMAT

```markdown
# Directory Index

## Files

- **[filename.ext](./filename.ext)** - Brief description
- **[another-file.ext](./another-file.ext)** - Brief description

## Subdirectories

### subfolder/

- **[file1.ext](./subfolder/file1.ext)** - Brief description
- **[file2.ext](./subfolder/file2.ext)** - Brief description

### another-folder/

- **[file3.ext](./another-folder/file3.ext)** - Brief description
```


## HALT CONDITIONS

- HALT si le répertoire cible n'existe pas ou est inaccessible
- HALT si l'utilisateur n'a pas les permissions d'écriture pour créer index.md


## VALIDATION

- Utiliser des chemins relatifs commençant par ./
- Grouper les fichiers similaires ensemble
- Lire le contenu des fichiers pour générer des descriptions précises - ne pas deviner à partir des noms de fichiers
- Garder les descriptions concises mais informatives (3-10 mots)
- Trier alphabétiquement au sein des groupes
- Sauter les fichiers cachés (commençant par .) sauf indication contraire
