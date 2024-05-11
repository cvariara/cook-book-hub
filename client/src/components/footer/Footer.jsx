import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  const user = true;

  return (
    <footer className="footer">
      <div className="tabs">
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        {user ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <>
            <a href="/">Sign in</a>
            <a href="/">Sign up</a>
          </>
        )}
      </div>
      Copyright &copy; 2024 Christopher Variara
    </footer>
  );
};

export default Footer;
