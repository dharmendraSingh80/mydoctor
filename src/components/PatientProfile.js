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
import { getPatientImage, updatePatientData, uploadPatientImage } from "../api";
import "../styles/loader.css";
import { useNavigate } from "react-router-dom";
import EditForm from "./pages/EditForm";
import { getPatient } from "../api";
import dayjs from "dayjs";

export default function PatientProfile({
  mobileOpen,
  handleDrawerToggle,
  selectedImage,
  setSelectedImage,
}) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    gender: "",
    dob: "",
    bloodType: "",
    area: "",
    city: "",
    country: "",
    locality: "",
    pincode: "",
    state: "",
  });

  const navigate = useNavigate();
  let userData = JSON.parse(localStorage.getItem("userContext") || "null");

  function fetchPatient() {
    getPatient()
      .then((patient) => {
        if (patient.email) {
          const defaultEditData = {
            ...editData,
            fullName: `${patient.firstName || ""} ${patient.lastName || ""}`,
            email: patient.email || "",
            contactNumber: patient.contactNumber || "",
            gender: patient.gender || "",
            dob: patient.profile?.dob
              ? dayjs(patient.profile.dob).format("YYYY-MM-DD")
              : "",
            bloodType: patient.profile?.bloodType || "N/a",
            area: patient.profile?.address?.area || "N/a",
            city: patient.profile?.address?.city || "N/a",
            country: patient.profile?.address?.country || "N/a",
            locality: patient.profile?.address?.locality || "N/a",
            pincode: patient.profile?.address?.pincode || "N/a",
            state: patient.profile?.address?.state || "N/a",
          };
          // Set the default values into the state
          setEditData(defaultEditData);
        }
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }

  const handleImageChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      setLoading(true);
      try {
        const data = await uploadPatientImage(
          formData,
          userData?.user?._id,
          userData?.accessToken
        );
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };
  const handleSaveClick = async () => {
    setEditing(false);
    const userName = editData.fullName.split(" ");
    const userDetails = {
      firstName: userName[0],
      gender: editData.gender,
      lastName: userName[1],
      profile: {
        dob: editData.dob,
        bloodType: editData.bloodType,
        address: {
          area: editData.area,
          city: editData.city,
          country: editData.country,
          locality: editData.locality,
          pincode: editData.pincode,
          state: editData.state,
        },
      },
    };

    try {
      const response = await updatePatientData(
        userDetails,
        userData?.user?._id,
        userData?.accessToken
      );
      if (response.enabled) {
        const defaultEditData = {
          ...editData,
          fullName: `${userDetails.firstName || ""} ${
            userDetails.lastName || ""
          }`,
          gender: userDetails.gender || "",
          dob: userDetails?.profile?.dob
            ? dayjs(userDetails?.profile?.dob).format("YYYY-MM-DD")
            : "",
          bloodType: userDetails?.profile?.bloodType || "N/a",
          area: userDetails.profile?.address?.area || "N/a",
          city: userDetails.profile?.address?.city || "N/a",
          country: userDetails.profile?.address?.country || "N/a",
          locality: userDetails.profile?.address?.locality || "N/a",
          pincode: userDetails.profile?.address?.pincode || "N/a",
          state: userDetails.profile?.address?.state || "N/a",
        };
        // Set the default values into the state
        setEditData(defaultEditData);
      } else {
        console.log("Unable to update");
      }
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
  };

  const inputHandleChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDatePicker = (value) => {
    value = dayjs(value).format("YYYY-MM-DD");
    setEditData((prev) => {
      return { ...prev, dob: value };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imageData, patientData] = await Promise.all([
          getPatientImage(userData?.user?._id, userData?.accessToken),
          getPatient(userData?.user?._id, userData?.accessToken),
        ]);

        if (imageData.name === "NotAuthenticated") {
          localStorage.removeItem("userContext");
          navigate("/auth/login");
          return;
        }

        if (patientData.email) {
          const defaultEditData = {
            ...editData,
            fullName: `${patientData.firstName || ""} ${
              patientData.lastName || ""
            }`,
            email: patientData.email || "",
            contactNumber: patientData.contactNumber || "",
            gender: patientData.gender || "",
            dob: patientData.profile?.dob
              ? dayjs(patientData.profile.dob).format("YYYY-MM-DD")
              : "",
            bloodType: patientData.profile?.bloodType || "N/a",
            area: patientData.profile?.address?.area || "N/a",
            city: patientData.profile?.address?.city || "N/a",
            country: patientData.profile?.address?.country || "N/a",
            locality: patientData.profile?.address?.locality || "N/a",
            pincode: patientData.profile?.address?.pincode || "N/a",
            state: patientData.profile?.address?.state || "N/a",
          };
          setEditData(defaultEditData);
        }

        setSelectedImage(imageData.avatar.buffer);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
            <Box sx={styles.editButtonWrapper}>
              {editing ? (
                <Button
                  sx={styles.saveButton}
                  variant="contained"
                  disabled={
                    !(
                      editData.fullName &&
                      editData.gender &&
                      editData.area &&
                      editData.city &&
                      editData.country &&
                      editData.locality &&
                      editData.pincode &&
                      editData.state
                    )
                  }
                  onClick={handleSaveClick}
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
          <EditForm
            editing={editing}
            handleDatePicker={handleDatePicker}
            inputHandleChange={inputHandleChange}
            editData={editData}
          />
        </Box>
      </Box>
    </Box>
  );
}
