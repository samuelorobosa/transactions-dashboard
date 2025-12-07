import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../../test/utils";
import ChartSection from "../ChartSection";
import { useWallet, useTransactions } from "../../../queries/revenue.queries";
import { mockWallet, mockTransactions } from "../../../test/mockData";

vi.mock("../../../queries/revenue.queries", () => ({
  useWallet: vi.fn(),
  useTransactions: vi.fn(),
}));

vi.mock("recharts", () => ({
  LineChart: ({ children }: any) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  Tooltip: () => null,
}));

describe("ChartSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useWallet).mockReturnValue({
      data: mockWallet,
      isLoading: false,
      isError: false,
      error: null,
    } as any);
    vi.mocked(useTransactions).mockReturnValue({
      data: mockTransactions,
      isLoading: false,
      isError: false,
      error: null,
    } as any);
  });

  it("should render loading skeleton when wallet data is loading", () => {
    vi.mocked(useWallet).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    const { container } = renderWithProviders(<ChartSection />);

    const skeletons = container.querySelectorAll(".bg-gray-50");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should render available balance", () => {
    renderWithProviders(<ChartSection />);

    expect(screen.getByText("Available Balance")).toBeInTheDocument();
    const header = screen.getByText("Available Balance").closest("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/USD.*1,205,600/i);
  });

  it("should render withdraw button", () => {
    renderWithProviders(<ChartSection />);

    const withdrawButton = screen.getByText("Withdraw");
    expect(withdrawButton).toBeInTheDocument();
    expect(withdrawButton).toHaveClass("cursor-pointer");
  });

  it("should render balance items", () => {
    renderWithProviders(<ChartSection />);

    expect(screen.getByText("Ledger Balance")).toBeInTheDocument();
    expect(screen.getByText("Total Payout")).toBeInTheDocument();
    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("Pending Payout")).toBeInTheDocument();
  });

  it("should render chart when transactions are available", () => {
    renderWithProviders(<ChartSection />);

    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("should format currency values correctly", () => {
    renderWithProviders(<ChartSection />);

    const balance1205600 = screen.getAllByText(/USD.*1,205,600/i);
    expect(balance1205600.length).toBeGreaterThan(0);

    expect(screen.getByText(/USD.*400,000/i)).toBeInTheDocument();
    expect(screen.getByText(/USD.*500,000/i)).toBeInTheDocument();

    const zeroValues = screen.getAllByText(/USD.*0/i);
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  it("should not render chart when no transactions", () => {
    vi.mocked(useTransactions).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    renderWithProviders(<ChartSection />);

    expect(screen.queryByTestId("line-chart")).not.toBeInTheDocument();
  });

  it("should handle error state gracefully", () => {
    vi.mocked(useWallet).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Failed to fetch"),
    } as any);

    const { container } = renderWithProviders(<ChartSection />);

    const skeletons = container.querySelectorAll(".bg-gray-50");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
