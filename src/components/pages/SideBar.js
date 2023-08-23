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
import { Link } from "react-router-dom";

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
  const [selectedItem, setSelectedItem] = React.useState(0); // State to keep track of selected item

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
  ];

  const drawer = (
    <Box sx={{ marginTop: { md: 17 } }}>
      <DrawerHeader sx={{ display: { md: "none" } }}>
        <IconButton onClick={props.handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component={Link}
            to={item.link}
            sx={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor:
                selectedItem === index ? "lightgrey" : "transparent",
            }}
            disablePadding
            onClick={() => handleItemClick(index)}
            selected={selectedItem === index}
            button
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
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
