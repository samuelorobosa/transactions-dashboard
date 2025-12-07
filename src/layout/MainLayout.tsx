import Navbar from "../components/organisms/Navbar";
import Sidebar from "../components/organisms/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <Navbar />
      <Sidebar />
      <main className="ml-[140px] w-[1160px]">{children}</main>
    </div>
  );
}
