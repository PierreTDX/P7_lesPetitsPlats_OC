import Api from "../api/Api.js";
import { openMenu } from "../utils/openMenu.js";
import { selectItem } from "../utils/selectItemMenu.js";
import { createTag } from "../utils/createTag.js";
import { deleteTag } from "../utils/deleteTag.js";
import { counterRecipes } from "../utils/counterRecipes.js";
import { handleSearchInput } from "../utils/filterRecipes.js";

const recipesApi = new Api("./data/recipes.json");

let recipesData = [];

// Fonction d'initialisation de l'application
async function init() {
    try {
        recipesData = await recipesApi.get();
        console.log("dans index.js", recipesData);

        // Afficher toutes les recettes initialement
        handleSearchInput({ target: { value: "" } }, recipesData);

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
        
            // Faire défiler la page vers le haut pour afficher zoneCartes
            //document.getElementById('zoneSelectsAndText').scrollIntoView({ behavior: 'smooth' });
        });

    } catch (error) {
        console.error("Erreur lors de l'initialisation de l'application :", error);
    }
}

// Appel des fonctions lors de l'initialisation
init();

// Appel des autres fonctions utilitaires
openMenu();
selectItem();
createTag();
deleteTag();
counterRecipes();

