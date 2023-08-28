import React, { useEffect, useState } from "react";
import myIcon from "../myIcon/logo.svg";
import { useLocation } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, IconButton } from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import Swiper from "./pages/Swiper";

function Navbar({ handleDrawerToggle, dataSpeciality }) {
  const [selectedValue, setSelectedValue] = useState({
    autocomplete: "",
    typeSearch: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sp = searchParams.get("sp");
  const specialityNames = dataSpeciality.map((item) => item.name);

  const handleAutocompleteChange = (event, value) => {
    setSelectedValue((prev) => {
      return {
        ...prev,
        autocomplete: value,
      };
    });
  };

  const handleChange = (e) => {
    setSelectedValue((prev) => {
      return {
        ...prev,
        typeSearch: e.target.value,
      };
    });
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (selectedValue.autocomplete) {
      queryParams.set("sp", selectedValue.autocomplete);
    }
    if (selectedValue.typeSearch) {
      queryParams.set("name", selectedValue.typeSearch);
    }
    const url = `/search?${queryParams.toString()}`;
    // Navigate to the URL
    navigate(url);
  };

  useEffect(() => {
    setSelectedValue((prev) => {
      return {
        ...prev,
        autocomplete: sp,
      };
    });
  }, [sp]);

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
                options={specialityNames}
                onChange={handleAutocompleteChange}
                value={selectedValue.autocomplete}
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
                onChange={handleChange}
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
          <Button variant="contained" color="primary" href="/auth/login">
            LOGIN
          </Button>
        </div>
      </nav>
      <Box
        sx={{
          display: { md: "none", xs: "flex" },
          justifyContent: "center",
          p: 2,
        }}
      >
        <div className={styles.dropdown}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={specialityNames}
            onChange={handleAutocompleteChange}
            value={selectedValue.autocomplete}
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
            onChange={handleChange}
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
      <Box>
        <Swiper />
      </Box>
    </div>
  );
}

export default Navbar;
