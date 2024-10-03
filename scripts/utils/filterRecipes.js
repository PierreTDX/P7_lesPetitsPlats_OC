import { createRecipeArticles } from "../templates/createRecipeArcticles.js";
import { populateZoneLists } from "./populateZoneLists.js";
import { FilterBySelectedItems } from "./filterBySelectedItems.js";
import { clearInput } from "./clearInput.js";
import { removeAccents } from "./removeAccents.js";
import { mylog } from "../params/handleConsoleLog.js";


// Exporter la variable filteredRecipes
export let filteredRecipes = [];

// Fonction pour filtrer les recettes en fonction de la recherche
function filterRecipes(recipes, query) {
    mylog("Début filterRecipes", recipes);
    
    const clearQuery = clearInput(query); // Désinfecter l'entrée utilisateur
    const normalizedQuery = removeAccents(clearQuery).toLowerCase();
    const queryWords = normalizedQuery
        .split(" ")
        .filter(word => word.length >= 3); // Ne garder que les mots de 3 caractères ou plus

    filteredRecipes = recipes.filter(recipe => {
        const name = removeAccents(recipe.name).toLowerCase();
        const description = removeAccents(recipe.description).toLowerCase();
        const ingredients = recipe.ingredients
            .map(ing => removeAccents(ing.ingredient).toLowerCase())
            .join(' ');
        const appliance = removeAccents(recipe.appliance).toLowerCase();
        const ustensils = recipe.ustensils
            .map(ust => removeAccents(ust).toLowerCase())
            .join(' ');

        // Vérifier si tous les mots de la requête sont présents dans les champs de la recette
        return queryWords.every(word => 
            name.includes(word) ||
            description.includes(word) ||
            ingredients.includes(word) ||
            appliance.includes(word) ||
            ustensils.includes(word)
        );
    });

    mylog("Fin filterRecipes", filteredRecipes);
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
        // Filtrer les recettes en fonction de la recherche
        filteredRecipes = filterRecipes(allRecipes, query);
        mylog("dans handleSearchInput filteredRecipes", filteredRecipes);

        // Appliquer le filtre par les éléments sélectionnés après le filtrage de la recherche
        FilterBySelectedItems();

    } else {
        // Réinitialiser les recettes filtrées à toutes les recettes
        filteredRecipes = [...allRecipes];

        // Appliquer le filtre par les éléments sélectionnés même si la recherche est vide
        FilterBySelectedItems();
    }
}

// Fonction pour configurer les événements de recherche
export function ListenerSearchEvents(recipesData) {
    // Ajouter un écouteur d'événements pour la barre de recherche
    const searchInput = document.getElementById('mainsearch');
    searchInput.addEventListener('input', function (event) {
        handleSearchInput(event, recipesData);
    });

    // Ajouter un écouteur d'événements pour le bouton de recherche
    const form = document.querySelector(".formSearch");
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêcher la soumission du formulaire
        handleSearchInput({ target: searchInput }, recipesData); // Effectuer la recherche sur la soumission
    });
}

