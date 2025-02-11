import { render, screen } from "@testing-library/react"
import ItemGallery from "./ItemGallery"

const mockItems = [
  { id: 1, name: "Apple", quantity: 5, pantryId: 1 },
  { id: 2, name: "Banana", quantity: 3, pantryId: 1 },
]

describe("ItemGallery", () => {
  it("renders all items", () => {
    render(<ItemGallery items={mockItems} />)
    expect(screen.getByText("Apple")).toBeInTheDocument()
    expect(screen.getByText("Banana")).toBeInTheDocument()
  })

  it("displays quantity for each item", () => {
    render(<ItemGallery items={mockItems} />)
    expect(screen.getByText("Quantity: 5")).toBeInTheDocument()
    expect(screen.getByText("Quantity: 3")).toBeInTheDocument()
  })
})

