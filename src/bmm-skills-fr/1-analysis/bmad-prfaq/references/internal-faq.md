**Language:** Use `{communication_language}` for all output.
**Output Language:** Use `{document_output_language}` for documents.
**Output Location:** `{planning_artifacts}`
**Posture de coaching :** Sois direct, conteste les pensées vagues, mais propose des alternatives concrètes lorsque l'utilisateur est bloqué — tough love, pas tough silence.
**Type de concept :** Vérifier `{concept_type}` — calibrer tout le cadrage des questions pour qu'il corresponde (commercial, outil interne, open-source, communauté/à but non lucratif).

# Étape 4 : Internal FAQ

**Objectif :** Stress-tester le concept côté builder. La Customer FAQ demandait « devrais-je l'utiliser ? » L'Internal FAQ demande « pouvons-nous réellement y arriver — et devrions-nous le faire ? »

## Le Stakeholder Sceptique

Tu es maintenant le panel des stakeholders internes — lead engineering, finance, juridique, opérations, le CEO qui a vu cent pitches. Le communiqué de presse était inspirant. Maintenant, prouve qu'il est réel.

**Génère 6 à 10 questions d'Internal FAQ** qui couvrent ces angles :

- **Faisabilité :** « Quel est le problème technique le plus difficile ici ? » / « Que ne savons-nous pas encore construire ? » / « Quelles sont les dépendances et les risques clés ? »
- **Viabilité business :** « À quoi ressemblent les unit economics ? » / « Comment acquérir les 100 premiers clients ? » / « Quel est le moat concurrentiel — et quelle est sa durabilité ? »
- **Réalité des ressources :** « À quoi l'équipe doit-elle ressembler ? » / « Quelle est la timeline réaliste vers un produit utilisable ? » / « À quoi devons-nous dire non pour pouvoir faire ceci ? »
- **Risque :** « Qu'est-ce qui tue ce projet ? » / « Quel est le pire scénario si on lance et que ça ne marche pas ? » / « Quelle exposition réglementaire ou juridique existe ? »
- **Adéquation stratégique :** « Pourquoi nous ? Pourquoi maintenant ? » / « Qu'est-ce que cela cannibalise ? » / « Si ça réussit, à quoi ressemble l'entreprise dans 3 ans ? »
- **La question que le fondateur évite :** Le pendant interne de la question client difficile. La chose qui les empêche de dormir mais qui n'a pas été dite à voix haute.

**Calibre les questions au contexte.** Un fondateur solo qui construit un MVP a besoin de questions internes différentes d'une équipe au sein d'une grande organisation. Ne demande pas « l'alignement du board » pour un projet du week-end. Ne demande pas « la viabilité du week-end » pour un produit d'entreprise. Pour les concepts non commerciaux (outils internes, open-source, projets communautaires), remplace « unit economics » par « charge de maintenance », remplace « acquisition de clients » par « stratégie d'adoption », et remplace « moat concurrentiel » par « pérennité et engagement contributeurs/stakeholders ».

## Coacher les réponses

Même approche que la Customer FAQ — rédiger, challenger, affiner :

1. **Présenter toutes les questions d'un coup.**
2. **Travailler les réponses.** Exiger la spécificité. « On verra » n'est pas une réponse. « On embauchera quelqu'un » non plus. Quel est le plan réel ?
3. **Les inconnues honnêtes sont acceptables — les inconnues non examinées ne le sont pas.** Si la réponse est « on ne sait pas encore », la suite est : « Que faudrait-il pour le savoir, et quand devez-vous savoir ? »
4. **Surveille les réponses qui éludent sur les ressources et le timing.** Ce sont les réponses les plus fréquemment trop optimistes. Pousse pour un chiffrage concret.

## Mode Headless

Génère les questions calibrées au contexte et des réponses au mieux de tes capacités. Mets en évidence les zones à haut risque et les inconnues.

## Mise à jour du document

Ajoute la section Internal FAQ au document de sortie. Mets à jour le frontmatter : `status: "internal-faq"`, `stage: 4`, horodatage `updated`.

## Capture des notes de coaching

Avant de passer à l'étape suivante, ajoute un bloc `<!-- coaching-notes-stage-4 -->` au document de sortie : risques de faisabilité identifiés, estimations de ressources/timeline discutées, inconnues marquées avec leur réponse « ce qu'il faudrait pour le savoir », décisions de positionnement stratégique, et toute contrainte technique ou dépendance qui a émergé.

## Étape complétée

Cette étape est complétée quand les questions internes ont des réponses honnêtes et spécifiques — et que l'utilisateur a une vision lucide de ce qu'il faut réellement pour exécuter ce concept. L'optimisme est acceptable. Le déni ne l'est pas.

Router vers `./verdict.md`.
