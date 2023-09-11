import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
export default function PatientDetails() {
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
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="female"
          control={<Radio />}
          label="Myself"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "1.1rem",
            },
          }}
        />
        <FormControlLabel
          value="male"
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
          label="Required"
          defaultValue="Hello World"
          sx={{ backgroundColor: "rgb(221, 221, 221)" }}
          fullWidth
          disabled
        />
        <br />
        <br />
        <br />
        <TextField
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          sx={{ backgroundColor: "rgb(221, 221, 221)" }}
          fullWidth
          disabled
        />
        <br />
        <br />
        <Typography component="span">Fee : Rs 104</Typography>
        <br />
        <br />
      </Box>
    </Box>
  );
}
