import type React from "react"
import { render, screen } from "@testing-library/react"
import Navbar from "./Navbar"
import { jest } from "@jest/globals" // Added import for jest

jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => children
})

describe("Navbar", () => {
  it("renders the Pantry Hero title", () => {
    render(<Navbar />)
    expect(screen.getByText("Pantry Hero")).toBeInTheDocument()
  })

  it("renders Home and Items links", () => {
    render(<Navbar />)
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Items")).toBeInTheDocument()
  })
})

