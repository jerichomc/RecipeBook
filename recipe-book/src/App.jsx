import React, { useState } from 'react';
import './index.css';

function App() {
  const [recipes, updateRecipes] = useState(() => { // Initialize recipes from localStorage if available
    const savedRecipes = localStorage.getItem('recipes'); // Retrieve saved recipes from localStorage
    return savedRecipes ? JSON.parse(savedRecipes) : []; // Start with an empty array if no recipes are saved
  });
  const [recipeCount, updateRecipeCount] = useState(() => { // Initialize recipe count based on the number of recipes in localStorage
    const savedRecipes = localStorage.getItem('recipes'); // Retrieve saved recipes from localStorage
    return savedRecipes ? JSON.parse(savedRecipes).length : 0; // Set recipe count to the number of saved recipes or 0 if none are saved
  });
  const [showForm, updateShowForm] = useState(false);
  const [recipeName, updateRecipeName] = useState('');
  const [ingredients, updateIngredients] = useState('');
  const [instructions, updateInstructions] = useState('');
  const [editForm, updateEditForm] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  

  function addRecipe(nextRecipeName, nextIngredients, nextInstructions) { // Create a new recipe object with a unique ID
    const newRecipe = {
      id: crypto.randomUUID(),
      recipeName: nextRecipeName,
      ingredients: nextIngredients,
      instructions: nextInstructions,
    };

    updateRecipes([...recipes, newRecipe]); // Add the new recipe to the existing list of recipes
    updateRecipeCount(recipeCount + 1);
  }

  function deleteRecipe(recipeId){ // Remove the recipe with the specified ID from the list of recipes
    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId); //creates new array excluding the recipe with the specified ID
    updateRecipes(updatedRecipes);//update the recipes state with new array of recipes that does not include the deleted recipe
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Update localStorage with the new list of recipes after deletion
  }

  function editRecipe(recipeId, updatedName, updatedIngredients, updatedInstructions){ // Update the recipe with the specified ID using the provided updated values
    const updatedRecipes = recipes.map(recipe => {
      if (recipe.id === recipeId){
        return {
          ...recipe, // Spread the existing recipe properties to maintain any unchanged values
          recipeName: updatedName,
          ingredients: updatedIngredients,
          instructions: updatedInstructions,
        }
      }
      return recipe; // Return the recipe unchanged if it doesn't match the ID
    })
    updateRecipes(updatedRecipes); // Update the recipes state with the modified list of recipes after editing
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Update localStorage with the new list of recipes after editing
  }



  return (
    <div className="App">
      <header className="header">
        <h1>Recipe Book</h1>
        <p>JERICHO HUNGEY!!! WHAT MAKE?</p>
      </header>
      <nav>

      </nav>
      
      <main className="main-content">
        <section className="hero">
          <h2>Welcome to Your Recipe Collection</h2>
          <p>Find, save, and organize your favorite recipes all in one place.</p>
          <button className="cta-button" onClick={() => updateShowForm(true)}>Add Recipe</button>
          {showForm && (
            <div className="recipe-form">
              <h3>Add a New Recipe</h3>
              <input value={recipeName} onChange={(e) => updateRecipeName(e.target.value)} /> //
              <textarea value={ingredients} onChange={(e) => updateIngredients(e.target.value)} placeholder="Ingredients (separate by commas)" />
              <textarea value={instructions} onChange={(e) => updateInstructions(e.target.value)} placeholder="Instructions" />
              <button onClick={() => {
                addRecipe(recipeName, ingredients, instructions);
                localStorage.setItem('recipes', JSON.stringify([...recipes, {
                  id: recipeCount + 1,
                  recipeName,
                  ingredients,
                  instructions,
                }]));
                updateShowForm(false);
                updateRecipeName('');
                updateIngredients('');
                updateInstructions('');
              }}>Add Recipe</button>
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
                      <li className='recipe-card' key={recipe.id}>
                      <h4>{recipe.recipeName}</h4>
                      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                      <p><strong>Instructions:</strong> {recipe.instructions}</p>
                      <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
                      <button onClick={() => {
                        setEditingRecipeId(recipe.id);
                        updateRecipeName(recipe.recipeName);
                        updateIngredients(recipe.ingredients);
                        updateInstructions(recipe.instructions);
                        updateEditForm(true);
                      }}>Edit</button>
                    </li>
                  )
                })}
              </ul>
              {editForm && (
                <div className="recipe-form">
                  <h3>Edit Recipe</h3>
                  <input value={recipeName} onChange={(e) => updateRecipeName(e.target.value)} /> //
                  <textarea value={ingredients} onChange={(e) => updateIngredients(e.target.value)} placeholder="Ingredients (separate by commas)" />
                  <textarea value={instructions} onChange={(e) => updateInstructions(e.target.value)} placeholder="Instructions" />
                  <button onClick={() => {
                    editRecipe(editingRecipeId, recipeName, ingredients, instructions);
                    updateEditForm(false);
                    setEditingRecipeId(null);
                    updateRecipeName('');
                    updateIngredients('');
                    updateInstructions('');
                  }}>Save Changes</button>
                  <button onClick={() => {
                    updateEditForm(false);
                    setEditingRecipeId(null);
                    updateRecipeName('');
                    updateIngredients('');
                    updateInstructions('');
                  }}>Cancel</button>
                </div>
              )}
              </div>
            )}
          </div>
          <div className="feature-card">
            <h3>Save Favorites</h3>
            <p>Keep track of your favorite recipes in your personal collection.</p>
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
