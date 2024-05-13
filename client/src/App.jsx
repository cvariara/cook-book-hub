import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout, RequireAuth } from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Recipes from "./pages/recipes/Recipes";
import Recipe from "./pages/recipe/Recipe";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Settings from "./pages/settings/Settings";
import NewRecipe from "./pages/newRecipe/NewRecipe";
import { allRecipesLoader, singlePageLoader } from "./lib/loaders";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: allRecipesLoader,
        },
        {
          path: "/recipes",
          element: <Recipes />,
        },
        {
          path: "/recipes/:id",
          element: <Recipe />,
          loader: singlePageLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/settings",
          element: <Settings />
        },
        {
          path: "/add",
          element: <NewRecipe />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
