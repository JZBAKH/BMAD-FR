---
outputFile: '{planning_artifacts}/implementation-readiness-report-{{date}}.md'
---

# Étape 6 : Évaluation finale

## OBJECTIF DE L'ÉTAPE :

Fournir un résumé exhaustif de toutes les conclusions et donner au rapport une finition finale, en assurant des recommandations claires et un statut de préparation global.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans entrée utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant toute action
- 📖 Vous êtes à l'étape finale - compléter l'évaluation
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`

### Renforcement du rôle :

- ✅ Vous livrez l'ÉVALUATION FINALE
- ✅ Vos conclusions sont objectives et soutenues par des preuves
- ✅ Fournir des recommandations claires et actionnables
- ✅ Le succès est mesuré par la valeur des conclusions

### Règles spécifiques à l'étape :

- 🎯 Compiler et résumer toutes les conclusions
- 🚫 Ne pas adoucir le message - être direct
- 💬 Fournir des exemples spécifiques pour les problèmes
- 🚪 Ajouter la section finale au rapport

## PROTOCOLES D'EXÉCUTION :

- 🎯 Examiner toutes les conclusions des étapes précédentes
- 💾 Ajouter le résumé et les recommandations
- 📖 Déterminer le statut global de préparation
- 🚫 Compléter et présenter le rapport final

## PROCESSUS D'ÉVALUATION FINALE :

### 1. Initialiser l'évaluation finale

« Achèvement de l'**Évaluation finale**.

Je vais maintenant :

1. Examiner toutes les conclusions des étapes précédentes
2. Fournir un résumé exhaustif
3. Ajouter des recommandations spécifiques
4. Déterminer le statut global de préparation »

### 2. Examiner les conclusions précédentes

Vérifier le {outputFile} pour les sections ajoutées par les étapes précédentes :

- Conclusions de validation des fichiers et EFs
- Problèmes d'alignement UX
- Violations de qualité des thèmes

### 3. Ajouter la section d'évaluation finale

Ajouter au {outputFile} :

```markdown
## Résumé et recommandations

### Statut global de préparation

[PRÊT/NÉCESSITE DU TRAVAIL/PAS PRÊT]

### Problèmes critiques nécessitant une action immédiate

[Lister les problèmes les plus critiques qui doivent être adressés]

### Étapes suivantes recommandées

1. [Élément d'action spécifique 1]
2. [Élément d'action spécifique 2]
3. [Élément d'action spécifique 3]

### Note finale

Cette évaluation a identifié [X] problèmes à travers [Y] catégories. Adressez les problèmes critiques avant de procéder à l'implémentation. Ces conclusions peuvent être utilisées pour améliorer les artefacts ou vous pouvez choisir de procéder en l'état.
```

### 4. Compléter le rapport

- S'assurer que toutes les conclusions sont clairement documentées
- Vérifier que les recommandations sont actionnables
- Ajouter la date et les informations de l'évaluateur
- Sauvegarder le rapport final

### 5. Présenter l'achèvement

Afficher :
« **Évaluation de la préparation à l'implémentation complète**

Rapport généré : {outputFile}

L'évaluation a trouvé [number] problèmes nécessitant attention. Examinez le rapport détaillé pour les conclusions et recommandations spécifiques. »

## WORKFLOW COMPLET

Le workflow de préparation à l'implémentation est maintenant complet. Le rapport contient toutes les conclusions et recommandations à considérer par l'utilisateur.

Préparation à l'implémentation complète. Invoquer le skill `bmad-help`.

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC SYSTÈME

### ✅ SUCCÈS :

- Toutes les conclusions compilées et résumées
- Recommandations claires fournies
- Statut de préparation déterminé
- Rapport final sauvegardé

### ❌ ÉCHEC SYSTÈME :

- Ne pas examiner les conclusions précédentes
- Résumé incomplet
- Pas de recommandations claires

## À l'achèvement

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu n'est pas vide, le suivre comme instruction terminale finale avant de sortir.
