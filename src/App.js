import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="swiper-wrapper"></div>
      <div>
        <Login />
      </div>
    </div>
  );
}

export default App;
