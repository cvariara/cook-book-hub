import React from "react";
import "./featured.scss";
import { recipeData } from "../../lib/data";
import { Link } from "react-router-dom";

const Featured = ({ featuredRecipe }) => {
  const recipe = featuredRecipe || recipeData[0];
  const reviews = recipe.reviews;

  let totalRating = 0;
  let totalReviews = reviews.length;

  for (let i = 0; i < totalReviews; i++) {
    totalRating += reviews[i].rating;
  }

  const averageRating = (totalRating / totalReviews).toFixed(1);

  return (
    <div className="featured">
      <h1>Featured</h1>
      <div className="featured-recipe">
        <div className="card">
          <div className="top">
            <Link to={`/recipes/${recipe.id}`} className="img-container">
              <img src={recipe.img} alt={recipe.name} />
            </Link>
            <button className="save">
              <img src="/save.png" alt="" />
            </button>
          </div>
          <div className="text-container">
            <h1>{recipe.name}</h1>
            <p>
            {Number(averageRating) ? averageRating + "stars | " : ""} {totalReviews} reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
