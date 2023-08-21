import ResponsiveDrawer from "./pages/SideBar";
import Box from "@mui/material/Box";
import SpecialitiesCard from "./pages/SpecialitiesCard";

const drawerWidth = 240;
export default function Specialities({ mobileOpen, handleDrawerToggle }) {
  return (
    <Box sx={{ display: "flex" }}>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 0,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <section>
          <Box
            sx={{
              color: "#3f51b5",
              fontSize: "42px",
              mt: "16px",
              fontWeight: "bold",
            }}
          >
            20+ Specialities
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "auto",
                sm: "auto auto",
                lg: "auto auto auto",
              },
              gap: "54px",
            }}
          >
            <SpecialitiesCard />
            <SpecialitiesCard />
            <SpecialitiesCard />
            <SpecialitiesCard />
            <SpecialitiesCard />
          </Box>
          {/* <Box
            sx={{
              textAlign: { xs: "center", md: "end" },
              p: "1rem 0 0 0",
              fontSize: "20px",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                marginRight: "1.3rem",
              }}
              to="/specialities"
            >
              View all Specialities...
            </Link>
          </Box> */}
        </section>
      </Box>
    </Box>
  );
}
