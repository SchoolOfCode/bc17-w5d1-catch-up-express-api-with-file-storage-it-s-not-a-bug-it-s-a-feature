import express from "express";
import { v4 as uuidv4 } from "uuid";
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

app.get("/api/recipes", async (req, res) => {
    try {
        const recipes = await getRecipes("./recipes.json");
        res.status(200).json({
            "Success: ": true,
            "Payload: ": recipes,
        });
    } catch (error) {
        console.error("Error reading file:", error);
    }
});

app.get("/api/recipes/:id", async (req, res) => {
    const recipeID = req.params.id;
    try {
        const recipes = await getRecipeByID("./recipes.json", recipeID);

        if (recipes !== null) {
            res.status(200).json({
                "Success: ": true,
                "Payload: ": recipes,
            });
        } else {
            res.status(404).json({
                "Success: ": false,
                "Message: ": "Recipe not found",
            });
        }
    } catch (error) {
        console.error("Error reading file:", error);
    }
});

app.post("/api/recipes", async (req, res) => {
    const id = uuidv4();

    const newRecipe = {
        id: id,
        ...req.body,
    };
    if (!newRecipe) {
        res.status(400).json({ error: "Failed because no input detected" });
    }
    if (!newRecipe.title) {
        res.status(400).json({
            error: "Failed because title field is required",
        });
    }
    if (!newRecipe.ingredients) {
        res.status(400).json({
            error: "Failed because ingredients field is required",
        });
    }
    if (!newRecipe.instructions) {
        res.status(400).json({
            error: "Failed because instructions field is required",
        });
    }
    if (!newRecipe.image) {
        res.status(400).json({
            error: "Failed because image field is required",
        });
    }

    try {
        await createRecipe("./recipes.json", newRecipe);
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error("Error reading file:", error);
        res.status(500).json({ error: "Error accessing file" });
    }
});

app.patch('/app/recipes/:id', (req, res) => {
    
    // Get json object with matching ID 
    // Get updated recipe
    // Call updateRecipeByID function which will update the original recipe with the new recipe
    // Use try and catch to output the new recipe if sucessful or an error message if not   
    const recipeID = req.params.id;
    const updatedRecipe = req.body;

    updateRecipeByID("./recipes.json", recipeID, updatedRecipe)

    if (!updatedRecipe || !updatedRecipe.title || !updatedRecipe.ingredients || !updatedRecipe.instructions || !updatedRecipe.image) {
        res.status(404).json({ 
            "Success: ": false,
            "Message: ": "Incorrect input"            
        });
    }
    try {
        res.status(200).json ({
            "Success: ": true,
            "Payload: ": recipes
        })
    } catch (error) {
        console.error("Error reading file:", error);
        res.status(500).json({ error: "Error accessing file" });
    }
})