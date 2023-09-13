import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BubbleChartSharpIcon from "@mui/icons-material/BubbleChartSharp";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";
import NestedDrawer from "./NestedDrawer";
import NestedDrawerDoctor from "./NestedDrawerDoctor";

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
  const [isNestedDrawerOpen, setIsNestedDrawerOpen] = React.useState(false);

  let userData = JSON.parse(localStorage.getItem("userContext") || "null");
  console.log(userData);

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

  const menuItemsDoctor = [
    {
      text: "Dashboard",
      icon: <PersonOutlineIcon />,
      link: "/doctor-dashboard",
    },
    {
      text: "Doctor Profile",
      icon: <PersonOutlineIcon />,
      link: "/doctor-profile",
    },
    {
      text: "Appointments",
      icon: <PersonOutlineIcon />,
      link: "/doctor-appointments",
    },
    {
      text: "Reviews",
      icon: <PersonOutlineIcon />,
      link: "/",
    },
  ];

  const drawer = (
    <Box sx={{ marginTop: { md: 17 } }}>
      <DrawerHeader sx={{ display: { md: "none" } }}>
        <IconButton onClick={props.handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        {(userData?.user?.role === "doctor"
          ? menuItemsDoctor
          : menuItems.filter((item) => {
              if (
                item.text === "Account Settings" ||
                item.text === "My Appointments"
              ) {
                return userData?.user?.role === "patient";
              }
              return true; // Show other items unconditionally
            })
        ).map((item, index) => (
          <>
            {item.text !== "Account Settings" &&
            item.text !== "Doctor Profile" ? (
              <ListItem
                key={index}
                component={Link}
                to={item.link}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                disablePadding
              >
                <ListItemButton
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
            ) : (
              <>
                <ListItem
                  component={Link}
                  to={item.link}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
                {isNestedDrawerOpen &&
                  (userData?.user?.role === "doctor" ? (
                    <NestedDrawerDoctor />
                  ) : (
                    <NestedDrawer />
                  ))}
              </>
            )}
          </>
        ))}
      </List>
    </Box>
  );

  React.useEffect(() => {
    // Find the index of the current pathname in the menu items
    const currentIndex = (
      userData?.user?.role === "doctor" ? menuItemsDoctor : menuItems
    ).findIndex((item) => item.link === location.pathname);
    // Check if the current pathname matches "/myprofile" or "/changepassword"
    const isProfileOrChangePassword =
      location.pathname === "/myprofile" ||
      location.pathname === "/changepassword";
    // Update the selected item index and isNestedDrawerOpen
    setSelectedItem(currentIndex);
    setIsNestedDrawerOpen(isProfileOrChangePassword);
  }, [location, menuItems]);

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
