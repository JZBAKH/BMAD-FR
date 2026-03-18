# Étape 5 : Exigences Spécifiques au Domaine (Domain-Specific Requirements) (Optionnel)

**Progression : Étape 5 sur 13** - Suivante : Focus sur l'Innovation (Innovation Focus)

## OBJECTIF DE L'ÉTAPE :

Uniquement pour les domaines complexes qui ont une correspondance dans `../data/domain-complexity.csv`, explorer les contraintes spécifiques au domaine, les exigences de conformité, et les considérations techniques qui façonnent le produit.

## RÈGLES D'EXÉCUTION OBLIGATOIRES (À LIRE EN PREMIER) :

### Règles Universelles :

- 🛑 NE JAMAIS générer de contenu sans l'intervention de l'utilisateur
- 📖 CRITIQUE : Lisez le fichier d'étape complet avant d'entreprendre toute action
- 🔄 CRITIQUE : Lors du chargement de l'étape suivante avec 'C', assurez-vous que le fichier entier est lu
- ✅ ABORDEZ TOUJOURS cela comme une découverte collaborative entre pairs PM
- 📋 VOUS ÊTES UN FACILITATEUR, pas un générateur de contenu
- ✅ VOUS DEVEZ TOUJOURS PARLER ET PRODUIRE LE RÉSULTAT dans votre style de communication d'Agent avec la `communication_language` configurée.
- ✅ VOUS DEVEZ TOUJOURS ÉCRIRE tout contenu d'artefact et de document dans la `document_output_language`.

### Renforcement du Rôle :

- ✅ Vous êtes un facilitateur PM (Product Manager) orienté produit collaborant avec un pair expert
- ✅ Nous nous engageons dans un dialogue collaboratif, pas dans un modèle commande-réponse
- ✅ Vous apportez une réflexion structurée et des compétences en facilitation, tandis que l'utilisateur apporte une expertise du domaine

### Règles Spécifiques à l'Étape :

- 🎯 Cette étape est OPTIONNELLE - seulement nécessaire pour les domaines complexes
- 🚫 PASSEZ (SKIP) si la complexité du domaine issue de `step-02` est "faible" (low)
- 💬 APPROCHE : Conversation naturelle pour découvrir les besoins spécifiques au domaine
- 🎯 Concentrez-vous sur les contraintes, la conformité, et les modèles du domaine (domain patterns)

## PROTOCOLES D'EXÉCUTION :

- 🎯 Vérifiez la complexité du domaine à partir de la classification de l'étape 2 en premier
- ⚠️ Si la complexité est "faible" (low), proposez de sauter (skip) cette étape
- ⚠️ Présentez le menu A/P/C après avoir défini (ou sauté) les exigences du domaine
- 💾 Sauvegardez UNIQUEMENT lorsque l'utilisateur choisit C (Continuer)
- 📖 Mettez à jour le frontmatter du fichier de sortie, en ajoutant le nom de cette étape à la fin de la liste `stepsCompleted`
- 🚫 INTERDICTION de charger l'étape suivante tant que C n'a pas été sélectionné

## LIMITES DU CONTEXTE :

- La classification du domaine issue de `step-02` est disponible
- Si la complexité est faible, cette étape peut être sautée (skipped)
- Les données CSV du domaine fournissent la référence de complexité
- Concentrez-vous sur les contraintes spécifiques au domaine, pas sur les exigences générales

## VOTRE TÂCHE :

Pour les domaines complexes, explorer ce qui rend ce domaine spécial :
- **Exigences de conformité** - réglementations, normes, certifications
- **Contraintes techniques** - sécurité, confidentialité, exigences d'intégration
- **Modèles de domaine (Domain patterns)** - patterns courants, meilleures pratiques, anti-patterns
- **Risques et atténuations (mitigations)** - qu'est-ce qui pourrait mal tourner, comment le prévenir

## SÉQUENCE DE DÉCOUVERTE DU DOMAINE :

### 1. Vérifier la Complexité du Domaine

**Revoir la classification de l'étape 02 :**

- Quel est le niveau de complexité du domaine ? (faible/moyen/élevé - low/medium/high)
- Quel est le domaine spécifique ? (santé, fintech, éducation, etc.)

**Si la complexité est FAIBLE (LOW) :**

Proposez de sauter (skip) :
"La complexité du domaine selon notre découverte est faible. Nous n'aurons peut-être pas besoin d'exigences profondes spécifiques au domaine. Souhaitez-vous :
- [C] Sauter cette étape et passer à l'Innovation
- [D] Explorer le domaine malgré tout"

**Si la complexité est MOYENNE (MEDIUM) ou ÉLEVÉE (HIGH) :**

Poursuivez l'exploration du domaine.

### 2. Charger les Données de Référence du Domaine

**Tentez une recherche de données sous la forme d'un sous-processus (subprocess) :**

"Votre tâche : Rechercher les données dans ../data/domain-complexity.csv

**Critères de recherche :**
- Trouver la ligne où `domain` correspond à {{domainFromStep02}}

**Format de retour :**
Retournez UNIQUEMENT la ligne correspondante sous forme d'objet formaté en YAML avec ces champs :
domain, complexity, typical_concerns, compliance_requirements

**Ne retournez PAS le fichier CSV complet - seulement la ligne correspondante.**"

**Dégradation Gracieuse (si l'outil de Tâche est indisponible) :**
- Chargez le fichier CSV directement
- Trouvez manuellement la ligne correspondante
- Extrayez les champs requis
- Comprenez les préoccupations typiques et les exigences de conformité

### 3. Explorer les Préoccupations Spécifiques au Domaine

**Commencez avec ce que vous savez :**

Reconnaissez le domaine et explorez ce qui le rend complexe :
- Quelles réglementations s'appliquent ? (HIPAA, PCI-DSS, RGPD, SOX, etc.)
- Quelles normes sont importantes ? (ISO, NIST, normes spécifiques au domaine)
- Quelles certifications sont nécessaires ? (sécurité, confidentialité, spécifiques au domaine)
- Quelles intégrations sont requises ? (systèmes DME, processeurs de paiement, etc.)

**Explorer les contraintes techniques :**
- Exigences de sécurité (chiffrement, journaux d'audit, contrôle d'accès)
- Exigences de confidentialité (traitement des données, consentement, conservation)
- Exigences de performance (temps réel, traitement par lots, latence)
- Exigences de disponibilité (temps de fonctionnement/uptime, reprise après sinistre/disaster recovery)

### 4. Documenter les Exigences du Domaine

**Structurez les exigences autour des préoccupations clés :**

```markdown
### Conformité & Réglementation
- [Exigences spécifiques]

### Contraintes Techniques
- [Besoins de sécurité, confidentialité, performance]

### Exigences d'Intégration
- [Systèmes requis et flux de données]

### Atténuation des Risques
- [Risques spécifiques au domaine et comment les traiter]
```

### 5. Valider l'Exhaustivité

**Vérifier avec l'utilisateur :**

"Y a-t-il d'autres préoccupations spécifiques au domaine que nous devrions prendre en compte ? Pour [ce domaine], qu'est-ce qui est généralement négligé ou oublié ?"

### N. Présenter les OPTIONS DU MENU

Affichez : "**Sélectionnez :** [A] Élicitation Avancée (Advanced Elicitation) [P] Mode Party (Party Mode) [C] Continuer - Sauvegarder et passer à l'Innovation (Étape 6 sur 13)"

#### Logique de Gestion du Menu :
- SI A : Invoquez la compétence `bmad-advanced-elicitation`, et lorsque vous avez terminé, réaffichez le menu
- SI P : Invoquez la compétence `bmad-party-mode`, et lorsque vous avez terminé, réaffichez le menu
- SI C : Sauvegardez le contenu dans `{outputFile}`, mettez à jour le frontmatter, puis lisez intégralement et suivez : `./step-06-innovation.md`
- SI Autres commentaires ou requêtes : aidez l'utilisateur à répondre puis [Réafficher les Options du Menu](#n-presenter-les-options-du-menu)

#### RÈGLES D'EXÉCUTION :
- TOUJOURS s'arrêter et attendre l'entrée de l'utilisateur après la présentation du menu
- NE passer à l'étape suivante QUE lorsque l'utilisateur sélectionne 'C'
- Après l'exécution d'autres options du menu, retournez à ce menu

## AJOUTER AU DOCUMENT (APPEND)

Lorsque l'utilisateur sélectionne 'C', ajoutez (append) à `{outputFile}` :

```markdown
## Exigences Spécifiques au Domaine

{{discovered domain requirements ou exigences du domaine découvertes}}
```

Si l'étape a été sautée (skipped), n'ajoutez rien et continuez.

## NOTE CRITIQUE DE FIN D'ÉTAPE

UNIQUEMENT LORSQUE [l'option de continuation C] est sélectionnée et que [le contenu est sauvegardé ou sauté], vous lirez alors intégralement et suivrez : `./step-06-innovation.md` pour explorer l'innovation.

---

## 🚨 MÉTRIQUES DE SUCCÈS/ÉCHEC DU SYSTÈME

### ✅ SUCCÈS :

- Complexité du domaine vérifiée avant de poursuivre
- Proposition de sauter l'étape si la complexité est faible
- Conversation naturelle explorant les préoccupations du domaine
- Exigences de conformité, techniques, et d'intégration identifiées
- Risques spécifiques au domaine documentés avec leurs mesures d'atténuation
- L'utilisateur a validé l'exhaustivité
- Le contenu est correctement sauvegardé (ou l'étape sautée) lorsque C est sélectionné

### ❌ ÉCHEC DU SYSTÈME :

- Ne pas vérifier la complexité du domaine en premier lieu
- Ne pas proposer de sauter l'étape pour les domaines à faible complexité (low-complexity)
- Manquer des exigences de conformité critiques
- Prendre à la légère les données réglementaires sans poser les questions vitales
- Formuler des lignes génériques inutilisables ou ne pas s'armer/absorber le contexte
- Écraser tout ce travail d'expertise du domaine sans l'approbation humaine !

**Règle Principale :** Cette étape est OPTIONNELLE pour les domaines simples. Pour les domaines complexes, concentrez-vous implacablement sur la conformité, les contraintes, et les modèles du domaine. Une vraie conversation naturelle.
