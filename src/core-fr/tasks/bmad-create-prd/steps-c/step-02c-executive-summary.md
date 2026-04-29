# Étape 2c : Génération du Résumé Exécutif (Executive Summary)

**Progression : Étape 2c sur 13** - Suivante : Critères de Succès (Success Criteria)

## OBJECTIF DE L'ÉTAPE :

Générer le contenu du Résumé Exécutif en utilisant les idées tirées de la classification (étape 2) et de la découverte de la vision (étape 2b), puis l'ajouter au document PRD.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- 📖 CRITIQUE : Lisez le fichier d'étape complet avant d'entreprendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu
- ✅ ABORDEZ TOUJOURS cela comme une découverte collaborative entre pairs PM
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `communication_language` configurée.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout contenu d'artefact et de document dans la `document_output_language`.

### Renforcement du Rôle :

- ✅ Vous êtes un facilitateur PM (Product Manager) orienté produit collaborant avec un pair expert
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans un modèle commande-réponse
- ✅ Le contenu est rédigé de manière collaborative — présentez-le pour révision avant de le sauvegarder

### Règles Spécifiques à l'Étape :

- 🎯 Générez le contenu du Résumé Exécutif sur la base des riches connaissances découvertes
- 💬 Présentez le brouillon de contenu à l'utilisateur pour révision et affinement avant de l'ajouter
- 🚫 INTERDICTION absolue d'ajouter du contenu sans l'approbation de l'utilisateur via 'C'
- 🎯 Le contenu doit être dense, précis et sans aucun remplissage superflu (normes de qualité d'un PRD)

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant d'entreprendre toute action
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu du résumé exécutif
- 💾 Sauvegardez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant le nom de cette étape à la fin de la liste `stepsCompleted`
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'a pas été sélectionné

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes 1, 2 et 2b sont disponibles
- La classification du projet établie à l'étape 2 existe (type de projet, domaine, complexité, contexte)
- La vision et le trait différenciateur établis à l'étape 2b existent
- Les documents d'entrée de l'étape 1 sont disponibles (product briefs, recherche, brainstorming, docs du projet)
- Cette étape génère et ajoute le premier contenu substantiel au sein du PRD

## VOTRE TÂCHE :

Rédiger la section Résumé Exécutif (Executive Summary) en regroupant toutes les informations partagées, la présenter à l'utilisateur pour examen (review), puis - après approbation de sa part - l'ajouter scrupuleusement au document PRD.

## SÉQUENCE DE GÉNÉRATION DU RÉSUMÉ EXÉCUTIF :

### 1. Synthétiser le Contexte Disponible

Examinez tout le contexte disponible avant la rédaction :
- La Classification (étape 2) : type de projet, domaine, complexité, contexte (greenfield/brownfield)
- La vision conceptuelle et le différenciateur clé (étape 2b) : ce qui fait la différence, l'insight fondamental
- Les documents de référence initiaux (product briefs, recherche, brainstorming, docs de l'architecture/du projet)

### 2. Rédiger le Contenu du Résumé Exécutif

Préparez la rubrique du Résumé Exécutif en la calquant strictement sur l'architecture ci-dessous. Appliquez les normes de qualité d'un PRD :
- Densité d'informations élevée — chaque phrase pèse son poids
- Zéro remplissage (fluff) — ni circonlocutions, ni verbiage sans fond
- Précision et aspect exploitable (actionable) — des déclarations brutes et non équivoques
- Optimisation double horizon (Humain + IA) — assimilable visuellement et formaté mécaniquement pour d'autres LLMs

### 3. Présenter le Brouillon pour Examen (Review)

Restituez l'esquisse de cette rédaction à l'entité humaine :

"Voici l'ébauche de Résumé Exécutif dressée conjointement d'après de nos phases de découverte. Pouvez-vous avaliser cela et/ou me signifier les modifications incontournables ?"

Exposez la totalité de cette tranche en observant rigoureusement l'arborescence requise dans le modèle "Structure du Contenu" (Content Structure) positionné un peu plus bas.

Autorisez formellement l'utilisateur à :
- Réclamer des amendements dans toute sous-section
- Rajouter des données oubliées
- Lisser ou durcir le registre sémantique / les points de focalisation
- Donner son approbation pure et simple

### N. Présenter les OPTIONS DU MENU

Dévoilez le contenu du résumé exécutif pour sa propre relecture, puis affichez le menu de pied de page :

"Voilà votre Résumé Exécutif couché sur le papier en pré-version PRD. Inspectez-le méticuleusement et décidez de la suite."

Affichez : "**Sélectionnez :** [A] Élicitation Avancée (Advanced Elicitation) [P] Mode Party (Party Mode) [C] Continuer vers les Critères de Succès (Étape 3 sur 13)"

#### Logique de Gestion du Menu :
- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel du résumé exécutif, traitez le contenu enrichi qui en revient, demandez à l'utilisateur s'il accepte les améliorations ; si oui, mettez à jour le contenu puis réaffichez le menu, si non, conservez le contenu d'origine puis réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` avec le contenu actuel du résumé exécutif, traitez les améliorations collaboratives, demandez à l'utilisateur s'il accepte les changements ; si oui, mettez à jour le contenu puis réaffichez le menu, si non, conservez le contenu d'origine puis réaffichez le menu.
- SI C : Ajoutez (append) le contenu final à `{outputFile}`, mettez à jour le frontmatter en ajoutant le nom de cette étape à la fin du tableau `stepsCompleted`, puis lisez intégralement et suivez : `./step-03-success.md`
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :
- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- Après l'exécution d'autres options du menu, retournez à ce menu

## AJOUTER AU DOCUMENT (APPEND) :

Lorsque l'utilisateur sélectionne 'C', ajoutez (append) la structure de contenu suivante rattachée directement à la suite du document :

```markdown
## Résumé Exécutif (Executive Summary)

{vision_alignment_content}

### Ce Qui Rend Ce Produit Spécial

{product_differentiator_content}

## Classification du Projet

{project_classification_content}
```

Où :
- `{vision_alignment_content}` — La vision d'ensemble, le public ciblé et la problématique à résoudre. Résumé dense et sans appel extrait de la découverte visionnaire de la phase 2b.
- `{product_differentiator_content}` — Les atouts irrésistibles, cette perspicacité (core insight) unique qui repousse la concurrence (hérité de la phase 2b).
- `{project_classification_content}` — Catégorie de la base du projet, son secteur métier/domaine, la matrice de complexité et de contextualisation (greenfield/brownfield). Recueilli à l'étape 2.

## NOTE CRITIQUE DE FIN D'ÉTAPE

UNIQUEMENT LORSQUE [l'option de continuation C] est sélectionnée et que [le contenu a été ajouté au document], vous lirez alors intégralement et suivrez : `./step-03-success.md` pour définir les critères de réussite.

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC DU SYSTÈME

### ✅ SUCCÈS :

- Résumé Exécutif ébauché à l'aide des connaissances des étapes 2 et 2b
- Ce dit contenu fait honneur aux standards d'un authentique PRD (dense, précis, zero-fluff)
- Le brouillon est soumis à la révision humaine de validation avant sauvegarde
- L’utilisateur a l'opportunité de parfaire le contenu
- Le contenu est ajouté au document uniquement sous l'ordre express 'C' !
- L'encart-menu A/P/C a été généré et suivi fidèlement
- Le frontmatter `stepsCompleted` est mis à jour suite au choix 'C'

### ❌ ÉCHEC DU SYSTÈME :

- Générer tout contenu sans absorber initialement les découvertes classifiées et visionnaires
- Ajouter illégalement le texte dans le document sans le sésame 'C' humain expressément cliqué !
- Produire un texte vague, du remplissage ou à faible densité d'informations
- Court-circuiter l'étape de relecture du brouillon
- Ne pas présenter le menu A/P/C
- Passer directement à l'étape suivante sans ajouter le contenu au document

❌ **CRITIQUE** : Ne lire qu'une partie du fichier d'étape - cela conduit à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Poursuivre avec 'C' sans avoir lu intégralement et compris le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

**Règle Principale :** Générez le Résumé Exécutif de haute qualité depuis le substrat de connaissances pures glanées précédemment. Exposez à la révision d'ensemble, et ne sauvegardez l'ultime relique qu'une fois cet avis de validation solennel humain acquitté. Il concrétise le premier contenu substantiel du PRD ; il fixe la barre de qualité pour tout ce qui suit.
