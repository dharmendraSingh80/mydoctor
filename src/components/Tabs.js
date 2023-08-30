import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Divider } from "@mui/material";
import LoginForm from "./pages/LoginForm";
import styles from "../styles/login.module.css";
import loginIcon from "../myIcon/login.svg";
import patientRegisterImage from "../myIcon/final registration.svg";
import PatientRegistrationForm from "./pages/PatientRegistrationForm";
import DoctorSignUpForm from "./pages/DoctorSignUp";
import { Link, useLocation } from "react-router-dom";

export default function LabTabs() {
  const [value, setValue] = React.useState("");
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    // Update activeTab based on location.pathname
    if (location.pathname === "/auth/login") {
      setValue("login");
    } else if (location.pathname === "/auth/signup") {
      setValue("signup");
    } else if (location.pathname === "/auth/doctor-register") {
      setValue("doctor-register");
    }
  }, [location.pathname]);

  return (
    <TabContext value={value}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: { xs: "0", md: "60%" } }}></Box>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            width: { xs: "90%", md: "40%" },
            mr: { lg: "10rem", md: "4rem" },
            ml: { lg: "10rem", md: "4rem" },
          }}
        >
          <TabList
            variant="fullWidth"
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab
              label="LOGIN"
              value="login"
              component={Link}
              to="/auth/login"
            />
            <Divider
              orientation="vertical"
              style={{
                height: "4rem",
                alignSelf: "center",
              }}
            />
            <Tab
              label="PATIENT SIGN UP"
              value="signup"
              component={Link}
              to="/auth/signup"
            />
            <Divider
              orientation="vertical"
              style={{
                height: "4rem",
                alignSelf: "center",
              }}
            />
            <Tab
              label="DOCTOR SIGN UP"
              value="doctor-register"
              component={Link}
              to="/auth/doctor-register"
            />
          </TabList>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: { xs: "0", md: "60%" } }}>
          {value === "login" ? (
            <img
              className={styles.image}
              src={loginIcon}
              alt="background image"
            />
          ) : (
            <img
              className={styles.image}
              src={patientRegisterImage}
              alt="background image"
            />
          )}
        </Box>
        <Box
          sx={{
            width: { xs: "90%", md: "40%" },
            mr: { lg: "10rem", md: "4rem" },
            ml: { lg: "10rem", md: "4rem" },
          }}
        >
          <TabPanel sx={{ p: 0, pt: 4 }} value="login">
            <LoginForm />
          </TabPanel>
          <TabPanel sx={{ p: 0, pt: 4 }} value="signup">
            <PatientRegistrationForm />
          </TabPanel>
          <TabPanel sx={{ p: 0, pt: 4 }} value="doctor-register">
            <DoctorSignUpForm />
          </TabPanel>
        </Box>
      </Box>
    </TabContext>
  );
}
