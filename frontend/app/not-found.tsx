import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm text-muted-foreground">Error 404</p>
      <h1 className="mb-2 mt-1 text-xl font-semibold">Page not found</h1>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button render={<Link href="/dashboard" />}>Back to dashboard</Button>
    </div>
  );
}