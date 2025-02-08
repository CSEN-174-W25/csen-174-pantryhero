"use client";
import * as React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Restore as RestoreIcon, Favorite as FavoriteIcon, LocationOn as LocationOnIcon } from "@mui/icons-material";
import Link from "next/link";

export default function Navbar() {
  const [value, setValue] = React.useState(1);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        role="navigation"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Recents"
          icon={<RestoreIcon />}
          component={Link}
          href="/pantry"
        />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Archive" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Paper>
  );
}