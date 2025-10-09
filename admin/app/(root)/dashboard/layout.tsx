"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import SidebarNav from "./(c)/sidebar-nav";
import Logo from "@/components/common/Logo";
import Header from "./(c)/header";
import { Toaster } from "sonner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
};

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <>
      <Toaster expand={true} richColors position="top-center" />
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader className="border-b h-16 flex justify-center">
          <Logo size="sm" mode={isExpanded ? "full" : "icon-only"} />
        </SidebarHeader>
        <SidebarContent className="flex-1 m-2">
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="bg-background min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl w-full">{children}</div>
        </main>
      </SidebarInset>
    </>
  );
};

export default DashboardLayout;
