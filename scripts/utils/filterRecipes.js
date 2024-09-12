import { createRecipeArticles } from "../templates/createRecipeArcticles.js";
import { populateZoneLists } from "./populateZoneLists.js";
import { FilterBySelectedItems } from "./filterBySelectedItems.js";

// Exporter la variable filteredRecipes
export let filteredRecipes = [];

// Fonction pour filtrer les recettes en fonction de la recherche
function filterRecipes(recipes, query) {
    console.log("début filterRecipes", recipes);
    const queryWords = query.toLowerCase().split(" ").filter(function(word) {
        return word.length >= 3; // Ne garder que les mots de 3 caractères ou plus
    });

    filteredRecipes = recipes.filter(function(recipe) {
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
    console.log("fin filterRecipes", filteredRecipes);
    return filteredRecipes;
}

// Fonction pour mettre à jour l'affichage des recettes et des listes
export function updateRecipeDisplay(recipes) {
    createRecipeArticles(recipes);  // Affiche les recettes filtrées
    populateZoneLists(recipes); // Met à jour les listes de sélection
}

// Fonction pour gérer les changements dans la barre de recherche
export function handleSearchInput(event, allRecipes) {
    const query = event.target.value.trim();
    if (query.length >= 3) {
        const filteredRecipes = filterRecipes(allRecipes, query);
        console.log("dans handleSearchInput filteredRecipes",filteredRecipes);

        FilterBySelectedItems();
        updateRecipeDisplay(filteredRecipes);

    } else {
        FilterBySelectedItems();
        updateRecipeDisplay(allRecipes);
    }
}

// Fonction pour configurer les événements de recherche
export function ListenerSearchEvents(recipesData) {
    // Ajouter un écouteur d'événements pour la barre de recherche
    const searchInput = document.getElementById('mainsearch');
    searchInput.addEventListener('input', function(event) {
        handleSearchInput(event, recipesData);
    });

    // Ajouter un écouteur d'événements pour le bouton de recherche
    const form = document.querySelector(".formSearch");
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher la soumission du formulaire
        handleSearchInput({ target: searchInput }, recipesData); // Effectuer la recherche sur la soumission
    });
}