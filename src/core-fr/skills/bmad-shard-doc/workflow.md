# Découpage de Document (Shard Document)

**Objectif :** Découper (shard) les documents markdown volumineux en fichiers plus petits et organisés, sur la base des sections de niveau 2, en utilisant `npx @kayvan/markdown-tree-parser`.

## RÈGLES CRITIQUES (CRITICAL RULES)

- OBLIGATOIRE : Exécutez TOUTES les étapes de la section EXÉCUTION dans L'ORDRE EXACT
- NE SAUTEZ AUCUNE étape et NE MODIFIEZ PAS la séquence
- ARRÊTEZ-VOUS (HALT) immédiatement lorsque les conditions d'arrêt sont réunies
- Chaque action au sein d'une étape est une action REQUISE pour accomplir cette étape

## EXÉCUTION

### Étape 1 : Obtenir le Document Source

- Demandez à l'utilisateur le chemin du document source si ce dernier n'a pas déjà été fourni
- Vérifiez que le fichier existe et qu'il est accessible
- Vérifiez que le fichier est au format markdown (extension .md)
- Si le fichier n'est pas trouvé ou s'il n'est pas au format markdown : ARRÊTEZ-VOUS (HALT) avec un message d'erreur

### Étape 2 : Obtenir le Dossier de Destination

- Déterminez la destination par défaut : le même emplacement que le fichier source, dans un dossier portant le nom du fichier source sans l'extension .md
  - Exemple : `/chemin/vers/architecture.md` --> `/chemin/vers/architecture/`
- Demandez à l'utilisateur le chemin du dossier de destination (`[y]` pour confirmer l'utilisation de la valeur par défaut : `[chemin-suggéré]`, sinon saisir un nouveau chemin)
- Si l'utilisateur accepte la valeur par défaut : utilisez le chemin de destination suggéré
- Si l'utilisateur fournit un chemin personnalisé : utilisez le chemin de destination personnalisé
- Vérifiez que le dossier de destination existe ou peut être créé
- Vérifiez les permissions d'écriture pour la destination
- En cas de refus de permission : ARRÊTEZ-VOUS (HALT) avec un message d'erreur

### Étape 3 : Exécuter le Découpage (Sharding)

- Informez l'utilisateur que le découpage commence
- Exécutez la commande : `npx @kayvan/markdown-tree-parser explode [document-source] [dossier-destination]`
- Capturez la sortie de la commande et toute erreur éventuelle
- Si la commande échoue : ARRÊTEZ-VOUS (HALT) et affichez l'erreur à l'utilisateur

### Étape 4 : Vérifier la Sortie

- Vérifiez que le dossier de destination contient bien les fichiers découpés (sharded files)
- Vérifiez que le fichier index.md a été créé dans le dossier de destination
- Comptez le nombre de fichiers créés
- Si aucun fichier n'a été créé : ARRÊTEZ-VOUS (HALT) avec un message d'erreur

### Étape 5 : Rapporter l'Achèvement

- Affichez un rapport d'achèvement à l'utilisateur comprenant :
  - Le chemin et le nom du document source
  - Le chemin du dossier de destination
  - Le nombre de fichiers de section créés
  - La confirmation que le fichier index.md a été créé
  - Toute sortie de l'outil ou avertissement
- Informez l'utilisateur que le découpage s'est terminé avec succès

### Étape 6 : Gérer le Document Original

> **Critique :** Conserver à la fois la version originale et la version découpée va à l'encontre du but du découpage et peut causer de la confusion.

Présentez à l'utilisateur des options pour le document original :

> Que souhaitez-vous faire avec le document original `[nom-du-document-source]` ?
>
> Options :
>
> - `[d]` Supprimer - Retirer l'original (recommandé - les fragments (shards) peuvent toujours être recombinés)
> - `[m]` Déplacer vers une archive - Transférer l'original vers un emplacement de sauvegarde/archivage
> - `[k]` Conserver - Laisser l'original en place (NON recommandé - va à l'encontre du but du découpage)
>
> Votre choix (d/m/k) :

#### Si l'utilisateur sélectionne `d` (supprimer)

- Supprimez le fichier du document source original
- Confirmez la suppression à l'utilisateur : "Document original supprimé : [chemin-du-document-source]"
- Note : Le document peut être reconstruit à partir de fragments par concaténation de tous les fichiers de section, dans l'ordre

#### Si l'utilisateur sélectionne `m` (déplacer)

- Déterminez un emplacement d'archivage par défaut : le même répertoire que la source, dans un sous-dossier `archive`
  - Exemple : `/chemin/vers/architecture.md` --> `/chemin/vers/archive/architecture.md`
- Demandez : Emplacement d'archivage (`[y]` pour utiliser la valeur par défaut : `[chemin-archive-par-défaut]`, ou fournir un chemin personnalisé)
- Si l'utilisateur accepte la valeur par défaut : utilisez le chemin d'archive par défaut
- Si l'utilisateur fournit un chemin personnalisé : utilisez le chemin d'archive personnalisé
- Créez le répertoire d'archivage s'il n'existe pas
- Déplacez le document original vers l'emplacement d'archivage
- Confirmez le déplacement à l'utilisateur : "Document original déplacé vers : [chemin-archive]"

#### Si l'utilisateur sélectionne `k` (conserver)

- Affichez un avertissement à l'utilisateur :
  - Conserver simultanément la version originale et les versions découpées n'est PAS recommandé
  - Le protocole discover_inputs pourrait charger la mauvaise version
  - Les mises à jour de l'une ne se refléteront nullement sur l'autre
  - Contenu dupliqué encombrant l'espace
  - Songez à rayer ou archiver le support initial
- Exigez la confirmation du choix émis à l'utilisateur : "Source d'emblée préservée localement sous : [chemin-du-document-source]"

## CONDITIONS D'ARRÊT (HALT CONDITIONS)

- HALT (Arrêt) en cas de fichiers manquants ou d'échec de la commande système npx.
