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
        href: "#",
      },
    ],
  },
};

// -----------------------------
// Admin Information
// -----------------------------

const admin = {
  name: "Abdullah Al Tamjid",
  email: "admin@gmail.com",
};

// -----------------------------
// App Sidebar
// -----------------------------

const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            {group.title && (
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
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
        {/* Admin Information */}
        <div className="px-2 py-2">
          <div className="font-medium">{admin.name}</div>

          <div className="text-xs text-muted-foreground">
            {admin.email}
          </div>
        </div>

        {/* Logout */}
        <SidebarMenu>
          {sidebarData.footerGroup.items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton render={<Link href={item.href} />}>
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