import React from "react";
import "./filter.scss";

const Filter = () => {
  return (
    <div className="filter">
      <div className="left">
        <h1>Search recipes you would like to cook</h1>
        <div className="item">
          <input type="text" placeholder="Search recipe..." />
          <button>
            <img src="/search.png" alt="" />
          </button>
        </div>
      </div>
      <div className="right">
        <h3>Popular Searches</h3>
        <div className="ingredient-items">
          <button className="ingredient-item">Chicken</button>
          <button className="ingredient-item">Eggs</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
