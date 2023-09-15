import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Qualifications({ mobileOpen, handleDrawerToggle }) {
  const [editing, setEditing] = useState(false);
  const [paperCount, setPaperCount] = useState(1);

  const handleEditClick = () => {
    setEditing(true);
  };
  const addMorePaper = () => {
    setPaperCount(paperCount + 1); // Increase the count when "ADD MORE" is clicked
  };
  const removePaper = (index) => {
    setPaperCount((prevCount) => prevCount - 1);
  };

  const renderPaperComponents = () => {
    const paperComponents = [];
    for (let i = 0; i < paperCount; i++) {
      paperComponents.push(
        <Paper
          variant="outlined"
          sx={{ display: "flex", flexWrap: "wrap", mt: "15px" }}
        >
          <Box sx={{ width: "100%", display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                sx={{
                  mt: "5px",
                  ml: "10px",
                  mb: "25px",
                }}
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    sx={{ width: "80%" }}
                    required
                    id="outlined-required"
                    label="Degree/Certification"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    required
                    sx={{ width: "80%" }}
                    id="outlined-required"
                    label="Institute Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    required
                    sx={{ width: "80%" }}
                    id="outlined-required"
                    label="Year of Completion"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ alignSelf: "center" }}>
              <IconButton sx={{ mr: "10px" }} onClick={() => removePaper(i)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      );
    }
    return paperComponents;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        flexGrow: 1,
        minHeight: "68vh",
      }}
    >
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          p: "32px",
          flexGrow: 1,
          backgroundColor: "#fafafa",
          mt: { xs: "32px", md: 0 },
        }}
      >
        <Box sx={{ width: "100%", mt: { xs: "50px", md: 0 } }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: { sm: "25px", xs: "20px" },
                  fontWeight: "bold",
                  mt: { xs: "5px", sm: 0 },
                }}
              >
                My Qualifications
              </Typography>
            </Box>
            <Box>
              {editing ? (
                <>
                  <Button
                    sx={{ height: "40px", mr: "10px" }}
                    variant="contained"
                    // onClick={handleEditClick}
                  >
                    CANCEL
                  </Button>
                  <Button
                    sx={{ height: "40px" }}
                    variant="contained"
                    // onClick={handleEditClick}
                  >
                    SAVE
                  </Button>
                </>
              ) : (
                <Button
                  sx={{ height: "40px" }}
                  variant="contained"
                  onClick={handleEditClick}
                >
                  EDIT
                </Button>
              )}
            </Box>
          </Box>
          {editing ? (
            <>
              {renderPaperComponents()}
              <Button
                sx={{ mt: "10px", ml: "89%", mb: "10px" }}
                variant="contained"
                onClick={addMorePaper}
              >
                ADD MORE
              </Button>
            </>
          ) : (
            <Box
              sx={{
                color: "#696969",
                display: "flex",
                fontSize: "20px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No Qualification added
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
