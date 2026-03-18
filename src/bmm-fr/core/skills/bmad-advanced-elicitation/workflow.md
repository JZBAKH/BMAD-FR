---
agent_party: '{project-root}/_bmad/_config/agent-manifest.csv'
---

# Workflow d'Élicitation Avancée

**Objectif :** Pousser le LLM à reconsidérer, affiner et améliorer sa production récente.

---

## INSTRUCTIONS CRITIQUES POUR LE LLM

- **OBLIGATOIRE :** Exécuter TOUTES les étapes de la section FLOW dans l'ORDRE EXACT
- NE PAS sauter d'étapes ni modifier la séquence
- S'ARRÊTER immédiatement lorsque les conditions d'arrêt sont remplies
- Chaque action dans une étape est une action REQUISE pour compléter cette étape
- Les sections en dehors du flux (validation, output, critical-context) fournissent un contexte essentiel - les revoir et les appliquer tout au long de l'exécution
- **VOUS DEVEZ TOUJOURS PARLER DANS LA SORTIE selon le style de communication de votre Agent avec la `communication_language`**

---

## INTÉGRATION (Lors d'une invocation indirecte)

Lorsqu'invoqué depuis un autre prompt ou processus :

1. Recevoir ou revoir le contenu de la section actuelle qui vient d'être généré
2. Appliquer les méthodes d'élicitation de manière itérative pour améliorer ce contenu spécifique
3. Retourner la version améliorée lorsque l'utilisateur sélectionne 'x' pour poursuivre et revenir
4. Le contenu amélioré remplace le contenu de la section originale dans le document de sortie

---

## FLUX (FLOW)

### Étape 1 : Chargement du Registre des Méthodes

**Action :** Charger et lire `./methods.csv` et `{agent_party}`

#### Structure du CSV

- **category :** Regroupement de méthodes (core, structural, risk, etc.)
- **method_name :** Nom d'affichage de la méthode
- **description :** Explication riche de ce que fait la méthode, quand l'utiliser et pourquoi elle est utile
- **output_pattern :** Guide de flux flexible utilisant des flèches (ex : "analyse -> insights -> action")

#### Analyse du Contexte

- Utiliser l'historique de la conversation
- Analyser : type de contenu, complexité, besoins des parties prenantes, niveau de risque et potentiel créatif

#### Sélection Intelligente

1. Analyser le contexte : Type de contenu, complexité, besoins des parties prenantes, niveau de risque, potentiel créatif
2. Analyser les descriptions : Comprendre l'objectif de chaque méthode à partir des descriptions riches du CSV
3. Sélectionner 5 méthodes : Choisir les méthodes qui correspondent le mieux au contexte en fonction de leurs descriptions
4. Équilibrer l'approche : Inclure un mélange de techniques fondamentales et spécialisées selon les besoins

---

### Étape 2 : Présenter les Options et Gérer les Réponses

#### Format d'Affichage


```

**Options d'Élicitation Avancée**
*Si le Party Mode est actif, les agents se joindront à la discussion.*
Choisissez un numéro (1-5), [r] pour Relancer, [a] pour Tout lister, ou [x] pour Poursuivre :

1. [Nom de la méthode]
2. [Nom de la méthode]
3. [Nom de la méthode]
4. [Nom de la méthode]
5. [Nom de la méthode]
r. Relancer la liste avec 5 nouvelles options
a. Lister toutes les méthodes avec leurs descriptions
x. Poursuivre / Aucune action supplémentaire

```

#### Gestion des Réponses

**Cas 1-5 (L'utilisateur sélectionne une méthode numérotée) :**

- Exécuter la méthode sélectionnée en utilisant sa description issue du CSV
- Adapter la complexité de la méthode et le format de sortie en fonction du contexte actuel
- Appliquer la méthode de manière créative au contenu de la section actuelle à améliorer
- Afficher la version améliorée montrant ce que la méthode a révélé ou amélioré
- **CRITIQUE :** Demander à l'utilisateur s'il souhaite appliquer les modifications au document (o/n/autre) et S'ARRÊTER pour attendre la réponse.
- **CRITIQUE :** UNIQUEMENT si Oui, appliquer les modifications. SI Non, annuler votre mémoire des modifications proposées. Si toute autre réponse, faire de votre mieux pour suivre les instructions données par l'utilisateur.
- **CRITIQUE :** Représenter la même invite 1-5,r,x pour permettre des élicitations supplémentaires

**Cas r (Relancer/Reshuffle) :**

- Sélectionner 5 méthodes aléatoires depuis methods.csv, présenter une nouvelle liste avec le même format d'invite
- Lors de la sélection, essayer de réfléchir et de choisir un ensemble diversifié de méthodes couvrant différentes catégories et approches, 1 et 2 étant potentiellement les plus utiles pour le document ou la section en cours de découverte

**Cas x (Poursuivre/Proceed) :**

- Terminer l'élicitation et poursuivre
- Retourner le contenu entièrement amélioré à create-doc.md
- Le contenu amélioré devient la version finale pour cette section
- Signaler la fin à create-doc.md pour continuer avec la section suivante

**Cas a (Tout lister/List All) :**

- Lister toutes les méthodes avec leurs descriptions issues du CSV dans un tableau compact
- Permettre à l'utilisateur de sélectionner n'importe quelle méthode par nom ou numéro depuis la liste complète
- Après sélection, exécuter la méthode comme décrit dans le Cas 1-5 ci-dessus

**Cas : Retours directs (Direct Feedback) :**

- Appliquer les modifications au contenu de la section actuelle et représenter les choix

**Cas : Numéros multiples (Multiple Numbers) :**

- Exécuter les méthodes en séquence sur le contenu, puis proposer à nouveau les choix

---

### Étape 3 : Lignes Directrices d'Exécution

- **Exécution de la méthode :** Utiliser la description du CSV pour comprendre et appliquer chaque méthode
- **Modèle de sortie (output pattern) :** Utiliser le modèle comme guide flexible (ex : "chemins -> évaluation -> sélection")
- **Adaptation dynamique :** Ajuster la complexité en fonction des besoins du contenu (de simple à sophistiqué)
- **Application créative :** Interpréter les méthodes de manière flexible en fonction du contexte tout en maintenant la cohérence du modèle
- Se concentrer sur des insights actionnables
- **Rester pertinent :** Lier l'élicitation au contenu spécifique analysé (la section actuelle du document en cours de création à moins que l'utilisateur n'indique le contraire)
- **Identifier les personas :** Pour les méthodes à un ou plusieurs personas, identifier clairement les points de vue, et utiliser les membres de l'équipe (Party Mode) s'ils sont déjà disponibles en mémoire
- **Comportement de boucle critique :** Toujours proposer à nouveau les choix 1-5,r,a,x après chaque exécution de méthode
- Continuer jusqu'à ce que l'utilisateur sélectionne 'x' pour poursuivre avec le contenu amélioré, confirmer ou demander à l'utilisateur ce qui doit être accepté de la session
- Chaque application de méthode s'appuie sur les améliorations précédentes
- **Préservation du contenu :** Suivre toutes les améliorations apportées pendant l'élicitation
- **Amélioration itérative :** Chaque méthode sélectionnée (1-5) doit :
  1. S'appliquer à la version actuelle améliorée du contenu
  2. Montrer les améliorations apportées
  3. Retourner à l'invite pour des élicitations supplémentaires ou la conclusion
