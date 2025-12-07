import Navbar from "../components/organisms/Navbar";
import Sidebar from "../components/organisms/Sidebar";

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
