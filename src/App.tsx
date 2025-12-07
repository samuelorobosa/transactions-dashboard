import MainLayout from "./layout/MainLayout";
import TransactionsTable from "./components/TransactionsTable";
import ChartSection from "./components/ChartSection";

export default function App() {
  return (
    <MainLayout>
      <div className="w-full h-full">
        <ChartSection />
        <TransactionsTable />
      </div>
    </MainLayout>
  );
}
