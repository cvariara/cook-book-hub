import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ error: "Not Authorized!" });
  }

  let newPassword = null;
  try {
    if (password) {
      // hash password
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...inputs,
        ...(newPassword && { password: newPassword }),
        ...(avatar && { avatar }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ error: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete user!" });
  }
};

export const saveRecipe = async (req, res) => {
  const recipeId = req.body.recipeId;
  const tokenUserId = req.userId;

  try {
    const savedRecipe = await prisma.savedRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId: tokenUserId,
          recipeId,
        },
      },
    });

    if (savedRecipe) {
      await prisma.savedRecipe.delete({
        where: {
          id: savedRecipe.id,
        },
      });
      res.status(200).json({ message: "Recipe removed from saved list" });
    } else {
      await prisma.savedRecipe.create({
        data: {
          userId: tokenUserId,
          recipeId,
        },
      });
      res.status(200).json({ message: "Recipe saved" });
    }

    //res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete user!" });
  }
};

export const profileRecipes = async (req, res) => {
  const tokenUserId = req.userId;
  console.log(req.params)
  console.log(tokenUserId)

  try {
    const userRecipes = await prisma.recipe.findMany({
      where: {
        userId: tokenUserId,
      },
      include: {
        reviews: true,
      },
    });


    
    const saved = await prisma.savedRecipe.findMany({
      where: {
        userId: tokenUserId,
      },
      include: {
        recipe: {
          include: {
            reviews: true,
          },
        },
      },
    });

    const savedRecipes = saved.map((item) => item.recipe);

    res.status(200).json({ userRecipes, savedRecipes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get profile recipes!" });
  }
};
