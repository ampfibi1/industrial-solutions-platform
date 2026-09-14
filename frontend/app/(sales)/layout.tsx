"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/sales/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const breadcrumbMap: Record<string, { group: string; page: string }> = {
  "/dashboard": { group: "Overview", page: "Dashboard" },
  "/orders": { group: "Sales", page: "Orders" },
  "/orders/create": { group: "Sales", page: "New Order" },
  "/assignments": { group: "Sales", page: "Assignments" },
  "/assignments/create": { group: "Sales", page: "New Assignment" },
};

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const breadcrumb = breadcrumbMap[pathname] ?? { group: "Sales", page: "Overview" };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">{breadcrumb.group}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumb.page}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}