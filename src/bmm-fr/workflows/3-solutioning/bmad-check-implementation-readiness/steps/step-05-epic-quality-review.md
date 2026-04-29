---
outputFile: '{planning_artifacts}/implementation-readiness-report-{{date}}.md'
---

# Étape 5 : Revue de qualité des Epics

## OBJECTIF DE L'ÉTAPE :

Valider les epics et stories par rapport aux meilleures pratiques définies dans le workflow `create-epics-and-stories`, en se concentrant sur la valeur utilisateur, l'indépendance, les dépendances et la préparation à l'implémentation.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur.
- 📖 CRITIQUE : Lire l'intégralité du fichier d'étape avant d'entreprendre toute action.
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que l'intégralité du fichier est lue.
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu.
- ✅ VOUS DEVEZ TOUJOURS COMMUNIQUER dans votre style d'agent avec la configuration `{communication_language}`.

### Renforcement du Rôle :

- ✅ Vous êtes un GARANT DE LA QUALITÉ DES EPICS.
- ✅ Vous savez à quoi ressemblent de bonnes epics — remettez en question tout écart.
- ✅ Les epics techniques sont une erreur — débusquez-les.
- ✅ Les dépendances vers l'avant sont interdites — interceptez-les.
- ✅ Les stories doivent pouvoir être terminées indépendamment.

### Règles Spécifiques à l'Étape :

- 🎯 Appliquez rigoureusement les standards de `create-epics-and-stories`.
- 🚫 N'acceptez pas de "jalons techniques" en tant qu'epics.
- 💬 Remettez en question chaque dépendance vis-à-vis d'un travail futur.
- 🚪 Vérifiez la taille et la structure appropriées des stories.

## PROTOCOLES D'EXÉCUTION :

- 🎯 Valider systématiquement chaque epic et story.
- 💾 Documenter toutes les violations des meilleures pratiques.
- 📖 Vérifier chaque relation de dépendance.
- 🚫 INTERDICTION d'accepter des problèmes structurels.

## PROCESSUS DE REVUE DE QUALITÉ DES EPICS :

### 1. Initialiser la Validation des Meilleures Pratiques

"Début de la **Revue de qualité des Epics** par rapport aux standards `create-epics-and-stories`.

Je vais valider rigoureusement :

- Que les epics apportent de la valeur utilisateur (pas des jalons techniques).
- L'indépendance des epics (l'Epic 2 n'a pas besoin de l'Epic 3).
- Les dépendances des stories (pas de références vers l'avant).
- La taille et l'exhaustivité appropriées des stories.

Tout écart par rapport aux meilleures pratiques sera signalé comme un défaut."

### 2. Validation de la Structure des Epics

#### A. Vérification de la Valeur Utilisateur

Pour chaque epic :

- **Titre de l'Epic :** Est-il centré sur l'utilisateur (ce que l'utilisateur peut faire) ?
- **Objectif de l'Epic :** Décrit-il le résultat pour l'utilisateur ?
- **Proposition de Valeur :** Les utilisateurs peuvent-ils bénéficier de cette seule epic ?

**Signaux d'alerte (violations) :**

- "Configuration de la base de données" ou "Création des modèles" — aucune valeur utilisateur.
- "Développement de l'API" — jalon technique.
- "Configuration de l'infrastructure" — n'est pas orienté utilisateur.
- "Système d'authentification" — limite (est-ce de la valeur utilisateur ?).

#### B. Validation de l'Indépendance des Epics

Tester l'indépendance des epics :

- **Epic 1 :** Doit être totalement autonome.
- **Epic 2 :** Doit pouvoir fonctionner en utilisant uniquement la sortie de l'Epic 1.
- **Epic 3 :** Doit pouvoir fonctionner en utilisant les sorties des Epics 1 et 2.
- **Règle :** L'Epic N ne peut pas nécessiter l'Epic N+1 pour fonctionner.

**Documenter les échecs :**

- "L'Epic 2 nécessite les fonctionnalités de l'Epic 3 pour fonctionner".
- Stories dans l'Epic 2 référençant des composants de l'Epic 3.
- Dépendances circulaires entre epics.

### 3. Évaluation de la Qualité des Stories

#### A. Validation de la Taille des Stories

Vérifier chaque story :

- **Valeur Utilisateur Claire :** La story apporte-t-elle quelque chose de significatif ?
- **Indépendance :** Peut-elle être terminée sans les stories futures ?

**Violations courantes :**

- "Configurer tous les modèles" — n'est pas une USER story.
- "Créer l'UI de connexion (dépend de la Story 1.3)" — dépendance vers l'avant.

#### B. Revue des Critères d'Acceptation (AC)

Pour les AC de chaque story :

- **Format Given/When/Then :** Structure BDD appropriée ?
- **Testable :** Chaque AC peut-elle être vérifiée indépendamment ?
- **Complet :** Couvre tous les scénarios, y compris les erreurs ?
- **Spécifique :** Résultats attendus clairs ?

**Problèmes à identifier :**

- Critères vagues comme "l'utilisateur peut se connecter".
- Conditions d'erreur manquantes.
- Chemin nominal (happy path) incomplet.
- Résultats non mesurables.

### 4. Analyse des Dépendances

#### A. Dépendances au sein d'une Epic

Cartographier les dépendances des stories au sein de chaque epic :

- La Story 1.1 doit pouvoir être terminée seule.
- La Story 1.2 peut utiliser la sortie de la Story 1.1.
- La Story 1.3 peut utiliser les sorties des Stories 1.1 et 1.2.

**Violations critiques :**

- "Cette story dépend de la Story 1.4".
- "Attendre la story future pour fonctionner".
- Stories référençant des fonctionnalités non encore implémentées.

#### B. Séquencement de la création de la Base de Données / des Entités

Valider l'approche de création de la base de données :

- **Erreur :** L'Epic 1 Story 1 crée toutes les tables à l'avance.
- **Correct :** Chaque story crée les tables dont elle a besoin.
- **Vérification :** Les tables sont-elles créées uniquement au moment où elles sont nécessaires pour la première fois ?

### 5. Vérifications Spécifiques à l'Implémentation

#### A. Exigence du Modèle de Départ (Starter Template)

Vérifier si l'Architecture spécifie un modèle de départ :

- Si OUI : L'Epic 1 Story 1 doit être "Configurer le projet initial à partir du modèle de départ".
- Vérifier que la story inclut le clonage, les dépendances, la configuration initiale.

#### B. Indicateurs "Greenfield" vs "Brownfield"

Les projets "Greenfield" (nouveaux) doivent avoir :

- Une story de configuration initiale du projet.
- La configuration de l'environnement de développement.
- La mise en place précoce du pipeline CI/CD.

Les projets "Brownfield" (existants) doivent avoir :

- Des points d'intégration avec les systèmes existants.
- Des stories de migration ou de compatibilité.

### 6. Checklist de Conformité aux Meilleures Pratiques

Pour chaque epic, vérifier :

- [ ] L'epic apporte de la valeur utilisateur.
- [ ] L'epic peut fonctionner indépendamment.
- [ ] Taille des stories appropriée.
- [ ] Aucune dépendance vers l'avant.
- [ ] Tables de base de données créées au moment requis.
- [ ] Critères d'acceptation clairs.
- [ ] Traçabilité avec les FR maintenue.

### 7. Documentation de l'Évaluation de la Qualité

Documenter tous les résultats par sévérité :

#### 🔴 Violations Critiques

- Epics techniques sans valeur utilisateur.
- Dépendances vers l'avant rompant l'indépendance.
- Stories de la taille d'une epic qui ne peuvent pas être terminées.

#### 🟠 Problèmes Majeurs

- Critères d'acceptation vagues.
- Stories nécessitant des stories futures.
- Violations des règles de création de base de données.

#### 🟡 Préoccupations Mineures

- Incohérences de formatage.
- Écarts de structure mineurs.
- Lacunes de documentation.

### 8. Exécution Autonome de la Revue

Cette revue s'exécute de manière autonome pour maintenir les standards :

- Appliquez les meilleures pratiques sans compromis.
- Documentez chaque violation avec des exemples spécifiques.
- Fournissez des conseils de remédiation clairs.
- Préparez des recommandations pour chaque problème.

## FIN DE LA REVUE :

Après avoir terminé la revue de qualité des epics :

- Mettre à jour {outputFile} avec tous les résultats de qualité.
- Documenter les violations spécifiques des meilleures pratiques.
- Fournir des recommandations exploitables.
- Charger `./step-06-final-assessment.md` pour l'évaluation finale de la préparation.

## NOTE CRITIQUE SUR LA FIN DE L'ÉTAPE

Cette étape s'exécute de manière autonome. Ne chargez `./step-06-final-assessment.md` qu'une fois la revue complète de la qualité des epics documentée.

---

## 🚨 MESURES DE RÉUSSITE/ÉCHEC DU SYSTÈME

### ✅ RÉUSSITE :

- Toutes les epics validées par rapport aux meilleures pratiques.
- Chaque dépendance vérifiée et validée.
- Violations de qualité documentées avec des exemples.
- Conseils de remédiation clairs fournis.
- Aucun compromis sur l'application des standards.

### ❌ ÉCHEC DU SYSTÈME :

- Accepter des epics techniques comme valides.
- Ignorer les dépendances vers l'avant.
- Ne pas vérifier la taille des stories.
- Omettre des violations évidentes.

**Règle Maîtresse :** Appliquez rigoureusement les meilleures pratiques. Identifiez toutes les violations.
