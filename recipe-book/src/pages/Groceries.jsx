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
        ...groceryList, //copy the existing grocery list to maintain all other ingredients
        [key]: {
          ...groceryList[key], // Keep the existing properties of the ingredient
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
        ...groceryList[ingredient], // Keep the existing properties of the ingredient
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

function clearPurchased(){
  const updatedList = Object.fromEntries(
    Object.entries(groceryList).filter(([_, item]) => !item.checked) // Filter out ingredients that are marked as checked (purchased)
  );
  updateGroceryList(updatedList);
  localStorage.setItem("groceryList", JSON.stringify(updatedList)); // Update localStorage with the new grocery list after clearing purchased items
}

function decrementIngredient(ingredient) {
  if(groceryList[ingredient] && groceryList[ingredient].quantity === 1){
    removeIngredientFromGroceries(ingredient); // If the quantity of the ingredient is 1, remove it from the grocery list
  }
  else if(groceryList[ingredient] && groceryList[ingredient].quantity > 1){
    const updatedList = {
      ...groceryList,
      [ingredient]: {
        ...groceryList[ingredient], // Keep the existing properties of the ingredient
        quantity: groceryList[ingredient].quantity - 1, // Decrement the quantity of the ingredient by 1
      }
    };
    updateGroceryList(updatedList);
    localStorage.setItem("groceryList", JSON.stringify(updatedList));
  }
}

function incrementIngredient(ingredient) {
  if(groceryList[ingredient]){
    const updatedList = {
      ...groceryList,
      [ingredient]: {
        ...groceryList[ingredient], // Keep the existing properties of the ingredient
        quantity: groceryList[ingredient].quantity + 1, // Increment the quantity of the ingredient by 1
      }
    };
    updateGroceryList(updatedList);
    localStorage.setItem("groceryList", JSON.stringify(updatedList));
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

    <div className="grocery-panel">
      <div className="grocery-panel-header">
        <h2>Grocery List</h2>
        <div className="grocery-actions">
          <button onClick={clearPurchased}>Clear Purchased</button>
          <button onClick={clearGroceryList}>Clear</button>
        </div>
      </div>

      {groceryList && Object.keys(groceryList).length > 0 ? (
        <ul className="grocery-list">
          {Object.entries(groceryList).map(([ingredient, item]) => (
            <li key={ingredient} className="grocery-item">
              <label className="grocery-item-main">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleIngredientChecked(ingredient)}
                />
                <span
                  className={item.checked ? "grocery-name checked" : "grocery-name"}
                >
                  {ingredient}
                </span>
              </label>

              <div className="grocery-quantity-controls">
                <button onClick={() => decrementIngredient(ingredient)}>-</button>
                <span className="grocery-quantity">{item.quantity}</span>
                <button onClick={() => incrementIngredient(ingredient)}>+</button>
              </div>

              <button
                className="grocery-remove-btn"
                onClick={() => removeIngredientFromGroceries(ingredient)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="grocery-empty">Your grocery list is empty.</p>
      )}
    </div>
  </div>
);
}

export default Groceries;
