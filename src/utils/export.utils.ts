import type { DisplayTransaction } from "../types/app";
import { formatDate, formatCurrency } from "./index";

const escapeCsvField = (value: string | number | undefined): string => {
  if (value === undefined || value === null) return "";
  const stringValue = String(value);

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

export const convertTransactionsToCsv = (
  transactions: DisplayTransaction[]
): string => {
  const headers = [
    "Date",
    "Type",
    "Description",
    "Name/Status",
    "Amount",
    "Payment Reference",
    "Status",
  ];

  const rows = transactions.map((transaction) => {
    const type = transaction.displayType === "credit" ? "Credit" : "Debit";
    const nameOrStatus =
      transaction.displayType === "debit" && transaction.status
        ? transaction.status.charAt(0).toUpperCase() +
          transaction.status.slice(1)
        : transaction.author || "";
    const amount = formatCurrency(transaction.amount);
    const date = formatDate(transaction.date);

    return [
      escapeCsvField(date),
      escapeCsvField(type),
      escapeCsvField(transaction.title),
      escapeCsvField(nameOrStatus),
      escapeCsvField(amount),
      escapeCsvField(transaction.payment_reference || ""),
      escapeCsvField(
        transaction.status
          ? transaction.status.charAt(0).toUpperCase() +
              transaction.status.slice(1)
          : ""
      ),
    ];
  });

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
};

export const downloadCsv = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const exportTransactionsToCsv = (
  transactions: DisplayTransaction[]
): void => {
  const csvContent = convertTransactionsToCsv(transactions);
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `transactions-${timestamp}.csv`;
  downloadCsv(csvContent, filename);
};
