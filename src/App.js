import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import ChangePassword from "./components/ChangePassword";
import BookAppointment from "./components/BookAppointment";
import DoctorProfile from "./components/DoctorProfile";
import Qualifications from "./components/Qualifications";
import ExperienceDocotr from "./components/ExperienceDoctor";
import Dashboard from "./components/Dashboard";
import ForgetPassword from "./components/ForgetPassword";

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

  const [appointment, setAppointment] = useState("");
  const [appointmentAlert, setAppointmentAlert] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  let userData = JSON.parse(localStorage.getItem("userContext") || "null");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const doctors = (
    <Box sx={{ display: "flex", minHeight: "68vh" }}>
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
          selectedImage={selectedImage}
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
                  setAppointment={setAppointment}
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
              }
            />
            <Route path="/forgot" element={<ForgetPassword />} />
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
                    appointmentAlert={appointmentAlert}
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
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute userData={{ userData }}>
                  <ChangePassword
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-appointment"
              element={
                <ProtectedRoute userData={{ userData }}>
                  <BookAppointment
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    appointment={appointment}
                    setAppointmentAlert={setAppointmentAlert}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute userData={{ userData }}>
                  <Appointments
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    appointmentAlert={appointmentAlert}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor-profile"
              element={
                <ProtectedRoute userData={{ userData }}>
                  <DoctorProfile
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor-profile/qualification"
              element={
                <ProtectedRoute userData={{ userData }}>
                  <Qualifications
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-profile/experience"
              element={
                <ProtectedRoute userData={{ userData }}>
                  <ExperienceDocotr
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    dataSpeciality={info.speciality}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-dashboard"
              element={
                <ProtectedRoute userData={{ userData }}>
                  <Dashboard
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    dataSpeciality={info.speciality}
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
