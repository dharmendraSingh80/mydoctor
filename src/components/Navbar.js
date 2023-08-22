import React from "react";
import myIcon from "../myIcon/logo.svg";
import styles from "../styles/navbar.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, IconButton } from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
// import Swiper from "./pages/Swiper";

// const pages = ["Products", "Pricing", "Blog"];
function Navbar({ handleDrawerToggle }) {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleSearch = (event) => {
    const searchText = event.target.value;
    // Add your search logic here
  };

  //

  return (
    <div className={styles.nav_wrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={myIcon} className={styles.icon} alt="my logo" />
          </Link>
        </div>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleDrawerToggle}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <div className={styles.centerContainer}>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
            }}
          >
            <Link to="/">
              <img src={myIcon} className={styles.icon} alt="my logo" />
            </Link>
          </Box>

          <div className={styles.serviceDoctorsContainer}>
            <div className={styles.dropdown}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "none",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                forcePopupIcon={false}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select a Service" />
                )}
              />
            </div>
            <div className={styles.searchBar}>
              <TextField
                id="search"
                placeholder="Search Doctors"
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
              <IconButton onClick={handleSearch} aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
          </div>
        </div>

        <div className={styles.menuContainer}>
          <Button variant="contained" color="primary" href="/login">
            LOGIN
          </Button>
        </div>
      </nav>
      <Box
        sx={{
          display: { md: "none", xs: "flex" },
          justifyContent: "center",
          p: 2,
          // width: { xs: "90%", sm: "90%" },
        }}
      >
        <div className={styles.dropdown}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            forcePopupIcon={false}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select a Service" />
            )}
          />
        </div>
        <div className={styles.searchBar}>
          <TextField
            id="search"
            placeholder="Search Doctors"
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
          <IconButton onClick={handleSearch} aria-label="search">
            <SearchIcon fontSize="medium" />
          </IconButton>
        </div>
      </Box>
      <div className="swiper-wrapper">{/* <Swiper /> */}</div>
    </div>
  );
}

const top100Films = [
  { label: "Bone Marrow" },
  { label: "Anethesiology" },
  { label: "E.N.T" },
  { label: "Cardiac Surgery" },
  { label: "Clinical Nutrition & Dietetics" },
  { label: "Cosmetology" },
  { label: "Breast & Oncoplastic - Oncology" },
  {
    label: "Child & Adolescent Psychiatry",
  },
];

export default Navbar;
