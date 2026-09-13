import { cookies } from "next/headers";

/** Rebuilds the raw Cookie header string from the incoming request,
 *  for forwarding to the backend in Server Component axios calls. */
export function getCookieHeader(): string {
  return cookies()
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}