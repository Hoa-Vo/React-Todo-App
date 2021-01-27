import logo from "./logo.svg";
import "./App.css";
import "./components/navBar";
import NavBar from "./components/navBar";
import Body from "./components/body";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Body></Body>
    </div>
  );
}

export default App;
