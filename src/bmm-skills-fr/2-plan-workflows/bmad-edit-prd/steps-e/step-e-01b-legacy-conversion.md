---
# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
prdFile: '{prd_file_path}'
prdPurpose: '../data/prd-purpose.md'
---

# Étape E-1B : Évaluation de conversion de PRD Legacy

## OBJECTIF DE L'ÉTAPE :

Analyser le PRD legacy par rapport aux standards BMAD, identifier les lacunes, proposer une stratégie de conversion, et laisser l'utilisateur choisir comment procéder.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans entrée utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`

### Renforcement du rôle :

- ✅ Vous êtes un Architecte de Validation et Spécialiste d'Amélioration de PRD
- ✅ Si on vous a déjà donné des patterns de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas du commande-réponse
- ✅ Vous apportez l'expertise des standards BMAD et le guidage de conversion
- ✅ L'utilisateur apporte la connaissance du domaine et les exigences d'édition

### Règles spécifiques à l'étape :

- 🎯 Se focaliser UNIQUEMENT sur l'évaluation et la proposition de conversion
- 🚫 INTERDIT d'effectuer la conversion pour l'instant (cela vient à l'étape d'édition)
- 💬 Approche : Analyse de lacunes analytique avec recommandations claires
- 🚪 Ceci est une étape de branchement - l'utilisateur choisit le chemin de conversion

## PROTOCOLES D'EXÉCUTION :

- 🎯 Analyser le PRD legacy par rapport au standard BMAD
- 💾 Identifier les lacunes et estimer l'effort de conversion
- 📖 Présenter les options de conversion avec estimations d'effort
- 🚫 INTERDIT de procéder sans la sélection de l'utilisateur

## LIMITES DE CONTEXTE :

- Contexte disponible : PRD legacy, exigences d'édition de l'utilisateur, standards prd-purpose
- Focus : Évaluation de conversion uniquement (pas la conversion réelle)
- Limites : Ne pas convertir encore, ne pas valider encore
- Dépendances : L'étape e-01 a détecté le format legacy et routé ici

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre cette séquence exactement. Ne pas sauter, réordonner ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter l'évaluation par sous-processus

**Essayer d'utiliser l'outil Task avec un sous-agent :**

« Effectuer l'évaluation de conversion du PRD legacy :

**Charger le PRD et prd-purpose.md**

**Pour chaque section du PRD BMAD, analyser :**
1. Le PRD a-t-il cette section ? (Résumé Exécutif, Critères de Succès, Périmètre Produit, Parcours Utilisateurs, Exigences Fonctionnelles, Exigences Non-Fonctionnelles)
2. Si présente : Est-elle complète et bien structurée ?
3. Si manquante : Quel contenu existe qui pourrait migrer vers cette section ?
4. Effort pour créer/compléter : Minimal / Modéré / Significatif

**Identifier :**
- Sections essentielles présentes : {count}/6
- Lacunes de contenu dans chaque section
- Effort global de conversion : Rapide / Modéré / Substantiel
- Approche recommandée : Restructuration complète vs améliorations ciblées

Retourner l'évaluation de conversion avec analyse des lacunes et estimation d'effort. »

**Dégradation gracieuse (si pas d'outil Task) :**
- Vérifier manuellement le PRD pour chaque section BMAD
- Noter ce qui est présent et ce qui manque
- Estimer l'effort de conversion
- Identifier la meilleure approche de conversion

### 2. Construire l'analyse des lacunes

**Pour chaque section essentielle BMAD :**

**Résumé Exécutif :**
- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui manque ou est incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Critères de Succès :**
- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui manque ou est incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Périmètre Produit :**
- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui manque ou est incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Parcours Utilisateurs :**
- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui manque ou est incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Exigences Fonctionnelles :**
- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui manque ou est incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Exigences Non-Fonctionnelles :**
- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui manque ou est incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Évaluation globale :**
- Sections présentes : {count}/6
- Effort total de conversion : [Rapide/Modéré/Substantiel]
- Recommandé : [Restructuration complète / Améliorations ciblées]

### 3. Présenter l'évaluation de conversion

Afficher :

« **Évaluation de conversion du PRD legacy**

**Structure actuelle du PRD :**
- Sections essentielles présentes : {count}/6
{Lister quelles sections sont présentes/manquantes}

**Analyse des lacunes :**

{Présenter le tableau d'analyse des lacunes montrant le statut de chaque section et l'effort}

**Effort global de conversion :** {niveau d'effort}

**Vos objectifs d'édition :**
{Réitérer les exigences d'édition déclarées par l'utilisateur}

**Recommandation :**
{Selon l'effort et les objectifs de l'utilisateur, recommander la meilleure approche}

**Comment aimeriez-vous procéder ?** »

### 4. Présenter les OPTIONS DE MENU

**[R] Restructurer vers BMAD** - Conversion complète vers le format BMAD, puis appliquer vos éditions
**[I] Améliorations ciblées** - Appliquer vos éditions à la structure existante sans restructuration
**[E] Éditer et restructurer** - Faire les deux : convertir le format ET appliquer vos éditions
**[X] Sortir** - Examiner l'évaluation et décider

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée utilisateur
- Procéder uniquement selon la sélection de l'utilisateur

#### Logique de gestion du menu :

- SI R (Restructurer) : Noter le mode de conversion, puis charger l'étape suivante
- SI I (Ciblées) : Noter le mode ciblé, puis charger l'étape suivante
- SI E (Éditer et restructurer) : Noter le mode combiné, puis charger l'étape suivante
- SI X (Sortir) : Afficher le résumé, sortir

### 5. Documenter la stratégie de conversion

Stocker la décision de conversion pour l'étape suivante :

- **Mode de conversion :** [Restructuration complète / Améliorations ciblées / Les deux]
- **Exigences d'édition :** [exigences de l'utilisateur depuis l'étape e-01]
- **Analyse des lacunes :** [résumé des lacunes identifiées]

Afficher : « **Stratégie de conversion documentée**

Mode : {mode de conversion}
Objectifs d'édition : {summary}

**Procède à la revue approfondie...** »

Lire entièrement et suivre : `./step-e-02-review.md`

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC SYSTÈME

### ✅ SUCCÈS :

- Toutes les 6 sections essentielles BMAD analysées pour les lacunes
- Estimations d'effort fournies pour chaque section
- Effort global de conversion évalué correctement
- Recommandation claire fournie selon l'effort et les objectifs de l'utilisateur
- L'utilisateur choisit la stratégie de conversion (restructurer/ciblé/les deux)
- Stratégie de conversion documentée pour l'étape suivante

### ❌ ÉCHEC SYSTÈME :

- Ne pas analyser les 6 sections essentielles
- Manquer les estimations d'effort
- Ne pas fournir une recommandation claire
- Auto-procéder sans la sélection de l'utilisateur
- Ne pas documenter la stratégie de conversion

**Règle maîtresse :** Les PRDs legacy ont besoin d'une évaluation de conversion afin que les utilisateurs comprennent le travail impliqué et puissent choisir la meilleure approche.
