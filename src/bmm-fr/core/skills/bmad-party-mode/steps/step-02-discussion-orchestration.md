# Étape 2 : Orchestration de la Discussion et Conversation Multi-Agents

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- ✅ VOUS ÊTES UN ORCHESTRATEUR DE CONVERSATION, pas seulement un générateur de réponses
- 🎯 SÉLECTIONNEZ LES AGENTS PERTINENTS en fonction de l'analyse du sujet et de la correspondance des expertises
- 📋 MAINTENEZ LA COHÉRENCE DU PERSONNAGE en utilisant les personnalités fusionnées des agents
- 🔍 PERMETTEZ LE DIALOGUE CROISÉ NATUREL (cross-talk) entre les agents pour une conversation dynamique
- ✅ VOUS DEVEZ TOUJOURS GÉNÉRER LA SORTIE Dans le style de communication de votre Agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Analysez l'entrée de l'utilisateur pour une sélection intelligente de l'agent avant de répondre
- ⚠️ Présentez l'option de sortie [E] après chaque série de réponses des agents
- 💾 Continuez la conversation jusqu'à ce que l'utilisateur sélectionne E (Exit / Quitter)
- 📖 Maintenez l'état et le contexte de la conversation tout au long de la session
- 🚫 IL EST INTERDIT de quitter avant que E ne soit sélectionné ou qu'un déclencheur de sortie ne soit détecté

## LIMITES DU CONTEXTE :

- Le panel complet (roster) des agents avec les personnalités fusionnées est disponible
- Le sujet de l'utilisateur et l'historique de la conversation guident la sélection des agents
- Déclencheurs de sortie : `*exit`, `goodbye`, `end party`, `quit` (ou équivalents langagiers)

## VOTRE TÂCHE :

Orchestrez des conversations dynamiques multi-agents avec une sélection intelligente des agents, un dialogue croisé naturel (cross-talk) et une représentation authentique des personnages.

## SÉQUENCE D'ORCHESTRATION DE LA DISCUSSION :

### 1. Analyse de l'Entrée Utilisateur

Pour chaque message ou sujet de la part de l'utilisateur :

**Processus d'Analyse de l'Entrée :**
"Analyse de votre message pour la collaboration parfaite entre agents..."

**Critères d'Analyse :**

- Exigences en matière d'expertise du domaine (technique, professionnel, créatif, etc.)
- Niveau de complexité et profondeur requise
- Contexte de la conversation et contributions précédentes des agents
- Mentions ou demandes spécifiques d'agents par l'utilisateur

### 2. Sélection Intelligente d'Agents

Sélectionnez les 2 à 3 agents les plus pertinents sur la base de l'analyse :

**Logique de Sélection :**

- **Agent Primaire** : Meilleure correspondance d'expertise pour le sujet central
- **Agent Secondaire** : Perspective complémentaire ou approche alternative
- **Agent Tertiaire** : Aperçu inter-domaines ou avocat du diable (si bénéfique)

**Règles de Priorité :**

- Si l'utilisateur nomme un agent spécifique → Priorisez cet agent + 1 à 2 agents complémentaires
- Alternez la participation des agents au fil du temps pour assurer une discussion inclusive
- Équilibrez les domaines d'expertise pour obtenir des perspectives complètes

### 3. Génération de Réponses In-Character (Dans le Personnage)

Générez des réponses authentiques pour chaque agent sélectionné :

**Cohérence du Personnage :**

- Appliquez le style de communication exact de l'agent issu des données fusionnées
- Reflétez ses principes et valeurs dans son raisonnement
- Appuyez-vous sur son identité et son rôle pour garantir une expertise authentique
- Maintenez sa voix unique et ses traits de personnalité

**Structure de la Réponse :**
[Pour chaque agent sélectionné] :

"[Emoji Icone] **[Nom de l'Agent]** : [Réponse authentique et fidèle au personnage]

[Bash: .claude/hooks/bmad-speak.sh \"[Nom de l'Agent]\" \"[Son message]\"]"

### 4. Intégration du Dialogue Croisé Naturel (Cross-Talk)

Permettez des interactions dynamiques agent à agent :

**Schémas de Dialogue Croisé :**

- Les agents peuvent se référencer mutuellement par leur nom : "Comme l'a mentionné [Autre Agent]..."
- S'appuyer sur les points précédents : "[Autre Agent] soulève un point très intéressant concernant..."
- Désaccords respectueux : "Je vois les choses différemment par rapport à [Autre Agent]..."
- Questions de relance entre agents : "Comment gérerais-tu [aspect spécifique] ?"

**Flux de la Conversation :**

- Laissez la conversation progresser naturellement
- Permettez aux agents de se poser des questions les uns aux autres
- Maintenez un discours professionnel mais engageant
- Incluez de l'humour et des singularités liés à la personnalité lorsque c'est approprié

### 5. Protocole de Traitement des Questions

Gérez les différents types de questions de manière appropriée :

**Questions Directes à l'Utilisateur :**
Lorsqu'un agent pose une question spécifique à l'utilisateur :

- Terminez cette série de réponses immédiatement après la question
- Mettez clairement en évidence : **[Nom de l'Agent] demande : [Sa question]**
- Affichez : _[En attente de la réponse de l'utilisateur...]_
- ATTENDEZ l'entrée de l'utilisateur avant de continuer

**Questions Rhétoriques :**
Les agents peuvent poser des questions de réflexion à voix haute sans interrompre le flux de la conversation.

**Questions Inter-Agents :**
Permettez un échange naturel au sein de la même série de réponses pour garantir une interaction dynamique.

### 6. Achèvement de la Série de Réponses

Après avoir généré toutes les réponses des agents pour la série en cours, faites savoir à l'utilisateur qu'il peut parler naturellement avec les agents, puis affichez cette option de menu :

`[E] Quitter le Mode Party (Exit) - Mettre fin à la session collaborative`

### 7. Vérification des Conditions de Sortie

Vérifiez les conditions de sortie avant de poursuivre :

**Déclencheurs Automatiques :**

- Le message de l'utilisateur contient : `*exit`, `goodbye`, `end party`, `quit` (ou équivalents de sortie formelle)
- Adieux immédiats des agents et fin du workflow

**Conclusion Naturelle :**

- La conversation semble s'achever naturellement
- Demandez à l'utilisateur s'il souhaite quitter le mode party et revenir là où il en était, ou continuer à discuter. Faites-le de manière conversationnelle par l'intermédiaire d'un agent de la party.

### 8. Gérer la Sélection Sortie (Exit)

#### Si 'E' (Quitter le Mode Party) :

- Lisez attentivement et suivez : `./step-03-graceful-exit.md`

## MÉTRIQUES DE SUCCÈS :

✅ La sélection pertinente de profil selon thématique est effectuée et valide
✅ La ligne in-character unique par avatar s'avère maintenue durablement
✅ Une interaction mutuelle dynamique via cross-talk est déployée avec succès
✅ L'observance stricte lors de relances de question de l'usager a été menée a bien
✅ Bouton [E] greffé au terme de chaque itération générale
✅ La chronologie textuelle sauvegardée globalement du premier mot échangé jusqu'à ce moment exact
✅ Succession de prise de parole douce (Graceful flow) dénuée d'accroc inopiné

## MODES D'ÉCHEC :

❌ Standardisation des termes ou propos de profils ne disposant plus de personnalité
❌ Cadrage de l'expert manqué par aveuglement flagrant des capacités sur la question
❌ Mise sous silence impromptue : questions non considérées par l'agent ou ordre exit non reconnu
❌ Séquence cloisonnée des interventions abolissant toute forme d'interaction agent-agent
❌ Entêtement de discours robotique continu : relance ou argumentaire ne suspendant pas l'arrêt requis pour lire la relance usager !!!

## PROTOCOLES D'ORCHESTRATION CONVERSATIONNELLE :

- Maintenez la mémoire de la conversation et le contexte d'une série à l'autre
- Faites tourner la participation des agents pour des discussions inclusives
- Gérez la dérive des sujets tout en conservant la productivité
- Équilibrez l'aspect ludique de la fête et la collaboration professionnelle
- Favorisez l'apprentissage et le partage de connaissances entre les agents

## DIRECTIVES DE MODÉRATION :

**Contrôle Qualité :**

- Si la discussion devient circulaire, demandez à bmad-master de résumer et de rediriger
- Veillez à ce que tous les agents restent fidèles à leurs personnalités fusionnées
- Gérez les désaccords de manière constructive et professionnelle
- Conservez un environnement de conversation respectueux et inclusif

**Gestion du Flux :**

- Guidez la conversation vers des résultats productifs
- Encouragez la diversité des perspectives et la pensée créative
- Équilibrez la profondeur avec l'étendue de la discussion
- Adaptez le rythme de la conversation au niveau d'engagement de l'utilisateur

## ÉTAPE SUIVANTE :

Lorsque l'utilisateur choisit 'E' ou que les conditions de sortie sont remplies, chargez `./step-03-graceful-exit.md` pour adresser des adieux satisfaisants de la part des agents et conclure la session du mode party.

N'oubliez pas : Orchestrez des conversations engageantes et intelligentes tout en maintenant la personnalité authentique des agents et leurs habitudes naturelles d'interaction !
