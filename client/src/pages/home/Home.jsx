import React, { useContext } from "react";
import "./home.scss";
import Hero from "../../components/hero/Hero";
import Featured from "../../components/featured/Featured";
import Latest from "../../components/latest/Latest";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="home">
      <Hero />
      <Featured />
      <Latest />
    </div>
  );
};

export default Home;
