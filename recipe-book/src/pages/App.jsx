
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function App() {
  const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
  const groceryList = JSON.parse(localStorage.getItem("groceryList") || "{}");

  const recipeCount = recipes.length;
  const groceryItemCount = Object.keys(groceryList).length;
  const purchasedCount = Object.values(groceryList).filter(
    (item) => item.checked,
  ).length;

  const recentRecipes = [...recipes].slice(-3).reverse(); // Get the 3 most recently added recipes

  return (
    <div className="App">
      <Navbar />

      <main className="recipe-page">
        <section className="recipe-hero home-hero">
          <div className="recipe-hero-copy">
            <p className="recipe-eyebrow">Kitchen Dashboard</p>
            <h1 className="home-page-title">
              Keep your recipes and grocery planning in one place.
            </h1>
            <p className="recipe-hero-text">
              Save favorite recipes, search ingredients quickly, and build a
              grocery bag that stays organized while you plan meals.
            </p>
          </div>

          <div className="home-hero-actions">
            <Link to="/recipes" className="cta-button home-link-button">
              Browse Recipes
            </Link>
            <Link to="/groceries" className="secondary-link-button">
              Open Grocery Bag
            </Link>
          </div>
        </section>

        <section className="dashboard-stats">
          <article className="dashboard-stat-card">
            <p className="dashboard-stat-label">Recipes Saved</p>
            <h2>{recipeCount}</h2>
            <p className="dashboard-stat-help">
              Your personal collection is growing.
            </p>
          </article>

          <article className="dashboard-stat-card">
            <p className="dashboard-stat-label">Items In Grocery Bag</p>
            <h2>{groceryItemCount}</h2>
            <p className="dashboard-stat-help">
              Ingredients ready for your next trip.
            </p>
          </article>

          <article className="dashboard-stat-card">
            <p className="dashboard-stat-label">Purchased Items</p>
            <h2>{purchasedCount}</h2>
            <p className="dashboard-stat-help">
              Checked off from your current list.
            </p>
          </article>
        </section>
        <section className="dashboard-preview-panel">
          <div className="dashboard-preview-header">
            <div>
              <p className="recipes-kicker">Recent Recipes</p>
              <h3>Jump into your latest additions</h3>
            </div>
            <Link to="/recipes" className="dashboard-inline-link">
              View All Recipes
            </Link>
          </div>

          {recentRecipes.length > 0 ? (
            <div className="dashboard-preview-grid">
              {recentRecipes.map((recipe) => (
                <article key={recipe.id} className="dashboard-preview-card">
                  <h4>{recipe.recipeName}</h4>
                  <p>
                    {recipe.ingredients.length} ingredient
                    {recipe.ingredients.length !== 1 ? "s" : ""}
                  </p>
                  <p>
                    {recipe.instructions.length} step
                    {recipe.instructions.length !== 1 ? "s" : ""}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="recipes-empty-state">
              <h4>No recipes yet</h4>
              <p>Add your first recipe to start building your dashboard.</p>
            </div>
          )}
        </section>
        <section className="dashboard-actions-panel">
          <div className="dashboard-preview-header">
            <div>
              <p className="recipes-kicker">What You Can Do</p>
              <h3>Use the app like a real kitchen workflow</h3>
            </div>
          </div>

          <div className="dashboard-actions-grid">
            <article className="dashboard-action-card">
              <h4>Browse Recipes</h4>
              <p>
                Search your saved recipes, sort them by date or name, and jump
                back into your collection quickly.
              </p>
              <Link to="/recipes" className="dashboard-card-link">
                Open Recipes
              </Link>
            </article>

            <article className="dashboard-action-card">
              <h4>Build Grocery Bag</h4>
              <p>
                Pull ingredients from recipes, combine duplicates automatically,
                and track what you have already picked up.
              </p>
              <Link to="/groceries" className="dashboard-card-link">
                Open Groceries
              </Link>
            </article>

            <article className="dashboard-action-card">
              <h4>Stay Organized</h4>
              <p>
                Keep your cooking workflow in one place with recipe storage,
                grocery planning, and progress tracking.
              </p>
              <Link to="/recipes" className="dashboard-card-link">
                Start Organizing
              </Link>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
