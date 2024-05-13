import React, { useContext } from "react";
import "./profile.scss";
import RecipeList from "../../components/recipeList/RecipeList";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
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
