import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";

export default function NestedDrawer() {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const userData = JSON.parse(localStorage.getItem("userContext") || "null");
  const location = useLocation();
  let menuItems = [];
  if (userData?.user?.role === "doctor") {
    menuItems = [
      {
        text: "Personal Information",
        icon: <AccountCircleIcon />,
        link: "/doctor-profile",
      },
      {
        text: "Qualifications",
        icon: <HttpsOutlinedIcon />,
        link: "/doctor-profile/qualification",
      },
      {
        text: "Experience",
        icon: <HttpsOutlinedIcon />,
        link: "/doctor-profile/experience",
      },
    ];
  } else {
    menuItems = [
      { text: "My Profile", icon: <AccountCircleIcon />, link: "/myprofile" },
      {
        text: "Change Password",
        icon: <HttpsOutlinedIcon />,
        link: "/changepassword",
      },
    ];
  }
  const handleItemClick = (index) => {
    setSelectedItem(index);
  };
  React.useEffect(() => {
    // Find the index of the current pathname in the menu items
    const currentIndex = menuItems.findIndex(
      (item) => item.link === location.pathname
    );

    // Update the selected item index
    setSelectedItem(currentIndex);
  }, [location]);
  return (
    <Box sx={{ fontSize: "0.1rem", marginLeft: "4.3rem" }}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component={Link}
            to={item.link}
            disablePadding
            sx={{ pt: "8px", pb: "8px" }}
            onClick={() => handleItemClick(index)}
          >
            <ListItemButton
              selected={selectedItem === index}
              sx={{
                textDecoration: "none",
                color: "rgba(0, 0, 0, 0.87)",
                backgroundColor:
                  selectedItem === index ? "#eeeeee !important" : "transparent",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                sx={{
                  "& .css-10hburv-MuiTypography-root": {
                    fontSize: "1.1rem",
                  },
                }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
