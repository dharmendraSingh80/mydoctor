import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../api";
import { Alert } from "@mui/material";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await userLogin(formData);
    if (response.user) {
      localStorage.setItem("userContext", JSON.stringify(response));
      navigate("/");
    } else {
      setAlert(
        <Alert sx={{ mb: "20px" }} severity="error">
          Mobile Number/Email or password is incorrect. Please try again.
        </Alert>
      );
    }
  };

  return (
    <Container sx={{ boxShadow: 2, p: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {alert}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email or Mobile Number"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button>
            <Link to="/">Forget password</Link>
          </Box>
          <p>
            Don't have an account <Link to="/auth/signup">Sign up</Link>
          </p>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;
