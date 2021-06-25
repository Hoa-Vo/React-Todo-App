import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navBar';
import Body from './components/body';
import './App.css';

function App() {
   const [darkMode, setDarkMode] = useState(false);
   const darkModeChange = () => {
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
