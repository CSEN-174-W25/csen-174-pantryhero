import type { Meta, StoryObj } from "@storybook/react"
import ItemGallery from "./ItemGallery"

const meta: Meta<typeof ItemGallery> = {
  title: "Components/ItemGallery",
  component: ItemGallery,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ItemGallery>

const mockItems = [
  { id: 1, name: "Apple", quantity: 5, pantryId: 1 },
  { id: 2, name: "Banana", quantity: 3, pantryId: 1 },
  { id: 3, name: "Orange", quantity: 7, pantryId: 1 },
]

export const Default: Story = {
  args: {
    items: mockItems,
  },
}

export const Empty: Story = {
  args: {
    items: [],
  },
}

