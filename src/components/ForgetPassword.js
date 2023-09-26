import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import fogetPassword from "../assets/images/forgotPassword.svg";
import { useState } from "react";
import { forgetPassword } from "../api";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      action: "sendResetPwd",
      value: {
        email: email,
      },
    };
    try {
      const res = await forgetPassword(data);
      if (res.errors) {
        setAlert(
          <Alert
            severity="error"
            sx={{
              width: { xs: "80%", md: "85%", lg: "90%" },
            }}
          >
            Unable to reset password. Please try again
          </Alert>
        );
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.log("Some error in forget password", error);
    }
  };

  const validateInput = (e) => {
    const value = e.target.value;
    if (!value || !/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        flexGrow: 1,
        mt: "115px",
        minHeight: "68vh",
      }}
    >
      <Box
        component="main"
        sx={{ p: "32px", flexGrow: 1, backgroundColor: "#fafafa" }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            borderColor: "rgb(158, 158, 158)",
            justifyContent: "center",
          }}
        >
          <Grid item lg={9}>
            <div>
              <Avatar
                src={fogetPassword}
                alt="404 illustration"
                sx={{
                  display: { lg: "flex", xs: "none" },
                  mt: { lg: "-15%" },
                  ml: { lg: "-32%" },
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sx={{
              mt: { lg: "8%", xs: "10%", md: "inherit" },
              ml: { lg: "-15%", xs: "0%", md: "inherit" },
            }}
            lg={3}
            md={8}
            sm={10}
            xs={12}
          >
            <Box
              sx={{
                width: "100%",
                mt: { xs: "1%", md: "4%" },
                borderColor: { xs: "#aaaaaa", lg: "none" },
                borderStyle: { xs: "solid", lg: "none" },
                borderWidth: { xs: "1px", lg: "none" },
                mb: { md: "4%" },
              }}
            >
              <Box sx={{ mb: "50px", ml: "5%", width: "100%", mt: "10%" }}>
                {alert}
                <div>
                  <Typography
                    sx={{
                      color: "#3f51b5",
                      flexGrow: 1,
                      fontSize: { xs: "26px", md: "30px", lg: "36px" },
                      fontWeight: "bold",
                    }}
                  >
                    Forgot Password
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: "20px", width: { xs: "90%", lg: "100%" } }}
                  >
                    Send a link to your email to reset your password
                  </Typography>
                </div>

                {success ? (
                  <Alert
                    severity="success"
                    sx={{
                      width: { xs: "80%", md: "85%", lg: "90%" },
                    }}
                  >
                    We have sent password reset link to {email}
                  </Alert>
                ) : (
                  <Box component="form">
                    <TextField
                      sx={{
                        width: { xs: "90%", lg: "100%" },
                        mb: "20px",
                      }}
                      label="Email"
                      id="outlined-required"
                      name="email"
                      error={emailError}
                      helperText={emailError || ""}
                      onBlur={validateInput}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      variant="contained"
                      sx={{
                        width: { xs: "90%", lg: "100%" },
                        height: "40px",
                      }}
                      onClick={handleSubmit}
                      disabled={!email || emailError}
                    >
                      SEND RESET LINK
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
