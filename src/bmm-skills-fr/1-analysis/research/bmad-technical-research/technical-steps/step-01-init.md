# Recherche Technique Étape 1 : Confirmation du Périmètre de Recherche Technique

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans confirmation de l'utilisateur.
- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute action — une compréhension partielle mène à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu et compris avant de continuer.
- ✅ SE CONCENTRER EXCLUSIVEMENT sur la confirmation du périmètre et de l'approche de recherche technique.
- 📋 VOUS ÊTES UN PLANIFICATEUR DE RECHERCHE TECHNIQUE, pas un générateur de contenu.
- 💬 RECONNAÎTRE et CONFIRMER la compréhension des objectifs de recherche technique.
- 🔍 Ceci est UNIQUEMENT une CONFIRMATION DE PÉRIMÈTRE — pas encore de recherche web.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant de prendre toute action.
- ⚠️ Présenter l'option [C] continuer après la confirmation du périmètre.
- 💾 Ne continuer QUE lorsque l'utilisateur choisit 'C' (Continuer).
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1]` avant de charger l'étape suivante.
- 🚫 INTERDICTION de charger l'étape suivante tant que 'C' n'est pas sélectionné.

## LIMITES DE CONTEXTE :

- Le type de recherche = "technical" est déjà défini.
- **Sujet de recherche = "{{research_topic}}"** — découvert lors de la discussion initiale.
- **Objectifs de recherche = "{{research_goals}}"** — capturés lors de la discussion initiale.
- Se concentrer sur l'architecture technique et la recherche d'implémentation.
- La recherche web est requise pour vérifier et compléter vos connaissances avec des faits actuels.

## VOTRE TÂCHE :

Confirmer le périmètre et l'approche de recherche technique pour **{{research_topic}}** en gardant à l'esprit les objectifs de l'utilisateur.

## CONFIRMATION DU PÉRIMÈTRE TECHNIQUE :

### 1. Commencer la Confirmation du Périmètre

Commencez par la compréhension du périmètre technique :
"Je comprends que vous souhaitez mener une **recherche technique** pour **{{research_topic}}** avec ces objectifs : {{research_goals}}

**Périmètre de la Recherche Technique :**

- **Analyse de l'Architecture** : Modèles de conception système, frameworks et décisions architecturales.
- **Approches d'Implémentation** : Méthodologies de développement, modèles de codage et meilleures pratiques.
- **Pile Technologique** : Langages, frameworks, outils et plateformes pertinents pour {{research_topic}}.
- **Modèles d'Intégration** : API, protocoles de communication et interopérabilité des systèmes.
- **Considérations de Performance** : Évolutivité, optimisation et modèles de performance.

**Approche de Recherche :**

- Données web actuelles avec une vérification rigoureuse des sources.
- Validation multi-sources pour les affirmations techniques critiques.
- Niveaux de confiance pour les informations techniques incertaines.
- Couverture technique complète avec des insights spécifiques à l'architecture.

### 2. Confirmation du Périmètre

Présentez une confirmation claire du périmètre :
"**Confirmation du Périmètre de Recherche Technique :**

Pour **{{research_topic}}**, je vais rechercher :

✅ **Analyse de l'Architecture** — modèles de conception, frameworks, architecture système.
✅ **Approches d'Implémentation** — méthodologies de développement, modèles de codage.
✅ **Pile Technologique** — langages, frameworks, outils, plateformes.
✅ **Modèles d'Intégration** — API, protocoles, interopérabilité.
✅ **Considérations de Performance** — évolutivité, optimisation, modèles.

**Toutes les affirmations seront vérifiées par rapport aux sources publiques actuelles.**

**Ce périmètre et cette approche de recherche technique correspondent-ils à vos objectifs ?**
[C] Continuer - Commencer la recherche technique avec ce périmètre"

### 3. Gérer la Sélection Continuer

#### Si 'C' (Continuer) :

- Documenter la confirmation du périmètre dans le fichier de recherche.
- Mettre à jour le frontmatter : `stepsCompleted: [1]`
- Charger : `./step-02-technical-overview.md`

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez la confirmation du périmètre :

```markdown
## Confirmation du Périmètre de Recherche Technique

**Sujet de Recherche :** {{research_topic}}
**Objectifs de Recherche :** {{research_goals}}

**Périmètre de la Recherche Technique :**

- Analyse de l'Architecture — modèles de conception, frameworks, architecture système
- Approches d'Implémentation — méthodologies de développement, modèles de codage
- Pile Technologique — langages, frameworks, outils, plateformes
- Modèles d'Intégration — API, protocoles, interopérabilité
- Considérations de Performance — évolutivité, optimisation, modèles

**Méthodologie de Recherche :**

- Données web actuelles avec vérification rigoureuse des sources
- Validation multi-sources pour les affirmations techniques critiques
- Cadre de niveau de confiance pour les informations incertaines
- Couverture technique complète avec des insights spécifiques à l'architecture

**Périmètre Confirmé :** {{date}}
```

## MÉTRIQUES DE SUCCÈS :

✅ Périmètre de recherche technique clairement confirmé avec l'utilisateur
✅ Tous les domaines d'analyse technique identifiés et expliqués
✅ Méthodologie de recherche mise en avant
✅ Option [C] continuer présentée et gérée correctement
✅ Confirmation du périmètre documentée lorsque l'utilisateur poursuit
✅ Routage approprié vers l'étape suivante de la recherche technique

## ÉCHECS DU SYSTÈME :

❌ Ne pas confirmer clairement le périmètre de recherche technique avec l'utilisateur
❌ Omission de domaines d'analyse technique critiques
❌ Ne pas expliquer que la recherche web est requise pour les faits actuels
❌ Ne pas présenter l'option [C] continuer
❌ Continuer sans confirmation du périmètre par l'utilisateur
❌ Ne pas diriger vers l'étape de recherche technique suivante
❌ **CRITIQUE** : Lire seulement partiellement le fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape

## ÉTAPES SUIVANTES :

Après la sélection de 'C' par l'utilisateur, chargez `./step-02-technical-overview.md` pour commencer l'analyse de la pile technologique.

Rappel : Ceci est UNIQUEMENT une CONFIRMATION DE PÉRIMÈTRE — pas encore de recherche technique réelle, juste confirmation de l'approche et du périmètre !
