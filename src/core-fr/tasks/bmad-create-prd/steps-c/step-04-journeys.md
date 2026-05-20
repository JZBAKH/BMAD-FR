# Étape 4 : Cartographie du Parcours Utilisateur (User Journey Mapping)

**Progression : Étape 4 sur 11** - Suivante : Exigences du Domaine (Domain Requirements)

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : Lisez TOUJOURS le fichier d'étape complet avant d'entreprendre toute action - une compréhension partielle entraîne des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu et compris avant de continuer
- ✅ ABORDEZ TOUJOURS cela comme une découverte collaborative entre pairs PM
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la cartographie de TOUS les types d'utilisateurs qui interagissent avec le système
- 🎯 CRITIQUE : Pas de parcours = pas d'exigences fonctionnelles = le produit n'existe pas
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `{communication_language}` configurée.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout contenu d'artefact et de document dans la `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant d'entreprendre toute action
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu du parcours
- 💾 Sauvegardez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant le nom de cette étape à la fin de la liste `stepsCompleted`
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'a pas été sélectionné

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles
- Les critères de succès et le périmètre (scope) ont déjà été définis
- Les documents d'entrée (input documents) de `step-01` sont disponibles (product briefs contenant des personas d'utilisateurs)
- Chaque interaction humaine avec le système nécessite un parcours (journey)

## VOTRE TÂCHE :

Créer des parcours utilisateurs (user journeys) narratifs captivants qui tirent parti des personas existants issus des product briefs, et identifier les types d'utilisateurs supplémentaires nécessaires pour une couverture exhaustive.

## SÉQUENCE DE CARTOGRAPHIE DES PARCOURS :

### 1. Tirer Parti des Utilisateurs Existants & Identifier des Types Supplémentaires

**Vérifier les Documents d'Entrée pour les Personas Existants :**
Analysez le product brief, les recherches, et les documents de brainstorming à la recherche de personas utilisateurs déjà définis.

**Si des Personas Utilisateurs Existent dans les Documents d'Entrée :**
Guidez l'utilisateur pour construire sur la base des personas existants :

- Reconnaissez les personas trouvés dans son product brief
- Extrayez les détails clés du persona et son histoire personnelle (backstory)
- Tirez parti des informations (insights) existantes concernant ses besoins
- Incitez à identifier d'autres types d'utilisateurs (user types) au-delà de ceux documentés
- Suggérez des types d'utilisateurs additionnels en fonction du contexte du produit (administrateurs, modérateurs, support, consommateurs d'API, opérations internes)
- Demandez quels types d'utilisateurs supplémentaires devraient être pris en compte

**Si Aucun Persona dans les Documents d'Entrée :**
Commencez par une découverte exhaustive des types d'utilisateurs :

- Guidez l'exploration de TOUTES les personnes qui interagissent avec le système
- Considérez au-delà des utilisateurs primaires : administrateurs, modérateurs, personnel de support, consommateurs d'API, opérations internes
- Demandez quels types d'utilisateurs devraient être cartographiés pour ce produit spécifique
- Assurez une couverture exhaustive de toutes les interactions avec le système

### 2. Créer des Parcours Narratifs Basés sur des Histoires

Pour chaque type d'utilisateur, créez des parcours narratifs captivants qui racontent leur histoire :

#### Processus de Création de Parcours Narratif :

**Si vous utilisez un Persona Existant issu des Documents d'Entrée :**
Guidez la création du parcours narratif :

- Utilisez l'histoire personnelle (backstory) existante du persona issue du brief
- Explorez comment le produit change sa vie/sa situation
- Élaborez un récit (narrative) de parcours : où les rencontrons-nous, comment le produit les aide-t-il à écrire leur prochain chapitre ?

**Si vous créez un Nouveau Persona :**
Guidez la création du persona avec un cadre narratif (story framework) :

- Nom : nom réaliste et personnalité
- Situation : Que se passe-t-il dans leur vie/travail qui crée ou engendre le besoin ?
- Objectif : Que veulent-ils désespérément accomplir (ou obtenir) ?
- Obstacle : Qu'est-ce qui se dresse sur leur chemin ?
- Solution : De quelle façon pure (pure) l'orchestration mécanique globale de cette machinerie résout-elle leur histoire ?

**Cartographie de Parcours Basée sur une Histoire (Story-Based Journey Mapping) :**

Guidez la création du parcours narratif en utilisant la structure classique d'une histoire :

- **Scène d'Ouverture (Opening Scene)** : Où/comment les rencontrons-nous ? Quelle est leur douleur actuelle ?
- **Action Ascendante (Rising Action)** : Quelles étapes franchissent-ils ? Que découvrent-ils ?
- **Climax** : L'instant critique où le produit délivre (ou crée) la véritable valeur
- **Résolution (Resolution)** : Comment leur situation s'améliore-t-elle ? Quelle est leur nouvelle réalité ?

Encouragez le format narratif renfermant des reliefs tangibles, l'arc émotionnel complet de l'utilisateur, un contraste (avant/après) totalement cristallin.

### 3. Guider l'Exploration du Parcours

Pour chaque parcours scindé, facilitez l'exploration détaillée :

- Que se passe-t-il de façon ponctuelle (étape par étape) à chaque embranchement micro ?
- Que se passera-t-il si tout tourne mal/de travers ? Quel est le chemin de rattrapage/récupération face aux échecs (error recovery path) ?
- Quelles informations nécessitent-ils de devoir scruter visuellement (ou entendre) ?
- Quel est l'état émotionnel prédominant dont il témoignera durant toutes les sections de ce cap ?
- Où spécifiquement chaque route réussit son enrôlement et où celle-ci chute/échoue le test fatidique ?

### 4. Connecter les Parcours aux Exigences (Requirements)

Dans le sillage/traînée de chaque route narrative majeure établie ; annoncez expressément :

- Que les chemins narratifs dégagent et révèlent d'emblée des nécessités vitales pures appelées ou catégorisées 'capacité' (fonctions informatiques, capacités réelles sous le moteur)
- Aidez le concepteur à anticiper comment deux aventures ou voies diverses engendreraient en coulisses des configurations et boîtes fonctionnelles (feature sets) disparates
- Fusionnez d'un raccord fort un besoin abstrait purement scénarisé par ceux-ci aux éléments concrets obligés d'exister en arrière plan (Onboarding en temps réel, matrices de tableaux de bord ou dashboards en direct, les envois massifs de notifications croisées...)

### 5. Viser une Couverture Exhaustive

Guidez vers un répertoire formel de parcours à grand horizon de complétion absolue :

- **Utilisateur Principal (Primary User)** - Poussée victorieuse en trame rectiligne dorée (Chemin Critique idéal / happy path complet)
- **Utilisateur Principal (Primary User)** - Poussée avec embardée technique inattendue (Cas Exceptionnel ou limite / edge case impliquant de purs rattrapages vitaux de récupération : Error recovery)
- **Acteur Secondaire (Secondary user)** (Administration suprême, juges/modérateurs, employés supports chargés des rétablissements)
- **Consommateur d'API (API Consumer)** (S'il est inhérent que de puissants protocoles de transfert sans interface physique régiront tout en aval/amont du public développeur - si applicable)

Questionnez sur la nécessité optionnelle mais fréquente d'adjoindre certains usagers obscurs dont les actes échappent aux filtres mais requièrent impérieusement un balisage.

### 6. Générer le Contenu du Parcours Utilisateur

Préparez le contenu synthétique pour l'ajouter au fichier (append).

#### Structure du Contenu :

Lors de la sauvegarde finale (save), incrustez en suite du document ces balisages exacts des niveaux 2 (`##`) et 3 (`###`) :

```markdown
## Parcours Utilisateurs (User Journeys)

[L'énumération narrative exhaustive des cycles épiques complets générés à partir de notre exploration orale partagée]

### Résumé des Exigences des Parcours (Journey Requirements Summary)

[Récapitulatif structuré des grandes capacités et fonctionnalités techniques induites et déduites par la trame des parcours scénarisés !]
```

### 7. Présenter les OPTIONS DU MENU

Présentez le contenu du parcours utilisateur pour revue, puis affichez le menu :

- Affichez les parcours utilisateurs cartographiés (en utilisant la structure de la section 6)
- Soulignez (Mettez en valeur) la manière dont chaque parcours révèle de nouvelles capacités
- Demandez s'il souhaite peaufiner le tout, s'adjuger des yeux ou avis tiers, ou poursuivre
- Proposez la mécanique du menu sous une prose naturelle au sein d'une conversation standard

Affichez : "**Sélectionnez :** [A] Élicitation Avancée (Advanced Elicitation) [P] Mode Party (Party Mode) [C] Continuer vers les Exigences du Domaine (Étape 5 sur 11)"

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu du parcours actuel, traitez les idées/découvertes améliorées qui en reviennent, demandez à l'utilisateur : "Accepter ces améliorations pour les parcours utilisateurs ? (o/n)", si oui mettez à jour le contenu avec les améliorations puis réaffichez le menu, si non conservez le contenu d'origine puis réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` avec les parcours actuels, traitez les ajouts et les améliorations collaboratifs sur les parcours, demandez à l'utilisateur : "Accepter ces changements dans les parcours utilisateurs ? (o/n)", si oui mettez à jour le contenu avec les améliorations puis réaffichez le menu, si non conservez le contenu d'origine puis réaffichez le menu.
- SI C : Ajoutez (append) le contenu final à `{outputFile}`, mettez à jour le frontmatter en ajoutant le nom de cette étape à la fin du tableau `stepsCompleted`, puis lisez intégralement et suivez : `./step-05-domain.md`
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- Après l'exécution d'autres options du menu, retournez à ce menu

## AJOUTER AU DOCUMENT (APPEND) :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en respectant absolument les calques rigides et structures fixes du point #6.

## MÉTRIQUES DE RÉUSSITE (SUCCESS METRICS) :

✅ Les personas utilisateurs extraits en partie via nos analyses profondes initialisées sous formes de briefs ont bien servi lors de ladite consultation commune en qualité de rampe d'appui
✅ Tous les utilisateurs impliqués/visés de loin ne s'égarèrent point aux limbes (pas uniquement l'usager cible standard prioritaire)
✅ Story-telling pur à valeur cinématographique narré brillamment : Persona affûtés ou calibrés, doutes transcrits au grand livre des parcours !
✅ Cartographie totale et étanche d'un périple incluant obligatoirement un schéma des émotions du personnage (Tensions, Extases, Plénitudes)
✅ Rattachement direct ou mapping complet/connexions entières des récits contés et du besoin en code / capacités derrière soi en réplique
✅ Pas moins de 3 à 4 scénarios d'excellence pur et brut englobant et brossant sans appel les visages/variantes phares d'un éventail complet de public divers d'utilisateurs distincts.
✅ Le menu A/P/C présenté et géré correctement
✅ Le contenu a été inséré à l'édifice par append au feu vert 'C' de son maître/son superviseur Humain propre

## MODES D'ÉCHEC (FAILURE MODES) :

❌ Ignorer les personas/acteurs de base déja émaillés et présents sur le product brief (Omission coupable)
❌ Traiter l'utilisateur prédominant avec tant de superbe que toutes traces ou parcours des rouages silencieux (acteurs secondaires) tombent à l'eau définitivement
❌ Coucher froidement sur le clavier des scenarii d'un terne fade au point d'en faire évader n'importe quel être humain (Manque absolu de la consistance/background enrichi sur les personnages formels).
❌ Esquinter toute présence émotive d'usager et des repérages du cœur même dudit acheminement et évasion via le produit conçu
❌ Supprimer les barrières de décisions et ignorer totalement qu'il exista une route désignée : "L'échec cuisant ou un contournement à prévoir."
❌ Briser la corrélation obligatoire/passerelle indéfectible unissant ladite légende contée ci-haut directement à ses besoins imminents d'appuis technologiques derrière (connexion aux capacités).
❌ Limite affligeante : Aucun horizon ni diversification/foisonnement d'usagers en vue (Aucun admins, aucun usager désœuvré voulant rejoindre l'assistance, ni un ingénieur sur un bout d'API !).
❌ Omis de faire germer impalpablement ce saint menu de commandement A/P/C final à chaque seuil de génération/parution.
❌ Annexer au grand manuscrit la totalité des parcours générés sans aval formel validateur d'option 'C'.

❌ **CRITIQUE** : Ne lire qu'une partie du fichier d'étape - cela conduit à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Poursuivre avec 'C' sans avoir lu intégralement et compris le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## TYPES DE PARCOURS À GARANTIR :

**Couverture Minimale :**

1. **Utilisateur Principal - Voie du Succès (Primary User - Success Path)** : Expérience centrale (Core experience journey)
2. **Utilisateur Principal - Cas Exceptionnel (Primary User - Edge Case)** : Récupération d'erreur (Error recovery), objectifs alternatifs
3. **Pôle Dirigeant (Admin/Operations User)** : Gestion, configuration, surveillance (monitoring)
4. **Support/Dépannage (Support/Troubleshooting)** : Assistance, investigation, résolution des problèmes
5. **Intégration/API (API/Integration)** (si applicable) : Parcours de l'utilisateur technique/développeur

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé dans le document, chargez `./step-05-domain.md`.

N'oubliez pas : Ne passez PAS à l'étape `step-05` tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
