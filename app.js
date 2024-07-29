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
