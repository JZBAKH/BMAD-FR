# Recherche de Domaine Étape 1 : Confirmation du Périmètre de Recherche de Domaine

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans confirmation de l'utilisateur.
- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute action — une compréhension partielle mène à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu et compris avant de continuer.
- ✅ SE CONCENTRER EXCLUSIVEMENT sur la confirmation du périmètre et de l'approche de recherche de domaine.
- 📋 VOÊTES UN PLANIFICATEUR DE RECHERCHE DE DOMAINE, pas un générateur de contenu.
- 💬 RECONNAÎTRE et CONFIRMER la compréhension des objectifs de recherche de domaine.
- 🔍 Ceci est UNIQUEMENT une CONFIRMATION DE PÉRIMÈTRE — pas encore de recherche web.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant de prendre toute action.
- ⚠️ Présenter l'option [C] continuer après la confirmation du périmètre.
- 💾 Ne continuer QUE lorsque l'utilisateur choisit 'C' (Continuer).
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1]` avant de charger l'étape suivante.
- 🚫 INTERDICTION de charger l'étape suivante tant que 'C' n'est pas sélectionné.

## LIMITES DE CONTEXTE :

- Le type de recherche = "domain" est déjà défini.
- **Sujet de recherche = "{{research_topic}}"** — découvert lors de la discussion initiale.
- **Objectifs de recherche = "{{research_goals}}"** — capturés lors de la discussion initiale.
- Se concentrer sur l'analyse de l'industrie/du domaine avec recherche web.
- La recherche web est requise pour vérifier et compléter vos connaissances avec des faits actuels.

## VOTRE TÂCHE :

Confirmer le périmètre et l'approche de recherche de domaine pour **{{research_topic}}** en gardant à l'esprit les objectifs de l'utilisateur.

## CONFIRMATION DU PÉRIMÈTRE DE DOMAINE :

### 1. Commencer la Confirmation du Périmètre

Commencez par la compréhension du périmètre du domaine :
"Je comprends que vous souhaitez mener une **recherche de domaine** pour **{{research_topic}}** avec ces objectifs : {{research_goals}}

**Périmètre de la Recherche de Domaine :**

- **Analyse de l'Industrie** : Structure de l'industrie, dynamique du marché et paysage concurrentiel.
- **Environnement Réglementaire** : Exigences de conformité, réglementations et normes.
- **Modèles Technologiques** : Tendances de l'innovation, adoption technologique et transformation digitale.
- **Facteurs Économiques** : Taille du marché, tendances de croissance et impact économique.
- **Chaîne d'Approvisionnement** : Analyse de la chaîne de valeur et relations au sein de l'écosystème.

**Approche de Recherche :**

- Toutes les affirmations seront vérifiées par rapport aux sources publiques actuelles.
- Validation multi-sources pour les affirmations critiques sur le domaine.
- Niveaux de confiance pour les informations incertaines sur le domaine.
- Couverture complète du domaine avec des insights spécifiques à l'industrie.

### 2. Confirmation du Périmètre

Présentez une confirmation claire du périmètre :
"**Confirmation du Périmètre de la Recherche de Domaine :**

Pour **{{research_topic}}**, je vais rechercher :

✅ **Analyse de l'Industrie** — structure du marché, acteurs clés, dynamique concurrentielle.
✅ **Exigences Réglementaires** — normes de conformité, cadres juridiques.
✅ **Tendances Technologiques** — modèles d'innovation, transformation digitale.
✅ **Facteurs Économiques** — taille du marché, projections de croissance, impact économique.
✅ **Analyse de la Chaîne d'Approvisionnement** — chaîne de valeur, écosystème, partenariats.

**Toutes les affirmations seront vérifiées par rapport aux sources publiques actuelles.**

**Ce périmètre et cette approche de recherche de domaine correspondent-ils à vos objectifs ?**
[C] Continuer - Commencer la recherche de domaine avec ce périmètre"

### 3. Gérer la Sélection Continuer

#### Si 'C' (Continuer) :

- Documenter la confirmation du périmètre dans le fichier de recherche.
- Mettre à jour le frontmatter : `stepsCompleted: [1]`
- Charger : `./step-02-domain-analysis.md`

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez la confirmation du périmètre :

```markdown
## Confirmation du Périmètre de Recherche de Domaine

**Sujet de Recherche :** {{research_topic}}
**Objectifs de Recherche :** {{research_goals}}

**Périmètre de la Recherche de Domaine :**

- Analyse de l'Industrie — structure du marché, paysage concurrentiel
- Environnement Réglementaire — exigences de conformité, cadres juridiques
- Tendances Technologiques — modèles d'innovation, transformation digitale
- Facteurs Économiques — taille du marché, projections de croissance
- Analyse de la Chaîne d'Approvisionnement — chaîne de valeur, relations au sein de l'écosystème

**Méthodologie de Recherche :**

- Toutes les affirmations sont vérifiées par rapport aux sources publiques actuelles
- Validation multi-sources pour les affirmations critiques sur le domaine
- Cadre de niveau de confiance pour les informations incertaines
- Couverture complète du domaine avec des insights spécifiques à l'industrie

**Périmètre Confirmé :** {{date}}
```

## MÉTRIQUES DE SUCCÈS :

✅ Périmètre de recherche de domaine clairement confirmé avec l'utilisateur
✅ Tous les domaines d'analyse de domaine identifiés et expliqués
✅ Méthodologie de recherche mise en avant
✅ Option [C] continuer présentée et gérée correctement
✅ Confirmation du périmètre documentée lorsque l'utilisateur poursuit
✅ Routage approprié vers l'étape suivante de la recherche de domaine

## ÉCHECS DU SYSTÈME :

❌ Ne pas confirmer clairement le périmètre de recherche de domaine avec l'utilisateur
❌ Omission de domaines d'analyse de domaine critiques
❌ Ne pas expliquer que la recherche web est requise pour les faits actuels
❌ Ne pas présenter l'option [C] continuer
❌ Continuer sans confirmation du périmètre par l'utilisateur
❌ Ne pas diriger vers l'étape de recherche de domaine suivante
❌ **CRITIQUE** : Lire seulement partiellement le fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape

## ÉTAPES SUIVANTES :

Après la sélection de 'C' par l'utilisateur, chargez `./step-02-domain-analysis.md` pour commencer l'analyse de l'industrie.

Rappel : Ceci est UNIQUEMENT une CONFIRMATION DE PÉRIMÈTRE — pas encore de recherche de domaine réelle, juste confirmation de l'approche et du périmètre !
