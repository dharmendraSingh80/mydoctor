import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ResponsiveDrawer from "./pages/SideBar";
import { getDocotor, updateDoctorData } from "../api";

export default function Qualifications({ mobileOpen, handleDrawerToggle }) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState([{}]);
  const [editErrors, setEditErrors] = useState([]);
  // const [paperCount, setPaperCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const doctor = await getDocotor();
    setEditData(doctor?.profile?.qualifications || [{}]);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const addMorePaper = () => {
    setEditData([...editData, {}]);
  };

  const removePaper = (index) => {
    const updatedData = [...editData];
    updatedData.splice(index, 1);
    setEditData(updatedData);
    // setPaperCount(paperCount - 1);
  };

  const inputHandleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedData = [...editData];
    updatedData[index] = {
      ...updatedData[index],
      [name]: value,
    };
    setEditData(updatedData);
  };

  const validationPatterns = {
    name: /^(?![0-9]+$)[A-Za-z0-9\s,.-]{3,}$/,
    institute: /^(?![0-9]+$)[A-Za-z0-9\s,.-]+$/,
    year: /^(?:\d{4})$/,
  };

  const validationMessages = {
    name: "Please enter valid degree name",
    institute: "Please enter valid institute name",
    year: "Please enter a valid year",
  };

  const validateInput = (e, index) => {
    let { name, value } = e.target;
    setEditErrors((prev) => {
      const stateObj = { ...prev };
      const validationPattern = validationPatterns[name];
      if (!value || !validationPattern.test(value)) {
        stateObj[index] = {
          ...stateObj[index],
          [name]: validationMessages[name],
        };
      } else {
        stateObj[index] = {
          ...stateObj[index],
          [name]: "", // Clear the error message when the input is valid
        };
      }
      return stateObj;
    });
  };

  const handleSaveClick = async () => {
    setEditing(false);
    const userDetails = {
      profile: {
        qualifications: editData,
      },
    };

    try {
      const response = await updateDoctorData(userDetails);
      if (response.enabled) {
        alert("doctor qualifications updated successfully");
      } else {
        console.log("Unable to update");
      }
      fetchData();
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
  };

  const renderPaper = (item, index) => (
    <Paper
      key={index}
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
                error={editErrors[index]?.name}
                name="name"
                id="outlined-required"
                label="Degree/Certification"
                onBlur={(e) => validateInput(e, index)}
                onChange={(e) => inputHandleChange(e, index)}
                value={item.name || ""}
                helperText={editErrors[index]?.name || ""}
                disabled={!editing}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                sx={{ width: "80%" }}
                id="outlined-required"
                error={editErrors[index]?.institute}
                onBlur={(e) => validateInput(e, index)}
                name="institute"
                label="Institute Name"
                onChange={(e) => inputHandleChange(e, index)}
                value={item.institute || ""}
                helperText={editErrors[index]?.institute || ""}
                disabled={!editing}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                sx={{ width: "80%" }}
                error={editErrors[index]?.year}
                name="year"
                id="outlined-required"
                label="Year of Completion"
                onBlur={(e) => validateInput(e, index)}
                onChange={(e) => inputHandleChange(e, index)}
                value={item.year || ""}
                helperText={editErrors[index]?.year || ""}
                disabled={!editing}
              />
            </Grid>
          </Grid>
        </Box>
        {editing && (
          <Box sx={{ alignSelf: "center" }}>
            <IconButton sx={{ mr: "10px" }} onClick={() => removePaper(index)}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Paper>
  );

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
        {isLoading ? (
          <Typography variant="body1" color="text.secondary">
            Loading...
          </Typography>
        ) : (
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
                      onClick={handleEditClick}
                    >
                      CANCEL
                    </Button>
                    <Button
                      sx={{ height: "40px" }}
                      variant="contained"
                      onClick={handleSaveClick}
                      disabled={
                        Object.values(editErrors).some((errors) =>
                          Object.values(errors).some((error) => error !== "")
                        ) ||
                        editData.some((item) => Object.keys(item).length === 0)
                      }
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
                {editData.map((item, index) => renderPaper(item, index))}
                <Button
                  sx={{ mt: "10px", ml: "89%", mb: "10px" }}
                  variant="contained"
                  onClick={addMorePaper}
                >
                  ADD MORE
                </Button>
              </>
            ) : (
              <>
                {editData.length === 0 ? (
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
                ) : (
                  editData.map((item, index) => renderPaper(item, index))
                )}
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
