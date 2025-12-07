import { useState } from "react";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";
import DownloadIcon from "../../assets/icons/download.svg?react";
import { useTransactions } from "../../queries/revenue.queries";
import {
  formatDate,
  formatCurrency,
  transformTransactions,
  TRANSACTION_TYPE_CONFIG,
  exportTransactionsToCsv,
} from "../../utils";
import Skeleton from "../atoms/Skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetDateFilters,
  FilterForm,
} from "./Sheet";

export default function TransactionsTable() {
  const { data: transactions, isLoading } = useTransactions();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (transactions) {
    console.log("=== TRANSACTIONS DATA ===");
    console.log(transactions);
  }

  if (isLoading || !transactions) {
    return (
      <div>
        <header className="flex justify-between items-center border-b border-gray-50 pb-6">
          <aside className="flex flex-col gap-2">
            <Skeleton width={200} height={32} />
            <Skeleton width={250} height={20} />
          </aside>
          <aside className="flex gap-3">
            <Skeleton
              width={107}
              height={44}
              variant="rectangular"
              className="rounded-full"
            />
            <Skeleton
              width={139}
              height={44}
              variant="rectangular"
              className="rounded-full"
            />
          </aside>
        </header>

        <div className="mt-6 space-y-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="flex items-center justify-between pb-6">
              <div className="flex items-center gap-x-[14.5px]">
                <Skeleton width={48} height={48} variant="circular" />
                <div className="flex flex-col gap-y-[9px]">
                  <Skeleton width={180} height={24} />
                  <Skeleton width={120} height={16} />
                </div>
              </div>
              <div className="flex flex-col items-end gap-y-1">
                <Skeleton width={100} height={24} />
                <Skeleton width={80} height={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const displayTransactions = transformTransactions(transactions);

  const handleExport = () => {
    exportTransactionsToCsv(displayTransactions);
  };

  return (
    <div>
      <header className="flex justify-between items-center border-b border-gray-50 pb-6">
        <aside className="flex flex-col">
          <h1 className="text font-bold text-2xl">
            {transactions.length} Transactions
          </h1>
          <div className="text-gray-400 text-sm">
            Your transactions for the last 7 days
          </div>
        </aside>

        <aside className="flex gap-3">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger onClick={() => setIsFilterOpen(true)} asChild>
              <button className="w-[107px] py-3 rounded-full bg-gray-50 text-base font-semibold flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                Filter
                <figure className="w-5 h-5 px-[5px] py-[7px] ml-1 flex items-center justify-center">
                  <ChevronDownIcon className="w-full h-full" />
                </figure>
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              open={isFilterOpen}
              onOpenChange={setIsFilterOpen}
            >
              <SheetHeader onClose={() => setIsFilterOpen(false)}>
                <SheetTitle>Filter</SheetTitle>
              </SheetHeader>
              <SheetDateFilters
                onPeriodChange={(period) => {
                  console.log("Selected period:", period);
                }}
              />
              <FilterForm
                transactions={transactions}
                onStartDateChange={(date) => {
                  console.log("Start date:", date);
                }}
                onEndDateChange={(date) => {
                  console.log("End date:", date);
                }}
              />
            </SheetContent>
          </Sheet>
          <button
            onClick={handleExport}
            className="w-[139px] pt-[3.87px] pr-[4.17px] pb-[4.17px] pl-[4.17px] rounded-full bg-gray-50 text-base font-semibold flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Export List
            <figure className="w-6 h-6 px-[5px] py-[7px] ml-1 flex items-center justify-center">
              <DownloadIcon className="w-full h-full" />
            </figure>
          </button>
        </aside>
      </header>

      <table className="w-full mt-6">
        <tbody>
          {displayTransactions.map((transaction, index) => {
            const { icon: Icon, bgColor } =
              TRANSACTION_TYPE_CONFIG[transaction.displayType];
            return (
              <tr
                key={transaction.payment_reference || index}
                className={index < displayTransactions.length - 1 ? "mb-6" : ""}
              >
                <td className="align-middle pb-6">
                  <div className="flex items-center gap-x-[14.5px]">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}
                    >
                      <Icon className="w-3 h-3" />
                    </div>
                    <div className="flex flex-col gap-y-[9px]">
                      <span className="text-black-300 text-base font-medium leading-[24px] tracking-[-0.2px]">
                        {transaction.title}
                      </span>
                      {transaction.displayType === "debit" &&
                      transaction.status ? (
                        <span
                          className={`text-sm font-medium leading-4 tracking-[-0.2px] capitalize ${
                            transaction.status === "successful"
                              ? "text-success"
                              : "text-pending"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm font-medium leading-4 tracking-[-0.2px]">
                          {transaction.author}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="text-right align-middle pb-6">
                  <div className="text-base font-bold leading-[24px] tracking-[-0.4px] text-black-300">
                    {formatCurrency(transaction.amount)}
                  </div>
                  <div className="text-sm font-medium leading-4 tracking-[-0.2px] text-gray-400 mt-1">
                    {formatDate(transaction.date)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
