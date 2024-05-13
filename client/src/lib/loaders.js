import apiRequest from "./apiRequest.js";

export const singlePageLoader = async ({ req, params }) => {
  const response = await apiRequest(`/recipes/${params.id}`);
  return response.data;
};
