---
name: bmad-advanced-elicitation
description: 'Pousse le LLM à reconsidérer, raffiner, et améliorer sa sortie récente. À utiliser quand l''utilisateur demande une critique plus approfondie ou mentionne une méthode de critique connue plus profonde, par ex. socratique, premiers principes, pré-mortem, red team.'
---

# Élicitation Avancée

**Objectif :** Pousser le LLM à reconsidérer, raffiner, et améliorer sa sortie récente.

---

## INSTRUCTIONS LLM CRITIQUES

- **OBLIGATOIRE :** Exécuter TOUTES les étapes de la section flow dans L'ORDRE EXACT
- NE PAS sauter d'étapes ou changer la séquence
- ARRÊTER immédiatement quand les conditions d'arrêt sont remplies
- Chaque action dans une étape est une action REQUISE pour compléter cette étape
- Les sections en dehors du flow (validation, output, critical-context) fournissent un contexte essentiel - examinez et appliquez tout au long de l'exécution
- **VOUS DEVEZ TOUJOURS PARLER en sortie dans le style de communication de votre Agent avec le `communication_language`**

---

## INTÉGRATION (Quand Invoqué Indirectement)

Quand invoqué depuis un autre prompt ou processus :

1. Recevoir ou examiner le contenu de la section actuelle qui vient d'être générée
2. Appliquer les méthodes d'élicitation itérativement pour améliorer ce contenu spécifique
3. Retourner la version améliorée quand l'utilisateur sélectionne 'x' pour procéder et revenir
4. Le contenu amélioré remplace le contenu original de la section dans le document de sortie

---

## FLOW

### Étape 1 : Chargement du Registre des Méthodes

**Action :** Charger `./methods.csv` pour les méthodes d'élicitation. Si party-mode peut participer, résoudre la liste des agents via :

```bash
python3 {project-root}/_bmad/scripts/resolve_config.py --project-root {project-root} --key agents
```

Le résolveur fusionne quatre couches dans l'ordre : `_bmad/config.toml` (base d'installation, scoped équipe), `_bmad/config.user.toml` (base d'installation, scoped utilisateur), `_bmad/custom/config.toml` (surcharges d'équipe), et `_bmad/custom/config.user.toml` (surcharges personnelles). Chaque entrée sous `agents` est indexée par le `code` de l'agent et porte `name`, `title`, `icon`, `description`, `module`, et `team`.

#### Structure CSV

- **category :** Groupement de méthode (core, structural, risk, etc.)
- **method_name :** Nom d'affichage de la méthode
- **description :** Explication riche de ce que fait la méthode, quand l'utiliser, et pourquoi elle est précieuse
- **output_pattern :** Guide de flux flexible utilisant des flèches (par ex. "analysis -> insights -> action")

#### Analyse de Contexte

- Utiliser l'historique de conversation
- Analyser : type de contenu, complexité, besoins des parties prenantes, niveau de risque, et potentiel créatif

#### Sélection Intelligente

1. Analyser le contexte : Type de contenu, complexité, besoins des parties prenantes, niveau de risque, potentiel créatif
2. Analyser les descriptions : Comprendre l'objectif de chaque méthode à partir des descriptions riches du CSV
3. Sélectionner 5 méthodes : Choisir les méthodes qui correspondent le mieux au contexte selon leurs descriptions
4. Approche équilibrée : Inclure un mélange de techniques fondamentales et spécialisées selon ce qui est approprié

---

### Étape 2 : Présenter les Options et Gérer les Réponses

#### Format d'Affichage

```
**Options d'Élicitation Avancée**
_Si party mode est actif, des agents se joindront._
Choisissez un numéro (1-5), [r] pour Mélanger, [a] Lister Tout, ou [x] pour Procéder :

1. [Nom de la Méthode]
2. [Nom de la Méthode]
3. [Nom de la Méthode]
4. [Nom de la Méthode]
5. [Nom de la Méthode]
r. Mélanger la liste avec 5 nouvelles options
a. Lister toutes les méthodes avec leurs descriptions
x. Procéder / Aucune Action Supplémentaire
```

#### Gestion des Réponses

**Cas 1-5 (L'utilisateur sélectionne une méthode numérotée) :**

- Exécuter la méthode sélectionnée en utilisant sa description du CSV
- Adapter la complexité et le format de sortie de la méthode au contexte actuel
- Appliquer la méthode de manière créative au contenu de la section en cours d'amélioration
- Afficher la version améliorée montrant ce que la méthode a révélé ou amélioré
- **CRITIQUE :** Demander à l'utilisateur s'il souhaite appliquer les changements au document (y/n/autre) et ARRÊTER pour attendre la réponse.
- **CRITIQUE :** SEULEMENT si Oui, appliquer les changements. SI Non, écarter votre mémoire des changements proposés. Si toute autre réponse, faire de votre mieux pour suivre les instructions données par l'utilisateur.
- **CRITIQUE :** Représenter le même prompt 1-5,r,x pour permettre des élicitations supplémentaires

**Cas r (Mélanger) :**

- Sélectionner 5 méthodes aléatoires depuis methods.csv, présenter une nouvelle liste avec le même format de prompt
- Lors de la sélection, essayer de penser et de choisir un ensemble diversifié de méthodes couvrant différentes catégories et approches, avec 1 et 2 étant potentiellement les plus utiles pour le document ou la section en cours de découverte

**Cas x (Procéder) :**

- Compléter l'élicitation et procéder
- Retourner le contenu entièrement amélioré au Skill invoquant
- Le contenu amélioré devient la version finale pour cette section
- Signaler la complétion au Skill invoquant pour continuer avec la section suivante

**Cas a (Lister Tout) :**

- Lister toutes les méthodes avec leurs descriptions du CSV dans une table compacte
- Permettre à l'utilisateur de sélectionner toute méthode par nom ou numéro depuis la liste complète
- Après sélection, exécuter la méthode comme décrit dans le Cas 1-5 ci-dessus

**Cas : Retour Direct :**

- Appliquer les changements au contenu de la section actuelle et représenter les choix

**Cas : Numéros Multiples :**

- Exécuter les méthodes en séquence sur le contenu, puis re-proposer les choix

---

### Étape 3 : Lignes Directrices d'Exécution

- **Exécution de méthode :** Utiliser la description du CSV pour comprendre et appliquer chaque méthode
- **Pattern de sortie :** Utiliser le pattern comme guide flexible (par ex. « paths -> evaluation -> selection »)
- **Adaptation dynamique :** Ajuster la complexité selon les besoins du contenu (simple à sophistiqué)
- **Application créative :** Interpréter les méthodes avec flexibilité selon le contexte tout en maintenant la cohérence du pattern
- Se concentrer sur les insights actionnables
- **Rester pertinent :** Lier l'élicitation au contenu spécifique en cours d'analyse (la section actuelle du document en création sauf si l'utilisateur indique le contraire)
- **Identifier les personas :** Pour les méthodes mono ou multi-persona, identifier clairement les points de vue, et utiliser les membres de la party si disponibles déjà en mémoire
- **Comportement de boucle critique :** Toujours re-proposer les choix 1-5,r,a,x après chaque exécution de méthode
- Continuer jusqu'à ce que l'utilisateur sélectionne 'x' pour procéder avec le contenu amélioré, confirmer ou demander à l'utilisateur ce qui doit être accepté de la session
- Chaque application de méthode s'appuie sur les améliorations précédentes
- **Préservation de contenu :** Suivre toutes les améliorations faites pendant l'élicitation
- **Amélioration itérative :** Chaque méthode sélectionnée (1-5) doit :
  1. S'appliquer à la version améliorée actuelle du contenu
  2. Montrer les améliorations apportées
  3. Retourner au prompt pour des élicitations supplémentaires ou la complétion
