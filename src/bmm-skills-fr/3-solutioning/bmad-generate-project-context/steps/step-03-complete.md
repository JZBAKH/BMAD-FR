# Étape 3 : Finalisation et complétion du contexte

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans intervention de l'utilisateur
- ✅ TOUJOURS traiter cela comme une finalisation collaborative entre pairs techniques
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- 💬 CONCENTREZ-VOUS sur la finalisation d'un contexte de projet épuré et optimisé pour LLM
- 🎯 ASSUREZ-VOUS que toutes les règles critiques sont capturées et exploitables
- ⚠️ ABSOLUMENT AUCUNE ESTIMATION DE TEMPS — la vitesse de développement IA a fondamentalement changé
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE selon le style de communication de votre Agent avec la config `{communication_language}`

## PROTOCOLES D'EXÉCUTION :

- 🎯 Présentez votre analyse avant toute action
- 📝 Révisez et optimisez le contenu pour l'efficacité du contexte LLM
- 📖 Mettez à jour le frontmatter avec le statut de finalisation
- 🚫 PLUS D'ÉTAPES — c'est l'étape finale

## LIMITES DE CONTEXTE :

- Toutes les catégories de règles de l'étape 2 sont complètes
- La stack technologique et les versions sont documentées
- Concentrez-vous sur la révision finale, l'optimisation et la finalisation
- Assurez-vous que le fichier de contexte est prêt pour la consommation par l'agent IA

## VOTRE TÂCHE :

Compléter le fichier de contexte du projet, l'optimiser pour l'efficacité LLM, et fournir des conseils pour son utilisation et sa maintenance.

## SÉQUENCE DE FINALISATION :

### 1. Réviser le fichier de contexte complet

Lisez l'intégralité du fichier de contexte du projet et analysez :

**Analyse de contenu :**

- Longueur totale et lisibilité pour les LLM
- Clarté et spécificité des règles
- Couverture de toutes les zones critiques
- Caractère exploitable de chaque règle

**Analyse de structure :**

- Organisation logique des sections
- Cohérence du formatage
- Absence d'informations redondantes ou évidentes
- Optimisation pour le balayage rapide

### 2. Optimiser pour le contexte LLM

Assurez-vous que le fichier est épuré et efficace :

**Optimisation du contenu :**

- Supprimez toutes les règles redondantes ou les informations évidentes
- Combinez les règles connexes en puces concises
- Utilisez un langage spécifique et exploitable
- Assurez-vous que chaque règle apporte une valeur unique

**Optimisation du formatage :**

- Utilisez un formatage markdown cohérent
- Implémentez une hiérarchie de sections claire
- Assurez la facilité de balayage par un usage stratégique du gras
- Maintenez la lisibilité tout en maximisant la densité d'information

### 3. Structure finale du contenu

Assurez-vous que la structure finale suit ce format optimisé :

```markdown
# Contexte du projet pour les agents IA

_Ce fichier contient les règles et patterns critiques que les agents IA doivent suivre lors de l'implémentation du code dans ce projet. Concentrez-vous sur les détails non évidents que les agents pourraient autrement manquer._

---

## Stack technologique & versions

{{concise_technology_list}}

## Règles d'implémentation critiques

### Règles spécifiques au langage

{{specific_language_rules}}

### Règles spécifiques au framework

{{framework_patterns}}

### Règles de tests

{{testing_requirements}}

### Règles de qualité de code & style

{{style_and_quality_patterns}}

### Règles de workflow de développement

{{workflow_patterns}}

### Règles critiques à ne pas manquer

{{anti_patterns_and_edge_cases}}

---

## Lignes directrices d'utilisation

**Pour les agents IA :**

- Lire ce fichier avant d'implémenter du code
- Suivre TOUTES les règles exactement comme documentées
- En cas de doute, préférer l'option la plus restrictive
- Mettre à jour ce fichier si de nouveaux patterns émergent

**Pour les humains :**

- Garder ce fichier épuré et concentré sur les besoins des agents
- Mettre à jour lorsque la stack technologique change
- Réviser trimestriellement les règles obsolètes
- Supprimer les règles qui deviennent évidentes au fil du temps

Dernière mise à jour : {{date}}
```

### 4. Présenter le résumé de finalisation

Selon le niveau de compétence de l'utilisateur, présentez la finalisation :

**Mode Expert :**
"Contexte du projet complet. Optimisé pour la consommation LLM avec {{rule_count}} règles critiques sur {{section_count}} sections.

Fichier sauvegardé dans : `{output_folder}/project-context.md`

Prêt pour l'intégration de l'agent IA."

**Mode Intermédiaire :**
"Votre contexte de projet est complet et optimisé pour les agents IA !

**Ce que nous avons créé :**

- {{rule_count}} règles d'implémentation critiques
- Stack technologique avec versions exactes
- Patterns et conventions spécifiques au framework
- Lignes directrices de tests et de qualité
- Règles de workflow et d'anti-patterns

**Bénéfices clés :**

- Les agents IA implémenteront de manière cohérente avec vos standards
- Réduction des changements de contexte et des erreurs d'implémentation
- Conseils clairs pour les exigences non évidentes du projet

**Prochaines étapes :**

- Les agents IA devraient lire ce fichier avant d'implémenter
- Mettre à jour à mesure que votre projet évolue
- Réviser périodiquement pour optimisation"

**Mode Débutant :**
"Excellent ! Votre guide de contexte de projet est prêt ! 🎉

**Ce que cela fait :**
Considérez cela comme un guide « code de la route » pour les agents IA travaillant sur votre projet. Cela garantit qu'ils suivent tous les mêmes patterns et évitent les erreurs courantes.

**Ce qui est inclus :**

- Versions exactes des technologies à utiliser
- Règles de codage critiques qu'ils pourraient manquer
- Standards de tests et de qualité
- Patterns de workflow à suivre

**Comment les agents IA l'utilisent :**
Ils lisent ce fichier avant d'écrire du code, garantissant que tout ce qu'ils créent suit parfaitement les standards de votre projet.

Votre contexte de projet est sauvegardé et prêt à aider les agents à implémenter de manière cohérente !"

### 5. Mises à jour finales du fichier

Mettez à jour le fichier de contexte du projet avec les informations de finalisation :

**Mise à jour du frontmatter :**

```yaml
---
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'
sections_completed:
  ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: { { total_rules } }
optimized_for_llm: true
---
```

**Ajouter la section Utilisation :**
Ajoutez les lignes directrices d'utilisation de l'étape 3 pour compléter le document.

### 6. Validation de la finalisation

Vérifications finales avant la finalisation :

**Validation du contenu :**
✅ Toutes les versions critiques de technologies documentées
✅ Les règles spécifiques au langage sont spécifiques et exploitables
✅ Les règles du framework couvrent les conventions du projet
✅ Les règles de tests assurent la cohérence
✅ Les règles de qualité de code maintiennent les standards
✅ Les règles de workflow préviennent les conflits
✅ Les règles d'anti-patterns préviennent les erreurs courantes

**Validation du format :**
✅ Le contenu est épuré et optimisé pour les LLM
✅ La structure est logique et facile à scanner
✅ Aucune information redondante ou évidente
✅ Formatage cohérent partout

### 7. Message de finalisation

Présentez la finalisation finale à l'utilisateur :

"✅ **Génération du contexte de projet terminée !**

Votre fichier de contexte de projet optimisé est prêt à :
`{output_folder}/project-context.md`

**📊 Résumé du contexte :**

- {{rule_count}} règles critiques pour les agents IA
- {{section_count}} sections complètes
- Optimisé pour l'efficacité du contexte LLM
- Prêt pour l'intégration immédiate de l'agent

**🎯 Bénéfices clés :**

- Implémentation cohérente sur tous les agents IA
- Réduction des erreurs courantes et cas limites
- Conseils clairs pour les patterns spécifiques au projet
- Utilisation minimale du contexte LLM

**📋 Prochaines étapes :**

1. Les agents IA liront automatiquement ce fichier lors de l'implémentation
2. Mettez à jour ce fichier lorsque votre stack technologique ou vos patterns évoluent
3. Révisez trimestriellement pour optimiser et supprimer les règles obsolètes

Votre contexte de projet aidera à garantir une implémentation cohérente et de haute qualité dans tout le travail de développement. Excellent travail pour avoir capturé les exigences d'implémentation critiques de votre projet !"

## INDICATEURS DE RÉUSSITE :

✅ Fichier de contexte de projet complet avec toutes les règles critiques
✅ Contenu optimisé pour l'efficacité du contexte LLM
✅ Toutes les versions de technologies et patterns documentés
✅ La structure du fichier est logique et facile à scanner
✅ Lignes directrices d'utilisation incluses pour les agents et les humains
✅ Frontmatter correctement mis à jour avec le statut de finalisation
✅ Utilisateur muni de prochaines étapes claires et de bénéfices

## MODES D'ÉCHEC :

❌ Le contenu final est trop verbeux pour la consommation LLM
❌ Règles ou patterns d'implémentation critiques manquants
❌ Ne pas optimiser le contenu pour la lisibilité par les agents
❌ Ne pas fournir de lignes directrices d'utilisation claires
❌ Frontmatter pas correctement mis à jour
❌ Ne pas valider la finalisation du fichier avant de terminer

## WORKFLOW TERMINÉ :

C'est l'étape finale du workflow Generate Project Context. L'utilisateur dispose désormais d'un fichier de contexte de projet complet et optimisé qui garantira une implémentation cohérente et de haute qualité sur tous les agents IA travaillant sur le projet.

Le fichier de contexte du projet sert de « code de la route » critique dont les agents ont besoin pour implémenter le code de manière cohérente avec les standards et patterns du projet.

## À la finalisation

Exécutez : `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow.on_complete`

Si le `workflow.on_complete` résolu est non vide, suivez-le comme instruction terminale finale avant de quitter.
