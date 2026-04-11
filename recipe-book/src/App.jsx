import React, { useState } from "react";
import "./index.css";

function App() {
  const [recipes, updateRecipes] = useState(() => {
    // Initialize recipes from localStorage if available
    const savedRecipes = localStorage.getItem("recipes"); // Retrieve saved recipes from localStorage
    return savedRecipes ? JSON.parse(savedRecipes) : []; // Start with an empty array if no recipes are saved
  });
  const [recipeCount, updateRecipeCount] = useState(() => {
    // Initialize recipe count based on the number of recipes in localStorage
    const savedRecipes = localStorage.getItem("recipes"); // Retrieve saved recipes from localStorage
    return savedRecipes ? JSON.parse(savedRecipes).length : 0; // Set recipe count to the number of saved recipes or 0 if none are saved
  });
  const [showForm, updateShowForm] = useState(false);
  const [recipeName, updateRecipeName] = useState("");

  const [ingredients, updateIngredients] = useState([]);
  const [ingredientInput, updateIngredientInput] = useState("");

  const [instructions, updateInstructions] = useState([]);
  const [instructionInput, updateInstructionInput] = useState("");

  const [editForm, updateEditForm] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  function addRecipe(nextRecipeName, nextIngredients, nextInstructions) {
    // Create a new recipe object with a unique ID
    const newRecipe = {
      id: crypto.randomUUID(),
      recipeName: nextRecipeName,
      ingredients: nextIngredients,
      instructions: nextInstructions,
    };

    const updatedRecipes = [...recipes, newRecipe]; // Add the new recipe to the existing list of recipes
    updateRecipes(updatedRecipes); // Update the recipes state with the new list of recipes that includes the added recipe
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // Save the updated list of recipes to localStorage for persistence
    updateRecipeCount(recipeCount + 1); // Increment the recipe count by 1 after adding a new recipe
  }

  function deleteRecipe(recipeId) {
    // Remove the recipe with the specified ID from the list of recipes
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId); //creates new array excluding the recipe with the specified ID
      updateRecipes(updatedRecipes); //update the recipes state with new array of recipes that does not include the deleted recipe
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // Update localStorage with the new list of recipes after deletion
    }
  }

  function editRecipe(
    recipeId,
    updatedName,
    updatedIngredients,
    updatedInstructions,
  ) {
    const updatedRecipes = recipes.map((recipe) => {
      // Iterate through the list of recipes and update the one with the matching ID
      if (recipe.id === recipeId) {
        // If the current recipe's ID matches the ID of the recipe being edited, return a new recipe object with the updated name, ingredients, and instructions
        return {
          // Return a new recipe object with the updated name, ingredients, and instructions while keeping the other properties unchanged
          ...recipe,
          recipeName: updatedName,
          ingredients: updatedIngredients,
          instructions: updatedInstructions,
        };
      }

      return recipe; // If the current recipe's ID does not match the ID of the recipe being edited, return the original recipe object without any changes
    });

    updateRecipes(updatedRecipes); // Update the recipes state with the new list of recipes that includes the edited recipe
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // Update localStorage with the new list of recipes after editing
  }

  function addIngredient() {
    if (!ingredientInput.trim()) return; // Prevent adding empty ingredients

    updateIngredients([...ingredients, ingredientInput.trim()]); // Add the new ingredient to the list of ingredients
    updateIngredientInput(""); // Clear the ingredient input field after adding
  }

  function addInstruction() {
    if (!instructionInput.trim()) return; // Prevent adding empty instructions
    updateInstructions([...instructions, instructionInput.trim()]); // Add the new instruction to the list of instructions
    updateInstructionInput(""); // Clear the instruction input field after adding
  }

  function removeIngredient(indexToRemove) {
    updateIngredients(
      ingredients.filter((_, index) => index !== indexToRemove),
    );
  }
  function removeInstruction(indexToRemove) {
    updateInstructions(
      instructions.filter((_, index) => index !== indexToRemove),
    );
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Recipe Book</h1>
        <p>JERICHO HUNGEY!!! WHAT MAKE?</p>
      </header>
      <nav></nav>

      <main className="main-content">
        <section className="hero">
          <h2>Welcome to Your Recipe Collection</h2>
          <p>
            Find, save, and organize your favorite recipes all in one place.
          </p>
          <button className="cta-button" onClick={() => updateShowForm(true)}>
            Add Recipe
          </button>
          {showForm && (
            <div className="recipe-form">
              <h3>Add a New Recipe</h3>
              <input
                value={recipeName}
                onChange={(e) => updateRecipeName(e.target.value)}
              />{" "}
              //
              <input
                value={ingredientInput}
                onChange={(e) => updateIngredientInput(e.target.value)}
                placeholder="Enter an ingredient"
              ></input>
              <button onClick={addIngredient}>Add Ingredient</button>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient}
                    <button onClick={() => removeIngredient(index)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <input
                value={instructionInput}
                onChange={(e) => updateInstructionInput(e.target.value)}
                placeholder="Enter a step"
              ></input>
              <button onClick={addInstruction}>Add Step</button>
              <ol>
                {instructions.map((instruction, index) => (
                  <li key={index}>
                    {instruction}
                    <button onClick={() => removeInstruction(index)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ol>
              <button
                onClick={() => {
                  addRecipe(recipeName, ingredients, instructions);
                  updateShowForm(false);
                  updateRecipeName("");
                  updateIngredients([]);
                  updateInstructions([]);
                  updateIngredientInput("");
                  updateInstructionInput("");
                }}
              >
                Save
              </button>
              <button onClick={() => updateShowForm(false)}>Cancel</button>
            </div>
          )}
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>📖 Browse Recipes</h3>
            <p>Explore a wide variety of recipes from around the world.</p>
            {recipes && recipes.length > 0 && (
              <div>
                <ul>
                  {recipes.map((recipe) => {
                    return (
                      <li className="recipe-card" key={recipe.id}>
                        <h4>{recipe.recipeName}</h4>
                        <p>
                          <strong>Ingredients:</strong>
                        </p>
                        <ul>
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                        <p>
                          <strong>Instructions:</strong>
                        </p>
                        <ol>
                          {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                        <button onClick={() => deleteRecipe(recipe.id)}>
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setEditingRecipeId(recipe.id);
                            updateRecipeName(recipe.recipeName);
                            updateIngredients(recipe.ingredients);
                            updateInstructions(recipe.instructions);
                            updateEditForm(true);
                          }}
                        >
                          Edit
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {editForm && (
                  <div className="recipe-form">
                    <h3>Edit Recipe</h3>

                    <input
                      value={recipeName}
                      onChange={(e) => updateRecipeName(e.target.value)}
                      placeholder="Recipe name"
                    />

                    <input
                      value={ingredientInput}
                      onChange={(e) => updateIngredientInput(e.target.value)}
                      placeholder="Enter an ingredient"
                    />
                    <button onClick={addIngredient}>Add Ingredient</button>

                    <ul>
                      {ingredients.map((ingredient, index) => (
                        <li key={index}>
                          {ingredient}
                          <button onClick={() => removeIngredient(index)}>
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>

                    <input
                      value={instructionInput}
                      onChange={(e) => updateInstructionInput(e.target.value)}
                      placeholder="Enter a step"
                    />
                    <button onClick={addInstruction}>Add Step</button>

                    <ol>
                      {instructions.map((instruction, index) => (
                        <li key={index}>
                          {instruction}
                          <button onClick={() => removeInstruction(index)}>
                            Remove
                          </button>
                        </li>
                      ))}
                    </ol>

                    <button
                      onClick={() => {
                        editRecipe(
                          editingRecipeId,
                          recipeName,
                          ingredients,
                          instructions,
                        );
                        updateEditForm(false);
                        setEditingRecipeId(null);
                        updateRecipeName("");
                        updateIngredients([]);
                        updateInstructions([]);
                        updateIngredientInput("");
                        updateInstructionInput("");
                      }}
                    >
                      Save Changes
                    </button>

                    <button
                      onClick={() => {
                        updateEditForm(false);
                        setEditingRecipeId(null);
                        updateRecipeName("");
                        updateIngredients([]);
                        updateInstructions([]);
                        updateIngredientInput("");
                        updateInstructionInput("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="feature-card">
            <h3>Save Favorites</h3>
            <p>
              Keep track of your favorite recipes in your personal collection.
            </p>
          </div>
          <div className="feature-card">
            <h3>👨‍🍳 Share & Discover</h3>
            <p>Share your own recipes and discover creations from others.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Recipe Book. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
