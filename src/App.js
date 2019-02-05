import React, { Component } from "react";
import Recipes from "./Recipes.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Recipe Box</h1>
          <Recipes />
        </div>
      </div>
    );
  }
}

export default App;
