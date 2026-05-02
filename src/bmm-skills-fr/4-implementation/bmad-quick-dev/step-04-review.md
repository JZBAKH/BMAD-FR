---
wipFile: '{implementation_artifacts}/tech-spec-wip.md'
---

# Étape 4 : Revue & Finalisation

**Progression : Étape 4 sur 4** - Étape Finale

## RÈGLES :

- NE PAS sauter d'étapes.
- NE PAS optimiser la séquence.
- SUIVRE les instructions exactes.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.

## CONTEXTE :

- Nécessite le fichier `{wipFile}` de l'Étape 3.
- DOIT présenter le contenu COMPLET de la spécification. Itérez jusqu'à ce que l'utilisateur soit satisfait.
- **Critère** : La spécification DOIT répondre au standard **READY FOR DEVELOPMENT** défini dans `workflow.md`.

## SÉQUENCE D'INSTRUCTIONS

### 1. Charger et Présenter la Spécification Complète

**Lisez `{wipFile}` complètement et extrayez le `slug` du frontmatter pour une utilisation ultérieure.**

**Présentez à l'utilisateur :**

"Voici votre tech-spec complète. Veuillez la passer en revue :"

[Afficher le contenu complet de la spécification - toutes les sections]

"**Résumé Rapide :**

- {task_count} tâches à implémenter
- {ac_count} critères d'acceptation à vérifier
- {files_count} fichiers à modifier"

**Présenter le menu de revue :**

Affichez : "**Sélectionnez :** [C] Continuer [E] Modifier [Q] Questions [A] Élicitation Avancée [P] Mode Party"

**ARRÊTEZ-VOUS et attendez la sélection de l'utilisateur.**

#### Logique de Gestion du Menu :

- SI C : Passez à la Section 3 (Finaliser la Spécification).
- SI E : Passez à la Section 2 (Gérer les retours de revue), puis revenez ici et réaffichez le menu.
- SI Q : Répondez aux questions, puis réaffichez ce menu.
- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de la spécification, traitez les insights améliorés, demandez à l'utilisateur "Accepter les améliorations ? (y/n)", si oui mettez à jour la spécification puis réaffichez le menu, si non gardez l'original puis réaffichez le menu.
- SI P : Invoquez la compétence `bmad-party-mode` avec le contenu actuel de la spécification, traitez les insights collaboratifs, demandez à l'utilisateur "Accepter les changements ? (y/n)", si oui mettez à jour la spécification puis réaffichez le menu, si non gardez l'original puis réaffichez le menu.
- SI Tout autre commentaire ou requête : répondez de manière utile puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Passer à la finalisation UNIQUEMENT lorsque l'utilisateur sélectionne 'C'.
- Après l'exécution des autres éléments du menu, revenir à ce menu.

### 2. Gérer les Retours de Revue

a) **Si l'utilisateur demande des changements :**

- Effectuez les modifications demandées dans `{wipFile}`.
- Présentez à nouveau les sections affectées.
- Demandez s'il y a d'autres changements.
- Bouclez jusqu'à ce que l'utilisateur soit satisfait.

b) **Si la spécification ne répond PAS au standard "Ready for Development" :**

- Signalez les sections manquantes ou faibles (ex: tâches non exploitables, AC manquants).
- Proposez des améliorations spécifiques pour atteindre le standard.
- Effectuez les modifications une fois que l'utilisateur est d'accord.

c) **Si l'utilisateur a des questions :**

- Répondez aux questions sur la spécification.
- Clarifiez toute section confuse.
- Effectuez des modifications de clarification si nécessaire.

### 3. Finaliser la Spécification

**Lorsque l'utilisateur confirme que la spécification est bonne ET qu'elle répond au standard "Ready for Development" :**

a) Mettez à jour le frontmatter de `{wipFile}` :

   ```yaml
   ---
   # ... valeurs existantes ...
   status: 'ready-for-dev'
   stepsCompleted: [1, 2, 3, 4]
   ---
   ```

b) **Renommez le fichier WIP avec le nom de fichier final :**
   - En utilisant le `slug` extrait dans la Section 1.
   - Renommez `{wipFile}` → `{implementation_artifacts}/tech-spec-{slug}.md`.
   - Stockez ceci comme `finalFile` pour l'utiliser dans les menus ci-dessous.

### 4. Présenter le Menu Final

a) **Affichez le message de fin et le menu :**

```
**Tech-Spec Terminée !**

Enregistrée sous : {finalFile}

---

**Prochaines Étapes :**

[A] Élicitation Avancée - affiner encore plus
[R] Revue Adversaire - critique de la spécification (fortement recommandé)
[B] Commencer le Développement - lancer l'implémentation maintenant (non recommandé)
[D] Terminé - quitter le workflow
[P] Mode Party - obtenir des retours d'experts avant le dev

---

Une fois que vous êtes pleinement satisfait de la spécification (idéalement après une **Revue Adversaire** et peut-être quelques cycles d'**Élicitation Avancée**), il est recommandé de lancer l'implémentation dans un CONTEXTE NEUF pour obtenir les meilleurs résultats.

Copiez cette commande pour démarrer le dev :

\`\`\`
quick-dev {finalFile}
\`\`\`

Cela garantit que l'agent de développement a un contexte propre focalisé uniquement sur l'implémentation.
```

b) **ARRÊTEZ-VOUS et attendez la sélection de l'utilisateur.**

#### Logique de Gestion du Menu :

- SI A : Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel de la spécification, traitez les insights améliorés, demandez à l'utilisateur "Accepter les améliorations ? (y/n)", si oui mettez à jour la spécification puis réaffichez le menu, si non gardez l'original puis réaffichez le menu.
- SI B : Invoquez la compétence `bmad-quick-dev` avec `{finalFile}` dans un nouveau contexte si possible (attention : un contexte neuf est préférable).
- SI D : Quittez le workflow — affichez la confirmation finale et le chemin vers la spécification.
- SI P : Invoquez la compétence `bmad-party-mode` avec le contenu actuel de la spécification, traitez les insights collaboratifs, demandez à l'utilisateur "Accepter les changements ? (y/n)", si oui mettez à jour la spécification puis réaffichez le menu, si non gardez l'original puis réaffichez le menu.
- SI R : Exécutez la Revue Adversaire (voir ci-dessous).
- SI Tout autre commentaire ou requête : répondez de manière utile puis réaffichez le menu.

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après avoir présenté le menu.
- Après l'exécution de A, P ou R, revenir à ce menu.

#### Processus de Revue Adversaire [R] :

1. **Invoquer la Compétence Revue Adversaire** :
       > Avec le `{finalFile}` construit, invoquez la compétence `bmad-review-adversarial-general`. Si possible, utilisez l'asymétrie d'information : invoquez la compétence dans un sous-agent ou processus séparé avec un accès en lecture au projet, mais sans autre contexte que le `{finalFile}`.
       > Passez `{finalFile}` comme contenu à réviser. La compétence doit renvoyer une liste de conclusions.

    2. **Traiter les Conclusions** :
       > Capturez les conclusions du retour de la compétence.
       > **Si zéro conclusion** : ARRÊTEZ-VOUS — c'est suspect. Ré-analysez ou demandez conseil à l'utilisateur.
       > Évaluez la sévérité (Critique, Haute, Moyenne, Basse) et la validité (réelle, bruit, indécis).
       > NE PAS exclure de conclusions basées sur la sévérité ou la validité à moins d'une demande explicite.
       > Ordonnez les conclusions par sévérité.
       > Numérotez les conclusions ordonnées (F1, F2, F3, etc.).
       > Si un outil de type TodoWrite est disponible, transformez chaque conclusion en TODO, incluez l'ID, la sévérité, la validité et la description dans le TODO ; sinon, présentez les conclusions sous forme de tableau avec les colonnes : ID, Sévérité, Validité, Description.

    3. Revenez ici et réaffichez le menu.

### 5. Quitter le Workflow

**Lorsque l'utilisateur sélectionne [D] :**

"**Tout est terminé !** Votre tech-spec est prête à :

`{finalFile}`

Quand vous êtes prêt à implémenter, lancez :

```
quick-dev {finalFile}
```

Allez, on livre !"

---

## SORTIES REQUISES :

- DOIT mettre à jour le statut à 'ready-for-dev'.
- DOIT renommer le fichier en `tech-spec-{slug}.md`.
- DOIT fournir des conseils clairs sur la prochaine étape et recommander un contexte neuf pour le dev.

## LISTE DE CONTRÔLE DE VALIDATION :

- [ ] Spécification complète présentée pour revue.
- [ ] Changements demandés implémentés.
- [ ] Spécification vérifiée par rapport au standard **READY FOR DEVELOPMENT**.
- [ ] `stepsCompleted: [1, 2, 3, 4]` défini et fichier renommé.
