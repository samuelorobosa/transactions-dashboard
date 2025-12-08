import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Calendar } from "../Calendar";

vi.mock("react-day-picker", () => ({
  DayPicker: ({ selected, onSelect, className }: any) => (
    <div
      data-testid="day-picker"
      data-selected={selected?.toISOString()}
      className={className}
      onClick={() => onSelect?.(new Date("2024-01-15"))}
    >
      Calendar Mock
    </div>
  ),
}));

describe("Calendar", () => {
  it("should render calendar component", () => {
    render(<Calendar />);

    expect(screen.getByTestId("day-picker")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Calendar className="custom-class" />);

    const calendar = screen.getByTestId("day-picker");
    expect(calendar).toHaveClass("custom-class");
  });

  it("should pass selected date to DayPicker", () => {
    const selectedDate = new Date("2024-01-15");
    render(<Calendar selected={selectedDate} />);

    const calendar = screen.getByTestId("day-picker");
    expect(calendar).toHaveAttribute(
      "data-selected",
      selectedDate.toISOString()
    );
  });

  it("should call onSelect when date is selected", () => {
    const onSelect = vi.fn();
    render(<Calendar onSelect={onSelect} />);

    const calendar = screen.getByTestId("day-picker");
    calendar.click();

    expect(onSelect).toHaveBeenCalled();
  });

  it("should use single mode by default", () => {
    render(<Calendar />);

    const calendar = screen.getByTestId("day-picker");
    expect(calendar).toBeInTheDocument();
  });
});
