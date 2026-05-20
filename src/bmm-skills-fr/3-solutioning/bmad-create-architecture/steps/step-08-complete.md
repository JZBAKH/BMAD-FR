# Étape 8 : Finalisation de l'architecture et transmission

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans intervention de l'utilisateur

- 📖 CRITIQUE : TOUJOURS lire le fichier d'étape complet avant toute action — une compréhension partielle conduit à des décisions incomplètes
- ✅ TOUJOURS traiter cela comme une finalisation collaborative entre pairs architecturaux
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la réussite de la finalisation du workflow et la transmission de l'implémentation
- 🎯 FOURNISSEZ des prochaines étapes claires pour la phase d'implémentation
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE selon le style de communication de votre Agent avec la config `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Présentez votre analyse avant toute action
- 🎯 Présentez le résumé de finalisation et les conseils d'implémentation
- 📖 Mettez à jour le frontmatter avec l'état final du workflow
- 🚫 CECI EST L'ÉTAPE FINALE DE CE WORKFLOW

## VOTRE TÂCHE :

Finalisez le workflow d'architecture, fournissez un résumé exhaustif de finalisation, et guidez l'utilisateur vers la phase suivante du développement de son projet.

## SÉQUENCE DE FINALISATION :

### 1. Féliciter l'utilisateur pour la finalisation

Vous et l'utilisateur avez accompli quelque chose de remarquable ici — donnez un résumé de ce que vous avez réalisé ensemble et félicitez vraiment l'utilisateur pour le travail bien fait.

### 2. Mettre à jour le frontmatter du document créé

```yaml
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '{{current_date}}'
```

### 3. Conseils sur les prochaines étapes

Architecture terminée. Invoquez le skill `bmad-help`.

À la finalisation de la sortie de la tâche : proposez de répondre à toute question sur le Document d'architecture.

## INDICATEURS DE RÉUSSITE :

✅ Document d'architecture complet livré avec toutes les sections
✅ Toutes les décisions architecturales documentées et validées
✅ Patterns d'implémentation et règles de cohérence finalisés
✅ Structure du projet complète avec tous les fichiers et répertoires
✅ Utilisateur muni de prochaines étapes claires et de conseils d'implémentation
✅ Statut du workflow correctement mis à jour
✅ Collaboration avec l'utilisateur maintenue tout au long du processus de finalisation

## MODES D'ÉCHEC :

❌ Ne pas fournir de conseils d'implémentation clairs
❌ Validation finale manquante de la complétude du document
❌ Ne pas mettre à jour le statut du workflow correctement
❌ Échouer à célébrer la finalisation réussie
❌ Ne pas fournir de prochaines étapes spécifiques pour l'utilisateur
❌ Précipiter la finalisation sans résumé adéquat

❌ **CRITIQUE** : Lire seulement partiellement le fichier d'étape — conduit à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans compréhension complète des exigences et protocoles de l'étape

## WORKFLOW TERMINÉ :

C'est l'étape finale du workflow Architecture. L'utilisateur dispose désormais d'un document d'architecture complet et validé, prêt pour l'implémentation par l'agent IA.

L'architecture servira de source unique de vérité pour toutes les décisions techniques, garantissant une implémentation cohérente sur l'ensemble du cycle de développement du projet.

## À la finalisation

Exécutez : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu est non vide, suivez-le comme instruction terminale finale avant de quitter.
