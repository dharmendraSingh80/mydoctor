import { Box, Typography } from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import patientAppointment from "../api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/loader.css";

export default function Appointments({
  mobileOpen,
  handleDrawerToggle,
  appointmentAlert,
}) {
  const [totalAppointments, setTotalAppointments] = useState([]);
  const [record, setRecord] = useState(10);
  const [loading, setLoading] = useState(true);
  let userData = JSON.parse(localStorage.getItem("userContext") || "null");

  const handleChange = (event) => {
    setRecord(event.target.value);
  };

  useEffect(() => {
    patientAppointment(userData?.user?._id, userData?.accessToken)
      .then((data) => {
        setTotalAppointments(data?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          minHeight: "68vh",
          p: "32px",
          flexGrow: 1,
          backgroundColor: "#fafafa",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            sx={{
              color: "#3f51b5",
              flexGrow: 1,
              fontSize: { xs: "26px", sm: "30px", md: "32px" },
              fontWeight: "bold",
            }}
          >
            My Appointments
          </Typography>
          <Box
            sx={{
              gap: "0.5rem",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
            }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Number of records
            </InputLabel>
            <FormControl variant="standard" sx={{ m: 1 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={record}
                onChange={handleChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {appointmentAlert}
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
          </div>
        ) : (
          <Paper elevation={0}>
            {totalAppointments.length === 0 ? (
              <Box
                sx={{
                  color: "#9e9e9e",
                  padding: "2rem 1rem",
                  fontSize: "1.3rem",
                  textAlign: "center",
                }}
              >
                No appointments are made yet
              </Box>
            ) : (
              <List>
                {totalAppointments.map((item, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  );
}
