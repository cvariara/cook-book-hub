import React, { useContext, useState } from "react";
import "./recipe.scss";
import StarRating from "../../components/starRating/StarRating";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";

const Recipe = () => {
  const recipe = useLoaderData();
  const information = recipe.recipeInfo;
  const reviews = recipe.reviews;
  const [saved, setSaved] = useState(recipe.isSaved);
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  let totalRating = 0;
  let totalReviews = reviews.length;

  for (let i = 0; i < totalReviews; i++) {
    totalRating += reviews[i].rating;
  }

  const averageRating = (totalRating / totalReviews).toFixed(1);

  const updateDate = (createdAt) => {
    // Convert createdAt to readable time
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  };

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // After React 19, update to useOptimistic hook
    setSaved((prev) => !prev);
    if (!currentUser) {
      navigate("/login");
    }

    try {
      await apiRequest.post("/users/save", {
        recipeId: recipe.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const response = await apiRequest.post(
        `/recipes/${recipe.id}/addReview`,
        {
          rating: parseInt(inputs.rating),
          comment: inputs.review,
        }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

    window.location.reload();
  };

  const showForm = () => {
    if (!currentUser) return false;
    if (currentUser.id === recipe.userId) return false;
    if (reviews.some((review) => review.userId === currentUser.id))
      return false;
    return true;
  };

  return (
    <>
      <div className="recipe">
        <div className="details">
          <div className="wrapper">
            <div className="top">
              <h1>{recipe.name}</h1>
              <a href="#reviews">
                <p>
                  {Number(averageRating) ? averageRating + " stars | " : ""}{" "}
                  {totalReviews} reviews
                </p>
              </a>
              <p>{information.description}</p>
              <p className="recipe-user">
                By <span>{recipe.user.username}</span> | Updated on{" "}
                {updateDate(recipe.createdAt)}
              </p>
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
                  <span>
                    {information.prepTime + information.cookTime} Mins
                  </span>
                </div>
              </div>
            </div>
            <div className="nutritions">
              <h1>
                Nutrition Facts <span>(per serving)</span>
              </h1>
              <div className="nutritions-container">
                <div className="nutrition">
                  <h3>{information.calories}</h3>
                  <span>Calories</span>
                </div>
                <div className="nutrition">
                  <h3>{information.fat}g</h3>
                  <span>Fat</span>
                </div>
                <div className="nutrition">
                  <h3>{information.carbs}g</h3>
                  <span>Carbs</span>
                </div>
                <div className="nutrition">
                  <h3>{information.protein}g</h3>
                  <span>Protein</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              <img src="/save.png" alt="Save recipe button" />
              {saved ? "Recipe Saved" : "Save this Recipe"}
            </button>
          </div>
        </div>
      </div>
      <div className="reviews" id="reviews">
        <h1>Reviews</h1>
        {showForm() && (
          <div className="leave-review">
            <h3>{recipe.name}</h3>
            <form onSubmit={handleSubmit}>
              <div className="rating">
                <h4>Your Rating</h4>
                <div className="star-rating">
                  <input type="radio" id="star1" name="rating" value="5" />
                  <label htmlFor="star1"></label>
                  <input type="radio" id="star2" name="rating" value="4" />
                  <label htmlFor="star2"></label>
                  <input type="radio" id="star3" name="rating" value="3" />
                  <label htmlFor="star3"></label>
                  <input type="radio" id="star4" name="rating" value="2" />
                  <label htmlFor="star4"></label>
                  <input type="radio" id="star5" name="rating" value="1" />
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
                    <button className="cancel" onClick={handleCancel}>
                      Cancel
                    </button>
                    <button className="submit">Submit</button>
                  </div>
                </div>
              </div>
            </form>
            {error && <span className="error">{error}</span>}
          </div>
        )}
        <div className="comments">
          <div className="review-data">
            <span>{totalReviews} Reviews</span>
          </div>
          <div className="feedback-container">
            {reviews.map((review, index) => (
              <div key={index} className="feedback">
                <div className="feedback-user">
                  <img
                    src={review.user.avatar || "/default.jpg"}
                    alt=""
                    className="feedback-user-image"
                  />
                  <div className="feedback-user-name">
                    {review.user.username}
                  </div>
                </div>
                <div className="feedback-rating">
                  <StarRating rating={review.rating} />
                  <span className="feedback-created">
                    {updateDate(review.createdAt)}
                  </span>
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
