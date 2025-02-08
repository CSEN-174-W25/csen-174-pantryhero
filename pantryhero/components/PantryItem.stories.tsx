import type { Meta, StoryObj } from "@storybook/react"
import { PantryItem } from "./PantryItem"

const meta: Meta<typeof PantryItem> = {
  title: "Components/PantryItem",
  component: PantryItem,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof PantryItem>

export const LowQuantity: Story = {
  args: {
    name: "Apples",
    quantity: 2,
  },
}

export const MediumQuantity: Story = {
  args: {
    name: "Bananas",
    quantity: 5,
  },
}

export const HighQuantity: Story = {
  args: {
    name: "Oranges",
    quantity: 10,
  },
}

