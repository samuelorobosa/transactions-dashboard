import { describe, it, expect } from "vitest";
import {
  transformTransaction,
  transformTransactions,
  prepareChartData,
} from "../transaction.utils";
import type { Transaction } from "../../types/app";

describe("transformTransaction", () => {
  it("should transform deposit transaction to credit type", () => {
    const transaction: Transaction = {
      amount: 50000,
      metadata: {
        name: "John Doe",
        product_name: "Coffee",
      },
      payment_reference: "TXN-001",
      status: "successful",
      type: "deposit",
      date: "2024-01-15",
    };

    const result = transformTransaction(transaction);

    expect(result.displayType).toBe("credit");
    expect(result.title).toBe("Coffee");
    expect(result.author).toBe("John Doe");
    expect(result.amount).toBe(50000);
  });

  it("should transform withdrawal transaction to debit type", () => {
    const transaction: Transaction = {
      amount: 100000,
      metadata: {
        name: "Bob Wilson",
      },
      payment_reference: "TXN-002",
      status: "pending",
      type: "withdrawal",
      date: "2024-01-16",
    };

    const result = transformTransaction(transaction);

    expect(result.displayType).toBe("debit");
    expect(result.title).toBe("Cash withdrawal");
    expect(result.author).toBe("Bob Wilson");
  });

  it("should use metadata type when product_name is not available for deposits", () => {
    const transaction: Transaction = {
      amount: 50000,
      metadata: {
        name: "John Doe",
        type: "coffee_purchase",
      },
      payment_reference: "TXN-003",
      status: "successful",
      type: "deposit",
      date: "2024-01-15",
    };

    const result = transformTransaction(transaction);

    expect(result.displayType).toBe("credit");
    expect(result.title).toBe("Coffee purchase");
  });

  it("should handle transaction without metadata", () => {
    const transaction: Transaction = {
      amount: 50000,
      payment_reference: "TXN-004",
      status: "successful",
      type: "deposit",
      date: "2024-01-15",
    };

    const result = transformTransaction(transaction);

    expect(result.displayType).toBe("credit");
    expect(result.title).toBe("");
    expect(result.author).toBe("");
  });

  it("should capitalize and format metadata type correctly", () => {
    const transaction: Transaction = {
      amount: 50000,
      metadata: {
        type: "subscription_payment",
      },
      payment_reference: "TXN-005",
      status: "successful",
      type: "deposit",
      date: "2024-01-15",
    };

    const result = transformTransaction(transaction);

    expect(result.title).toBe("Subscription payment");
  });
});

describe("transformTransactions", () => {
  it("should transform array of transactions", () => {
    const transactions: Transaction[] = [
      {
        amount: 50000,
        metadata: { name: "John", product_name: "Coffee" },
        payment_reference: "TXN-001",
        status: "successful",
        type: "deposit",
        date: "2024-01-15",
      },
      {
        amount: 100000,
        metadata: { name: "Bob" },
        payment_reference: "TXN-002",
        status: "pending",
        type: "withdrawal",
        date: "2024-01-16",
      },
    ];

    const result = transformTransactions(transactions);

    expect(result).toHaveLength(2);
    expect(result[0].displayType).toBe("credit");
    expect(result[1].displayType).toBe("debit");
  });

  it("should handle empty array", () => {
    const result = transformTransactions([]);
    expect(result).toHaveLength(0);
  });
});

describe("prepareChartData", () => {
  it("should aggregate transactions by date correctly", () => {
    const transactions: Transaction[] = [
      {
        amount: 50000,
        type: "deposit",
        date: "2024-01-15",
        status: "successful",
        payment_reference: "TXN-001",
      },
      {
        amount: 30000,
        type: "deposit",
        date: "2024-01-15",
        status: "successful",
        payment_reference: "TXN-002",
      },
      {
        amount: 20000,
        type: "withdrawal",
        date: "2024-01-16",
        status: "successful",
        payment_reference: "TXN-003",
      },
    ];

    const result = prepareChartData(transactions);

    expect(result).toHaveLength(2);
    expect(result[0].amount).toBe(80000);
    expect(result[0].date).toBe("2024-01-15");
    expect(result[1].amount).toBe(-20000);
    expect(result[1].date).toBe("2024-01-16");
  });

  it("should format dates correctly", () => {
    const transactions: Transaction[] = [
      {
        amount: 50000,
        type: "deposit",
        date: "2024-01-15",
        status: "successful",
        payment_reference: "TXN-001",
      },
    ];

    const result = prepareChartData(transactions);

    expect(result[0].formattedDate).toBe("Jan 15, 2024");
  });

  it("should sort dates chronologically", () => {
    const transactions: Transaction[] = [
      {
        amount: 50000,
        type: "deposit",
        date: "2024-01-20",
        status: "successful",
        payment_reference: "TXN-001",
      },
      {
        amount: 30000,
        type: "deposit",
        date: "2024-01-15",
        status: "successful",
        payment_reference: "TXN-002",
      },
      {
        amount: 20000,
        type: "deposit",
        date: "2024-01-18",
        status: "successful",
        payment_reference: "TXN-003",
      },
    ];

    const result = prepareChartData(transactions);

    expect(result[0].date).toBe("2024-01-15");
    expect(result[1].date).toBe("2024-01-18");
    expect(result[2].date).toBe("2024-01-20");
  });

  it("should handle empty array", () => {
    const result = prepareChartData([]);
    expect(result).toHaveLength(0);
  });

  it("should handle withdrawals as negative amounts", () => {
    const transactions: Transaction[] = [
      {
        amount: 100000,
        type: "withdrawal",
        date: "2024-01-15",
        status: "successful",
        payment_reference: "TXN-001",
      },
    ];

    const result = prepareChartData(transactions);

    expect(result[0].amount).toBe(-100000);
  });
});
