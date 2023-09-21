import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import DashboardChart from "./pages/DashboardChart";
import CalenderSlots from "./pages/CalenderSlots";

export default function DashBoard({ mobileOpen, handleDrawerToggle }) {
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
                  width: "30%",
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
                  mr: "1%",
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
                    <CalenderSlots />
                  </Grid>
                  <Grid item md={6} xs={12} lg={3} style={{ padding: "25px" }}>
                    <TextField
                      id="time"
                      label="Start Time"
                      type="time"
                      defaultValue="07:30"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      variant="outlined"
                      fullWidth
                    />
                    <br />
                    <br />
                    <TextField
                      id="time"
                      label="End Time"
                      type="time"
                      defaultValue="07:30"
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
                    <FormControl
                      variant="outlined"
                      sx={{ width: "100%", mb: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Age
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        // value={age}
                        // onChange={handleChange}
                        label="Age"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                    <br />
                    <small style={{ color: "grey" }}>
                      Slot duration: 30 minutes
                    </small>
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      disabled
                      sx={{
                        width: "50%",
                        alignItems: "center",
                        ml: "20%",
                        justifyContent: "center",
                      }}
                      type="submit"
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
        </Grid>
      </Box>
    </Box>
  );
}
