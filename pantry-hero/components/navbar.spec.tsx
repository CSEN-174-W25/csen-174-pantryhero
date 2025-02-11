import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./navbar";

describe("Navbar", () => {
  it("renders the navbar correctly", () => {
    render(<Navbar />);

    // Check if the navbar is rendered
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    // Check if the navigation links are rendered
    expect(screen.getByRole("link", { name: "Recents" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Favorites" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Archive" })).toBeInTheDocument();
  });

  it("updates the active navigation link", () => {
    render(<Navbar />);

    // Check the initial active link
    const recentsLink = screen.getByRole("link", { name: "Recents" });
    expect(recentsLink).toBeInTheDocument();

    // Click on the "Favorites" link
    const favoritesButton = screen.getByRole("button", { name: "Favorites" });
    fireEvent.click(favoritesButton);

    // Check if the "Favorites" link is now active
    expect(favoritesButton).toHaveClass("Mui-selected");
    expect(recentsLink).not.toHaveClass("Mui-selected");
  });
});