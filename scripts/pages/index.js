import Api from "../api/Api.js";
import { openMenu } from "../utils/openMenu.js";
import { selectItem } from "../utils/selectItemMenu.js";
import { createTag } from "../utils/createTag.js";
import { deleteTag } from "../utils/deleteTag.js";
import { counterRecipes } from "../utils/counterRecipes.js";
import { clearButtonMainSearch } from "../utils/clearButtonMainSearch.js";
import { handleSearchInput, ListenerSearchEvents } from "../utils/filterRecipes.js";
import { FilterBySelectedItems } from "../utils/filterBySelectedItems.js";
import { searchItems } from "../utils/searchItems.js";
import { mylog } from "../params/handleConsoleLog.js";

const recipesApi = new Api("./data/recipes.json");

export let recipesData = [];
mylog("avant init index.js", recipesData);


// Fonction d'initialisation de l'application
async function init() {
    try {
        recipesData = await recipesApi.get();
        mylog("début init index.js", recipesData);

        clearButtonMainSearch();

        // Afficher toutes les recettes initialement
        handleSearchInput({ target: { value: "" } }, recipesData);

        // Ecouter les événements de recherche
        ListenerSearchEvents(recipesData);

        FilterBySelectedItems();

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
searchItems();