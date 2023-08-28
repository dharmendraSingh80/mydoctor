import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDoctorsBySpeciality } from "../api";
import { Box, Typography } from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import DoctorsCard from "./pages/DoctorsCard";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

function DoctorsBySpeciality({ mobileOpen, handleDrawerToggle }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const speciality = searchParams.get("sp");
  const name = searchParams.get("name");
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (speciality || name) {
      getDoctorsBySpeciality(speciality, name)
        .then((data) => {
          setDoctors(data);
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false when data is fetched
        });
    }
  }, [speciality, name]);

  return (
    <Box sx={{ display: "flex", minHeight: "68vh" }}>
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
        {isLoading ? (
          <Typography variant="body1" color="text.secondary">
            Searching for: "{speciality}" {name ? ` in "${name}"` : ""}
          </Typography>
        ) : doctors.length > 0 ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row wrap",
                alignItems: "center",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">
                  Showing Results for: '{speciality}'
                  {name ? ` in "${name}"` : ""}
                </Typography>
                <Typography
                  sx={{ padding: "1rem 0" }}
                  color="text.secondary"
                  variant="body1"
                >
                  {doctors.length}
                  {doctors.length === 1 ? " doctor " : " doctors "}
                  found
                </Typography>
              </Box>
              <Box>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Items per page
                    </InputLabel>
                    <NativeSelect
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      defaultValue={12}
                      onChange={(event) =>
                        setDoctors(doctors.slice(0, event.target.value))
                      }
                    >
                      <option value={9}>9</option>
                      <option value={12}>12</option>
                      <option value={18}>18</option>
                      <option value={30}>30</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridGap: "1.8rem",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
              }}
            >
              {doctors.map((doctor, index) => (
                <DoctorsCard key={index} content={doctor} />
              ))}
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No results found for "{speciality}"{name ? ` in "${name}"` : ""}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default DoctorsBySpeciality;
