import React from "react";
import "./home.scss";
import Hero from "../../components/hero/Hero";
import Featured from "../../components/featured/Featured";
import Latest from "../../components/latest/Latest";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Featured />
      <Latest />
    </div>
  );
};

export default Home;
