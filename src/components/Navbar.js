import React from "react";
import myIcon from "../myIcon/logo.svg";
import styles from "../styles/navbar.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function Navbar() {
  const handleSearch = (event) => {
    const searchText = event.target.value;
    // Add your search logic here
  };

  return (
    <nav className={styles.navbar}>
      {/* <div className={styles.menuIcon}>
        <IconButton edge="end" color="inherit" aria-label="menu"></IconButton>
        <MenuIcon />
      </div> */}
      <div>
        <img src={myIcon} className={styles.icon} alt="my logo" />
      </div>

      <div className={styles.centerContainer}>
        <div className={styles.dropdown}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            // sx={{ width: 200 }}
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
