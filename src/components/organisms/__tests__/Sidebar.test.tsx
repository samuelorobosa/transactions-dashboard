import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from "../Sidebar";

describe("Sidebar", () => {
  it("should render sidebar with navigation items", () => {
    render(<Sidebar />);

    expect(screen.getByRole("complementary")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should render all sidebar items", () => {
    render(<Sidebar />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should have proper accessibility attributes", () => {
    render(<Sidebar />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-label");
    });
  });

  it("should apply correct styling classes", () => {
    const { container } = render(<Sidebar />);

    const aside = container.querySelector("aside");
    expect(aside).toHaveClass("fixed");
  });
});
