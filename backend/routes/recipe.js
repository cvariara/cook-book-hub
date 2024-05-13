import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from "../controllers/recipeController.js";

const router = Router();

router.get("/", getRecipes);

router.get("/:id", getRecipe);

router.post("/", verifyToken, addRecipe);

router.put("/:id", verifyToken, updateRecipe);

router.delete("/:id", verifyToken, deleteRecipe);

export default router;
