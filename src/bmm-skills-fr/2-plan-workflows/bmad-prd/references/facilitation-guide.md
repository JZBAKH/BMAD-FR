# Guide de facilitation du PRD

Techniques de conversation par section pour le mode facilitative. Chaque entrée nomme le mouvement de coaching qui rend la conversation de la section productive — pas une checklist, une posture. Saute les sections que le PM a déjà résolues ; passe plus de temps là où la réflexion est mince.

---

## Utilisateurs et personas

**Le mouvement :** Ancrer les personas dans des personnes réelles, pas des archétypes.

Demande au PM de décrire une personne spécifique qu'il a observée ou avec qui il a parlé — pas un type, un humain réel. « Qui est le caissier de ton magasin ? Parle-moi de lui. » Le détail inventé (nom, âge, biographie sortie de nulle part) est du théâtre de personas — l'équipe construit pour une fiction. Si le PM dit « quelqu'un comme... » pousse gentiment : « Y a-t-il une vraie personne à laquelle tu penses ? »

Une fois ancré : qu'est-ce que cette personne veut accomplir dans le temps où elle interagit avec ce produit ? Qu'est-ce qui lui ferait dire que c'est plus facile que ce qu'elle fait aujourd'hui ? Qu'est-ce qui la ferait abandonner ?

Pour l'utilisateur distant ou le persona secondaire : même ancrage, question différente — quelle question a-t-il besoin de voir répondue en moins de dix secondes, et que fait-il s'il ne peut pas l'obtenir ?

Marque tout ce que le PM ne pouvait pas ancrer dans l'observation comme `[ILLUSTRATIVE]` — et note que c'est une hypothèse à valider, pas une spec à construire.

---

## User journeys principaux

**Le mouvement :** Structure narrative, pas liste de cas d'usage.

Pour chaque journey primaire, parcours quatre temps :

- **Scène d'ouverture** — où rencontrons-nous cette personne, quelle est sa situation maintenant, quelle douleur ou besoin est présent ?
- **Action montante** — quelles étapes prend-elle, que découvre-t-elle ou décide-t-elle en chemin ?
- **Climax** — le moment où le produit délivre une vraie valeur ; la chose qu'elle ne pouvait pas faire avant
- **Résolution** — quelle est sa nouvelle réalité ; comment sa situation est-elle différente ?

Après chaque journey : qu'est-ce qui pourrait mal tourner au climax ? Quel est le chemin de récupération ? C'est là que les cas limites qui comptent émergent — non pas des états d'erreur inventés, mais de vrais modes d'échec pour cette personne.

Nomme explicitement quelle capacité chaque journey révèle. « Ce journey requiert que l'opérateur logge une entrée sans internet — ce qui signifie qu'on a besoin d'une décision sur si c'est dans ou hors du MVP. » Les journeys produisent des exigences de capacités ; rends le lien visible.

---

## Décisions clés de feature

**Le mouvement :** Faire émerger les hypothèses qui resteraient sinon silencieuses.

Avant que le brouillon n'existe, il y a des décisions que l'agent prendrait silencieusement et que le PM ne saurait jamais avoir été prises. Ce sont celles qui méritent une conversation de trente secondes :

- Décisions qui pilotent le modèle UX cœur (ex. un enregistrement par jour vs. plusieurs ; qui peut éditer vs. voir ; ce qui se passe quand l'entrée attendue n'existe pas)
- Décisions où le choix « évident » a des conséquences réelles que le PM peut ne pas avoir considérées
- Décisions qui, si erronées, requièrent des changements structurels pour corriger plus tard

Pour chacune : énonce ce que tu as inféré, nomme l'alternative, demande laquelle est correcte. Ne présente pas les options comme un quiz — présente ton inférence et invite à la correction. « Je suppose qu'un tally de ventes par jour remplace plutôt qu'ajoute. C'est correct, ou l'opérateur devrait-il pouvoir logger plusieurs ? » Résous et avance. Ne tague comme `[ASSUMPTION]` que quand la réponse requiert un input externe ou de la recherche que le PM ne peut pas fournir maintenant.

---

## Frontière du scope

**Le mouvement :** Établir la philosophie MVP avant de lister les fonctionnalités.

Avant de demander ce qui est dans ou hors, demande quel genre de MVP c'est :

- **MVP de résolution de problème** — le minimum qui prouve que le problème cœur est résolu ; les bords rugueux acceptables
- **MVP d'expérience** — le minimum qui prouve que le modèle d'interaction fonctionne ; la qualité compte
- **MVP de plateforme** — l'infrastructure minimum sur laquelle d'autres choses peuvent se construire ; la complétude de la base compte
- **MVP de revenu** — le minimum pour lequel quelqu'un paiera ; la viabilité business est le test

La réponse change ce que « minimum » signifie. Un MVP de résolution de problème pour un outil à usage personnel a une logique de scope différente d'un MVP d'expérience visant des utilisateurs non-techniques qui rebondiront à la première confusion.

Une fois la philosophie nommée, les non-goals font autant de travail que les items dans le scope. Sonde les choses que le PM est tenté d'ajouter. « Qu'est-ce qui n'arrête pas presque d'arriver sur la liste ? » Pour chacune : est-ce vraiment hors du MVP, ou doit-ce être dedans parce que le MVP échoue sans ?

---

## Success Metrics

**Le mouvement :** Pousser chaque adjectif vers une mesure.

« Les utilisateurs vont l'adorer » — qu'est-ce que cela signifie en comportement ? « Ce sera rapide » — rapide à quoi, pour qui, mesuré comment ? « Bonne adoption » — quel pourcentage, à quelle date, faisant quoi ? Chaque revendication de qualité a besoin d'une mesure ou ce n'est pas un critère de succès, c'est un souhait.

Pour chaque métrique qui émerge : connecte-la au différenciateur du produit. Si le différenciateur est la simplicité pour les utilisateurs non-techniques, la métrique primaire devrait mesurer si les utilisateurs non-techniques complètent avec succès l'action cœur sans aide — non pas le compte de sessions ou la largeur d'usage de fonctionnalités.

Nomme les contre-métriques explicitement — ce que ce produit ne devrait *pas* optimiser. Elles préviennent la mauvaise chose d'être construite : plus d'entrées par jour n'est pas mieux si le but est des enregistrements quotidiens précis ; des sessions de tableau de bord plus longues peuvent indiquer une IA cassée, non un engagement élevé. Les contre-métriques sont aussi porteuses que les métriques primaires pour les lecteurs en aval.

Pour les produits à enjeux bas ou à usage personnel : une phrase suffit. « Succès : je l'utilise quotidiennement et il remplace le carnet en un mois. » N'impose pas la rigueur métrique là où les enjeux ne le justifient pas.
