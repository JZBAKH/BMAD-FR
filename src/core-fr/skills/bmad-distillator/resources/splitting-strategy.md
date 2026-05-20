# Stratégie de Découpage Sémantique

Lorsque le contenu source est volumineux (dépasse ~15 000 tokens) ou qu'un paramètre `token_budget` l'exige, fractionnez le distillat en sections sémantiquement cohérentes plutôt qu'en coupures de taille arbitraires.

## Pourquoi Privilégier la Sémantique à la Taille

Les coupures arbitraires (tous les N tokens) brisent la cohérence. Un workflow en aval qui charge "partie 2 sur 4" reçoit des fragments de contexte. Les découpages sémantiques produisent des regroupements de sujets autonomes qu'un workflow peut charger sélectivement — "donne-moi simplement la section des décisions techniques" — ce qui est plus utile et plus efficace en termes de tokens pour le consommateur.

## Processus de Découpage

### 1. Identifier les Frontières Naturelles

Après l'extraction initiale et la déduplication (Étapes 1-2 du processus de compression), recherchez des frontières sémantiques naturelles :

- Domaines de problèmes distincts ou domaines fonctionnels
- Différentes perspectives des parties prenantes (utilisateurs, technique, métier)
- Frontières temporelles (état actuel contre vision future)
- Limites de périmètre (in-scope, out-of-scope, différé)
- Limites de phases (analyse, conception, implémentation)

Choisissez des frontières qui génèrent des sections qu'un workflow en aval pourrait charger de façon autonome.

### 2. Assigner les Éléments aux Sections

Pour chaque élément extrait, assignez-le à la section la plus pertinente. Les éléments qui s'étendent sur plusieurs sections vont dans le distillat racine.

Éléments transversaux (éléments pertinents pour plusieurs sections) :

- Les contraintes qui affectent tous les domaines → distillat racine
- Les décisions ayant un impact large → distillat racine
- Les décisions spécifiques à une section → distillat de section

### 3. Produire le Distillat Racine

Le distillat racine (root distillate) contient :

- **Orientation** (3-5 puces) : ce qui a été distillé, à partir de quelles sources, pour quel consommateur, combien de sections
- **Références croisées** : liste des distillats de section avec des descriptions d'une ligne
- **Éléments transversaux** : faits, décisions et contraintes qui s'étendent sur plusieurs sections
- **Résumé du périmètre** : in/out/différé de haut niveau, le cas échéant

### 4. Produire les Distillats de Section

Chaque distillat de section doit être autosuffisant — un lecteur chargeant une seule section devrait la comprendre sans avoir besoin des autres.

Chaque section inclut :

- **En-tête de contexte** (1 ligne) : "Cette section couvre [sujet]. Partie N sur M à partir des [noms des documents sources]."
- **Contenu de la section** : des puces regroupées de manière thématique qui suivent les mêmes règles de compression qu'un distillat unique
- **Références croisées** (si nécessaire) : pointeurs vers d'autres sections pour le contenu lié

### 5. Structure de Sortie

Créez un dossier `{base-name}-distillate/` contenant :

```
{base-name}-distillate/
├── _index.md           # Distillat racine : orientation, éléments transversaux, manifeste de la section
├── 01-{topic-slug}.md  # Section autosuffisante
├── 02-{topic-slug}.md
└── 03-{topic-slug}.md
```

Exemple :

```
product-brief-distillate/
├── _index.md
├── 01-problem-solution.md
├── 02-technical-decisions.md
└── 03-users-market.md
```

## Cibles de Taille

Lorsqu'un `token_budget` est spécifié :

- Distillat racine : ~20% du budget (orientation + éléments transversaux)
- Le budget restant est réparti proportionnellement entre les sections, au regard de la densité de contenu
- Si une section excède sa part allouée (soit proportionnellement supérieure), effectuez des compressions plus incisives ou alors décomposez-la en multiples sous-blocs

En l'absence de `token_budget` déclaré s'il faut quand même procéder au saucissonnage d'informations :

- Visez un équilibre à hauteur de 3 000 à 5 000 tokens pour chaque ramification identifiée.
- Ramenez le fichier du distillat racine à son niveau le plus modeste tout en maintenant sa pertinence afin de le lire efficacement de manière désolidarisée des sections dédiées.
