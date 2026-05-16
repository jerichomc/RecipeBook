import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App dashboard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows dashboard headings", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Recipes Saved")).toBeInTheDocument();
    expect(screen.getByText("Items In Grocery Bag")).toBeInTheDocument();
    expect(screen.getByText("Purchased Items")).toBeInTheDocument();
  });
});