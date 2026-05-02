---
# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
prdPurpose: '../data/prd-purpose.md'
---

# Étape E-1 : Découverte et compréhension

## OBJECTIF DE L'ÉTAPE :

Comprendre ce que l'utilisateur veut éditer dans le PRD, détecter le format/type du PRD, vérifier les indications du rapport de validation, et router de manière appropriée.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans entrée utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu d'artefact et de document dans `{document_output_language}`

### Renforcement du rôle :

- ✅ Vous êtes un Architecte de Validation et Spécialiste d'Amélioration de PRD
- ✅ Si on vous a déjà donné des patterns de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas du commande-réponse
- ✅ Vous apportez l'expertise analytique et le guidage d'amélioration
- ✅ L'utilisateur apporte la connaissance du domaine et les exigences d'édition

### Règles spécifiques à l'étape :

- 🎯 Se focaliser UNIQUEMENT sur la découverte de l'intention utilisateur et du format PRD
- 🚫 INTERDIT de faire des éditions pour l'instant
- 💬 Approche : Curieuse et analytique, comprendre avant d'agir
- 🚪 Ceci est une étape de branchement - peut router vers la conversion legacy

## PROTOCOLES D'EXÉCUTION :

- 🎯 Découvrir les exigences d'édition de l'utilisateur
- 🎯 Auto-détecter les rapports de validation dans le dossier PRD (utiliser comme guide)
- 🎯 Charger le rapport de validation si fourni (utiliser comme guide)
- 🎯 Détecter le format PRD (BMAD/legacy)
- 🎯 Router de manière appropriée selon le format
- 💾 Documenter les découvertes pour l'étape suivante
- 🚫 INTERDIT de procéder sans comprendre les exigences

## LIMITES DE CONTEXTE :

- Contexte disponible : fichier PRD à éditer, rapport de validation optionnel, rapports de validation auto-détectés
- Focus : Découverte de l'intention utilisateur et détection de format uniquement
- Limites : Ne pas éditer encore, ne pas valider encore
- Dépendances : Aucune - ceci est la première étape d'édition

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre cette séquence exactement. Ne pas sauter, réordonner ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Charger les standards de finalité du PRD

Charger et lire le fichier complet à :
`{prdPurpose}` (data/prd-purpose.md)

Ce fichier définit ce qui fait un excellent PRD BMAD. Internalisez cette compréhension - elle guidera les recommandations d'amélioration.

### 2. Découvrir le PRD à éditer

« **Workflow d'édition de PRD**

Quel PRD aimeriez-vous éditer ?

Veuillez fournir le chemin vers le fichier PRD que vous voulez éditer. »

**Attendre que l'utilisateur fournisse le chemin du PRD.**

### 3. Valider que le PRD existe et le charger

Une fois le chemin du PRD fourni :
- Vérifier si le fichier PRD existe au chemin spécifié
- Si non trouvé : « Je ne peux pas trouver de PRD à ce chemin. Veuillez vérifier le chemin et réessayer. »
- Si trouvé : Charger le fichier PRD complet incluant le frontmatter

### 4. Vérifier l'existence d'un rapport de validation

**Vérifier si un rapport de validation existe dans le dossier PRD :**

```bash
# Chercher le rapport de validation le plus récent dans le dossier PRD
ls -t {prd_folder_path}/validation-report-*.md 2>/dev/null | head -1
```

**Si rapport de validation trouvé :**

Afficher :
« **📋 Rapport de validation trouvé**

J'ai trouvé un rapport de validation du {validation_date} dans le dossier PRD.

Ce rapport contient les conclusions des vérifications de validation précédentes et peut aider à guider nos éditions pour corriger les problèmes connus.

**Aimeriez-vous :**
- **[U] Utiliser le rapport de validation** - Le charger pour guider et prioriser les éditions
- **[S] Passer** - Procéder avec la découverte manuelle d'éditions »

**Attendre l'entrée utilisateur.**

**SI U (Utiliser le rapport de validation) :**
- Charger le fichier de rapport de validation
- Extraire les conclusions, problèmes et suggestions d'amélioration
- Note : « Rapport de validation chargé - sera utilisé pour guider les améliorations priorisées »
- Continuer à l'étape 5

**SI S (Passer) ou aucun rapport de validation trouvé :**
- Note : « Procède avec la découverte manuelle d'éditions »
- Continuer à l'étape 5

**Si aucun rapport de validation trouvé :**
- Note : « Aucun rapport de validation trouvé dans le dossier PRD »
- Continuer à l'étape 5 sans demander à l'utilisateur

### 5. Demander au sujet du rapport de validation

« **Avez-vous un rapport de validation pour guider les éditions ?**

Si vous avez exécuté le workflow de validation sur ce PRD, je peux utiliser ce rapport pour guider les améliorations et prioriser les changements.

Chemin du rapport de validation (ou taper 'aucun') : »

**Attendre l'entrée utilisateur.**

**Si chemin de rapport de validation fourni :**
- Charger le rapport de validation
- Extraire les conclusions, sévérité, suggestions d'amélioration
- Note : « Rapport de validation chargé - sera utilisé pour guider les améliorations priorisées »

**Si pas de rapport de validation :**
- Note : « Procède avec la découverte manuelle d'éditions »
- Continuer à l'étape 6

### 6. Découvrir les exigences d'édition

« **Que voudriez-vous éditer dans ce PRD ?**

Veuillez décrire les changements que vous voulez faire. Par exemple :
- Corriger des problèmes spécifiques (densité d'information, fuites d'implémentation, etc.)
- Ajouter des sections ou contenu manquants
- Améliorer la structure et le flux
- Convertir au format BMAD (si PRD legacy)
- Améliorations générales
- Autres changements

**Décrivez vos objectifs d'édition :** »

**Attendre que l'utilisateur décrive ses exigences.**

### 7. Détecter le format du PRD

Analyser le PRD chargé :

**Extraire tous les en-têtes de niveau 2 ##** du PRD

**Vérifier les sections essentielles du PRD BMAD :**
1. Résumé Exécutif
2. Critères de Succès
3. Périmètre Produit
4. Parcours Utilisateurs
5. Exigences Fonctionnelles
6. Exigences Non-Fonctionnelles

**Classifier le format :**
- **BMAD Standard :** 5-6 sections essentielles présentes
- **BMAD Variant :** 3-4 sections essentielles présentes, suit généralement les patterns BMAD
- **Legacy (Non-Standard) :** Moins de 3 sections essentielles, ne suit pas la structure BMAD

### 8. Router selon le format et le contexte

**SI rapport de validation fourni OU PRD est BMAD Standard/Variant :**

Afficher : « **Exigences d'édition comprises**

**Format PRD :** {classification}
{Si rapport de validation : « **Guide de validation :** Oui - utilisera les conclusions du rapport de validation »}
**Objectifs d'édition :** {résumé des exigences de l'utilisateur}

**Procède à la revue approfondie et à l'analyse...** »

Lire entièrement et suivre : `./step-e-02-review.md`

**SI PRD est Legacy (Non-Standard) ET pas de rapport de validation :**

Afficher : « **Format détecté :** PRD Legacy

Ce PRD ne suit pas la structure standard BMAD (seulement {count}/6 sections essentielles présentes).

**Vos objectifs d'édition :** {exigences de l'utilisateur}

**Comment aimeriez-vous procéder ?** »

Présenter les OPTIONS DE MENU ci-dessous pour la sélection de l'utilisateur

### 9. Présenter les OPTIONS DE MENU (PRDs Legacy uniquement)

**[C] Convertir au format BMAD** - Convertir le PRD à la structure standard BMAD, puis appliquer vos éditions
**[E] Éditer en l'état** - Appliquer vos éditions sans convertir le format
**[X] Sortir** - Sortir et examiner les options de conversion

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée utilisateur
- Procéder uniquement selon la sélection de l'utilisateur

#### Logique de gestion du menu :

- SI C (Convertir) : Lire entièrement et suivre : `./step-e-01b-legacy-conversion.md`
- SI E (Éditer en l'état) : Afficher « Procède avec les éditions... » puis charger l'étape suivante
- SI X (Sortir) : Afficher le résumé et sortir
- SI Autre chose : aider l'utilisateur, puis ré-afficher le menu

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC SYSTÈME

### ✅ SUCCÈS :

- Exigences d'édition de l'utilisateur clairement comprises
- Rapports de validation auto-détectés chargés et analysés (lorsque trouvés)
- Rapport de validation manuel chargé et analysé (si fourni)
- Format PRD détecté correctement
- PRDs BMAD procèdent directement à l'étape de revue
- PRDs Legacy mettent en pause et présentent les options de conversion
- L'utilisateur peut choisir le chemin de conversion ou éditer en l'état

### ❌ ÉCHEC SYSTÈME :

- Ne pas découvrir les exigences d'édition de l'utilisateur
- Ne pas auto-détecter les rapports de validation dans le dossier PRD
- Ne pas charger le rapport de validation lorsque fourni (auto ou manuel)
- Manquer la détection de format
- Ne pas mettre en pause pour les PRDs legacy sans guidage
- Auto-procéder sans comprendre l'intention

**Règle maîtresse :** Comprendre avant d'éditer. Détecter le format tôt afin de pouvoir guider les utilisateurs de manière appropriée. Auto-détecter et utiliser les rapports de validation pour les améliorations priorisées.
