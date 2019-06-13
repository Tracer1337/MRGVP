import React from 'react';
import Router from "./components/Router"
import Header from "./components/Header.js"
import CssBaseline from "@material-ui/core/CssBaseline"

function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <Header/>
      <div id="main-view">
        <Router/>
      </div>
    </div>
  );
}

export default App;
