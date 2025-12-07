import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("should open dropdown on click", async () => {
    const user = userEvent.setup();
    render(<CustomSelect options={mockOptions} />);

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });
  });

  it("should select option on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<CustomSelect options={mockOptions} onChange={onChange} />);

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    const option1 = screen.getByText("Option 1");
    await user.click(option1);

    expect(onChange).toHaveBeenCalledWith(["option1"]);
  });

  it("should deselect option when clicked again", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <CustomSelect
        options={mockOptions}
        value={["option1"]}
        onChange={onChange}
      />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    const option1 = screen.getByText("Option 1");
    await user.click(option1);

    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("should show checkmark for selected options", async () => {
    const user = userEvent.setup();

    render(<CustomSelect options={mockOptions} value={["option1"]} />);

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      const option1 = screen.getByText("Option 1").closest("li");
      expect(option1).toHaveAttribute("aria-selected", "true");
    });
  });

  it("should close dropdown when clicking outside", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <CustomSelect options={mockOptions} />
        <div data-testid="outside">Outside</div>
      </div>
    );

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    const outside = screen.getByTestId("outside");
    await user.click(outside);

    await waitFor(() => {
      expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    });
  });

  it("should handle multiple selections", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<CustomSelect options={mockOptions} onChange={onChange} />);

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Option 1"));
    await user.click(screen.getByText("Option 2"));

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(["option1", "option2"]);
  });
});
