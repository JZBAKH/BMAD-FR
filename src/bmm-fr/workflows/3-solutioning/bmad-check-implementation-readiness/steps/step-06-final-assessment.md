---
outputFile: '{planning_artifacts}/implementation-readiness-report-{{date}}.md'
---

# Étape 6 : Évaluation finale

## OBJECTIF DE L'ÉTAPE :

Fournir un résumé complet de tous les résultats et apporter une dernière touche au rapport, en garantissant des recommandations claires et un état de préparation global.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre toute action.
- 📖 Vous êtes à la dernière étape — terminez l'évaluation.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous livrez l'ÉVALUATION FINALE.
- ✅ Vos conclusions sont objectives et étayées par des preuves.
- ✅ Fournissez des recommandations claires et exploitables.
- ✅ Le succès se mesure à la valeur ajoutée des conclusions.

### Règles Spécifiques à l'Étape :

- 🎯 Compiler et résumer tous les résultats.
- 🚫 Ne pas adoucir le message — soyez direct.
- 💬 Fournir des exemples spécifiques pour chaque problème.
- 🚪 Ajouter la section finale au rapport.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Examiner tous les résultats des étapes précédentes.
- 💾 Ajouter le résumé et les recommandations.
- 📖 Déterminer l'état de préparation global (Readiness status).
- 🚫 Terminer et présenter le rapport final.

## PROCESSUS D'ÉVALUATION FINALE :

### 1. Initialiser l'Évaluation Finale

"Finalisation de l'**Évaluation finale**.

Je vais maintenant :

1. Examiner tous les résultats des étapes précédentes.
2. Fournir un résumé complet.
3. Ajouter des recommandations spécifiques.
4. Déterminer l'état de préparation global."

### 2. Examiner les Résultats Précédents

Vérifier dans {outputFile} les sections ajoutées par les étapes précédentes :

- Résultats de la validation des fichiers et des FR.
- Problèmes d'alignement UX.
- Violations de la qualité des Epics.

### 3. Ajouter la Section d'Évaluation Finale

Ajouter à {outputFile} :

```markdown
## Résumé et recommandations

### État de préparation global (Overall Readiness Status)

[PRÊT / NÉCESSITE DU TRAVAIL / NON PRÊT]

### Problèmes critiques nécessitant une action immédiate

[Lister les problèmes les plus critiques qui doivent être résolus]

### Prochaines étapes recommandées

1. [Action spécifique 1]
2. [Action spécifique 2]
3. [Action spécifique 3]

### Note finale

Cette évaluation a identifié [X] problèmes dans [Y] catégories. Traitez les problèmes critiques avant de passer à l'implémentation. Ces conclusions peuvent être utilisées pour améliorer les artefacts, ou vous pouvez choisir de poursuivre en l'état.
```

### 4. Finaliser le Rapport

- S'assurer que tous les résultats sont clairement documentés.
- Vérifier que les recommandations sont exploitables.
- Ajouter la date et les informations de l'évaluateur.
- Sauvegarder le rapport final.

### 5. Présenter la Fin du Travail

Afficher :
"**Évaluation de la préparation à l'implémentation terminée**

Rapport généré : {outputFile}

L'évaluation a révélé [nombre] problèmes nécessitant une attention particulière. Consultez le rapport détaillé pour connaître les conclusions et les recommandations spécifiques."

## WORKFLOW TERMINÉ

Le workflow de préparation à l'implémentation est maintenant terminé. Le rapport contient tous les résultats et recommandations à l'attention de l'utilisateur.

Préparation à l'implémentation terminée. Invoquez le skill `bmad-help`.

---

## 🚨 MESURES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Tous les résultats compilés et résumés.
- Recommandations claires fournies.
- État de préparation déterminé.
- Rapport final sauvegardé.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas examiner les résultats précédents.
- Résumé incomplet.
- Aucune recommandation claire.
