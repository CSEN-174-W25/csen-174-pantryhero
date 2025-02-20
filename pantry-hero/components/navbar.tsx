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
    <Paper style={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        role="navigation"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
        label="Pantry" 
        icon={<KitchenIcon/>} 
        component={Link}
        href="/pantry"/>

        <BottomNavigationAction 
        label="Home" 
        icon={<HomeIcon/>} 
        component={Link}
        href="/"/>
        
        <BottomNavigationAction
        label="Cookbook"
        icon={<MenuBookIcon/>}
        component={Link}
        href="/cookbook"/>
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
            tooltipTitle={action.name}/>
        ))}
      </SpeedDial>
    </Paper>
  );
}