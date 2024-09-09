import Api from "../api/Api.js";
import { openMenu } from "../utils/openMenu.js";
import { selectItem} from "../utils/selectItemMenu.js";
import { createTag } from "../utils/createTag.js";
import { deleteTag } from "../utils/deleteTag.js";
import { counterRecipes } from "../utils/counterRecipes.js";
import { createRecipeArticles } from "../templates/createRecipeArcticles.js";

const recipesApi = new Api("./data/recipes.json");

const init = async () => {
    try {
        const recipesData = await recipesApi.get();
        console.log("dans index.js", recipesData);
        
        // Appeler la fonction pour créer les articles de recettes
        await createRecipeArticles(recipesData); 

    } catch (error) {
        console.error("Erreur lors de l'initialisation de l'application :", error);
    }
};
init();

openMenu();
selectItem();
createTag();
deleteTag();
counterRecipes();
