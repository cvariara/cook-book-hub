import React, { useContext } from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Footer = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <footer className="footer">
      <div className="tabs">
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        {currentUser ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
      Copyright &copy; 2024 Christopher Variara
    </footer>
  );
};

export default Footer;
