import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
  addRecipeReview
} from "../controllers/recipeController.js";

const router = Router();

router.get("/", getRecipes);

router.get("/:id", getRecipe);

router.post("/", verifyToken, addRecipe);

router.put("/:id", verifyToken, updateRecipe);

router.delete("/:id", verifyToken, deleteRecipe);

router.post("/:id/addReview", verifyToken, addRecipeReview);

export default router;
