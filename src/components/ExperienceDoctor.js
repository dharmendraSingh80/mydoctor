import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";

export default function ExperienceDocotr({ mobileOpen, handleDrawerToggle }) {
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
              <Button variant="contained">Edit</Button>
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
                mb: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item sm={12} md={6}>
                <Box>
                  <TextField
                    required
                    id="outlined-required"
                    label="Licence Number"
                    defaultValue="Hello World"
                    sx={{ width: "70%", ml: "10%" }}
                  />
                </Box>
              </Grid>
              <Grid item sm={12} md={6}>
                <Box>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={top100Films}
                    getOptionLabel={(option) => option?.title}
                    defaultValue={[top100Films[13]]}
                    filterSelectedOptions
                    sx={{ width: "70%", ml: "10%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Speciality(ies)" required />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];
