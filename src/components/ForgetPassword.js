import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import fogetPassword from "../assets/images/forgotPassword.svg";
import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState();

  return (
    <Box
      sx={{ display: "flex", flexFlow: "row nowrap", flexGrow: 1, mt: "115px" }}
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
              mt: { lg: "8%", xs: "28%", md: "inherit" },
              ml: { lg: "-15%", xs: "0%", md: "inherit" },
            }}
            lg={3}
            md={8}
            sm={10}
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
              <Box sx={{ mb: "50px", ml: "5%", width: "100%" }}>
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
                  <Typography variant="subtitle1" sx={{ mb: "20px" }}>
                    Send a link to your email to reset your password
                  </Typography>
                </div>
                <Box component="form">
                  <TextField
                    sx={{
                      width: { xs: "90%", lg: "100%" },
                      mb: "20px",
                    }}
                    label="Email"
                    id="outlined-required"
                    required
                  />
                  <Button
                    variant="contained"
                    sx={{
                      width: { xs: "90%", lg: "100%" },
                    }}
                  >
                    SEND RESET LINK
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
