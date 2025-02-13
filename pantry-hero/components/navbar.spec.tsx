import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./navbar";

describe("Navbar", () => {
  it("renders the navbar correctly", () => {
    render(<Navbar />);

    // Check if the navbar is rendered
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    // Check if the navigation links are rendered
    expect(screen.getByRole("link", { name: "Scan" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pantry" })).toBeInTheDocument();
  });

  it("updates the active navigation link", () => {
    render(<Navbar />);

    // Check the initial active link
    const ScanLink = screen.getByRole("link", { name: "Scan" });
    expect(ScanLink).toBeInTheDocument();

    // Click on the "Home" link
    const HomeButton = screen.getByRole("link", { name: "Home" });
    fireEvent.click(HomeButton);

    // Check if the "Home" link is now active
    expect(HomeButton).toHaveClass("Mui-selected");
    expect(ScanLink).not.toHaveClass("Mui-selected");
  });
});