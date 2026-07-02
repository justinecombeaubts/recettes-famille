# 🍳 Les recettes de maman

> **Un projet familial pour conserver et partager nos recettes préférées.**

---

## 📌 À propos du projet

**Les recettes de maman** est une application web simple et intuitive qui permet de :
- **Consulter** une base de données de recettes familiales.
- **Rechercher** des recettes par nom ou ingrédient.
- **Ajouter** de nouvelles recettes via un formulaire dédié.
- **Organiser** les recettes par catégories (desserts, plats principaux, entrées, etc.).

Ce projet est conçu pour être utilisé localement ou hébergé sur un serveur web.

⚠️ **Note importante** : Le code source partagé ici ne contient **pas l'intégralité des recettes familiales**, car celles-ci sont des **secrets de famille** et ne doivent pas être rendus publics. Seules les structures de base et quelques exemples sont inclus.

---

## 🛠️ Structure du projet

```
recettes-famille/
├── LRdM/                          # Dossier principal de l'application
│   ├── index.html                 # Page d'accueil (liste des recettes)
│   ├── add-recipe.html            # Formulaire pour ajouter une recette
│   ├── recipe.html                # Template pour afficher une recette
│   ├── recipes.json               # Base de données des recettes (JSON)
│   ├── css/                       # Styles CSS
│   │   └── style.css
│   └── js/                        # Scripts JavaScript
│       └── app.js                 # Logique principale de l'application
└── README.md                      # Ce fichier
```

---

## 🚀 Comment utiliser le projet ?

### 1️⃣ **Cloner le dépôt**
```bash
git clone https://github.com/justinecombeaubts/recettes-famille.git
cd recettes-famille
```

### 2️⃣ **Ouvrir l'application**
- Ouvrez le fichier `LRdM/index.html` dans votre navigateur web préféré.
- Ou utilisez un serveur local (recommandé pour éviter les problèmes de CORS) :
  ```bash
  # Avec Python (si installé)
  python3 -m http.server 8000
  # Puis ouvrez http://localhost:8000/LRdM/index.html
  ```

### 3️⃣ **Ajouter une recette**
- Cliquez sur le lien **"Ajouter une recette"** dans la barre de navigation.
- Remplissez le formulaire et validez.
- La recette sera ajoutée à la base de données `recipes.json`.

### 4️⃣ **Rechercher une recette**
- Utilisez la barre de recherche sur la page d'accueil pour filtrer les recettes par nom.

---

## 📝 Format des recettes

Les recettes sont stockées dans le fichier `LRdM/recipes.json` au format suivant :

```json
{
  "metadata": {
    "name": "Les recettes de maman",
    "version": "1.0",
    "last_updated": "2026-05-10",
    "description": "Base de données JSON des recettes familiales."
  },
  "categories": [
    { "id": 1, "name": "Dessert" },
    { "id": 2, "name": "Plat principal" },
    ...
  ],
  "recipes": [
    {
      "id": 1,
      "title": "Tarte au citron meringuée maison",
      "category": "Dessert",
      "servings": 8,
      "oven_temperature": "180°C",
      "cook_time": 40,
      "image_url": null,
      "notes": "Laissez refroidir avant de découper.",
      "ingredients": [
        { "name": "Farine", "quantity": 200, "unit": "g" },
        { "name": "Beurre", "quantity": 100, "unit": "g" },
        ...
      ],
      "steps": [
        "Préchauffez le four à 180°C.",
        "Préparez la pâte sucrée.",
        ...
      ]
    }
  ]
}
```

---

## 🎨 Personnalisation

### Ajouter une catégorie
1. Ouvrez `recipes.json`.
2. Ajoutez une nouvelle entrée dans le tableau `categories` :
   ```json
   { "id": 10, "name": "Nouvelle catégorie" }
   ```
3. Utilisez cette catégorie pour de nouvelles recettes.

### Modifier le style
- Les styles sont définis dans `LRdM/css/style.css`.
- Vous pouvez modifier les couleurs, polices, ou la mise en page selon vos préférences.

### Ajouter des fonctionnalités
- Le code JavaScript se trouve dans `LRdM/js/app.js`.
- Exemples de fonctionnalités à ajouter :
  - Filtres par catégorie.
  - Tri par temps de préparation.
  - Import/export de recettes.

---

## 📦 Technologies utilisées

- **HTML5** : Structure des pages.
- **CSS3** : Styles et mise en page.
- **JavaScript** : Logique de l'application (recherche, affichage dynamique).
- **JSON** : Stockage des données (recettes, catégories, etc.).

---

## 🤝 Contribuer

Si vous souhaitez contribuer à ce projet :
1. Forkez le dépôt.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`).
3. Commitez vos changements (`git commit -m "Ajout de ma fonctionnalité"`).
4. Poussez vers votre fork (`git push origin feature/ma-fonctionnalite`).
5. Ouvrez une **Pull Request** vers ce dépôt.

---

## 📜 Licence

Ce projet est **open source** et peut être utilisé librement pour un usage personnel ou familial. Pour tout usage commercial, veuillez contacter l'auteure.

---

## 📬 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter via [GitHub](https://github.com/justinecombeaubts).

---

> **Bon appétit !** 🍽️
