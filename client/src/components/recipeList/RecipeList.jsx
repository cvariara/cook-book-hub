import React from "react";
import "./recipeList.scss";
import { recipeData } from "../../lib/data";
import Card from "../card/Card";

console.log(recipeData.length);

const RecipeList = () => {
  return (
    <div className="recipe-list">
      {recipeData.length === 0 ? (
        <span>There are no recipes.</span>
      ) : (
        recipeData.map((recipe) => <Card key={recipe.id} recipe={recipe} />)
      )}
    </div>
  );
};

export default RecipeList;
