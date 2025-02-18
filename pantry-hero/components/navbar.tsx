"use client";
import * as React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CropFreeIcon from '@mui/icons-material/CropFree';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from "next/link";

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
          label="Scan"
          icon={<CropFreeIcon/>}
          component={Link}
          href="/scan"
        />
        <BottomNavigationAction 
        label="Home" 
        icon={<HomeIcon/>} 
        component={Link}
        href="/"/>
        <BottomNavigationAction 
        label="Pantry" 
        icon={<KitchenIcon/>} 
        component={Link}
        href="/pantry"/>
        <BottomNavigationAction
        label="Cookbook"
        icon={<MenuBookIcon/>}
        component={Link}
        href="/cookbook"/>
      </BottomNavigation>
    </Paper>
  );
}