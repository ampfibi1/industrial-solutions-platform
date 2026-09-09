import { Sidebar1 } from "@/components/sidebar1";

export default function AdminLayout({children,}: {children: React.ReactNode;}) {
  return (
    <Sidebar1>{children}</Sidebar1>
  );
}