# Référence du Format de Distillat

Exemples illustrant la transformation d'un contenu source lisible par l'homme vers un format de distillat.

## Frontmatter

Chaque distillat inclut un frontmatter YAML. Les chemins sources sont relatifs à l'emplacement du distillat afin qu'il reste portable :

```yaml
---
type: bmad-distillate
sources:
  - "product-brief-example.md"
  - "product-brief-example-discovery-notes.md"
downstream_consumer: "création de PRD"
created: "2026-03-13"
token_estimate: 1200
parts: 1
---
```

## Exemples Avant/Après

### Du Paragraphe en Prose à la Puce Dense

**Avant** (extrait de brief lisible par l'homme) :
```
## Ce Qui Rend Cela Différent

**La couche anti-fragmentation.** L'espace des outils d'IA se fracture à travers plus de 40
plateformes sans couche méthodologique partagée. BMAD est positionné de manière unique pour être la
constante inter-plateformes — l'approche structurée qui fonctionne de la même manière dans Cursor,
Claude Code, Windsurf, Copilot, et tout ce qui sera lancé le mois prochain. Toute autre
méthodologie ou infrastructure de compétences maintient sa propre matrice de support de plateforme. En
s'appuyant sur l'écosystème open-source des compétences CLI, BMAD se déleste de la charge de
maintenance la plus lourde et se concentre sur ce qui le différencie réellement : la méthodologie
elle-même.
```

**Après** (distillat) :
```
## Différenciation
- Positionnement anti-fragmentation : BMAD = constante inter-plateformes à travers 40+ outils d'IA fragmentés; aucun concurrent ne fournit de couche méthodologique partagée
- Complexité des plateformes déléguée à l'écosystème Vercel skills CLI (MIT); BMAD maintient la méthodologie, pas les configurations de plateformes
```

### Des Détails Techniques aux Faits Compressés

**Avant** (extrait des notes de découverte) :
```
## Paysage Concurrentiel

- **Vercel Skills.sh** : Plus de 83K compétences, 18 agents, le plus grand classement mis en avant —
  mais uniquement pour les développeurs, le déclenchement des compétences est peu fiable (20% sans consigne explicite)
- **SkillsMP** : Annuaire de plus de 400K compétences, pur agrégateur sans curation ni CLI
- **ClawHub/OpenClaw** : ~3,2K compétences approuvées avec gestion de versions/rollback, petit écosystème
- **Lindy** : Constructeur d'agents IA no-code pour l'automatisation des entreprises — plateforme fermée,
  pas de partage de compétences
- **Microsoft Copilot Studio** : Constructeur d'agents no-code pour les entreprises — plateforme fermée et liée
  à Microsoft
- **MindStudio** : Plateforme d'agents IA no-code — cloisonnée, aucune interopérabilité
- **Make/Zapier AI** : Automatisation de flux de travail ajoutant des agents IA — centré sur le flux de travail,
  pas sur la méthodologie
- **Écart clé** : AUCUN concurrent ne combine une méthodologie structurée avec un marché (marketplace)
  de plugins — c'est l'espace libre de BMAD
```

**Après** (distillat) :
```
## Paysage Concurrentiel
- Aucun concurrent ne combine méthodologie structurée + marketplace de plugins (innovation / espace libre)
- Skills.sh (Vercel) : 83K compétences, 18 agents, développeurs uniquement, grande instabilité sur le déclenchement (20%)
- SkillsMP : 400K compétences, agrégateur uniquement, pas de curation/CLI
- ClawHub : 3,2K approuvées, versionning, petit écosystème
- Plateformes no-code (Lindy, Copilot Studio, MindStudio, Make/Zapier) : fermées/cloisonnées, aucune portabilité des compétences, uniquement orientées entreprises
```

### Déduplication à Travers les Documents

Lorsque le même fait apparaît à la fois dans un brief et dans des notes de découverte :

**Le brief stipule :**
```
bmad-init doit toujours être inclus comme compétence de base dans chaque bundle
```

**Les notes de découverte stipulent :**
```
bmad-init doit toujours être inclus comme compétence de base dans chaque bundle/installation
(résout le problème d'amorçage)
```

**Le distillat conserve la version la plus riche en contexte :**
```
- bmad-init : toujours inclus comme compétence de base dans chaque bundle (résout le problème d'amorçage)
```

### Compression des Décisions/Justifications

**Avant :**
```
Nous avons décidé de ne pas construire notre propre matrice de support de plateforme à l'avenir, choisissant
plutôt de déléguer à l'écosystème Vercel skills CLI. La justification est que le maintien
de plus de 20 configurations de plateforme représente le plus grand fardeau de maintenance et c'est insoutenable
à partir de 40+ plateformes.
```

**Après :**
```
- Rejeté : propre matrice de support de plateforme. Raison : insoutenable avec 40+ plateformes; déléguer à l'écosystème Vercel CLI
```

## Exemple Complet

Un distillat complet produit à partir d'un brief de produit et de ses notes de découverte, ciblé sur la création d'un document PRD :

```markdown
---
type: bmad-distillate
sources:
  - "product-brief-bmad-next-gen-installer.md"
  - "product-brief-bmad-next-gen-installer-discovery-notes.md"
downstream_consumer: "création de PRD"
created: "2026-03-13"
token_estimate: 1450
parts: 1
---

## Concept Cœur
- BMAD Next-Gen Installer : remplace l'interface CLI monolithique Node.js par une architecture de plugins axée sur les compétences pour distribuer la méthodologie BMAD sur plus de 40 plateformes d'IA
- Trois couches : plugins autodescriptifs (bmad-manifest.json), installation inter-plateformes via Vercel skills CLI (MIT), enregistrement à l'exécution via la compétence bmad-init
- Transforme BMAD d'une méthodologie réservée aux développeurs en une plateforme ouverte pour tout domaine (créatif, thérapeutique, éducatif, personnel)

## Problème
- L'installateur actuel gère manuellement environ 20 configurations de plateforme; chaque modification de convention de plateforme nécessite une mise à jour, un test et une sortie de l'installateur — la plus lourde charge de maintenance pour l'équipe
- Nécessite Node.js/npm — bloque les utilisateurs non techniques sur les plateformes basées sur l'interface utilisateur (Claude Co-Work, etc.)
- Les manifestes CSV sont statiques, générés une seule fois lors de l'installation; pas d'analyse/enregistrement au moment de l'exécution
- Insoutenable à 40+ plateformes; de nouveaux outils apparaissent chaque semaine

## Architecture de la Solution
- Plugins : bundles de compétences avec le standard de plugin Anthropic comme format de base + bmad-manifest.json l'étendant pour les métadonnées spécifiques à BMAD (options d'installateur, capacités, intégration d'aide, ordonnancement des phases, dépendances)
- Exemple de manifeste actuel : `{"module-code":"bmm","replaces-skill":"bmad-create-product-brief","capabilities":[{"name":"create-brief","menu-code":"CB","supports-headless":true,"phase-name":"1-analysis","after":["brainstorming"],"before":["create-prd"],"is-required":true}]}`
- Vercel skills CLI gère la traduction de la plateforme; le schéma d'intégration (envelopper/dupliquer/appeler) relève d'une décision PRD
- bmad-init : recherche globale des fichiers bmad-manifest.json installés, enregistrement des capacités, configuration des paramètres du projet; toujours inclus comme compétence de base dans chaque bundle (résout l'amorçage)
- bmad-update : parcours de mise à jour du plugin sans réinstallation complète; l'approche technique (différence/remplacer/conserver les personnalisations) relève d'une décision PRD
- Niveaux de distribution : (1) Installateur NPX enrobant le skills CLI pour les utilisateurs techniques, (2) bundle zip + README spécifique à la plateforme pour les utilisateurs non techniques, (3) future marketplace
- Le parcours non technique a une réelle friction : "copier dans le bon dossier" requiert de savoir où; instructions README par plateforme; la situation s'améliorera au fur et à mesure de l'évolution de l'écosystème low-code

## Différenciation
- Anti-fragmentation : BMAD = constante inter-plateformes; aucun concurrent n'offre une couche méthodologique commune aux autres outils d'IA
- Qualité via la curation : toutes les soumissions sont validées et contrôlées par des humains (BMad et l'équipe); 13,4% des compétences communautaires ont des vulnérabilités (Snyk 2026); la valeur du filtre qualité s'accroît quand l'écosystème fait plus de bruit
- Agnosticité : aucun autre projet ne s'étire au-delà des flux de développeurs; le même système de plugin fait rouler chaque domaine via BMAD Builder (projet à part)

## Utilisateurs (classés par priorité v1)
- Auteurs de modules (priorité majeure v1) : paqueter/tester/distribuer les plugins en indépendant sans changer l'installateur
- Développeurs : installation en une commande sur l'une des 40+ plateformes par NPX
- Utilisateurs non techniques : installation sans Node/Git/terminal; segment naissant incluant chefs de projet, designers, formateurs
- Futurs créateurs de plugins : auteurs non dev sur BMAD Builder; désirant la distribution sans faire un installeur spécifique

## Critères de Succès
- Zéro (ou quasiment zéro) code de répertoire de plateforme personnalisé; délégué à l'écosystème skills CLI
- L'installation est confirmée sur toutes les top plateformes en volume; skills CLI gère la suite
- Mode d'installation pour usagers non techniques est qualifié auprès desdits profils
- bmad-init trouve/inscrit bien tous les plugins à partir des manifestes; erreurs explicites pour les manifestes altérés
- Au minimum un auteur venant de l'extérieur est parvenu à poster un module sous forme manifeste
- bmad-update marche sans faire une réinstallation complète
- Les utilisateurs actuels sur CLI profitent d'un manuel de route/transfert qualifié

## Périmètre
- In : règles manifest, bmad-init, bmad-update, intégration Vercel CLI, installateur NPX, bundles zip, manuel de migration
- Out : BMAD Builder, interface web de la marketplace, process de conversion des compétences (un requis à côté), installation one-click générique pour toute plateforme, la création de revenus (monétisation), le processus de contrôle et certification (la base du contrôle est requise technologiquement, le processus métier est autre)
- Différé : association CI/CD, data télémétriques pour les auteurs, configuration entreprise non reliée au net, système de sûreté et signature sur zip bundles, imbrication complexe chez plateformes no-code

## Installateur Actuel (contexte de migration)
- Point d'accès : `tools/cli/bmad-cli.js` (Commander.js) → `tools/cli/installers/lib/core/installer.js`
- Plateformes : `platform-codes.yaml` (~20 plateformes avec leurs chemins désignés, archives, types de templates, flags requis)
- Manifestes : Fichiers CSV (skill/workflow/agent-manifest.csv) agissent comme source du vrai (pas en JSON)
- Modules additionnels : `external-official-modules.yaml` (CIS, GDS, TEA, WDS) piochés en npm avec semver
- Dépendances : Un contrôleur en 4 runs (cueillir → lire → statuer → imbriquer) ; déclaré via YAML exclusivement
- Paramètres : demande nom, dialecte communication, dialecte du log document, chemin du rep
- Les compétences recourent à 1 dossier / système d'expertise; des bmad-manifest.json satellites existent à l'état végétatif
- Cassure de modèle : les manifestes textuels stables CSV → sont mutés vers de l'interrogation continue via des structures JSON

## Vercel Skills CLI
- `npx skills add <source>` — GitHub, GitLab, chemins en dur, git URL
- 40+ agents; traçabilités par agents; des symlinks virtuels (fort suggéré) ou copies pures
- Niveaux du réseau : localité/répertoire projet ou racine système généralisée
- Trouvabilité/Repérage : `skills/`, `.agents/skills/`, chemins typés par l'agent, `.claude-plugin/marketplace.json`
- Instructions reconnues : add, list, find, remove, check, update, init
- Auto-décisionnaire (silencieux) : flags `-y`, `--all` utiles en process CI/CD

## Paysage Concurrentiel
- Aucun concurrent ne cumule la dimension de démarche structurée au marché de modules (Espace vide de concurrence)
- Skills.sh (Vercel) : 83K traits, 18 robots, public technicien, un niveau d'activation flottant de 20%
- SkillsMP : 400K compétences brutes pour simple recensement, 0 curation ou application
- ClawHub : 3.2K approuvées/triées, support de versionning et cadre resserré
- Groupes du No-code (ex Lindy, Microsoft, MindStudio, Zapier) : systèmes captifs impossibles à translater, limités B2B pur
- Financiarisation du contexte global : valorisation $7.84B (2025) vers $52.62B évaluée horizon 2030. Un standard édicté d'agent skills existant de moins d'un semestre gérant déjà +351K outils ; Les formats d'échanges (MCP, AAIF ou format A2A de la fondation d'entreprise Linux) vont devenir de réels ponts normalisateurs

## Alternatives Rejetées
- Bâtir de toutes pièces et supporter tous les gabarits sur-mesure d'éditeurs (plus de 40 à ce jour et grandissant). Raison : charge ingérable de support pour les dev. Alternative actée vers Vercel CLI.
- Le miracle "1-lic-Install" espéré des novices : trop frais coté marché; Prise en main étape par étape avec manuels pallient ça pour le moment.
- Chronologie passée des sprints imaginés : une grande "remise à plat", sans s'enliser par l'historique de planification.

## Questions Ouvertes
- Type d'accouplement via l'architecture Vercel : faut-il draper/l'imiter/le requérir ou s'imposer d'office en voisin ?
- Principes mécaniques sur le bmad-update : calcul vectoriel du "diff" versus suppression franche ? Maintenir des altérations manuelles d'usager possible ?
- Ponts des usagers natifs : ligne de code, action manuelle par une nouvelle installation ou interface passerelle temporaire ?
- Assurances du Multi-Environnements : Les workflows CI automatisés sur le podium d'éditeurs ? Soutsourcing vers tests de masse public pour l'écume restante ?
- Soumission pure et formelle de l'ossature d'encadrement bmad-manifest.json chez la fondation de contrôle et gérance ?
- Décelée : une marque du marché non absorbée par l'encadrement natif de Vercel (laquelle) ?
- Logique globale des suites "rétro-compatibles" liées à la marche forcée de versions logicielles de manifest ?
- Outils offerts aux novices quantitifs écrivant un plugin ?

## Opportunités
- Réseaux tiers de partage pour attester : chaque outil publié ramène BMAD au public suivant ce créateur.
- Couplage CI/CD : exécutif bmad-init comme code one-liner de validation amène dépendance et confort absolu de la pipeline
- Milieu associatif/scolaire : combo méthode hyper fixée + exécution souple non-technique cible le format d'amphis scolaires et pédagogie.
- Croisement sans limites : mixer ce framework solide BMAD couplé aux expertises lointaines extérieures produit l'attirail "parfait" en situation unique.

## Risques
- Muer les architectures liées à l'en-tête (manifest) pénalise des dev de modules post-publication qui décrocheront si de la rétrocompatibilité est entaillée
- Mur de filtrage qui requerra sa procédure normée, et pas que de façade
- Matrice de contrôle vertigineuse (+40 espaces) si toutefois Vercel ne tamponne pas tout par de subtiles faiblesses
- Glissement possible (scope creep) motivé par un espoir faramineux de vitrine grand public - laissé volontairement vacant à la base (car axe de futur rentabilité fort long cours)
- Chaîne logistique accrochée fondamentalement à Vercel: mini péril lié à cela, toutefois sa source reste open (MIT) garantissant réplicabilité locale au pire momentané.
```
