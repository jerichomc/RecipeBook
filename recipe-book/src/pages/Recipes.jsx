import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const [recipes, updateRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const [recipeCount, updateRecipeCount] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");
    return savedRecipes ? JSON.parse(savedRecipes).length : 0;
  });

  
  const [showForm, updateShowForm] = useState(false);
  const [recipeName, updateRecipeName] = useState("");
  const [ingredients, updateIngredients] = useState([]);
  const [ingredientInput, updateIngredientInput] = useState("");
  const [instructions, updateInstructions] = useState([]);
  const [instructionInput, updateInstructionInput] = useState("");
  const [editForm, updateEditForm] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [searchTerm, updateSearchTerm] = useState("");
  const [sortOrder, updateSortOrder] = useState("asc");

  const filteredRecipes = [...recipes].filter((recipe)=> { // Filter recipes based on search term
    const query = searchTerm.toLowerCase().trim(); // Normalize search term
      //searchTerm is a state that starts emoty and returns all recipes if empty
    if (!query) return true; // If search term is empty, include all recipes

    const nameMatch = recipe.recipeName.toLowerCase().includes(query); // Check if recipe name matches search term
    
    const ingredientMatch = recipe.ingredients.some((ingredient) => {
      return ingredient.toLowerCase().includes(query) // Check if any ingredient matches search term
    });

    const instructionMatch = recipe.instructions.some((instruction) => {
      return instruction.toLowerCase().includes(query) // Check if any instruction matches search term
    });

    return nameMatch || ingredientMatch || instructionMatch; // Include recipe if any match is found
  })
  .sort ((a, b) => {
    switch (sortOrder) {
      case "a-z":
        return a.recipeName.localeCompare(b.recipeName); // Sort recipes alphabetically by name
      case "z-a":
        return b.recipeName.localeCompare(a.recipeName); // Sort recipes in reverse alphabetical order by name
      case "oldest":
        return 0; // Keep original order (oldest first)
      case "newest":
      default:
        return 0; // Keep original order (newest first)
    }
  })


  function addRecipe(nextRecipeName, nextIngredients, nextInstructions) {
    const newRecipe = {
      id: crypto.randomUUID(),
      recipeName: nextRecipeName,
      ingredients: nextIngredients,
      instructions: nextInstructions,
    };

    const updatedRecipes = [...recipes, newRecipe];
    updateRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    updateRecipeCount(recipeCount + 1);
  }

  function deleteRecipe(recipeId) {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
      updateRecipes(updatedRecipes);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    }
  }

  function editRecipe(
    recipeId,
    updatedName,
    updatedIngredients,
    updatedInstructions,
  ) {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return {
          ...recipe,
          recipeName: updatedName,
          ingredients: updatedIngredients,
          instructions: updatedInstructions,
        };
      }

      return recipe;
    });

    updateRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  }

  function addIngredient() {
    if (!ingredientInput.trim()) return;
    updateIngredients([...ingredients, ingredientInput.trim()]);
    updateIngredientInput("");
  }

  function addInstruction() {
    if (!instructionInput.trim()) return;
    updateInstructions([...instructions, instructionInput.trim()]);
    updateInstructionInput("");
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

  function handleEdit(recipe) {
  setEditingRecipeId(recipe.id);
  updateRecipeName(recipe.recipeName);
  updateIngredients(recipe.ingredients);
  updateInstructions(recipe.instructions);
  updateEditForm(true);
}


  return (
    <div className="App">
      <Navbar />
      <main className="recipe-content">
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
            <h3>Browse Recipes</h3>
            <input value={searchTerm} onChange={(e) => {
              updateSearchTerm(e.target.value);
            }}></input>
            

            {recipes && recipes.length > 0 && (
              <div>
                <ul>
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id}
                    recipe={recipe}
                    onEdit={handleEdit}
                    onDelete={deleteRecipe}
                    />
                  ))}
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
            <h3>Share & Discover</h3>
            <p>Share your own recipes and discover creations from others.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Recipes;
