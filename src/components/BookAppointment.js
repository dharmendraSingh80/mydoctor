import * as React from "react";
import { Box, Paper } from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PatientDetails from "./pages/PatientDetails";
import AppointmentDetails from "./pages/AppointmentDetails";
import { useNavigate } from "react-router-dom";
import PaymentDetails from "./pages/PaymentDetails";

export default function BookAppointment({
  mobileOpen,
  handleDrawerToggle,
  appointment,
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  let userData = JSON.parse(localStorage.getItem("userContext") || "null");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "68vh" }}>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{ p: "32px", flexGrow: 1, backgroundColor: "#fafafa" }}
      >
        <Paper elevation={0} sx={{ p: "24px" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>
                    <Typography sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Paper>

        <Box
          sx={{
            maxWidth: { sm: "600px" },
            pl: { sm: "24px", xs: "16px" },
            pr: { sm: "24px", xs: "16px" },
            width: "100%",
            display: "block",
            boxSizing: "border-box",
            ml: "auto",
            mr: "auto",
          }}
        >
          {activeStep === 0 ? (
            <>
              <Typography variant="h4">Patient Details</Typography>
              <PatientDetails userData={userData} appointment={appointment} />
            </>
          ) : activeStep === 1 ? (
            <>
              <Typography variant="h4">Appointment Details</Typography>
              <AppointmentDetails
                appointment={appointment}
                userData={userData}
              />
            </>
          ) : (
            <>
              <Typography variant="h4">Payment Details</Typography>
              <PaymentDetails />
            </>
          )}

          <Box
            sx={{
              display: "grid",
              padding: "0.4rem 0",
              columnGap: "1rem",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="outlined"
              fullWidth
            >
              BACK
            </Button>
            <Box sx={{ position: "relative" }}>
              <Button fullWidth variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 2
                  ? "CONFIRM AND PROCEED"
                  : activeStep === steps.length - 1
                  ? "MAKE PAYMENT"
                  : "NEXT"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
const steps = ["Patient Details", "Appointment Details", "Payment Details"];
