# Recherche Technique Étape 4 : Modèles Architecturaux

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans vérification par recherche web.
- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute action — une compréhension partielle mène à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu et compris avant de continuer.
- ✅ Rechercher sur le web pour vérifier et compléter vos connaissances avec des faits actuels.
- 📋 VOUS ÊTES UN ARCHITECTE SYSTÈME, pas un générateur de contenu.
- 💬 SE CONCENTRER sur les modèles architecturaux et les décisions de conception.
- 🔍 RECHERCHE WEB REQUISE — vérifier les faits actuels par rapport à des sources en direct.
- 📝 ÉCRIRE LE CONTENU IMMÉDIATEMENT DANS LE DOCUMENT.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher l'analyse des recherches web avant de présenter les résultats.
- ⚠️ Présenter l'option [C] continuer après la génération du contenu sur les modèles architecturaux.
- 📝 ÉCRIRE L'ANALYSE DES MODÈLES ARCHITECTURAUX DANS LE DOCUMENT IMMÉDIATEMENT.
- 💾 Ne continuer QUE lorsque l'utilisateur choisit 'C' (Continuer).
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2, 3, 4]` avant de charger l'étape suivante.
- 🚫 INTERDICTION de charger l'étape suivante tant que 'C' n'est pas sélectionné.

## LIMITES DE CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- **Sujet de recherche = "{{research_topic}}"** — établi lors de la discussion initiale.
- **Objectifs de recherche = "{{research_goals}}"** — établis lors de la discussion initiale.
- Se concentrer sur les modèles architecturaux et les décisions de conception.
- Les capacités de recherche web avec vérification des sources sont activées.

## VOTRE TÂCHE :

Mener une analyse complète des modèles architecturaux en mettant l'accent sur les décisions de conception et les approches d'implémentation pour {{research_topic}}.

## SÉQUENCE DES MODÈLES ARCHITECTURAUX :

### 1. Commencer l'Analyse des Modèles Architecturaux

Commencez par l'approche de recherche architecturale :
"Je vais maintenant me concentrer sur les **modèles architecturaux et les décisions de conception** pour des approches d'architecture efficaces pour [technologie/domaine].

**Focus sur les Modèles Architecturaux :**

- Modèles d'architecture système et leurs compromis
- Principes de conception et meilleures pratiques
- Considérations d'évolutivité et de maintenabilité
- Modèles d'intégration et de communication
- Considérations architecturales de sécurité et de performance

**Laissez-moi rechercher des modèles et approches architecturaux actuels.**"

### 2. Recherche Web pour les Modèles d'Architecture Système

Rechercher les modèles d'architecture actuels :
Rechercher sur le web : "modèles d'architecture système meilleures pratiques"

**Focus architecture :**
- Modèles microservices, monolithiques et serverless
- Architectures pilotées par les événements et réactives
- Modèles de conception pilotée par le domaine (Domain-Driven Design)
- Modèles d'architecture Cloud-native et Edge

### 3. Recherche Web pour les Principes de Conception

Rechercher les principes de conception actuels :
Rechercher sur le web : "principes de conception logicielle modèles"

**Focus conception :**
- Principes SOLID et leur application
- Architecture Clean (Propre) et architecture Hexagonale
- Conception d'API et modèles GraphQL vs REST
- Conception de base de données et modèles d'architecture de données

### 4. Recherche Web pour les Modèles d'Évolutivité

Rechercher les approches d'évolutivité actuelles :
Rechercher sur le web : "modèles d'architecture évolutivité"

**Focus évolutivité :**
- Modèles de mise à l'échelle horizontale vs verticale
- Stratégies d'équilibrage de charge (load balancing) et de mise en cache
- Systèmes distribués et modèles de consensus
- Techniques d'optimisation de performance

### 5. Générer le Contenu sur les Modèles Architecturaux

Préparez l'analyse architecturale avec les citations des recherches web :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 et 3 :

```markdown
## Modèles Architecturaux et Conception

### Modèles d'Architecture Système

[Analyse des modèles d'architecture système avec citations des sources]
_Source : [URL]_

### Principes de Conception et Meilleures Pratiques

[Analyse des principes de conception avec citations des sources]
_Source : [URL]_

### Modèles d'Évolutivité et de Performance

[Analyse des modèles d'évolutivité avec citations des sources]
_Source : [URL]_

### Modèles d'Intégration et de Communication

[Analyse des modèles d'intégration avec citations des sources]
_Source : [URL]_

### Modèles d'Architecture de Sécurité

[Analyse des modèles de sécurité avec citations des sources]
_Source : [URL]_

### Modèles d'Architecture de Données

[Analyse de l'architecture de données avec citations des sources]
_Source : [URL]_

### Architecture de Déploiement et Opérations

[Analyse de l'architecture de déploiement avec citations des sources]
_Source : [URL]_
```

### 6. Présenter l'Analyse et l'Option de Continuer

Affichez les modèles architecturaux générés et présentez l'option de continuer :
"J'ai terminé l'**analyse des modèles architecturaux** pour des approches d'architecture efficaces.

**Principales découvertes architecturales :**

- Modèles d'architecture système et compromis clairement cartographiés.
- Principes de conception et meilleures pratiques documentés en profondeur.
- Modèles d'évolutivité et de performance identifiés.
- Modèles d'intégration et de communication analysés.
- Considérations d'architecture de données et de sécurité capturées.

**Prêt à passer à la recherche sur l'implémentation ?**
[C] Continuer - Enregistrer ceci dans le document et passer à la recherche d'implémentation"

### 7. Gérer la Sélection Continuer

#### Si 'C' (Continuer) :

- Ajouter le contenu final au document de recherche.
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2, 3, 4]`
- Charger : `./step-05-implementation-research.md`

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document de recherche en utilisant la structure de l'étape 5.

## MÉTRIQUES DE SUCCÈS :

✅ Modèles d'architecture système identifiés avec des citations actuelles
✅ Principes de conception clairement documentés et analysés
✅ Modèles d'évolutivité et de performance cartographiés en profondeur
✅ Modèles d'intégration et de communication capturés
✅ Considérations d'architecture de données et de sécurité analysées
✅ Option [C] continuer présentée et gérée correctement
✅ Contenu correctement ajouté au document une fois 'C' sélectionné
✅ Routage approprié vers l'étape de recherche d'implémentation

## ÉCHECS DU SYSTÈME :

❌ Se fier uniquement aux données d'entraînement sans vérification web pour les faits actuels
❌ Omission de modèles d'architecture système critiques
❌ Ne pas analyser les compromis et considérations de conception
❌ Analyse incomplète des modèles d'évolutivité ou de performance
❌ Ne pas présenter l'option [C] continuer après la génération du contenu
❌ Ajout du contenu sans que l'utilisateur n'ait sélectionné 'C'
❌ **CRITIQUE** : Lire seulement partiellement le fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape

## PROTOCOLES DE RECHERCHE ARCHITECTURALE :

- Rechercher la documentation d'architecture et les catalogues de modèles.
- Utiliser les actes de conférences d'architecture et les études de cas.
- Rechercher les architectures système réussies et leur évolution.
- Noter les dossiers de décisions architecturales (ADR - Architectural Decision Records) et leurs justifications.
- Rechercher les cadres d'évaluation et de test d'architecture.

## ÉTAPE SUIVANTE :

Après la sélection de 'C' par l'utilisateur et l'enregistrement du contenu dans le document, chargez `./step-05-implementation-research.md` pour se concentrer sur les approches d'implémentation et l'adoption technologique.

Rappel : Mettez toujours l'accent sur les données architecturales actuelles et la vérification rigoureuse des sources !
