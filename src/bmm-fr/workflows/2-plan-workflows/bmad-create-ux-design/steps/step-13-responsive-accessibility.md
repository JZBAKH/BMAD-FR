# Étape 13 : Design Réactif & Accessibilité

## RÈGLES d'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

- 🛑 NE JAMAIS générer de contenu sans l'entrée de l'utilisateur.

- 📖 CRITIQUE : TOUJOURS lire l'intégralité du fichier d'étape avant de prendre toute mesure - une compréhension partielle conduit à des décisions incomplètes.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que tout le fichier est lu et compris avant de procéder.
- ✅ Toujours traiter cela comme une découverte collaborative entre le facilitateur UX et la partie prenante.
- 📋 VOUS ÊTES UN FACILITATEUR UX, pas un générateur de contenu.
- 💬 CONCENTREZ-VOUS sur la stratégie de design réactif (responsive) et la conformité en matière d'accessibilité.
- 🎯 Définition de stratégie COLLABORATIVE, pas un design basé sur des suppositions.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'Agent avec la configuration `{communication_language}`.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu des artefacts et des documents dans la langue `{document_output_language}`.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Montrez votre analyse avant de prendre toute mesure.
- ⚠️ Présentez le menu A/P/C après avoir généré le contenu réactif/accessibilité.
- 💾 Enregistrez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer).
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant cette étape à la fin de la liste `stepsCompleted`.
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'est pas sélectionné.

## MENUS DE COLLABORATION (A/P/C) :

Cette étape va générer du contenu et présenter des choix :

- **A (Élicitation Avancée)** : Utiliser les protocoles de découverte pour développer des insights réactifs/accessibilité plus profonds.
- **P (Mode Party)** : Apporter plusieurs perspectives pour définir la stratégie de réactivité/accessibilité.
- **C (Continuer)** : Enregistrer le contenu dans le document et passer à l'étape finale.

## INTÉGRATION DES PROTOCOLES :

- Quand 'A' est sélectionné : Invoquez la compétence `bmad-advanced-elicitation`.
- Quand 'P' est sélectionné : Invoquez la compétence `bmad-party-mode`.
- Les PROTOCOLES reviennent toujours au menu A/P/C de cette étape.
- L'utilisateur accepte/rejette les changements du protocole avant de continuer.

## LIMITES DU CONTEXTE :

- Le document actuel et le frontmatter des étapes précédentes sont disponibles.
- Les exigences de plateforme de l'étape 3 alimentent le design réactif.
- La direction de design de l'étape 9 influence les choix de mise en page réactive.
- Focus sur l'adaptation multi-appareils et la conformité en matière d'accessibilité.

## VOTRE TÂCHE :

Définir la stratégie de design réactif et les exigences d'accessibilité pour le produit.

## SÉQUENCE RÉACTIF & ACCESSIBILITÉ :

### 1. Définir la stratégie réactive (Responsive)

Établir comment le design s'adapte à travers les appareils :
"Définissons comment {{project_name}} s'adapte aux différentes tailles d'écran et aux appareils.

**Questions de design réactif :**

**Stratégie Bureau (Desktop) :**
- Comment devrions-nous utiliser l'espace supplémentaire de l'écran ?
- Mises en page multi-colonnes, navigation latérale ou densité de contenu ?
- Quelles fonctionnalités spécifiques au bureau pouvons-nous inclure ?

**Stratégie Tablette :**
- Devrions-nous utiliser des mises en page simplifiées ou des interfaces optimisées pour le tactile ?
- Comment les gestes et les interactions tactiles fonctionnent-ils sur les tablettes ?
- Quelle est la densité d'information optimale pour les écrans de tablettes ?

**Stratégie Mobile :**
- Navigation basse (bottom nav) ou menu burger ?
- Comment les mises en page se réduisent-elles sur les petits écrans ?
- Quelle est l'information la plus critique à afficher en priorité pour le mobile (mobile-first) ?"

### 2. Établir la stratégie des points de rupture (Breakpoints)

Définir quand et comment les mises en page changent :
"**Stratégie des points de rupture :**
Nous devons définir les tailles d'écran (points de rupture) où la mise en page s'adapte.

**Points de rupture courants :**
- Mobile : 320px - 767px
- Tablette : 768px - 1023px
- Bureau : 1024px+

**Pour {{project_name}}, devrions-nous :**
- Utiliser des points de rupture standard ou personnalisés ?
- Se concentrer sur un design mobile-first ou desktop-first ?
- Avoir des points de rupture spécifiques pour vos cas d'utilisation clés ?"

### 3. Concevoir la stratégie d'accessibilité

Définir les exigences d'accessibilité et le niveau de conformité :
"**Stratégie d'accessibilité :**
De quel niveau de conformité WCAG {{project_name}} a-t-il besoin ?

**Niveaux WCAG :**
- **Niveau A (Basique)** - Accessibilité essentielle pour la conformité légale.
- **Niveau AA (Recommandé)** - Norme de l'industrie pour une bonne UX.
- **Niveau AAA (Le plus haut)** - Accessibilité exceptionnelle (rarement nécessaire).

**Sur la base de votre produit :**
- [Recommandation basée sur la base d'utilisateurs, les exigences légales, etc.]

**Considérations clés sur l'accessibilité :**
- Ratios de contraste des couleurs (4.5:1 pour le texte normal).
- Support de la navigation au clavier.
- Compatibilité avec les lecteurs d'écran.
- Tailles des cibles tactiles (minimum 44x44px).
- Indicateurs de focus et liens d'évitement (skip links)."

### 4. Définir la stratégie de test

Planifier comment garantir le design réactif et l'accessibilité :
"**Stratégie de Test :**

**Tests Réactifs :**
- Tests sur des téléphones/tablettes réels.
- Tests sur navigateurs Chrome, Firefox, Safari, Edge.
- Tests de performance réseau sur appareils réels.

**Tests d'Accessibilité :**
- Outils de test d'accessibilité automatisés.
- Tests avec lecteurs d'écran (VoiceOver, NVDA, JAWS).
- Tests de navigation au clavier uniquement.
- Tests de simulation de daltonisme.

**Tests Utilisateurs :**
- Inclure des utilisateurs en situation de handicap dans les tests.
- Tester avec diverses technologies d'assistance.
- Valider avec les appareils cibles réels."

### 5. Documenter les directives d'implémentation

Créer des directives spécifiques pour les développeurs :
"**Directives d'implémentation :**

**Développement Réactif :**
- Utiliser des unités relatives (rem, %, vw, vh) plutôt que des pixels fixes.
- Implémenter des requêtes média (media queries) mobile-first.
- Tester les cibles tactiles et les zones de gestes.
- Optimiser les images et les ressources pour différents appareils.

**Développement pour l'Accessibilité :**
- Structure HTML sémantique.
- Labels et rôles ARIA.
- Implémentation de la navigation au clavier.
- Gestion du focus et liens d'évitement.
- Support du mode contraste élevé."

### 6. Générer le contenu Réactif & Accessibilité

Préparez le contenu à ajouter au document :

#### Structure du contenu :

Lors de l'enregistrement dans le document, ajoutez ces sections de niveau 2 (##) et de niveau 3 (###) :

```markdown
## Design Réactif & Accessibilité

### Stratégie Réactive
[Stratégie réactive basée sur la conversation]

### Stratégie des Points de Rupture
[Stratégie des points de rupture basée sur la conversation]

### Stratégie d'Accessibilité
[Stratégie d'accessibilité basée sur la conversation]

### Stratégie de Test
[Stratégie de test basée sur la conversation]

### Directives d'Implémentation
[Directives d'implémentation basées sur la conversation]
```

### 7. Présenter le contenu et le menu

Affichez le contenu généré pour le design réactif et l'accessibilité et présentez les choix :
"J'ai défini la stratégie de design réactif et d'accessibilité pour {{project_name}}. Cela garantit que votre produit fonctionne magnifiquement sur tous les appareils et soit accessible à tous les utilisateurs.

**Voici ce que j'ajouterai au document :**

[Afficher le contenu markdown complet de l'étape 6]

**Que souhaitez-vous faire ?**
[A] Élicitation Avancée - Affinons notre stratégie réactive/accessibilité
[P] Mode Party - Apporter différentes perspectives sur le design inclusif
[C] Continuer - Enregistrer cela dans le document et terminer le workflow"

### 8. Gérer la sélection du menu

#### Si 'A' (Élicitation Avancée) :

- Invoquez la compétence `bmad-advanced-elicitation` avec le contenu actuel réactif/accessibilité.
- Traitez les insights enrichis qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces améliorations de la stratégie réactive/accessibilité ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'P' (Mode Party) :

- Invoquez la compétence `bmad-party-mode` avec la stratégie réactive/accessibilité actuelle.
- Traitez les insights collaboratifs qui reviennent.
- Demandez à l'utilisateur : "Acceptez-vous ces changements de la stratégie réactive/accessibilité ? (y/n)"
- Si oui : Mettez à jour le contenu avec les améliorations, puis revenez au menu A/P/C.
- Si non : Gardez le contenu original, puis revenez au menu A/P/C.

#### Si 'C' (Continuer) :

- Ajoutez le contenu final à `{planning_artifacts}/ux-design-specification.md`.
- Mettez à jour le frontmatter : ajoutez l'étape à la fin du tableau `stepsCompleted`.
- Chargez `./step-14-complete.md`.

## AJOUTER AU DOCUMENT :

Lorsque l'utilisateur sélectionne 'C', ajoutez le contenu directement au document en utilisant la structure de l'étape 6.

## MÉTRIQUES DE RÉUSSITE :

✅ Stratégie réactive clairement définie pour tous les types d'appareils.
✅ Stratégie des points de rupture appropriée établie.
✅ Exigences d'accessibilité déterminées et documentées.
✅ Stratégie de test complète planifiée.
✅ Directives d'implémentation fournies pour l'équipe de développement.
✅ Menu A/P/C présenté et géré correctement.
✅ Contenu correctement ajouté au document lorsque C est sélectionné.

## MODES D'ÉCHEC :

❌ Ne pas prendre en compte tous les types d'appareils et tailles d'écran.
❌ Exigences d'accessibilité mal documentées.
❌ Stratégie de test pas assez complète.
❌ Directives d'implémentation trop génériques ou peu claires.
❌ Ne pas aborder les défis spécifiques d'accessibilité de votre produit.
❌ Ne pas présenter le menu A/P/C après la génération du contenu.
❌ Ajouter du contenu sans que l'utilisateur ait sélectionné 'C'.

❌ **CRITIQUE** : Lire seulement une partie du fichier d'étape - conduit à une compréhension incomplète et à de mauvaises décisions.
❌ **CRITIQUE** : Procéder avec 'C' sans lire et comprendre pleinement le fichier de l'étape suivante.
❌ **CRITIQUE** : Prendre des décisions sans une compréhension complète des exigences et protocoles de l'étape.

## ÉTAPE SUIVANTE :

Après que l'utilisateur a sélectionné 'C' et que le contenu est enregistré dans le document, chargez `./step-14-complete.md` pour finaliser le workflow de design UX.

Rappel : Ne passez PAS à l'étape 14 tant que l'utilisateur n'a pas explicitement sélectionné 'C' dans le menu A/P/C et que le contenu n'est pas enregistré !
