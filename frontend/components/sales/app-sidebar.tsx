"use client";

import Link from "next/link";
import { LayoutDashboard, ClipboardList, UserPlus, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type SalesUser = { id: number; name: string; email: string };

const navGroups = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }],
  },
  {
    title: "Sales",
    items: [
      { label: "Orders", icon: ClipboardList, href: "/orders" },
      { label: "Assignments", icon: UserPlus, href: "/assignments" },
    ],
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<SalesUser | null>(null);

  useEffect(() => {
    // cookie is httpOnly, so this is the only way to know who's logged in
    api
      .get("/api/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  async function handleLogout() {
    await api.post("/api/auth/logout");
    window.location.href = "/login";
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton render={<Link href={item.href} />}>
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
          <div className="font-medium">{user?.name ?? "Loading…"}</div>
          <div className="text-xs text-muted-foreground">{user?.email ?? ""}</div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}