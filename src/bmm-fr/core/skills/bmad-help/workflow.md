# Tâche : BMAD Help

## RÈGLES DE ROUTAGE (ROUTING RULES)

- **Un `phase` vide = à tout moment** — Les outils universels fonctionnent quel que soit l'état du workflow
- **Les phases numérotées indiquent une séquence** — Les phases comme `1-discover` → `2-define` → `3-build` → `4-ship` s'enchaînent dans l'ordre (la nomenclature varie selon le module)
- **Phase sans étapes requises** - Si une phase entière ne comporte aucun élément requis ('required: true'), la phase entière est optionnelle. Si elle précède séquentiellement une autre phase, elle peut être recommandée, mais soyez toujours clair avec l'utilisateur sur le véritable prochain élément requis.
- **Rester dans le module** — Guidez à travers le workflow du module actif en fonction de l'ordonnancement des phases et des séquences
- **Les descriptions contiennent du routage** — Lisez pour trouver des chemins alternatifs (ex. "retour à l'étape précédente si des corrections sont nécessaires")
- **`required=true` bloque la progression** — Les workflows requis doivent être terminés avant de passer aux phases ultérieures
- **Les artefacts révèlent l'achèvement** — Cherchez dans les chemins de sortie résolus des motifs (patterns) `outputs`, et faites correspondre de manière floue (fuzzy-match) les fichiers trouvés aux lignes de workflow

## RÈGLES D'AFFICHAGE (DISPLAY RULES)

### Workflows Basés sur des Commandes
Lorsque le champ `command` a une valeur :
- Affichez la commande comme un nom de compétence entre backticks (ex. `bmad-bmm-create-prd`)

### Workflows Renvoyant à des Compétences
Lorsque `workflow-file` commence par `skill:` :
- La valeur est une référence de compétence (ex. `skill:bmad-quick-dev-new-preview`), et NON un chemin de fichier
- N'essayez PAS de le résoudre ou de le charger comme un chemin de fichier
- Affichez-le en utilisant la valeur de la colonne `command` comme nom de compétence entre backticks (identique aux workflows basés sur des commandes)

### Workflows Basés sur des Agents
Lorsque le champ `command` est vide :
- L'utilisateur charge d'abord l'Agent en invoquant la compétence de l'Agent (ex. `bmad-pm`)
- Puis l'invoque en référençant le champ `code` ou en décrivant le champ `name`
- NE montrez PAS de commande (slash command) — affichez plutôt la valeur du code et l'instruction de chargement de l'Agent

Exemple de présentation pour une commande vide :
```
Expliquer le Concept (EC)
Charger : la compétence Agent tech-writer, puis demander d'"EC sur [sujet]"
Agent : Tech Writer
Description : Crée des explications techniques claires avec des exemples...
```

## DÉTECTION DE MODULE (MODULE DETECTION)

- **Colonne `module` vide** → outils universels (fonctionnent dans tous les modules)
- **`module` nommé** → workflows spécifiques au module

Détectez le module actif à partir du contexte de la conversation, des workflows récents ou des mots-clés de la requête de l'utilisateur. En cas d'ambiguïté, demandez à l'utilisateur.

## ANALYSE DE L'ENTRÉE (INPUT ANALYSIS)

Déterminez ce qui vient d'être achevé :
- Achèvement explicite déclaré par l'utilisateur
- Workflow achevé dans la conversation en cours
- Artefacts trouvés correspondant aux motifs (patterns) `outputs`
- Si un fichier `index.md` existe, lisez-le pour obtenir un contexte supplémentaire
- Si cela reste flou, demandez : "Quel workflow avez-vous terminé le plus récemment ?"

## EXÉCUTION

1. **Charger le catalogue** — Chargez `{project-root}/_bmad/_config/bmad-help.csv`

2. **Résoudre les emplacements de sortie et la configuration** — Analysez chaque dossier sous `{project-root}/_bmad/` (sauf `_config`) pour trouver un `config.yaml`. Pour chaque ligne de workflow, résolvez ses variables `output-location` en fonction de la configuration de ce module afin que les chemins d'artefacts puissent être recherchés. Extrayez également `{communication_language}` et `project_knowledge` de la configuration de chaque module analysé.

3. **S'ancrer dans la connaissance du projet** — Si `project_knowledge` aboutit à un chemin existant, lisez les fichiers de documentation disponibles (documents d'architecture, aperçu du projet, références de la pile technologique) pour établir le contexte de base. Utilisez les faits découverts sur le projet pour rédiger toute sortie spécifique au projet. Ne fabriquez jamais de détails spécifiques au projet — si la documentation n'est pas disponible, précisez-le.

4. **Détecter le module actif** — Utilisez la DÉTECTION DE MODULE ci-dessus

5. **Analyser l'entrée** — La tâche peut fournir un nom/code de workflow, une phrase conversationnelle, ou rien. Déduisez ce qui vient d'être accompli en utilisant L'ANALYSE DE L'ENTRÉE ci-dessus.

6. **Présenter les recommandations** — Montrez les prochaines étapes basées sur :
   - Les workflows achevés détectés
   - L'ordonnancement des phases/séquences (RÈGLES DE ROUTAGE)
   - La présence d'artefacts

   **Éléments optionnels en premier** — Listez les workflows optionnels jusqu'à ce qu'une étape requise soit atteinte
   **Éléments requis ensuite** — Listez le prochain workflow requis

   Pour chaque élément, appliquez les RÈGLES D'AFFICHAGE ci-dessus et incluez :
   - Le **nom** du workflow
   - La **Commande** (Command) OU le **Code + Instruction de chargement de l'Agent** (selon les RÈGLES D'AFFICHAGE)
   - Le titre de l'**Agent** et le nom d'affichage issus du CSV (ex. "🎨 Alex (Designer)")
   - Une brève **description**

7. **Orientations supplémentaires à transmettre :**
   - Présentez toute sortie dans la langue `{communication_language}`
   - Exécutez chaque workflow dans une **nouvelle fenêtre de contexte**
   - Pour les **workflows de validation** : recommandez l'utilisation d'un autre LLM de haute qualité si disponible
   - Pour les demandes conversationnelles : adaptez-vous au ton de l'utilisateur tout en présentant clairement les informations

8. Retournez au processus appelant après avoir présenté les recommandations.
