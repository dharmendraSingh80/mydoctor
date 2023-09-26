import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { updatePatientData } from "../api";

export default function ChangePassword({ mobileOpen, handleDrawerToggle }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordChecks, setPasswordChecks] = useState({
    lowercase: false,
    uppercase: false,
    specialChar: false,
    number: false,
    passwordLength: false,
    match: false,
  });
  const [alert, setAlert] = useState(null);
  let userData = JSON.parse(localStorage.getItem("userContext") || "null");

  const validatePassword = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "newPassword") {
      setPasswordChecks((prev) => ({
        ...prev,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value),
        number: /[0-9]/.test(value),
        passwordLength: value.length >= 6,
        match: formData.confirmPassword && value === formData.confirmPassword,
      }));
    } else if (name === "confirmPassword") {
      setPasswordChecks((prev) => ({
        ...prev,
        match: formData.newPassword && value === formData.newPassword,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatePassword = {
      newPassword: formData.newPassword,
      oldPassword: formData.currentPassword,
    };
    const response = await updatePatientData(
      updatePassword,
      userData?.user?._id,
      userData?.accessToken
    );
    if (response.enabled) {
      setAlert(
        <Alert sx={{ width: "48%", mb: "20px" }} severity="success">
          Password changes successfully
        </Alert>
      );
    } else {
      setAlert(
        <Alert sx={{ width: "48%", mb: "20px" }} severity="error">
          Failed to change password
        </Alert>
      );
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
        sx={{ padding: "32px", flexGrow: 1, backgroundColor: "#fafafa" }}
      >
        <Box
          sx={{
            mt: { md: "3%" },
            ml: { md: "30%" },
          }}
        >
          {alert}
          <Box
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              alignItems: "center",
              marginBottom: "1.2rem",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#3f51b5",
                flexGrow: 1,
                fontSize: { xs: "26px", md: "30px", lg: "36px" },
                fontWeight: "bold",
              }}
            >
              Change Password
            </Typography>
          </Box>
          <Box
            component="form"
            sx={{
              gap: "16px",
              display: "flex",
              flexFlow: "column nowrap",
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              sx={{ maxWidth: "500px" }}
              required
              name="currentPassword"
              onChange={validatePassword}
              id="outlined-required"
              label="Current Password"
              type="password"
            />
            <TextField
              sx={{ maxWidth: "500px" }}
              required
              name="newPassword"
              onChange={validatePassword}
              id="outlined-required"
              label="New Password"
              type="password"
            />
            <TextField
              required
              sx={{ maxWidth: "500px" }}
              name="confirmPassword"
              onChange={validatePassword}
              id="outlined-required"
              label="Confirm Password"
              type="password"
            />
            <List sx={{ p: 0, listStyleType: "none" }}>
              <ListItem sx={{ p: 0 }}>
                {passwordChecks.lowercase ? (
                  <DoneIcon color="success" sx={{ pr: 1 }} />
                ) : (
                  <CloseIcon color="error" sx={{ pr: 1 }} />
                )}
                <Typography>A lowercase letter</Typography>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                {passwordChecks.uppercase ? (
                  <DoneIcon color="success" sx={{ pr: 1 }} />
                ) : (
                  <CloseIcon color="error" sx={{ pr: 1 }} />
                )}
                <Typography>An uppercase letter</Typography>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                {passwordChecks.specialChar ? (
                  <DoneIcon color="success" sx={{ pr: 1 }} />
                ) : (
                  <CloseIcon color="error" sx={{ pr: 1 }} />
                )}
                <Typography>At least one special character</Typography>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                {passwordChecks.number ? (
                  <DoneIcon color="success" sx={{ pr: 1 }} />
                ) : (
                  <CloseIcon color="error" sx={{ pr: 1 }} />
                )}
                <Typography>At least one number</Typography>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                {passwordChecks.passwordLength ? (
                  <DoneIcon color="success" sx={{ pr: 1 }} />
                ) : (
                  <CloseIcon color="error" sx={{ pr: 1 }} />
                )}
                <Typography>At least six characters</Typography>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                {passwordChecks.match ? (
                  <DoneIcon color="success" sx={{ pr: 1 }} />
                ) : (
                  <CloseIcon color="error" sx={{ pr: 1 }} />
                )}
                <Typography>Passwords must match</Typography>
              </ListItem>
            </List>
            <Box sx={{ position: "relative" }}>
              <Button
                type="submit"
                sx={{ width: { sm: "40%", xs: "100%" } }}
                variant="contained"
                disabled={
                  !(
                    formData.currentPassword &&
                    passwordChecks.lowercase &&
                    passwordChecks.uppercase &&
                    passwordChecks.match &&
                    passwordChecks.number &&
                    passwordChecks.specialChar &&
                    passwordChecks.passwordLength
                  )
                }
              >
                SUBMIT
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
