import MainLayout from "./layout/MainLayout";
import TransactionsTable from "./components/TransactionsTable";

export default function App() {
  return (
    <MainLayout>
      <div className="w-full h-full">
        <TransactionsTable />
      </div>
    </MainLayout>
  );
}
