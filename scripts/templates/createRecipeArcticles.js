import Recipe from "../models/recipe.js";

export async function createRecipeArticles(recipesData) {
    const zoneCartes = document.querySelector('section.zoneCartes');

    // Vérifie que la section .zoneCartes est présente
    if (!zoneCartes) {
        console.error('La section .zoneCartes est introuvable.');
        return;
    }

    // Vide la section avant de rajouter les articles
    zoneCartes.innerHTML = '';

    // Parcours des données des recettes
    recipesData.forEach(recipeData => {
        const recipe = new Recipe(recipeData);
        const article = document.createElement('article');

        article.innerHTML = `
            <span>${recipe.time} min</span>
            <img src="assets/pictures/recipes/${recipe.image}" alt="image recette ${recipe.name}">
            <div class="zoneRecipe">
                <h2>${recipe.name}</h2>
                <div>
                    <h3>RECETTE</h3>
                    <p class="truncate">${recipe.description}</p>
                </div>
                <div>
                    <h3>INGRÉDIENTS</h3>
                    <div class="zoneIngredients">
                        ${recipe.ingredients.map(ingredient => `
                            <div class="ingredient">
                                <p class="ingredientName">${ingredient.ingredient}</p>
                                <p class="ingredientQte">${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        zoneCartes.appendChild(article);

    });

}

