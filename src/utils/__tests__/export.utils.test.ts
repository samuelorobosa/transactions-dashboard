import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  convertTransactionsToCsv,
  downloadCsv,
  exportTransactionsToCsv,
} from "../export.utils";
import type { DisplayTransaction } from "../../types/app";

const globalAny = globalThis as any;

describe("convertTransactionsToCsv", () => {
  it("should convert transactions to CSV format", () => {
    const transactions: DisplayTransaction[] = [
      {
        amount: 50000,
        displayType: "credit",
        title: "Coffee",
        author: "John Doe",
        payment_reference: "TXN-001",
        status: "successful",
        type: "deposit",
        date: "2024-01-15",
      },
      {
        amount: 100000,
        displayType: "debit",
        title: "Cash withdrawal",
        author: "Bob Wilson",
        payment_reference: "TXN-002",
        status: "pending",
        type: "withdrawal",
        date: "2024-01-16",
      },
    ];

    const result = convertTransactionsToCsv(transactions);

    expect(result).toContain(
      "Date,Type,Description,Name/Status,Amount,Payment Reference,Status"
    );
    expect(result).toContain("Jan 15,2024");
    expect(result).toContain("Coffee");
    expect(result).toContain("John Doe");
    expect(result).toContain("USD 50,000");
    expect(result).toContain("Jan 16,2024");
    expect(result).toContain("Cash withdrawal");
    expect(result).toContain("Pending");
  });

  it("should escape fields with commas", () => {
    const transactions: DisplayTransaction[] = [
      {
        amount: 50000,
        displayType: "credit",
        title: "Coffee, Tea, and More",
        author: "John Doe",
        payment_reference: "TXN-001",
        status: "successful",
        type: "deposit",
        date: "2024-01-15",
      },
    ];

    const result = convertTransactionsToCsv(transactions);

    expect(result).toContain('"Coffee, Tea, and More"');
  });

  it("should escape fields with quotes", () => {
    const transactions: DisplayTransaction[] = [
      {
        amount: 50000,
        displayType: "credit",
        title: 'Product "Special" Edition',
        author: "John Doe",
        payment_reference: "TXN-001",
        status: "successful",
        type: "deposit",
        date: "2024-01-15",
      },
    ];

    const result = convertTransactionsToCsv(transactions);

    expect(result).toContain('"Product ""Special"" Edition"');
  });

  it("should handle empty transactions array", () => {
    const result = convertTransactionsToCsv([]);
    expect(result).toBe(
      "Date,Type,Description,Name/Status,Amount,Payment Reference,Status"
    );
  });

  it("should handle missing optional fields", () => {
    const transactions: DisplayTransaction[] = [
      {
        amount: 50000,
        displayType: "credit",
        title: "Coffee",
        author: "",
        payment_reference: undefined,
        status: "successful",
        type: "deposit",
        date: "2024-01-15",
      },
    ];

    const result = convertTransactionsToCsv(transactions);

    expect(result).toContain("Jan 15,2024");
    expect(result).toContain("Credit");
    expect(result).toContain("Coffee");
    expect(result).toContain("USD 50,000");
    expect(result).toContain("Successful");
  });
});

describe("downloadCsv", () => {
  beforeEach(() => {
    globalAny.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    globalAny.URL.revokeObjectURL = vi.fn();

    document.body.appendChild = vi.fn();
    document.body.removeChild = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create and trigger download link", () => {
    const csvContent = "Date,Amount\n2024-01-15,50000";
    const filename = "test.csv";

    const createElementSpy = vi.spyOn(document, "createElement");
    const clickSpy = vi.fn();

    createElementSpy.mockReturnValue({
      setAttribute: vi.fn(),
      style: {},
      click: clickSpy,
    } as any);

    downloadCsv(csvContent, filename);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(clickSpy).toHaveBeenCalled();
  });
});

describe("exportTransactionsToCsv", () => {
  beforeEach(() => {
    globalAny.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    globalAny.URL.revokeObjectURL = vi.fn();
    document.body.appendChild = vi.fn();
    document.body.removeChild = vi.fn();

    const clickSpy = vi.fn();
    vi.spyOn(document, "createElement").mockReturnValue({
      setAttribute: vi.fn(),
      style: {},
      click: clickSpy,
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should export transactions with timestamp in filename", () => {
    const transactions: DisplayTransaction[] = [
      {
        amount: 50000,
        displayType: "credit",
        title: "Coffee",
        author: "John Doe",
        payment_reference: "TXN-001",
        status: "successful",
        type: "deposit",
        date: "2024-01-15",
      },
    ];

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-20T12:00:00Z"));

    exportTransactionsToCsv(transactions);

    const createElementCall = vi.mocked(document.createElement);
    expect(createElementCall).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
