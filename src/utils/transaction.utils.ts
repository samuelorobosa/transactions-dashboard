import CreditIcon from "../assets/icons/credit.svg?react";
import DebitIcon from "../assets/icons/debit.svg?react";
import type {
  DisplayType,
  DisplayTransaction,
  Transaction,
  TransactionTypeConfig,
} from "../types/app";


export const TRANSACTION_TYPE_CONFIG: Record<
  DisplayType,
  TransactionTypeConfig
> = {
  credit: {
    icon: CreditIcon,
    bgColor: "bg-credit-bg",
  },
  debit: {
    icon: DebitIcon,
    bgColor: "bg-debit-bg",
  },
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const transformTransaction = (
  transaction: Transaction
): DisplayTransaction => {
  const isDeposit = transaction.type === "deposit";
  const displayType: DisplayType = isDeposit ? "credit" : "debit";

  let title: string;
  if (isDeposit) {
    title =
      transaction.metadata?.product_name ||
      (transaction.metadata?.type
        ? capitalize(transaction.metadata.type.replace(/_/g, " "))
        : "");
  } else {
    title = "Cash withdrawal";
  }

  const author = transaction.metadata?.name || "";

  return {
    ...transaction,
    displayType,
    title,
    author,
  };
};

export const transformTransactions = (
  transactions: Transaction[]
): DisplayTransaction[] => {
  return transactions.map(transformTransaction);
};

export interface ChartDataPoint {
  date: string;
  amount: number;
  formattedDate: string;
}

export const prepareChartData = (
  transactions: Transaction[]
): ChartDataPoint[] => {
  const dateMap = new Map<string, number>();

  transactions.forEach((transaction) => {
    const date = transaction.date;
    const currentAmount = dateMap.get(date) || 0;
    const amount =
      transaction.type === "deposit" ? transaction.amount : -transaction.amount;
    dateMap.set(date, currentAmount + amount);
  });

  const chartData: ChartDataPoint[] = Array.from(dateMap.entries())
    .map(([date, amount]) => {
      const dateObj = new Date(date);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = months[dateObj.getMonth()];
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();
      const formattedDate = `${month} ${day}, ${year}`;

      return {
        date,
        amount,
        formattedDate,
      };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return chartData;
};
