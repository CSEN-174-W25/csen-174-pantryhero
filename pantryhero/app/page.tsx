import { Typography, Button } from "@mui/material"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Typography variant="h1">Welcome to Pantry Hero</Typography>
      <Link href="/items" passHref>
        <Button variant="contained">View Pantry Items</Button>
      </Link>
    </main>
  )
}

