import { recipesData } from "../pages/index.js";
import { filteredRecipes } from "./filterRecipes.js";
import { updateRecipeDisplay } from "./filterRecipes.js";

// Fonction pour filtrer les recettes en fonction des éléments sélectionnés
export function FilterBySelectedItems() {
    console.log("Recettes si pas de 1er tri :", recipesData);
    console.log("Recettes filtrées au 1er tri :", filteredRecipes);

    // Choisir la source de données en fonction de l'état de filteredRecipes
    const recipesToFilter = filteredRecipes.length > 0 ? filteredRecipes : recipesData;

    // Récupérer les éléments sélectionnés dans chaque menu
    const selectedIngredients = Array.from(document.querySelectorAll('.zoneSelecteds.ingredients .selectedWord')).map(elem => elem.textContent.toLowerCase());
    const selectedAppliances = Array.from(document.querySelectorAll('.zoneSelecteds.appliance .selectedWord')).map(elem => elem.textContent.toLowerCase());
    const selectedUstensils = Array.from(document.querySelectorAll('.zoneSelecteds.ustensils .selectedWord')).map(elem => elem.textContent.toLowerCase());
    console.log("ingrédients sélectionnés", selectedIngredients);
    console.log("appareils sélectionnés", selectedAppliances);
    console.log("ustensiles sélectionnés", selectedUstensils);

    // Filtrer les recettes en fonction des éléments sélectionnés
    const filteredBySelectedItems = recipesToFilter.filter(recipe => {
        const ingredients = recipe.ingredients.map(ing => ing.ingredient.toLowerCase());
        const appliance = recipe.appliance.toLowerCase();
        const ustensils = recipe.ustensils.map(ust => ust.toLowerCase());

        // Vérifier si la recette contient tous les éléments sélectionnés
        const containsAllIngredients = selectedIngredients.length === 0 || selectedIngredients.every(ingredient => ingredients.includes(ingredient));
        const containsAllAppliances = selectedAppliances.length === 0 || selectedAppliances.includes(appliance);
        const containsAllUstensils = selectedUstensils.length === 0 || selectedUstensils.every(ustensil => ustensils.includes(ustensil));

        return containsAllIngredients && containsAllAppliances && containsAllUstensils;
    });

    console.log("Recettes filtrées après le second tri :", filteredBySelectedItems);

    // Mettre à jour l'affichage avec les recettes filtrées
    updateRecipeDisplay(filteredBySelectedItems);
}

// Fonction pour configurer le MutationObserver sur les zoneSelecteds
function observeZoneSelecteds() {
    // Sélectionner les éléments à observer
    const zonesSelecteds = document.querySelectorAll('.zoneSelecteds');

    // Fonction de rappel pour traiter les changements
    const handleMutation = (mutationsList) => {
        // Vérifier chaque mutation
        mutationsList.forEach(mutation => {
            if (mutation.type === 'childList') {
                // Un ou plusieurs enfants ont été ajoutés ou supprimés
                console.log('Changements détectés dans zoneSelecteds.');
                FilterBySelectedItems();
            }
        });
    };

    // Créer un nouvel instance de MutationObserver
    const observer = new MutationObserver(handleMutation);

    // Configuration de l'observateur : observer les ajouts et suppressions d'enfants
    const observerConfig = { childList: true, subtree: true };

    // Attacher l'observateur à chaque zoneSelecteds
    zonesSelecteds.forEach(zone => observer.observe(zone, observerConfig));
}

// Appeler la fonction d'observation lorsque le document est prêt
document.addEventListener('DOMContentLoaded', observeZoneSelecteds);
