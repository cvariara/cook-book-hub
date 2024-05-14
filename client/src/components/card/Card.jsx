import React from 'react'
import "./card.scss";
import { Link } from 'react-router-dom';

const Card = ({ recipe }) => {
  const reviews = recipe.reviews;

  let totalRating = 0;
  let totalReviews = reviews.length;

  for (let i = 0; i < totalReviews; i++) {
    totalRating += reviews[i].rating;
  }

  const averageRating = (totalRating / totalReviews).toFixed(1);

  return (
    <div className='card'>
      <div className="top">
        <Link to={`/recipes/${recipe.id}`} className='img-container' >
          <img src={recipe.img} alt={recipe.name} />
        </Link>
        <button className="save">
          <img src="/save.png" alt="" />
        </button>
      </div>
      <div className="text-container">
        <h1>{recipe.name}</h1>
        <p>
          {Number(averageRating) ? averageRating + " stars | " : ""} {totalReviews} reviews
        </p>
      </div>
    </div>
  )
}

export default Card