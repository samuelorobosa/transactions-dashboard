import InfoIcon from "../../assets/icons/info.svg?react";
import { useWallet } from "../../queries/revenue.queries";
import { useTransactions } from "../../queries/revenue.queries";
import { formatCurrency, prepareChartData } from "../../utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Skeleton from "../atoms/Skeleton";

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
      <section className="flex gap-[124px] mb-[82px] mt-16">
        <div className="flex-1">
          <div className="flex flex-col gap-8">
            <header className="flex gap-x-16 items-center">
              <div className="flex flex-col gap-y-2">
                <Skeleton width={120} height={16} className="mb-2" />
                <Skeleton width={200} height={48} />
              </div>
              <Skeleton
                width={167}
                height={52}
                variant="rectangular"
                className="rounded-full"
              />
            </header>
            {/* Chart skeleton */}
            <Skeleton width="100%" height={300} variant="rectangular" />
          </div>
        </div>
        <aside className="w-[271px]">
          <dl className="flex flex-col gap-8">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton width={120} height={16} />
                  <Skeleton width={16} height={16} variant="circular" />
                </div>
                <Skeleton width={180} height={32} />
              </div>
            ))}
          </dl>
        </aside>
      </section>
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
    <section className="flex gap-[124px] mb-[82px] mt-16">
      <div className="flex-1">
        <div className="flex flex-col gap-8">
          <header className="flex gap-x-16 items-center">
            <div className="flex flex-col gap-y-2">
              <span className="text-sm text-gray-400">Available Balance</span>
              <span className="font-bold text-4xl leading-[48px] tracking-[-1.5px] text-black-300">
                {formatCurrency(walletData.balance)}
              </span>
            </div>
            <button className="w-[167px] cursor-pointer h-[52px] rounded-full bg-black-300 text-white text-sm font-semibold leading-4 tracking-[-0.2px]">
              Withdraw
            </button>
          </header>
          {chartData.length > 0 && (
            <figure className="w-full h-[300px]">
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
            </figure>
          )}
        </div>
      </div>
      <aside className="w-[271px]">
        <dl className="flex flex-col gap-8">
          {balanceItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-y-2">
              <div className="flex justify-between items-center">
                <dt className="text-gray-400 text-sm font-medium leading-4 tracking-[-0.2px]">
                  {item.label}
                </dt>
                <InfoIcon />
              </div>
              <dd className="text-black-300 text-[28px] font-bold leading-[32px] tracking-[-0.6px]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
