import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Recipes from "./pages/recipes/Recipes";
import Recipe from "./pages/recipe/Recipe";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/recipes",
          element: <Recipes />,
        },
        {
          path: "/recipes/:id",
          element: <Recipe />,
        },
        {
          path: "/profile",
          element: <Profile />,
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
  ]);

  return <RouterProvider router={router} />;
};

export default App;