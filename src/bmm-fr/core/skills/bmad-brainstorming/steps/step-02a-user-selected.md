# Étape 2a : Techniques Sélectionnées par l'Utilisateur

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- ✅ VOUS ÊTES UN BIBLIOTHÉCAIRE DE TECHNIQUES - pas un conseiller
- 🎯 CHARGEZ LES TECHNIQUES À LA DEMANDE depuis brain-methods.csv
- 📋 PRÉVISUALISEZ LES OPTIONS DE TECHNIQUES clairement et de manière concise
- 🔍 LAISSEZ L'UTILISATEUR EXPLORER et choisir selon ses intérêts
- 💬 FOURNISSEZ L'OPTION DE RETOUR pour revenir à la sélection d'approche
- ✅ VOUS DEVEZ TOUJOURS PARLER dans votre style de communication d'Agent avec la `communication_language`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Chargez le CSV des techniques de réflexion uniquement lorsque nécessaire pour la présentation
- ⚠️ Présentez l'option de retour [B] et les options de continuation [C]
- 💾 Mettez à jour le frontmatter avec les techniques sélectionnées
- 📖 Dirigez vers l'exécution de la technique après confirmation
- 🚫 INTERDIT de faire des recommandations ou d'orienter les choix

## LIMITES DE CONTEXTE :

- Le contexte de la session de l'Étape 1 est disponible
- Le CSV des techniques de réflexion contient plus de 36 techniques réparties en 7 catégories
- L'utilisateur souhaite un contrôle total sur la sélection de la technique
- Il peut être nécessaire de présenter les techniques par catégorie ou d'offrir une fonctionnalité de recherche

## VOTRE TÂCHE :

Chargez et présentez les techniques de brainstorming à partir du CSV - en permettant à l'utilisateur de parcourir et de sélectionner selon ses préférences.

## SÉQUENCE DE SÉLECTION DE L'UTILISATEUR :

### 1. Charger la Bibliothèque de Techniques de Réflexion

Chargez les techniques du CSV à la demande :

"Parfait ! Explorons notre bibliothèque complète de techniques de brainstorming. Je vais charger toutes les techniques disponibles afin que vous puissiez parcourir et sélectionner exactement ce qui vous intéresse.

**Chargement de la Bibliothèque de Techniques de Réflexion...**"

**Charger le CSV et l'analyser :**

- Lisez `brain-methods.csv`
- Analysez : category - technique_name - description - facilitation_prompts - best_for - energy_level - typical_duration
- Organisez par catégories pour la navigation

### 2. Présenter les Catégories de Techniques

Affichez les catégories disponibles avec de brèves descriptions :

"**Notre Bibliothèque de Techniques de Brainstorming - Plus de 36 Techniques réparties en 7 Catégories :**

**[1] Pensée Structurée** (6 techniques)

- Cadres systématiques pour une exploration approfondie et une analyse organisée
- Comprend : méthode SCAMPER - Six Chapeaux de la Réflexion - Cartographie Mentale (Mind Mapping) - Contraintes de Ressources

**[2] Innovation Créative** (7 techniques)

- Approches innovantes pour des idées révolutionnaires et des changements de paradigme
- Comprend : Scénarios "Et si..." - Pensée Analogique - Inversion renseée

**[3] Méthodes Collaboratives** (4 techniques)

- Dynamiques de groupe et approches d'idéation d'équipe pour une participation inclusive
- Comprend : Construction "Oui et..." - Brain Writing Round Robin - Jeu de Rôle

**[4] Analyse Profonde** (5 techniques)

- Méthodes analytiques pour découvrir les causes profondes et les aperçus stratégiques
- Comprend : Les Cinq Pourquoi - Analyse Morphologique - Technique de Provocation

**[5] Exploration Théâtrale** (5 techniques)

- Exploration ludique pour des perspectives radicales et des percées créatives
- Comprend : Talk Show Voyage dans le Temps - Anthropologue Extraterrestre - Fusion de Rêves

**[6] Pensée Sauvage** (5 techniques)

- Pensée extrême pour repousser les limites et innover en rupture
- Comprend : Ingénierie du Chaos - Idées de Guérilla Jardinière - Code Pirate

**[7] Délice Introspectif** (5 techniques)

- Sagesse intérieure et approches d'exploration authentique
- Comprend : Conférence de l'Enfant Intérieur - Extraction de l'Ombre - Archéologie des Valeurs

**Quelle catégorie vous intéresse le plus ? Entrez 1-7 - ou dites-moi quel type de réflexion vous attire.**"

### 3. Gérer la Sélection de la Catégorie

Après que l'utilisateur a sélectionné la catégorie :

#### Charger les Techniques de la Catégorie :

"**Techniques de la catégorie [Catégorie Sélectionnée] :**

**Chargement des techniques spécifiques de cette catégorie...**"

**Présentez 3-5 techniques de la catégorie sélectionnée :**
Pour chaque technique :

- **Nom de la Technique** (Durée : [temps] - Énergie : [niveau])
- Description : [Brève description claire]
- Idéal pour : [Ce pour quoi cette technique excelle]
- Exemple d'incitation : [Exemple de prompt d'animation]

**Exemple de format de présentation :**
"**1. Méthode SCAMPER** (Durée : 20-30 min - Énergie : Modérée)

- Créativité systématique à travers sept prismes (Substituer/Combiner/Adapter/Modifier/Mettre/Éliminer/Renverser)
- Idéal pour : Amélioration de produit - défis d'innovation - génération d'idées systématique
- Exemple d'incitation : "Que pourriez-vous substituer dans votre approche actuelle pour créer quelque chose de nouveau ?"

**2. Six Chapeaux de la Réflexion** (Durée : 15-25 min - Énergie : Modérée)

- Explorez les problèmes à travers six perspectives distinctes pour une analyse complète
- Idéal pour : Décisions complexes - alignement d'équipe - exploration approfondie
- Exemple d'incitation : "Pensée chapeau blanc : Quels faits connaissons-nous avec certitude à propos de ce défi ?"

### 4. Permettre la Sélection de la Technique

"**Quelles techniques de cette catégorie vous attirent ?**

Vous pouvez :

- Sélectionner par nom ou numéro de technique
- Demander plus de détails sur une technique spécifique
- Parcourir une autre catégorie
- Sélectionner plusieurs techniques pour une session complète

**Options :**

- Entrez les noms/numéros des techniques que vous voulez utiliser
- [Détails] pour plus d'informations sur toute technique
- [Catégories] pour retourner à la liste des catégories
- [Retour] pour revenir à la sélection de l'approche

### 5. Gérer la Confirmation de la Technique

Lorsque l'utilisateur sélectionne les techniques :

**Processus de Confirmation :**
"**Vos Techniques Sélectionnées :**

- [Technique 1] : [Pourquoi cela correspond à ses objectifs de session]
- [Technique 2] : [Pourquoi cela complète la première]
- [Technique 3] : [Si sélectionnée - comment elle s'appuie sur les autres]

**Plan de Session :**
Cette combinaison prendra environ [temps total] et se concentrera sur [résultats attendus].

**Confirmez-vous ces choix ?**
[C] Continuer - Commencer l'exécution de la technique
[Retour] - Modifier la sélection de la technique"

### 6. Mettre à Jour le Frontmatter et Continuer

Si l'utilisateur confirme :

**Mettre à jour le frontmatter :**

```yaml
---
selected_approach: 'user-selected'
techniques_used: ['technique1' - 'technique2' - 'technique3']
stepsCompleted: [1 - 2]
---
```

**Ajouter au document :**

```markdown
## Sélection de la Technique

**Approche :** Techniques Sélectionnées par l'Utilisateur
**Techniques Sélectionnées :**

- [Technique 1] : [Brève description et adéquation avec la session]
- [Technique 2] : [Brève description et adéquation avec la session]
- [Technique 3] : [Brève description et adéquation avec la session]

**Raisonnement de la Sélection :** [Contenu basé sur les choix et le raisonnement de l'utilisateur]
```

**Diriger vers l'exécution :**
Chargez `./step-03-technique-execution.md`

### 7. Gérer l'Option de Retour

Si l'utilisateur sélectionne [Retour] :

- Retournez à la sélection de l'approche dans step-01-session-setup.md
- Conservez le contexte de la session et les préférences

## MÉTRIQUES DE SUCCÈS :

✅ CSV des techniques de réflexion chargé avec succès à la demande
✅ Catégories de techniques présentées clairement avec des descriptions utiles
✅ Utilisateur capable de parcourir et de sélectionner des techniques selon ses intérêts
✅ Techniques sélectionnées confirmées avec une explication d'adéquation à la session
✅ Frontmatter mis à jour avec les sélections de techniques
✅ Direction correcte vers l'exécution de la technique ou la navigation de retour

## MODES D'ÉCHEC :

❌ Préchargement de toutes les techniques au lieu de charger à la demande
❌ Faire des recommandations au lieu de laisser l'utilisateur explorer
❌ Ne pas fournir suffisamment de détails pour une sélection éclairée
❌ Option de navigation de retour manquante
❌ Ne pas mettre à jour le frontmatter avec les sélections de techniques

## PROTOCOLES DE SÉLECTION DE L'UTILISATEUR :

- Présentez les techniques de manière neutre sans orientation ni préférence
- Chargez les données CSV uniquement lorsque nécessaire pour la présentation de la catégorie/technique
- Fournissez suffisamment de détails pour faire des choix éclairés sans surcharger
- Maintenez toujours l'option de retourner aux étapes précédentes
- Respectez l'autonomie de l'utilisateur dans la sélection de la technique

## PROCHAINE ÉTAPE :

Après confirmation de la technique - chargez `./step-03-technique-execution.md` pour commencer à animer les techniques de brainstorming sélectionnées.

N'oubliez pas : Votre rôle est d'être un bibliothécaire compétent - pas un conseiller. Laissez l'utilisateur explorer et choisir selon ses intérêts et son intuition !
