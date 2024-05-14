import React from "react";
import "./recipeList.scss";
import Card from "../card/Card";

const RecipeList = ({ recipes }) => {
  //console.log(recipes)
  return (
    <div className="recipe-list">
      {!recipes.length ? (
        <span>There are no recipes.</span>
      ) : (
        recipes.map((recipe) => <Card key={recipe.id} recipe={recipe} />)
      )}
    </div>
  );
};

export default RecipeList;
