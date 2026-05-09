import React from "react";
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
            <p className="dashboard-stat-help">Your personal collection is growing.</p>
          </article>

          <article className="dashboard-stat-card">
            <p className="dashboard-stat-label">Items In Grocery Bag</p>
            <h2>{groceryItemCount}</h2>
            <p className="dashboard-stat-help">Ingredients ready for your next trip.</p>
          </article>

          <article className="dashboard-stat-card">
            <p className="dashboard-stat-label">Purchased Items</p>
            <h2>{purchasedCount}</h2>
            <p className="dashboard-stat-help">Checked off from your current list.</p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
