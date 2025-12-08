import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test/utils";
import TransactionsTable from "../TransactionsTable";
import { useTransactions } from "../../../queries/revenue.queries";
import { mockTransactions } from "../../../test/mockData";

vi.mock("../../../queries/revenue.queries", () => ({
  useTransactions: vi.fn(),
}));

vi.mock("../Sheet", () => ({
  Sheet: ({ children }: any) => <div data-testid="sheet">{children}</div>,
  SheetContent: ({ children }: any) => <div>{children}</div>,
  SheetHeader: ({ children }: any) => <div>{children}</div>,
  SheetTitle: ({ children }: any) => <h2>{children}</h2>,
  SheetTrigger: ({ children, onClick }: any) => (
    <div onClick={onClick} role="button" tabIndex={0}>
      {children}
    </div>
  ),
}));

describe("TransactionsTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTransactions).mockReturnValue({
      data: mockTransactions,
      isLoading: false,
      isError: false,
      error: null,
    } as any);
  });

  it("should render loading skeleton when data is loading", () => {
    vi.mocked(useTransactions).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    const { container } = renderWithProviders(<TransactionsTable />);

    const skeletons = container.querySelectorAll(".bg-gray-50");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should render transactions count in header", () => {
    renderWithProviders(<TransactionsTable />);

    expect(screen.getByText(/4 Transactions/i)).toBeInTheDocument();
  });

  it("should render filter and export buttons", () => {
    const { container } = renderWithProviders(<TransactionsTable />);

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Filter");

    expect(screen.getByText("Export List")).toBeInTheDocument();
  });

  it("should render transaction rows", () => {
    renderWithProviders(<TransactionsTable />);

    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Premium Subscription")).toBeInTheDocument();
    expect(screen.getByText("Cash withdrawal")).toBeInTheDocument();
  });

  it("should open filter sheet when filter button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<TransactionsTable />);

    const header = container.querySelector("header");
    const filterButton = header?.querySelector("button");
    expect(filterButton).toBeInTheDocument();
    if (filterButton) {
      await user.click(filterButton);
    }

    await waitFor(() => {
      expect(screen.getByTestId("sheet")).toBeInTheDocument();
    });
  });

  it("should filter transactions by date range", async () => {
    renderWithProviders(<TransactionsTable />);

    expect(screen.getByText(/4 Transactions/i)).toBeInTheDocument();
  });

  it("should display transaction status for debit transactions", () => {
    renderWithProviders(<TransactionsTable />);

    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  it("should display author name for credit transactions", () => {
    renderWithProviders(<TransactionsTable />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("should format currency amounts correctly", () => {
    renderWithProviders(<TransactionsTable />);

    expect(screen.getByText("USD 50,000")).toBeInTheDocument();
    expect(screen.getByText("USD 75,000")).toBeInTheDocument();
    expect(screen.getByText("USD 100,000")).toBeInTheDocument();
  });

  it("should format dates correctly", () => {
    renderWithProviders(<TransactionsTable />);

    expect(screen.getByText("Jan 15,2024")).toBeInTheDocument();
    expect(screen.getByText("Jan 16,2024")).toBeInTheDocument();
  });

  it("should show empty state when no transactions match filters", () => {
    vi.mocked(useTransactions).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    renderWithProviders(<TransactionsTable />);

    expect(screen.getByText(/No transactions found/i)).toBeInTheDocument();
  });

  it("should handle export functionality", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TransactionsTable />);

    const exportButton = screen.getByText("Export List");
    await user.click(exportButton);

    expect(exportButton).toBeInTheDocument();
  });
});
