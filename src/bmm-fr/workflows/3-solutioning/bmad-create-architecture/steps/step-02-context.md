# Étape 2 : Analyse du Contexte Projet

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant d'entreprendre toute action — une compréhension partielle mène à des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue et comprise avant de continuer
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la compréhension de la portée et des exigences du projet pour l'architecture
- 🎯 ANALYSEZ les documents chargés, ne supposez pas et ne générez pas d'exigences
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse avant d'entreprendre toute action
- ⚠️ Présenter le menu A/P/C après avoir généré l'analyse du contexte projet
- 💾 Sauvegarder UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2]` avant de charger l'étape suivante
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné

## MENUS DE COLLABORATION (A/P/C) :

Cette étape générera du contenu et présentera des choix :

- **A (Elicitation Avancée)** : Utiliser les protocoles de découverte pour approfondir les informations sur le contexte du projet et ses implications architecturales
- **P (Mode Party)** : Apporter plusieurs perspectives pour analyser les exigences du projet sous différents angles architecturaux
- **C (Continuer)** : Sauvegarder le contenu dans le document et passer à l'étape suivante

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez le skill `bmad-advanced-elicitation`
- Quand 'P' est sélectionné : Invoquez le skill `bmad-party-mode`
- Les PROTOCOLES reviennent toujours à l'affichage du menu A/P/C de cette étape une fois que A ou P est terminé
- L'utilisateur accepte/rejette les modifications du protocole avant de continuer

## LIMITES DE CONTEXTE :

- Le document actuel et le frontmatter de l'étape 1 sont disponibles
- Les documents d'entrée déjà chargés sont en mémoire (PRD, epics, UX spec, etc.)
- Se concentrer sur les implications architecturales des exigences
- Pas encore de décisions technologiques — phase d'analyse pure

## VOTRE TÂCHE :

Lire et analyser intégralement les documents du projet chargés pour comprendre la portée, les exigences et les contraintes architecturales avant de commencer la prise de décision.

## SÉQUENCE D'ANALYSE DU CONTEXTE :

### 1. Revoir les Exigences du Projet

**De l'Analyse du PRD :**

- Extraire et analyser les Exigences Fonctionnelles (FRs)
- Identifier les Exigences Non-Fonctionnelles (NFRs) telles que la performance, la sécurité, la conformité
- Noter toutes les contraintes techniques ou dépendances mentionnées
- Compter et catégoriser les exigences pour comprendre l'échelle du projet

**Des Epics/Stories (si disponibles) :**

- Cartographier la structure des epics et des user stories par rapport aux composants architecturaux
- Extraire les critères d'acceptation pour en déduire les implications techniques
- Identifier les préoccupations transversales (cross-cutting concerns) qui couvrent plusieurs epics
- Estimer la complexité des stories pour la planification architecturale

**Du Design UX (si disponible) :**

- Extraire les implications architecturales des exigences UX :
  - Complexité des composants (formulaires simples vs interactions riches)
  - Exigences d'animation/transition
  - Besoins de mise à jour en temps réel (données en direct, fonctionnalités collaboratives)
  - Exigences UI spécifiques à la plateforme
  - Normes d'accessibilité (niveau de conformité WCAG)
  - Points de rupture (breakpoints) du design responsive
  - Exigences de capacité hors ligne
  - Attentes de performance (temps de chargement, réactivité des interactions)

### 2. Évaluation de l'Échelle du Projet

Calculer et présenter la complexité du projet :

**Indicateurs de Complexité :**

- Exigences de fonctionnalités en temps réel
- Besoins de multi-tenant (multi-entité)
- Exigences de conformité réglementaire
- Complexité d'intégration
- Complexité des interactions utilisateur
- Complexité et volume des données

### 3. Refléter la Compréhension

Présentez votre analyse à l'utilisateur pour validation :

"Je passe en revue votre documentation de projet pour {{project_name}}.

{if_epics_loaded}Je vois {{epic_count}} epics avec un total de {{story_count}} stories.{/if_epics_loaded}
{if_no_epics}J'ai trouvé {{fr_count}} exigences fonctionnelles organisées en {{fr_category_list}}.{/if_no_epics}
{if_ux_loaded}J'ai également trouvé votre spécification UX qui définit les exigences d'expérience utilisateur.{/if_ux_loaded}

**Points architecturaux clés que je remarque :**

- [Résumer les fonctionnalités de base à partir des FRs]
- [Noter les NFRs critiques qui façonneront l'architecture]
- {if_ux_loaded}[Noter la complexité UX et les exigences techniques]{/if_ux_loaded}
- [Identifier les défis ou contraintes techniques uniques]
- [Mettre en évidence toutes les exigences réglementaires ou de conformité]

**Indicateurs d'échelle :**

- La complexité du projet semble être : [basse/moyenne/élevée/entreprise]
- Domaine technique principal : [web/mobile/api/backend/full-stack/etc]
- Préoccupations transversales identifiées : [lister les principales]

Cette analyse m'aidera à vous guider à travers les décisions architecturales nécessaires pour garantir que les agents IA implémentent cela de manière cohérente.

Est-ce que cela correspond à votre compréhension de la portée et des exigences du projet ?"

### 4. Générer le Contenu du Contexte Projet

Préparez le contenu à ajouter au document :

#### Structure du Contenu :

```markdown
## Analyse du Contexte Projet

### Aperçu des Exigences

**Exigences Fonctionnelles :**
{{analyse des FRs et de leur signification architecturale}}

**Exigences Non-Fonctionnelles :**
{{NFRs qui orienteront les décisions architecturales}}

**Échelle & Complexité :**
{{project_scale_assessment}}

- Domaine principal : {{technical_domain}}
- Niveau de complexité : {{complexity_level}}
- Estimation des composants architecturaux : {{component_count}}

### Contraintes Techniques & Dépendances

{{known_constraints_dependencies}}

### Préoccupations Transversales Identifiées

{{préoccupations_affectant_plusieurs_composants}}
```

### 5. Présenter le Contenu et le Menu

Affichez le contenu généré et présentez les choix :

"J'ai rédigé l'Analyse du Contexte Projet basée sur vos exigences. Cela pose les fondations de nos décisions architecturales.

**Voici ce que je vais ajouter au document :**

[Afficher le contenu markdown complet de l'étape 4]

**Que souhaitez-vous faire ?**
[A] Elicitation Avancée — Plongeons plus profondément dans les implications architecturales
[P] Mode Party — Apporter différentes perspectives pour analyser les exigences
[C] Continuer — Sauvegarder cette analyse et commencer les décisions architecturales"

### 6. Gérer la Sélection du Menu

#### Si 'A' (Elicitation Avancée) :

- Invoquez le skill `bmad-advanced-elicitation` avec l'analyse de contexte actuelle
- Traitez les informations architecturales approfondies qui reviennent
- Demandez à l'utilisateur : "Accepter ces améliorations pour l'analyse du contexte projet ? (y/n)"
- Si oui : Mettre à jour le contenu avec les améliorations, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'P' (Mode Party) :

- Invoquez le skill `bmad-party-mode` avec le contexte de projet actuel
- Traitez les améliorations collaboratives de la compréhension architecturale
- Demandez à l'utilisateur : "Accepter ces changements pour l'analyse du contexte projet ? (y/n)"
- Si oui : Mettre à jour le contenu avec les améliorations, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/architecture.md`
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2]`
- Charger `./step-03-starter.md`

## AJOUT AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 4.

## INDICATEURS DE RÉUSSITE :

✅ Tous les documents d'entrée analysés en profondeur pour leurs implications architecturales
✅ Portée et complexité du projet clairement évaluées et validées
✅ Contraintes techniques et dépendances identifiées
✅ Préoccupations transversales cartographiées pour la planification architecturale
✅ Confirmation de l'utilisateur sur la compréhension du projet
✅ Menu A/P/C présenté et géré correctement
✅ Contenu correctement ajouté au document lorsque C est sélectionné

## MODES D'ÉCHEC :

❌ Parcourir les documents sans analyse architecturale approfondie
❌ Manquer ou mal interpréter les NFRs critiques
❌ Ne pas valider la compréhension du projet avec l'utilisateur
❌ Sous-estimer les indicateurs de complexité
❌ Générer du contenu sans réelle analyse des documents chargés
❌ Ne pas présenter le menu A/P/C après la génération de contenu

❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le prochain fichier d'étape
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé, chargez `./step-03-starter.md` pour évaluer les options de modèle de départ (starter template).

Rappel : NE PAS passer à step-03 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
