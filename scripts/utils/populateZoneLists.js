import Recipe from '../models/recipe.js';

// Fonction pour remplir les zones de liste avec les données des recettes filtrées
export function populateZoneLists(recipesData) {
    // Sélectionner les zones de liste
    const ingredientZone = document.querySelector('.zoneList.ingredients');
    const applianceZone = document.querySelector('.zoneList.appliance');
    const ustensilZone = document.querySelector('.zoneList.ustensils');

    // Récupérer les éléments sélectionnés
    const selectedIngredients = new Set([...document.querySelectorAll('.zoneSelecteds.ingredients .selectedWord')].map(el => el.textContent.toLowerCase()));
    const selectedAppliances = new Set([...document.querySelectorAll('.zoneSelecteds.appliance .selectedWord')].map(el => el.textContent.toLowerCase()));
    const selectedUstensils = new Set([...document.querySelectorAll('.zoneSelecteds.ustensils .selectedWord')].map(el => el.textContent.toLowerCase()));

    // Vider les zones de liste avant de les remplir
    ingredientZone.innerHTML = '';
    applianceZone.innerHTML = '';
    ustensilZone.innerHTML = '';

    // Utiliser des ensembles pour éviter les doublons
    const ingredientsSet = new Set();
    const appliancesSet = new Set();
    const ustensilsSet = new Set();

    // Parcourir les données des recettes filtrées
    recipesData.forEach(function(recipeData) {
        const recipe = new Recipe(recipeData);

        // Ajouter les ingrédients
        recipe.ingredients.forEach(function(ingredient) {
            if (ingredient.ingredient) {
                ingredientsSet.add(ingredient.ingredient.toLowerCase());
            }
        });

        // Ajouter les appareils
        if (recipe.appliance) {
            appliancesSet.add(recipe.appliance.toLowerCase());
        }

        // Ajouter les ustensiles
        recipe.ustensils.forEach(function(ustensil) {
            ustensilsSet.add(ustensil.toLowerCase());
        });
    });

    // Convertir les ensembles en tableaux, retirer les éléments sélectionnés, et les trier par ordre alphabétique
    const sortedIngredients = Array.from(ingredientsSet).filter(item => !selectedIngredients.has(item)).sort();
    const sortedAppliances = Array.from(appliancesSet).filter(item => !selectedAppliances.has(item)).sort();
    const sortedUstensils = Array.from(ustensilsSet).filter(item => !selectedUstensils.has(item)).sort();

    // Créer les éléments HTML pour les ingrédients
    sortedIngredients.forEach(function(ingredient) {
        const span = document.createElement('span');
        span.className = 'list';
        span.textContent = capitalizeFirstLetter(ingredient);
        ingredientZone.appendChild(span);
    });

    // Créer les éléments HTML pour les appareils
    sortedAppliances.forEach(function(appliance) {
        const span = document.createElement('span');
        span.className = 'list';
        span.textContent = capitalizeFirstLetter(appliance);
        applianceZone.appendChild(span);
    });

    // Créer les éléments HTML pour les ustensiles
    sortedUstensils.forEach(function(ustensil) {
        const span = document.createElement('span');
        span.className = 'list';
        span.textContent = capitalizeFirstLetter(ustensil);
        ustensilZone.appendChild(span);
    });
}

// Fonction pour capitaliser la première lettre d'un mot
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
