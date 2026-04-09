import React, { useState } from 'react';
import './index.css';

function App() {
  const [recipes, updateRecipes] = useState(() => { // Initialize recipes from localStorage if available
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });
  const [recipeCount, updateRecipeCount] = useState(() => { // Initialize recipe count based on the number of recipes in localStorage
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes).length : 0;
  });
  const [showForm, updateShowForm] = useState(false);
  const [recipeName, updateRecipeName] = useState('');
  const [ingredients, updateIngredients] = useState('');
  const [instructions, updateInstructions] = useState('');
  

  function addRecipe(nextRecipeName, nextIngredients, nextInstructions) { // Create a new recipe object with a unique ID
    const newRecipe = {
      id: recipeCount + 1,
      recipeName: nextRecipeName,
      ingredients: nextIngredients,
      instructions: nextInstructions,
    };

    updateRecipes([...recipes, newRecipe]);
    updateRecipeCount(recipeCount + 1);
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
              <input value={recipeName} onChange={(e) => updateRecipeName(e.target.value)} />
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
                    </li>
                  )
                })}
              </ul>
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
