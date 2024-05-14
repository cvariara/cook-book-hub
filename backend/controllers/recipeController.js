import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getRecipes = async (req, res) => {
  const query = req.query;

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        name: {
          mode: "insensitive",
          contains: query.item || undefined,
        },
      },
      include: {
        reviews: true,
      },
    });
    //console.log(recipes);

    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get recipes" });
  }
};

export const getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        recipeInfo: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        reviews: true,
      },
    });

    let userId;

    const token = req.cookies?.token;

    if (!token) {
      userId = null;
    } else {
      jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if (error) {
          userId = null;
        } else {
          userId = payload.id;
        }
      });
    }

    const saved = await prisma.savedRecipe.findUnique({
      where: {
        userId_recipeId: {
          recipeId: id,
          userId,
        },
      },
    });

    res.status(200).json({ ...recipe, isSaved: saved ? true : false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get recipe" });
  }
};

export const addRecipe = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        ...body.recipeData,
        userId: tokenUserId,
        recipeInfo: {
          create: body.recipeInfo,
        },
      },
    });
    res.status(200).json(newRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add recipe" });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update recipe" });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
    });

    if (recipe.userId !== tokenUserId) {
      return res.status(403).json({ error: "Not Authorized!" });
    }

    await prisma.recipe.delete({
      where: { id },
    });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};
