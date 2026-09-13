"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Package,
  Users,
} from "lucide-react";

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
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";

// -----------------------------
// Types
// -----------------------------

type NavItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  isActive?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarData = {
  navGroups: NavGroup[];
  footerGroup: NavGroup;
};

type Admin = {
  id: number;
  name: string;
  email: string;
  role: string;
};

// -----------------------------
// Sidebar Data
// -----------------------------

const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/admin",
          isActive: true,
        },
      ],
    },

    {
      title: "Management",
      items: [
        {
          label: "Users",
          icon: Users,
          href: "/admin/users",
        },
        {
          label: "Companies",
          icon: Building2,
          href: "/admin/companies",
        },
        {
          label: "Categories",
          icon: Boxes,
          href: "/admin/categories",
        },
        {
          label: "Products",
          icon: Package,
          href: "/admin/products",
        },
      ],
    },

    {
      title: "Oversight",
      items: [
        {
          label: "Company Oversight",
          icon: ClipboardList,
          href: "/admin/oversight",
        },
      ],
    },
  ],

  footerGroup: {
    title: "",
    items: [
      {
        label: "Logout",
        icon: LogOut,
        href: "/",
      },
    ],
  },
};

// -----------------------------
// App Sidebar
// -----------------------------

const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    async function getAdminInfo() {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/me",
          {
            withCredentials: true,
          },
        );

        setAdmin(response.data);
      } catch (error) {
        console.error("Failed to load admin information:", error);
      }
    }

    getAdminInfo();
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            {group.title && (
              <SidebarGroupLabel>
                {group.title}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={item.isActive}
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
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 py-2">
          <div className="font-medium">
            {admin?.name ?? "Loading..."}
          </div>

          <div className="text-xs text-muted-foreground">
            {admin?.email ?? ""}
          </div>
        </div>

        <SidebarMenu>
          {sidebarData.footerGroup.items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                render={<Link href={item.href} />}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

// -----------------------------
// Sidebar Layout
// -----------------------------



interface Sidebar1Props {
  children: React.ReactNode;
  className?: string;
}

const Sidebar1 = ({ children, className }: Sidebar1Props) => {
  const pathname = usePathname();
  
  const breadcrumbMap: Record<string, { group: string; page: string }> = {
    "/admin": {
      group: "Overview",
      page: "Dashboard",
    },
    "/admin/users": {
      group: "Management",
      page: "Users",
    },
    "/admin/companies": {
      group: "Management",
      page: "Companies",
    },
    "/admin/categories": {
      group: "Management",
      page: "Categories",
    },
    "/admin/products": {
      group: "Management",
      page: "Products",
    },
    "/admin/oversight": {
      group: "Oversight",
      page: "Company Oversight",
    },
  };
  const breadcrumb = breadcrumbMap[pathname] ?? {
    group: "Overview",
    page: "Dashboard",
  };
  return (
    <SidebarProvider className={cn(className)}>
      <AppSidebar />

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
                <BreadcrumbLink href="/admin">
                  {breadcrumb.group}
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>
                  {breadcrumb.page}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </main>
      </SidebarInset>

      <SidebarRail />
    </SidebarProvider>
  );
};

export { Sidebar1 };