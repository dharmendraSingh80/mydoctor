import { Box, Divider, Grid, Typography } from "@mui/material";

export default function AppointmentDetails({ appointment, userData }) {
  const getTimeSlots = (startTime, endTime) => {
    // Parse the startTime and endTime as Date objects
    const parsedStartTime = new Date(startTime);
    const parsedEndTime = new Date(endTime);

    // Check if parsing was successful
    if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
      return "Invalid date format";
    }

    const formattedStartTime = parsedStartTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const formattedEndTime = parsedEndTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedStartTime} - ${formattedEndTime}`;
  };
  return (
    <Box
      sx={{
        border: "0.5px solid lightGrey",
        p: "1.4rem",
        marginTop: "1rem",
        minHeight: "40vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>Patient's name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>
            {userData?.user.firstName} {userData?.user.lastName}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>
            Patient's contact number
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>
            {userData?.user.contactNumber}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>Consultation fee</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>
            Rs. {appointment?.doctor?.profile?.consultationFee}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>Doctor's name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>
            Dr. {appointment?.doctor?.firstName} {appointment?.doctor?.lastName}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>Appointment date</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>
            {new Date(appointment?.startTime).toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>Appointment time</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.1rem" }}>
            {getTimeSlots(appointment?.startTime, appointment?.endTime)}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Divider />
    </Box>
  );
}
