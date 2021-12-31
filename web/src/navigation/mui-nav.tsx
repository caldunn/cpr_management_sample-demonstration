import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconType } from "react-icons";

import {
  MdCalendarToday,
  MdHome,
  MdOutlineDescription, MdOutlineEditCalendar,
  MdOutlineInsertChartOutlined,
  MdOutlineLibraryBooks, MdOutlineNotes, MdOutlineShoppingCart, MdOutlineWidgets, MdPeople,
  MdPostAdd
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CgUserList } from "react-icons/cg";
import { IoHammerOutline } from "react-icons/io5";
import AccountMenu from "../mui/profile-button";
import { ReactChildren } from "react";

const drawerWidth = 240;

interface SideBarElement {
  title: string,
  to: string,
  icon: IconType,
}

const sideBarElementsLoggedIn: Array<SideBarElement> = [
  { title: "Home", to: "/", icon: MdHome },
  { title: "Job Sheet", to: "jsheet", icon: MdOutlineDescription },
  { title: "Attached Job Sheets", to: "attjsheets", icon: MdOutlineLibraryBooks },
  { title: "Job Start Form", to: "jstartform", icon: MdPostAdd },
  { title: "Timesheet", to: "timesheet", icon: MdCalendarToday },
  { title: "Job Report", to: "jreport", icon: MdOutlineInsertChartOutlined },
  { title: "User Maintenance", to: "usermaintenance", icon: MdPeople },
];

const sideBarElementsAdmin: Array<SideBarElement> = [
  { title: "Company Notes", to: "", icon: MdOutlineNotes },
  { title: "Client List", to: "", icon: CgUserList },
  { title: "Product Suppliers", to: "", icon: MdOutlineShoppingCart },
  { title: "Products", to: "", icon: MdOutlineWidgets },
  { title: "Timesheet Codes", to: "", icon: MdOutlineEditCalendar },
  { title: "Job Prefixes", to: "", icon: IoHammerOutline },
]

export function ResponsiveDrawer(props: React.PropsWithChildren<any>) {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawerButton = (item: SideBarElement) => (
    <ListItem button key={item.title} onClick={() =>  {
      navigate(item.to);
      handleDrawerToggle();
    }}>
      <ListItemIcon>
        <item.icon />
      </ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  );

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List> {sideBarElementsLoggedIn.map(drawerButton)} </List>
      <Divider />
      <List>
        {sideBarElementsAdmin.map(drawerButton)}</List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1 }}>
            CPR Employee Dashboard
          </Typography>

          <AccountMenu />
        </Toolbar>
      </AppBar>


      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="persistent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>

      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}
