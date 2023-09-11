import { Box, Grid } from "@mui/material";

export default function AppointmentDetails() {
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
        <Grid item xs={6} md={8}></Grid>
        <Grid item xs={6} md={4}></Grid>
        <Grid item xs={6} md={4}></Grid>
        <Grid item xs={6} md={8}></Grid>
      </Grid>
    </Box>
  );
}
