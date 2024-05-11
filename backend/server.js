import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import recipeRoute from "./routes/recipe.js";
import authRoute from "./routes/auth.js";

const app = express();
const PORT = 4000;

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/recipes", recipeRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`)
});
