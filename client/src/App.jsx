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
import {
  allRecipesLoader,
  profilePageLoader,
  recipesPageLoader,
  singlePageLoader,
} from "./lib/loaders";
import ScrollToTop from "./components/ScrollToTop";

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
          loader: recipesPageLoader,
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
          loader: profilePageLoader,
        },
        {
          path: "/profile/settings",
          element: <Settings />,
        },
        {
          path: "/add",
          element: <NewRecipe />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  );
  //return <RouterProvider router={router} />;
};

export default App;
