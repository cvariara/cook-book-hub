import React, { Suspense, useContext } from "react";
import "./profile.scss";
import RecipeList from "../../components/recipeList/RecipeList";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const recipes = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(recipes.recipeResponse.data.userRecipes)

  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/settings">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:{" "}
              <img
                src={currentUser.avatar || "/default.jpg"}
                alt="User avatar"
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              Email: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My Recipes</h1>
            <Link to="/add">
              <button>Create New Recipe</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <div className="wrapper">
              <Await
                resolve={recipes.recipeResponse}
                errorElement={<p>Error loading recipes!</p>}
              >
                {(recipeResponse) => (
                  <RecipeList recipes={recipeResponse.data.userRecipes} />
                )}
              </Await>
            </div>
          </Suspense>
        </div>
      </div>
      <div className="saved-recipes-container">
        <div className="wrapper">
          <div className="title">
            <h1>Saved Recipes</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <div className="wrapper">
              <Await
                resolve={recipes.recipeResponse}
                errorElement={<p>Error loading recipes!</p>}
              >
                {(recipeResponse) => (
                  <RecipeList recipes={recipeResponse.data.savedRecipes} />
                )}
              </Await>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Profile;
