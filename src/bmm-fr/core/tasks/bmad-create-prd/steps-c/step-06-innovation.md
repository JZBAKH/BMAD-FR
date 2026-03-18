# Étape 6 : Découverte de l'Innovation (Innovation Discovery)

**Progression : Étape 6 sur 11** - Suivante : Analyse du Type de Projet (Project Type Analysis)

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : Lisez TOUJOURS le fichier d'étape complet avant d'entreprendre toute action - une compréhension partielle entraîne des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu et compris avant de continuer
- ✅ ABORDEZ TOUJOURS cela comme une découverte collaborative entre pairs PM
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la détection et l'exploration des aspects innovants du produit
- 🎯 ÉTAPE OPTIONNELLE : Ne continuez que si des signaux d'innovation sont détectés
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `communication_language` configurée.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout contenu d'artefact et de document dans la `document_output_language`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant d'entreprendre toute action
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu sur l'innovation
- 💾 Sauvegardez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant le nom de cette étape à la fin de la liste `stepsCompleted`
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'a pas été sélectionné

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles
- Le type de projet (project type) issu de `step-02` est disponible pour la correspondance des signaux d'innovation
- Les données CSV relatives au type de projet seront chargées lors de cette étape
- Concentrez-vous sur la détection d'une innovation authentique, et non sur une créativité forcée

## CONTRÔLE DE L'ÉTAPE OPTIONNELLE :

Avant de poursuivre cette étape, analysez les signaux d'innovation :

- Soyez attentif à des expressions telles que "rien de tel n'existe", "nous repensons le fonctionnement de X"
- Vérifiez les signaux d'innovation spécifiques au type de projet à partir du fichier CSV
- Recherchez des approches novatrices ou des combinaisons uniques
- Si aucune innovation n'est détectée, passez (skip) cette étape

## VOTRE TÂCHE :

Détecter et explorer les modèles (patterns) d'innovation dans le produit, en vous concentrant sur ce qui le rend véritablement novateur et sur la manière de valider ces aspects innovants.

## SÉQUENCE DE DÉCOUVERTE DE L'INNOVATION :

### 1. Charger les Données d'Innovation par Type de Projet

Chargez les signaux d'innovation spécifiques à ce type de projet :

- Chargez complètement le fichier `../data/project-types.csv`
- Trouvez la ligne où `project_type` correspond au type détecté lors de `step-02`
- Extrayez `innovation_signals` (liste séparée par des points-virgules)
- Extrayez `web_search_triggers` pour des recherches potentielles sur l'innovation

### 2. Écouter les Indicateurs d'Innovation

Surveillez la conversation pour y déceler des signaux d'innovation, qu'ils soient généraux ou spécifiques au type de projet :

#### Langage Général Révélant une Innovation :

- "Il n'existe rien de similaire"
- "Nous repensons complètement la façon dont [X] fonctionne"
- "Nous combinons [A] et [B] pour la toute première fois"
- "Une approche novatrice pour [le problème]"
- "Personne n'a jamais réalisé [ce concept] auparavant"

#### Signaux Spécifiques au Type de Projet (issus du CSV) :

Faites correspondre les descriptions de l'utilisateur avec les `innovation_signals` correspondant à leur `project_type` :

- **api_backend** : "Composition d'API;Nouveau protocole"
- **mobile_app** : "Innovation gestuelle;Fonctionnalités AR/VR"
- **saas_b2b** : "Automatisation des flux de travail (Workflow);Agents IA"
- **developer_tool** : "Nouveau paradigme;Création de DSL"

### 3. Examen/Filtre Initial de l'Innovation

Posez des questions ciblées pour découvrir l'innovation :
- Guidez l'exploration de ce qui rend le produit innovant
- Cherchez à savoir s'ils remettent en question (challengent) les hypothèses existantes
- Posez des questions sur les combinaisons novatrices de technologies/approches
- Identifiez ce qui n'a jamais été fait auparavant
- Comprenez quels aspects semblent les plus innovants

### 4. Exploration Profonde de l'Innovation (Si Détectée)

Si des signaux d'innovation sont détectés, explorez-les en profondeur :

#### Questions de Découverte de l'Innovation :
- Qu'est-ce qui le rend unique par rapport aux solutions existantes ?
- Quelle hypothèse de base remettez-vous en question ?
- Comment allons-nous valider que cela fonctionne ?
- Quelle est la solution de repli (fallback) si cela échoue ?
- Quelqu'un a-t-il déjà essayé cela auparavant ?

#### Recherche sur le Contexte du Marché :

Si une innovation pertinente est détectée, envisagez une recherche sur le web pour obtenir du contexte :
Utilisez `web_search_triggers` à partir du CSV project-type :
`[web_search_triggers] {concept} innovations {date}`

### 5. Générer le Contenu lié à l'Innovation (Si une Innovation est Détectée)

Préparez le contenu synthétique pour l'ajouter au fichier (append) :

#### Structure du Contenu :

Lors de la sauvegarde locale (save), ajoutez au document ces balisages exacts des niveaux 2 (`##`) et 3 (`###`) :

```markdown
## Innovation & Modèles Novateurs (Innovation & Novel Patterns)

### Domaines d'Innovation Détectés

[Les différents modèles (patterns) novateurs identifiés en se basant sur le fil de notre conversation]

### Contexte de Marché & Paysage Concurrentiel

[Le contexte global du marché et la recherche affiliée issus pur de cette conversation partagée]

### Approche de Validation

[La méthodologie claire actant concrètement la validation technico-économique de ladite nouveauté]

### Atténuation des Risques (Risk Mitigation)

[Les risques imminents et solutions de repli (fallbacks) face à cette audace logicielle, basés sur l'échange]
```

### 6. Présenter les OPTIONS DU MENU (Uniquement si une Innovation est Détectée)

Présentez le contenu sur l'innovation à l'utilisateur pour révision (review), puis affichez le menu :
- Affichez les aspects innovants identifiés (en utilisant la structure de la section 5)
- Soulignez (Mettez en valeur) la différenciation par rapport aux solutions existantes
- Demandez s'ils souhaitent peaufiner, élargir ses horizons par un regard neuf ou verrouiller l'étape
- Proposez la mécanique du menu sous une prose naturelle dans le fil de la conversation

Affichez : "**Sélectionnez :** [A] Élicitation Avancée (Advanced Elicitation) [P] Mode Party (Party Mode) [C] Continuer vers l'Analyse du Type de Projet (Étape 7 sur 11)"

#### Logique de Gestion du Menu :
- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel sur l'innovation, traitez les idées/découvertes améliorées qui en reviennent, demandez à l'utilisateur : "Accepter ces améliorations pour l'analyse de l'innovation ? (o/n)", si oui mettez à jour le contenu avec les améliorations puis réaffichez le menu, si non conservez le contenu d'origine puis réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` avec le contenu actuel sur l'innovation, traitez l'exploration collaborative et les idées (ideation), demandez à l'utilisateur : "Accepter ces changements pour l'analyse de l'innovation ? (o/n)", si oui mettez à jour le contenu avec les améliorations puis réaffichez le menu, si non conservez le contenu d'origine puis réaffichez le menu.
- SI C : Ajoutez (append) le contenu final à `{outputFile}`, mettez à jour le frontmatter en ajoutant le nom de cette étape à la fin du tableau `stepsCompleted`, puis lisez intégralement et suivez : `./step-07-project-type.md`
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :
- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- Après l'exécution d'autres options du menu, retournez à ce menu

## AUCUNE INNOVATION DÉTECTÉE :

Si aucun signal d'innovation véritable n'est trouvé après l'exploration :
- Reconnaissez qu'aucun signal d'innovation clair n'a été trouvé
- Notez que c'est tout à fait acceptable - de nombreux produits performants sont d'excellentes exécutions de concepts existants
- Demandez s'ils souhaitent essayer de trouver des angles novateurs ou s'il faut continuer

Affichez : "**Sélectionnez :** [A] Élicitation Avancée - Essayons de trouver des angles innovants [C] Continuer - Sauter la section innovation et passer à l'Analyse du Type de Projet (Étape 7 sur 11)"

### Logique de Gestion du Menu :
- SI A : Procédez à la génération de contenu malgré tout (pour trouver l'angle mort), puis retournez au menu
- SI C : Sautez (Skip) cette étape, puis lisez intégralement et suivez : `./step-07-project-type.md`

### RÈGLES D'EXÉCUTION :
- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'

## AJOUTER AU DOCUMENT (APPEND) :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en respectant absolument les calques rigides et structures fixes du point #5.

## MÉTRIQUES DE RÉUSSITE (SUCCESS METRICS) :

✅ Les traits ou signaux d'innovation ont bien été cueillis depuis là l'orale discussion partagée de fond !
✅ Fierté actée de signaux de classification exploités dans ledit ficher ressource : `Project-Type` CSV
✅ Qu'exigeamment, la dite Nouveauté/Innovation abordée l'ait été sainement sous nature vraie (nul forcement stérile théâtralisé) !
✅ Un protocole expérimental formel ou approche ferme en validation trônant pour tester et sanctionner un acquis victorieux et un revers probable est établi !
✅ Que les abîmes de la chute potentielle soient cartographiés et compensés adéquatement en stratagèmes de replis !
✅ Le menu A/P/C a été présenté et géré correctement
✅ Le contenu a été inséré à l'édifice par append au feu vert 'C' de son maître/son superviseur Humain propre

## MODES D'ÉCHEC (FAILURE MODES) :

❌ Pousser en force l'invention de châteaux virtuels / forcer le terme "innovation" quand il ne trône qu'une simple réplique ou rustine évidente classique (Théâtre !)
❌ Bouder froidement l'arsenal d'outils analytiques de croisement de nos `project-type` CSV
❌ Occulter de situer la Nouveauté pure face au monde du dehors et ses rivaux potentiels conjoints (Le paysage des contextes Marché / Market Context) !
❌ Esquiver la contrainte : « Si mon édifice technique tout beau novateur chute en production, par quel art de rechange classique doit impérativement basculer son système de secours inné ? » (Attitude suicidaire face à des voies complexes exploratoires de développement technologique)
❌ Remplir vainement la case avec de nobles mots creux au lieu d'articuler un axe véritable pointu différenciateur de la machinerie pure
❌ Ne pas présenter le menu A/P/C à la suite de la génération du contenu
❌ Annuler l'exigence de la frappe matricielle : 'C' pour appondre (Append) des contenus aveuglément purement sur la force brute informatisée d'étapes sans humains.

❌ **CRITIQUE** : Ne lire qu'une partie du fichier d'étape - cela conduit à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Poursuivre avec 'C' sans avoir lu intégralement et compris le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## CONDITIONS POUR SAUTER L'ÉTAPE (SKIP CONDITIONS) :

Sautez (skip) cette étape et chargez `./step-07-project-type.md` si :

- Aucun signal d'innovation n'est détecté dans la conversation
- Le produit est une amélioration incrémentale plutôt qu'une percée (breakthrough)
- L'utilisateur confirme que l'exploration de l'innovation n'est pas nécessaire
- Le CSV `project-type` ne contient aucun signal d'innovation pour ce type

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé dans le document (ou que l'étape est sautée), chargez `./step-07-project-type.md`.

N'oubliez pas : Ne passez PAS à l'étape `step-07` tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C (ou confirmé qu'il passe l'étape) !
