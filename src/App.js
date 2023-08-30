import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import Specialities from "./components/Specialities";
import ResponsiveDrawer from "./components/pages/SideBar";
import { getDoctors, getSpecialities } from "./api";
import Doctor from "./components/Doctor";
import DoctorsBySpeciality from "./components/DoctorsBySpeciality";
import ProtectedRoute from "./components/ProtectedRoute";
import Appointments from "./components/Appointments";
import PatientProfile from "./components/PatientProfile";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [info, setInfo] = useState({
    speciality: [],
    doctorsData: [],
  });
  const [totalCount, setTotalCount] = useState({
    totalSpeciality: 0,
    totalDoctors: 0,
  });
  let userData = JSON.parse(localStorage.getItem("userContext") || "null");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const doctors = (
    <Box sx={{ display: "flex" }}>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Home
        speciality={info.speciality}
        totalSpeciality={totalCount.totalSpeciality}
        doctorsData={info.doctorsData}
        totalDoctors={totalCount.totalDoctors}
      />
    </Box>
  );
  const specialities = (
    <Box sx={{ display: "flex", minHeight: "68vh" }}>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Specialities
        speciality={info.speciality}
        totalSpeciality={totalCount.totalSpeciality}
      />
    </Box>
  );

  useEffect(() => {
    Promise.all([getSpecialities(), getDoctors()]).then(
      ([specialitiesData, doctorsData]) => {
        setInfo((prev) => ({
          ...prev,
          speciality: specialitiesData.data,
          doctorsData: doctorsData.data,
        }));
        setTotalCount((prev) => ({
          ...prev,
          totalSpeciality: specialitiesData.total,
          totalDoctors: doctorsData.total,
        }));
      }
    );
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar
          handleDrawerToggle={handleDrawerToggle}
          dataSpeciality={info.speciality}
        />
        <Box sx={{ marginTop: { xs: "14rem", md: "9rem" } }}>
          <Routes>
            <Route path="/" element={doctors} />
            <Route path="/specialities" element={specialities} />
            <Route path="/auth/:tabValue" element={<Login />} />
            <Route
              path="/doctor/:id"
              element={
                <Doctor
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
              }
            />
            <Route
              path="/search"
              element={
                <DoctorsBySpeciality
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute userData={{ userData }}>
                  <Appointments
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myprofile"
              element={
                <ProtectedRoute userData={{ userData }}>
                  <PatientProfile
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
