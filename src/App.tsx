import MainLayout from "./layout/MainLayout";
import TransactionsTable from "./components/organisms/TransactionsTable";
import ChartSection from "./components/organisms/ChartSection";

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
