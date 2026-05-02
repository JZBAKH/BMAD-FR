# Étude de Marché Étape 1 : Initialisation de l'Étude de Marché

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu de recherche lors de l'étape d'initialisation.
- ✅ TOUJOURS confirmer la compréhension des objectifs de recherche de l'utilisateur.
- 📋 VOUS ÊTES UN FACILITATEUR D'ÉTUDE DE MARCHÉ, pas un générateur de contenu.
- 💬 SE CONCENTRER sur la clarification du périmètre et de l'approche.
- 🔍 PAS DE RECHERCHE WEB lors de l'initialisation — elle est réservée aux étapes suivantes.
- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute action — une compréhension partielle mène à une recherche incomplète.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu et compris avant de continuer.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Confirmer la compréhension de la recherche avant de continuer.
- ⚠️ Présenter l'option [C] continuer après la clarification du périmètre.
- 💾 Écrire immédiatement le document de périmètre initial.
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1]` avant de charger l'étape suivante.
- 🚫 INTERDICTION de charger l'étape suivante tant que 'C' n'est pas sélectionné.

## LIMITES DE CONTEXTE :

- Le document actuel et le frontmatter provenant de la découverte du workflow principal sont disponibles.
- Le type de recherche = "market" est déjà défini.
- **Sujet de recherche = "{{research_topic}}"** — découvert lors de la discussion initiale.
- **Objectifs de recherche = "{{research_goals}}"** — capturés lors de la discussion initiale.
- Se concentrer sur la clarification du périmètre de l'étude de marché.
- Les capacités de recherche web sont activées pour les étapes suivantes.

## VOTRE TÂCHE :

Initialiser l'étude de marché en confirmant la compréhension de **{{research_topic}}** et en établissant un périmètre de recherche clair.

## INITIALISATION DE L'ÉTUDE DE MARCHÉ :

### 1. Confirmer la Compréhension de la Recherche

**INITIALISER - NE PAS ENCORE RECHERCHER**

Commencez par la confirmation de la recherche :
"Je comprends que vous souhaitez mener une **étude de marché** pour **{{research_topic}}** avec ces objectifs : {{research_goals}}

**Ma compréhension de vos besoins de recherche :**

- **Sujet de Recherche** : {{research_topic}}
- **Objectifs de Recherche** : {{research_goals}}
- **Type de Recherche** : Étude de Marché
- **Approche** : Analyse de marché complète avec vérification des sources

**Domaines de l'étude de marché que nous allons couvrir :**

- Taille du marché, dynamique de croissance et tendances
- Insights clients et analyse du comportement
- Paysage concurrentiel et positionnement
- Recommandations stratégiques et conseils d'implémentation

**Cela correspond-il précisément à ce que vous recherchez ?**"

### 2. Affiner le Périmètre de Recherche

Recueillez toutes les clarifications nécessaires :

#### Questions de Clarification du Périmètre :

- "Y a-t-il des segments de clientèle spécifiques ou des aspects de {{research_topic}} que nous devrions prioriser ?"
- "Devrions-nous nous concentrer sur des régions géographiques spécifiques ou sur le marché mondial ?"
- "S'agit-il d'une entrée sur le marché, d'une expansion, du développement d'un produit ou d'un autre objectif commercial ?"
- "Y a-t-il des concurrents ou des segments de marché que vous souhaitez que nous analysions spécifiquement ?"

### 3. Documenter le Périmètre Initial

**ÉCRIRE IMMÉDIATEMENT DANS LE DOCUMENT**

Écrivez le périmètre de recherche initial dans le document :

```markdown
# Étude de Marché : {{research_topic}}

## Initialisation de la Recherche

### Compréhension de la Recherche Confirmée

**Sujet** : {{research_topic}}
**Objectifs** : {{research_goals}}
**Type de Recherche** : Étude de Marché
**Date** : {{date}}

### Périmètre de la Recherche

**Domaines Prioritaires de l'Analyse de Marché :**

- Taille du marché, projections de croissance et dynamique
- Segments de clientèle, modèles de comportement et insights
- Analyse du paysage concurrentiel et du positionnement
- Recommandations stratégiques et conseils d'implémentation

**Méthodologie de Recherche :**

- Données web actuelles avec vérification des sources
- Multiples sources indépendantes pour les affirmations critiques
- Évaluation du niveau de confiance pour les données incertaines
- Couverture complète sans lacunes critiques

### Étapes Suivantes

**Workflow de Recherche :**

1. ✅ Initialisation et définition du périmètre (étape actuelle)
2. Insights Clients et Analyse du Comportement
3. Analyse du Paysage Concurrentiel
4. Synthèse Stratégique et Recommandations

**Statut de la Recherche** : Périmètre confirmé, prêt à procéder à l'analyse détaillée du marché
```

### 4. Présenter la Confirmation et l'Option de Continuer

Affichez le document de périmètre initial et présentez l'option de continuer :
"J'ai documenté notre compréhension et le périmètre initial pour l'étude de marché sur **{{research_topic}}**.

**Ce que j'ai établi :**

- Sujet et objectifs de recherche confirmés
- Domaines prioritaires de l'analyse de marché définis
- Vérification de la méthodologie de recherche
- Progression claire du workflow

**Statut du Document :** Périmètre initial écrit dans le fichier de recherche pour votre examen.

**Prêt à commencer l'étude de marché détaillée ?**
[C] Continuer - Confirmer le périmètre et passer à l'analyse des insights clients
[Modifier] Suggérer des modifications au périmètre de recherche avant de continuer

**HALTE — attendre la réponse de l'utilisateur avant de continuer.**

### 5. Gérer la Réponse de l'Utilisateur

#### Si 'C' (Continuer) :

- Mettre à jour le frontmatter : `stepsCompleted: [1]`
- Ajouter une note de confirmation au document : "Périmètre confirmé par l'utilisateur le {{date}}"
- Charger : `./steps/step-02-customer-behavior.md`

#### Si 'Modifier' :

- Recueillir les modifications de l'utilisateur sur le périmètre.
- Mettre à jour le document avec les modifications.
- Représenter le périmètre mis à jour pour confirmation.

## MÉTRIQUES DE SUCCÈS :

✅ Sujet et objectifs de recherche compris avec précision
✅ Périmètre de l'étude de marché clairement défini
✅ Document de périmètre initial écrit immédiatement
✅ Opportunité pour l'utilisateur d'examiner et de modifier le périmètre
✅ Option [C] continuer présentée et gérée correctement
✅ Document correctement mis à jour avec la confirmation du périmètre

## ÉCHECS DU SYSTÈME :

❌ Ne pas confirmer la compréhension du sujet et des objectifs de recherche
❌ Générer du contenu de recherche au lieu de simplement clarifier le périmètre
❌ Ne pas écrire le document de périmètre initial dans le fichier
❌ Ne pas donner à l'utilisateur l'opportunité de modifier le périmètre
❌ Passer à l'étape suivante sans confirmation de l'utilisateur
❌ **CRITIQUE** : Lire seulement partiellement le fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions de recherche
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape

## PRINCIPES D'INITIALISATION :

Cette étape garantit :

- Une compréhension mutuelle claire des objectifs de recherche.
- Un périmètre et une approche de recherche bien définis.
- Une documentation immédiate pour examen par l'utilisateur.
- Un contrôle de l'utilisateur sur la direction de la recherche avant le début des travaux détaillés.

## ÉTAPE SUIVANTE :

Après confirmation de l'utilisateur et finalisation du périmètre, chargez `./steps/step-02-customer-behavior.md` pour commencer l'étude de marché détaillée avec l'analyse des insights clients.

Rappel : Les étapes d'initialisation confirment la compréhension et le périmètre, elles ne génèrent pas encore le contenu de la recherche !
