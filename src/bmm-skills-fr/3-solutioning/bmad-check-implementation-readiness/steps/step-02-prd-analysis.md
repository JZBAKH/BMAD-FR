---
outputFile: '{planning_artifacts}/implementation-readiness-report-{{date}}.md'
epicsFile: '{planning_artifacts}/*epic*.md' # Sera résolu vers le fichier réel
---

# Étape 2 : Analyse du PRD

## OBJECTIF DE L'ÉTAPE :

Lire et analyser intégralement le document PRD (complet ou segmenté) pour extraire toutes les exigences fonctionnelles (FR) et non fonctionnelles (NFR) en vue de la validation de la couverture par les epics.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre toute action.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Product Manager et Scrum Master expert.
- ✅ Votre expertise réside dans l'analyse et la traçabilité des exigences.
- ✅ Vous réfléchissez de manière critique à l'exhaustivité des exigences.
- ✅ Le succès se mesure à la rigueur de l'extraction des exigences.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la lecture et l'extraction depuis le PRD.
- 🚫 Ne validez pas les fichiers (fait à l'étape 1).
- 💬 Lisez le PRD complètement - fichier complet ou tous les fichiers segmentés.
- 🚪 Extrayez chaque FR et NFR avec sa numérotation.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Charger et lire intégralement le PRD.
- 💾 Extraire toutes les exigences systématiquement.
- 📖 Documenter les résultats dans le rapport.
- 🚫 INTERDICTION de sauter ou de résumer le contenu du PRD.

## PROCESSUS D'ANALYSE DU PRD :

### 1. Initialiser l'Analyse du PRD

"Début de l'**Analyse du PRD** pour extraire toutes les exigences.

Je vais :

1. Charger le document PRD (complet ou segmenté)
2. Le lire intégralement et minutieusement
3. Extraire TOUTES les exigences fonctionnelles (FR)
4. Extraire TOUTES les exigences non fonctionnelles (NFR)
5. Documenter les résultats pour la validation de la couverture"

### 2. Charger et Lire le PRD

À partir de l'inventaire des documents de l'étape 1 :

- Si un fichier PRD complet existe : Le charger et le lire intégralement.
- Si un PRD segmenté existe : Charger et lire TOUS les fichiers du dossier PRD.
- Garantir une couverture complète - aucun fichier ignoré.

### 3. Extraire les Exigences Fonctionnelles (FR)

Rechercher et extraire :

- Les FR numérotées (FR1, FR2, FR3, etc.).
- Les exigences étiquetées "Functional Requirement" ou "Exigence Fonctionnelle".
- Les user stories ou cas d'usage représentant des besoins fonctionnels.
- Les règles métier devant être implémentées.

Formater les résultats comme suit :

```
## Exigences Fonctionnelles Extraites

FR1 : [Texte complet de l'exigence]
FR2 : [Texte complet de l'exigence]
FR3 : [Texte complet de l'exigence]
...
Total FR : [nombre]
```

### 4. Extraire les Exigences Non Fonctionnelles (NFR)

Rechercher et extraire :

- Exigences de performance (temps de réponse, débit).
- Exigences de sécurité (authentification, cryptage, etc.).
- Exigences d'utilisabilité (accessibilité, facilité d'utilisation).
- Exigences de fiabilité (disponibilité, taux d'erreur).
- Exigences d'évolutivité (utilisateurs simultanés, croissance des données).
- Exigences de conformité (normes, réglementations).

Formater les résultats comme suit :

```
## Exigences Non Fonctionnelles Extraites

NFR1 : [Exigence de performance]
NFR2 : [Exigence de sécurité]
NFR3 : [Exigence d'utilisabilité]
...
Total NFR : [nombre]
```

### 5. Documenter les Exigences Supplémentaires

Rechercher :

- Contraintes ou hypothèses.
- Exigences techniques non étiquetées comme FR/NFR.
- Contraintes métier.
- Exigences d'intégration.

### 6. Ajouter au Rapport d'Évaluation

Ajouter à {outputFile} :

```markdown
## Analyse du PRD

### Exigences Fonctionnelles

[Liste complète des FR de la section 3]

### Exigences Non Fonctionnelles

[Liste complète des NFR de la section 4]

### Exigences Supplémentaires

[Toutes les autres exigences ou contraintes trouvées]

### Évaluation de l'Exhaustivité du PRD

[Évaluation initiale de l'exhaustivité et de la clarté du PRD]
```

### 7. Passage Automatique à l'Étape Suivante

Une fois l'analyse du PRD terminée, chargez immédiatement l'étape suivante pour la validation de la couverture par les epics.

## PASSAGE À LA VALIDATION DE LA COUVERTURE PAR LES EPICS

Analyse du PRD terminée. Lisez complètement et suivez : `./step-03-epic-coverage-validation.md`

---

## 🚨 MESURES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- PRD chargé et lu intégralement.
- Toutes les FR extraites avec leur texte complet.
- Toutes les NFR identifiées et documentées.
- Résultats ajoutés au rapport d'évaluation.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas lire le PRD en entier (surtout les versions segmentées).
- Omissions d'exigences lors de l'extraction.
- Résumer au lieu d'extraire le texte intégral.
- Ne pas documenter les résultats dans le rapport.

**Règle Maîtresse :** L'extraction complète des exigences est essentielle pour la validation de la traçabilité.
