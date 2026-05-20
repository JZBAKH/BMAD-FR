---
name: bmad-shard-doc
description: "Découpe les grands documents markdown en fichiers plus petits et organisés selon les sections de niveau 2 (par défaut). À utiliser si l'utilisateur dit perform shard document"
---

# Découper un document (Shard Document)

**Objectif :** Découper les grands documents markdown en fichiers plus petits et organisés selon les sections de niveau 2 en utilisant `npx @kayvan/markdown-tree-parser`.

## RÈGLES CRITIQUES

- OBLIGATOIRE : Exécuter TOUTES les étapes de la section EXECUTION DANS L'ORDRE EXACT
- NE PAS sauter d'étapes ni changer la séquence
- ARRÊTER immédiatement lorsque les conditions d'arrêt sont remplies
- Chaque action au sein d'une étape est une action REQUISE pour compléter cette étape

## EXÉCUTION

### Étape 1 : Obtenir le document source

- Demander à l'utilisateur le chemin du document source s'il n'est pas déjà fourni
- Vérifier que le fichier existe et est accessible
- Vérifier que le fichier est au format markdown (extension .md)
- Si le fichier est introuvable ou n'est pas du markdown : ARRÊTER avec un message d'erreur

### Étape 2 : Obtenir le dossier de destination

- Déterminer la destination par défaut : même emplacement que le fichier source, dossier nommé d'après le fichier source sans l'extension .md
  - Exemple : `/path/to/architecture.md` --> `/path/to/architecture/`
- Demander à l'utilisateur le chemin du dossier de destination (`[y]` pour confirmer l'utilisation de la valeur par défaut : `[suggested-path]`, sinon entrer un nouveau chemin)
- Si l'utilisateur accepte la valeur par défaut : utiliser le chemin de destination suggéré
- Si l'utilisateur fournit un chemin personnalisé : utiliser le chemin de destination personnalisé
- Vérifier que le dossier de destination existe ou peut être créé
- Vérifier les permissions d'écriture pour la destination
- Si la permission est refusée : ARRÊTER avec un message d'erreur

### Étape 3 : Exécuter le découpage

- Informer l'utilisateur que le découpage commence
- Exécuter la commande : `npx @kayvan/markdown-tree-parser explode [source-document] [destination-folder]`
- Capturer la sortie de la commande et toute erreur
- Si la commande échoue : ARRÊTER et afficher l'erreur à l'utilisateur

### Étape 4 : Vérifier le résultat

- Vérifier que le dossier de destination contient les fichiers découpés
- Vérifier que index.md a été créé dans le dossier de destination
- Compter le nombre de fichiers créés
- Si aucun fichier n'a été créé : ARRÊTER avec un message d'erreur

### Étape 5 : Rapport de fin

- Afficher un rapport de fin à l'utilisateur incluant :
  - Le chemin et le nom du document source
  - Le chemin du dossier de destination
  - Le nombre de fichiers de section créés
  - La confirmation que index.md a été créé
  - Toute sortie d'outil ou avertissement
- Informer l'utilisateur que le découpage s'est terminé avec succès

### Étape 6 : Gérer le document original

> **Critique :** Conserver à la fois la version originale et les versions découpées va à l'encontre de l'objectif du découpage et peut causer de la confusion.

Présenter à l'utilisateur les options pour le document original :

> Que souhaitez-vous faire avec le document original `[source-document-name]` ?
>
> Options :
>
> - `[d]` Supprimer - Supprimer l'original (recommandé - les fragments peuvent toujours être recombinés)
> - `[m]` Déplacer vers les archives - Déplacer l'original vers un emplacement de sauvegarde/archive
> - `[k]` Conserver - Laisser l'original en place (NON recommandé - va à l'encontre de l'objectif du découpage)
>
> Votre choix (d/m/k) :

#### Si l'utilisateur sélectionne `d` (supprimer)

- Supprimer le fichier du document source original
- Confirmer la suppression à l'utilisateur : "Document original supprimé : [source-document-path]"
- Note : Le document peut être reconstruit à partir des fragments en concaténant tous les fichiers de section dans l'ordre

#### Si l'utilisateur sélectionne `m` (déplacer)

- Déterminer l'emplacement d'archive par défaut : même répertoire que la source, dans un sous-dossier `archive`
  - Exemple : `/path/to/architecture.md` --> `/path/to/archive/architecture.md`
- Demander : Emplacement d'archive (`[y]` pour utiliser la valeur par défaut : `[default-archive-path]`, ou fournir un chemin personnalisé)
- Si l'utilisateur accepte la valeur par défaut : utiliser le chemin d'archive par défaut
- Si l'utilisateur fournit un chemin personnalisé : utiliser le chemin d'archive personnalisé
- Créer le répertoire d'archive s'il n'existe pas
- Déplacer le document original vers l'emplacement d'archive
- Confirmer le déplacement à l'utilisateur : "Document original déplacé vers : [archive-path]"

#### Si l'utilisateur sélectionne `k` (conserver)

- Afficher un avertissement à l'utilisateur :
  - Conserver à la fois l'original et les versions découpées N'est PAS recommandé
  - Le protocole discover_inputs pourrait charger la mauvaise version
  - Les mises à jour de l'un ne se répercuteront pas sur l'autre
  - Contenu en double occupant de l'espace
  - Envisager de supprimer ou d'archiver le document original
- Confirmer le choix de l'utilisateur : "Document original conservé à : [source-document-path]"

## CONDITIONS D'ARRÊT

- ARRÊTER si la commande npx échoue ou ne produit aucun fichier de sortie
