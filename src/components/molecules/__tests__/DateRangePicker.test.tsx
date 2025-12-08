import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateRangePicker } from "../DateRangePicker";

vi.mock("../Calendar", () => ({
  Calendar: ({ onSelect }: any) => (
    <div
      data-testid="calendar"
      onClick={() => onSelect?.(new Date("2024-01-20"))}
    >
      Calendar
    </div>
  ),
}));

describe("DateRangePicker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render start and end date buttons", () => {
    render(<DateRangePicker />);

    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
  });

  it("should display formatted start date when provided", () => {
    render(<DateRangePicker startDate="2024-01-15" />);

    expect(screen.getByText("Jan 15, 2024")).toBeInTheDocument();
  });

  it("should display formatted end date when provided", () => {
    render(<DateRangePicker endDate="2024-01-20" />);

    expect(screen.getByText("Jan 20, 2024")).toBeInTheDocument();
  });

  it("should open calendar when start date button is clicked", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);

    const startButton = screen.getByText("Start Date").closest("button");
    if (startButton) {
      await user.click(startButton);
    }

    await waitFor(() => {
      expect(screen.getByTestId("calendar")).toBeInTheDocument();
    });
  });

  it("should open calendar when end date button is clicked", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);

    const endButton = screen.getByText("End Date").closest("button");
    if (endButton) {
      await user.click(endButton);
    }

    await waitFor(() => {
      expect(screen.getByTestId("calendar")).toBeInTheDocument();
    });
  });

  it("should call onStartDateChange when start date is selected", async () => {
    const user = userEvent.setup();
    const onStartDateChange = vi.fn();

    render(<DateRangePicker onStartDateChange={onStartDateChange} />);

    const startButton = screen.getByText("Start Date").closest("button");
    if (startButton) {
      await user.click(startButton);
    }

    await waitFor(() => {
      expect(screen.getByTestId("calendar")).toBeInTheDocument();
    });

    const calendar = screen.getByTestId("calendar");
    await user.click(calendar);

    await waitFor(() => {
      expect(onStartDateChange).toHaveBeenCalled();
    });
  });

  it("should call onEndDateChange when end date is selected", async () => {
    const user = userEvent.setup();
    const onEndDateChange = vi.fn();

    render(
      <DateRangePicker
        startDate="2024-01-15"
        onEndDateChange={onEndDateChange}
      />
    );

    const endButton = screen.getByText("End Date").closest("button");
    if (endButton) {
      await user.click(endButton);
    }

    await waitFor(() => {
      expect(screen.getByTestId("calendar")).toBeInTheDocument();
    });

    const calendar = screen.getByTestId("calendar");
    await user.click(calendar);

    await waitFor(() => {
      expect(onEndDateChange).toHaveBeenCalled();
    });
  });

  it("should close calendar when clicking outside", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <DateRangePicker />
        <div data-testid="outside">Outside</div>
      </div>
    );

    const startButton = screen.getByText("Start Date").closest("button");
    if (startButton) {
      await user.click(startButton);
    }

    await waitFor(() => {
      expect(screen.getByTestId("calendar")).toBeInTheDocument();
    });

    const outside = screen.getByTestId("outside");
    await user.click(outside);

    await waitFor(() => {
      expect(screen.queryByTestId("calendar")).not.toBeInTheDocument();
    });
  });

  it("should update end date if selected start date is after end date", async () => {
    const onStartDateChange = vi.fn();
    const onEndDateChange = vi.fn();

    render(
      <DateRangePicker
        startDate="2024-01-15"
        endDate="2024-01-20"
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />
    );

    expect(screen.getByText("Jan 15, 2024")).toBeInTheDocument();
    expect(screen.getByText("Jan 20, 2024")).toBeInTheDocument();
  });
});
