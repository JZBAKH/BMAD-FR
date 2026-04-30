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

**Pourquoi :** Chaque artefact en aval (UX, Architecture, Epics, Stories) doit pouvoir être tracé jusqu'aux besoins utilisateurs documentés et aux objectifs commerciaux. Cette chaîne garantit que nous construisons la bonne chose.

---

## Qu'est-ce qui fait d'excellentes Exigences Fonctionnelles (FRs) ?

### Les FRs sont des Capacités, pas de l'Implémentation

**Bonne FR :** "Les utilisateurs peuvent réinitialiser leur mot de passe via un lien par email"
**Mauvaise FR :** "Le système envoie un JWT par email et le valide avec la base de données" (fuite d'implémentation)

**Bonne FR :** "Le tableau de bord se charge en moins de 2 secondes pour le 95ème centile"
**Mauvaise FR :** "Temps de chargement rapide" (subjectif, non mesurable)

### Critères de Qualité SMART

**Specific (Spécifique) :** Capacité claire et précisément définie
**Measurable (Mesurable) :** Quantifiable avec des critères de test
**Attainable (Atteignable) :** Réaliste dans les contraintes
**Relevant (Pertinent) :** Aligné avec les objectifs commerciaux
**Traceable (Traçable) :** Lié à une source (résumé exécutif ou parcours utilisateur)

### Anti-Patterns FR

**Adjectifs Subjectifs :**
- ❌ "facile à utiliser", "intuitif", "convivial", "rapide", "réactif"
- ✅ Utilisez des métriques : "tâche accomplie en moins de 3 clics", "se charge en moins de 2 secondes"

**Fuite d'Implémentation :**
- ❌ Noms de technologies, bibliothèques spécifiques, détails d'implémentation
- ✅ Concentrez-vous sur la capacité et les résultats mesurables

**Quantificateurs Vagues :**
- ❌ "plusieurs utilisateurs", "plusieurs options", "divers formats"
- ✅ "jusqu'à 100 utilisateurs simultanés", "3-5 options", "formats PDF, DOCX, TXT"

**Critères de Test Manquants :**
- ❌ "Le système doit fournir des notifications"
- ✅ "Le système doit envoyer des notifications par email dans les 30 secondes suivant l'événement déclencheur"

---

## Qu'est-ce qui fait d'excellentes Exigences Non-Fonctionnelles (NFRs) ?

### Les NFRs Doivent Être Mesurables

**Modèle :**
```
"Le système doit [métrique] [condition] [méthode de mesure]"
```

**Exemples :**
- ✅ "Le système doit répondre aux requêtes API en moins de 200ms pour le 95ème centile, mesuré par la surveillance APM"
- ✅ "Le système doit maintenir une disponibilité de 99,9% pendant les heures ouvrables, mesurée par le SLA du fournisseur cloud"
- ✅ "Le système doit prendre en charge 10 000 utilisateurs simultanés, mesurés par tests de charge"

### Anti-Patterns NFR

**Affirmations Non Mesurables :**
- ❌ "Le système doit être évolutif" → ✅ "Le système doit gérer une croissance de charge de 10x via la mise à l'échelle horizontale"
- ❌ "Haute disponibilité requise" → ✅ "99,9% de disponibilité, mesurée par le SLA du fournisseur cloud"

**Contexte Manquant :**
- ❌ "Temps de réponse inférieur à 1 seconde" → ✅ "Temps de réponse API inférieur à 1 seconde pour le 95ème centile sous charge normale"

---

## Exigences Spécifiques au Domaine (Domain-Specific Requirements)

**Auto-Détection et Application Selon le Contexte du Projet**

Certaines industries ont des exigences obligatoires qui doivent être présentes :

- **Santé (Healthcare) :** Règles de confidentialité et de sécurité HIPAA, chiffrement PHI, journalisation d'audit, MFA
- **Fintech :** PCI-DSS Niveau 1, conformité AML/KYC, contrôles SOX, traces d'audit financières
- **GovTech :** Cadre NIST, accessibilité Section 508 (WCAG 2.1 AA), FedRAMP, résidence des données
- **E-Commerce :** PCI-DSS pour les paiements, exactitude de l'inventaire, calcul de taxes par juridiction

**Pourquoi :** L'absence de ces exigences dans le PRD signifie qu'elles seront manquées dans l'architecture et l'implémentation, créant des reprises coûteuses. Lors de la création du PRD il y a une étape pour couvrir ce point - lors de la validation nous voulons nous assurer qu'il a bien été traité. À cette fin, les étapes utiliseront un fichier `domain-complexity.csv` et un fichier `project-types.csv`.

---

## Structure du Document (Markdown, Lisible par les Humains)

### Sections Requises
1. **Résumé Exécutif (Executive Summary)** - Vision, différenciateur, utilisateurs cibles
2. **Critères de Réussite (Success Criteria)** - Résultats mesurables (SMART)
3. **Périmètre du Produit (Product Scope)** - Phases MVP, Croissance, Vision
4. **Parcours Utilisateurs (User Journeys)** - Couverture complète
5. **Exigences du Domaine (Domain Requirements)** - Conformité spécifique à l'industrie (si applicable)
6. **Analyse d'Innovation (Innovation Analysis)** - Différenciation concurrentielle (si applicable)
7. **Exigences du Type de Projet (Project-Type Requirements)** - Besoins spécifiques à la plateforme
8. **Exigences Fonctionnelles (Functional Requirements)** - Contrat de capacité (FRs)
9. **Exigences Non-Fonctionnelles (Non-Functional Requirements)** - Attributs de qualité (NFRs)

### Mise en Forme pour une Double Consommation

**Pour les Humains :**
- Langage clair et professionnel
- Flux logique de la vision aux exigences
- Facile à examiner et à approuver pour les parties prenantes

**Pour les LLMs :**
- En-têtes de niveau 2 (##) pour toutes les sections principales (permet l'extraction)
- Structure et patterns cohérents
- Langage précis et testable
- Haute densité d'information

---

## Impact en Aval (Downstream Impact)

**Comment le PRD Alimente les Artefacts Suivants :**

**Design UX :**
- Parcours utilisateurs → flux d'interaction
- FRs → exigences de design
- Critères de réussite → métriques UX

**Architecture :**
- FRs → capacités du système
- NFRs → décisions d'architecture
- Exigences du domaine → architecture de conformité
- Exigences du type de projet → choix de plateforme

**Thèmes & Stories (Epics & Stories) (créés après l'architecture) :**
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
