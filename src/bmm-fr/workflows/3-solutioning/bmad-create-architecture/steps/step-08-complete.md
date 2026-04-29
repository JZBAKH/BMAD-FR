# Étape 8 : Finalisation du Workflow d'Architecture

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant toute action — une compréhension incomplète mène à une clôture bâclée
- ✅ TOUJOURS traiter cela comme une réussite collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, concluez le partenariat
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse finale du travail accompli
- 💾 Mettre à jour le frontmatter final (statut terminé)
- 🚫 INTERDICTION de continuer vers un autre workflow sans avoir officiellement clos celui-ci

## VOTRE TÂCHE :

Finaliser officiellement le document d'architecture, célébrer le travail accompli avec l'utilisateur et préparer le terrain pour la phase d'implémentation.

## SÉQUENCE DE FINALISATION :

### 1. Synthèse de la Réussite Collaborative

Présentez un résumé chaleureux et professionnel de l'architecture créée :

"Félicitations {{user_name}} ! Nous venons de poser les fondations architecturales de {{project_name}}.

**Ensemble, nous avons :**

- Analysé le contexte et l'échelle du projet
- Sélectionné le starter optimal : {{starter_selection}}
- Pris les décisions technologiques clés ({{tech_summary}})
- Établi les modèles de cohérence pour les agents IA
- Défini une structure de fichiers robuste
- Validé la préparation à l'implémentation"

### 2. Mise à Jour Finale du Frontmatter

Mettez à jour le frontmatter de `{planning_artifacts}/architecture.md` :

- `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- `workflowStatus: 'completed'`
- `completionDate: '{{date}}'`

### 3. Message de Clôture & Guidage

Fournissez des instructions claires pour la suite :

"Votre Document de Décision d'Architecture est maintenant prêt et sauvegardé dans `{planning_artifacts}/architecture.md`.

**Prochaines étapes recommandées :**

1. **Création du Projet** : Exécutez la commande d'initialisation du starter définie à l'étape 3.
2. **Implémentation** : Utilisez `bmad-help` pour explorer les workflows d'implémentation.
3. **Référence** : Gardez ce document à portée de main ; il sera la source de vérité pour tous les agents IA qui travailleront sur le code.

C'était un plaisir de collaborer avec vous sur ce design. Souhaitez-vous que je vous aide sur autre chose, ou préférez-vous lancer l'initialisation du projet ?"

### 4. Transition vers l'Aide Globale

Si l'utilisateur a terminé, suggérez l'utilisation de `bmad-help`.

## INDICATEURS DE RÉUSSITE :

✅ Résumé complet et gratifiant présenté à l'utilisateur
✅ Frontmatter du document mis à jour avec le statut 'completed'
✅ Prochaines étapes de développement clairement énoncées
✅ Transition fluide vers l'implémentation ou l'aide globale

## MODES D'ÉCHEC :

❌ Terminer brusquement sans résumé ni félicitations
❌ Oublier de mettre à jour le statut final dans le frontmatter
❌ Ne pas fournir de directives claires pour la phase d'implémentation
❌ Perdre le lien avec le document d'architecture finalisé

❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions

## FIN DU WORKFLOW

Le workflow `bmad-create-architecture` est maintenant terminé.
