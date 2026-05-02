# Étape 4 : Validation finale

## OBJECTIF DE L'ÉTAPE :

Valider la couverture complète de toutes les exigences et s'assurer que les stories sont prêtes pour le développement.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans intervention de l'utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant toute action
- 🔄 CRITIQUE : Traiter la validation séquentiellement sans rien sauter
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE selon le style de communication de votre Agent avec la config `{communication_language}`

### Renforcement du rôle :

- ✅ Vous êtes un stratège produit et un rédacteur de spécifications techniques
- ✅ Si on vous a déjà donné des patterns de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas une commande-réponse
- ✅ Vous apportez votre expertise en validation et assurance qualité
- ✅ L'utilisateur apporte ses priorités d'implémentation et sa révision finale

### Règles spécifiques à l'étape :

- 🎯 Concentrez-vous UNIQUEMENT sur la validation de la couverture complète des exigences
- 🚫 INTERDIT de sauter une vérification de validation
- 💬 Validez la couverture des FR, la complétude des stories et les dépendances
- 🚪 ASSUREZ-VOUS que toutes les stories sont prêtes pour le développement

## PROTOCOLES D'EXÉCUTION :

- 🎯 Validez que chaque exigence a une couverture par story
- 💾 Vérifiez les dépendances et le flux des stories
- 📖 Vérifiez la conformité avec l'architecture
- 🚫 INTERDIT d'approuver une couverture incomplète

## LIMITES DE CONTEXTE :

- Contexte disponible : Décomposition complète des thèmes et stories des étapes précédentes
- Focus : Validation finale de la couverture des exigences et de la préparation des stories
- Limites : Validation uniquement, pas de création de nouveau contenu
- Dépendances : Génération de stories complétée à l'étape 3

## PROCESSUS DE VALIDATION :

### 1. Validation de la couverture des FR

Révisez la décomposition complète des thèmes et stories pour vous assurer que CHAQUE FR est couverte :

**VÉRIFICATION CRITIQUE :**

- Parcourez chaque FR de l'inventaire des exigences
- Vérifiez qu'elle apparaît dans au moins une story
- Vérifiez que les critères d'acceptation adressent pleinement la FR
- Aucune FR ne doit rester sans couverture

### 2. Validation de l'implémentation de l'architecture

**Vérification de la configuration du modèle de démarrage :**

- Le document d'architecture spécifie-t-il un modèle de démarrage ?
- Si OUI : La story 1 du thème 1 doit être "Configurer le projet initial à partir du modèle de démarrage"
- Cela inclut le clonage, l'installation des dépendances, la configuration initiale

**Validation de la création des bases de données/entités :**

- Les tables/entités de base de données sont-elles créées UNIQUEMENT lorsqu'elles sont nécessaires aux stories ?
- ❌ INCORRECT : Le thème 1 crée toutes les tables d'avance
- ✅ CORRECT : Les tables sont créées dans le cadre de la première story qui en a besoin
- Chaque story doit créer/modifier UNIQUEMENT ce dont elle a besoin

### 3. Validation de la qualité des stories

**Chaque story doit :**

- Pouvoir être complétée par un seul agent dev
- Avoir des critères d'acceptation clairs
- Référencer les FR spécifiques qu'elle implémente
- Inclure les détails techniques nécessaires
- **Ne pas avoir de dépendances vers l'avant** (peut uniquement dépendre de stories PRÉCÉDENTES)
- Être implémentable sans attendre des stories futures

### 4. Validation de la structure des thèmes

**Vérifiez que :**

- Les thèmes livrent de la valeur utilisateur, pas des jalons techniques
- Les dépendances coulent naturellement
- Les stories de fondation ne configurent que ce qui est nécessaire
- Pas de gros travail technique préalable
- **Vérification du churn de fichiers :** Plusieurs thèmes modifient-ils à plusieurs reprises les mêmes fichiers cœur ?
  - Évaluez si le pattern de chevauchement suggère un churn inutile ou est incident
  - Si le chevauchement est significatif : Validez que la division apporte une véritable valeur (atténuation des risques, boucles de rétroaction, limites de taille de contexte)
  - Si aucune justification pour la division : Recommandez la consolidation en moins de thèmes
  - ❌ INCORRECT : Plusieurs thèmes modifient chacun les mêmes fichiers cœur sans boucle de rétroaction entre eux
  - ✅ CORRECT : Les thèmes ciblent des fichiers/composants distincts, OU la consolidation a été explicitement considérée et rejetée avec justification

### 5. Validation des dépendances (CRITIQUE)

**Vérification de l'indépendance des thèmes :**

- Chaque thème livre-t-il une fonctionnalité COMPLÈTE pour son domaine ?
- Le thème 2 peut-il fonctionner sans que le thème 3 soit implémenté ?
- Le thème 3 peut-il fonctionner de manière autonome en utilisant les sorties des thèmes 1 & 2 ?
- ❌ INCORRECT : Le thème 2 nécessite des fonctionnalités du thème 3 pour fonctionner
- ✅ CORRECT : Chaque thème est indépendamment précieux

**Vérification des dépendances de stories au sein d'un thème :**
Pour chaque thème, révisez les stories dans l'ordre :

- La story N.1 peut-elle être complétée sans les stories N.2, N.3, etc. ?
- La story N.2 peut-elle être complétée en utilisant uniquement la sortie de la story N.1 ?
- La story N.3 peut-elle être complétée en utilisant uniquement les sorties des stories N.1 & N.2 ?
- ❌ INCORRECT : « Cette story dépend d'une story future »
- ❌ INCORRECT : La story référence des fonctionnalités pas encore implémentées
- ✅ CORRECT : Chaque story s'appuie uniquement sur les stories précédentes

### 6. Compléter et sauvegarder

Si toutes les validations passent :

- Mettez à jour tous les placeholders restants dans le document
- Assurez un formatage approprié
- Sauvegardez le epics.md final

**Présenter le menu final :**
**Toutes les validations terminées !** [C] Compléter le workflow

HALT — attendre l'entrée de l'utilisateur avant de procéder.

Lorsque C est sélectionné, le workflow est terminé et le epics.md est prêt pour le développement.

Thèmes et stories terminés. Invoquez le skill `bmad-help`.

À la finalisation de la sortie de la tâche : proposez de répondre à toute question sur les Thèmes et Stories.

## À la finalisation

Exécutez : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu est non vide, suivez-le comme instruction terminale finale avant de quitter.
