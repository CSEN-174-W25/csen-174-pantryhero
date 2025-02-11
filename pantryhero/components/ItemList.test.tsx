import { render, screen } from "@testing-library/react"
import ItemList from "./ItemList"

const mockItems = [
  { id: 1, name: "Apple", quantity: 5, pantryId: 1 },
  { id: 2, name: "Banana", quantity: 3, pantryId: 1 },
]

describe("ItemList", () => {
  it("renders all items", () => {
    render(<ItemList items={mockItems} />)
    expect(screen.getByText("Apple")).toBeInTheDocument()
    expect(screen.getByText("Banana")).toBeInTheDocument()
  })

  it("displays quantity for each item", () => {
    render(<ItemList items={mockItems} />)
    expect(screen.getByText("Quantity: 5")).toBeInTheDocument()
    expect(screen.getByText("Quantity: 3")).toBeInTheDocument()
  })
})

