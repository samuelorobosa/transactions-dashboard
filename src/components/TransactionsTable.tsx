import ChevronDownIcon from "../assets/icons/chevron-down.svg?react";
import DownloadIcon from "../assets/icons/download.svg?react";

export default function TransactionsTable() {
  return (
    <div>
      <header className="flex justify-between items-center border-b border-gray-50 pb-6">
        <aside className="flex flex-col">
          <h1 className="text font-bold text-2xl">24 Transactions</h1>
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
          <button className="w-[107px] py-3 rounded-full bg-gray-50 text-base font-semibold flex items-center justify-center">
            Export List
            <figure className="w-5 h-5 px-[5px] py-[7px] ml-1 flex items-center justify-center">
              <DownloadIcon className="w-full h-full" />
            </figure>
          </button>
        </aside>
      </header>
    </div>
  );
}
