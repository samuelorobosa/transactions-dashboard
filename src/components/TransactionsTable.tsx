import ChevronDownIcon from "../assets/icons/chevron-down.svg?react";
import DownloadIcon from "../assets/icons/download.svg?react";
import { useTransactions } from "../queries/revenue.queries";
import {
  formatDate,
  formatCurrency,
  transformTransactions,
  TRANSACTION_TYPE_CONFIG,
} from "../utils";

export default function TransactionsTable() {
  const { data: transactions, isLoading } = useTransactions();

  if (transactions) {
    console.log("=== TRANSACTIONS DATA ===");
    console.log(transactions);
  }

  if (isLoading || !transactions) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-gray-400">Loading transactions...</span>
      </div>
    );
  }

  const displayTransactions = transformTransactions(transactions);
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
          <button className="w-[107px] py-3 rounded-full bg-gray-50 text-base font-semibold flex items-center justify-center">
            Filter
            <figure className="w-5 h-5 px-[5px] py-[7px] ml-1 flex items-center justify-center">
              <ChevronDownIcon className="w-full h-full" />
            </figure>
          </button>
          <button className="w-[139px] pt-[3.87px] pr-[4.17px] pb-[4.17px] pl-[4.17px] rounded-full bg-gray-50 text-base font-semibold flex items-center justify-center">
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
