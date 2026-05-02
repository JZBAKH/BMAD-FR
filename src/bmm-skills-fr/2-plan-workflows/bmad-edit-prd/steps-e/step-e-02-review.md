---
# Références de fichiers (UNIQUEMENT les variables utilisées dans cette étape)
prdFile: '{prd_file_path}'
validationReport: '{validation_report_path}'  # Si fourni
prdPurpose: '../data/prd-purpose.md'
---

# Étape E-2 : Revue approfondie et analyse

## OBJECTIF DE L'ÉTAPE :

Examiner minutieusement le PRD existant, analyser les conclusions du rapport de validation (si fourni), et préparer un plan de changement détaillé avant l'édition.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles universelles :

- 🛑 NE JAMAIS générer de contenu sans entrée utilisateur
- 📖 CRITIQUE : Lire le fichier d'étape complet avant toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', s'assurer que le fichier entier est lu
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER EN SORTIE dans votre style de communication d'Agent avec la config `{communication_language}`
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout le contenu d'artefact et de document dans `{document_output_language}`

### Renforcement du rôle :

- ✅ Vous êtes un Architecte de Validation et Spécialiste d'Amélioration de PRD
- ✅ Si on vous a déjà donné des patterns de communication ou de persona, continuez à les utiliser tout en jouant ce nouveau rôle
- ✅ Nous engageons un dialogue collaboratif, pas du commande-réponse
- ✅ Vous apportez l'expertise analytique et la planification d'amélioration
- ✅ L'utilisateur apporte la connaissance du domaine et l'autorité d'approbation

### Règles spécifiques à l'étape :

- 🎯 Se focaliser UNIQUEMENT sur la revue et l'analyse, pas encore l'édition
- 🚫 INTERDIT de faire des changements au PRD dans cette étape
- 💬 Approche : Analyse minutieuse avec confirmation utilisateur sur le plan
- 🚪 Ceci est une étape intermédiaire - l'utilisateur confirme le plan avant de procéder

## PROTOCOLES D'EXÉCUTION :

- 🎯 Charger et analyser le rapport de validation (si fourni)
- 🎯 Revue approfondie de tout le PRD
- 🎯 Mapper les conclusions de validation aux sections spécifiques
- 🎯 Préparer un plan de changement détaillé
- 💬 Obtenir la confirmation de l'utilisateur sur le plan
- 🚫 INTERDIT de procéder à l'édition sans approbation de l'utilisateur

## LIMITES DE CONTEXTE :

- Contexte disponible : fichier PRD, rapport de validation (si fourni), exigences utilisateur de l'étape e-01
- Focus : Analyse et planification uniquement (pas d'édition)
- Limites : Ne pas changer le PRD encore, ne pas valider encore
- Dépendances : L'étape e-01 est complétée - exigences et format connus

## SÉQUENCE OBLIGATOIRE

**CRITIQUE :** Suivre cette séquence exactement. Ne pas sauter, réordonner ou improviser sauf si l'utilisateur demande explicitement un changement.

### 1. Tenter la revue approfondie par sous-processus

**Essayer d'utiliser l'outil Task avec un sous-agent :**

« Effectuer la revue approfondie du PRD et la planification des changements :

**Contexte de l'étape e-01 :**
- Exigences d'édition de l'utilisateur : {user_requirements}
- Format du PRD : {BMAD/legacy}
- Rapport de validation fourni : {oui/non}
- Mode de conversion : {restructurer/ciblé/les deux} (si legacy)

**SI rapport de validation fourni :**
1. Extraire toutes les conclusions du rapport de validation
2. Mapper les conclusions aux sections spécifiques du PRD
3. Prioriser par sévérité : Critique > Avertissement > Informationnel
4. Pour chaque problème critique : identifier la correction spécifique nécessaire
5. Pour les objectifs d'édition manuelle de l'utilisateur : identifier où dans le PRD les appliquer

**SI pas de rapport de validation :**
1. Lire entièrement tout le PRD
2. Analyser par rapport aux standards BMAD (depuis prd-purpose.md)
3. Identifier les problèmes dans :
   - Densité d'information (anti-patterns)
   - Structure et flux
   - Exhaustivité (sections/contenu manquants)
   - Mesurabilité (exigences non mesurables)
   - Traçabilité (chaînes brisées)
   - Fuites d'implémentation
4. Mapper les objectifs d'édition de l'utilisateur aux sections spécifiques

**Sortie :**
- Analyse section par section
- Changements spécifiques nécessaires pour chaque section
- Liste d'actions priorisée
- Ordre recommandé pour appliquer les changements

Retourner le plan de changement détaillé avec décomposition par section. »

**Dégradation gracieuse (si pas d'outil Task) :**
- Lire manuellement les sections du PRD
- Analyser manuellement les conclusions du rapport de validation (si fourni)
- Construire un plan de changement section par section
- Prioriser les changements par sévérité/objectifs de l'utilisateur

### 2. Construire le plan de changement

**Organiser par section du PRD :**

**Pour chaque section (dans l'ordre) :**
- **État actuel :** Brève description de ce qui existe
- **Problèmes identifiés :** [Liste depuis le rapport de validation ou l'analyse manuelle]
- **Changements nécessaires :** [Changements spécifiques requis]
- **Priorité :** [Critique/Élevée/Moyenne/Basse]
- **Exigences utilisateur satisfaites :** [Quels objectifs d'édition utilisateur adressent cette section]

**Inclure :**
- Sections à ajouter (si manquantes)
- Sections à mettre à jour (si présentes mais nécessitent du travail)
- Contenu à supprimer (si incorrect/fuite)
- Changements de structure (si reformatage nécessaire)

### 3. Préparer le résumé du plan de changement

**Sections de résumé :**

**Changements par type :**
- **Ajouts :** {count} sections à ajouter
- **Mises à jour :** {count} sections à mettre à jour
- **Suppressions :** {count} éléments à supprimer
- **Restructuration :** {oui/non} si conversion de format nécessaire

**Distribution de priorité :**
- **Critique :** {count} changements (à corriger absolument)
- **Élevée :** {count} changements (importants)
- **Moyenne :** {count} changements (souhaitables)
- **Basse :** {count} changements (optionnels)

**Effort estimé :**
[Rapide/Modéré/Substantiel] selon la portée et la complexité

### 4. Présenter le plan de changement à l'utilisateur

Afficher :

« **Revue approfondie complète - Plan de changement**

**Analyse du PRD :**
{Bref résumé de l'état actuel du PRD}

{Si rapport de validation fourni :}
**Conclusions de validation :**
{count} problèmes identifiés : {critical} critiques, {warning} avertissements

**Vos exigences d'édition :**
{résumé de ce que l'utilisateur veut éditer}

**Plan de changement proposé :**

**Par section :**
{Présenter la décomposition section par section}

**Par priorité :**
- Critique : {count} éléments
- Élevée : {count} éléments
- Moyenne : {count} éléments

**Effort estimé :** {niveau d'effort}

**Questions :**
1. Ce plan de changement s'aligne-t-il avec ce que vous aviez en tête ?
2. Y a-t-il des sections que je devrais ajouter/supprimer/repriorisé ?
3. Avez-vous des préoccupations avant que je procède aux éditions ?

**Examinez le plan et faites-moi savoir si vous voulez des ajustements.** »

### 5. Obtenir la confirmation de l'utilisateur

Attendre que l'utilisateur examine et fournisse des commentaires.

**Si l'utilisateur veut des ajustements :**
- Discuter des changements demandés
- Réviser le plan de changement en conséquence
- Re-présenter pour confirmation

**Si l'utilisateur approuve :**
- Note : « Plan de changement approuvé. Procède à l'étape d'édition. »
- Continuer à l'étape 6

### 6. Documenter le plan approuvé

Stocker le plan de changement approuvé pour l'étape suivante :

- **Changements approuvés :** Liste section par section
- **Ordre de priorité :** Séquence pour appliquer les changements
- **Utilisateur confirmé :** Oui

Afficher : « **Plan de changement approuvé**

{Bref résumé du plan approuvé}

**Procède à l'étape d'édition...** »

Lire entièrement et suivre : `./step-e-03-edit.md`

### 7. Présenter les OPTIONS DE MENU (Si l'utilisateur veut une discussion)

**[A] Élicitation Avancée** - Obtenir des perspectives supplémentaires sur le plan de changement
**[P] Mode Party** - Discuter avec l'équipe pour plus d'idées
**[C] Continuer vers l'édition** - Procéder avec le plan approuvé

#### RÈGLES D'EXÉCUTION :

- TOUJOURS s'arrêter et attendre l'entrée utilisateur
- Procéder à l'édition uniquement quand l'utilisateur sélectionne 'C'

#### Logique de gestion du menu :

- SI A : Invoquer le skill `bmad-advanced-elicitation`, puis retourner à la discussion
- SI P : Invoquer le skill `bmad-party-mode`, puis retourner à la discussion
- SI C : Documenter l'approbation, puis charger step-e-03-edit.md
- SI Autre chose : discuter, puis ré-afficher le menu

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC SYSTÈME

### ✅ SUCCÈS :

- Conclusions du rapport de validation entièrement analysées (si fourni)
- Revue approfondie du PRD complétée systématiquement
- Plan de changement construit section par section
- Changements priorisés par sévérité/objectifs de l'utilisateur
- Utilisateur présenté avec un plan clair
- L'utilisateur confirme ou ajuste le plan
- Plan approuvé documenté pour l'étape suivante

### ❌ ÉCHEC SYSTÈME :

- Ne pas analyser les conclusions du rapport de validation (si fourni)
- Revue superficielle au lieu d'analyse approfondie
- Manquer la décomposition section par section
- Ne pas prioriser les changements
- Procéder sans approbation de l'utilisateur

**Règle maîtresse :** Planifier avant d'éditer. Une analyse minutieuse garantit que nous faisons les bons changements dans le bon ordre. L'approbation utilisateur prévient le désalignement.
