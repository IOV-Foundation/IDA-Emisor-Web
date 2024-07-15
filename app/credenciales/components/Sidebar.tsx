import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Image from "next/image";

const drawerWidth = 240;

export const Sidebar = ({children}: {children: React.ReactNode}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <header className="w-full bg-[#BB2929] shadow-md top-0 left-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-4">
              <Image
                src="/images/logo-demo.png"
                alt="IDA Demo - Portal Gobierno"
                width={100}
                height={56}
                priority
              />
              <div className="border-l-4 border-white pl-3 ml-3">
                <h1 className="text-2xl font-bold text-white">DEMO - Portal Emisor</h1>
                <h2 className="text-xl text-white">Licencias de Conducir</h2>
              </div>
            </div>
          </div>
        </header>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar/>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Credentials" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default' }}
      >
        {children}
      </Box>
    </Box>
  );
}
