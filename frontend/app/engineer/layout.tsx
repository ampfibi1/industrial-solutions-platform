import EngineerSidebar from "@/components/engineer/EngineerSidebar";

export default function EngineerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EngineerSidebar>{children}</EngineerSidebar>;
}