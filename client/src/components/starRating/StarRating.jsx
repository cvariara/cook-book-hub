import React from "react";
import "./starRating.scss";

const StarRating = ({ rating }) => {
  console.log(rating)
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "filled" : ""}>
        ★
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
