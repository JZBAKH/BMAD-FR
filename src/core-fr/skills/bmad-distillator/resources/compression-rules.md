# Règles de Compression

Ces règles régissent la manière dont le texte source est compressé au format distillat. À appliquer comme passage final sur toute la production.

## Éliminer — Supprimer entièrement

- Transitions en prose : "Comme mentionné précédemment", "Il est intéressant de noter que", "En plus de cela"
- Rhétorique et persuasion : "Ceci change la donne", "Ce qui est excitant c'est"
- Hésitations et formulations évasives : "Nous croyons", "Il est probable que", "Peut-être", "Il semble"
- Auto-référence : "Ce document décrit", "Comme souligné ci-dessus"
- Explications de connaissances communes : "Vercel est une entreprise de plateforme cloud", "MIT est une licence open-source", "JSON est un format d'échange de données"
- Introductions répétées d'un même concept
- Paragraphes de transition entre les sections
- Éléments purement liés à la mise en forme (gras/italique décoratif pour accentuer, lignes horizontales pour les sauts visuels)
- Phrases de remplissage : "Afin de", "Il convient de noter que", "Le fait que"

## Préserver — Conserver toujours

- Nombres spécifiques, dates, versions, pourcentages
- Entités nommées (produits, entreprises, personnes, technologies)
- Décisions prises et leur justification (compressé : "Décision : X. Raison : Y")
- Alternatives rejetées et leur justification (compressé : "Rejeté : X. Raison : Y")
- Contraintes explicites et éléments non négociables
- Dépendances et relations d'ordre
- Questions ouvertes et éléments non résolus
- Limites de périmètre (inclus/exclu/différé)
- Critères de succès et leur mode de validation
- Segments d'utilisateurs et ce que le succès signifie pour chacun
- Risques avec leurs signaux de gravité
- Conflits entre différents documents sources

## Transformer — Changer la forme pour plus d'efficacité

- Longs paragraphes en prose → une seule puce dense capturant la même information
- "Nous avons décidé d'utiliser X parce que Y et Z" → "X (justification : Y, Z)"
- Étiquettes de catégorie répétées → les regrouper sous un seul en-tête, sans étiquette par élément
- "Risque : ... Gravité : élevée" → "RISQUE ÉLEVÉ : ..."
- Déclarations conditionnelles → forme "Si X → Y"
- Explications sur plusieurs phrases → forme compressée séparée par des points-virgules
- Listes de petits éléments liés → une seule puce avec points-virgules
- "X est utilisé pour Y" → "X: Y" lorsque le contexte est clair
- Énumérations verbeuses → listes entre parenthèses : "plateformes (Cursor, Claude Code, Windsurf, Copilot)"

## Règles de Déduplication

- Même fait dans plusieurs documents → conserver la version ayant le plus de contexte
- Même concept à des niveaux de détail différents → conserver la version détaillée
- Listes qui se chevauchent → fusionner en une seule liste, sans doublon
- Lorsque les documents sources sont en désaccord → noter le conflit explicitement : "Le brief dit X; les notes de découverte disent Y — non résolu"
- Points du résumé exécutif qui sont développés ailleurs → ne conserver que la version développée
- Cadrage introductif répété à travers les sections → capturer une seule fois sous le thème le plus pertinent
