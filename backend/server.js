import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import recipeRoute from "./routes/recipe.js";
import authRoute from "./routes/auth.js";
import testRoute from "./routes/test.js";

const app = express();
const PORT = 4000;

dotenv.config();

// middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/recipes", recipeRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
