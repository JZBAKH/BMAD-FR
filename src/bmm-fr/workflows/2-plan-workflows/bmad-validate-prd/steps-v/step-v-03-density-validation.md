---
name: 'step-v-03-density-validation'
description: 'Validation de la Densité de l''Information - Scanner à la recherche d''anti-patterns qui violent les principes de densité de l''information'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-04-brief-coverage-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape V-3 : Validation de la Densité de l'Information

## OBJECTIF DE L'ÉTAPE :

Valider que le PRD répond bien aux normes BMAD en matière de densité de l'information en scannant la présence de remplissage conversationnel (conversational filler), de phrases verbeuses (wordy phrases), et d'expressions redondantes qui violent les principes de concision.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans la contribution de l'utilisateur
- 📖 CRITIQUE : Lisez TOUJOURS le fichier d'étape en entier avant d'entreprendre la moindre action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que l'ensemble du fichier est lu et compris
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS EFFECTUER LA SORTIE ORALE dans votre style de communication d'Agent avec la `{communication_language}` configurée

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité
- ✅ Si l'on vous a déjà fourni des modèles de communication ou des personnas, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans une validation systématique, pas un dialogue collaboratif
- ✅ Vous apportez une rigueur analytique et une attention aux détails
- ✅ Cette étape s'exécute de manière autonome - aucune intervention de l'utilisateur n'est requise

### Règles Spécifiques à cette Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur les anti-patterns de densité de l'information
- 🚫 INTERDICTION de corriger les erreurs - ne faites que les signaler
- 💬 Approche : Autonome, scrupuleuse, signalement rigoureux
- 🚪 Cette étape transitera automatiquement vers l'étape suivante une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Scannez le PRD à la recherche de mots superflus (fluff) et de verbiage
- 🎯 Classifiez la gravité (severity) de la densité
- 🎯 Consignez les conclusions dans le rapport de validation
- 💬 Affichez un résumé de la progression à l'utilisateur
- 🎯 Poursuivez automatiquement vers l'étape de validation suivante

## LIMITES DU CONTEXTE :

- Contexte disponible : L'intégralité du PRD et les directives `prd-purpose.md`
- Concentration : Efficacité linguistique et suppression du "bruit"
- Limites : Ne pas valider la qualité de l'architecture ou des fonctionnalités
- Dépendances : Détection du format (Étape v-02) terminée

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence à la lettre. Ne sautez pas, ne réorganisez pas et n'improvisez pas.

### 1. Sous-processus d'Évaluation de la Densité de l'Information

**Si l'outil Tâche (Task tool) est disponible, déléguez ceci à un sous-agent :**

"Exécutez une vérification de la densité de l'information sur le PRD actuel.
Scannez les catégories d'anti-patterns suivantes :

1. **Remplissage Conversationnel (Conversational Filler) :** "Il est important de noter que", "Comme nous pouvons le voir", "Afin de"
2. **Phrases Verbeuses (Wordy Phrases) :** "Le système permettra aux utilisateurs de", "Aura la capacité de"
3. **Expressions Redondantes (Redundant Expressions) :** "Absolument essentiel", "Complètement terminé", "Innovations futures"

Pour chaque catégorie, comptez les occurrences et relevez les pires infractions avec leurs numéros de ligne approximatifs (ou les sections concernées).

Évaluez la gravité globale :
- **Critique (Critical) :** >20 violations ou remplissage généralisé cachant le sens
- **Avertissement (Warning) :** 5-20 violations, principalement un mauvais phrasé
- **Succès (Pass) :** <5 violations, rédaction globalement concise"

### 2. Dégradation Gracieuse (Si l'outil Tâche est indisponible)

Si vous ne pouvez pas utiliser l'outil Tâche, effectuez le scan vous-même de manière silencieuse dans votre fenêtre contextuelle (context window). Parcourez le texte du PRD et identifiez le remplissage, la verbosité et la redondance. Comptez et évaluez la gravité manuellement.

### 3. Mettre à Jour le Rapport de Validation

Ajoutez silencieusement ce qui suit au fichier `{validationReportPath}` :

```markdown
## 3. Validation de la Densité de l'Information
**Statut :** {Critique / Avertissement / Succès}

### Constats sur les Anti-Patterns
- **Remplissage Conversationnel :** {count} occurrences
- **Phrases Verbeuses :** {count} occurrences
- **Expressions Redondantes :** {count} occurrences

### Exemples de Violations (à corriger)
1. {Exemple 1 avec section/ligne}
2. {Exemple 2 avec section/ligne}
3. {Exemple 3 avec section/ligne}
```

### 4. Compiler le Résumé des Constats (Pour l'affichage uniquement, pas besoin de validation de l'utilisateur)

Préparez ce texte pour la console (n'attendez PAS d'action de l'utilisateur) :

```text
**Remplissage Conversationnel :** {count} occurrences
[Si count > 0, listez des exemples avec les numéros de ligne]

**Phrases Verbeuses :** {count} occurrences
[Si count > 0, listez des exemples avec les numéros de ligne]

**Expressions Redondantes :** {count} occurrences
[Si count > 0, listez des exemples avec les numéros de ligne]

**Total des Violations :** {total}

**Évaluation de la Gravité :** [Critique/Avertissement/Succès]

**Recommandation :**
[Si Critique] "Le PRD nécessite une révision importante pour améliorer la densité de l'information. Chaque phrase doit porter son propre poids, sans mots superflus."
[Si Avertissement] "Le PRD gagnerait à être moins verbeux et à éliminer les phrases de remplissage."
[Si Succès] "Le PRD fait preuve d'une bonne densité d'information avec des violations minimes."
```

### 5. Afficher la Progression et Passer Automatiquement à la Suite

Affichez : "**Validation de la Densité de l'Information Terminée**

Gravité : {Critique/Avertissement/Succès}

**Passage à la vérification de validation suivante...**"

Sans délai, lisez entièrement et suivez : `{nextStepFile}` (step-v-04-brief-coverage-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Le PRD a été scanné pour les trois catégories d'anti-patterns
- Les violations ont été comptées avec mention des numéros de ligne (ou sections)
- La gravité a été correctement classifiée
- Les constats ont été consignés dans le rapport de validation
- Le système transite automatiquement vers la prochaine étape de validation
- Le sous-processus a été tenté avec une possibilité de dégradation gracieuse

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas scanner toutes les catégories d'anti-patterns
- Oubli de la classification de la gravité
- Ne pas consigner les constats dans le rapport de validation
- Mise en pause pour une intervention de l'utilisateur (le système DOIT avancer de lui-même)
- Ne pas tenter l'architecture de sous-processus

**Règle Principale :** La validation de la densité de l'information s'exécute de manière autonome. Scannez, classifiez, signalez, poursuivez automatiquement. Aucune intervention de l'utilisateur n'est autorisée.
