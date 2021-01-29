import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./components/navBar";
import NavBar from "./components/navBar";
import Body from "./components/body";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const darkModeChange = () => {
    console.log("changeDarkMode");
    setDarkMode(!darkMode);
  };
  return (
    <div className="App">
      <NavBar onChange={darkModeChange}></NavBar>
      <Body darkMode={darkMode}></Body>
    </div>
  );
}

export default App;
