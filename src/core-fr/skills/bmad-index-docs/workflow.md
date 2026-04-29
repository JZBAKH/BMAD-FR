# Indexation de Documents (Index Docs)

**Objectif :** Générer ou mettre à jour un fichier index.md visant à référencer l'intégralité des documents présents dans un dossier cible.

## EXÉCUTION

### Étape 1 : Scanner le Répertoire (Scan Directory)

- Dressez la liste de tous les fichiers et sous-dossiers situés à l'emplacement cible.

### Étape 2 : Grouper le Contenu (Group Content)

- Organisez les fichiers par type, par objectif, ou par sous-dossier de résidence.

### Étape 3 : Générer les Descriptions (Generate Descriptions)

- Parcourez le contenu de chaque fichier pour en saisir le but effectif et concevez de brèves descriptions (3 à 10 mots) reposant sur ce contenu, et pas seulement sur la base du nom de fichier.

### Étape 4 : Créer/Mettre à Jour l'Index (Create/Update Index)

- Rédigez ou mettez à la page le fichier index.md en incorporant les listes de fichiers catégorisés.

## FORMAT DE SORTIE (OUTPUT FORMAT)

```markdown
# Index du Répertoire

## Fichiers

- **[nom_fichier.ext](./nom_fichier.ext)** - Brève description
- **[autre_fichier.ext](./autre_fichier.ext)** - Brève description

## Sous-dossiers

### sous-dossier/

- **[fichier1.ext](./sous-dossier/fichier1.ext)** - Brève description
- **[fichier2.ext](./sous-dossier/fichier2.ext)** - Brève description

### autre-dossier/

- **[fichier3.ext](./autre-dossier/fichier3.ext)** - Brève description
```

## CONDITIONS D'ARRÊT (HALT CONDITIONS)

- HALT (Arrêt) si le dossier cible est inexistant ou non accessible.
- HALT (Arrêt) si l'utilisateur ne possède pas de droits d'écriture permettant de générer `index.md`.

## VALIDATION

- Employez systématiquement un accès relatif en démarrant par `./`.
- Regroupez ensemble les fichiers manifestant d'étroites affinités.
- Assurez-vous d'avoir lu l'essence des fichiers en vue de façonner un propos descriptif fidèle - ne spéculez pas exclusivement sur la base des appellations de fichiers.
- Conservez des résumés raccourcis mais significatifs (fourchette globale 3-10 termes max).
- Triez par ordre alphabétique au sein des groupements visés.
- Omettez les fichiers à attribut caché (déclinés par le biais d'un repère `.`) à l'exception d'une revendication opposée assumée.
