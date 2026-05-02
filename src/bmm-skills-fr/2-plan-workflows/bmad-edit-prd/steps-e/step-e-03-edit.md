---
# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
prdFile: '{prd_file_path}'
prdPurpose: '../data/prd-purpose.md'
---

# Étape E-3 : Édition et mise à jour

## OBJECTIF DE L'ÉTAPE :

Appliquer les changements au PRD en suivant le plan de changement approuvé de l'étape e-02, incluant les mises à jour de contenu, les améliorations de structure, et la conversion de format si nécessaire.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 TOUJOURS générer du contenu AVEC entrée/approbation utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu d'artefact et de document dans `{document_output_language}`

### Renforcement du rôle :

- ✅ Vous êtes un Architecte de Validation et Spécialiste d'Amélioration de PRD
- ✅ Si on vous a déjà donné des patterns de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas du commande-réponse
- ✅ Vous apportez l'expertise analytique et des compétences d'édition précises
- ✅ L'utilisateur apporte la connaissance du domaine et l'autorité d'approbation

### Règles spécifiques à l'étape :

- 🎯 Se focaliser UNIQUEMENT sur l'implémentation des changements approuvés depuis l'étape e-02
- 🚫 INTERDIT de faire des changements au-delà du plan approuvé
- 💬 Approche : Exécution méthodique, section par section
- 🚪 Ceci est une étape intermédiaire - l'utilisateur peut demander des ajustements

## PROTOCOLES D'EXÉCUTION :

- 🎯 Suivre le plan de changement approuvé systématiquement
- 💾 Éditer le contenu du PRD selon le plan
- 📖 Mettre à jour le frontmatter selon les besoins
- 🚫 INTERDIT de procéder sans achèvement

## LIMITES DE CONTEXTE :

- Contexte disponible : fichier PRD, plan de changement approuvé de l'étape e-02, standards prd-purpose
- Focus : Implémenter les changements du plan approuvé uniquement
- Limites : Ne pas ajouter de changements au-delà du plan, ne pas valider encore
- Dépendances : L'étape e-02 est complétée - plan approuvé par l'utilisateur

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre cette séquence exactement. Ne pas sauter, réordonner ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Récupérer le plan de changement approuvé

Depuis l'étape e-02, récupérer :
- **Changements approuvés :** Liste section par section
- **Ordre de priorité :** Séquence pour appliquer les changements
- **Exigences utilisateur :** Objectifs d'édition de l'étape e-01

Afficher : « **Démarrage des éditions du PRD**

**Plan de changement :** {summary}
**Total des changements :** {count}
**Effort estimé :** {niveau d'effort}

**Procède aux éditions section par section...** »

### 2. Tenter les éditions par sous-processus (Pour changements complexes)

**Essayer d'utiliser l'outil Task avec un sous-agent pour les sections majeures :**

« Exécuter les éditions du PRD pour {section_name} :

**Contexte :**
- Section à éditer : {section_name}
- Contenu actuel : {existing content}
- Changements nécessaires : {specific changes from plan}
- Standards du PRD BMAD : Charger depuis prd-purpose.md

**Tâches :**
1. Lire la section actuelle du PRD
2. Appliquer les changements spécifiés
3. Assurer la conformité aux principes du PRD BMAD :
   - Haute densité d'information (pas de remplissage)
   - Exigences mesurables
   - Structure claire
   - Formatage markdown approprié
4. Retourner le contenu de la section mise à jour

Appliquer les changements et retourner la section mise à jour. »

**Dégradation gracieuse (si pas d'outil Task) :**
- Effectuer les éditions directement dans le contexte actuel
- Charger la section du PRD, appliquer les changements, sauvegarder

### 3. Exécuter les changements section par section

**Pour chaque section dans le plan approuvé (dans l'ordre de priorité) :**

**a) Charger la section actuelle**
- Lire le contenu actuel de la section du PRD
- Noter ce qui existe

**b) Appliquer les changements selon le plan**
- Ajouts : Créer de nouvelles sections avec un contenu approprié
- Mises à jour : Modifier le contenu existant selon le plan
- Suppressions : Supprimer le contenu spécifié
- Restructuration : Reformater le contenu selon le standard BMAD

**c) Mettre à jour le fichier PRD**
- Appliquer les changements au PRD
- Sauvegarder le PRD mis à jour
- Vérifier que les changements sont appliqués correctement

**Afficher la progression après chaque section :**
« **Section mise à jour :** {section_name}
Changements : {bref résumé}
{Plus de sections restantes...} »

### 4. Gérer la restructuration (si nécessaire)

**Si le mode de conversion est « Restructuration complète » ou « Les deux » :**

**Pour la restructuration :**
- Réorganiser le PRD à la structure standard BMAD
- Assurer les en-têtes de niveau 2 ## appropriés
- Réordonner les sections logiquement
- Mettre à jour le frontmatter du PRD pour correspondre au format BMAD

**Suivre la structure du PRD BMAD :**
1. Résumé Exécutif
2. Critères de Succès
3. Périmètre Produit
4. Parcours Utilisateurs
5. Exigences de Domaine (si applicable)
6. Analyse d'Innovation (si applicable)
7. Exigences par Type de Projet
8. Exigences Fonctionnelles
9. Exigences Non-Fonctionnelles

Afficher : « **PRD restructuré**
Structure standard BMAD appliquée.
{Sections ajoutées/réordonnées} »

### 5. Mettre à jour le frontmatter du PRD

**S'assurer que le frontmatter est complet et précis :**

```yaml
---
workflowType: 'prd'
workflow: 'create'  # ou 'validate' ou 'edit'
classification:
  domain: '{domain}'
  projectType: '{project_type}'
  complexity: '{complexity}'
inputDocuments: [list of input documents]
stepsCompleted: ['step-e-01-discovery', 'step-e-02-review', 'step-e-03-edit']
lastEdited: '{current_date}'
editHistory:
  - date: '{current_date}'
    changes: '{summary of changes}'
---
```

**Mettre à jour le frontmatter en conséquence.**

### 6. Revue finale des changements

**Charger le PRD complet mis à jour**

**Vérifier :**
- Tous les changements approuvés appliqués correctement
- La structure du PRD est solide
- Aucune modification non intentionnelle
- Le frontmatter est précis

**Si problèmes trouvés :**
- Les corriger maintenant
- Noter les corrections faites

**Si l'utilisateur veut des ajustements :**
- Accepter les retours et faire des ajustements
- Re-vérifier après les ajustements

### 7. Confirmer l'achèvement

Afficher :

« **Éditions du PRD complètes**

**Changements appliqués :** {count} sections modifiées
**PRD mis à jour :** {prd_file_path}

**Résumé des changements :**
{Brève liste à puces des changements majeurs}

**Le PRD est prêt pour :**
- Utilisation dans les workflows en aval (UX, Architecture)
- Validation (s'il n'a pas encore été validé)

**Que voudriez-vous faire ensuite ?** »

### 8. Présenter les OPTIONS DE MENU

**[V] Lancer la validation** - Exécuter le workflow de validation complet (./steps-v/step-v-01-discovery.md)
**[S] Résumé seulement** - Terminer avec un résumé des changements (sans validation)
**[A] Ajuster** - Faire des éditions supplémentaires
**[X] Sortir** - Sortir du workflow d'édition

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée utilisateur
- Procéder uniquement selon la sélection de l'utilisateur

#### Logique de gestion du menu :

- SI V (Valider) : Afficher « Démarrage du workflow de validation... » puis lire entièrement et suivre : `./steps-v/step-v-01-discovery.md`
- SI S (Résumé) : Présenter le résumé d'édition et sortir
- SI A (Ajuster) : Accepter les exigences supplémentaires, boucler vers l'édition
- SI X (Sortir) : Afficher le résumé et sortir

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC SYSTÈME

### ✅ SUCCÈS :

- Tous les changements approuvés depuis l'étape e-02 appliqués correctement
- Changements exécutés dans l'ordre de priorité prévu
- Restructuration complétée (si nécessaire)
- Frontmatter mis à jour avec précision
- La vérification finale confirme les changements
- L'utilisateur peut procéder à la validation ou sortir avec résumé
- L'option de lancer la validation intègre les modes d'édition et de validation de manière transparente

### ❌ ÉCHEC SYSTÈME :

- Faire des changements au-delà du plan approuvé
- Ne pas suivre l'ordre de priorité
- Manquer la restructuration (si mode de conversion)
- Ne pas mettre à jour le frontmatter
- Pas de vérification finale
- Ne pas sauvegarder le PRD mis à jour

**Règle maîtresse :** Exécuter le plan exactement comme approuvé. Le PRD est maintenant prêt pour la validation ou l'utilisation en aval. L'intégration de la validation assure la qualité.
