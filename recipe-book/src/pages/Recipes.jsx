import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const [recipes, updateRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
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
  const [sortOrder, updateSortOrder] = useState("newest");
  const [formError, setFormError] = useState("");


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
        return new Date(a.createdAt) - new Date(b.createdAt); // Sort recipes by creation date (oldest first)
      case "newest":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort recipes by creation date (newest first)
    }
  })


  function addRecipe(nextRecipeName, nextIngredients, nextInstructions) {
    const newRecipe = {
      id: crypto.randomUUID(),
      recipeName: nextRecipeName,
      ingredients: nextIngredients,
      instructions: nextInstructions,
      createdAt: new Date().toISOString(),
    };

    const updatedRecipes = [...recipes, newRecipe];
    updateRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
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

  function handleEdit(recipe) { //
  setEditingRecipeId(recipe.id);
  updateRecipeName(recipe.recipeName);
  updateIngredients(recipe.ingredients);
  updateInstructions(recipe.instructions);
  updateEditForm(true);
}

function validateRecipeForm() {
  if(!recipeName.trim()) { // Check if recipe name is empty or just whitespace
    setFormError("Recipe name is required."); // Set an error message if the recipe name is invalid
    return false; // Return false to indicate that the form is not valid
  }
 
  if (ingredients.length === 0){ // Check if there are no ingredients added to the recipe
    setFormError("At least one ingredient is required."); // Set an error message if no ingredients are added
    return false; // Return false to indicate that the form is not valid
  }

  if (instructions.length === 0){ // Check if there are no instructions added to the recipe
    setFormError("At least one instruction step is required."); // Set an error message if no instructions are added
    return false; // Return false to indicate that the form is not valid
  }

  setFormError(""); // Clear any existing error messages if the form is valid
  return true; // Return true to indicate that the form is valid
}


  return (
  <div className="App">
    <Navbar />

    <main className="recipe-page">
      <section className="recipe-hero">
        <div className="recipe-hero-copy">
          <p className="recipe-eyebrow">Your Digital Cookbook</p>
          <h2>Build a recipe collection you will actually use.</h2>
          <p className="recipe-hero-text">
            Save favorites, search by ingredients, and keep your recipes ready
            whenever you need them.
          </p>
        </div>

        <div className="recipe-hero-actions">
          <button
            className="cta-button"
            onClick={() => updateShowForm(true)}
          >
            Add Recipe
          </button>
        </div>
      </section>

      {showForm && (
        <section className="recipe-form-panel">
          <div className="recipe-form">
            <h3>Add a New Recipe</h3>
            {formError && <p className="form-error">{formError}</p>}


            <input
              value={recipeName}
              onChange={(e) => updateRecipeName(e.target.value)}
              placeholder="Recipe name"
            />

            <div className="recipe-builder-row">
              <input
                value={ingredientInput}
                onChange={(e) => updateIngredientInput(e.target.value)}
                placeholder="Enter an ingredient"
              />
              <button onClick={addIngredient}>Add Ingredient</button>
            </div>

            <ul className="recipe-builder-list">
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span>{ingredient}</span>
                  <button onClick={() => removeIngredient(index)}>Remove</button>
                </li>
              ))}
            </ul>

            <div className="recipe-builder-row">
              <input
                value={instructionInput}
                onChange={(e) => updateInstructionInput(e.target.value)}
                placeholder="Enter a step"
              />
              <button onClick={addInstruction}>Add Step</button>
            </div>

            <ol className="recipe-builder-list recipe-builder-list-numbered">
              {instructions.map((instruction, index) => (
                <li key={index}>
                  <span>{instruction}</span>
                  <button onClick={() => removeInstruction(index)}>Remove</button>
                </li>
              ))}
            </ol>

            <div className="recipe-form-actions">
              <button
                onClick={() => {
                  if (!validateRecipeForm()) return;
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

              <button
                onClick={() => {
                  updateShowForm(false);
                  updateRecipeName("");
                  updateIngredients([]);
                  updateInstructions([]);
                  updateIngredientInput("");
                  updateInstructionInput("");
                  setFormError("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="recipes-panel">
        <div className="recipes-panel-header">
          <div>
            <p className="recipes-kicker">Browse Recipes</p>
            <h3>
              Showing <em>{filteredRecipes.length}</em> of <em>{recipes.length}</em>{" "}
              recipes
            </h3>
          </div>

          <div className="recipes-controls">
            <input
              className="recipes-search"
              value={searchTerm}
              onChange={(e) => {
                updateSearchTerm(e.target.value);
              }}
              placeholder="Search by recipe, ingredient, or instruction"
            />

            <div className="recipes-sort-group">
              <label htmlFor="recipe-sort">Sort</label>
              <select
                id="recipe-sort"
                value={sortOrder}
                onChange={(e) => updateSortOrder(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {recipes.length === 0 ? (
          <div className="recipes-empty-state">
            <h4>No recipes yet</h4>
            <p>Add your first recipe to start building your collection.</p>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="recipes-empty-state">
            <h4>No recipes matched your search</h4>
            <p>Try a different ingredient, title, or instruction keyword.</p>
          </div>
        ) : (
          <div className="recipes-grid-wrap">
            <ul className="recipes-grid">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onEdit={handleEdit}
                  onDelete={deleteRecipe}
                />
              ))}
            </ul>
          </div>
        )}
      </section>

      {editForm && (
        <section className="recipe-form-panel">
          <div className="recipe-form">
            <h3>Edit Recipe</h3>
            {formError && <p className="form-error">{formError}</p>}


            <input
              value={recipeName}
              onChange={(e) => updateRecipeName(e.target.value)}
              placeholder="Recipe name"
            />

            <div className="recipe-builder-row">
              <input
                value={ingredientInput}
                onChange={(e) => updateIngredientInput(e.target.value)}
                placeholder="Enter an ingredient"
              />
              <button onClick={addIngredient}>Add Ingredient</button>
            </div>

            <ul className="recipe-builder-list">
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span>{ingredient}</span>
                  <button onClick={() => removeIngredient(index)}>Remove</button>
                </li>
              ))}
            </ul>

            <div className="recipe-builder-row">
              <input
                value={instructionInput}
                onChange={(e) => updateInstructionInput(e.target.value)}
                placeholder="Enter a step"
              />
              <button onClick={addInstruction}>Add Step</button>
            </div>

            <ol className="recipe-builder-list recipe-builder-list-numbered">
              {instructions.map((instruction, index) => (
                <li key={index}>
                  <span>{instruction}</span>
                  <button onClick={() => removeInstruction(index)}>Remove</button>
                </li>
              ))}
            </ol>

            <div className="recipe-form-actions">
              <button
                onClick={() => {
                  if (!validateRecipeForm()) return; // Validate the form before saving changes. If the form is not valid, exit the function and do not save changes

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
                  setFormError("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  </div>
);

}

export default Recipes;
