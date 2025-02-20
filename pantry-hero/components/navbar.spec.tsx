import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./navbar";

describe("Navbar", () => {
  it("renders the navbar correctly", () => {
    render(<Navbar />);

    // Check if the navbar is rendered
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    // Check if the navigation links are rendered
    expect(screen.getByRole("link", { name: "Pantry" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cookbook" })).toBeInTheDocument();
  });

  it("updates the active navigation link", () => {
    render(<Navbar />);

    // Check the initial active link
    const CookbookLink = screen.getByRole("link", { name: "Cookbook" });
    expect(CookbookLink).toBeInTheDocument();

    // Click on the "Home" link
    const HomeButton = screen.getByRole("link", { name: "Home" });
    fireEvent.click(HomeButton);

    const PantryLink = screen.getByRole("link", { name: "Pantry"});
    expect(PantryLink).toBeInTheDocument();


    // Check if the "Home" link is now active
    expect(PantryLink).not.toHaveClass("Mui-selected");
    expect(HomeButton).toHaveClass("Mui-selected");
    expect(CookbookLink).not.toHaveClass("Mui-selected");
  });
});