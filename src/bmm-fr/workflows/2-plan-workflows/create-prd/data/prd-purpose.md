# Objectif du PRD BMAD

**Le PRD est le sommet de l'entonnoir obligatoire qui alimente tout le travail de développement produit ultérieur dans la Méthode BMAD.**

---

## Qu'est-ce qu'un PRD BMAD ?

Un document à double audience servant à :

1. **Aux Product Managers et constructeurs humains** - Vision, stratégie, communication avec les parties prenantes.
2. **À la consommation en aval par les LLM** - Design UX → Architecture → Epics → Agents IA de développement.

Chaque document successif devient plus adapté à l'IA et plus granulaire.

---

## Philosophie Fondamentale : Densité d'Information

**Ratio Signal/Bruit Élevé**

Chaque phrase doit porter un poids informationnel. Les LLM consomment du contenu précis et dense de manière efficace.

**Anti-Modèles (À Éliminer) :**

- ❌ "Le système permettra aux utilisateurs de..." → ✅ "Les utilisateurs peuvent..."
- ❌ "Il est important de noter que..." → ✅ Énoncez le fait directement.
- ❌ "Afin de..." → ✅ "Pour..."
- ❌ Remplissage conversationnel et fioritures → ✅ Énoncés directs et concis.

**Objectif :** Information maximale par mot. Zéro blabla.

---

## La Chaîne de Traçabilité

**Le PRD lance la chaîne :**

```
Vision → Critères de Succès → Parcours Utilisateurs → Exigences Fonctionnelles → (futur : User Stories)
```

**Dans le PRD, établissez :**

- Alignement Vision → Critères de Succès
- Couverture Critères de Succès → Parcours Utilisateurs
- Mappage Parcours Utilisateurs → Exigences Fonctionnelles
- Toutes les exigences traçables aux besoins des utilisateurs

**Pourquoi :** Chaque artefact en aval (UX, Architecture, Epics, Stories) doit remonter aux besoins des utilisateurs et aux objectifs commerciaux documentés. Cette chaîne garantit que nous construisons la bonne chose.

---

## Qu'est-ce qu'une Excellente Exigence Fonctionnelle ?

### Les EF sont des Capacités, pas de l'Implémentation

**Bonne EF :** "Les utilisateurs peuvent réinitialiser leur mot de passe via un lien envoyé par e-mail."
**Mauvaise EF :** "Le système envoie un JWT par e-mail et valide avec la base de données." (fuite d'implémentation)

**Bonne EF :** "Le tableau de bord se charge en moins de 2 secondes pour le 95e percentile."
**Mauvaise EF :** "Temps de chargement rapide." (subjectif, non mesurable)

### Critères de Qualité SMART

**Spécifique :** Capacité claire et précisément définie.
**Mesurable :** Quantifiable avec des critères de test.
**Atteignable :** Réaliste compte tenu des contraintes.
**Pertinent :** Aligné avec les objectifs commerciaux.
**Traçable :** Lié à la source (résumé analytique ou parcours utilisateur).

### Anti-Modèles d'EF

**Adjectifs Subjectifs :**

- ❌ "facile à utiliser", "intuitif", "convivial", "rapide", "réactif"
- ✅ Utilisez des métriques : "termine la tâche en moins de 3 clics", "se charge en moins de 2 secondes"

**Fuite d'Implémentation :**

- ❌ Noms de technologies, bibliothèques spécifiques, détails d'implémentation.
- ✅ Concentrez-vous sur la capacité et les résultats mesurables.

**Quantificateurs Vagues :**

- ❌ "plusieurs utilisateurs", "quelques options", "divers formats"
- ✅ "jusqu'à 100 utilisateurs simultanés", "3 à 5 options", "formats PDF, DOCX, TXT"

**Critères de Test Manquants :**

- ❌ "Le système fournira des notifications."
- ✅ "Le système enverra des notifications par e-mail dans les 30 secondes suivant l'événement déclencheur."

---

## Qu'est-ce qu'une Excellente Exigence Non Fonctionnelle ?

### Les ENF Doivent Être Mesurables

**Modèle :**

```
"Le système doit [métrique] [condition] [méthode de mesure]"
```

**Exemples :**

- ✅ "Le système doit répondre aux requêtes API en moins de 200ms pour le 95e percentile, tel que mesuré par la surveillance APM."
- ✅ "Le système doit maintenir une disponibilité de 99,9 % pendant les heures de bureau, telle que mesurée par le SLA du fournisseur cloud."
- ✅ "Le système doit supporter 10 000 utilisateurs simultanés, tel que mesuré par les tests de charge."

### Anti-Modèles d'ENF

**Allégations Non Mesurables :**

- ❌ "Le système doit être évolutif." → ✅ "Le système doit gérer une croissance de charge de 10x via une mise à l'échelle horizontale."
- ❌ "Haute disponibilité requise." → ✅ "99,9 % de disponibilité telle que mesurée par le SLA du fournisseur cloud."

**Manque de Contexte :**

- ❌ "Temps de réponse inférieur à 1 seconde." → ✅ "Temps de réponse de l'API inférieur à 1 seconde pour le 95e percentile sous charge normale."

---

## Exigences Spécifiques au Domaine

**Auto-Détection et Application Basées sur le Contexte du Projet**

Certaines industries ont des exigences obligatoires qui doivent être présentes :

- **Santé :** Règles de confidentialité et de sécurité HIPAA, cryptage des PHI, journaux d'audit, MFA.
- **Fintech :** PCI-DSS niveau 1, conformité AML/KYC, contrôles SOX, pistes d'audit financier.
- **GovTech :** Cadre NIST, accessibilité section 508 (WCAG 2.1 AA), FedRAMP, résidence des données.
- **E-Commerce :** PCI-DSS pour les paiements, précision des stocks, calcul des taxes par juridiction.

**Pourquoi :** Oublier ces exigences dans le PRD signifie qu'elles seront oubliées dans l'architecture et l'implémentation, créant des reprises coûteuses. Lors de la création du PRD, il y a une étape pour couvrir cela - lors de la validation, nous voulons nous assurer que cela a été couvert. À cette fin, les étapes utiliseront `domain-complexity.csv` et `project-types.csv`.

---

## Structure du Document (Markdown, Lisible par l'Homme)

### Sections Requises

1. **Résumé Analytique** - Vision, différenciateur, utilisateurs cibles.
2. **Critères de Succès** - Résultats mesurables (SMART).
3. **Périmètre du Produit** - Phases MVP, Croissance, Vision.
4. **Parcours Utilisateurs** - Couverture complète.
5. **Exigences Métier/Domaine** - Conformité spécifique à l'industrie (si applicable).
6. **Analyse de l'Innovation** - Différenciation concurrentielle (si applicable).
7. **Exigences selon le Type de Projet** - Besoins spécifiques à la plateforme.
8. **Exigences Fonctionnelles** - Contrat de capacité (EF).
9. **Exigences Non Fonctionnelles** - Attributs de qualité (ENF).

### Formatage pour la Double Consommation

**Pour les Humains :**

- Langage clair et professionnel.
- Flux logique de la vision vers les exigences.
- Facile à réviser et à approuver pour les parties prenantes.

**Pour les LLM :**

- Titres de niveau 2 (##) pour toutes les sections principales (permet l'extraction).
- Structure et modèles cohérents.
- Langage précis et testable.
- Haute densité d'information.

---

## Impact en Aval

**Comment le PRD Nourrit les Artefacts Suivants :**

**Design UX :**

- Parcours utilisateurs → flux d'interaction
- EF → exigences de conception
- Critères de succès → métriques UX

**Architecture :**

- EF → capacités du système
- ENF → décisions architecturales
- Exigences de domaine → architecture de conformité
- Exigences selon le type de projet → choix de plateforme

**Epics & Stories (créés après l'architecture) :**

- EF → user stories (1 EF peut potentiellement correspondre à 1-3 stories)
- Critères d'acceptation → tests d'acceptation des stories
- Priorité → séquençage des sprints
- Traçabilité → les stories remontent à la vision

**Agents IA de Développement :**

- Exigences précises → clarté de l'implémentation
- Critères de test → génération de tests automatisés
- Exigences de domaine → application de la conformité
- ENF mesurables → cibles de performance

---

## Résumé : Qu'est-ce qu'un Excellent PRD BMAD ?

✅ **Haute Densité d'Information** - Chaque phrase a du poids, zéro blabla.
✅ **Exigences Mesurables** - Toutes les EF et ENF sont testables avec des critères spécifiques.
✅ **Traçabilité Claire** - Chaque exigence est liée à un besoin utilisateur et à un objectif métier.
✅ **Conscience du Domaine** - Les exigences spécifiques à l'industrie sont auto-détectées et incluses.
✅ **Zéro Anti-Modèle** - Pas d'adjectifs subjectifs, pas de fuite d'implémentation, pas de quantificateurs vagues.
✅ **Optimisé pour Double Audience** - Lisible par l'homme ET consomable par l'IA.
✅ **Format Markdown** - Professionnel, propre, accessible à toutes les parties prenantes.

---

**Rappelez-vous :** Le PRD est la fondation. La qualité ici se répercute sur chaque phase ultérieure. Un PRD dense, précis et bien tracé rend le design UX, l'architecture, le découpage en epics et le développement par l'IA radicalement plus efficaces.
