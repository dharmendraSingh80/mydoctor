import { Box } from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";

export default function PatientProfile({ mobileOpen, handleDrawerToggle }) {
  return (
    <Box sx={{ display: "flex" }}>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box sx={{ minHeight: "68vh" }}></Box>
    </Box>
  );
}
