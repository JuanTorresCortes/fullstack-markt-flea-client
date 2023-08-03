import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Market-flea</h1>
      <Outlet />
    </div>
  );
}

export default App;
