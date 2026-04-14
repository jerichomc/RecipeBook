import React, { useState } from "react";
import Navbar from "../components/Navbar";


function App() {
  

  return (
    <div className="App">
      <Navbar />
      <header className="header">
        <h1>Recipe Book</h1>
        <p>JERICHO HUNGEY!!! WHAT MAKE?</p>
      </header>
      

      

      <footer className="footer">
        <p>&copy; 2024 Recipe Book. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
