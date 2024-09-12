import Api from "../api/Api.js";
import { openMenu } from "../utils/openMenu.js";
import { selectItem } from "../utils/selectItemMenu.js";
import { createTag } from "../utils/createTag.js";
import { deleteTag } from "../utils/deleteTag.js";
import { counterRecipes } from "../utils/counterRecipes.js";
import { handleSearchInput, ListenerSearchEvents } from "../utils/filterRecipes.js";
import { ClearButtonMainSearch } from "../utils/ClearButtonMainSearch.js";
import { FilterBySelectedItems } from "../utils/filterBySelectedItems.js";

const recipesApi = new Api("./data/recipes.json");

export let recipesData = [];
console.log("avant init index.js", recipesData);


// Fonction d'initialisation de l'application
async function init() {
    try {
        recipesData = await recipesApi.get();
        console.log("début init index.js", recipesData);

        ClearButtonMainSearch();

        // Afficher toutes les recettes initialement
        handleSearchInput({ target: { value: "" } }, recipesData);

        // Ecouter les événements de recherche
        ListenerSearchEvents(recipesData);



    } catch (error) {
        console.error("Erreur lors de l'initialisation de l'application :", error);
    }
};

// Appel des fonctions lors de l'initialisation
init();

// Appel des autres fonctions utilitaires
openMenu();
selectItem();
createTag();
deleteTag();
counterRecipes();

// Configurer les événements de filtrage par éléments sélectionnés
// FilterBySelectedItems();