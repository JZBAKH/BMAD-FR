---
name: 'step-v-01-discovery'
description: "Découverte et confirmation des documents - Gérer la validation dans un contexte nouveau, confirmer le chemin du cahier des charges produit (PRD), découvrir les documents d'entrée"

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-02-format-detection.md'
prdPurpose: '../data/prd-purpose.md'
---

# Étape 1 : Découverte et confirmation des documents

## OBJECTIF DE L'ÉTAPE :

Gérer la validation dans un contexte nouveau en confirmant le chemin du cahier des charges produit (PRD), en découvrant et chargeant les documents d'entrée à partir du frontmatter, et en initialisant le rapport de validation.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans la contribution de l'utilisateur
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre la moindre action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'ensemble du fichier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PRODUIRE LA SORTIE dans votre style de communication d'agent avec la configuration `{communication_language}`

### Renforcement du rôle :

- ✅ Vous êtes un Architecte de validation et un Spécialiste de l'assurance qualité
- ✅ Si l'on vous a déjà fourni des modèles de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans un échange de type commande-réponse
- ✅ Vous apportez une expertise systématique de validation et une rigueur analytique
- ✅ L'utilisateur apporte sa connaissance du domaine et le contexte spécifique du cahier des charges produit (PRD)

### Règles spécifiques à cette étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la découverte du cahier des charges produit (PRD) et des documents d'entrée, ne validez pas encore
- 🚫 INTERDICTION d'effectuer toute vérification de validation à cette étape
- 💬 Approche : Découverte systématique avec un compte rendu clair à l'utilisateur
- 🚪 Il s'agit de l'étape de mise en place - préparez tout pour la validation

## PROTOCOLES D'EXÉCUTION :

- 🎯 Découvrir et confirmer le cahier des charges produit (PRD) à valider
- 💾 Charger le cahier des charges produit (PRD) et tous les documents d'entrée à partir du frontmatter
- 📖 Initialiser le rapport de validation à côté du cahier des charges produit (PRD)
- 🚫 INTERDICTION de charger l'étape suivante tant que l'utilisateur n'a pas confirmé la mise en place

## LIMITES DU CONTEXTE :

- Contexte disponible : Chemin du cahier des charges produit (PRD) (fourni par l'utilisateur ou découvert), configuration du workflow
- Concentration : Découverte et mise en place des documents uniquement
- Limites : Ne pas effectuer de validation, ne pas sauter la phase de découverte
- Dépendances : Configuration chargée depuis l'initialisation du workflow.md du cahier des charges produit (PRD)

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence à la lettre. Ne sautez pas, ne réorganisez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Charger l'objet et les standards du cahier des charges produit (PRD)

Chargez et lisez l'intégralité du fichier situé à :
`{prdPurpose}`

Ce fichier contient la philosophie BMAD du cahier des charges produit (PRD), les standards et les critères de validation qui guideront toutes les vérifications de validation. Intégrez cette compréhension - elle définit ce qui fait un excellent cahier des charges produit (PRD) BMAD.

### 2. Découvrir le cahier des charges produit (PRD) à valider

**Si le chemin du cahier des charges produit (PRD) est fourni en paramètre d'invocation :**

- Utiliser le chemin fourni

**Si aucun chemin de cahier des charges produit (PRD) n'est fourni, découverte automatique :**

- Rechercher dans `{planning_artifacts}` les fichiers correspondant à `*prd*.md`
- Vérifier également les cahiers des charges produit (PRD) shardés : `{planning_artifacts}/*prd*/*.md`

**Si exactement UN cahier des charges produit (PRD) est trouvé :**

- L'utiliser automatiquement
- Informer l'utilisateur : "Cahier des charges produit (PRD) trouvé : {discovered_path} — utilisé pour la validation."

**Si PLUSIEURS cahiers des charges produit (PRD) sont trouvés :**

- Lister tous les cahiers des charges produit (PRD) découverts avec des options numérotées
- "J'ai trouvé plusieurs cahiers des charges produit (PRD). Lequel souhaitez-vous valider ?"
- Attendre la sélection de l'utilisateur

**Si AUCUN cahier des charges produit (PRD) n'est trouvé :**

- "Je n'ai trouvé aucun fichier de cahier des charges produit (PRD) dans {planning_artifacts}. Veuillez fournir le chemin du fichier de cahier des charges produit (PRD) que vous souhaitez valider."
- Attendre que l'utilisateur fournisse le chemin du cahier des charges produit (PRD).

### 3. Vérifier l'existence du cahier des charges produit (PRD) et le charger

Une fois le chemin du cahier des charges produit (PRD) fourni :

- Vérifier si le fichier de cahier des charges produit (PRD) existe au chemin spécifié
- Si introuvable : "Je ne trouve pas de cahier des charges produit (PRD) à ce chemin. Veuillez vérifier le chemin et réessayer."
- Si trouvé : Charger l'intégralité du fichier de cahier des charges produit (PRD), y compris le frontmatter

### 4. Extraire le frontmatter et les documents d'entrée

À partir du frontmatter du cahier des charges produit (PRD) chargé, extraire :

- Le tableau `inputDocuments: []` (s'il est présent)
- Toute autre métadonnée pertinente (classification, date, etc.)

**Si aucun tableau inputDocuments n'existe :**
Le noter et procéder à une validation portant uniquement sur le cahier des charges produit (PRD)

### 5. Charger les documents d'entrée

Pour chaque document listé dans `inputDocuments` :

- Tenter de charger le document
- Suivre les documents chargés avec succès
- Noter tout document qui ne se charge pas

**Construire la liste des documents d'entrée chargés :**

- Brief produit (s'il est présent)
- Documents de recherche (s'ils sont présents)
- Autres supports de référence (s'ils sont présents)

### 6. Demander s'il existe des documents de référence supplémentaires

"**J'ai chargé les documents suivants à partir du frontmatter de votre cahier des charges produit (PRD) :**

{list loaded documents with file names}

**Y a-t-il des documents de référence supplémentaires que vous souhaiteriez que j'inclue dans cette validation ?**

Cela pourrait inclure :

- Des documents supplémentaires de recherche ou de contexte
- De la documentation projet non référencée dans le frontmatter
- Des documents de standards ou de conformité
- Des analyses concurrentielles ou des benchmarks

Veuillez fournir les chemins de tout document supplémentaire, ou taper 'aucun' pour continuer."

**Charger tout document supplémentaire fourni par l'utilisateur.**

### 7. Initialiser le rapport de validation

Créer le rapport de validation à : `{validationReportPath}`

**Initialiser avec le frontmatter :**

```yaml
---
validationTarget: '{prd_path}'
validationDate: '{current_date}'
inputDocuments: [list of all loaded documents]
validationStepsCompleted: []
validationStatus: IN_PROGRESS
---
```

**Contenu initial :**

```markdown
# Rapport de validation du cahier des charges produit (PRD)

**Cahier des charges produit (PRD) en cours de validation :** {prd_path}
**Date de validation :** {current_date}

## Documents d'entrée

{list all documents loaded for validation}

## Constats de validation

[Les constats seront ajoutés au fur et à mesure de la validation]
```

### 8. Présenter le résumé de la découverte

"**Mise en place terminée !**

**Cahier des charges produit (PRD) à valider :** {prd_path}

**Documents d'entrée chargés :**

- Cahier des charges produit (PRD) : {prd_name} ✓
- Brief produit : {count} {if count > 0}✓{else}(aucun trouvé){/if}
- Recherche : {count} {if count > 0}✓{else}(aucun trouvé){/if}
- Références supplémentaires : {count} {if count > 0}✓{else}(aucune){/if}

**Rapport de validation :** {validationReportPath}

**Prêt à commencer la validation.**"

### 9. Présenter les OPTIONS DU MENU

Afficher : **Sélectionner une option :** [A] Élicitation avancée [P] Mode soirée [C] Continuer vers la détection du format

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre la contribution de l'utilisateur après avoir présenté le menu
- Ne procéder à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- L'utilisateur peut poser des questions ou ajouter d'autres documents - toujours répondre et réafficher le menu

#### Logique de gestion du menu :

- SI A : Invoquer le skill `bmad-advanced-elicitation`, et une fois terminé, réafficher le menu
- SI P : Invoquer le skill `bmad-party-mode`, et une fois terminé, réafficher le menu
- SI C : Lire intégralement et suivre : {nextStepFile} pour commencer la détection du format
- SI l'utilisateur fournit un document supplémentaire : Le charger, mettre à jour le rapport, réafficher le résumé
- SI tout autre choix : aider l'utilisateur, puis réafficher le menu

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Le chemin du cahier des charges produit (PRD) a été découvert et confirmé
- Le fichier de cahier des charges produit (PRD) existe et se charge avec succès
- Tous les documents d'entrée du frontmatter ont été chargés
- Les documents de référence supplémentaires (le cas échéant) ont été chargés
- Le rapport de validation a été initialisé à côté du cahier des charges produit (PRD)
- L'utilisateur a été clairement informé du statut de la mise en place
- Le menu a été présenté et la contribution de l'utilisateur a été gérée correctement

### ❌ ÉCHEC DU SYSTÈME :

- Poursuivre avec un fichier de cahier des charges produit (PRD) inexistant
- Ne pas charger les documents d'entrée à partir du frontmatter
- Créer le rapport de validation au mauvais emplacement
- Poursuivre sans que l'utilisateur ne confirme la mise en place
- Ne pas gérer correctement (gracefully) l'absence de documents d'entrée

**Règle principale :** Compléter la découverte et la mise en place AVANT la validation. Cette étape garantit que tout est en place pour des vérifications de validation systématiques.
