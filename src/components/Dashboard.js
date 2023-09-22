import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import DashboardChart from "./pages/DashboardChart";
import CalenderSlots from "./pages/CalenderSlots";
import ReviewsDocDashboard from "./pages/ReviewsDocDashboard";
import DocAppointmentDashoard from "./pages/DocAppointmentDashboard";
import { useEffect, useState } from "react";
import { addSlots } from "../api";
const currentTime = new Date();
const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();

export default function DashBoard({ mobileOpen, handleDrawerToggle }) {
  const [appointmentTime, setAppointmentTime] = useState({
    startTime: "11:00",
    endTime: "11:30",
    size: "2",
    date: new Date(),
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleCreateSlot = async () => {
    const parsedDate = new Date(appointmentTime.date);
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth();
    const day = parsedDate.getDate();
    const [startHours, startMinutes] = appointmentTime.startTime
      .split(":")
      .map(Number);
    const startDate = new Date(year, month, day, startHours, startMinutes);
    const [endHours, endMinutes] = appointmentTime.endTime
      .split(":")
      .map(Number);
    const endDate = new Date(year, month, day, endHours, endMinutes);
    // console.log(combinedDate.toISOString());
    const slotsDetails = {
      booked: "true",
      size: +appointmentTime.size,
      endTime: endDate.toISOString(),
      startTime: startDate.toISOString(),
    };

    const response = await addSlots(slotsDetails);
    console.log(response);
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;

    if (name === "size") {
      setAppointmentTime((prev) => ({
        ...prev,
        size: value,
      }));
    } else {
      const startTimeParts = value.split(":");
      const startHour = parseInt(startTimeParts[0], 10);
      const startMinute = parseInt(startTimeParts[1], 10);
      const endHour = startHour + Math.floor((startMinute + 30) / 60);
      const endMinute = (startMinute + 30) % 60;
      const formattedEndTime = `${endHour
        .toString()
        .padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;
      setAppointmentTime((prev) => ({
        ...prev,
        startTime: value,
        endTime: formattedEndTime,
      }));
    }
  };

  useEffect(() => {
    const startTimeParts = appointmentTime.startTime.split(":");
    const startHour = parseInt(startTimeParts[0], 10);
    const startMinute = parseInt(startTimeParts[1], 10);
    if (
      startHour < currentHour ||
      (startHour === currentHour && startMinute < currentMinute)
    ) {
      setIsButtonDisabled(true); // Disable the button
    } else {
      setIsButtonDisabled(false); // Enable the button
    }
  }, [appointmentTime.startTime]);

  const handleCalender = (value) => {
    setAppointmentTime((prev) => ({
      ...prev,
      date: value,
    }));
  };
  return (
    <Box
      sx={{ display: "flex", flexFlow: "row nowrap", flexGrow: 1, mt: "115px" }}
    >
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box sx={{ p: "32px", flexGrow: 1, backgroundColor: "#fafafa" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mb: "20px" }}>
            <Grid container justifyContent="center" spacing={1}>
              <Grid
                item
                md={4}
                sx={{ backgroundColor: "white", mr: "12px", mb: "12px" }}
              >
                <Box sx={{ display: "flex", p: "8px" }}>
                  <Typography
                    sx={{
                      fontSize: "17px",
                    }}
                  >
                    Completed Appointments
                  </Typography>
                </Box>
                <Divider />
                <DashboardChart />
              </Grid>
              <Grid
                item
                sx={{
                  backgroundColor: "white",
                  // width: "30%",
                  mr: "12px",
                  mb: "12px",
                }}
              >
                <Box sx={{ display: "flex", p: "8px" }}>
                  <Typography
                    sx={{
                      fontSize: "17px",
                    }}
                  >
                    Cancelled Appointments
                  </Typography>
                </Box>
                <Divider />
                <DashboardChart />
              </Grid>
              <Grid
                item
                md={4}
                sx={{
                  backgroundColor: "white",
                  // mr: "1%",
                  mb: "12px",
                }}
              >
                <Box sx={{ display: "flex", p: "8px" }}>
                  <Typography
                    sx={{
                      fontSize: "17px",
                    }}
                  >
                    Total Patients
                  </Typography>
                </Box>
                <Divider />
                <DashboardChart />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ mb: "20px" }} xs={12}>
            <Grid container>
              <Grid item xs={12} sx={{ backgroundColor: "white" }}>
                <Box
                  sx={{
                    margin: "8px",
                    display: "flex",
                    padding: "8px",
                    justifyContent: "flex-start",
                    backgroundColor: "rgb(255, 255, 255",
                  }}
                >
                  <Typography sx={{ ml: "1%" }}>Slots</Typography>
                </Box>
                <Divider />
                <Grid container rowSpacing={1}>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    lg={3}
                    sx={{
                      mt: { md: "18px", xs: "7px" },
                      ml: { md: "40px" },
                      p: { xs: "3% 7%", md: "0" },
                    }}
                  >
                    <CalenderSlots
                      handleCalender={handleCalender}
                      appointmentTime={appointmentTime}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} lg={3} style={{ padding: "25px" }}>
                    <TextField
                      id="time"
                      label="Start Time"
                      type="time"
                      name="startTime"
                      value={appointmentTime.startTime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      onChange={handleTimeChange}
                      variant="outlined"
                      fullWidth
                    />
                    <br />
                    <br />
                    <TextField
                      id="time"
                      label="End Time"
                      type="time"
                      name="endTime"
                      value={appointmentTime.endTime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                    <br />
                    <br />

                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Appointment Size"
                      fullWidth
                      sx={{ mb: "10px" }}
                      name="size"
                      value={appointmentTime.size}
                      onChange={handleTimeChange}
                    >
                      {appointmentSize.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br />
                    <small style={{ color: "grey" }}>
                      Slot duration: 30 minutes
                    </small>
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      disabled={isButtonDisabled}
                      sx={{
                        width: "50%",
                        alignItems: "center",
                        ml: "20%",
                        justifyContent: "center",
                      }}
                      onClick={handleCreateSlot}
                    >
                      CREATE SLOT
                    </Button>
                  </Grid>
                  <Box sx={{ fontSize: "20px", mt: "7%", ml: "15%" }}>
                    No slot present on selected date
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ mb: "20px" }} xs={12}>
            <DocAppointmentDashoard />
          </Grid>
          <Grid item xs={12}>
            <ReviewsDocDashboard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
const appointmentSize = [1, 2, 3, 4, 5];
