import { api, withCookie } from "../axios";
import { Assignment } from "../types";
import { CreateAssignmentInput } from "../validations";

// AXIOS CALL 6 — GET /api/sales/assignments
export async function getAssignments(cookieHeader?: string): Promise<Assignment[]> {
  const res = await api.get<Assignment[]>("/api/sales/assignments", withCookie(cookieHeader));
  return res.data;
}

// AXIOS CALL 7 — POST /api/sales/assignments
export async function createAssignment(data: CreateAssignmentInput): Promise<Assignment> {
  const res = await api.post<Assignment>("/api/sales/assignments", data);
  return res.data;
}