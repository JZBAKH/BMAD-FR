---
name: 'step-v-08-domain-compliance-validation'
description: 'Validation de la Conformité du Domaine - Valider que les exigences spécifiques au domaine sont présentes pour les domaines à haute complexité'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-09-project-type-validation.md'
prdFile: '{prd_file_path}'
prdFrontmatter: '{prd_frontmatter}'
validationReportPath: '{validation_report_path}'
domainComplexityData: '../data/domain-complexity.csv'
---

# Étape 8 : Validation de la Conformité du Domaine

## OBJECTIF DE L'ÉTAPE :

Valider que les exigences spécifiques au domaine sont présentes pour les domaines à haute complexité (Santé, Fintech, GovTech, etc.), en s'assurant que les exigences réglementaires et de conformité sont correctement documentées.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant de prendre toute mesure.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité.
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle.
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif.
- ✅ Vous apportez votre expertise du domaine et vos connaissances en matière de conformité.
- ✅ Cette étape s'exécute de manière autonome - aucune entrée de l'utilisateur n'est nécessaire.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur les exigences de conformité spécifiques au domaine.
- 🚫 INTERDICTION de valider d'autres aspects dans cette étape.
- 💬 Approche : Validation conditionnelle basée sur la classification du domaine.
- 🚪 Il s'agit d'une étape de séquence de validation - elle passe automatiquement à la suite une fois terminée.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Vérifier classification.domain dans le frontmatter du PRD.
- 💬 Si complexité faible (général) : Sauter les vérifications détaillées.
- 🎯 Si complexité élevée : Valider les sections spéciales requises.
- 💾 Ajouter les résultats de conformité au rapport de validation.
- 📖 Afficher "Passage au contrôle suivant..." et charger l'étape suivante.
- 🚫 INTERDICTION de s'arrêter ou de demander l'entrée de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : Fichier PRD avec classification du frontmatter, rapport de validation.
- Focus : Conformité du domaine uniquement (conditionnée par la complexité du domaine).
- Limites : Ne pas valider d'autres aspects, exécution conditionnelle.
- Dépendances : Étapes 2 à 7 terminées - validation du format et des exigences effectuée.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Charger les données de complexité du domaine

Chargez et lisez le fichier complet à l'adresse suivante :
`{domainComplexityData}` (../data/domain-complexity.csv)

Ce CSV contient :

- Les classifications de domaine et les niveaux de complexité (élevé/moyen/faible).
- Les sections spéciales requises pour chaque domaine.
- Les préoccupations et exigences clés pour les industries réglementées.

Internalisez ces données - elles déterminent quels domaines nécessitent des sections de conformité spéciales.

### 2. Extraire la classification du domaine

Depuis le frontmatter du PRD, extrayez :

- `classification.domain` - pour quel domaine ce PRD est-il conçu ?

**Si aucune classification de domaine n'est trouvée :**
Traitez comme "général" (faible complexité) et passez à l'étape 4.

### 2. Déterminer la complexité du domaine

**Domaines de faible complexité (sauter les vérifications détaillées) :**

- Général
- Applications grand public (e-commerce standard, social, productivité).
- Sites web de contenu.
- Outils métier (standard).

**Domaines de haute complexité (nécessitent des sections spéciales) :**

- Santé / Healthtech
- Fintech / Services financiers
- GovTech / Secteur public
- EdTech (dossiers scolaires, cours accrédités).
- Legal tech
- Autres domaines réglementés.

### 3. Pour les domaines à haute complexité : Valider les sections spéciales requises

**Tenter une validation par sous-processus :**

"Effectuer la validation de la conformité du domaine pour {domain} :

Sur la base des exigences de {domain}, vérifiez le PRD pour :

**Santé (Healthcare) :**

- Section Exigences Cliniques.
- Parcours Réglementaire (FDA, HIPAA, etc.).
- Mesures de Sécurité (Safety).
- Conformité HIPAA (confidentialité des données, sécurité).
- Considérations sur la sécurité des patients.

**Fintech :**

- Matrice de Conformité (SOC2, PCI-DSS, GDPR, etc.).
- Architecture de Sécurité.
- Exigences d'Audit.
- Mesures de Prévention de la Fraude.
- Gestion des transactions financières.

**GovTech :**

- Normes d'Accessibilité (WCAG 2.1 AA, Section 508).
- Conformité des Marchés Publics.
- Exigences d'Habilitation de Sécurité.
- Exigences de résidence des données.

**Autres domaines réglementés :**

- Vérifier les sections réglementaires spécifiques au domaine.
- Exigences de conformité.
- Considérations spéciales.

Pour chaque section requise :

- Est-elle présente dans le PRD ?
- Est-elle documentée de manière adéquate ?
- Notez toutes les lacunes.

Retourner la matrice de conformité avec l'évaluation de présence/adéquation."

**Dégradation gracieuse (si pas d'outil Task) :**

- Vérifier manuellement les sections requises en fonction du domaine.
- Lister les sections présentes et les sections manquantes.
- Évaluer l'adéquation de la documentation.

### 5. Pour les domaines de faible complexité : Sauter les vérifications détaillées

Ajoutez au rapport de validation :

```markdown
## Validation de la Conformité du Domaine

**Domaine :** {domain}
**Complexité :** Faible (général/standard)
**Évaluation :** N/A - Pas d'exigences spéciales de conformité au domaine

**Note :** Ce PRD concerne un domaine standard sans exigences de conformité réglementaire.
```

Affichez : "**Validation de la conformité du domaine ignorée**

Domaine : {domain} (faible complexité)

**Passage au prochain contrôle de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile}

### 6. Rapporter les résultats de conformité (Domaines à haute complexité)

Ajoutez au rapport de validation :

```markdown
## Validation de la Conformité du Domaine

**Domaine :** {domain}
**Complexité :** Haute (réglementée)

### Sections spéciales requises

**{Nom de la section 1} :** [Présente/Manquante/Adéquate]
{Si manquante ou inadéquate : Notez les lacunes spécifiques}

**{Nom de la section 2} :** [Présente/Manquante/Adéquate]
{Si manquante ou inadéquate : Notez les lacunes spécifiques}

[Continuer pour toutes les sections requises]

### Matrice de conformité

| Exigence     | État                            | Notes   |
| ------------ | ------------------------------- | ------- |
| {Exigence 1} | [Respectée/Partielle/Manquante] | {Notes} |
| {Exigence 2} | [Respectée/Partielle/Manquante] | {Notes} |

[... continuer pour toutes les exigences]

### Résumé

**Sections requises présentes :** {count}/{total}
**Lacunes de conformité :** {count}

**Sévérité :** [Critique si les sections réglementaires manquent, Avertissement si incomplet, Réussite si complet]

**Recommandation :**
[Si Critique] "Le PRD ne contient pas les sections de conformité spécifiques au domaine requises. Celles-ci sont essentielles pour les produits {domain}."
[If Warning] "Certaines sections de conformité au domaine sont incomplètes. Renforcez la documentation pour une conformité totale."
[If Pass] "Toutes les sections de conformité au domaine requises sont présentes et documentées de manière adéquate."
```

### 7. Afficher la progression et procéder automatiquement

Affichez : "**Validation de la conformité du domaine terminée**

Domaine : {domain} ({complexity})
État de la conformité : {status}

**Passage au prochain contrôle de validation...**"

Sans délai, lisez complètement et suivez : {nextStepFile} (step-v-09-project-type-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Classification du domaine extraite correctement.
- Complexité évaluée de manière appropriée.
- Domaines de faible complexité : Ignorée avec une documentation "N/A" claire.
- Domaines de haute complexité : Toutes les sections requises ont été vérifiées.
- Matrice de conformité construite avec l'état de chaque exigence.
- Sévérité évaluée correctement.
- Résultats rapportés dans le rapport de validation.
- Passage automatique à l'étape de validation suivante.
- Sous-processus tenté avec dégradation gracieuse.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas vérifier la classification du domaine avant de procéder.
- Effectuer des vérifications détaillées sur des domaines de faible complexité.
- Pour la haute complexité : vérifications de sections requises manquantes.
- Ne pas construire de matrice de conformité.
- Ne pas rapporter les résultats dans le rapport de validation.
- Ne pas procéder automatiquement.

**Règle Maîtresse :** La conformité du domaine est conditionnelle. Les domaines à haute complexité nécessitent des sections spéciales - les domaines à faible complexité sautent ces vérifications.
