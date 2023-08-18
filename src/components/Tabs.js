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

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <Tab label="LOGIN" value="1" />
            <Divider
              orientation="vertical"
              style={{
                height: "4rem",
                alignSelf: "center",
              }}
            />
            <Tab label="PATIENT SIGN UP" value="2" />
            <Divider
              orientation="vertical"
              style={{
                height: "4rem",
                alignSelf: "center",
              }}
            />
            <Tab label="DOCTOR SIGN UP" value="3" />
          </TabList>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: { xs: "0", md: "60%" } }}>
          {value === "1" ? (
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
          <TabPanel sx={{ p: 0, pt: 4 }} value="1">
            <LoginForm />
          </TabPanel>
          <TabPanel sx={{ p: 0, pt: 4 }} value="2">
            <PatientRegistrationForm />
          </TabPanel>
          <TabPanel sx={{ p: 0, pt: 4 }} value="3">
            <DoctorSignUpForm />
          </TabPanel>
        </Box>
      </Box>
    </TabContext>
  );
}
