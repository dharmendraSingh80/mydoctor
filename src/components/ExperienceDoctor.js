import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { getDocotor } from "../api";
import dayjs from "dayjs";

export default function ExperienceDocotr({
  mobileOpen,
  handleDrawerToggle,
  dataSpeciality,
}) {
  const [editing, setEditing] = useState(false);
  // const [paperCount, setPaperCount] = useState(1);
  const [editData, setEditData] = useState([{}]);
  const [doctorProfileData, setDoctorProfileData] = useState({
    licenceNumber: "",
    specialities: [],
  });
  const [editErrors, setEditErrors] = useState([]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const addMorePaper = () => {
    setEditData([...editData, {}]);
  };

  const fetchData = async () => {
    try {
      const doctor = await getDocotor();
      console.log(doctor);

      setDoctorProfileData((prev) => ({
        ...prev,
        licenceNumber: doctor?.profile?.licenceNumber,
        specialities: doctor?.profile?.specialities,
      }));
      setEditData(doctor?.profile?.experience || [{}]);
      // setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // Get the current year (e.g., 2023)
  const month = currentDate.getMonth() + 1;

  const removePaper = (index) => {
    const updatedData = [...editData];
    updatedData.splice(index, 1);
    setEditData(updatedData);
    // setPaperCount(paperCount - 1);
  };
  const handleEditClick = () => {
    setEditing(!editing);
  };

  const experiencePaper = (item, index) => (
    <>
      {editing && (
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Box>
            <IconButton onClick={removePaper} sx={{ mt: "15px" }}>
              <CloseIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
      )}
      <Paper
        key={index}
        variant="outlined"
        sx={{ display: "flex", flexWrap: "wrap", mt: "10px" }}
      >
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Paper elevation={0} square={false}>
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Position"
                  name="position"
                  sx={{ width: "70%", mt: "5%", ml: "15%", mb: "5%" }}
                  value={item.position || ""}
                  disabled={!editing}
                />
              </div>
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Hospital/Clinic"
                  name="place"
                  sx={{
                    width: "70%",
                    mt: "5%",
                    ml: "15%",
                    mb: "5%",
                  }}
                  value={item.place || ""}
                  disabled={!editing}
                />
              </div>
            </Paper>
          </Grid>

          <Grid item md={6} xs={12}>
            <Paper elevation={0} square={false}>
              <Box
                sx={{
                  display: "flex",
                  mt: "5px",
                  alignItems: "center",
                  ml: "18%",
                  mb: "10px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker", "DatePicker", "DatePicker"]}
                  >
                    <DatePicker
                      sx={{ ml: "3%" }}
                      views={["month", "year"]}
                      format="MM/YYYY"
                      onChange={(value) => console.log(value)}
                      value={
                        dayjs(new Date(item.fromYear, item.fromMonth - 1, 1)) ||
                        dayjs(new Date(year, month - 1, 1))
                      }
                      disabled={!editing}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Typography
                  sx={{
                    color: "#696969",
                    fontSize: "15px",
                    fontWeight: 540,
                    ml: "15px",
                  }}
                >
                  Start Date*
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: "5px",
                  alignItems: "center",
                  ml: "18%",
                  mb: "10px",
                }}
              >
                <Switch
                  {...label}
                  checked={!item.toMonth}
                  disabled={!editing}
                />
                <Typography
                  sx={{
                    color: "#696969",
                    fontSize: "15px",
                    fontWeight: 530,
                    ml: "5px",
                  }}
                >
                  Currently working
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: "5px",
                  alignItems: "center",
                  ml: "18%",
                  mb: "10px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker", "DatePicker", "DatePicker"]}
                  >
                    <DatePicker
                      sx={{ ml: "3%" }}
                      views={["month", "year"]}
                      format="MM/YYYY"
                      value={dayjs(new Date(item.toYear, item.toMonth - 1, 1))}
                      disabled={!editing}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Typography
                  sx={{
                    color: "#696969",
                    fontSize: "15px",
                    fontWeight: 540,
                    ml: "15px",
                  }}
                >
                  End Date
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );

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
        <Box sx={{ width: "100%" }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                sx={{ color: "#000000", fontSize: "25px", fontWeight: "bold" }}
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
                    onClick={handleEditClick}
                  >
                    CANCEL
                  </Button>
                  <Button
                    sx={{ height: "40px" }}
                    variant="contained"
                    // onClick={handleSaveClick}
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
                    value={doctorProfileData.licenceNumber}
                    sx={{ width: "70%", ml: "10%" }}
                    disabled={!editing}
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
                    value={doctorProfileData.specialities.map((item) => ({
                      name: item.name,
                    }))}
                    filterSelectedOptions
                    disabled={!editing}
                    sx={{ width: "70%", ml: "10%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Speciality(ies)" required />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
          {editing ? (
            <>
              {editData.map((item, index) => experiencePaper(item, index))}
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
            editData.map((item, index) => experiencePaper(item, index))
          )}
        </Box>
      </Box>
    </Box>
  );
}
