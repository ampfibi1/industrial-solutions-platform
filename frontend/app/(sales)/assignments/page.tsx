import Link from "next/link";
import { getAssignments } from "@/lib/api/assignments";
import { getCookieHeader } from "@/lib/server-cookie";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function AssignmentsPage() {
  const assignments = await getAssignments(getCookieHeader()); // AXIOS — SSR

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Customer assignments</h1>
        <Button render={<Link href="/assignments/create" />}>New assignment</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {assignments.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No customers assigned yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Sales executive</TableHead>
                  <TableHead className="text-right">Assigned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <p className="font-medium">{a.customer.name}</p>
                      <p className="text-xs text-muted-foreground">{a.customer.email}</p>
                    </TableCell>
                    <TableCell>{a.region || "—"}</TableCell>
                    <TableCell>{a.salesExecutive.name}</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {new Date(a.assignedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}