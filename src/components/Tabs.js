import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Divider } from "@mui/material";
import LoginForm from "./pages/LoginForm";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "70%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ border: 1, borderColor: "divider" }}>
          <TabList
            variant="fullWidth"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="LOGIN" value="1" />
            <Divider
              orientation="vertical"
              style={{ height: 50, alignSelf: "center" }}
            />
            <Tab label="PATIENT SIGN UP" value="2" />
            <Divider
              orientation="vertical"
              style={{ height: 50, alignSelf: "center" }}
            />
            <Tab label="DOCTOR SIGN UP" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <LoginForm />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
