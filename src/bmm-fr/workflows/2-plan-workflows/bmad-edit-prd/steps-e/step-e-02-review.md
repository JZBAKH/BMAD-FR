---
name: 'step-e-02-review'
description: 'Révision et Analyse Approfondies - Examiner minutieusement le PRD existant et préparer un plan de modification détaillé'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-e-03-edit.md'
prdFile: '{prd_file_path}'
validationReport: '{validation_report_path}' # Si fourni
prdPurpose: '{project-root}/_bmad/bmm/workflows/2-plan-workflows/create-prd/data/prd-purpose.md'
---

# Étape E-2 : Révision et Analyse Approfondies

## OBJECTIF DE L'ÉTAPE :

Examiner minutieusement le PRD existant, analyser les conclusions du rapport de validation (si fourni) et préparer un plan de modification détaillé avant l'édition.

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
- ✅ Vous apportez une expertise analytique et une planification des améliorations.
- ✅ L'utilisateur apporte sa connaissance du domaine et son autorité d'approbation.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la révision et l'analyse, pas encore sur l'édition.
- 🚫 INTERDICTION d'apporter des modifications au PRD lors de cette étape.
- 💬 Approche : Analyse approfondie avec confirmation du plan par l'utilisateur.
- 🚪 Il s'agit d'une étape intermédiaire - l'utilisateur confirme le plan avant de continuer.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Charger et analyser le rapport de validation (si fourni).
- 🎯 Révision approfondie de l'intégralité du PRD.
- 🎯 Mapper les conclusions de la validation à des sections spécifiques du PRD.
- 🎯 Préparer un plan de modification détaillé.
- 💬 Obtenir la confirmation du plan par l'utilisateur.
- 🚫 INTERDICTION de passer à l'édition sans l'approbation de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD, rapport de validation (si fourni), exigences de l'utilisateur issues de l'étape e-01.
- Focus : Analyse et planification uniquement (pas d'édition).
- Limites : Ne pas modifier le PRD encore, ne pas valider encore.
- Dépendances : Étape e-01 terminée - exigences et format connus.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter la révision approfondie par sous-processus

**Essayez d'utiliser l'outil Task avec un sous-agent :**

"Effectuer une révision approfondie du PRD et planifier les modifications :

**Contexte issu de l'étape e-01 :**

- Exigences de modification de l'utilisateur : {user_requirements}
- Format du PRD : {BMAD/legacy}
- Rapport de validation fourni : {oui/non}
- Mode de conversion : {restructuration/ciblé/les deux} (si legacy)

**SI un rapport de validation est fourni :**

1. Extraire toutes les conclusions du rapport de validation.
2. Mapper les conclusions à des sections spécifiques du PRD.
3. Hiérarchiser par sévérité : Critique > Avertissement > Informationnel.
4. Pour chaque problème critique : identifier la correction spécifique nécessaire.
5. Pour les objectifs manuels d'édition de l'utilisateur : identifier où les appliquer dans le PRD.

**SI aucun rapport de validation n'est fourni :**

1. Lire l'intégralité du PRD minutieusement.
2. Analyser par rapport aux standards BMAD (issus de prd-purpose.md).
3. Identifier les problèmes dans :
   - La densité d'information (anti-modèles).
   - La structure et le flux.
   - L'exhaustivité (sections/contenu manquants).
   - La mesurabilité (exigences non mesurables).
   - La traçabilité (chaînes rompues).
   - Les fuites d'implémentation.
4. Mapper les objectifs d'édition de l'utilisateur à des sections spécifiques.

**Sortie :**

- Analyse section par section.
- Modifications spécifiques nécessaires pour chaque section.
- Liste d'actions hiérarchisée.
- Ordre recommandé pour appliquer les modifications.

Retourner le plan de modification détaillé avec décomposition par section."

**Dégradation gracieuse (si l'outil Task est indisponible) :**

- Lire manuellement les sections du PRD.
- Analyser manuellement les conclusions du rapport de validation (si fourni).
- Construire le plan de modification section par section.
- Hiérarchiser les modifications par sévérité/objectifs utilisateur.

### 2. Construire le plan de modification

**Organiser par section du PRD :**

**Pour chaque section (dans l'ordre) :**

- **État Actuel :** Brève description de ce qui existe.
- **Problèmes Identifiés :** [Liste issue du rapport de validation ou de l'analyse manuelle]
- **Modifications Nécessaires :** [Changements spécifiques requis]
- **Priorité :** [Critique/Haute/Moyenne/Basse]
- **Exigences Utilisateur Satisfaites :** [Quels objectifs d'édition de l'utilisateur concernent cette section]

**Inclure :**

- Sections à ajouter (si manquantes).
- Sections à mettre à jour (si présentes mais nécessitant du travail).
- Contenu à supprimer (si incorrect/fuite).
- Changements de structure (si un reformatage est nécessaire).

### 3. Préparer le résumé du plan de modification

**Sections de résumé :**

**Modifications par Type :**

- **Ajouts :** {count} sections à ajouter.
- **Mises à jour :** {count} sections à mettre à jour.
- **Suppressions :** {count} éléments à supprimer.
- **Restructuration :** {oui/non} si une conversion de format est nécessaire.

**Répartition par Priorité :**

- **Critique :** {count} modifications (doivent être corrigées).
- **Haute :** {count} modifications (importantes).
- **Moyenne :** {count} modifications (souhaitables).
- **Basse :** {count} modifications (optionnelles).

**Effort Estimé :**
[Rapide/Modéré/Substantiel] basé sur la portée et la complexité.

### 4. Présenter le plan de modification à l'utilisateur

Affichez :

"**Révision approfondie terminée - Plan de modification**

**Analyse du PRD :**
{Bref résumé de l'état actuel du PRD}

{Si un rapport de validation est fourni :}
**Conclusions de la validation :**
{count} problèmes identifiés : {critical} critiques, {warning} avertissements.

**Vos exigences de modification :**
{résumé de ce que l'utilisateur souhaite modifier}

**Plan de modification proposé :**

**Par Section :**
{Présentez la décomposition section par section}

**Par Priorité :**

- Critique : {count} éléments
- Haute : {count} éléments
- Moyenne : {count} éléments

**Effort Estimé :** {effort level}

**Questions :**

1. Ce plan de modification correspond-il à ce que vous aviez en tête ?
2. Y a-t-il des sections que je devrais ajouter/supprimer/re-prioriser ?
3. Avez-vous des inquiétudes avant que je procède aux modifications ?

**Veuillez examiner le plan et me dire si vous souhaitez des ajustements.**"

### 5. Obtenir la confirmation de l'utilisateur

Attendez que l'utilisateur examine et fournisse ses commentaires.

**Si l'utilisateur souhaite des ajustements :**

- Discutez des modifications demandées.
- Révisez le plan de modification en conséquence.
- Présentez-le à nouveau pour confirmation.

**Si l'utilisateur approuve :**

- Note : "Plan de modification approuvé. Passage à l'étape d'édition."
- Continuez vers l'étape 6.

### 6. Documenter le plan approuvé

Enregistrez le plan de modification approuvé pour l'étape suivante :

- **Modifications approuvées :** Liste section par section.
- **Ordre de priorité :** Séquence pour appliquer les modifications.
- **Confirmé par l'utilisateur :** Oui.

Affichez : "**Plan de modification approuvé**

{Bref résumé du plan approuvé}

**Passage à l'étape d'édition...**"

Lisez complètement et suivez : {nextStepFile} (step-e-03-edit.md)

### 7. Présenter les OPTIONS DU MENU (Si l'utilisateur souhaite discuter)

**[A] Élicitation Avancée** - Obtenir des perspectives supplémentaires sur le plan de modification.
**[P] Mode Party** - Discuter avec l'équipe pour plus d'idées.
**[C] Continuer vers l'Édition** - Procéder avec le plan approuvé.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur.
- Procéder à l'édition uniquement lorsque l'utilisateur sélectionne 'C'.

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation`, puis revenez à la discussion.
- SI P : Invoquez la compétence `bmad-party-mode`, puis revenez à la discussion.
- SI C : Documentez l'approbation, puis chargez {nextStepFile}.
- SI Autre : discutez, puis réaffichez le menu.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Analyse complète des conclusions du rapport de validation (si fourni).
- Révision approfondie du PRD effectuée systématiquement.
- Plan de modification construit section par section.
- Modifications hiérarchisées par sévérité/objectifs utilisateur.
- Présentation d'un plan clair à l'utilisateur.
- Confirmation ou ajustement du plan par l'utilisateur.
- Plan approuvé documenté pour l'étape suivante.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas analyser les conclusions du rapport de validation (si fourni).
- Révision superficielle au lieu d'une analyse approfondie.
- Décomposition section par section manquante.
- Ne pas hiérarchiser les modifications.
- Procéder sans l'approbation de l'utilisateur.

**Règle Maîtresse :** Planifier avant de modifier. Une analyse approfondie garantit que nous apportons les bons changements dans le bon ordre. L'approbation de l'utilisateur évite les désalignements.
