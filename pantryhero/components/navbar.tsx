import type React from "react"
import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import Link from "next/link"

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pantry Hero
        </Typography>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/items" passHref>
          <Button color="inherit">Items</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

