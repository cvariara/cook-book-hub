import React from "react";
import "./hero.scss";

const Hero = ({ numOfRecipes }) => {
  return (
    <div className="hero">
      <div className="text-container">
        <div className="wrapper">
          <h1 className="title">Find Your Favorite Recipes Online!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            temporibus itaque suscipit non ipsam voluptatibus, dolor cum quam
            consectetur tempora deserunt rerum omnis facilis aperiam numquam?
            Inventore id officiis vitae.
          </p>
          <div className="boxes">
            <div className="box">
              <h1>{numOfRecipes}+</h1>
              <h2>Recipes</h2>
            </div>
            <div className="box">
              <h1>200+</h1>
              <h2>Users</h2>
            </div>
            <div className="box">
              <h1>2+</h1>
              <h2>Years of Experience</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="img-container">
        <img src="bg.jpg" alt="" />
      </div>
    </div>
  );
};

export default Hero;
