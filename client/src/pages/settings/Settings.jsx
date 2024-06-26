import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./settings.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import UploadWidget from "../../components/uploadWidget/UploadWidget.jsx";

const Settings = () => {
  const [error, setError] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const response = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar,
      });

      updateUser(response.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="settings">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="side-container">
        <img
          src={avatar || currentUser.avatar || "/default.jpg"}
          alt="User's avatar"
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "do5bdq9o9",
            uploadPreset: "cookbookhub",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
};

export default Settings;
