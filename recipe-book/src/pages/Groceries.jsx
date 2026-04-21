import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

function Groceries() {

  const [recipes, updateRecipes] = useState(() => {
      // Initialize recipes from localStorage if available
      const savedRecipes = localStorage.getItem("recipes"); // Retrieve saved recipes from localStorage
      return savedRecipes ? JSON.parse(savedRecipes) : []; // Start with an empty array if no recipes are saved
    });

  const [groceryList, updateGroceryList] = useState({});

  function clearGroceryList() {
    updateGroceryList({});
  }

  function handleAddIngredient(ingredient) { //creates new array with existing grocery list and new ingredient added to it
    const key = ingredient.toLowerCase();
    if (groceryList[key]){
      updateGroceryList({...groceryList, [key]: groceryList[key] + 1 });
      return;
    } else {
      updateGroceryList({ ...groceryList, [key]: 1 });
    }

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
        {groceryList && Object.keys(groceryList).length > 0 ? (
          <ul>
            {Object.entries(groceryList).map((item, index) => (
              <li key={index}>
                {item[0]} {item[1] > 1 ? `x${item[1]}` : ""}
                <button onClick={() => {
                  const updatedList = { ...groceryList };
                  delete updatedList[item[0]];
                  updateGroceryList(updatedList);
                }}>

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
