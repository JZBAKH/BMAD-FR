**Language:** Use `{communication_language}` for all output.
**Output Language:** Use `{document_output_language}` for documents.
**Output Location:** `{planning_artifacts}`
**Posture de coaching :** Sois direct, conteste les pensées vagues, mais propose des alternatives concrètes lorsque l'utilisateur est bloqué — tough love, pas tough silence.

# Étape 2 : Le Communiqué de Presse

**Objectif :** Produire un communiqué de presse qui ferait stopper le scroll d'un véritable client et capter son attention. Rédiger de façon itérative, en challengeant chaque phrase sur la spécificité, la pertinence client et l'honnêteté.

**Adaptation au type de concept :** Vérifier `{concept_type}` (produit commercial, outil interne, open-source, communauté/à but non lucratif). Pour les concepts non commerciaux, adapter le cadrage du communiqué de presse : « annoncer l'initiative » plutôt que « annoncer le produit », « Comment participer » plutôt que « Pour commencer », « Citation membre de la communauté » plutôt que « Citation client ». La structure reste — la langue s'adapte au public.

## La Forge

Le communiqué de presse est le cœur de Working Backwards. Il a une structure spécifique, et chaque partie gagne sa place en imposant un type différent de clarté :

| Section                    | Ce qu'elle impose                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------- |
| **Headline**               | Peux-tu dire ce qu'est ceci en une phrase qu'un client comprendrait ?                 |
| **Sous-titre**             | Qui en bénéficie et qu'est-ce qui change pour eux ?                                   |
| **Paragraphe d'ouverture** | Qu'annonces-tu, à qui s'adresse-t-il, et pourquoi devraient-ils s'en soucier ?        |
| **Paragraphe problème**    | Peux-tu faire ressentir au lecteur la douleur du client sans mentionner ta solution ? |
| **Paragraphe solution**    | Qu'est-ce qui change pour le client ? (Pas : ce que tu as construit.)                 |
| **Citation du leader**     | Quelle est la vision au-delà de la liste des fonctionnalités ?                        |
| **Comment ça fonctionne**  | Peux-tu expliquer l'expérience du point de vue du client ?                            |
| **Citation client**        | Une vraie personne dirait-elle cela ? Est-ce que ça sonne humain ?                    |
| **Pour commencer**         | Le chemin vers la valeur est-il clair et concret ?                                    |

## Approche de coaching

La dynamique de coaching : rédige toi-même chaque section en premier, puis modélise la pensée critique en challengeant ton propre brouillon à voix haute avant d'inviter l'utilisateur à l'affûter. Pousse d'un cran plus en profondeur à chaque réponse — si l'utilisateur te donne une généralité, exige le spécifique. Le cycle est : rédiger → s'auto-challenger → inviter → approfondir.

Quand l'utilisateur est bloqué, propose 2-3 alternatives concrètes auxquelles réagir plutôt que de répéter la question avec plus d'insistance.

## Critères de qualité

Voici les standards à imposer au communiqué de presse. Ne les énumère pas à l'utilisateur — incarne-les dans tes challenges :

- **Pas de jargon** — Si un client n'utiliserait pas le mot, le communiqué de presse non plus
- **Pas de mots flous** — « significativement », « révolutionnaire », « best-in-class » sont bannis. Remplace-les par du spécifique.
- **Le mom test** — Pourrais-tu expliquer ceci à quelqu'un en dehors de ton industrie et lui faire comprendre pourquoi c'est important ?
- **Le test du « so what ? »** — Chaque phrase devrait survivre à un « so what ? ». Si elle ne le peut pas, coupe ou affûte.
- **Cadrage honnête** — Le communiqué de presse doit être convaincant sans être malhonnête. Si tu sur-vends, la Customer FAQ l'exposera.

## Mode Headless

Si exécuté en mode headless : rédige le communiqué de presse complet à partir des entrées disponibles, sans interaction. Applique les critères de qualité en interne — challenge-toi toi-même et produis la version la plus solide possible. Écris directement dans le document de sortie.

## Mise à jour du document

Après que chaque section a été affinée, ajoute-la au document de sortie à `{planning_artifacts}/prfaq-{project_name}.md`. Mets à jour le frontmatter : `status: "press-release"`, `stage: 2`, et l'horodatage `updated`.

## Capture des notes de coaching

Avant de passer à l'étape suivante, ajoute un bloc `<!-- coaching-notes-stage-2 -->` au document de sortie pour capturer les observations contextuelles clés de cette étape : cadrages de headline rejetés, positionnement concurrentiel discuté, différenciateurs explorés mais non retenus, et tout détail hors-périmètre mentionné par l'utilisateur (contraintes techniques, calendrier, contexte d'équipe). Ces notes survivent à la compaction du contexte et alimentent le distillat de l'Étape 5.

## Étape complétée

Cette étape est complétée quand le communiqué de presse complet se lit comme une annonce cohérente et convaincante, qu'un véritable client jugerait pertinente. L'utilisateur devrait être fier de ce qu'il a écrit — et confiant que chaque phrase a gagné sa place.

Router vers `./customer-faq.md`.
