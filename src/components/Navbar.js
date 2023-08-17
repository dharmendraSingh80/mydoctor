import React from "react";
import myIcon from "../myIcon/logo.svg";
import styles from "../styles/navbar.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, IconButton, Menu, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const pages = ["Products", "Pricing", "Blog"];
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleSearch = (event) => {
    const searchText = event.target.value;
    // Add your search logic here
  };

  return (
    <div className={styles.nav_wrapper}>
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
                forcePopupIcon={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select a Service"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "0",
                        outline: "none",
                        borderRadius: 0,
                      },
                    }}
                  />
                )}
              />
            </div>
            <div className={styles.searchBar}>
              <TextField
                id="search"
                placeholder="Search Doctors"
                fullWidth
                variant="outlined"
                onChange={handleSearch}
                InputProps={{
                  // Add the SearchIcon as the endAdornment
                  endAdornment: <SearchIcon color="action" fontSize="small" />,
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.menuContainer}>
          <Button variant="contained" color="primary" href="/login">
            LOGIN
          </Button>
        </div>
      </nav>
      <div className="swiper-wrapper"></div>
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
