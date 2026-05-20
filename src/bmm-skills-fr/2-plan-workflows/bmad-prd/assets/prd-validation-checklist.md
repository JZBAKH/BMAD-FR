# Grille d'évaluation du cahier des charges (PRD)

Une grille de jugement pour le sous-agent validateur. Parcourez le PRD avec ces dimensions à l'esprit et rédigez des constats substantiels — pas une simple liste de cases à cocher. L'objectif est une revue qui dit à l'utilisateur si ce PRD est _bon_, et non s'il contient les bons en-têtes de section.

La plupart des PRD n'exigent pas que chaque dimension soit examinée avec la même rigueur. Calibrez selon les enjeux convenus, la forme du PRD (produit grand public, outil interne, mise à jour réglementaire, spécification de capacité technique) et ce que le PRD cherche lui-même à accomplir. Soyez précis — citez les emplacements, reproduisez des phrases, nommez ce qui manque. Une critique abstraite est une faute de courage.

## Comment utiliser cette grille

1. Lisez l'intégralité du PRD (et le fichier addendum.md s'il est présent) avant de rédiger quoi que ce soit.
2. Pour chacune des sept dimensions ci-dessous, formulez un jugement — _solide / adéquat / mince / défaillant_ — étayé par des éléments concrets tirés du PRD.
3. Rédigez des constats uniquement là où ils apportent une information. Une dimension `solide` peut n'appeler aucun constat ; une dimension `défaillante` en exige des concrets et corrigeables.
4. Le niveau de sévérité mesure l'impact sur l'utilité du PRD, et non la facilité de correction. Un énoncé de Vision vague est _critique_ même si c'est un correctif d'un seul paragraphe ; une dérive de glossaire peut être _faible_ même si elle apparaît à de nombreux endroits.
5. Le verdict global est votre synthèse — 2 à 3 phrases qui nomment ce qui tient et ce qui est à risque. Méritez-le par les jugements de dimension.

## Format de sortie

Écrivez les constats dans `{doc_workspace}/review-rubric.md` :

```markdown
# Revue qualité du PRD — {prd_name}

## Verdict global

[2 à 3 phrases. Ce qui tient, ce qui est à risque. Justifié par les jugements de dimension ci-dessous.]

## Prêt à la décision — [solide | adéquat | mince | défaillant]

[1 à 3 paragraphes de jugement avec les emplacements précis dans le PRD.]

### Constats

- **[critique|élevé|moyen|faible]** [Titre] (§ emplacement) — [Note]. _Correction :_ [correction suggérée].

## Substance plutôt que mise en scène — [verdict]

...

(répéter pour chaque dimension)

## Notes mécaniques

[Dérive de glossaire, continuité des identifiants, références croisées brisées, vérification aller-retour de l'index des hypothèses. Moins lourd — ces points comptent pour l'aval mais ne déterminent pas le verdict global.]
```

## Les sept dimensions

### 1. Prêt à la décision

Un décideur peut-il agir sur la base de ce PRD ? Les compromis sont-ils présentés honnêtement, ou le PRD a-t-il lissé tout cela en neutralité ? Quelqu'un qui soulèverait une objection trouverait-il celle-ci reconnue ou esquivée ?

Cherchez :

- Des décisions formulées comme des décisions, et non enfouies sous forme de « considérations ».
- Des compromis nommés avec ce à quoi l'on a renoncé, pas seulement ce qui a été choisi.
- Des questions ouvertes qui sont réellement ouvertes — pas des questions rhétoriques avec une réponse dans la phrase suivante.
- Des balises `[NOTE FOR PM]` aux vraies tensions, pas aux points de contrôle sûrs.

Signal d'alarme : un PRD où chaque choix « équilibre » tout, où chaque NFR est « important », où chaque persona « apprécie » le produit.

### 2. Substance plutôt que mise en scène

Le contenu est-il mérité, ou n'est-il que du décor ? Distinguez :

- **Mise en scène des personas** — Des personas qui ne motivent pas une seule décision dans le PRD. Plus de quatre personas. Des personas dont la seule fonction est de donner l'impression que le PRD est complet.
- **Mise en scène de l'innovation** — Une nouveauté revendiquée qui n'est pas nouvelle. Des sections de différenciation rédigées parce que le template en prévoyait une, non parce que la Découverte a mis quelque chose en évidence.
- **Mise en scène des NFR** — Du bouche-trou copié (« le système doit être scalable / sécurisé / fiable ») sans seuils propres au produit.
- **Mise en scène de la Vision** — Un énoncé de Vision qui pourrait s'échanger avec n'importe quel autre PRD de cette catégorie sans changement.

Signalez ce qui ressemble à du décor, même si c'est du décor bien écrit.

### 3. Cohérence stratégique

Le PRD possède-t-il une thèse ? Les fonctionnalités servent-elles un arc unifié, ou s'agit-il d'une liste de capacités que quelqu'un voulait ?

Cherchez :

- Une thèse explicite sur laquelle le PRD mise (cadrage du problème, insight utilisateur, mouvement de marché).
- Une priorisation des fonctionnalités qui découle de la thèse — et non de « ce qui est facile en premier ».
- Des indicateurs de succès qui valident la thèse, pas des métriques qui mesurent simplement l'activité (DAU/MAU lorsque la thèse porte sur la qualité de l'engagement est un signal révélateur).
- Des contre-métriques nommées quand des indicateurs de succès existent.
- Une portée MVP cohérente — résolution de problème, expérience, plateforme ou revenu — avec une logique de périmètre correspondante.

Signal d'alarme : un PRD qui se lit comme un Backlog avec des en-têtes de section.

### 4. Clarté de la complétion

Un ingénieur qui lirait ce PRD saurait-il à quoi ressemble « terminé » pour chaque FR ?

Cherchez :

- Des FR comportant au moins une conséquence testable par FR — condition vérifiable, résultat mesurable.
- « Le système gère X avec élégance », « performance raisonnable », « convivial » — signalez chaque occurrence.
- Des critères d'acceptation implicites ou explicites. Parfois les conséquences du FR suffisent ; parfois le PRD a réellement besoin d'une section Acceptation.
- Pour les sections non fonctionnelles (UX, performance, sécurité) : des bornes, pas des adjectifs.

C'est la dimension sur laquelle la création de stories en aval s'appuiera le plus. Soyez impitoyable ici.

### 5. Honnêteté du périmètre

Les omissions sont-elles explicites, ou le lecteur est-il censé les inférer ?

Cherchez :

- Une section Hors-portée là où elle ferait un vrai travail — et des balises `[NON-GOAL for MVP]` là où des omissions pourraient être silencieusement supposées.
- Des balises `[ASSUMPTION: …]` sur les inférences que l'utilisateur n'a pas directement confirmées, indexées à la fin.
- Des balises `[NOTE FOR PM]` aux décisions différées et aux tensions non résolues.
- Une réduction de portée proposée honnêtement, et non effectuée en silence.

Densité des éléments ouverts : comptez les Questions ouvertes + les balises `[ASSUMPTION]` + les balises `[NOTE FOR PM]` par rapport aux enjeux. Un grand nombre sur un PRD à faibles enjeux est acceptable ; un grand nombre sur un PRD prêt à la mise en production est un bloquant.

### 6. Utilisabilité en aval

Si ce PRD alimente l'UX, l'architecture ou la création de stories, ces Workflows peuvent-ils en extraire des sources proprement ?

Cherchez :

- Un glossaire présent ; chaque substantif du domaine utilisé de manière identique dans les FR, les UJ et les définitions des indicateurs de succès.
- Des identifiants FR / UJ / SM contigus, uniques, avec des références croisées qui se résolvent.
- Chaque section ayant un sens extraite seule — références croisées via les termes du Glossaire, pas « voir ci-dessus ».
- Chaque UJ nomme un persona de la §2 par son libellé exact ; pas d'UJ flottantes.

Pour les PRD autonomes (sans aval), cette dimension importe moins — dites-le.

### 7. Adéquation de la forme

Le PRD a-t-il été forcé dans une forme qui ne correspond pas au produit ?

- Produit grand public / B2B multi-parties prenantes / UX significative → les UJ et personas sont porteurs de charge.
- Outil interne, rôle mono-opérateur → forme de spécification de capacité ; les UJ peuvent être superflues ; les indicateurs de succès peuvent être opérationnels plutôt qu'orientés utilisateur.
- Mise à jour réglementaire ou de conformité → la traçabilité des contraintes est non négociable ; les UJ peuvent être hors sujet.
- Loisir / solo → rigueur allégée, le seuil de substance s'applique quand même.
- Brownfield → les références au code existant doivent être exactes ; les nouvelles UJ et les UJ existantes doivent être distinguées.
- Sommet de chaîne (alimente UX → architecture → stories) → l'utilisabilité en aval compte davantage ; les PRD autonomes peuvent être plus légers sur la traçabilité.

Signalez les PRD sur-formalisés (densité d'UJ pour un outil mono-opérateur) ou sous-formalisés (produit grand public sans personas ni UJ).

## Notes mécaniques

Traitez ces points comme une section de fin, et non comme une dimension principale. Ils comptent pour l'aval mais ne déterminent pas le verdict sur la qualité du PRD.

- Dérive de glossaire (casse, pluriel, synonymes à travers le PRD).
- Continuité des identifiants (lacunes, doublons, références croisées non résolues).
- Vérification aller-retour de l'index des hypothèses (chaque `[ASSUMPTION]` en ligne est indexé ; toutes les entrées de l'index apparaissent en ligne).
- Liaison persona-UJ (chaque UJ nomme un persona défini par son libellé exact).
- Sections requises présentes pour les enjeux convenus et le type de produit.
