import { useMemo } from "react";
import { DateRangePicker } from "../molecules/DateRangePicker";
import { CustomSelect, type SelectOption } from "../atoms/Select";
import type { Transaction } from "../../types/app";

export function TransactionDateFilters({
  selectedPeriod,
  onPeriodChange,
}: {
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
}) {
  const periods = ["Today", "Last 7 days", "This month", "Last 3 months"];

  return (
    <div className="flex justify-between gap-3">
      {periods.map((period) => {
        const isSelected = selectedPeriod === period;
        return (
          <button
            key={period}
            onClick={() => onPeriodChange?.(period)}
            className={`font-semibold text-sm leading-4 tracking-[-0.4px] align-middle h-9 rounded-full border px-4 transition-colors cursor-pointer ${
              isSelected
                ? "bg-black-300 text-white border-black-300 hover:bg-black-300"
                : "text-black-300 border-gray-50 hover:bg-gray-50"
            }`}
          >
            {period}
          </button>
        );
      })}
    </div>
  );
}

export function TransactionFilterForm({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  transactions,
  transactionTypes,
  transactionStatuses,
  onTransactionTypeChange,
  onTransactionStatusChange,
}: {
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  transactions?: Transaction[];
  transactionTypes?: string[];
  transactionStatuses?: string[];
  onTransactionTypeChange?: (types: string[]) => void;
  onTransactionStatusChange?: (statuses: string[]) => void;
}) {
  return (
    <>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />
      <div className="mt-6">
        <label className="font-semibold text-base leading-6 tracking-[-0.4px] align-middle text-black-300 block mb-3">
          Transaction Type
        </label>
        <div className="mt-3">
          <TransactionTypeSelect
            transactions={transactions}
            value={transactionTypes}
            onChange={onTransactionTypeChange}
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="font-semibold text-base leading-6 tracking-[-0.4px] align-middle text-black-300 block mb-3">
          Transaction Status
        </label>
        <div className="mt-3">
          <TransactionStatusSelect
            value={transactionStatuses}
            onChange={onTransactionStatusChange}
          />
        </div>
      </div>
    </>
  );
}

function TransactionTypeSelect({
  transactions = [],
  value = [],
  onChange,
}: {
  transactions?: Transaction[];
  value?: string[];
  onChange?: (values: string[]) => void;
}) {
  const options = useMemo(() => {
    const typeSet = new Set<string>();

    transactions.forEach((transaction) => {
      if (transaction.type) {
        typeSet.add(transaction.type);
      }
    });

    const formattedOptions: SelectOption[] = Array.from(typeSet).map(
      (type) => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1),
      })
    );

    return formattedOptions;
  }, [transactions]);

  return <CustomSelect options={options} value={value} onChange={onChange} />;
}

function TransactionStatusSelect({
  value = [],
  onChange,
}: {
  value?: string[];
  onChange?: (values: string[]) => void;
}) {
  const options: SelectOption[] = [
    { value: "successful", label: "Successful" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ];

  return <CustomSelect options={options} value={value} onChange={onChange} />;
}
