---
name: 'step-e-03-edit'
description: 'Édition et Mise à Jour - Appliquer les modifications au PRD en suivant le plan de modification approuvé'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-e-04-complete.md'
prdFile: '{prd_file_path}'
prdPurpose: '{project-root}/_bmad/bmm/workflows/2-plan-workflows/create-prd/data/prd-purpose.md'
---

# Étape E-3 : Édition et Mise à Jour

## OBJECTIF DE L'ÉTAPE :

Appliquer les modifications au PRD en suivant le plan de modification approuvé à l'étape e-02, incluant les mises à jour de contenu, les améliorations de structure et la conversion de format si nécessaire.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 TOUJOURS générer du contenu AVEC l'entrée/approbation de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Amélioration de PRD.
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une commande-réponse.
- ✅ Vous apportez une expertise analytique et des compétences d'édition précises.
- ✅ L'utilisateur apporte sa connaissance du domaine et son autorité d'approbation.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la mise en œuvre des modifications approuvées à l'étape e-02.
- 🚫 INTERDICTION d'apporter des modifications au-delà du plan approuvé.
- 💬 Approche : Exécution méthodique, section par section.
- 🚪 Il s'agit d'une étape intermédiaire - l'utilisateur peut demander des ajustements.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Suivre systématiquement le plan de modification approuvé.
- 💾 Modifier le contenu du PRD conformément au plan.
- 📖 Mettre à jour le frontmatter selon les besoins.
- 🚫 INTERDICTION de procéder sans avoir terminé l'exécution.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD, plan de modification approuvé à l'étape e-02, standards prd-purpose.
- Focus : Mise en œuvre des modifications du plan approuvé uniquement.
- Limites : Ne pas ajouter de changements hors plan, ne pas valider encore.
- Dépendances : Étape e-02 terminée - plan approuvé par l'utilisateur.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Récupérer le plan de modification approuvé

Depuis l'étape e-02, récupérez :

- **Modifications approuvées :** Liste section par section.
- **Ordre de priorité :** Séquence pour appliquer les modifications.
- **Exigences utilisateur :** Objectifs d'édition issus de l'étape e-01.

Affichez : "**Démarrage des modifications du PRD**

**Plan de modification :** {summary}
**Total des modifications :** {count}
**Effort estimé :** {effort level}

**Poursuite des modifications section par section...**"

### 2. Tenter les modifications par sous-processus (pour les changements complexes)

**Essayez d'utiliser l'outil Task avec un sous-agent pour les sections majeures :**

"Exécuter les modifications du PRD pour {section_name} :

**Contexte :**

- Section à modifier : {section_name}
- Contenu actuel : {existing content}
- Modifications nécessaires : {specific changes from plan}
- Standards PRD BMAD : Charger à partir de prd-purpose.md.

**Tâches :**

1. Lire la section actuelle du PRD.
2. Appliquer les modifications spécifiées.
3. Garantir la conformité aux principes du PRD BMAD :
   - Haute densité d'information (pas de remplissage).
   - Exigences mesurables.
   - Structure claire.
   - Formatage Markdown approprié.
4. Retourner le contenu de la section mise à jour.

Appliquer les modifications et retourner la section mise à jour."

**Dégradation gracieuse (si l'outil Task est indisponible) :**

- Effectuer les modifications directement dans le contexte actuel.
- Charger la section du PRD, appliquer les modifications, enregistrer.

### 3. Exécuter les modifications section par section

**Pour chaque section du plan approuvé (par ordre de priorité) :**

**a) Charger la section actuelle**

- Lire le contenu de la section actuelle du PRD.
- Noter ce qui existe.

**b) Appliquer les modifications selon le plan**

- Ajouts : Créer de nouvelles sections avec un contenu approprié.
- Mises à jour : Modifier le contenu existant selon le plan.
- Suppressions : Supprimer le contenu spécifié.
- Restructuration : Reformater le contenu selon le standard BMAD.

**c) Mettre à jour le fichier PRD**

- Appliquer les modifications au PRD.
- Enregistrer le PRD mis à jour.
- Vérifier que les modifications ont été appliquées correctement.

**Afficher la progression après chaque section :**
"**Section mise à jour :** {section_name}
Modifications : {brief summary}
{X sections restantes...}"

### 4. Gérer la restructuration (si nécessaire)

**Si le mode de conversion est "Restructuration complète" ou "Les deux" :**

**Pour la restructuration :**

- Réorganiser le PRD selon la structure standard BMAD.
- Assurer la présence d'en-têtes de niveau 2 (##) appropriés.
- Réordonner les sections de manière logique.
- Mettre à jour le frontmatter du PRD pour correspondre au format BMAD.

**Suivre la structure du PRD BMAD :**

1. Résumé Analytique (Executive Summary)
2. Critères de Succès
3. Périmètre du Produit (Product Scope)
4. Parcours Utilisateurs
5. Exigences du Domaine (si applicable)
6. Analyse de l'Innovation (si applicable)
7. Exigences liées au Type de Projet
8. Exigences Fonctionnelles
9. Exigences Non Fonctionnelles

Affichez : "**PRD Restructuré**
Structure standard BMAD appliquée.
{Sections ajoutées/réordonnées}"

### 5. Mettre à jour le frontmatter du PRD

**S'assurer que le frontmatter est complet et exact :**

```yaml
---
workflowType: 'prd'
workflow: 'create' # ou 'validate' ou 'edit'
classification:
  domain: '{domain}'
  projectType: '{project_type}'
  complexity: '{complexity}'
inputDocuments: [liste de documents sources]
stepsCompleted: ['step-e-01-discovery', 'step-e-02-review', 'step-e-03-edit']
lastEdited: '{current_date}'
editHistory:
  - date: '{current_date}'
    changes: '{résumé des modifications}'
---
```

**Mettre à jour le frontmatter en conséquence.**

### 6. Révision finale des modifications

**Charger le PRD complet mis à jour.**

**Vérifier :**

- Toutes les modifications approuvées ont été appliquées correctement.
- La structure du PRD est saine.
- Pas de modifications involontaires.
- Le frontmatter est exact.

**Si des problèmes sont trouvés :**

- Les corriger maintenant.
- Noter les corrections effectuées.

**Si l'utilisateur souhaite des ajustements :**

- Accepter les commentaires et effectuer les ajustements.
- Revérifier après les ajustements.

### 7. Confirmer la fin de l'édition

Affichez :

"**Modifications du PRD terminées**

**Modifications appliquées :** {count} sections modifiées.
**PRD mis à jour :** {prd_file_path}

**Résumé des modifications :**
{Brève liste à puces des principaux changements}

**Le PRD est prêt pour :**

- Utilisation dans les workflows en aval (UX, Architecture).
- Validation (si pas encore validé).

**Que souhaitez-vous faire ensuite ?**"

### 8. Présenter les OPTIONS DU MENU

**[V] Lancer la Validation** - Exécuter le workflow complet de validation (steps-v/step-v-01-discovery.md).
**[S] Résumé uniquement** - Terminer avec le résumé des modifications (pas de validation).
**[A] Ajuster** - Effectuer des modifications supplémentaires.
**[X] Quitter** - Quitter le workflow d'édition.

#### RÈGLES d'EXÉCUTION :

- TOUALWAYS s'arrêter et attendre l'entrée de l'utilisateur.
- Procéder uniquement en fonction de la sélection de l'utilisateur.

#### Logique de gestion du menu :

- SI V (Valider) : Affichez "Démarrage du workflow de validation..." puis lisez complètement et suivez : steps-v/step-v-01-discovery.md.
- SI S (Résumé) : Présentez le résumé de l'édition et quittez.
- SI A (Ajuster) : Acceptez les exigences supplémentaires, revenez à l'édition.
- SI X (Quitter) : Affichez le résumé et quittez.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Toutes les modifications approuvées à l'étape e-02 appliquées correctement.
- Modifications exécutées dans l'ordre de priorité prévu.
- Restructuration terminée (si nécessaire).
- Frontmatter mis à jour avec précision.
- La vérification finale confirme les modifications.
- L'utilisateur peut passer à la validation ou quitter avec un résumé.
- L'option de lancer la validation intègre parfaitement les modes d'édition et de validation.

### ❌ ÉCHEC DU SYSTÈME :

- Effectuer des modifications au-delà du plan approuvé.
- Ne pas suivre l'ordre de priorité.
- Restructuration manquante (si en mode conversion).
- Ne pas mettre à jour le frontmatter.
- Pas de vérification finale.
- Ne pas enregistrer le PRD mis à jour.

**Règle Maîtresse :** Exécuter le plan exactement tel qu'approuvé. Le PRD est maintenant prêt pour la validation ou une utilisation en aval. L'intégration de la validation garantit la qualité.
