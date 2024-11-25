import React from 'react'
import { Outlet } from "react-router-dom"
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Typography }  from "@mui/material"

const drawerWidth = 240;

function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            RBAC Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button component="a" href="/users">
              <ListItemText primary="User Management" />
            </ListItem>
            <ListItem button component="a" href="/roles">
              <ListItemText primary="Role Management" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout