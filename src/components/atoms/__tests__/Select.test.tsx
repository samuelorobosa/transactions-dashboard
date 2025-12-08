import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomSelect, type SelectOption } from "../Select";

const mockOptions: SelectOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("CustomSelect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with placeholder when no value selected", () => {
    render(<CustomSelect options={mockOptions} />);

    expect(screen.getByText("Select options")).toBeInTheDocument();
  });

  it("should display selected values", () => {
    render(
      <CustomSelect options={mockOptions} value={["option1", "option2"]} />
    );

    expect(screen.getByText("Option 1, Option 2")).toBeInTheDocument();
  });
});
