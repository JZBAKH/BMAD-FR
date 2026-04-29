# Workflow Documenter le Projet - Liste de Contrôle de Validation

## Niveau de Scan et Reprise

- [ ] Sélection du niveau de scan proposée (rapide/approfondi/exhaustif) pour les modes initial_scan et full_rescan
- [ ] Le mode Deep-dive utilise automatiquement le scan exhaustif (aucun choix proposé)
- [ ] Le scan rapide (Quick) ne lit PAS les fichiers sources (uniquement les patterns, configs, manifestes)
- [ ] Le scan approfondi (Deep) lit les fichiers dans les répertoires critiques selon le type de projet
- [ ] Le scan exhaustif lit TOUS les fichiers sources (en excluant node_modules, dist, build)
- [ ] Fichier d'état (project-scan-report.json) créé au début du workflow
- [ ] Fichier d'état mis à jour après la complétion de chaque étape
- [ ] Le fichier d'état contient tous les champs requis selon le schéma
- [ ] Invite de reprise affichée si le fichier d'état existe et date de moins de 24 heures
- [ ] Les anciens fichiers d'état (>24 heures) sont automatiquement archivés
- [ ] La fonctionnalité de reprise charge correctement l'état précédent
- [ ] Le workflow peut sauter à l'étape correcte lors de la reprise

## Architecture "Écriture au Fil de l'Eau" (Write-as-you-go)

- [ ] Chaque document est écrit sur le disque IMMÉDIATEMENT après sa génération
- [ ] Validation du document effectuée juste après l'écriture (au niveau des sections)
- [ ] Fichier d'état mis à jour après l'écriture de chaque document
- [ ] Les conclusions détaillées sont purgées du contexte après l'écriture (seuls les résumés sont conservés)
- [ ] Le contexte ne contient que des résumés de haut niveau (1-2 phrases par section)
- [ ] Aucune accumulation de l'analyse complète du projet en mémoire

## Stratégie de Lotissement (Scans Approfondis/Exhaustifs)

- [ ] Lotissement (batching) appliqué pour les niveaux de scan approfondis et exhaustifs
- [ ] Lots organisés par SOUS-DOSSIER (et non par nombre de fichiers arbitraire)
- [ ] Fichiers volumineux (>5000 lignes) gérés avec un jugement approprié
- [ ] Chaque lot : lire les fichiers, extraire les infos, écrire la sortie, valider, purger le contexte
- [ ] Complétion des lots suivie dans le fichier d'état (tableau batches_completed)
- [ ] Résumés des lots conservés dans le contexte (1-2 phrases max)

## Détection et Classification du Projet

- [ ] Type de projet correctement identifié et correspondant à la pile technologique réelle
- [ ] Structure multi-parties vs monopartie (monolith) détectée avec précision
- [ ] Toutes les parties du projet identifiées si multi-parties (pas d'omission client/serveur/etc.)
- [ ] Exigences de documentation chargées pour chaque type de partie
- [ ] La correspondance avec le registre d'architecture est appropriée pour la pile détectée

## Analyse de la Pile Technologique (Tech Stack)

- [ ] Toutes les technologies majeures identifiées (framework, langage, base de données, etc.)
- [ ] Versions capturées lorsque disponibles
- [ ] Le tableau des décisions technologiques est complet et précis
- [ ] Dépendances et bibliothèques documentées
- [ ] Outils de build et gestionnaires de paquets identifiés

## Complétude du Scan de la Base de Code

- [ ] Tous les répertoires critiques scannés en fonction du type de projet
- [ ] Points de terminaison API documentés (si requires_api_scan = true)
- [ ] Modèles de données capturés (si requires_data_models = true)
- [ ] Patterns de gestion d'état identifiés (si requires_state_management = true)
- [ ] Composants UI inventoriés (si requires_ui_components = true)
- [ ] Fichiers de configuration localisés et documentés
- [ ] Patterns d'authentification/sécurité identifiés
- [ ] Points d'entrée correctement identifiés
- [ ] Points d'intégration cartographiés (pour les projets multi-parties)
- [ ] Fichiers et patterns de test documentés

## Analyse de l'Arborescence Source

- [ ] Arborescence complète des répertoires générée sans omissions majeures
- [ ] Dossiers critiques mis en évidence et décrits
- [ ] Points d'entrée clairement marqués
- [ ] Chemins d'intégration notés (pour le multi-parties)
- [ ] Emplacement des assets identifiés (si applicable)
- [ ] Patterns d'organisation des fichiers expliqués

## Qualité de la Documentation d'Architecture

- [ ] Le document d'architecture utilise le template approprié du registre
- [ ] Toutes les sections du template sont remplies avec des informations pertinentes (pas de placeholders)
- [ ] La section sur la pile technologique est exhaustive
- [ ] Le pattern d'architecture est clairement expliqué
- [ ] Architecture des données documentée (si applicable)
- [ ] Design de l'API documenté (si applicable)
- [ ] Structure des composants expliquée (si applicable)
- [ ] Arborescence source incluse et annotée
- [ ] Stratégie de test documentée
- [ ] Architecture de déploiement capturée (si config trouvée)

## Documentation de Développement et d'Opérations

- [ ] Prérequis clairement listés
- [ ] Étapes d'installation documentées
- [ ] Instructions de configuration de l'environnement fournies
- [ ] Commandes d'exécution locale spécifiées
- [ ] Processus de build documenté
- [ ] Approche et commandes de test expliquées
- [ ] Processus de déploiement documenté (si applicable)
- [ ] Détails du pipeline CI/CD capturés (si trouvés)
- [ ] Directives de contribution extraites (si trouvées)

## Spécificités des Projets Multi-Parties (si applicable)

- [ ] Chaque partie documentée séparément
- [ ] Fichiers d'architecture spécifiques à chaque partie créés (architecture-{part_id}.md)
- [ ] Inventaires de composants spécifiques aux parties créés (si applicable)
- [ ] Guides de développement spécifiques aux parties créés
- [ ] Document d'architecture d'intégration créé
- [ ] Points d'intégration clairement définis avec type et détails
- [ ] Flux de données entre les parties expliqué
- [ ] Fichier de métadonnées project-parts.json créé

## Index et Navigation

- [ ] index.md créé comme point d'entrée principal
- [ ] Structure du projet clairement résumée dans l'index
- [ ] Section de référence rapide complète et précise
- [ ] Tous les documents générés sont liés depuis l'index
- [ ] Tous les documents existants sont liés depuis l'index (si trouvés)
- [ ] La section "Démarrage" fournit des prochaines étapes claires
- [ ] Conseils pour le développement assisté par l'IA inclus
- [ ] La structure de navigation correspond à la complexité du projet (simple pour monopartie, détaillée pour multi-parties)

## Complétude des Fichiers

- [ ] index.md généré
- [ ] project-overview.md généré
- [ ] source-tree-analysis.md généré
- [ ] architecture.md (ou par partie) généré
- [ ] component-inventory.md (ou par partie) généré si les composants UI existent
- [ ] development-guide.md (ou par partie) généré
- [ ] api-contracts.md (ou par partie) généré si les API sont documentées
- [ ] data-models.md (ou par partie) généré si les modèles de données sont trouvés
- [ ] deployment-guide.md généré si la config de déploiement est trouvée
- [ ] contribution-guide.md généré si les directives sont trouvées
- [ ] integration-architecture.md généré si multi-parties
- [ ] project-parts.json généré si multi-parties

## Qualité du Contenu

- [ ] Les informations techniques sont précises et spécifiques
- [ ] Aucun placeholder générique ou élément "TODO" ne subsiste
- [ ] Les exemples et extraits de code sont pertinents pour le projet réel
- [ ] Les chemins de fichiers et les références de répertoires sont corrects
- [ ] Les noms de technologies et les versions sont précis
- [ ] La terminologie est cohérente dans tous les documents
- [ ] Les descriptions sont claires et exploitables

## État de Préparation pour PRD Brownfield

- [ ] La documentation fournit suffisamment de contexte pour que l'IA comprenne le système existant
- [ ] Les points d'intégration sont clairs pour la planification de nouvelles fonctionnalités
- [ ] Les composants réutilisables sont identifiés pour être exploités dans de nouveaux travaux
- [ ] Les modèles de données sont documentés pour la planification de l'extension du schéma
- [ ] Les contrats d'API sont documentés pour l'expansion des points de terminaison
- [ ] Les conventions et patterns de code sont capturés pour assurer la cohérence
- [ ] Les contraintes d'architecture sont claires pour une prise de décision éclairée

## Validation de la Sortie (Output)

- [ ] Tous les fichiers sont enregistrés dans le dossier de sortie correct
- [ ] Le nommage des fichiers suit la convention (pas de suffixe de partie pour monopartie, avec suffixe pour multi-parties)
- [ ] Aucun lien interne rompu entre les documents
- [ ] Le formatage Markdown est correct et s'affiche proprement
- [ ] Les fichiers JSON sont valides (project-parts.json si applicable)

## Validation Finale

- [ ] L'utilisateur a confirmé que la classification du projet est précise
- [ ] L'utilisateur a fourni tout contexte supplémentaire nécessaire
- [ ] Tous les domaines d'intervention demandés ont été traités
- [ ] La documentation est immédiatement utilisable pour le workflow PRD brownfield
- [ ] Aucun manque d'information critique identifié

## Problèmes Trouvés

### Problèmes Critiques (doivent être corrigés avant la fin)

-

### Problèmes Mineurs (peuvent être traités plus tard)

-

### Informations Manquantes (à noter pour l'utilisateur)

-

## Validation du Mode Deep-Dive (si une plongée approfondie a été effectuée)

- [ ] Zone cible du deep-dive correctement identifiée et délimitée
- [ ] Tous les fichiers de la zone cible ont été lus complètement (aucun fichier sauté)
- [ ] L'inventaire des fichiers inclut tous les exports avec les signatures complètes
- [ ] Dépendances cartographiées pour tous les fichiers
- [ ] Dépendants identifiés (qui importe chaque fichier)
- [ ] Extraits de code inclus pour les détails d'implémentation clés
- [ ] Patterns et approches de conception documentés
- [ ] Stratégie de gestion d'état expliquée
- [ ] Effets de bord documentés (appels API, requêtes DB, etc.)
- [ ] Approches de gestion des erreurs capturées
- [ ] Fichiers de test et couverture documentés
- [ ] TODOs et commentaires extraits
- [ ] Graphe de dépendances créé montrant les relations
- [ ] Flux de données tracé à travers la zone scannée
- [ ] Points d'intégration avec le reste de la base de code identifiés
- [ ] Code connexe et patterns similaires trouvés en dehors de la zone scannée
- [ ] Opportunités de réutilisation documentées
- [ ] Conseils d'implémentation fournis
- [ ] Instructions de modification claires
- [ ] index.md mis à jour avec le lien vers le deep-dive
- [ ] La documentation du deep-dive est immédiatement utile pour l'implémentation

---

## Qualité du Fichier d'État

- [ ] Le fichier d'état est un JSON valide (aucune erreur de syntaxe)
- [ ] Le fichier d'état est optimisé (pas de "pretty-printing", espaces blancs minimaux)
- [ ] Le fichier d'état contient toutes les étapes terminées avec horodatages
- [ ] La liste outputs_generated du fichier d'état est exacte et complète
- [ ] Les instructions de reprise (resume_instructions) du fichier d'état sont claires et exploitables
- [ ] Les "findings" du fichier d'état ne contiennent que des résumés de haut niveau (pas de données détaillées)
- [ ] Le fichier d'état peut être chargé avec succès pour une reprise

## Critères de Complétion

Tous les éléments des sections suivantes doivent être cochés :

- ✓ Niveau de Scan et Reprise
- ✓ Architecture "Écriture au Fil de l'Eau"
- ✓ Stratégie de Lotissement (si scan approfondi/exhaustif)
- ✓ Détection et Classification du Projet
- ✓ Analyse de la Pile Technologique
- ✓ Qualité de la Documentation d'Architecture
- ✓ Index et Navigation
- ✓ Complétude des Fichiers
- ✓ État de Préparation pour PRD Brownfield
- ✓ Qualité du Fichier d'État
- ✓ Validation du Mode Deep-Dive (si applicable)

Le workflow est terminé lorsque :

1. Tous les points critiques de la liste de contrôle sont satisfaits
2. Aucun problème critique ne subsiste
3. L'utilisateur a passé en revue et approuvé la documentation
4. Les documents générés sont prêts à être utilisés dans le workflow PRD brownfield
5. Les documents deep-dive (le cas échéant) sont exhaustifs et prêts pour l'implémentation
6. Le fichier d'état est valide et permet la reprise en cas d'interruption
