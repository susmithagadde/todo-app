import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import List from "./Components/List/List";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" strict exact component={List} />
      </div>
    </Router>
  );
}

export default App;
