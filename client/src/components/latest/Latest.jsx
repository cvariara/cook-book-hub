import React from "react";
import "./latest.scss";
import Card from "../card/Card";

const Latest = ({ recipes }) => {
  const data = recipes.slice(0, 4);
  return (
    <div className="latest">
      <h1>Latest</h1>
      <div className="recipes">
        {data.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Latest;
