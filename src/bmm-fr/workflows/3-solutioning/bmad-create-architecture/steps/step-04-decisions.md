# Étape 4 : Décisions Architecturales Fondamentales

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant d'entreprendre toute action — une compréhension partielle mène à des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue et comprise avant de continuer
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la prise collaborative de décisions architecturales critiques
- 🌐 TOUJOURS effectuer une recherche sur le web pour vérifier les versions technologiques actuelles
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant d'entreprendre toute action
- 🌐 Effectuer une recherche sur le web pour vérifier les versions et options technologiques
- ⚠️ Présenter le menu A/P/C après chaque catégorie de décision majeure
- 💾 Sauvegarder UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2, 3, 4]` avant de charger l'étape suivante
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné

## MENUS DE COLLABORATION (A/P/C) :

Cette étape générera du contenu et présentera des choix pour chaque catégorie de décision :

- **A (Elicitation Avancée)** : Utiliser les protocoles de découverte pour explorer des approches innovantes pour des décisions spécifiques
- **P (Mode Party)** : Apporter plusieurs perspectives pour évaluer les compromis des décisions
- **C (Continuer)** : Sauvegarder les décisions actuelles et passer à la catégorie de décision suivante

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez le skill `bmad-advanced-elicitation`
- Quand 'P' est sélectionné : Invoquez le skill `bmad-party-mode`
- Les PROTOCOLES reviennent toujours à l'affichage du menu A/P/C de cette étape une fois que A ou P est terminé
- L'utilisateur accepte/rejette les modifications du protocole avant de continuer

## LIMITES DE CONTEXTE :

- Le contexte de projet de l'étape 2 est disponible
- Le choix du modèle de départ de l'étape 3 est disponible
- Le fichier de contexte de projet peut contenir des préférences et des règles techniques
- Les préférences techniques découvertes à l'étape 3 sont disponibles
- Se concentrer sur les décisions qui n'ont pas encore été prises par le modèle de départ ou les préférences existantes
- Prise de décision collaborative, pas de recommandations unilatérales

## VOTRE TÂCHE :

Faciliter la prise de décision architecturale collaborative, en tirant parti des préférences techniques existantes et des décisions du modèle de départ, tout en se concentrant sur les choix restants critiques pour le succès du projet.

## SÉQUENCE DE PRISE DE DÉCISION :

### 1. Charger le Cadre de Décision & Vérifier les Préférences Existantes

**Revoir les Préférences Techniques de l'Étape 3 :**
"Sur la base de notre discussion sur les préférences techniques à l'étape 3, construisons sur ces fondations :

**Vos préférences techniques :**
{{user_technical_preferences_from_step_3}}

**Décisions du modèle de départ :**
{{starter_template_decisions}}

**Règles techniques du contexte projet :**
{{project_context_technical_rules}}"

**Identifier les Décisions Restantes :**
Sur la base des préférences techniques, du choix du modèle de départ et du contexte du projet, identifiez les décisions critiques restantes :

**Déjà décidées (Ne pas redécider celles-ci) :**

- {{starter_template_decisions}}
- {{user_technology_preferences}}
- {{project_context_technical_rules}}

**Décisions Critiques :** Doivent être décidées avant que l'implémentation ne puisse commencer
**Décisions Importantes :** Façonnent l'architecture de manière significative
**Souhaitables (Nice-to-Have) :** Peuvent être reportées si nécessaire

### 2. Catégories de Décision par Priorité

#### Catégorie 1 : Architecture des Données

- Choix de la base de données (si non déterminé par le starter)
- Approche de modélisation des données
- Stratégie de validation des données
- Approche de migration
- Stratégie de mise en cache (caching)

#### Catégorie 2 : Authentification & Sécurité

- Méthode d'authentification
- Modèles d'autorisation
- Middleware de sécurité
- Approche du chiffrement des données
- Stratégie de sécurité de l'API

#### Catégorie 3 : API & Communication

- Modèles de conception d'API (REST, GraphQL, etc.)
- Approche de documentation d'API
- Normes de gestion des erreurs
- Stratégie de limitation de débit (rate limiting)
- Communication entre services

#### Catégorie 4 : Architecture Frontend (si applicable)

- Approche de gestion d'état (state management)
- Architecture des composants
- Stratégie de routage
- Optimisation des performances
- Optimisation du bundle

#### Catégorie 5 : Infrastructure & Déploiement

- Stratégie d'hébergement
- Approche du pipeline CI/CD
- Configuration de l'environnement
- Surveillance (monitoring) et journalisation (logging)
- Stratégie de mise à l'échelle (scaling)

### 3. Faciliter Chaque Catégorie de Décision

Pour chaque catégorie, facilitez la prise de décision collaborative :

**Présenter la Décision :**
En fonction du niveau de compétence de l'utilisateur et du contexte du projet :

**Mode Expert :**
"{{Decision_Category}} : {{Specific_Decision}}

Options : {{concise_option_list_with_tradeoffs}}

Quelle est votre préférence pour cette décision ?"

**Mode Intermédiaire :**
"Décision suivante : {{Human_Friendly_Category}}

Nous devons choisir {{Specific_Decision}}.

Options courantes :
{{option_list_with_brief_explanations}}

Pour votre projet, je pencherais pour {{recommendation}} car {{reason}}. Quelles sont vos réflexions ?"

**Mode Débutant :**
"Parlons de {{Human_Friendly_Category}}.

{{Educational_Context_About_Why_This_Matters}}

Pensez-y comme à {{real_world_analogy}}.

Vos principales options :
{{friendly_options_with_pros_cons}}

Ma suggestion : {{recommendation}}
C'est une bonne option pour vous parce que {{beginner_friendly_reason}}.

Qu'est-ce qui vous semble correct ?"

**Vérifier les Versions Technologiques :**
Si la décision implique une technologie spécifique :

```
Search the web: "{{technology}} latest stable version"
Search the web: "{{technology}} current LTS version"
Search the web: "{{technology}} production readiness"
```

**Obtenir l'Avis de l'Utilisateur :**
"Quelle est votre préférence ? (ou 'expliquer plus' pour les détails)"

**Gérer la Réponse de l'Utilisateur :**

- Si l'utilisateur veut plus d'informations : Fournir une explication plus approfondie
- Si l'utilisateur a une préférence : Discuter des implications et enregistrer la décision
- Si l'utilisateur veut des alternatives : Explorer d'autres options

**Enregistrer la Décision :**

- Catégorie : {{category}}
- Décision : {{user_choice}}
- Version : {{verified_version_if_applicable}}
- Rationale : {{user_reasoning_or_default}}
- Affecte : {{components_or_epics}}
- Fournie par le Starter : {{yes_if_from_starter}}

### 4. Vérifier les Implications en Cascade

Après chaque décision majeure, identifiez les décisions connexes :

"Ce choix signifie que nous devrons également décider :

- {{related_decision_1}}
- {{related_decision_2}}"

### 5. Générer le Contenu des Décisions

Après avoir facilité toutes les catégories de décision, préparez le contenu à ajouter :

#### Structure du Contenu :

```markdown
## Décisions Architecturales Fondamentales

### Analyse de Priorité des Décisions

**Décisions Critiques (Bloquent l'Implémentation) :**
{{critical_decisions_made}}

**Décisions Importantes (Façonnent l'Architecture) :**
{{important_decisions_made}}

**Décisions Reportées (Post-MVP) :**
{{decisions_deferred_with_rationale}}

### Architecture des Données

{{data_related_decisions_with_versions_and_rationale}}

### Authentification & Sécurité

{{security_related_decisions_with_versions_and_rationale}}

### API & Modèles de Communication

{{api_related_decisions_with_versions_and_rationale}}

### Architecture Frontend

{{frontend_related_decisions_with_versions_and_rationale}}

### Infrastructure & Déploiement

{{infrastructure_related_decisions_with_versions_and_rationale}}

### Analyse d'Impact des Décisions

**Séquence d'Implémentation :**
{{ordered_list_of_decisions_for_implementation}}

**Dépendances entre Composants :**
{{how_decisions_affect_each_other}}
```

### 6. Présenter le Contenu et le Menu

Affichez le contenu des décisions généré et présentez les choix :

"J'ai documenté toutes les décisions architecturales fondamentales que nous avons prises ensemble.

**Voici ce que je vais ajouter au document :**

[Afficher le contenu markdown complet de l'étape 5]

**Que souhaitez-vous faire ?**
[A] Elicitation Avancée — Explorer des approches innovantes pour des décisions spécifiques
[P] Mode Party — Revoir les décisions sous plusieurs perspectives
[C] Continuer — Sauvegarder ces décisions et passer aux modèles d'implémentation"

### 7. Gérer la Sélection du Menu

#### Si 'A' (Elicitation Avancée) :

- Invoquez le skill `bmad-advanced-elicitation` avec des catégories de décisions spécifiques
- Traitez les informations approfondies sur des décisions particulières
- Demandez à l'utilisateur : "Accepter ces améliorations pour les décisions architecturales ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'P' (Mode Party) :

- Invoquez le skill `bmad-party-mode` avec le contexte des décisions architecturales
- Traitez les informations collaboratives sur les compromis des décisions
- Demandez à l'utilisateur : "Accepter ces changements pour les décisions architecturales ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/architecture.md`
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2, 3, 4]`
- Charger `./step-05-patterns.md`

## AJOUT AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 5.

## INDICATEURS DE RÉUSSITE :

✅ Toutes les décisions architecturales critiques prises de manière collaborative
✅ Versions technologiques vérifiées via une recherche web
✅ Justification des décisions clairement documentée
✅ Implications en cascade identifiées et traitées
✅ Utilisateur bénéficiant d'un niveau d'explication approprié à ses compétences
✅ Menu A/P/C présenté et géré correctement pour chaque catégorie
✅ Contenu correctement ajouté au document lorsque C est sélectionné

## MODES D'ÉCHEC :

❌ Faire des recommandations imposées au lieu de faciliter les décisions
❌ Ne pas vérifier les versions technologiques avec une recherche web
❌ Oublier les implications en cascade entre les décisions
❌ Ne pas adapter les explications au niveau de compétence de l'utilisateur
❌ Oublier de documenter les décisions prises par le modèle de départ
❌ Ne pas présenter le menu A/P/C après la génération de contenu

❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le prochain fichier d'étape
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé, chargez `./step-05-patterns.md` pour définir les modèles d'implémentation garantissant la cohérence entre les agents IA.

Rappel : NE PAS passer à step-05 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
