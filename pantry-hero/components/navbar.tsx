"use client";
import * as React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CropFreeIcon from '@mui/icons-material/CropFree';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Link from "next/link";

const actions = [
  { icon: <CropFreeIcon />, name: 'Add To Your Pantry', href: "/scan" },
  { icon: <EditNoteIcon />, name: 'Add To Your Cookbook', href: "/recipe" },
];

export default function Navbar() {
  const [value, setValue] = React.useState(1);

  return (
    <Paper style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: '#4caf50' }} elevation={3}>
      <BottomNavigation
        showLabels
        role="navigation"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: '#4caf50', color: '#ffffff' }}
      >
        <BottomNavigationAction 
          label="Pantry" 
          icon={<KitchenIcon sx={{ color: '#ffffff' }} />} 
          component={Link}
          href="/pantry"
          sx={{
            color: '#ffffff',
            '&.Mui-selected': {
              color: '#ffffff',
            },
            '&:hover': {
              color: '#388e3c',
            },
          }}
        />

        <BottomNavigationAction 
          label="Home" 
          icon={<HomeIcon sx={{ color: '#ffffff' }} />} 
          component={Link}
          href="/"
          sx={{
            color: '#ffffff',
            '&.Mui-selected': {
              color: '#ffffff',
            },
            '&:hover': {
              color: '#388e3c',
            },
          }}
        />
        
        <BottomNavigationAction
          label="Cookbook"
          icon={<MenuBookIcon sx={{ color: '#ffffff' }} />}
          component={Link}
          href="/cookbook"
          sx={{
            color: '#ffffff',
            '&.Mui-selected': {
              color: '#ffffff',
            },
            '&:hover': {
              color: '#388e3c',
            },
          }}
        />
      </BottomNavigation>
      
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={() => window.location.href = action.href}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Paper>
  );
}