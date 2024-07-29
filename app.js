import express from "express";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";


const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/api/recipes', async (req,res) => {
  try {
    const recipes = await getRecipes('./recipes.json');
    res.status(200).json ({
      "Success: ": true,
      "Payload: ": recipes
    })
  }catch (error) {
    console.error('Error reading file:', error);
}  
})

app.get('/api/recipes/:id', async (req,res) => {
  const recipeID = req.params.id;
  try {
    const recipes = await getRecipeByID('./recipes.json', recipeID);

    if (recipes !== null) {
      res.status(200).json ({ 
        "Success: ": true,
        "Payload: ": recipes
      })    
    }else {
      res.status(404).json ({
        "Success: " : false,
        "Message: " : "Recipe not found"
      })
    }
  }
  catch (error) {
    console.error('Error reading file:', error);
  }
  
})





