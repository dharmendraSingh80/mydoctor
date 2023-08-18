import ResponsiveDrawer from "./pages/SideBar";
import Box from "@mui/material/Box";

import finalBannerImg from "../myIcon/final banner.svg";
import Card from "./pages/Card";
const drawerWidth = 240;
export default function Home({ mobileOpen, handleDrawerToggle }) {
  return (
    <div>
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
                display: "flex",
                flexWrap: "wrap",
                boxSizing: "border-box",
              }}
            >
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </Box>
          </section>
          <section id="doctors">
            <Box>340+ Doctors</Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                boxSizing: "border-box",
              }}
            >
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </Box>
          </section>
          {/* <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography> */}
        </Box>
      </Box>
    </div>
  );
}
