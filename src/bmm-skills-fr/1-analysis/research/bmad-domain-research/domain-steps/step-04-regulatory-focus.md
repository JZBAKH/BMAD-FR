# Recherche de Domaine Étape 4 : Focus Réglementaire

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans vérification par recherche web.
- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute action — une compréhension partielle mène à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu et compris avant de continuer.
- ✅ Rechercher sur le web pour vérifier et compléter vos connaissances avec des faits actuels.
- 📋 VOUS ÊTES UN ANALYSTE RÉGLEMENTAIRE, pas un générateur de contenu.
- 💬 SE CONCENTRER sur les exigences de conformité et le paysage réglementaire.
- 🔍 RECHERCHE WEB REQUISE — vérifier les faits actuels par rapport à des sources en direct.
- 📝 ÉCRIRE LE CONTENU IMMÉDIATEMENT DANS LE DOCUMENT.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher l'analyse des recherches web avant de présenter les résultats.
- ⚠️ Présenter l'option [C] continuer après la génération du contenu réglementaire.
- 📝 ÉCRIRE L'ANALYSE RÉGLEMENTAIRE DANS LE DOCUMENT IMMÉDIATEMENT.
- 💾 N'enregistrer QUE lorsque l'utilisateur choisit 'C' (Continuer).
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2, 3, 4]` avant de charger l'étape suivante.
- 🚫 INTERDICTION de charger l'étape suivante tant que 'C' n'est pas sélectionné.

## LIMITES DE CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- **Sujet de recherche = "{{research_topic}}"** — établi lors de la discussion initiale.
- **Objectifs de recherche = "{{research_goals}}"** — établis lors de la discussion initiale.
- Se concentrer sur les exigences réglementaires et de conformité pour le domaine.
- Les capacités de recherche web avec vérification des sources sont activées.

## VOTRE TÂCHE :

Mener une analyse ciblée sur la réglementation et la conformité, en mettant l'accent sur les exigences qui impactent {{research_topic}}. Rechercher sur le web pour vérifier et compléter les faits actuels.

## SÉQUENCE DU FOCUS RÉGLEMENTAIRE :

### 1. Commencer l'Analyse Réglementaire

Commencez par l'approche de recherche réglementaire :
"Je vais maintenant me concentrer sur les **exigences réglementaires et de conformité** qui impactent **{{research_topic}}**.

**Domaines du Focus Réglementaire :**

- Réglementations spécifiques et cadres de conformité
- Normes de l'industrie et meilleures pratiques
- Exigences de licence et de certification
- Réglementations sur la protection des données et la vie privée
- Exigences environnementales et de sécurité

**Laissez-moi rechercher les exigences réglementaires actuelles.**"

### 2. Recherche Web pour des Réglementations Spécifiques

Rechercher des informations réglementaires actuelles :
Rechercher sur le web : "réglementations {{research_topic}} exigences conformité"

**Focus réglementaire :**

- Réglementations spécifiques applicables au domaine.
- Cadres et normes de conformité.
- Changements ou mises à jour réglementaires récents.
- Organismes d'application et de surveillance.

### 3. Recherche Web pour les Normes de l'Industrie

Rechercher les normes industrielles actuelles :
Rechercher sur le web : "normes {{research_topic}} meilleures pratiques"

**Focus sur les normes :**

- Normes techniques spécifiques à l'industrie.
- Meilleures pratiques et directives.
- Exigences de certification.
- Cadres d'assurance qualité.

### 4. Recherche Web pour les Exigences de Confidentialité des Données

Rechercher les réglementations actuelles sur la vie privée :
Rechercher sur le web : "réglementations protection données {{research_topic}}RGPD"

**Focus sur la vie privée :**

- RGPD, CCPA et autres lois sur la protection des données.
- Exigences de confidentialité spécifiques à l'industrie.
- Normes de gouvernance et de sécurité des données.
- Exigences de consentement de l'utilisateur et de manipulation des données.

### 5. Générer le Contenu de l'Analyse Réglementaire

Préparez le contenu réglementaire avec les citations des sources :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 et 3 :

```markdown
## Exigences Réglementaires

### Réglementations Applicables

[Analyse des réglementations spécifiques avec citations des sources]
_Source : [URL]_

### Normes de l'Industrie et Meilleures Pratiques

[Analyse des normes industrielles avec citations des sources]
_Source : [URL]_

### Cadres de Conformité

[Analyse des cadres de conformité avec citations des sources]
_Source : [URL]_

### Protection des Données et Vie Privée

[Analyse des exigences de confidentialité avec citations des sources]
_Source : [URL]_

### Licences et Certifications

[Analyse des exigences de licence avec citations des sources]
_Source : [URL]_

### Considérations d'Implémentation

[Considérations pratiques d'implémentation avec citations des sources]
_Source : [URL]_

### Évaluation des Risques

[Évaluation des risques réglementaires et de conformité]
```

### 6. Présenter l'Analyse et l'Option de Continuer

Affichez l'analyse réglementaire générée et présentez l'option de continuer :
"J'ai terminé l'**analyse des exigences réglementaires** pour {{research_topic}}.

**Principales découvertes réglementaires :**

- Réglementations et cadres spécifiques identifiés.
- Normes de l'industrie et meilleures pratiques cartographiées.
- Exigences de conformité clairement documentées.
- Considérations d'implémentation fournies.
- Évaluation des risques terminée.

**Prêt à passer aux tendances techniques ?**
[C] Continuer - Enregistrer ceci dans le document et passer aux tendances techniques"

### 7. Gérer la Sélection Continuer

#### Si 'C' (Continuer) :

- **CONTENU DÉJÀ ÉCRIT DANS LE DOCUMENT**
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2, 3, 4]`
- Charger : `./step-05-technical-trends.md`

## AJOUTER AU DOCUMENT :

Le contenu est déjà écrit dans le document lorsqu'il est généré à l'étape 5. Aucun ajout supplémentaire n'est nécessaire.

## MÉTRIQUES DE SUCCÈS :

✅ Réglementations applicables identifiées avec des citations actuelles
✅ Normes de l'industrie et meilleures pratiques documentées
✅ Cadres de conformité clairement cartographiés
✅ Exigences de protection des données analysées
✅ Considérations d'implémentation fournies
✅ Option [C] continuer présentée et gérée correctement
✅ Contenu correctement ajouté au document une fois 'C' sélectionné

## ÉCHECS DU SYSTÈME :

❌ Se fier aux données d'entraînement au lieu de la recherche web pour les faits actuels
❌ Omission d'exigences réglementaires critiques pour le domaine
❌ Ne pas fournir de considérations d'implémentation pour la conformité
❌ Ne pas terminer l'évaluation des risques pour la conformité réglementaire
❌ Ne pas présenter l'option [C] continuer après la génération du contenu
❌ Ajout du contenu sans que l'utilisateur n'ait sélectionné 'C'
❌ **CRITIQUE** : Lire seulement partiellement le fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape

## PROTOCOLES DE RECHERCHE RÉGLEMENTAIRE :

- Rechercher des réglementations spécifiques par nom et numéro.
- Identifier les organismes réglementaires et les agences d'application.
- Rechercher les changements et mises à jour réglementaires récents.
- Faire correspondre les normes de l'industrie aux exigences réglementaires.
- Considérer les différences régionales et juridictionnelles.

## VÉRIFICATION DES SOURCES :

- Toujours citer les sites web des agences réglementaires.
- Utiliser des sources officielles du gouvernement et des associations professionnelles.
- Noter les dates d'entrée en vigueur et les calendriers d'implémentation.
- Présenter les niveaux d'exigence de conformité et les obligations.

## ÉTAPE SUIVANTE :

Après la sélection de 'C' par l'utilisateur et l'enregistrement du contenu dans le document, chargez `./step-05-technical-trends.md` pour analyser les tendances techniques et les innovations dans le domaine.

Rappel : Recherchez sur le web pour vérifier les faits réglementaires et fournissez des considérations pratiques d'implémentation !
