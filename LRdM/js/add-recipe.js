// ===== CHARGEMENT INITIAL =====
document.addEventListener('DOMContentLoaded', () => {
    // Charger les catégories depuis recipes.json
    loadCategories();

    // Initialiser les listes dynamiques (1 ingrédient et 1 étape par défaut)
    addIngredient();
    addStep();

    // Gérer la soumission du formulaire
    const form = document.getElementById('recipe-form');
    form.addEventListener('submit', handleSubmit);

    // Gérer les boutons "+ Ajouter"
    document.getElementById('add-ingredient-btn').addEventListener('click', addIngredient);
    document.getElementById('add-step-btn').addEventListener('click', addStep);
});

// ===== CHARGEMENT DES CATÉGORIES =====
function loadCategories() {
    fetch('./recipes.json')
        .then(response => {
            if (!response.ok) throw new Error("Fichier JSON introuvable");
            return response.json();
        })
        .then(data => {
            const categorySelect = document.getElementById('category');
            // Ajouter les catégories depuis le JSON
            if (data.categories && data.categories.length > 0) {
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.name;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                });
            }
            // Ajouter des catégories par défaut si le JSON est vide
            const defaultCategories = ["Entrée", "Plat principal", "Dessert", "Poisson", "Veggie", "Fromage", "Base", "Accompagnement", "Apéro"];
            defaultCategories.forEach(cat => {
                if (!Array.from(categorySelect.options).some(opt => opt.value === cat)) {
                    const option = document.createElement('option');
                    option.value = cat;
                    option.textContent = cat;
                    categorySelect.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error("Erreur de chargement des catégories :", error);
            // Catégories par défaut en cas d'erreur
            const defaultCategories = ["Entrée", "Plat principal", "Dessert", "Poisson", "Veggie", "Fromage", "Base", "Accompagnement", "Apéro"];
            const categorySelect = document.getElementById('category');
            defaultCategories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                categorySelect.appendChild(option);
            });
        });
}

// ===== GESTION DES INGRÉDIENTS =====
function addIngredient() {
    const container = document.getElementById('ingredients-container');
    const index = container.children.length;

    const ingredientRow = document.createElement('div');
    ingredientRow.className = 'dynamic-row';
    ingredientRow.innerHTML = `
        <div class="form-group">
            <input type="text" name="ingredients[${index}][name]" placeholder="Nom (ex: Farine)" required>
        </div>
        <div class="form-group">
            <input type="text" name="ingredients[${index}][quantity]" placeholder="Quantité (ex: 200)" required>
        </div>
        <div class="form-group">
            <input type="text" name="ingredients[${index}][unit]" placeholder="Unité (ex: g, ml)">
        </div>
        <button type="button" class="remove-btn" onclick="removeDynamicRow(this, 'ingredient')">
            <i class="fas fa-trash-alt"></i>
        </button>
    `;
    container.appendChild(ingredientRow);
}

function removeDynamicRow(button, type) {
    const container = button.closest('.dynamic-list');
    if (container.children.length > 1) {
        button.parentElement.remove();
        // Réindexer les noms des champs si nécessaire
        reindexDynamicFields(container, type);
    } else {
        alert(`Une recette doit avoir au moins un${type === 'ingredient' ? ' ingrédient' : 'e étape'}.`);
    }
}

function reindexDynamicFields(container, type) {
    const rows = container.querySelectorAll('.dynamic-row');
    rows.forEach((row, index) => {
        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            const name = input.getAttribute('name');
            if (name) {
                const newName = name.replace(/\[\d+\]/, `[${index}]`);
                input.setAttribute('name', newName);
            }
        });
    });
}

// ===== GESTION DES ÉTAPES =====
function addStep() {
    const container = document.getElementById('steps-container');
    const index = container.children.length;

    const stepRow = document.createElement('div');
    stepRow.className = 'dynamic-row';
    stepRow.innerHTML = `
        <div class="form-group step-number">
            <input type="number" name="steps[${index}][step_number]" value="${index + 1}" min="1" required>
        </div>
        <div class="form-group full-width">
            <input type="text" name="steps[${index}][instruction]" placeholder="Description de l'étape (ex: Mélanger les ingrédients...)" required>
        </div>
        <button type="button" class="remove-btn" onclick="removeDynamicRow(this, 'step')">
            <i class="fas fa-trash-alt"></i>
        </button>
    `;
    container.appendChild(stepRow);
}

// ===== GESTION DE LA SOUMISSION =====
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Récupérer les données du formulaire
    const recipeData = {
        id: Date.now(), // ID unique basé sur le timestamp
        title: formData.get('title'),
        category: formData.get('category'),
        servings: formData.get('servings') ? parseInt(formData.get('servings')) : null,
        oven_temperature: formData.get('oven_temperature'),
        cook_time: formData.get('cook_time') ? parseInt(formData.get('cook_time')) : null,
        image_url: formData.get('image_url'),
        notes: formData.get('notes'),
        ingredients: [],
        steps: []
    };

    // Récupérer les ingrédients
    const ingredientIndices = [...new Set(formData.getAll('ingredients[][name]').map((_, i) => i))];
    ingredientIndices.forEach(i => {
        recipeData.ingredients.push({
            name: formData.get(`ingredients[${i}][name]`),
            quantity: formData.get(`ingredients[${i}][quantity]`),
            unit: formData.get(`ingredients[${i}][unit]`) || null,
            sort_order: i + 1
        });
    });

    // Récupérer les étapes
    const stepIndices = [...new Set(formData.getAll('steps[][step_number]').map((_, i) => i))];
    stepIndices.forEach(i => {
        recipeData.steps.push({
            step_number: parseInt(formData.get(`steps[${i}][step_number]`)),
            instruction: formData.get(`steps[${i}][instruction]`)
        });
    });

    // Valider les données
    if (!validateRecipe(recipeData)) {
        return;
    }

    // Sauvegarder la recette
    saveRecipe(recipeData);

    // Réinitialiser le formulaire
    form.reset();
    document.getElementById('ingredients-container').innerHTML = '';
    document.getElementById('steps-container').innerHTML = '';
    addIngredient();
    addStep();

    // Afficher un message de succès
    showSuccessMessage();
}

function validateRecipe(recipe) {
    if (!recipe.title || recipe.title.trim() === '') {
        alert('Le titre de la recette est obligatoire.');
        return false;
    }
    if (!recipe.category || recipe.category.trim() === '') {
        alert('La catégorie est obligatoire.');
        return false;
    }
    if (!recipe.ingredients || recipe.ingredients.length === 0) {
        alert('Une recette doit avoir au moins un ingrédient.');
        return false;
    }
    if (!recipe.steps || recipe.steps.length === 0) {
        alert('Une recette doit avoir au moins une étape.');
        return false;
    }
    return true;
}

function saveRecipe(recipe) {
    // Charger les recettes existantes depuis localStorage
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Ajouter la nouvelle recette
    recipes.push(recipe);

    // Sauvegarder dans localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    console.log('Recette sauvegardée :', recipe);
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Recette enregistrée avec succès !</p>
        <a href="index.html">Retour à l'accueil</a>
    `;
    document.querySelector('main').prepend(message);

    // Supprimer le message après 5 secondes
    setTimeout(() => {
        message.remove();
    }, 5000);
}