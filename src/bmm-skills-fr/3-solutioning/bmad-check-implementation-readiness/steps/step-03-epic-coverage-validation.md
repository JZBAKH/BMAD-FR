---
outputFile: '{planning_artifacts}/implementation-readiness-report-{{date}}.md'
---

# Étape 3 : Validation de la couverture par les Epics

## OBJECTIF DE L'ÉTAPE :

Valider que toutes les exigences fonctionnelles du PRD sont capturées dans le document des epics et stories, en identifiant toute lacune de couverture.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre toute action.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Product Manager et Scrum Master expert.
- ✅ Votre expertise réside dans la traçabilité des exigences.
- ✅ Vous vous assurez qu'aucune exigence n'est oubliée.
- ✅ Le succès se mesure à une couverture totale des FR.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la validation de la couverture des FR.
- 🚫 N'analysez pas la qualité des stories (cela viendra plus tard).
- 💬 Comparez les FR du PRD avec la liste de couverture des epics.
- 🚪 Documentez chaque FR manquante.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Charger intégralement le document des epics.
- 💾 Extraire la couverture des FR depuis les epics.
- 📖 Comparer avec la liste des FR du PRD.
- 🚫 INTERDICTION de poursuivre sans documenter les lacunes.

## PROCESSUS DE VALIDATION DE LA COUVERTURE PAR LES EPICS :

### 1. Initialiser la Validation de la Couverture

"Début de la **Validation de la couverture par les Epics**.

Je vais :

1. Charger le document des epics et stories
2. Extraire les informations de couverture des FR
3. Comparer avec les FR du PRD de l'étape précédente
4. Identifier toute FR non couverte dans les epics"

### 2. Charger le Document des Epics

À partir de l'inventaire des documents de l'étape 1 :

- Charger le document des epics et stories (complet ou segmenté).
- Le lire intégralement pour trouver les informations de couverture des FR.
- Rechercher des sections de type "FR Coverage Map" ou équivalent.

### 3. Extraire la Couverture des FR par les Epics

Depuis le document des epics :

- Trouver la cartographie ou la liste de couverture des FR.
- Extraire quels numéros de FR sont prétendument couverts.
- Documenter quelles epics couvrent quelles FR.

Formater comme suit :

```
## Couverture des FR par les Epics extraite

FR1 : Couverte dans l'Epic X
FR2 : Couverte dans l'Epic Y
FR3 : Couverte dans l'Epic Z
...
Total FR dans les epics : [nombre]
```

### 4. Comparer la Couverture par rapport au PRD

En utilisant la liste des FR du PRD de l'étape 2 :

- Vérifier chaque FR du PRD par rapport à la couverture des epics.
- Identifier les FR NON couvertes dans les epics.
- Noter toute FR présente dans les epics mais NON dans le PRD.

Créer une matrice de couverture :

```
## Analyse de la couverture des FR

| N° FR | Exigence du PRD  | Couverture Epic | État       |
| ----- | ---------------- | --------------- | ---------- |
| FR1   | [Texte PRD]      | Epic X Story Y  | ✓ Couverte |
| FR2   | [Texte PRD]      | **NON TROUVÉE** | ❌ MANQUANTE |
| FR3   | [Texte PRD]      | Epic Z Story A  | ✓ Couverte |
```

### 5. Documenter la Couverture Manquante

Lister toutes les FR non couvertes :

```
## Couverture FR manquante

### FR manquantes critiques

FR# : [Texte complet de l'exigence du PRD]
- Impact : [Pourquoi c'est critique]
- Recommandation : [Quelle epic devrait inclure ceci]

### FR manquantes à priorité élevée

[Lister toute autre FR non couverte]
```

### 6. Ajouter au Rapport d'Évaluation

Ajouter à {outputFile} :

```markdown
## Validation de la couverture par les Epics

### Matrice de couverture

[Matrice de couverture complète de la section 4]

### Exigences manquantes

[Liste des FR non couvertes de la section 5]

### Statistiques de couverture

- Total FR du PRD : [nombre]
- FR couvertes dans les epics : [nombre]
- Pourcentage de couverture : [pourcentage]
```

### 7. Passage Automatique à l'Étape Suivante

Une fois la validation de la couverture terminée, chargez immédiatement l'étape suivante.

## PASSAGE À L'ALIGNEMENT UX

Validation de la couverture par les epics terminée. Lisez complètement et suivez : `./step-04-ux-alignment.md`

---

## 🚨 MESURES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Document des epics chargé intégralement.
- Couverture des FR extraite avec précision.
- Toutes les lacunes identifiées et documentées.
- Matrice de couverture créée.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas lire le document des epics en entier.
- Omissions de FR lors de la comparaison.
- Ne pas documenter les exigences non couvertes.
- Analyse de couverture incomplète.

**Règle Maîtresse :** Chaque FR doit avoir un chemin d'implémentation traçable.
