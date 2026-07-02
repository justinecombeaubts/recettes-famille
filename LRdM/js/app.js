// Charger le fichier JSON
fetch('recipes.json')
    .then(response => response.json())
    .then(data => {
        const recipesContainer = document.getElementById('recipes-container');

        // Afficher chaque recette
        data.recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';

            recipeCard.innerHTML = `
                <h3>${recipe.title}</h3>
                <p><strong>Catégorie :</strong> ${recipe.category}</p>
                <p><strong>Temps de cuisson :</strong> ${recipe.cook_time} min</p>
                <p><strong>Portions :</strong> ${recipe.servings}</p>
                <p>${recipe.notes || ''}</p>
                <a href="recipe.html?id=${recipe.id}">Voir la recette</a>
            `;

            recipesContainer.appendChild(recipeCard);
        });
    })
    .catch(error => console.error('Erreur de chargement :', error));