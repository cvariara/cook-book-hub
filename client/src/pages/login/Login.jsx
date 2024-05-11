import React, { useState } from "react";
import apiRequest from "../../lib/apiRequest.js";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <input type="text" name="username" placeholder="Username" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/signup">{"Don't"} have an account?</Link>
        </form>
      </div>
      <div className="img-container">
        <img src="./bg.jpg" alt="" />
      </div>
    </div>
  );
};

export default Login;
