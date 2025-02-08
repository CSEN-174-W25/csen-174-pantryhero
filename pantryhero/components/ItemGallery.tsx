import type React from "react"
import { Grid, Card, CardContent, Typography } from "@mui/material"
import type { Item } from "@prisma/client"

interface ItemGalleryProps {
  items: Item[]
}

const ItemGallery: React.FC<ItemGalleryProps> = ({ items }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ItemGallery

