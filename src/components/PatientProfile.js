import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ResponsiveDrawer from "./pages/SideBar";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function PatientProfile({ mobileOpen, handleDrawerToggle }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValue] = useState(dayjs("2022-04-17"));

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };
  return (
    <Box sx={styles.container}>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box component="main" sx={styles.mainBox}>
        <Box sx={{ width: "100%", marginTop: "2%" }}>
          <Box sx={styles.titleWrapper1}>
            <Box sx={styles.titleWrapper2}>
              <Typography sx={styles.title}>My Profile</Typography>
            </Box>
          </Box>
          <Box sx={styles.avatarEditBox}>
            <Box sx={styles.avatarEditBox2}>
              <Box sx={{ marginTop: "10px" }}>
                <Box sx={styles.avatarWrapper2}>
                  <Box sx={styles.avatarWrapper}>
                    <Avatar sx={styles.avatar} src="/broken-image.jpg" />
                    <Box sx={styles.emptyBox1}></Box>
                    <Box sx={styles.emptyBox2}></Box>
                    <Box sx={styles.cameraIconContainer}>
                      <Box sx={styles.cameraIconWrapper}>
                        <Input
                          accept="image/*"
                          id="image-input"
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                        <label htmlFor="image-input">
                          <div className="image-preview">
                            {selectedImage ? (
                              <img src={selectedImage} alt="Uploaded" />
                            ) : (
                              <IconButton color="primary" component="span">
                                <PhotoCameraIcon
                                  color="primary"
                                  fontSize="large"
                                />
                              </IconButton>
                            )}
                          </div>
                        </label>
                      </Box>
                      <Box sx={styles.closeIconWrapper}>
                        <CloseIcon fontSize="large" color="action" />
                      </Box>
                    </Box>
                    <Typography sx={styles.instruction}>
                      JPEG, JPG or PNG image less than 1 MB <br />
                      <span>(Close up face picture looks great)</span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={styles.emptyBox3}></Box>
            <Box sx={styles.editButtonWrapper}>
              <Button
                sx={{ height: "40px" }}
                variant="contained"
                href="#contained-buttons"
              >
                Edit
              </Button>
            </Box>
          </Box>

          <Grid
            container
            rowSpacing={4}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{ mt: "15px" }}
          >
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                fullWidth
                id="outlined-required"
                label="Name"
                defaultValue="Hello World"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                fullWidth
                id="outlined-required"
                label="Phone Number"
                defaultValue="Hello World"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                fullWidth
                id="outlined-required"
                label="Email"
                defaultValue="Hello World"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                id="outlined-select-currency"
                select
                label="Gender"
                fullWidth
                defaultValue="Male"
              >
                {genders.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{
                    overflow: "none",
                    paddingTop: 0,
                  }}
                  components={["DatePicker", "DatePicker"]}
                >
                  <DatePicker
                    label="Date Of birth"
                    value={value}
                    sx={{ width: "100%" }}
                    onChange={(newValue) => setValue(newValue)}
                    format="DD-MM-YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                id="outlined-select-currency"
                select
                fullWidth
                label="Bloodgroup"
              >
                {genders.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                fullWidth
                id="outlined-required"
                label="House No./Street/Area"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                fullWidth
                id="outlined-required"
                label="colony/Street/Locality"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField fullWidth id="outlined-required" label="City" />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField fullWidth id="outlined-required" label="State" />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField fullWidth id="outlined-required" label="Country" />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField fullWidth id="outlined-required" label="Pincode" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
const genders = ["Male", "Female", "Other"];

const styles = {
  container: {
    display: "flex",
    minHeight: "68vh",
  },
  mainBox: {
    padding: "32px",
    flexGrow: 1,
    backgroundColor: "#fafafa",
  },
  titleWrapper1: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },
  titleWrapper2: {
    flexGrow: 0,
    maxWidth: "100%",
    flexBasis: "100%",
    margin: 0,
    boxSizing: "border-box",
  },
  title: {
    color: "#3f51b5",
    flexGrow: 1,
    fontSize: { xs: "26px", sm: "30px", md: "32px" },
    fontWeight: "bold",
  },
  avatarEditBox: {
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    justifyContent: "space-between",
    width: "calc(100% + 8px)",
    margin: "-4px",
  },
  avatarEditBox2: {
    padding: "4px",
    margin: 0,
    boxSizing: "border-box",
    flexGrow: 0,
    maxWidth: { xs: "58.3333%", sm: "50%", md: "41.6666%" },
    flexBasis: { xs: "58.3333%", sm: "50%", md: "41.6666%" },
  },
  avatarWrapper2: {
    display: "flex",
    padding: "0px",
    justifyContent: "space-between",
  },

  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: "120px",
    border: "1px solid lightgray",
    height: "120px",
  },

  emptyBox1: {
    position: "absolute",
    marginTop: "-79px",
    marginLeft: "22%",
  },
  emptyBox2: {
    position: "absolute",
    marginTop: "-79px",
    marginLeft: "22%",
  },

  cameraIconContainer: {
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    width: "calc(100% + 24px)",
    margin: "-12px -12px 6% 6%",
  },

  cameraIconWrapper: {
    pt: ".7rem",
    pl: "1rem",
    flexGrow: 0,
    maxWidth: "16.666667%",
    flexBasis: "16.666667%",
  },

  closeIconWrapper: {
    pt: "1.2rem",
    flexGrow: 0,
    maxWidth: "16.666667%",
    flexBasis: "16.666667%",
    pl: ".6rem",
    boxSizing: "border-box",
  },
  instruction: { fontSize: "12px", width: "100%", color: "grey" },

  emptyBox3: {
    flexGrow: 0,
    maxWidth: { xs: "25%", md: "25%", sm: "8.333%" },
    flexBasis: { xs: "25%", md: "25%", sm: "8.333%" },
    p: "4px",
    m: 0,
    boxSizing: "border-box",
  },
  editButtonWrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    margin: 0,
    boxSizing: "border-box",
    justifyContent: "flex-end",
    padding: "4px",
    flexGrow: 0,
    maxWidth: { xs: "16.666667%", sm: "33.333333%" },
    flexBasis: { xs: "16.666667%", sm: "33.333333%" },
  },
};
