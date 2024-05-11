import React, { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = true;

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
        {user ? (
          <div className="user">
            <img src="/default.jpg" alt="" />
            <span>John Doe</span>
            <Link to="/profile" className="profile-btn">
              Profile
            </Link>
          </div>
        ) : (
          <>
            <a href="/">Sign in</a>
            <a href="/" className="signup">
              Sign up
            </a>
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
          {user ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <>
              <a href="/">Sign in</a>
              <a href="/">Sign up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
