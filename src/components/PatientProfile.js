import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ResponsiveDrawer from "./pages/SideBar";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getPatientImage, uploadPatientImage } from "../api";
import "../styles/loader.css";
import { useNavigate } from "react-router-dom";
import EditForm from "./pages/EditForm";

export default function PatientProfile({ mobileOpen, handleDrawerToggle }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userContext") || "null");

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      setLoading(true);
      uploadPatientImage(formData)
        .then((data) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setSelectedImage(e.target.result);
          };
          reader.readAsDataURL(selectedFile);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleEditClick = () => {
    setEditing((prev) => !prev);
  };

  useEffect(() => {
    getPatientImage()
      .then((data) => {
        if (data.name === "NotAuthenticated") {
          navigate("/auth/login");
        }
        setSelectedImage(data.avatar.buffer);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedImage]);

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
      alignItems: "center",
    },

    avatarWrapper: {
      position: "relative",
      TextAlign: "center",
    },
    avatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
    },

    loader: {
      position: "absolute",
      top: "30%",
      left: "25%",
      transform: "translate(-50%, -50%)",
      zIndex: 1,
    },

    // emptyBox1: {
    //   position: "absolute",
    //   marginTop: "-79px",
    //   marginLeft: "22%",
    // },
    // emptyBox2: {
    //   position: "absolute",
    //   marginTop: "-79px",
    //   marginLeft: "22%",
    // },

    cameraIconContainer: {
      display: editing ? "flex" : "none",
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
    note: { fontSize: "12px", width: "100%", color: "grey", mt: "10px" },
    // emptyBox3: {
    //   flexGrow: 0,
    //   maxWidth: { xs: "25%", md: "25%", sm: "8.333%" },
    //   flexBasis: { xs: "25%", md: "25%", sm: "8.333%" },
    //   p: "4px",
    //   m: 0,
    //   boxSizing: "border-box",
    // },
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
    editButton: { height: "40px" },
    saveButton: { height: "40px" },
  };

  console.log(userData);

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
                    <Avatar
                      sx={styles.avatar}
                      src={selectedImage || "/broken-image.jpg"}
                    />

                    {loading && (
                      <Box sx={styles.loader}>
                        <div className="loader"></div>
                      </Box>
                    )}
                    {/* <Box sx={styles.emptyBox1}></Box> */}
                    {/* <Box sx={styles.emptyBox2}></Box> */}
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
                            <IconButton color="primary" component="span">
                              <PhotoCameraIcon
                                color="primary"
                                fontSize="large"
                              />
                            </IconButton>
                          </div>
                        </label>
                      </Box>
                      <Box sx={styles.closeIconWrapper}>
                        <CloseIcon fontSize="large" color="action" />
                      </Box>
                    </Box>
                    <Typography sx={styles.note}>
                      JPEG, JPG or PNG image less than 1 MB <br />
                      <span>(Close up face picture looks great)</span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* <Box sx={styles.emptyBox3}></Box> */}
            <Box sx={styles.editButtonWrapper}>
              {editing ? (
                <Button
                  sx={styles.saveButton}
                  variant="contained"
                  onClick={handleEditClick}
                >
                  Save
                </Button>
              ) : (
                <Button
                  sx={styles.editButton}
                  variant="contained"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              )}
            </Box>
          </Box>
          <EditForm editing={editing} />
        </Box>
      </Box>
    </Box>
  );
}
