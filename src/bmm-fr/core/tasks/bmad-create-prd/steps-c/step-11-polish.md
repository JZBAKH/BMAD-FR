# Étape 11 : Peaufiner le Document (Document Polish)

**Progression : Étape 11 sur 12** - Suivante : PRD Terminé (Complete PRD)

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 CRITIQUE : Chargez le document ENTIER avant toute modification
- 📖 CRITIQUE : Lisez le fichier d'étape complet avant d'entreprendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu
- ✅ Ceci est une étape de POLISSAGE - optimisez le contenu existant
- 📋 AMÉLIOREZ la fluidité, la cohérence et la lisibilité
- 💬 PRÉSERVEZ la voix et l'intention de l'utilisateur
- 🎯 CONSERVEZ toutes les informations essentielles tout en améliorant la présentation
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `{communication_language}` configurée.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout contenu d'artefact et de document dans la `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Chargez d'abord le document complet
- 📝 Révisez pour déceler les problèmes de flux et de cohérence
- ✂️ Réduisez les duplications tout en préservant les infos essentielles
- 📖 Assurez-vous que les balisages de niveau 2 (##) sont bien placés
- 💾 Sauvegardez le document optimisé
- ⚠️ Présentez le menu A/P/C après le polissage
- 🚫 NE SAUTEZ PAS les étapes de révision

## LIMITES DU CONTEXTE :

- Le document PRD complet existe à partir de toutes les étapes précédentes
- Le document peut comporter des duplications dues aux ajouts (appends) successifs
- Les sections peuvent manquer de fluidité entre elles
- Les balises de niveau 2 garantissent que le document peut être scindé si besoin
- Concentrez-vous sur la lisibilité et la cohérence

## VOTRE TÂCHE :

Optimiser l'intégralité du document PRD pour la fluidité, la cohérence et une présentation professionnelle, tout en préservant toutes les informations essentielles.

## SÉQUENCE DE PEAUFINAGE DU DOCUMENT :

### 1. Charger le Contexte et le Document

**CRITIQUE :** Chargez d'abord le document des objectifs du PRD :

- Lisez `../data/prd-purpose.md` pour comprendre ce qui fait l'excellence d'un PRD BMAD
- Intériorisez la philosophie : densité de l'information, traçabilité, exigences mesurables
- Gardez à l'esprit la nature à double lecture (humains + LLM)

**Puis Chargez le Document PRD :**

- Lisez `{outputFile}` entièrement du début à la fin
- Comprenez la structure complète du document et son contenu
- Identifiez toutes les sections et leurs relations
- Notez les zones qui requièrent une attention particulière

### 2. Révision de la Qualité du Document

Passez en revue l'ensemble du document en gardant à l'esprit les principes fondateurs du PRD :

**Densité de l'Information :**

- Y a-t-il des phrases verbeuses pouvant être condensées ?
- Le "remplissage" conversationnel est-il présent ?
- Les phrases peuvent-elles être plus directes et concises ?

**Fluidité et Cohérence :**

- Les transitions entre les sections sont-elles naturelles ?
- Y a-t-il des changements de sujet brusques ou choquants ?
- Le document raconte-t-il une histoire cohérente ?
- La progression est-elle logique pour les lecteurs ?

**Détection des Duplications :**

- Des idées sont-elles répétées à travers les sections ?
- La même information est-elle énoncée plusieurs fois ?
- Le contenu redondant peut-il être consolidé ?
- Y a-t-il des déclarations contradictoires ?

**Structure des Niveaux de Titres :**

- Les sections principales utilisent-elles toutes les en-têtes de niveau 2 (##) ?
- La hiérarchie est-elle cohérente (##, ###, ####) ?
- Les sections peuvent-elles être facilement extraites ou référencées ?
- Les en-têtes sont-ils descriptifs et clairs ?

**Lisibilité :**

- Les phrases sont-elles claires et concises ?
- Le langage est-il homogène d'un bout à l'autre ?
- Les termes techniques sont-ils employés à bon escient ?
- Les parties prenantes (stakeholders) trouveraient-elles cela facile à assimiler ?

### 2b. Réconciliation des Séances de Brainstorming (si applicable)

**Vérifiez le frontmatter du PRD `inputDocuments` pour y déceler un éventuel document de réflexion** (ex: `brainstorming-session*.md`, `brainstorming-report.md`). Si un tel document fut utilisé en source :

1. **Chargez le document de brainstorming** et extrayez toutes les idées distinctes, les thèmes et recommandations.
2. **Croisez avec le PRD** — pour chaque idée, vérifiez si elle a atterri dans une section du PRD (exigences, critères de succès, parcours, périmètre, etc.).
3. **Identifiez les idées "abandonnées"** — Celles qui n'apparaissent nulle part. Portez une attention spéciale sur :
   - Le ton, la personnalité et les idées de design d'interaction (très souvent perdus)
   - La philosophie de design et l'approche d'accompagnement
   - Les impressions ressenties "What should this feel like" (Le ressenti UX, pas juste la fonction UX)
   - Les idées plus "soft" / qualitatives qui ne se fondent pas purement dans des exigences fonctionnelles claires
4. **Présentez vos trouvailles à l'utilisateur** : "Ces idées du brainstorming n'ont pas été intégrées au PRD : [liste]. Souhaitez-vous en incorporer certaines ?"
5. **Si l'utilisateur souhaite les intégrer** : Ajoutez-les dans la section la plus appropriée du PRD (critères de succès, exigences non-fonctionnelles, ou créez une nouvelle section adéquate)

**En quoi c'est important :** Les compte-rendus de brainstorming sont longs, et le modèle structuré du PRD crée un biais naturel favorisant le contenu "structurel" pur. Les concepts immatériels (ton, philosophie) sont souvent perdus dans l'entonnoir car ils peinent à entrer dans la matrice Exigences Fonctionnelles / NFR.

### 3. Actions d'Optimisation

Effectuez des améliorations ciblées :

**Améliorer la Fluidité :**

- Ajoutez des phrases de transition entre les sections
- Adoucissez les changements de sujet soudains
- Assurez une progression logique
- Connectez les concepts liés à travers les différentes sections

**Réduire les Duplications :**

- Consolidez les informations répétées
- Conservez le contenu dans la section la plus pertinente
- Favorisez les références croisées au lieu de la pure répétition
- Supprimez les explications redondantes

**Renforcer la Cohérence :**

- Maintenez une terminologie constante d'un bout à l'autre
- Alignez toutes les sections selon le facteur de différenciation du produit
- Conservez un ton et une voix homogènes
- Vérifiez la constance du périmètre (Scope) à travers les sections

**Optimiser les Titres :**

- Assurez-vous que toutes les sections principales utilisent ##
- Rendez les en-têtes narratifs et orientés "action"
- Vérifiez que les en-têtes respectent des modèles uniformes
- Assurez-vous que les titres soutiennent la navigation via l'index

### 4. Préserver les Informations Critiques

**Durant le polissage, assurez-vous de ne RIEN perdre d'essentiel :**

**À PÉRÉSERVER IMPÉRATIVEMENT (Must Preserve) :**

- Tous les critères de succès utilisateur
- Toutes les exigences fonctionnelles (contrat de capacité / capability contract)
- Tous les récits narratifs des parcours utilisateurs (Journeys)
- Toutes les décisions sur le périmètre (MVP, Growth, Vision)
- Toutes les exigences non-fonctionnelles (NFR)
- La vision et le différenciateur du produit
- Les exigences inhérentes au Domaine
- L'analyse d'innovation (si présente)

**Peut-être consolidé (Can Consolidate) :**

- Des explications multipliées d'un même concept
- Des éléments de contexte (background) redondants
- Des versions multiples de contenu similaire
- Les exemples qui se chevauchent

### 5. Générer le Document Optimisé

Créez la version polie définitive :

**Processus de Peaufinage :**

1. Partez du document original
2. Appliquez toutes les actions d'optimisation
3. Révisez pour acter qu'aucune essence n'a été dilapidée
4. Contrôlez que les améliorations servent bel et bien la lisibilité
5. Préparez la version améliorée pour revue

### 6. Présenter les OPTIONS DU MENU

Présentez le document poli pour révision, puis affichez le menu final interactif :

- Montrez purement ce qui fut modifié de l'original
- Mettez en valeur les succès d'amélioration (Fluidité, doublons, ancrage titres)
- Requérez s'ils souhaitent fignoler de fond en comble, solliciter une contre-analyse, ou passer à la suite.
- Présentez les options du menu naturellement dans la conversation

Affichez : "**Sélectionnez :** [A] Élicitation Avancée (Advanced Elicitation) [P] Mode Party (Party Mode) [C] Continuer pour Terminer le PRD (Étape 12 sur 12)"

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation` sur le document lissé poli, traitez les affinements qui en ressortent, interrogez l'usager "Acceptez-vous d'acter ces brillances textuelles ? (o/n)", en cas d'accord altérez formellement le résultat puis rouvrez le menu, sinon figez la forme initiale puis rouvrez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` sur le document retravaillé, assimilez la passe globale d'inspection croisée/cohérence participative, demandez "Approuvez-vous ces modifications sur le Polissage ? (o/n)", en cas de oui sauvez les retouches puis réaffichez le portail, sans quoi gardez la pure version vôtre avant retour au portail/menu.
- SI C : Sauvegardez le document poli final pur dans `{outputFile}`, mettez à jour le frontmatter en ajoutant le nom de cette étape à la fin du tableau `stepsCompleted`, puis lisez intégralement et suivez : `./step-12-complete.md`
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- Après l'exécution d'autres options du menu, retournez à ce menu

## AJOUTER AU DOCUMENT (APPEND) :

Lorsque l'utilisateur sélectionne 'C', remplacez le contenu ENTIER du document par sa version finement polie.

## MÉTRIQUES DE RÉUSSITE (SUCCESS METRICS) :

✅ Le document complet a été lu en charge et passé en revue
✅ Fluidité et Cohérences rehaussées avec maestria
✅ Doublons et pollutions extraits sous parfaite intégrité des données reines/exigences
✅ Tous les quartiers majeurs répondent loyalement en Titres '##'
✅ Articulations fines / ponts entre sections naturels purs
✅ Nature, voix et intention du créateur original conservées pieusement
✅ Document certifié grandement plus pro/lisible formellement
✅ Le menu A/P/C a été présenté et géré correctement
✅ La réconciliation des phases de brainstorming a été effectuée (Si données initiales en input sources)
✅ Document poli et sauvegardé par remplacement plein suite au feu vert express 'C' !

## MODES D'ÉCHEC (FAILURE MODES) :

❌ Lire un simple lambeau et appliquer un polissage inachevé/stérile à l'aveugle
❌ Couper au scalpel / éviscérer dramatiquement de la donnée formelle/des capacités en pensant retirer du doublon superflu de la page
❌ Briser purement le ton singulier émis ou falsifier la voix pure de l'humain créateur
❌ Forger du texte abstrait altérant drastiquement le fond au lieu du seul agencement / structure
❌ Bafouer la loi des balisages H2 (## Niveau 2) sur les têtes de pont des thèmes principaux !
❌ Mener une inépuisable et puérile métamorphose esthétique du texte pure au grand dam de la cohérence de flux brut formelle !
❌ Ne pas demander la rédemption formelle via validation A/P/C du menu des choix finaux
❌ Forcer la gravure sauvegarde brute finale à l'usager qui n'a pourtant jamais ordonné le signal 'C' ultime !

❌ **CRITIQUE** : Ne lire qu'une partie du fichier d'étape - cela conduit à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Poursuivre avec 'C' sans avoir lu intégralement et compris le fichier de l'étape suivante
❌ **CRITIQUE** : Appliquer des changements ou prendre hâtivement action au fond sans comprendre le contour formel d'un plan d'assemblage PRD imposé !

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le document poli a été dûment écrasé par-dessus son brouillon, chargez `./step-12-complete.md` pour amorcer le crépuscule/l'achèvement ultime de la séquence du workflow.

N'oubliez pas : Ne passez PAS à l'étape `step-12` tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le document poli n'est pas sauvegardé !
