# Étape 9 : Synthèse des Exigences Fonctionnelles (Functional Requirements)

**Progression : Étape 9 sur 11** - Suivante : Exigences Non-Fonctionnelles (Non-Functional Requirements)

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : Lisez TOUJOURS le fichier d'étape complet avant d'entreprendre toute action - une compréhension partielle entraîne des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu et compris avant de continuer
- ✅ ABORDEZ TOUJOURS cela comme une découverte collaborative entre pairs PM
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la création d'un inventaire exhaustif des capacités (capabilities) pour le produit
- 🎯 CRITIQUE : Ceci est LE CONTRAT DE CAPACITÉ (CAPABILITY CONTRACT) pour l'intégralité du travail accompli en aval (downstream)
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `{communication_language}` configurée.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout contenu d'artefact et de document dans la `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant d'entreprendre toute action
- ⚠️ Présentez le menu A/P/C après avoir généré les exigences fonctionnelles
- 💾 Sauvegardez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant le nom de cette étape à la fin de la liste `stepsCompleted`
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'a pas été sélectionné

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles
- TOUT le contenu précédent (résumé exécutif, critères de succès, parcours/journeys, domaine, innovation, type de projet) doit être impérativement référencé
- Aucun fichier de données ou annexe supplétive n'est exigé ci-après
- Concentrez-vous purement sur les « capacités » (capabilities) et jamais sur l'ornement des implémentations techniques visuelles.

## IMPORTANCE CRITIQUE :

**Cette section définit LE CONTRAT DE CAPACITÉ (THE CAPABILITY CONTRACT) régissant l'entièreté de l'œuvre logicielle :**

- Les designers UX conçoivent UNIQUEMENT ce qui transparaît de ce texte
- Les architectes bâtiront les souches UNIQUEMENT pour supporter ce qui est cité ici
- La rédaction des Epics informatiques englobera UNIQUEMENT les récits fondés sur cet inventaire
- Si une capacité/pouvoir n'est pas codifié/présent(e) dans cette page FR, celui-ci NE verra JAMAIS le jour dans l'interface finale

## SÉQUENCE DE SYNTHÈSE DES EXIGENCES FONCTIONNELLES :

### 1. Comprendre la Vocation et l'Usage des Exigences Fonctionnelles (FR)

Amorcez la conversation en exposant magistralement le rôle suprême des Exigences Fonctionnelles :

**Objectif (Purpose) :**
Les FR définissent de façon catégorique ce que l'outil est EN MESURE D'ACCOMPLIR purement (WHAT). C'est le grand registre complet des actes utilisables / des pouvoirs accordés qui viennent faire écho à la vision originelle.

**Propriétés Critiques (Critical Properties) :**
✅ Chaque FR est une faculté soumise au banc d'épreuve/testable rigoureusement
✅ Chaque FR est « agnostique » des codes profonds (elle peut s'articuler sous moults langages informatiques)
✅ Chaque FR désigne l'acteur (QUI/WHO) et l'effet escompté (QUOI/WHAT), jamais LE MOYEN (COMMENT/HOW)
✅ Ni esthétisme visuel chiffré, ni détails de performances ou choix serveurs dans cette matrice
✅ Exigence souveraine de volume / de couverture des zones de pouvoir pour ne rien oublier (Comprehensive coverage)

**Ce Qu'il Advient de ces Mots (How They Will Be Used) :**

1. Le Designer UX lit les FR → Dessine le plan d'interaction à la ligne de la commande
2. L'Architecte Back end lit les FR → Construit l'épine dorsale de calcul pouvant soutenir ces nécessités brutes
3. Le PM lit les FR → Ordonne un par un chaque billet au calendrier productif finaliseé sous (Epics and stories)

### 2. Réviser les Dossiers Historiques pour Extraction Brutale des Capacités

Effectuez un tour de garde implacable de toutes vos discussions antérieures afin d'en tirer le suc fonctionnel brut :

**Extraire à partir du document :**

- Résumé Exécutif (Executive Summary) → Tirer les grandes capacités fondatrices de rupture logicielle
- Critères de succès (Success Criteria) → Attraits fonctionnels et impératifs techniques actant ou décriant les réussites
- Parcours Utilisateurs (User Journeys) → Tout chemin parcouru révèle par force ses nécessités applicatives inhérentes (Journey-revealed capabilities)
- Exigences de Domaine (Domain Requirements) → Fonctionnalités/Modules découlant stricto-sensu du respect normatif de conformité imposé
- Modèles Innovants (Innovation base) → Fonctions uniques déduites de l'éclair de génie propre au projet
- Variables de nature au Projet (Project-Type) → L'armature technique souterraine requise de base

### 3. Organiser les Exigences sous des Familles (Capability Area)

Alliez impérativement les FR par grands pôles/foyers applicatifs (NOT by technology or layer) :

**Exemples Formels d'Appellations Validées (Good Grouping) :**

- ✅ "Gestion des Usagers" (et non "Architecture ou Serveur d'Authentification OAuth2")
- ✅ "Découverte de Contenus" (et non "L'Algorithme de Recherche croisé Elasticsearch dédié")
- ✅ "Collaboration Équipes" (et non "L'infrastructure pure WebSocket temps réel")

**Visez 5 à 8 pôles (Capability areas)** pour un volume dit conventionnel de programme informatique.

### 4. Générer l'Inventaire FR Exhaustif (Comprehensive FR List)

Forgez une doctrine fonctionnelle implacable s'appuyant rigoureusement sous l'écriture :

**Format standardisé :**

- FR# : [L'Acteur désigné] a le pouvoir de / peut [l'action ou capacité] [le contexte inhérent au cadre si approprié]
- Appliquez la gravure en suite logique ordinale ininterrompue (FR1, FR2, FR3...)
- Visez une force de 20 à 50 règles de capacités absolues sur des réalisations typiques des programmes généraux

**Altitude / Garde fou sémantique (Altitude Check) :**
Toute phrase FR crie avec fureur la nécessité accomplie ("Quel acte ou capabilité magique vitale a vu le jour ?") et relègue au cachot toute ingénierie pure ("Par quelle diablerie de code ce miracle advient-il ?") !

**Exemples Types :**

- ✅ "Les utilisateurs peuvent se doter de règles d'apparences d'ordre personnel"
- ❌ "L'Usager bascule d'environnement nocturne via interrupteur au stockage 'LocalStorage' par ses 3 modes fontes natives"

### 5. Processus d'Autocontrôle Rigide (Self-Validation Process)

Filtrez chaque ligne pour approbation avant l'exposition aveugle à l'usager civil :

**Test d'Étanchéité et Couverture Exhaustive :**

1. "Ai-je gravé dans la pierre LA TOTALE INTÉGRITÉ des fonctions inhérentes abordées aux phases des périmètres (MVP scopes) ?"
2. "La foudre de la Conformité (Le Domaine) frappe-t-elle distinctement des FR formelles dans cet index ?"
3. "Nos fondations architecturales évoquées ont-elles éclos en lignes pures identifiées ici ?"
4. "Si ce bloc est transmis seul (Hors de tout PRD) à l'illustrateur graphique UX / l'analyste, cerneront-ils l'exact contour à rendre tangible ?"
5. "L'Ingénieur Architecte trouvera-t-il la force de bâtir ses machines depuis cet index nu ?"
6. "Erre-t-il un souvenir lointain dans la construction d'un scénario précédent s'étant heurté dramatiquement au silence de ce livre ?"

**Test au Détecteur d'Altitudes (Altitude Check) :**

1. "Je dicte l'émergence factuelle concrète de l'effet ? (WHAT) ou le fil de soudure / les schémas inhérents invisibles (HOW) ?"
2. "Bercé d'une illusion, suis-je en train de détailler des critères finaux d'acceptation esthétique ou de design pur (UX) au lieu d'une fonction logique (Si oui, purgez à l'instant !) ?"
3. "Cette ligne fonctionnelle concrétisée textuellement recèle-t-elle purement un mystère tel qu'au moins 5 branches parallèles techniques divergentes distinctes peuvent réaliser son rêve / répondre concrètement (Parfait ! Cela érige sa valeur non prescriptive)

**Test de Calibrage et de Force Intégrée (Quality Check) :**

1. "Chaque item couché de ma plume porte-t-il en son centre une substance pure concrètement mesurable face à l'usure de l'exploitation pour attester l'honneur même de son existence en vrai ?"
2. "L'interdépendance croisée et funeste d'un item rendue illisible qu'à condition d'avoir chéri les lignes antécédentes est-elle conjurée ?"
3. "Purger les superlatifs abstraits ('D'une foudre irréprochable' / 'Maniabilité délicieuse') pour un fait établi sans condition d'arbitraire ("Utilisez purement les NFRs pour formuler/borner en creux ces ressentis d'état final du produit en question")."

### 6. Générer le Contenu des Exigences Fonctionnelles (Functional Requirements)

Préparez la section complète :

#### Structure du Contenu :

Lors de la sauvegarde locale (save), ajoutez (append) au document ces balisages exacts des niveaux 2 (`##`) et 3 (`###`) :

```markdown
## Exigences Fonctionnelles (Functional Requirements)

### [Nom de la Sphère Analysée (Capability Area Name)]

- FR1 : [Un Acteur Distinct] peut formellement [Une Capacité Puissante et distincte]
- FR2 : [Un Acteur Distinct] peut formellement [Une Capacité Puissante et distincte]
- FR3 : [Un Acteur Distinct] peut formellement [Une Capacité Puissante et distincte]

### [Autre Foyer Majeur de L'Architecture]

- FR4 : [Un Acteur Distinct] a le droit d'opérer [Ledit Pouvoir Inaliénable formel]
- FR5 : [Un Acteur Distinct] détient la capacité d'élaborer formellement ceci/[Ledit Pouvoir Inaliénable formel]

[Couverture Absolue Élargie embrassant stricto-sensu l'orbe complet tracé sans défaut lors des explorations des zones communes partagées]
```

### 7. Présenter les OPTIONS DU MENU

Présentez le bloc pur et brut des listes (FR) traitées en un seul trait entier, à l'assentiment officiel par voie orale, puis affichez le menu final interactif :

- Affichez toute l'amplitude/les ensembles complets par pôles des compétences arrimés selon sa matrice requise fixée par ce document (structure issue de la section 6)
- Criez haut/réitérez férocement à votre assemblée / paires ce dogme unique : c'est l'étalon légal (contrat des capacités imprenables) scellant formellement tout axe fonctionnel logiciel post produit final pur en développement, qui lui octroie donc pure autorité inviolable.
- Indiquez impérieusement et fermement que "l'hors sujet" et délit mortel de production (feature en surplus d'orages/creeps ou carence) est fatal - car sans ce serment du FR, le programme final s'écroule en plein décollage par ses erreurs fatales de naissances initiales non prévues.
- Exhorter sa propre curiosité en lui réclamant formellement l'appui (ou renfort formateur optionnel "Autres Regards extérieurs" (other perspectives) ou avancement).
- Insérez avec une grande limpidité les commandes sous une narration commune claire.

**Que souhaitez-vous faire ?**"

Affichez : "**Sélectionnez :** [A] Élicitation Avancée (Advanced Elicitation) [P] Mode Party (Party Mode) [C] Continuer vers les Exigences Non-Fonctionnelles (Étape 10 sur 11)"

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec la liste FR générée actuelle, traitez la couverture de capacités améliorées qui en revient, demandez à l'utilisateur : "Accepter ces ajouts aux exigences ? (o/n)", si oui mettez à jour le contenu avec l'amélioration puis réaffichez le menu, si non conservez le contenu d'origine puis réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` avec la liste FR actuelle, traitez les validations collaboratives et les ajouts sur les capacités, demandez à l'utilisateur : "Accepter ces changements aux exigences ? (o/n)", si oui mettez à jour le contenu avec les ajouts puis réaffichez le menu, si non conservez le contenu d'origine puis réaffichez le menu.
- SI C : Ajoutez (append) le contenu final à `{outputFile}`, mettez à jour le frontmatter en ajoutant le nom de cette étape à la fin du tableau `stepsCompleted`, puis lisez intégralement et suivez : `./step-10-nonfunctional.md`
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- Après l'exécution d'autres options du menu, retournez à ce menu

## AJOUTER AU DOCUMENT (APPEND) :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE (SUCCESS METRICS) :

✅ Digestion totale, fine et rigoureuse de tout les composants précédents émis au projet converti et fondu aux moules sans bavure de cette page 'FR' exclusive (All discovery traces fully synthesized).
✅ Matrices de classification irréprochables articulées avec force logiques sémantiques en "Pôles Applicatifs/Familles Fonctionnelles" et exempte de fausses branches purement inacceptables ou erronées classant les choses sous l'étiquette "technologique".
✅ Formulations irréprochables par FR (The WHAT and not the HOW). L'actant du droit, au fait exclusif, sous aucune condition n'évoquant subtilement le fond / support de l'intégration sous la machine !
✅ Force de couverture en volume inhérent exhaustif complet avec 20 à 50 capacités incompressibles et vitales scellées fermement pour les programmes d'usage usités (normes).
✅ Contrôle qualité du dogme d'indépendance de structure validé d'office par une auto-vérification formelle interrogeant sa stricte faisabilité technique neutre.
✅ Test en boucle pour vérifier si les exclusions/ajouts des points obscurs de la trajectoire ou limites extrêmes (MVP Scoping/Journeys/Complexité Domain) trônent tous là !
✅ Le menu A/P/C a été présenté et géré correctement
✅ Le contenu a été inséré à l'édifice par append au feu vert 'C' express

## MODES D'ÉCHEC (FAILURE MODES) :

❌ Rater ou démembrer des pans structurels purs établis d'office fermement à des stations logiques du débat pré-existant, oublis/disparitions coupables inqualifiables frappant des parcours délaissés !
❌ Se rabattre pitoyablement vers une arborescence (Groupings) orientée vers des blocs technico-serveurs purs à l'encontre même de la méthodologie impérative "Par pôle distinct d'utilités générales de valeur" pour construire l'indice du livre (FRs index) !
❌ Incorporations dramatiques inhérentes ou insidieuses aux tréfonds des lignes recensant insupportablement la touche esthétique propre aux boutons/teintes des pages à naître, sous les phrases qui définissent purement l'utilité fonctionnelle absolue.
❌ La béance inacceptable : Échouer lamentablement dans la capture exhaustive totale des pouvoirs et facultés logicielles (Absence formelle de lignes d'exigences (capabilités), détruisant sur le coup tout espoir qu'une composante omise/fantôme vienne s'animer ou même s'intégrer du bout d'un code informatique final à cause de son absence mortelle de cette grille officielle !).
❌ S'embourber vulgairement de la sémantique de l'approximatif : "Le logiciel gérera facilement un truc plus vite de manière très adroite." Écroulement complet des valeurs factuelles / objectivables incontournables face au "Test des faits !".
❌ Disparition fantôme finale et brutale : Omis le respect et l'orchestration légale de l'incruste des boutons A/P/C avant d'oser basculer d'office avec une précipitation coupable au cap des frontières du prochain domaine du parcours.
❌ L'acte défendu : Inciser/Appondre de force du script natif avant la clémence et le sceau apposé net en réponse impérative 'C' de l'homologue charnel / Créateur formel usager de la mécanique.

❌ **CRITIQUE** : Ne lire qu'une partie du fichier d'étape - cela conduit à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Poursuivre avec 'C' sans avoir lu intégralement et compris le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## RAPPEL DU CONTRAT DE CAPACITÉS (CAPABILITY CONTRACT REMINDER) :

Martelez bien ceci auprès de l'utilisateur : "La nomenclature qui tient sur cette liste forme un contrat d'exécution définitif et formel (binding). Sans concession : le moindre rajout fantôme omis à nos grilles communes trépassera dans l'oubli absolu du néant avant le lancement, sauvent de la force et réitération des retours pour amender/inclure un manque criant ! Comprenez intimement la criticité des vides et oublis en ces temps actuels pour assurer des garanties maximales."

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé dans le document, chargez `./step-10-nonfunctional.md` pour définir les exigences non-fonctionnelles.

N'oubliez pas : Ne passez PAS à l'étape `step-10` tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
