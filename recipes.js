import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const filePath = "./recipes.json";

// GET ALL RECIPES
export async function getRecipes(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
         console.error('Error reading file:', error);
    }
}


// GET A RECIPE BY ID
export async function getRecipeByID(filePath, id) {
    const existingRecipes = await getRecipes(filePath);

    const recipe = existingRecipes.find(recipe => recipe.id === id);

    return recipe || null;
}

// CREATE A RECIPE
//to read data from file
export async function createRecipe(filePath, newRecipe) {
try {
    const existingRecipes = await getRecipes(filePath);
    //modify existingRecipes rather than make a new variable that is the value of existingRecipes + newRecipe pushed on
    existingRecipes.push(newRecipe);
    //write data to the file. we need null and 2 to make data readable, else it's a long string, no line breaks
    await fs.writeFile(filePath, JSON.stringify(existingRecipes, null, 2));
} catch (error) {
    console.error('Error reading file:', error);
}
}
// UPDATE A RECIPE BY ID
export async function updateRecipeByID(filePath, id, updatedRecipe) {   
    // Use ID and filepath to get the existing recipe that matches the ID    
    // Push the changes from the updated Recipe to the original recipe
    // Use writeFile to add data to JSON file
    try {
        const existingRecipes = await getRecipeByID(filePath, id);
        existingRecipes.push(updatedRecipe);
        await fs.writeFile(filePath, JSON.stringify(existingRecipes, null, 2));
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {}
