import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function AppointmentTab({ slots }) {
  console.log(slots);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //const dateStr = formatDate(data.startTime); // Format the date here

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
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
            width: "calc(100% / 3)",
            // Set the width for each tab
          },
        }}
      >
        {slots.map((slot, index) => (
          <Tab
            sx={{
              fontWeight: 500,
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            }}
            key={index}
            label={formatDate(slot.startTime)}
          />
        ))}

        {/* <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" /> */}
      </Tabs>
    </Box>
  );
}
