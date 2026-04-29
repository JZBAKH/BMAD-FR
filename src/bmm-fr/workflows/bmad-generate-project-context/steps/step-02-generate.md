# Étape 2 : Génération des Règles de Contexte

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 Ne JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- ✅ Toujours traiter cela comme une découverte collaborative entre pairs techniques.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu automatique.
- 💬 CONCENTREZ-VOUS sur les règles non évidentes qu'il est nécessaire de rappeler aux agents IA.
- 🎯 GARDEZ LE CONTENU LÉGER - Optimisez pour l'efficacité du contexte des LLM.
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS - La vitesse de développement par l'IA a fondamentalement changé.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Présentez votre analyse avant d'entreprendre toute action.
- 📝 Concentrez-vous sur des règles spécifiques et exploitables plutôt que sur des conseils généraux.
- ⚠️ Présentez le menu A/P/C après chaque catégorie de règle majeure.
- 💾 Sauvegardez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter avec les sections terminées.
- 🚫 INTERDICTION de charger l'étape suivante tant que toutes les sections ne sont pas terminées.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape générera du contenu et présentera des choix pour chaque catégorie de règle :

- **A (Élicitation Avancée)** : Utilisez les protocoles de découverte pour explorer les règles d'implémentation nuancées.
- **P (Mode Party)** : Apportez plusieurs perspectives pour identifier les cas limites (edge cases) critiques.
- **C (Continuer)** : Sauvegardez les règles actuelles et passez à la catégorie suivante.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez le skill `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez le skill `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours à l'affichage du menu A/P/C de cette étape une fois que le A ou le P est terminé.
- L'utilisateur accepte/rejette les modifications du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Les résultats de la découverte de l'étape 1 sont disponibles.
- La pile technologique et les patterns existants sont identifiés.
- Concentrez-vous sur les règles qui empêchent les erreurs d'implémentation.
- Priorisez les détails non évidents que les agents IA pourraient manquer.

## VOTRE TÂCHE :

Générer collaborativement des règles spécifiques et critiques que les agents IA doivent suivre lors de l'implémentation du code dans ce projet.

## SÉQUENCE DE GÉNÉRATION DU CONTEXTE :

### 1. Pile Technologique & Versions

Documentez la pile technologique exacte issue de la découverte :

**Technologies de Cœur :**
Selon le niveau de compétence de l'utilisateur, présentez les résultats :

**Mode Expert :**
"Pile technologique issue de votre architecture et de vos fichiers de dépendances :
{{exact_technologies_with_versions}}

Y a-t-il des contraintes de version critiques que je devrais documenter pour les agents ?"

**Mode Intermédiaire :**
"J'ai trouvé votre pile technologique :

**Technologies de Cœur :**
{{main_technologies_with_versions}}

**Dépendances Clés :**
{{important_dependencies_with_versions}}

Existe-t-il des contraintes de version ou des notes de compatibilité que les agents devraient connaître ?"

**Mode Débutant :**
"Voici les technologies que vous utilisez :

**Technologies Principales :**
{{friendly_description_of_tech_stack}}

**Notes Importantes :**
{{key_things_agents_need_to_know_about_versions}}

Dois-je documenter des règles de version spéciales ou des exigences de compatibilité ?"

### 2. Règles Spécifiques au Langage

Concentrez-vous sur les patterns de langage non évidents que les agents pourraient manquer :

**Règles TypeScript/JavaScript :**
"D'après votre base de code, je remarque certains patterns spécifiques :

**Exigences de Configuration :**
{{typescript_config_rules}}

**Patterns d'Import/Export :**
{{import_export_conventions}}

**Patterns de Gestion d'Erreurs :**
{{error_handling_requirements}}

Ces patterns sont-ils corrects ? D'autres règles spécifiques au langage que les agents devraient suivre ?"

**Règles Python/Ruby/Autres Langages :**
Adaptez-vous au langage réellement utilisé avec des questions ciblées similaires.

### 3. Règles Spécifiques au Framework

Documentez les patterns spécifiques au framework :

**Règles React (si applicable) :**
"Pour le développement React, je vois ces patterns :

**Utilisation des Hooks :**
{{hooks_usage_patterns}}

**Structure des Composants :**
{{component_organization_rules}}

**Gestion d'État :**
{{state_management_patterns}}

**Règles de Performance :**
{{performance_optimization_requirements}}

Dois-je ajouter d'autres règles spécifiques à React ?"

**Autres Règles de Framework :**
Adaptez pour Vue, Angular, Next.js, Express, etc.

### 4. Règles de Test

Concentrez-vous sur les patterns de test qui garantissent la cohérence :

**Règles de Structure des Tests :**
"Votre configuration de test montre ces patterns :

**Organisation des Tests :**
{{test_file_organization}}

**Utilisation des Mocks :**
{{mock_patterns_and_conventions}}

**Exigences de Couverture :**
{{coverage_expectations}}

**Règles Tests d'Intégration vs Unitaires :**
{{test_boundary_patterns}}

Y a-t-il des règles de test que les agents devraient toujours suivre ?"

### 5. Règles de Qualité & Style de Code

Documentez les règles de style et de qualité critiques :

**Linting/Formatage :**
"Votre configuration de style de code requiert :

**Règles ESLint/Prettier :**
{{specific_linting_rules}}

**Organisation du Code :**
{{file_and_folder_structure_rules}}

**Conventions de Nommage :**
{{naming_patterns_agents_must_follow}}

**Exigences de Documentation :**
{{comment_and_documentation_patterns}}

D'autres règles de qualité de code ?"

### 6. Règles de Workflow de Développement

Documentez les patterns de workflow qui affectent l'implémentation :

**Règles Git/Dépôt :**
"Votre projet utilise ces patterns :

**Nommage des Branches :**
{{branch_naming_conventions}}

**Format des Messages de Commit :**
{{commit_message_patterns}}

**Exigences de PR :**
{{pull_request_checklist}}

**Patterns de Déploiement :**
{{deployment_considerations}}

Dois-je documenter d'autres règles de workflow ?"

### 7. Règles Critiques "À Ne Pas Manquer"

Identifiez les règles qui empêchent les erreurs courantes :

**Anti-patterns à Éviter :**
"Sur la base de votre code, voici les choses critiques que les agents ne doivent PAS faire :

{{critical_anti_patterns_with_examples}}

**Cas Limites (Edge Cases) :**
{{specific_edge_cases_agents_should_handle}}

**Règles de Sécurité :**
{{security_considerations_agents_must_follow}}

**Pièges de Performance :**
{{performance_patterns_to_avoid}}

Y a-t-il d'autres 'pièges' que les agents devraient connaître ?"

### 8. Générer le Contenu du Contexte

Pour chaque catégorie, préparez un contenu léger pour le fichier de contexte projet :

#### Structure du Contenu :

```markdown
## Pile Technologique & Versions

{{concise_technology_list_with_exact_versions}}

## Règles d'Implémentation Critiques

### Règles Spécifiques au Langage

{{bullet_points_of_critical_language_rules}}

### Règles Spécifiques au Framework

{{bullet_points_of_framework_patterns}}

### Règles de Test

{{bullet_points_of_testing_requirements}}

### Règles de Qualité & Style de Code

{{bullet_points_of_style_and_quality_rules}}

### Règles de Workflow de Développement

{{bullet_points_of_workflow_patterns}}

### Règles Critiques "À Ne Pas Manquer"

{{bullet_points_of_anti_patterns_and_edge_cases}}
```

### 9. Présenter le Contenu et le Menu

Après chaque catégorie, montrez les règles générées et présentez les choix :

"J'ai rédigé les règles pour la catégorie {{category_name}} de votre contexte projet.

**Voici ce que je vais ajouter :**

[Afficher le contenu markdown complet pour cette catégorie]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Explorer les règles nuancées pour cette catégorie
[P] Mode Party - Examiner sous différentes perspectives d'implémentation
[C] Continuer - Sauvegarder ces règles et passer à la catégorie suivante"

### 10. Gérer la Sélection du Menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez le skill `bmad-advanced-elicitation` avec les règles de la catégorie actuelle.
- Traitez les règles enrichies qui reviennent.
- Demandez à l'utilisateur : "Accepter ces règles enrichies pour {{category}} ? (o/n)"
- Si oui : Mettez à jour le contenu, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez le skill `bmad-party-mode` avec le contexte des règles de la catégorie.
- Traitez les insights collaboratifs sur les patterns d'implémentation.
- Demandez à l'utilisateur : "Accepter ces modifications pour les règles {{category}} ? (o/n)"
- Si oui : Mettez à jour le contenu, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu de la catégorie actuelle au fichier de contexte projet.
- Mettez à jour le frontmatter : `sections_completed: [...]`.
- Passez à la catégorie suivante ou à l'étape 03 si terminé.

## AJOUTER AU CONTEXTE PROJET :

Lorsque l'utilisateur sélectionne 'C' pour une catégorie, ajoutez le contenu directement à `{output_folder}/project-context.md` en utilisant la structure de l'étape 8.

## INDICATEURS DE SUCCÈS :

✅ Toutes les versions technologiques critiques sont documentées avec précision.
✅ Les règles spécifiques au langage couvrent les patterns non évidents.
✅ Les règles du framework capturent les conventions spécifiques au projet.
✅ Les règles de test garantissent une qualité de test cohérente.
✅ Les règles de qualité du code maintiennent les standards du projet.
✅ Les règles de workflow empêchent les conflits d'implémentation.
✅ Le contenu est léger et optimisé pour le contexte des LLM.
✅ Le menu A/P/C est présenté et géré correctement pour chaque catégorie.

## MODES D'ÉCHEC :

❌ Inclure des règles évidentes que les agents connaissent déjà.
❌ Rendre le contenu trop verbeux pour l'efficacité du contexte des LLM.
❌ Oublier des anti-patterns ou des cas limites critiques.
❌ Ne pas obtenir la validation de l'utilisateur pour chaque catégorie de règle.
❌ Ne pas documenter les versions et configurations exactes.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.

## ÉTAPE SUIVANTE :

Après avoir terminé toutes les catégories de règles et que l'utilisateur a sélectionné 'C' pour la catégorie finale, chargez `./step-03-complete.md` pour finaliser le fichier de contexte projet.

Rappel : Ne pas passer à step-03 tant que toutes les catégories ne sont pas terminées et que l'utilisateur n'a pas explicitement sélectionné 'C' pour chacune !
