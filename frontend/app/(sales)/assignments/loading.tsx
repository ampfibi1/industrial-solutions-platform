import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function AssignmentsLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-7 w-48" />
      <Card>
        <CardContent className="space-y-3 pt-6">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
        </CardContent>
      </Card>
    </div>
  );
}