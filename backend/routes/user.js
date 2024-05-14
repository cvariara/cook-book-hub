import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  saveRecipe,
  profileRecipes
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", getUsers);

//router.get("/:id", verifyToken, getUser);

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

router.post("/save", verifyToken, saveRecipe);

router.get("/profileRecipes", verifyToken, profileRecipes);

export default router;
