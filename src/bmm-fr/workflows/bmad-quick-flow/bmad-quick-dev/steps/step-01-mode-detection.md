---
---

# Étape 1 : Détection du Mode

**Objectif :** Déterminer le mode d'exécution, capturer l'état de référence (baseline), gérer l'escalade si nécessaire.

---

## VARIABLES D'ÉTAT (à capturer maintenant, persistent tout au long)

Ces variables DOIVENT être définies dans cette étape et disponibles pour toutes les étapes suivantes :

- `{baseline_commit}` - Git HEAD au début du workflow (ou "NO_GIT" si ce n'est pas un dépôt Git).
- `{execution_mode}` - "tech-spec" ou "direct".
- `{tech_spec_path}` - Chemin vers le fichier tech-spec (si Mode A).

---

## SÉQUENCE D'EXÉCUTION

### 1. Capturer l'État de Référence (Baseline)

Tout d'abord, vérifiez si le projet utilise le contrôle de version Git :

**Si un dépôt Git existe** (répertoire `.git` présent ou `git rev-parse --is-inside-work-tree` réussit) :

- Exécutez `git rev-parse HEAD` et stockez le résultat dans `{baseline_commit}`.

**Si ce n'est PAS un dépôt Git :**

- Définissez `{baseline_commit}` = "NO_GIT".

### 2. Charger le Contexte du Projet

Vérifiez si `{project_context}` existe (`**/project-context.md`). Si trouvé, chargez-le comme référence fondamentale pour TOUTES les décisions d'implémentation.

### 3. Analyser l'Entrée de l'Utilisateur

Analysez l'entrée de l'utilisateur pour déterminer le mode :

**Mode A : Tech-Spec**

- L'utilisateur a fourni un chemin vers un fichier tech-spec (ex: `quick-dev tech-spec-auth.md`).
- Chargez la spécification, extrayez les tâches/contexte/AC.
- Définissez `{execution_mode}` = "tech-spec".
- Définissez `{tech_spec_path}` = chemin fourni.
- **SUIVANT :** Lire complètement et suivre : `./step-03-execute.md`.

**Mode B : Instructions Directes**

- L'utilisateur a fourni la description de la tâche directement (ex: `refactoriser src/foo.ts...`).
- Définissez `{execution_mode}` = "direct".
- **SUIVANT :** Évaluer le seuil d'escalade, puis continuer.

---

## SEUIL D'ESCALADE (Mode B uniquement)

Évaluez l'entrée de l'utilisateur avec une utilisation minimale de tokens (pas de chargement de fichiers) :

**Signaux déclenchant l'escalade (si 2+ signaux présents) :**

- Plusieurs composants mentionnés (dashboard + api + base de données).
- Langage de niveau système (plateforme, intégration, architecture).
- Incertitude sur l'approche ("comment devrais-je", "meilleure façon de").
- Périmètre multi-couches (UI + backend + données ensemble).
- Délai étendu ("cette semaine", "au cours des prochains jours").

**Signaux réduisant l'escalade :**

- Marqueurs de simplicité ("juste", "rapidement", "fix", "bug", "typo", "simple").
- Focus sur un seul fichier/composant.
- Requête confiante et spécifique.

Utilisez un jugement holistique, pas une correspondance de mots-clés mécanique.

---

## GESTION DE L'ESCALADE

### Pas d'Escalade (requête simple)

Affichez : "**Sélectionnez :** [P] Planifier d'abord (tech-spec) [E] Exécuter directement"

#### Logique de Gestion du Menu :

- SI P : Dirigez l'utilisateur vers la compétence `bmad-quick-spec`. **QUITTER Quick Dev.**
- SI E : Demandez toute consigne supplémentaire, puis **SUIVANT :** Lire complètement et suivre : `./step-02-context-gathering.md`.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Continuer UNIQUEMENT lorsque l'utilisateur fait une sélection.

---

### Escalation Déclenchée - Niveau 0-2

Présentez : "Cela ressemble à une fonctionnalité ciblée impliquant plusieurs composants."

Affichez :

**[P] Planifier d'abord (tech-spec)** (recommandé)
**[W] Semble plus gros que quick-dev** - Recommander le processus PRD complet BMad Flow
**[E] Exécuter directement**

#### Logique de Gestion du Menu :

- SI P : Dirigez l'utilisateur vers la compétence `bmad-quick-spec`. **QUITTER Quick Dev.**
- SI W : Dirigez l'utilisateur vers le workflow PRD à la place. **QUITTER Quick Dev.**
- SI E : Demandez des consignes, puis **SUIVANT :** Lire complètement et suivre : `./step-02-context-gathering.md`.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Continuer UNIQUEMENT lorsque l'utilisateur fait une sélection.

---

### Escalation Déclenchée - Niveau 3+

Présentez : "Cela ressemble à un travail sur la plateforme ou le système."

Affichez :

**[W] Commencer la Méthode BMad** (recommandé)
**[P] Planifier d'abord (tech-spec)** (planification plus légère)
**[E] Exécuter directement** - si vous vous sentez chanceux

#### Logique de Gestion du Menu :

- SI P : Dirigez l'utilisateur vers la compétence `bmad-quick-spec`. **QUITTER Quick Dev.**
- SI W : Dirigez l'utilisateur vers le workflow PRD à la place. **QUITTER Quick Dev.**
- SI E : Demandez des consignes, puis **SUIVANT :** Lire complètement et suivre : `./step-02-context-gathering.md`.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Continuer UNIQUEMENT lorsque l'utilisateur fait une sélection.

---

## DIRECTIVE ÉTAPE SUIVANTE

**CRITIQUE :** Lorsque cette étape se termine, indiquez explicitement quelle étape charger :

- Mode A (tech-spec) : "**SUIVANT :** lire complètement et suivre : `./step-03-execute.md`"
- Mode B (direct, [E] sélectionné) : "**SUIVANT :** lire complètement et suivre : `./step-02-context-gathering.md`"
- Escalade ([P] ou [W]) : "**SORTIE de Quick Dev.** Suivez le workflow indiqué."

---

## MÉTRIQUES DE RÉUSSITE

- `{baseline_commit}` capturé et stocké.
- `{execution_mode}` déterminé ("tech-spec" ou "direct").
- `{tech_spec_path}` défini si Mode A.
- Contexte projet chargé s'il existe.
- Escalade évaluée de manière appropriée (Mode B).
- Directive SUIVANT explicite fournie.

## MODES D'ÉCHEC

- Continuer sans capturer le commit de référence.
- Ne pas définir la variable execution_mode.
- Charger step-02 alors que le Mode A (tech-spec fournie) est actif.
- Tenter de "revenir" après une escalade au lieu de QUITTER.
- Pas de directive SUIVANT explicite à la fin de l'étape.
