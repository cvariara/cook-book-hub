import React from "react";
import "./profile.scss";
import RecipeList from "../../components/recipeList/RecipeList";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = apiRequest.post("/auth/logout");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar: <img src="/default.jpg" alt="" />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              Email: <b>john@gmail.com</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My Recipes</h1>
            <button>Create New Recipe</button>
          </div>
          <RecipeList />
        </div>
      </div>
      <div className="saved-recipes-container">
        <div className="wrapper">
          <div className="title">
            <h1>Saved Recipes</h1>
          </div>
          <RecipeList />
        </div>
      </div>
    </div>
  );
};

export default Profile;
