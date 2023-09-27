import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
export default function PatientDetails({
  patientDetails,
  appointment,
  handlePatientDetailsForm,
  paymentErrors,
  validateInput,
}) {
  return (
    <Box
      sx={{
        border: "0.5px solid lightGrey",
        p: "1.4rem",
        marginTop: "1rem",
        minHeight: "40vh",
      }}
    >
      <span>The appointment is for:</span>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={patientDetails.appointmentFor}
        name="appointmentFor"
        onChange={handlePatientDetailsForm}
      >
        <FormControlLabel
          value="mySelf"
          control={<Radio />}
          label="Myself"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "1.1rem",
            },
          }}
        />
        <FormControlLabel
          value="someoneElse"
          control={<Radio />}
          label="Someone Else"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "1.1rem",
            },
          }}
        />
      </RadioGroup>
      <Box
        sx={{
          maxWidth: { sm: "600px" },
          pl: { sm: "24px", xs: "16px" },
          pr: { sm: "24px", xs: "16px" },
          display: "block",
          boxSizing: "border-box",
          width: "100%",
          ml: "auto",
          mr: "auto",
        }}
      >
        <span>Please provide the following information about the patient:</span>
        <br />
        <br />
        <br />
        <TextField
          id="outlined-required"
          label="Patient Name"
          error={paymentErrors.fullName}
          value={patientDetails.fullName || ""}
          sx={{
            backgroundColor:
              patientDetails.appointmentFor === "mySelf"
                ? "rgb(221, 221, 221)"
                : "",
          }}
          onBlur={validateInput}
          helperText={paymentErrors.fullName || ""}
          fullWidth
          name="fullName"
          onChange={handlePatientDetailsForm}
          disabled={patientDetails.appointmentFor === "mySelf"}
        />
        <br />
        <br />
        <br />
        <TextField
          id="outlined-required"
          label="Patient Mobile Number"
          name="contactNumber"
          error={paymentErrors.contactNumber}
          value={patientDetails.contactNumber || ""}
          sx={{
            backgroundColor:
              patientDetails.appointmentFor === "mySelf"
                ? "rgb(221, 221, 221)"
                : "",
          }}
          inputProps={{ maxLength: 10 }}
          onBlur={validateInput}
          helperText={paymentErrors.contactNumber || ""}
          fullWidth
          onChange={handlePatientDetailsForm}
          disabled={patientDetails.appointmentFor === "mySelf"}
        />
        <br />
        <br />
        <Typography component="span">
          Fee : Rs {appointment?.doctor?.profile?.consultationFee}
        </Typography>
        <br />
        <br />
      </Box>
    </Box>
  );
}
