import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Edge runtime logic for personalization
  // The 'geo' property is available on Vercel Edge functions.
  // As a fallback for local, we provide 'Unknown'
  const country = request.geo?.country || "LK";
  
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-country", country);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/",
};
