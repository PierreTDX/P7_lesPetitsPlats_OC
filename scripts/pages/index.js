import Api from "../api/Api.js";
import { openMenu } from "../utils/openMenu.js";
import { selectItem} from "../utils/selectItemMenu.js";
import { createTag } from "../utils/createTag.js";
import { deleteTag } from "../utils/deleteTag.js";
import { counterRecipes } from "../utils/counterRecipes.js"; 

const recipesApi = new Api("./data/recipes.json");

const init = async () => {
    const recipesData = await recipesApi.get();
    console.log("dans index.js",recipesData);
    
};

init();

openMenu();
selectItem();
createTag();
deleteTag();
counterRecipes()
