"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  ClipboardList,
  Wrench,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

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
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

type Engineer = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/engineer/dashboard",
  },
  {
    label: "Profile",
    icon: User,
    href: "/engineer/profile",
  },
  {
    label: "Service Requests",
    icon: ClipboardList,
    href: "/engineer/service-requests",
  },
  {
    label: "Expertise",
    icon: Wrench,
    href: "/engineer/expertise",
  },
];

function EngineerSidebarContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const [engineer, setEngineer] = useState<Engineer | null>(null);

  useEffect(() => {
    async function getEngineer() {
      try {
        const response = await axios.get(
          "http://localhost:3000/engineer/profile",
          {
            withCredentials: true,
          }
        );

        setEngineer(response.data);
      } catch (error) {
        console.error("Failed to load engineer information:", error);
      }
    }

    getEngineer();
  }, []);

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  const pageNames: Record<string, string> = {
    "/engineer/dashboard": "Dashboard",
    "/engineer/profile": "Profile",
    "/engineer/service-requests": "Service Requests",
    "/engineer/expertise": "Expertise",
  };

  const currentPage = pageNames[pathname] ?? "Dashboard";

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Engineer</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      render={<Link href={item.href} />}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="px-2 py-2">
            <div className="font-medium">
              {engineer?.name ?? "Loading..."}
            </div>

            <div className="text-xs text-muted-foreground">
              {engineer?.email ?? ""}
            </div>
          </div>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href="/auth/signin" />}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/engineer/dashboard">
                  Engineer
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>{currentPage}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}

export default function EngineerSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <EngineerSidebarContent>{children}</EngineerSidebarContent>
    </SidebarProvider>
  );
}
