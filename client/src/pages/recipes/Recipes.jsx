import React, { Suspense } from "react";
import "./recipes.scss";
import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import { Await, useLoaderData } from "react-router-dom";

const Recipes = () => {
  const recipes = useLoaderData();

  return (
    <div className="items">
      <h1>Recipes</h1>
      <div className="items-container">
        <Filter />
        <Suspense fallback={<p>Loading...</p>}>
          <div className="wrapper">
            <Await
              resolve={recipes.recipeResponse}
              errorElement={<p>Error loading recipes!</p>}
            >
              {(recipeResponse) =>
                recipeResponse.data.map((recipe) => (
                  <Card key={recipe.id} recipe={recipe} />
                ))
              }
            </Await>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Recipes;
