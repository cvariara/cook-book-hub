import React, { useState } from "react";
import "./newRecipe.scss";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

const NewRecipe = () => {
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const response = await apiRequest.post("/recipes", {
        recipeData: {
          name: inputs.name,
          img: image,
        },
        recipeInfo: {
          servings: parseInt(inputs.servings),
          prepTime: parseInt(inputs.prepTime),
          cookTime: parseInt(inputs.cookTime),
          calories: parseInt(inputs.calories),
          fat: parseInt(inputs.fat),
          carbs: parseInt(inputs.carbs),
          protein: parseInt(inputs.protein),
          description: inputs.desc,
          ingredients,
          steps,
        },
      });
      navigate(`/recipes/${response.data.id}`);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    setSteps([...steps, ""]);
  };

  return (
    <div className="new-recipe">
      <div className="form-container">
        <h1>Add New Recipe</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="name">
                Name <span className="required">*</span>
              </label>
              <input id="name" name="name" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">
                Description <span className="required">*</span>
              </label>
              <textarea name="desc" id="desc"></textarea>
            </div>
            <div className="item">
              <label htmlFor="servings">
                Servings <span className="required">*</span>
              </label>
              <input min={1} id="servings" name="servings" type="number" />
            </div>
            <div className="item">
              <label htmlFor="prepTime">
                Prep Time <span className="required">*</span>
              </label>
              <input min={1} id="prepTime" name="prepTime" type="number" />
            </div>
            <div className="item">
              <label htmlFor="cookTime">
                Cook Time <span className="required">*</span>
              </label>
              <input min={1} id="cookTime" name="cookTime" type="number" />
            </div>
            <div className="item">
              <label htmlFor="calories">Calories</label>
              <input min={1} id="calories" name="calories" type="number" />
            </div>
            <div className="item">
              <label htmlFor="fat">Fat</label>
              <input min={1} id="fat" name="fat" type="number" />
            </div>
            <div className="item">
              <label htmlFor="carbs">Carbs</label>
              <input min={1} id="carbs" name="carbs" type="number" />
            </div>
            <div className="item">
              <label htmlFor="protein">Protein</label>
              <input min={1} id="protein" name="protein" type="number" />
            </div>
            <div className="ingredients">
              <h2>
                Ingredients <span className="required">*</span>
              </h2>
              <div className="items">
                {ingredients.map((ingredient, index) => (
                  <div className="item" key={index}>
                    <textarea
                      value={ingredient}
                      onChange={(e) => {
                        const newIngredients = [...ingredients];
                        newIngredients[index] = e.target.value;
                        setIngredients(newIngredients);
                      }}
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleAddIngredient}>+</button>
            </div>
            <div className="steps">
              <h2>
                Steps <span className="required">*</span>
              </h2>
              <div className="items">
                {steps.map((step, index) => (
                  <div className="item" key={index}>
                    <textarea
                      value={step}
                      onChange={(e) => {
                        const newSteps = [...steps];
                        newSteps[index] = e.target.value;
                        setSteps(newSteps);
                      }}
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleAddStep}>+</button>
            </div>
            <button className="send-button">Add</button>
            {error && <span className="error">error</span>}
          </form>
        </div>
      </div>
      <div className="side-container">
        {image && <img src={image} alt="" />}
        <UploadWidget
          uwConfig={{
            cloudName: "do5bdq9o9",
            uploadPreset: "cookbookhub",
            multiple: false,
            folder: "recipes",
          }}
          setAvatar={setImage}
        />
      </div>
    </div>
  );
};

export default NewRecipe;
