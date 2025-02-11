import React from "react"
import { List, ListItem, ListItemText, Divider } from "@mui/material"
import type { Item } from "@prisma/client"

interface ItemListProps {
  items: Item[]
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <ListItem>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
          </ListItem>
          {index < items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  )
}

export default ItemList

