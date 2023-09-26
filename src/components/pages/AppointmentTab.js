import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { TabContext, TabPanel } from "@mui/lab";
import { Button, Chip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function AppointmentTab({ slots, setAppointment }) {
  const [value, setValue] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let userData = JSON.parse(localStorage.getItem("userContext") || "null");

  const handleSlots = (slot) => {
    if (userData) {
      setAppointment(slot);
      navigate("/book-appointment");
    }
    setIsOpen(true);
  };

  return (
    <TabContext value={value}>
      <Box
        component={Paper}
        elevation={2}
        sx={{
          width: "100%",
          bgcolor: "#f5f5f5",
          display: "flex",

          boxSizing: "border-box",
          flexShrink: 0,
          flexDirection: "column",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{
            "& .MuiTab-root": {
              p: "6px 40px",
              fontWeight: 500,
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              maxWidth: "264px",
              minWidth: { xs: "72px", sm: "160px" },
              fontSize: "1rem",
            },
          }}
          centered
        >
          {slots.map((slot, index) => (
            <Tab
              key={index}
              value={index}
              label={dayjs(slot.startTime).format("MMM DD, YYYY")}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        <Box sx={{ p: "24px" }}>
          {slots.map((item, index) => (
            <Paper elevation={0}>
              <TabPanel key={index} value={index}>
                <Chip
                  label={`${dayjs(item.startTime).format("hh:mm a")} - ${dayjs(
                    item.endTime
                  ).format("hh:mm a")}`}
                  color="primary"
                  variant="outlined"
                  component={Button}
                  onClick={() => handleSlots(item)}
                />
              </TabPanel>
            </Paper>
          ))}
        </Box>
      </Box>
      {isOpen && (
        <Typography sx={{ color: "red" }}>
          Please{" "}
          <Link style={{ textDecoration: "none" }} to="/auth/login">
            Sign in
          </Link>{" "}
          /{" "}
          <Link style={{ textDecoration: "none" }} to="/auth/signup">
            Register
          </Link>{" "}
          to book an appointment.
        </Typography>
      )}
    </TabContext>
  );
}
