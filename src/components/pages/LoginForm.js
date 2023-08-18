import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function LoginForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add  login logic here
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email or Mobile Number"
            name="username"
            autoComplete="username"
            autoFocus
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
            Don't have an account <Link to="/">Sign up</Link>
          </p>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;
