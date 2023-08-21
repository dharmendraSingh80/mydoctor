import ResponsiveDrawer from "./pages/SideBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import finalBannerImg from "../myIcon/final banner.svg";
import SpecialitiesCard from "./pages/SpecialitiesCard";
import DoctorsCard from "./pages/DoctorsCard";

const drawerWidth = 240;
export default function Home({ mobileOpen, handleDrawerToggle }) {
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
        <Box>
          <img src={finalBannerImg} alt="final banner image" />
        </Box>

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
          <Box
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
          </Box>
        </section>
        <section id="doctors">
          <Box>340+ Doctors</Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              },
              gridGap: "1.8rem",
            }}
          >
            <DoctorsCard />
            <DoctorsCard />
            <DoctorsCard />
            <DoctorsCard />
            <DoctorsCard />
          </Box>
        </section>
      </Box>
    </Box>
  );
}
