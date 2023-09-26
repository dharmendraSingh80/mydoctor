import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import { useEffect, useMemo, useState } from "react";
import { getDocotor, updateDoctorData } from "../api";
import ExperiencePaper from "./pages/ExperiencePaper";

export default function ExperienceDocotr({
  mobileOpen,
  handleDrawerToggle,
  dataSpeciality,
}) {
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState([]);
  const [doctorProfileData, setDoctorProfileData] = useState({
    licenceNumber: "",
    specialities: [],
  });
  const [editErrors, setEditErrors] = useState([]);
  const [dateErrors, setDateErrors] = useState(null);
  const [licenceErrors, setLicenceErrors] = useState(null);

  const [alert, setAlert] = useState(null);
  let userData = JSON.parse(localStorage.getItem("userContext") || "null");

  const addMorePaper = () => {
    setEditData([...editData, {}]);
  };

  const fetchData = async () => {
    try {
      const doctor = await getDocotor(
        userData?.user?._id,
        userData?.accessToken
      );
      // console.log(doctor);

      setDoctorProfileData((prev) => ({
        ...prev,
        licenceNumber: doctor?.profile?.licenceNumber || "",
        specialities: doctor?.profile?.specialities || [],
      }));
      setEditData(doctor?.profile?.experience || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removePaper = (index) => {
    const updatedData = [...editData];
    updatedData.splice(index, 1);
    setEditData(updatedData);
    // setPaperCount(paperCount - 1);
  };
  const handleEditClick = () => {
    if (editData.length === 0) {
      setEditData([{}]);
    }
    setEditing(true);
  };
  const handleCancelClick = () => {
    if (editData[0] && Object.keys(editData[0]).length === 0) {
      setEditData([]);
    }
    setEditing(false);
  };

  const validationPatterns = {
    licenceNumber: /^(?=.*[a-zA-Z]).+$/,
    position: /^(?=.*[a-zA-Z]).{3,}$/,
    place: /^(?=.*[a-zA-Z]).{3,}$/,
  };

  const validationMessages = {
    licenceNumber: "Please enter valid licences number",
    position: "Please enter a valid position",
    place: "Please enter a valid hospital name",
  };

  const validateInput = (e, index) => {
    let { name, value } = e.target;
    const validationPattern = validationPatterns[name];
    if (name === "licenceNumber") {
      if (!value || !validationPattern.test(value)) {
        setLicenceErrors(validationMessages[name]);
      } else {
        setLicenceErrors("");
      }
    } else {
      setEditErrors((prev) => {
        const stateObj = { ...prev };
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
    }
  };

  const errorMessage = useMemo(() => {
    switch (dateErrors) {
      case "maxDate":
      case "minDate": {
        return "Please select a date within Period";
      }

      case "invalidDate": {
        return "Please enter a valid date";
      }

      default: {
        return "";
      }
    }
  }, [dateErrors]);

  const inputHandleChange = (event, index) => {
    const { name, value } = event.target;
    if (name === "licenceNumber") {
      setDoctorProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const updatedData = [...editData];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };
      setEditData(updatedData);
    }
  };

  const handleSpecialitites = (e, value) => {
    setDoctorProfileData((prev) => ({
      ...prev,
      specialities: value,
    }));
  };

  const handleDatePicker = (value, type, index) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const updatedData = [...editData];
    if (type === "startDate") {
      updatedData[index] = {
        ...updatedData[index],
        fromYear: year,
        fromMonth: month,
      };
    } else {
      updatedData[index] = {
        ...updatedData[index],
        toYear: year,
        toMonth: month,
      };
    }
    setEditData(updatedData);
  };

  const handleSaveClick = async () => {
    setEditing(false);
    const userDetails = {
      profile: {
        licenceNumber: doctorProfileData.licenceNumber,
        specialities: doctorProfileData.specialities.map((item) => item._id),
        experience: editData,
      },
    };

    try {
      const response = await updateDoctorData(
        userDetails,
        userData?.user?._id,
        userData?.accessToken
      );
      if (response.enabled) {
        console.log("doctor experience updated successfully");
      } else {
        setAlert(<Alert severity="error">something went wrong</Alert>);
      }
      fetchData();
    } catch (error) {
      console.error("Error updating doctor data:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexflow: "row nowrap",
        flexGrow: 1,
        mt: "115px",
        minHeight: "68vh",
      }}
    >
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{ p: "32px", flexGrow: 1, backgroundColor: "#fafafa" }}
      >
        {isLoading ? (
          <Typography variant="body1" color="text.secondary">
            Loading...
          </Typography>
        ) : (
          <>
            {alert}
            <Box sx={{ width: "100%" }}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{
                      color: "#000000",
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    My Experience
                  </Typography>
                </Box>
                <Box>
                  {editing ? (
                    <>
                      <Button
                        sx={{ height: "40px", mr: "10px" }}
                        variant="contained"
                        onClick={handleCancelClick}
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
                          editData.some(
                            (item) => Object.keys(item).length === 0
                          ) ||
                          !doctorProfileData.licenceNumber ||
                          doctorProfileData.specialities?.length === 0 ||
                          licenceErrors
                        }
                      >
                        SAVE
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" onClick={handleEditClick}>
                      Edit
                    </Button>
                  )}
                </Box>
              </Box>
              <Paper
                variant="outlined"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",

                  mt: "10px",
                }}
              >
                <Grid
                  container
                  spacing={3}
                  sx={{
                    mt: "10px",
                    ml: "20px",
                    mb: "25px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <Box>
                      <TextField
                        required
                        id="outlined-required"
                        label="Licence Number"
                        name="licenceNumber"
                        onChange={inputHandleChange}
                        error={licenceErrors}
                        value={doctorProfileData.licenceNumber}
                        sx={{ width: "70%", ml: "10%" }}
                        disabled={!editing}
                        onBlur={validateInput}
                        helperText={licenceErrors}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={dataSpeciality}
                        getOptionLabel={(option) => option?.name}
                        value={doctorProfileData.specialities}
                        filterSelectedOptions
                        onChange={handleSpecialitites}
                        disabled={!editing}
                        sx={{ width: "70%", ml: "10%" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Speciality(ies)"
                            required
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
              {editing ? (
                <>
                  {editData.map((item, index) => (
                    <ExperiencePaper
                      item={item}
                      index={index}
                      editing={editing}
                      removePaper={removePaper}
                      editErrors={editErrors}
                      inputHandleChange={inputHandleChange}
                      validateInput={validateInput}
                      setDateErrors={setDateErrors}
                      handleDatePicker={handleDatePicker}
                      errorMessage={errorMessage}
                    />
                  ))}

                  <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button
                      variant="contained"
                      onClick={addMorePaper}
                      sx={{ mt: "10px", mb: "10px" }}
                    >
                      ADD MORE
                    </Button>
                  </Box>
                </>
              ) : (
                editData.map((item, index) => (
                  <ExperiencePaper
                    item={item}
                    index={index}
                    editing={editing}
                    removePaper={removePaper}
                    editErrors={editErrors}
                    inputHandleChange={inputHandleChange}
                    validateInput={validateInput}
                    setDateErrors={setDateErrors}
                    handleDatePicker={handleDatePicker}
                    errorMessage={errorMessage}
                  />
                ))
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
