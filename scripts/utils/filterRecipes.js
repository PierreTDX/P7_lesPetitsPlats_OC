import { createRecipeArticles } from "../templates/createRecipeArcticles.js";
import { populateZoneLists } from "./populateZoneLists.js";

// Fonction pour filtrer les recettes en fonction de la recherche
function filterRecipes(recipes, query) {
    const queryWords = query.toLowerCase().split(" ").filter(function(word) {
        return word.length >= 3; // Ne garder que les mots de 3 caractères ou plus
    });

    const filteredRecipes = recipes.filter(function(recipe) {
        const name = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();
        const ingredients = recipe.ingredients.map(function(ing) {
            return ing.ingredient.toLowerCase();
        }).join(' ');

        const appliance = recipe.appliance.toLowerCase();
        const ustensils = recipe.ustensils.map(function(ust) {
            return ust.toLowerCase();
        }).join(' ');

        // Vérifier si tous les mots de la requête sont présents dans les champs de la recette
        return queryWords.every(function(word) {
            return name.includes(word) ||
                   description.includes(word) ||
                   ingredients.includes(word) ||
                   appliance.includes(word) ||
                   ustensils.includes(word);
        });
    });

    return filteredRecipes;
}

// Fonction pour mettre à jour l'affichage des recettes et des listes
function updateRecipeDisplay(recipes, allRecipes) {
    createRecipeArticles(recipes);  // Affiche les recettes filtrées
    populateZoneLists(recipes); // Met à jour les listes de sélection
}

// Fonction pour gérer les changements dans la barre de recherche
export function handleSearchInput(event, allRecipes) {
    const query = event.target.value.trim();
    if (query.length >= 3) {
        const filteredRecipes = filterRecipes(allRecipes, query);
        updateRecipeDisplay(filteredRecipes, allRecipes);
    } else {
        updateRecipeDisplay(allRecipes, allRecipes);
    }
}