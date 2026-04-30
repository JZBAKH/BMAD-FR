---
name: 'step-v-01-discovery'
description: 'Découverte et Confirmation des Documents - Gérer la validation dans un contexte nouveau, confirmer le chemin d''accès du PRD, découvrir les documents d''entrée'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-02-format-detection.md'
prdPurpose: '../data/prd-purpose.md'
---

# Étape V-1 : Découverte et Confirmation des Documents

## OBJECTIF DE L'ÉTAPE :

Gérer la validation dans un contexte nouveau en confirmant le chemin d'accès (path) du PRD, en découvrant et chargeant les documents d'entrée à partir du frontmatter, et en initialisant le rapport de validation.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans la contribution de l'utilisateur
- 📖 CRITIQUE : Lisez TOUJOURS le fichier d'étape en entier avant d'entreprendre la moindre action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que l'ensemble du fichier est lu et compris
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS EFFECTUER LA SORTIE ORALE dans votre style de communication d'Agent avec la `{communication_language}` configurée

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité
- ✅ Si l'on vous a déjà fourni des modèles de communication ou des personnas, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans un échange de type commande/réponse
- ✅ Vous apportez votre expertise en matière de validation systématique et de rigueur analytique
- ✅ L'utilisateur apporte sa connaissance du domaine et le contexte spécifique du PRD

### Règles Spécifiques à cette Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la découverte du PRD et des documents d'entrée, ne validez pas encore
- 🚫 INTERDICTION d'exécuter des vérifications de validation du PRD
- 💬 Approche : Configuration méthodique et confirmation
- 🚪 Il s'agit de la configuration initiale - assurez-vous que toutes les fondations sont en place

## PROTOCOLES D'EXÉCUTION :

- 🎯 Demandez le chemin d'accès du PRD à valider (si non fourni dans le prompt initial)
- 🎯 Chargez et lisez le fichier PRD
- 🎯 Extrayez les `inputDocuments` de l'en-tête YAML (frontmatter) du PRD
- 🎯 Initialisez le rapport de validation
- 💬 Affichez le statut de la configuration à l'utilisateur
- 🚫 INTERDICTION de passer à l'étape suivante sans la confirmation de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : PRD fourni par l'utilisateur, documents d'entrée (input documents) référencés dans le PRD
- Concentration : Configuration initiale et chargement du contexte (aucune validation)
- Limites : Ne pas commencer l'analyse ou la validation du PRD
- Dépendances : Un chemin d'accès valide vers le PRD est requis

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence à la lettre. Ne sautez pas, ne réorganisez pas et n'improvisez pas.

### 1. Demander le Chemin du PRD (Prompt for PRD Path)

Si l'utilisateur n'a pas fourni le chemin du PRD dans son premier message, demandez-le :
"Quel PRD souhaitez-vous que je valide ? Veuillez fournir le chemin vers le fichier markdown."

Arrêtez-vous et attendez la réponse de l'utilisateur.

### 2. Détecter et Charger le Fichier PRD

Une fois le chemin du PRD obtenu :
- Chargez et lisez l'intégralité du fichier PRD
- Vérifiez qu'il existe et qu'il est accessible

Si le fichier est introuvable ou illisible, informez l'utilisateur et demandez-lui de corriger le chemin. N'avancez pas tant que le PRD n'est pas chargé avec succès.

### 3. Analyser le Frontmatter pour les Documents d'Entrée (Input Documents)

Examinez le bloc YAML en haut du PRD (frontmatter) :
- Cherchez le tableau `inputDocuments`
- Pour chaque document listé :
  - Déterminez le chemin d'accès (souvent relatif au PRD)
  - Chargez et lisez le document
  - Si un document ne peut être chargé, notez-le mais continuez (graceful degradation)

### 4. Initialiser le Rapport de Validation

Déterminez le chemin du rapport de validation :
- Il doit être créé dans le même répertoire que le PRD
- Format du nom de fichier : `[nom-du-prd]-validation-report.md`
- Par exemple, si le PRD est `auth-prd.md`, le rapport sera `auth-prd-validation-report.md`

Créez ou mettez à jour le fichier avec l'en-tête initial :
```markdown
# Rapport de Validation du PRD : {Nom du PRD}
**Date de Validation :** {Current Date}
**Statut Global :** En cours (In Progress)

## 1. Contexte de Validation
- **Cible :** {Chemin du PRD}
- **Documents d'Entrée Chargés :** {Liste ou "Aucun"}
- **Documents d'Entrée Manquants :** {Liste ou "Aucun"}
```

### 5. Présenter le Statut de Configuration (Setup Status)

Affichez :

"**Configuration de la Validation Terminée**

**Cible :** {Chemin du PRD}
**Rapport Initialisé :** {Chemin du rapport}

**Contexte Chargé :**
- PRD lu avec succès.
- {number} documents d'entrée trouvés dans le frontmatter.
- {number} documents chargés avec succès.
{Lister brièvement les documents chargés, ou indiquer les manquants}

**Sommes-nous prêts à commencer la détection du format ?**"

### 6. Présenter les OPTIONS DU MENU

**Choisissez une Option :** [A] Advanced Elicitation 
[P] Party Mode 
[C] Continuer vers la Détection du Format

#### RÈGLES D'EXÉCUTION :

- Arrêtez-vous TOUJOURS et attendez la contribution de l'utilisateur après avoir présenté le menu
- Ne passez à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- L'utilisateur peut poser des questions ou ajouter des documents - répondez toujours et réaffichez le menu

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation`, et une fois terminé, réaffichez le menu
- SI P : Invoquez la compétence `bmad-party-mode`, et une fois terminé, réaffichez le menu
- SI C : Lisez entièrement et suivez : {nextStepFile} pour commencer la détection du format
- SI l'utilisateur fournit un document supplémentaire : Chargez-le, mettez à jour le rapport, réaffichez le résumé
- SI tout autre choix : aidez l'utilisateur, puis réaffichez le menu

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Le chemin d'accès du PRD a été découvert et confirmé
- Le fichier PRD existe et se charge avec succès
- Tous les documents d'entrée (input documents) issus du frontmatter ont été chargés
- Les documents de référence supplémentaires (s'il y en a) ont été chargés
- Le rapport de validation a été initialisé à côté du PRD
- L'utilisateur a été clairement informé de l'état de la configuration
- Le menu a été présenté et les choix de l'utilisateur ont été gérés correctement

### ❌ ÉCHEC DU SYSTÈME :

- Poursuivre avec un fichier PRD inexistant
- Ne pas charger les documents d'entrée à partir du frontmatter
- Créer le rapport de validation au mauvais emplacement
- Poursuivre sans que l'utilisateur n'ait confirmé la configuration
- Ne pas gérer correctement (gracefully) l'absence de documents d'entrée

**Règle Principale :** Complétez la découverte et la configuration AVANT la validation. Cette étape garantit que tout est en place pour effectuer les vérifications de validation de manière systématique.
