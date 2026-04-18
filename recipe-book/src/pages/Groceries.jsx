import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

function Groceries() {

  const [recipes, updateRecipes] = useState(() => {
      // Initialize recipes from localStorage if available
      const savedRecipes = localStorage.getItem("recipes"); // Retrieve saved recipes from localStorage
      return savedRecipes ? JSON.parse(savedRecipes) : []; // Start with an empty array if no recipes are saved
    });

  const [groceryList, updateGroceryList] = useState([]);

  function clearGroceryList() {
    updateGroceryList([]);
  }
  function handleAddGroceries(recipe){
    updateGroceryList([...groceryList, recipe.ingredients]);
  }

  function handleAddIngredient(ingredient) {
    updateGroceryList([...groceryList, ingredient]);
  }

  return (
    <div className="App">
      <Navbar />
      <h1>Groceries</h1>
        <div className="recipe-list"> 
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            showIngredients={true}
            onAddIngredientToGroceries={handleAddIngredient}
            showInstructions={false}

          />
        ))}
        </div>
      <div>
        <h2>Grocery List</h2>
        {groceryList && groceryList.length > 0 ? (
          <ul>
            {groceryList.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => updateGroceryList(groceryList.filter((_, i) => i !== index))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
        ) : (
          <p>Your grocery list is empty.</p>

        )}
        <button onClick={clearGroceryList}>Clear List</button>
      </div>
    </div>
  )
}

export default Groceries;
