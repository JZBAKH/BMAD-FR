---
name: bmad-investigate
description: Enquête de cas forensique avec conclusions graduées par évidence, calibrée sur l'entrée. À utiliser lorsque l'utilisateur demande d'enquêter sur un bug, de retracer ce qui a causé un incident, de parcourir du code non familier, ou de construire un modèle mental d'une zone de code avant d'y travailler.
---

# Investigate

## Vue d'ensemble

Reconstruire ce qui se passe, ou ce que fait une zone non familière, à partir des évidences disponibles. Produire un dossier d'enquête
structuré qu'un autre ingénieur peut reprendre à froid. Calibrer continuellement entre la chasse au défaut (pilotée par symptôme) et
l'exploration de zone (sans symptôme) ; la même discipline s'applique aux deux extrémités.

**Args :** Un ID de ticket, un chemin de fichier de log, une archive de diagnostic, un message d'erreur, un nom de zone de code, une description de problème, ou un chemin
vers un dossier d'enquête existant. Le dernier format reprend une enquête antérieure ; tout le reste ouvre un nouveau cas.

**Sortie :** `{implementation_artifacts}/{workflow.case_file_subdir}/{workflow.case_file_filename}`. Les entrées de référence sont
enregistrées ; le contenu brut n'est pas lu dans le contexte parent à moins qu'un résultat ne l'exige.

`{slug}` est l'ID de ticket lorsqu'il est fourni, sinon un nom descriptif court convenu avec l'utilisateur, assaini en
alphanumérique minuscule avec tirets. En cas de collision avec un dossier d'enquête existant au chemin résolu, demander s'il faut
renommer en `slug-YYYY-MM-DD.md` ou reprendre le fichier existant (la reprise route vers Outcome 0).

Après chaque outcome, présenter ce qui a été appris et faire une pause pour l'utilisateur avant de continuer.

## Principes

- **Gradation des évidences.**
  - **Confirmé.** Directement observé ; citer `path:line`, horodatage de log, ou hash de commit.
  - **Déduit.** Suit logiquement d'évidences Confirmées ; montrer la chaîne.
  - **Hypothétique.** Plausible mais non confirmé ; énoncer ce qui le confirmerait ou le réfuterait.
- **Bastion d'abord.** Ancrer dans une pièce d'évidence Confirmée et étendre vers l'extérieur. Ne jamais partir d'une théorie et
  chasser le support. Quand l'évidence est rare, basculer en mode evidence-light (branche Outcome 1).
- **Challenger la prémisse.** La description de l'utilisateur est une hypothèse, pas un fait. Vérifier indépendamment ; si l'évidence
  contredit, le dire.
- **Suivre l'évidence, pas le récit.** Quand l'évidence contredit la théorie de travail, mettre à jour la théorie — jamais
  l'inverse. Résister au biais de confirmation même quand l'utilisateur est convaincu.
- **Les hypothèses ne sont jamais supprimées.** Mettre à jour Status (Open / Confirmed / Refuted) et ajouter une Resolution. Les fausses pistes font
  partie du livrable.
- **L'évidence manquante est elle-même une conclusion.** Documenter le manque, ce qu'il résoudrait, et comment l'obtenir.
- **L'écrire tôt.** Initialiser le dossier d'enquête dès que le slug est convenu ; c'est l'état persistant à travers
  les interruptions.
- **Citations Path:line** utilisent le format relatif au CWD, sans `/` initial, pour qu'elles soient cliquables dans les terminaux intégrés à l'IDE.
- **Discipline de délégation.** Lorsqu'une étape requiert la lecture de 5+ fichiers ou de tout fichier >10K tokens, déléguer à un sous-agent
  qui retourne uniquement du JSON structuré. Citer `path:line` depuis le résultat ; ne pas relire dans le parent.
- **Émettre les opérations indépendantes en parallèle** (multi-grep, multi-read, inventaires parallèles) — un message, plusieurs
  appels d'outils.
- **Communication.** Langage centré évidence (« l'évidence montre », « non confirmé, requiert X pour vérifier »). Pas de tergiversations,
  pas de récit.

## À l'activation

### Étape 1 : Résoudre le bloc workflow

Exécuter : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

Si le script échoue, s'arrêter et faire remonter l'erreur.

### Étape 2 : Exécuter les étapes prepend

Exécuter chaque entrée dans `{workflow.activation_steps_prepend}` dans l'ordre.

### Étape 3 : Charger les faits persistants

Traiter chaque entrée dans `{workflow.persistent_facts}` comme contexte fondamental. Les préfixes `file:` sont des chemins ou des globs sous
`{project-root}` (charger les contenus) ; les autres entrées sont des faits verbatim.

### Étape 4 : Charger la config

Charger `{project-root}/_bmad/bmm/config.yaml` et résoudre `{user_name}`, `{communication_language}`,
`{document_output_language}`, `{implementation_artifacts}`, `{project_knowledge}`. Si `{implementation_artifacts}` n'est
pas résolu, retomber sur `./investigations/` et faire remonter le repli avant l'initialisation.

### Étape 5 : Saluer

Saluer `{user_name}` en `{communication_language}`.

### Étape 6 : Exécuter les étapes append

Exécuter chaque entrée dans `{workflow.activation_steps_append}` dans l'ordre.

### Étape 7 : Acquitter et router

Acquitter l'entrée comme une référence (enregistrer chemins et IDs ; ne pas lire le contenu brut). Chemin vers un dossier d'enquête existant →
Outcome 0. Sinon → Outcome 1.

## Procédure

### Outcome 0 : Le cas existant est chargé et présenté

Lire le dossier d'enquête. Faire émerger, dans l'ordre : les hypothèses ouvertes (Status = Open) avec leurs critères de confirmation/réfutation ; le
backlog ouvert (Status ≠ Done) ; les lignes d'évidence manquante ; la dernière Conclusion avec confiance. Demander quel fil tirer. Une nouvelle
évidence ouvre un nouveau bloc `## Follow-up: {YYYY-MM-DD}` (ajouter `#2`, `#3` lors d'une rentrée le même jour). Faire une pause pour l'utilisateur avec le récap ci-dessus ; attendre la direction.

### Outcome 1 : Le périmètre et le bastion sont établis

Acquitter chaque forme d'entrée — enregistrer emplacement, périmètre, fenêtre temporelle uniquement ; les lectures en bloc se font dans Outcome 2.

- **Ticket de gestionnaire d'incidents.** Récupérer les détails complets via les outils MCP disponibles.
- **Archive de diagnostic.** Enregistrer chemin, nombre de fichiers, fenêtre temporelle.
- **Fichier de log ou stack trace.** Enregistrer chemin et fenêtre temporelle ; seule la frame de stack déjà dans le message de l'utilisateur est en
  périmètre ici.
- **Description en texte libre.** Capturer verbatim ; traiter comme hypothèse.
- **Nom de zone de code** (sans symptôme). Enregistrer le point d'entrée.
- **Zone de commit récent.** Enregistrer la plage de commits.

Si l'utilisateur est arrivé avec une hypothèse, l'enregistrer comme Hypothesis #1. Trouver le bastion *indépendamment* ; l'hypothèse de
l'utilisateur est l'une des choses que le bastion valide ou réfute.

Trouver un bastion : une pièce d'évidence Confirmée (message d'erreur, nom de fonction, route HTTP, paramètre de config, cas de
test). Ancrer ici.

**Initialiser `{case_file}` avant la branche.** Le chemin est
`{implementation_artifacts}/{workflow.case_file_subdir}/{workflow.case_file_filename}` avec `{slug}` substitué (slug
et règles de collision dans Vue d'ensemble). Créer le fichier à partir de `{workflow.case_file_template}` et remplir Hand-off Brief
(brut), Case Info, Problem Statement, Evidence Inventory initial.

**Branche evidence-light.** Quand aucune évidence Confirmée n'est atteignable : marquer le cas evidence-light dans le Hand-off
Brief ; peupler l'Investigation Backlog avec des items de collecte de données priorisés ; enregistrer « pour progresser, j'ai besoin de l'un
de : … » ; faire une pause pour que l'utilisateur fournisse de l'évidence ou autorise Outcome 2 à scanner plus largement.

Sinon présenter périmètre, bastion, chemin de fichier, approche proposée. Faire une pause pour l'utilisateur avec le récap ci-dessus ; attendre la direction.

### Outcome 2 : Le périmètre d'évidence est cartographié

Sonder la scène : inventorier l'évidence disponible en parallèle à travers ces catégories indépendantes : archives de diagnostic ;
gestionnaire d'incidents ; gestion de versions ; résultats de tests ; analyse statique ; code source. Pour toute catégorie excédant ~10K tokens,
déléguer à un sous-agent qui retourne un manifeste JSON (chemins, tailles, fenêtres temporelles, fragments clés cités comme `path:line`).

Classifier chacune Available, Partial, ou Missing — Missing est elle-même une conclusion. Mettre à jour Evidence Inventory et Investigation
Backlog. Faire une pause pour l'utilisateur avec le récap ci-dessus ; attendre la direction.

### Outcome 3 : La cause est raisonnée avec discipline

- **Tracer la causalité.** Piloté par symptôme : tracer en arrière depuis le symptôme vers les conditions productrices et l'état qui
  a émergé. Exploration : tracer en arrière depuis les sorties (retours, effets de bord, messages envoyés) vers les conditions productrices.
  Même technique, ancrage différent.
- **Reconstruire la chronologie** en croisant logs, événements système, gestion de versions, observations utilisateur.
- **Former et tester des hypothèses.** Énoncer, identifier l'évidence confirmant/réfutant, chercher, grader
  (Confirmed / Refuted / Open). Mettre à jour Status. Ne jamais supprimer.
- **Passe de réfutation.** Chaque fois qu'une hypothèse transite vers Confirmed, chercher activement de l'évidence réfutante d'abord.
  Enregistrer la tentative dans Resolution.
- **Vérifier la prémisse de l'utilisateur.** Si l'évidence contredit, le dire explicitement.
- **Ajouter les chemins découverts au backlog.** Rester focalisé sur le fil actuel.

Mettre à jour Confirmed Findings, Deduced Conclusions, Hypothesized Paths, Backlog, Timeline. Mettre en évidence les contradictions à la
prémisse originale. Faire une pause pour l'utilisateur avec le récap ci-dessus ; attendre la direction.

### Outcome 4 : La source a été tracée là où c'est important

Émettre ces scans de premier passage comme appels d'outils parallèles dans un message : grep pour chaînes d'erreur exactes ; glob du répertoire
affecté pour implémentations parallèles ; `git log` pour changements récents.

Puis séquentiellement : lire le code environnant ; suivre la chaîne d'appelants ; surveiller les croisements de frontières de langage et de processus
(compilé→scripts, IPC, host→device, flux de configuration).

Lean par type de cas :

- **Exploration :** cartographie I/O (déclencheurs, sorties, dépendances) ; scan de termes fréquents ; filtrage de flux de contrôle
  (branches, boucles, gestion d'erreur, transitions de machine à états).
- **Piloté par symptôme :** évaluation de profondeur — la cause racine est-elle atteignable depuis le contexte local, ou un modèle de zone plus
  large est-il requis ? Faire émerger les escalades ; ne jamais étendre silencieusement le périmètre. Évaluation de fix trivial — off-by-one, null check
  manquant, argument inversé → suggestion de code en une ligne ou diff brouillon dans le rapport ; non trivial → s'arrêter à la zone de cause racine.

L'investigation s'arrête au diagnostic ; l'implémentation est hors périmètre. Mettre à jour Source Code Trace (Origine d'erreur, Trigger,
Condition, Fichiers liés ; modèle de zone quand plus large). Faire une pause pour l'utilisateur avec le récap ci-dessus ; attendre la direction.

### Outcome 5 : Le rapport est finalisé et le hand-off est propre

Mettre à jour `{case_file}` :

- **Hand-off Brief** réécrit en forme finale (3 phrases, lecture de 15 secondes).
- **Final Conclusion** avec confiance : **High** (cause racine Confirmée, repro déterministe), **Medium** (Déduite ;
  incertitude mineure), **Low** (Hypothétique ; manque de données clair).
- **Direction de fix** quand applicable (catégoriser par mécanisme si plusieurs se combinent).
- **Étapes de diagnostic** si l'incertitude demeure.
- **Plan de reproduction** quand applicable, ou un plan de vérification pour les cas d'exploration.
- **Status :** Active / Concluded / Blocked on evidence.

Présenter la conclusion, puis un menu concret de prochaines étapes : fix trivial → `bmad-quick-dev` ; ajustement de scope/plan →
`bmad-correct-course` ; story tracée → `bmad-create-story` ; revue fraîche → `bmad-code-review`. Recommander l'action de
plus haute valeur. Les mitigations et contournements sont générés uniquement sur demande explicite — l'investigation s'arrête au
diagnostic. Exécuter `{workflow.on_complete}` s'il est non vide. Faire une pause pour l'utilisateur avec le récap ci-dessus ; attendre la direction.

## Itérations de suivi

Continuer le travail en ajoutant à `{case_file}` sous un nouveau bloc `## Follow-up: {YYYY-MM-DD}` (`#2`, `#3` lors d'une rentrée le même jour). L'investigation est complète quand :

- La cause racine est Confirmed.
- La cause racine est Hypothesized avec un manque de données clair.
- Le modèle mental est suffisant pour l'objectif déclaré de l'utilisateur (cas d'exploration).
- Le backlog ne contient que des items requérant une évidence indisponible.
- L'utilisateur conclut explicitement.
