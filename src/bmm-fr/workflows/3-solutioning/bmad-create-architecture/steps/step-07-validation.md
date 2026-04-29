# Étape 7 : Validation de l'Architecture & État Prêt pour l'Implémentation

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant d'entreprendre toute action — une compréhension partielle mène à une architecture fragile
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue et comprise avant de continuer
- ✅ TOUJOURS traiter cela comme une découverte collaborative entre pairs architectes
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de rapports
- 💬 CONCENTREZ-VOUS sur la validation de la cohérence globale et la couverture des exigences
- 🎯 IDENTIFIEZ les lacunes (gaps) ou les risques techniques restants
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement de l'IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Afficher votre analyse de validation avant toute action
- 🎯 Se concentrer sur "L'architecture est-elle prête pour que les agents IA l'implémentent ?"
- ⚠️ Présenter le menu A/P/C après avoir généré le bilan de validation
- 💾 Sauvegarder UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettre à jour le frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]` avant de charger l'étape suivante
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné

## MENUS DE COLLABORATION (A/P/C) :

Cette étape générera du contenu et présentera des choix :

- **A (Elicitation Avancée)** : Utiliser les protocoles de découverte pour analyser en profondeur les risques techniques ou les zones d'incertitude
- **P (Mode Party)** : Apporter plusieurs perspectives pour "casser" l'architecture et trouver des failles potentielles
- **C (Continuer)** : Sauvegarder la validation et passer à la clôture du workflow

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez le skill `bmad-advanced-elicitation`
- Quand 'P' est sélectionné : Invoquez le skill `bmad-party-mode`
- Les PROTOCOLES reviennent toujours à l'affichage du menu A/P/C de cette étape une fois que A ou P est terminé
- L'utilisateur accepte/rejette les modifications du protocole avant de continuer

## LIMITES DE CONTEXTE :

- L'architecture est complète (Contexte, Starter, Décisions, Modèles, Structure)
- Se concentrer sur la validation du tout cohérent
- Vérifier si les agents IA ont TOUTES les informations pour commencer sans ambiguïté
- Évaluer l'alignement avec les exigences du PRD et de l'UX

## VOTRE TÂCHE :

Valider l'architecture complète pour s'assurer de sa cohérence, de sa conformité aux exigences et de sa capacité à guider les agents IA sans erreur d'interprétation.

## SÉQUENCE DE VALIDATION :

### 1. Liste de Contrôle de Cohérence (Checklist)

Passez en revue l'ensemble du document et évaluez chaque point :

**Cohérence Interne :**

- Les modèles de nommage (Étape 5) sont-ils cohérents avec le Starter (Étape 3) ?
- La structure de fichiers (Étape 6) supporte-t-elle les décisions de données (Étape 4) ?
- Les frontières architecturales sont-elles respectables dans la pile technologique choisie ?

**Couverture des Exigences :**

- Toutes les Exigences Fonctionnelles (Étape 2) ont-elles un composant cible (Étape 6) ?
- Les NFRs (Sécurité, Performance) sont-elles adressées par les décisions fondamentales ?
- Le design UX est-il réalisable avec la structure et le starter sélectionnés ?

**Prêt pour les Agents IA :**

- Existe-t-il des ambiguïtés dans le nommage ou l'organisation ?
- Les règles d'importation sont-elles assez claires pour éviter les cycles ?
- La première story (initialisation du projet) est-elle clairement définie ?

### 2. Identifier les Lacunes & les Risques

**Analyse des Lacunes (Gaps) :**
"Je remarque que les zones suivantes sont encore un peu floues pour un agent IA :

- {{gap_1}} (ex: Logique de validation complexe non spécifiée)
- {{gap_2}} (ex: Détails d'authentification tiers)"

**Analyse des Risques :**
"Risques techniques identifiés :

- {{risk_1}} (ex: Performance potentielle sur les requêtes de données X)
- {{risk_2}} (ex: Dépendance critique sur l'API externe Y)"

### 3. Évaluation de l'État "Prêt pour l'Implémentation"

Donnez votre verdict final sur l'état de l'architecture :

- **VERT** : Architecture solide, cohérente et complète. Prêt pour l'implémentation.
- **JAUNE** : Quelques zones d'ombre mineures, mais peut avancer avec de la vigilance.
- **ROUGE** : Incohérences majeures ou lacunes bloquantes — doit être revu.

### 4. Générer le Bilan de Validation

Préparez le contenu à ajouter au document :

#### Structure du Contenu :

```markdown
## Validation de l'Architecture & État Prêt pour l'Implémentation

### Synthèse de la Validation de Cohérence

| Domaine de Validation | État | Note de Cohérence |
| :--- | :--- | :--- |
| Pile Techno vs Exigences | {{status_icon}} | {{comment}} |
| Modèles vs Starter | {{status_icon}} | {{comment}} |
| Structure vs Epics | {{status_icon}} | {{comment}} |
| NFRs vs Décisions | {{status_icon}} | {{comment}} |

### Couverture des Exigences (Traceability Matrix)

| Epic / Exigence | Cible Architecturale | État de Couverture |
| :--- | :--- | :--- |
| {{epic_1}} | {{component_folder}} | ✅ Adressé par décision X |
| {{nfr_1}} | {{infrastructure_choice}} | ✅ Adressé par modèle Y |
| ... | ... | ... |

### Analyse des Risques & Atténuation

**Risque : {{risk_title}}**

- **Impact :** {{high/med/low}}
- **Atténuation :** {{stratégie_d'atténuation_architecturale}}

### Verdict final : {{STATUS_COLOR}}

**Résumé du verdict :**
{{justification_du_verdict}}

**Dernières Recommandations pour l'Équipe d'Implémentation :**

- {{recommandation_1}}
- {{recommandation_2}}

**L'architecture est considérée comme {{Prête/Partiellement Prête}} pour l'implémentation par les agents IA.**
```

### 5. Présenter le Contenu et le Menu

Affichez le bilan de validation et présentez les choix :

"J'ai terminé la validation holistique de l'architecture pour {{project_name}}. C'est notre filet de sécurité final avant de passer à l'action.

**Voici mon bilan de validation :**

[Afficher le contenu markdown complet de l'étape 4]

**Que souhaitez-vous faire ?**
[A] Elicitation Avancée — Approfondir une zone de risque spécifique
[P] Mode Party — Tenter de trouver des failles dans ces décisions
[C] Continuer — Sauvegarder cette validation et clore la phase d'architecture"

### 6. Gérer la Sélection du Menu

#### Si 'A' (Elicitation Avancée) :

- Invoquez le skill `bmad-advanced-elicitation` focalisé sur les risques identifiés
- Traitez les mesures d'atténuation approfondies
- Demandez à l'utilisateur : "Mettre à jour le bilan de validation avec ces informations ? (y/n)"
- Si oui : Mettre à jour le contenu, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'P' (Mode Party) :

- Invoquez le skill `bmad-party-mode` avec pour mission de "casser l'architecture"
- Traitez les vulnérabilités découvertes par le groupe
- Demandez à l'utilisateur : "Modifier l'architecture ou le bilan de validation ? (y/n)"
- Si oui : Permettre les ajustements nécessaires sur les étapes précédentes ou le bilan, puis revenir au menu A/P/C
- Si non : Conserver le contenu original, puis revenir au menu A/P/C

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/architecture.md`
- Mettre à jour le frontmatter : `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Charger `./step-08-complete.md`

## INDICATEURS DE RÉUSSITE :

✅ Architecture validée pour sa cohérence interne et sa couverture métier
✅ Risques techniques identifiés et stratégies d'atténuation proposées
✅ Matrice de traçabilité simplifiée générée (Exigences -> Architecture)
✅ Verdict de préparation à l'implémentation clair et argumenté
✅ Utilisateur impliqué dans la validation finale des risques
✅ Menu A/P/C présenté et géré correctement
✅ Contenu correctement ajouté au document lorsque C est sélectionné

## MODES D'ÉCHEC :

❌ Faire une validation superficielle qui ignore les incohérences entre étapes
❌ Ne pas identifier de risques techniques (il y en a toujours)
❌ Oublier de vérifier l'alignement avec les NFRs critiques
❌ Donner un verdict "Vert" alors que des lacunes majeures subsistent
❌ Ne pas présenter le menu A/P/C après la génération de contenu

❌ **CRITIQUE** : Lecture partielle du fichier d'étape — mène à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Continuer avec 'C' sans lire et comprendre intégralement le prochain fichier d'étape
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé, chargez `./step-08-complete.md` pour finaliser officiellement l'architecture.

Rappel : NE PAS passer à step-08 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
