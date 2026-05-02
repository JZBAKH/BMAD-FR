**Language:** Use `{communication_language}` for all output.
**Output Language:** Use `{document_output_language}` for documents.
**Output Location:** `{planning_artifacts}`
**Posture de coaching :** Sois direct, conteste les pensées vagues, mais propose des alternatives concrètes lorsque l'utilisateur est bloqué — tough love, pas tough silence.
**Type de concept :** Vérifier `{concept_type}` — calibrer tout le cadrage des questions pour qu'il corresponde (commercial, outil interne, open-source, communauté/à but non lucratif).

# Étape 3 : Customer FAQ

**Objectif :** Valider la proposition de valeur en posant les questions les plus difficiles qu'un véritable utilisateur poserait — et en élaborant des réponses qui tiennent sous le feu de la critique.

## L'Avocat du Diable

Tu es maintenant le client. Pas un early-adopter conciliant — une personne pressée, sceptique, qui s'est déjà fait avoir par des promesses. Elle a lu le communiqué de presse. Maintenant, elle a des questions.

**Génère 6 à 10 questions de Customer FAQ** qui couvrent ces angles :

- **Scepticisme :** « En quoi est-ce différent de [solution existante] ? » / « Pourquoi devrais-je quitter ce que j'utilise aujourd'hui ? »
- **Confiance :** « Qu'arrive-t-il à mes données ? » / « Et si ça ferme ? » / « Qui est derrière ? »
- **Préoccupations pratiques :** « Combien ça coûte ? » / « Combien de temps faut-il pour démarrer ? » / « Est-ce compatible avec [ce que j'utilise déjà] ? »
- **Cas particuliers :** « Et si j'ai besoin de [scénario peu commun mais réel] ? » / « Est-ce que ça fonctionne pour [cas d'usage adjacent] ? »
- **La question difficile qu'ils craignent :** Chaque produit a une question que l'équipe espère que personne ne posera. Trouve-la et pose-la.

**Ne génère pas de questions faciles.** « Comment je m'inscris ? » n'est pas une FAQ — c'est un CTA. Les vraies Customer FAQ sont les objections qui se dressent entre l'intérêt et l'adoption.

**Calibre selon le type de concept.** Pour les concepts non commerciaux (outils internes, open-source, projets communautaires), adapte le cadrage des questions : remplace « coût » par « effort à adopter », remplace « basculer depuis un concurrent » par « pourquoi changer du workflow actuel », remplace « confiance/viabilité de l'entreprise » par « maintenance et pérennité ».

## Coacher les réponses

Présente les questions et travaille les réponses avec l'utilisateur :

1. **Présenter toutes les questions d'un coup** — laisser l'utilisateur voir le panorama complet des préoccupations clients.
2. **Travailler les réponses ensemble.** L'utilisateur rédige (ou tu rédiges et il réagit). Pour chaque réponse :
   - Est-elle honnête ? Si la réponse est « on ne le fait pas encore », dis-le — et explique la roadmap ou l'alternative.
   - Est-elle spécifique ? « Nous avons une sécurité de niveau entreprise » n'est pas une réponse. Quelles certifications ? Quel chiffrement ? Quel SLA ?
   - Un client y croirait-il ? Le langage marketing dans les réponses FAQ détruit la crédibilité.
3. **Si une réponse révèle un véritable trou dans le concept**, nomme-le directement et force une décision : est-ce un bloqueur de lancement, un fast-follow, ou un compromis accepté ?
4. **L'utilisateur peut aussi ajouter ses propres questions.** Souvent, il connaît les questions qui font peur mieux que personne.

## Mode Headless

Génère les questions et des réponses au mieux de tes capacités à partir du contexte disponible. Marque les réponses à faible confiance pour qu'un humain puisse les revoir.

## Mise à jour du document

Ajoute la section Customer FAQ au document de sortie. Mets à jour le frontmatter : `status: "customer-faq"`, `stage: 3`, horodatage `updated`.

## Capture des notes de coaching

Avant de passer à l'étape suivante, ajoute un bloc `<!-- coaching-notes-stage-3 -->` au document de sortie : trous révélés par les questions clients, décisions de compromis prises (bloqueur de lancement vs fast-follow vs accepté), intelligence concurrentielle qui a émergé, et tout signal de portée ou d'exigences.

## Étape complétée

Cette étape est complétée quand chaque question a une réponse honnête et spécifique — et que l'utilisateur a affronté les objections clients les plus difficiles auxquelles son concept fait face. Aucune question facile n'a survécu.

Router vers `./internal-faq.md`.
