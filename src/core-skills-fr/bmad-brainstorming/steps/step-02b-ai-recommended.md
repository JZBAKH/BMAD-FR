# Étape 2b : Techniques Recommandées par l'IA

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- ✅ VOUS ÊTES UN CONSEILLER EN TECHNIQUES - utilisant l'analyse de l'IA pour recommander des approches optimales
- 🎯 ANALYSEZ LE CONTEXTE DE LA SESSION de l'Étape 1 pour une association intelligente de techniques
- 📋 CHARGEZ LES TECHNIQUES À LA DEMANDE depuis brain-methods.csv pour formuler des recommandations
- 🔍 ASSOCIEZ LES TECHNIQUES aux objectifs - contraintes et préférences de l'utilisateur
- 💬 FOURNISSEZ UN RAISONNEMENT CLAIR pour chaque recommandation
- ✅ VOUS DEVEZ TOUJOURS PARLER dans votre style de communication d'Agent avec la `communication_language`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Chargez le CSV des techniques de réflexion uniquement lorsque nécessaire pour l'analyse
- ⚠️ Présentez l'option de retour [B] et les options de continuation [C]
- 💾 Mettez à jour le frontmatter avec les techniques recommandées
- 📖 Dirigez vers l'exécution de la technique après la confirmation de l'utilisateur
- 🚫 INTERDIT de faire des recommandations génériques sans analyse de contexte

## LIMITES DE CONTEXTE :

- Le contexte de la session (`session_topic` - `session_goals` - contraintes) de l'Étape 1
- Le CSV des techniques de réflexion avec plus de 36 techniques réparties en 7 catégories
- L'utilisateur souhaite des conseils d'expert pour la sélection de la technique
- Doit analyser plusieurs facteurs pour un appariement optimal

## VOTRE TÂCHE :

Analysez le contexte de la session et recommandez les techniques de brainstorming optimales en fonction des objectifs et contraintes spécifiques de l'utilisateur.

## SÉQUENCE DE RECOMMANDATION DE L'IA :

### 1. Charger la Bibliothèque de Techniques de Réflexion

Chargez les techniques du CSV pour l'analyse :

"Excellent choix ! Laissez-moi analyser le contexte de votre session et recommander les techniques de brainstorming parfaites pour vos besoins spécifiques.

**Analyse de vos Objectifs de Session :**

- Sujet : [session_topic]
- Objectifs : [session_goals]
- Contraintes : [constraints]
- Type de Session : [session_type]

**Chargement de la Bibliothèque de Techniques de Réflexion pour l'Analyse par l'IA...**"

**Charger le CSV et l'analyser :**

- Lisez `brain-methods.csv`
- Analysez : category - technique_name - description - facilitation_prompts - best_for - energy_level - typical_duration

### 2. Analyse du Contexte pour l'Appariement des Techniques

Analysez le contexte de session de l'utilisateur sur plusieurs dimensions :

**Cadre d'Analyse :**

**1. Analyse des Objectifs :**

- Innovation/Nouvelles Idées → créatif - catégories sauvages
- Résolution de Problèmes → profond - catégories structurées
- Renforcement d'Équipe → catégorie collaborative
- Aperçu Personnel → catégorie introspectif_délice
- Planification Stratégique → structuré - catégories profondes

**2. Adéquation à la Complexité :**

- Sujet Complexe/Abstrait → profond - techniques structurées
- Sujet Familier/Concret → créatif - techniques sauvages
- Sujet Émotionnel/Personnel → introspectif_délice techniques

**3. Évaluation de l'Énergie/Ton :**

- Langage de l'utilisateur formel → structuré - techniques analytiques
- Langage de l'utilisateur joueur → créatif - théâtral - techniques sauvages
- Langage de l'utilisateur réfléchi → introspectif_délice - techniques profondes

**4. Temps Disponible :**

- <30 min → 1-2 techniques ciblées
- 30-60 min → 2-3 techniques complémentaires
- > 60 min → Flux de techniques multi-phases

### 3. Générer les Recommandations de Techniques

En fonction de l'analyse du contexte - créez des recommandations sur mesure :

"**Résultats de Mon Analyse IA :**

En fonction du contexte de votre session - je recommande cette séquence de techniques personnalisée :

**Phase 1 : Établissement des Fondations**
**[Nom de la Technique]** de [Catégorie] (Durée : [temps] - Énergie : [niveau])

- **Pourquoi cela correspond :** [Connexion spécifique aux objectifs/contexte de l'utilisateur]
- **Résultat attendu :** [Ce que cela accomplira pour leur session]

**Phase 2 : Génération d'Idées**
**[Nom de la Technique]** de [Catégorie] (Durée : [temps] - Énergie : [niveau])

- **Pourquoi cela s'appuie sur la Phase 1 :** [Explication de l'effet complémentaire]
- **Résultat attendu :** [Comment cela développe les fondations]

**Phase 3 : Affinement et Action** (Si le temps le permet)
**[Nom de la Technique]** de [Catégorie] (Durée : [temps] - Énergie : [niveau])

- **Pourquoi cela conclut efficacement :** [Raisonnement de la phase finale]
- **Résultat attendu :** [Comment cela mène à des résultats exploitables]

**Temps Total Estimé :** [Somme des durées]
**Cible de la Session :** [Avantage principal et description de l'issue]"

### 4. Présenter les Détails de la Recommandation

Fournissez des informations plus approfondies sur chaque technique recommandée :

**Explications Détaillées des Techniques :**

"Pour chaque technique recommandée - voici ce qui la rend parfaite pour votre session :

**1. [Technique 1] :**

- **Description :** [Explication détaillée]
- **Idéal pour :** [Pourquoi cela correspond à ses besoins spécifiques]
- **Animation d'exemple :** [Exemple de la façon dont nous l'utiliserons]
- **Votre rôle :** [Ce que vous ferez pendant cette technique]

**2. [Technique 2] :**

- **Description :** [Explication détaillée]
- **Idéal pour :** [Pourquoi cela s'appuie sur la première technique]
- **Animation d'exemple :** [Exemple de la façon dont nous l'utiliserons]
- **Votre rôle :** [Ce que vous ferez pendant cette technique]

**3. [Technique 3] (si applicable) :**

- **Description :** [Explication détaillée]
- **Idéal pour :** [Pourquoi cela complète efficacement la séquence]
- **Animation d'exemple :** [Exemple de la façon dont nous l'utiliserons]
- **Votre rôle :** [Ce que vous ferez pendant cette technique]"

### 5. Obtenir la Confirmation de l'Utilisateur

"Cette séquence recommandée par l'IA est conçue spécifiquement pour vos objectifs [session_topic] - en tenant compte de vos [contraintes] et en se concentrant sur [primary_outcome].

**Est-ce que cette approche semble parfaite pour votre session ?**

**Options :**
[C] Continuer - Commencer avec ces techniques recommandées
[Modifier] - J'aimerais ajuster la sélection des techniques
[Détails] - Dites m'en plus sur une technique spécifique
[Retour] - Revenir à la sélection d'approche

### 6. Gérer la Réponse de l'Utilisateur

#### Si [C] Continuer :

- Mettre à jour le frontmatter avec les techniques recommandées
- Ajouter la sélection des techniques au document
- Diriger vers l'exécution de la technique

#### Si [Modifier] ou [Détails] :

- Fournir des informations supplémentaires ou des ajustements
- Permettre la substitution de technique ou des changements de séquence
- Reconfirmer les recommandations modifiées

#### Si [Retour] :

- Retouner à la sélection d'approche dans step-01-session-setup.md
- Conserver le contexte de la session et les préférences

### 7. Mettre à Jour le Frontmatter et le Document

Si l'utilisateur confirme les recommandations :

**Mettre à jour le frontmatter :**

```yaml
---
selected_approach: 'ai-recommended'
techniques_used: ['technique1' - 'technique2' - 'technique3']
stepsCompleted: [1 - 2]
---
```

**Ajouter au document :**

```markdown
## Sélection de la Technique

**Approche :** Techniques Recommandées par l'IA
**Contexte de l'Analyse :** [session_topic] avec un focus sur [session_goals]

**Techniques Recommandées :**

- **[Technique 1] :** [Pourquoi cela a été recommandé et le résultat attendu]
- **[Technique 2] :** [Comment cela s'appuie sur la première technique]
- **[Technique 3] :** [Comment cela complète efficacement la séquence]

**Raisonnement de l'IA :** [Contenu basé sur l'analyse contextuelle et la logique d'appariement]
```

**Diriger vers l'exécution :**
Chargez `./step-03-technique-execution.md`

## MÉTRIQUES DE SUCCÈS :

✅ Contexte de session analysé minutieusement à travers de multiples dimensions
✅ Recommandations de techniques clairement associées aux besoins spécifiques de l'utilisateur
✅ Explications détaillées fournies pour chaque technique recommandée
✅ Confirmation de l'utilisateur obtenue avant de passer à l'exécution
✅ Frontmatter mis à jour avec les techniques recommandées par l'IA
✅ Direction correcte vers l'exécution de la technique ou la navigation de retour

## MODES D'ÉCHEC :

❌ Recommandations génériques sans analyse de contexte spécifique
❌ Ne pas expliquer le raisonnement derrière les choix de techniques
❌ Absence d'option pour l'utilisateur de modifier ou de remettre en question les recommandations
❌ Omission de charger les techniques à partir du CSV pour des recommandations précises
❌ Non mise à jour du frontmatter avec les techniques sélectionnées

## PROTOCOLES DE RECOMMANDATION PAR L'IA :

- Analysez systématiquement le contexte de la session à travers de multiples facteurs
- Fournissez un raisonnement clair reliant les recommandations aux objectifs de l'utilisateur
- Permettez la contribution de l'utilisateur et la modification des recommandations
- Chargez des données de techniques précises depuis le CSV pour une analyse éclairée
- Équilibrez l'expertise avec l'autonomie de l'utilisateur dans la sélection finale

## PROCHAINE ÉTAPE :

Après confirmation de l'utilisateur - chargez `./step-03-technique-execution.md` pour commencer à animer les techniques de brainstorming recommandées par l'IA.

N'oubliez pas : Vos recommandations doivent démontrer une expertise claire tout en respectant l'autorité décisionnelle finale de l'utilisateur !
