import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create a new user and save to db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
      },
    });

    res.status(201).json({ mssg: "User signup successfully!", username });
  } catch (error) {
    res.status(500).json({ error: "Failed to create User" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return res.status(401).json({ error: "Invalid Credentials!" });

    // check the user's password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid Credentials!" });

    // generate cookie token and send to user
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week in milliseconds
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        //secure: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to login user!" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ mssg: "User logged out successfully!" });
};
