import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import DoctorDetailsCard from "./pages/DoctorDetailsCard";
import AccordionDoctor from "./pages/AccordianDoctor";
import { useEffect, useState } from "react";
import { getDoctorDetails, getNumbersOfSlots } from "../api";
import ResponsiveDrawer from "./pages/SideBar";
import AppointmentTab from "./pages/AppointmentTab";

export default function Doctor({
  mobileOpen,
  handleDrawerToggle,
  setAppointment,
}) {
  const [doctor, setDoctor] = useState({
    doctorDetails: "",
    slots: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    Promise.all([getDoctorDetails(id), getNumbersOfSlots(id)])
      .then(([doctorData, slotData]) => {
        setDoctor((prev) => ({
          ...prev,
          doctorDetails: doctorData,
          slots: slotData.data,
        }));
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when data is fetched
      });
  }, [id]);

  return (
    <Box sx={{ display: "flex", minHeight: "68vh" }}>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box sx={{ p: "32px", flexGrow: 1, backgroundColor: "#fafafa" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            maxWidth: { lg: "1400px", md: "1200px", sm: "650px", xs: "320px" },
            marginTop: "30px",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <Typography variant="body1" color="text.secondary">
              Loading doctor's details...
            </Typography>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DoctorDetailsCard content={doctor.doctorDetails} />
              </Grid>
              <Grid item xs={12} sm={6}>
                {doctor.slots.length === 0 ? (
                  <Typography>No slots available</Typography>
                ) : (
                  <AppointmentTab
                    setAppointment={setAppointment}
                    slots={doctor.slots}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <AccordionDoctor content={doctor.doctorDetails} />
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}
