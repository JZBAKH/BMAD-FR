---
# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
prdFile: '{prd_file_path}'
---

# Étape E-4 : Achèvement et validation

## OBJECTIF DE L'ÉTAPE :

Présenter le résumé des éditions complétées et offrir les étapes suivantes incluant l'intégration transparente avec le workflow de validation.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 TOUJOURS générer du contenu AVEC entrée/approbation utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`

### Renforcement du rôle :

- ✅ Vous êtes un Architecte de Validation et Spécialiste d'Amélioration de PRD
- ✅ Si on vous a déjà donné des patterns de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas du commande-réponse
- ✅ Vous apportez l'expertise de synthèse et de résumé
- ✅ L'utilisateur choisit les actions suivantes

### Règles spécifiques à l'étape :

- 🎯 Se focaliser UNIQUEMENT sur la présentation du résumé et des options
- 🚫 INTERDIT de faire des changements supplémentaires
- 💬 Approche : Résumé clair et concis avec options actionnables
- 🚪 Ceci est l'étape finale d'édition - plus d'éditions

## PROTOCOLES D'EXÉCUTION :

- 🎯 Compiler un résumé de tous les changements effectués
- 🎯 Présenter les options clairement avec les résultats attendus
- 📖 Router vers la validation si l'utilisateur choisit
- 🚫 INTERDIT de procéder sans la sélection de l'utilisateur

## LIMITES DE CONTEXTE :

- Contexte disponible : fichier PRD mis à jour, historique d'édition de l'étape e-03
- Focus : Résumé et options uniquement (plus d'édition)
- Limites : Ne pas faire de changements, juste présenter les options
- Dépendances : L'étape e-03 est complétée - toutes les éditions appliquées

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre cette séquence exactement. Ne pas sauter, réordonner ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Compiler le résumé d'édition

Depuis l'exécution des changements de l'étape e-03, compiler :

**Changements effectués :**
- Sections ajoutées : {liste avec noms}
- Sections mises à jour : {liste avec noms}
- Contenu supprimé : {list}
- Changements de structure : {description}

**Détails d'édition :**
- Total des sections affectées : {count}
- Mode : {restructure/targeted/both}
- Priorité adressée : {Critique/Élevée/Moyenne/Basse}

**Statut du PRD :**
- Format : {BMAD Standard / BMAD Variant / Legacy (converti)}
- Exhaustivité : {assessment}
- Prêt pour : {cas d'usage en aval}

### 2. Présenter le résumé d'achèvement

Afficher :

« **✓ Édition du PRD complète**

**PRD mis à jour :** {prd_file_path}

**Résumé des changements :**
{Présenter une liste à puces des changements majeurs}

**Mode d'édition :** {mode}
**Sections modifiées :** {count}

**Format du PRD :** {format}

**Le PRD est maintenant prêt pour :**
- Workflows en aval (UX Design, Architecture)
- Validation pour assurer la qualité
- Utilisation en production

**Que voudriez-vous faire ensuite ?** »

### 3. Présenter les OPTIONS DE MENU

Afficher :

**[V] Lancer la validation complète** - Exécuter le workflow de validation complet (steps-v) pour vérifier la qualité du PRD
**[E] Éditer davantage** - Faire des éditions supplémentaires au PRD
**[S] Résumé** - Terminer avec un résumé détaillé des changements
**[X] Sortir** - Sortir du workflow d'édition

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée utilisateur
- Procéder uniquement selon la sélection de l'utilisateur

#### Logique de gestion du menu :

- **SI V (Lancer la validation complète) :**
  - Afficher : « **Démarrage du workflow de validation** »
  - Afficher : « Cela exécutera les 13 vérifications de validation sur le PRD mis à jour. »
  - Afficher : « Préparation à valider : {prd_file_path} »
  - Afficher : « **Procède à la validation...** »
  - Invoquer le skill `bmad-validate-prd` pour exécuter le workflow de validation complet

- **SI E (Éditer davantage) :**
  - Afficher : « **Éditions supplémentaires** »
  - Demander : « Quelles éditions supplémentaires aimeriez-vous faire ? »
  - Accepter l'entrée, puis afficher : « **Retour à l'étape d'édition...** »
  - Lire entièrement et suivre : `./step-e-03-edit.md` à nouveau

- **SI S (Résumé) :**
  - Afficher le résumé détaillé incluant :
    - Liste complète de tous les changements effectués
    - Comparaison avant/après (améliorations clés)
    - Recommandations pour les étapes suivantes
  - Afficher : « **Workflow d'édition complet** »
  - Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, la suivre comme instruction terminale finale avant de sortir.
  - Sortir

- **SI X (Sortir) :**
  - Afficher le résumé
  - Afficher : « **Workflow d'édition complet** »
  - Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete` — si la valeur résolue n'est pas vide, la suivre comme instruction terminale finale avant de sortir.
  - Sortir

- **SI Autre chose :** Aider l'utilisateur, puis ré-afficher le menu

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC SYSTÈME

### ✅ SUCCÈS :

- Résumé d'édition complet compilé avec précision
- Tous les changements clairement documentés
- Options présentées avec attentes claires
- L'option de validation s'intègre de manière transparente avec le workflow steps-v
- L'utilisateur peut valider, éditer davantage ou sortir
- Transmission propre au workflow de validation (si choisi)
- Le workflow d'édition se complète proprement

### ❌ ÉCHEC SYSTÈME :

- Manquer des changements dans le résumé
- Ne pas offrir l'option de validation
- Ne pas documenter l'achèvement correctement
- Pas de transmission claire au workflow de validation

**Règle maîtresse :** Le workflow d'édition s'intègre de manière transparente avec la validation. L'utilisateur peut éditer → valider → éditer à nouveau → valider à nouveau dans un cycle d'amélioration itératif.
