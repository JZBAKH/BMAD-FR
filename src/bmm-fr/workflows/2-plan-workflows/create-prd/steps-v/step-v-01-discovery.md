---
name: 'step-v-01-discovery'
description: "Découverte et Confirmation de Documents - Gérer la validation de contexte frais, confirmer le chemin du PRD, découvrir les documents d'entrée"

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-02-format-detection.md'
prdPurpose: '../data/prd-purpose.md'
---

# Étape 1 : Découverte et Confirmation de Documents

## OBJECTIF DE L'ÉTAPE :

Gérer la validation du nouveau contexte en confirmant le chemin du PRD, en découvrant et chargeant les documents d'entrée depuis le frontmatter, et en initialisant le rapport de validation.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité.
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une commande-réponse.
- ✅ Vous apportez une expertise de validation systématique et une rigueur analytique.
- ✅ L'utilisateur apporte la connaissance du domaine et le contexte spécifique du PRD.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la découverte du PRD et des documents d'entrée, pas encore sur la validation.
- 🚫 INTERDICTION deffectuer des vérifications de validation dans cette étape.
- 💬 Approche : Découverte systématique avec un rapport clair à l'utilisateur.
- 🚪 C'est l'étape de configuration - préparez tout pour la validation.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Découvrir et confirmer le PRD à valider.
- 💾 Charger le PRD et tous les documents d'entrée depuis le frontmatter.
- 📖 Initialiser le rapport de validation à côté du PRD.
- 🚫 INTERDICTION de charger l'étape suivante tant que l'utilisateur n'a pas confirmé la configuration.

## LIMITES DU CONTEXTE :

- Contexte disponible : Chemin du PRD (spécifié par l'utilisateur ou découvert), configuration du workflow.
- Focus : Découverte de documents et configuration uniquement.
- Limites : Ne pas effectuer de validation, ne pas sauter la découverte.
- Dépendances : Configuration chargée depuis l'initialisation du workflow.md du PRD.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Charger l'Objectif et les Standards du PRD

Chargez et lisez le fichier complet à l'adresse suivante :
`{prdPurpose}`

Ce fichier contient la philosophie du PRD BMAD, les standards et les critères de validation qui guideront toutes les vérifications. Internalisez cette compréhension - elle définit ce qui fait un excellent PRD BMAD.

### 2. Découvrir le PRD à Valider

**Si le chemin du PRD est fourni comme paramètre d'invocation :**

- Utilisez le chemin fourni.

**Si aucun chemin de PRD n'est fourni, effectuez une auto-découverte :**

- Recherchez dans `{planning_artifacts}` les fichiers correspondant à `*prd*.md`.
- Vérifiez également les PRD partitionnés (sharded) : `{planning_artifacts}/*prd*/*.md`.

**Si exactement UN PRD est trouvé :**

- Utilisez-le automatiquement.
- Informez l'utilisateur : "PRD trouvé : {discovered_path} — utilisation pour la validation."

**Si PLUSIEURS PRD sont trouvés :**

- Listez tous les PRD découverts avec des options numérotées.
- "J'ai trouvé plusieurs PRD. Lequel souhaiteriez-vous valider ?"
- Attendez la sélection de l'utilisateur.

**Si AUCUN PRD n'est trouvé :**

- "Je n'ai trouvé aucun fichier PRD dans {planning_artifacts}. Veuillez fournir le chemin vers le fichier PRD que vous souhaitez valider."
- Attendez que l'utilisateur fournisse le chemin du PRD.

### 3. Valider l'Existence du PRD et Charger

Une fois le chemin du PRD fourni :

- Vérifiez si le fichier PRD existe au chemin spécifié.
- Si non trouvé : "Je ne trouve pas de PRD à ce chemin. Veuillez vérifier le chemin et réessayer."
- Si trouvé : Chargez le fichier PRD complet, y compris le frontmatter.

### 4. Extraire le Frontmatter et les Documents d'Entrée

Depuis le frontmatter du PRD chargé, extrayez :

- Le tableau `inputDocuments: []` (si présent).
- Toute autre métadonnée pertinente (classification, date, etc.).

**Si aucun tableau inputDocuments n'existe :**
Notez-le et procédez à la validation du PRD seul.

### 5. Charger les Documents d'Entrée

Pour chaque document listé dans `inputDocuments` :

- Tentez de charger le document.
- Suivez les documents chargés avec succès.
- Notez tous les documents dont le chargement a échoué.

**Construisez la liste des documents d'entrée chargés :**

- Product Brief (si présent).
- Documents de recherche (si présent).
- Autres matériels de référence (si présent).

### 6. Demander des Documents de Référence Supplémentaires

"**J'ai chargé les documents suivants à partir du frontmatter de votre PRD :**

{liste des documents chargés avec les noms de fichiers}

**Y a-t-il des documents de référence supplémentaires que vous aimeriez que j'inclue dans cette validation ?**

Ceux-ci pourraient inclure :

- Documents de recherche ou de contexte supplémentaires.
- Documentation de projet non suivie dans le frontmatter.
- Documents de normes ou de conformité.
- Analyse concurrentielle ou benchmarks.

Veuillez fournir les chemins vers tous les documents supplémentaires, ou tapez 'aucun' pour continuer."

**Chargez tous les documents supplémentaires fournis par l'utilisateur.**

### 7. Initialiser le Rapport de Validation

Créez le rapport de validation à : `{validationReportPath}`

**Initialisez avec le frontmatter :**

```yaml
---
validationTarget: '{prd_path}'
validationDate: '{current_date}'
inputDocuments: [liste de tous les documents chargés]
validationStepsCompleted: []
validationStatus: IN_PROGRESS
---
```

**Contenu initial :**

```markdown
# Rapport de Validation du PRD

**PRD en cours de validation :** {prd_path}
**Date de validation :** {current_date}

## Documents d'Entrée

{liste de tous les documents chargés pour la validation}

## Résultats de la Validation

[Les résultats seront ajoutés au fur et à mesure de la progression de la validation]
```

### 8. Présenter le Résumé de la Découverte

"**Configuration terminée !**

**PRD à valider :** {prd_path}

**Documents d'entrée chargés :**

- PRD : {prd_name} ✓
- Product Brief : {count} {if count > 0}✓{else}(aucun trouvé){/if}
- Recherche : {count} {if count > 0}✓{else}(aucun trouvé){/if}
- Références supplémentaires : {count} {if count > 0}✓{else}(aucune){/if}

**Rapport de validation :** {validationReportPath}

**Prêt à commencer la validation.**"

### 9. Présenter les OPTIONS DU MENU

Affichez : **Sélectionnez une option :** [A] Élicitation Avancée [P] Party Mode [C] Continuer vers la Détection de Format

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Passer à l'étape suivante UNIQUEMENT lorsque l'utilisateur sélectionne 'C'.
- L'utilisateur peut poser des questions ou ajouter d'autres documents - répondez toujours et réaffichez le menu.

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation`, et une fois terminé, réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode`, et une fois terminé, réaffichez le menu.
- SI C : Lisez complètement et suivez : {nextStepFile} pour commencer la détection de format.
- SI l'utilisateur fournit un document supplémentaire : Chargez-le, mettez à jour le rapport, réaffichez le résumé.
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Chemin du PRD découvert et confirmé.
- Le fichier PRD existe et se charge avec succès.
- Tous les documents d'entrée du frontmatter sont chargés.
- Documents de référence supplémentaires (le cas échéant) chargés.
- Rapport de validation initialisé à côté du PRD.
- Utilisateur clairement informé de l'état de la configuration.
- Menu présenté et entrée utilisateur gérée correctement.

### ❌ ÉCHEC DU SYSTÈME :

- Procéder avec un fichier PRD inexistant.
- Ne pas charger les documents d'entrée depuis le frontmatter.
- Créer le rapport de validation au mauvais endroit.
- Procéder sans confirmation de la configuration par l'utilisateur.
- Ne pas gérer gracieusement les documents d'entrée manquants.

**Règle Maîtresse :** Terminez la découverte et la configuration AVANT la validation. Cette étape garantit que tout est en place pour des vérifications de validation systématiques.
