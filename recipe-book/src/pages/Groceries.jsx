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
    const key = ingredient.trim().toLowerCase(); // Normalize the ingredient name by trimming whitespace and converting to lowercase

    let updatedList; // Create a new variable to hold the updated grocery list

    if(groceryList[key]) { // Check if the ingredient already exists in the grocery list
      updatedList = {
        ...groceryList,
        [key]: {
          ...groceryList[key],
          quantity: groceryList[key].quantity + 1, // If the ingredient already exists, increment the quantity by 1
        },
      };
    } else { // If the ingredient does not exist in the grocery list, add it with a quantity of 1
      updatedList = {
        ...groceryList,
        [key]: {
          quantity: 1,
          checked: false, // Add a checked property to track whether the ingredient has been marked as purchased
        },
      };
    }
    updateGroceryList(updatedList);
    localStorage.setItem("groceryList", JSON.stringify(updatedList)); // Update localStorage with the new grocery list after adding the ingredient
  }

  function toggleIngredientChecked(ingredient) {
    const updatedList ={
      ...groceryList,
      [ingredient]: {
        ...groceryList[ingredient],
        checked: !groceryList[ingredient].checked, // Toggle the checked status of the ingredient
      },
    };
    updateGroceryList(updatedList);
    localStorage.setItem("groceryList", JSON.stringify(updatedList)); // Update localStorage with the new grocery list after toggling the checked status
  }

  function removeIngredientFromGroceries(ingredient) {
  const updatedList = { ...groceryList };
  delete updatedList[ingredient];

  updateGroceryList(updatedList);
  localStorage.setItem("groceryList", JSON.stringify(updatedList));
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
            {Object.entries(groceryList).map(([ingredient, item]) => (
              <li key={ingredient}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleIngredientChecked(ingredient)}
                  />
                  <span>
                    {ingredient} {item.quantity > 1 ? `x${item.quantity}` : ""}
                  </span>
                </label>

                <button
                  onClick={() => removeIngredientFromGroceries(ingredient)}
                >
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
  );
}

export default Groceries;
