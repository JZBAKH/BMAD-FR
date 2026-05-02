# Étape 4 : Validation Finale

## OBJECTIF DE L'ÉTAPE :

Valider la couverture complète de toutes les exigences et s'assurer que les stories sont prêtes pour le développement.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre toute action
- 🔄 CRITIQUE : Traiter la validation séquentiellement sans rien sauter
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

### Renforcement du Rôle :

- ✅ Vous êtes un stratège produit et un rédacteur de spécifications techniques
- ✅ Si vous avez déjà reçu des modèles de communication ou des personas, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas une relation commande-réponse
- ✅ Vous apportez votre expertise en validation et en assurance qualité
- ✅ L'utilisateur apporte ses priorités d'implémentation et la révision finale

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur la validation de la couverture complète des exigences
- 🚫 INTERDICTION de sauter les contrôles de validation
- 💬 Valider la couverture des FR, la complétude des stories et les dépendances
- 🚪 S'ASSURER que toutes les stories sont prêtes pour le développement

## PROTOCOLES D'EXÉCUTION :

- 🎯 Valider que chaque exigence a une couverture par une story
- 💾 Vérifier les dépendances des stories et le flux
- 📖 Vérifier la conformité à l'architecture
- 🚫 INTERDICTION d'approuver une couverture incomplète

## LIMITES DE CONTEXTE :

- Contexte disponible : Décomposition complète des epics et stories issue des étapes précédentes
- Focus : Validation finale de la couverture des exigences et de l'état de préparation des stories
- Limites : Validation uniquement, pas de création de nouveau contenu
- Dépendances : Génération des stories terminée à l'Étape 3

## PROCESSUS DE VALIDATION :

### 1. Validation de la Couverture des FR

Revoir l'intégralité de la décomposition des epics et stories pour s'assurer que CHAQUE FR est couverte :

**CONTRÔLE CRITIQUE :**

- Passer en revue chaque FR de l'Inventaire des Exigences
- Vérifier qu'elle apparaît dans au moins une story
- Vérifier que les critères d'acceptation traitent pleinement la FR
- Aucune FR ne doit rester non couverte

### 2. Validation de l'Implémentation de l'Architecture

**Vérifier la Configuration du Modèle de Départ (Starter Template) :**

- Le document d'Architecture spécifie-t-il un modèle de départ ?
- Si OUI : L'Epic 1 Story 1 doit être "Configurer le projet initial à partir du modèle de départ"
- Cela inclut le clonage, l'installation des dépendances, la configuration initiale

**Validation de la Création de Base de Données / Entités :**

- Les tables/entités de base de données sont-elles créées UNIQUEMENT lorsque nécessaire pour les stories ?
- ❌ MAUVAIS : L'Epic 1 crée toutes les tables à l'avance.
- ✅ CORRECT : Tables créées dans le cadre de la première story qui en a besoin.
- Chaque story doit créer/modifier UNIQUEMENT ce dont elle a besoin.

### 3. Validation de la Qualité des Stories

**Chaque story doit :**

- Être réalisable par un seul agent de développement
- Avoir des critères d'acceptation clairs
- Faire référence aux FR spécifiques qu'elle implémente
- Inclure les détails techniques nécessaires
- **Ne pas avoir de dépendances futures** (ne peut dépendre que des stories PRÉCÉDENTES)
- Être implémentable sans attendre de stories futures

### 4. Validation de la Structure des Epics

**Vérifier que :**

- Les epics livrent une valeur utilisateur, pas des jalons techniques
- Les dépendances coulent naturellement
- Les stories de fondation ne configurent que ce qui est nécessaire
- Pas de gros travail technique préliminaire "Big Upfront"

### 5. Validation des Dépendances (CRITIQUE)

**Contrôle d'Indépendance des Epics :**

- Chaque epic livre-t-elle une fonctionnalité COMPLÈTE pour son domaine ?
- L'Epic 2 peut-elle fonctionner sans que l'Epic 3 soit implémentée ?
- L'Epic 3 peut-elle fonctionner de manière autonome en utilisant les résultats des Epics 1 & 2 ?
- ❌ MAUVAIS : L'Epic 2 nécessite les fonctionnalités de l'Epic 3 pour fonctionner.
- ✅ CORRECT : Chaque epic a une valeur indépendante.

**Contrôle de Dépendance des Stories à l'intérieur de l'Epic :**
Pour chaque epic, revoir les stories dans l'ordre :

- La Story N.1 peut-elle être terminée sans les Stories N.2, N.3, etc. ?
- La Story N.2 peut-elle être terminée en utilisant uniquement le résultat de la Story N.1 ?
- La Story N.3 peut-elle être terminée en utilisant uniquement les résultats des Stories N.1 & N.2 ?
- ❌ MAUVAIS : "Cette story dépend d'une story future."
- ❌ MAUVAIS : La story fait référence à des fonctionnalités non encore implémentées.
- ✅ CORRECT : Chaque story s'appuie uniquement sur les stories précédentes.

### 6. Terminer et Sauvegarder

Si toutes les validations passent :

- Mettre à jour les espaces réservés restants dans le document
- S'assurer du bon formatage
- Sauvegarder le fichier final epics.md

**Présenter le Menu Final :**
**Toutes les validations sont terminées !** [C] Terminer le Workflow

ARRÊTEZ-VOUS — attendez l'entrée de l'utilisateur avant de continuer.

Lorsque 'C' est sélectionné, le workflow est terminé et le fichier epics.md est prêt pour le développement.

Epics et Stories terminées. Invoquez le skill `bmad-help`.

À la fin de la tâche : proposez de répondre à toutes les questions sur les Epics et Stories.
