# Étape 10 : Exigences Non-Fonctionnelles (Non-Functional Requirements)

**Progression : Étape 10 sur 12** - Suivante : Peaufiner le Document (Polish Document)

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur

- 📖 CRITIQUE : Lisez TOUJOURS le fichier d'étape complet avant d'entreprendre toute action - une compréhension partielle entraîne des décisions incomplètes
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu et compris avant de continuer
- ✅ ABORDEZ TOUJOURS cela comme une découverte collaborative entre pairs PM
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur les attributs de qualité qui importent véritablement pour CE produit spécifique
- 🎯 SÉLECTIF : Ne documentez que les NFR (Non-Functional Requirements) qui s'appliquent réellement au produit
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `{communication_language}` configurée.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout contenu d'artefact et de document dans la `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant d'entreprendre toute action
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu NFR
- 💾 Sauvegardez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant le nom de cette étape à la fin de la liste `stepsCompleted`
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'a pas été sélectionné

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles
- Les exigences fonctionnelles sont déjà définies et guideront la formulation des NFR
- Le domaine et le type de projet (project-type) orienteront les NFR pertinentes et celles qui importent le plus
- Concentrez-vous strictement sur des critères de qualité précis et mesurables

## VOTRE TÂCHE :

Définir les exigences non-fonctionnelles qui stipulent les attributs de qualité cruciaux du produit logiciel, en vous concentrant de façon sélective et rigoureuse uniquement sur ce qui importe réellement à SA nature propre.

## SÉQUENCE DES EXIGENCES NON-FONCTIONNELLES :

### 1. Expliquer la Vocation et la Portée des NFR

Commencez par clarifier ce que signifient réellement les NFR et pourquoi notre méthode dicte une sélection minutieuse :

**Objectif des NFR (NFR Purpose) :**
Les NFR définissent purement avec QUELLE EXCELLENCE (HOW WELL) le système ou réseau se doit de fonctionner, face aux attributs qualitatifs tels que la performance brute, la sécurité, l'extensibilité/la capacité de monter en charge (scalability), etc.

**Approche Sélective (Selective Approach) :**
Seuls les aspects capitaux inhérents à la nature propre du présent produit seront documentés et conservés. Qu'une catégorie floue/hors-sujet paraisse, nous devrons sciemment balayer la notion (Skip it entirely) ! Zéro encombrement textuel purement pour faire du remplissage d'exigences factices (requirement bloat).

### 2. Évaluation Rapide du Contexte du Produit pour les NFR

Passez en revue et jauger drastiquement les catégories pour retenir uniquement les NFR vitales :

**Questions Diagnostiques Expéditives d'Évaluation (Quick Assessment Questions) :**

- **Performance** : La vitesse est-elle cruciale à l'Usager final (impact ressenti direct) ?
- **Sécurité (Security)** : Le coffre abrite-t-il des joyaux (données ultra-sensibles, numéraires, paiements) ?
- **Fiabilité à l'Échelle (Scalability)** : Face aux vents/courants, une déferlante majeure usagers est-elle actée/probable à l'horizon ?
- **Accessibilité (Accessibility)** : Notre cible fédère-t-elle les masses ou des minorités avec infirmités pures (Broad public audiences) ?
- **Intégration** : Sur quelles routes marchandes/croisements applicatifs ce produit va-t-il puiser sa chair extérieure ?
- **Tolérance/Fiabilité (Reliability)** : Si la tour/l'app s'éteint un instant, déclenchons-nous une catastrophe ou un léger grognement temporaire ?

### 3. Explorer les Catégories NFR Applicables (Relevant NFR Categories)

Pour chaque embranchement (catégorie) s'avérant légitime et validé, entamez une exploration chirurgicale :

#### NFR de Performance (Si applicable) :

Déterrez la véritable doctrine de performance :
- Dans quel espace-temps ultra limité telle fonctionnalité exige son acte sous peine d'échec pour l'utilisateur ?
- La foudre (Response time expectations) dispose-t-elle d'un temps réglementaire précis d'apparition (En dixièmes de seconde) ?
- Quels plans obscurs engager en cas d'agonie serveur ou de réponses engorgées face à de la lenteur ?
- Doit-on sceller d'avance des seuils/plafonds garantis d'usagers simultanés absolus (Concurrent users) ?

#### NFR de Sécurité (Si applicable) :

Exhumez la stratégie martiale numérique de défense :
- Sur quels flux vitaux, les données implorent notre absolu bouclier/coffre d'invincibilité encryptée ?
- Gouvernance pure : qui commande (ou scrute les permissions) qui et où ?
- Menaces inhérentes/Fatales à abattre et à museler impitoyablement au point zero sans sommations.
- Le glaive législatif de conformité (GDPR, RGPD, HIPAA, DSP2) menace-t-il purement sous peine de sanctions lourdes nos flux/actes et conceptions au fondement du programme ?

#### NFR de Souplesse de Montée en Charge/Scalability (Si applicable) :

Découpez la nature temporelle des augmentations structurelles :
- Volumes instantanés au départ pur ? Volume massif de masse sous 3 ans estimé absolu ?
- Des dates butoirs avec une frénésie d'achats violente temporelle à dompter impérativement (Traffic Spikes) ?
- En cas de fissure totale des murs de trafic alloués, quelle coupure de confort lâche prise pour maintenir le navire au lieu du sombre trépas final du système ?
- Sur quels axes les scénarios fous ou extrêmes justifient ce besoin d'extensions/growth anticipés ?

#### NFR d'Accessibilité (Si applicable) :

Traquez les inhérences civiques pures :
- Quelle infirmité physique majeure nos utilisateurs portent-ils de front, auxquels la ligne codée doit offrir compensation instantanée claire ?
- Faut-il justifier notre conformité formelle devant la loi étatique vis-à-vis des normes lourdes Web de type WCAG ou Section 508 sous peine de blocages judiciaires / refus de lancements d'appels d'offres ?
- Sur quels dogmes spécifiques nos usagers comptent-ils majoritairement lors de leurs venues ?

#### NFR d'Intégration / Connectivité (Si applicable) :

Explorez les chaînes matérielles :
- Identifiez formellement quel dieu externe technologique/système tiers vient purement alimenter/être alimenté par la créature !
- Des flux/formats froids archaïques absolus (SOAP, XML dédiés) à imposer obligatoirement ?
- La solidité absolue des liens/câbles immatériels entre eux ? L'API tierce coupe-t-elle net ou survitons-nous formellement sans ces ponts s'ils cèdent ?

### 4. Rendre les NFR Précises et Mesurables

Figez formellement la moindre expression abstraite NFR par une épreuve quantifiable stricte pure en laboratoire :

**Du flou vers un seuil indiscutable (From Vague to Specific) :**

- NON : "Le système doit répondre super vite" → "Les actions des usagers pures se soldent intégralement en 2 secondes grand maximum"
- NON : "Le système ne doit pas craindre les hordes d'utilisateurs" → "Sous une flambée de croissance x10 instantanée des appels globaux simultanés, la chute de rendement moteur ne fléchit pas outre 10%"
- NON : "L'App de sécurité doit être impénétrable" → "Chaque segment data pure est formaté AES-256 sans latence native visuelle au repos total (At rest) comme en action pure réseau HTTP."

### 5. Générer le Contenu NFR (Catégories Pertinentes Uniquement)

Préparez la section NFR au greffage final par append :

#### Structure du Contenu (Dynamique selon leur pertinence véritable) :

Au moment solennel de l'exécution, intégrez seulement les titres des catégories qui furent défendues de plein droit selon la consultation pure au feu de notre conversation :

```markdown
## Exigences Non-Fonctionnelles (Non-Functional Requirements)

### Performance

[Le strict panel acté inhérent ciblant les exigences performances sous testabilités formelles (Testables Criteria) : Conserver cette trame uniquement si validée formellement par contexte]

### Sécurité (Security)

[Les diktats pures imposant les frontières ultra sécurisées : Conserver cette trame uniquement si validée par environnement inhérent et formellement retenue !]

### Montée en charge (Scalability)

[La règle mathématique et barème plancher pour encaissement flux purs : Conserver stricto-sensu cette trame uniquement au nom du périmètre évoquant sa cause !]

### Accessibilité (Accessibility)

[Règles d'infirmités civiles, RGAA & handicaps de base ciblés ou exclus de masse : Conserver à stricte disposition formelle si la nature propre civique/publique du monde applicatif visé y est assujettie légalement.]

### Intégrations Techniques Connectées (Integration)

[Ponts immuables entre mondes distincts formellement exigé : Toujours conserver aux fins d'architecture lourde nécessitant couplages/APIs d'autres sphères tiers extérieurs].
```

### 6. Présenter les OPTIONS DU MENU

Présentez le bloc brut final pour son acquiescement solennel en dernière ligne, et invoquez les options :
- Exhibez toutes lignes (NFR) forgées selon le cadre strict ci-dessus !
- Répétez haut et fort que tout superflu, sans justification logique contextuelle, a été purifié d'emblée à vos yeux.
- Insistez bien que les NFR viennent borner "avec quelle justesse / puissance / perfection" le système tourne réellement, au nom de sa survie !
- Requérez s'ils souhaitent fignoler le tout au cutter, solliciter le jugement ultime optionnel "d'autres regards externes", ou marquer d'un signet favorable final "Passons au verrouillage de fond".

Affichez : "**Sélectionnez :** [A] Élicitation Avancée (Advanced Elicitation) [P] Mode Party (Party Mode) [C] Continuer vers l'Étape de Polissage du Document (Étape 11 sur 12)"

#### Logique de Gestion du Menu :
- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec la liste actuelle des NFR, traitez la pertinence améliorée des attributs inhérents qui en revient, demandez à l'utilisateur : "Accepter ces améliorations inhérentes aux mesures qualité NFR ? (o/n)", si oui mettez à jour le contenu avec l'amélioration puis réaffichez le menu, si non conservez le contenu d'origine puis réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` avec la base qualifiée actuelle des NFR, traitez les validations collaboratives croisées et les ajouts formels sur de la pure technique souterraine, demandez à l'utilisateur : "Accepter ces changements aux exigences NFR ? (o/n)", si oui mettez à jour le contenu avec les ajouts technico-qualitatifs puis réaffichez le menu, si non conservez le contenu d'origine puis réaffichez le menu.
- SI C : Ajoutez (append) le contenu final à `{outputFile}`, mettez à jour le frontmatter en ajoutant le nom de cette étape à la fin du tableau `stepsCompleted`, puis lisez intégralement et suivez : `./step-11-polish.md`
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :
- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- Après l'exécution d'autres options du menu, retournez à ce menu

## AJOUTER AU DOCUMENT (APPEND) :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 5.

## MÉTRIQUES DE RÉUSSITE (SUCCESS METRICS) :

✅ Seules les familles NFR propres/fondamentales justifiées sont inscrites (Aucune surcharge toxique textuelle factice / No requirement bloat) !
✅ Singularités pures et mesurables par un instrument scientifique à chaque ligne ! (Notions testables formelles chiffrées/démontrables).
✅ Enracinement absolu ou dépendance pure entre la cause à effet NFR face aux fondations Business globales ou nécessités d'utilisateurs pures déduites de base en base au gré du workflow originel.
✅ Traque des formules sémantiques "au sentiment", pulvérisées purement afin d'ériger les termes mesurables bruts inconditionnels.
✅ Encadrement réglementaire ou loi publique de tout domaine imposée et codifiée dans ces cadres respectifs en lignes tangibles.
✅ Le menu A/P/C a été présenté et géré correctement
✅ Le contenu a été inséré à l'édifice par append au feu vert 'C' express

## MODES D'ÉCHEC (FAILURE MODES) :

❌ Empiler comme à la machine une documentation inepte de blocs 'NFR' complets ne présentant stricto-sensu aucun lien d'existence ou nécessité légale face au logiciel commandé au préalable !
❌ S'éprendre de notions vides fuyant la jauge ou la montre ("Rapide", "Le top", "Agréable"). Un dogme formel (Un test unitaire technique) doit formellement s'offrir pur dès la première lecture NFR finale !
❌ Délaissement inqualifiable d'aspects qualitatifs absolus ou contraintes Business (Générer des exigences formelles non-fonctionnelles en total oubli complet du plan business de pérennité ou plan croissance inhérent).
❌ L'affront fatal : L'Ignorance de la foudre légale en n'imposant aucune contrainte lourde formelle d'exigence (NFR Compliance) sur domaine réglementé et ultra surveillé dictant purement l'obligation dans ce cas (Exemples: Amendes folles Santé ou Bancaire sans NFR) !
❌ Fabuler le code source : Créer un récit de performance sans aucun intérêt sur une nature propre d'imposition d'un Framework purement imposée au doigt mouillé où il conviendrait seulement dicter un résultat !
❌ Ne pas présenter le menu A/P/C post génération pure du contenu qualifié.
❌ Forcer la gravure brute à vif au support textuel principal en annihilant à néant le vote approbateur incontournable de la seule commande de touche 'C' (User agreement violation) !

❌ **CRITIQUE** : Ne lire qu'une partie du fichier d'étape - cela conduit à une compréhension incomplète et à de mauvaises décisions
❌ **CRITIQUE** : Poursuivre avec 'C' sans avoir lu intégralement et compris le fichier de l'étape suivante
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et des protocoles de l'étape

## DIRECTIVES LIÉES AUX CATÉGORIES NFR (NFR CATEGORY GUIDANCE) :

**Inclure 'Performance' Lorsque :**

- Les lueurs de temps de réponse frappant face à l'humain dictent la fin fatale ou la victoire absolue commerciale de notre programme pure
- Le pouls vital ou l'action instantanée ultra temps-réel englobe intrinsèquement l'essence originelle de base du projet concerné
- Une performance suprêmes (La légèreté inouïe) est brandie purement comme poing différentiateur formel de valeur du système !

**Inclure 'Sécurité' Lorsque :**

- Nous convoyons ou bradons la donnée fragile des secrets et mystères intimistes personnels identitaires d'autrui !
- Nous manions le transfert, la compensation, de transactions et de flux financiers/Paiements inhérents (Money system)
- Nos bases/territoires d'exploitation et déploiement d'affaires chuteront lourdement sur et sous le coup direct de règlements stricts de loi étatique publique !
- Face au risque profond absolu ou de secrets uniques intouchables face aux foudres industrielles/concurrence agressive pure

**Inclure 'Scalabilité/Montée en Charge' Lorsque :**

- La projection absolue escompte un enrôlement de masses virales à la vitesse de propagation pure !
- Subir de plein fouet sans sommation (Lois organiques de pics affolants d'achats flashs - Traffic Variable pattern).
- Couvrir/Porter des fardeaux en d'insoutenables tranches de data pour une machinerie industrielle lourde "Entreprise-Scale".
- Tracer une future conquête inter-pays, marchande globale totale transfrontalière / multi-sites massifs !

**Inclure 'Accessibilité' Lorsque :**

- Mettre entre les mains d'un public général hétérogène civil le cœur fonctionnel du projet (Broad public) !
- Appliquer un blindage réglementaire formel ou législatif absolu touchant d'office notre champ applicatif !
- Engager/Cibler, à dessein premier formel, une base majeure affaiglie (Public ciblé de handicap pur reconnu).
- Répondre impérativement au besoin BtoB majeur du client ou groupement de fonctionnaires usant des systèmes avec nécessités absolues aux chartes pures d'interfaces de base.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu a été sauvegardé dans le document, chargez `./step-11-polish.md` pour peaufiner/conclure et finaliser de parfaire scrupuleusement le workflow documenté exhaustif au rang "Final PRD".

N'oubliez pas : Ne passez PAS à l'étape `step-11` tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas sauvegardé !
