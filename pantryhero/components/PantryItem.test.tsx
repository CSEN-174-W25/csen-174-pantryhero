import { render, screen } from "@testing-library/react"
import { PantryItem } from "./PantryItem"

describe("PantryItem", () => {
  it("renders the item name and quantity", () => {
    render(<PantryItem name="Apples" quantity={5} />)

    expect(screen.getByText("Apples")).toBeInTheDocument()
    expect(screen.getByText("Quantity: 5")).toBeInTheDocument()
  })

  it("applies the correct style based on quantity", () => {
    const { container } = render(<PantryItem name="Apples" quantity={2} />)
    expect(container.firstChild).toHaveClass("bg-red-100")

    const { container: container2 } = render(<PantryItem name="Bananas" quantity={5} />)
    expect(container2.firstChild).toHaveClass("bg-yellow-100")

    const { container: container3 } = render(<PantryItem name="Oranges" quantity={10} />)
    expect(container3.firstChild).toHaveClass("bg-green-100")
  })
})

