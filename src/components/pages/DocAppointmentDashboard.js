import { Box, Grid } from "@mui/material";
export default function DocAppointmentDashoard() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        style={{
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Grid item xs={12} lg={5} style={{ marginLeft: "4%" }}>
          <Box
            sx={{
              padding: "110px 20px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            No completed appointment so far
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          lg={5}
          style={{ backgroundColor: "white", marginRight: "3%" }}
        >
          <Box
            sx={{
              padding: "110px 20px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            No upcoming appointment so far
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
