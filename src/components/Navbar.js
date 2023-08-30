import React, { useState, useRef, useEffect } from "react";
import myIcon from "../myIcon/logo.svg";
import { useLocation } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Box,
  IconButton,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Avatar,
  ListItemIcon,
} from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import Swiper from "./pages/Swiper";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Navbar({ handleDrawerToggle, dataSpeciality }) {
  const [selectedValue, setSelectedValue] = useState({
    autocomplete: "",
    typeSearch: "",
  });
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sp = searchParams.get("sp");
  const specialityNames = dataSpeciality.map((item) => item.name);
  // Retrieving user data
  let userData = JSON.parse(localStorage.getItem("userContext") || "null");
  const prevOpen = useRef(open);

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

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userContext");
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const searchBarAndDropdown = (
    <>
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
    </>
  );

  // return focus to the button when we transitioned from !open -> open

  useEffect(() => {
    if (prevOpen.current && !open && anchorRef.current) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

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
            {searchBarAndDropdown}
          </div>
        </div>

        <div className={styles.menuContainer}>
          {!userData ? (
            <Button variant="contained" color="primary" href="/auth/login">
              LOGIN
            </Button>
          ) : (
            <div>
              <Box sx={{ mr: 1 }} ref={anchorRef} onClick={handleToggle}>
                <Avatar src="/broken-image.jpg" />
              </Box>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 1222 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <PermIdentityIcon />
                            </ListItemIcon>
                            Account Settings
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <CalendarTodayIcon />
                            </ListItemIcon>
                            My Appointments
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                              <ExitToAppIcon />
                            </ListItemIcon>
                            Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          )}
        </div>
      </nav>
      <Box
        sx={{
          display: { md: "none", xs: "flex" },
          justifyContent: "center",
          p: 2,
        }}
      >
        {searchBarAndDropdown}
      </Box>
      <Box>
        <Swiper />
      </Box>
    </div>
  );
}

export default Navbar;
