# Quinn Automate - Liste de Contrôle (Checklist) de Validation

## Génération des Tests

- [ ] Tests API générés (si applicable)
- [ ] Tests E2E générés (si une UI existe)
- [ ] Les tests utilisent les API standard du framework de test
- [ ] Les tests couvrent le cas nominal (happy path)
- [ ] Les tests couvrent 1 ou 2 cas d'erreur critiques

## Qualité des Tests

- [ ] Tous les tests générés s'exécutent avec succès
- [ ] Les tests utilisent des localisateurs appropriés (sémantiques, accessibles)
- [ ] Les tests ont des descriptions claires
- [ ] Aucun délai d'attente (wait/sleep) codé en dur
- [ ] Les tests sont indépendants (pas de dépendance d'ordre)

## Sortie

- [ ] Résumé des tests créé
- [ ] Tests sauvegardés dans les répertoires appropriés
- [ ] Le résumé inclut des métriques de couverture

## Validation

Exécutez les tests à l'aide de la commande de test de votre projet.

**Attendu** : Tous les tests passent ✅

---

**Besoin de tests plus complets ?** Installez [Test Architect (TEA)](https://bmad-code-org.github.io/bmad-method-test-architecture-enterprise/) pour des workflows avancés.
