"use client";
import {useState} from 'react';
import Link from 'next/link';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Navbar = ()  =>{
    const [value, setValue] = useState(0);
    return(
    <BottomNavigation className="sticky bottom-0" showLabels value={value}
        onChange={(event, newValue) => setValue(newValue)}>
        <BottomNavigationAction component={Link} href="/scan" label="Scan" icon={<RestoreIcon />} />
        <BottomNavigationAction component={Link} href="/" label="Home" icon={<FavoriteIcon />} />
        <BottomNavigationAction component={Link} href="/pantry" label="Pantry" icon={<LocationOnIcon />} />
        <BottomNavigationAction component={Link} href="/cookbook" label="Cookbook" icon={<MenuBookIcon />} />
      </BottomNavigation>
    );
}
export default Navbar;
