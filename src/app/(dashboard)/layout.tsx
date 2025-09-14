import DashboardNavbar from "@/components/home/dashboard-navbar";
import DashboardSidebar from "@/components/home/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div>
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
              <DashboardNavbar />
                {children}
            </main>
        </SidebarProvider>
    </div>
  );
}