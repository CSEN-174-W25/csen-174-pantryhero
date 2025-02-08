import { cva, type VariantProps } from "class-variance-authority"
import { Typography, Box } from "@mui/material"
import type React from "react" // Added import for React

const pantryItemStyles = cva("pantry-item", {
  variants: {
    quantity: {
      low: "bg-red-100",
      medium: "bg-yellow-100",
      high: "bg-green-100",
    },
  },
  defaultVariants: {
    quantity: "medium",
  },
})

interface PantryItemProps extends VariantProps<typeof pantryItemStyles> {
  name: string
  quantity: number
}

export const PantryItem: React.FC<PantryItemProps> = ({ name, quantity, ...props }) => {
  const quantityLevel = quantity <= 2 ? "low" : quantity <= 5 ? "medium" : "high"

  return (
    <Box className={pantryItemStyles({ quantity: quantityLevel, ...props })} p={2} borderRadius={2}>
      <Typography variant="h6">{name}</Typography>
      <Typography>Quantity: {quantity}</Typography>
    </Box>
  )
}

