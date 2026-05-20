---
name: 'step-e-04-complete'
description: 'Terminer et Valider - Présenter les options pour les étapes suivantes, incluant la validation complète'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
prdFile: '{prd_file_path}'
validationWorkflow: '{project-root}/_bmad/bmm/workflows/2-plan-workflows/create-prd/steps-v/step-v-01-discovery.md'
---

# Étape E-4 : Terminer et Valider

## OBJECTIF DE L'ÉTAPE :

Présenter le résumé des modifications effectuées et proposer les étapes suivantes, incluant l'intégration fluide avec le workflow de validation.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 TOUJOURS générer du contenu AVEC l'entrée/approbation de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Amélioration de PRD.
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une commande-réponse.
- ✅ Vous apportez une expertise en synthèse et en résumé.
- ✅ L'utilisateur choisit les prochaines actions.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la présentation du résumé et des options.
- 🚫 INTERDICTION d'apporter des modifications supplémentaires.
- 💬 Approche : Résumé clair et concis avec des options exploitables.
- 🚪 C'est la dernière étape d'édition - plus d'éditions.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Compiler le résumé de toutes les modifications effectuées.
- 🎯 Présenter les options clairement avec les résultats attendus.
- 📖 Orienter vers la validation si l'utilisateur le choisit.
- 🚫 INTERDICTION de procéder sans sélection de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD mis à jour, historique des modifications issu de l'étape e-03.
- Focus : Résumé et options uniquement (plus d'édition).
- Limites : Ne pas faire de changements, présenter simplement les options.
- Dépendances : Étape e-03 terminée - toutes les modifications appliquées.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Compiler le résumé de l'édition

À partir de l'exécution des modifications de l'étape e-03, compilez :

**Modifications effectuées :**

- Sections ajoutées : {liste des noms}
- Sections mises à jour : {liste des noms}
- Contenu supprimé : {list}
- Changements de structure : {description}

**Détails de l'édition :**

- Nombre total de sections impactées : {count}
- Mode : {restructuration/ciblé/les deux}
- Priorité traitée : {Critique/Haute/Moyenne/Basse}

**État du PRD :**

- Format : {Standard BMAD / Variante BMAD / Legacy (converti)}
- Exhaustivité : {assessment}
- Prêt pour : {cas d'utilisation en aval}

### 2. Présenter le résumé de fin de workflow

Affichez :

"**✓ Modification du PRD terminée**

**PRD mis à jour :** {prd_file_path}

**Résumé des modifications :**
{Présentez une liste à puces des principaux changements}

**Mode d'édition :** {mode}
**Sections modifiées :** {count}

**Format du PRD :** {format}

**Le PRD est maintenant prêt pour :**

- Les workflows en aval (Design UX, Architecture).
- La validation pour garantir la qualité.
- Utilisation en production.

**Que souhaitez-vous faire ensuite ?**"

### 3. Présenter les OPTIONS DU MENU

Affichez :

**[V] Lancer la Validation Complète** - Exécuter le workflow de validation complet (steps-v) pour vérifier la qualité du PRD.
**[E] Modifier encore** - Effectuer des modifications supplémentaires sur le PRD.
**[S] Résumé** - Terminer avec un résumé détaillé des modifications.
**[X] Quitter** - Quitter le workflow d'édition.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur.
- Procéder uniquement en fonction de la sélection de l'utilisateur.

#### Logique de Gestion du Menu :

- **SI V (Lancer la Validation Complète) :**
  - Affichez : "**Démarrage du Workflow de Validation**"
  - Affichez : "Cela exécutera les 13 contrôles de validation sur le PRD mis à jour."
  - Affichez : "Préparation de la validation de : {prd_file_path}"
  - Affichez : "**Passage à la validation...**"
  - Lisez complètement et suivez : {validationWorkflow} (steps-v/step-v-01-discovery.md).
  - Note : Cela passe la main au workflow de validation qui exécutera son processus complet en 13 étapes.

- **SI E (Modifier encore) :**
  - Affichez : "**Modifications supplémentaires**"
  - Demandez : "Quelles modifications supplémentaires souhaiteriez-vous faire ?"
  - Acceptez l'entrée, puis affichez : "**Retour à l'étape d'édition...**"
  - Lisez complètement et suivez à nouveau : step-e-03-edit.md.

- **SI S (Résumé) :**
  - Affichez un résumé détaillé incluant :
    - Liste complète de toutes les modifications effectuées.
    - Comparaison avant/après (améliorations clés).
    - Recommandations pour les étapes suivantes.
  - Affichez : "**Workflow d'édition terminé**"
  - Quittez.

- **SI X (Quitter) :**
  - Affichez le résumé.
  - Affichez : "**Workflow d'édition terminé**"
  - Quittez.

- **SI Autre :** Aidez l'utilisateur, puis réaffichez le menu.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Résumé complet de l'édition compilé avec précision.
- Toutes les modifications clairement documentées.
- Options présentées avec des attentes claires.
- L'option de validation s'intègre parfaitement au workflow steps-v.
- L'utilisateur peut valider, éditer davantage ou quitter.
- Passage de relais propre au workflow de validation (si choisi).
- Le workflow d'édition se termine correctement.

### ❌ ÉCHEC DU SYSTÈME :

- Modifications manquantes dans le résumé.
- Option de validation non proposée.
- Fin de workflow non documentée correctement.
- Pas de passage de relais clair vers le workflow de validation.

**Règle Maîtresse :** Le workflow d'édition s'intègre parfaitement à la validation. L'utilisateur peut éditer → valider → éditer à nouveau → valider à nouveau dans un cycle d'amélioration itérative.
