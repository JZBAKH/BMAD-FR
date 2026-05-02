---
name: 'step-e-01-discovery'
description: 'Découverte et Compréhension - Comprendre ce que l''utilisateur souhaite modifier et détecter le format du PRD'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
altStepFile: './step-e-01b-legacy-conversion.md'
prdPurpose: '{project-root}/_bmad/bmm/workflows/2-plan-workflows/create-prd/data/prd-purpose.md'
---

# Étape E-1 : Découverte et Compréhension

## OBJECTIF DE L'ÉTAPE :

Comprendre ce que l'utilisateur souhaite modifier dans le PRD, détecter le format/type du PRD, vérifier les indications du rapport de validation et orienter de manière appropriée.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Amélioration de PRD.
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une commande-réponse.
- ✅ Vous apportez une expertise analytique et des conseils d'amélioration.
- ✅ L'utilisateur apporte sa connaissance du domaine et ses exigences de modification.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la découverte de l'intention de l'utilisateur et du format du PRD.
- 🚫 INTERDICTION de faire des modifications pour le moment.
- 💬 Approche : Curieux et analytique, comprendre avant d'agir.
- 🚪 Il s'agit d'une étape d'aiguillage - elle peut orienter vers la conversion d'un document existant (legacy).

## PROTOCOLES D'EXÉCUTION :

- 🎯 Découvrir les exigences de modification de l'utilisateur.
- 🎯 Détecter automatiquement les rapports de validation dans le dossier du PRD (utiliser comme guide).
- 🎯 Charger le rapport de validation s'il est fourni (utiliser comme guide).
- 🎯 Détecter le format du PRD (BMAD/legacy).
- 🎯 Orienter de manière appropriée en fonction du format.
- 💾 Documenter les découvertes pour l'étape suivante.
- 🚫 INTERDICTION de procéder sans avoir compris les exigences.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD à modifier, rapport de validation optionnel, rapports de validation détectés automatiquement.
- Focus : Découverte de l'intention de l'utilisateur et détection de format uniquement.
- Limites : Ne pas éditer encore, ne pas valider encore.
- Dépendances : Aucune - c'est la première étape d'édition.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Charger les standards de l'objectif du PRD (PRD Purpose)

Chargez et lisez le fichier complet à l'adresse suivante :
`{prdPurpose}` (data/prd-purpose.md)

Ce fichier définit ce qui fait un excellent PRD BMAD. Internalisez cette compréhension - elle guidera vos recommandations d'amélioration.

### 2. Découvrir le PRD à modifier

"**Workflow de Modification de PRD**

Quel PRD souhaitez-vous modifier ?

Veuillez fournir le chemin vers le fichier PRD que vous souhaitez modifier."

**Attendez que l'utilisateur fournisse le chemin du PRD.**

### 3. Valider l'existence du PRD et le charger

Une fois le chemin du PRD fourni :
- Vérifiez si le fichier PRD existe au chemin spécifié.
- Si non trouvé : "Je ne trouve pas de PRD à ce chemin. Veuillez vérifier le chemin et réessayer."
- Si trouvé : Chargez le fichier PRD complet, y compris le frontmatter.

### 4. Vérifier s'il existe un rapport de validation

**Vérifiez si un rapport de validation existe dans le dossier du PRD :**

```bash
# Rechercher le rapport de validation le plus récent dans le dossier du PRD
ls -t {prd_folder_path}/validation-report-*.md 2>/dev/null | head -1
```

**Si un rapport de validation est trouvé :**

Affichez :
"**📋 Rapport de Validation Trouvé**

J'ai trouvé un rapport de validation daté du {validation_date} dans le dossier du PRD.

Ce rapport contient les résultats des précédents contrôles de validation et peut nous aider à orienter nos modifications pour corriger les problèmes connus.

**Souhaitez-vous :**
- **[U] Utiliser le rapport de validation** - Le charger pour guider et hiérarchiser les modifications.
- **[S] Ignorer** - Procéder à une découverte manuelle des modifications."

**Attendez l'entrée de l'utilisateur.**

**SI U (Utiliser le rapport de validation) :**
- Chargez le fichier du rapport de validation.
- Extrayez les conclusions, les problèmes et les suggestions d'amélioration.
- Note : "Rapport de validation chargé - il sera utilisé pour guider les améliorations prioritaires."
- Continuez vers l'étape 5.

**SI S (Ignorer) ou si aucun rapport de validation n'est trouvé :**
- Note : "Poursuite de la découverte manuelle des modifications."
- Continuez vers l'étape 5.

**Si aucun rapport de validation n'est trouvé :**
- Note : "Aucun rapport de validation trouvé dans le dossier du PRD."
- Continuez vers l'étape 5 sans demander à l'utilisateur.

### 5. Poser des questions sur le rapport de validation

"**Avez-vous un rapport de validation pour guider les modifications ?**

Si vous avez exécuté le workflow de validation sur ce PRD, je peux utiliser ce rapport pour guider les améliorations et hiérarchiser les changements.

Chemin du rapport de validation (ou tapez 'aucun') :"

**Attendez l'entrée de l'utilisateur.**

**Si un chemin de rapport de validation est fourni :**
- Chargez le rapport de validation.
- Extrayez les conclusions, la sévérité, les suggestions d'amélioration.
- Note : "Rapport de validation chargé - il sera utilisé pour guider les améliorations prioritaires."

**Si pas de rapport de validation :**
- Note : "Poursuite de la découverte manuelle des modifications."
- Continuez vers l'étape 6.

### 6. Découvrir les exigences de modification

"**Que souhaiteriez-vous modifier dans ce PRD ?**

Veuillez décrire les changements que vous souhaitez effectuer. Par exemple :
- Corriger des problèmes spécifiques (densité d'information, fuites d'implémentation, etc.).
- Ajouter des sections ou du contenu manquants.
- Améliorer la structure et le flux.
- Convertir au format BMAD (s'il s'agit d'un PRD existant/legacy).
- Améliorations générales.
- Autres changements.

**Décrivez vos objectifs de modification :**"

**Attendez que l'utilisateur décrive ses exigences.**

### 7. Détecter le format du PRD

Analysez le PRD chargé :

**Extraire tous les en-têtes de niveau 2 (##)** du PRD.

**Vérifier la présence des sections de base du PRD BMAD :**
1. Résumé Analytique (Executive Summary)
2. Critères de Succès
3. Périmètre du Produit (Product Scope)
4. Parcours Utilisateurs
5. Exigences Fonctionnelles
6. Exigences Non Fonctionnelles

**Classifier le format :**
- **Standard BMAD :** 5 à 6 sections de base présentes.
- **Variante BMAD :** 3 à 4 sections de base présentes, suit globalement les modèles BMAD.
- **Legacy (Non-Standard) :** Moins de 3 sections de base, ne suit pas la structure BMAD.

### 8. Orienter en fonction du format et du contexte

**SI un rapport de validation est fourni OU si le PRD est un Standard/Variante BMAD :**

Affichez : "**Exigences de modification comprises**

**Format du PRD :** {classification}
{Si rapport de validation : "**Guide de validation :** Oui - utilisera les conclusions du rapport de validation"}
**Objectifs de modification :** {résumé des exigences de l'utilisateur}

**Passage à la révision et à l'analyse approfondies...**"

Lisez complètement et suivez : étape suivante (step-e-02-review.md)

**SI le PRD est Legacy (Non-Standard) ET qu'aucun rapport de validation n'est fourni :**

Affichez : "**Format détecté :** PRD Legacy

Ce PRD ne suit pas la structure standard BMAD (seulement {count}/6 sections de base présentes).

**Vos objectifs de modification :** {exigences de l'utilisateur}

**Comment souhaiteriez-vous procéder ?**"

Présentez les OPTIONS DU MENU ci-dessous pour la sélection de l'utilisateur.

### 9. Présenter les OPTIONS DU MENU (PRD Legacy uniquement)

**[C] Convertir au format BMAD** - Convertir le PRD vers la structure standard BMAD, puis appliquer vos modifications.
**[E] Modifier tel quel** - Appliquer vos modifications sans convertir le format.
**[X] Quitter** - Quitter et examiner les options de conversion.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur.
- Procéder uniquement en fonction de la sélection de l'utilisateur.

#### Logique de Gestion du Menu :

- SI C (Convertir) : Lisez complètement et suivez : {altStepFile} (step-e-01b-legacy-conversion.md).
- SI E (Modifier tel quel) : Affichez "Poursuite des modifications..." puis chargez l'étape suivante.
- SI X (Quitter) : Affichez le résumé et quittez.
- SI Autre : aidez l'utilisateur, puis réaffichez le menu.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Exigences de modification de l'utilisateur clairement comprises.
- Rapports de validation détectés automatiquement chargés et analysés (si trouvés).
- Rapport de validation manuel chargé et analysé (si fourni).
- Format du PRD détecté correctement.
- Les PRD BMAD passent directement à l'étape de révision.
- Les PRD Legacy font une pause et présentent les options de conversion.
- L'utilisateur peut choisir le chemin de conversion ou modifier tel quel.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas découvrir les exigences de modification de l'utilisateur.
- Ne pas détecter automatiquement les rapports de validation dans le dossier du PRD.
- Ne pas charger le rapport de validation lorsqu'il est fourni (auto ou manuel).
- Détection de format manquante.
- Ne pas faire de pause pour les PRD legacy sans guide.
- Passage automatique à la suite sans comprendre l'intention.

**Règle Maîtresse :** Comprendre avant de modifier. Détecter le format tôt pour pouvoir guider les utilisateurs de manière appropriée. Détecter automatiquement et utiliser les rapports de validation pour les améliorations prioritaires.
