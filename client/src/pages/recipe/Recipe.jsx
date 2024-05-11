import React from "react";
import "./recipe.scss";
import { singleRecipeData } from "../../lib/data";
import StarRating from "../../components/starRating/StarRating";

const Recipe = () => {
  const recipe = singleRecipeData;
  const information = recipe.information;
  const reviews = recipe.reviews;

  let totalRating = 0;
  let totalReviews = reviews.length;

  for (let i = 0; i < totalReviews; i++) {
    totalRating += reviews[i].rating;
  }

  const averageRating = (totalRating / totalReviews).toFixed(1);
  //console.log(recipe);

  return (
    <>
      <div className="recipe">
        <div className="details">
          <div className="wrapper">
            <div className="top">
              <h1>{recipe.name}</h1>
              <p>
                {averageRating} stars | {totalReviews} reviews
              </p>
              <p>{information.description}</p>
              <img src={recipe.img} alt="" />
            </div>
            <div className="ingredients">
              <h2>Ingredients</h2>
              <ul>
                {information.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="steps">
              <h2>Steps</h2>
              <ul>
                {information.steps.map((step, index) => (
                  <li key={index}>
                    <p>{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <div className="informations">
              <h1>Information</h1>
              <div className="information-container">
                <div className="information">
                  <h3>Servings:</h3>
                  <span>{information.servings}</span>
                </div>
                <div className="information">
                  <h3>Prep Time:</h3>
                  <span>{information.prepTime} Mins</span>
                </div>
                <div className="information">
                  <h3>Cook Time:</h3>
                  <span>{information.cookTime} Mins</span>
                </div>
                <div className="information">
                  <h3>Total Time:</h3>
                  <span>{information.totalTime} Mins</span>
                </div>
              </div>
            </div>
            <div className="nutritions">
              <h1>
                Nutrition Facts <span>(per serving)</span>
              </h1>
              <div className="nutritions-container">
                <div className="nutrition">
                  <h3>{information.nuritionPerServing.calories}</h3>
                  <span>Calories</span>
                </div>
                <div className="nutrition">
                  <h3>{information.nuritionPerServing.fat}g</h3>
                  <span>Fat</span>
                </div>
                <div className="nutrition">
                  <h3>{information.nuritionPerServing.carbs}g</h3>
                  <span>Carbs</span>
                </div>
                <div className="nutrition">
                  <h3>{information.nuritionPerServing.protein}g</h3>
                  <span>Protein</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews">
        <h1>Reviews</h1>
        <div className="leave-review">
          <h3>{recipe.name}</h3>
          <div className="rating">
            <h4>Your Rating</h4>
            <div className="star-rating">
              <input type="radio" id="star1" name="rating" value="1" />
              <label htmlFor="star1"></label>
              <input type="radio" id="star2" name="rating" value="2" />
              <label htmlFor="star2"></label>
              <input type="radio" id="star3" name="rating" value="3" />
              <label htmlFor="star3"></label>
              <input type="radio" id="star4" name="rating" value="4" />
              <label htmlFor="star4"></label>
              <input type="radio" id="star5" name="rating" value="5" />
              <label htmlFor="star5"></label>
            </div>
          </div>
          <div className="review">
            <div className="review-form">
              <label htmlFor="review">
                <h4>Your Review</h4>
              </label>
              <textarea
                name="review"
                id="review"
                placeholder="What did you think about this recipe?"
              ></textarea>
              <div className="action-buttons">
                <button className="cancel">Cancel</button>
                <button className="submit">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div className="comments">
          <div className="review-data">
            <span>{totalReviews} Reviews</span>
          </div>
          <div className="feedback-container">
            {reviews.map((review, index) => (
              <div key={index} className="feedback">
                <div className="feedback-user">
                  <img
                    src="/default.jpg"
                    alt=""
                    className="feedback-user-image"
                  />
                  <div className="feedback-user-name">{review.user}</div>
                </div>
                <div className="feedback-rating">
                  <StarRating rating={review.rating} />
                  <span className="feedback-created">05/26/2024</span>
                </div>
                <div className="feedback-comment">{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;
