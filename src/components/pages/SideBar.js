import * as React from "react";

import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import BubbleChartSharpIcon from "@mui/icons-material/BubbleChartSharp";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function ResponsiveDrawer(props) {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = React.useState(null);
  let userData = JSON.parse(localStorage.getItem("userContext") || "null");

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const menuItems = [
    { text: "Doctors", icon: <PersonSharpIcon />, link: "/" },
    {
      text: "Specialities",
      icon: <BubbleChartSharpIcon />,
      link: "/specialities",
    },
    {
      text: "My Appointments",
      icon: <EventNoteIcon />,
      link: "/appointments",
    },
    {
      text: "Account Settings",
      icon: <PersonSharpIcon />,
      link: "/myprofile",
    },
  ];

  console.log(userData);
  const drawer = (
    <Box sx={{ marginTop: { md: 17 } }}>
      <DrawerHeader sx={{ display: { md: "none" } }}>
        <IconButton onClick={props.handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        {menuItems
          .filter((item) => {
            if (
              item.text === "Account Settings" ||
              item.text === "My Appointments"
            ) {
              return userData?.user?.role === "patient";
            }
            return true; // Show other items unconditionally
          })
          .map((item, index) => (
            <ListItem
              key={index}
              component={Link}
              to={item.link}
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
              disablePadding
              onClick={() => handleItemClick(index)}
            >
              <ListItemButton
                component={ListItemButton}
                selected={selectedItem === index}
                sx={{
                  backgroundColor:
                    selectedItem === index
                      ? "#eeeeee !important"
                      : "transparent",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
  React.useEffect(() => {
    // Find the index of the current pathname in the menu items
    const currentIndex = menuItems.findIndex(
      (item) => item.link === location.pathname
    );

    // Update the selected item index
    setSelectedItem(currentIndex);
  }, [location]);
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          zIndex: 1400,
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default ResponsiveDrawer;
