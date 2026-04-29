---
name: 'step-v-08-domain-compliance-validation'
description: 'Validation de la conformité du domaine - Valider que les exigences spécifiques au domaine sont présentes pour les domaines à haute complexité'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-09-project-type-validation.md'
prdFile: '{prd_file_path}'
prdFrontmatter: '{prd_frontmatter}'
validationReportPath: '{validation_report_path}'
domainComplexityData: '../data/domain-complexity.csv'
---

# Étape 8 : Validation de la conformité du domaine

## OBJECTIF DE L'ÉTAPE :

Valider que les exigences spécifiques au domaine sont présentes pour les domaines à haute complexité (Santé, Fintech, GovTech, etc.), en s'assurant que les exigences réglementaires et de conformité sont correctement documentées.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans intervention de l'utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant de prendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec [C], s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS VOUS EXPRIMER selon votre style de communication d'Agent avec la configuration `{communication_language}`

### Renforcement du Rôle :

- ✅ Vous êtes un Architecte de Validation et un Spécialiste de l'Assurance Qualité
- ✅ Si des modèles de communication ou de persona vous ont déjà été donnés, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous nous engageons dans une validation systématique, pas dans un dialogue collaboratif
- ✅ Vous apportez une expertise du domaine et des connaissances en conformité
- ✅ Cette étape s'exécute de manière autonome - aucune intervention de l'utilisateur n'est requise

### Règles Spécifiques à l'Étape :

- 🎯 Se concentrer UNIQUEMENT sur les exigences de conformité spécifiques au domaine
- 🚫 INTERDIT de valider d'autres aspects dans cette étape
- 💬 Approche : Validation conditionnelle basée sur la classification du domaine
- 🚪 Il s'agit d'une étape de séquence de validation - procède automatiquement une fois terminée

## PROTOCOLES D'EXÉCUTION :

- 🎯 Vérifier classification.domain dans le frontmatter du PRD
- 💬 Si complexité faible (général) : Sauter les vérifications détaillées
- 🎯 Si complexité élevée : Valider les sections spéciales requises
- 💾 Ajouter les conclusions de conformité au rapport de validation
- 📖 Afficher "Passage à la vérification suivante..." et charger l'étape suivante
- 🚫 INTERDIT de faire une pause ou de demander une intervention de l'utilisateur

## LIMITES DU CONTEXTE :

- Contexte disponible : fichier PRD avec classification frontmatter, rapport de validation
- Focus : Conformité du domaine uniquement (conditionnel à la complexité du domaine)
- Limites : Ne pas valider d'autres aspects, exécution conditionnelle
- Dépendances : Étapes 2 à 7 terminées - validation du format et des exigences effectuée

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre exactement cette séquence. Ne pas sauter d'étape, ne pas réorganiser ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Charger les données de complexité du domaine

Charger et lire le fichier complet à l'adresse :
`{domainComplexityData}` (../data/domain-complexity.csv)

Ce CSV contient :
- Les classifications de domaine et les niveaux de complexité (élevé/moyen/faible)
- Les sections spéciales requises pour chaque domaine
- Les préoccupations clés et les exigences pour les industries réglementées

Internaliser ces données - elles déterminent quels domaines nécessitent des sections de conformité spéciales.

### 2. Extraire la classification du domaine

Depuis le frontmatter du PRD, extraire :
- `classification.domain` - pour quel domaine ce PRD est-il conçu ?

**Si aucune classification de domaine n'est trouvée :**
Traiter comme "général" (faible complexité) et passer à l'étape 4.

### 2. Déterminer la complexité du domaine

**Domaines à faible complexité (sauter les vérifications détaillées) :**
- Général
- Applications grand public (e-commerce standard, social, productivité)
- Sites web de contenu
- Outils métier (standard)

**Domaines à haute complexité (nécessitent des sections spéciales) :**
- Santé / Healthtech
- Fintech / Services financiers
- GovTech / Secteur public
- EdTech (dossiers scolaires, cours accrédités)
- Legal tech
- Autres domaines réglementés

### 3. Pour les domaines à haute complexité : Valider les sections spéciales requises

**Tentative de validation par sous-processus :**

"Effectuer la validation de la conformité du domaine pour {domain} :

Sur la base des exigences de {domain}, vérifier le PRD pour :

**Santé :**
- Section Exigences Cliniques
- Parcours Réglementaire (FDA, HIPAA, etc.)
- Mesures de Sécurité
- Conformité HIPAA (confidentialité des données, sécurité)
- Considérations sur la sécurité des patients

**Fintech :**
- Matrice de Conformité (SOC2, PCI-DSS, RGPD, etc.)
- Architecture de Sécurité
- Exigences d'Audit
- Mesures de Prévention de la Fraude
- Gestion des transactions financières

**GovTech :**
- Normes d'Accessibilité (WCAG 2.1 AA, Section 508)
- Conformité de Passation de Marchés
- Exigences d'Habilitation de Sécurité
- Exigences de résidence des données

**Autres domaines réglementés :**
- Vérifier les sections réglementaires spécifiques au domaine
- Exigences de conformité
- Considérations spéciales

Pour chaque section requise :
- Est-elle présente dans le PRD ?
- Est-elle documentée de manière adéquate ?
- Noter toute lacune

Retourner la matrice de conformité avec l'évaluation de la présence/adéquation."

**Dégradation élégante (si pas d'outil Task) :**
- Vérifier manuellement les sections requises en fonction du domaine
- Lister les sections présentes et les sections manquantes
- Évaluer l'adéquation de la documentation

### 5. Pour les domaines à faible complexité : Sauter les vérifications détaillées

Ajouter au rapport de validation :
```markdown
## Validation de la conformité du domaine

**Domaine :** {domain}
**Complexité :** Faible (général/standard)
**Évaluation :** N/A - Aucune exigence de conformité de domaine spéciale

**Note :** Ce PRD concerne un domaine standard sans exigences de conformité réglementaire.
```

Afficher : "**Validation de la conformité du domaine ignorée**

Domaine : {domain} (faible complexité)

**Passage à la vérification de validation suivante...**"

Sans délai, lire entièrement et suivre : {nextStepFile}

### 6. Rapporter les conclusions de conformité (Domaines à haute complexité)

Ajouter au rapport de validation :

```markdown
## Validation de la conformité du domaine

**Domaine :** {domain}
**Complexité :** Élevée (réglementé)

### Sections spéciales requises

**{Section 1 Name} :** [Présente/Manquante/Adéquate]
{Si manquante ou inadéquate : Noter les lacunes spécifiques}

**{Section 2 Name} :** [Présente/Manquante/Adéquate]
{Si manquante ou inadéquate : Noter les lacunes spécifiques}

[Continuer pour toutes les sections requises]

### Matrice de conformité

| Exigence | Statut | Notes |
|----------|--------|-------|
| {Requirement 1} | [Respectée/Partielle/Manquante] | {Notes} |
| {Requirement 2} | [Respectée/Partielle/Manquante] | {Notes} |
[... continuer pour toutes les exigences]

### Résumé

**Sections requises présentes :** {count}/{total}
**Lacunes de conformité :** {count}

**Sévérité :** [Critique si des sections réglementaires manquent, Avertissement si incomplet, Réussi si complet]

**Recommandation :**
[Si Critique] "Le PRD manque de sections de conformité spécifiques au domaine requises. Celles-ci sont essentielles pour les produits du domaine {domain}."
[Si Avertissement] "Certaines sections de conformité du domaine sont incomplètes. Renforcer la documentation pour une conformité totale."
[Si Réussi] "Toutes les sections de conformité du domaine requises sont présentes et documentées de manière adéquate."
```

### 7. Afficher la progression et procéder automatiquement

Afficher : "**Validation de la conformité du domaine terminée**

Domaine : {domain} ({complexity})
Statut de conformité : {status}

**Passage à la vérification de validation suivante...**"

Sans délai, lire entièrement et suivre : {nextStepFile} (step-v-09-project-type-validation.md)

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Classification du domaine extraite correctement
- Complexité évaluée de manière appropriée
- Domaines à faible complexité : Ignorée avec une documentation "N/A" claire
- Domaines à haute complexité : Toutes les sections requises vérifiées
- Matrice de conformité construite avec un statut pour chaque exigence
- Sévérité évaluée correctement
- Conclusions rapportées au rapport de validation
- Passage automatique à l'étape de validation suivante
- Sous-processus tenté avec dégradation élégante

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas vérifier la classification du domaine avant de procéder
- Effectuer des vérifications détaillées sur des domaines à faible complexité
- Pour la haute complexité : vérifications des sections requises manquantes
- Ne pas construire de matrice de conformité
- Ne pas rapporter les conclusions au rapport de validation
- Ne pas procéder automatiquement

**Règle Maîtresse :** La conformité du domaine est conditionnelle. Les domaines à haute complexité nécessitent des sections spéciales - les domaines à faible complexité ignorent ces vérifications.
