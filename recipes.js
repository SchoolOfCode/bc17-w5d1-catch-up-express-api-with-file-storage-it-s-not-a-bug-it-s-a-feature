import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// GET ALL RECIPES
export async function getRecipes(fileName) {
        try {
            const data = await fs.readFile(fileName, 'utf-8');
            const jsonData = JSON.parse(data);
            return jsonData;
        } catch (error) {
            console.error('Error reading file:', error);
        }
}


// GET A RECIPE BY ID
export async function getRecipeByID(id) {}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {}
