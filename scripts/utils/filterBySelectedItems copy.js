import { recipesData } from "../pages/index.js";
import { filteredRecipes ,updateRecipeDisplay } from "./filterRecipes.js";
//code à faire à partir des données déjà filtrées dans filterRecipes.js



export async function FilterBySelectedItems() {
    console.log("code à faire recipesData", recipesData);
    console.log("code à faire filteredRecipes", filteredRecipes);

    // Récupérer les éléments sélectionnés depuis l'interface utilisateur
    const selectedIngredients = Array.from(document.querySelectorAll(".zoneSelecteds .selectedWord"))
        .map(element => element.textContent.toLowerCase());
    const selectedAppliances = Array.from(document.querySelectorAll(".zoneSelecteds .selectedWord"))
        .map(element => element.textContent.toLowerCase());
    const selectedUstensils = Array.from(document.querySelectorAll(".zoneSelecteds .selectedWord"))
        .map(element => element.textContent.toLowerCase());

    // Filtrer les recettes basées sur les éléments sélectionnés
    const nextFilteredRecipes = filteredRecipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients.map(ing => ing.ingredient.toLowerCase());
        const recipeAppliances = recipe.appliance.toLowerCase();
        const recipeUstensils = recipe.ustensils.map(ust => ust.toLowerCase());

        // Vérifier si les recettes contiennent les ingrédients sélectionnés
        const hasAllIngredients = selectedIngredients.every(ingredient =>
            recipeIngredients.includes(ingredient)
        );

        // Vérifier si les recettes contiennent l'appareil sélectionné
        const hasAppliance = selectedAppliances.length === 0 || selectedAppliances.includes(recipeAppliances);

        // Vérifier si les recettes contiennent les ustensiles sélectionnés
        const hasAllUstensils = selectedUstensils.every(ustensil =>
            recipeUstensils.includes(ustensil)
        );

        return hasAllIngredients && hasAppliance && hasAllUstensils;
    });

    // Mettre à jour l'affichage des recettes filtrées
    console.log("Recettes après filtrage par éléments sélectionnés :", nextFilteredRecipes);
    // Appeler la fonction d'affichage pour mettre à jour l'interface utilisateur
    updateRecipeDisplay(nextFilteredRecipes);
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
