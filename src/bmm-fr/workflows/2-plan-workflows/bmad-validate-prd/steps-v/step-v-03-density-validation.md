---
name: 'step-v-03-density-validation'
description: 'Vérification de la densité de l''information - Scanner à la recherche d''anti-patterns qui violent les principes de densité de l''information'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-04-brief-coverage-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 3 : Validation de la densité de l'information

## OBJECTIF DE L'ÉTAPE :

Valider que le cahier des charges produit (PRD) respecte les standards BMAD de densité de l'information en scannant la présence de remplissage conversationnel, de phrases verbeuses et d'expressions redondantes qui violent les principes de concision.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans la contribution de l'utilisateur
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre la moindre action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'ensemble du fichier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PRODUIRE LA SORTIE dans votre style de communication d'agent avec la configuration `{communication_language}`

### Renforcement du rôle :

- ✅ Vous êtes un Architecte de validation et un Spécialiste de l'assurance qualité
- ✅ Si l'on vous a déjà fourni des modèles de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif
- ✅ Vous apportez une rigueur analytique et un souci du détail
- ✅ Cette étape s'exécute de manière autonome - aucune contribution de l'utilisateur n'est requise

### Règles spécifiques à cette étape :

- 🎯 Concentrez-vous UNIQUEMENT sur les anti-patterns de densité de l'information
- 🚫 INTERDICTION de valider d'autres aspects à cette étape
- 💬 Approche : Scan systématique et catégorisation
- 🚪 Il s'agit d'une étape de séquence de validation - poursuit automatiquement une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Scanner le cahier des charges produit (PRD) pour identifier les anti-patterns de densité de manière systématique
- 💾 Ajouter les constats relatifs à la densité au rapport de validation
- 📖 Afficher "Passage à la vérification suivante..." et charger l'étape suivante
- 🚫 INTERDICTION de mettre en pause ou de demander la contribution de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier de cahier des charges produit (PRD), rapport de validation avec constats relatifs au format
- Concentration : Validation de la densité de l'information uniquement
- Limites : Ne pas valider d'autres aspects, ne pas mettre en pause pour la contribution de l'utilisateur
- Dépendances : Étape 2 terminée - classification du format effectuée

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence à la lettre. Ne sautez pas, ne réorganisez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter la validation par sous-processus

**Tenter d'utiliser l'outil Task pour générer un sous-processus :**

"Effectuer une validation de la densité de l'information sur ce cahier des charges produit (PRD) :

1. Charger le fichier de cahier des charges produit (PRD)
2. Scanner les anti-patterns suivants :
   - Phrases de remplissage conversationnel (exemples : 'The system will allow users to...', 'It is important to note that...', 'In order to')
   - Phrases verbeuses (exemples : 'Due to the fact that', 'In the event of', 'For the purpose of')
   - Phrases redondantes (exemples : 'Future plans', 'Absolutely essential', 'Past history')
3. Compter les violations par catégorie avec les numéros de ligne
4. Classifier la gravité : Critique (>10 violations), Avertissement (5-10), Réussite (<5)

Retourner des constats structurés avec les comptes et exemples."

### 2. Dégradation gracieuse (si l'outil Task est indisponible)

Si l'outil Task est indisponible, effectuer l'analyse directement :

**Scanner les modèles de remplissage conversationnel :**
- "The system will allow users to..."
- "It is important to note that..."
- "In order to"
- "For the purpose of"
- "With regard to"
- Compter les occurrences et noter les numéros de ligne

**Scanner les phrases verbeuses :**
- "Due to the fact that" (utiliser "because")
- "In the event of" (utiliser "if")
- "At this point in time" (utiliser "now")
- "In a manner that" (utiliser "how")
- Compter les occurrences et noter les numéros de ligne

**Scanner les phrases redondantes :**
- "Future plans" (juste "plans")
- "Past history" (juste "history")
- "Absolutely essential" (juste "essential")
- "Completely finish" (juste "finish")
- Compter les occurrences et noter les numéros de ligne

### 3. Classifier la gravité

**Calculer le total des violations :**
- Compte du remplissage conversationnel
- Compte des phrases verbeuses
- Compte des phrases redondantes
- Total = somme de toutes les catégories

**Déterminer la gravité :**
- **Critique :** Total > 10 violations
- **Avertissement :** Total 5-10 violations
- **Réussite :** Total < 5 violations

### 4. Consigner les constats relatifs à la densité dans le rapport de validation

Ajouter au rapport de validation :

```markdown
## Validation de la densité de l'information

**Violations d'anti-patterns :**

**Remplissage conversationnel :** {count} occurrences
[Si count > 0, lister les exemples avec les numéros de ligne]

**Phrases verbeuses :** {count} occurrences
[Si count > 0, lister les exemples avec les numéros de ligne]

**Phrases redondantes :** {count} occurrences
[Si count > 0, lister les exemples avec les numéros de ligne]

**Total des violations :** {total}

**Évaluation de la gravité :** [Critique/Avertissement/Réussite]

**Recommandation :**
[Si Critique] "Le cahier des charges produit (PRD) nécessite une révision importante pour améliorer la densité de l'information. Chaque phrase doit porter son propre poids, sans remplissage."
[Si Avertissement] "Le cahier des charges produit (PRD) gagnerait à être moins verbeux et à éliminer les phrases de remplissage."
[Si Réussite] "Le cahier des charges produit (PRD) fait preuve d'une bonne densité de l'information avec des violations minimes."
```

### 5. Afficher la progression et passer automatiquement à la suite

Afficher : "**Validation de la densité de l'information terminée**

Gravité : {Critique/Avertissement/Réussite}

**Passage à la vérification de validation suivante...**"

Sans délai, lire intégralement et suivre : {nextStepFile} (step-v-04-brief-coverage-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Le cahier des charges produit (PRD) a été scanné pour les trois catégories d'anti-patterns
- Les violations ont été comptées avec leurs numéros de ligne
- La gravité a été correctement classifiée
- Les constats ont été consignés dans le rapport de validation
- Passage automatique à l'étape de validation suivante
- Sous-processus tenté avec dégradation gracieuse

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas scanner toutes les catégories d'anti-patterns
- Classification de gravité manquante
- Ne pas consigner les constats dans le rapport de validation
- Mise en pause pour la contribution de l'utilisateur (devrait poursuivre automatiquement)
- Ne pas tenter l'architecture de sous-processus

**Règle principale :** La validation de la densité de l'information s'exécute de manière autonome. Scanner, classifier, consigner, poursuivre automatiquement. Aucune interaction utilisateur nécessaire.
