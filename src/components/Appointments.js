import { Box, Typography } from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Paper from "@mui/material/Paper";

export default function Appointments({ mobileOpen, handleDrawerToggle }) {
  const [record, setRecord] = useState(10);

  const handleChange = (event) => {
    setRecord(event.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          minHeight: "68vh",
          p: "32px",
          flexGrow: 1,
          backgroundColor: "#fafafa",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            sx={{
              color: "#3f51b5",
              flexGrow: 1,
              fontSize: { xs: "26px", sm: "30px", md: "32px" },
              fontWeight: "bold",
            }}
          >
            My Appointments
          </Typography>
          <Box
            sx={{
              gap: "0.5rem",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
            }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Number of records
            </InputLabel>
            <FormControl variant="standard" sx={{ m: 1 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={record}
                onChange={handleChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Paper elevation={0}>
          <Box
            sx={{
              color: "#9e9e9e",
              padding: "2rem 1rem",
              fontSize: "1.3rem",
              textAlign: "center",
            }}
          >
            No appointments are made yet
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
