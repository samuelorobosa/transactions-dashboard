import InfoIcon from "../assets/icons/info.svg?react";
import { useWallet } from "../queries/revenue.queries";
import { useTransactions } from "../queries/revenue.queries";
import { formatCurrency, prepareChartData } from "../utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CustomXAxisTick = ({ x, y, payload }: any) => {
  return (
    <text
      x={x}
      y={y}
      fill="#56616B"
      fontSize={14}
      fontFamily="Degular"
      fontWeight={500}
      letterSpacing="-0.2px"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        lineHeight: "16px",
      }}
    >
      {payload.value}
    </text>
  );
};

export default function ChartSection() {
  const { data: walletData, isLoading: walletLoading } = useWallet();
  const { data: transactions, isLoading: transactionsLoading } =
    useTransactions();

  const isLoading = walletLoading || transactionsLoading;

  if (isLoading || !walletData) {
    return (
      <div className="flex gap-[124px] mb-[82px] mt-16">
        <div className="flex-1">
          <div className="flex gap-x-16 items-center">
            <div className="flex flex-col gap-y-2">
              <span className="text-sm text-gray-400">Available Balance</span>
              <span className="font-bold text-4xl leading-[48px] tracking-[-1.5px] text-black-300">
                Loading...
              </span>
            </div>
            <button className="w-[167px] h-[52px] rounded-full bg-black-300 text-white text-sm font-semibold leading-4 tracking-[-0.2px]">
              Withdraw
            </button>
          </div>
          {/* Chart here */}
        </div>
        <div className="w-[271px]">
          <div className="flex flex-col gap-8">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-medium leading-4 tracking-[-0.2px]">
                    Loading...
                  </span>
                  <InfoIcon />
                </div>
                <div className="text-black-300 text-[28px] font-bold leading-[32px] tracking-[-0.6px]">
                  Loading...
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const balanceItems = [
    {
      label: "Ledger Balance",
      value: formatCurrency(walletData.ledger_balance),
    },
    { label: "Total Payout", value: formatCurrency(walletData.total_payout) },
    { label: "Total Revenue", value: formatCurrency(walletData.total_revenue) },
    {
      label: "Pending Payout",
      value: formatCurrency(walletData.pending_payout),
    },
  ];

  const chartData = transactions ? prepareChartData(transactions) : [];

  return (
    <div className="flex gap-[124px] mb-[82px] mt-16">
      <div className="flex-1">
        <div className="flex flex-col gap-8">
          <div className="flex gap-x-16 items-center">
            <div className="flex flex-col gap-y-2">
              <span className="text-sm text-gray-400">Available Balance</span>
              <span className="font-bold text-4xl leading-[48px] tracking-[-1.5px] text-black-300">
                {formatCurrency(walletData.balance)}
              </span>
            </div>
            <button className="w-[167px] h-[52px] rounded-full bg-black-300 text-white text-sm font-semibold leading-4 tracking-[-0.2px]">
              Withdraw
            </button>
          </div>
          {chartData.length > 0 && (
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 15 }}>
                  <YAxis
                    axisLine={{
                      stroke: "#DBDEE5",
                      strokeWidth: 1,
                    }}
                    tick={false}
                    tickLine={false}
                    width={0}
                  />
                  <XAxis
                    dataKey="formattedDate"
                    axisLine={false}
                    tickLine={false}
                    tick={<CustomXAxisTick />}
                    interval="preserveStartEnd"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--color-chart-line)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
      <div className="w-[271px]">
        <div className="flex flex-col gap-8">
          {balanceItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm font-medium leading-4 tracking-[-0.2px]">
                  {item.label}
                </span>
                <InfoIcon />
              </div>
              <div className="text-black-300 text-[28px] font-bold leading-[32px] tracking-[-0.6px]">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
