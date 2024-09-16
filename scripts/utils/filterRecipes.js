import { createRecipeArticles } from "../templates/createRecipeArcticles.js";
import { populateZoneLists } from "./populateZoneLists.js";
import { FilterBySelectedItems } from "./filterBySelectedItems.js";

// Exporter la variable filteredRecipes
export let filteredRecipes = [];

// Fonction pour filtrer les recettes en fonction de la recherche
export function filterRecipes(recipes, query) {
    console.log("début filterRecipes", recipes);

    // Convertir la requête en mots, en gardant ceux de 3 caractères ou plus
    const queryWords = [];
    const words = query.toLowerCase().split(" ");
    let i = 0;

    while (i < words.length) {
        if (words[i].length >= 3) {
            queryWords.push(words[i]);
        }
        i++;
    }

    // Filtrer les recettes
    filteredRecipes = [];
    let j = 0;

    while (j < recipes.length) {
        const recipe = recipes[j];
        const name = recipe.name ? recipe.name.toLowerCase() : '';
        const description = recipe.description ? recipe.description.toLowerCase() : '';
        let ingredients = '';
        let k = 0;

        while (k < recipe.ingredients.length) {
            ingredients += recipe.ingredients[k].ingredient.toLowerCase() + ' ';
            k++;
        }

        const appliance = recipe.appliance ? recipe.appliance.toLowerCase() : '';
        let ustensils = '';
        let l = 0;

        while (l < recipe.ustensils.length) {
            ustensils += recipe.ustensils[l].toLowerCase() + ' ';
            l++;
        }

        let allWordsMatch = true;
        let m = 0;

        while (m < queryWords.length) {
            const word = queryWords[m];
            if (!(name.includes(word) || description.includes(word) ||
                ingredients.includes(word) || appliance.includes(word) || ustensils.includes(word))) {
                allWordsMatch = false;
                break;
            }
            m++;
        }

        if (allWordsMatch) {
            filteredRecipes.push(recipe);
        }

        j++;
    }

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
        // Filtrer les recettes en fonction de la recherche
        filteredRecipes = filterRecipes(allRecipes, query);
        console.log("dans handleSearchInput filteredRecipes", filteredRecipes);

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