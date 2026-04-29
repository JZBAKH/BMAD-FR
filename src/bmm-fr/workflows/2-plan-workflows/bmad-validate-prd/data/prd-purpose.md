# Objectif du PRD BMAD (BMAD PRD Purpose)

**Le PRD est le haut de l'entonnoir (funnel) requis qui alimente tout le travail de développement de produit ultérieur dans la méthode BMAD.**

---

## Qu'est-ce qu'un PRD BMAD ?

Un document à double audience (dual-audience) servant :
1. **Les Humains (Product Managers et bâtisseurs)** - Vision, stratégie, communication avec les parties prenantes (stakeholders)
2. **La Consommation en Aval par les LLMs** - Design UX → Architecture → Thèmes (Epics) → Agents IA de Développement

Chaque document successif devient plus granulaire et adapté à l'IA (AI-tailored).

---

## Philosophie Fondamentale : Densité de l'Information

**Ratio Signal/Bruit Élevé (High Signal-to-Noise Ratio)**

Chaque phrase doit avoir un poids informatif. Les LLMs consomment le contenu précis et dense de manière beaucoup plus efficace.

**Anti-Patterns (À éliminer) :**
- ❌ "Le système permettra aux utilisateurs de..." → ✅ "Les utilisateurs peuvent..."
- ❌ "Il est important de noter que..." → ✅ Énoncez le fait directement
- ❌ "Afin de pouvoir..." → ✅ "Pour..."
- ❌ Remplissage conversationnel et fioritures → ✅ Déclarations directes et concises

**Objectif :** Un maximum d'informations par mot. Zéro superflu (fluff).

---

## La Chaîne de Traçabilité (Traceability Chain)

**Le PRD initie la chaîne :**
```
Vision → Critères de Réussite → Parcours Utilisateurs → Exigences Fonctionnelles → (futur : User Stories)
```

**Dans le PRD, établissez :**
- L'alignement Vision → Critères de Réussite
- La couverture Critères de Réussite → Parcours Utilisateur (User Journey)
- La cartographie Parcours Utilisateur → Exigence Fonctionnelle
- La traçabilité de toutes les exigences vers les besoins utilisateurs

**Pourquoi :** Chaque artefact en aval (UX, Architecture, Epics, Tests) repose sur cette chaîne ininterrompue.

---

## La Mesurabilité est Obligatoire

**Exigences Fonctionnelles (FRs)**
- ❌ "Le système doit être facile à utiliser"
- ✅ "L'utilisateur peut terminer l'onboarding en moins de 3 minutes avec 0 erreur"

**Exigences Non Fonctionnelles (NFRs)**
- ❌ "Le système doit être rapide"
- ✅ "Temps de réponse du point d'accès (endpoint) API < 200ms au 95ème centile sous une charge de 1000 RPS"

---

## Limites : Pas de Fuite vers l'Implémentation (No Implementation Leakage)

Le PRD définit **QUOI** et **POURQUOI**. Il ne définit PAS **COMMENT**.

- ❌ "Utiliser le contexte React pour la gestion d'état" (C'est le rôle de l'Architecture)
- ❌ "Ajouter une ombre portée au bouton principal" (C'est le rôle du Design UX)
- ❌ "Créer une table 'users' avec une colonne 'status'" (C'est le rôle de l'Architecture / Conception de Base de Données)
- ✅ "Les utilisateurs doivent pouvoir réinitialiser leur mot de passe de manière sécurisée via un lien par email" (C'est le rôle du PRD)

---

## Structure Centrale BMAD

1. Résumé Exécutif (Executive Summary)
2. Critères de Réussite (Success Criteria)
3. Périmètre du Produit (Product Scope)
4. Parcours Utilisateurs (User Journeys)
5. Exigences du Domaine (Domain Requirements) (si applicable)
6. Analyse d'Innovation (Innovation Analysis) (si applicable)
7. Exigences du Type de Projet (Project-Type Requirements)
8. Exigences Fonctionnelles (Functional Requirements)
9. Exigences Non Fonctionnelles (Non-Functional Requirements)

---

## Impact en Aval (Downstream Impact)

Comment le PRD est utilisé par les étapes BMAD suivantes :

**Design UX :**
- Parcours utilisateurs (User journeys) → flux d'écrans (screen flows)
- FRs → composants UI

**Architecture :**
- FRs → capacités du système (system capabilities)
- NFRs → décisions d'architecture
- Exigences du domaine → architecture de conformité
- Exigences du type de projet → choix de plateforme

**Thèmes & Stories (créés après l'architecture) :**
- FRs → user stories (1 FR pourrait potentiellement correspondre à 1-3 stories)
- Critères d'acceptation → tests d'acceptation de story
- Priorité → séquencement des sprints
- Traçabilité → les stories remontent jusqu'à la vision

**Agents IA de Développement :**
- Exigences précises → clarté d'implémentation
- Critères de test → génération automatisée de tests
- Exigences du domaine → application de la conformité
- NFRs mesurables → objectifs de performance

---

## Résumé : Qu'est-ce qui fait un excellent PRD BMAD ?

✅ **Haute Densité d'Information** - Chaque phrase a son importance, zéro superflu.
✅ **Exigences Mesurables** - Toutes les FRs et NFRs sont testables avec des critères spécifiques.
✅ **Traçabilité Claire** - Chaque exigence est liée à un besoin utilisateur et à un objectif commercial.
✅ **Sensibilisation au Domaine (Domain Awareness)** - Les exigences spécifiques à l'industrie sont auto-détectées et incluses.
✅ **Zéro Anti-Patterns** - Pas d'adjectifs subjectifs, de fuite vers l'implémentation ou de quantificateurs vagues.
✅ **Optimisé pour une Double Audience** - Lisible par les humains ET consommable par les LLMs.
✅ **Format Markdown** - Professionnel, propre, accessible à toutes les parties prenantes.

---

**N'oubliez pas :** Le PRD est la fondation. La qualité à ce stade se répercute sur chaque phase ultérieure. Un PRD dense, précis et bien tracé rend le design UX, l'architecture, la décomposition en Epics et le développement par l'IA considérablement plus efficaces.
