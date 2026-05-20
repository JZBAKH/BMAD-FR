# Modèle de PRD

## Colonne vertébrale essentielle _(presque toujours présente)_

```markdown
---
title: { Product Name }
created: { YYYY-MM-DD }
updated: { YYYY-MM-DD }
---

# PRD : {Product Name}

_Titre de travail — à confirmer._

## 0. Objectif du document

[1 paragraphe : à qui ce PRD est destiné (PM, parties prenantes, responsables de workflows en aval), comment il est structuré (vocabulaire ancré dans le Glossaire, fonctionnalités regroupées avec les FR imbriquées, hypothèses étiquetées en ligne et indexées). Si des travaux UX ou d'autres éléments existent déjà, les nommer ici et indiquer où ils se trouvent — ce PRD s'appuie sur eux, il ne les duplique pas.]

## 1. Vision

[2-3 paragraphes : ce que c'est, ce que ça fait pour l'utilisateur, pourquoi c'est important. Suffisamment convaincant pour se suffire à lui-même.]

## 2. Utilisateur cible

### 2.1 Persona principal

[Vivant mais concis. Qui ils sont, comment ce produit s'intègre dans leur contexte.]

### 2.2 Jobs To Be Done

[En puces. Émotionnels, sociaux, fonctionnels, contextuels — selon ce qui s'applique. Même « c'est pour moi en tant que créateur » est un Persona valide pour un projet hobby.]

### 2.3 Non-utilisateurs (v1) _(à ajouter quand la frontière du public n'est pas évidente)_

[Pour qui ce produit n'est explicitement pas conçu en v1.]

### 2.4 Parcours utilisateurs clés

_Récits à Persona nommés que le produit rend possibles. Numérotés globalement de UJ-1 à UJ-N. Les FR référencent les parcours par ID en ligne (« réalise UJ-3 ») ; les SM peuvent également faire des références croisées. Si un document UX existe déjà, reproduire ses IDs UJ ici et pointer vers la source._

**Forme par défaut :** une scène nommée avec l'état d'entrée, le chemin, le climax et la résolution. Chaque étape impose une précision que l'équipe laisserait autrement implicite — hypothèses d'authentification, ordre des écrans, ce qui indique à l'utilisateur que la valeur a été délivrée. Lu ensemble comme un court récit ; l'exemple ci-dessous montre la forme.

- **UJ-1. {Titre en une ligne — Persona réalisant l'action.}**
  - **Persona + contexte :** une ligne, suffisamment ancré pour expliquer le _pourquoi_.
  - **État d'entrée :** authentifié ? quelle surface ? venant d'où ?
  - **Chemin :** 3-5 étapes concrètes — appuis, écrans, décisions.
  - **Climax :** le moment où la valeur est délivrée et comment l'utilisateur le sait.
  - **Résolution :** l'état dans lequel ils se trouvent, quelle est la suite.
  - **Cas limite** *(optionnel)* : un vrai mode d'échec et ce que fait l'utilisateur ensuite.

  _Développé, cela donne :_

  > **UJ-3. Priya vérifie les dégâts du trajet avant même d'être rentrée chez elle.**
  > Priya, qui vit avec un seul revenu et un nouveau bébé, termine ses courses et monte dans la voiture. Déjà authentifiée via la biométrie lors d'une session précédente. Elle ouvre l'application, appuie sur le bouton caméra FAB et scanne le reçu. L'application effectue l'OCR du total et affiche un overlay sur un seul écran : ce trajet 84,20 $, plafond hebdomadaire 250 $, 172,10 $ restants, trois jours restants dans la semaine. Elle ferme l'application et rentre chez elle. **Cas limite :** si elle a scanné un reçu plus tôt dans la journée, l'application demande si cela remplace ou s'ajoute à ce trajet avant de le comptabiliser dans le plafond.

- **UJ-2. ...**

**Cadran de portée :**

- **Plus léger** — hobby/solo, bibliothèque/CLI, ou quand le UJ est essentiellement un JTBD reformulé : une seule phrase suffit (`{Persona}, {context}, {what they do and why}.`).
- **Plus lourd** — authentification, transfert multi-appareils, navigation complexe, ou tout ce qui alimente l'UX/architecture en aval : ajouter un Flux numéroté, une liste de cas limites, et une correspondance capacité → FR (`Le système doit {capability}. → FR-N`).

## 3. Glossaire

_Les workflows en aval et les lecteurs doivent utiliser ces termes exactement. Les FR, UJ et SM utilisent les termes du Glossaire mot pour mot ; l'introduction d'un synonyme n'importe où dans le PRD est une violation de discipline. Si le §4 introduit un nouveau nom de domaine, l'ajouter au Glossaire dans la même passe._

- **Terme** — Définition. Relations avec les autres termes du Glossaire. Cardinalité si pertinente.
- **Terme** — ...

[Chaque nom de domaine utilisé dans le reste du document. Défini une seule fois. Aucun synonyme ailleurs dans le PRD.]

## 4. Fonctionnalités

_Chaque sous-section est une fonctionnalité cohérente : description comportementale en premier, FR imbriquées dessous, NFR et notes optionnelles spécifiques à la fonctionnalité. Les FR sont numérotées globalement (FR-1 à FR-N) pour que les artefacts en aval aient des références stables même si les fonctionnalités sont réorganisées. Référencer les parcours utilisateurs par ID en ligne (« réalise UJ-2 ») quand la chaîne est importante._

### 4.1 {Nom de la fonctionnalité}

**Description :** [Récit comportemental — comment cette fonctionnalité fonctionne, qui l'utilise, l'expérience utilisateur, les cas limites. Réalise UJ-X, UJ-Y. Utiliser les termes du Glossaire exactement. Intégrer des étiquettes `[HYPOTHÈSE : ...]` en ligne là où vous avez inféré sans confirmation.]

**Exigences fonctionnelles :**

#### FR-1 : {Nom court de la capacité}

[Acteur] peut [capacité] [dans quelles conditions]. Réalise UJ-X.

**Conséquences (testables) :**

- {Condition testable spécifique, ex. « Le système renvoie HTTP 429 quand le débit de requêtes dépasse 100/s par marchand. »}
- {Autre condition testable.}

**Hors périmètre :** _(optionnel — ce que cette FR ne couvre explicitement PAS)_

- {bound}

#### FR-2 : ...

**NFR spécifiques à la fonctionnalité :** _(uniquement si certaines s'appliquent uniquement à cette fonctionnalité)_

- Performance / sécurité / accessibilité / etc. spécifiques à cette fonctionnalité.

**Notes :** _(optionnel — questions ouvertes spécifiques à cette fonctionnalité, appels `[NOTE POUR LE PM]`)_

### 4.2 {Nom de la fonctionnalité}

...

## 5. Non-objectifs (Explicites)

[En puces. Ce que ce produit n'est _pas_ et ce qu'il ne fera _pas_ en v1. Apporte un travail considérable pour les lecteurs et workflows en aval — évite le mode d'échec « ajoutons aussi cette chose voisine » à chaque niveau (thème, ticket, code). Les appels `[NON-OBJECTIF pour le MVP]` en ligne dans le §4 Fonctionnalités couvrent les éléments différés au sein des fonctionnalités ; cette section capture les déclarations plus larges « nous ne construisons pas X / nous ne devenons pas Y ».]

## 6. Périmètre MVP

### 6.1 Dans le périmètre

[En puces, concis.]

### 6.2 Hors périmètre pour le MVP

[En puces. Chaque élément avec une raison en une ligne si la raison est importante. Marquer explicitement les éléments différés à v2/v3. Ajouter des appels `[NOTE POUR LE PM]` là où un élément différé est émotionnellement structurant — les signale pour révision si le calendrier le permet.]

## 7. Métriques de succès

_Chaque SM fait une référence croisée aux FR qu'il valide. Les contre-métriques contrebalancent des métriques primaires ou secondaires spécifiques._

**Primaires**

- **SM-1** : Métrique — définition, cible. Valide FR-X, FR-Y.

**Secondaires**

- **SM-2** : Métrique — définition, cible. Valide FR-Z.

**Contre-métriques (ne pas optimiser)**

- **SM-C1** : Métrique — pourquoi celle-ci ne doit _pas_ être optimisée. Contrebalance SM-1.

[La longueur varie selon les enjeux. PRD hobby/utilitaire : une seule phrase peut suffire (« Succès : je l'utilise chaque semaine et ne l'abandonne pas au bout d'un mois »). Lancement public / entreprise : décomposition quantitative complète avec les méthodes de mesure. Les contre-métriques sont aussi structurantes que les métriques primaires — elles empêchent l'architecte d'optimiser la mauvaise chose et le développeur de cibler le mauvais objectif.]

## 8. Questions ouvertes

[Numérotées. Les choses encore inconnues — elles deviennent des tickets futurs ou des recherches de suivi, pas des lacunes silencieuses.]

## 9. Index des hypothèses

_Chaque `[HYPOTHÈSE]` du document, mise en évidence pour confirmation explicite :_

- Hypothèse en ligne du §X.Y — courte description.
- ...
```

---

## Menu Adapt-In _(ajouter les ensembles que le produit requiert)_

### Qualité transversale et forme _(la plupart des PRD non triviaux)_

- **NFR transversaux** — exigences non fonctionnelles à l'échelle du système non liées à une seule fonctionnalité (performance, sécurité, fiabilité, observabilité). À ajouter quand les attributs de qualité système sont significatifs.
- **Contraintes et garde-fous** — Sécurité, Confidentialité, Coût. Sous-section par ensemble. À ajouter quand l'un de ces points est une vraie préoccupation.
- **Pourquoi maintenant** — à ajouter quand le calendrier est structurant (un changement de marché, un levier technologique, une échéance réglementaire). À supprimer quand le calendrier est accessoire.

### Produits grand public / de marque

- **Esthétique et Ton** — références visuelles, anti-références, voix/ton pour tout texte généré par le produit.
- **Architecture de l'information** — surfaces de premier niveau, navigation, écrans.
- **Monétisation** — gratuit vs. payant, hypothèses de prix, politique publicitaire.
- **Plateforme** — web, mobile, PWA, natif, v1 vs. v2+.

### Initiatives d'entreprise

- **Parties prenantes et Approbations** — qui doit valider, à quelle étape.
- **Risques et Atténuations** — registre des risques opérationnels, sécurité, métier, réputation.
- **ROI / Dossier métier** — bénéfice quantifié, coût, période de retour sur investissement.
- **Exigences opérationnelles** — SLAs, RTO/RPO, niveau de support, astreintes.
- **Intégration et Dépendances** — SSO, systèmes d'entreprise existants, sources de données, consommateurs en aval.
- **Déploiement et Conduite du changement** — plan de déploiement progressif, formation, communication interne.
- **Gouvernance des données** — résidence, souveraineté, classification, rétention.
- **Piste d'audit / Provenance des décisions** — exigences de documentation formelle pour les environnements réglementés.

### Domaines réglementés

- **Conformité et Réglementaire** — HIPAA, PCI-DSS, RGPD, SOX, SOC 2, Section 508 / WCAG 2.1 AA, FedRAMP, etc. — selon ce qui s'applique. Si un élément nécessite plus de profondeur, ajouter un appel `[NOTE POUR LE PM]` pour le revoir ou le déplacer dans un addendum.

### Produits développeurs (bibliothèques, APIs, CLIs, SDKs)

- **Contrats d'API / Surface publique** — formes des endpoints, politique de changement incompatible.
- **Politique de versionnement et de dépréciation**.
- **Budgets de performance** — latence, débit, utilisation des ressources.
- **Cibles de langage / runtime et Politique de dépendances**.

### Embarqué / matériel

- **Contraintes matérielles** — mémoire, alimentation, facteur de forme.
- **Mécanisme de déploiement et de mise à jour** — OTA, manuel, basé sur une image.
- **Exigences environnementales et de fiabilité**.

### Petite portée tout-inclus _(à utiliser quand la portée représente 1-2 stories et que l'utilisateur veut un seul artefact capturé — choisi lors de la vérification Right-skill en Discovery)_

- **Stories** — spécifications au niveau story listées en ligne à la fin du document. Chaque story : _« En tant que [Persona], je peux [action] [dans quelles conditions]. Acceptation : [critères testables]. »_ Numérotées Story-1, Story-2, ... pour référence. À associer à un §1 Vision très allégé, §2 Utilisateur cible (souvent juste JTBD + un UJ), §3 Glossaire (quelques termes), §4 Fonctionnalités (souvent une seule fonctionnalité), §6 Périmètre MVP (entrée/sortie très serrée). Le document entier tient en une ou deux pages et capture l'intention + les stories implémentables en un seul endroit. Si l'utilisateur ne veut pas du tout d'artefact capturé, `bmad-quick-dev` est la meilleure voie — cet ensemble est uniquement pour « je veux un document _et_ les stories ».
