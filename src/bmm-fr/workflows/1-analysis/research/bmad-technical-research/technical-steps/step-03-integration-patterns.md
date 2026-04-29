# Recherche Technique Étape 3 : Modèles d'Intégration

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans vérification par recherche web.
- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute action — une compréhension partielle mène à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu et compris avant de continuer.
- ✅ Rechercher sur le web pour vérifier et compléter vos connaissances avec des faits actuels.
- 📋 VOUS ÊTES UN ANALYSTE DE L'INTÉGRATION, pas un générateur de contenu.
- 💬 SE CONCENTRER sur les API, les protocoles et l'interopérabilité des systèmes.
- 🔍 RECHERCHE WEB REQUISE — vérifier les faits actuels par rapport à des sources en direct.
- 📝 ÉCRIRE LE CONTENU IMMÉDIATEMENT DANS LE DOCUMENT.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher l'analyse des recherches web avant de présenter les résultats.
- ⚠️ Présenter l'option [C] continuer après la génération du contenu sur les modèles d'intégration.
- 📝 ÉCRIRE L'ANALYSE DES MODÈLES D'INTÉGRATION DANS LE DOCUMENT IMMÉDIATEMENT.
- 💾 Ne continuer QUE lorsque l'utilisateur choisit 'C' (Continuer).
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2, 3]` avant de charger l'étape suivante.
- 🚫 INTERDICTION de charger l'étape suivante tant que 'C' n'est pas sélectionné.

## LIMITES DE CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- **Sujet de recherche = "{{research_topic}}"** — établi lors de la discussion initiale.
- **Objectifs de recherche = "{{research_goals}}"** — établis lors de la discussion initiale.
- Se concentrer sur les API, les protocoles et l'interopérabilité des systèmes.
- Les capacités de recherche web avec vérification des sources sont activées.

## VOTRE TÂCHE :

Mener une analyse des modèles d'intégration en se concentrant sur les API, les protocoles de communication et l'interopérabilité des systèmes. Rechercher sur le web pour vérifier et compléter les faits actuels.

## SÉQUENCE D'ANALYSE DES MODÈLES D'INTÉGRATION :

### 1. Commencer l'Analyse des Modèles d'Intégration

**UTILISER LES SOUS-PROCESSUS ET SOUS-AGENTS** : Utilisez les sous-agents de recherche, les sous-processus ou le traitement parallèle si disponible pour analyser de manière approfondie et simultanée les différents domaines d'intégration.

Commencez par l'approche de recherche sur les modèles d'intégration :
"Je vais maintenant mener une **analyse des modèles d'intégration** pour **{{research_topic}}** afin de comprendre les approches d'intégration des systèmes.

**Focus sur les Modèles d'Intégration :**

- Modèles de conception et protocoles d'API
- Protocoles de communication et formats de données
- Approches d'interopérabilité des systèmes
- Modèles d'intégration des microservices
- Architectures pilotées par les événements et messagerie

**Laissez-moi rechercher des insights actuels sur les modèles d'intégration.**"

### 2. Exécution Parallèle de la Recherche sur l'Intégration

**Exécuter plusieurs recherches web simultanément :**

Rechercher sur le web : "modèles de conception API et protocoles {{research_topic}}"
Rechercher sur le web : "protocoles de communication et formats de données {{research_topic}}"
Rechercher sur le web : "interopérabilité et intégration des systèmes {{research_topic}}"
Rechercher sur le web : "modèles d'intégration des microservices {{research_topic}}"

**Approche d'analyse :**

- Rechercher des guides récents de conception d'API et les meilleures pratiques.
- Rechercher la documentation et les normes des protocoles de communication.
- Rechercher des solutions de plateforme d'intégration et de middleware.
- Analyser les modèles et approches d'architecture de microservices.
- Étudier les systèmes pilotés par les événements et les modèles de messagerie.

### 3. Analyser et Agréger les Résultats

**Collecter et analyser les résultats de toutes les recherches parallèles :**

"Après avoir exécuté des recherches web parallèles complètes, voici l'analyse et l'agrégation de mes découvertes sur les modèles d'intégration :

**Couverture de la Recherche :**

- Analyse des modèles de conception et des protocoles d'API
- Évaluation des protocoles de communication et des formats de données
- Évaluation des approches d'interopérabilité des systèmes
- Documentation des modèles d'intégration des microservices

**Analyse croisée de l'intégration :**
[Identifier les schémas reliant les choix d'API, les protocoles de communication et la conception du système]

**Évaluation de la Qualité :**
[Niveaux de confiance globaux et lacunes de recherche identifiées]"

### 4. Générer le Contenu sur les Modèles d'Intégration

**ÉCRIRE IMMÉDIATEMENT DANS LE DOCUMENT**

Préparez l'analyse des modèles d'intégration avec les citations des recherches web :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 et 3 :

```markdown
## Analyse des Modèles d'Intégration

### Modèles de Conception d'API

[Analyse des modèles de conception d'API avec citations des sources]
_API RESTful : [Principes REST et meilleures pratiques pour {{research_topic}}]_
_API GraphQL : [Adoption de GraphQL et modèles d'implémentation]_
_RPC et gRPC : [Modèles de communication API haute performance]_
_Modèles Webhook : [Approches d'intégration API pilotées par les événements]_
_Source : [URL]_

### Protocoles de Communication

[Analyse des protocoles de communication avec citations des sources]
_Protocoles HTTP/HTTPS : [Modèles de communication web et évolution]_
_Protocoles WebSocket : [Communication en temps réel et connexions persistantes]_
_Protocoles de file d'attente de messages : [AMQP, MQTT et modèles de messagerie]_
_gRPC et Protocol Buffers : [Protocoles de communication binaire haute performance]_
_Source : [URL]_

### Formats de Données et Normes

[Analyse des formats de données avec citations des sources]
_JSON et XML : [Formats d'échange de données structurées et leur évolution]_
_Protobuf et MessagePack : [Formats de sérialisation binaire efficaces]_
_CSV et fichiers plats : [Intégration de données héritées et modèles de transfert en masse]_
_Formats de données personnalisés : [Normes d'échange de données spécifiques au domaine]_
_Source : [URL]_

### Approches d'Interopérabilité des Systèmes

[Analyse de l'interopérabilité avec citations des sources]
_Intégration point à point : [Modèles de communication directe système à système]_
_Modèles d'API Gateway : [Gestion et routage centralisés des API]_
_Service Mesh : [Communication de service à service et observabilité]_
_Enterprise Service Bus (ESB) : [Modèles d'intégration d'entreprise traditionnels]_
_Source : [URL]_

### Modèles d'Intégration des Microservices

[Analyse de l'intégration des microservices avec citations des sources]
_Modèle API Gateway : [Gestion des API externes et routage]_
_Service Discovery : [Enregistrement et découverte dynamiques des services]_
_Modèle Circuit Breaker : [Tolérance aux pannes et modèles de résilience]_
_Modèle Saga : [Gestion des transactions distribuées]_
_Source : [URL]_

### Intégration Pilotée par les Événements

[Analyse de l'intégration pilotée par les événements avec citations des sources]
_Modèles Publish-Subscribe : [Modèles de diffusion d'événements et d'abonnement]_
_Event Sourcing : [Gestion d'état et persistance basées sur les événements]_
_Modèles de Message Broker : [RabbitMQ, Kafka et routage de messages]_
_Modèles CQRS : [Ségrégation des responsabilités de commande et de requête]_
_Source : [URL]_

### Modèles de Sécurité d'Intégration

[Analyse des modèles de sécurité avec citations des sources]
_OAuth 2.0 et JWT : [Modèles d'authentification et d'autorisation d'API]_
_Gestion des clés d'API : [Accès sécurisé à l'API et rotation des clés]_
_Mutual TLS (mTLS) : [Authentification de service basée sur des certificats]_
_Chiffrement des données : [Sécurisation de la transmission et du stockage des données]_
_Source : [URL]_
```

### 5. Présenter l'Analyse et l'Option de Continuer

**Afficher l'analyse et présenter l'option de continuer :**

"J'ai terminé l'**analyse des modèles d'intégration** sur les approches d'intégration des systèmes pour {{research_topic}}.

**Principales découvertes sur les modèles d'intégration :**

- Modèles de conception et protocoles d'API analysés en profondeur.
- Protocoles de communication et formats de données évalués.
- Approches d'interopérabilité des systèmes documentées.
- Modèles d'intégration des microservices cartographiés.
- Stratégies d'intégration pilotées par les événements identifiées.

**Prêt à passer à l'analyse des modèles architecturaux ?**
[C] Continuer - Enregistrer ceci dans le document et passer aux modèles architecturaux.

### 6. Gérer la Sélection Continuer

#### Si 'C' (Continuer) :

- **CONTENU DÉJÀ ÉCRIT DANS LE DOCUMENT**
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2, 3]`
- Charger : `./step-04-architectural-patterns.md`

## AJOUTER AU DOCUMENT :

Le contenu est déjà écrit dans le document lorsqu'il est généré à l'étape 4. Aucun ajout supplémentaire n'est nécessaire.

## MÉTRIQUES DE SUCCÈS :

✅ Modèles de conception et protocoles d'API analysés en profondeur
✅ Protocoles de communication et formats de données évalués
✅ Approches d'interopérabilité des systèmes documentées
✅ Modèles d'intégration des microservices cartographiés
✅ Stratégies d'intégration pilotées par les événements identifiées
✅ Contenu écrit immédiatement dans le document
✅ Option [C] continuer présentée et gérée correctement
✅ Routage approprié vers l'étape suivante (modèles architecturaux)
✅ Alignement maintenu avec les objectifs de la recherche

## ÉCHECS DU SYSTÈME :

❌ Se fier uniquement aux données d'entraînement sans vérification web pour les faits actuels
❌ Omission de modèles de conception d'API ou de protocoles critiques
❌ Analyse incomplète des protocoles de communication
❌ Échec de l'identification des approches d'interopérabilité des systèmes
❌ Ne pas écrire le contenu immédiatement dans le document
❌ Ne pas présenter l'option [C] continuer après la génération du contenu
❌ Ne pas diriger vers l'étape des modèles architecturaux
❌ **CRITIQUE** : Lire seulement partiellement le fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape

## PROTOCOLES DE RECHERCHE SUR LES MODÈLES D'INTÉGRATION :

- Rechercher des guides de conception d'API et la documentation des meilleures pratiques.
- Utiliser les spécifications et les normes des protocoles de communication.
- Analyser les solutions de plateforme d'intégration et de middleware.
- Étudier les modèles d'architecture de microservices et les études de cas.
- Se concentrer sur les données d'intégration actuelles.
- Présenter les informations contradictoires lorsque les sources ne sont pas d'accord.
- Appliquer les niveaux de confiance de manière appropriée.

## NORMES D'ANALYSE DES MODÈLES D'INTÉGRATION :

- Toujours citer les URL des résultats de recherche web.
- Utiliser des sources de recherche d'intégration faisant autorité.
- Noter la fraîcheur des données et les limitations potentielles.
- Présenter plusieurs perspectives lorsque les sources sont en conflit.
- Appliquer des niveaux de confiance aux données incertaines.
- Se concentrer sur des insights d'intégration exploitables.

## ÉTAPE SUIVANTE :

Après la sélection de 'C' par l'utilisateur, chargez `./step-04-architectural-patterns.md` pour analyser les modèles architecturaux, les décisions de conception et les structures système pour {{research_topic}}.

Rappel : Écrivez toujours le contenu de la recherche immédiatement dans le document et privilégiez les données d'intégration actuelles avec une vérification rigoureuse des sources !
