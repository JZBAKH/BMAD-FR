---
# Références de fichiers
outputFile: '{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md'
---

# Étape 6 : Finalisation du Brief Produit

## OBJECTIF DE L'ÉTAPE :

Terminer le workflow du brief produit, mettre à jour les fichiers de statut et fournir des conseils sur les étapes suivantes logiques pour la poursuite du développement du produit.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- 📖 CRITIQUE : Lisez l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un facilitateur Business Analyst orienté produit.
- ✅ Si un nom, un style de communication et un persona vous ont déjà été attribués, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous engageons un dialogue collaboratif, pas une relation commande-réponse.
- ✅ Vous apportez une pensée structurée et des compétences de facilitation, tandis que l'utilisateur apporte son expertise métier et sa vision produit.
- ✅ Maintenez un ton de finalisation collaborative tout au long du processus.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous uniquement sur la finalisation, les étapes suivantes et les conseils sur le projet.
- 🚫 INTERDICTION de générer du nouveau contenu pour le brief produit.
- 💬 Approche : Finalisation systématique avec validation de la qualité et recommandations pour la suite.
- 📋 FINALISEZ le document et mettez à jour le statut du workflow de manière appropriée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- 💾 Mettez à jour le fichier de statut principal du workflow avec les informations de complétion.
- 📖 Suggérez à l'utilisateur les prochaines étapes potentielles du workflow.
- 🚫 NE PAS charger d'étapes supplémentaires après celle-ci (c'est l'étape finale).

## LIMITES DE CONTEXTE :

- Contexte disponible : Document de brief produit complet issu de toutes les étapes précédentes, frontmatter du workflow montrant toutes les étapes terminées.
- Focus : Validation de la complétion, mises à jour des statuts et conseils sur les étapes suivantes.
- Limites : Pas de génération de nouveau contenu, uniquement des activités de finalisation et de clôture.
- Dépendances : Toutes les étapes précédentes doivent être terminées avec le contenu enregistré dans le document.

## Séquence d'Instructions (Ne pas dévier, sauter ou optimiser)

### 1. Annoncer la Fin du Workflow

**Annonce de Complétion :**
"🎉 **Brief Produit Terminé, {{user_name}} !**

Nous avons collaboré avec succès pour créer un brief produit complet pour {{project_name}}.

**Ce que nous avons accompli :**

- ✅ Résumé opérationnel avec une vision et un énoncé du problème clairs.
- ✅ Vision centrale avec définition de la solution et différenciateurs uniques.
- ✅ Utilisateurs cibles avec des personas riches et des parcours utilisateurs.
- ✅ Métriques de réussite avec des résultats mesurables et des objectifs commerciaux.
- ✅ Périmètre MVP avec un ensemble de fonctionnalités ciblé et des limites claires.
- ✅ Vision future inspirante tout en maintenant le focus actuel.

**Le Brief Produit complet est maintenant disponible à l'emplacement :** `{outputFile}`

Ce brief servira de base à toutes les activités ultérieures de développement de produit et aux décisions stratégiques."

### 2. Contrôle Qualité du Document

**Validation de l'Exhaustivité :**
Effectuez une validation finale du brief produit :

- Le résumé opérationnel communique-t-il clairement la vision et le problème ?
- Les utilisateurs cibles sont-ils bien définis avec des personas convaincants ?
- Les métriques de réussite relient-elles la valeur utilisateur aux objectifs commerciaux ?
- Le périmètre MVP est-il ciblé et réaliste ?
- Le brief fournit-il une direction claire pour les étapes suivantes ?

**Validation de la Cohérence :**

- Toutes les sections s'alignent-elles sur l'énoncé du problème central ?
- La valeur utilisateur est-elle soulignée de manière cohérente tout au long du document ?
- Les critères de réussite sont-ils traçables jusqu'aux besoins des utilisateurs et aux objectifs commerciaux ?
- Le périmètre MVP est-il en phase avec le problème et la solution ?

### 3. Suggérer les Étapes Suivantes

**Workflows Suivants Recommandés :**
Fournissez des conseils sur les workflows logiques à suivre :

1. `create-prd` — Créer un document de spécifications fonctionnelles détaillé (PRD).
   - Le brief sert de fondation aux exigences détaillées.
   - Les personas informent la cartographie des parcours déétaillés.
   - Les métriques de réussite deviennent des critères d'acceptation spécifiques.
   - Le périmètre MVP devient des spécifications fonctionnelles détaillées.

**Autres Étapes Suivantes Potentielles :**

1. `create-ux-design` — Recherche et design UX (peut s'exécuter en parallèle avec le PRD).
2. `domain-research` — Recherche approfondie sur le marché ou le domaine (si nécessaire).

**Considérations Stratégiques :**

- Le workflow PRD s'appuie directement sur ce brief pour une planification détaillée.
- Prenez en compte la capacité de l'équipe et les priorités immédiates.
- Utilisez le brief pour valider le concept avant de vous engager dans un travail détaillé.
- Le brief peut guider les premières discussions sur la faisabilité technique.

### 4. Félicitations à l'Utilisateur

"**Votre Brief Produit pour {{project_name}} est maintenant terminé et prêt pour la phase suivante !**"

Récapitulez que le brief capture tout ce qui est nécessaire pour guider le développement ultérieur du produit :

- Vision claire et définition du problème.
- Compréhension profonde des utilisateurs cibles.
- Critères de réussite mesurables.
- Périmètre MVP ciblé avec des limites réalistes.
- Vision inspirante à long terme.

### 5. Suggérer la Suite

Brief Produit terminé. Invoquez la compétence `bmad-help`.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Le brief produit contient toutes les sections essentielles avec un contenu collaboratif.
- Tout le contenu collaboratif est correctement enregistré dans le document avec le frontmatter approprié.
- Le fichier de statut du workflow est mis à jour avec les informations de complétion et l'horodatage.
- Des conseils clairs sur les étapes suivantes sont fournis à l'utilisateur avec des recommandations de workflows spécifiques.
- Validation de la qualité du document effectuée avec des vérifications d'exhaustivité et de cohérence.
- L'utilisateur reconnaît la fin de l'étape et comprend les prochaines options disponibles.
- Le workflow est correctement marqué comme terminé dans le suivi des statuts.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas mettre à jour le fichier de statut du workflow avec les informations de complétion.
- Absence de conseils clairs sur les étapes suivantes pour l'utilisateur.
- Ne pas confirmer l'exhaustivité du document avec l'utilisateur.
- Workflow non marqué correctement comme terminé dans le suivi des statuts.
- Utilisateur incertain de la suite ou des options disponibles.
- Problèmes de qualité du document non identifiés ou non traités.

**Règle Maîtresse :** Sauter des étapes, optimiser les séquences ou ne pas suivre les instructions exactes est INTERDIT et constitue un ÉCHEC DU SYSTÈME.

## FINALISATION DU WORKFLOW

Ce brief produit est maintenant terminé et sert de fondation stratégique pour tout le cycle de vie du produit. Tout le travail ultérieur de design, d'architecture et de développement doit pouvoir être relié à la vision, aux besoins des utilisateurs et aux critères de réussite documentés dans ce brief.

**Félicitations pour avoir terminé le Brief Produit de {{project_name}} !** 🎉
