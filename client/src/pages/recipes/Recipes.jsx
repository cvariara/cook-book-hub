import React from "react";
import "./recipes.scss";
import { recipeData } from "../../lib/data";
import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";

const Recipes = () => {
  const data = recipeData;

  return (
    <div className="items">
      <h1>Recipes</h1>
      <div className="items-container">
        <Filter />
        <div className="wrapper">
          {data.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
