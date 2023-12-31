import * as React from "react";
import { Alert, Box, Paper } from "@mui/material";
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
import { makePayment } from "../api";
import { useState, useEffect } from "react";
const bookAppointmentErrors = {
  cardNumber: "",
  cvv: "",
  fullName: "",
  contactNumber: "",
};

export default function BookAppointment({
  mobileOpen,
  handleDrawerToggle,
  appointment,
  setAppointmentAlert,
}) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cvv: "",
    month: "",
    year: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const [paymentErrors, setPaymentErrors] = useState(bookAppointmentErrors);
  const [patientDetails, setPatientDetails] = useState({
    fullName: "",
    contactNumber: "",
    appointmentFor: "",
  });

  const navigate = useNavigate();
  let userData = JSON.parse(localStorage.getItem("userContext") || "null");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const inputHandleChange = (event) => {
    const { name, value } = event.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  useEffect(() => {
    if (!appointment) {
      navigate("/");
    }
    const currentMonth = currentDate.getMonth() + 1;
    setPaymentData((prev) => {
      return {
        ...prev,
        year: currentYear,
        month: currentMonth.toString().padStart(2, "0"),
      };
    });
    setPatientDetails((prev) => {
      return {
        ...prev,
        fullName: `${userData?.user?.firstName || ""} ${
          userData?.user?.lastName || ""
        }`,
        contactNumber: userData?.user?.contactNumber,
        appointmentFor: "mySelf",
      };
    });
  }, []);

  const validationPatterns = {
    cardNumber: /\b\d{16}\b/g,
    cvv: /^\d{4}$/,
    contactNumber: /^[0-9]{10}$/,
  };
  const validationMessages = {
    cardNumber: "Please enter a valid 16 digit card Number",
    cvv: "Please enter a valid security code",
    contactNumber: "Please enter a valid 10-digit mobile number!",
    fullName: "Please enter a valid patient name!",
  };

  const validateInput = (e) => {
    let { name, value } = e.target;

    setPaymentErrors((prev) => {
      const stateObj = { ...prev, [name]: "" };
      if (name === "fullName") {
        if (!value) {
          stateObj[name] = validationMessages[name];
        } else {
          stateObj[name] = "";
        }
      } else {
        const validationPattern = validationPatterns[name];
        if (validationPattern && !validationPattern.test(value)) {
          stateObj[name] = validationMessages[name];
        }
      }
      return stateObj;
    });
  };

  const handleSubmit = async () => {
    const paymentDetails = {
      cardNumber: paymentData.cardNumber,
      cvv: paymentData.cvv,
      doctorId: appointment.doctorId,
      expiryDate: `${paymentData.month}-${paymentData.year}`,
      slotId: appointment._id,
    };
    const response = await makePayment(paymentDetails, userData?.accessToken);
    if (response.code !== 427) {
      setAppointmentAlert(
        <Alert severity="success">Appointment booking successfull!</Alert>
      );
    } else {
      setAppointmentAlert(
        <Alert severity="error">Appointment booking failed!.</Alert>
      );
    }
    navigate("/appointments");
  };

  const handlePatientDetailsForm = (e) => {
    const { name, value } = e.target;
    if (name === "appointmentFor") {
      if (e.target.value === "someoneElse") {
        setPatientDetails({
          fullName: "",
          contactNumber: "",
          [name]: value,
        });
        setPaymentErrors(bookAppointmentErrors);
      } else {
        setPatientDetails((prev) => ({
          ...prev,
          fullName: `${userData?.user?.firstName || ""} ${
            userData?.user?.lastName || ""
          }`,
          contactNumber: userData?.user?.contactNumber,
          [name]: "mySelf",
        }));
        setPaymentErrors(bookAppointmentErrors);
      }
    } else {
      setPatientDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
              <PatientDetails
                patientDetails={patientDetails}
                handlePatientDetailsForm={handlePatientDetailsForm}
                appointment={appointment}
                paymentErrors={paymentErrors}
                validateInput={validateInput}
              />
            </>
          ) : activeStep === 1 ? (
            <>
              <Typography variant="h4">Appointment Details</Typography>
              <AppointmentDetails
                appointment={appointment}
                patientDetails={patientDetails}
              />
            </>
          ) : (
            <>
              <Typography variant="h4">Payment Details</Typography>
              <PaymentDetails
                paymentData={paymentData}
                inputHandleChange={inputHandleChange}
                validateInput={validateInput}
                paymentErrors={paymentErrors}
              />
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
              <Button
                fullWidth
                variant="contained"
                disabled={
                  activeStep === steps.length - 1
                    ? !paymentData.cardNumber ||
                      !paymentData.cvv ||
                      paymentErrors.cardNumber ||
                      paymentErrors.cvv
                    : activeStep === 0
                    ? paymentErrors.fullName ||
                      paymentErrors.contactNumber ||
                      !patientDetails.fullName ||
                      !patientDetails.contactNumber
                    : false
                }
                onClick={() => {
                  if (activeStep === steps.length - 1) {
                    handleSubmit();
                  } else {
                    handleNext();
                  }
                }}
              >
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
