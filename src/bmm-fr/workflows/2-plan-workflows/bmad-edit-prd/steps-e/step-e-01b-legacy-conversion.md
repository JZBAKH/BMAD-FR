---
name: 'step-e-01b-legacy-conversion'
description: 'Évaluation de la Conversion de PRD Legacy - Analyser le PRD legacy et proposer une stratégie de conversion'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-e-02-review.md'
prdFile: '{prd_file_path}'
prdPurpose: '{project-root}/_bmad/bmm/workflows/2-plan-workflows/create-prd/data/prd-purpose.md'
---

# Étape E-1B : Évaluation de la Conversion de PRD Legacy

## OBJECTIF DE L'ÉTAPE :

Analyser le PRD legacy par rapport aux standards BMAD, identifier les lacunes, proposer une stratégie de conversion et laisser l'utilisateur choisir comment procéder.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Amélioration de PRD.
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une commande-réponse.
- ✅ Vous apportez votre expertise des standards BMAD et vos conseils de conversion.
- ✅ L'utilisateur apporte sa connaissance du domaine et ses exigences de modification.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur l'évaluation et la proposition de conversion.
- 🚫 INTERDICTION d'effectuer la conversion pour le moment (cela se fera lors de l'étape d'édition).
- 💬 Approche : Analyse analytique des lacunes avec des recommandations claires.
- 🚪 Il s'agit d'une étape d'aiguillage - l'utilisateur choisit son chemin de conversion.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Analyser le PRD legacy par rapport au standard BMAD.
- 💾 Identifier les lacunes et estimer l'effort de conversion.
- 📖 Présenter les options de conversion avec les estimations d'effort.
- 🚫 INTERDICTION de procéder sans sélection de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : PRD Legacy, exigences de modification de l'utilisateur, standards prd-purpose.
- Focus : Évaluation de la conversion uniquement (pas la conversion réelle).
- Limites : Ne pas convertir encore, ne pas valider encore.
- Dépendances : L'étape e-01 a détecté le format legacy et a orienté ici.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter l'évaluation par sous-processus

**Essayez d'utiliser l'outil Task avec un sous-agent :**

"Effectuer l'évaluation de la conversion du PRD legacy :

**Charger le PRD et prd-purpose.md**

**Pour chaque section du PRD BMAD, analysez :**

1. Le PRD contient-il cette section ? (Résumé Analytique, Critères de Succès, Périmètre du Produit, Parcours Utilisateurs, Exigences Fonctionnelles, Exigences Non Fonctionnelles)
2. Si présente : Est-elle complète et bien structurée ?
3. Si manquante : Quel contenu existant pourrait migrer vers cette section ?
4. Effort pour créer/compléter : Minimal / Modéré / Significatif

**Identifier :**

- Sections de base présentes : {count}/6
- Lacunes de contenu dans chaque section.
- Effort global de conversion : Rapide / Modéré / Substantiel
- Approche recommandée : Restructuration complète vs améliorations ciblées.

Retourner l'évaluation de conversion avec l'analyse des lacunes et l'estimation de l'effort."

**Dégradation gracieuse (si l'outil Task est indisponible) :**

- Vérifier manuellement chaque section BMAD dans le PRD.
- Noter ce qui est présent et ce qui manque.
- Estimer l'effort de conversion.
- Identifier la meilleure approche de conversion.

### 2. Construire l'analyse des lacunes

**Pour chaque section de base BMAD :**

**Résumé Analytique :**

- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui est manquant ou incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Critères de Succès :**

- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui est manquant ou incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Périmètre du Produit :**

- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui est manquant ou incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Parcours Utilisateurs :**

- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui est manquant ou incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Exigences Fonctionnelles :**

- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui est manquant ou incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Exigences Non Fonctionnelles :**

- Présent : [Oui/Non/Partiel]
- Lacune : [ce qui est manquant ou incomplet]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Évaluation Globale :**

- Sections présentes : {count}/6
- Effort total de conversion : [Rapide/Modéré/Substantiel]
- Recommandé : [Restructuration complète / Améliorations ciblées]

### 3. Présenter l'évaluation de la conversion

Affichez :

"**Évaluation de la Conversion du PRD Legacy**

**Structure actuelle du PRD :**

- Sections de base présentes : {count}/6
  {Listez quelles sections sont présentes/manquantes}

**Analyse des lacunes :**

{Présentez le tableau d'analyse des lacunes montrant l'état et l'effort pour chaque section}

**Effort Global de Conversion :** {effort level}

**Vos objectifs de modification :**
{Réitérez les exigences de modification énoncées par l'utilisateur}

**Recommandation :**
{Sur la base de l'effort et des objectifs de l'utilisateur, recommandez la meilleure approche}

**Comment souhaiteriez-vous procéder ?**"

### 4. Présenter les OPTIONS DU MENU

**[R] Restructurer vers BMAD** - Conversion complète vers le format BMAD, puis application de vos modifications.
**[I] Améliorations ciblées** - Appliquer vos modifications à la structure existante sans restructuration.
**[E] Modifier et Restructurer** - Faire les deux : convertir le format ET appliquer vos modifications.
**[X] Quitter** - Examiner l'évaluation et décider.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur.
- Procéder uniquement en fonction de la sélection de l'utilisateur.

#### Logique de Gestion du Menu :

- SI R (Restructurer) : Notez le mode conversion, puis chargez l'étape suivante.
- SI I (Ciblées) : Notez le mode ciblé, puis chargez l'étape suivante.
- SI E (Modifier et Restructurer) : Notez les deux modes, puis chargez l'étape suivante.
- SI X (Quitter) : Affichez le résumé, quittez.

### 5. Documenter la stratégie de conversion

Enregistrez la décision de conversion pour l'étape suivante :

- **Mode de conversion :** [Restructuration complète / Améliorations ciblées / Les deux]
- **Exigences de modification :** [exigences de l'utilisateur issues de l'étape e-01]
- **Analyse des lacunes :** [résumé des lacunes identifiées]

Affichez : "**Stratégie de conversion documentée**

Mode : {conversion mode}
Objectifs de modification : {summary}

**Passage à la révision approfondie...**"

Lisez complètement et suivez : {nextStepFile} (step-e-02-review.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Analyse des lacunes effectuée pour les 6 sections de base BMAD.
- Estimations d'effort fournies pour chaque section.
- Effort global de conversion évalué correctement.
- Recommandation claire fournie basée sur l'effort et les objectifs de l'utilisateur.
- L'utilisateur choisit sa stratégie de conversion (restructurer/ciblée/les deux).
- Stratégie de conversion documentée pour l'étape suivante.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas analyser les 6 sections de base.
- Estimations d'effort manquantes.
- Ne pas fournir de recommandation claire.
- Passage automatique à la suite sans sélection de l'utilisateur.
- Ne pas documenter la stratégie de conversion.

**Règle Maîtresse :** Les PRD Legacy nécessitent une évaluation de conversion pour que les utilisateurs comprennent le travail impliqué et puissent choisir la meilleure approche.
