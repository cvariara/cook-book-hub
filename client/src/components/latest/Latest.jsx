import React from "react";
import "./latest.scss";
import { recipeData } from "../../lib/data";
import Card from "../card/Card";

const Latest = () => {
  const data = recipeData.slice(0, 4);
  return (
    <div className="latest">
      <h1>Latest</h1>
      <div className="recipes">
        {data.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
        {/* <div className="recipe">
          <img src="/chicken-parm.jpg" alt="" />
          <div className="wrapper">
            <h2>Chicken Parmesean</h2>
            <p>10 reviews | 5 stars</p>
          </div>
        </div>
        <div className="recipe">
          <img src="/penne-alla-vodka.jpg" alt="" />
          <div className="wrapper">
            <h2>Penne Alla Vodka</h2>
            <p>10 reviews | 5 stars</p>
          </div>
        </div>
        <div className="recipe">
          <img src="/chicken-parm.jpg" alt="" />
          <div className="wrapper">
            <h2>Chicken Parmesean</h2>
            <p>10 reviews | 5 stars</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Latest;
