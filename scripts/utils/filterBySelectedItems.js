import { filteredRecipes } from "./filterRecipes.js";
import { updateRecipeDisplay } from "./filterRecipes.js";
import { mylog } from "../params/handleConsoleLog.js";


// Fonction pour filtrer les recettes en fonction des éléments sélectionnés
export function FilterBySelectedItems() {
    mylog("Recettes filtrées au 1er tri :", filteredRecipes);

    // Utiliser directement filteredRecipes pour appliquer le filtre des éléments sélectionnés
    const selectedIngredients = Array.from(document.querySelectorAll('.zoneSelecteds.ingredients .selectedWord')).map(elem => elem.textContent.toLowerCase());
    const selectedAppliances = Array.from(document.querySelectorAll('.zoneSelecteds.appliance .selectedWord')).map(elem => elem.textContent.toLowerCase());
    const selectedUstensils = Array.from(document.querySelectorAll('.zoneSelecteds.ustensils .selectedWord')).map(elem => elem.textContent.toLowerCase());
    mylog("ingrédients sélectionnés", selectedIngredients);
    mylog("appareils sélectionnés", selectedAppliances);
    mylog("ustensiles sélectionnés", selectedUstensils);

    // Filtrer les recettes en fonction des éléments sélectionnés
    const filteredBySelectedItems = filteredRecipes.filter(recipe => {
        const ingredients = recipe.ingredients.map(ing => ing.ingredient.toLowerCase());
        const appliance = recipe.appliance.toLowerCase();
        const ustensils = recipe.ustensils.map(ust => ust.toLowerCase());

        // Vérifier si la recette contient tous les éléments sélectionnés
        const containsAllIngredients = selectedIngredients.length === 0 || selectedIngredients.every(ingredient => ingredients.includes(ingredient));
        const containsAllAppliances = selectedAppliances.length === 0 || selectedAppliances.includes(appliance);
        const containsAllUstensils = selectedUstensils.length === 0 || selectedUstensils.every(ustensil => ustensils.includes(ustensil));

        return containsAllIngredients && containsAllAppliances && containsAllUstensils;
    });

    mylog("Recettes filtrées après le second tri :", filteredBySelectedItems);

    // Toujours mettre à jour l'affichage avec les recettes filtrées après le deuxième tri
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
                mylog('Changements détectés dans zoneSelecteds.');
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
