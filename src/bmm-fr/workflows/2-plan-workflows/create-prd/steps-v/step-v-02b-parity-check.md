---
name: 'step-v-02b-parity-check'
description: 'Contrôle de Parité du Document - Analyser le PRD non-standard et identifier les lacunes pour atteindre la parité avec le PRD BMAD'

# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
nextStepFile: './step-v-03-density-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
---

# Étape 2B : Contrôle de Parité du Document

## OBJECTIF DE L'ÉTAPE :

Analyser le PRD non-standard et identifier les lacunes pour atteindre la parité avec le PRD BMAD, en présentant à l'utilisateur des options sur la manière de procéder.

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
- ✅ Nous engageons un dialogue collaboratif, pas une commande-réponse.
- ✅ Vous apportez l'expertise des standards de PRD BMAD et l'analyse d'écarts (gap analysis).
- ✅ L'utilisateur apporte la connaissance du domaine et le contexte du PRD.

### Règles Spécifiques à l'Étape :

- 🎯 Concentrez-vous UNIQUEMENT sur l'analyse des écarts et l'estimation de l'effort de parité.
- 🚫 INTERDICTION d'effectuer d'autres vérifications de validation dans cette étape.
- 💬 Approche : Analyse systématique des écarts avec des recommandations claires.
- 🚪 Il s'agit d'une étape d'aiguillage optionnelle - l'utilisateur choisit la prochaine action.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Analyser chaque section clé du PRD BMAD pour identifier les lacunes.
- 💾 Ajouter l'analyse de parité au rapport de validation.
- 📖 Présenter les options et attendre la décision de l'utilisateur.
- 🚫 INTERDICTION de procéder sans sélection de l'utilisateur.

## LIMITES DU CONTEXTE :

- Contexte disponible : PRD non-standard de l'étape 2, rapport de validation en cours.
- Focus : Analyse de parité uniquement - ce qui manque, ce qui est nécessaire.
- Limites : Ne pas effectuer de vérifications de validation, ne pas procéder automatiquement.
- Dépendances : L'étape 2 a classifié le PRD comme non-standard et l'utilisateur a choisi le contrôle de parité.

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivez cette séquence exactement. Ne sautez pas, ne réordonnez pas et n'improvisez pas, sauf si l'utilisateur demande explicitement un changement.

### 1. Analyser chaque section du PRD BMAD

Pour chacune des 6 sections clés du PRD BMAD, analysez :

**Résumé Analytique :**

- Le PRD a-t-il une vision/vue d'ensemble ?
- L'énoncé du problème est-il clair ?
- Les utilisateurs cibles sont-ils identifiés ?
- Écart : [Ce qui est manquant ou incomplet]

**Critères de Succès :**

- Des objectifs mesurables sont-ils définis ?
- Le succès est-il clairement défini ?
- Écart : [Ce qui est manquant ou incomplet]

**Périmètre du Produit :**

- Le périmètre est-il clairement défini ?
- Les éléments inclus sont-ils listés ?
- Les éléments hors périmètre sont-ils listés ?
- Écart : [Ce qui est manquant ou incomplet]

**Parcours Utilisateurs :**

- Les types d'utilisateurs/personas sont-ils identifiés ?
- Les flux utilisateurs sont-ils documentés ?
- Écart : [Ce qui est manquant ou incomplet]

**Exigences Fonctionnelles :**

- Les fonctionnalités/capacités sont-elles listées ?
- Les exigences sont-elles structurées ?
- Écart : [Ce qui est manquant ou incomplet]

**Exigences Non Fonctionnelles :**

- Les attributs de qualité sont-ils définis ?
- Les exigences de performance/sécurité/etc. sont-elles documentées ?
- Écart : [Ce qui est manquant ou incomplet]

### 2. Estimer l'effort pour atteindre la parité

Pour chaque section manquante ou incomplète, estimez :

**Niveau d'effort :**

- Minimal - La section existe mais nécessite des améliorations mineures.
- Modéré - La section manque mais le contenu existe ailleurs dans le PRD.
- Significatif - La section manque, nécessite la création de nouveau contenu.

**Effort de parité total :**

- Basé sur les estimations individuelles des sections.
- Classification globale : Effort Rapide / Modéré / Substantiel.

### 3. Rapporter l'analyse de parité dans le rapport de validation

Ajoutez au rapport de validation :

```markdown
## Analyse de Parité (PRD Non-Standard)

### Analyse des écarts section par section

**Résumé Analytique :**

- État : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Critères de Succès :**

- État : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Périmètre du Produit :**

- État : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Parcours Utilisateurs :**

- État : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Exigences Fonctionnelles :**

- État : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort pour compléter : [Minimal/Modéré/Significatif]

**Exigences Non Fonctionnelles :**

- État : [Présent/Manquant/Incomplet]
- Écart : [description spécifique de l'écart]
- Effort pour compléter : [Minimal/Modéré/Significatif]

### Évaluation Globale de la Parité

**Effort global pour atteindre le Standard BMAD :** [Rapide/Modéré/Substantiel]
**Recommandation :** [Brève recommandation basée sur l'analyse]
```

### 4. Présenter l'analyse de parité et les options

Affichez :

"**Analyse de parité terminée**

Il manque à votre PRD {count} des 6 sections clés du PRD BMAD. L'effort global pour atteindre le standard BMAD est : **{niveau d'effort}**

**Résumé rapide :**
[Résumé de 2-3 phrases des lacunes principales]

**Recommandation :**
{recommandation de l'analyse}

**Comment souhaitez-vous procéder ?**"

### 5. Présenter les OPTIONS DU MENU

**[C] Continuer la Validation** - Poursuivre la validation en utilisant la structure actuelle.
**[E] Quitter et Examiner** - Quitter la validation et examiner le rapport de parité.
**[S] Enregistrer et Quitter** - Enregistrer le rapport de parité et quitter.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur.
- Procéder uniquement en fonction de la sélection de l'utilisateur.

#### Logique de Gestion du Menu :

- SI C (Continuer) : Affichez "Poursuite de la validation..." puis lisez complètement et suivez : {nextStepFile}.
- SI E (Quitter) : Affichez le résumé de la parité et quittez la validation.
- SI S (Enregistrer) : Confirmez l'enregistrement, affichez le résumé, quittez.
- SI Autre : aidez l'utilisateur à répondre, puis réaffichez le menu.

---

## 🚨 MÉTRIQUES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Les 6 sections du PRD BMAD ont été analysées pour identifier les lacunes.
- Estimations d'effort fournies pour chaque lacune.
- Effort de parité global évalué correctement.
- Analyse de parité rapportée dans le rapport de validation.
- Résumé clair présenté à l'utilisateur.
- L'utilisateur peut choisir de continuer la validation, de quitter ou d'enregistrer le rapport.

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas analyser les 6 sections systématiquement.
- Estimations d'effort manquantes.
- Ne pas rapporter l'analyse de parité dans le rapport de validation.
- Procéder automatiquement sans décision de l'utilisateur.
- Recommandations peu claires.

**Règle Maîtresse :** Le contrôle de parité informe l'utilisateur des lacunes et de l'effort, mais l'utilisateur décide s'il doit poursuivre la validation ou combler les lacunes en premier.
