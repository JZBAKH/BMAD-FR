# Liste de contrôle de validation de la planification du sprint

## Validation de base

### Vérification de la couverture complète

- [ ] Chaque epic trouvée dans les fichiers epic\*.md apparaît dans sprint-status.yaml
- [ ] Chaque story trouvée dans les fichiers epic\*.md apparaît dans sprint-status.yaml
- [ ] Chaque epic a une entrée de rétrospective correspondante
- [ ] Aucun élément dans sprint-status.yaml n'existe pas dans les fichiers d'epics

### Vérification de l'analyse (Parsing)

Comparez les fichiers d'epics avec le fichier sprint-status.yaml généré :

```
Fichiers d'Epics Contiennent :          Statut du Sprint Contient :
✓ Epic 1                                ✓ epic-1: [status]
  ✓ Story 1.1: Auth Utilisateur         ✓ 1-1-user-auth: [status]
  ✓ Story 1.2: Gestion Compte           ✓ 1-2-account-mgmt: [status]
  ✓ Story 1.3: Nommage Plantes          ✓ 1-3-plant-naming: [status]
                                        ✓ epic-1-retrospective: [status]
✓ Epic 2                                ✓ epic-2: [status]
  ✓ Story 2.1: Modèle Personnalité      ✓ 2-1-personality-model: [status]
  ✓ Story 2.2: Interface Chat           ✓ 2-2-chat-interface: [status]
                                        ✓ epic-2-retrospective: [status]
```

### Vérification finale

- [ ] Le nombre total d'epics correspond
- [ ] Le nombre total de stories correspond
- [ ] Tous les éléments sont dans l'ordre attendu (epic, stories, rétrospective)
