import type { User, Wallet, TransactionsResponse } from "../types/app";

export const mockUser: User = {
  first_name: "Olivier",
  last_name: "Jones",
  email: "olivierjones@gmail.com",
};

export const mockWallet: Wallet = {
  balance: 1205600.0,
  total_payout: 400000.0,
  total_revenue: 500000.0,
  pending_payout: 0.0,
  ledger_balance: 1205600.0,
};

export const mockTransactions: TransactionsResponse = [
  {
    amount: 50000,
    metadata: {
      name: "John Doe",
      type: "coffee",
      email: "john@example.com",
      quantity: 1,
      country: "US",
      product_name: "Coffee",
    },
    payment_reference: "TXN-001",
    status: "successful",
    type: "deposit",
    date: "2024-01-15",
  },
  {
    amount: 75000,
    metadata: {
      name: "Jane Smith",
      type: "subscription",
      email: "jane@example.com",
      quantity: 1,
      country: "UK",
      product_name: "Premium Subscription",
    },
    payment_reference: "TXN-002",
    status: "successful",
    type: "deposit",
    date: "2024-01-16",
  },
  {
    amount: 100000,
    metadata: {
      name: "Bob Wilson",
      type: "withdrawal",
    },
    payment_reference: "TXN-003",
    status: "pending",
    type: "withdrawal",
    date: "2024-01-17",
  },
  {
    amount: 25000,
    metadata: {
      name: "Alice Brown",
      type: "refund",
      email: "alice@example.com",
      product_name: "Product Refund",
    },
    payment_reference: "TXN-004",
    status: "successful",
    type: "deposit",
    date: "2024-01-18",
  },
];
