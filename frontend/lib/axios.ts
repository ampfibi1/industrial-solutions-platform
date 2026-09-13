import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // browser attaches the httpOnly cookie automatically
  headers: { "Content-Type": "application/json" },
});

if (typeof window !== "undefined") {
  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    },
  );
}

/** Server Components only: the Next.js server process doesn't share the
 *  browser's cookie jar, so the incoming request's cookies have to be
 *  read (via next/headers) and forwarded explicitly on each SSR call. */
export function withCookie(cookieHeader?: string) {
  return cookieHeader ? { headers: { Cookie: cookieHeader } } : undefined;
}