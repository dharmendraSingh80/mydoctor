import { Box } from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import { useEffect, useState } from "react";
import { getPatientImage, updatePatientData, uploadPatientImage } from "../api";

import { useNavigate } from "react-router-dom";
import EditForm from "./pages/EditForm";
import { getPatient } from "../api";
import dayjs from "dayjs";
import PatientProfileHeader from "./pages/PatientProfileHeader";

export default function PatientProfile({ mobileOpen, handleDrawerToggle }) {
  const [selectedImage, setSelectedImage] = useState(null);
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
  const [isFilled, setIsFilled] = useState(false);

  const navigate = useNavigate();

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
            bloodType: patient.profile?.bloodType || "",
            area: patient.profile?.address?.area || "",
            city: patient.profile?.address?.city || "",
            country: patient.profile?.address?.country || "",
            locality: patient.profile?.address?.locality || "",
            pincode: patient.profile?.address?.pincode || "",
            state: patient.profile?.address?.state || "",
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
        const data = await uploadPatientImage(formData);
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
      const response = await updatePatientData(userDetails);
      if (response.enabled) {
        alert("Patient updated successfully");
      } else {
        console.log("Unable to update");
      }
      fetchPatient();
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
        const data = await getPatientImage();
        if (data.name === "NotAuthenticated") {
          navigate("/auth/login");
        }
        setSelectedImage(data.avatar.buffer);
      } catch (error) {
        console.error("Error fetching patient image:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    fetchPatient();
    if (
      editData.fullName &&
      editData.gender &&
      editData.area &&
      editData.city &&
      editData.country &&
      editData.locality &&
      editData.pincode &&
      editData.state
    ) {
      setIsFilled(true);
    }
  }, [selectedImage, isFilled]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "68vh",
      }}
    >
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          padding: "32px",
          flexGrow: 1,
          backgroundColor: "#fafafa",
        }}
      >
        <Box sx={{ width: "100%", marginTop: "2%" }}>
          <PatientProfileHeader
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            editing={editing}
            editData={editData}
            loading={loading}
            handleImageChange={handleImageChange}
            selectedImage={selectedImage}
            isFilled={isFilled}
          />
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
