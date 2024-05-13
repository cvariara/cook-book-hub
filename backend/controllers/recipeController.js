import prisma from "../lib/prisma.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        reviews: true,
      },
    });
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

    res.status(200).json(recipe);
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
