import { Box, Divider, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function AppointmentDetails({ appointment, patientDetails }) {
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
            {patientDetails.fullName}
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
            {patientDetails.contactNumber}
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
            {dayjs(appointment?.startTime).format("dddd, MMM DD, YYYY")}
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
            {`${dayjs(appointment?.startTime).format("hh:mm a")} - ${dayjs(
              appointment?.endTime
            ).format("hh:mm a")}`}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Divider />
    </Box>
  );
}
