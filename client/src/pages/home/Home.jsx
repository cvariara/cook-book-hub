import React, { useContext } from "react";
import "./home.scss";
import Hero from "../../components/hero/Hero";
import Featured from "../../components/featured/Featured";
import Latest from "../../components/latest/Latest";
import { AuthContext } from "../../context/AuthContext";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const recipes = useLoaderData();

  const numOfRecipes = recipes.length;

  const featuredRecipe = recipes[Math.floor(Math.random() * recipes.length)];

  //console.log(recipes)
  //console.log(featuredRecipe)
  
  return (
    <div className="home">
      <Hero numOfRecipes={numOfRecipes} />
      <Featured featuredRecipe={featuredRecipe} />
      <Latest recipes={recipes} />
    </div>
  );
};

export default Home;
