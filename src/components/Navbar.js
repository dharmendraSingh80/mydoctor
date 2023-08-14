import React from "react";
import myIcon from "../myIcon/logo.svg";
import styles from "../styles/navbar.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, IconButton, Menu, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Products", "Pricing", "Blog"];
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleSearch = (event) => {
    const searchText = event.target.value;
    // Add your search logic here
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={myIcon} className={styles.icon} alt="my logo" />
      </div>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          // onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          // onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page}
              //onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <div className={styles.centerContainer}>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            mb: 2,
            justifyContent: "center",
          }}
        >
          <img src={myIcon} className={styles.icon} alt="my logo" />
        </Box>

        <div className={styles.serviceDoctorsContainer}>
          <div className={styles.dropdown}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              // sx={{ width: 200 }}
              forcePopupIcon={false}
              renderInput={(params) => (
                <TextField {...params} label="Select a Service" />
              )}
            />
          </div>
          <div className={styles.searchBar}>
            <TextField
              id="search"
              label="Search Doctors"
              variant="outlined"
              fullWidth
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <Button variant="contained" color="primary" href="#contained-buttons">
          LOGIN
        </Button>
      </div>
    </nav>
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
