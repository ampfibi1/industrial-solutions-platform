import { api, withToken } from "../axios";
import { Assignment } from "../types";
import { CreateAssignmentInput } from "../validations";

export async function getAssignments(token?: string): Promise<Assignment[]> {
  const res = await api.get<Assignment[]>("/api/sales/assignments", withToken(token));
  return res.data;
}

export async function createAssignment(data: CreateAssignmentInput): Promise<Assignment> {
  const res = await api.post<Assignment>("/api/sales/assignments", data);
  return res.data;
}