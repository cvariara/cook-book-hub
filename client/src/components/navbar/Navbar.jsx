import React, { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo2.png" alt="" />
          <span>cook-book-hub</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/default.jpg"} alt="User avatar" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile-btn">
              Profile
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/signup" className="signup-btn">
              Sign up
            </Link>
          </>
        )}
        <div className="menu-icon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
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
      </div>
    </nav>
  );
};

export default Navbar;
