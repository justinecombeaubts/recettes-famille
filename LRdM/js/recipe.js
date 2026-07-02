// Récupérer l'ID de la recette depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// Charger le fichier JSON
fetch('recipes.json')
    .then(response => response.json())
    .then(data => {
        const recipe = data.recipes.find(r => r.id == recipeId);
        if (!recipe) {
            document.getElementById('recipe-details').innerHTML = '<p>Recette non trouvée.</p>';
            return;
        }

        // Afficher les détails de la recette
        document.getElementById('recipe-title').textContent = recipe.title;
        document.getElementById('recipe-category').textContent = recipe.category;
        document.getElementById('recipe-cook-time').textContent = recipe.cook_time;
        document.getElementById('recipe-servings').textContent = recipe.servings;
        document.getElementById('recipe-notes').textContent = recipe.notes || '';

        // Afficher les ingrédients
        const ingredientsList = document.getElementById('recipe-ingredients');
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = `${ingredient.quantity} ${ingredient.unit || ''} ${ingredient.name}`;
            ingredientsList.appendChild(li);
        });

        // Afficher les étapes
        const stepsList = document.getElementById('recipe-steps');
        recipe.steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step.instruction;
            stepsList.appendChild(li);
        });
    })
    .catch(error => console.error('Erreur de chargement :', error));