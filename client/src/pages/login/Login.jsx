import React from "react";
import "./login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="form-container">
        <form action="">
          <h1>Welcome Back</h1>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button>Login</button>
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
