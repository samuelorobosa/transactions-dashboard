import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-4">
      <Navbar />
      <Sidebar />
      <div className="ml-[140px] w-[1160px]">{children}</div>
    </main>
  );
}
