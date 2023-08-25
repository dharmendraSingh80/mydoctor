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
// import { useLocation } from "react-router-dom";

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
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const sp = searchParams.get("sp");

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

  const doctor = (
    <Box sx={{ display: "flex" }}>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Doctor />
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
            <Route path="/login" element={<Login />} />
            <Route path="/doctor/:id" element={doctor} />
            <Route
              path="/search"
              element={
                <DoctorsBySpeciality
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
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
