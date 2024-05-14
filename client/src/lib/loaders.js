import { defer } from "react-router-dom";
import apiRequest from "./apiRequest.js";

export const singlePageLoader = async ({ request, params }) => {
  const response = await apiRequest(`/recipes/${params.id}`);
  return response.data;
};

export const recipesPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const recipePromise = apiRequest(`/recipes?${query}`);
  return defer({
    recipeResponse: recipePromise,
  });
};

export const allRecipesLoader = async ({ request }) => {
  const response = await apiRequest("/recipes/");
  return response.data;
};

export const allUsersLoader = async ({ request }) => {
  const response = await apiRequest("/users/");
  return response.data;
};

export const profilePageLoader = async () => {
  const recipePromise = await apiRequest("/users/profileRecipes");
  return defer({
    recipeResponse: recipePromise,
  });
};
