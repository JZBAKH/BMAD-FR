# Objectif du PRD BMAD

**Le PRD (Product Requirements Document) est le point de départ incontournable qui alimente tout le travail de développement de produit ultérieur dans la Méthode BMAD.**

---

## Qu'est-ce qu'un PRD BMAD ?

Un document à double audience qui sert :

1. **Les Chefs de Produit (PM) et les développeurs humains** - Vision, stratégie, communication avec les parties prenantes
2. **La consommation en aval par les LLM** - Design UX → Architecture → Épopées (Epics) → Agents IA de Développement

Chaque document successif devient plus spécifiquement adapté à l'IA et plus granulaire.

---

## Philosophie Fondamentale : Densité d'Information

**Rapport Signal/Bruit Élevé**

Chaque phrase doit avoir un poids informatif. Les LLM consomment un contenu précis et dense de manière très efficace.

**Anti-Patrons (À Éliminer) :**

- ❌ "Le système permettra aux utilisateurs de..." → ✅ "Les utilisateurs peuvent..."
- ❌ "Il est important de noter que..." → ✅ Énoncez le fait directement
- ❌ "Afin de..." → ✅ "Pour..."
- ❌ Remplissage conversationnel et verbiage → ✅ Déclarations directes et concises

**Objectif :** Un maximum d'informations par mot. Aucun remplissage (fluff).

---

## La Chaîne de Traçabilité

**Le PRD initie la chaîne :**

```
Vision → Critères de Succès → Parcours Utilisateurs → Exigences Fonctionnelles → (futur : User Stories)
```

**Dans le PRD, vous devez établir :**

- L'alignement Vision → Critères de Succès
- La couverture Critères de Succès → Parcours Utilisateur
- La correspondance Parcours Utilisateur → Exigence Fonctionnelle
- La traçabilité de toutes les exigences vers les besoins des utilisateurs

**Pourquoi :** Chaque artefact en aval (UX, Architecture, Epics, Stories) doit remonter aux besoins utilisateur et aux objectifs commerciaux documentés. Cette chaîne garantit que nous construisons la bonne chose.

---

## Qu'est-ce qui Fait d'Excellentes Exigences Fonctionnelles (FR) ?

### Les FR sont des Capacités, pas de l'Implémentation

**Bonne FR :** "Les utilisateurs peuvent réinitialiser leur mot de passe via un lien par courriel"
**Mauvaise FR :** "Le système envoie un JWT par courriel et le valide avec la base de données" (fuite d'implémentation)

**Bonne FR :** "Le tableau de bord se charge en moins de 2 secondes pour le 95e centile"
**Mauvaise FR :** "Temps de chargement rapide" (subjectif, non mesurable)

### Critères de Qualité SMART

**Spécifique :** Capacité claire et définie avec précision
**Mesurable :** Quantifiable avec des critères de test
**Atteignable :** Réaliste compte tenu des contraintes
**Pertinent (Relevant) :** Aligné avec les objectifs commerciaux
**Traçable :** Lié à la source (résumé exécutif ou parcours utilisateur)

### Anti-Patrons des FR

**Adjectifs Subjectifs :**

- ❌ "facile à utiliser", "intuitif", "convivial", "rapide", "réactif"
- ✅ Utilisez des métriques : "accomplit la tâche en moins de 3 clics", "se charge en moins de 2 secondes"

**Fuite d'Implémentation :**

- ❌ Noms de technologies, bibliothèques spécifiques, détails d'implémentation
- ✅ Concentrez-vous sur la capacité et les résultats mesurables

**Quantificateurs Vagues :**

- ❌ "utilisateurs multiples", "plusieurs options", "différents formats"
- ✅ "jusqu'à 100 utilisateurs simultanés", "3 à 5 options", "formats PDF, DOCX, TXT"

**Critères de Test Manquants :**

- ❌ "Le système doit fournir des notifications"
- ✅ "Le système doit envoyer des notifications par courriel dans les 30 secondes suivant l'événement déclencheur"

---

## Qu'est-ce qui Fait d'Excellentes Exigences Non Fonctionnelles (NFR) ?

### Les NFR Doivent Être Mesurables

**Modèle :**

```
"Le système doit [métrique] [condition] [méthode de mesure]"
```

**Exemples :**

- ✅ "Le système doit répondre aux requêtes API en moins de 200 ms pour le 95e centile tel que mesuré par la surveillance APM"
- ✅ "Le système doit maintenir une disponibilité de 99,9 % pendant les heures ouvrables telle que mesurée par le SLA du fournisseur cloud"
- ✅ "Le système doit prendre en charge 10 000 utilisateurs simultanés tel que mesuré par des tests de charge"

### Anti-Patrons des NFR

**Affirmations Non Mesurables :**

- ❌ "Le système doit être évolutif (scalable)" → ✅ "Le système doit gérer une croissance de charge de 10x grâce à une mise à l'échelle horizontale"
- ❌ "Haute disponibilité requise" → ✅ "Disponibilité de 99,9 % telle que mesurée par le SLA du fournisseur cloud"

**Contexte Manquant :**

- ❌ "Temps de réponse inférieur à 1 seconde" → ✅ "Temps de réponse de l'API inférieur à 1 seconde pour le 95e centile sous une charge normale"

---

## Exigences Spécifiques au Domaine

**Détection et Application Automatiques Basées sur le Contexte du Projet**

Certaines industries ont des exigences obligatoires qui doivent être présentes :

- **Santé :** Règles de confidentialité et de sécurité HIPAA, cryptage PHI, journaux d'audit, MFA
- **Fintech :** PCI-DSS Niveau 1, conformité AML/KYC, contrôles SOX, pistes d'audit financier
- **GovTech :** Cadre NIST, normes d'accessibilité (Section 508 / WCAG 2.1 AA), FedRAMP, résidence des données
- **E-Commerce :** PCI-DSS pour les paiements, précision des stocks, calcul des taxes par juridiction

**Pourquoi :** L'omission de ces exigences dans le PRD signifie qu'elles manqueront dans l'architecture et l'implémentation, créant des retouches coûteuses. Pendant la création du PRD, une étape est prévue pour couvrir cela ; lors de la validation, nous voulons nous assurer que cela a bien été traité. À cette fin, les étapes utiliseront les fichiers `domain-complexity.csv` et `project-types.csv`.

---

## Structure du Document (Markdown, Lisible par les Humains)

### Sections Requises

1. **Résumé Exécutif (Executive Summary)** - Vision, facteur de différenciation, utilisateurs cibles
2. **Critères de Succès** - Résultats mesurables (SMART)
3. **Périmètre du Produit (Product Scope)** - Phase MVP, Croissance, Vision
4. **Parcours Utilisateurs (User Journeys)** - Couverture exhaustive
5. **Exigences du Domaine** - Conformité spécifique à l'industrie (le cas échéant)
6. **Analyse de l'Innovation** - Différenciation concurrentielle (le cas échéant)
7. **Exigences par Type de Projet** - Besoins spécifiques à la plateforme
8. **Exigences Fonctionnelles (FR)** - Contrat de capacités
9. **Exigences Non Fonctionnelles (NFR)** - Attributs de qualité

### Formatage pour une Double Consommation

**Pour les Humains :**

- Langage clair et professionnel
- Flux logique de la vision vers les exigences
- Facile à réviser et à approuver pour les parties prenantes

**Pour les LLM :**

- En-têtes de niveau 2 (`##`) pour toutes les sections principales (permet l'extraction)
- Structure et modèles cohérents
- Langage précis et testable
- Haute densité d'information

---

## Impact en Aval

**Comment le PRD alimente les artefacts suivants :**

**Design UX :**

- Parcours Utilisateurs → flux d'interaction
- Exigences Fonctionnelles (FR) → exigences de conception
- Critères de succès → métriques UX

**Architecture :**

- Exigences Fonctionnelles (FR) → capacités du système
- Exigences Non Fonctionnelles (NFR) → décisions d'architecture
- Exigences du Domaine → architecture de conformité
- Exigences par Type de Projet → choix de la plateforme

**Epics & Stories (créées après l'architecture) :**

- Exigences Fonctionnelles (FR) → user stories (1 FR pourrait se traduire par 1 à 3 stories)
- Critères d'acceptation → tests d'acceptation des stories
- Priorité → séquencement des sprints
- Traçabilité → les stories remontent à la vision

**Agents IA de Développement :**

- Exigences précises → clarté d'implémentation
- Critères de test → génération de tests automatisés
- Exigences du Domaine → application stricte de la conformité
- NFR mesurables → objectifs de performance

---

## Résumé : Qu'est-ce qui fait un excellent PRD BMAD ?

✅ **Haute Densité d'Information** - Chaque phrase a un poids, aucun remplissage
✅ **Exigences Mesurables** - Toutes les FR et NFR sont testables avec des critères spécifiques
✅ **Traçabilité Claire** - Chaque exigence est liée à un besoin utilisateur et à un objectif commercial
✅ **Conscience du Domaine** - Les exigences spécifiques à l'industrie sont auto-détectées et incluses
✅ **Zéro Anti-Patrons** - Pas d'adjectifs subjectifs, de fuite d'implémentation ou de quantificateurs vagues
✅ **Optimisé pour une Double Audience** - Lisible par les humains ET consommable par les LLM
✅ **Format Markdown** - Professionnel, clair, accessible à toutes les parties prenantes

---

**N'oubliez pas :** Le PRD est la fondation. La qualité de ce document se répercute sur chaque phase ultérieure. Un PRD dense, précis et bien tracé rend la conception UX, l'architecture, le découpage des epics et le développement assisté par IA considérablement plus efficaces.
