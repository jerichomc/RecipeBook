import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

function Groceries() {

  const [recipes, updateRecipes] = useState(() => {
      // Initialize recipes from localStorage if available
      const savedRecipes = localStorage.getItem("recipes"); // Retrieve saved recipes from localStorage
      return savedRecipes ? JSON.parse(savedRecipes) : []; // Start with an empty array if no recipes are saved
    });

  const [groceryList, updateGroceryList] = useState(() => {
    const savedGroceryList = localStorage.getItem("groceryList"); // Retrieve saved grocery list from localStorage
    return savedGroceryList ? JSON.parse(savedGroceryList) : {}; // Start with an empty object if no grocery list is saved
  });

 function clearGroceryList() {
  const updatedList = {}; // Create an empty object to clear the grocery list
  updateGroceryList(updatedList); // Update the state with the empty grocery list
  localStorage.setItem("groceryList", JSON.stringify(updatedList)); // Update localStorage with the cleared grocery list
}

  function handleAddIngredient(ingredient) {
    const key = ingredient.trim().toLowerCase(); // Normalize the ingredient name to ensure consistency

    let updatedList; // Declare a variable to hold the updated grocery list

    if (groceryList[key]) { // Check if the ingredient already exists in the grocery list
      updatedList = {
        ...groceryList, // Spread the existing grocery list to maintain other items
        [key]: groceryList[key] + 1, // Increment the quantity of the existing ingredient by 1
      };
    } else {
      updatedList = {
        ...groceryList,
        [key]: 1, // Add the new ingredient with a quantity of 1
      };
    }

    updateGroceryList(updatedList); // Update the state with the new grocery list
    localStorage.setItem("groceryList", JSON.stringify(updatedList)); // Update localStorage with the new grocery list
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
            {Object.entries(groceryList).map((item, index) => ( // Convert the grocery list object into an array of [ingredient, quantity] pairs and map over it to display each item in the grocery list
              <li key={index}> // Display the ingredient name and quantity (if greater than 1) for each item in the grocery list
                {item[0]} {item[1] > 1 ? `x${item[1]}` : ""} // Display the ingredient name and quantity (if greater than 1) for each item in the grocery list
                <button onClick={() => {
                  const updatedList = { ...groceryList }; // Create a copy of the current grocery list
                  delete updatedList[item[0]]; // Remove the ingredient from the grocery list
                  updateGroceryList(updatedList); // Update the state with the new grocery list
                  localStorage.setItem("groceryList", JSON.stringify(updatedList)); // Update localStorage with the new grocery list after removal
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
