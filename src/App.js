import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div style={{ marginTop: "25vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/l" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
