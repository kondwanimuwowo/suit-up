import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="su-app">
      <Sidebar />
      <main className="su-main">{children}</main>
    </div>
  );
}
