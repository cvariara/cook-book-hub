import React from "react";
import "./signup.scss";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup">
      <div className="form-container">
        <form action="">
          <h1>Create an Account</h1>
          <input type="text" name="username" placeholder="Username" />
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="img-container">
        <img src="./bg.jpg" alt="" />
      </div>
    </div>
  );
};

export default Signup;
