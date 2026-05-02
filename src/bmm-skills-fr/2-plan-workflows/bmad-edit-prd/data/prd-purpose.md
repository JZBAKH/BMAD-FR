# Finalité du PRD BMAD

**Le PRD est le sommet de l'entonnoir requis qui alimente tout le travail de développement produit ultérieur dans la BMad Method.**

---

## Qu'est-ce qu'un PRD BMAD ?

Un document à double audience servant :
1. **Les Product Managers humains et les bâtisseurs** — Vision, stratégie, communication avec les parties prenantes
2. **La consommation aval par les LLM** — UX Design → Architecture → Epics → Agents IA de développement

Chaque document successif devient plus adapté à l'IA et plus granulaire.

---

## Philosophie centrale : la densité d'information

**Ratio signal/bruit élevé**

Chaque phrase doit porter du poids informationnel. Les LLM consomment efficacement un contenu précis et dense.

**Anti-patterns (à éliminer) :**
- ❌ « Le système permettra aux utilisateurs de... » → ✅ « Les utilisateurs peuvent... »
- ❌ « Il est important de noter que... » → ✅ Énoncer le fait directement
- ❌ « Afin de... » → ✅ « Pour... »
- ❌ Remplissage conversationnel et bourrage → ✅ Énoncés directs et concis

**Objectif :** Maximum d'information par mot. Zéro fioriture.

---

## La chaîne de traçabilité

**Le PRD démarre la chaîne :**
```
Vision → Success Criteria → User Journeys → Functional Requirements → (future: User Stories)
```

**Dans le PRD, établir :**
- Alignement Vision → Critères de succès
- Couverture Critères de succès → Parcours utilisateur
- Cartographie Parcours utilisateur → Exigence fonctionnelle
- Toutes les exigences traçables aux besoins utilisateurs

**Pourquoi :** Chaque artefact aval (UX, Architecture, Epics, Stories) doit pouvoir remonter à des besoins utilisateurs documentés et à des objectifs métier. Cette chaîne garantit que nous construisons la bonne chose.

---

## Qu'est-ce qui fait de bonnes exigences fonctionnelles ?

### Les FR sont des capacités, pas de l'implémentation

**Bonne FR :** « Les utilisateurs peuvent réinitialiser leur mot de passe via un lien e-mail »
**Mauvaise FR :** « Le système envoie un JWT par e-mail et valide via la base de données » (fuite d'implémentation)

**Bonne FR :** « Le tableau de bord se charge en moins de 2 secondes pour le 95e percentile »
**Mauvaise FR :** « Temps de chargement rapide » (subjectif, non mesurable)

### Critères de qualité SMART

**Spécifique :** Capacité claire et précisément définie
**Mesurable :** Quantifiable avec des critères de test
**Atteignable :** Réaliste dans les contraintes
**Pertinent :** S'aligne avec les objectifs métier
**Traçable :** Lié à une source (résumé exécutif ou parcours utilisateur)

### Anti-patterns des FR

**Adjectifs subjectifs :**
- ❌ « facile à utiliser », « intuitif », « convivial », « rapide », « réactif »
- ✅ Utilisez des métriques : « termine la tâche en moins de 3 clics », « se charge en moins de 2 secondes »

**Fuite d'implémentation :**
- ❌ Noms de technologies, librairies spécifiques, détails d'implémentation
- ✅ Concentrez-vous sur la capacité et les résultats mesurables

**Quantificateurs vagues :**
- ❌ « plusieurs utilisateurs », « plusieurs options », « divers formats »
- ✅ « jusqu'à 100 utilisateurs simultanés », « 3 à 5 options », « formats PDF, DOCX, TXT »

**Critères de test manquants :**
- ❌ « Le système doit fournir des notifications »
- ✅ « Le système doit envoyer des notifications par e-mail dans les 30 secondes suivant l'événement déclencheur »

---

## Qu'est-ce qui fait de bonnes exigences non fonctionnelles ?

### Les NFR doivent être mesurables

**Gabarit :**
```
"The system shall [metric] [condition] [measurement method]"
```

**Exemples :**
- ✅ « Le système doit répondre aux requêtes API en moins de 200 ms pour le 95e percentile, mesuré par la supervision APM »
- ✅ « Le système doit maintenir une disponibilité de 99,9 % pendant les heures ouvrées, mesurée par le SLA du fournisseur cloud »
- ✅ « Le système doit prendre en charge 10 000 utilisateurs simultanés, mesuré par des tests de charge »

### Anti-patterns des NFR

**Affirmations non mesurables :**
- ❌ « Le système doit être scalable » → ✅ « Le système doit absorber une croissance de charge x10 par scaling horizontal »
- ❌ « Haute disponibilité requise » → ✅ « 99,9 % de disponibilité mesurée par le SLA du fournisseur cloud »

**Contexte manquant :**
- ❌ « Temps de réponse inférieur à 1 seconde » → ✅ « Temps de réponse API inférieur à 1 seconde pour le 95e percentile sous charge normale »

---

## Exigences spécifiques au domaine

**Détection automatique et application selon le contexte du projet**

Certaines industries ont des exigences obligatoires qui doivent être présentes :

- **Santé :** Règles HIPAA Privacy & Security, chiffrement des PHI, journalisation d'audit, MFA
- **Fintech :** PCI-DSS Niveau 1, conformité AML/KYC, contrôles SOX, pistes d'audit financières
- **GovTech :** Cadre NIST, accessibilité Section 508 (WCAG 2.1 AA), FedRAMP, résidence des données
- **E-Commerce :** PCI-DSS pour les paiements, exactitude des stocks, calcul de taxes par juridiction

**Pourquoi :** L'absence de ces exigences dans le PRD signifie qu'elles seront oubliées dans l'architecture et l'implémentation, créant un retravail coûteux. Lors de la création du PRD, il existe une étape pour couvrir cela — lors de la validation, nous voulons nous assurer que ce point a bien été traité. À cette fin, les étapes utiliseront un domain-complexity.csv et un project-types.csv.

---

## Structure du document (Markdown, lisible par l'humain)

### Sections requises
1. **Résumé exécutif** — Vision, élément différenciateur, utilisateurs cibles
2. **Critères de succès** — Résultats mesurables (SMART)
3. **Périmètre produit** — Phases MVP, Croissance, Vision
4. **Parcours utilisateur** — Couverture exhaustive
5. **Exigences du domaine** — Conformité spécifique au secteur (le cas échéant)
6. **Analyse de l'innovation** — Différenciation concurrentielle (le cas échéant)
7. **Exigences par type de projet** — Besoins spécifiques à la plateforme
8. **Exigences fonctionnelles** — Contrat de capacités (FR)
9. **Exigences non fonctionnelles** — Attributs de qualité (NFR)

### Mise en forme pour la double consommation

**Pour les humains :**
- Langage clair et professionnel
- Flux logique de la vision aux exigences
- Facile à examiner et à approuver pour les parties prenantes

**Pour les LLM :**
- En-têtes de niveau 2 ## pour toutes les sections principales (permet l'extraction)
- Structure et patterns cohérents
- Langage précis et testable
- Forte densité d'information

---

## Impact aval

**Comment le PRD alimente les artefacts suivants :**

**UX Design :**
- Parcours utilisateur → flux d'interaction
- FR → exigences de design
- Critères de succès → métriques UX

**Architecture :**
- FR → capacités système
- NFR → décisions d'architecture
- Exigences du domaine → architecture de conformité
- Exigences par type de projet → choix de plateforme

**Epics & Stories (créés après l'architecture) :**
- FR → user stories (1 FR peut potentiellement correspondre à 1 à 3 stories)
- Critères d'acceptation → tests d'acceptation des stories
- Priorité → séquencement des sprints
- Traçabilité → les stories remontent à la vision

**Agents IA de développement :**
- Exigences précises → clarté d'implémentation
- Critères de test → génération automatique de tests
- Exigences du domaine → application de la conformité
- NFR mesurables → cibles de performance

---

## Synthèse : qu'est-ce qui fait un excellent PRD BMAD ?

✅ **Forte densité d'information** — Chaque phrase porte du poids, zéro fioriture
✅ **Exigences mesurables** — Toutes les FR et NFR sont testables avec des critères spécifiques
✅ **Traçabilité claire** — Chaque exigence est liée à un besoin utilisateur et à un objectif métier
✅ **Conscience du domaine** — Exigences spécifiques au secteur détectées et incluses automatiquement
✅ **Zéro anti-pattern** — Aucun adjectif subjectif, fuite d'implémentation ou quantificateur vague
✅ **Optimisé pour la double audience** — Lisible par l'humain ET consommable par les LLM
✅ **Format Markdown** — Professionnel, propre, accessible à toutes les parties prenantes

---

**Rappel :** Le PRD est la fondation. La qualité ici se répercute sur chaque phase ultérieure. Un PRD dense, précis et bien tracé rend le design UX, l'architecture, le découpage en epics et le développement IA nettement plus efficaces.
