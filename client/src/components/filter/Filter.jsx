import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./filter.scss";

const Filter = () => {
  const [item, setItem] = useState("");

  return (
    <div className="filter">
      <div className="left">
        <h1>Search recipes you would like to cook</h1>
        <div className="item">
          <form action="">
            <input
              type="text"
              placeholder="Search recipe..."
              onChange={(e) => setItem(e.target.value)}
            />
            <Link to={`/recipes?item=${item}`}>
              <button>
                <img src="/search.png" alt="" />
              </button>
            </Link>
          </form>
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
