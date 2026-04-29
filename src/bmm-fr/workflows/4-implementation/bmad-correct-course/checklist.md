# Liste de Contrôle pour la Navigation du Changement (Correct Course)

<critical>Cette liste de contrôle est exécutée dans le cadre de : ./workflow.md</critical>
<critical>Parcourez chaque section systématiquement avec l'utilisateur, en enregistrant les constatations et les impacts</critical>

<checklist>

<section n="1" title="Comprendre le Déclencheur et le Contexte">

<check-item id="1.1">
<prompt>Identifier la story déclencheuse qui a révélé ce problème</prompt>
<action>Documenter l'ID de la story et une brève description</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="1.2">
<prompt>Définir précisément le problème central</prompt>
<action>Catégoriser le type de problème :</action>
  - Limitation technique découverte lors de l'implémentation
  - Nouvelle exigence émergeant des parties prenantes
  - Incompréhension des exigences d'origine
  - Pivot stratégique ou changement de marché
  - Échec d'une approche nécessitant une solution différente
<action>Rédiger un énoncé clair du problème</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="1.3">
<prompt>Évaluer l'impact initial et recueillir les preuves de soutien</prompt>
<action>Collecter des exemples concrets, des messages d'erreur, des retours des parties prenantes ou des contraintes techniques</action>
<action>Documenter les preuves pour référence ultérieure</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<halt-condition>
<action if="le déclencheur n'est pas clair">ARRÊT : "Impossible de continuer sans comprendre ce qui a causé le besoin de changement"</action>
<action if="aucune preuve fournie">ARRÊT : "Besoin de preuves concrètes ou d'exemples du problème avant d'analyser l'impact"</action>
</halt-condition>

</section>

<section n="2" title="Évaluation de l'Impact sur les Epics">

<check-item id="2.1">
<prompt>Évaluer l'epic actuelle contenant la story déclencheuse</prompt>
<action>Cette epic peut-elle encore être achevée comme prévu initialement ?</action>
<action>Si non, quelles modifications sont nécessaires ?</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="2.2">
<prompt>Déterminer les changements requis au niveau des epics</prompt>
<action>Vérifier chaque scénario :</action>
  - Modifier le périmètre ou les critères d'acceptation de l'epic existante
  - Ajouter une nouvelle epic pour traiter le problème
  - Supprimer ou reporter une epic qui n'est plus viable
  - Redéfinir complètement l'epic sur la base de la nouvelle compréhension
<action>Documenter les changements spécifiques aux epics nécessaires</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="2.3">
<prompt>Revoir toutes les epics planifiées restantes pour les changements requis</prompt>
<action>Vérifier l'impact sur chaque epic future</action>
<action>Identifier les dépendances qui pourraient être affectées</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="2.4">
<prompt>Vérifier si le problème invalide des epics futures ou en nécessite de nouvelles</prompt>
<action>Ce changement rend-il certaines epics planifiées obsolètes ?</action>
<action>De nouvelles epics sont-elles nécessaires pour combler les lacunes créées par ce changement ?</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="2.5">
<prompt>Considérer si l'ordre ou la priorité des epics doit changer</prompt>
<action>Les epics doivent-elles être reséquencées en raison de ce problème ?</action>
<action>Les priorités nécessitent-elles un ajustement ?</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

</section>

<section n="3" title="Analyse des Conflits d'Artéfacts et de l'Impact">

<check-item id="3.1">
<prompt>Vérifier les conflits avec le PRD</prompt>
<action>Le problème entre-t-il en conflit avec les buts ou objectifs centraux du PRD ?</action>
<action>Les exigences nécessitent-elles une modification, un ajout ou une suppression ?</action>
<action>Le MVP défini est-il toujours atteignable ou le périmètre nécessite-t-il un ajustement ?</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="3.2">
<prompt>Revoir le document d'Architecture pour les conflits</prompt>
<action>Vérifier l'impact dans chaque domaine :</action>
  - Composants du système et leurs interactions
  - Modèles d'architecture et décisions de conception
  - Choix de la stack technologique
  - Modèles de données et schémas
  - Conceptions d'API et contrats
  - Points d'intégration
<action>Documenter les sections spécifiques de l'architecture nécessitant des mises à jour</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="3.3">
<prompt>Examiner les spécifications UI/UX pour les conflits</prompt>
<action>Vérifier l'impact sur :</action>
  - Composants de l'interface utilisateur
  - Flux et parcours utilisateurs
  - Wireframes ou maquettes
  - Modèles d'interaction
  - Considérations d'accessibilité
<action>Noter les sections spécifiques de l'UI/UX nécessitant une révision</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="3.4">
<prompt>Considérer l'impact sur les autres artéfacts</prompt>
<action>Revoir les artéfacts additionnels pour l'impact :</action>
  - Scripts de déploiement
  - Infrastructure as Code (IaC)
  - Configuration du monitoring et de l'observabilité
  - Stratégies de test
  - Documentation
  - Pipelines CI/CD
<action>Documenter tout artéfact secondaire nécessitant des mises à jour</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

</section>

<section n="4" title="Évaluation de la Voie à Suivre">

<check-item id="4.1">
<prompt>Évaluer l'Option 1 : Ajustement Direct</prompt>
<action>Le problème peut-il être résolu en modifiant les stories existantes ?</action>
<action>De nouvelles stories peuvent-elles être ajoutées au sein de la structure d'epic actuelle ?</action>
<action>Cette approche maintiendrait-elle le calendrier et le périmètre du projet ?</action>
<action>Estimation de l'effort : [Haut/Moyen/Bas]</action>
<action>Niveau de risque : [Haut/Moyen/Bas]</action>
<status>[ ] Viable / [ ] Non viable</status>
</check-item>

<check-item id="4.2">
<prompt>Évaluer l'Option 2 : Rollback Potentiel</prompt>
<action>Le fait de revenir sur des stories récemment terminées simplifierait-il la résolution de ce problème ?</action>
<action>Quelles stories nécessiteraient un rollback ?</action>
<action>L'effort de rollback est-il justifié par la simplification obtenue ?</action>
<action>Estimation de l'effort : [Haut/Moyen/Bas]</action>
<action>Niveau de risque : [Haut/Moyen/Bas]</action>
<status>[ ] Viable / [ ] Non viable</status>
</check-item>

<check-item id="4.3">
<prompt>Évaluer l'Option 3 : Revue du MVP du PRD</prompt>
<action>Le MVP original du PRD est-il toujours atteignable avec ce problème ?</action>
<action>Le périmètre du MVP doit-il être réduit ou redéfini ?</action>
<action>Les objectifs centraux nécessitent-ils une modification sur la base des nouvelles contraintes ?</action>
<action>Qu'est-ce qui serait reporté après le MVP si le périmètre est réduit ?</action>
<action>Estimation de l'effort : [Haut/Moyen/Bas]</action>
<action>Niveau de risque : [Haut/Moyen/Bas]</action>
<status>[ ] Viable / [ ] Non viable</status>
</check-item>

<check-item id="4.4">
<prompt>Sélectionner la voie à suivre recommandée</prompt>
<action>Sur la base de l'analyse de toutes les options, choisir le meilleur chemin</action>
<action>Fournir une justification claire en considérant :</action>
  - L'effort d'implémentation et l'impact sur le calendrier
  - Le risque technique et la complexité
  - L'impact sur le moral et la dynamique de l'équipe
  - La durabilité et la maintenabilité à long terme
  - Les attentes des parties prenantes et la valeur métier
<action>Approche sélectionnée : [Option 1 / Option 2 / Option 3 / Hybride]</action>
<action>Justification : [Documenter le raisonnement]</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

</section>

<section n="5" title="Composants de la Proposition de Changement de Sprint">

<check-item id="5.1">
<prompt>Créer le résumé du problème identifié</prompt>
<action>Rédiger un énoncé clair et concis du problème</action>
<action>Inclure le contexte sur la découverte et l'impact</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="5.2">
<prompt>Documenter l'impact sur les epics et les besoins d'ajustement d'artéfacts</prompt>
<action>Résumer les constatations de l'Évaluation de l'Impact sur les Epics (Section 2)</action>
<action>Résumer les constatations de l'Analyse des Conflits d'Artéfacts (Section 3)</action>
<action>Être spécifique sur les changements nécessaires et pourquoi</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="5.3">
<prompt>Présenter la voie à suivre recommandée avec sa justification</prompt>
<action>Inclure l'approche sélectionnée dans la Section 4</action>
<action>Fournir la justification complète de la recommandation</action>
<action>Traiter les compromis et les alternatives envisagées</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="5.4">
<prompt>Définir l'impact sur le MVP du PRD et le plan d'action de haut niveau</prompt>
<action>Indiquer clairement si le MVP est affecté</action>
<action>Ébaucher les actions majeures nécessaires pour l'implémentation</action>
<action>Identifier les dépendances et le séquençage</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="5.5">
<prompt>Établir le plan de transfert (handoff) entre agents</prompt>
<action>Identifier quels rôles/agents exécuteront les changements :</action>
  - Équipe de développement (pour l'implémentation)
  - Product Owner / Scrum Master (pour les changements de backlog)
  - Product Manager / Architecte (pour les changements stratégiques)
<action>Définir les responsabilités pour chaque rôle</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

</section>

<section n="6" title="Revue Finale et Transfert (Handoff)">

<check-item id="6.1">
<prompt>Revoir la complétude de la liste de contrôle</prompt>
<action>Vérifier que toutes les sections applicables ont été traitées</action>
<action>Confirmer que tous les éléments [Action requise] ont été documentés</action>
<action>S'assurer que l'analyse est complète et exploitable</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="6.2">
<prompt>Vérifier l'exactitude de la Proposition de Changement de Sprint</prompt>
<action>Revoir la proposition complète pour la cohérence et la clarté</action>
<action>S'assurer que toutes les recommandations sont bien étayées par l'analyse</action>
<action>Vérifier que la proposition est exploitable et spécifique</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="6.3">
<prompt>Obtenir l'approbation explicite de l'utilisateur</prompt>
<action>Présenter la proposition complète à l'utilisateur</action>
<action>Obtenir une approbation claire par oui/non pour continuer</action>
<action>Documenter l'approbation et les éventuelles conditions</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="6.4">
<prompt>Mettre à jour sprint-status.yaml pour refléter les changements d'epics approuvés</prompt>
<action>Si des epics ont été ajoutées : Ajouter de nouvelles entrées d'epics avec le statut 'backlog'</action>
<action>Si des epics ont été supprimées : Supprimer les entrées correspondantes</action>
<action>Si des epics ont été renumérotées : Mettre à jour les IDs d'epics et les références de stories</action>
<action>Si des stories ont été ajoutées/supprimées : Mettre à jour les entrées de stories au sein des epics affectées</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<check-item id="6.5">
<prompt>Confirmer les prochaines étapes et le plan de transfert</prompt>
<action>Revoir les responsabilités de transfert avec l'utilisateur</action>
<action>S'assurer que toutes les parties prenantes comprennent leurs rôles</action>
<action>Confirmer le calendrier et les critères de succès</action>
<status>[ ] Fait / [ ] N/A / [ ] Action requise</status>
</check-item>

<halt-condition>
<action if="une section critique ne peut pas être complétée">ARRÊT : "Impossible de passer à la proposition sans une analyse d'impact complète"</action>
<action if="approbation de l'utilisateur non obtenue">ARRÊT : "Doit avoir une approbation explicite avant d'implémenter les changements"</action>
<action if="les responsabilités de transfert ne sont pas claires">ARRÊT : "Doit définir clairement qui exécutera les changements proposés"</action>
</halt-condition>

</section>

</checklist>

<execution-notes>
<note>Cette liste de contrôle est destinée aux changements SIGNIFICATIFS affectant la direction du projet</note>
<note>Travailler de manière interactive avec l'utilisateur - il prend les décisions finales</note>
<note>Être factuel, ne pas chercher de coupable lors de l'analyse des problèmes</note>
<note>Gérer les changements professionnellement comme des opportunités d'améliorer le projet</note>
<note>Maintenir le contexte de la conversation tout au long - c'est un travail collaboratif</note>
</execution-notes>
