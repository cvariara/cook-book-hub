import apiRequest from "./apiRequest.js";

export const singlePageLoader = async ({ req, params }) => {
  const response = await apiRequest(`/recipes/${params.id}`);
  return response.data;
};

export const allRecipesLoader = async ({ req }) => {
  const response = await apiRequest("/recipes/");
  return response.data;
};

export const allUsersLoader = async ({ req }) => {
  const response = await apiRequest("/users/");
  return response.data;
};