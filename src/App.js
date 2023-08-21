import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import { useState } from "react";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import Specialities from "./components/Specialities";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div>
      <BrowserRouter>
        <Navbar handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ marginTop: { xs: "14rem", md: "9rem" } }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
              }
            />
            <Route
              path="/specialities"
              element={
                <Specialities
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/l" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
