import { useMemo } from "react";
import { CustomSelect, type SelectOption } from "../atoms/Select";
import type { Transaction } from "../../types/app";

interface TransactionTypeSelectProps {
  transactions?: Transaction[];
  value?: string[];
  onChange?: (values: string[]) => void;
}

export function TransactionTypeSelect({
  transactions = [],
  value = [],
  onChange,
}: TransactionTypeSelectProps) {
  const options = useMemo(() => {
    const typeSet = new Set<string>();

    transactions.forEach((transaction) => {
      if (transaction.type) {
        typeSet.add(transaction.type);
      }
    });

    const typeArray = Array.from(typeSet).sort();

    const formattedOptions: SelectOption[] = typeArray.map((type) => ({
      value: type,
      label: type
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));

    return [{ value: "all", label: "All" }, ...formattedOptions];
  }, [transactions]);

  return <CustomSelect options={options} value={value} onChange={onChange} />;
}
