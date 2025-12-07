export interface User {
  first_name: string;
  last_name: string;
  email: string;
  [key: string]: unknown;
}

export interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
  [key: string]: unknown;
}

export interface Transaction {
  amount: number;
  metadata?: {
    name?: string;
    type?: string;
    email?: string;
    quantity?: number;
    country?: string;
    product_name?: string;
  };
  payment_reference?: string;
  status: "successful" | "pending";
  type: "deposit" | "withdrawal";
  date: string;
  [key: string]: unknown;
}

export type TransactionsResponse = Transaction[];

export type DisplayType = "credit" | "debit";

export interface DisplayTransaction extends Transaction {
  displayType: DisplayType;
  title: string;
  author: string;
}

export interface TransactionTypeConfig {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bgColor: string;
}
