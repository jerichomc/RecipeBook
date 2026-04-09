import React from 'react';
import './index.css';
import { useState } from 'react';




function App() {
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
          <button className="cta-button">Get Started</button>
        </section>
        
        <section className="features">
          <div className="feature-card">
            <h3>📖 Browse Recipes</h3>
            <p>Explore a wide variety of recipes from around the world.</p>
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