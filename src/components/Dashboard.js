import { Box, Divider, Grid, Typography } from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
export default function DashBoard() {
  return (
    <Box
      sx={{ display: "flex", flexFlow: "row nowrap", flexGrow: 1, mt: "115px" }}
    >
      <ResponsiveDrawer />
      <Box sx={{ p: "32px", flexGrow: 1, backgroundColor: "#fafafa" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mb: "20px" }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item md={4} sx={{ backgroundColor: "white" }}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
